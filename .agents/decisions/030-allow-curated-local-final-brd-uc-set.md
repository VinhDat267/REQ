# Decision 030: Allow a curated local UC set for BRD final v3

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Supersedes
- Narrows and partially supersedes `.agents/decisions/029-final-project-single-layer-use-case-numbering.md` for the specific case of **BRD final v3 authoring**.

## Context
- The repo still needs to represent the full locked final-project baseline.
- The team already invested heavily in the local visible `UC-01..UC-16` set used in the current BRD / UC specification package.
- Forcing the final BRD v3 to expose all `74` master inventory entries would make the document harder to write, review, and present.
- The user explicitly chose to keep the current visible IDs and to continue from them rather than remap the BRD narrative to the original master inventory IDs.

## Decision
Keep `All_Use_Cases.md` as the **master whole-system inventory / scope source**.

For **BRD final v3**, allow a separate **curated local visible lane** with these rules:

- preserve the current `UC-01..UC-16`
- add selected new BRD-visible UCs from `UC-17+`
- do not force the original master inventory IDs into the main BRD narrative
- treat the local BRD lane as an authoring / presentation layer, not as a new business scope

The initial approved shortlist for this lane is documented in:

- `BRD_Final_V3_UC_Shortlist.md`

## Consequences
- The project now has a deliberate distinction between:
  - `All_Use_Cases.md` as the full-system master inventory
  - the local BRD final v3 UC lane as the curated visible set for the BRD narrative
- Repo rules and status docs must stop claiming that final BRD work must visibly use the full `UC-01..UC-74` lane.
- Business scope remains unchanged and still follows the locked final baseline.
- Future final artifacts must explicitly choose their numbering lane instead of mixing master IDs and local BRD IDs silently.
