# BUSINESS REQUIREMENTS DOCUMENT
## Order Management, Payment & Revenue Analytics System — Wonton Noodle Shop
### Wonton POS

---

## Final-Project Supersession Note (2026-04-16)

`BRD_Ver0_EN.md` was created for the earlier midterm-oriented package. For final-project scope, use `Final_Project_Scope.md` and `All_Use_Cases.md` as the active baseline until a final BRD / SRS package replaces this file.

---

## Version and Approvals

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.0 | 03/09/2026 | Team [Team Name] | Initial draft – Project Description |
| 0.1 | 03/11/2026 | Team [Team Name] | Refine Actors (5 roles), add Guest Checkout / Pickup, add FR-12~13 (Rating, Notification), NFR-06~07, update Scope |

### TEAM

| Member's Name | Student ID | Project Role | Signature Approval | Date |
|--------------|-----------|-------------|-------------------|------|
| Nguyen Thi Hai My | 2301040126 | Business Analyst | | |
| Nguyen Dat Vinh | 2301040198 | Project Lead / System Analyst | | |
| Vuong Gia Ly | 2301040113 | Business Analyst | | |
| Nguyen Minh Duc | 2301040048 | System Analyst | | |
| Dang Khanh Huyen | 2301040088 | Business Analyst | | |
| Le Thanh Dat | 2301040036 | System Analyst | | |
| Nguyen Dinh Chien | 2301040025 | QA / Documentation | | |
| Nguyen Thien Hieu | 2301040071 | System Analyst | | |

---

## Table of Contents

1. Version and Approvals
2. Project Details
3. Overview
4. Document Resources
5. Glossary of Terms
6. Project Overview
   - 4.1 Project Overview and Background
   - 4.2 Project Dependencies
   - 4.3 Stakeholders
7. Key Assumptions and Constraints
8. Scope Definition (In-Scope & Out-of-Scope)
9. Functional Requirements
10. Non-functional Requirements
11. Canonical Order State Model
12. Use Cases
13. Appendixes

---

## Project Details

| Field | Value |
|-------|-------|
| **Project Name** | Wonton POS – Order Management, Payment & Revenue Analytics System for Wonton Noodle Shop |
| **Project Type** | New Initiative |
| **Project Start Date** | 03/03/2026 |
| **Project End Date** | 06/15/2026 |
| **Project Sponsor** | Nguyen Quang Anh – CEO, HongKong A Hai Crispy Roast Duck Restaurant |
| **Primary Driver** | Efficiency – Optimize restaurant operations workflow |
| **Secondary Driver** | Revenue Growth – Increase revenue through a dedicated online ordering channel |
| **Division** | Faculty of Information Technology |
| **Project Manager** | Nguyen Dat Vinh (2301040198) |

---

## Overview

This document defines the high-level requirements for the **Wonton POS** project – an Order Management, Payment, and Revenue Analytics System for a wonton noodle shop. It will be used as the basis for the following activities:

- Creating solution designs
- Developing test plans, test scripts, and test cases
- Determining project completion
- Assessing project success

---

## Document Resources

| Name | Business Unit | Role | Proposed Elicitation Techniques |
|------|--------------|------|-------------------------------|
| Nguyen Quang Anh | HongKong A Hai Crispy Roast Duck Restaurant | Stakeholder - CEO | Interview, Questionnaire, Meeting, Observation |

---

## Glossary of Terms

