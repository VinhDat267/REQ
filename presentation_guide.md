# 🎤 Hướng Dẫn Thuyết Trình: Wonton POS UI Prototype

> **Mục tiêu:** Trình bày prototype trong **10 phút** — tập trung vào 3-4 "điểm nổ" chứng minh UI được dẫn dắt bởi Business Rules, không phải "làm cho đẹp".

---

## 📋 Tổng Quan

| Thông số | Chi tiết |
|---|---|
| **Tổng số màn hình** | 44 screens (20 Client + 24 Admin) |
| **Mô hình phục vụ** | Dine-in · Takeaway · Pickup |
| **Vai trò người dùng** | Khách vãng lai · Khách thành viên · Thu ngân · Phục vụ · Bếp · Quản lý |
| **Công nghệ Prototype** | HTML/CSS (Tailwind) + Figma (html.to.design) |
| **Thời gian thuyết trình** | **10 phút** (tỷ lệ 1.5 – 4 – 2 – 1.5 – 1) |

---

## 🎯 Chiến Lược Thuyết Trình: Quy Tắc "3 Điểm Nổ"

> [!IMPORTANT]
> **KHÔNG liệt kê 44 màn hình.** Không ai nhớ được hơn 5 điểm trong 10 phút.
> Thay vào đó, chọn **3 điểm nổ** mà mỗi điểm đều chứng minh "UI bắt nguồn từ Business Rules":
>
> 1. **🔐 Dual Login** — Tại sao 2 cổng vào cho 1 hệ thống?
> 2. **💳 3 Luồng Checkout** — Cùng giỏ hàng, 3 giao diện thanh toán khác nhau
> 3. **🍳 KDS + RBAC** — Bếp chỉ thấy bếp, Thu Ngân chỉ thấy đơn

---

## 🛞 Chuẩn Bị Trước Khi Lên Bục

### Mở sẵn các tab trình duyệt (theo thứ tự):

| Tab # | File | Mục đích |
|:---:|---|---|
| 1 | `client/00-wonton-pos-home.html` | Mở đầu |
| 2 | `client/01-wonton-pos-auth.html` | Client Login |
| 3 | `admin/01-admin-login.html` | Admin Login (so sánh) |
| 4 | `client/03-wonton-pos-menu-browse.html` | Duyệt menu |
| 5 | `client/05-wonton-pos-cart-review.html` | **Điểm nổ: Cart → 3 luồng** |
| 6 | `client/06-wonton-pos-checkout.html` | Checkout Dine-in |
| 7 | `client/06f-wonton-pos-checkout-takeaway.html` | Checkout Takeaway |
| 8 | `client/06e-wonton-pos-checkout-pickup.html` | Checkout Pickup |
| 9 | `admin/16-kitchen-display-system.html` | KDS Theo Đơn |
| 10 | `admin/16b-kitchen-display-batch.html` | KDS Gom Món |
| 11 | `admin/03-order-management.html` | Quản lý Đơn + 2 cột trạng thái |
| 12 | `admin/12-add-staff.html` | RBAC Checkbox |

> [!TIP]
> Dùng `Ctrl + Tab` / `Ctrl + Shift + Tab` để chuyển tab mượt mà, không cần rê chuột tìm. Tập trước 2-3 lần để thuộc thứ tự tab.

---

# ⏱️ KỊCH BẢN 10 PHÚT

---

## 0:00 – 1:30 | MỞ ĐẦU: Đặt Vấn Đề + Dual Login

### Bước 1: Vào đề (30 giây)

**📺 Trên màn hình:** Tab 1 — Trang Home

**🗣️ Nói:**
> "Chào Thầy/Cô, em xin trình bày prototype UI cho **Wonton POS** — hệ thống quản lý nhà hàng mì vằn thắn, phục vụ 3 mô hình: Ăn tại quán, Mua mang về, và Hẹn giờ đến lấy. Prototype gồm 44 màn hình, phủ 100% tập Use Case UC-01 đến UC-16."

