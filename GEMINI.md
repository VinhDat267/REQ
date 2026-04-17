# GEMINI.md

- Shared cross-tool rules live in `AGENTS.md`; this file only adds Antigravity-specific behavior.
- Start from `AGENTS.md`, then read `.agents/context/current-status.md` and `.agents/context/project-overview.md` before substantial work.
- Load `.agents/rules/*.md` as workspace rule supplements and `.agents/workflows/*.md` as reusable Antigravity workflows.
- Keep Antigravity behavior aligned with the repo's docs-first posture; do not invent app runtime or deployment work unless the user asks.
- If Antigravity creates `task.md`, `implementation_plan.md`, or `walkthrough.md`, treat them as local working artifacts unless the user explicitly wants them committed or promoted into canonical docs.
- When in doubt, follow the repo flow already defined in `AGENTS.md`: root requirement docs first, then sync `.agents/` memory and navigation docs.
