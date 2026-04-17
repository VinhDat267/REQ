# 📋 UC Specification — Phần 2

---

### 🔹 Đặng Khánh Huyền (2301040088)

#### UC-05: Quản lý menu *(Tương ứng UC-26~31 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-05: Quản lý menu |
| **Primary Actor** | Quản lý (Manager) |
| **Description** | Quản lý thêm, sửa, lưu trữ/ngừng bán món ăn và danh mục trên menu hệ thống, cập nhật giá, hình ảnh và trạng thái còn/hết |
| **Trigger** | Quản lý nhấn vào mục "Quản lý menu" trên Admin WebApp |
| **Pre-conditions** | 1. Quản lý đã đăng nhập với quyền "Quản lý" |
| **Post-conditions** | Menu được cập nhật thành công, thay đổi hiển thị ngay trên Client WebApp |
| **Normal Flow** | 1.1. Quản lý chọn "Quản lý menu" |
| | 1.2. Hệ thống hiển thị danh sách menu theo danh mục (Mì vằn thắn, Hoành thánh, Đồ uống…) |
| | 1.3. Quản lý nhấn "Thêm món mới" |
| | 1.4. Hệ thống hiển thị form: Tên món, Danh mục, Giá, Mô tả, Hình ảnh, Topping khả dụng |
| | 1.5. Quản lý nhập thông tin, upload hình ảnh và nhấn "Lưu" |
| | 1.6. Hệ thống validate dữ liệu, lưu món mới, hiển thị "Thêm món thành công!" |
| **Alternative Flows** | 2a. Sửa món: Bước 1.2, quản lý nhấn "Sửa" trên món → Hệ thống hiển thị form chỉnh sửa với dữ liệu hiện tại → Quản lý sửa → Nhấn "Cập nhật" → Thành công |
| | 2b. Lưu trữ / ngừng bán món: Bước 1.2, nhấn "Ngừng bán" hoặc "Lưu trữ" → Hệ thống hiển thị xác nhận → Quản lý xác nhận → Món bị ẩn khỏi menu bán mới nhưng vẫn giữ lại lịch sử đơn hàng và báo cáo đã phát sinh. Chỉ các món chưa từng được dùng trong dữ liệu lịch sử mới được xóa vật lý nếu Quản lý có quyền cao hơn |
| | 2c. Đánh dấu hết hàng: Bước 1.2, quản lý toggle trạng thái món sang "Hết hàng" → Hệ thống cập nhật, Client WebApp hiển thị "Hết hàng" cho món đó |
| | 2d. Quản lý danh mục: Quản lý nhấn "Quản lý danh mục" → Thêm / sửa / xóa danh mục  |
| **Exceptions** | E1: Tên món đã tồn tại — Bước 1.5, hiển thị "Tên món đã tồn tại trong danh mục này!" |
| | E2: Giá không hợp lệ — Bước 1.5, giá ≤ 0 → Hiển thị "Giá món phải lớn hơn 0!" |
| | E3: Hình ảnh quá lớn — Bước 1.5, file > 5MB → Hiển thị "Hình ảnh vượt quá 5MB, vui lòng chọn file nhỏ hơn!" |
| | E4: Xóa danh mục còn món — Bước 2d, hiển thị "Không thể xóa danh mục còn chứa món ăn!" |
| **Priority** | High |

---

