# Decision 011: Standardize the Codex bootstrap pattern for this docs-first repo

## Date
2026-04-04

## Status
Accepted

## Context
- The repository already had a Codex entrypoint, but the supporting files referenced by that entrypoint were incomplete or too generic.
- The requested rule pattern includes stronger instruction priority, session-start reads, completion rules, and reference files such as `codex-bridge.md`.
- This project is documentation-first, so the Codex bootstrap must reinforce root-doc truth instead of implying a live implementation workflow.

## Decision
- Keep the requested AGENTS structure, but adapt all project-specific rules to Wonton POS and the docs-first phase.
- Add `.agents/context/codex-bridge.md` and `.agents/README.md` as stable support references.
- Rewrite workflow docs so they describe the current repository reality instead of placeholder app commands.
- Keep git-related guidance conditional because the current workspace is not initialized as a git repository.

## Consequences
- Codex now has a stronger and more accurate bootstrap path.
- The repository avoids misleading Codex into assuming an implementation stack or runtime that does not exist.
- Future workflow changes must keep `AGENTS.md`, `codex-bridge.md`, `.agents/README.md`, and `README.md` aligned.
