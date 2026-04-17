---
description: Repo-specific review workflow for requirements and document changes
---

# Review Workflow

## Review Checklist
- [ ] Root requirement docs remain the source of truth
- [ ] Business rules, BRD, and UC specs remain aligned
- [ ] Midterm scope stays locked to `UC-01..UC-16`
- [ ] Original 74-UC identifiers appear only where traceability is intended
- [ ] `Delivery` is not reintroduced
- [ ] `order_status` and `payment_status` remain separate
- [ ] New draw.io files, if any, are stored under `docs/diagrams/drawio/`
- [ ] `AGENTS.md` and `.agents/` stay aligned if agent workflow changed

## Review Process
1. Read the changed root requirement docs first.
2. Compare them against affected `.agents/context/`, ADR, and spec files.
3. Check whether diagram policy and numbering rules still hold.
4. If scripts or generated artifacts changed, run the relevant script sanity check.
5. Record any project-state change in `current-status.md` and journal if the session was non-trivial.