#### UC-04: Xem lịch sử đơn hàng *(Tương ứng UC-16~17 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-04: Xem lịch sử đơn hàng |
| **Primary Actor** | Khách hàng Thành viên (Registered Customer) |
| **Description** | Khách hàng xem lại danh sách các đơn hàng đã đặt trước đó, bao gồm chi tiết món, trạng thái và thông tin thanh toán |
| **Trigger** | Khách hàng nhấn vào mục "Lịch sử đơn hàng" trong tài khoản |
| **Pre-conditions** | 1. Khách hàng đã đăng nhập. 2. Khách hàng đã có ít nhất 1 đơn hàng |
| **Post-conditions** | Danh sách đơn hàng được hiển thị thành công |
| **Normal Flow** | 1.1. Khách nhấn "Lịch sử đơn hàng" |
| | 1.2. Hệ thống hiển thị danh sách đơn hàng (Mã đơn, Ngày, Tổng tiền, Trạng thái) sắp xếp theo thời gian mới nhất |
| | 1.3. Khách nhấn vào 1 đơn hàng |
| | 1.4. Hệ thống hiển thị chi tiết: Danh sách món + topping, Số lượng, Giá từng món, Tổng tiền, Phương thức thanh toán, Hình thức phục vụ, Thời gian đặt |
| | 1.5. Khách xem xong, nhấn "Quay lại" |
| **Alternative Flows** | 2a. Lọc theo trạng thái: Bước 1.2, khách chọn filter (Tất cả / Đang xử lý / Hoàn thành / Đã hủy) → Danh sách được lọc |
| **Exceptions** | E1: Chưa có đơn hàng — Bước 1.2, hiển thị "Bạn chưa có đơn hàng nào. Hãy đặt món ngay!" kèm nút chuyển đến menu |
| **Priority** | Medium |

---

### 🔹 Lê Thành Đạt (2301040036)

#### UC-15: Đánh giá đơn hàng *(Tương ứng UC-20 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-15: Đánh giá đơn hàng |
| **Primary Actor** | Khách hàng Thành viên (Registered Customer) |
| **Description** | Sau khi nhận món và hoàn tất đơn hàng, khách hàng đánh giá chất lượng dịch vụ và món ăn bằng sao (1–5) kèm bình luận văn bản. Dữ liệu phục vụ cải thiện chất lượng và thống kê cho quản lý |
| **Trigger** | Đơn hàng chuyển sang trạng thái "Hoàn thành" → Hệ thống hiển thị popup/thông báo mời khách đánh giá |
| **Pre-conditions** | 1. Khách hàng đã đăng nhập (Registered Customer). 2. Đơn hàng ở trạng thái "Hoàn thành". 3. Khách chưa đánh giá đơn hàng này |
| **Post-conditions** | Đánh giá được lưu thành công. Quản lý có thể xem trong báo cáo thống kê |
| **Normal Flow** | 1.1. Hệ thống hiển thị popup "Đánh giá đơn hàng #X" sau khi đơn hoàn thành |
| | 1.2. Khách chọn số sao (1–5 sao) cho các tiêu chí: Chất lượng món ăn, Tốc độ phục vụ, Trải nghiệm tổng thể |
| | 1.3. Khách nhập bình luận văn bản (tùy chọn, tối đa 500 ký tự) |
| | 1.4. Khách nhấn "Gửi đánh giá" |
| | 1.5. Hệ thống validate dữ liệu (phải chọn ít nhất 1 sao), lưu đánh giá |
| | 1.6. Hệ thống hiển thị "Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng tôi cải thiện!" |
| **Alternative Flows** | 2a. Đánh giá sau: Bước 1.1, khách nhấn "Để sau" → Popup đóng. Khách có thể đánh giá lại từ mục "Lịch sử đơn hàng" trong vòng 7 ngày |
| | 2b. Đánh giá từ Lịch sử: Khách vào "Lịch sử đơn hàng" → Chọn đơn chưa đánh giá → Nhấn "Đánh giá" → Tiếp tục từ bước 1.2 |
| **Exceptions** | E1: Đã đánh giá rồi — Bước 1.1, hiển thị "Bạn đã đánh giá đơn hàng này rồi!" kèm nội dung đánh giá cũ |
| | E2: Hết hạn đánh giá — Bước 2b, đơn hàng quá 7 ngày → Hiển thị "Đã hết thời hạn đánh giá cho đơn hàng này" |
| | E3: Bình luận chứa nội dung không phù hợp — Bước 1.4, hệ thống lọc từ ngữ → Hiển thị "Vui lòng kiểm tra lại nội dung bình luận!" |
| **Priority** | Medium |

