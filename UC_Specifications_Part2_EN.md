# Use Case Specifications — Part 2

---

> **Final BRD v3 note (2026-04-17):** The UCs in this file keep their current IDs and are now treated as part of the local final BRD lane. When the team adds more UCs for the final version, it should continue with `UC-17+` rather than renumbering the existing visible IDs inside the main BRD narrative.
> **Ownership note:** The earlier midterm member-to-UC allocation no longer applies to `BRD final v3`. The final BRD is now treated as one shared team-authored document.

### 🔹 Dang Khanh Huyen (2301040088)

#### UC-05: Manage Menu

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-05: Manage Menu |
| **Primary Actor** | Manager |
| **Description** | The manager adds, edits, archives/stops selling menu items and manages categories, updates prices, images, and availability status |
| **Trigger** | The manager clicks "Menu Management" on the Admin WebApp |
| **Pre-conditions** | 1. The manager is logged in with "Manager" privileges |
| **Post-conditions** | The menu is successfully updated; changes are immediately reflected on the Client WebApp |
| **Normal Flow** | 1.1. The manager selects "Menu Management" |
| | 1.2. The system displays the menu list organized by categories (Wonton Noodles, Wontons, Beverages…) |
| | 1.3. The manager clicks "Add New Item" |
| | 1.4. The system displays a form: Item Name, Category, Price, Description, Image, Available Toppings |
| | 1.5. The manager enters the information, uploads an image, and clicks "Save" |
| | 1.6. The system validates the data, saves the new item, and displays "Item added successfully!" |
| **Alternative Flows** | 2a. Edit item: At step 1.2, the manager clicks "Edit" on an item → The system displays the edit form with current data → The manager edits and clicks "Update" → Success |
| | 2b. Archive / stop selling item: At step 1.2, the manager clicks "Stop Selling" or "Archive" → The system displays a confirmation → The manager confirms → The item is hidden from the sellable menu but its order history and past reports are preserved. Only items that have never appeared in historical data may be physically deleted, and only when a higher-privileged Manager approves. |
| | 2c. Mark as out of stock: At step 1.2, the manager toggles the item status to "Out of Stock" → The system updates; the Client WebApp shows "Out of Stock" for that item |
| | 2d. Manage categories: The manager clicks "Manage Categories" → Add / edit / delete categories |
| **Exceptions** | E1: Duplicate item name — At step 1.5, the system displays "Item name already exists in this category!" |
| | E2: Invalid price — At step 1.5, price ≤ 0 → Displays "Price must be greater than 0!" |
| | E3: Image too large — At step 1.5, file > 5MB → Displays "Image exceeds 5MB. Please select a smaller file!" |
| | E4: Deleting a category with items — At step 2d, the system displays "Cannot delete a category that still contains items!" |
| **Priority** | High |

---

#### UC-04: View Order History

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-04: View Order History |
| **Primary Actor** | Registered Customer |
| **Description** | The customer reviews a list of previously placed orders, including item details, order status, and payment information |
| **Trigger** | The customer clicks "Order History" in their account section |
| **Pre-conditions** | 1. The customer is logged in. 2. The customer has at least 1 previous order |
| **Post-conditions** | The order history list is displayed successfully |
| **Normal Flow** | 1.1. The customer clicks "Order History" |
| | 1.2. The system displays the order list (Order ID, Date, Total Amount, Status) sorted by most recent |
| | 1.3. The customer clicks on an order |
| | 1.4. The system displays the details: Item list with toppings, Quantities, Price per item, Total amount, Payment method, Service type, Order time |
| | 1.5. The customer finishes reviewing and clicks "Back" |
| **Alternative Flows** | 2a. Filter by status: At step 1.2, the customer selects a filter (All / In Progress / Completed / Cancelled) → The list is filtered accordingly |
| **Exceptions** | E1: No orders found — At step 1.2, the system displays "You don't have any orders yet. Order now!" with a button linking to the menu |
| **Priority** | Medium |

---

### 🔹 Le Thanh Dat (2301040036)

