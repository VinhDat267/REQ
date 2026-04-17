# 📋 Phân Chia Use Case & UC Specification — Midterm Phase 2

## Bảng Phân Chia UC (8 thành viên × 2 UC = 16 UC)

> **Hệ thống đánh số UC:** Trong bộ tài liệu midterm, 16 UC được **đánh lại mã cục bộ từ `UC-01` đến `UC-16`** để dễ theo dõi. Cột **"UC Gốc"** dùng để map ngược về hệ thống 74 UC tổng thể trong `All_Use_Cases.md`.

| # | MSSV | Thành viên | UC thứ 1 | UC Gốc | UC thứ 2 | UC Gốc |
|---|------|-----------|----------|--------|----------|--------|
| 1 | 2301040126 | Nguyễn Thị Hải My | UC-01: Đặt món online | UC-09 | UC-07: Xem thống kê doanh thu | UC-41 |
| 2 | 2301040198 | Nguyễn Đạt Vinh | UC-09: Tạo đơn hàng tại quán | UC-49 | UC-08: Quản lý bàn | UC-32~36 |
| 3 | 2301040113 | Vương Gia Ly | UC-02: Thanh toán online | UC-13 | UC-06: Quản lý nhân viên | UC-37~40 |
| 4 | 2301040048 | Nguyễn Minh Đức | UC-10: Xử lý thanh toán | UC-54~56 | UC-03: Đặt món hẹn giờ lấy | UC-21 |
| 5 | 2301040088 | Đặng Khánh Huyền | UC-05: Quản lý menu | UC-26~31 | UC-04: Xem lịch sử đơn hàng | UC-16~17 |
| 6 | 2301040036 | Lê Thành Đạt | UC-15: Đánh giá đơn hàng | UC-20 | UC-13: Nhận đơn từ bếp | UC-62~63 |
| 7 | 2301040025 | Nguyễn Đình Chiến | UC-14: Cập nhật trạng thái món | UC-65~66 | UC-12: Gán đơn vào bàn | UC-59~60 |
| 8 | 2301040071 | Nguyễn Thiện Hiếu | UC-16: Nhận thông báo đơn hàng | UC-24 | UC-11: Theo dõi đơn hàng | UC-15 |

> **Lưu ý:**
> - Không có 2 thành viên nào trùng UC.
> - Mỗi UC đủ phức tạp (có Normal Flow ≥ 4 bước, Alternative Flow và Exception rõ ràng).

---

## UC Specification Chi Tiết

---

### 🔹 Nguyễn Thị Hải My (2301040126)

