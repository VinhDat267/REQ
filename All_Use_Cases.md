# 📋 Toàn Bộ Use Cases — Hệ Thống Wonton POS

---

## 🧭 Cách dùng bộ use case này

Tài liệu này được tổ chức theo **2 lớp granularity** để final BRD/SRS và full-system use case diagram không bị quá tải:

- **Lớp 1 - Canonical Use Cases (`CUC-xx`)**  
  Dùng cho **full-system use case diagram**, phần **functional overview** trong BRD, và phần **primary use case specifications** trong final SRS.
- **Lớp 2 - Detailed Use Case Inventory (`UC-01..UC-74`)**  
  Giữ đầy đủ inventory chi tiết để **traceability**, **appendix**, **business-rule mapping**, và triển khai subflow / alternate flow / exception flow.

> **Quy tắc trình bày đề xuất cho final package:**  
> - Diagram tổng thể: ưu tiên vẽ `CUC-xx`, không nhồi cả `74 UC` lên cùng một sơ đồ.  
> - BRD: mô tả theo `CUC-xx`, dùng `UC-xx` làm mapping tham chiếu.  
> - SRS: viết full spec cho `CUC-xx`; các `UC-xx` nhỏ hơn được xử lý như subflow, supporting flow, exception flow hoặc appendix item.

---

## 🎯 Canonical Use Case Layer (Dùng cho Diagram / BRD / SRS)

### 📱 Client WebApp

| CUC# | Canonical Use Case | Actor chính | Bao phủ từ detailed UC |
|------|--------------------|-------------|-------------------------|
| CUC-01 | Quản lý tài khoản khách hàng | Registered Customer | UC-01..UC-06 `[primary]` |
| CUC-02 | Khám phá menu và tìm món | Registered Customer / Guest | UC-07..UC-08 `[primary]` |
| CUC-03 | Tạo và cấu hình đơn hàng khách | Registered Customer / Guest | UC-09..UC-11 `[primary]`, UC-12 `[subflow]` |
| CUC-04 | Thanh toán trước cho đơn Takeaway / Pickup | Registered Customer / Guest | UC-13 `[primary]` |
| CUC-05 | Thanh toán đơn Dine-in tại quầy | Registered Customer / Guest | UC-14 `[primary]` |
| CUC-06 | Theo dõi và quản lý đơn đang hoạt động | Registered Customer / Guest | UC-15 `[primary]`, UC-19 `[exception]`, UC-24 `[support]` |
| CUC-07 | Xem lịch sử đơn và đặt lại món | Registered Customer | UC-16..UC-18 `[primary]`, UC-22 `[primary]` |
| CUC-08 | Đặt và quản lý đơn Pickup | Registered Customer / Guest | UC-21..UC-23 `[primary]` |
| CUC-09 | Gửi đánh giá sau đơn hàng | Registered Customer | UC-20 `[primary]` |

### 🖥️ Admin WebApp - Quản lý

| CUC# | Canonical Use Case | Actor chính | Bao phủ từ detailed UC |
|------|--------------------|-------------|-------------------------|
| CUC-10 | Theo dõi dashboard vận hành | Manager | UC-25 `[primary]` |
| CUC-11 | Quản lý menu, danh mục, topping và availability | Manager | UC-26..UC-31 `[primary]` |
| CUC-12 | Quản lý bàn của quán | Manager | UC-32..UC-35 `[primary]` |
| CUC-13 | Quản lý lịch Pickup và Pickup exception | Manager | UC-36 `[primary]` |
| CUC-14 | Quản lý nhân viên và phân quyền | Manager | UC-37..UC-40 `[primary]` |
| CUC-15 | Truy cập không gian Admin và bảo mật cá nhân | All Admin Users | UC-71..UC-73 `[primary]`, UC-74 `[support]` |
| CUC-16 | Xem báo cáo doanh thu, chốt ca và đối soát | Manager | UC-41..UC-45 `[primary]` |
| CUC-17 | Quản lý khuyến mãi | Manager | UC-46..UC-48 `[primary]` |

### 🧾 Admin WebApp - FOH Cashier