#### UC-15: Rate Order

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-15: Rate Order |
| **Primary Actor** | Registered Customer |
| **Description** | After receiving their order and upon completion, the customer rates the service quality and food using a star rating (1–5) with optional text review. Data is used to improve quality and generate reports for management |
| **Trigger** | The order status changes to "Completed" → The system displays a popup/notification inviting the customer to rate |
| **Pre-conditions** | 1. The customer is logged in (Registered Customer). 2. The order is in "Completed" status. 3. The customer has not rated this order |
| **Post-conditions** | The review is saved successfully. Management can view it in statistics reports |
| **Normal Flow** | 1.1. The system displays a popup "Rate Order #X" after the order is completed |
| | 1.2. The customer selects a star rating (1–5) for criteria: Food Quality, Service Speed, Overall Experience |
| | 1.3. The customer enters a text review (optional, max 500 characters) |
| | 1.4. The customer clicks "Submit Review" |
| | 1.5. The system validates the data (at least 1 star required) and saves the review |
| | 1.6. The system displays "Thank you for your review! Your feedback helps us improve!" |
| **Alternative Flows** | 2a. Rate later: At step 1.1, the customer clicks "Later" → Popup closes. The customer can rate from "Order History" within 7 days |
| | 2b. Rate from History: The customer goes to "Order History" → Selects an unrated order → Clicks "Rate" → Continues from step 1.2 |
| **Exceptions** | E1: Already rated — At step 1.1, displays "You have already rated this order!" with the previous review content |
| | E2: Rating expired — At step 2b, order older than 7 days → Displays "The rating period for this order has expired" |
| | E3: Inappropriate content — At step 1.4, the system filters language → Displays "Please review your comment content!" |
| **Priority** | Medium |

---

#### UC-13: Receive Kitchen Orders

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-13: Receive Kitchen Orders |
| **Primary Actor** | Back-of-House Staff (BOH) |
| **Description** | Kitchen staff views the list of new orders requiring preparation on the kitchen display, accepts orders, and begins cooking |
| **Trigger** | A new order is created (from an online customer or in-store cashier). The system plays a notification sound |
| **Pre-conditions** | 1. Kitchen staff is logged in with "Kitchen" privileges. 2. There is at least 1 new order |
| **Post-conditions** | The order status changes from `Pending Confirmation` to `Cooking`. The customer is notified |
| **Normal Flow** | 1.1. The system displays the kitchen screen with a list of new orders (Order ID, Item List, Notes, Service Type, Order Time) |
| | 1.2. Kitchen staff reviews the order details (items, quantities, toppings, special notes) |
| | 1.3. Kitchen staff clicks "Accept Order" |
| | 1.4. The system updates the order status to `Cooking` |
| | 1.5. The system sends a notification to the customer: "Order #X is now cooking" |
| **Alternative Flows** | 2a. Report cannot fulfil before cooking starts: For a Dine-in order that has not yet entered production, the kitchen clicks "Report Cannot Fulfil" → Enters a reason (e.g., out of ingredients) → The system notifies the FOH/Manager to coordinate with the customer and continue handling. **Note:** `Paid` Takeaway/Pickup orders do not display a "Reject" button; if the kitchen cannot fulfil them, the kitchen clicks "Report Issue" → The system escalates to the Manager for exception handling (substitute item / reschedule / refund). |
| | 2b. Multiple orders simultaneously: The kitchen accepts orders in FIFO order (oldest order first) |
| | 2c. Only a portion of the order has an issue: If a single item in an accepted order runs out of ingredients or cannot be prepared, the kitchen flags an order issue on that specific item instead of silently dropping the entire order. The system notifies FOH/Manager to decide on substitution, partial refund, or full cancellation before continuing the remaining items. |
| **Exceptions** | E1: Order cancelled before acceptance — At step 1.3, the system displays "Order has been cancelled by the customer" → The order is removed from the list |
| | E2: Connection lost — The system displays "Connection lost! The order list may not be updated. Please verify!" |
| | E3: An item is 86'd after the order has appeared on the KDS — The system locks the item for new orders and also raises an order-issue flag on the existing order so Manager/FOH can decide on substitution or refund; the kitchen must not silently drop the item while continuing to treat the order as normal. |
| **Priority** | High |

