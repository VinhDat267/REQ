# Contributing Guide

## Current Repo Posture
- This repository is still documentation-first.
- Root requirement markdown files are the source of truth.
- `src/` and `tests/` are placeholder structure only in the current phase.

## Recommended Working Flow
1. Read `AGENTS.md` first.
2. Review `.agents/context/current-status.md` and `.agents/context/project-overview.md` before substantial edits.
3. Update root requirement docs first when product truth changes.
4. Sync `.agents/context/`, journals, and related navigation docs in the same work session when project state changes materially.
5. Keep new canonical diagrams in `docs/diagrams/plantuml/` or `docs/diagrams/mermaid/`.
6. Keep new `.drawio` files under `docs/diagrams/drawio/`; only `Usecasediagramreq.drawio` remains the legacy root exception.

## Repo Hygiene
- Do not keep generated caches such as `__pycache__/` or `.pyc` files.
- Do not keep ad-hoc extracted text helpers or temporary conversion workspaces at repo root.
- Preserve submission/supporting artifacts that are already part of the documented repo structure unless the cleanup explicitly relocates them.

## Workflow References
- Development posture: `.agents/workflows/dev.md`
- Validation posture: `.agents/workflows/test.md`
- Conventions and terminology: `.agents/context/conventions.md`
- Cross-agent guardrails: `.agents/rules.md`

## Git Note
- Git is not initialized in the current workspace snapshot.
- If git is initialized later, use focused commits and keep the existing commit-message convention from `.agents/context/conventions.md`.