> "Thay vì demo dàn trải, em xin đi thẳng vào **3 điểm thiết kế cốt lõi** — nơi mà UI phản ánh rõ nhất cách chúng em hiểu và số hóa quy trình nghiệp vụ thực tế."

### Bước 2: Điểm nổ #1 — Dual Login (1 phút)

**📺 Click:** Chuyển sang Tab 2 — Client Login

**🗣️ Nói:**
> "Điểm khác biệt đầu tiên: hệ thống có **2 cổng vào riêng biệt** — Client Login cho khách hàng, Admin Login cho nhân viên."

**👉 Chỉ tay vào nút "Bỏ qua → Tiếp tục duyệt menu":**
> "Với khách hàng, em thiết kế **Guest Checkout** — khách không cần tạo tài khoản. Ngành F&B khác với E-commerce: khách đến ăn bát mì, không ai muốn đăng ký xác minh OTP. Nếu bắt buộc, tỷ lệ bỏ giỏ hàng sẽ rất cao. Đây là Business Rule BR-02."

**📺 Click:** Chuyển sang Tab 3 — Admin Login

**👉 Chỉ ra KHÔNG có nút "Bỏ qua":**
> "Nhưng bên Admin thì ngược lại — nhân viên **bắt buộc xác thực**, không có Guest Checkout. Hai cổng tách riêng vì lý do bảo mật: tách bề mặt tấn công (Attack Surface), áp dụng IP whitelist riêng cho Admin mà không ảnh hưởng trải nghiệm khách hàng."

**💬 Câu nối chuyển cảnh:**
> "Giờ em sẽ vào vai một khách hàng, đặt một đơn mì, và cho Thầy/Cô thấy **điểm thiết kế quan trọng nhất** của hệ thống nằm ở bước thanh toán."

---

## 1:30 – 5:30 | ĐIỂM NỔ CHÍNH: 3 Luồng Checkout

> [!IMPORTANT]
> **Đây là phần kiếm điểm cao nhất — dành 4 phút.** Một câu chuyện duy nhất: "Cùng 1 giỏ hàng, 3 luồng thanh toán hoàn toàn khác nhau, tất cả do Business Rules quyết định."

### Bước 3: Tạo giỏ hàng nhanh (45 giây)

**📺 Click:** Tab 4 — Menu Browse

**🗣️ Nói:**
> "Khách duyệt menu theo danh mục, mỗi món hiển thị hình ảnh, giá, nút thêm nhanh. Ở góc dưới phải có Floating Cart hiển thị số lượng — không cần rời trang menu để kiểm tra."

**📺 Click:** Chuyển sang Tab 5 — Cart Review

**👉 Chỉ tay vào giỏ hàng:**
> "Khách tùy chỉnh được món: thêm topping, ít đường, ghi chú 'ít hành'. Sau khi chốt, đến bước **chọn Loại Hình Dịch Vụ**."

### Bước 4: Chỉ vào 3 nút dịch vụ (15 giây)

**👉 Chỉ tay vào 3 nút: "Ăn tại quán" · "Mang đi" · "Đến nhận món":**

**🗣️ Nói:**
> "Đây là điểm then chốt. Ba nút này dẫn đến **3 trang Checkout riêng biệt**. Em sẽ click từng cái để Thầy/Cô thấy sự khác biệt."

### Bước 5: Kịch bản A — Dine-in (1 phút)

**📺 Click:** Nút "Ăn tại quán" → Chuyển Tab 6 — Checkout Dine-in

**👉 Chỉ vào ô "Số Bàn":**
> "Dine-in bắt buộc chọn số bàn — vì mì vằn thắn phải ăn nóng, giao sai bàn mì sẽ bị nở. Đây là đặc thù nghiệp vụ."

**👉 Chỉ vào banner thông tin (xanh dương):**
> "Banner ghi rõ: Đơn Ăn Tại Quán hỗ trợ **thanh toán linh hoạt** — trả trước online hoặc thanh toán tại quầy sau khi ăn."