#### UC-01: Đặt món online *(Tương ứng UC-09 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-01: Đặt món online |
| **Primary Actor** | Khách hàng (Thành viên / Vãng lai) |
| **Description** | Khách hàng sử dụng Client WebApp để duyệt menu, thêm món vào giỏ hàng, chọn mô hình phục vụ và tạo đơn hàng online theo đúng quy tắc nghiệp vụ của mô hình phục vụ đã chọn. |
| **Trigger** | Khách hàng chọn "Đặt món" hoặc "Xem Menu" trên trang chủ. |
| **Pre-conditions** | 1. Client WebApp sẵn sàng cho việc đặt món. 2. Menu có ít nhất một món ở trạng thái `Available`. 3. Mô hình phục vụ được chọn thuộc phạm vi hỗ trợ: `Dine-in`, `Takeaway`, hoặc `Pickup`. |
| **Post-conditions** | **Thành công:** Một đơn hàng online được tạo với đúng mô hình phục vụ và đúng chi tiết đơn hàng. Nếu đơn là `Dine-in`, đơn được tạo ở trạng thái hợp lệ chưa thanh toán với `payment_status = Unpaid`, mã đơn được hiển thị và khách hàng được chuyển sang màn hình theo dõi đơn. Nếu đơn là `Takeaway`, đơn được tạo theo quy tắc bắt buộc trả trước và khách hàng được chuyển sang luồng thanh toán trước khi đơn được đẩy xuống bếp. Nếu đơn là `Pickup`, khách hàng được chuyển sang UC-03 để kiểm tra khung giờ và thanh toán bắt buộc trước khi đơn có thể tiếp tục. **Thất bại:** Không có đơn hàng chưa hoàn chỉnh hoặc thay đổi ngoài ý muốn nào được ghi nhận, nội dung giỏ hàng hiện tại được giữ nguyên trừ khi khách hàng tự chỉnh sửa, và hệ thống hiển thị thông báo lỗi phù hợp. |
| **Normal Flow** | 1.1. Khách hàng chọn "Đặt món" hoặc "Xem Menu". |
| | 1.2. Khách hàng chọn một danh mục món ăn. |
| | 1.3. Hệ thống hiển thị các món trong danh mục đã chọn cùng thông tin cơ bản. |
| | 1.4. Khách hàng chọn một món ăn. |
| | 1.5. Hệ thống hiển thị chi tiết món, cho phép khách hàng chọn số lượng, topping và ghi chú đặc biệt. |
| | 1.6. Khách hàng thêm món đã chọn vào giỏ hàng. |
| | 1.7. Hệ thống cập nhật giỏ hàng và hiển thị số lượng món hiện tại cùng tổng tiền. |
| | 1.8. Khách hàng chọn mô hình phục vụ (`Dine-in` / `Takeaway` / `Pickup`). |
| | 1.9. Nếu khách hàng tiếp tục dưới dạng khách vãng lai, khách hàng nhập Tên và Số điện thoại để Guest Checkout. |
| | 1.10. Khách hàng chọn "Đặt hàng". |
| | 1.11. Hệ thống kiểm tra giỏ hàng có ít nhất một món và tạo đơn theo mô hình phục vụ đã chọn. |
| | 1.12. Nếu mô hình phục vụ là `Dine-in`, hệ thống tạo đơn với `payment_status = Unpaid`, hiển thị mã đơn và mở màn hình theo dõi đơn. |
| | 1.13. Nếu mô hình phục vụ là `Takeaway`, hệ thống chuyển khách hàng sang luồng thanh toán bắt buộc trước khi đẩy đơn xuống bếp. |
| **Alternative Flows** | 2a. Thêm nhiều món: Sau bước 1.7, khách hàng tiếp tục duyệt menu và lặp lại các bước 1.2-1.7 cho đến khi hoàn tất giỏ hàng. |
| | 2b. Chỉnh sửa giỏ hàng: Trước bước 1.10, khách hàng cập nhật số lượng hoặc xóa món trong giỏ hàng. Hệ thống làm mới tổng tiền và luồng tiếp tục tại bước 1.8. |
| | 2c. Thanh toán bằng tài khoản đã đăng nhập: Tại bước 1.9, nếu khách hàng đã được xác thực, bước nhập thông tin Guest Checkout được bỏ qua và luồng tiếp tục tại bước 1.10. |
| | 2d. Đơn `Pickup`: Tại bước 1.8, khách hàng chọn `Pickup`. Tại bước 1.11, hệ thống chuyển khách hàng sang UC-03 để kiểm tra khung giờ và thanh toán bắt buộc trước. |
| | 2e. Gọi thêm món Dine-in: Khách hàng đang ăn tại quán quét lại QR bàn hoặc chọn "Đặt thêm" trên Client WebApp. Hệ thống tạo đơn hàng mới gắn với cùng bàn đó, luồng tiếp tục từ bước 1.2. Đơn mới giữ `payment_status = Unpaid` và được đẩy xuống bếp ngay. Nếu khách scan nhầm QR hoặc đổi chỗ sau khi order, FOH/Cashier có thể xác nhận lại và chuyển đơn sang đúng bàn vận hành. |
| **Exceptions** | E1. Món không còn khả dụng: Tại bước 1.4 hoặc 1.5, nếu món được chọn không còn khả dụng, hệ thống hiển thị thông báo hết món và giữ khách hàng ở luồng chọn món/menu để chọn món khác. |
| | E2. Giỏ hàng trống: Tại bước 1.11, nếu giỏ hàng không có món nào, hệ thống từ chối yêu cầu đặt hàng, hiển thị thông báo giỏ hàng trống và giữ khách hàng ở luồng đặt món để tiếp tục thêm món. |
| **Priority** | Critical |