| CUC# | Canonical Use Case | Actor chính | Bao phủ từ detailed UC |
|------|--------------------|-------------|-------------------------|
| CUC-18 | Tạo, tiếp nhận, điều phối và rà soát đơn FOH | FOH Cashier | UC-49 `[primary]`, UC-51 `[primary]`, UC-52 `[primary]`, UC-58 `[subflow]` |
| CUC-19 | Xử lý hủy đơn và order exception | FOH Cashier / Manager | UC-53 `[primary]` |
| CUC-20 | Xử lý thanh toán, hoàn tiền và chứng từ | FOH Cashier | UC-54..UC-57 `[primary]` |
| CUC-21 | Quản lý gán bàn, chuyển bàn, giải phóng bàn | FOH Cashier | UC-59..UC-61 `[primary]` |

### 👨‍🍳 Admin WebApp - BOH

| CUC# | Canonical Use Case | Actor chính | Bao phủ từ detailed UC |
|------|--------------------|-------------|-------------------------|
| CUC-22 | Tiếp nhận và xác nhận đơn trong bếp | BOH Staff | UC-62..UC-64 `[primary]` |
| CUC-23 | Thực hiện và cập nhật tiến độ chế biến | BOH Staff | UC-65..UC-66 `[primary]` |
| CUC-24 | Quản lý availability phía bếp | BOH Staff | UC-67 `[primary]` |

### 🍽️ Admin WebApp - FOH Service

| CUC# | Canonical Use Case | Actor chính | Bao phủ từ detailed UC |
|------|--------------------|-------------|-------------------------|
| CUC-25 | Xử lý handoff và khép vòng đời phục vụ tại bàn | FOH Service | UC-68..UC-70 `[primary]` |

### 🧩 Quy tắc ownership giữa detailed UC và canonical CUC

- Mỗi `UC-xx` active chỉ có **một canonical owner chính** trong bảng phía trên.
- `UC-50` là placeholder excluded cho `Delivery`, nên không cần canonical owner active.
- Tag quan hệ dùng trong cột bao phủ:
  - `[primary]`: detailed UC là nội dung chính của canonical use case
  - `[subflow]`: detailed UC là bước con bắt buộc bên trong canonical use case
  - `[exception]`: detailed UC là luồng ngoại lệ / điều kiện mở rộng do canonical owner quản lý
  - `[support]`: detailed UC là hành vi hỗ trợ xuyên suốt nhưng vẫn thuộc ownership của canonical owner đó
- Nếu một `UC-xx` được nhắc lại ở phần khác, đó chỉ là **secondary reference** để giải thích, không phải đổi owner.

### 🔔 Ví dụ các detailed UC có relation type đặc biệt trong canonical layer

| Detailed UC | Cách xử lý ở final package |
|-------------|----------------------------|
| UC-12 - Áp mã giảm giá | Owner chính là `CUC-03` dưới dạng subflow; rule về validity / usage / stacking vẫn tham chiếu sang `CUC-17` |
| UC-24 - Nhận thông báo đơn hàng | Supporting flow cho `CUC-06`, không nhất thiết phải là node chính trên full-system diagram |
| UC-57 - In hóa đơn | Nằm trong `CUC-20` như payment/document subflow, không cần tách thành canonical goal riêng |
| UC-58 - In phiếu bếp | Nằm trong `CUC-18` như dispatch subflow, đồng thời là fallback khi outage |
| UC-74 - Nhận thông báo vận hành | Owner chính là `CUC-15` dưới dạng support; chỉ dùng cho notification, không dùng như audit / override / exception catch-all |

### 🔗 Canonical Relationship Layer (Dùng khi vẽ full-system diagram)

> **Convention dùng thống nhất ở lớp canonical:**
> - `include`: hành vi con bắt buộc được tái sử dụng bởi base CUC
> - `extend`: hành vi điều kiện / biến thể gắn vào base CUC
> - `dependency`: quan hệ tiền đề ngữ nghĩa để người đọc hiểu luồng, không phải reuse UML bắt buộc