---

#### UC-13: Nhận đơn từ bếp *(Tương ứng UC-62~63 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-13: Nhận đơn từ bếp |
| **Primary Actor** | Nhân viên Hậu sảnh (BOH Staff) |
| **Description** | Nhân viên bếp xem danh sách các đơn hàng mới cần chế biến trên màn hình bếp, nhận đơn và bắt đầu nấu |
| **Trigger** | Có đơn hàng mới được tạo (từ khách online hoặc thu ngân tại quán). Hệ thống phát âm thanh thông báo |
| **Pre-conditions** | 1. Nhân viên bếp đã đăng nhập với quyền "Bếp". 2. Có ít nhất 1 đơn hàng mới |
| **Post-conditions** | Đơn hàng chuyển trạng thái từ "Chờ xác nhận" sang "Đang nấu". Khách hàng được thông báo |
| **Normal Flow** | 1.1. Hệ thống hiển thị màn hình bếp với danh sách đơn hàng mới (Mã đơn, Danh sách món, Ghi chú, Hình thức, Thời gian đặt) |
| | 1.2. Nhân viên bếp xem chi tiết đơn hàng (món, số lượng, topping, ghi chú đặc biệt) |
| | 1.3. Nhân viên bếp nhấn "Nhận đơn" |
| | 1.4. Hệ thống cập nhật trạng thái đơn thành "Đang nấu" |
| | 1.5. Hệ thống gửi thông báo đến khách hàng: "Đơn hàng #X đang được chế biến" |
| **Alternative Flows** | 2a. Báo không thể thực hiện đơn trước khi bắt đầu nấu: Với đơn Dine-in chưa vào chế biến, bếp nhấn "Báo không thể thực hiện" → Nhập lý do (VD: hết nguyên liệu) → Hệ thống thông báo FOH/Quản lý để trao đổi với khách và xử lý tiếp. **Lưu ý:** Đơn Takeaway/Pickup đã `Paid` không hiển thị nút "Từ chối"; nếu bếp không thể thực hiện, bếp nhấn "Báo lỗi" → Hệ thống gửi cảnh báo lên Quản lý để xử lý ngoại lệ (đổi món / đổi giờ / hoàn tiền). |
| | 2b. Nhiều đơn cùng lúc: Bếp nhận đơn theo thứ tự FIFO (đơn cũ nhất trước) |
| | 2c. Chỉ một phần đơn gặp sự cố: Nếu một món trong đơn đã nhận bị hết nguyên liệu hoặc không thể hoàn tất, bếp gắn cờ order issue cho đúng món đó thay vì hủy im lặng toàn bộ đơn. Hệ thống báo FOH/Quản lý để quyết định đổi món tương đương, bỏ món và hoàn một phần, hoặc hủy toàn bộ đơn trước khi tiếp tục các phần còn lại |
| **Exceptions** | E1: Đơn bị hủy trước khi nhận — Bước 1.3, hiển thị "Đơn hàng đã bị hủy bởi khách hàng" → Đơn bị xóa khỏi danh sách |
| | E2: Mất kết nối — Hệ thống hiển thị "Mất kết nối! Danh sách đơn có thể không cập nhật, vui lòng kiểm tra lại" |
| | E3: Món trong đơn bị 86'd sau khi đơn đã xuất hiện trên KDS — Hệ thống khóa món đó cho các đơn mới, đồng thời gắn cờ đơn hiện tại để Quản lý/FOH xử lý phương án thay thế hoặc hoàn tiền; bếp không được âm thầm bỏ món rồi vẫn coi đơn là bình thường |
| **Priority** | High |

---

### 🔹 Nguyễn Đình Chiến (2301040025)

