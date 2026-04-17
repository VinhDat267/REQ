# BUSINESS REQUIREMENTS DOCUMENT
## Hệ Thống Quản Lý Đơn Hàng, Thanh Toán & Thống Kê Doanh Thu — Quán Mì Vằn Thắn
### Wonton POS

---

## Ghi chú phạm vi Final Project (2026-04-16)

Tài liệu `BRD_Ver0.md` được tạo cho giai đoạn midterm trước đó. Với final project, dùng `Final_Project_Scope.md` và `All_Use_Cases.md` làm baseline hiện hành cho đến khi BRD / SRS final được tạo thay thế.

---

## Version and Approvals

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.0 | 09/03/2026 | Team [Tên nhóm] | Initial draft – Project Description |
| 0.1 | 11/03/2026 | Team [Tên nhóm] | Refine Actors (5 vai trò), thêm Guest Checkout / Pickup, bổ sung FR-12~13 (Đánh giá, Thông báo), NFR-06~07, cập nhật Scope |

### TEAM

| Member's Name | MSSV | Project Role | Signature Approval | Date |
|--------------|------|-------------|-------------------|------|
| Nguyễn Thị Hải My | 2301040126 | Business Analyst | | |
| Nguyễn Đạt Vinh | 2301040198 | Project Lead / System Analyst | | |
| Vương Gia Ly | 2301040113 | Business Analyst | | |
| Nguyễn Minh Đức | 2301040048 | System Analyst | | |
| Đặng Khánh Huyền | 2301040088 | Business Analyst | | |
| Lê Thành Đạt | 2301040036 | System Analyst | | |
| Nguyễn Đình Chiến | 2301040025 | QA / Documentation | | |
| Nguyễn Thiện Hiếu | 2301040071 | System Analyst | | |

---

## Table of Contents

1. Version and Approvals
2. Project Details
3. Overview
4. Document Resources
5. Glossary of Terms
6. Project Overview
   - 4.1 Project Overview and Background
   - 4.2 Project Dependencies
   - 4.3 Stakeholders
7. Key Assumptions and Constraints
8. Scope Definition (In-Scope và Out-of-Scope)
9. Functional Requirements
10. Non-functional Requirements
11. Canonical Order State Model
12. Use Cases
13. Appendixes

---

## Project Details

| Field | Value |
|-------|-------|
| **Project Name** | Wonton POS – Hệ thống Quản lý Đơn hàng, Thanh toán & Thống kê Doanh thu cho Quán Mì Vằn Thắn |
| **Project Type** | New Initiative |
| **Project Start Date** | 03/03/2026 |
| **Project End Date** | 15/06/2026 |
| **Project Sponsor** | Nguyen Quang Anh – CEO, Nhà Hàng Vịt Quay Da Giòn HongKong A Hai |
| **Primary Driver** | Efficiency – Tối ưu hóa quy trình vận hành quán ăn |
| **Secondary Driver** | Revenue Growth – Tăng doanh thu qua kênh đặt hàng online riêng |
| **Division** | Khoa Công nghệ Thông tin |
| **Project Manager** | Nguyễn Đạt Vinh (2301040198) |

---

## Overview

Tài liệu này định nghĩa các yêu cầu cấp cao cho dự án **Wonton POS** – Hệ thống Quản lý Đơn hàng, Thanh toán và Thống kê Doanh thu cho quán mì vằn thắn. Tài liệu sẽ được sử dụng làm cơ sở cho các hoạt động:

- Tạo thiết kế giải pháp (Solution Design)
- Phát triển kế hoạch kiểm thử, test scripts và test cases
- Xác định hoàn thành dự án
- Đánh giá thành công dự án

---

## Document Resources

| Name | Business Unit | Role | Proposed Elicitation Techniques |
|------|--------------|------|-------------------------------|
| Nguyen Quang Anh | Nhà Hàng Vịt Quay Da Giòn HongKong A Hai | Stakeholder - CEO | Interview, Questionnaire, Meeting, Observation |

---