| Term / Acronym | Definition |
|----------------|-----------|
| BRD | Business Requirements Document – A formal document outlining business needs and requirements |
| POS | Point of Sale – A system used to manage customer orders, payments, and operational transactions at the point of service |
| UC | Use Case – A description of a system's behavior in response to a request from an actor |
| FR | Functional Requirement – A requirement specifying what the system should do |
| NFR | Non-Functional Requirement – A requirement specifying how the system should perform |
| Wonton POS | System name, derived from "Wonton" + POS |
| Admin WebApp | Web application for restaurant staff (Manager, Cashier, Server, Kitchen) |
| Client WebApp | Web application for customers to order online |
| Order | A customer's request containing a list of menu items, toppings, and special notes |
| Menu Item | A dish on the restaurant's menu (e.g., Dry Wonton Noodles, Wonton Soup…) |
| Topping | Additional ingredients for a dish (e.g., Extra wontons, Extra char siu pork…) |
| Dine-in | Customer eats at the restaurant |
| Takeaway | Customer purchases food to go |
| Pickup | Scheduled order for later collection – customer orders in advance, selects a pickup time, the system validates slot capacity and auto-accepts if service capacity is available, pays online |
| Guest Checkout | Allows customers to place orders using only Name and Phone Number without creating an account; guest customers can later track orders using Order Code and Phone Number |
| FOH Staff | Front-of-House Staff – Includes Cashier and Server roles |
| BOH Staff | Back-of-House Staff – Kitchen staff |
| KDS | Kitchen Display System – Screen displaying orders in the kitchen |
| Table QR Code | A fixed QR code sticker on each table, encoding a URL `{domain}/order?table={table_id}` so Dine-in customers can scan and place orders linked to the correct table |
| QR Payment | Payment via QR code scanning through banking applications |
| Dashboard | A control panel displaying an overview of revenue data and shop activities |
| Real-time | Data is updated instantly without manual refresh |
| Responsive | UI automatically adjusts to screen size (desktop, tablet, mobile) |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security – Encryption protocols for secure data transmission |
| CRUD | Create, Read, Update, Delete – Basic data manipulation operations |
| API | Application Programming Interface – A set of protocols for building and integrating application software |
| Order Tracking Code | Order identifier used by guest customers together with their phone number to track an order |
| Multi-role | Support assigning multiple roles to a single staff account (e.g., both FOH and BOH) |
| CCU | Concurrent Users – Number of users accessing the system simultaneously |

---

## Project Overview

### 4.1 Project Overview and Background

#### Current Situation

The wonton noodle shop currently operates as a medium-sized business (1–2 locations), serving an average of 150–300 orders per day with a team of 4–8 staff members. The shop is already present on food delivery platforms (GrabFood, ShopeeFood) but **does not have its own internal management system**.

All operational processes are currently **manual**:
- In-store orders are recorded on paper or by verbal memory
- Information between the cashier and kitchen is communicated verbally
- Revenue is tallied manually at the end of each day
- No analytical data exists regarding sales trends

#### Problem

1. **Order Errors:** Manual recording leads to incorrect items, wrong quantities, and lost orders
2. **Disconnected Workflow:** No integration between cashier, kitchen, and service staff, causing long customer wait times
3. **Lack of Business Data:** No visibility into best-selling items, peak hours, or actual revenue figures
4. **Dependency on Third-Party Platforms:** GrabFood/ShopeeFood charge 20–30% commission fees; the shop has no independent ordering channel
5. **Inaccurate Revenue Tracking:** End-of-day manual tallying is error-prone and unreliable

#### Objectives

Build the **Wonton POS System** consisting of 2 components:
- **Client WebApp:** Enables customers (registered or guest) to order food online, browse the menu, make payments, schedule pickup orders, rate completed orders, and receive real-time notifications — reducing dependency on third-party platforms
- **Admin WebApp:** Enables the shop to manage digitized orders, process multi-channel payments, manage menu & tables, generate automated revenue reports, and manage multi-role staff — improving operational efficiency

### 4.2 Project Dependencies

| # | Dependency | Description |
|---|-----------|-------------|
| 1 | Online Payment Gateway | The system depends on APIs from MoMo, VNPay, or ZaloPay to process electronic payments |
| 2 | Hosting/Cloud Service | A server is required to deploy the web system (e.g., AWS, Heroku, Vercel) |
| 3 | Internet Connection | The shop requires a stable Internet connection for the system to function |
| 4 | Hardware Devices | The shop needs at least 1 computer/tablet for the cashier and 1 display screen for the kitchen |
| 5 | Receipt Printer | A thermal printer is needed for printing customer bills and kitchen order tickets (if applicable) |

### 4.3 Stakeholders

| # | Stakeholders |
|---|-------------|
| 1 | **Nguyen Quang Anh** – Stakeholder / CEO of **HongKong A Hai Crispy Roast Duck Restaurant**. This is the primary stakeholder who provides business direction, operational context, and feedback for the system. |

