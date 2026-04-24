# Decision 033: Standardize activity diagram swimlanes and monochrome style

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- The first UC-25 activity diagram rendered with too many lanes, branch crossings, dangling-looking connectors, and colored styling that reduced readability.
- The revised UC-25 diagram became the preferred pattern: business-level swimlanes, clean vertical flow, merged branches, and black-and-white styling.
- Future activity diagrams should preserve that readability instead of exposing internal implementation layers such as databases or service components.

## Decision
Use the UC-25 PlantUML activity-diagram style as the default rule for new activity diagrams.

Activity diagrams should:
- use PlantUML new activity syntax with swimlanes
- use black-and-white styling only
- keep node fill, node borders, diamond borders, connectors, arrowheads, notes, swimlane borders, and text in white/black
- model customer-facing flows with only `Customer` and `System` swimlanes
- add `Payment Gateway` only when the flow explicitly interacts with an external payment provider or payment callback
- fold internal system details such as web app, database, authentication, KDS, printer, and notification handling into `System`
- prefer clean vertical flows with merged branches and one final stop node

## Consequences
- Future activity diagrams should render more clearly and consistently.
- Requirements diagrams stay at business/process level instead of implementation level.
- Payment integration remains visible only when it is an external actor in the flow.
- This is a diagram-authoring convention only; it does not change business scope.
