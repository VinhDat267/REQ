---
description: Update root docs first, then synchronize .agents memory and navigation files for this docs-first repo.
---

1. Read `AGENTS.md`, `.agents/context/current-status.md`, and `.agents/context/project-overview.md`.
2. Identify whether the requested change affects product truth, workflow, or only local helper artifacts.
3. Update root requirement markdown files first if product truth changed.
4. Sync affected `.agents/context/`, `README.md`, `GEMINI.md`, `CLAUDE.md`, and bridge/navigation docs.
5. Add a new ADR under `.agents/decisions/` if workflow, business logic, or canonical artifact policy changed.
6. Append `.agents/journal/YYYY-MM-DD.md` if the session was non-trivial.
7. Verify that scope labels, diagram policy, and source-of-truth rules still align before closing the task.
