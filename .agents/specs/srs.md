# SRS Summary - Wonton POS

## Phase Note
- The active scope baseline is now final-project whole-system work.
- The currently visible BRD and UC specification files are still midterm-oriented inputs until final replacements are promoted.
- The official final-project brief requires a final SRS deliverable for the whole system.
- Use this file as a short memory aid, not as a substitute for the root SRS / BRD documents.

## Whole-System Scope Baseline
- Active scope boundary: `Final_Project_Scope.md`
- Primary use-case inventory: `All_Use_Cases.md` (`74` use cases)
- Primary presentation layer for final BRD / SRS / use case diagram: canonical `CUC-xx` set in `All_Use_Cases.md` (`25` canonical use cases)
- Midterm local subset `UC-01..UC-16` remains reference-only for the historical locked midterm package
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
  - canonical `CUC-xx` as the main spec layer
  - detailed `UC-01..UC-74` as traceability / appendix support
  - explicit canonical ownership and canonical relationship rules from `All_Use_Cases.md`
- modelling set chosen for the final package
- traceability between business rules, UC inventory, and diagrams
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
- full 74-UC inventory
- midterm UC specs part 1 / 2
- elicitation notes under `docs/requirement-elicitation/`
- prototype-style HTML screens under `src/frontend*`
- whole-system ERD sources under `docs/diagrams/*/erd/`

## Gaps To Resolve For The Final SRS
- canonical full-system use case diagram
- canonical whole-system process diagram
- promoted root SRS document for the final-project lane
- explicit change / risk / scope management references if they are cited from the final SRS
