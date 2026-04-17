# Decision 020: Promote Final-Project Scope To The Full System Inventory

Date: `2026-04-16`

## Status
Accepted

## Context
- The repository previously protected a `midterm-locked` lane based on a selected local `UC-01..UC-16` subset.
- The project has now moved past midterm and is being prepared as the final course project.
- The user clarified that the current goal is a complete system, not the earlier 16-UC midterm package.
- `All_Use_Cases.md` already contains the original `UC-01..UC-74` whole-system inventory, with `UC-50` explicitly documenting `Delivery` as out of scope.

## Decision
1. Treat `final-project` as the active default lane from `2026-04-16` onward.
2. Use `All_Use_Cases.md` and `Final_Project_Scope.md` as the active final-project scope baseline.
3. Keep the original `UC-01..UC-74` numbering for final requirements, diagrams, and UC specifications.
4. Preserve the local `UC-01..UC-16` subset only as historical midterm submission / traceability material.
5. Keep `Delivery` out of scope through the explicit `UC-50` exclusion unless a later user decision changes it.
6. Treat `BRD_Ver0*` and the existing UC specification files as midterm-era inputs until final BRD / SRS / UC specification replacements are promoted.

## Consequences
- Future final work must not force requirements back into the local 16-UC numbering model.
- Promotions, reorder, manager operations, FOH/BOH/server operations, and admin-common operations are active final-scope areas.
- Final docs still need promotion work: final BRD, final SRS, final full UC specifications, full-system use case diagram, additional modelling types, requirement management, references, and thesis packaging.
- Midterm diagrams and artifacts remain useful as references but should not be presented as the final whole-system package.