---

## (Optional) Key Assumptions and Constraints

### 5.1 Key Assumptions

| # | Assumptions |
|---|------------|
| A1 | The system is developed as a web-based application, accessible through browsers, requiring no separate application installation on devices |
| A2 | Customers place online orders through the Client WebApp on their phone/computer browser, not through a native mobile app |
| A3 | The shop currently does not use any POS (Point of Sale) system or management software |
| A4 | The system processes Dine-in, Takeaway, and Pickup orders. Delivery functionality is currently out of scope for the Wonton POS project. |
| A5 | The shop has a stable Internet connection at all operating locations. If connectivity is lost, the KDS and POS cannot update in real-time; the shop must fall back to manual processes (paper-based) until Internet is restored. The system does not provide an offline mode within the project scope |
| A6 | Shop staff have basic computer/tablet proficiency |
| A7 | The system interface language is Vietnamese |

### 5.2 Key Constraints

| # | Constraints |
|---|------------|
| C1 | The project must be completed within **1 academic semester** (approximately 15 weeks) |
| C2 | The development team consists of **8 students**, with limited manpower and practical experience |
| C3 | Development budget is **zero** (academic project), therefore open-source technologies and free-tier services are prioritized |
| C4 | The system does not require actual production deployment; it is at the **prototype/demo** level |
| C5 | Online payment gateway integration (MoMo, VNPay, ZaloPay) will use **sandbox/test environments**, not processing real transactions |
| C6 | The system must be compatible with popular browsers (Chrome, Safari, Firefox) on both desktop and mobile devices |

---

## 8. Scope Definition (In-Scope & Out-of-Scope)

### 8.1 In-Scope
 **Midterm note:** Although the full Wonton POS system contains **74 UCs**, this midterm BRD selects only **16 core UCs for detailed use case specifications**. To make the midterm deliverable easier to follow, the selected set is **renumbered locally from UC-01 to UC-16**; the Original UC column below maps each midterm UC back to the 74-UC system.

**Final-project note (2026-04-16):** Do not use this 16-UC table as the final scope. Final scope follows `Final_Project_Scope.md` and `All_Use_Cases.md`.

| Midterm UC ID | Midterm UC Name | Original UC |
|---|---|---|
| UC-01 | Place Online Order | UC-09 |
| UC-02 | Online Payment | UC-13 |
| UC-03 | Schedule Pickup Order | UC-21 |
| UC-04 | View Order History | UC-16~17 |
| UC-05 | Manage Menu | UC-26~31 |
| UC-06 | Manage Staff | UC-37~40 |
| UC-07 | View Revenue Statistics | UC-41 |
| UC-08 | Manage Tables | UC-32~36 |
| UC-09 | Create In-Store Order | UC-49 |
| UC-10 | Process Payment | UC-54~56 |
| UC-11 | Track Order | UC-15 |
| UC-12 | Assign Order to Table | UC-59~60 |
| UC-13 | Receive Kitchen Orders | UC-62~63 |
| UC-14 | Update Dish Status | UC-65~66 |
| UC-15 | Rate Order | UC-20 |
| UC-16 | Receive Order Notifications | UC-24 |

The midterm scope includes:
- Online ordering, online payment, order tracking, and order notifications.
- Pickup scheduling with valid timeslot checks.
- Order history review and post-completion order rating.
- Menu, staff, table, and revenue management.
- Counter order creation, payment processing, and table assignment.
- Kitchen order intake and dish status updates on the KDS.
- Account functions: registration, login, password recovery, profile update, and password change (**must appear in the overall Use Case Diagram**, even though they are not part of the 16 UCs with detailed specifications).

