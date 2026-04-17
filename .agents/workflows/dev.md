---
description: Repo-specific development workflow for the current docs-first phase
---

# Development Workflow

## Current Reality
- This repository is still documentation-first.
- There is no active frontend/backend runtime to start.
- `src/` only contains placeholder directories for future implementation.

## Normal Work In This Phase
1. Update root requirement markdown files first.
2. Keep `.agents/context/`, ADRs, journal, and navigation docs aligned.
3. Use scripts only for document-support tasks, not application runtime.

## Available Utility Commands
```bash
# Relayout selected activity diagrams
python scripts/relayout_activity_drawio.py --files UC-01_PlaceOnlineOrder.drawio

# Relayout heavy activity set
python scripts/relayout_activity_drawio.py --heavy-only

# Regenerate elicitation DOCX outputs
python scripts/generate_requirement_elicitation_docs.py
```

## Future Change Trigger
- When a real implementation stack is introduced, replace this file with actual setup, install, and local-run commands.
