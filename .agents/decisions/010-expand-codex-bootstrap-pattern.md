# Decision 010: Expand AGENTS.md into a full Codex bootstrap pattern

## Date
2026-04-04

## Status
Accepted

## Context
- The repository already had a minimal `AGENTS.md` as a Codex entrypoint.
- A stronger bootstrap pattern is useful so Codex can resolve instruction priority, session-start reads, working rules, and completion rules consistently.
- The project still needs to avoid creating a second source of truth outside the root requirement docs and `.agents/`.

## Decision
- Expand `AGENTS.md` from a minimal quick-start file into a full Codex bootstrap contract.
- Define instruction priority explicitly.
- Define mandatory session-start reads.
- Define completion rules for keeping `.agents/` synchronized.
- Keep `AGENTS.md` operational and concise rather than turning it into a product or requirements document.

## Consequences
- Codex can enter the repository with less ambiguity and lower context-setup cost.
- Agent behavior is more consistent across sessions.
- Any future workflow change must keep `AGENTS.md`, `.agents/context/current-status.md`, and related navigation docs aligned.
