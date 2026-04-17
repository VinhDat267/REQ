# Decision 003: Actor Reorganization around Workstation Roles

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Phân actor cũ theo chức danh rời rạc làm cho hệ thống khó phản ánh mô hình multi-role của quán nhỏ. Đồng thời, guest flow và login flow bị chồng chéo khi mô hình actor không rõ ràng.

## Quyết định
Chuẩn hóa thành 5 actors chính:
1. `Manager`
2. `FOH Staff`
3. `BOH Staff`
4. `Registered Customer`
5. `Guest Customer`

## Lý do
- Phù hợp hơn với vận hành thực tế tại quán nhỏ.
- Hỗ trợ multi-role cho nhân viên.
- Làm rõ ranh giới quyền hạn giữa phía khách và phía vận hành.
- Giúp Use Case Diagram và UC Specs nhất quán hơn.

## Hệ quả
- Toàn bộ bộ use cases và specs phải dùng cùng tập actor này.
- FOH và BOH được xem là workstation roles thay vì tách nhỏ không cần thiết.
- Guest flow và registered flow được mô tả rõ ràng hơn.
