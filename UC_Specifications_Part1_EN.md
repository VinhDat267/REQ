# Use Case Assignment & Specifications — Midterm Phase 2

## Use Case Assignment (8 members × 2 UCs = 16 UCs)
> **UC numbering:** In the midterm document set, the 16 selected UCs are **renumbered locally from `UC-01` to `UC-16`** for readability. Use the table and mapping to trace each one back to the original 74-UC system.

> **Final BRD v3 note (2026-04-17):** The existing `UC-01..UC-16` set is now preserved as the prefix of the local final BRD lane. When the team expands the final BRD, it should continue with `UC-17+` instead of remapping these visible IDs to the original master inventory inside the main BRD narrative.
> **Ownership note:** The `8 members x 2 UCs` assignment table below is now historical midterm context only. For `BRD final v3`, the team is working on one shared document rather than splitting the final BRD into fixed per-member `2 UC` ownership blocks.


| # | Student ID | Member | UC #1 | Original UC | UC #2 | Original UC |
|---|-----------|--------|-------|-------------|-------|-------------|
| 1 | 2301040126 | Nguyen Thi Hai My | UC-01: Place Online Order | UC-09 | UC-07: View Revenue Statistics | UC-41 |
| 2 | 2301040198 | Nguyen Dat Vinh | UC-09: Create In-Store Order | UC-49 | UC-08: Manage Tables | UC-32~36 |
| 3 | 2301040113 | Vuong Gia Ly | UC-02: Online Payment | UC-13 | UC-06: Manage Staff | UC-37~40 |
| 4 | 2301040048 | Nguyen Minh Duc | UC-10: Process Payment | UC-54~56 | UC-03: Schedule Pickup Order | UC-21 |
| 5 | 2301040088 | Dang Khanh Huyen | UC-05: Manage Menu | UC-26~31 | UC-04: View Order History | UC-16~17 |
| 6 | 2301040036 | Le Thanh Dat | UC-15: Rate Order | UC-20 | UC-13: Receive Kitchen Orders | UC-62~63 |
| 7 | 2301040025 | Nguyen Dinh Chien | UC-14: Update Dish Status | UC-65~66 | UC-12: Assign Order to Table | UC-59~60 |
| 8 | 2301040071 | Nguyen Thien Hieu | UC-16: Receive Order Notifications | UC-24 | UC-11: Track Order | UC-15 |

> **Note:** No two members share the same UC. Each UC is sufficiently complex (Normal Flow ≥ 4 steps, with clear Alternative Flows and Exceptions).

---

## Detailed UC Specifications

---

### 🔹 Nguyen Thi Hai My (2301040126)

#### UC-01: Place Online Order

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-01: Place Online Order |
| **Primary Actor** | Customer (Registered / Guest) |
| **Description** | The customer uses the Client WebApp to browse the menu, add items to the cart, select a service model, and create an online order according to the business rule of the selected service model. |
| **Trigger** | The customer selects "Order Now" or "View Menu" on the homepage. |
| **Pre-conditions** | 1. The Client WebApp is available for ordering. 2. The menu contains at least one item with status `Available`. 3. The selected service model is within the supported scope: `Dine-in`, `Takeaway`, or `Pickup`. |
| **Post-conditions** | **Success:** An online order is created with the correct service model and order details. If the order is `Dine-in`, the order is created as a valid unpaid order with `payment_status = Unpaid`, the order code is displayed, and the customer is taken to the order-tracking screen. If the order is `Takeaway`, the order is created under the mandatory prepayment rule and the customer is routed to the payment flow before kitchen release. If the order is `Pickup`, the customer is routed to UC-03 for slot validation and mandatory prepayment before the order can continue. **Failure:** No incomplete or unintended order is committed, the existing cart content is preserved unless the customer changes it, and the system displays the appropriate error message. |
| **Normal Flow** | 1.1. The customer selects "Order Now" or "View Menu". |
| | 1.2. The customer selects a menu category. |
| | 1.3. The system displays the items in the selected category with their basic details. |
| | 1.4. The customer selects an item. |
| | 1.5. The system displays the item details, allowing the customer to choose quantity, toppings, and special notes. |
| | 1.6. The customer adds the selected item to the cart. |
| | 1.7. The system updates the cart and displays the current item count and total amount. |
| | 1.8. The customer selects the service model (`Dine-in` / `Takeaway` / `Pickup`). |
| | 1.9. If the customer proceeds as a guest, the customer enters Name and Phone Number for Guest Checkout. |
| | 1.10. The customer selects "Place Order". |
| | 1.11. The system validates that the cart contains at least one item and creates the order according to the selected service model. |
| | 1.12. If the service model is `Dine-in`, the system creates the order with `payment_status = Unpaid`, displays the order code, and opens the order-tracking screen. |
| | 1.13. If the service model is `Takeaway`, the system routes the customer to the mandatory payment flow before kitchen release. |
| **Alternative Flows** | 2a. Add more items: After step 1.7, the customer continues browsing the menu and repeats steps 1.2-1.7 until the cart is complete. |
| | 2b. Edit cart: Before step 1.10, the customer updates quantities or removes items in the cart. The system refreshes the cart total and the flow continues at step 1.8. |
| | 2c. Registered checkout: At step 1.9, if the customer is already authenticated, Guest Checkout data entry is skipped and the flow continues at step 1.10. |
| | 2d. Pickup order: At step 1.8, the customer selects `Pickup`. At step 1.11, the system routes the customer to UC-03 for slot validation and mandatory prepayment. |
| | 2e. Additional Dine-in order: The customer who is already eating at the restaurant re-scans the table QR or selects "Order More" on the Client WebApp. The system creates a new order linked to the same table, and the flow continues from step 1.2. The new order keeps `payment_status = Unpaid` and is pushed to the kitchen immediately. |
| **Exceptions** | E1. Item unavailable: At step 1.4 or 1.5, if the selected item is no longer available, the system displays an out-of-stock message and keeps the customer on the menu/item-selection flow so another item can be selected. |
| | E2. Empty cart: At step 1.11, if the cart does not contain any item, the system rejects the order request, displays an empty-cart message, and keeps the customer on the ordering flow so items can be added. |
| **Priority** | Critical |

