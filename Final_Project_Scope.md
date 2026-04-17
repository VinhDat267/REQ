# Final Project Scope - Wonton POS

## Decision Snapshot
- Effective date: `2026-04-16`.
- Active lane: `final-project`.
- The repository should now be treated as full-system final-project work by default.
- The project is no longer limited to the midterm `16`-use-case subset.
- The final-project baseline is the whole-system inventory in [All_Use_Cases.md](All_Use_Cases.md).
- `All_Use_Cases.md` remains the master scope source, but `BRD final v3` may use a curated local UC lane that preserves the current `UC-01..UC-16` set and extends it with selected additional UCs from `UC-17+`.
- `BRD final v3` is a shared team-authored document; the older midterm-style per-member `2 UC` split no longer applies to the final BRD lane.
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
- silently changing the approved visible numbering lane of `BRD final v3`

Any future expansion must be recorded as a scope-change decision before the final BRD / SRS / diagram package is updated.

## Core Scope Sources
1. [All_Use_Cases.md](All_Use_Cases.md) is the primary final-project inventory and keeps the original detailed `UC-01..UC-74` master set.
2. This file defines the current final-project boundary and makes the older midterm artifacts archival references only.
3. [Business_Rules.md](Business_Rules.md) and [Business_Rules_EN.md](Business_Rules_EN.md) define shared business behavior and operational exception rules.
4. [BRD_Final_V3_UC_Shortlist.md](BRD_Final_V3_UC_Shortlist.md) defines the curated local authoring lane currently approved for `BRD final v3`.
5. [BRD_Ver0.md](BRD_Ver0.md), [BRD_Ver0_EN.md](BRD_Ver0_EN.md), and the current UC specification files remain midterm-era inputs until final replacements are promoted.

## Final Baseline Coverage
The final project should cover the locked whole-system baseline defined by `All_Use_Cases.md`, `Business_Rules*.md`, and this scope file.
Current repo work should be framed as full-system final-project work by default, not as a midterm-scoped package, unless the user explicitly asks to edit historical midterm artifacts.
For `BRD final v3`, the approved visible numbering lane is the curated local set described in `BRD_Final_V3_UC_Shortlist.md`, not the full `74`-entry master inventory.

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
- Final BRD v3 that supersedes the midterm-oriented `BRD_Ver0*` files while preserving local `UC-01..UC-16` and extending with selected `UC-17+`.
- Final SRS with full functional and non-functional requirement coverage.
- Decide explicitly later whether the final UC specification package follows the same curated local BRD lane or a broader master-inventory presentation lane; do not mix both silently.
- Full-system use case diagram aligned to `UC-01..UC-74`.
- At least two additional whole-system modelling types so the final package has `3` modelling types.
- Requirement management artifacts for scope, change, and risk management.
- Literature / online reference tracking with at least `10` sources.
- Thesis package and prototype evidence mapped back to final requirements.
