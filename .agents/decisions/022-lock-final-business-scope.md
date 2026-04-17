# Decision 022: Lock Final Business Scope

Date: `2026-04-17`

## Status
Accepted

## Context
- The project has moved from the midterm 16-UC subset to the final whole-system baseline.
- Decisions `020` and `021` promoted the full 74-UC inventory and operational POS policies into final scope.
- The user asked to lock the business scope so work can move from discovery/expansion into final documentation packaging.

## Decision
Lock the Wonton POS final business baseline as of `2026-04-17`.

Allowed after the lock:
- clarify wording
- align Vietnamese and English documents
- map rules into final BRD, SRS, UC specifications, diagrams, traceability matrices, and thesis sections
- split or renumber requirements for readability while preserving existing business behavior
- fix contradictions inside the locked scope

Not allowed after the lock without explicit user approval and a new scope-change ADR:
- adding a new service model
- reintroducing Delivery
- adding new major actors or modules
- promoting extension candidates into baseline
- changing locked payment, refund, cancellation, pickup, table, KDS, shift, promotion, complaint, audit, receipt, or inventory-lite policies
- replacing the original `UC-01..UC-74` final numbering baseline

## Consequences
- Future work should focus on final BRD, final SRS, full UC specifications, diagrams, requirement management, references, prototype mapping, and thesis packaging.
- Extension candidates remain parked unless the user explicitly reopens scope.
- Any business expansion must be traceable as a new decision, not slipped into final docs during rewriting.
