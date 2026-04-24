# Decision 037: Require PlantUML diagram sources

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- The project now maintains both UML Activity Diagrams and Process Flow Diagrams for selected use cases.
- Earlier repository rules allowed either PlantUML or Mermaid for canonical diagram work.
- The user clarified that diagrams should be authored in PlantUML, not Mermaid.
- The user also clarified that Process Flow Diagrams (`PFD`) should not use swimlanes.

## Decision
For this repository:
- all new or revised canonical diagram sources must be authored in PlantUML
- Mermaid must not be used for new diagram sources
- existing Mermaid files are retained only as legacy references until intentionally converted to PlantUML
- Process Flow Diagrams must not use swimlanes
- if responsibility or handoff matters in a PFD, represent it with concise step labels or branch labels instead of lane partitions

## Consequences
- Future diagram work should create `.puml` sources under the relevant `docs/diagrams/plantuml/` subdirectory.
- PFDs and ADs remain separate artifacts, but both use PlantUML source files.
- Existing Mermaid ERD files should not be treated as the preferred source for future edits; use or create the PlantUML equivalent instead.
- PFDs remain simpler stakeholder-facing process flows and should not copy the swimlane structure of Activity Diagrams.