### 8.2 Out-of-Scope
Beyond the selected UC set above, the following functions are **out of scope for the midterm BRD**:
- All remaining UCs outside the selected 16 midterm UCs, except the mandatory account functions listed in the In-Scope section.
- Promotions / discount code management.
- Delivery and GrabFood / ShopeeFood integrations.
- Detailed inventory handling, automatic recipe-based stock deduction, and advanced batch/capacity optimization outside the selected 16 UCs. Manual 86'd marking and grouped KDS batch updates remain in scope for the selected midterm UCs.
- Payroll / timesheets.
- Loyalty program.
- Native mobile app.
- Merge Tables: combining multiple physical tables into one service group.
- Split Bill: dividing a single order into separate invoices for individual guests at the same table. The system supports settling all orders on a table at once or settling each order individually, but does not split within a single order.
- Combo / Set meal: bundling multiple items into a discounted package.
- Free Item / Buy-One-Get-One promotions: the baseline supports only percentage and fixed-amount discounts. Promotions that add a free item to the order or BOGO-style promotions must be promoted through a new ADR before entering scope.

---
## 9. Functional Requirements

| REQ# | PRIORITY | DESCRIPTION | RATIONALE | USE CASE |
|---|---|---|---|---|
| FR-01 | Critical | The system shall allow customers to place online orders through the Client WebApp by browsing the menu, adding items to the cart, selecting a supported service model (`Dine-in`, `Takeaway`, or `Pickup`), and proceeding as either a registered customer or a guest according to the payment rule of the selected service model. | This capability supports the primary customer ordering flow while enforcing the defined service-model rules within the selected midterm scope. | UC-01 |
| FR-02 | Critical | The system shall support online payment for prepaid orders and shall allow Takeaway and Pickup orders to proceed only after a valid payment is confirmed. | This capability enforces the required prepayment rule for Takeaway and Pickup orders. | UC-02 |
| FR-03 | High | The system shall allow customers to place Pickup orders for a selected time slot and shall validate slot availability and service capacity before automatically accepting the order. | This capability supports the Pickup service model and prevents overbooking during peak periods. | UC-03 |
| FR-04 | Medium | The system shall allow registered customers to view their order history and view the details of a selected past order. | This capability supports post-purchase visibility for registered customers within the selected midterm scope. | UC-04 |
| FR-05 | Critical | The system shall allow Managers to create, update, archive/deactivate, and change the availability status of menu items. | This capability is required for effective day-to-day menu administration while preserving historical order/reporting data. | UC-05 |
| FR-06 | High | The system shall allow Managers to create, update, deactivate employee accounts, and assign one or more roles to each employee account. | This capability supports staff administration and the project's multi-role operating model. | UC-06 |
| FR-07 | Medium | The system shall allow Managers to view revenue statistics, top-selling items, and peak-hour analytics using time-based filters and optional payment-method filters, and shall support report export for the selected reporting context. | This capability provides the reporting data needed for operational monitoring and business review. | UC-07 |
| FR-08 | High | The system shall allow Managers to maintain table master data, including creating, updating, deleting, and viewing the table layout and usage status, and shall allow FOH Staff to view the table layout and usage status for dine-in operations. | This capability is required to keep table configuration under managerial control while still supporting dine-in seating and counter operations. | UC-08 |
| FR-09 | Critical | The system shall allow FOH Staff to create walk-in orders at the counter for dine-in or takeaway customers. | This capability supports a mandatory counter-based POS workflow in scope. | UC-09 |
| FR-10 | Critical | The system shall allow FOH Staff to process counter payments using cash, QR payment, or supported online payment flows according to the applicable service rules. | This capability is required to complete in-store transactions under the defined service rules. | UC-10 |
| FR-11 | High | The system shall allow customers to track the current status of an order, and shall allow guest customers to retrieve order status using Order Code and Phone Number. | This capability supports post-checkout visibility for both registered and guest customers. | UC-11 |
| FR-12 | High | The system shall allow FOH Staff to assign or transfer a dine-in order to a specific table, including attaching additional orders to an already active table for the same party. | This capability is required to link dine-in orders to the correct table for service delivery and realistic add-on ordering. | UC-12 |
| FR-13 | High | The system shall allow BOH Staff to receive new orders on the KDS in operational sequence and change accepted orders to the Cooking status. | This capability starts the kitchen processing workflow and preserves operational order. | UC-13 |
| FR-14 | High | The system shall allow BOH Staff to update item or order preparation status to Ready for serving or handoff. | This capability supports timely coordination between kitchen, service staff, and customers. | UC-14 |
| FR-15 | Medium | The system shall allow registered customers to submit a review for a completed order within the permitted review period. | This capability captures structured customer feedback after order completion. | UC-15 |
| FR-16 | High | The system shall send real-time order notifications to customers when order status changes and shall store notification history for later review. | This capability supports real-time order communication and notification traceability. | UC-16 |

