# Rules for AI - Wonton POS

1. Read `.agents/context/project-overview.md` and `.agents/context/current-status.md` before doing substantial work.
2. This is a documentation-first REQ repository. Do not assume real implementation exists unless it is present in `src/`.
3. Root requirement documents are the source of truth. `.agents/` is supporting working memory. `AGENTS.md` is the shared cross-tool rule foundation, not a second source of truth.
4. Keep `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agents/rules/`, `.agents/context/codex-bridge.md`, and `.agents/README.md` aligned whenever agent-facing workflow changes.
5. When business logic changes, update root requirement docs first, then sync:
   - `.agents/context/current-status.md`
   - ADRs
   - journal
   - supporting navigation docs
6. `Delivery` is out of scope. Do not reintroduce delivery states, fields, or flows.
7. Use the locked terminology:
   - `Dine-in`
   - `Takeaway`
   - `Pickup`
   - `order_status` separate from `payment_status`
   - guest tracking via `Order Code + Phone Number`
8. For `midterm-locked` artifacts:
   - use only the local `UC-01..UC-16` set for scope, FR / NFR references, and the main use case diagram
   - mention original 74-UC identifiers only through traceability fields such as `UC Goc` / `Original UC`
9. For `final-project` whole-system artifacts:
   - treat `final-project` as the active default after `2026-04-16`
   - use `Final_Project_Scope.md` as the scope boundary
   - use the original 74-UC inventory in `All_Use_Cases.md` as the primary reference
   - explicitly label the work as `final-project`
   - do not pretend the current midterm-era BRD / UC spec files are already the final package
   - treat business scope as locked after `2026-04-17`; only clarify/map/package unless the user explicitly reopens scope and a new ADR records it
10. When doing final-package work, keep exactly one client problem statement across BRD, thesis, and presentation material.
11. Final-project expectations from the reviewed brief include:
   - at least `10` literature / article / online references
   - full-version requirements and UC specifications
   - `3` modelling types for the whole system
   - elicitation notes with `plan / prepare / conduct / confirm`
   - requirement management:
     - change
     - risk
     - scope
   - prototype evidence
12. Diagram policy:
   - prefer `PlantUML` or `Mermaid` for new canonical diagram work
   - `Usecasediagramreq.drawio` is the synced legacy review / submission artifact at repo root
   - if draw.io and PlantUML diverge, resolve logic against BRD + PlantUML first
   - store new draw.io files under `docs/diagrams/drawio/`, not at repo root
   - use `scripts/relayout_activity_drawio.py` as the canonical relayout helper for midterm activity draw.io files
   - keep final-project whole-system diagram names distinct from midterm ones
13. If a change affects project direction or core business logic, add a decision record under `.agents/decisions/`.
14. After a meaningful work session, update `.agents/journal/` when appropriate.
15. When the project leaves the documentation-first phase, update `architecture.md`, `conventions.md`, `README.md`, `AGENTS.md`, and the workflow runbooks.