## Glossary of Terms

| Term / Acronym | Definition |
|----------------|-----------|
| BRD | Business Requirements Document – Tài liệu yêu cầu nghiệp vụ |
| POS | Point of Sale – Hệ thống hỗ trợ xử lý đơn hàng, thanh toán và các giao dịch/vận hành tại điểm bán |
| UC | Use Case – Trường hợp sử dụng |
| FR | Functional Requirement – Yêu cầu chức năng |
| NFR | Non-Functional Requirement – Yêu cầu phi chức năng |
| Wonton POS | Tên hệ thống, viết tắt từ "Wonton" (vằn thắn) + POS |
| Admin WebApp | Ứng dụng web dành cho nhân viên quán (Quản lý, Thu ngân, Phục vụ, Bếp) |
| Client WebApp | Ứng dụng web dành cho khách hàng đặt món online |
| Order | Đơn hàng – bao gồm danh sách các món ăn, topping, ghi chú |
| Menu Item | Món ăn trong thực đơn (VD: Mì vằn thắn khô, Mì vằn thắn nước…) |
| Topping | Thành phần thêm cho món ăn (VD: Thêm hoành thánh, thêm xá xíu…) |
| Dine-in | Khách ăn tại quán |
| Takeaway | Khách mua mang đi |
| Pickup | Đặt hàng hẹn giờ đến lấy – khách đặt trước, chọn giờ đến nhận, được hệ thống kiểm tra khung giờ và tự động chấp nhận nếu còn khả năng phục vụ, thanh toán online |
| Guest Checkout | Cho phép khách hàng đặt đơn chỉ với Tên + SĐT mà không cần tạo tài khoản; khách vãng lai có thể tra cứu đơn bằng Mã đơn + SĐT |
| FOH Staff | Front-of-House Staff – Nhân viên tiền sảnh, bao gồm Thu ngân và Phục vụ |
| BOH Staff | Back-of-House Staff – Nhân viên hậu sảnh (Bếp) |
| KDS | Kitchen Display System – Màn hình hiển thị đơn hàng tại bếp |
| Table QR Code | Mã QR cố định dán trên mỗi bàn, encode URL `{domain}/order?table={table_id}` để khách Dine-in quét và đặt món online gắn đúng bàn |
| QR Payment | Thanh toán bằng mã QR qua ứng dụng ngân hàng |
| Dashboard | Bảng điều khiển tổng quan, hiển thị dữ liệu doanh thu và hoạt động |
| Real-time | Thời gian thực – dữ liệu được cập nhật ngay lập tức |
| Responsive | Giao diện tự động điều chỉnh phù hợp kích thước màn hình (desktop, tablet, mobile) |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security – Giao thức mã hóa bảo mật |
| CRUD | Create, Read, Update, Delete – Các thao tác cơ bản trên dữ liệu |
| API | Application Programming Interface – Giao diện lập trình ứng dụng |
| Order Tracking Code | Mã đơn dùng để khách vãng lai tra cứu trạng thái đơn hàng cùng với số điện thoại |
| Multi-role | Hỗ trợ gán nhiều vai trò cho 1 tài khoản nhân viên (VD: vừa FOH vừa BOH) |
| CCU | Concurrent Users – Số người dùng truy cập đồng thời |

---

## Project Overview

### 4.1 Project Overview and Background

#### Tình trạng hiện tại (Current Situation)

Quán mì vằn thắn hiện đang hoạt động với quy mô vừa (1-2 địa điểm), phục vụ trung bình 150–300 đơn hàng/ngày với đội ngũ 4–8 nhân viên. Hiện tại, quán đã có mặt trên các nền tảng giao đồ ăn (GrabFood, ShopeeFood) nhưng **chưa có hệ thống quản lý nội bộ riêng**.

Toàn bộ quy trình vận hành đang được thực hiện **thủ công**:
- Đơn hàng tại quán được ghi bằng giấy hoặc nhớ miệng
- Thông tin từ quầy thu ngân đến bếp truyền đạt bằng lời nói
- Doanh thu được tổng hợp thủ công cuối ngày
- Không có dữ liệu phân tích về xu hướng bán hàng

