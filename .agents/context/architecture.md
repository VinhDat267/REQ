# Wonton POS - Architecture

## 1. Target Product Shape

```text
Client WebApp            Admin WebApp
    |                        |
    +---------- REST/API ----+
                 |
          Business Services
                 |
   +-------------+-------------+
   |             |             |
 Orders      Payments       Notifications
   |             |             |
   +------ Database / KDS -----+
```

## 2. Main Business Areas
- Client WebApp:
  - view menu
  - place orders
  - guest checkout
  - online payment
  - order tracking
  - notifications
  - order rating
- Admin WebApp:
  - order management
  - counter payment
  - table management
  - menu management
  - kitchen / KDS operations
  - staff management
  - revenue reporting

## 3. Canonical State Model

### Order status
`Pending Confirmation -> Cooking -> Ready -> Completed / Cancelled`

### Payment status
`Unpaid -> Pending Online Payment -> Paid / Failed / Refunded`

### Applied rules
- `Dine-in`: may keep `payment_status = Unpaid` until counter settlement
- `Takeaway`: can enter kitchen flow only when `payment_status = Paid`
- `Pickup`: requires slot / capacity validation and prepayment before auto-accept

## 4. Current Repository Architecture

### Agent memory layer
- `.agents/context/`: project state, architecture, conventions, bridge notes
- `.agents/decisions/`: workflow, technical, and business-logic decisions
- `.agents/journal/`: dated work-session history
- `.agents/rules/`: split workspace rules used natively by Antigravity and reusable by other tools
- `.agents/specs/`: condensed reference specs for agents
- `.agents/workflows/`: repo-specific runbooks
- `AGENTS.md`: shared rules foundation for Codex, Claude Code, and Antigravity
- `GEMINI.md`: Antigravity-specific overrides
- `CLAUDE.md`: thin Claude Code entrypoint

### Human-facing docs
- Root markdown files are the official source of truth for requirements
- `Usecasediagramreq.drawio` is the legacy root draw.io artifact kept for review / submission
- `docs/reference/` stores reference and exam DOCX files
- `docs/requirement-elicitation/` stores elicitation documents
- `docs/diagrams/plantuml/` stores canonical editable diagram sources
- `docs/diagrams/drawio/activity/` stores review / submission activity diagrams
- `scripts/relayout_activity_drawio.py` is the canonical relayout helper for midterm activity draw.io files

### Current deliverable lanes
- `final-project`
  - active official course final package after `2026-04-16`
  - `All_Use_Cases.md` remains the master whole-system inventory / scope source
  - `BRD final v3` currently uses a curated local visible lane that preserves `UC-01..UC-16` and extends with selected `UC-17+`
  - `Final_Project_Scope.md` boundary document
  - whole-system requirements and modelling work
  - thesis assembly and role-based submission packaging
- `midterm-locked`
  - historical local `UC-01..UC-16` subset
  - locked midterm BRD / UC spec / diagram package retained for traceability

### Existing final-project evidence already in repo
- Final scope baseline:
  - `Final_Project_Scope.md`
- Full use-case inventory:
  - `All_Use_Cases.md`
- Whole-system ERD:
  - `docs/diagrams/mermaid/erd/WontonPOS_FullSystem_ERD.md`
  - `docs/diagrams/plantuml/erd/WontonPOS_FullSystem_ERD.puml`
- Elicitation package:
  - `docs/requirement-elicitation/*.docx`
- Prototype-style UI material:
  - `src/frontend/`
  - `src/frontend-vi/`

### Current gaps for the final lane
- no canonical whole-system process diagram source clearly tracked in `.agents/`
- no assembled final thesis package in root docs
- no clearly isolated requirement-management artifact set in root docs
- BRD / SRS / UC specifications still need final whole-system promotion from the midterm-era inputs

### Code posture
- `src/frontend/`, `src/backend/`, and `src/shared/` are still placeholders or prototype-style assets
- no real implementation is present yet

## 5. System Boundaries
- No `Delivery` workflow
- No GrabFood / ShopeeFood integration
- No native mobile app
- No production deployment in the current phase

## 6. Working Pattern
- Read `project-overview.md` and `current-status.md` first
- Update root docs before updating agent memory when product truth changes
- State whether a change belongs to `midterm-locked` or `final-project`
- Record meaningful direction changes in `decisions/`
- Record meaningful sessions in `journal/`
- Keep `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agents/rules/`, `.agents/workflows/`, and bridge docs aligned when workflow changes
