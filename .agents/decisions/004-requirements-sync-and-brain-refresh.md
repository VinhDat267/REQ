# Decision 004: Requirements Synchronization and Brain Refresh

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Sau khi rà chéo BRD, Business Rules và Use Cases, project tồn tại nhiều điểm lệch nhau về scope, payment rules, guest tracking, pickup approval và trạng thái đơn hàng. Đồng thời, một phần tài liệu và brain files bị lỗi encoding, làm giảm chất lượng context cho các phiên sau.

## Quyết định
1. Đồng bộ lại toàn bộ bộ requirements theo một bộ rule thống nhất.
2. Chốt các quy tắc cốt lõi:
   - `Dine-in`, `Takeaway`, `Pickup`
   - Delivery ngoài scope
   - `Takeaway` và `Pickup` phải trả trước
   - `Pickup` auto-accept sau slot/capacity check
   - Guest tracking bằng `Mã đơn + SĐT`
   - Tách `order_status` và `payment_status`
3. Sửa lỗi mojibake/encoding trong docs.
4. Refresh `.agents/` theo cấu trúc vibe coding để agent có working memory ổn định.

## Hệ quả
- Root docs và `.agents/` hiện cùng phản ánh một trạng thái hệ thống.
- Các phiên sau có thể bắt đầu bằng cách đọc `project-overview.md` + `current-status.md` mà không cần dựng lại context từ đầu.
- Nếu requirements tiếp tục thay đổi, phải cập nhật cả root docs lẫn `.agents/`.