**👉 Chỉ vào "Tiền Mặt Tại Quầy" — đang SÁNG, chọn được:**
> "Đặc biệt, nút **'Tiền Mặt Tại Quầy' sáng và chọn được** — vì Business Rule cho phép Dine-in ăn trước trả sau. Badge 'Thanh toán sau khi ăn' giải thích rõ cho khách."

### Bước 6: Kịch bản B — Takeaway (1 phút)

**📺 Click:** Chuyển Tab 7 — Checkout Takeaway

**🗣️ Nói (giọng nhấn mạnh sự khác biệt):**
> "Bây giờ cùng một giỏ hàng, nhưng khách chọn **Mua mang về**. Giao diện Checkout **thay đổi ngay lập tức**."

**👉 Chỉ vào banner cảnh báo (ĐỎ):**
> "Banner giờ đổi sang màu đỏ: 'Đơn hàng Mang Đi yêu cầu **thanh toán trước** khi Bếp nhận đơn'."

**👉 Chỉ vào "Tiền Mặt Tại Quầy" — đang MỜ, cursor cấm:**
> "Và nút 'Tiền Mặt Tại Quầy' lập tức bị **khóa** — mờ đi, không bấm được. Hệ thống BẮT BUỘC khách thanh toán điện tử trước rồi bếp mới nhận đơn. Tránh rủi ro quán nấu xong mà khách bom hàng."

### Bước 7: Kịch bản C — Pickup (45 giây)

**📺 Click:** Chuyển Tab 8 — Checkout Pickup

**👉 Chỉ vào ô "Khung giờ hẹn":**
> "Pickup thêm 1 yếu tố: chọn giờ đến lấy. Hệ thống kiểm tra Capacity — nếu khung giờ đã đầy, tự động từ chối."

**👉 Chỉ vào "Tiền Mặt":**
> "Tiền mặt cũng bị mờ giống Takeaway — cùng nguyên tắc bắt buộc thanh toán trước."

### Bước 8: Câu chốt (15 giây)

**🗣️ Nói (giọng chậm lại, nhấn từng chữ):**
> "Cùng 1 giỏ hàng — 3 giao diện Checkout hoàn toàn khác nhau. Mỗi sự khác biệt đều bắt nguồn từ Business Rules. **UI không chỉ đẹp, mà ràng buộc người dùng phải đi đúng quy trình nghiệp vụ.**"

**💬 Câu nối chuyển cảnh:**
> "Vậy sau khi khách đặt xong — đơn hàng hiện lên trong Bếp như thế nào? Em chuyển sang góc nhìn Nhân viên."

---

## 5:30 – 7:30 | ADMIN: KDS + Trạng Thái Kép

### Bước 9: KDS — Hai chế độ xem (1 phút 15 giây)

**📺 Click:** Tab 9 — KDS Theo Đơn

**🗣️ Nói:**
> "Đơn hàng đổ thẳng xuống **Kitchen Display System** — không qua giấy. Mỗi ticket hiện: mã đơn, loại dịch vụ, danh sách món, thời gian chờ. Bếp bấm Nhận → Nấu → Hoàn Tất. Thứ tự: FIFO — đơn nào vào trước phục vụ trước."

**📺 Click:** Tab 10 — KDS Gom Món

**👉 Chỉ vào cột gom đơn:**
> "Đây là chế độ **Gom Món** — thay vì nhìn từng đơn, bếp thấy: 'Tổng cộng 5 tô Mì Hoành Thánh từ 3 đơn khác nhau' → nấu 1 mẻ luôn."

> "Tại sao? Vì Business Rule BR-04 cho phép **Batch Cooking** — nấu 5 bát mì cùng lúc nhanh hơn nấu 5 lần riêng lẻ. Đây là đặc thù vận hành thực tế của nhà hàng."

### Bước 10: Trạng Thái Kép — Order vs Payment (45 giây)

**📺 Click:** Tab 11 — Order Management

**👉 Chỉ vào 2 cột "Trạng thái Đơn" và "Trạng thái Thanh toán":**

