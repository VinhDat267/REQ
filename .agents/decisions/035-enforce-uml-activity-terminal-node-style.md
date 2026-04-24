# Decision 035: Enforce UML activity start/final node styling

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- Decision 033 standardized the UC-25 activity-diagram presentation style around black-and-white PlantUML swimlanes.
- In practice, a later UC-25 revision used a PlantUML `<style>` block that accidentally overrode terminal-node rendering.
- That override made the `start` node appear white instead of solid black, and made final nodes appear white/white instead of the UML final-state symbol with a black inner circle.
- The resulting diagram no longer matched standard UML activity-diagram notation even though the rest of the flow logic remained valid.

## Decision
For PlantUML Activity Diagrams in this repository:
- `start` must render as a solid black circle
- final nodes must render as the UML final-state symbol:
  - white outer circle
  - black border
  - black inner circle
- avoid `<style>` overrides that turn `start` or final nodes white
- prefer explicit black/white `skinparam` settings when PlantUML styling needs to be controlled

This decision extends Decision 033 and does not replace the broader semantic guidance from Decision 034.

## Consequences
- Future Activity Diagrams should remain visually aligned with standard UML notation, not just with project-specific swimlane/color rules.
- The UC-25 diagram becomes the corrected reference for both black-and-white styling and terminal-node rendering.
- Agents should verify rendered output, not only source text, when adjusting PlantUML styling rules.