---

## 10. Non-functional Requirements

| REQ# | PRIORITY | DESCRIPTION | RATIONALE | USE CASE |
|---|---|---|---|---|
| NFR-01 | High | The system shall return responses for core user actions, including ordering, payment, counter order creation, and order tracking, within 2 seconds under normal operating conditions. | This constraint is required to keep customer and staff workflows responsive during normal operations. | UC-01, UC-02, UC-09, UC-10, UC-11 |
| NFR-02 | Critical | The system shall target at least 99% application/cloud availability during the restaurant's operating hours, excluding local internet outages, power loss, and the manual paper fallback used when the shop loses connectivity. | This constraint is required to support reliable operations while still matching the explicit no-offline-mode assumption. | Entire 16-UC midterm scope |
| NFR-03 | Critical | The system shall protect passwords using secure hashing, shall encrypt data in transit using HTTPS/TLS, shall enforce role-based access control for employee functions, and shall authenticate payment API interactions. | This constraint is required because the system handles payments and role-restricted functions. | UC-02, UC-06, UC-10 |
| NFR-04 | High | The system shall provide a responsive Client WebApp for mobile and desktop devices and shall optimize the Admin WebApp for tablet and desktop use. | This constraint is required because the in-scope use cases are performed across multiple device types. | UC-01, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08, UC-09, UC-10, UC-11, UC-12, UC-13, UC-14, UC-15, UC-16 |
| NFR-05 | Medium | The system shall support at least 200 concurrent users without significant service degradation. | This constraint provides sufficient capacity for the expected demo scope and realistic restaurant workload. | UC-01, UC-02, UC-09, UC-11, UC-16 |
| NFR-06 | High | The system shall deliver order status updates and notifications to connected clients within 3 seconds of a status change. | This constraint is required for timely coordination across customers, FOH Staff, and BOH Staff. | UC-11, UC-13, UC-14, UC-16 |
| NFR-07 | Medium | The system shall provide user interfaces with clear typography, a minimum color contrast ratio of 4.5:1, and touch-friendly interaction for supported devices. | This constraint is required because the system is used on phones, tablets, and POS terminals. | UI-facing UCs within the selected 16 midterm UCs |

---
## 11. Canonical Order State Model

To avoid contradictions across flows, the system uses **two independent status axes**: `order_status` and `payment_status`.

### 11.1 Order Status

| Order Status | Meaning | Notes |
|--------------|---------|-------|
| `Pending Confirmation` | The order has been created validly and is waiting for FOH/BOH intake | Used for online orders after payment succeeds or where prepayment is not required |
| `Cooking` | The kitchen has accepted the order and is preparing it | Displayed on the KDS in FIFO order |
| `Ready` | The item/order is ready to be served or handed to the customer | Triggers staff/customer notifications |
| `Completed` | The customer has received the food / service is finished | Dine-in: Server taps "Delivered"; Takeaway/Pickup: Cashier taps "Customer Picked Up". May still be paired with `Unpaid` for Dine-in |
| `Cancelled` | The order has been cancelled by customer, staff, or payment timeout | No further processing is allowed |

### 11.2 Payment Status

