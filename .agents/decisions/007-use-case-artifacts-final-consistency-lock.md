# Decision 007: Final Consistency Lock for Use Case Artifacts

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Sau khi đã formal hóa BRD và sửa UC Specifications, vẫn còn một số lệch nhỏ giữa các artifact use case:
- `Usecasediagramreq.drawio`
- `docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml`
- `UC_Specifications_Part1_EN.md` / `UC_Specifications_Part1.md`
- `UC_Specifications_Part2_EN.md` / `UC_Specifications_Part2.md`

Các lệch còn lại chủ yếu nằm ở:
- relation giữa `UC-01` và `Login`
- wording/state names như `Preparing`, `Ready to Serve`
- phần `Reorder` đã bị loại khỏi `UC-04`
- model trạng thái bàn còn sót `Reserved`

## Quyết định
1. `UC-04` trong UC Specifications không còn chứa hành vi `Reorder / Đặt lại đơn`.
2. `UC-13` dùng state canonical `Cooking`, không dùng `Preparing`.
3. `UC-14` dùng state canonical `Ready` / `Sẵn sàng`, không dùng `Ready to Serve` như một tên trạng thái chính.
4. `UC-12` chỉ dùng model trạng thái bàn `Available / Occupied` (`Trống / Đang dùng`), không dùng `Reserved`.
5. Trong use case diagram canonical, `UC-01` không còn relation `<<extend>>` với `Login`.
6. Quan hệ notification trong diagram được tối giản để tránh ép model UML không cần thiết; logic notification vẫn được giữ trong BRD và UC specs.
7. `UC_Specifications_Part1` và `Part1_EN` dùng wording cho `UC-06` theo BRD: create/update/deactivate thay vì create/update/delete.

## Hệ quả
- BRD, UC Specifications, draw.io và PlantUML hiện phải được coi là đã khóa consistency cho phạm vi midterm.
- Agent không được tái tạo lại `Reorder` cho `UC-04` hoặc state names cũ như `Preparing` / `Ready to Serve` nếu không có yêu cầu mới.
- Khi cần sửa use case diagram trong tương lai, phải giữ đồng bộ giữa `.drawio`, `.puml` và UC Specifications.
