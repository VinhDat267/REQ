# Wonton POS - 26 Use Case Specifications

This document consolidates the 26 use case specifications currently used in the BRD Ver 3 authoring set.

- Source document: `Group1_Tutorial01_BRD_Ver3.docx`
- Scope: `UC-01` through `UC-26`
- Service models covered: `Dine-in`, `Takeaway`, and `Pickup`
- Out of scope: `Delivery`

## Use Case Index

- [UC-01: Place Online Order](#uc-01-place-online-order)
- [UC-02: Online Payment](#uc-02-online-payment)
- [UC-03: Schedule Pickup Order (Pickup)](#uc-03-schedule-pickup-order-pickup)
- [UC-04: View Order History](#uc-04-view-order-history)
- [UC-05: Manage Menu](#uc-05-manage-menu)
- [UC-06: Manage Staff](#uc-06-manage-staff)
- [UC-07: View Revenue Statistics](#uc-07-view-revenue-statistics)
- [UC-08: Manage Tables](#uc-08-manage-tables)
- [UC-09: Create In-Store Order](#uc-09-create-in-store-order)
- [UC-10: Process Payment](#uc-10-process-payment)
- [UC-11: Track Order](#uc-11-track-order)
- [UC-12: Assign Order to Table](#uc-12-assign-order-to-table)
- [UC-13: Receive Kitchen Orders](#uc-13-receive-kitchen-orders)
- [UC-14: Update Dish Status](#uc-14-update-dish-status)
- [UC-15: Rate Order](#uc-15-rate-order)
- [UC-16: Receive Order Notifications](#uc-16-receive-order-notifications)
- [UC-17: Reorder Past Order](#uc-17-reorder-past-order)
- [UC-18: Manage Promotions](#uc-18-manage-promotions)
- [UC-19: View Operational Dashboard](#uc-19-view-operational-dashboard)
- [UC-20: Manage Active Orders](#uc-20-manage-active-orders)
- [UC-21: Close Shift and Reconcile End-of-day](#uc-21-close-shift-and-reconcile-end-of-day)
- [UC-22: Mark Menu Item as 86'd](#uc-22-mark-menu-item-as-86d)
- [UC-23: Serve and Confirm Handoff](#uc-23-serve-and-confirm-handoff)
- [UC-24: Handle Complaint and Operational Exception](#uc-24-handle-complaint-and-operational-exception)
- [UC-25: Manage Customer Account and Authentication](#uc-25-manage-customer-account-and-authentication)
- [UC-26: Complete Checkout and Apply Promotion](#uc-26-complete-checkout-and-apply-promotion)

## UC-01: Place Online Order

| Field | Specification |
| --- | --- |
| ID & Name | UC-01: Place Online Order |
| Primary Actor | Customer (Registered / Guest) |
| Description | The customer uses the Client WebApp to browse the menu, add items to the cart, select a service model, and create an online order according to the business rule of the selected service model. |
| Trigger | The customer selects "Order Now" or "View Menu" on the homepage. |
| Pre-conditions | 1. The Client WebApp is available for ordering. 2. The menu contains at least one item with status `Available`. 3. The selected service model is within the supported scope: `Dine-in`, `Takeaway`, or `Pickup`. |
| Post-conditions | Success: An online order is created with the correct service model and order details. If the order is `Dine-in`, the order is created as a valid unpaid order with `payment_status = Unpaid`, the order code is displayed, and the customer is taken to the order-tracking screen. If the order is `Takeaway`, the order is created under the mandatory prepayment rule and the customer is routed to the payment flow before kitchen release. If the order is `Pickup`, the customer is routed to UC-03 for slot validation and mandatory prepayment before the order can continue. <br>Failure: No incomplete or unintended order is committed, the existing cart content is preserved unless the customer changes it, and the system displays the appropriate error message. |
| Normal Flow | 1.1. The customer selects "Order Now" or "View Menu". |
| Alternative Flows | 2a. Add more items: After step 1.7, the customer continues browsing the menu and repeats steps 1.2-1.7 until the cart is complete. |
| Exceptions | E1. Item unavailable: At step 1.4 or 1.5, if the selected item is no longer available, the system displays an out-of-stock message and keeps the customer on the menu/item-selection flow so another item can be selected. |
| Priority | Critical |

## UC-02: Online Payment

| Field | Specification |
| --- | --- |
| ID & Name | UC-02: Online Payment |
| Primary Actor | Customer (Registered / Guest) |
| Description | After creating an order that requires prepayment, the customer selects an appropriate online payment method (Payment Gateway QR or Bank Transfer QR with manual confirmation) to complete payment |
| Trigger | The customer clicks "Pay Now" after cart confirmation or when the system requests payment before processing |
| Pre-conditions | 1. The customer is logged in or has completed Guest Checkout with Name + Phone. 2. The cart contains at least 1 item. 3. The order has been created and belongs to a prepayment-required flow or the customer voluntarily chooses to prepay |
| Post-conditions | Payment succeeds via a valid gateway callback or a valid manual confirmation. The order changes to `Paid`. If it is Takeaway/Pickup, the system routes the order into the operational flow. The system must not create duplicate orders or duplicate kitchen tickets because of retry attempts or repeated callbacks |
| Normal Flow | 1.1. The system displays the total order amount and available payment methods |
| Alternative Flows | 2a. Payment Gateway QR: At step 1.2, the customer selects MoMo/VNPay/ZaloPay -> The system generates a dynamic QR or redirects to the gateway -> The customer confirms in the wallet app -> The system receives a successful callback -> The order transitions to `Paid` |
| Exceptions | E1: Payment failed - At step 1.5, the gateway returns an error -> The system displays "Payment failed. Please try again!" -> The order remains in `Pending Online Payment` |
| Priority | Critical |

## UC-03: Schedule Pickup Order (Pickup)

| Field | Specification |
| --- | --- |
| ID & Name | UC-03: Schedule Pickup Order (Pickup) |
| Primary Actor | Customer (Registered / Guest) |
| Description | The customer orders items online and selects a pickup timeslot so the system can validate opening hours, the Pickup pause toggle, and slot-level service capacity before auto-accepting the order if it is valid |
| Trigger | The customer selects the Pickup option while creating an online order |
| Pre-conditions | The shop is open. Pickup is not paused. At least one menu item is available |
| Post-conditions | If the slot is valid and payment is completed, the Pickup order is created successfully, auto-accepted, and passed into the operational flow. The customer is informed of the exact pickup window, warned that arriving early may still require waiting until the order is `Ready`, and notified of the shop-configured holding window after the scheduled time |
| Normal Flow | 1.1. The customer selects items (as in the standard online ordering flow) |
| Alternative Flows | 2a. Nearly full slot: The system suggests nearby timeslots that still have capacity |
| Exceptions | E1: Invalid or overloaded timeslot, or Pickup is currently paused - The system displays a warning and does not allow payment to continue |
| Priority | High |

## UC-04: View Order History

| Field | Specification |
| --- | --- |
| ID & Name | UC-04: View Order History |
| Primary Actor | Registered Customer |
| Description | The customer reviews a list of previously placed orders, including item details, order status, and payment information |
| Trigger | The customer clicks "Order History" in their account section |
| Pre-conditions | 1. The customer is logged in. 2. The customer has at least 1 previous order |
| Post-conditions | The order history list is displayed successfully |
| Normal Flow | 1.1. The customer clicks "Order History" |
| Alternative Flows | 2a. Filter by status: At step 1.2, the customer selects a filter (All / In Progress / Completed / Cancelled) -> The list is filtered accordingly |
| Exceptions | E1: No orders found - At step 1.2, the system displays "You don't have any orders yet. Order now!" with a button linking to the menu |
| Priority | Medium |

## UC-05: Manage Menu

| Field | Specification |
| --- | --- |
| ID & Name | UC-05: Manage Menu |
| Primary Actor | Manager |
| Description | The manager adds, edits, archives/stops selling menu items and manages categories, updates prices, images, and availability status |
| Trigger | The manager clicks "Menu Management" on the Admin WebApp |
| Pre-conditions | 1. The manager is logged in with "Manager" privileges |
| Post-conditions | The menu is successfully updated; changes are immediately reflected on the Client WebApp |
| Normal Flow | 1.1. The manager selects "Menu Management" |
| Alternative Flows | 2a. Edit item: At step 1.2, the manager clicks "Edit" on an item -> The system displays the edit form with current data -> The manager edits and clicks "Update" -> Success |
| Exceptions | E1: Duplicate item name - At step 1.5, the system displays "Item name already exists in this category!" |
| Priority | High |

## UC-06: Manage Staff

| Field | Specification |
| --- | --- |
| ID & Name | UC-06: Manage Staff |
| Primary Actor | Manager (Shop Owner) |
| Description | The manager creates, updates, deactivates staff accounts and assigns roles within the Admin system |
| Trigger | The manager clicks "Staff Management" on the Admin menu |
| Pre-conditions | 1. The manager is logged in with "Manager" privileges |
| Post-conditions | The staff account is successfully created, updated, or deactivated |
| Normal Flow | 1.1. The manager selects "Staff Management" |
| Alternative Flows | 2a. Edit info: At step 1.2, select a staff member -> Edit information -> Click "Update" -> Success |
| Exceptions | E1: Phone number already exists - At step 1.5, the system displays "This phone number is already in use!" |
| Priority | High |

## UC-07: View Revenue Statistics

| Field | Specification |
| --- | --- |
| ID & Name | UC-07: View Revenue Statistics |
| Primary Actor | Manager (Shop Owner) |
| Description | The Manager uses the Admin WebApp to review revenue statistics, top-selling items, and peak-hour analytics by applying time-based and optional payment-method filters. |
| Trigger | The Manager selects "Statistics & Reports" in the Admin WebApp. |
| Pre-conditions | 1. The Manager is authenticated with permission to access revenue analytics. 2. The analytics module is available. 3. Completed-order data has been recorded for reporting, even if the selected filter may return no result. |
| Post-conditions | Success: The requested revenue statistics are displayed using charts and/or data tables for the selected filters, and any requested export file is generated for download. Failure: No reporting data is changed, the last valid filter context is preserved, and the system displays the appropriate no-data or loading-error message. |
| Normal Flow | 1.1. The Manager opens "Statistics & Reports". |
| Alternative Flows | 2a. Filter by payment method: After step 1.4, 1.6, or 1.8, the Manager selects a payment-method filter (`Cash` / `QR` / `Online`). The system refreshes the displayed analytics data for the current time range. |
| Exceptions | E1. No data for selected filters: At step 1.2, 1.4, 1.6, or 1.8, if the selected time range or applied filters return no completed-order data, the system displays "No data available for the selected time period" and keeps the Manager on the analytics screen so another filter can be selected. |
| Priority | High |

## UC-08: Manage Tables

| Field | Specification |
| --- | --- |
| ID & Name | UC-08: Manage Tables |
| Primary Actor | Manager |
| Description | The Manager manages dine-in table master data in the Admin WebApp by viewing the current table layout and usage status, then adding, editing, or deleting table records. This use case governs table configuration at the layout level. FOH Staff may view the table layout and usage status for dine-in operations, but configuration actions in this use case remain Manager-only. |
| Trigger | The Manager selects "Table Management" in the Admin WebApp. |
| Pre-conditions | 1. The Manager is authenticated with permission to manage tables. 2. The table-management module is available and the current table layout/status can be loaded, even if no table records exist yet. |
| Post-conditions | Success: The requested table record is created, updated, or deleted; the latest layout and usage status are refreshed and displayed. Failure: No unintended table data change is committed; the system preserves the last committed valid table data and shows the appropriate error message. |
| Normal Flow | 1.1. The Manager opens "Table Management". |
| Alternative Flows | 2a. Edit table: At step 1.2, the Manager selects an existing table to edit. The system displays the current table data. The Manager updates the allowed fields and selects "Update". The system validates the submitted changes. If the selected table is not currently in use and the update succeeds, the system saves the updated table record, refreshes the layout, and displays a success message. |
| Exceptions | E1. Invalid input data: At step 1.6 or Alternative Flow 2a, if required data is missing, duplicated, or invalid, the system rejects the request, displays the validation error, and keeps the Manager on the current form so the data can be corrected. |
| Priority | High |

## UC-09: Create In-Store Order

| Field | Specification |
| --- | --- |
| ID & Name | UC-09: Create In-Store Order |
| Primary Actor | Front-of-House Staff (FOH Staff) |
| Description | FOH Staff use the Admin WebApp to create a walk-in order at the counter for Dine-in or Takeaway service. The FOH Staff selects the service type, adds items to the order, assigns a table when the order is Dine-in, and continues the order according to the payment rule of the selected service model. |
| Trigger | The FOH Staff selects "Create New Order" in the Admin WebApp. |
| Pre-conditions | 1. The FOH Staff is authenticated with permission to create in-store orders. 2. The menu is available for ordering. 3. For Dine-in orders, at least one table can be viewed for assignment from the current table layout. |
| Post-conditions | Success: A new in-store order is created. If the order is Dine-in, the order is linked to the selected table, the table status is updated to `Occupied`, the kitchen ticket is sent immediately, and the order may remain valid with `payment_status = Unpaid`. If the order is Takeaway, the order is created with `payment_status = Unpaid`, the FOH Staff is routed to the counter payment flow, and the kitchen ticket is not sent before payment succeeds. Counter Takeaway orders are exempt from the 15-minute auto-cancel because the Cashier controls the flow directly; the Cashier may collect payment immediately at the counter or cancel manually if the customer abandons the transaction. Failure: No incomplete or unintended order is committed, no table assignment is applied incorrectly, and the system displays the appropriate error message. |
| Normal Flow | 1.1. The FOH Staff opens "Create New Order". |
| Alternative Flows | 2a. Takeaway order: At step 1.3, the FOH Staff selects "Takeaway". The table-selection step is skipped, and the flow continues at step 1.5. |
| Exceptions | E1. Table unavailable: At step 1.4, if the selected table is not available for assignment, the system displays an unavailable-table message and keeps the FOH Staff on the table-selection step so another table can be selected. |
| Priority | Critical |

## UC-10: Process Payment

| Field | Specification |
| --- | --- |
| ID & Name | UC-10: Process Payment |
| Primary Actor | Front-of-House Staff (FOH) |
| Description | The cashier processes payment for an order, including Takeaway orders that must be paid before kitchen release and Dine-in orders settled after service |
| Trigger | The cashier clicks "Pay" on the order to be processed |
| Pre-conditions | 1. The cashier is logged in. 2. The order exists and is eligible for payment (counter Takeaway awaiting payment - exempt from auto-cancel because the Cashier controls the flow directly, or Dine-in awaiting settlement) |
| Post-conditions | The order's `payment_status` changes to `Paid`. If it is Takeaway, the kitchen ticket is printed/sent after payment. If it is a completed Dine-in order, revenue is recorded and the table returns to "Available". The system must not create duplicate receipts or kitchen tickets if the payment gateway sends repeated callbacks |
| Normal Flow | 1.1. The cashier selects the order to be paid from the list |
| Alternative Flows | 2a. Payment Gateway QR (MoMo/VNPay/ZaloPay): At step 1.3, select e-wallet -> The system generates a dynamic QR with order details -> The customer scans with wallet app -> Gateway callback auto-confirms -> `payment_status = Paid` -> Complete |
| Exceptions | E1: Insufficient amount - At step 1.4, the system displays "Insufficient amount. Short by X VND!" |
| Priority | Critical |

## UC-11: Track Order

| Field | Specification |
| --- | --- |
| ID & Name | UC-11: Track Order |
| Primary Actor | Customer (Guest / Registered) |
| Description | The customer tracks the current order status after placing an order, either through the account or via `Order Code + Phone Number` for guest orders |
| Trigger | The customer completes an order, clicks "Track Order", or opens an order notification |
| Pre-conditions | 1. The customer has at least 1 active order. 2. If the customer is a Guest, they must have the Order Code and the phone number used at checkout |
| Post-conditions | The customer views the latest updated status of the order |
| Normal Flow | 1.1. The customer opens the "Track Order" screen |
| Alternative Flows | 2a. Track multiple orders: The system allows the customer to select each active order and inspect its status |
| Exceptions | E1: Connection lost -> The system cannot auto-update in real-time and prompts the customer to refresh the page manually |
| Priority | High |

## UC-12: Assign Order to Table

| Field | Specification |
| --- | --- |
| ID & Name | UC-12: Assign Order to Table |
| Primary Actor | Front-of-House Staff (FOH) |
| Description | The cashier assigns/transfers an order to a specific table on the floor plan, or attaches an additional order to an already-active table belonging to the same party |
| Trigger | The cashier needs to assign a new order to a table, the customer requests a table change, or the same party requests an additional order |
| Pre-conditions | 1. The cashier is logged in. 2. A Dine-in order exists that needs table assignment, transfer, or attachment to an active table. 3. The table layout has been configured |
| Post-conditions | The order is linked to the appropriate table. If the table was previously Available, it transitions to "Occupied"; if the order is an additional order for the same party, the table remains "Occupied" |
| Normal Flow | 1.1. The cashier opens the "Table Layout" section |
| Alternative Flows | 2a. Transfer table: The cashier selects an occupied table -> Clicks "Transfer Table" -> Selects a new available table -> Confirms -> Old table reverts to "Available", new table becomes "Occupied" |
| Exceptions | E1: Table occupied by a different party - If the cashier attempts to assign a new party to an "Occupied" table that does not belong to the same party, the system displays "Table already has another party. Please select a different table or use the additional-order feature for the correct party." |
| Priority | High |

## UC-13: Receive Kitchen Orders

| Field | Specification |
| --- | --- |
| ID & Name | UC-13: Receive Kitchen Orders |
| Primary Actor | Back-of-House Staff (BOH) |
| Description | Kitchen staff views the list of new orders requiring preparation on the kitchen display, accepts orders, and begins cooking |
| Trigger | A new order is created (from an online customer or in-store cashier). The system plays a notification sound |
| Pre-conditions | 1. Kitchen staff is logged in with "Kitchen" privileges. 2. There is at least 1 new order |
| Post-conditions | The order status changes from `Pending Confirmation` to `Cooking`. The customer is notified |
| Normal Flow | 1.1. The system displays the kitchen screen with a list of new orders (Order ID, Item List, Notes, Service Type, Order Time) |
| Alternative Flows | 2a. Report cannot fulfil before cooking starts: For a Dine-in order that has not yet entered production, the kitchen clicks "Report Cannot Fulfil" -> Enters a reason (e.g., out of ingredients) -> The system notifies the FOH/Manager to coordinate with the customer and continue handling. Note: `Paid` Takeaway/Pickup orders do not display a "Reject" button; if the kitchen cannot fulfil them, the kitchen clicks "Report Issue" -> The system escalates to the Manager for exception handling (substitute item / reschedule / refund). |
| Exceptions | E1: Order cancelled before acceptance - At step 1.3, the system displays "Order has been cancelled by the customer" -> The order is removed from the list |
| Priority | High |

## UC-14: Update Dish Status

| Field | Specification |
| --- | --- |
| ID & Name | UC-14: Update Dish Status |
| Primary Actor | Back-of-House Staff (BOH) |
| Description | After finishing cooking, the kitchen staff updates the dish/order status to `Ready` so the system can notify service staff and the customer |
| Trigger | Kitchen staff completes the preparation of dishes in an order |
| Pre-conditions | 1. Kitchen staff is logged in. 2. The order is in `Cooking` status |
| Post-conditions | The order changes to `Ready`. Notifications are sent to service staff and the customer. Note: The order only transitions to `Completed` at the next step when the Server taps "Delivered" (Dine-in) or the Cashier taps "Customer Picked Up" (Takeaway/Pickup) - not in this UC. |
| Normal Flow | 1.1. Kitchen staff views the list of orders currently being prepared |
| Alternative Flows | 2a. Grouped / batch update: The system does not force the kitchen to tap "Done" per single bowl; the kitchen may group items prepared together across multiple orders and update their status in one action. |
| Exceptions | E1: Order already cancelled - At step 1.2, the system displays "Order has been cancelled. Cannot update!" |
| Priority | High |

## UC-15: Rate Order

| Field | Specification |
| --- | --- |
| ID & Name | UC-15: Rate Order |
| Primary Actor | Registered Customer |
| Description | After receiving their order and upon completion, the customer rates the service quality and food using a star rating (1-5) with optional text review. Data is used to improve quality and generate reports for management |
| Trigger | The order status changes to "Completed" -> The system displays a popup/notification inviting the customer to rate |
| Pre-conditions | 1. The customer is logged in (Registered Customer). 2. The order is in "Completed" status. 3. The customer has not rated this order |
| Post-conditions | The review is saved successfully. Management can view it in statistics reports |
| Normal Flow | 1.1. The system displays a popup "Rate Order #X" after the order is completed |
| Alternative Flows | 2a. Rate later: At step 1.1, the customer clicks "Later" -> Popup closes. The customer can rate from "Order History" within 7 days |
| Exceptions | E1: Already rated - At step 1.1, displays "You have already rated this order!" with the previous review content |
| Priority | Medium |

## UC-16: Receive Order Notifications

| Field | Specification |
| --- | --- |
| ID & Name | UC-16: Receive Order Notifications |
| Primary Actor | Customer (Registered / Guest) |
| Description | The customer receives real-time notifications when the order status changes (Pending Confirmation, Cooking, Ready, Completed, Cancelled). Notifications appear as WebApp popups and optionally as browser push notifications |
| Trigger | The customer's order status is updated by kitchen staff or cashier |
| Pre-conditions | 1. The customer has at least 1 active (incomplete) order. 2. The customer has the Client WebApp open or has granted browser push notification permission |
| Post-conditions | The customer receives a notification with the latest status. The notification is saved to history |
| Normal Flow | 1.1. Kitchen staff/cashier updates the order status (e.g., `Cooking` -> `Ready`) |
| Alternative Flows | 2a. View notification history: The customer clicks the bell icon 🔔 -> The system displays the notification list (newest first) with a badge showing unread count |
| Exceptions | E1: Connection lost -> Real-time notification cannot be delivered -> When the customer reopens the WebApp, the system syncs and displays all missed notifications |
| Priority | High |

## UC-17: Reorder Past Order

| Field | Specification |
| --- | --- |
| ID & Name | UC-17: Reorder Past Order |
| Primary Actor | Registered Customer |
| Description | The Registered Customer reorders items from a Completed past order. The system creates a new draft order using the current menu state: deleted or archived items are dropped with a notice, repriced items use the current price, removed toppings/options are dropped with a notice, valid special notes are carried forward when still applicable, and 86'd items remain flagged to block checkout until removed or cleared. |
| Trigger | The customer selects Reorder on a past order from Order History. |
| Pre-conditions | 1. The customer is authenticated (Registered Customer). 2. The source order is in Completed state. 3. The Reorder feature is enabled on the Client WebApp. |
| Post-conditions | Success: A new draft order is created using current menu state, all drift notices are visible to the customer, and the customer can proceed to checkout (UC-26). Failure: No new order is committed; the source order history is unchanged and the system displays an appropriate error. |
| Normal Flow | 1.1. The customer opens Order History. 1.2. The customer selects a past Completed order. 1.3. The customer clicks Reorder. 1.4. The system loads items from the source order and applies current menu state. 1.5. The system carries forward valid special notes from the source order to the corresponding new cart lines. 1.6. The system displays a consolidated drift banner plus per-line inline notices. 1.7. The customer reviews items, notes, and totals. 1.8. The customer accepts and is routed to checkout (UC-26). |
| Alternative Flows | 2a. No drift: The system loads items directly at current prices without notices. 2b. All items unavailable: The system displays "No items from this order are currently available" with a link to the menu. 2c. Partial drop: Only available items are carried over; dropped items are listed in the summary. |
| Exceptions | E1. Source order not Completed: Reorder button is hidden. E2. Item currently 86'd: Kept in cart but blocks checkout until removed or 86'd is cleared. E3. If the original order used a promotion that is no longer valid, the system does not carry it forward and displays a notice at checkout. |
| Priority | Medium |

## UC-18: Manage Promotions

| Field | Specification |
| --- | --- |
| ID & Name | UC-18: Manage Promotions |
| Primary Actor | Manager |
| Description | The Manager creates, edits, deactivates, and reviews promotion codes (percentage or fixed amount only), including validity period, usage limits, stacking policy, cancellation-related usage recovery, and application/usage audit history. Free-item and BOGO promotions are out of scope. |
| Trigger | The Manager opens Promotion Management in the Admin WebApp. |
| Pre-conditions | 1. The Manager is authenticated with promotion management permission. 2. The Promotion Management module is available. |
| Post-conditions | Success: A promotion code is created, updated, or deactivated with an audit log entry; usage history remains available for review. Failure: No promotion change is persisted; the system shows a validation error. |
| Normal Flow | 1.1. The Manager opens Promotion Management. 1.2. The system displays existing promotions with status and current usage. 1.3. The Manager clicks New Promotion. 1.4. The system displays the form (Code, Type, Value, Valid From/To, Conditions, Usage Limit, Stacking Rule, Usage-Recovery Rule). 1.5. The Manager enters data and saves. 1.6. The system validates and persists the promotion. 1.7. The system records an audit entry for the change. |
| Alternative Flows | 2a. Edit: The Manager selects an existing promotion, edits fields, and saves. 2b. Deactivate: The Manager deactivates a promotion without deleting usage history. 2c. Usage history: The Manager opens the history view for orders that applied a given promotion. 2d. Failed application attempts: The Manager reviews rejected promotion applications and the recorded reasons. |
| Exceptions | E1. Duplicate promotion code. E2. Invalid date range (end before start). E3. Invalid discount value (negative, zero, or greater than 100% for percentage). E4. Attempt to configure free-item/BOGO promotion - rejected as out of scope. |
| Priority | Medium |

## UC-19: View Operational Dashboard

| Field | Specification |
| --- | --- |
| ID & Name | UC-19: View Operational Dashboard |
| Primary Actor | Manager |
| Description | The Manager views an operational dashboard summarizing today's revenue, order counts by status, kitchen load, open exceptions (Refund Pending, overdue Pickup, unresolved Write-off, Forfeited pending, Dine-in Completed+Unpaid), and shift status awaiting review. |
| Trigger | The Manager opens the Admin WebApp home dashboard. |
| Pre-conditions | 1. The Manager is authenticated. |
| Post-conditions | Success: The dashboard displays the current operational snapshot with alerts. Failure: The system displays a loading error and preserves the last valid snapshot. |
| Normal Flow | 1.1. The Manager logs in and lands on the Dashboard. 1.2. The system displays today's revenue, order counts by status, average order value, and alert cards. 1.3. The Manager clicks any alert card to drill down into the related active orders or exception lists. |
| Alternative Flows | 2a. Filter by shift or by day. 2b. Drill-down into UC-20 Active Orders from any alert card. 2c. Drill-down into UC-21 Shift Close from shift-status alerts. |
| Exceptions | E1. Data loading failure - retry option is offered. E2. No data yet for the selected day - placeholder message shown. |
| Priority | Medium |

## UC-20: Manage Active Orders

| Field | Specification |
| --- | --- |
| ID & Name | UC-20: Manage Active Orders |
| Primary Actor | Front-of-House Staff / Manager |
| Description | The FOH Staff or Manager monitors and acts on operationally actionable orders and exceptions across Dine-in, Takeaway, and Pickup, including live orders, Dine-in Completed+Unpaid follow-up, confirmation, cancellation (with Manager approval for paid orders), transferring, and escalating exceptions such as complaints, wrong handoff, overdue Pickup/Takeaway, and payment recovery. |
| Trigger | The FOH Staff opens Active Orders in the Admin WebApp. |
| Pre-conditions | 1. The FOH Staff or Manager is authenticated. 2. At least one operationally actionable order or exception exists, including live orders, overdue Ready orders, payment-recovery cases, or Dine-in orders in Completed + Unpaid status. |
| Post-conditions | Success: Targeted orders are updated with the correct next state or escalated to the Manager for exception resolution. Failure: No unintended state change is applied; the action is rejected with a reason. |
| Normal Flow | 1.1. The Staff opens Active Orders. 1.2. The system lists operationally actionable orders and exceptions grouped by service model and status. 1.3. The Staff selects an order or exception and opens details. 1.4. The Staff takes an allowed action (confirm, cancel with reason, transfer table, escalate, or route a Completed + Unpaid Dine-in case to settlement follow-up). |
| Alternative Flows | 2a. Filter by status, service model, or table. 2b. Escalate to Manager for paid cancellations, refund decisions, Comp, or Forfeited. 2c. Review overdue Pickup/Takeaway and route to UC-24 as needed. 2d. Completed + Unpaid Dine-in follow-up: The Staff opens the case, checks settlement status, and routes it to payment collection or Manager review. |
| Exceptions | E1. Order already in a terminal state - action disallowed. E2. Cancellation of a Paid order - must route through refund flow (§3b). E3. Connectivity loss - local changes are blocked until reconnect. |
| Priority | High |

## UC-21: Close Shift and Reconcile End-of-day

| Field | Specification |
| --- | --- |
| ID & Name | UC-21: Close Shift and Reconcile End-of-day |
| Primary Actor | Cashier / Manager |
| Description | The Cashier or Manager closes a shift by verifying the cash drawer count, reconciling transactions across cash, bank-transfer QR, online gateway, refund, Write-off, Comp, and Forfeited buckets, reviewing unresolved operational and financial exceptions, and confirming inherited exceptions are resolved or explicitly handed over to the next shift. |
| Trigger | The Cashier opens Close Shift at end of shift. |
| Pre-conditions | 1. An open shift exists owned by the current Cashier (or Manager acts on their behalf). 2. At least one financial event occurred in the shift, or the shift is to be closed empty. |
| Post-conditions | Success: The shift is closed, variance is explained or accepted, and the shift report is frozen. Inherited exceptions are listed for the next shift opening. Failure: The shift remains open; blockers and unresolved items are listed. |
| Normal Flow | 1.1. The Cashier opens Close Shift. 1.2. The system displays expected cash based on paid cash transactions minus cash refunds. 1.3. The Cashier enters actual counted cash. 1.4. The system computes the variance. 1.5. If variance exceeds the configured threshold, Manager confirmation with reason is required. 1.6. The system displays unresolved items requiring review, including aged Pending Online Payment, overdue Ready orders, Refund Pending, Write-off pending, wrong-handoff incidents, partial-refund differences, duplicate-charge incidents, Forfeited pending, and Dine-in Completed + Unpaid cases. 1.7. The Cashier resolves eligible items and, for approved carry-over categories, marks inherited exceptions with a note. 1.8. The system closes the shift and locks reports. |
| Alternative Flows | 2a. Variance above threshold triggers Manager approval flow. 2b. Manager may reopen a shift with audit reason. 2c. End-of-day reconciliation aggregates all shifts of the day. 2d. Approved carry-over cases are shown on the next shift as inherited exceptions. |
| Exceptions | E1. Open Refund Pending blocks close unless inherited with reason. E2. Hardware or connectivity issue - allow manual cash count with a flag for later review. E3. Attempt to reopen a reconciled shift without Manager approval - rejected. |
| Priority | High |

## UC-22: Mark Menu Item as 86'd

| Field | Specification |
| --- | --- |
| ID & Name | UC-22: Mark Menu Item as 86'd |
| Primary Actor | BOH Staff / Manager |
| Description | The BOH Staff or Manager marks a menu item as 86'd (temporarily unavailable). The system immediately hides the item from new orders, flags it on existing not-yet-cooked orders for FOH/Manager action, and supports clearing 86'd when the item is available again. 86'd is independent from manual stock adjustment. |
| Trigger | Kitchen detects an ingredient is out of stock or Manager decides to stop selling an item temporarily. |
| Pre-conditions | 1. The Staff is authenticated with Kitchen or Manager permission. |
| Post-conditions | Success: The item is flagged 86'd; Client WebApp and POS block new selection; in-flight orders containing the 86'd item raise an exception flag routed to UC-24. Failure: No availability state change. |
| Normal Flow | 1.1. The Staff locates the item in the availability panel. 1.2. The Staff clicks Mark as 86'd. 1.3. The system prompts for a short reason. 1.4. The Staff confirms. 1.5. The system propagates 86'd status across Client WebApp and POS and flags affected in-flight orders. |
| Alternative Flows | 2a. Clear 86'd when the item is available again. 2b. Apply 86'd to a topping, not the base item. 2c. Review affected in-flight orders: The Staff opens the flagged-order list so FOH/Manager can coordinate substitution, refund, or escalation. |
| Exceptions | E1. 86'd does not auto-adjust stock balance (independence rule, §3m). E2. Paid order containing a now-86'd item - routed to UC-24 complaint/exception handling. |
| Priority | High |

## UC-23: Serve and Confirm Handoff

| Field | Specification |
| --- | --- |
| ID & Name | UC-23: Serve and Confirm Handoff |
| Primary Actor | Front-of-House Service Staff / Cashier |
| Description | The Server confirms actual handoff of a Ready order: for Dine-in, food is delivered to the correct table; for Takeaway/Pickup, the Cashier hands the bag to the correct customer. The order transitions from Ready to Completed. The UC covers wrong-handoff correction by reverting Completed to Ready in the same shift with audit reason. |
| Trigger | The kitchen marks the order as Ready. |
| Pre-conditions | 1. The order is in Ready state. 2. The handling Staff is authenticated. |
| Post-conditions | Success: The order is set to Completed with the confirming actor logged. Failure: The order remains Ready and can be flagged for wrong-handoff correction. |
| Normal Flow | 1.1. The Server/Cashier sees the Ready order on their queue. 1.2. The Server delivers food to the correct Dine-in table, or the Cashier hands the Takeaway/Pickup bag to the matching customer. 1.3. The Server/Cashier taps Delivered or Customer Picked Up. 1.4. The system sets order_status = Completed. |
| Alternative Flows | 2a. Wrong handoff correction: Manager or FOH reverts Completed to Ready within the same shift with a required audit reason. 2b. Missing item on arrival: the Server flags the order and routes the issue to UC-24. 2c. Multiple ready orders for the same table or customer: The Staff verifies table number or order code and confirms each handoff separately before changing each order to Completed. |
| Exceptions | E1. Customer reports a missing or wrong item on receipt - route to UC-24. E2. Late Pickup/Takeaway no-show - escalate to Manager; do not auto-Complete. E3. System connectivity loss - staff uses manual handoff note to reconcile later. |
| Priority | High |

## UC-24: Handle Complaint and Operational Exception

| Field | Specification |
| --- | --- |
| ID & Name | UC-24: Handle Complaint and Operational Exception |
| Primary Actor | Front-of-House Staff / Manager |
| Description | Staff records a customer complaint or operational exception (wrong item, missing item, quality issue, wrong handoff) and routes it to a resolution: remake, substitution, goodwill discount, partial refund, full refund, Comp, or Write-off. All financial outcomes carry audit logs and flow to shift-close reconciliation. |
| Trigger | A customer reports an issue, or Staff notices a service error. |
| Pre-conditions | 1. The related order exists and is accessible. 2. The acting Staff has permission; Manager approval is required for refunds, Comp, and Write-off. |
| Post-conditions | Success: The complaint is logged with a resolution and audit trail; financial effects appear on shift reports. Failure: No resolution is applied; the case remains open for handover. |
| Normal Flow | 1.1. The Staff opens the impacted order. 1.2. The Staff selects Report Issue and picks an issue category. 1.3. The Staff enters a description. 1.4. The system routes the decision path (FOH for minor cases, Manager for financial ones). 1.5. The selected resolution is applied (remake / substitution / refund / Comp / Write-off). |
| Alternative Flows | 2a. Remake does not create new revenue. 2b. Partial refund keeps the order Completed but flags the refund line. 2c. Comp marks the whole order as zero-revenue under Manager authority. 2d. Write-off marks a Dine-in loss where the customer left without paying. |
| Exceptions | E1. Refund, Comp, or Write-off without Manager approval - rejected. E2. Guest PII has been anonymized (12-month retention) - reason is still logged, but PII fields are hidden. E3. Related order already in a terminal Refunded state - further refund requires a new request and Manager justification. |
| Priority | High |

## UC-25: Manage Customer Account and Authentication

| Field | Specification |
| --- | --- |
| ID & Name | UC-25: Manage Customer Account and Authentication |
| Primary Actor | Customer |
| Description | The Customer manages account access and profile lifecycle, including optional registration, log in, log out, profile update, password change, and password recovery via OTP. Guest checkout remains available without account creation. |
| Trigger | The customer opens the Account menu or selects a sign-in, registration, or password-recovery action on the Client WebApp. |
| Pre-conditions | 1. The Client WebApp is available. 2. For profile update, password change, and log out, the customer is authenticated. |
| Post-conditions | Success: The customer's account state reflects the requested change. Failure: No account change is persisted; the system displays a validation error. |
| Normal Flow | 1.1. The customer opens the Account menu. 1.2. The customer enters phone or email and password. 1.3. The system authenticates. 1.4. The system opens the account home. |
| Alternative Flows | 2a. Register: customer enters Name, Phone or Email, and password, and confirms via OTP. 2b. Forgot password: customer requests OTP and sets a new password. 2c. Update profile: customer updates editable fields. 2d. Change password: customer verifies the old password and sets a new one. 2e. Log out. |
| Exceptions | E1. Invalid credentials. E2. OTP expired or wrong. E3. Password does not meet policy. |
| Priority | Medium |

## UC-26: Complete Checkout and Apply Promotion

| Field | Specification |
| --- | --- |
| ID & Name | UC-26: Complete Checkout and Apply Promotion |
| Primary Actor | Customer (Registered / Guest) |
| Description | At checkout, the customer confirms a service model (Dine-in / Takeaway / Pickup), applies an optional promotion code, captures identification (Guest Name + Phone or authenticated profile), reviews the total, and is routed to payment (Takeaway/Pickup) or to order tracking (Dine-in). |
| Trigger | The customer clicks Checkout from the cart. |
| Pre-conditions | 1. The cart contains at least one available item. 2. The selected service model is supported. |
| Post-conditions | Success: An order is created with the correct service model, an applied promotion if any, and identification captured; the customer is routed to payment or tracking. Failure: No order is created; the cart content is preserved. |
| Normal Flow | 1.1. The customer opens the cart. 1.2. The system displays the cart summary. 1.3. The customer selects a service model. 1.4. The customer enters an optional promotion code. 1.5. The system validates the promotion and updates the total. 1.6. The customer enters Name and Phone (Guest) or confirms an authenticated profile. 1.7. The customer clicks Place Order. 1.8. The system creates the order and routes the customer to UC-02 for prepay or UC-11 for tracking. |
| Alternative Flows | 2a. No promotion code. 2b. Invalid promotion - the system removes it and shows a notice. 2c. Guest continues without logging in. |
| Exceptions | E1. Empty cart. E2. Promotion expired or over-used. E3. Promotion not applicable to the cart or service model. |
| Priority | Critical |
