# Decision 015: Make Antigravity bootstrap read `AGENTS.md` explicitly

## Date
2026-04-06

## Status
Accepted

## Context
- Decision 014 added `.agents/rules/00-bootstrap.md` so Antigravity had a native bootstrap rule inside the official workspace rules layer.
- That first bootstrap rule already reinforced the default context pair and said to treat `AGENTS.md` as the shared workflow foundation.
- The wording still left one ambiguity: Antigravity was told to respect `AGENTS.md`, but not told explicitly to read `AGENTS.md` before substantial work.
- For stricter parity with Codex, the native Antigravity rules layer should make the `AGENTS.md` read step explicit rather than implied.

## Decision
- Update `.agents/rules/00-bootstrap.md` so the first bootstrap step explicitly reads:
  - `AGENTS.md`
  - `.agents/context/current-status.md`
  - `.agents/context/project-overview.md`
- Treat this as a clarification and tightening of Decision 014, not a replacement of the overall tri-tool bootstrap model.

## Consequences
- Antigravity now has a native bootstrap path that explicitly loads the same shared foundation Codex relies on.
- Future audits can evaluate Antigravity parity with less inference and less dependence on `GEMINI.md` wording alone.
- `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agents/rules/00-bootstrap.md`, and the bridge docs should stay aligned if the bootstrap flow changes again.
