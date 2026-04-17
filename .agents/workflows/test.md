---
description: Repo-specific testing workflow for the current docs-first phase
---

# Testing Workflow

## Current Reality
- There is no application test suite yet.
- `tests/` is only a placeholder directory.
- Validation in this phase is document-consistency review, diagram consistency, and script-level sanity checks.

## What To Verify
- Root requirement docs stay aligned with business rules and use case specs.
- Midterm numbering remains `UC-01..UC-16`.
- `Delivery` does not reappear in active midterm scope.
- PlantUML and draw.io artifacts do not drift from the locked BRD logic.

## Practical Checks
```bash
# Check relayout script CLI
python scripts/relayout_activity_drawio.py --help

# Regenerate elicitation outputs if template-driven docs changed
python scripts/generate_requirement_elicitation_docs.py
```

## Future Change Trigger
- When a real implementation stack is introduced, replace this file with unit, integration, and end-to-end test commands.