#### UC-14: Cập nhật trạng thái món *(Tương ứng UC-65~66 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-14: Cập nhật trạng thái món |
| **Primary Actor** | Nhân viên Hậu sảnh (BOH Staff) |
| **Description** | Sau khi nấu xong, nhân viên bếp cập nhật trạng thái món/đơn hàng thành `Sẵn sàng` để hệ thống thông báo cho phục vụ/khách |
| **Trigger** | Nhân viên bếp hoàn thành chế biến món ăn trong đơn hàng |
| **Pre-conditions** | 1. Nhân viên bếp đã đăng nhập. 2. Đơn hàng đang ở trạng thái `Đang nấu` |
| **Post-conditions** | Đơn hàng chuyển sang `Sẵn sàng`. Thông báo gửi đến phục vụ và khách hàng. **Lưu ý:** Đơn chỉ chuyển sang `Completed` ở bước tiếp theo khi Phục vụ bấm "Đã giao món" (Dine-in) hoặc Thu ngân bấm "Khách đã nhận" (Takeaway/Pickup) — không phải tại UC này. |
| **Normal Flow** | 1.1. Nhân viên bếp xem danh sách đơn đang nấu |
| | 1.2. Bếp hoàn thành chế biến, nhấn "Hoàn thành" trên đơn hàng |
| | 1.3. Hệ thống hiển thị xác nhận "Đánh dấu đơn #X là sẵn sàng?" |
| | 1.4. Bếp nhấn "Xác nhận" |
| | 1.5. Hệ thống cập nhật trạng thái thành `Sẵn sàng` |
| | 1.6. Hệ thống gửi thông báo: phục vụ nhận tin "Đơn #X sẵn sàng – Bàn Y" | khách nhận tin "Món của bạn đã sẵn sàng!" |
| **Alternative Flows** | 2a. Hoàn thành theo cụm/khối lượng lớn: Hệ thống không bắt buộc bấm cho "từng tô mì riêng lẻ", bếp có thể gom nhóm các đơn chuẩn bị chung. |
| | 2b. Ghi chú cho phục vụ: Bước 1.2, bếp thêm ghi chú "Món nóng, cẩn thận" → Phục vụ nhìn thấy ghi chú |
| **Exceptions** | E1: Đơn đã bị hủy — Bước 1.2, hiển thị "Đơn hàng đã bị hủy, không thể cập nhật!" |
| | E2: Lỗi cập nhật — Hệ thống hiển thị "Cập nhật thất bại, vui lòng thử lại!" |
| **Priority** | High |

---

#### UC-12: Gán đơn vào bàn *(Tương ứng UC-59~60 trong hệ thống 74 UC)*

