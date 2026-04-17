# Wonton POS Full-System Production ERD

This ERD is the production-grade logical/relational data model for the documented Wonton POS system scope derived from:

- `All_Use_Cases.md` (74 use cases)
- `BRD_Ver0.md` / `BRD_Ver0_EN.md`
- `Business_Rules.md` / `Business_Rules_EN.md`
- `UC_Specifications_Part1*.md`
- `UC_Specifications_Part2*.md`

## Modeling Decisions

- This model targets the documented 74-UC system, not only the 16-UC midterm subset.
- Enum-like domains such as `service_type`, `order_status`, `payment_status`, `event_type`, and `table_status` are kept as constrained string columns for readability; they can be converted into lookup tables during physical database design if the team prefers stricter normalization.
- `ORDER_CONTACT` is optional. It stores the checkout-time contact snapshot only for flows that actually collect customer-facing contact data, such as guest online checkout and trackable delivery/pickup flows. Walk-in counter orders may not create this row. Guest order lookup by `{Order Code + Phone Number}` is sourced from this snapshot.
- `END_USER_IDENTITY` is the stable customer-facing identity used by the Client WebApp for notification history and browser push. For registered users it maps 1:1 to a customer account; for guests it maps to the active guest web session.
- `CUSTOMER_ORDER.customer_id` is a deliberate denormalization for direct account ownership queries such as order history and review eligibility. Registered self-service orders must populate it, and it must match the registered identity referenced by `end_user_identity_id`. Guest identities keep `customer_id` null.
- `ORDER_STATUS_HISTORY` is the authoritative audit trail for order lifecycle changes, including customer cancellations, staff rejections, and system auto-cancellations after the documented 15-minute payment-timeout rule for prepayment-required orders.
- `CUSTOMER_ORDER.order_source` and `service_type` are not fully free combinations. The documented matrix allows self-service web flows for `Dine-in`, `Takeaway`, and `Pickup`, while counter-created staff orders are limited to `Dine-in` and `Takeaway`. `Pickup` is never a counter-created flow in the current scope.
- `TABLE_ASSIGNMENT` stores assignment history so table transfer and release remain traceable.
- `TABLE_ASSIGNMENT` and `PICKUP_SCHEDULE` are service-specific extensions, not generic optional add-ons. `Dine-in` orders use table assignment history, `Pickup` orders use pickup scheduling, and `Takeaway` orders use neither.
- `DINING_TABLE.qr_token` supports dine-in ordering via QR at the table while still allowing FOH-controlled assignment and transfer flows.
- `TABLE_ASSIGNMENT.assigned_by_staff_id` is optional because the initial table link may be created by QR self-service or another system-driven dine-in flow. `released_by_staff_id` remains null until the assignment is explicitly released and may differ from the assigning staff member.
- `DINING_TABLE.table_status` is a materialized operational flag. It must stay transactionally consistent with active `TABLE_ASSIGNMENT` rows.
- `MENU_ITEM_STATUS_LOG` covers the documented `86'd / Out of Stock` operational behavior. The current requirement set does not define a separate ingredient-stock module in enough detail to finalize a deeper inventory ledger here.
- `ORDER_REVIEW` is eligible only for completed registered-customer orders and only within the documented 7-day review window. Guest orders must never create review rows.
- `PICKUP_SLOT.current_bookings` is a materialized operational counter for concurrency-safe slot reservation. It must be updated in the same transaction that creates, cancels, or reallocates active `PICKUP_SCHEDULE` rows; historical reporting comes from `PICKUP_SCHEDULE`, not this counter.
- `ORDER_PRINT_LOG` captures both staff-initiated prints and system-generated dispatches such as kitchen ticket release. `printed_by_staff_id` is nullable for automatic events.
- `Takeaway` and `Pickup` are payment-gated before operational release. Kitchen/KDS dispatch, kitchen-ticket emission, and equivalent preparation-release actions may occur only after `payment_status = Paid`; `Dine-in` is the only documented service type that may proceed into preparation while still unpaid.
- `WEB_PUSH_SUBSCRIPTION` is tied to `END_USER_IDENTITY`, not `ORDER_CONTACT`, so a registered customer keeps one notification identity across multiple orders while guest flows still work through `guest_session_key`.
- The physical schema must enforce explicit XOR and conditional checks instead of relying on application convention:
- `CART`: exactly one of `{customer_id, guest_session_key}` is populated.
- `END_USER_IDENTITY`: exactly one of `{customer_id, guest_session_key}` is populated.
- `CUSTOMER_ORDER`: self-service online orders require `end_user_identity_id`; pure counter walk-in orders may leave `{customer_id, end_user_identity_id, order_contact}` null.
- `CUSTOMER_ORDER`: if `end_user_identity_id` resolves to a registered account, `customer_id` is mandatory and must equal `END_USER_IDENTITY.customer_id`; guest identities must keep `customer_id` null.
- `CUSTOMER_ORDER`: guest self-service orders must have an `ORDER_CONTACT` snapshot with `recipient_phone`; registered self-service orders may omit `ORDER_CONTACT`.
- `CUSTOMER_ORDER`: `Pickup` is allowed only for the self-service customer/web flow. Counter-created staff orders may only use `Dine-in` or `Takeaway`.
- `CUSTOMER_ORDER`: `Pickup` orders must have exactly one `PICKUP_SCHEDULE` row and no `TABLE_ASSIGNMENT` rows. `Takeaway` orders must have neither `PICKUP_SCHEDULE` nor `TABLE_ASSIGNMENT`. `Dine-in` orders must have table-assignment history and no `PICKUP_SCHEDULE`; while dine-in table service is active, exactly one active `TABLE_ASSIGNMENT` must exist for the order.
- `CUSTOMER_ORDER`: `Takeaway` and `Pickup` are prepayment-required flows. Until `payment_status = 'Paid'`, they must not be operationally released to kitchen/KDS, must not generate kitchen-dispatch `ORDER_PRINT_LOG` events, and must not transition into preparation-progress states such as `Cooking`, `Ready`, or `Completed`. `Dine-in` may progress operationally while `payment_status = 'Unpaid'`.
- `CUSTOMER_ORDER`: only `Takeaway` and `Pickup` are subject to payment-timeout auto-cancellation. If payment is not completed within 15 minutes, the system must transition the order to `Cancelled`, stamp `cancelled_at`, and append an `ORDER_STATUS_HISTORY` row with `actor_type = 'system'`. Unpaid `Dine-in` orders must never be auto-cancelled by this timeout rule.
- `ORDER_STATUS_HISTORY`: exactly one of `{changed_by_staff_id, changed_by_end_user_identity_id}` is populated for user-driven changes; both are null only when `actor_type = 'system'`.
- `TABLE_ASSIGNMENT`: `assigned_by_staff_id` is nullable for QR/self-service/system-created assignments; `released_by_staff_id` is nullable until release. When both are populated, they may reference different staff accounts.
- `TABLE_ASSIGNMENT`: at most one active row may exist per `order_id` and at most one active row may exist per `table_id`. Active means `released_at IS NULL` and `assignment_status` is not closed. Transfers must close the previous active row before inserting the replacement row.
- `DINING_TABLE`: `table_status = 'Occupied'` iff an active `TABLE_ASSIGNMENT` exists for that table; otherwise it must not be `Occupied`.
- `ORDER_REVIEW`: `ORDER_REVIEW.customer_id` must equal `CUSTOMER_ORDER.customer_id`; insertion is allowed only when the referenced order is `Completed`, is within 7 days from completion, and has not been reviewed before.
- `ORDER_PRINT_LOG`: `printed_by_staff_id` is required only for staff-manual prints/reprints; it must remain null for system-auto kitchen-ticket/KDS dispatches.
- `ORDER_PRINT_LOG`: rows representing kitchen-ticket printing, kitchen dispatch, or KDS release are valid only when the parent order is operationally eligible for release under the previous payment-gating rule.
- `NOTIFICATION_RECIPIENT`: exactly one of `{end_user_identity_id, staff_id}` is populated.
- `NOTIFICATION_EVENT`: `event_scope` determines valid context keys. `order_*` events require `order_id`; `menu_item_*` events require `menu_item_id`.
- Loyalty, payroll, and other future modules that are mentioned only as extended scope without concrete use cases or business rules are intentionally excluded from this ERD until they are specified.

