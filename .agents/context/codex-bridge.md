# Tool Bridge

## Role Split
- `AGENTS.md` is the shared project-rule foundation for `Codex`, `Claude Code`, and `Antigravity`.
- `GEMINI.md` holds Antigravity-specific overrides only.
- `CLAUDE.md` is a thin Claude Code entrypoint that imports `AGENTS.md` plus the default bootstrap pair.
- `.agents/` stores project memory for fast context loading across tools.
- `.agents/rules/` stores split workspace rules for Antigravity and other tools when relevant.
- `.agents/rules/00-bootstrap.md` anchors the native Antigravity bootstrap so `AGENTS.md` plus the default read pair are loaded explicitly, not only implied.
- `.agents/workflows/` stores repo runbooks and the workspace-native Antigravity workflows.
- Root requirement markdown files remain the source of truth for requirements, business rules, and deliverable logic.

## Recommended Read Order
1. `AGENTS.md`
2. `context/current-status.md`
3. `context/project-overview.md`
4. For final-project scope work, `../Final_Project_Scope.md` and `../All_Use_Cases.md`
5. `rules.md`, `rules/*`, `context/conventions.md`, `context/architecture.md`
6. Relevant `decisions/`, `specs/`, `workflows/`, and the latest journal entry

## Tool Mapping
- `Codex`: `AGENTS.md` + `.agents/`
- `Claude Code`: `CLAUDE.md` -> `@AGENTS.md` + imported bootstrap context + `.agents/`
- `Antigravity`: `GEMINI.md` + `.agents/rules/00-bootstrap.md` -> explicit `AGENTS.md` + imported bootstrap context + `.agents/rules/` + `.agents/workflows/` + `.agents/`

## Update Discipline
- If product truth changes, update root docs first.
- If agent workflow changes, update `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, this file, `.agents/README.md`, and `README.md` together.
- If project state changes meaningfully, update `current-status.md` and journal the session.

## Current Project Posture
- The repository is still documentation-first.
- `src/` and `tests/` are placeholders.
- Workflow docs should describe the current docs-first reality, not an imagined production stack.
