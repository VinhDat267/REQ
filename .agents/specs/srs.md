# SRS Summary - Wonton POS

## Phase Note
- The active scope baseline is now final-project whole-system work.
- The currently visible BRD and UC specification files are still midterm-oriented inputs until final replacements are promoted.
- The official final-project brief requires a final SRS deliverable for the whole system.
- Use this file as a short memory aid, not as a substitute for the root SRS / BRD documents.

## Whole-System Scope Baseline
- Active scope boundary: `Final_Project_Scope.md`
- Master inventory reference: original `UC-01..UC-74` in `All_Use_Cases.md`
- Current BRD final v3 authoring lane: preserved local `UC-01..UC-16` plus selected `UC-17+`
- The old midterm local subset survives as the preserved prefix of that BRD lane, while the old midterm artifacts themselves remain historical
- Service models remain:
  - `Dine-in`
  - `Takeaway`
  - `Pickup`
- `Delivery` remains out of scope

## SRS Coverage Targets For The Final Lane
- actor / system context
- full-version functional requirements
- full-version non-functional requirements
- use case specifications with:
  - an explicitly chosen visible numbering lane
  - no silent mixing between the master inventory and the local final BRD lane
  - relationship rules written directly on the chosen `UC-xx` lane where needed
- modelling set chosen for the final package
- traceability between business rules, use cases, and diagrams
- operational policy coverage for shifts, cash drawer, reconciliation, promotions, complaint/remake, outage fallback, audit logs, receipts/invoices, and inventory-lite
- role / permission boundaries across:
  - `Manager`
  - `FOH Staff`
  - `BOH Staff`
  - `Registered Customer`
  - `Guest Customer`

## Existing Inputs Already Present In Repo
- BRD VN / EN draft
- business rules VN / EN
- detailed `UC-01..UC-74` source in `All_Use_Cases.md`
- midterm UC specs part 1 / 2
- elicitation notes under `docs/requirement-elicitation/`
- prototype-style HTML screens under `src/frontend*`
- whole-system ERD sources under `docs/diagrams/*/erd/`

## Gaps To Resolve For The Final SRS
- canonical whole-system process diagram
- promoted root SRS document for the final-project lane
- explicit change / risk / scope management references if they are cited from the final SRS