**🗣️ Nói:**
> "Trong bảng đơn hàng, em thiết kế **2 cột trạng thái tách biệt**. Ví dụ: một đơn Dine-in có thể **'Hoàn thành'** — bếp đã nấu xong, khách đã ăn — nhưng **'Chưa thanh toán'** — khách chưa ra quầy trả tiền."

> "Nếu gộp chung thành 1 trạng thái, hệ thống không biết đơn nào cần Thu Ngân đi thu tiền. Tách riêng giúp cảnh báo chính xác — đúng thực tế vận hành Dine-in."

---

## 7:30 – 9:00 | RBAC: Phân Quyền Nhân Viên

### Bước 11: Cơ chế Checkbox Multi-Role (45 giây)

**📺 Click:** Tab 12 — Add Staff

**👉 Chỉ vào 3 checkbox: Thu Ngân ✓, Phục Vụ ✓, Bếp ✗:**

**🗣️ Nói:**
> "Quản lý phân quyền bằng **checkbox** — không phải dropdown chọn 1 vai trò duy nhất. Một nhân viên có thể giữ **nhiều vai trò** cùng lúc — ví dụ vừa Thu Ngân vừa Phục Vụ vào giờ thấp điểm. Đây là thực tế ngành F&B nhỏ."

### Bước 12: Logic Sidebar theo quyền (45 giây)

**🗣️ Nói (không cần click, mô tả bằng lời):**
> "Sau khi đăng nhập, Sidebar tự động lọc theo nguyên tắc **Least Privilege** — mỗi vai trò chỉ thấy đúng những gì cần cho công việc:
>
> - **Bếp** đăng nhập → Sidebar chỉ còn 2 mục: 'Màn Hình Bếp' và 'Thông Báo'. Bếp không cần biết doanh thu hay nhân sự.
> - **Thu Ngân** → thấy thêm: Đơn hàng, Thanh toán, Sơ đồ Bàn, Lịch Pickup.
> - **Quản lý** → thấy toàn bộ 24 trang.
>
> Nếu 1 nhân viên giữ 2 vai trò, Sidebar **gộp (union)** cả 2 nhóm tính năng. Prototype hiện tại demo ở góc Quản lý — Full Access — để trình bày 100% tính năng."

---

## 9:00 – 10:00 | KẾT BÀI

**🗣️ Nói (giọng chậm, rõ ràng):**
> "Tóm lại, Wonton POS prototype gồm 44 màn hình, phủ 100% tập UC-01 đến UC-16, phục vụ 3 mô hình kinh doanh với quy tắc thanh toán riêng biệt."

> "Triết lý thiết kế: giao diện không chỉ là 'màn hình đẹp' — mà là **bằng chứng trực quan** rằng chúng em đã hiểu sâu nghiệp vụ ngành F&B và chuyển hóa nó thành trải nghiệm người dùng. UI **ràng buộc** người dùng đi đúng quy trình, giảm thất thoát, và tối ưu vận hành nhà hàng."

> "Em xin kết thúc phần demo. Thầy/Cô có câu hỏi nào em xin được giải đáp."

---

# ❓ CHEAT SHEET: CÂU HỎI PHẢN BIỆN

> [!TIP]
> Dưới đây là các câu hỏi có khả năng cao được hỏi. Mỗi câu trả lời giữ dưới **30 giây**.

### Q1: "Sao 2 trang Login cho cùng 1 hệ thống? Sao không gộp?"

> "Có 3 lý do:
> 1. **Khác đối tượng:** Client cho khách hàng — có Guest Checkout, không bắt buộc đăng nhập. Admin cho nhân viên — bắt buộc xác thực, không có Guest.
> 2. **Bảo mật:** Tách riêng Attack Surface để áp dụng chính sách riêng (rate-limit, IP whitelist) cho Admin mà không ảnh hưởng UX khách hàng.
> 3. **Landing Page khác:** Client login → trang Menu. Admin login → Dashboard. Hai hệ sinh thái giao diện hoàn toàn khác nhau.
>
> Đây là kiến trúc chuẩn của các hệ thống POS thương mại như Square, Toast, Lightspeed."

