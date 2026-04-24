-- =====================================================================
-- Wonton POS - Final BRD v3 Database Schema (26 UC)
-- =====================================================================
-- Target      : MySQL 8.0+ (InnoDB, utf8mb4)
-- Purpose     : Source schema for reverse-engineering the ERD via
--               MySQL Workbench (Database -> Reverse Engineer...)
-- Aligned with: Business_Rules.md locked baseline (2026-04-17)
--               ADR-023 Comp, ADR-024 Forfeited, ADR-025 Reorder,
--               ADR-026 Shift-span attribution
-- Scope       : 26 UCs of the BRD final v3 authoring lane
--               (UC-01..UC-16 preserved + UC-17..UC-26 added)
-- Out-of-scope: Delivery (UC-50), loyalty, offline sync, supplier / full
--               procurement ledger, BOGO / free-item promotions, native
--               mobile app
-- =====================================================================
--
-- UC -> Table mapping (high level)
--
--   UC-01 Place Online Order            -> orders, order_item, order_item_topping
--   UC-02 Online Payment                -> payment_transaction, refund
--   UC-03 Schedule Pickup Order         -> orders (service_model=PICKUP), pickup_slot_config
--   UC-04 View Order History            -> orders (customer_id filter)
--   UC-05 Manage Menu                   -> menu_category, menu_item, topping, menu_item_topping
--   UC-06 Manage Staff                  -> staff, role, staff_role
--   UC-07 View Revenue Statistics       -> aggregates over orders + shift
--   UC-08 Manage Tables                 -> dining_table
--   UC-09 Create In-Store Order         -> orders (order_channel=COUNTER)
--   UC-10 Process Payment               -> payment_transaction, refund
--   UC-11 Track Order                   -> orders + order_status_history
--   UC-12 Assign Order to Table         -> orders.table_id + order_status_history
--   UC-13 Receive Kitchen Orders        -> orders.order_status transitions
--   UC-14 Update Dish Status            -> order_item.item_status, orders.order_status
--   UC-15 Rate Order                    -> order_review
--   UC-16 Receive Order Notifications   -> notification
--   UC-17 Reorder Past Order            -> orders.source_order_id
--   UC-18 Manage Promotions             -> promotion, promotion_usage
--   UC-19 View Operational Dashboard    -> aggregates over orders + shift
--   UC-20 Manage Active Orders          -> orders (non-terminal states)
--   UC-21 Close Shift & Reconciliation  -> shift, shift_reconciliation_bucket,
--                                          shift_inherited_exception, cash_drawer_movement
--   UC-22 Mark Menu Item as 86'd        -> menu_item.is_86d + menu_item_availability_event
--   UC-23 Serve & Confirm Handoff       -> orders.order_status=COMPLETED + order_status_history
--   UC-24 Handle Complaint & Exception  -> complaint
--   UC-25 Manage Customer Account       -> customer, customer_password_reset
--   UC-26 Complete Checkout & Promo     -> orders + promotion_usage
--
--   Cross-cutting                        -> audit_log, notification, stock_adjustment
-- =====================================================================


-- ------------------------------
-- 0. Database container
-- ------------------------------
DROP DATABASE IF EXISTS wonton_pos;
CREATE DATABASE wonton_pos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE wonton_pos;

SET FOREIGN_KEY_CHECKS = 0;


-- ------------------------------
-- 1. CUSTOMER ACCOUNT (UC-25)
-- ------------------------------
CREATE TABLE customer (
  customer_id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name           VARCHAR(100)  NOT NULL,
  phone_number        VARCHAR(20)   NOT NULL UNIQUE COMMENT 'Unique per registered account',
  email               VARCHAR(120)  UNIQUE,
  password_hash       VARCHAR(255)  NOT NULL COMMENT 'bcrypt or argon2 hash; never plaintext',
  is_active           BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_customer_phone (phone_number),
  INDEX idx_customer_email (email)
) ENGINE=InnoDB COMMENT='Registered customer accounts (UC-25). Guests are captured inline on the orders table only.';


CREATE TABLE customer_password_reset (
  reset_id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id         BIGINT UNSIGNED NOT NULL,
  otp_code_hash       VARCHAR(255)    NOT NULL COMMENT 'Hashed OTP, never plaintext',
  expires_at          DATETIME        NOT NULL,
  consumed_at         DATETIME,
  created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reset_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
  INDEX idx_reset_customer (customer_id, expires_at)
) ENGINE=InnoDB COMMENT='OTP tokens for forgot-password flow (UC-25).';


