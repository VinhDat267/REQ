# Decision 013: Align Antigravity workspace rules and workflows to the official `.agents/` layout

## Date
2026-04-06

## Status
Accepted

## Context
- Decision 012 introduced a tri-tool rule stack for Codex, Claude Code, and Antigravity.
- The initial Antigravity supplement layer used `.agent/rules/` and `.agent/workflows/`.
- Later verification against the official Google Antigravity codelab showed workspace-native rules and workflows live under `.agents/rules/` and `.agents/workflows/`.
- The repo already treats `.agents/` as the maintained project memory layer, so keeping a second top-level `.agent/` tree would create unnecessary drift and maintenance overhead.

## Decision
- Keep `AGENTS.md` as the shared cross-tool rule foundation.
- Keep `CLAUDE.md` as a thin import-based entrypoint for Claude Code.
- Keep `GEMINI.md` as a thin Antigravity-specific override file.
- Move Antigravity-native split rules into `.agents/rules/`.
- Use `.agents/workflows/` as the canonical workspace workflow path for Antigravity as well as repo runbooks.
- Retire the initial `.agent/` supplement tree from the canonical repo workflow.

## Consequences
- Antigravity now follows the official workspace path layout more closely.
- Codex, Claude Code, and Antigravity now share one maintained memory tree instead of splitting guidance across `.agents/` and `.agent/`.
- Future workflow changes must keep `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agents/rules/`, `.agents/workflows/`, `.agents/context/codex-bridge.md`, `.agents/README.md`, and `README.md` aligned.
