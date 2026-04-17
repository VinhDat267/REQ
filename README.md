# Wonton POS

## Overview
Wonton POS is a documentation-first project for the REQ course, focused on an **Order Management, Payment, and Revenue Analytics System** for a wonton noodle shop.

The repository is currently in the **final-project requirements alignment phase**. The active scope is now the whole Wonton POS system. `All_Use_Cases.md` remains the whole-system master inventory, while the current `BRD final v3` lane preserves the team's local numbering by keeping `UC-01..UC-16` and extending with selected new UCs from `UC-17+`. The repo should be treated as a **final-project full-system workspace by default**; midterm materials are archival references only.

## Current Project Status
- Project type: **documentation-first / requirements-first**
- Current phase: **Phase 2 - final project whole-system alignment**
- `src/` contains **placeholder structure only**
- `tests/` does **not** contain real implementation tests yet
- `README.md` is a project guide, **not** the primary source of truth

## Source of Truth
The official source of truth is:
- root requirements markdown files

Supporting project context:
- `.agents/` stores derived project working memory and agent context
- `.agents/` must stay aligned with the root requirements docs, but it is not the source of truth

Important root documents:
- `Final_Project_Scope.md`
- `BRD_Ver0.md`
- `BRD_Ver0_EN.md`
- `Business_Rules.md`
- `Business_Rules_EN.md`
- `All_Use_Cases.md`
- `BRD_Final_V3_UC_Shortlist.md`
- `UC_Specifications_Part1.md`
- `UC_Specifications_Part1_EN.md`
- `UC_Specifications_Part2.md`
- `UC_Specifications_Part2_EN.md`

## Final Project Scope
The active final-project scope uses the locked whole-system baseline in `All_Use_Cases.md`.

- Whole-system master inventory / scope source: original `UC-01` to `UC-74` in `All_Use_Cases.md`
- Current `BRD final v3` authoring lane: preserve local `UC-01..UC-16` and extend the visible BRD set with selected additional UCs from `UC-17+`
- `BRD final v3` is now treated as one shared team document, not a per-member `2 UC` split artifact
- Active functional coverage: the full locked non-delivery Wonton POS baseline represented through the original `74` numbered entries (`73` active + `UC-50` excluded placeholder)
- Explicit exclusion: `Delivery` remains out of scope
- The old midterm BRD and UC specification files remain historical inputs, but their existing `UC-01..UC-16` IDs are now also the preserved prefix of the curated final BRD lane
- Business scope lock: locked as of `2026-04-17`; future work should package, clarify, and trace this scope, not add new business capabilities unless a new scope-change decision is made.

## Business Scope
In-scope service models:
- `Dine-in`
- `Takeaway`
- `Pickup`

Final baseline business areas:
- customer account, authentication, menu, cart, promotions, reorder, payment, order tracking, pickup, rating, and notifications
- manager dashboard, menu/category/topping management, table management, staff/permission management, reporting, and promotions
- FOH order, payment, invoice, kitchen-ticket, and table operations
- BOH kitchen/KDS operations, item status updates, and 86'd item handling
- admin login/logout/password-change/notification operations
- cashier shift opening/closing, cash drawer count, reconciliation, refund/void control, complaint/remake handling, outage recovery, audit override, receipt/invoice handling, and inventory-lite controls

Out of scope:
- `Delivery`
- Loyalty program
- Payroll / timesheets
- Native mobile app
- Detailed inventory procurement and supplier management unless explicitly promoted as a final extension

## Key Business Rules
- `Takeaway` and `Pickup` must be prepaid.
- `Dine-in` may remain unpaid until settlement at the counter.
- `Pickup` is auto-accepted after slot/capacity validation.
- Guest customers can track orders using `Order Code + Phone Number`.
- The system separates `order_status` from `payment_status`.
- `Reorder` is part of the active final-project baseline through original `UC-18`.
- Sensitive operational actions require Manager approval / audit logging when they affect money, order completion, refunds, discounts, write-offs, or shift cash differences.

## Diagram Policy
- Existing primary midterm use case diagram source, retained as historical / submission reference:
  - `docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml`
- Existing full-system ERD sources:
  - `docs/diagrams/mermaid/erd/WontonPOS_FullSystem_ERD.md`
  - `docs/diagrams/plantuml/erd/WontonPOS_FullSystem_ERD.puml`
- Existing midterm ERD sources, retained as historical / submission reference:
  - `docs/diagrams/mermaid/erd/WontonPOS_Midterm_16UC_ERD.md`
  - `docs/diagrams/plantuml/erd/WontonPOS_Midterm_16UC_ERD.puml`
- Clearer high-level ERD overview for presentation/review:
  - `docs/diagrams/plantuml/erd/WontonPOS_Midterm_16UC_ERD_Overview.puml`
- Legacy synced draw.io artifact kept at root for review/submission:
  - `Usecasediagramreq.drawio`
- Current final-project diagram gap:
  - a dedicated full-system use case diagram source aligned directly to `UC-01..UC-74` has not been promoted yet
  - at least two additional whole-system modelling types still need to be selected / finalized so the final package has `3` modelling types
- If PlantUML and draw.io differ, follow the BRD and PlantUML source first.
- New `.drawio` files should be organized under `docs/diagrams/drawio/` rather than placed at root.

