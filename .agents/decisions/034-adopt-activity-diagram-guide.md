# Decision 034: Adopt activity-diagram-guide.md as the canonical AD guide

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- A dedicated root file, `activity-diagram-guide.md`, now defines the standard way to understand, draw, and review UML Activity Diagrams.
- The guide covers Activity Diagram purpose, UML node semantics, guard conditions, fork/join, swimlanes, mapping from use case specifications, anti-patterns, and quality checklists.
- Earlier project rules had already standardized a UC-25 presentation style, but that rule focused on visual/layout convention rather than the full UML semantics.

## Decision
Use `activity-diagram-guide.md` as the canonical Activity Diagram guide for this repository.

For any new or revised Activity Diagram, agents should:
- read or apply `activity-diagram-guide.md`
- analyze scope, main flow, alternative flow, exception flow, concurrency, responsibility, and relevant data before drawing
- map use-case specification content into UML activity semantics instead of producing a free-form flowchart
- self-check against the guide's anti-patterns and checklist
- preserve project presentation conventions from Decision 033, including black-and-white styling and business-level swimlanes

If a PlantUML layout shortcut conflicts with the guide's UML semantics, preserve the guide's semantics first.

## Consequences
- Activity Diagram work has a single local rule source for semantics and quality.
- Decision 033 remains valid as a project-specific presentation convention.
- Future AD diagrams should be more defensible for REQ/tutorial review because they are grounded in explicit UML semantics.