---
#### UC-07: Xem thống kê doanh thu *(Tương ứng UC-41 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-07: Xem thống kê doanh thu |
| **Primary Actor** | Quản lý (Chủ quán) |
| **Description** | Quản lý sử dụng Admin WebApp để xem thống kê doanh thu, top món bán chạy và phân tích khung giờ cao điểm bằng các bộ lọc thời gian và bộ lọc phương thức thanh toán khi cần. |
| **Trigger** | Quản lý chọn "Thống kê & Báo cáo" trong Admin WebApp. |
| **Pre-conditions** | 1. Quản lý đã được xác thực với quyền truy cập thống kê doanh thu. 2. Phân hệ thống kê sẵn sàng hoạt động. 3. Dữ liệu đơn hàng đã hoàn thành đã được ghi nhận để phục vụ báo cáo, kể cả khi bộ lọc được chọn có thể không trả về kết quả. |
| **Post-conditions** | **Thành công:** Dữ liệu thống kê doanh thu theo bộ lọc được chọn được hiển thị bằng biểu đồ và/hoặc bảng số liệu, và nếu có yêu cầu xuất báo cáo thì file xuất được tạo để tải về. **Thất bại:** Không có dữ liệu báo cáo nào bị thay đổi, ngữ cảnh bộ lọc hợp lệ gần nhất được giữ nguyên, và hệ thống hiển thị đúng thông báo không có dữ liệu hoặc lỗi tải dữ liệu. |
| **Normal Flow** | 1.1. Quản lý mở "Thống kê & Báo cáo". |
| | 1.2. Hệ thống hiển thị dashboard tổng quan, bao gồm doanh thu hôm nay, số đơn hôm nay và giá trị đơn trung bình. |
| | 1.3. Quản lý chọn khoảng thời gian (`Hôm nay` / `Tuần này` / `Tháng này` / `Tùy chỉnh`). |
| | 1.4. Hệ thống làm mới biểu đồ doanh thu theo khoảng thời gian đã chọn. |
| | 1.5. Quản lý mở mục Top Selling Items. |
| | 1.6. Hệ thống hiển thị top 10 món bán chạy nhất cùng số lượng và doanh thu. |
| | 1.7. Quản lý mở mục Peak Hours. |
| | 1.8. Hệ thống hiển thị phân tích số lượng đơn theo từng khung giờ trong khoảng thời gian đã chọn. |
| **Alternative Flows** | 2a. Lọc theo phương thức thanh toán: Sau bước 1.4, 1.6 hoặc 1.8, Quản lý chọn bộ lọc phương thức thanh toán (`Cash` / `QR` / `Online`). Hệ thống làm mới dữ liệu thống kê đang hiển thị cho khoảng thời gian hiện tại. |
| | 2b. Xuất báo cáo: Sau bước 1.4, 1.6 hoặc 1.8, Quản lý chọn "Xuất báo cáo". Hệ thống tạo file PDF hoặc Excel cho ngữ cảnh báo cáo hiện tại và bắt đầu tải xuống. |
| **Exceptions** | E1. Không có dữ liệu theo bộ lọc đã chọn: Tại bước 1.2, 1.4, 1.6 hoặc 1.8, nếu khoảng thời gian hoặc bộ lọc áp dụng không trả về dữ liệu đơn hàng hoàn thành, hệ thống hiển thị "Chưa có dữ liệu trong khoảng thời gian này" và giữ Quản lý ở màn hình thống kê để chọn bộ lọc khác. |
| | E2. Lỗi tải dữ liệu thống kê: Tại bước 1.4, 1.6 hoặc 1.8, nếu dữ liệu thống kê không thể được tải, hệ thống hiển thị "Không thể tải dữ liệu, vui lòng thử lại" và giữ nguyên trạng thái báo cáo hợp lệ gần nhất. |
| **Priority** | High |

---

### 🔹 Nguyễn Đạt Vinh (2301040198)

