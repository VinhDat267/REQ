# Decision 032: Expand the local final BRD shortlist from 24 to 26 UCs

Date: `2026-04-17`

## Status
Accepted - approved on `2026-04-17`.

## Context
- The earlier curated local BRD lane was set to `24` UCs.
- Review of the shortlist showed that the BRD would still read slightly underweighted on the customer-facing side if it stopped there.
- The two most meaningful gaps were:
  - customer account / authentication coverage
  - customer-side checkout / promotion application visibility
- The user decided to keep the current shortlist and add a few more important UCs rather than replacing any existing additions.

## Decision
Expand the recommended local final BRD lane from `24` to `26` UCs by adding:

- `UC-25` Quan ly tai khoan khach hang va xac thuc
- `UC-26` Hoan tat checkout va ap dung uu dai

The resulting recommendation becomes:

- preserve `UC-01..UC-16`
- add `UC-17..UC-26`
- total recommended local final BRD set: `26` UCs

## Consequences
- The shortlist is still compact enough for a shared BRD final v3 narrative.
- The final BRD now better balances:
  - customer access and checkout
  - FOH / BOH operations
  - managerial and financial control
- No business scope was expanded; this is a presentation / packaging refinement inside the locked baseline.
