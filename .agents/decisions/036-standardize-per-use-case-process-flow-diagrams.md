# Decision 036: Standardize per-use-case Process Flow Diagrams

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- Each selected use case now needs both an Activity Diagram and a Process Flow Diagram.
- The repository already has a canonical Activity Diagram guide.
- Two root guides were added for Process Flow Diagram work:
  - `process-flow-diagram-guide.md`
  - `process-vs-activity-decision-guide.md`
- Without an explicit rule, agents may either skip PFDs or accidentally mix PFD notation with UML Activity Diagram notation.

## Decision
For per-use-case modelling work in this repository:
- create or maintain one UML Activity Diagram (`AD`) for formal use-case / system behavior modelling
- create or maintain one Process Flow Diagram (`PFD`) for readable business workflow communication
- use `activity-diagram-guide.md` as the canonical Activity Diagram guide
- use `process-flow-diagram-guide.md` as the canonical Process Flow Diagram guide
- use `process-vs-activity-decision-guide.md` as the canonical decision guide for separating `PFD` from `AD`
- keep `AD` and `PFD` as separate artifacts and do not mix notation styles unless the user explicitly asks for a hybrid explanation

## Consequences
- Future UC diagram work should ask "Where is the AD?" and "Where is the PFD?" for each selected use case.
- Process Flow Diagrams should stay business/workflow-oriented, with concise process steps, clear decisions, role handoffs, and explicit starts/ends.
- Activity Diagrams should stay UML-oriented and continue to follow the stricter UML semantics from the Activity Diagram guide.
- Agents should use the decision guide when a prompt is ambiguous or when they need to explain why a diagram is a PFD vs an AD.