---
#### UC-07: View Revenue Statistics

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-07: View Revenue Statistics |
| **Primary Actor** | Manager (Shop Owner) |
| **Description** | The Manager uses the Admin WebApp to review revenue statistics, top-selling items, and peak-hour analytics by applying time-based and optional payment-method filters. |
| **Trigger** | The Manager selects "Statistics & Reports" in the Admin WebApp. |
| **Pre-conditions** | 1. The Manager is authenticated with permission to access revenue analytics. 2. The analytics module is available. 3. Completed-order data has been recorded for reporting, even if the selected filter may return no result. |
| **Post-conditions** | **Success:** The requested revenue statistics are displayed using charts and/or data tables for the selected filters, and any requested export file is generated for download. **Failure:** No reporting data is changed, the last valid filter context is preserved, and the system displays the appropriate no-data or loading-error message. |
| **Normal Flow** | 1.1. The Manager opens "Statistics & Reports". |
| | 1.2. The system displays the dashboard overview, including today's revenue, today's order count, and average order value. |
| | 1.3. The Manager selects a time range (`Today` / `This Week` / `This Month` / `Custom`). |
| | 1.4. The system refreshes the revenue chart for the selected time range. |
| | 1.5. The Manager opens the Top Selling Items section. |
| | 1.6. The system displays the top 10 best-selling items with quantities and revenue values. |
| | 1.7. The Manager opens the Peak Hours section. |
| | 1.8. The system displays order-volume analytics by time slot for the selected period. |
| **Alternative Flows** | 2a. Filter by payment method: After step 1.4, 1.6, or 1.8, the Manager selects a payment-method filter (`Cash` / `QR` / `Online`). The system refreshes the displayed analytics data for the current time range. |
| | 2b. Export report: After step 1.4, 1.6, or 1.8, the Manager selects "Export Report". The system generates a PDF or Excel file for the current report context and starts the download. |
| **Exceptions** | E1. No data for selected filters: At step 1.2, 1.4, 1.6, or 1.8, if the selected time range or applied filters return no completed-order data, the system displays "No data available for the selected time period" and keeps the Manager on the analytics screen so another filter can be selected. |
| | E2. Analytics loading failure: At step 1.4, 1.6, or 1.8, if the analytics data cannot be loaded, the system displays "Unable to load data. Please try again" and preserves the last valid report state. |
| **Priority** | High |

---

### 🔹 Nguyen Dat Vinh (2301040198)

