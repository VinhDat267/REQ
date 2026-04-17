# Decision 029: Final-project uses a single use-case numbering layer

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- The current BRD and UC specification package already follows the original whole-system use-case inventory.
- Keeping one stable numbering scheme reduces rewrite cost and keeps traceability easier to maintain across BRD, SRS, use case specifications, and supporting diagrams.

## Decision
For `final-project` work, use the original `UC-01..UC-74` inventory in `All_Use_Cases.md` as the single numbering baseline.

This applies to:
- final BRD
- final SRS
- final use case specifications
- traceability tables
- whole-system use case modeling work when it is promoted

`UC-50` remains the explicit out-of-scope placeholder for `Delivery`.

## Consequences
- Final-project documentation should remain on one numbering lane only.
- Future restructuring should refine, merge, split, or clarify behavior inside the `UC-xx` inventory rather than introducing a parallel whole-system numbering layer.
- Repo rules, status notes, and supporting specs must stay aligned with this single-layer model.