#### Vấn đề (Problem)

1. **Sai sót đơn hàng:** Ghi nhận thủ công dẫn đến nhầm lẫn món, sai số lượng, mất đơn
2. **Quy trình rời rạc:** Không có kết nối giữa thu ngân – bếp – phục vụ, khách phải chờ lâu
3. **Thiếu dữ liệu kinh doanh:** Không biết món nào bán chạy, giờ nào đông khách, doanh thu thực tế bao nhiêu
4. **Phụ thuộc nền tảng bên ngoài:** GrabFood/ShopeeFood thu hoa hồng 20-30%, quán không có kênh đặt hàng riêng
5. **Không theo dõi doanh thu chính xác:** Tổng hợp cuối ngày bằng tay, dễ sai lệch

#### Mục tiêu (Objectives)

Xây dựng **Hệ thống Wonton POS** gồm 2 phần:
- **Client WebApp:** Cho phép khách hàng (thành viên hoặc vãng lai) đặt món online, xem menu, thanh toán, đặt hàng hẹn lấy (Pickup), đánh giá đơn hàng, nhận thông báo real-time — giảm phụ thuộc vào app bên ngoài
- **Admin WebApp:** Cho phép quán quản lý đơn hàng số hóa, xử lý thanh toán đa kênh, quản lý menu & bàn, thống kê doanh thu tự động, quản lý nhân viên đa quyền — nâng cao hiệu quả vận hành

### 4.2 Project Dependencies

| # | Dependency | Description |
|---|-----------|-------------|
| 1 | Cổng thanh toán online | Hệ thống phụ thuộc vào API của MoMo, VNPay hoặc ZaloPay để xử lý thanh toán điện tử |
| 2 | Dịch vụ hosting/cloud | Cần máy chủ để triển khai hệ thống web (VD: AWS, Heroku, Vercel) |
| 3 | Kết nối Internet | Quán cần có kết nối Internet ổn định để hệ thống hoạt động |
| 4 | Thiết bị phần cứng | Quán cần ít nhất 1 máy tính/tablet cho thu ngân và 1 màn hình cho bếp |
| 5 | Máy in hóa đơn | Cần máy in nhiệt (thermal printer) để in bill và phiếu bếp (nếu áp dụng) |

### 4.3 Stakeholders

| # | Stakeholders |
|---|-------------|
| 1 | **Nguyen Quang Anh** – Stakeholder / CEO của **Nhà Hàng Vịt Quay Da Giòn HongKong A Hai**. Đây là stakeholder chính cung cấp định hướng nghiệp vụ, bối cảnh vận hành và phản hồi cho hệ thống. |

---

## (Optional) Key Assumptions and Constraints

### 5.1 Key Assumptions

| # | Assumptions |
|---|------------|
| A1 | Hệ thống được phát triển dưới dạng ứng dụng web (web-based), truy cập qua trình duyệt, không yêu cầu cài đặt ứng dụng riêng trên thiết bị |
| A2 | Khách hàng đặt món online thông qua Client WebApp trên trình duyệt điện thoại/máy tính, không phải native mobile app |
| A3 | Quán hiện chưa sử dụng bất kỳ hệ thống POS (Point of Sale) hoặc phần mềm quản lý nào trước đó |
| A4 | Hệ thống tập trung xử lý đơn hàng Ăn tại quán (Dine-in), Mang đi (Takeaway), và Hẹn giờ đến lấy (Pickup). Chức năng Giao hàng (Delivery) nằm ngoài phạm vi phát triển của dự án Wonton POS. |
| A5 | Quán có kết nối Internet ổn định tại tất cả các địa điểm hoạt động. Nếu mất kết nối, KDS và POS không thể cập nhật real-time; quán phải quay lại quy trình thủ công (ghi giấy) cho đến khi internet khôi phục. Hệ thống không cung cấp chế độ offline trong phạm vi dự án |
| A6 | Nhân viên quán có khả năng sử dụng máy tính/tablet ở mức cơ bản |
| A7 | Ngôn ngữ giao diện hệ thống là Tiếng Việt |