#### UC-09: Create In-Store Order

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-09: Create In-Store Order |
| **Primary Actor** | Front-of-House Staff (FOH Staff) |
| **Description** | FOH Staff use the Admin WebApp to create a walk-in order at the counter for Dine-in or Takeaway service. The FOH Staff selects the service type, adds items to the order, assigns a table when the order is Dine-in, and continues the order according to the payment rule of the selected service model. |
| **Trigger** | The FOH Staff selects "Create New Order" in the Admin WebApp. |
| **Pre-conditions** | 1. The FOH Staff is authenticated with permission to create in-store orders. 2. The menu is available for ordering. 3. For Dine-in orders, at least one table can be viewed for assignment from the current table layout. |
| **Post-conditions** | **Success:** A new in-store order is created. If the order is Dine-in, the order is linked to the selected table, the table status is updated to `Occupied`, the kitchen ticket is sent immediately, and the order may remain valid with `payment_status = Unpaid`. If the order is Takeaway, the order is created with `payment_status = Pending Online Payment`, the FOH Staff is routed to the payment flow, and the kitchen ticket is not sent before payment succeeds. Counter Takeaway orders are exempt from the 15-minute auto-cancel because the Cashier controls the flow directly; the Cashier may cancel manually if the customer abandons the transaction. **Failure:** No incomplete or unintended order is committed, no table assignment is applied incorrectly, and the system displays the appropriate error message. |
| **Normal Flow** | 1.1. The FOH Staff opens "Create New Order". |
| | 1.2. The system displays the in-store order form with service-type options. |
| | 1.3. The FOH Staff selects the service type. |
| | 1.4. If the selected service type is Dine-in, the FOH Staff selects a table from the current table layout. |
| | 1.5. The system displays the menu. |
| | 1.6. The FOH Staff selects items, quantities, toppings, and notes, then adds the selected items to the order. |
| | 1.7. The FOH Staff reviews the order details and total amount. |
| | 1.8. The FOH Staff confirms the order. |
| | 1.9. If the order is Dine-in, the system creates the order, links it to the selected table, updates the table status to `Occupied`, sends the kitchen ticket, and displays a success message. |
| | 1.10. If the order is Takeaway, the system creates the order with `payment_status = Pending Online Payment` and routes the FOH Staff to the payment flow. |
| **Alternative Flows** | 2a. Takeaway order: At step 1.3, the FOH Staff selects "Takeaway". The table-selection step is skipped, and the flow continues at step 1.5. |
| | 2b. Add more items: After step 1.6, the FOH Staff continues selecting additional items before proceeding to step 1.7. |
| | 2c. Additional order for an occupied table: At step 1.4, the FOH Staff selects a table with status `Occupied` (already has a prior order). The system allows creating a new order linked to the same table. The table remains `Occupied`. The flow continues at step 1.5. |
| **Exceptions** | E1. Table unavailable: At step 1.4, if the selected table is not available for assignment, the system displays an unavailable-table message and keeps the FOH Staff on the table-selection step so another table can be selected. |
| | E2. Item unavailable: At step 1.6, if a selected item is out of stock or otherwise unavailable, the system displays an item-unavailable message and keeps the FOH Staff on the menu so another item can be selected. |
| | E3. Empty order: At step 1.8, if no item has been added to the order, the system rejects the confirmation request, displays an empty-order message, and keeps the FOH Staff on the order form so items can be added. |
| **Priority** | Critical |

---
#### UC-08: Manage Tables

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-08: Manage Tables |
| **Primary Actor** | Manager |
| **Description** | The Manager manages dine-in table master data in the Admin WebApp by viewing the current table layout and usage status, then adding, editing, or deleting table records. This use case governs table configuration at the layout level. FOH Staff may view the table layout and usage status for dine-in operations, but configuration actions in this use case remain Manager-only. |
| **Trigger** | The Manager selects "Table Management" in the Admin WebApp. |
| **Pre-conditions** | 1. The Manager is authenticated with permission to manage tables. 2. The table-management module is available and the current table layout/status can be loaded, even if no table records exist yet. |
| **Post-conditions** | **Success:** The requested table record is created, updated, or deleted; the latest layout and usage status are refreshed and displayed. **Failure:** No unintended table data change is committed; the system preserves the last committed valid table data and shows the appropriate error message. |
| **Normal Flow** | 1.1. The Manager opens "Table Management". |
| | 1.2. The system displays the current table layout together with each table's usage status. |
| | 1.3. The Manager selects "Add New Table". |
| | 1.4. The system displays the table form with editable fields such as Table Number, Seating Capacity, and Location. |
| | 1.5. The Manager enters the required table information and selects "Save". |
| | 1.6. The system validates the submitted table data. |
| | 1.7. If the submitted data is valid, the system saves the new table record. |
| | 1.8. The system refreshes the table layout and displays a success message confirming that the new table was added. |
| **Alternative Flows** | 2a. Edit table: At step 1.2, the Manager selects an existing table to edit. The system displays the current table data. The Manager updates the allowed fields and selects "Update". The system validates the submitted changes. If the selected table is not currently in use and the update succeeds, the system saves the updated table record, refreshes the layout, and displays a success message. |
| | 2b. Delete table: At step 1.2, the Manager selects an existing table to delete. The system displays a deletion confirmation message. The Manager confirms the request. If the selected table is not currently in use and the deletion succeeds, the system deletes the selected table record, refreshes the layout, and displays a success message. |
| **Exceptions** | E1. Invalid input data: At step 1.6 or Alternative Flow 2a, if required data is missing, duplicated, or invalid, the system rejects the request, displays the validation error, and keeps the Manager on the current form so the data can be corrected. |
| | E2. Table currently in use: In Alternative Flow 2a or 2b, if the selected table is currently assigned to an active dine-in operation, the system blocks the conflicting update or deletion, keeps the existing table data unchanged, and displays an in-use message. |
| | E3. Persistence failure: At step 1.7, Alternative Flow 2a, or Alternative Flow 2b, if the system cannot save or delete the table data because of a database or system error, the system displays a failure message and preserves the last committed valid table data. |
| **Priority** | High |

