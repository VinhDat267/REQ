# Decision 038: Standardize PFD ellipse terminals and diamond decisions

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- The repository already requires PlantUML-only canonical diagrams and lane-free Process Flow Diagrams.
- Existing early PFD sources inherited Activity-Diagram-style terminal rendering, which does not match the preferred business-process notation for this project.
- The user clarified the desired PFD notation:
  - `Start` and `End` should use white ellipse terminals
  - decision points should use white diamond nodes

## Decision
For Wonton POS Process Flow Diagrams (`PFD`) in this repository:
- use white ellipse terminals for `Start` and `End`
- use white diamond nodes for decision points
- keep PFDs lane-free
- keep decision branch labels explicit
- when PlantUML layout does not render the decision question cleanly inside the diamond, place the decision question on the incoming connector while preserving the white diamond decision node

## Consequences
- Existing PFD sources should be updated so their rendered output matches the repository-wide notation rule.
- Future PFD work should not reuse UML Activity Diagram initial/final nodes or black-circle terminals.
- PFD reviews should check both the process logic and the terminal / decision notation before considering a diagram complete.