```mermaid
erDiagram
    %% Identity & RBAC
    CUSTOMER_ACCOUNT ||--o{ CUSTOMER_AUTH_IDENTITY : authenticates_with
    CUSTOMER_ACCOUNT ||--o{ CUSTOMER_PASSWORD_RESET_OTP : resets_with
    CUSTOMER_ACCOUNT |o--o| END_USER_IDENTITY : identifies
    CUSTOMER_ACCOUNT |o--o{ CART : owns
    CUSTOMER_ACCOUNT |o--o{ CUSTOMER_ORDER : places
    CUSTOMER_ACCOUNT ||--o{ ORDER_REVIEW : writes

    STAFF_ACCOUNT ||--o{ STAFF_ROLE : has
    ROLE ||--o{ STAFF_ROLE : grants
    STAFF_ACCOUNT |o--o{ CUSTOMER_ORDER : creates_counter
    STAFF_ACCOUNT |o--o{ PAYMENT_TRANSACTION : processes
    STAFF_ACCOUNT |o--o{ ORDER_PRINT_LOG : prints
    STAFF_ACCOUNT |o--o{ TABLE_ASSIGNMENT : assigns
    STAFF_ACCOUNT |o--o{ TABLE_ASSIGNMENT : releases
    STAFF_ACCOUNT |o--o{ PICKUP_SCHEDULE : handles
    STAFF_ACCOUNT ||--o{ MENU_ITEM_STATUS_LOG : changes
    STAFF_ACCOUNT |o--o{ ORDER_STATUS_HISTORY : updates
    STAFF_ACCOUNT |o--o{ NOTIFICATION_RECIPIENT : receives
    STAFF_ACCOUNT |o--o{ ORDER_REVIEW : moderates

    %% Menu & Catalog
    MENU_CATEGORY ||--o{ MENU_ITEM : groups
    MENU_ITEM ||--o{ MENU_ITEM_TOPPING : offers
    TOPPING ||--o{ MENU_ITEM_TOPPING : available_for
    MENU_ITEM ||--o{ MENU_ITEM_STATUS_LOG : tracks

    %% Cart
    PROMOTION_CODE ||--o{ CART : applied_in
    CART ||--|{ CART_ITEM : contains
    MENU_ITEM ||--o{ CART_ITEM : added_as
    CART_ITEM ||--o{ CART_ITEM_TOPPING : customizes
    TOPPING ||--o{ CART_ITEM_TOPPING : selected_as

    %% Order, Payment, Printing
    END_USER_IDENTITY |o--o{ CUSTOMER_ORDER : initiates
    CUSTOMER_ORDER ||--o| ORDER_CONTACT : captures_contact
    CUSTOMER_ORDER ||--|{ ORDER_ITEM : contains
    MENU_ITEM ||--o{ ORDER_ITEM : ordered_as
    ORDER_ITEM ||--o{ ORDER_ITEM_TOPPING : customizes
    TOPPING ||--o{ ORDER_ITEM_TOPPING : selected_as
    CUSTOMER_ORDER ||--o{ ORDER_STATUS_HISTORY : records
    PROMOTION_CODE ||--o{ PROMOTION_REDEMPTION : redeemed_in
    CUSTOMER_ORDER ||--o| PROMOTION_REDEMPTION : applies
    CUSTOMER_ORDER ||--o{ PAYMENT_TRANSACTION : has
    CUSTOMER_ORDER ||--o{ ORDER_PRINT_LOG : printed_as
    END_USER_IDENTITY |o--o{ ORDER_STATUS_HISTORY : requests

    %% Dine-in & Pickup
    DINING_TABLE ||--o{ TABLE_ASSIGNMENT : hosts
    CUSTOMER_ORDER ||--o{ TABLE_ASSIGNMENT : seats
    PICKUP_SLOT ||--o{ PICKUP_SCHEDULE : allocates
    CUSTOMER_ORDER ||--o| PICKUP_SCHEDULE : schedules

    %% Review & Notifications
    CUSTOMER_ORDER ||--o| ORDER_REVIEW : receives
    END_USER_IDENTITY ||--o{ WEB_PUSH_SUBSCRIPTION : subscribes
    CUSTOMER_ORDER |o--o{ NOTIFICATION_EVENT : context_for
    MENU_ITEM |o--o{ NOTIFICATION_EVENT : context_for
    NOTIFICATION_EVENT ||--|{ NOTIFICATION_RECIPIENT : delivers_to
    END_USER_IDENTITY |o--o{ NOTIFICATION_RECIPIENT : receives

    CUSTOMER_ACCOUNT {
        uuid customer_id PK
        string full_name NN
        string phone UK
        string email UK
        string account_status NN
        datetime created_at NN
        datetime updated_at
    }

    CUSTOMER_AUTH_IDENTITY {
        uuid identity_id PK
        uuid customer_id FK
        string provider NN
        string credential_key UK
        string password_hash
        boolean is_verified NN
        datetime last_login_at
        datetime created_at NN
    }

    CUSTOMER_PASSWORD_RESET_OTP {
        uuid reset_otp_id PK
        uuid customer_id FK
        string channel NN
        string otp_code_hash NN
        datetime expires_at NN
        datetime consumed_at
        datetime created_at NN
    }

    END_USER_IDENTITY {
        uuid end_user_identity_id PK
        uuid customer_id FK UK
        string guest_session_key UK
        string identity_type NN
        datetime created_at NN
        datetime last_seen_at
    }

    STAFF_ACCOUNT {
        uuid staff_id PK
        string employee_code UK
        string full_name NN
        string phone UK
        string email UK
        string password_hash NN
        boolean is_active NN
        datetime created_at NN
        datetime updated_at
    }

    ROLE {
        smallint role_id PK
        string role_code UK
        string role_name UK
    }

    STAFF_ROLE {
        uuid staff_role_id PK
        uuid staff_id FK
        smallint role_id FK
        datetime granted_at NN
    }

    MENU_CATEGORY {
        uuid category_id PK
        string category_name UK
        int display_order
        boolean is_active NN
    }

    MENU_ITEM {
        uuid menu_item_id PK
        uuid category_id FK
        string item_name NN
        decimal base_price NN
        string description
        string image_url
        string availability_status NN
        boolean is_active NN
    }

    MENU_ITEM_STATUS_LOG {
        uuid status_log_id PK
        uuid menu_item_id FK
        uuid changed_by_staff_id FK
        string old_status NN
        string new_status NN
        string change_reason
        datetime changed_at NN
    }

    TOPPING {
        uuid topping_id PK
        string topping_name UK
        decimal extra_price NN
        boolean is_active NN
    }

    MENU_ITEM_TOPPING {
        uuid menu_item_topping_id PK
        uuid menu_item_id FK
        uuid topping_id FK
    }

    PROMOTION_CODE {
        uuid promotion_id PK
        string code UK
        string discount_type NN
        decimal discount_value NN
        decimal min_order_amount
        int usage_limit_total
        int usage_limit_per_customer
        datetime valid_from NN
        datetime valid_to NN
        string status NN
    }

    CART {
        uuid cart_id PK
        uuid customer_id FK
        uuid applied_promotion_id FK
        string guest_session_key
        string service_type
        datetime created_at NN
        datetime updated_at NN
    }

    CART_ITEM {
        uuid cart_item_id PK
        uuid cart_id FK
        uuid menu_item_id FK
        int quantity NN
        decimal unit_price_snapshot NN
        string note
    }

    CART_ITEM_TOPPING {
        uuid cart_item_topping_id PK
        uuid cart_item_id FK
        uuid topping_id FK
        int quantity NN
        decimal extra_price_snapshot NN
    }

    CUSTOMER_ORDER {
        uuid order_id PK
        string order_code UK
        uuid customer_id FK
        uuid end_user_identity_id FK
        uuid created_by_staff_id FK
        string order_source NN
        string service_type NN
        int party_size
        string order_status NN
        string payment_status NN
        decimal subtotal_amount NN
        decimal discount_amount NN
        decimal total_amount NN
        datetime placed_at NN
        datetime completed_at
        datetime cancelled_at
        string cancellation_reason
    }

    ORDER_CONTACT {
        uuid order_contact_id PK
        uuid order_id FK UK
        string recipient_name NN
        string recipient_phone NN
        string recipient_email
        boolean is_guest_checkout NN
    }

    ORDER_ITEM {
        uuid order_item_id PK
        uuid order_id FK
        uuid menu_item_id FK
        int quantity NN
        decimal unit_price_snapshot NN
        string item_status NN
        string note
    }

    ORDER_ITEM_TOPPING {
        uuid order_item_topping_id PK
        uuid order_item_id FK
        uuid topping_id FK
        int quantity NN
        decimal extra_price_snapshot NN
    }

    ORDER_STATUS_HISTORY {
        uuid order_status_history_id PK
        uuid order_id FK
        uuid changed_by_staff_id FK
        uuid changed_by_end_user_identity_id FK
        string actor_type NN
        string from_order_status
        string to_order_status
        string from_payment_status
        string to_payment_status
        string change_reason
        datetime changed_at NN
    }

    PROMOTION_REDEMPTION {
        uuid redemption_id PK
        uuid promotion_id FK
        uuid order_id FK UK
        decimal discount_amount NN
        datetime redeemed_at NN
    }

    PAYMENT_TRANSACTION {
        uuid payment_id PK
        uuid order_id FK
        uuid processed_by_staff_id FK
        string payment_method NN
        string provider_code
        decimal amount NN
        decimal cash_received_amount
        decimal change_amount
        string transaction_status NN
        string gateway_reference UK
        datetime initiated_at NN
        datetime confirmed_at
        datetime expires_at
    }

    ORDER_PRINT_LOG {
        uuid print_log_id PK
        uuid order_id FK
        uuid printed_by_staff_id FK
        string document_type NN
        string trigger_source NN
        string print_status NN
        string device_name
        datetime printed_at NN
    }

    DINING_TABLE {
        uuid table_id PK
        string table_number UK
        string qr_token UK
        int capacity NN
        string area_name
        int layout_x
        int layout_y
        string table_status NN
        boolean is_active NN
    }

    TABLE_ASSIGNMENT {
        uuid assignment_id PK
        uuid order_id FK
        uuid table_id FK
        uuid assigned_by_staff_id FK
        uuid released_by_staff_id FK
        int party_size_snapshot NN
        datetime assigned_at NN
        datetime released_at
        string assignment_status NN
    }

    PICKUP_SLOT {
        uuid pickup_slot_id PK
        date slot_date NN
        time start_time NN
        time end_time NN
        int capacity_limit NN
        int current_bookings NN
        string slot_status NN
    }

    PICKUP_SCHEDULE {
        uuid pickup_schedule_id PK
        uuid order_id FK UK
        uuid pickup_slot_id FK
        uuid handled_by_staff_id FK
        datetime requested_pickup_at NN
        datetime actual_pickup_at
        string schedule_status NN
        string exception_reason
        datetime handled_at
    }

    ORDER_REVIEW {
        uuid review_id PK
        uuid order_id FK UK
        uuid customer_id FK
        int food_quality_score NN
        int service_speed_score NN
        int overall_experience_score NN
        string comment
        string moderation_status NN
        uuid moderated_by_staff_id FK
        datetime moderated_at
        string hidden_reason
        datetime reviewed_at NN
    }

    WEB_PUSH_SUBSCRIPTION {
        uuid push_subscription_id PK
        uuid end_user_identity_id FK
        string endpoint UK
        string p256dh_key NN
        string auth_secret NN
        string browser_name
        boolean is_active NN
        datetime granted_at NN
        datetime revoked_at
    }

    NOTIFICATION_EVENT {
        uuid notification_id PK
        uuid order_id FK
        uuid menu_item_id FK
        string event_scope NN
        string event_type NN
        string title NN
        string message NN
        datetime created_at NN
    }

    NOTIFICATION_RECIPIENT {
        uuid notification_recipient_id PK
        uuid notification_id FK
        uuid end_user_identity_id FK
        uuid staff_id FK
        string recipient_type NN
        string channel NN
        string delivery_status NN
        datetime delivered_at
        datetime read_at
    }
```