### 5.2 Key Constraints

| # | Constraints |
|---|------------|
| C1 | Dự án phải hoàn thành trong khuôn khổ **1 học kỳ** (khoảng 15 tuần) |
| C2 | Đội ngũ phát triển gồm **8 sinh viên**, giới hạn về nhân lực và kinh nghiệm thực tế |
| C3 | Ngân sách phát triển **bằng 0** (dự án học thuật), do đó ưu tiên sử dụng công nghệ mã nguồn mở và dịch vụ miễn phí |
| C4 | Hệ thống chưa yêu cầu triển khai production thực tế, ở mức **prototype / demo** |
| C5 | Tích hợp cổng thanh toán online (MoMo, VNPay, ZaloPay) sẽ sử dụng **sandbox/test environment**, không xử lý giao dịch thật |
| C6 | Hệ thống cần tương thích với các trình duyệt phổ biến (Chrome, Safari, Firefox) trên cả desktop và mobile |

---

## 8. Scope Definition (In-Scope và Out-of-Scope)

### 8.1 In-Scope (Trong phạm vi)

 **Lưu ý cho midterm:** Mặc dù hệ thống Wonton POS ở mức tổng thể có **74 UC**, BRD midterm này chỉ chọn **16 UC cốt lõi để viết use case specification chi tiết**. Để dễ theo dõi trong bài thi, bộ UC midterm được **đánh lại mã cục bộ từ UC-01 đến UC-16**; cột UC Gốc bên dưới dùng để map ngược về hệ 74 UC.

**Final-project note (2026-04-16):** Không dùng bảng 16 UC này làm phạm vi final. Phạm vi final theo `Final_Project_Scope.md` và `All_Use_Cases.md`.

| UC ID (Midterm) | Tên UC midterm | UC Gốc |
|---|---|---|
| UC-01 | Đặt món online | UC-09 |
| UC-02 | Thanh toán online | UC-13 |
| UC-03 | Đặt món hẹn giờ lấy | UC-21 |
| UC-04 | Xem lịch sử đơn hàng | UC-16~17 |
| UC-05 | Quản lý menu | UC-26~31 |
| UC-06 | Quản lý nhân viên | UC-37~40 |
| UC-07 | Xem thống kê doanh thu | UC-41 |
| UC-08 | Quản lý bàn | UC-32~36 |
| UC-09 | Tạo đơn hàng tại quán | UC-49 |
| UC-10 | Xử lý thanh toán | UC-54~56 |
| UC-11 | Theo dõi đơn hàng | UC-15 |
| UC-12 | Gán đơn vào bàn | UC-59~60 |
| UC-13 | Nhận đơn từ bếp | UC-62~63 |
| UC-14 | Cập nhật trạng thái món | UC-65~66 |
| UC-15 | Đánh giá đơn hàng | UC-20 |
| UC-16 | Nhận thông báo đơn hàng | UC-24 |

Các nghiệp vụ trong phạm vi midterm gồm:
- Đặt món online, thanh toán online, theo dõi đơn và nhận thông báo đơn hàng.
- Đặt đơn Pickup theo khung giờ hợp lệ.
- Xem lịch sử đơn hàng và đánh giá đơn hàng sau khi hoàn tất.
- Quản lý menu, nhân viên, bàn và thống kê doanh thu.
- Tạo đơn tại quầy, xử lý thanh toán và gán đơn vào bàn.
- Nhận đơn từ bếp và cập nhật trạng thái món trên KDS.
- Nhóm chức năng tài khoản: Đăng ký tài khoản, đăng nhập, khôi phục mật khẩu, cập nhật hồ sơ và đổi mật khẩu (**bắt buộc thể hiện trong Use Case Diagram tổng**, dù không thuộc nhóm 16 UC viết specification chi tiết).

