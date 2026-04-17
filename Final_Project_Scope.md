# Final Project Scope - Wonton POS

## Decision Snapshot
- Effective date: `2026-04-16`.
- Active lane: `final-project`.
- The project is no longer limited to the midterm `16`-use-case subset.
- The final-project baseline is the whole-system inventory in [All_Use_Cases.md](All_Use_Cases.md).
- Midterm artifacts remain useful only as historical submission and traceability references until final replacements are promoted.
- Business scope lock date: `2026-04-17`.
- Business baseline is now locked for final documentation and diagram work.

## Business Scope Lock
As of `2026-04-17`, the Wonton POS business baseline is locked.

Allowed after lock:
- clarify wording without changing behavior
- translate VN/EN documents consistently
- map business rules into final BRD, SRS, UC specifications, diagrams, traceability matrices, and thesis sections
- split large requirements into clearer requirements while preserving the same behavior
- fix contradictions or missing references inside the locked scope

Not allowed after lock without an explicit user decision and a new ADR:
- adding new service models
- reintroducing `Delivery`
- adding new major actors or major modules
- promoting candidate extensions into baseline
- changing locked payment, refund, cancellation, pickup, table, KDS, shift, promotion, complaint, audit, receipt, or inventory-lite policies
- changing the final numbering baseline away from original `UC-01..UC-74`

Any future expansion must be recorded as a scope-change decision before the final BRD / SRS / diagram package is updated.

## Canonical Scope Sources
1. [All_Use_Cases.md](All_Use_Cases.md) is the primary final-project use-case inventory and also defines the canonical `CUC-xx` presentation layer for final diagram / BRD / SRS work.
2. This file defines the current final-project boundary and explains how to treat older midterm artifacts.
3. [Business_Rules.md](Business_Rules.md) and [Business_Rules_EN.md](Business_Rules_EN.md) define shared business behavior and operational exception rules.
4. [BRD_Ver0.md](BRD_Ver0.md), [BRD_Ver0_EN.md](BRD_Ver0_EN.md), and the current UC specification files are midterm-era inputs until a final BRD / SRS / UC specification package is created.

## Final Baseline Coverage
The final project should cover the original `UC-01..UC-74` inventory, with `UC-50` kept as an explicit `Delivery` exclusion rather than an implemented delivery workflow. For presentation and modelling purposes, the final package should prefer the canonical `CUC-xx` layer in `All_Use_Cases.md` and map it back to the detailed inventory.

| Area | Use Cases | Final Scope Meaning |
|------|-----------|---------------------|
| Customer account and authentication | UC-01..UC-06 | Registration, login, logout, password reset, profile update, password change |
| Customer menu, cart, promotions, and reorder | UC-07..UC-12, UC-16..UC-18, UC-20 | Menu browsing, search/filter, cart, service selection, discount code use, order history, reorder, rating |
| Customer order, payment, pickup, and notification flow | UC-13..UC-15, UC-19, UC-21..UC-24 | Online/counter payment rules, tracking, cancellation, pickup scheduling/history/cancellation, real-time notifications |
| Manager operations | UC-25..UC-48 | Dashboard, menu/category/topping management, table management, pickup exception handling, staff and permission management, reporting, promotions |
| FOH cashier operations | UC-49, UC-51..UC-61 | In-store order creation, online order confirmation, order cancellation, cash/QR/online payment handling, invoice/kitchen ticket printing, table assignment/transfer/release |
| Delivery placeholder | UC-50 | Explicitly out of scope unless a later decision reintroduces delivery |
| BOH kitchen operations | UC-62..UC-67 | New-order queue, kitchen acceptance/rejection rules, item status updates, ready marking, 86'd ingredient/menu handling |
| FOH serving operations | UC-68..UC-70 | Ready-order service, handoff confirmation, table cleanup status |
| Admin common operations | UC-71..UC-74 | Admin login/logout, password change, operational notifications |

## Required Final Flow Coverage
Final requirements, diagrams, and UC specifications must cover the full real system flow, not only the midterm happy path:

- guest and registered customer paths, including guest order tracking by `Order Code + Phone Number`
- menu search/filter, cart update, promotion code validation, and reorder from history
- Dine-in, Takeaway, and Pickup service models
- Takeaway and Pickup prepayment before kitchen intake
- Dine-in counter settlement after service
- Pickup slot validation, auto-acceptance, late pickup, no-show, and kitchen escalation
- payment failure, repeated payment failure, duplicate payment callbacks, late successful callbacks, refund pending, partial refund, full refund, refund failure, and end-of-day reconciliation
- order cancellation, post-submission edit requests, item-level fulfilment failure, substitution, wrong handoff, mistaken completion, and manager correction
- KDS FIFO behavior, grouped item updates, 86'd item propagation, and paid-order exception escalation
- table assignment, table transfer, table release, active dine-in tables with multiple open orders, and server handoff
- menu/category/topping management, staff role management, promotion management, reporting, and admin notification flows
- cashier shift opening/closing, cash drawer count, end-of-day reconciliation, and unresolved exception review
- refund/void/cancel approval, manager override audit trail, and sensitive action reason capture
- promotion validity, usage limits, stacking rules, cancellation behavior, and promotion auditability
- customer complaint, remake, goodwill discount, post-service refund, and internal loss handling
- printer/KDS/network/payment outage fallback with manual recovery and later reconciliation
- receipt reprint, receipt cancellation, VAT/tax invoice capture where required, and invoice correction notes
- inventory-lite controls for 86'd items, manual stock adjustment, waste/spoilage notes, and low-stock warnings

## Candidate Final Extensions Beyond The Current Baseline
The following flows are realistic for a production restaurant POS but should remain extension candidates unless the team intentionally expands the final baseline:

- split bill, merge bill, merge table, and party transfer beyond basic table transfer
- offline order capture and later synchronization
- detailed inventory deduction, purchase stock-in, and supplier management beyond inventory-lite controls
- loyalty points, membership tiers, and customer wallet balance
- full accounting ledger, payroll, and supplier payable management
- native mobile app and third-party delivery platform integration

## Final Deliverables To Promote Next
- Final BRD that supersedes the midterm-oriented `BRD_Ver0*` files.
- Final SRS with full functional and non-functional requirement coverage.
- Final UC specifications mapped to original `UC-01..UC-74` numbering.
- Canonical full-system use case diagram.
- At least two additional whole-system modelling types so the final package has `3` modelling types.
- Requirement management artifacts for scope, change, and risk management.
- Literature / online reference tracking with at least `10` sources.
- Thesis package and prototype evidence mapped back to final requirements.