---

### 🔹 Nguyen Dinh Chien (2301040025)

#### UC-14: Update Dish Status

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-14: Update Dish Status |
| **Primary Actor** | Back-of-House Staff (BOH) |
| **Description** | After finishing cooking, the kitchen staff updates the dish/order status to `Ready` so the system can notify service staff and the customer |
| **Trigger** | Kitchen staff completes the preparation of dishes in an order |
| **Pre-conditions** | 1. Kitchen staff is logged in. 2. The order is in `Cooking` status |
| **Post-conditions** | The order changes to `Ready`. Notifications are sent to service staff and the customer. **Note:** The order only transitions to `Completed` at the next step when the Server taps "Delivered" (Dine-in) or the Cashier taps "Customer Picked Up" (Takeaway/Pickup) — not in this UC. |
| **Normal Flow** | 1.1. Kitchen staff views the list of orders currently being prepared |
| | 1.2. The kitchen completes preparation and clicks "Done" on the order |
| | 1.3. The system displays a confirmation: "Mark Order #X as ready?" |
| | 1.4. The kitchen clicks "Confirm" |
| | 1.5. The system updates the status to `Ready` |
| | 1.6. The system sends notifications: service staff receives "Order #X is ready – Table Y" | customer receives "Your order is ready!" |
| **Alternative Flows** | 2a. Grouped / batch update: The system does not force the kitchen to tap "Done" per single bowl; the kitchen may group items prepared together across multiple orders and update their status in one action. |
| | 2b. Add note for server: At step 1.2, the kitchen adds a note (e.g., "Hot dish, handle with care") → The server sees the note |
| **Exceptions** | E1: Order already cancelled — At step 1.2, the system displays "Order has been cancelled. Cannot update!" |
| | E2: Update error — The system displays "Update failed. Please try again!" |
| **Priority** | High |

---

#### UC-12: Assign Order to Table

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-12: Assign Order to Table |
| **Primary Actor** | Front-of-House Staff (FOH) |
| **Description** | The cashier assigns/transfers an order to a specific table on the floor plan, or attaches an additional order to an already-active table belonging to the same party |
| **Trigger** | The cashier needs to assign a new order to a table, the customer requests a table change, or the same party requests an additional order |
| **Pre-conditions** | 1. The cashier is logged in. 2. A Dine-in order exists that needs table assignment, transfer, or attachment to an active table. 3. The table layout has been configured |
| **Post-conditions** | The order is linked to the appropriate table. If the table was previously Available, it transitions to "Occupied"; if the order is an additional order for the same party, the table remains "Occupied" |
| **Normal Flow** | 1.1. The cashier opens the "Table Layout" section |
| | 1.2. The system displays the floor plan with color-coded statuses (Green: Available, Red: Occupied) |
| | 1.3. The cashier selects an appropriate table on the floor plan |
| | 1.4. The system displays table information (Table Number, Seating Capacity, current status, open orders if any) and the appropriate options such as "Assign New Order", "Attach Additional Order", or "Transfer Table" |
| | 1.5. The cashier selects an order to assign or confirms the additional order to attach to the selected table |
| | 1.6. The system links the order to the selected table. If the table was Available, it transitions to "Occupied"; if the table is already serving the same party, the system adds the new order to the existing table and keeps "Occupied" |
| | 1.7. The system displays a success message corresponding to the action taken |
| **Alternative Flows** | 2a. Transfer table: The cashier selects an occupied table → Clicks "Transfer Table" → Selects a new available table → Confirms → Old table reverts to "Available", new table becomes "Occupied" |
| | 2b. View table's orders: The cashier clicks on an occupied table → The system displays all orders currently attached to that table |
| | 2c. Attach an additional order to an active table for the same party: The cashier selects the active table → Clicks "Attach Additional Order" → Picks the new order → The system adds it to the table without creating a new party |
| **Exceptions** | E1: Table occupied by a different party — If the cashier attempts to assign a new party to an "Occupied" table that does not belong to the same party, the system displays "Table already has another party. Please select a different table or use the additional-order feature for the correct party." |
| | E2: Party size exceeds capacity — At step 1.5, the Cashier enters the party size when assigning a Dine-in table → if the party exceeds the table's seating capacity, the system displays "Table capacity is X guests. The party has Y guests!" and suggests a larger table. Note: party size is optional input by the Cashier and is not required when orders are placed via Client WebApp (customer self-service QR scan). |
| **Priority** | High |