### 8.2 Out-of-Scope (Ngoài phạm vi)
Ngoài các UC trong danh sách trên, các chức năng sau **không nằm trong phạm vi BRD midterm**:
- Các UC còn lại ngoài tập 16 UC midterm, ngoại trừ nhóm chức năng tài khoản bắt buộc nêu ở mục In-Scope.
- Khuyến mãi / mã giảm giá.
- Delivery và tích hợp GrabFood / ShopeeFood.
- Quản lý tồn kho chi tiết, trừ tồn tự động theo recipe và tối ưu batch/capacity nâng cao ngoài phạm vi 16 UC đã chọn. Riêng thao tác đánh dấu 86'd thủ công và grouped batch update trên KDS vẫn nằm trong phạm vi của tập UC midterm đã chọn.
- Chấm công / tính lương.
- Loyalty Program.
- Native Mobile App.
- Gộp bàn (Merge Tables): ghép nhiều bàn vật lý thành một nhóm phục vụ chung.
- Tách bill (Split Bill): chia một đơn hàng thành nhiều hóa đơn cho từng khách trong cùng bàn. Hệ thống hỗ trợ thanh toán gộp tất cả đơn trên bàn hoặc thanh toán từng đơn riêng lẻ, nhưng không chia nhỏ bên trong một đơn.
- Combo / Set meal: gộp nhiều món thành gói giá ưu đãi.
- Khuyến mãi dạng "tặng món" (Free Item / Buy-One-Get-One): baseline chỉ hỗ trợ giảm giá theo `%` hoặc số tiền cố định. Loại khuyến mãi thêm món miễn phí vào đơn hoặc BOGO phải được promote qua ADR mới nếu muốn vào scope.

---
## 9. Functional Requirements

| REQ# | PRIORITY | DESCRIPTION | RATIONALE | USE CASE |
|---|---|---|---|---|
| FR-01 | Critical | The system shall allow customers to place online orders through the Client WebApp by browsing the menu, adding items to the cart, selecting a supported service model (`Dine-in`, `Takeaway`, or `Pickup`), and proceeding as either a registered customer or a guest according to the payment rule of the selected service model. | This capability supports the primary customer ordering flow while enforcing the defined service-model rules within the selected midterm scope. | UC-01 |
| FR-02 | Critical | The system shall support online payment for prepaid orders and shall allow Takeaway and Pickup orders to proceed only after a valid payment is confirmed. | This capability enforces the required prepayment rule for Takeaway and Pickup orders. | UC-02 |
| FR-03 | High | The system shall allow customers to place Pickup orders for a selected time slot and shall validate slot availability and service capacity before automatically accepting the order. | This capability supports the Pickup service model and prevents overbooking during peak periods. | UC-03 |
| FR-04 | Medium | The system shall allow registered customers to view their order history and view the details of a selected past order. | This capability supports post-purchase visibility for registered customers within the selected midterm scope. | UC-04 |
| FR-05 | Critical | The system shall allow Managers to create, update, archive/deactivate, and change the availability status of menu items. | This capability is required for effective day-to-day menu administration while preserving historical order/reporting data. | UC-05 |
| FR-06 | High | The system shall allow Managers to create, update, deactivate employee accounts, and assign one or more roles to each employee account. | This capability supports staff administration and the project's multi-role operating model. | UC-06 |
| FR-07 | Medium | The system shall allow Managers to view revenue statistics, top-selling items, and peak-hour analytics using time-based filters and optional payment-method filters, and shall support report export for the selected reporting context. | This capability provides the reporting data needed for operational monitoring and business review. | UC-07 |
| FR-08 | High | The system shall allow Managers to maintain table master data, including creating, updating, deleting, and viewing the table layout and usage status, and shall allow FOH Staff to view the table layout and usage status for dine-in operations. | This capability is required to keep table configuration under managerial control while still supporting dine-in seating and counter operations. | UC-08 |
| FR-09 | Critical | The system shall allow FOH Staff to create walk-in orders at the counter for dine-in or takeaway customers. | This capability supports a mandatory counter-based POS workflow in scope. | UC-09 |
| FR-10 | Critical | The system shall allow FOH Staff to process counter payments using cash, QR payment, or supported online payment flows according to the applicable service rules. | This capability is required to complete in-store transactions under the defined service rules. | UC-10 |
| FR-11 | High | The system shall allow customers to track the current status of an order, and shall allow guest customers to retrieve order status using Order Code and Phone Number. | This capability supports post-checkout visibility for both registered and guest customers. | UC-11 |
| FR-12 | High | The system shall allow FOH Staff to assign or transfer a dine-in order to a specific table, including attaching additional orders to an already active table for the same party. | This capability is required to link dine-in orders to the correct table for service delivery and realistic add-on ordering. | UC-12 |
| FR-13 | High | The system shall allow BOH Staff to receive new orders on the KDS in operational sequence and change accepted orders to the Cooking status. | This capability starts the kitchen processing workflow and preserves operational order. | UC-13 |
| FR-14 | High | The system shall allow BOH Staff to update item or order preparation status to Ready for serving or handoff. | This capability supports timely coordination between kitchen, service staff, and customers. | UC-14 |
| FR-15 | Medium | The system shall allow registered customers to submit a review for a completed order within the permitted review period. | This capability captures structured customer feedback after order completion. | UC-15 |
| FR-16 | High | The system shall send real-time order notifications to customers when order status changes and shall store notification history for later review. | This capability supports real-time order communication and notification traceability. | UC-16 |