#### UC-09: Tạo đơn hàng tại quán *(Tương ứng UC-49 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-09: Tạo đơn hàng tại quán |
| **Primary Actor** | Nhân viên Tiền sảnh (FOH Staff) |
| **Description** | Nhân viên FOH sử dụng Admin WebApp để tạo đơn hàng tại quầy cho khách dùng tại quán hoặc mua mang đi. Nhân viên FOH chọn hình thức phục vụ, thêm món vào đơn hàng, gán bàn khi đơn là Dine-in, và tiếp tục xử lý đơn theo quy tắc thanh toán của hình thức phục vụ đã chọn. |
| **Trigger** | Nhân viên FOH chọn "Tạo đơn mới" trong Admin WebApp. |
| **Pre-conditions** | 1. Nhân viên FOH đã được xác thực với quyền tạo đơn hàng tại quán. 2. Menu sẵn sàng cho việc đặt món. 3. Với đơn Dine-in, có thể xem ít nhất một bàn để gán từ sơ đồ bàn hiện tại. |
| **Post-conditions** | **Thành công:** Một đơn hàng tại quán mới được tạo. Nếu là Dine-in, đơn được liên kết với bàn đã chọn, trạng thái bàn được cập nhật thành `Occupied`, phiếu bếp được gửi ngay, và đơn vẫn có thể hợp lệ với `payment_status = Unpaid`. Nếu là Takeaway, đơn được tạo với `payment_status = Unpaid`, Nhân viên FOH được chuyển sang luồng thanh toán tại quầy, và phiếu bếp chưa được gửi trước khi thanh toán thành công. Đơn Takeaway tại quầy không bị auto-cancel sau 15 phút vì Thu ngân kiểm soát trực tiếp; Thu ngân có thể thu tiền ngay tại quầy hoặc hủy thủ công nếu khách từ bỏ. **Thất bại:** Không có đơn hàng chưa hoàn chỉnh hoặc thay đổi ngoài ý muốn nào được ghi nhận, không có gán bàn sai nào được áp dụng, và hệ thống hiển thị thông báo lỗi phù hợp. |
| **Normal Flow** | 1.1. Nhân viên FOH mở mục "Tạo đơn mới". |
| | 1.2. Hệ thống hiển thị biểu mẫu tạo đơn tại quán với các lựa chọn hình thức phục vụ. |
| | 1.3. Nhân viên FOH chọn hình thức phục vụ. |
| | 1.4. Nếu hình thức được chọn là Dine-in, Nhân viên FOH chọn bàn từ sơ đồ bàn hiện tại. |
| | 1.5. Hệ thống hiển thị menu. |
| | 1.6. Nhân viên FOH chọn món, số lượng, topping và ghi chú, sau đó thêm các món đã chọn vào đơn hàng. |
| | 1.7. Nhân viên FOH xem lại chi tiết đơn hàng và tổng tiền. |
| | 1.8. Nhân viên FOH xác nhận đơn hàng. |
| | 1.9. Nếu đơn là Dine-in, hệ thống tạo đơn hàng, liên kết đơn với bàn đã chọn, cập nhật trạng thái bàn thành `Occupied`, gửi phiếu bếp và hiển thị thông báo thành công. |
| | 1.10. Nếu đơn là Takeaway, hệ thống tạo đơn với `payment_status = Unpaid` và chuyển Nhân viên FOH sang luồng thanh toán tại quầy. |
| **Alternative Flows** | 2a. Đơn Takeaway: Tại bước 1.3, Nhân viên FOH chọn "Takeaway". Bước chọn bàn được bỏ qua và luồng tiếp tục tại bước 1.5. |
| | 2a-2. Thanh toán ngay tại quầy cho Takeaway: Sau bước 1.10, Thu ngân thu tiền ngay tại quầy bằng tiền mặt/QR/phương thức hỗ trợ khác thông qua UC-10. Khi thanh toán thành công, đơn chuyển `Paid` và mới được đẩy xuống bếp. |
| | 2b. Thêm nhiều món: Sau bước 1.6, Nhân viên FOH tiếp tục chọn thêm món trước khi chuyển sang bước 1.7. |
| | 2c. Gọi thêm món cho bàn đã có đơn: Tại bước 1.4, Nhân viên FOH chọn bàn đang ở trạng thái `Occupied` (đã có đơn trước đó). Hệ thống cho phép tạo đơn hàng mới gắn với cùng bàn đó. Bàn giữ nguyên trạng thái `Occupied`. Luồng tiếp tục tại bước 1.5. |
| | 2d. Chỉnh sửa ngay sau khi tạo nhưng trước khi bếp nhận: Sau bước 1.9 hoặc 1.10, nếu khách đổi ý rất sớm và bếp chưa nhận đơn, FOH/Cashier có thể mở đơn để sửa món/số lượng/ghi chú hoặc hủy và tạo lại. Nếu thay đổi làm phát sinh chênh lệch trên đơn đã thanh toán, phần chênh lệch được xử lý theo quy tắc thu thêm hoặc hoàn một phần trước khi vào bếp |
| **Exceptions** | E1. Bàn không khả dụng: Tại bước 1.4, nếu bàn được chọn không khả dụng để gán, hệ thống hiển thị thông báo bàn không khả dụng và giữ Nhân viên FOH ở bước chọn bàn để chọn bàn khác. |
| | E2. Món không khả dụng: Tại bước 1.6, nếu món được chọn đã hết hàng hoặc không khả dụng, hệ thống hiển thị thông báo món không khả dụng và giữ Nhân viên FOH ở màn hình menu để chọn món khác. |
| | E3. Đơn hàng trống: Tại bước 1.8, nếu chưa có món nào được thêm vào đơn hàng, hệ thống từ chối yêu cầu xác nhận, hiển thị thông báo đơn hàng trống và giữ Nhân viên FOH ở biểu mẫu đơn hàng để tiếp tục thêm món. |
| | E4. Khách bỏ giao dịch rồi rời đi: Sau bước 1.10 hoặc trong lúc chờ thanh toán tại quầy, nếu khách bỏ đi, Thu ngân hủy thủ công đơn Takeaway. Đơn không được xuống bếp; nếu đã lỡ xuống bếp do thao tác sai, Quản lý xác nhận lý do hủy để ghi nhận thất thoát nội bộ. |
| **Priority** | Critical |

