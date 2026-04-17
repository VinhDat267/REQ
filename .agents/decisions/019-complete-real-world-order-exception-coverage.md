# Decision 019: Complete real-world order-exception coverage without expanding the midterm UC scope

## Date
2026-04-16

## Status
Accepted

## Context
- After the previous restaurant-realism passes, the docs were materially better but still not complete enough for day-to-day restaurant operations.
- Several real-world exception paths were still under-specified:
  - late payment success after the system already auto-cancelled an order
  - duplicate payment callbacks / duplicate collection risk
  - customer request to modify an order after submission
  - one item in a paid order becoming unavailable after the order already exists
  - wrong handoff / mistaken completion by staff
  - overdue Takeaway collection
  - shift-close reconciliation with unresolved operational states
- These are common enough in real restaurants that leaving them implicit would keep the documentation idealized instead of operationally credible.

## Decision
- Late successful payment after auto-cancel must not silently reopen the order or push it into kitchen operations; it enters refund handling instead.
- Duplicate payment callbacks or retry signals must be treated idempotently so they cannot create duplicate kitchen tickets, duplicate orders, or duplicate normal-completion flows.
- Order modification is allowed before kitchen acceptance, but once kitchen processing has started it becomes a manager-handled exception rather than a silent edit.
- Item-level fulfilment failure in an existing order must support substitute / partial-refund / full-cancel decision paths instead of forcing an unrealistic all-or-nothing assumption.
- Wrong handoff and mistaken completion must be explicitly reversible within controlled audit rules when the customer has not actually received the correct order.
- Ready-but-uncollected Takeaway orders must be treated as overdue operational exceptions rather than silently disappearing into `Completed`.
- Shift close / reconciliation must explicitly review unresolved `Refund Pending`, `Write-off`, overdue `Ready`, and related exception cases.

## Consequences
- The root VN/EN requirement package now reads closer to an actual restaurant operating handbook than a happy-path prototype description.
- The selected midterm UC set remains intact; the extra realism is added as bounded business rules and exception handling rather than by inventing a new use-case set.
- Future sessions now have a clearer basis for reconciling kitchen flow, payment flow, refund flow, and cashier close-out behavior.
