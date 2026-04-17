# Decision 006: BRD Formalization and Midterm Diagram Lock

## Ngày
2026-03-11

## Trạng thái
Đã quyết định và đã áp dụng

## Bối cảnh
Sau đợt rà soát consistency giữa BRD, Business Rules, All Use Cases, UC Specifications và use case diagram, project còn nhiều điểm cần khóa lại để tránh agent ở các phiên sau quay về logic cũ hoặc sinh ra artifacts lệch scope midterm.

Các vấn đề chính đã được xử lý gồm:
- FR/NFR trong BRD chưa đúng formal style.
- Một số phần VI/EN chưa đồng bộ hoàn toàn.
- Stakeholder metadata và Glossary còn lệch với business context đã chốt.
- Tên hệ thống còn lẫn `WanTan` / `Wonton`.
- Trước khi sync cuối, `Usecasediagramreq.drawio` chưa khớp hoàn toàn với BRD midterm hiện tại.

## Quyết định
1. BRD Việt và Anh phải dùng formal requirement wording theo mẫu `The system shall ...` cho cả FR và NFR.
2. Midterm BRD chỉ dùng bộ mã cục bộ `UC-01..UC-16`; các mã UC gốc chỉ còn vai trò traceability.
3. Stakeholder trong BRD midterm được khóa về 1 stakeholder duy nhất:
   - `Nguyen Quang Anh`
   - role: `Stakeholder - CEO`
4. Tên hệ thống trong repo được khóa là `Wonton POS`; không quay lại `WanTan`.
5. Canonical Use Case Diagram source cho midterm là file PlantUML:
   - `docs/diagrams/plantuml/use-case/midterm-16-use-case-overview.puml`
6. File `Usecasediagramreq.drawio` ở root được giữ như artifact đã sync với BRD hiện tại và có thể dùng cho review/submission, nhưng khi chỉnh logic phải đối chiếu lại với BRD + PlantUML canonical.
7. Supporting account/authentication UCs bắt buộc thể hiện trên overall use case diagram gồm:
   - Register
   - Login
   - Forgot Password
   - Update Profile
   - Change Password
   - Admin Login
8. External actor `Payment Gateway (Sandbox)` là một phần hợp lệ của use case diagram midterm vì có liên quan đến `UC-02` và `UC-10`.

## Hệ quả
- Các phiên sau phải xem BRD formalized và PlantUML canonical là chuẩn logic chính.
- Không tự ý bỏ supporting auth UCs khỏi overall diagram khi BRD vẫn yêu cầu thể hiện.
- Nếu draw.io và PlantUML lệch nhau, phải sửa về phía khớp BRD trước rồi mới coi draw.io là đúng.
- Agent cần coi `Usecasediagramreq.drawio` hiện tại là bản đã chốt cho scope midterm, trừ khi người dùng yêu cầu chỉnh tiếp.
