# Decision 016: Split `midterm-locked` and `final-project` work lanes

## Date
2026-04-09

## Status
Accepted

## Context
- The repository already had a stable midterm package built around the local `UC-01..UC-16` subset.
- The official final-project brief reviewed on `2026-04-09` now requires a broader whole-system submission package:
  - full-version requirements
  - SRS / BRD final
  - elicitation notes
  - `3` whole-system diagram types
  - requirement management
  - prototype
  - thesis assembly
- If the repo continued to speak only in terms of the locked midterm subset, future agents could incorrectly treat the final brief as either:
  - a reason to overwrite the midterm package in place
  - or a reason to keep forcing full-system work into the local 16-UC numbering model
- The safer workflow is to preserve the midterm package as a stable historical lane while explicitly tracking a new final-project lane.

## Decision
- Introduce two explicit labels in `.agents/`:
  - `midterm-locked`
  - `final-project`
- Keep the local `UC-01..UC-16` numbering model for midterm artifacts only.
- Use the original `74`-UC inventory in `All_Use_Cases.md` as the primary reference for final-project whole-system artifacts.
- Record the official final-project brief and its expectations inside `.agents/specs/` and `.agents/context/`.
- Treat the current root requirement package as still mostly midterm-oriented until it is intentionally promoted.

## Consequences
- Future agents can distinguish between preserving midterm artifacts and preparing final whole-system deliverables.
- Traceability is clearer because final-project work no longer has to masquerade as the 16-UC subset.
- `.agents/` now tracks the gap between the current root-doc state and the expected final package instead of hiding it.
- When root docs are later promoted to the final package, `.agents/` must be synced again.
