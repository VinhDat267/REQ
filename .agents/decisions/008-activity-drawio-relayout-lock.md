# Decision 008: Activity Draw.io Relayout Lock for Midterm Set

## Ngày
2026-03-13

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Bộ 16 activity diagrams tại `docs/diagrams/drawio/activity/` đã được chuẩn hóa về mặt UML/swimlane, nhưng layout còn dày, khoảng cách dọc chật và khó đọc ở các flow nhiều nhánh.

Cần tăng readability cho bản `.drawio` mà không làm thay đổi semantics của các sơ đồ midterm.

## Quyết định
1. Áp dụng relayout hàng loạt cho toàn bộ `UC-01..UC-16` trong `docs/diagrams/drawio/activity/`.
2. Relayout chỉ được phép thay đổi geometry/layout-related fields như lane width, node size, x/y positioning và page bounds.
3. Với chế độ relayout thuần, phải giữ nguyên:
   - mọi `mxCell` id
   - mọi edge `source`, `target`, `value`
   - mọi vertex `parent` (swimlane ownership)
   - toàn bộ business text hiện có
   - swimlane orientation dạng cột (`horizontal=1`)
4. Ngoại lệ mới được chấp nhận cho spec-alignment auto-fix:
   - chỉ qua mapping explicit theo `(file, cell id, field)` trong `scripts/relayout_activity_drawio.py`
   - chỉ cho các field allowlist: `value`, `x`, `parent`, `source`, `target`
   - phải idempotent: current = `old` thì đổi sang `new`, current = `new` thì coi là no-op
   - mọi structural change (`parent`, `source`, `target`) phải được audit rõ ràng trong summary output
5. Chuẩn relayout hiện tại dùng:
   - lane width `300`
   - action nodes `220x52`
   - decision nodes `84x84`
   - small merge/final nodes `32x32`
   - initial node `24x24`
   - vertical scaling deterministic từ mốc `y=60`
6. Script canonical cho thao tác này là `scripts/relayout_activity_drawio.py`; script hiện đã hỗ trợ cả deterministic controlled auto-fix cho các mismatch spec-alignment đã được phê duyệt.

## Hệ quả
- Khi cần relayout lại activity `.drawio`, ưu tiên chạy lại script canonical thay vì chỉnh tay từng file.
- Không được sửa semantics trong lúc “chỉ relayout”; nếu cần đổi flow/business logic thì phải coi đó là một thay đổi requirements riêng.
- `.agents/context/current-status.md` và `.agents/context/conventions.md` phải phản ánh rằng bộ activity `.drawio` đã được relayout và đang ở trạng thái consistency lock.