| Từ CUC | Quan hệ | Đến CUC | Ý nghĩa mô hình |
|--------|---------|---------|-----------------|
| CUC-03 | `include` | CUC-02 | Tạo đơn luôn dựa trên bước khám phá / chọn món |
| CUC-04 | `extend` | CUC-03 | Prepayment là luồng điều kiện của quá trình đặt đơn khi service model yêu cầu trả trước |
| CUC-08 | `extend` | CUC-03 | Pickup là biến thể của flow đặt món với slot/time handling |
| CUC-08 | `include` | CUC-04 | Pickup luôn yêu cầu prepayment |
| CUC-06 | `dependency` | CUC-03 | Theo dõi/quản lý đơn khách cần có order context đã được tạo |
| CUC-06 | `dependency` | CUC-08 | Theo dõi/quản lý pickup đang hoạt động cần có pickup order context |
| CUC-19 | `extend` | CUC-18 | Hủy đơn và order exception là luồng điều kiện của vòng đời đơn FOH |
| CUC-20 | `dependency` | CUC-18 | Thanh toán/refund/chứng từ dùng chung order context của FOH |
| CUC-22 | `dependency` | CUC-18 | Bếp chỉ tiếp nhận sau khi FOH điều phối đơn xuống bếp |
| CUC-23 | `dependency` | CUC-22 | Tiến độ chế biến chỉ bắt đầu sau khi đơn được bếp nhận |
| CUC-24 | `extend` | CUC-22 | Hết nguyên liệu / availability issue có thể phát sinh ngay khi bếp tiếp nhận và xác nhận đơn |
| CUC-24 | `extend` | CUC-23 | Hết nguyên liệu / availability issue cũng có thể phát sinh trong lúc chế biến và cập nhật tiến độ |
| CUC-25 | `dependency` | CUC-23 | Handoff và service closure chỉ diễn ra sau khi đơn được nấu xong / ready |

### 📐 Chính sách gom UC nhỏ thành UC vừa phải

- **CRUD atom** như thêm / sửa / xóa thường được gom thành một canonical management use case nếu cùng phục vụ một business goal.
- **Payment artifact** như in hóa đơn, in lại, refund, partial refund nên nằm trong cùng canonical payment use case thay vì tách thành nhiều UC nhỏ.
- **Operational exception** như complaint, wrong handoff, outage recovery, shift close nên ưu tiên viết thành **alternate / exception / named subflow** bên trong canonical use case.
- **Notification** và **audit trail** là hỗ trợ xuyên suốt; chỉ tách riêng khi đề bài thực sự yêu cầu model chúng như use case độc lập.

---

## 📱 CLIENT WEBAPP — Khách Hàng (Thành viên / Vãng lai)

> **📌 Phân loại Actor:**
> - 🟢 **Cả Registered + Guest:** UC-07~12, UC-13~15, UC-19, UC-21, UC-23, UC-24 (Đặt món, Thanh toán, Theo dõi đơn, Thông báo)
> - 🔵 **Chỉ Registered Customer:** UC-01~06, UC-16~18, UC-20, UC-22 (Tài khoản, Lịch sử, Đánh giá)

### 🔐 Module: Tài khoản & Xác thực
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-01 | Đăng ký tài khoản (Tùy chọn) | Khuyến khích tạo tài khoản bằng SĐT/email, cho phép Guest Checkout |
| UC-02 | Đăng nhập | Xác thực bằng SĐT/email + mật khẩu hoặc Google OAuth |
| UC-03 | Đăng xuất | Thoát khỏi tài khoản |
| UC-04 | Quên mật khẩu | Nhập SĐT/email → nhận OTP → tạo mật khẩu mới |
| UC-05 | Cập nhật thông tin cá nhân | Sửa tên, SĐT, email |
| UC-06 | Đổi mật khẩu | Nhập mật khẩu cũ → mật khẩu mới → xác nhận |

### 🍜 Module: Menu & Đặt món
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-07 | Xem menu | Duyệt danh mục, xem chi tiết món (tên, giá, hình, mô tả, trạng thái) |
| UC-08 | Tìm kiếm món ăn | Tìm món theo tên, lọc theo danh mục, khoảng giá |
| UC-09 | Đặt món online | Chọn món, tùy chỉnh topping/ghi chú, chọn số lượng, thêm vào giỏ hàng |
| UC-10 | Quản lý giỏ hàng | Xem giỏ, sửa số lượng, xóa món, xem tổng tiền |
| UC-11 | Chọn hình thức phục vụ | Chọn Ăn tại quán / Mang đi / Hẹn giờ lấy (Pickup) |
| UC-12 | Áp mã giảm giá | Nhập mã khuyến mãi, hệ thống kiểm tra + áp dụng giảm giá |

### 💳 Module: Thanh toán
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-13 | Thanh toán online | Chọn phương thức (MoMo/VNPay/ZaloPay/QR), xử lý thanh toán |
| UC-14 | Thanh toán tại quầy sau khi dùng bữa | Thanh toán tiền mặt hoặc QR tại quầy cho đơn Dine-in chưa thanh toán |