| Field | Detail |
|-------|--------|
| **ID & Name** | UC-12: Gán đơn vào bàn |
| **Primary Actor** | Nhân viên Tiền sảnh (FOH Staff) |
| **Description** | Thu ngân gán/chuyển đơn hàng vào một bàn cụ thể trên sơ đồ bàn, hoặc gắn order gọi thêm vào đúng bàn đang hoạt động của cùng nhóm khách |
| **Trigger** | Thu ngân cần gán đơn hàng mới vào bàn hoặc khách yêu cầu đổi bàn |
| **Pre-conditions** | 1. Thu ngân đã đăng nhập. 2. Có đơn hàng "Ăn tại quán" cần gán bàn, chuyển bàn hoặc gắn vào bàn đang hoạt động. 3. Sơ đồ bàn đã được thiết lập |
| **Post-conditions** | Đơn hàng được liên kết với bàn phù hợp. Nếu bàn đang trống, trạng thái bàn cập nhật thành "Đang dùng"; nếu là order gọi thêm cho cùng nhóm khách, bàn giữ nguyên trạng thái "Đang dùng" |
| **Normal Flow** | 1.1. Thu ngân mở mục "Sơ đồ bàn" |
| | 1.2. Hệ thống hiển thị sơ đồ bàn với trạng thái màu sắc (Xanh: Trống, Đỏ: Đang dùng) |
| | 1.3. Thu ngân chọn bàn phù hợp trên sơ đồ bàn |
| | 1.4. Hệ thống hiển thị thông tin bàn (Số bàn, Sức chứa, trạng thái hiện tại, các đơn đang mở nếu có) và các tùy chọn phù hợp như "Gán đơn mới", "Gắn order gọi thêm", hoặc "Chuyển bàn" |
| | 1.5. Thu ngân chọn đơn hàng cần gán hoặc xác nhận order gọi thêm cần gắn vào bàn đã chọn |
| | 1.6. Hệ thống liên kết đơn với bàn đã chọn. Nếu bàn đang trống, bàn chuyển sang "Đang dùng"; nếu bàn đang phục vụ cùng nhóm khách, hệ thống chỉ thêm order mới vào bàn hiện có và giữ nguyên trạng thái "Đang dùng" |
| | 1.7. Hiển thị thông báo thành công tương ứng với thao tác đã thực hiện |
| **Alternative Flows** | 2a. Chuyển bàn: Thu ngân chọn bàn đang dùng → Nhấn "Chuyển bàn" → Chọn bàn trống mới → Xác nhận → Bàn cũ về "Trống", bàn mới thành "Đang dùng" |
| | 2b. Xem đơn tại bàn: Thu ngân nhấn vào bàn đang dùng → Hệ thống hiển thị các đơn hàng đang gán tại bàn đó |
| | 2c. Gắn order gọi thêm vào bàn đang hoạt động của cùng nhóm khách: Thu ngân chọn bàn đang dùng → Nhấn "Gắn order gọi thêm" → Chọn order mới cần gắn → Hệ thống thêm order vào bàn mà không tạo party mới |
| **Exceptions** | E1: Bàn đang được nhóm khác sử dụng — Nếu Thu ngân cố gán một party mới vào bàn "Đang dùng" không thuộc cùng nhóm khách, hệ thống hiển thị "Bàn đã có khách khác, vui lòng chọn bàn khác hoặc dùng chức năng gọi thêm món cho đúng nhóm khách!" |
| | E2: Số khách vượt sức chứa — Bước 1.5, Thu ngân nhập số khách (party size) khi gán bàn Dine-in → nếu số khách vượt sức chứa bàn, hiển thị "Bàn chỉ chứa tối đa X người, nhóm khách có Y người!" và gợi ý chọn bàn lớn hơn. Lưu ý: party size là thông tin tùy chọn do Thu ngân nhập, không bắt buộc khi tạo đơn qua Client WebApp (khách quét QR tự phục vụ). |
| **Priority** | High |

---

### 🔹 Nguyễn Thiện Hiếu (2301040071)
 
#### UC-16: Nhận thông báo đơn hàng *(Tương ứng UC-24 trong hệ thống 74 UC)*
 