| Payment Status | Meaning | Notes |
|----------------|---------|-------|
| `Pending Online Payment` | Waiting for a payment gateway callback, a valid manual confirmation for bank-transfer QR payment, or another payment-method retry on the same order | If it exceeds 15 minutes for prepayment-required flows, the order becomes `Cancelled` |
| `Unpaid` | Order is unpaid but still valid for the next payment-collection step | Valid for Dine-in and selected counter-created flows such as a Takeaway order just created by the Cashier before immediate settlement |
| `Paid` | Order has been fully paid | Mandatory before Takeaway/Pickup enters kitchen operations |
| `Refund Pending` | A refund request has been created and is awaiting processing | Occurs when a `Paid` order is `Cancelled`, or when a late successful payment arrives after the order is already `Cancelled`; Manager approval/review required |
| `Refunded` | Refund has been completed | Confirmed via payment gateway callback or Manager manual confirmation |
| `Write-off` | Dine-in customer left premises without paying | Cashier marks, Manager confirms; this is a manager-approved loss-recording state, not successful payment, and is included in the end-of-day loss report |
| `Comp` | Shop proactively comps the order (goodwill, serious error, VIP) | Manager approval with reason required. Applies to orders in `Cooking`/`Ready`/`Completed`; orders still in `Pending Confirmation` must use `Cancelled` instead. If the order was already `Paid`, `Comp` triggers a full refund (through `Refund Pending` → `Refunded`) and the amount is reclassified as comp expense, not regular revenue. Reported separately from `Write-off` and `Refunded` (ADR-023). |
| `Forfeited` | Paid order where the customer never collected, and Manager decided to retain the payment | Applies to Takeaway/Pickup in `Paid` + `Ready` where the customer did not arrive within the holding window. Manager approval with reason. Reported on a dedicated line in shift-close reports (ADR-024). |

### 11.3 Service-Model Rules

- **Dine-in:** May follow `Pending Confirmation - Cooking - Ready - Completed` while `payment_status` remains `Unpaid`; settlement happens later at the counter.
- **Takeaway:** Can only be pushed to the kitchen when `payment_status = Paid`. If the customer orders at the counter, the Cashier may collect payment immediately at the counter via cash/QR before pushing the order to the kitchen. If the customer creates the order online, unpaid online Takeaway orders are auto-cancelled after 15 minutes. Counter Takeaway orders are controlled directly by the Cashier and are exempt from auto-cancel.
- **Pickup:** The system must validate the requested timeslot first. If payment is completed within 15 minutes and the slot remains available, the order moves to `Pending Confirmation`; otherwise it becomes `Cancelled`. After the kitchen marks the order `Ready`, the order remains `Ready` until the customer actually collects it; late/no-show pickup cases are handled by the Manager as an operational exception rather than auto-transitioning to `Completed` or `Refunded`.
- **Repeated online payment failure:** For prepaid online orders, the customer may retry multiple payment methods on the same order within the order-hold window; the order must not enter kitchen operations until valid payment is confirmed. If every method still fails until the hold window expires, the order auto-transitions to `Cancelled`.
- **Customer abandonment at the counter:** For counter-created Takeaway orders, if the customer walks away before paying, the Cashier cancels the unpaid order manually; if staff mistakenly pushed the order to the kitchen, the Manager confirms the cancellation reason and records the loss internally.
- **Order modification after submission:** Before the kitchen accepts the order, FOH/Cashier may edit it; for paid orders, any positive difference must be collected before kitchen intake, while negative differences go through a partial-refund flow. After kitchen acceptance, only the Manager may handle exceptions; added Dine-in items are created as a new order on the same table.
- **86'd on existing orders:** 86'd locks the item for new orders, but it must not silently ignore queued or already paid orders that still contain the item. Those orders must be flagged so FOH/Manager can decide on substitution, partial refund, or full cancellation.
- **Late callback / duplicate transaction:** A late successful payment callback after auto-cancel must not reopen the order or push it to the kitchen; the system moves it into refund handling. Repeated callbacks or duplicate payment signals must be handled idempotently and must not create duplicate kitchen tickets.
- **Wrong handoff / mistaken completion:** If staff marked `Completed` by mistake before the customer actually received the correct order, Manager/FOH may revert it back to `Ready` within the same shift with an audit log. If a wrong handoff causes actual loss, the Manager handles remake / refund / write-off according to operations.
- **Overdue Takeaway pickup:** A `Ready` Takeaway order that the customer has not collected remains `Ready` and is flagged as overdue in the same spirit as Pickup; it must not auto-complete or auto-refund.
- **Shift closing / reconciliation:** Before closing a shift, the system must warn or block final confirmation if unresolved `Refund Pending`, unapproved `Write-off`, overdue `Ready`, or open payment/handoff incidents still exist.