### 📦 Module: Đơn hàng
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-15 | Theo dõi đơn hàng | Xem trạng thái real-time bằng tài khoản hoặc bằng Mã đơn + SĐT đối với Guest (Chờ xác nhận → Đang nấu → Sẵn sàng → Hoàn thành / Đã hủy) |
| UC-16 | Xem lịch sử đơn hàng | Xem danh sách đơn đã đặt, lọc theo trạng thái |
| UC-17 | Xem chi tiết đơn hàng | Xem chi tiết 1 đơn (món, giá, thanh toán, thời gian) |
| UC-18 | Đặt lại đơn cũ | Chọn đơn từ lịch sử → thêm toàn bộ món vào giỏ mới |
| UC-19 | Hủy đơn hàng | Hủy đơn khi chưa được bếp nhận (trạng thái "Chờ xác nhận") |
| UC-20 | Đánh giá đơn hàng | Cho sao (1-5) theo 3 tiêu chí (Chất lượng, Tốc độ, Trải nghiệm), viết nhận xét (tùy chọn, max 500 ký tự) sau khi đơn hoàn thành. Hạn đánh giá: 7 ngày. Có lọc nội dung không phù hợp |

### 🪑 Module: Đặt món hẹn giờ (Pickup)
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-21 | Đặt hàng hẹn lấy (Pickup) | Chọn ngày/giờ đến lấy hàng → hệ thống kiểm tra slot → thanh toán trước → tự động chấp nhận nếu còn khả năng phục vụ |
| UC-22 | Xem lịch sử đơn hẹn lấy | Xem các lần hẹn giờ đến lấy trước đó |
| UC-23 | Hủy đơn hẹn lấy | Hủy đặt món hẹn giờ khi quán chưa xử lý |

### 🔔 Module: Thông báo
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-24 | Nhận thông báo đơn hàng | Nhận real-time notification (popup/toast + âm thanh) khi trạng thái đơn thay đổi. Hỗ trợ push notification trình duyệt, lịch sử thông báo (🔔), đồng bộ khi mất kết nối |

---

## 🖥️ ADMIN WEBAPP

### 👨‍💼 Actor: Quản Lý (Shop Manager)

#### 📊 Module: Dashboard
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-25 | Xem Dashboard tổng quan | Xem doanh thu hôm nay, số đơn, đơn trung bình, biểu đồ nhanh, cảnh báo vận hành và trạng thái ca cần review |

#### 🍜 Module: Quản lý Menu
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-26 | Thêm món ăn mới | Nhập tên, giá, mô tả, hình ảnh, danh mục, topping khả dụng |
| UC-27 | Sửa thông tin món ăn | Cập nhật tên, giá, mô tả, hình ảnh |
| UC-28 | Xóa món ăn | Xóa món khỏi menu (có xác nhận) |
| UC-29 | Đánh dấu còn/hết hàng | Toggle trạng thái món (Available / Out of Stock) |
| UC-30 | Quản lý danh mục | Thêm/sửa/xóa danh mục món ăn |
| UC-31 | Quản lý topping | Thêm/sửa/xóa topping, cập nhật giá |

#### 🪑 Module: Quản lý Bàn
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-32 | Thêm bàn mới | Nhập số bàn, sức chứa, vị trí |
| UC-33 | Sửa thông tin bàn | Cập nhật sức chứa, vị trí |
| UC-34 | Xóa bàn | Xóa bàn khỏi hệ thống |
| UC-35 | Xem sơ đồ bàn | Xem toàn bộ bàn với trạng thái (Trống/Đang dùng) |
| UC-36 | Xem lịch hẹn lấy & xử lý ngoại lệ Pickup | Theo dõi lịch Pickup theo khung giờ, xử lý hủy/điều phối ngoại lệ khi quán không thể đáp ứng |

#### 👥 Module: Quản lý Nhân viên
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-37 | Thêm nhân viên | Tạo tài khoản nhân viên mới (tên, SĐT, email, vai trò) |
| UC-38 | Sửa thông tin nhân viên | Cập nhật thông tin, đổi vai trò |
| UC-39 | Vô hiệu hóa nhân viên | Khóa tài khoản nhân viên (không cho đăng nhập) |
| UC-40 | Phân quyền vai trò | Gán một hoặc nhiều quyền đa nhiệm (Thu ngân / Bếp / Phục vụ) cho 1 tài khoản |

