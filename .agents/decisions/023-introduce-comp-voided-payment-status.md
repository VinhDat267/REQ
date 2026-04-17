# Decision 023: Introduce `Comp` / `Voided-by-Management` payment status

Date: `2026-04-17`

## Status
Accepted — approved on `2026-04-17`, scope lock of Decision `022` is unlocked for the specific changes in this ADR.

## Context
- The locked baseline as of Decision `022` recognizes three terminal no-revenue outcomes for an order:
  - `Cancelled` — order aborted before service, no cost incurred.
  - `Write-off` — service delivered, customer left without paying. Loss recorded (cost incurred but revenue not collected).
  - "Free / comp" — the shop **proactively decides not to charge** (for example, severe preparation error, goodwill gesture, VIP treatment, food-safety incident). This is operationally distinct: the shop owes the customer nothing, but the order must not inflate revenue.
- `Business_Rules.md §3i` (Complaint / Remake Rules) mentions "giảm giá thiện chí / hoàn tiền một phần / ghi nhận thất thoát nội bộ" for paid orders, but does **not** define a clean status for the case of an **unpaid Dine-in order that the shop voluntarily voids** (e.g., Manager decides "món lỗi, miễn phí cho khách" before any payment was collected).
- Without a dedicated status, such cases collapse into either:
  - `Cancelled + Unpaid` → accounting cannot distinguish "customer changed mind" from "shop comped the meal". KPI and waste reporting get noisy.
  - `Write-off` → semantically wrong because no one abandoned payment; the shop **chose** to not collect.

## Decision (proposed)
Introduce a new terminal `payment_status` value: `Comp` (equivalent to "Voided-by-Management / Complimentary").

- Triggered by: Manager explicitly comping an order (paid or unpaid) with a reason.
- Ends order lifecycle: `order_status` goes to `Completed` (if food was actually served) or `Cancelled` (if not served).
- Financial semantics:
  - `Comp` on an **unpaid** order: no revenue recorded, cost of goods recorded as "comp expense" on reports.
  - `Comp` on a **paid** order: triggers refund flow (`Refund Pending → Refunded`) and reclassifies the transaction as comp expense, not normal revenue.
- Required audit fields: Manager ID, reason (free text or categorized dropdown), linked order, cost amount, timestamp.
- Manager-only action. Cashier and Kitchen cannot comp an order.
- Reporting: `Comp` amount must be tracked separately from `Write-off`, `Refunded`, and normal revenue on shift-close and end-of-day reports.

## Alternatives considered
- **Reuse `Write-off`:** rejected because the intent differs (voluntary vs unintended loss) and mixing them ruins the loss-analysis signal.
- **Use `Cancelled` with a flag:** rejected because `Cancelled` already means "order aborted before service" in the model; a comp on a **consumed meal** must still read as `Completed`.
- **Do nothing:** accepted risk only if the shop rarely comps. In practice, F&B shops comp regularly; reviewer will likely ask.

## Consequences
- Adds one payment status (`Comp`) and one Manager-level UC (or extension to UC-53 / UC-64 / existing complaint flow).
- BRD `§11.2 Payment Status` table needs a new row.
- Business Rules `§3i` gains an explicit "comp path" separate from remake/refund.
- Shift-close reports (`§3g`) must add a "Comp" column.
- This is a scope change against the `2026-04-17` lock and needs user sign-off before edits land in the locked documents.

## Resolved decisions
1. **Name:** `Comp`. Chosen because it is standard F&B industry terminology (Toast, Square, Lightspeed all use "Comp"). `Voided` overlaps with transaction-void semantics which is different.
2. **Eligible order states:** `Comp` is allowed on orders in `Cooking`, `Ready`, or `Completed`. For orders still in `Pending Confirmation` (not yet kitchen-accepted), the correct action is plain `Cancelled` — there is no food to comp yet.
3. **Approval threshold:** Single-Manager approval, aligned with `§3k` Manager Override simplicity. No 2-man rule in the baseline. If a shop later requires dual approval for large comps, that extension requires a new ADR.