---

### 🔹 Vuong Gia Ly (2301040113)

#### UC-02: Online Payment

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-02: Online Payment |
| **Primary Actor** | Customer (Registered / Guest) |
| **Description** | After creating an order that requires prepayment, the customer selects an online payment method (MoMo, VNPay, ZaloPay, or QR bank transfer) to complete payment |
| **Trigger** | The customer clicks "Pay Now" after cart confirmation or when the system requests payment before processing |
| **Pre-conditions** | 1. The customer is logged in or has completed Guest Checkout with Name + Phone. 2. The cart contains at least 1 item. 3. The order has been created and belongs to a prepayment-required flow or the customer voluntarily chooses to prepay |
| **Post-conditions** | Payment succeeds. The order changes to `Paid`. If it is Takeaway/Pickup, the order continues into operational processing |
| **Normal Flow** | 1.1. The system displays the total order amount and available payment methods |
| | 1.2. The customer selects a payment method (e.g., MoMo) |
| | 1.3. The system redirects to the payment gateway page |
| | 1.4. The customer confirms payment on the MoMo/VNPay/ZaloPay application |
| | 1.5. The payment gateway returns the result to the system |
| | 1.6. The system displays "Payment successful!" and updates the order/payment status |
| **Alternative Flows** | 2a. QR Bank Transfer: At step 1.2, the customer selects "QR Bank Transfer" -> The system displays a QR code with the amount -> The customer scans the QR using a banking app -> The system confirms after receiving the callback |
| | 2b. Dine-in pay later: If the order is Dine-in, the customer may skip online payment and keep the order in `Unpaid` status for counter settlement later |
| **Exceptions** | E1: Payment failed -> At step 1.5, the gateway returns an error -> The system displays "Payment failed. Please try again!" -> The order remains in `Pending Online Payment` |
| | E2: Payment timeout -> After 15 minutes without payment in a required prepayment flow via Client WebApp, the system automatically cancels the order and displays "Order cancelled due to payment timeout" |
| | E3: Paid order cancelled -> If an order with `payment_status = Paid` is subsequently cancelled (by customer before kitchen accepts, or by Manager due to exception), the system creates a refund request, transitions `payment_status` to `Refund Pending`, and notifies the Manager for approval |
| **Priority** | Critical |

---
#### UC-06: Manage Staff

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-06: Manage Staff |
| **Primary Actor** | Manager (Shop Owner) |
| **Description** | The manager creates, updates, deactivates staff accounts and assigns roles within the Admin system |
| **Trigger** | The manager clicks "Staff Management" on the Admin menu |
| **Pre-conditions** | 1. The manager is logged in with "Manager" privileges |
| **Post-conditions** | The staff account is successfully created, updated, or deactivated |
| **Normal Flow** | 1.1. The manager selects "Staff Management" |
| | 1.2. The system displays the staff list (Name, Phone, Email, Role, Status) |
| | 1.3. The manager clicks "Add Staff" |
| | 1.4. The system displays a form: Full Name, Phone Number, Email, Role (Checkbox: Cashier / Kitchen / Server — multiple selection allowed), Default Password |
| | 1.5. The manager enters the information and clicks "Save" |
| | 1.6. The system creates the account and displays "Staff added successfully!" |
| **Alternative Flows** | 2a. Edit info: At step 1.2, select a staff member → Edit information → Click "Update" → Success |
| | 2b. Deactivate: At step 1.2, select a staff member → Click "Deactivate" → Confirm → Account is locked, login is disabled |
| | 2c. Change role: At step 2a, the manager changes the staff role (e.g., Cashier → Kitchen) → Access permissions are updated |
| **Exceptions** | E1: Phone number already exists — At step 1.5, the system displays "This phone number is already in use!" |
| | E2: Invalid email — At step 1.5, the system displays "Invalid email format!" |
| **Priority** | High |