#### 📈 Module: Thống kê & Báo cáo
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-41 | Xem thống kê doanh thu | Biểu đồ doanh thu theo ngày/tuần/tháng, lọc tùy chỉnh; là UC chính để rà soát chốt ca và reconciliation cuối ngày |
| UC-42 | Xem top món bán chạy | Danh sách top 10 món bán chạy nhất theo khoảng thời gian |
| UC-43 | Xem khung giờ cao điểm | Biểu đồ số đơn theo từng khung giờ |
| UC-44 | Lọc theo phương thức thanh toán | Lọc doanh thu theo Tiền mặt / QR / Online; tách thêm refund, write-off, thu trùng khi đối soát |
| UC-45 | Xuất báo cáo | Xuất báo cáo dạng PDF hoặc Excel cho doanh thu, chốt ca, reconciliation và các case bất thường |

#### 🏷️ Module: Khuyến mãi
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-46 | Tạo mã giảm giá | Tạo mã khuyến mãi (%, VNĐ, thời hạn, điều kiện) |
| UC-47 | Sửa/xóa mã giảm giá | Cập nhật hoặc ngưng mã giảm giá |
| UC-48 | Xem lịch sử sử dụng mã | Xem ai đã dùng mã nào, bao nhiêu lần |

---

### 🧾 Actor: Nhân viên Tiền sảnh (FOH Staff) - Tác vụ Thu ngân

#### 📋 Module: Quản lý Đơn hàng
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-49 | Tạo đơn hàng tại quán | Tạo đơn cho khách dine-in/takeaway, chọn món, chọn bàn |
| UC-50 | (Out-of-Scope) | Đã lược bỏ tính năng Giao hàng |
| UC-51 | Xem danh sách đơn hàng | Xem tất cả đơn hàng theo trạng thái, lọc/tìm kiếm, theo dõi case ngoại lệ như complaint, wrong handoff, Pickup quá hẹn, payment recovery |
| UC-52 | Xác nhận đơn hàng online | Xác nhận hoặc từ chối các đơn online cần FOH xử lý; đơn Pickup hợp lệ được hệ thống tự động chấp nhận sau khi kiểm tra slot |
| UC-53 | Hủy đơn hàng | Hủy đơn với lý do (hết nguyên liệu, khách yêu cầu...); là một điểm xử lý cho cancel/refund/write-off khi case ngoại lệ kết thúc bằng hủy đơn |

#### 💰 Module: Thanh toán
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-54 | Xử lý thanh toán tiền mặt | Nhập số tiền khách đưa, hệ thống tính tiền thừa; hỗ trợ ghi nhận hoàn tiền tiền mặt / chênh lệch cuối ca theo quyền |
| UC-55 | Xử lý thanh toán QR | Hiển thị QR code, xác nhận đã nhận tiền; hỗ trợ QR chuyển khoản xác nhận thủ công và đối soát cuối ca |
| UC-56 | Xử lý thanh toán online | Xử lý qua cổng MoMo/VNPay/ZaloPay; theo dõi callback, retry, late success, duplicate callback và trạng thái refund |
| UC-57 | In hóa đơn | In bill cho khách (máy in nhiệt), hỗ trợ in lại/điều chỉnh chứng từ có lưu log |
| UC-58 | In phiếu bếp | In phiếu order cho bếp; là điểm fallback khi KDS / máy in bếp / mạng gặp sự cố |

#### 🪑 Module: Bàn
| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-59 | Gán đơn vào bàn | Gán đơn hàng (online/tại quán) vào bàn cụ thể |
| UC-60 | Chuyển bàn | Chuyển đơn hàng từ bàn này sang bàn khác |
| UC-61 | Giải phóng bàn | Đánh dấu bàn về "Trống" sau khi khách thanh toán xong |

---

### 👨‍🍳 Actor: Nhân viên Hậu sảnh (BOH Staff)

| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-62 | Xem danh sách đơn mới | Xem các đơn cần nấu trên màn hình bếp, bao gồm danh sách cần review sau manual recovery |
| UC-63 | Nhận đơn vào bếp | Nhấn "Nhận đơn" → trạng thái chuyển sang "Đang nấu"; khi recovery sau sự cố phải tránh nhận / nấu trùng |
| UC-64 | Từ chối đơn | Từ chối đơn với lý do → thông báo thu ngân. **Không áp dụng cho đơn Pickup đã thanh toán** — bếp phải escalate lên Quản lý để xử lý ngoại lệ |
| UC-65 | Cập nhật trạng thái món | Đánh dấu khối lượng/từng món hoàn thành hoặc gom nhóm các đơn cập nhật nhanh |
| UC-66 | Đánh dấu đơn sẵn sàng | Đánh dấu toàn bộ đơn "Sẵn sàng phục vụ" → thông báo phục vụ |
| UC-67 | Báo hết nguyên liệu | Đánh dấu món hết nguyên liệu → tự động chuyển "Hết hàng" trên menu |

