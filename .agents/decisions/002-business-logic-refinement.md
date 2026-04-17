# Decision 002: Business Logic Refinement for Real-world Fit

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã phản ánh vào bộ tài liệu requirements

## Bối cảnh
Sau khi hình thành bộ BRD/UC ban đầu, logic nghiệp vụ còn mang tính “bài tập” hơn là bám sát vận hành thực tế của một quán mì vằn thắn. Cần chỉnh lại để requirements hợp lý hơn và tránh mâu thuẫn nội bộ.

## Quyết định
1. Bỏ hướng “đặt bàn trước” và thay bằng `Pickup`.
2. Cho phép `Guest Checkout` để giảm friction.
3. Không auto-cancel đơn `Dine-in` chưa thanh toán; chỉ auto-cancel các flow bắt buộc trả trước khi quá hạn.
4. KDS hỗ trợ batch update và 86'd items.
5. Login không còn là bước bắt buộc cứng trong flow đặt món online.

## Hệ quả
- `Pickup` trở thành service model chính thức.
- Guest flow trở thành một phần hợp lệ của hệ thống.
- Rules thanh toán và hủy đơn phải được mô tả rõ theo từng service model.
- Business Rules và UC Specs phải dùng cùng một logic vận hành.
