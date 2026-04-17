# Decision 018: Add explicit abandonment and repeated payment-failure rules

## Date
2026-04-16

## Status
Accepted

## Context
- After the restaurant-realism hardening pass, two highly practical edge cases were still only implied rather than explicitly documented:
  - a customer places an order and then walks away
  - an online prepaid order fails across multiple payment attempts or methods
- In real restaurant operations, these are common and must be defined clearly because they affect:
  - whether the order may enter kitchen operations
  - whether the cashier or manager cancels manually
  - whether the loss is operational, financial, or simply an abandoned unpaid transaction

## Decision
- For **counter-created Takeaway**, if the customer walks away before paying, the Cashier cancels the unpaid order manually and the order must never reach the kitchen.
- If staff mistakenly started preparing an unpaid abandoned order, the Manager confirms the cancellation reason and records the result as an internal operational loss rather than valid revenue.
- For **online prepaid orders**, payment retries across multiple methods are allowed on the same order during the order-hold window.
- The system must not create duplicate orders merely because the customer retries payment.
- The order must not enter kitchen operations until payment is validly confirmed.
- If all payment methods still fail until the hold window expires, the order automatically transitions to `Cancelled`.

## Consequences
- The docs now cover both intentional cancellation and accidental customer abandonment more realistically.
- Payment failure handling is clearer for UX, kitchen intake, and reconciliation.
- Future agents can distinguish between:
  - unpaid abandoned transactions
  - manager-approved loss records
  - fully paid orders that later require refund handling