-- ------------------------------
-- 2. STAFF & ROLES (UC-06, multi-role policy)
-- ------------------------------
CREATE TABLE staff (
  staff_id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name           VARCHAR(100)  NOT NULL,
  phone_number        VARCHAR(20)   NOT NULL UNIQUE,
  email               VARCHAR(120)  UNIQUE,
  password_hash       VARCHAR(255)  NOT NULL,
  is_active           BOOLEAN       NOT NULL DEFAULT TRUE COMMENT 'Deactivation blocks login',
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Staff accounts for Admin WebApp (UC-06).';


CREATE TABLE role (
  role_id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_code           VARCHAR(30)   NOT NULL UNIQUE COMMENT 'MANAGER, CASHIER, KITCHEN, SERVER',
  role_name           VARCHAR(60)   NOT NULL,
  description         VARCHAR(255)
) ENGINE=InnoDB COMMENT='Role catalog. Staff may hold MULTIPLE roles.';


CREATE TABLE staff_role (
  staff_id            BIGINT UNSIGNED NOT NULL,
  role_id             INT UNSIGNED    NOT NULL,
  granted_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  granted_by_staff_id BIGINT UNSIGNED COMMENT 'Manager who granted; self-reference to staff',
  PRIMARY KEY (staff_id, role_id),
  CONSTRAINT fk_staffrole_staff
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_staffrole_role
    FOREIGN KEY (role_id)  REFERENCES role(role_id)   ON DELETE RESTRICT,
  CONSTRAINT fk_staffrole_granter
    FOREIGN KEY (granted_by_staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='M:N staff <-> role. Multi-role staffing allowed.';


-- Seed the four canonical roles so the schema compiles with reasonable defaults
INSERT INTO role (role_code, role_name, description) VALUES
  ('MANAGER', 'Manager', 'Shop owner / general manager with full administrative privileges'),
  ('CASHIER', 'Cashier', 'Front-of-house cashier handling orders and counter payments'),
  ('SERVER',  'Server',  'Front-of-house service staff handling dine-in delivery / handoff'),
  ('KITCHEN', 'Kitchen', 'Back-of-house kitchen staff operating the KDS');


-- ------------------------------
-- 3. MENU, CATEGORIES, TOPPINGS (UC-05, UC-22)
-- ------------------------------
CREATE TABLE menu_category (
  category_id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_name       VARCHAR(100) NOT NULL,
  display_order       INT          NOT NULL DEFAULT 0,
  is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Menu categories (UC-05).';


CREATE TABLE menu_item (
  item_id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id         INT UNSIGNED   NOT NULL,
  item_name           VARCHAR(150)   NOT NULL,
  description         TEXT,
  image_url           VARCHAR(500),
  price               DECIMAL(12,2)  NOT NULL CHECK (price >= 0),
  is_available        BOOLEAN        NOT NULL DEFAULT TRUE COMMENT 'Manager on/off toggle (UC-05)',
  is_86d              BOOLEAN        NOT NULL DEFAULT FALSE COMMENT 'Temporary kitchen flag (UC-22); independent from stock_adjustment per §3m',
  is_archived         BOOLEAN        NOT NULL DEFAULT FALSE COMMENT 'Archive-first policy; physical delete only if no historical data',
  created_at          DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_menuitem_category
    FOREIGN KEY (category_id) REFERENCES menu_category(category_id) ON DELETE RESTRICT,
  INDEX idx_item_category_avail (category_id, is_available, is_86d),
  INDEX idx_item_archived (is_archived)
) ENGINE=InnoDB COMMENT='Menu items. Archived items retain order history.';


CREATE TABLE topping (
  topping_id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  topping_name        VARCHAR(100) NOT NULL,
  extra_price         DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (extra_price >= 0),
  is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Topping catalog (UC-05).';


CREATE TABLE menu_item_topping (
  item_id             BIGINT UNSIGNED NOT NULL,
  topping_id          INT UNSIGNED    NOT NULL,
  PRIMARY KEY (item_id, topping_id),
  CONSTRAINT fk_mit_item
    FOREIGN KEY (item_id)    REFERENCES menu_item(item_id) ON DELETE CASCADE,
  CONSTRAINT fk_mit_topping
    FOREIGN KEY (topping_id) REFERENCES topping(topping_id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Allowed toppings per menu item.';


CREATE TABLE menu_item_availability_event (
  event_id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  item_id             BIGINT UNSIGNED NOT NULL,
  actor_staff_id      BIGINT UNSIGNED NOT NULL COMMENT 'Who toggled 86d',
  is_86d              BOOLEAN         NOT NULL,
  reason              VARCHAR(255),
  event_at            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_avail_item
    FOREIGN KEY (item_id)        REFERENCES menu_item(item_id) ON DELETE CASCADE,
  CONSTRAINT fk_avail_staff
    FOREIGN KEY (actor_staff_id) REFERENCES staff(staff_id)    ON DELETE RESTRICT,
  INDEX idx_avail_item_time (item_id, event_at)
) ENGINE=InnoDB COMMENT='Audit of 86d on/off events (UC-22).';


-- ------------------------------
-- 4. DINING TABLES (UC-08, UC-12)
-- ------------------------------
CREATE TABLE dining_table (
  table_id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  table_number        VARCHAR(20)  NOT NULL UNIQUE,
  seating_capacity    INT          NOT NULL CHECK (seating_capacity > 0),
  location_note       VARCHAR(150),
  qr_token            VARCHAR(64)  UNIQUE COMMENT 'QR encodes /order?table=<qr_token>; static per table',
  current_status      ENUM('AVAILABLE','OCCUPIED','CLEANING','OUT_OF_SERVICE') NOT NULL DEFAULT 'AVAILABLE',
  is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Dine-in tables (UC-08). A table may hold multiple concurrent orders for the same party.';


-- ------------------------------
-- 5. PROMOTIONS (UC-18)
-- ------------------------------
CREATE TABLE promotion (
  promotion_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code                VARCHAR(40)  NOT NULL UNIQUE,
  discount_type       ENUM('PERCENT','FIXED_AMOUNT') NOT NULL COMMENT 'Free-item / BOGO are out of scope',
  discount_value      DECIMAL(12,2) NOT NULL CHECK (discount_value > 0),
  min_order_amount    DECIMAL(12,2) NOT NULL DEFAULT 0,
  max_discount        DECIMAL(12,2) COMMENT 'Cap for PERCENT type; NULL = no cap',
  usage_limit_total   INT UNSIGNED COMMENT 'NULL = unlimited',
  usage_limit_per_customer INT UNSIGNED DEFAULT 1,
  valid_from          DATETIME     NOT NULL,
  valid_until         DATETIME     NOT NULL,
  is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
  created_by_staff_id BIGINT UNSIGNED NOT NULL,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_promo_creator
    FOREIGN KEY (created_by_staff_id) REFERENCES staff(staff_id) ON DELETE RESTRICT,
  INDEX idx_promo_validity (valid_from, valid_until, is_active)
) ENGINE=InnoDB COMMENT='Promotion codes (UC-18). Percent + fixed-amount only.';


-- ------------------------------
-- 6. PICKUP CAPACITY CONFIG (UC-03)
-- ------------------------------
CREATE TABLE pickup_slot_config (
  slot_config_id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  weekday                 TINYINT UNSIGNED NOT NULL CHECK (weekday BETWEEN 0 AND 6) COMMENT '0=Sunday..6=Saturday',
  start_time              TIME NOT NULL,
  end_time                TIME NOT NULL,
  max_orders_per_slot     INT UNSIGNED NOT NULL DEFAULT 5,
  holding_minutes         INT UNSIGNED NOT NULL DEFAULT 60 COMMENT 'Holding window after scheduled time',
  is_paused               BOOLEAN      NOT NULL DEFAULT FALSE COMMENT 'Pause toggle; affects only new orders per ADR',
  updated_by_staff_id     BIGINT UNSIGNED,
  updated_at              DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_slot_updater
    FOREIGN KEY (updated_by_staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='Pickup slot capacity configuration (UC-03 + Business Rules Pickup section).';


-- ------------------------------
-- 7. ORDERS (UC-01, UC-03, UC-09, UC-11, UC-17, UC-20, UC-26)
-- ------------------------------
CREATE TABLE orders (
  order_id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_code          VARCHAR(12)   NOT NULL UNIQUE COMMENT '8+ alphanumeric for Guest tracking security (NFR security)',
  service_model       ENUM('DINE_IN','TAKEAWAY','PICKUP') NOT NULL,
  order_channel       ENUM('CLIENT_WEBAPP','COUNTER') NOT NULL COMMENT 'Drives counter-Takeaway auto-cancel exemption',
  order_status        ENUM('PENDING_CONFIRMATION','COOKING','READY','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING_CONFIRMATION',
  payment_status      ENUM('PENDING_ONLINE_PAYMENT','UNPAID','PAID','REFUND_PENDING','REFUNDED','WRITE_OFF','COMP','FORFEITED') NOT NULL DEFAULT 'UNPAID',

  -- Customer identification (exactly one path: customer_id OR guest_*)
  customer_id         BIGINT UNSIGNED COMMENT 'NULL for Guest checkout',
  guest_name          VARCHAR(100),
  guest_phone         VARCHAR(20),
  guest_anonymized_at DATETIME COMMENT 'Set 12 months after terminal state per Decree 13/2023 (NFR-09)',

  -- Dine-in and Pickup context
  table_id            INT UNSIGNED COMMENT 'Dine-in only',
  party_size          INT          COMMENT 'Cashier-entered, optional; null for QR self-service orders',
  pickup_scheduled_at DATETIME     COMMENT 'Pickup orders only',

  -- Totals
  subtotal_amount     DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount_amount     DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_amount        DECIMAL(12,2) NOT NULL DEFAULT 0,
  applied_promotion_id INT UNSIGNED,

  -- Reorder traceability (UC-17)
  source_order_id     BIGINT UNSIGNED COMMENT 'Reorder source; must be a Completed order per ADR-025',

  -- Lifecycle timestamps
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  accepted_at         DATETIME     COMMENT 'When kitchen accepted',
  ready_at            DATETIME,
  completed_at        DATETIME,
  cancelled_at        DATETIME,
  cancellation_reason VARCHAR(255),
  created_by_staff_id BIGINT UNSIGNED COMMENT 'Set for COUNTER channel',

  CONSTRAINT fk_order_customer
    FOREIGN KEY (customer_id)         REFERENCES customer(customer_id)       ON DELETE SET NULL,
  CONSTRAINT fk_order_table
    FOREIGN KEY (table_id)            REFERENCES dining_table(table_id)      ON DELETE RESTRICT,
  CONSTRAINT fk_order_promotion
    FOREIGN KEY (applied_promotion_id) REFERENCES promotion(promotion_id)    ON DELETE SET NULL,
  CONSTRAINT fk_order_source
    FOREIGN KEY (source_order_id)     REFERENCES orders(order_id)            ON DELETE SET NULL,
  CONSTRAINT fk_order_creator
    FOREIGN KEY (created_by_staff_id) REFERENCES staff(staff_id)             ON DELETE SET NULL,

  INDEX idx_order_code (order_code),
  INDEX idx_order_service_status (service_model, order_status),
  INDEX idx_order_customer_time (customer_id, created_at),
  INDEX idx_order_guest_phone (guest_phone, created_at),
  INDEX idx_order_table (table_id, order_status),
  INDEX idx_order_pickup_time (pickup_scheduled_at, order_status),
  INDEX idx_order_status_pair (order_status, payment_status, created_at)
) ENGINE=InnoDB COMMENT='Primary orders table. Multi-order per table is allowed for Dine-in.';


CREATE TABLE order_item (
  order_item_id       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id            BIGINT UNSIGNED NOT NULL,
  item_id             BIGINT UNSIGNED NOT NULL,
  item_name_snapshot  VARCHAR(150)    NOT NULL COMMENT 'Preserve historical item name',
  unit_price_snapshot DECIMAL(12,2)   NOT NULL COMMENT 'Preserve historical price at order time',
  quantity            INT UNSIGNED    NOT NULL CHECK (quantity > 0),
  line_subtotal       DECIMAL(12,2)   NOT NULL COMMENT 'quantity x (unit_price + toppings)',
  special_note        VARCHAR(255)    COMMENT 'Minor notes: less spicy, no onion, etc.',
  item_status         ENUM('PENDING','COOKING','READY','SERVED','VOID') NOT NULL DEFAULT 'PENDING' COMMENT 'Supports partial-issue flow (UC-13 Alt 2c)',
  CONSTRAINT fk_oi_order
    FOREIGN KEY (order_id) REFERENCES orders(order_id)   ON DELETE CASCADE,
  CONSTRAINT fk_oi_item
    FOREIGN KEY (item_id)  REFERENCES menu_item(item_id) ON DELETE RESTRICT,
  INDEX idx_oi_order (order_id),
  INDEX idx_oi_item (item_id)
) ENGINE=InnoDB COMMENT='Order line items with name/price snapshot for historical integrity.';


CREATE TABLE order_item_topping (
  order_item_id           BIGINT UNSIGNED NOT NULL,
  topping_id              INT UNSIGNED    NOT NULL,
  topping_name_snapshot   VARCHAR(100)    NOT NULL,
  topping_price_snapshot  DECIMAL(12,2)   NOT NULL,
  PRIMARY KEY (order_item_id, topping_id),
  CONSTRAINT fk_oit_orderitem
    FOREIGN KEY (order_item_id) REFERENCES order_item(order_item_id) ON DELETE CASCADE,
  CONSTRAINT fk_oit_topping
    FOREIGN KEY (topping_id)    REFERENCES topping(topping_id)        ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Toppings applied to an order line, with price snapshot.';


CREATE TABLE order_status_history (
  history_id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id                BIGINT UNSIGNED NOT NULL,
  from_order_status       ENUM('PENDING_CONFIRMATION','COOKING','READY','COMPLETED','CANCELLED'),
  to_order_status         ENUM('PENDING_CONFIRMATION','COOKING','READY','COMPLETED','CANCELLED'),
  from_payment_status     ENUM('PENDING_ONLINE_PAYMENT','UNPAID','PAID','REFUND_PENDING','REFUNDED','WRITE_OFF','COMP','FORFEITED'),
  to_payment_status       ENUM('PENDING_ONLINE_PAYMENT','UNPAID','PAID','REFUND_PENDING','REFUNDED','WRITE_OFF','COMP','FORFEITED'),
  actor_staff_id          BIGINT UNSIGNED,
  actor_customer_id       BIGINT UNSIGNED,
  change_reason           VARCHAR(255),
  changed_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_hist_order
    FOREIGN KEY (order_id)          REFERENCES orders(order_id)      ON DELETE CASCADE,
  CONSTRAINT fk_hist_staff
    FOREIGN KEY (actor_staff_id)    REFERENCES staff(staff_id)       ON DELETE SET NULL,
  CONSTRAINT fk_hist_customer
    FOREIGN KEY (actor_customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL,
  INDEX idx_hist_order (order_id, changed_at)
) ENGINE=InnoDB COMMENT='Audit trail of order and payment status transitions.';


-- ------------------------------
-- 8. PAYMENT & REFUND (UC-02, UC-10)
-- ------------------------------
CREATE TABLE payment_transaction (
  transaction_id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id                BIGINT UNSIGNED NOT NULL,
  method                  ENUM('CASH','PAYMENT_GATEWAY_QR','BANK_TRANSFER_QR','ONLINE_GATEWAY') NOT NULL,
  provider_code           VARCHAR(30)    COMMENT 'MOMO, VNPAY, ZALOPAY, or bank name',
  amount                  DECIMAL(12,2)  NOT NULL,
  status                  ENUM('PENDING','SUCCESS','FAILED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  gateway_reference       VARCHAR(120)   COMMENT 'Idempotency key from gateway callback',
  manual_confirmation_by_staff_id BIGINT UNSIGNED COMMENT 'Cashier/Manager who manually confirmed BANK_TRANSFER_QR',
  manual_confirmed_at     DATETIME,
  initiated_at            DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at            DATETIME,
  CONSTRAINT fk_pay_order
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_pay_confirmer
    FOREIGN KEY (manual_confirmation_by_staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
  UNIQUE KEY uq_gateway_reference (gateway_reference) COMMENT 'Idempotent against duplicate callbacks (ADR payment-failure)',
  INDEX idx_pay_order_status (order_id, status),
  INDEX idx_pay_method_time (method, completed_at)
) ENGINE=InnoDB COMMENT='Each payment attempt. Duplicate callbacks prevented via unique gateway_reference.';


CREATE TABLE refund (
  refund_id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id                BIGINT UNSIGNED NOT NULL,
  source_transaction_id   BIGINT UNSIGNED COMMENT 'Original payment being refunded',
  amount                  DECIMAL(12,2)  NOT NULL,
  refund_type             ENUM('FULL','PARTIAL') NOT NULL,
  reason                  VARCHAR(255)   NOT NULL,
  status                  ENUM('PENDING','COMPLETED','FAILED') NOT NULL DEFAULT 'PENDING',
  method                  ENUM('GATEWAY_AUTO','CASH_MANUAL','BANK_TRANSFER_MANUAL') NOT NULL,
  approved_by_staff_id    BIGINT UNSIGNED NOT NULL COMMENT 'Manager approval required (§3b, §3k)',
  completed_by_staff_id   BIGINT UNSIGNED,
  created_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at            DATETIME,
  CONSTRAINT fk_refund_order
    FOREIGN KEY (order_id)              REFERENCES orders(order_id)              ON DELETE RESTRICT,
  CONSTRAINT fk_refund_tx
    FOREIGN KEY (source_transaction_id) REFERENCES payment_transaction(transaction_id) ON DELETE SET NULL,
  CONSTRAINT fk_refund_approver
    FOREIGN KEY (approved_by_staff_id)  REFERENCES staff(staff_id)               ON DELETE RESTRICT,
  CONSTRAINT fk_refund_completer
    FOREIGN KEY (completed_by_staff_id) REFERENCES staff(staff_id)               ON DELETE SET NULL,
  INDEX idx_refund_order (order_id, status),
  INDEX idx_refund_status (status, created_at)
) ENGINE=InnoDB COMMENT='Refund records supporting full and partial refunds (§3b).';


-- ------------------------------
-- 9. PROMOTION USAGE (UC-18, UC-26)
-- ------------------------------
CREATE TABLE promotion_usage (
  usage_id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  promotion_id        INT UNSIGNED    NOT NULL,
  order_id            BIGINT UNSIGNED NOT NULL,
  customer_id         BIGINT UNSIGNED COMMENT 'NULL for Guest',
  guest_phone         VARCHAR(20)     COMMENT 'Used to enforce per-customer limit for Guests',
  discount_applied    DECIMAL(12,2)   NOT NULL,
  applied_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_usage_promo
    FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id) ON DELETE RESTRICT,
  CONSTRAINT fk_usage_order
    FOREIGN KEY (order_id)     REFERENCES orders(order_id)         ON DELETE CASCADE,
  CONSTRAINT fk_usage_customer
    FOREIGN KEY (customer_id)  REFERENCES customer(customer_id)    ON DELETE SET NULL,
  INDEX idx_usage_promo_time (promotion_id, applied_at),
  INDEX idx_usage_customer_promo (customer_id, promotion_id),
  INDEX idx_usage_guest_promo (guest_phone, promotion_id)
) ENGINE=InnoDB COMMENT='Log of every successful promotion application (for limits and reporting).';


-- ------------------------------
-- 10. REVIEW (UC-15)
-- ------------------------------
CREATE TABLE order_review (
  review_id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id            BIGINT UNSIGNED NOT NULL UNIQUE COMMENT 'One review per order',
  customer_id         BIGINT UNSIGNED NOT NULL COMMENT 'Registered customer only',
  rating_food         TINYINT UNSIGNED NOT NULL CHECK (rating_food BETWEEN 1 AND 5),
  rating_service      TINYINT UNSIGNED NOT NULL CHECK (rating_service BETWEEN 1 AND 5),
  rating_experience   TINYINT UNSIGNED NOT NULL CHECK (rating_experience BETWEEN 1 AND 5),
  comment             VARCHAR(500),
  is_hidden           BOOLEAN         NOT NULL DEFAULT FALSE COMMENT 'Hidden by profanity/spam filter',
  created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_review_order
    FOREIGN KEY (order_id)    REFERENCES orders(order_id)      ON DELETE CASCADE,
  CONSTRAINT fk_review_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE RESTRICT,
  INDEX idx_review_customer_time (customer_id, created_at)
) ENGINE=InnoDB COMMENT='Customer reviews (UC-15). 7-day window enforced at application layer.';


-- ------------------------------
-- 11. NOTIFICATION (UC-16, support for many UC)
-- ------------------------------
CREATE TABLE notification (
  notification_id     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  recipient_type      ENUM('CUSTOMER','STAFF') NOT NULL,
  customer_id         BIGINT UNSIGNED,
  staff_id            BIGINT UNSIGNED,
  order_id            BIGINT UNSIGNED,
  event_type          VARCHAR(60)  NOT NULL COMMENT 'ORDER_CREATED, COOKING, READY, COMPLETED, CANCELLED, 86D, REFUND_PENDING, ...',
  title               VARCHAR(150) NOT NULL,
  body                VARCHAR(500),
  is_read             BOOLEAN      NOT NULL DEFAULT FALSE,
  delivered_at        DATETIME,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_customer
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
  CONSTRAINT fk_notif_staff
    FOREIGN KEY (staff_id)    REFERENCES staff(staff_id)       ON DELETE CASCADE,
  CONSTRAINT fk_notif_order
    FOREIGN KEY (order_id)    REFERENCES orders(order_id)      ON DELETE CASCADE,
  INDEX idx_notif_customer_unread (customer_id, is_read, created_at),
  INDEX idx_notif_staff_unread (staff_id, is_read, created_at),
  INDEX idx_notif_order (order_id, created_at)
) ENGINE=InnoDB COMMENT='In-app notifications plus browser push queue.';


-- ------------------------------
-- 12. SHIFT & RECONCILIATION (UC-21, ADR-026)
-- ------------------------------
CREATE TABLE shift (
  shift_id                       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  opened_by_staff_id             BIGINT UNSIGNED NOT NULL,
  closed_by_staff_id             BIGINT UNSIGNED,
  opened_at                      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_at                      DATETIME,
  opening_cash                   DECIMAL(12,2) NOT NULL,
  counted_cash                   DECIMAL(12,2),
  expected_cash                  DECIMAL(12,2),
  variance                       DECIMAL(12,2) COMMENT 'counted_cash - expected_cash',
  variance_reason                VARCHAR(255),
  variance_approved_by_staff_id  BIGINT UNSIGNED,
  status                         ENUM('OPEN','CLOSED','REOPENED') NOT NULL DEFAULT 'OPEN',
  CONSTRAINT fk_shift_opener
    FOREIGN KEY (opened_by_staff_id)            REFERENCES staff(staff_id) ON DELETE RESTRICT,
  CONSTRAINT fk_shift_closer
    FOREIGN KEY (closed_by_staff_id)            REFERENCES staff(staff_id) ON DELETE SET NULL,
  CONSTRAINT fk_shift_variance_approver
    FOREIGN KEY (variance_approved_by_staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
  INDEX idx_shift_opened (opened_at, status)
) ENGINE=InnoDB COMMENT='Cashier shift (UC-21). Multi-shift per day supported; single-shift is a degenerate case.';


CREATE TABLE shift_reconciliation_bucket (
  bucket_id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  shift_id            BIGINT UNSIGNED NOT NULL,
  bucket_type         ENUM('CASH','BANK_TRANSFER_QR','ONLINE_GATEWAY','REFUND','WRITE_OFF','COMP','FORFEITED','DUPLICATE_CHARGE') NOT NULL,
  total_amount        DECIMAL(12,2)   NOT NULL DEFAULT 0,
  transaction_count   INT UNSIGNED    NOT NULL DEFAULT 0,
  CONSTRAINT fk_bucket_shift
    FOREIGN KEY (shift_id) REFERENCES shift(shift_id) ON DELETE CASCADE,
  UNIQUE KEY uq_shift_bucket (shift_id, bucket_type)
) ENGINE=InnoDB COMMENT='Shift-close breakdown (ADR-026). Comp and Forfeited are reconciliation buckets of their own.';


CREATE TABLE shift_inherited_exception (
  inherited_id        BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  from_shift_id       BIGINT UNSIGNED NOT NULL,
  to_shift_id         BIGINT UNSIGNED,
  order_id            BIGINT UNSIGNED,
  exception_type      ENUM('REFUND_PENDING','OVERDUE_PICKUP','OVERDUE_TAKEAWAY','WRITE_OFF_PENDING','FORFEITED_PENDING','DINE_IN_COMPLETED_UNPAID') NOT NULL,
  handover_note       VARCHAR(500),
  resolved_at         DATETIME,
  CONSTRAINT fk_inh_from
    FOREIGN KEY (from_shift_id) REFERENCES shift(shift_id) ON DELETE CASCADE,
  CONSTRAINT fk_inh_to
    FOREIGN KEY (to_shift_id)   REFERENCES shift(shift_id) ON DELETE SET NULL,
  CONSTRAINT fk_inh_order
    FOREIGN KEY (order_id)      REFERENCES orders(order_id) ON DELETE SET NULL,
  INDEX idx_inh_shifts (from_shift_id, to_shift_id)
) ENGINE=InnoDB COMMENT='Carry-over exceptions between shifts (ADR-026 inherited-exceptions set).';


CREATE TABLE cash_drawer_movement (
  movement_id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  shift_id            BIGINT UNSIGNED NOT NULL,
  movement_type       ENUM('CASH_IN','CASH_OUT','PAYIN','PAYOUT','TIP') NOT NULL,
  amount              DECIMAL(12,2)   NOT NULL,
  reason              VARCHAR(255),
  recorded_by_staff_id BIGINT UNSIGNED NOT NULL,
  recorded_at         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_drawer_shift
    FOREIGN KEY (shift_id)             REFERENCES shift(shift_id) ON DELETE CASCADE,
  CONSTRAINT fk_drawer_staff
    FOREIGN KEY (recorded_by_staff_id) REFERENCES staff(staff_id) ON DELETE RESTRICT,
  INDEX idx_drawer_shift_time (shift_id, recorded_at)
) ENGINE=InnoDB COMMENT='Cash drawer ins/outs within a shift.';


-- ------------------------------
-- 13. INVENTORY-LITE (UC-22, §3m)
-- ------------------------------
CREATE TABLE stock_adjustment (
  adjustment_id       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  item_id             BIGINT UNSIGNED NOT NULL,
  adjustment_type     ENUM('RESTOCK','WASTE','SPOILAGE','COUNT_CORRECTION','OTHER') NOT NULL,
  quantity_delta      INT             NOT NULL COMMENT 'Positive = add, Negative = remove',
  reason              VARCHAR(255),
  recorded_by_staff_id BIGINT UNSIGNED NOT NULL,
  recorded_at         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_adj_item
    FOREIGN KEY (item_id)              REFERENCES menu_item(item_id) ON DELETE RESTRICT,
  CONSTRAINT fk_adj_staff
    FOREIGN KEY (recorded_by_staff_id) REFERENCES staff(staff_id)    ON DELETE RESTRICT,
  INDEX idx_adj_item_time (item_id, recorded_at)
) ENGINE=InnoDB COMMENT='Manual inventory adjustments (§3m). Independent from 86d flag.';


-- ------------------------------
-- 14. COMPLAINT / OPERATIONAL EXCEPTION (UC-24)
-- ------------------------------
CREATE TABLE complaint (
  complaint_id        BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id            BIGINT UNSIGNED NOT NULL,
  issue_type          ENUM('MISSING_ITEM','WRONG_ITEM','QUALITY_ISSUE','WRONG_HANDOFF','LATE_DELIVERY','OTHER') NOT NULL,
  description         VARCHAR(1000),
  resolution          ENUM('PENDING','REMAKE','SUBSTITUTE','GOODWILL_DISCOUNT','PARTIAL_REFUND','FULL_REFUND','COMP','WRITE_OFF','NO_ACTION') NOT NULL DEFAULT 'PENDING',
  reported_by_staff_id BIGINT UNSIGNED NOT NULL,
  approved_by_staff_id BIGINT UNSIGNED COMMENT 'Manager approval required for refund / Comp / Write-off',
  resolved_at         DATETIME,
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_complaint_order
    FOREIGN KEY (order_id)             REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_complaint_reporter
    FOREIGN KEY (reported_by_staff_id) REFERENCES staff(staff_id)  ON DELETE RESTRICT,
  CONSTRAINT fk_complaint_approver
    FOREIGN KEY (approved_by_staff_id) REFERENCES staff(staff_id)  ON DELETE SET NULL,
  INDEX idx_complaint_order (order_id),
  INDEX idx_complaint_resolution (resolution, created_at)
) ENGINE=InnoDB COMMENT='Customer complaints and operational exceptions (UC-24).';


-- ------------------------------
-- 15. AUDIT LOG (NFR-08, §3k Manager Override)
-- ------------------------------
CREATE TABLE audit_log (
  log_id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  actor_staff_id      BIGINT UNSIGNED NOT NULL,
  actor_role_code     VARCHAR(30),
  action_type         VARCHAR(60)     NOT NULL COMMENT 'REFUND, COMP, WRITE_OFF, FORFEITED, MANAGER_OVERRIDE, SHIFT_VARIANCE, STATUS_REVERT, MENU_ARCHIVE, ...',
  entity_type         VARCHAR(40)     NOT NULL COMMENT 'order / shift / menu_item / staff / promotion',
  entity_id           BIGINT UNSIGNED,
  amount_impact       DECIMAL(12,2),
  reason              VARCHAR(500)    NOT NULL,
  approver_staff_id   BIGINT UNSIGNED,
  metadata_json       JSON,
  logged_at           DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_actor
    FOREIGN KEY (actor_staff_id)    REFERENCES staff(staff_id) ON DELETE RESTRICT,
  CONSTRAINT fk_audit_approver
    FOREIGN KEY (approver_staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
  INDEX idx_audit_action_time (action_type, logged_at),
  INDEX idx_audit_entity (entity_type, entity_id, logged_at)
) ENGINE=InnoDB COMMENT='Immutable audit log for sensitive actions (NFR-08). Never hard-deleted.';


-- =====================================================================
-- Finalize
-- =====================================================================
SET FOREIGN_KEY_CHECKS = 1;

-- Sanity summary: list all created tables
-- SELECT TABLE_NAME, TABLE_ROWS, TABLE_COMMENT
-- FROM information_schema.TABLES
-- WHERE TABLE_SCHEMA = 'wonton_pos'
-- ORDER BY TABLE_NAME;

-- =====================================================================
-- End of schema
-- =====================================================================