---

### 🔹 Nguyen Minh Duc (2301040048)

#### UC-10: Process Payment

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-10: Process Payment |
| **Primary Actor** | Front-of-House Staff (FOH) |
| **Description** | The cashier processes payment for an order, including Takeaway orders that must be paid before kitchen release and Dine-in orders settled after service |
| **Trigger** | The cashier clicks "Pay" on the order to be processed |
| **Pre-conditions** | 1. The cashier is logged in. 2. The order exists and is eligible for payment (counter Takeaway awaiting payment — exempt from auto-cancel because the Cashier controls the flow directly, or Dine-in awaiting settlement) |
| **Post-conditions** | The order's `payment_status` changes to `Paid`. If it is Takeaway, the kitchen ticket is printed/sent after payment. If it is a completed Dine-in order, revenue is recorded and the table returns to "Available" |
| **Normal Flow** | 1.1. The cashier selects the order to be paid from the list |
| | 1.2. The system displays order details: item list, total amount |
| | 1.3. The cashier selects a payment method (Cash / QR / Online) |
| | 1.4. If Cash is selected, the cashier enters the amount received from the customer |
| | 1.5. The system calculates the change and displays "Change: X VND" |
| | 1.6. The cashier clicks "Confirm Payment" |
| | 1.7. The system updates `payment_status = Paid` |
| | 1.8. If it is Takeaway, the system prints/sends the kitchen ticket so preparation can begin |
| | 1.9. If it is a completed Dine-in order, the system records revenue and sets the table to "Available" |
| **Alternative Flows** | 2a. Payment Gateway QR (MoMo/VNPay/ZaloPay): At step 1.3, select e-wallet -> The system generates a dynamic QR with order details -> The customer scans with wallet app -> Gateway callback auto-confirms -> `payment_status = Paid` -> Complete |
| | 2a-2. Bank Transfer QR: At step 1.3, select "QR Bank Transfer" -> The system displays a QR with shop bank account + amount -> The customer scans with any banking app -> The cashier checks SMS/bank app to confirm receipt -> The cashier taps "Confirm Received" (manual confirmation, system logs the action) -> Complete |
| | 2b. Print receipt: After successful payment, the cashier clicks "Print Receipt" -> The system sends the print command |
| | 2c. Settle all orders by table: At step 1.1, the Cashier selects a table instead of an individual order -> The system displays all unpaid orders on that table with a combined total -> The Cashier processes payment for all orders at once -> The system updates `payment_status = Paid` for all orders and releases the table to "Available" |
| **Exceptions** | E1: Insufficient amount -> At step 1.4, the system displays "Insufficient amount. Short by X VND!" |
| | E2: Payment gateway error -> At step 2a, the system displays "Payment gateway error. Please try a different method!" |
| **Priority** | Critical |

---
#### UC-03: Schedule Pickup Order

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-03: Schedule Pickup Order (Pickup) |
| **Primary Actor** | Customer (Registered / Guest) |
| **Description** | The customer orders items online, selects a pickup timeslot, and relies on the system to validate kitchen capacity and auto-accept the order if the slot is valid |
| **Trigger** | The customer selects the Pickup option while creating an online order |
| **Pre-conditions** | The shop is open and at least one menu item is available |
| **Post-conditions** | If the slot is valid and payment is completed, the Pickup order is created successfully, auto-accepted, and passed into the operational flow |
| **Normal Flow** | 1.1. The customer selects items (as in the standard online ordering flow) |
| | 1.2. The customer selects the Pickup service model |
| | 1.3. The system asks for the desired pickup date and time |
| | 1.4. The system validates opening hours and kitchen capacity for the selected slot |
| | 1.5. If the slot is valid, the customer confirms the date/time |
| | 1.6. The system routes the customer to mandatory online payment |
| | 1.7. After successful payment, the system auto-accepts the Pickup order and displays when preparation will begin |
| **Alternative Flows** | 2a. Nearly full slot: The system suggests nearby timeslots that still have capacity |
| | 2b. Guest Checkout: A guest customer may continue with only Name + Phone |
| **Exceptions** | E1: Invalid or overloaded timeslot -> The system displays a warning and does not allow payment to continue |
| | E2: Payment not completed within 15 minutes -> The Pickup order is automatically cancelled |
| **Priority** | High |