---

### 🍽️ Actor: Nhân viên Tiền sảnh (FOH Staff) - Tác vụ Phục vụ

| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-68 | Xem đơn sẵn sàng | Xem danh sách đơn đã nấu xong, cần phục vụ / handoff; đồng thời rà soát đơn `Ready` chờ giao hoặc chờ khách nhận |
| UC-69 | Xác nhận đã giao món | Đánh dấu đã mang món đến đúng bàn / đúng khách; nếu giao nhầm, thiếu món hoặc có khiếu nại thì ghi nhận để chuyển remake/refund flow |
| UC-70 | Cập nhật trạng thái bàn | Đánh dấu bàn cần dọn hoặc còn case phục vụ mở; không đóng bàn nếu sự cố handoff / complaint chưa xử lý xong |

---

### 🔐 Actor: Chung (Tất cả Admin Users)

| UC# | Use Case | Mô tả |
|-----|----------|-------|
| UC-71 | Đăng nhập Admin | Xác thực bằng tài khoản nhân viên |
| UC-72 | Đăng xuất Admin | Thoát khỏi hệ thống Admin |
| UC-73 | Đổi mật khẩu | Thay đổi mật khẩu cá nhân |
| UC-74 | Nhận thông báo | Nhận notification vận hành cho đơn mới, đơn hủy, món hết nguyên liệu, đơn sẵn sàng phục vụ, case ngoại lệ cần xử lý...; không thay thế audit log |

---

## 📊 Tổng Kết

### Tóm tắt 2 lớp use case

| Lớp | Số lượng | Mục đích sử dụng |
|-----|----------|------------------|
| Canonical presentation layer | 25 CUC | Full-system use case diagram, BRD functional overview, primary SRS specifications |
| Detailed numbered inventory | 74 UC | Appendix, traceability, business-rule mapping, subflow / exception coverage |
| Active in-scope detailed UC | 73 UC | Final baseline behavior |
| Excluded placeholder | 1 UC (`UC-50`) | `Delivery` out-of-scope |

### Tóm tắt detailed inventory theo actor

| Phía | Số UC |
|------|-------|
| 📱 Client (Thành viên / Vãng lai) | 24 UC |
| 👨‍💼 Admin — Quản Lý | 24 UC |
| 🧾 Admin — Tiền sảnh (FOH) | 16 UC |
| 👨‍🍳 Admin — Hậu sảnh (BOH) | 6 UC |
| 🔐 Admin — Chung | 4 UC |
| **TỔNG inventory** | **74 UC** |

> **Lưu ý inventory final-project (cập nhật 2026-04-17):** Đây là inventory **đầy đủ toàn hệ thống** và là nguồn tham chiếu traceability chính cho final project. Scope hiện tại không còn bị giới hạn ở 16 UC midterm; bộ 16 UC chỉ giữ vai trò lịch sử / traceability cho bài midterm. Bộ này có **74 dòng UC được đánh số**, nhưng baseline thực thi hiện tại là **73 UC active + 1 placeholder excluded (`UC-50`)** cho `Delivery` out-of-scope trừ khi có quyết định phạm vi mới.

---

## 🔒 Final Business Rule Coverage Addendum (Khóa scope 2026-04-17)

> **Nguyên tắc:** Không tạo thêm UC mới sau khi business scope đã khóa. Các business rules bổ sung được map vào UC hiện có như chính sách vận hành, alternate flows, exception flows, audit rules hoặc reporting rules. Nếu sau này muốn biến một dòng dưới đây thành UC độc lập, phải có yêu cầu scope-change mới và ADR mới.
>
> **Lưu ý cho final BRD/SRS:** Addendum này chỉ khóa mapping business rules. Các UC chính ở bảng bên trên vẫn phải mang named subflow / alternate flow / exception flow tương ứng, đặc biệt với refund, shift close, reconciliation, complaint/remake, outage recovery, manager override.
>
> **Quy tắc anti-catch-all cho `UC-74`:** Trong addendum dưới đây, chỉ liệt kê `UC-74` nếu notification bản thân nó là hành vi cần đặc tả. Với refund, outage, pickup exception, receipt adjustment, manager override... thì notification chỉ là secondary effect, không phải UC owner.

