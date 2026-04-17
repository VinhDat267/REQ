# Decision 026: Shift-span order attribution

Date: `2026-04-17`

## Status
Accepted — approved on `2026-04-17`, scope lock of Decision `022` is unlocked for the specific changes in this ADR.

## Context
- `Business_Rules.md §3g` defines Shift Close & Reconciliation, including per-shift cash drawer handling and report breakdowns by payment method.
- Real operations produce orders that **span two shifts**:
  - A Dine-in party seated at 22:30 (shift: evening) may not pay until 00:45 (shift: overnight).
  - A Takeaway Paid order prepared at 23:50 may be picked up at 00:10.
  - A `Refund Pending` request raised at 22:00 may be confirmed as `Refunded` at 08:30 next day by the Manager.
- The locked rules do **not** say which shift these transactions belong to for revenue, cash drawer, or loss reporting. Without a rule, shift reports may double-count, drop events, or show inconsistent totals across devices.

## Decision (proposed)
Attribute each financial event to a shift based on the **event timestamp**, not the order creation time. Rules by event type:

| Event | Attributed to |
|---|---|
| Order creation (`Pending Confirmation`) | Not a financial event; not attributed to a shift for revenue purposes |
| Payment completion (`Paid`) | Shift that was **open at the moment `payment_status = Paid`** |
| Cash-drawer movement (cash in / cash out) | Shift that was **open at the moment of the cash movement** |
| Refund completion (`Refunded`) | Shift that was open when the refund **completed** (not when the request was created) |
| Write-off confirmation | Shift that was open when the Manager **confirmed** the write-off |
| Forfeited (if Decision 024 approved) | Shift that was open when the Manager **made the forfeited decision** |

Operational guardrails:

- A shift cannot close while open payment events on orders belonging to that shift are still pending. The operator must first resolve (`Refund Pending`, `Write-off` awaiting Manager, overdue Pickup decisions) or explicitly hand them over to the next shift with a carry-over note logged in audit.
- Cross-shift carry-over must be visible on the next shift's opening screen (list of "inherited exceptions").
- Reports show each shift's own events. An order that paid in shift A and refunded in shift B shows revenue in A and refund deduction in B; the end-of-day roll-up still balances, but per-shift reports each tell their own truth.
- For Dine-in seated before close time but paid after close time: revenue belongs to the shift where **payment** landed. The dish cost belonged to the earlier shift in practice, but cost attribution is out of scope for the baseline (no COGS model yet).

## Alternatives considered
- **Attribute everything to order creation shift:** rejected because cash actually lands in the later shift's drawer; accountant would find the mismatch.
- **Attribute everything to the shift that closes the order:** rejected because large payments could skip shifts and make the intermediate shift's report look empty.
- **Freeze shift boundaries (disallow late-night Dine-in parties crossing close):** rejected as unrealistic for a restaurant.

## Consequences
- `Business_Rules.md §3g` gains an explicit subsection on shift-span attribution.
- Shift-open screen must display inherited exceptions from the prior shift.
- Shift-close screen must allow explicit carry-over of still-pending events.
- No new data model field required; events are already timestamped.
- This is a scope change against the `2026-04-17` lock and needs user sign-off.

## Resolved decisions
1. **Shift model:** The baseline supports **multi-shift-per-day** as the general case. A single-shift shop is a degenerate case of this model (shift open at opening time, shift close at closing time) and works without special logic. The rules in this ADR therefore apply to both small shops (one shift = one day) and larger shops (multiple shifts).
2. **Carry-over scope:** The "inherited exceptions" list presented at the next shift opening is **restricted** to the following states only:
   - `Refund Pending` not yet confirmed
   - Overdue Takeaway / Pickup awaiting Manager decision (hold / remake / refund / Forfeited)
   - `Write-off` proposed by Cashier but not yet Manager-confirmed
   - `Forfeited` proposed but not yet Manager-confirmed
   - Dine-in orders in `Completed + Unpaid` that have not been settled
   Any other `in-flight` state (e.g., `Pending Confirmation`, `Cooking`, `Ready` that is still within normal operating expectations) is not an inherited exception — it is just in-flight operational work.
3. **Scope of this rule:** Shift-level only. The daily report is a straight aggregation across the day's shifts and does not need special attribution logic; each event already belongs to exactly one shift.
