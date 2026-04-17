# Decision 005: Midterm Local Use Case Numbering

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Hệ thống Wonton POS ở mức tổng thể có `74 UC`, nhưng bài thi BRD midterm chỉ sử dụng `16 UC` được chọn. Khi giữ nguyên mã UC gốc như `UC-49`, `UC-62`, `UC-24` trong BRD, FR/NFR và bảng phân chia, tài liệu trở nên khó theo dõi, khó vẽ diagram và gây nhầm lẫn cho người chấm vì không thể nhìn mã UC mà hiểu ngay chúng thuộc tập midterm nào.

## Quyết định
1. Tạo một hệ mã cục bộ cho midterm từ `UC-01` đến `UC-16`.
2. BRD midterm, FR/NFR, bảng phân chia UC và Use Case Diagram tổng chỉ tham chiếu bộ mã cục bộ này.
3. Mã UC gốc của hệ `74 UC` chỉ được giữ ở cột `UC Gốc` / `Original UC` để truy vết.
4. Các tài liệu brain trong `.agents/` mặc định coi `UC-01..UC-16` là primary reference cho bài midterm.

## Hệ quả
- Tài liệu midterm dễ đọc hơn và nhất quán hơn.
- Diagram tổng có thể vẽ gọn theo đúng phạm vi bài thi.
- Khi làm tiếp diagrams, specs hoặc roadmap cho midterm, agent phải dùng `UC-01..UC-16` trước, không quay lại numbering gốc nếu không có mục đích traceability.