| Business rule / Operational policy | UC hiện có bao phủ | Cách thể hiện trong final specs |
|------------------------------------|--------------------|----------------------------------|
| Guest checkout, Guest tracking bằng `Order Code + Phone Number`, bảo mật mã tra cứu | UC-01, UC-09, UC-15, UC-24 | Điều kiện actor Guest/Registered, alternate flow tra cứu không cần đăng nhập, security constraint cho mã tra cứu |
| Bank Transfer QR xác nhận thủ công vs Payment Gateway QR callback tự động | UC-13, UC-14, UC-55, UC-56 | Alternate payment flow; payment status chỉ chuyển `Paid` khi gateway callback hoặc Thu ngân xác nhận thủ công |
| Payment failure, retry, late success callback, duplicate callback/idempotency | UC-13, UC-15, UC-51, UC-52, UC-56 | Exception flows trong thanh toán online và order monitoring; không tạo order/ticket bếp trùng |
| Refund, partial refund, failed refund, void/cancel approval | UC-19, UC-23, UC-36, UC-53, UC-54, UC-55, UC-56 | Manager approval rule, refund alternate flow, payment status `Refund Pending/Refunded`, audit log |
| Customer abandonment, dine-and-dash, write-off | UC-14, UC-49, UC-51, UC-53, UC-54 | Exception flow cho đơn chưa thanh toán / khách rời quán; write-off yêu cầu Manager xác nhận |
| Chỉnh sửa đơn sau khi submit, sau/trước khi bếp nhận | UC-09, UC-10, UC-49, UC-51, UC-52, UC-53, UC-63 | Alternate flow trong order management; sau khi bếp nhận chỉ xử lý bằng Manager exception |
| Wrong handoff, mistaken `Completed`, giao nhầm bàn/túi | UC-15, UC-51, UC-57, UC-68, UC-69, UC-70 | Exception flow cho handoff/serving; cho phép sửa trạng thái trong cùng ca với audit reason |
| Pickup late/no-show, Takeaway overdue, khách đến sớm | UC-15, UC-21, UC-23, UC-36, UC-51, UC-53, UC-54, UC-55, UC-56, UC-57 | Pickup/Takeaway exception handling; outcomes phải visible gồm hold, remake nếu quán chấp nhận, partial/full refund, hoặc `Forfeited`; hệ thống không auto-complete/auto-refund |
| Cashier shift opening/closing, cash drawer, chênh lệch tiền mặt | UC-25, UC-41, UC-44, UC-45, UC-54, UC-55, UC-56 | Named subflow `Shift Open / Shift Close / Cash Drawer Review` trong payment/reporting specs; bucket `Comp` / `Forfeited` / `Write-off` phải được tách riêng, không được ẩn hoàn toàn trong addendum |
| End-of-day reconciliation theo cash / bank QR / gateway / refund / duplicate / write-off | UC-25, UC-41, UC-44, UC-45, UC-54, UC-55, UC-56 | Named subflow `End-of-day Reconciliation` trong reporting/payment specs; tách rõ cash / bank QR / gateway / refund / write-off |
| Promotion validity, usage limit, stacking, restore usage after cancel, audit history | UC-12, UC-46, UC-47, UC-48 | Business rules cho mã giảm giá; audit trong quản lý khuyến mãi và báo cáo sử dụng mã |
| Complaint, remake, goodwill discount, `Comp`, post-service refund, internal loss | UC-51, UC-53, UC-54, UC-55, UC-56, UC-68, UC-69, UC-70 (+ UC-20 liên kết phụ) | Exception/complaint flow; outcomes phải visible gồm remake, goodwill discount, partial/full refund, `Comp` toàn đơn, hoặc `Write-off`; remake không tạo doanh thu mới; `UC-20` chỉ là feedback tail nếu khách muốn đánh giá |
| KDS/printer/network/payment outage fallback và manual recovery | UC-51, UC-52, UC-56, UC-58, UC-62, UC-63, UC-65, UC-66 | Cross-cutting exception policy; manual ticket/recovery checklist, không nấu trùng/bỏ sót |
| Manager override và audit log cho thao tác nhạy cảm | UC-37, UC-40, UC-51, UC-53, UC-54, UC-55, UC-56 | Cross-cutting RBAC + audit control gắn vào từng UC nhạy cảm; `UC-74` chỉ dùng để báo case exception nếu cần |
| Receipt reprint, receipt adjustment, VAT/tax info ở mức prototype | UC-14, UC-54, UC-55, UC-56, UC-57 | Alternate flow của in hóa đơn; in lại/điều chỉnh hóa đơn phải có log |
| Inventory-lite: low stock, 86'd, manual adjustment, waste/spoilage | UC-29, UC-31, UC-51, UC-52, UC-53, UC-62, UC-64, UC-67 | Menu/KDS exception flow; không mở rộng sang procurement/supplier/full inventory |

