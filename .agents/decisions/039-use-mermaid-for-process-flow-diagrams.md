# Decision 039: Use Mermaid flowcharts for Process Flow Diagrams

Date: `2026-04-18`

## Status
Accepted - approved by user on `2026-04-18`.

## Context
- The previous diagram policy required PlantUML for all new or revised canonical diagram sources.
- The current PFD set (`UC-17`, `UC-18`, `UC-25`) showed repeated layout friction in PlantUML: long crossing connectors, overly wide layouts, and extra work to force business-flow notation.
- The user observed that Process Flow Diagrams are closer to flowcharts and explicitly requested that PFD rules switch to Mermaid.
- Mermaid `flowchart` syntax maps directly to the desired PFD notation:
  - ellipse terminals for `Start` / `End`
  - rectangles for process steps
  - diamonds for decisions
  - labeled arrows for branches

## Decision
For Wonton POS:
- Process Flow Diagrams (`PFD`) are now canonical Mermaid `flowchart` artifacts.
- Canonical PFD sources live under `docs/diagrams/mermaid/process-flow/`.
- Rendered PFD outputs live under `docs/diagrams/mermaid/process-flow/rendered/`.
- PFDs must remain lane-free; responsibility and handoffs are shown through concise step labels or branch labels.
- PFDs must keep the existing visual notation rule:
  - white ellipse terminals for `Start` / `End`
  - white rectangle nodes for process steps
  - white diamond nodes for decision points
  - explicit branch labels
- UML Activity Diagrams, use-case diagrams, ERDs, and other UML-style diagrams remain PlantUML-first unless a later decision changes that specific diagram type.

## Consequences
- Decision `037` is superseded in part: PlantUML is no longer universal for every canonical diagram type.
- Decision `038` remains valid for PFD visual notation, but its PlantUML-specific fallback wording no longer applies to new Mermaid PFDs.
- Existing PlantUML PFD sources are historical / superseded references unless explicitly maintained.
- Future PFD work should create or update `.mmd` files rather than `.puml` files.
- Render verification for PFDs should use Mermaid CLI (`mmdc`) or an equivalent Mermaid renderer.
