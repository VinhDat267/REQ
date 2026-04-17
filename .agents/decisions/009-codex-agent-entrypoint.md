# Decision 009: Add a Codex-native agent entrypoint

## Date
2026-04-04

## Status
Accepted

## Context
- The repository already uses `.agents/` as structured project memory.
- Codex benefits from a concise root-level instruction file that points to the correct source of truth and workflow.
- The project must avoid creating a second authoritative documentation layer.

## Decision
- Add `AGENTS.md` at the repo root as the Codex-facing entrypoint.
- Keep `AGENTS.md` concise and point it to `.agents/context/` plus the root requirement documents.
- Treat `AGENTS.md` as an execution guide, not as a competing source of truth.
- Keep a minimal `CLAUDE.md` pointer so other agent runtimes can resolve to the same instructions.

## Consequences
- Codex can bootstrap faster without scanning the whole repo first.
- Root docs remain authoritative, while `.agents/` stays the maintained working memory layer.
- Future workflow changes must update `AGENTS.md`, `.agents/context/current-status.md`, and relevant repo navigation docs together.