---
#### UC-08: Quản lý bàn *(Tương ứng UC-32~36 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-08: Quản lý bàn |
| **Primary Actor** | Quản lý |
| **Description** | Quản lý quản trị dữ liệu danh mục bàn phục vụ ăn tại quán trên Admin WebApp bằng cách xem sơ đồ bàn và trạng thái sử dụng hiện tại, sau đó thêm, sửa hoặc xóa bản ghi bàn. Use case này quản trị cấu hình bàn ở mức sơ đồ. Nhân viên FOH có thể xem sơ đồ bàn và trạng thái sử dụng để phục vụ vận hành ăn tại quán, nhưng các thao tác cấu hình trong use case này chỉ do Quản lý thực hiện. |
| **Trigger** | Quản lý chọn mục "Quản lý bàn" trong Admin WebApp. |
| **Pre-conditions** | 1. Quản lý đã được xác thực với quyền quản lý bàn. 2. Phân hệ quản lý bàn sẵn sàng và sơ đồ/trạng thái bàn hiện tại có thể được tải lên, kể cả khi chưa có bản ghi bàn nào. |
| **Post-conditions** | **Thành công:** Bản ghi bàn được tạo mới, cập nhật hoặc xóa theo yêu cầu; sơ đồ bàn và trạng thái sử dụng mới nhất được làm mới và hiển thị. **Thất bại:** Không có thay đổi dữ liệu bàn ngoài ý muốn nào được ghi nhận; hệ thống bảo toàn dữ liệu bàn hợp lệ đã được ghi nhận gần nhất và hiển thị thông báo lỗi phù hợp. |
| **Normal Flow** | 1.1. Quản lý mở mục "Quản lý bàn". |
| | 1.2. Hệ thống hiển thị sơ đồ bàn hiện tại cùng trạng thái sử dụng của từng bàn. |
| | 1.3. Quản lý chọn "Thêm bàn mới". |
| | 1.4. Hệ thống hiển thị biểu mẫu bàn với các trường có thể chỉnh sửa như Số bàn, Sức chứa và Vị trí. |
| | 1.5. Quản lý nhập thông tin bàn bắt buộc và chọn "Lưu". |
| | 1.6. Hệ thống kiểm tra tính hợp lệ của dữ liệu bàn đã nhập. |
| | 1.7. Nếu dữ liệu hợp lệ, hệ thống lưu bản ghi bàn mới. |
| | 1.8. Hệ thống làm mới sơ đồ bàn và hiển thị thông báo xác nhận thêm bàn thành công. |
| **Alternative Flows** | 2a. Sửa bàn: Tại bước 1.2, Quản lý chọn một bàn hiện có để chỉnh sửa. Hệ thống hiển thị dữ liệu bàn hiện tại. Quản lý cập nhật các trường được phép và chọn "Cập nhật". Hệ thống kiểm tra tính hợp lệ của thay đổi. Nếu bàn được chọn hiện không được sử dụng và thao tác cập nhật thành công, hệ thống lưu bản ghi bàn đã cập nhật, làm mới sơ đồ và hiển thị thông báo thành công. |
| | 2b. Xóa bàn: Tại bước 1.2, Quản lý chọn một bàn hiện có để xóa. Hệ thống hiển thị thông báo xác nhận xóa. Quản lý xác nhận yêu cầu. Nếu bàn được chọn hiện không được sử dụng và thao tác xóa thành công, hệ thống xóa bản ghi bàn đã chọn, làm mới sơ đồ và hiển thị thông báo thành công. |
| **Exceptions** | E1. Dữ liệu nhập không hợp lệ: Tại bước 1.6 hoặc luồng thay thế 2a, nếu dữ liệu bắt buộc bị thiếu, bị trùng hoặc không hợp lệ, hệ thống từ chối yêu cầu, hiển thị lỗi kiểm tra dữ liệu và giữ Quản lý ở lại biểu mẫu hiện tại để chỉnh sửa. |
| | E2. Bàn đang được sử dụng: Trong luồng thay thế 2a hoặc 2b, nếu bàn được chọn đang gắn với một nghiệp vụ ăn tại quán còn hiệu lực, hệ thống chặn thao tác cập nhật xung đột hoặc xóa, giữ nguyên dữ liệu bàn hiện có và hiển thị thông báo bàn đang được sử dụng. |
| | E3. Lỗi lưu trữ dữ liệu: Tại bước 1.7, luồng thay thế 2a hoặc luồng thay thế 2b, nếu hệ thống không thể lưu hoặc xóa dữ liệu bàn do lỗi cơ sở dữ liệu hoặc lỗi hệ thống, hệ thống hiển thị thông báo thất bại và bảo toàn dữ liệu bàn hợp lệ đã được ghi nhận gần nhất. |
| **Priority** | High |

---

### 🔹 Vương Gia Ly (2301040113)

