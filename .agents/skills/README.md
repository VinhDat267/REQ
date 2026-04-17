# Skills Directory

This directory stores the repository's local skill library.

## What A Skill Is
A skill is a focused instruction package that teaches an AI agent how to handle a specific task well. Each skill usually lives in its own folder and is activated only when relevant.

## Expected Structure
```text
skills/
|-- skill-name/
|   |-- SKILL.md             # required
|   |-- scripts/             # optional
|   |-- examples/            # optional
|   `-- resources/           # optional
```

Only `SKILL.md` is required.

## Using Skills
1. Make sure the skill is available from a configured skills directory such as `.agents/skills/`, `$CODEX_HOME/skills/`, or another agent-specific location.
2. Invoke the skill in your agent environment, usually by naming it directly.
3. Let the agent load only the relevant skill context for the task.

## Example Skill Groups

### Creative & Design
- `@algorithmic-art` - create algorithmic art with p5.js
- `@canvas-design` - design posters and artwork
- `@frontend-design` - build polished frontend interfaces
- `@ui-ux-pro-max` - improve UI/UX quality
- `@web-artifacts-builder` - build modern interactive web artifacts
- `@theme-factory` - generate themes for docs and presentations
- `@brand-guidelines-anthropic` - apply Anthropic-oriented brand guidance

### Development & Engineering
- `@test-driven-development` - write tests before implementation
- `@systematic-debugging` - debug methodically
- `@webapp-testing` - test web apps with Playwright
- `@receiving-code-review` - process review feedback carefully
- `@requesting-code-review` - request review before finishing
- `@finishing-a-development-branch` - wrap up branch work cleanly
- `@subagent-driven-development` - coordinate parallel agent work

### Documentation & Office
- `@doc-coauthoring` - collaborate on structured docs
- `@docx-official` - create, edit, and analyze Word docs
- `@xlsx-official` - work with spreadsheets
- `@pptx-official` - create and modify presentations
- `@pdf-official` - handle PDFs
- `@internal-comms-anthropic` / `@internal-comms-community` - draft internal communications
- `@notebooklm` - query NotebookLM notebooks

### Planning & Workflow
- `@brainstorming` - design before coding
- `@writing-plans` - write execution plans
- `@planning-with-files` - use file-based planning
- `@executing-plans` - execute plans with checkpoints
- `@using-git-worktrees` - isolate work in git worktrees
- `@verification-before-completion` - verify before claiming completion
- `@using-superpowers` - discover and use advanced skills

### System Extension
- `@mcp-builder` - build MCP servers
- `@skill-creator` - create or update skills
- `@writing-skills` - write and validate skill files
- `@dispatching-parallel-agents` - distribute work across agents

## Finding Skills
- Browse this directory directly.
- Search folders by keyword.
- Use a discovery skill such as `@find-skills` or `@using-superpowers` in your agent environment.

## Creating Or Improving A Skill
Useful local references:
1. [CONTRIBUTING.md](../../docs/CONTRIBUTING.md) - repo contribution guide
2. [writing-skills/SKILL.md](./writing-skills/SKILL.md) - writing and validation workflow
3. [skill-creator/SKILL.md](./skill-creator/SKILL.md) - create or refine a skill
4. [prompt-engineer/SKILL.md](./prompt-engineer/SKILL.md) - example of a complete skill definition

## Notes
- Keep references in this directory repo-accurate; avoid stale links copied from another project.
- Prefer linking to files that actually exist in this repo snapshot.
- If a skill name changes, update both examples and references here.