---

## 10. Non-functional Requirements

| REQ# | PRIORITY | DESCRIPTION | RATIONALE | USE CASE |
|---|---|---|---|---|
| NFR-01 | High | The system shall return responses for core user actions, including ordering, payment, counter order creation, and order tracking, within 2 seconds under normal operating conditions. | Fast response times are required to avoid delays for both customers and staff during daily operations. | UC-01, UC-02, UC-09, UC-10, UC-11 |
| NFR-02 | Critical | The system shall target at least 99% application/cloud availability during the restaurant's operating hours, excluding local internet outages, power loss, and the manual paper fallback used when the shop loses connectivity. | The system must remain reliably available during business hours, while still reflecting the project's explicit no-offline-mode assumption. | Toàn bộ 16 UC midterm |
| NFR-03 | Critical | The system shall protect passwords using secure hashing, shall encrypt data in transit using HTTPS/TLS, shall enforce role-based access control for employee functions, and shall authenticate payment API interactions. | Security controls are required because the system processes payments and supports multiple user roles with different access levels. | UC-02, UC-06, UC-10 |
| NFR-04 | High | The system shall provide a responsive Client WebApp for mobile and desktop devices and shall optimize the Admin WebApp for tablet and desktop use. | The selected midterm use cases are performed by both customers and staff on different device types. | UC-01, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08, UC-09, UC-10, UC-11, UC-12, UC-13, UC-14, UC-15, UC-16 |
| NFR-05 | Medium | The system shall support at least 200 concurrent users without significant service degradation. | This capacity target is appropriate for the expected demo scope and realistic restaurant workload. | UC-01, UC-02, UC-09, UC-11, UC-16 |
| NFR-06 | High | The system shall deliver order status updates and notifications to connected clients within 3 seconds of a status change. | Real-time coordination between customers, front-of-house staff, and kitchen staff depends on timely updates. | UC-11, UC-13, UC-14, UC-16 |
| NFR-07 | Medium | The system shall provide user interfaces with clear typography, a minimum color contrast ratio of 4.5:1, and touch-friendly interaction for supported devices. | The system is used on phones, tablets, and POS terminals, so accessibility and touch usability are required. | Các UC có giao diện trong tập 16 UC midterm |

---
## 11. Canonical Order State Model

Để tránh mâu thuẫn giữa các luồng nghiệp vụ, hệ thống sử dụng **hai trục trạng thái độc lập**: `order_status` và `payment_status`.