---

### 🔹 Nguyen Thien Hieu (2301040071)
 
#### UC-16: Receive Order Notifications
 
| Field | Detail |
|-------|--------|
| **ID & Name** | UC-16: Receive Order Notifications |
| **Primary Actor** | Customer (Registered / Guest) |
| **Description** | The customer receives real-time notifications when the order status changes (Pending Confirmation, Cooking, Ready, Completed, Cancelled). Notifications appear as WebApp popups and optionally as browser push notifications |
| **Trigger** | The customer's order status is updated by kitchen staff or cashier |
| **Pre-conditions** | 1. The customer has at least 1 active (incomplete) order. 2. The customer has the Client WebApp open or has granted browser push notification permission |
| **Post-conditions** | The customer receives a notification with the latest status. The notification is saved to history |
| **Normal Flow** | 1.1. Kitchen staff/cashier updates the order status (e.g., `Cooking` -> `Ready`) |
| | 1.2. The system sends a real-time notification to the customer's Client WebApp |
| | 1.3. The Client WebApp displays a popup/toast: "Order #X: Your order is ready!" with a notification sound |
| | 1.4. The customer clicks the notification -> Navigates to the order tracking screen (UC-11) |
| | 1.5. The notification is marked as "Read" and saved to notification history |
| **Alternative Flows** | 2a. View notification history: The customer clicks the bell icon 🔔 -> The system displays the notification list (newest first) with a badge showing unread count |
| | 2b. Browser push notification: If the customer has granted push permission, the system sends notifications even when the WebApp tab is closed |
| | 2c. Mark all as read: The customer clicks "Mark all as read" -> Badge resets to 0 |
| **Exceptions** | E1: Connection lost -> Real-time notification cannot be delivered -> When the customer reopens the WebApp, the system syncs and displays all missed notifications |
| | E2: Push permission not granted -> At step 2b, the system displays "Enable notifications to receive faster order updates!" with an "Allow" button |
| | E3: Order cancelled -> The system sends a special notification: "Order #X has been cancelled. Reason: [Reason]" with warning style (red) |
| **Priority** | High |

---
#### UC-11: Track Order
 
| Field | Detail |
|-------|--------|
| **ID & Name** | UC-11: Track Order |
| **Primary Actor** | Customer (Guest / Registered) |
| **Description** | The customer tracks the current order status after placing an order, either through the account or via `Order Code + Phone Number` for guest orders |
| **Trigger** | The customer completes an order, clicks "Track Order", or opens an order notification |
| **Pre-conditions** | 1. The customer has at least 1 active order. 2. If the customer is a Guest, they must have the Order Code and the phone number used at checkout |
| **Post-conditions** | The customer views the latest updated status of the order |
| **Normal Flow** | 1.1. The customer opens the "Track Order" screen |
| | 1.2. If the customer is registered, the system loads active orders from the account; if the customer is a Guest, the system asks for `Order Code + Phone Number` |
| | 1.3. The system fetches the latest order status |
| | 1.4. The system displays the current state (e.g., `Pending Confirmation`, `Cooking`, `Ready`) together with relevant timing information |
| | 1.5. When the order status is updated by kitchen or management staff, the customer interface updates in real-time |
| **Alternative Flows** | 2a. Track multiple orders: The system allows the customer to select each active order and inspect its status |
| | 2b. Open from notification: The customer clicks a notification -> The system opens the corresponding order directly |
| **Exceptions** | E1: Connection lost -> The system cannot auto-update in real-time and prompts the customer to refresh the page manually |
| | E2: Guest enters invalid Order Code or Phone Number -> The system displays "No matching order found" |
| **Priority** | High |