> **Bổ sung khóa traceability cho reporting/reconciliation:** Trong hai dòng shift close và end-of-day reconciliation ở bảng trên, `Comp` và `Forfeited` phải được coi là bucket đối soát độc lập ngang hàng với `Refunded` và `Write-off`, dù nguồn phát sinh của chúng nằm ở complaint/remake hoặc pickup/takeaway overdue flows.

### Final-spec emphasis (phải visible ngay ở UC chính)

- `UC-41 / UC-44 / UC-45`: phải có named subflow `Shift Open`, `Shift Close`, `Cash Drawer Review`, `End-of-day Reconciliation`, và reporting bucket `Comp / Forfeited / Write-off`.
- `UC-21 / UC-23 / UC-36 / UC-51 / UC-53 / UC-57`: phải có named subflow `Late Pickup / Takeaway Overdue / Hold / Remake / Refund / Forfeited Decision`.
- `UC-51 / UC-53 / UC-68 / UC-69 / UC-70`: phải có named subflow `Complaint Intake`, `Wrong Handoff Correction`, `Remake / Goodwill / Refund / Comp / Write-off Decision`.
- `UC-54 / UC-55 / UC-56 / UC-57`: phải có named subflow `Refund / Partial Refund / Late Callback / Receipt Reprint / Receipt Adjustment`.
- `UC-51 / UC-52 / UC-56 / UC-58 / UC-62 / UC-63 / UC-65 / UC-66`: phải có named subflow `Manual Recovery After Outage`.
- `Audit trail` là cross-cutting control / NFR gắn vào các UC nhạy cảm; `UC-74` chỉ bao phủ notification.

### Extension candidates vẫn chưa thuộc baseline UC

- Split bill / merge bill / merge table / party transfer nâng cao.
- Offline order capture và đồng bộ sau khi mất mạng.
- Loyalty points / membership tiers / wallet balance.
- Full accounting ledger, payroll, supplier payable.
- Native mobile app.
- Delivery và tích hợp GrabFood / ShopeeFood.

---

## 🔗 Mối Quan Hệ Include / Extend (Chính)

### <<include>>
- UC-09 (Đặt món) **includes** UC-07 (Xem menu)
- UC-21 (Đặt hàng hẹn lấy) **includes** UC-07 (Xem menu)
- UC-49 (Tạo đơn tại quán) **includes** UC-07 (Xem menu)
- UC-41 (Xem thống kê) **includes** UC-71 (Đăng nhập Admin)

### <<extend>>
- UC-09 (Đặt món) **extends** UC-02 (Đăng nhập) <<*(Khách vãng lai có thể bỏ qua)*>>
- UC-09 (Đặt món) **extends** UC-12 (Áp mã giảm giá)
- UC-09 (Đặt món) **extends** UC-13 (Thanh toán online) <<*(bắt buộc với Takeaway/Pickup, tùy chọn với Dine-in)*>>
- UC-09 (Đặt món) **extends** UC-21 (Đặt hàng hẹn lấy)
- UC-49 (Tạo đơn tại quán) **extends** UC-59 (Gán đơn vào bàn)
- UC-49 (Tạo đơn tại quán) **extends** UC-58 (In phiếu bếp)
- UC-54 (Xử lý thanh toán) **extends** UC-57 (In hóa đơn)
- UC-63 (Nhận đơn bếp) **extends** UC-64 (Từ chối đơn)
- UC-66 (Đơn sẵn sàng) **extends** UC-65 (Cập nhật từng món)
- UC-20 (Đánh giá đơn hàng) **extends** UC-17 (Xem chi tiết đơn) <<*(Khách có thể đánh giá từ chi tiết đơn)*>>
- UC-24 (Nhận thông báo) **extends** UC-15 (Theo dõi đơn hàng) <<*(Thông báo dẫn đến xem chi tiết đơn)*>>
