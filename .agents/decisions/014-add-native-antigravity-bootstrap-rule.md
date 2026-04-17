# Decision 014: Add a native Antigravity bootstrap rule inside `.agents/rules/`

## Date
2026-04-06

## Status
Accepted

## Context
- The repo already had a strong Codex bootstrap pattern through `AGENTS.md`.
- Claude Code was aligned by making `CLAUDE.md` import `AGENTS.md` and the default bootstrap context.
- Antigravity was aligned to the official workspace path layout under `.agents/rules/` and `.agents/workflows/`, but the default read pair still depended mainly on `GEMINI.md` and shared docs.
- To tighten parity with the Codex flow, the native Antigravity rules layer itself should reinforce the same bootstrap order.

## Decision
- Add `.agents/rules/00-bootstrap.md`.
- Use it to reinforce three things inside the native Antigravity rule layer:
  - read `.agents/context/current-status.md` and `.agents/context/project-overview.md` before substantial work
  - treat `AGENTS.md` as the shared cross-tool workflow foundation
  - keep root requirement markdown files as the source of truth

## Consequences
- Antigravity now has a native bootstrap rule that more closely mirrors the Codex startup flow.
- The repo still avoids duplicating full project truth into a second rules system.
- Future workflow changes should keep `GEMINI.md`, `AGENTS.md`, and `.agents/rules/00-bootstrap.md` aligned.