#### UC-02: Thanh toán online *(Tương ứng UC-13 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-02: Thanh toán online |
| **Primary Actor** | Khách hàng (Thành viên / Vãng lai) |
| **Description** | Sau khi tạo đơn hàng cần thanh toán trước, khách hàng chọn phương thức thanh toán online phù hợp (QR qua cổng thanh toán hoặc chuyển khoản QR ngân hàng cần xác nhận thủ công) để hoàn tất thanh toán |
| **Trigger** | Khách hàng nhấn "Thanh toán" sau khi xác nhận giỏ hàng hoặc sau khi hệ thống yêu cầu trả trước |
| **Pre-conditions** | 1. Khách đã đăng nhập hoặc đã cung cấp thông tin Guest Checkout (Tên + SĐT). 2. Giỏ hàng có ít nhất 1 món. 3. Đơn hàng đã được tạo và thuộc luồng cần thanh toán trước hoặc khách chủ động chọn trả trước |
| **Post-conditions** | Thanh toán thành công qua callback cổng thanh toán hoặc xác nhận thủ công hợp lệ. Đơn hàng chuyển sang trạng thái `Paid`. Nếu là Takeaway/Pickup, hệ thống tiếp tục đẩy đơn sang luồng vận hành. Không phát sinh order trùng hoặc phiếu bếp trùng chỉ vì khách retry hay callback lặp lại |
| **Normal Flow** | 1.1. Hệ thống hiển thị tổng tiền đơn hàng và các phương thức thanh toán |
| | 1.2. Khách chọn một phương thức thanh toán được hỗ trợ |
| | 1.3. Nếu phương thức đã chọn là QR qua cổng thanh toán, hệ thống chuyển hướng đến trang hoặc widget thanh toán của cổng |
| | 1.4. Khách xác nhận thanh toán trên ứng dụng MoMo/VNPay/ZaloPay |
| | 1.5. Cổng thanh toán trả kết quả hợp lệ về hệ thống |
| | 1.6. Hệ thống hiển thị "Thanh toán thành công!", cập nhật trạng thái đơn và tiếp tục luồng xử lý đơn |
| **Alternative Flows** | 2a. QR qua cổng thanh toán: Bước 1.2, khách chọn MoMo/VNPay/ZaloPay → Hệ thống tạo QR động hoặc chuyển hướng sang cổng thanh toán → Khách xác nhận trên ứng dụng ví → Hệ thống nhận callback thành công → Đơn chuyển `Paid` |
| | 2a-2. Chuyển khoản QR ngân hàng: Bước 1.2, khách chọn "Chuyển khoản QR ngân hàng" → Hệ thống hiển thị mã QR kèm số tiền và nội dung chuyển khoản → Khách chuyển khoản bằng app ngân hàng → Hệ thống giữ đơn ở trạng thái chờ xác nhận thủ công → Thu ngân/Quản lý kiểm tra tiền vào và bấm xác nhận đã nhận → Đơn chuyển `Paid` |
| | 2b. Dine-in trả sau: Nếu đơn là Dine-in, khách có thể bỏ qua thanh toán online và giữ đơn ở trạng thái `Unpaid` để thanh toán tại quầy sau |
| | 2c. Đổi phương thức sau khi thanh toán thất bại: Nếu một lần thanh toán thất bại, khách quay lại màn hình thanh toán của **chính đơn hiện tại**, chọn phương thức khác và thử lại. Hệ thống không tạo thêm đơn mới chỉ vì khách retry. |
| **Exceptions** | E1: Thanh toán thất bại — Bước 1.5, cổng trả về lỗi → Hệ thống hiển thị "Thanh toán thất bại, vui lòng thử lại!" → Đơn giữ trạng thái `Pending Online Payment` |
| | E2: Hết thời gian thanh toán — Sau 15 phút không thanh toán với luồng bắt buộc trả trước qua Client WebApp → Hệ thống tự hủy đơn, hiển thị "Đơn hàng đã bị hủy do quá thời gian thanh toán" |
| | E3: Đơn đã thanh toán bị hủy — Nếu đơn có `payment_status = Paid` bị hủy sau đó (bởi khách trước khi bếp nhận, hoặc bởi Quản lý do ngoại lệ), hệ thống tạo yêu cầu hoàn tiền, chuyển `payment_status` sang `Refund Pending` và thông báo Quản lý phê duyệt |
| | E4: Chuyển khoản QR không khớp — Ở luồng 2a-2, nếu quán không ghi nhận đủ tiền hoặc không tìm thấy giao dịch hợp lệ trong thời gian chờ, hệ thống giữ đơn ở `Pending Online Payment`, hiển thị trạng thái "Đang chờ xác nhận thanh toán" cho khách và cho phép Quản lý/Thu ngân xử lý tiếp hoặc để timeout hủy đơn |
| | E5: Tất cả phương thức thanh toán online đều thất bại — Đơn vẫn giữ ở `Pending Online Payment`, không được đẩy xuống bếp, và hệ thống cho khách tiếp tục retry trên cùng đơn cho đến khi hết thời gian giữ đơn; nếu hết hạn, hệ thống tự hủy đơn theo E2 |
| | E6: Callback thành công đến muộn sau khi đơn đã bị tự hủy — Hệ thống không mở lại đơn và không đẩy đơn xuống bếp. Hệ thống ghi log bất thường, thông báo Quản lý và chuyển phía thanh toán sang `Refund Pending` để xử lý hoàn tiền |
| | E7: Callback thành công bị lặp hoặc phát sinh tín hiệu thanh toán trùng — Hệ thống phải xử lý idempotent, không tạo thêm đơn mới, không tạo thêm phiếu bếp, và không ghi nhận thanh toán lần hai cho cùng giao dịch logic. Nếu có khoản thu thừa thực sự, Quản lý xử lý theo luồng hoàn tiền |
| | E8: Hoàn tiền không thành công ngay lần đầu — Đơn giữ `Refund Pending`, không quay lại luồng vận hành, và Quản lý/Thu ngân tiếp tục theo dõi cho đến khi hoàn tất |
| **Priority** | Critical |

