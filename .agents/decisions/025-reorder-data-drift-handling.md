# Decision 025: Reorder (UC-18) data drift handling

Date: `2026-04-17`

## Status
Accepted — approved on `2026-04-17`, scope lock of Decision `022` is unlocked for the specific changes in this ADR.

## Context
- The full 74-UC inventory includes `UC-18: Đặt lại đơn cũ` (Reorder). Decision `020` promoted `UC-18` into active final scope.
- `Reorder` lets a Registered Customer pick a past order from history and push its items into a new cart.
- Between the original order time and the reorder time, the menu can drift in several ways:
  - a menu item has been **deleted** (manual delete by Manager, UC-28)
  - a menu item has been **archived / deactivated** (status toggled to unavailable per `§3-restaurant-realism rule` that prefers archive over hard-delete)
  - a menu item **price changed** (Manager updated it, UC-27)
  - a topping or option attached to the old order is **no longer offered** (UC-31)
  - an item is temporarily **86'd** or out of stock at reorder time
  - the item's **category** has been reorganized
- `Business_Rules.md` does not currently address any of these cases. The risk is inconsistent behavior across devices and an unpleasant customer experience (silent drops, silent price increase, cart errors, lost history items).

## Decision (proposed)
Define explicit behavior per drift type, applied when the customer selects Reorder:

| Drift type | System behavior | UX |
|---|---|---|
| Item deleted | Drop from new cart | Show inline notice: "{item_name} không còn trên menu và đã được bỏ khỏi giỏ hàng" |
| Item archived / deactivated | Drop from new cart | Same notice as deleted |
| Price changed (higher or lower) | Use **current** price; do not preserve historical price | Inline notice: "Giá {item_name} đã thay đổi: {old} → {new}. Vui lòng kiểm tra tổng tiền" |
| Topping / option removed | Drop the missing topping only; keep the base item | Inline notice: "Topping {x} không còn phục vụ; món {item} đã bỏ topping này" |
| Item currently 86'd (temporarily out) | Keep in cart but flagged unavailable; block checkout until customer removes or waits | Inline warning + CTA to remove |
| Category reorganized | Invisible to customer; reorder cart works by item ID, not category | No notice needed |

Additional rules:
- Reorder **never** silently changes the final payable amount. Any drift that affects total price must be displayed before the customer proceeds to checkout.
- Reorder preserves customer-entered special notes ("ít cay") from the original order where possible, attaching them to the new cart lines.
- If **all** items in the old order are deleted/archived, show a graceful message: "Đơn này không còn món nào khả dụng" with a link back to menu.
- Reorder creates a brand-new order with a new order ID; it does not resurrect the old order's payment or state.

## Alternatives considered
- **Preserve historical price and pipe the old order straight through:** rejected because it creates a price-manipulation vector (customer could reorder an old low price forever) and confuses accounting.
- **Block the entire Reorder if any drift exists:** rejected as too punitive for common cases (customer's favorite order still mostly works).
- **Silently drop missing items without notice:** rejected because it damages trust and hides menu turnover from the customer.

## Consequences
- Adds defined behavior to `UC-18` spec instead of implementation-at-will.
- `Business_Rules.md` gains a new subsection (proposed `§2a` or as an extension of `§2` Account Rules under Registered Customer) describing Reorder semantics.
- BRD may not need changes if Reorder is already mentioned at high level; verify during integration.
- Minor UI work: inline drift notices, disabled checkout when 86'd items linger.
- This is a scope change against the `2026-04-17` lock and needs user sign-off.

## Resolved decisions
1. **Notice style:** Inline drift notices per cart line, plus a single consolidated summary banner at the top of the reorder review screen (e.g., "3 thay đổi so với đơn gốc"). No modal — modals would be intrusive when many items drift at once.
2. **Eligible source orders:** Reorder only works on source orders in `Completed` state. Orders in `Cancelled`, `Refunded`, `Write-off`, `Comp`, or `Forfeited` do not represent a meal the customer actually had, and offering them as reorder candidates is semantically wrong and potentially confusing.
3. **Retention:** Registered Customer order history is tied to the account and is NOT subject to the 12-month Guest anonymization rule from §2 (Registered customers have their own data lifecycle governed by account-level retention, not Guest anonymization). Reorder therefore works on any `Completed` order still present in the customer's history regardless of age.
