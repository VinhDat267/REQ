# Wonton POS - Project Overview

## Project Context
- Course: Software Requirement Specification (`REQ`)
- Deliverable mode: documentation-first / requirements-first
- Current goal: build the official final-project submission package as a whole-system requirements set

## Product Scope
Wonton POS models an order-management, payment, and shop-operations system for a wonton noodle shop with two web surfaces:
- `Client WebApp` for customers
- `Admin WebApp` for manager, cashier, server, and kitchen staff

## Locked Business Scope
- Business scope lock date: `2026-04-17`
- Service models: `Dine-in`, `Takeaway`, `Pickup`
- Out of scope: `Delivery`
- Guest checkout is allowed
- Guest order tracking uses `Order Code + Phone Number`
- `Takeaway` and `Pickup` require prepayment
- `Dine-in` can remain unpaid until counter settlement
- `Pickup` is auto-accepted after slot / capacity validation
- `order_status` and `payment_status` are separate
- KDS supports FIFO, batch updates, and 86'd items
- Future work should package and trace this locked baseline, not add new capabilities unless scope is explicitly reopened.

## Phase Labels
- Active default after `2026-04-16`:
  - `final-project`
- `midterm-locked`
  - historical root docs and diagrams built around the selected local `UC-01..UC-16` subset
- `final-project`
  - current whole-system artifacts required by the official final brief
  - uses the original `74`-UC inventory in `All_Use_Cases.md` as the primary reference
  - uses the canonical `CUC-xx` layer in `All_Use_Cases.md` as the preferred presentation layer for final diagrams / BRD / SRS

## Final-Project Expectations
The reviewed brief now expects a final package that includes:
- a final BRD
- a final SRS
- full-version requirements
- use case specifications
- at least `10` literature / article / online references
- elicitation notes with `plan / prepare / conduct / confirm`
- `3` modelling types for the whole system
- requirement management:
  - change
  - risk
  - scope
- prototype evidence
- a thesis over `10000` words
- role-based submission files

Submission date captured from the brief:
- `2026-05-04` (`4 May 2026`)

## Core Deliverables Already In Repo
- [Final_Project_Scope.md](../../Final_Project_Scope.md)
- [BRD_Ver0.md](../../BRD_Ver0.md)
- [BRD_Ver0_EN.md](../../BRD_Ver0_EN.md)
- [Business_Rules.md](../../Business_Rules.md)
- [Business_Rules_EN.md](../../Business_Rules_EN.md)
- [All_Use_Cases.md](../../All_Use_Cases.md)
- [UC_Specifications_Part1.md](../../UC_Specifications_Part1.md)
- [UC_Specifications_Part2.md](../../UC_Specifications_Part2.md)
- [docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml](../../docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml)
- [docs/diagrams/plantuml/use-case/WontonPOS_FullSystem_Canonical_UseCase.puml](../../docs/diagrams/plantuml/use-case/WontonPOS_FullSystem_Canonical_UseCase.puml)
- [docs/diagrams/mermaid/erd/WontonPOS_Midterm_16UC_ERD.md](../../docs/diagrams/mermaid/erd/WontonPOS_Midterm_16UC_ERD.md)
- [docs/diagrams/plantuml/erd/WontonPOS_Midterm_16UC_ERD.puml](../../docs/diagrams/plantuml/erd/WontonPOS_Midterm_16UC_ERD.puml)
- [docs/diagrams/mermaid/erd/WontonPOS_FullSystem_ERD.md](../../docs/diagrams/mermaid/erd/WontonPOS_FullSystem_ERD.md)
- [docs/diagrams/plantuml/erd/WontonPOS_FullSystem_ERD.puml](../../docs/diagrams/plantuml/erd/WontonPOS_FullSystem_ERD.puml)
- [Usecasediagramreq.drawio](../../Usecasediagramreq.drawio)

## Repository Reality
- Root markdown requirement files remain the official source of truth.
- `.agents/context/` is derived working memory and must follow the root docs.
- `AGENTS.md` is the shared cross-tool rule foundation for Codex, Claude Code, and Antigravity.
- `GEMINI.md` and `CLAUDE.md` stay thin and must not fork the shared rules.
- The root now has an explicit final-project scope baseline, but the current BRD and UC specification files are still mostly midterm-oriented until final replacements are promoted.
- Whole-system ERD coverage already exists, and the repo now also has a canonical whole-system use case diagram source aligned to the `CUC-xx` layer.
- The full-system use case diagram keeps semantic `dependency` relations in `All_Use_Cases.md` rather than drawing every dependency edge on the main UML canvas.

## Implementation Status
- Repo is still documentation-first.
- `src/` contains prototype-style static assets, not production implementation.
- `tests/` does not contain real implementation validation.
- `README.md` is a repo guide, not the source of truth.

## Guidance For Future Updates
- Update root requirement docs first when product truth changes.
- Treat final-project work as whole-system work by default.
- Treat business scope as locked after `2026-04-17`; use clarification and traceability work instead of scope expansion.
- When doing final-project work, explicitly say whether the artifact is `midterm-locked` or `final-project`.
- Preserve midterm artifacts as historical / submission references until final replacements are intentionally promoted.
- Do not silently reintroduce out-of-scope items such as `Delivery`.
- Keep final-project work aligned with the original `74`-UC inventory instead of forcing it into the local 16-UC aliases.
