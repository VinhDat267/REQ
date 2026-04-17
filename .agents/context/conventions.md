# Conventions - Wonton POS

## 1. Source of Truth
- Root requirement documents are the official source of truth.
- `.agents/context/` is working memory for agents.
- If root requirements change, `.agents/` must be updated to match.

## 2. Phase Labels
- Active default after `2026-04-16`: `final-project`.
- Treat the repository itself as `final-project` by default.
- Use `midterm-locked` only for explicitly historical subset artifacts built around the local `UC-01..UC-16` numbering.
- Use `final-project` for current whole-system artifacts required by the official final brief.
- Do not use these labels interchangeably.

## 3. Document Language
- Official documents may exist in both Vietnamese and English.
- Internal `.agents/` docs should stay concise and easy to maintain.
- When business logic changes, sync both VN and EN files if parallel documents exist.
- Final thesis-facing diagrams and slides should remain in English even if spoken presentation is Vietnamese.

## 4. Use Case Numbering

### Master Whole-System Inventory
- The official final-project master inventory is [All_Use_Cases.md](../../All_Use_Cases.md)
- It keeps the original `UC-01..UC-74` inventory as the scope-check and full-system reference source
- `UC-50` remains the explicit `Delivery` out-of-scope placeholder inside the master inventory unless a later scope decision changes it
- `UC-74` is notification-only and must not be reused as an audit / override / exception catch-all

### Current BRD Final V3 Lane
- `BRD final v3` preserves the team's existing visible IDs by keeping `UC-01..UC-16`
- The approved next extension is `UC-17+`, following [BRD_Final_V3_UC_Shortlist.md](../../BRD_Final_V3_UC_Shortlist.md)
- Treat this as a curated authoring lane for the BRD, not as a replacement for the whole-system master inventory
- Do not force original master IDs into the main BRD final v3 narrative unless the user explicitly asks for traceability or remapping

### Relationship Notes
- Use `include` when a use case contains mandatory reused sub-behavior
- Use `extend` when a use case adds conditional / variant behavior to another use case
- Keep relationship notes directly on the relevant artifact's `UC-xx` lane instead of introducing a third numbering layer just to explain structure

### Local 16-UC Midterm Set
- Originated in the historical midterm BRD / UC specification package
- Numbered `UC-01` to `UC-16`
- Those IDs are now also the preserved prefix of the approved local final BRD lane
- The old midterm docs themselves remain historical artifacts
- Original 74-UC identifiers should appear only when explicit traceability is needed
- The primary midterm use case diagram is `docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml`
- `Usecasediagramreq.drawio` is a synced legacy review / submission artifact, not the primary logic source

## 5. Final-Project Narrative Rules
- Keep exactly one client problem statement across final BRD, thesis, and presentation materials.
- Treat the final-project lane as whole-system work unless the artifact explicitly says otherwise.
- Treat the business baseline as locked after `2026-04-17`; do not add new business capabilities without a scope-change ADR.
- Do not claim the final package is complete until root docs have been promoted, not just `.agents/`.
- Track the final-project brief date as `2026-05-04` (`4 May 2026`) in this repo context.

## 6. Key Terminology
- Service models: `Dine-in`, `Takeaway`, `Pickup`
- Actors: `Manager`, `FOH Staff`, `BOH Staff`, `Registered Customer`, `Guest Customer`
- Guest tracking: `Order Code + Phone Number`
- Do not reintroduce delivery-only states or wording into the current scope
- Prefer precise wording such as `cash at counter` over vague phrases like `pay on receipt`

## 7. Canonical State Model

### Order Status
`Pending Confirmation -> Cooking -> Ready -> Completed / Cancelled`

### Payment Status
`Pending Online Payment / Unpaid / Paid / Refund Pending / Refunded / Write-off`

`Write-off` is a manager-approved loss-recording state for dine-in bad debt, not a successful customer payment.

## 8. Locked Business Rules
- `Takeaway` and `Pickup` must be prepaid
- `Dine-in` may be paid later
- `Pickup` auto-accepts after slot / capacity validation
- Guests can track orders without login if they have `Order Code + Phone Number`
- KDS supports FIFO, batch updates, and 86'd items
- Active dine-in tables may contain multiple open orders for the same party
- `Reorder` belongs to the active final-project baseline through original `UC-18`
- Cashier shift close must reconcile cash, bank-transfer QR, online payments, refunds, duplicate collections, and write-offs
- Sensitive financial/operational overrides require a reason and audit log
- Promotion, complaint/remake, outage recovery, receipt/invoice, and inventory-lite policies are part of the final operational baseline
- After the `2026-04-17` lock, these rules may be clarified or mapped but not expanded silently.

## 9. Brain Update Rules
- After major requirement changes:
  - update `current-status.md`
  - add a journal entry if the change is meaningful
  - add a decision record if direction or business logic changed
- When the repo moves from docs to code:
  - update `architecture.md`
  - update `.agents/rules.md`
  - extend conventions for the real implementation stack

## 10. Diagram Policy
- Prefer `PlantUML` or `Mermaid` as editable / canonical sources
- `Usecasediagramreq.drawio` is the approved legacy exception kept at root
- If `.drawio` and PlantUML differ, lock logic against BRD + PlantUML first
- New draw.io files should live under `docs/diagrams/drawio/`
- Midterm activity draw.io files should normally be relayout-only unless a reviewed spec-alignment change is explicitly required
- `scripts/relayout_activity_drawio.py` is the canonical relayout / controlled auto-fix script for the midterm activity set
- Final-project whole-system diagrams should be named and stored so they do not silently overwrite midterm artifacts

## 11. Requirements Table Format
- Functional and non-functional requirement tables use 5 columns:
  - `REQ#`
  - `PRIORITY`
  - `DESCRIPTION`
  - `RATIONALE`
  - `USE CASE`
- `REQ#` keeps the `FR-xx` / `NFR-xx` form
- Midterm BRD uses the local 16-UC subset in the `USE CASE` column
- Current BRD final v3 should use the approved local final BRD lane in the `USE CASE` column
- If a later final SRS uses the master inventory directly, mark that choice explicitly instead of mixing the two lanes silently
