# Decision 012: Standardize a tri-tool rule stack for Codex, Claude Code, and Antigravity

## Date
2026-04-06

## Status
Accepted

## Context
- The repository already had a strong Codex bootstrap path built around `AGENTS.md` and `.agents/`.
- The team now wants to switch between `Codex`, `Claude Code`, and `Antigravity` without losing the same vibe-coding flow.
- Antigravity expects native workspace files such as `GEMINI.md`, `.agent/rules/`, and `.agent/workflows/`.
- The repo still must avoid duplicating project truth or letting each tool drift into its own rule system.

## Decision
- Keep `AGENTS.md` as the shared cross-tool rule foundation.
- Keep `CLAUDE.md` thin and make it defer back to `AGENTS.md`.
- Add `GEMINI.md` as a thin Antigravity-specific override file.
- Add `.agent/rules/` and `.agent/workflows/` as Antigravity-native supplements that mirror the repository's existing docs-first operating pattern.
- Keep `.agents/` as the maintained project memory layer and do not replace it with `.agent/`.

## Consequences
- All three tools now have a compatible bootstrap path with one shared rule base.
- Antigravity can run natively in this repo without forcing the team to duplicate project memory.
- Future workflow changes must keep `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agent/`, `.agents/context/codex-bridge.md`, `.agents/README.md`, and `README.md` aligned.