### 11.1 Order Status

| Order Status | Ý nghĩa | Ghi chú |
|--------------|---------|---------|
| `Pending Confirmation` | Đơn hàng đã được tạo hợp lệ và đang chờ FOH/BOH tiếp nhận | Dùng cho đơn online sau khi thanh toán thành công hoặc các luồng không yêu cầu trả trước |
| `Cooking` | Bếp đã nhận đơn và đang chế biến | Hiển thị trên KDS theo FIFO |
| `Ready` | Món/đơn đã sẵn sàng để phục vụ hoặc bàn giao cho khách | Kích hoạt thông báo cho khách/nhân viên |
| `Completed` | Khách đã nhận món / dịch vụ đã hoàn tất | Dine-in: Phục vụ bấm "Đã giao món"; Takeaway/Pickup: Thu ngân bấm "Khách đã nhận". Có thể vẫn đi cùng `Unpaid` với Dine-in |
| `Cancelled` | Đơn hàng bị hủy bởi khách, nhân viên, hoặc do timeout thanh toán | Không được xử lý tiếp |

### 11.2 Payment Status

| Payment Status | Ý nghĩa | Ghi chú |
|----------------|---------|---------|
| `Pending Online Payment` | Đang chờ callback từ cổng thanh toán, xác nhận thủ công hợp lệ với QR chuyển khoản ngân hàng, hoặc khách retry phương thức thanh toán khác trên cùng đơn | Nếu quá 15 phút ở luồng yêu cầu trả trước, đơn chuyển sang `Cancelled` |
| `Unpaid` | Đơn chưa thanh toán nhưng vẫn hợp lệ để tiếp tục xử lý bước thu tiền tiếp theo | Hợp lệ cho Dine-in và một số luồng tại quầy như Takeaway do Thu ngân vừa tạo nhưng chưa thu tiền xong |
| `Paid` | Đơn đã được thanh toán đầy đủ | Bắt buộc trước khi Takeaway/Pickup đi vào vận hành bếp |
| `Refund Pending` | Yêu cầu hoàn tiền đã được tạo, đang chờ xử lý | Phát sinh khi đơn `Paid` bị `Cancelled`, hoặc khi callback thanh toán thành công đến muộn sau khi đơn đã `Cancelled`; Quản lý phê duyệt / rà soát |
| `Refunded` | Hoàn tiền đã hoàn tất | Xác nhận qua callback cổng thanh toán hoặc Quản lý xác nhận thủ công |
| `Write-off` | Đơn Dine-in khách rời quán không trả tiền | Thu ngân đánh dấu, Quản lý xác nhận; đây là trạng thái ghi nhận thất thoát đã duyệt, không phải thanh toán thành công, và được đưa vào báo cáo thất thoát cuối ngày |
| `Comp` | Quán chủ động miễn phí đơn (goodwill, lỗi nghiêm trọng, VIP) | Chỉ Quản lý phê duyệt kèm lý do. Áp dụng cho đơn ở `Cooking`/`Ready`/`Completed`; đơn `Pending Confirmation` chưa bếp nhận dùng `Cancelled` thay thế. Nếu đơn đã `Paid`, `Comp` kèm hoàn tiền toàn phần (đi qua `Refund Pending` → `Refunded`) và reclassify khoản thu thành "comp expense", không phải doanh thu thường. Tracked riêng trên báo cáo chốt ca cùng với `Write-off` và `Refunded` (ADR-023). |
| `Forfeited` | Đơn Paid mà khách không đến lấy; Quản lý quyết định quán giữ tiền | Áp dụng cho Takeaway/Pickup `Paid` + `Ready` nhưng khách không đến trong ngưỡng giữ món. Manager phê duyệt kèm lý do. Tracked riêng trên báo cáo chốt ca (ADR-024). |

### 11.3 Service-Model Rules