---
#### UC-06: Quản lý nhân viên *(Tương ứng UC-37~40 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-06: Quản lý nhân viên |
| **Primary Actor** | Quản lý (Chủ quán) |
| **Description** | Quản lý thêm, cập nhật, vô hiệu hóa tài khoản nhân viên và phân quyền vai trò trong hệ thống Admin |
| **Trigger** | Quản lý nhấn vào mục "Quản lý nhân viên" trên menu Admin |
| **Pre-conditions** | 1. Quản lý đã đăng nhập với quyền "Quản lý" |
| **Post-conditions** | Tài khoản nhân viên được tạo, cập nhật hoặc vô hiệu hóa thành công |
| **Normal Flow** | 1.1. Quản lý chọn "Quản lý nhân viên" |
| | 1.2. Hệ thống hiển thị danh sách nhân viên (Tên, SĐT, Email, Vai trò, Trạng thái) |
| | 1.3. Quản lý nhấn "Thêm nhân viên" |
| | 1.4. Hệ thống hiển thị form: Họ tên, SĐT, Email, Vai trò (Checkbox: Thu ngân / Bếp / Phục vụ — có thể chọn nhiều), Mật khẩu mặc định |
| | 1.5. Quản lý nhập thông tin và nhấn "Lưu" |
| | 1.6. Hệ thống tạo tài khoản, hiển thị "Thêm nhân viên thành công!" |
| **Alternative Flows** | 2a. Sửa thông tin: Bước 1.2, chọn nhân viên → Sửa thông tin → Nhấn "Cập nhật" → Thành công |
| | 2b. Vô hiệu hóa: Bước 1.2, chọn nhân viên → Nhấn "Vô hiệu hóa" → Xác nhận → Tài khoản bị khóa, không thể đăng nhập |
| | 2c. Đổi vai trò: Bước 2a, quản lý thay đổi vai trò nhân viên (VD: Thu ngân → Bếp) → Cập nhật quyền truy cập |
| **Exceptions** | E1: SĐT đã tồn tại — Bước 1.5, hiển thị "Số điện thoại đã được sử dụng!" |
| | E2: Email không hợp lệ — Bước 1.5, hiển thị "Email không đúng định dạng!" |
| **Priority** | High |

---

### 🔹 Nguyễn Minh Đức (2301040048)

#### UC-10: Xử lý thanh toán *(Tương ứng UC-54~56 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-10: Xử lý thanh toán |
| **Primary Actor** | Nhân viên Tiền sảnh (FOH Staff) |
| **Description** | Thu ngân xử lý thanh toán cho đơn hàng, bao gồm đơn Takeaway cần trả trước khi đẩy xuống bếp và đơn Dine-in thanh toán sau khi phục vụ |
| **Trigger** | Thu ngân nhấn "Thanh toán" trên đơn hàng cần xử lý |
| **Pre-conditions** | 1. Thu ngân đã đăng nhập. 2. Đơn hàng tồn tại và đủ điều kiện thanh toán (Takeaway tại quầy đang chờ thanh toán — không bị auto-cancel vì Thu ngân kiểm soát trực tiếp, hoặc Dine-in khách yêu cầu quyết toán) |
| **Post-conditions** | `payment_status` của đơn chuyển sang `Paid`. Nếu là Takeaway, phiếu bếp được in/gửi sau khi thanh toán; nếu là Dine-in đã hoàn thành, doanh thu được ghi nhận và bàn chuyển về "Trống". Hệ thống không tạo thêm hóa đơn/phiếu bếp trùng nếu cổng thanh toán gửi callback lặp |
| **Normal Flow** | 1.1. Thu ngân chọn đơn hàng cần thanh toán từ danh sách |
| | 1.2. Hệ thống hiển thị chi tiết đơn hàng: danh sách món, tổng tiền |
| | 1.3. Thu ngân chọn phương thức thanh toán (Tiền mặt / QR / Online) |
| | 1.4. Nếu chọn Tiền mặt, thu ngân nhập số tiền khách đưa |
| | 1.5. Hệ thống tính tiền thừa, hiển thị "Tiền thừa: X đồng" |
| | 1.6. Thu ngân nhấn "Xác nhận thanh toán" |
| | 1.7. Hệ thống cập nhật `payment_status = Paid` |
| | 1.8. Nếu là Takeaway, hệ thống in/gửi phiếu bếp để bắt đầu chế biến |
| | 1.9. Nếu là Dine-in đã hoàn thành, hệ thống ghi nhận doanh thu và cập nhật bàn về "Trống" |
| **Alternative Flows** | 2a. QR qua cổng thanh toán (MoMo/VNPay/ZaloPay): Bước 1.3, chọn ví điện tử → Hệ thống tạo QR động chứa thông tin đơn → Khách quét bằng app ví → Cổng thanh toán callback tự động → `payment_status = Paid` → Hoàn tất |
| | 2a-2. QR chuyển khoản ngân hàng: Bước 1.3, chọn "Chuyển khoản QR" → Hệ thống hiển thị QR chứa số tài khoản quán + số tiền → Khách quét bằng app ngân hàng → Thu ngân kiểm tra SMS/app bank xác nhận đã nhận tiền → Thu ngân bấm "Xác nhận đã nhận" (xác nhận thủ công, hệ thống ghi log) → Hoàn tất |
| | 2b. In hóa đơn: Sau khi thanh toán thành công, thu ngân nhấn "In hóa đơn" → Hệ thống gửi lệnh in |
| | 2c. Thanh toán gộp theo bàn: Tại bước 1.1, Thu ngân chọn bàn thay vì chọn đơn đơn lẻ → Hệ thống hiển thị tất cả đơn chưa thanh toán trên bàn đó cùng tổng tiền gộp → Thu ngân xử lý thanh toán cho toàn bộ đơn trên bàn trong một lần → Hệ thống cập nhật `payment_status = Paid` cho tất cả đơn và giải phóng bàn về "Trống" |
| **Exceptions** | E1: Tiền khách đưa không đủ — Bước 1.4, hiển thị "Số tiền không đủ, thiếu X đồng!" |
| | E2: Lỗi cổng thanh toán — Bước 2a, hiển thị "Lỗi kết nối cổng thanh toán, vui lòng thử phương thức khác!" |
| | E3: Callback/giao dịch thanh toán bị lặp — Hệ thống phải nhận diện đơn đã `Paid`, không tạo thêm hóa đơn hoặc phiếu bếp, và hiển thị cảnh báo cho Thu ngân nếu cần kiểm tra khoản thu trùng |
| **Priority** | Critical |