| Field | Detail |
|-------|--------|
| **ID & Name** | UC-16: Nhận thông báo đơn hàng |
| **Primary Actor** | Khách hàng (Thành viên / Vãng lai) |
| **Description** | Khách hàng nhận thông báo real-time khi trạng thái đơn hàng thay đổi (Chờ xác nhận, Đang nấu, Sẵn sàng, Hoàn thành, Hủy). Thông báo hiển thị qua popup trên WebApp và có thể qua push notification trên trình duyệt |
| **Trigger** | Trạng thái đơn hàng của khách thay đổi (nhân viên bếp/thu ngân cập nhật) |
| **Pre-conditions** | 1. Khách hàng đang có ít nhất 1 đơn hàng chưa hoàn thành. 2. Khách đang mở Client WebApp hoặc đã cho phép thông báo trình duyệt |
| **Post-conditions** | Khách hàng nhận được thông báo với nội dung trạng thái mới nhất. Thông báo được lưu vào lịch sử |
| **Normal Flow** | 1.1. Nhân viên bếp/thu ngân cập nhật trạng thái đơn hàng (ví dụ: `Cooking` → `Ready`) |
| | 1.2. Hệ thống gửi thông báo real-time đến Client WebApp của khách |
| | 1.3. Client WebApp hiển thị popup/toast: "Đơn hàng #X: Món của bạn đã sẵn sàng!" kèm âm thanh |
| | 1.4. Khách nhấn vào thông báo → Chuyển tới màn hình theo dõi đơn hàng (UC-11) |
| | 1.5. Thông báo được đánh dấu "Đã đọc" và lưu vào lịch sử thông báo |
| **Alternative Flows** | 2a. Xem lịch sử thông báo: Khách nhấn icon chuông 🔔 → Hệ thống hiển thị danh sách thông báo (mới nhất trước), có badge đếm số thông báo chưa đọc |
| | 2b. Push notification trình duyệt: Nếu khách đã cấp quyền push notification, hệ thống gửi thông báo ngay cả khi khách đóng tab WebApp |
| | 2c. Đánh dấu tất cả đã đọc: Khách nhấn "Đánh dấu tất cả đã đọc" → Badge reset về 0 |
| **Exceptions** | E1: Mất kết nối — Thông báo real-time không gửi được → Khi khách mở lại WebApp, hệ thống đồng bộ và hiển thị tất cả thông báo bị lỡ |
| | E2: Khách chưa cấp quyền push — Bước 2b, hệ thống hiển thị "Bật thông báo để nhận cập nhật đơn hàng nhanh hơn!" kèm nút "Cho phép" |
| | E3: Đơn bị hủy — Hệ thống gửi thông báo đặc biệt: "Đơn hàng #X đã bị hủy. Lý do: [Lý do]" với style cảnh báo (màu đỏ) |
| **Priority** | High |

---
#### UC-11: Theo dõi đơn hàng *(Tương ứng UC-15 trong hệ thống 74 UC)*
 
| Field | Detail |
|-------|--------|
| **ID & Name** | UC-11: Theo dõi đơn hàng |
| **Primary Actor** | Khách hàng (Thành viên / Vãng lai) |
| **Description** | Khách hàng theo dõi trạng thái đơn hàng hiện tại của mình sau khi đã đặt món, bằng tài khoản hoặc bằng `Mã đơn + SĐT` đối với Guest |
| **Trigger** | Khách hàng hoàn tất việc đặt đơn hàng, nhấn vào mục "Theo dõi đơn", hoặc mở thông báo đơn hàng |
| **Pre-conditions** | 1. Khách hàng có ít nhất 1 đơn hàng ở trạng thái chưa hoàn thành. 2. Nếu là Guest, khách có Mã đơn và số điện thoại đã dùng khi đặt đơn |
| **Post-conditions** | Khách hàng xem được thông tin trạng thái cập nhật mới nhất của đơn hàng |
| **Normal Flow** | 1.1. Khách hàng truy cập mục "Theo dõi đơn hàng" |
| | 1.2. Nếu là khách thành viên, hệ thống lấy danh sách đơn đang xử lý từ tài khoản; nếu là Guest, hệ thống yêu cầu nhập `Mã đơn + SĐT` |
| | 1.3. Hệ thống tải trạng thái đơn hàng mới nhất |
| | 1.4. Hệ thống hiển thị trạng thái hiện tại (VD: `Pending Confirmation`, `Cooking`, `Ready`) cùng thông tin thời gian liên quan |
| | 1.5. Khi trạng thái đơn hàng thay đổi trên hệ thống của quản lý/bếp, giao diện khách hàng được cập nhật thời gian thực |
| **Alternative Flows** | 2a. Theo dõi nhiều đơn: Hệ thống cho phép khách hàng nhấn vào từng đơn hàng đang xử lý để xem trạng thái tương ứng |
| | 2b. Mở từ thông báo: Khách nhấn vào một notification → Hệ thống mở trực tiếp đúng đơn hàng tương ứng |
| **Exceptions** | E1: Mất kết nối — Hệ thống không tự động cập nhật được trạng thái thời gian thực và yêu cầu khách hàng nhấn tải lại trang |
| | E2: Guest nhập sai Mã đơn hoặc SĐT — Hệ thống hiển thị "Không tìm thấy đơn hàng phù hợp" |
| **Priority** | High |


