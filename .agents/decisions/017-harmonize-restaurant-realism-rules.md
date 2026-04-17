# Decision 017: Harmonize midterm business rules against real restaurant operations

## Date
2026-04-16

## Status
Accepted

## Context
- The root requirement package had already been improved for realistic restaurant operations, but several contradictions still remained between:
  - `Business_Rules`
  - `BRD`
  - `UC Specifications`
- The most important gaps were operational rather than cosmetic:
  - UC-02 still implied that bank-transfer QR payment behaved like a callback-backed payment gateway flow.
  - UC-13 still implied that unpaid Takeaway could appear on the kitchen queue, which conflicted with the prepaid Takeaway rule.
  - UC-12 still treated an occupied table as categorically unavailable, which conflicted with the established multi-order-per-table model.
  - Menu deletion wording was too aggressive for a POS that must preserve historical order and reporting data.
  - Pickup overdue/no-show handling and the availability-vs-no-offline assumption needed clearer wording.

## Decision
- Treat **Bank Transfer QR** as a manual-confirmation path everywhere it appears in the documentation unless a separate bank API integration is explicitly introduced.
- Enforce that **Takeaway only enters kitchen operations after payment is confirmed**.
- Allow **additional dine-in orders to be attached to an already active table for the same party**, while still blocking assignment of a new unrelated party onto an occupied table.
- Treat historical menu items as **archive/deactivate first**, not hard-delete first.
- Treat **late/no-show Pickup** as a manager-handled operational exception rather than an automatic completion/refund path.
- Clarify that manual `86'd` handling and grouped KDS batch updates stay in scope, while detailed inventory automation remains out of scope.
- Clarify that the 99% availability target applies to the application/cloud layer, not to local internet/power conditions already covered by the no-offline-mode assumption.

## Consequences
- The root requirement package now models restaurant operations more credibly for demo, review, and downstream design work.
- Future agents can rely on one consistent interpretation of QR payment, kitchen intake, and active-table behavior.
- Reporting and auditability are improved because historical menu items are preserved and `Write-off` is treated as a loss-recording state rather than a successful payment outcome.