### Q2: "Phân quyền nhân viên hoạt động cụ thể thế nào?"

> "Quản lý gán quyền bằng **checkbox** khi tạo nhân viên — tick nhiều vai trò cùng lúc được. Hệ thống áp dụng nguyên tắc **Least Privilege**: Bếp chỉ thấy KDS + Thông Báo, Thu Ngân thấy Đơn hàng + Thanh toán + Sơ đồ Bàn. Nếu 1 nhân viên có 2 vai trò thì Sidebar gộp (union) cả 2 nhóm tính năng. Prototype demo ở góc Quản lý (Full Access) để trình bày 100% tính năng."

### Q3: "Tại sao không dùng Figma trực tiếp mà lại code HTML?"

> "Hai lý do: (1) Code HTML cho phép **tái sử dụng component** — 1 file JavaScript chung inject sidebar + header vào 24 trang Admin; sửa 1 file ảnh hưởng tất cả, tiết kiệm thời gian. (2) HTML prototype chạy trực tiếp trên trình duyệt để test luồng tương tác, sau đó import vào Figma bằng plugin html.to.design để có prototype nối dây hoàn chỉnh."

### Q4: "44 màn hình có quá nhiều không?"

> "44 màn hình bao gồm cả các trạng thái edge case: Giỏ hàng rỗng, Thanh toán thất bại, Đơn bị hủy. Trong thực tế, đây là số lượng **tối thiểu cần thiết** để phủ 16 Use Cases với 3 mô hình phục vụ. Nếu bỏ bớt thì prototype sẽ thiếu minh chứng cho Business Rules."

### Q5: "KDS 2 chế độ xem để làm gì?"

> "**Theo Đơn**: hiển thị từng ticket FIFO, chuẩn cho quán vắng. **Gom Món**: gộp cùng loại từ nhiều đơn lại — ví dụ 5 đơn khác nhau đều gọi 'Mì Hoành Thánh' → gom thành '5x' → bếp nấu 1 mẻ. Đây là **Batch Cooking**, đặc thù ngành F&B — nấu 5 bát mì cùng lúc nhanh hơn nấu 5 lần riêng lẻ."

### Q6: "Tại sao tách Trạng thái Đơn và Trạng thái Thanh toán?"

> "Vì trong thực tế Dine-in, một đơn có thể **Hoàn thành** (bếp nấu xong, khách ăn xong) nhưng **Chưa thanh toán** (khách chưa ra quầy). Nếu gộp chung, hệ thống không biết đơn nào cần Thu Ngân đi thu tiền. Tách riêng giúp cảnh báo chính xác."

### Q7: "Tại sao Dine-in bắt buộc chọn bàn?"

> "Đặc thù mì vằn thắn — món phải ăn nóng. Giao sai bàn, mì sẽ nở/nhũn trong lúc tìm đúng khách. Gắn mã bàn giúp bưng bê chính xác, đảm bảo trải nghiệm ẩm thực."

### Q8: "Thiết kế dựa trên tiêu chuẩn gì?"

> "Material Design 3 (MD3): bảng màu semantic (primary, secondary, tertiary, error), typography Inter, component pattern chuẩn. Tùy chỉnh palette đỏ/cam ấm cho phù hợp ngành ẩm thực."

### Q9: "Khác gì template POS trên mạng?"

> "Khác ở 3 điểm: (1) UI map 1:1 với Business Rules cụ thể của quán mì — không generic. (2) Mỗi màn hình đều map trực tiếp với ít nhất 1 Use Case trong tập UC-01→UC-16. (3) Edge cases như 86'd Items, Auto-cancel 15 phút, Guest Checkout đều được thể hiện trên giao diện."

### Q10: "Tại sao cần Pickup Schedule riêng?"

> "Pickup có đặc thù: khách hẹn giờ. Nếu 20 khách cùng hẹn 12h00 thì bếp quá tải. Trang Pickup Schedule giúp Quản lý nhìn timeline, kiểm soát Capacity, và hệ thống tự động từ chối khi khung giờ đã full."

