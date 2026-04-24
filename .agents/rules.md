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
   - use this label only when the user explicitly asks to inspect or maintain historical midterm submission materials
   - use only the local `UC-01..UC-16` set for scope, FR / NFR references, and the main use case diagram
   - mention original 74-UC identifiers only through traceability fields such as `UC Goc` / `Original UC`
9. For `final-project` whole-system artifacts:
   - treat `final-project` as the repository-wide active default after `2026-04-16`
   - use `Final_Project_Scope.md` as the scope boundary
   - use `All_Use_Cases.md` as the master whole-system inventory / scope reference
   - for `BRD final v3`, preserve the current local `UC-01..UC-16` set and extend the visible BRD lane with selected `UC-17+`
   - do not force the original master IDs into the main BRD narrative unless the user explicitly asks for mapping or traceability
   - explicitly label current work as `final-project` unless the task is archival midterm maintenance
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
   - use `PlantUML` for UML Activity Diagrams, use-case diagrams, ERDs, and other UML-style canonical diagram work
   - use `Mermaid` flowchart sources for Process Flow Diagrams (`PFD`) because PFDs are stakeholder-friendly flowcharts rather than formal UML diagrams
   - `Usecasediagramreq.drawio` is the synced legacy review / submission artifact at repo root
   - if draw.io and editable canonical sources diverge, resolve logic against BRD plus the current canonical source for that diagram type first
   - store new draw.io files under `docs/diagrams/drawio/`, not at repo root
   - use `scripts/relayout_activity_drawio.py` as the canonical relayout helper for midterm activity draw.io files
   - keep final-project whole-system diagram names distinct from midterm ones
   - use `activity-diagram-guide.md` as the canonical rule source for Activity Diagram semantics, analysis steps, anti-patterns, and checklist
   - for per-use-case modelling work, each selected use case should have both one UML Activity Diagram (`AD`) and one Process Flow Diagram (`PFD`) unless the user explicitly scopes the deliverable differently
   - use `process-flow-diagram-guide.md` as the canonical rule source for Process Flow Diagram creation and review
   - use `process-vs-activity-decision-guide.md` as the canonical decision source for separating `PFD` from `AD`; do not mix the two notation styles by accident
   - Process Flow Diagrams must be authored as Mermaid `flowchart` sources under `docs/diagrams/mermaid/process-flow/`
   - Process Flow Diagrams must not use swimlanes; keep all PFD sources lane-free even when the workflow crosses actors or system handoffs
   - PFD `Start` and `End` terminals must use white ellipse nodes
   - PFD decision points must use white diamond nodes with explicit branch labels
   - draw PlantUML activity diagrams in the UC-25 style by default: black-and-white only, mandatory business-level swimlanes, `Customer` + `System` for customer-facing flows, optional `Payment Gateway` only for real external payment interactions, and no internal technical lanes such as database / auth service / web app
   - keep UML terminal nodes visually correct in PlantUML activity diagrams: `start` must be a solid black circle; final nodes must be white outer circles with black border and black inner circle; do not use style overrides that make those nodes white
13. If a change affects project direction or core business logic, add a decision record under `.agents/decisions/`.
14. After a meaningful work session, update `.agents/journal/` when appropriate.
15. When the project leaves the documentation-first phase, update `architecture.md`, `conventions.md`, `README.md`, `AGENTS.md`, and the workflow runbooks.
