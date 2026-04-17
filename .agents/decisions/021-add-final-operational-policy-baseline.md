# Decision 021: Add Final Operational Policy Baseline

Date: `2026-04-16`

## Status
Accepted

## Context
- After promoting final-project scope to the full 74-UC inventory, the remaining gap was not only more use cases, but more realistic restaurant operations.
- A final POS system needs policies for money handling, staff accountability, exception recovery, and operational auditability.
- These policies should be part of the final baseline even if some do not appear as standalone use cases in the current 74-UC inventory.

## Decision
Add the following P0 operational policies to final scope and root business rules:

1. Cashier shift opening/closing and cash drawer reconciliation.
2. Payment-method reconciliation across cash, bank-transfer QR, online gateways, refunds, duplicate collections, and write-offs.
3. Promotion validity, usage limits, stacking rules, cancellation behavior, and promotion audit history.
4. Complaint, remake, goodwill discount, post-service refund, and internal-loss handling.
5. KDS/printer/network/payment outage fallback and post-outage recovery.
6. Manager override audit logging for sensitive financial and operational actions.
7. Receipt reprint, receipt adjustment, and prototype-level VAT/tax information capture.
8. Inventory-lite controls for low stock, 86'd items, manual adjustment, waste, and spoilage.

## Consequences
- Final BRD / SRS / UC specs must include operational policy coverage, not just customer order and payment flows.
- These rules make the system appear like a complete small-restaurant POS while still avoiding large enterprise extensions such as full accounting, payroll, supplier procurement, native mobile apps, and delivery integrations.
- Split bill, merge table, full offline sync, loyalty, and full inventory procurement remain extension candidates unless separately promoted.
