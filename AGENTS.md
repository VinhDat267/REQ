# AGENTS.md

## Purpose
- This repository uses a shared cross-tool bootstrap built from a Codex-native entrypoint.
- Treat this file as the operational bootstrap for `Codex`, `Claude Code`, and `Antigravity`.
- Treat `.agents/` as the authoritative project memory for project-specific context.
- Root requirement markdown files remain the source of truth for product scope, business rules, and deliverable content.

## Instruction Priority
1. Direct user instructions
2. Tool-specific local overrides in the same directory
   - `GEMINI.md` for Antigravity
   - `CLAUDE.md` only when it adds explicit Claude-only behavior
3. This file for shared operating rules
4. `.agents/context/*`, `.agents/decisions/*`, `.agents/specs/*`, `.agents/rules/*`, `.agents/workflows/*`, `.agents/rules.md`
5. `README.md` and `docs/`

If this file conflicts with tool-specific bootstrap mechanics, follow the tool-specific local override. If the conflict is about product scope, architecture, coding conventions, numbering, diagram policy, or project status, follow `.agents/` and the root requirement docs.

## Session Start
Always read:
- `.agents/context/current-status.md`
- `.agents/context/project-overview.md`

Read when relevant:
- `.agents/rules.md`
- `.agents/rules/*`
- `.agents/context/conventions.md`
- `.agents/context/architecture.md`
- `.agents/context/codex-bridge.md`
- The latest file in `.agents/journal/`
- Relevant files in `.agents/specs/` and `.agents/decisions/`
- `.agents/workflows/dev.md` and `.agents/workflows/test.md`

## Working Rules
- Keep the current deliverable tight. This is a documentation-first REQ repository; do not invent implementation, deployment, or production-readiness work unless the user asks for it or the phase changes.
- Prefer end-to-end, reviewable progress over premature abstraction.
- Update root requirement docs first when product truth changes, then sync `.agents/`, tool entrypoints, and navigation docs in the same work session.
- Active final-project work uses the original `UC-01..UC-74` inventory in `All_Use_Cases.md`; the midterm `UC-01..UC-16` subset is historical / submission traceability only.
- Business scope is locked as of `2026-04-17`; do not add new business capabilities or promote extension candidates without an explicit user instruction and a new ADR.
- Keep `Delivery` out of scope through the explicit `UC-50` exclusion unless a later user decision changes it.
- Follow terminology, numbering, diagram policy, and canonical artifact rules from `.agents/context/conventions.md`.
- Prefer `PlantUML` or `Mermaid` for new canonical diagrams; `Usecasediagramreq.drawio` is the only approved legacy root draw.io exception.
- Treat `task.md`, `implementation_plan.md`, and `walkthrough.md` as optional local planning artifacts, not source of truth, unless the user explicitly promotes them.
- Preserve unrelated user changes.
- If git is initialized later and the user explicitly wants a commit, verify first and create a focused commit that does not mix unrelated work.

## Completion Rules
- Update `.agents/context/current-status.md` after meaningful progress, blockers, workflow changes, or priority changes.
- Append or create `.agents/journal/YYYY-MM-DD.md` for non-trivial work sessions.
- Update `.agents/context/architecture.md` if repo workflow, canonical artifact flow, module boundaries, or future implementation structure changes.
- Add a new ADR in `.agents/decisions/` for important workflow, technical, or business-logic decisions. Do not rewrite old ADRs; supersede them with a new one.
- Update or add specs in `.agents/specs/` when scope or behavior changes.
- Keep `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `.agents/rules/`, `.agents/workflows/`, `.agents/context/codex-bridge.md`, `.agents/README.md`, and `README.md` aligned when agent workflow changes.

Do not churn `.agents/` for read-only questions or trivial edits that do not affect project state.

## Tool Notes
- `Codex`: use this file as the repo entrypoint instead of relying on `.agents/README.md`.
- `Claude Code`: keep `CLAUDE.md` thin and import this file so Claude loads the same shared foundation at session start.
- `Antigravity`: keep `GEMINI.md` thin; Antigravity-native workspace supplements live under `.agents/rules/` and `.agents/workflows/`.
- `.agents/skills/` can be used as Antigravity workspace skills, but do not treat it as an always-loaded rule layer for Codex or Claude Code.
- If a Codex-created branch is needed, use the `codex/<topic>` prefix to match the Codex toolchain.

## Useful References
- `Final_Project_Scope.md`
- `All_Use_Cases.md`
- `.agents/context/codex-bridge.md`
- `.agents/README.md`
- `.agents/rules.md`
- `README.md`