---

# 📊 Ma Trận RBAC — Trang Admin theo Vai Trò

*(Dùng để tra cứu nhanh khi bị hỏi sâu về phân quyền, KHÔNG đọc trong khi thuyết trình)*

| Trang Admin | Quản lý | Thu Ngân | Phục Vụ | Bếp |
|---|:---:|:---:|:---:|:---:|
| `02` Dashboard | ✅ | ✅ *(giới hạn)* | ❌ | ❌ |
| `03` Quản lý Đơn hàng | ✅ | ✅ | 👁️ *(xem)* | ❌ |
| `03b` Hủy Đơn hàng | ✅ | ✅ | ❌ | ❌ |
| `04` Tạo Đơn tại quầy | ✅ | ✅ | ❌ | ❌ |
| `05` Xử lý Thanh toán | ✅ | ✅ | ❌ | ❌ |
| `06` KDS — Theo Đơn | ✅ | ❌ | ❌ | ✅ |
| `06b` KDS — Gom Món | ✅ | ❌ | ❌ | ✅ |
| `07` Sơ đồ Bàn | ✅ | ✅ | ✅ | ❌ |
| `07b` Thêm/Sửa Bàn | ✅ | ❌ | ❌ | ❌ |
| `08` Gán Đơn vào Bàn | ✅ | ✅ | ✅ | ❌ |
| `08b` Đổi Bàn | ✅ | ✅ | ✅ | ❌ |
| `09` Quản lý Thực đơn | ✅ | ❌ | ❌ | ❌ |
| `09b` Danh mục & Topping | ✅ | ❌ | ❌ | ❌ |
| `10` Thêm Món mới | ✅ | ❌ | ❌ | ❌ |
| `11` Quản lý Nhân sự | ✅ | ❌ | ❌ | ❌ |
| `12` Thêm Nhân viên | ✅ | ❌ | ❌ | ❌ |
| `13` Thông Báo Admin | ✅ | ✅ | ✅ | ✅ |
| `14` Báo cáo Doanh thu | ✅ | ❌ | ❌ | ❌ |
| `16` Quản lý Khuyến mãi | ✅ | ❌ | ❌ | ❌ |
| `16b` Thêm/Sửa Voucher | ✅ | ❌ | ❌ | ❌ |
| `17` Lịch Pickup | ✅ | ✅ | ❌ | ❌ |
| `18` Cài đặt Hệ thống | ✅ | ❌ | ❌ | ❌ |

**Chú thích:** ✅ = Hiển thị đầy đủ · 👁️ = Chỉ xem, không thao tác · ❌ = Ẩn khỏi Sidebar

---

# 🗺️ Bản Đồ Màn Hình → Use Case (Tra cứu nhanh)

| Use Case | Màn hình minh chứng |
|---|---|
| Đăng ký / Đăng nhập | `01`, `01b`, `01c` (Client) · `01` (Admin) |
| Duyệt thực đơn | `03`, `04` |
| Đặt hàng (Guest + Member) | `05`, `06`, `06e`, `06f` |
| Thanh toán | `06b`, `06c`, `06d`, `05` (Admin) |
| Theo dõi đơn hàng | `07`, `07b` |
| Đánh giá đơn hàng | `09` |
| Quản lý đơn hàng | `03`, `03b`, `04` (Admin) |
| Màn hình bếp KDS | `06`, `06b` (Admin) |
| Quản lý bàn | `07`, `07b`, `08`, `08b` (Admin) |
| Quản lý thực đơn | `09`, `09b`, `10` (Admin) |
| Quản lý nhân sự | `11`, `12` (Admin) |
| Báo cáo doanh thu | `14` (Admin) |
| Thông báo | `10` (Client) · `13` (Admin) |
| Khuyến mãi / Voucher | `16`, `16b` (Admin) |
| Lịch Pickup | `17` (Admin) |
| Cài đặt hệ thống | `18` (Admin) |