---
#### UC-03: Đặt món hẹn giờ lấy *(Tương ứng UC-21 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-03: Đặt món hẹn giờ lấy (Pickup) |
| **Primary Actor** | Khách hàng (Thành viên / Vãng lai) |
| **Description** | Khách hàng đặt món trên Client WebApp, chọn khung giờ đến lấy để hệ thống tự động kiểm tra giờ hoạt động, trạng thái tạm ngưng Pickup và năng lực phục vụ theo slot trước khi tự động chấp nhận nếu hợp lệ |
| **Trigger** | Khách hàng chọn hình thức "Hẹn giờ lấy món" khi tạo đơn trực tuyến |
| **Pre-conditions** | Quán đang mở cửa. Pickup không bị tạm ngưng. Có ít nhất 1 món ăn khả dụng |
| **Post-conditions** | Nếu khung giờ hợp lệ và thanh toán hoàn tất, đơn Pickup được tạo thành công, tự động chấp nhận và gửi sang luồng vận hành. Khách được hiển thị rõ khung giờ nhận, lưu ý rằng đến sớm vẫn có thể phải chờ đến khi đơn `Ready`, và ngưỡng giữ món sau giờ hẹn do quán cấu hình |
| **Normal Flow** | 1.1. Khách hàng chọn đồ ăn (như UC Đặt Món) |
| | 1.2. Khách hàng chọn hình thức Pickup |
| | 1.3. Hệ thống yêu cầu cung cấp ngày và khung giờ sẽ đến lấy |
| | 1.4. Hệ thống kiểm tra giờ mở cửa, trạng thái tạm ngưng Pickup và năng lực slot tại khung giờ đã chọn |
| | 1.5. Nếu khung giờ hợp lệ, khách xác nhận ngày/giờ |
| | 1.6. Hệ thống chuyển sang luồng thanh toán online bắt buộc |
| | 1.7. Sau khi thanh toán thành công, hệ thống tự động chấp nhận đơn Pickup, hiển thị thời điểm quán sẽ bắt đầu chuẩn bị món và nhắc khách về ngưỡng giữ món nếu đến trễ |
| **Alternative Flows** | 2a. Khung giờ gần đầy: Hệ thống gợi ý các khung giờ lân cận còn khả dụng để khách chọn lại |
| | 2b. Guest Checkout: Khách không đăng nhập vẫn có thể tiếp tục bằng Tên + SĐT |
| **Exceptions** | E1: Khung giờ không hợp lệ, quá tải hoặc Pickup đang tạm ngưng — Hệ thống hiển thị thông báo và không cho tiếp tục thanh toán |
| | E2: Không hoàn tất thanh toán trong 15 phút — Hệ thống tự động hủy đơn Pickup |
| **Priority** | High |