## Main Supporting Materials
- `docs/reference/` stores reference and exam-related DOCX files
- `docs/requirement-elicitation/` stores elicitation notes, questionnaires, interviews, and observations
- `docs/diagrams/activity/` stores activity-diagram coordination artifacts such as assignments
- `docs/diagrams/exports/` stores exported diagram assets when generated
- `docs/diagrams/plantuml/` stores canonical PlantUML diagram sources
- `docs/diagrams/drawio/` stores organized draw.io files by topic when needed
- `docs/diagrams/mermaid/` stores Mermaid-based diagrams, including the midterm ERD
- `RequirementElicitationTemplates/` stores reusable elicitation templates
- Temporary conversion helpers and extracted text artifacts should stay local/untracked instead of being kept at repo root

## AI Tooling Layout
- `AGENTS.md` is the shared rules foundation for `Codex`, `Claude Code`, and `Antigravity`
- `CLAUDE.md` is a thin Claude Code entrypoint that imports `AGENTS.md`
- `GEMINI.md` is a thin Antigravity-specific override file
- `.agents/` stores maintained project memory shared across tools and the workspace-native Antigravity rules/workflows
- `.agents/rules/00-bootstrap.md` explicitly loads `AGENTS.md` plus the default bootstrap pair from inside the native Antigravity rules layer
- Optional Antigravity planning artifacts such as `task.md`, `implementation_plan.md`, and `walkthrough.md` should stay local unless explicitly promoted into canonical docs

## Repository Structure
```text
.
|-- .agents/                        # AI project brain: context, decisions, journal, rules, skills, specs, workflows
|   |-- context/
|   |-- decisions/
|   |-- journal/
|   |-- rules/
|   |-- skills/
|   |-- specs/
|   `-- workflows/
|-- docs/                           # Human-facing docs, references, elicitation, and diagrams
|   |-- CONTRIBUTING.md
|   |-- diagrams/
|   |   |-- activity/
|   |   |-- drawio/
|   |   |-- exports/
|   |   |-- mermaid/
|   |   `-- plantuml/
|   |-- reference/
|   `-- requirement-elicitation/
|-- RequirementElicitationTemplates/
|-- AGENTS.md                       # Shared cross-tool project rules
|-- CLAUDE.md                       # Thin Claude Code entrypoint
|-- GEMINI.md                       # Thin Antigravity override layer
|-- scripts/                        # Utilities and helper scripts
|-- src/                            # Placeholder code structure only
|-- tests/                          # Placeholder test structure only
|-- BRD_Ver0.md
|-- BRD_Ver0_EN.md
|-- Business_Rules.md
|-- Business_Rules_EN.md
|-- All_Use_Cases.md
|-- UC_Specifications_Part1.md
|-- UC_Specifications_Part1_EN.md
|-- UC_Specifications_Part2.md
|-- UC_Specifications_Part2_EN.md
|-- NguyenDatVinh_2301040198_Group1_Tutorial1_BRD_Ver1.docx
|-- Usecasediagramreq.drawio
|-- Final_Project_Scope.md
`-- README.md
```

## AI Agent Notes
The repo contains a shared rules layer plus a project brain under `.agents/`.

Important files for future work:
- `AGENTS.md`
- `GEMINI.md`
- `CLAUDE.md`
- `.agents/rules/`
- `.agents/workflows/`
- `.agents/context/codex-bridge.md`
- `.agents/README.md`
- `.agents/context/project-overview.md`
- `.agents/context/current-status.md`
- `.agents/context/conventions.md`
- `.agents/context/architecture.md`
- `.agents/rules.md`

- For Codex, start with `AGENTS.md`, then load `.agents/context/current-status.md`, `.agents/context/project-overview.md`, and the support references they point to.
- For Claude Code, keep `CLAUDE.md` thin, import `AGENTS.md`, and avoid duplicating shared rules.
- For Antigravity, keep `GEMINI.md` thin and use `.agents/rules/` plus `.agents/workflows/` as the workspace-native supplements.
- `00-bootstrap.md` under `.agents/rules/` explicitly loads `AGENTS.md` plus the default bootstrap pair so the Antigravity native read order stays closer to the Codex bootstrap path.

When requirements or agent workflow change, root docs, `.agents/`, `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, and the bridge/navigation docs should be updated together.

## Team
- Nguyen Thi Hai My
- Nguyen Dat Vinh
- Vuong Gia Ly
- Nguyen Minh Duc
- Dang Khanh Huyen
- Le Thanh Dat
- Nguyen Dinh Chien
- Nguyen Thien Hieu

## Notes
- System/project name is locked as **Wonton POS**.
- `Final_Project_Scope.md` is the active scope boundary for final-project work.
- Restaurant domain wording remains **Wonton Noodle Shop / Quan Mi Van Than** depending on document language.
- `Usecasediagramreq.drawio` is the only accepted legacy draw.io artifact kept at root.
- The root BRD `.docx` file is currently treated as a submission/supporting artifact; the root markdown requirements remain the source of truth.
- Generated helper outputs such as Python cache folders or ad-hoc text extracts should not be kept as long-lived repo artifacts.
