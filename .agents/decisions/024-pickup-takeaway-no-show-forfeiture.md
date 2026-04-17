# Decision 024: Pickup / Takeaway no-show forfeiture status

Date: `2026-04-17`

## Status
Accepted — approved on `2026-04-17`, scope lock of Decision `022` is unlocked for the specific changes in this ADR.

## Context
- `Business_Rules.md §3c` already states that when a **Paid** Pickup or Takeaway order sits at `Ready` and the customer never arrives:
  - the system **does not auto-complete**
  - the system **does not auto-refund**
  - the Manager decides among: keep the food / cancel / partial refund / full refund / **do not refund** ("quán giữ tiền")
- The "do not refund" branch is operationally valid (customer's fault, food was prepared) but the **final status of such an order is not defined** in the locked rules. The ambiguity produces two bad options:
  - `Cancelled + Paid` without refund → contradictory on reports, because `Cancelled` implies order aborted and money either refunded or pending.
  - `Completed` → semantically wrong because the customer never received the food.
- Shift-close reporting (`§3g`) currently lists "Ready quá lâu chưa giao / chưa nhận" as a case to review, but has no terminal bucket for forfeiture revenue.

## Decision (proposed)
Introduce a terminal no-show decision model with two explicit outcomes:

1. **`Forfeited`** — Manager decides the shop keeps the payment.
   - `order_status` → `Cancelled` (food is discarded or repurposed as staff meal — food is **not** served to the customer).
   - `payment_status` → new terminal value `Forfeited` (money retained, no refund).
   - Revenue treatment: recorded in a dedicated "Forfeited revenue" line on shift close, **not** mixed with normal served-order revenue. Stakeholder can decide later whether this counts toward KPIs or gets a tax/accounting flag.

2. **Existing refund path** — Manager decides to refund fully or partially. Already covered by `§3b` and `Refund Pending → Refunded`.

Common rules for both:
- Manager-only decision. Cashier flags the overdue order; Manager decides.
- Decision must be recorded with reason (e.g., "customer unreachable after N attempts", "past closing time", "food spoiled").
- Default holding window for flagging overdue: quán cấu hình (ví dụ 30-60 phút sau giờ hẹn Pickup, hoặc đến giờ đóng cửa với Takeaway Ready). Values are per-shop, not hard-coded.
- Before flagging Forfeited, the shop is expected (but not system-forced) to attempt customer contact via the phone number on file.

## Alternatives considered
- **Force refund for every no-show:** customer-friendly but unfair to the shop (food already prepared). Rejected.
- **Force `Completed`:** wrong semantically. Reports would falsely count unserved food as served. Rejected.
- **Free-form "manager closes the order":** current behavior. Rejected because it produces inconsistent reporting across shops and cashiers.

## Consequences
- Adds one `payment_status` terminal value: `Forfeited`.
- BRD `§11.2` gains a row.
- Business Rules `§3c` is updated to explicitly list `Forfeited` as an allowed Manager decision (the rule already mentions "không hoàn tiền" but without a status name).
- Shift-close reconciliation (`§3g`) adds a "Forfeited" column alongside refund and write-off.
- This is a scope change against the `2026-04-17` lock and needs user sign-off.

## Resolved decisions
1. **Name:** `Forfeited`. Short and standard in F&B prepayment contexts. `Retained` is ambiguous (retained in what sense?), and `NoShow-Retained` is clunky.
2. **Revenue treatment:** `Forfeited` amounts **are** part of taxable revenue (the customer paid for a prepared service in good faith; the transaction is legally complete). However, the amount is reported on a **dedicated line** separate from "normal served-meal revenue" in shift-close and end-of-day reports so management can analyze no-show trends without polluting operational KPIs.
3. **Minimum wait / contact attempt:** No hard system rule. The shop configures a per-shop holding window (default guidance: 30 minutes after `Ready` for Takeaway, 60 minutes after scheduled pickup time for Pickup, or up to closing time). Before flagging `Forfeited`, the shop is strongly recommended to attempt at least one contact via the phone on file. The system does not enforce this — it is an operational expectation logged in the reason field.
4. **Audit:** Yes, `Forfeited` decisions follow `§3k` Manager Override & Audit rules — Manager ID, reason, timestamp, order reference, amount all logged.