- **Dine-in:** Có thể đi theo `Pending Confirmation - Cooking - Ready - Completed` trong khi `payment_status` vẫn là `Unpaid`; thu ngân quyết toán sau.
- **Takeaway:** Chỉ được đẩy xuống bếp khi `payment_status = Paid`. Nếu khách mua tại quầy, Thu ngân có thể thu tiền ngay tại quầy bằng tiền mặt/QR rồi mới đẩy bếp. Nếu khách tạo đơn online, đơn Takeaway online bị tự động hủy sau 15 phút nếu chưa thanh toán. Đơn Takeaway tại quầy do Thu ngân kiểm soát trực tiếp nên không áp dụng auto-cancel.
- **Pickup:** Hệ thống phải kiểm tra khung giờ trước. Nếu khách thanh toán xong trong 15 phút và slot vẫn hợp lệ, đơn chuyển sang `Pending Confirmation`; nếu không, đơn chuyển sang `Cancelled`. Sau khi bếp đánh dấu `Ready`, đơn Pickup vẫn giữ ở `Ready` cho đến khi khách thực sự nhận hàng; trường hợp đến trễ/no-show được Quản lý xử lý như một ngoại lệ vận hành, không tự động `Completed` hoặc tự động `Refunded`.
- **Thanh toán online thất bại nhiều lần:** Với các đơn online bắt buộc trả trước, khách được retry nhiều phương thức trên cùng một đơn trong thời hạn giữ đơn; đơn không vào bếp cho đến khi có thanh toán hợp lệ. Nếu tất cả phương thức đều thất bại cho đến khi hết hạn, đơn tự động `Cancelled`.
- **Khách bỏ giao dịch tại quầy:** Với Takeaway tại quầy, nếu khách bỏ đi trước khi trả tiền, Thu ngân hủy thủ công đơn chưa thanh toán; nếu món đã lỡ xuống bếp do thao tác sai, Quản lý xác nhận lý do hủy và ghi nhận thất thoát nội bộ.
- **Chỉnh sửa đơn sau khi gửi:** Trước khi bếp nhận, FOH/Cashier có thể chỉnh đơn; với đơn đã thanh toán, phần chênh lệch tăng phải được thu thêm trước khi vào bếp, phần chênh lệch giảm đi qua luồng hoàn một phần. Sau khi bếp đã nhận đơn, chỉ Quản lý được xử lý ngoại lệ; món gọi thêm Dine-in được tạo thành đơn mới gắn cùng bàn.
- **86'd trên đơn đã tồn tại:** 86'd khóa món cho đơn mới nhưng không được bỏ qua các đơn đang chờ/đã thanh toán. Những đơn đã chứa món đó phải được gắn cờ để FOH/Quản lý quyết định đổi món, hoàn một phần, hoặc hủy toàn bộ.
- **Callback đến muộn / giao dịch trùng:** Callback thanh toán thành công đến muộn sau khi đơn đã auto-cancel không được tự mở lại đơn hay đẩy bếp; hệ thống chuyển sang xử lý hoàn tiền. Callback lặp lại hoặc giao dịch trùng phải được xử lý idempotent, không sinh phiếu bếp trùng.
- **Giao nhầm / xác nhận nhầm hoàn tất:** Nếu nhân viên bấm `Completed` sai khi khách chưa nhận đúng đơn, Quản lý/FOH có thể sửa ngược về `Ready` trong cùng ca với audit log. Nếu giao nhầm thực sự gây thất thoát, Quản lý xử lý remake / refund / write-off theo nghiệp vụ.
- **Takeaway quá hạn nhận hàng:** Đơn Takeaway đã `Ready` nhưng khách chưa tới nhận được giữ ở `Ready` và gắn cờ quá hạn tương tự Pickup; không tự động `Completed` hay tự động hoàn tiền.
- **Chốt ca / đối soát cuối ngày:** Trước khi chốt ca, hệ thống phải cảnh báo hoặc chặn xác nhận cuối nếu còn `Refund Pending`, `Write-off` chưa duyệt, đơn `Ready` quá hạn, hoặc sự cố thanh toán/giao nhầm chưa được đóng hồ sơ.




