# .agents README

## Purpose
- `.agents/` stores structured project memory for agents.
- Root requirement markdown files remain the source of truth for requirements and deliverable content.
- `AGENTS.md` is the shared rules foundation across `Codex`, `Claude Code`, and `Antigravity`.

## Directory Guide
- `context/`: project overview, current status, conventions, architecture, and Codex bridge notes
- `decisions/`: ADR-style records for workflow, technical, and business-logic decisions
- `journal/`: dated session notes for meaningful work
- `rules/`: split workspace rules used by Antigravity and reusable by other tools when relevant
- `specs/`: condensed specs and summaries for fast agent lookup
- `workflows/`: repo-specific runbooks for development, testing, review, and deployment posture
- `rules.md`: cross-agent guardrails that should stay aligned with `AGENTS.md`

## Update Order
1. Update root requirement docs first when product truth changes.
2. Sync `context/`, `decisions/`, `journal/`, and `specs/` as needed.
3. Sync `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `rules/`, `workflows/`, this file, and `README.md` when agent workflow or navigation changes.

## Notes For Tools
- `Codex`: start from `AGENTS.md`.
- `Claude Code`: `CLAUDE.md` should stay thin and import `AGENTS.md` so the shared foundation is loaded directly.
- `Antigravity`: use `GEMINI.md` for minimal overrides and `.agents/rules/` plus `.agents/workflows/` for native workspace rules/workflows.
- `00-bootstrap.md` inside `rules/` explicitly loads `AGENTS.md` plus the default bootstrap pair so Antigravity stays closer to the Codex bootstrap flow.
- `current-status.md` and `project-overview.md` remain the default bootstrap pair across tools.
- Treat workflow docs here as project-specific runbooks, not generic templates.
