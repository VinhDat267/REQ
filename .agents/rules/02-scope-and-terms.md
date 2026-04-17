# Scope And Terms

- Service models stay locked to `Dine-in`, `Takeaway`, and `Pickup`.
- `Delivery` is out of scope and must not be reintroduced silently.
- Use explicit phase labels:
  - `final-project` as the repository-wide active default after `2026-04-16`
  - `midterm-locked` only for explicitly historical subset artifacts based on local `UC-01..UC-16`
- For `midterm-locked` docs, original 74-UC identifiers stay in traceability fields only.
- For `final-project` whole-system docs, use `Final_Project_Scope.md` plus `All_Use_Cases.md` as the primary scope reference.
- For `BRD final v3`, preserve the current local `UC-01..UC-16` visible lane and continue with selected `UC-17+` instead of forcing the master inventory IDs into the main narrative.
- Business scope is locked after `2026-04-17`; do not add new business capabilities or promote extension candidates without explicit user approval and a new ADR.
- `order_status` and `payment_status` remain separate.
- Guest tracking uses `Order Code + Phone Number`.
- Keep exactly one client problem statement in final-package documents.
