# Final Project Brief - REQ

## Source
- Reviewed from `S2026_61FIT3REQ FINAL PROJECT.pdf` on `2026-04-09`.

## Hard Constraints From The Brief
- exactly `1` client problem statement
- full-version requirements
- use case specifications
- at least `10` literature / article / online references
- `3` modelling types for the whole system
- elicitation notes with `plan -> prepare -> conduct -> confirm`
- requirement management:
  - change
  - risk
  - scope
- prototype evidence covering UI / UX
- thesis over `10000` words
- thesis formatting:
  - `Times New Roman`
  - size `13`
- each person submits the final version on the portal
- last thesis page uses academic references / sources
- brief date `4/5/2026` is being interpreted here as `2026-05-04` (`4 May 2026`)

## Required Thesis Structure
1. Introduction
2. Literature Review
3. Client Overview, Problem Statement, and Requirements
4. Application of Elicitation Techniques
5. Application of Modelling
6. Requirement Management
7. Prototype
8. Revision / Lesson Learned / Recommendation

## Tutorial Checkpoints
- Session 6:
  - BRD ver 1 revision
  - BRD ver 2 preparation
- Session 7:
  - elicitation notes
- Session 8:
  - `3` whole-system diagrams
- Session 9:
  - prototyping
- Session 10:
  - SRS
  - BRD final
- Session 11:
  - requirement management

## Role-Based Submission Expectations
- Whole team:
  - thesis Word file
  - BRD final
- System Analyst:
  - diagram project
  - SRS
- Data Analyst:
  - diagram project
- Business Process Analyst:
  - diagram project
- UX Analyst:
  - prototype project
- Project Manager:
  - requirement management file
- Requirement Analyst:
  - elicitation notes
  - SRS

## Current Repo Mapping
| Deliverable | Brief expectation | Current repo evidence | Gap / note |
|---|---|---|---|
| BRD final | one problem statement, full-version requirements | `BRD_Ver0.md`, `BRD_Ver0_EN.md` | current root BRD is still midterm-oriented and needs promotion |
| SRS | final submission artifact | `.agents/specs/srs.md` exists only as an internal memory note | final root SRS package is not yet visible |
| Elicitation Notes | prepare + technique notes | `docs/requirement-elicitation/*.docx` | strongest existing final-project evidence already present |
| Whole-system diagrams | `3` modelling types; explicitly whole-system | whole-system ERD exists; midterm use case / activity diagrams exist | full-system use case + process diagrams still need explicit tracking |
| Prototype | UI / UX evidence | HTML mockups under `src/frontend/` and `src/frontend-vi/` | packaging / export path for submission still needs a decision |
| Requirement management | change / risk / scope | no dedicated root artifact tracked in `.agents` yet | needs explicit deliverable |
| Literature review | at least `10` sources | not tracked yet in `.agents` | needs source log and thesis section |
| Thesis | over `10000` words | not assembled in repo | major final-writing task still open |

## Working Interpretation For Agents
- The brief changes the deliverable lane, not the locked business rules.
- Preserve midterm artifacts as `midterm-locked` references.
- Build or promote final whole-system artifacts in a separate `final-project` lane until root docs are intentionally updated.
