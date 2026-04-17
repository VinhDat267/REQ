# Business Rules & Workflow Overview (Quy Tắc Nghiệp Vụ)
## Hệ thống Wonton POS - Quán Mì Vằn Thắn

Tài liệu này định nghĩa các "Luật chơi" (Business Rules) và luồng vận hành thực tế tại quán ăn để làm cơ sở thiết kế cốt lõi cho Use Case, Database và UI/UX.

> **Business scope lock (2026-04-17):** Bộ business rules này được khóa làm baseline final. Chỉ được làm rõ câu chữ, đồng bộ VN/EN, hoặc map sang BRD/SRS/UC/diagram mà không thay đổi hành vi nghiệp vụ. Mọi mở rộng scope mới phải có ADR scope-change.
>
> **Scope-change ADR đã duyệt tính đến `2026-04-17`:** `ADR-023` (Comp status, §3n), `ADR-024` (Forfeited status, §3c), `ADR-025` (Reorder data drift, §2a), `ADR-026` (Shift-span attribution, §3g). Các rule mới từ các ADR này đã được nhập vào baseline này.

### 1. Phân loại Mô hình phục vụ (Service Models)
- **Dine-in (Ăn tại quán):**
  - Khách quét QR tại bàn hoặc gọi tại quầy.
  - **QR tại bàn:** Mỗi bàn có một mã QR cố định (in dán trên bàn) do Quản lý tạo qua chức năng Quản lý bàn. Mã QR encode URL dạng `{domain}/order?table={table_id}`. Khi khách quét, Client WebApp tự động gắn đơn hàng vào đúng bàn đó mà khách không cần nhập số bàn thủ công. Nếu khách quét QR bàn A nhưng ngồi bàn B (scan nhầm), Phục vụ hoặc Thu ngân có thể chuyển đơn sang bàn đúng qua chức năng Chuyển bàn (UC-12).
  - **Xác thực phiên bàn (table session):** QR chỉ giúp nhận diện bàn nhanh, không thay thế việc xác nhận thực địa của nhân viên. Với đơn Dine-in tạo qua QR, FOH vẫn phải có khả năng xác nhận/chỉnh lại bàn khi khách đổi chỗ, scan nhầm hoặc nhiều nhóm khách luân phiên trên cùng một bàn.
  - Được phép lên món trước, thanh toán sau (trừ khi khách chủ động trả luôn tại quầy).
  - Bắt buộc phải gắn với một mã bàn (Table ID) trên Sơ đồ bàn để nhân viên bưng bê đúng chỗ. Mì vằn thắn phải ăn nóng, phục vụ sai bàn sẽ làm mì nở/nhũn, hỏng trải nghiệm món.
  - **Gọi thêm món (Multi-order per table):** Khi khách Dine-in muốn gọi thêm món sau khi đã đặt đơn, hệ thống tạo một đơn hàng mới gắn với cùng bàn đó. Một bàn có thể có nhiều đơn hàng đồng thời. Khi thanh toán, Thu ngân thấy tất cả các đơn chưa thanh toán trên bàn và có thể thanh toán gộp tất cả đơn trong một lần hoặc thanh toán từng đơn riêng lẻ.
  - **Chuyển bàn khi bàn có nhiều đơn:** Khi Thu ngân chuyển bàn (UC-60), mặc định hệ thống di chuyển **toàn bộ đơn đang active của bàn nguồn** sang bàn đích. Nếu chỉ cần chuyển một phần (ví dụ: một nhóm khách tách ra ngồi bàn khác), Thu ngân chọn đơn cần chuyển trong danh sách đơn của bàn nguồn. Bàn nguồn chỉ về trạng thái `Trống` khi toàn bộ đơn đã chuyển đi hoặc đã thanh toán.
- **Takeaway (Mua mang về):**
  - Khách có thể order tại quầy hoặc tạo đơn mang đi qua Client WebApp.
  - Nếu khách mua trực tiếp tại quầy, khách **được phép thanh toán ngay tại quầy** bằng tiền mặt, QR hoặc phương thức hỗ trợ khác do Thu ngân xử lý.
  - Nếu khách tạo đơn qua Client WebApp, khách thanh toán theo luồng online/xác nhận chuyển khoản ngân hàng trước khi đơn đi vào vận hành.
  - Điểm bắt buộc của Takeaway là phải thanh toán 100% **trước khi** hệ thống in phiếu hoặc đẩy đơn xuống bếp. Không áp dụng hình thức "nhận đồ rồi mới trả tiền" cho Takeaway.
  - Bếp sẽ đóng gói hộp giấy/nhựa và để đúng khu vực chờ Takeaway.
  - **Nhận dạng đơn khi khách đến lấy:** Phiếu bếp in kèm mã đơn rút gọn (ví dụ: 4 ký tự cuối). Thu ngân gọi tên khách hoặc đối chiếu mã đơn trên màn hình POS với mã trên túi đồ để trao đúng đơn. Với đơn Pickup, quy trình tương tự — khách cho Thu ngân xem mã đơn trên điện thoại hoặc đọc mã.
- **Pickup (Hẹn giờ đến lấy - Qua WebApp):**
  - Khách tự order tại nhà/cơ quan, chọn giờ chính xác để đến lấy mà không cần xếp hàng.
  - Bắt buộc thanh toán 100% online trước để ngăn chặn tình trạng "bom hàng".
  - Giờ hẹn phải nằm trong khung giờ hoạt động của quán và được hệ thống kiểm tra để tránh quá tải bếp vào cùng một thời điểm (Overload prevention).
  - **Cấu hình năng lực Pickup (Pickup Capacity):** Quản lý thiết lập số đơn Pickup tối đa được phép trong mỗi khung giờ (slot) thông qua mục Cài đặt Pickup trên Admin WebApp. Ví dụ: tối đa 5 đơn Pickup mỗi slot 30 phút. Ở baseline final hiện tại, capacity được tính theo **số đơn/slot như một xấp xỉ vận hành đơn giản**, chưa quy đổi theo độ phức tạp từng món; vì vậy Quản lý phải chủ động điều chỉnh limit hoặc bật "Tạm ngưng nhận Pickup" khi bếp quá tải, thiếu nhân lực, hoặc có nhiều đơn lớn cùng lúc. Khi một slot đạt giới hạn, hệ thống không cho phép khách chọn slot đó nữa và gợi ý slot lân cận còn trống.
  - **Tác động của thay đổi capacity / tạm ngưng:** Việc giảm limit hoặc bật "Tạm ngưng nhận Pickup" chỉ áp dụng cho **đơn Pickup mới**. Các đơn Pickup đã được hệ thống auto-accept trước đó vẫn giữ nguyên cam kết phục vụ; nếu quán không thể đáp ứng, phải xử lý theo luồng Pickup exception (đổi giờ / đổi món / hoàn tiền) dưới quyền Quản lý.
  - Nếu khung giờ hợp lệ và còn khả năng phục vụ, hệ thống tự động chấp nhận đơn Pickup; không yêu cầu Quản lý duyệt thủ công.
  - **Bếp không được từ chối đơn Pickup đã thanh toán:** Vì đơn Pickup đã được khách thanh toán 100% và hệ thống đã tự động chấp nhận, Bếp không có quyền từ chối đơn này. Nếu Bếp không thể thực hiện đơn (ví dụ: hết nguyên liệu giữa chừng), Bếp phải báo lên Quản lý để xử lý ngoại lệ (đổi món tương đương, đổi khung giờ, hoặc hoàn tiền cho khách). Quyết định hủy hoặc thay đổi đơn Pickup đã thanh toán chỉ thuộc thẩm quyền của Quản lý.

### 2. Quy tắc Tài khoản & Quyền hạn (Account & Role Rules)
- **Guest Checkout (Giảm tỷ lệ chốt đơn hụt - Drop-off rate):**
  - Cho phép khách hàng đặt đơn online mà không cần bắt buộc tạo tài khoản (không cần vòng lặp OTP/Password phức tạp).
  - Khách chỉ cần cung cấp `{Tên + Số điện thoại}` tại bước cuối để định danh đơn hàng.
  - Sau khi tạo đơn, khách vãng lai được phép tra cứu trạng thái đơn bằng `{Mã đơn + Số điện thoại}`; không bắt buộc đăng nhập.
  - **Bảo mật mã đơn Guest:** Mã đơn (Order Tracking Code) phải đủ dài và ngẫu nhiên (tối thiểu 8 ký tự alphanumeric) để tránh bị brute-force đoán mã. Hệ thống áp dụng rate-limiting cho API tra cứu đơn Guest (tối đa 5 lần thử sai mỗi IP trong 15 phút) để ngăn chặn truy cập trái phép.
  - **Lưu trữ và anonymize dữ liệu Guest:** Tên và Số điện thoại của Guest được lưu kèm đơn hàng để phục vụ tra cứu, liên hệ khi phát sinh vấn đề, và audit tài chính. Sau **12 tháng** kể từ khi đơn hàng kết thúc (`Completed` / `Cancelled` / `Refunded` / `Write-off`), hệ thống anonymize thông tin cá nhân (thay SĐT/tên bằng giá trị ẩn danh) và chỉ giữ lại bản ghi phi danh tính cho mục đích thống kê. Rule này tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân tại Việt Nam.
- **Khách hàng Thành viên (Registered Customer):**
  - Ở phạm vi full-system, có đầy đủ chức năng tài khoản: đăng nhập, xem lịch sử đơn, đặt lại đơn cũ, cập nhật hồ sơ, đổi mật khẩu và đánh giá đơn hàng.
  - Ở phạm vi final project, chức năng **đặt lại đơn cũ** thuộc scope chính theo `UC-18` của inventory 74 UC và cần được đặc tả trong bộ UC final.
- **Nhân viên đa nhiệm (Multi-Role Staffing):**
  - Không áp dụng tư duy "1 tài khoản chỉ có 1 quyền cố định". Ngành F&B yêu cầu sự linh hoạt cao trong giờ cao điểm.
  - Chủ quán cấp quyền cho nhân viên thông qua danh sách Checkbox: `[x] Thu ngân`, `[x] Phục vụ`, `[ ] Bếp`.
  - Người dùng đăng nhập sẽ sở hữu UI gộp tất cả các tính năng mà họ được cấp quyền.

### 2a. Quy tắc Đặt lại đơn cũ (Reorder Rules, UC-18)
*(ADR-025)*
- **Đối tượng dùng Reorder:** Chỉ Registered Customer. Khách Guest không có lịch sử đơn gắn tài khoản để Reorder.
- **Đơn nguồn đủ điều kiện:** Chỉ các đơn ở trạng thái `Completed`. Đơn `Cancelled`, `Refunded`, `Write-off`, `Comp`, `Forfeited` không hiển thị trong danh sách Reorder vì khách chưa thực sự nhận món.
- **Xử lý menu drift giữa lần đặt cũ và lúc Reorder:**
  - **Món đã xóa hoặc archive:** Bỏ khỏi giỏ Reorder, hiện inline notice "{tên món} không còn trên menu và đã được bỏ khỏi giỏ hàng".
  - **Giá thay đổi (tăng hoặc giảm):** Dùng **giá hiện tại**, không giữ giá cũ. Inline notice "Giá {tên món} đã thay đổi: {giá cũ} → {giá mới}".
  - **Topping / option không còn phục vụ:** Bỏ topping thiếu, giữ món gốc. Inline notice.
  - **Món hiện đang 86'd:** Giữ trong giỏ kèm cờ không khả dụng; chặn checkout cho đến khi khách bỏ món hoặc 86'd được gỡ.
  - **Danh mục tổ chức lại:** Trong suốt với khách; Reorder theo item ID, không theo category.
- **UX drift notice:** Inline notice trên từng dòng giỏ hàng + banner tổng hợp ở đầu trang (ví dụ: "3 thay đổi so với đơn gốc"). Không dùng modal chặn để tránh gây phiền khi có nhiều món drift.
- **Không bao giờ silent change giá cuối:** Mọi thay đổi tác động tổng tiền đều phải hiển thị cho khách xem trước khi checkout.
- **Preserve ghi chú đặc biệt:** Reorder giữ lại ghi chú khách từng nhập (ví dụ: "ít cay") gắn vào dòng giỏ mới nếu món vẫn còn.
- **Đơn mới, không resurrect đơn cũ:** Reorder tạo một `order_id` mới hoàn toàn; không khôi phục thanh toán hoặc trạng thái đơn cũ.
- **Trường hợp toàn bộ món đã drop:** Nếu không còn món nào khả dụng sau drift, hệ thống hiện thông báo "Đơn này không còn món nào khả dụng" kèm link quay lại menu.
- **Retention:** Registered Customer history không chịu ràng buộc 12-tháng anonymize của Guest (§2); Reorder hoạt động trên bất kỳ đơn `Completed` nào còn trong lịch sử tài khoản.

### 3. Quy tắc Hủy đơn & Tiền tệ (Cancellation & Financial Rules)
- **Tách biệt trạng thái đơn và trạng thái thanh toán:**
  - `order_status` phản ánh tiến độ vận hành (`Pending Confirmation -> Cooking -> Ready -> Completed / Cancelled`).
  - `payment_status` phản ánh tiến độ thanh toán (`Pending Online Payment -> Paid` với luồng online/chờ xác nhận chuyển khoản, hoặc `Unpaid -> Paid` với Dine-in và một số luồng thu tiền tại quầy).
- **Tự động hủy (Auto-cancellation):**
  - Các đơn bắt buộc trả trước **đặt qua Client WebApp** (`Pickup` và `Takeaway online`) nếu không hoàn thành thanh toán đúng hạn trong vòng 15 phút thì hệ thống tự động đổi sang `Cancelled`.
  - **Ngoại lệ cho Takeaway tại quầy:** Khi Thu ngân tạo đơn Takeaway tại quầy (khách đang có mặt), hệ thống không tự động hủy sau 15 phút. Thu ngân có thể thu tiền ngay tại quầy hoặc giữ đơn chờ thanh toán trong thời gian ngắn do khách đang đứng tại chỗ; nếu khách từ bỏ, Thu ngân hủy thủ công.
- **Takeaway phải trả trước khi vào bếp:**
  - Thu ngân hoặc Client WebApp chỉ được đẩy đơn Takeaway xuống bếp khi `payment_status = Paid`, bất kể tiền được thu ngay tại quầy hay qua luồng online.
- **Tuyệt đối không Auto-cancel với Dine-in:**
  - Đơn Dine-in chưa thanh toán thì tuyệt đối KHÔNG tự động hủy.
  - Hệ thống sẽ ghim trạng thái `Completed + Unpaid` nhấp nháy trên máy POS của Thu ngân. Thu ngân có trách nhiệm ra tận bàn xác minh và chốt thanh toán.
  - **Escalation khi chậm thanh toán:** Nếu đơn Dine-in ở trạng thái `Completed + Unpaid` quá 30 phút, hệ thống tự động gửi cảnh báo push notification đến Quản lý kèm thông tin bàn và tổng tiền chưa thu.
  - **Xử lý khách rời quán không trả tiền:** Nếu khách đã rời quán mà chưa thanh toán, Thu ngân đánh dấu đơn là `Write-off` kèm lý do. Thao tác `Write-off` yêu cầu Quản lý xác nhận. `Write-off` là trạng thái ghi nhận thất thoát tài chính đã được duyệt, **không đồng nghĩa** khách đã thanh toán thành công. Đơn `Write-off` được ghi nhận vào báo cáo thất thoát cuối ngày để Quản lý theo dõi.
- **Ma trận quyền hủy đơn thực tế:**
  - `Dine-in + Unpaid + chưa bếp nhận`: FOH/Cashier có thể hủy để sửa đơn hoặc khi khách đổi ý.
  - `Takeaway/Pickup + Pending Online Payment`: khách có thể bỏ thanh toán; hệ thống auto-cancel sau 15 phút với luồng Client WebApp, còn đơn Takeaway tại quầy do Thu ngân hủy thủ công nếu khách rời đi.
  - `Paid + chưa bếp nhận`: khách có thể yêu cầu hủy, nhưng chỉ Quản lý được phê duyệt hoàn tiền.
  - `Cooking` hoặc `Ready`: khách không tự hủy trực tiếp; chỉ Quản lý xử lý ngoại lệ (đổi món, hoàn tiền, hoặc ghi nhận thất thoát tùy tình huống).
- **Khách order rồi bỏ ra về (customer abandonment):**
  - **Takeaway tại quầy, chưa thanh toán:** Thu ngân hủy thủ công. Đơn không được xuống bếp. Nếu nhân viên đã lỡ đẩy món vào chế biến trước khi thu tiền, Quản lý xác nhận lý do hủy và ghi nhận đó là lỗi vận hành/thất thoát nội bộ, không phải doanh thu.
  - **Dine-in, chưa phục vụ món và chưa thanh toán:** FOH/Cashier có thể hủy thủ công nếu khách rời quán ngay sau khi gọi món hoặc đổi ý trước khi bếp thực sự bắt đầu làm món.
  - **Dine-in, đã nhận món hoặc đã sử dụng dịch vụ nhưng bỏ đi không trả tiền:** xử lý theo luồng `Write-off` có Quản lý xác nhận.

### 3a. Quy tắc Thanh toán QR (QR Payment Rules)
- **Phân biệt hai loại thanh toán QR:**
  - **QR qua cổng thanh toán (Payment Gateway QR):** Sử dụng MoMo, VNPay, ZaloPay. Hệ thống tạo QR động chứa thông tin đơn hàng, khách quét và xác nhận trên ứng dụng ví. Cổng thanh toán gửi callback tự động về hệ thống → `payment_status` tự động chuyển sang `Paid`. Đây là luồng xác nhận đáng tin cậy.
  - **QR chuyển khoản ngân hàng (Bank Transfer QR):** Hệ thống hiển thị QR chứa số tài khoản + số tiền của quán. Khách quét bằng app ngân hàng bất kỳ và chuyển khoản. Hệ thống **không nhận được callback tự động** từ ngân hàng (trừ khi tích hợp API bank riêng). Thu ngân phải **tự xác nhận thủ công** rằng đã nhận tiền (kiểm tra SMS/app bank của quán) rồi bấm "Xác nhận đã nhận" trên hệ thống.
- **Ghi nhận rủi ro xác nhận thủ công:**
  - Với QR chuyển khoản ngân hàng, có rủi ro Thu ngân xác nhận sai (bấm nhận mà tiền chưa về, hoặc khách chuyển thiếu). Hệ thống ghi log mỗi lần Thu ngân xác nhận thủ công kèm thời gian và mã đơn để phục vụ đối soát cuối ngày.

### 3b. Quy tắc Hoàn tiền (Refund Rules)
- **Khi nào phát sinh hoàn tiền:**
  - Khi đơn hàng có `payment_status = Paid` bị chuyển sang `order_status = Cancelled` (do Quản lý hủy, bếp không thể thực hiện, hoặc khách yêu cầu hủy trước khi bếp nhận đơn).
- **Quyền phê duyệt hoàn tiền:**
  - Chỉ Quản lý có quyền phê duyệt yêu cầu hoàn tiền. Thu ngân và Bếp không được tự ý hoàn tiền.
- **Phương thức hoàn tiền:**
  - Hoàn tiền qua cùng phương thức thanh toán gốc. Nếu thanh toán qua cổng online (MoMo/VNPay/ZaloPay), hệ thống gửi yêu cầu hoàn tiền qua API cổng thanh toán. Nếu thanh toán qua QR chuyển khoản ngân hàng, Quản lý xử lý hoàn tiền thủ công và đánh dấu đã hoàn trên hệ thống.
- **Trạng thái thanh toán khi hoàn tiền:**
  - Khi yêu cầu hoàn tiền được tạo, `payment_status` chuyển sang `Refund Pending`. Khi hoàn tiền hoàn tất (callback cổng thanh toán hoặc Quản lý xác nhận thủ công), `payment_status` chuyển sang `Refunded`.
- **Hoàn tiền toàn phần / một phần:**
  - Nếu chỉ **một phần** đơn đã thanh toán không thể phục vụ (ví dụ: một món bị hết, lỗi chế biến, hoặc khách đồng ý bỏ món), Quản lý có thể chọn đổi món tương đương, bỏ món và hoàn phần chênh lệch, hoặc hủy toàn bộ đơn nếu khách không chấp nhận phương án thay thế.
- **Hoàn tiền thất bại hoặc chậm hoàn:**
  - Nếu cổng thanh toán/API hoàn tiền lỗi, hoặc hoàn tiền thủ công chưa được thực hiện xong, đơn **không tự mở lại** để tiếp tục vận hành. `payment_status` tiếp tục giữ ở `Refund Pending` cho đến khi Quản lý retry hoặc xác nhận đã hoàn tất.
- **Ghi nhận:**
  - Mọi giao dịch hoàn tiền phải được ghi log với lý do hủy, người phê duyệt, thời gian và phương thức hoàn tiền để phục vụ đối soát cuối ngày.

### 3c. Quy tắc chuyển trạng thái Ready → Completed (Order Completion Rules)
- **Dine-in:** Nhân viên Phục vụ bấm "Đã giao món" sau khi bưng món ra đúng bàn → `order_status` chuyển sang `Completed`. Nếu bàn có nhiều đơn, mỗi đơn được đánh dấu `Completed` độc lập khi phục vụ xong.
- **Takeaway:** Thu ngân bấm "Khách đã nhận" khi khách đến quầy lấy đồ → `order_status` chuyển sang `Completed`.
- **Pickup:** Tương tự Takeaway — Thu ngân bấm "Khách đã nhận" khi khách đến theo giờ hẹn và lấy đồ → `order_status` chuyển sang `Completed`.
- **Lưu ý:** Trạng thái `Ready` chỉ có nghĩa là bếp đã nấu xong. Đơn chỉ `Completed` khi khách thực sự nhận được món.
- **Takeaway đến trễ / không đến lấy:** Với đơn Takeaway đã `Paid` và đã `Ready`, nếu khách chưa đến nhận trong ngưỡng giữ món do quán cấu hình (mặc định gợi ý 30 phút sau `Ready` hoặc đến giờ đóng cửa), hệ thống gắn cờ quá hạn cho Thu ngân/Quản lý xử lý. Hệ thống không tự động `Completed` và không tự động hoàn tiền. Trước khi quyết định, quán **khuyến nghị mạnh** gọi khách ít nhất một lần qua SĐT khách cung cấp. Quản lý chọn một trong: giữ món chờ thêm, remake nếu khách đến, hoàn tiền toàn phần/một phần, hoặc `Forfeited` (quán giữ tiền) — xem ADR-024.
- **Pickup đến trễ / không đến lấy:** Sau khi đơn Pickup được đánh dấu `Ready`, đơn vẫn giữ ở `Ready` cho đến khi khách thực sự nhận hàng. Nếu quá giờ hẹn cộng ngưỡng giữ món do quán cấu hình (mặc định gợi ý 60 phút sau giờ hẹn hoặc đến giờ đóng cửa), hệ thống gắn cờ quá hẹn cho Thu ngân/Quản lý xử lý. Hệ thống không tự động chuyển `Completed` và không tự động hoàn tiền. Quản lý chọn trong các kết quả: giữ món, hủy kèm hoàn tiền toàn phần/một phần, hoặc `Forfeited` nếu quán giữ tiền sau khi đã thử liên hệ khách. `Forfeited` phải đi qua audit `§3k` (ADR-024).
- **Pickup đến sớm hơn giờ hẹn:** Nếu khách đến quầy trước giờ hẹn mà đơn chưa `Ready`, Thu ngân thông báo thời gian chờ còn lại. Hệ thống không hứa giao sớm chỉ vì khách đến sớm; việc ưu tiên làm sớm hơn là quyết định vận hành của quán.

### 3d. Quy tắc thất bại thanh toán online (Online Payment Failure Rules)
- **Cho phép retry nhiều lần trên cùng một đơn:**
  - Với các đơn online bắt buộc trả trước, nếu một phương thức thanh toán thất bại, khách được phép thử lại cùng phương thức hoặc đổi sang phương thức khác trên **chính đơn hiện tại**; hệ thống không tạo thêm đơn trùng chỉ vì khách retry.
- **Khi tất cả phương thức đều thất bại:**
  - Đơn giữ `payment_status = Pending Online Payment`, không được đẩy xuống bếp, và màn hình thanh toán phải hiển thị rõ rằng khách có thể thử lại cho đến khi hết thời gian giữ đơn.
  - Nếu khách không thanh toán thành công trong thời hạn giữ đơn (mặc định 15 phút với luồng bắt buộc trả trước qua Client WebApp), hệ thống tự động chuyển đơn sang `Cancelled`.
- **Lỗi hệ thống/cổng thanh toán diện rộng:**
  - Nếu nhiều phương thức thanh toán online đồng thời lỗi do sự cố hệ thống hoặc cổng thanh toán, hệ thống phải hiển thị thông báo rõ ràng kiểu "Tạm thời không thể xử lý thanh toán online, vui lòng thử lại sau". Đơn vẫn không được xuống bếp cho đến khi có thanh toán hợp lệ hoặc hết thời gian giữ đơn.
- **Callback thành công đến muộn sau khi đơn đã auto-cancel:**
  - Nếu hệ thống đã tự động chuyển đơn sang `Cancelled` vì hết thời gian giữ đơn nhưng callback thành công mới đến sau đó, hệ thống **không tự động mở lại đơn** và **không tự động đẩy đơn xuống bếp**. Hệ thống ghi log bất thường, thông báo Quản lý, và tạo luồng hoàn tiền để đưa `payment_status` sang `Refund Pending`.
- **Idempotency và giao dịch trùng:**
  - Callback thành công lặp lại cho cùng một giao dịch hoặc thao tác retry sau khi đơn đã `Paid` không được tạo thêm order, thêm hóa đơn, hoặc thêm phiếu bếp. Nếu phát hiện thu trùng thực sự, Quản lý xử lý khoản thu thừa theo luồng hoàn tiền nhưng đơn gốc không được chạy bếp lần hai.

### 3e. Quy tắc chỉnh sửa đơn sau khi đã gửi (Order Modification Rules)
- **Trước khi bếp nhận đơn:**
  - FOH/Cashier có thể chỉnh sửa món, số lượng, topping, hoặc ghi chú cho đơn Dine-in và đơn tạo tại quầy nếu bếp chưa bắt đầu xử lý.
  - Với Takeaway/Pickup đã thanh toán nhưng bếp chưa nhận, thay đổi làm tăng tiền yêu cầu khách thanh toán thêm trước khi vào bếp; thay đổi làm giảm tiền yêu cầu Quản lý phê duyệt hoàn phần chênh lệch hoặc hủy toàn bộ đơn theo quy tắc hoàn tiền.
- **Sau khi bếp đã nhận đơn hoặc bắt đầu nấu:**
  - Khách không được tự ý hủy/chỉnh sửa trực tiếp các món đang vận hành. Chỉ Quản lý mới có quyền xử lý ngoại lệ như đổi món tương đương, bỏ món và hoàn một phần, hoặc remake theo tình huống thực tế.
  - Với Dine-in, món gọi thêm sau thời điểm này được tạo thành **đơn mới** gắn vào cùng bàn thay vì sửa ngược đơn cũ đang chạy.
- **Phân biệt ghi chú vận hành và chỉnh sửa có tác động tài chính:**
  - **Ghi chú nhỏ không đổi giá / không đổi nguyên liệu chính** (ví dụ: "ít cay", "không hành", "không thêm đá"): FOH/Phục vụ có thể truyền thẳng xuống bếp mà không cần Quản lý phê duyệt, miễn là bếp xác nhận còn kịp thực hiện. Thao tác này vẫn được ghi log gắn với đơn để truy vết.
  - **Chỉnh sửa có tác động tài chính** (đổi món, thêm/bớt topping tính tiền, thay đổi số lượng, bỏ món): bắt buộc đi qua luồng xử lý ngoại lệ do Quản lý phê duyệt như quy định ở trên.
- **Không cho phép self-edit âm thầm sau khi submit:**
  - Sau khi đơn đã gửi, Client WebApp không được tự sửa ngầm làm thay đổi món đang chạy mà không đi qua kiểm soát nghiệp vụ của FOH/Cashier/Quản lý.

### 3f. Quy tắc giao nhầm / bàn giao sai đơn (Wrong Handoff Rules)
- **Báo sự cố ngay khi phát hiện:**
  - Nếu phục vụ giao nhầm bàn, Thu ngân đưa nhầm túi, hoặc xác nhận nhầm khách nhận hàng, nhân viên phải gắn cờ sự cố ngay để Quản lý/FOH xử lý.
- **Sửa sai trạng thái hoàn tất:**
  - Nếu nhân viên lỡ bấm `Completed` nhưng khách **chưa thực sự nhận đúng đơn**, Quản lý hoặc FOH được phép chỉnh đơn từ `Completed` quay lại `Ready` trong cùng ca làm việc, kèm lý do và audit log.
- **Xử lý hậu quả vận hành:**
  - Nếu khách khác đã nhận hoặc mang nhầm đơn đi, Quản lý quyết định remake, hoàn tiền, hoàn một phần, hoặc ghi nhận thất thoát nội bộ tùy tình huống; hệ thống không được coi đây là một giao dịch kết thúc "bình thường" chỉ vì nhân viên đã bấm hoàn tất trước đó.

### 3g. Quy tắc chốt ca và đối soát cuối ngày (Shift Close & Reconciliation Rules)
- **Điều kiện rà soát trước khi chốt ca:**
  - Trước khi Thu ngân/Quản lý chốt ca, hệ thống phải cảnh báo hoặc chặn xác nhận cuối nếu còn các trạng thái bất thường chưa được xử lý dứt điểm.
- **Mở ca và quản lý két tiền:**
  - Mỗi ca Thu ngân phải có người phụ trách, thời gian mở ca, số tiền đầu ca, và thiết bị/quầy đang sử dụng. Thu ngân không được ghi nhận tiền mặt vào ca đã đóng.
  - Khi đóng ca, Thu ngân nhập số tiền mặt thực đếm. Hệ thống so sánh với tiền mặt dự kiến theo đơn đã thanh toán, hoàn tiền thủ công, write-off, và các khoản điều chỉnh trong ca.
  - Chênh lệch tiền mặt bắt buộc nhập lý do và cần Quản lý xác nhận nếu vượt ngưỡng cấu hình.
- **Các trạng thái cần review:**
  - `Pending Online Payment` đã quá thời gian giữ đơn nhưng chưa được hủy.
  - `Ready` quá lâu chưa giao / chưa nhận.
  - `Refund Pending` chưa hoàn tất.
  - `Write-off` chưa có xác nhận Quản lý.
  - Sự cố giao nhầm / hoàn tiền phần chênh lệch / thu trùng chưa đóng hồ sơ.
- **Mục tiêu đối soát:**
  - Cuối ca phải phân biệt rõ đơn đã thu tiền hợp lệ, đơn hoàn tiền, đơn thất thoát nội bộ, và đơn bị khách bỏ thanh toán để báo cáo doanh thu không bị sai lệch.
- **Đối soát theo phương thức thanh toán:**
  - Báo cáo chốt ca phải tách tiền mặt, QR chuyển khoản ngân hàng xác nhận thủ công, cổng thanh toán online, hoàn tiền, thu trùng, write-off, `Comp`, và `Forfeited`.
  - QR chuyển khoản ngân hàng không được coi là đã đối soát hoàn toàn nếu chưa có bằng chứng xác nhận của Thu ngân/Quản lý trong ca.
- **Phân bổ sự kiện tài chính theo ca (Shift-span attribution)** *(ADR-026)*:
  - Mô hình ca của baseline hỗ trợ **multi-shift-per-day**; quán nhỏ chạy một-ca-một-ngày là trường hợp đặc biệt của cùng mô hình.
  - Mỗi sự kiện tài chính được gán vào ca theo **timestamp của chính sự kiện đó**, không phải thời điểm tạo đơn:
    - Hoàn thành thanh toán (`Paid`) → ca đang mở tại thời điểm chuyển sang `Paid`.
    - Di chuyển két tiền → ca đang mở tại thời điểm giao dịch két.
    - Hoàn tiền hoàn tất (`Refunded`) → ca đang mở tại thời điểm refund **hoàn tất** (không phải khi tạo yêu cầu).
    - `Write-off` / `Comp` / `Forfeited` xác nhận → ca đang mở tại thời điểm Quản lý xác nhận.
  - Đơn tạo ở một ca nhưng phát sinh sự kiện tài chính ở ca khác (ví dụ: Dine-in gọi 22:30, thanh toán 00:45) ghi doanh thu vào ca chứa thanh toán.
- **Bàn giao ngoại lệ giữa các ca (Inherited exceptions)** *(ADR-026)*:
  - Một ca không được chốt nếu vẫn còn các trạng thái ngoại lệ chưa xử lý **thuộc ca đó**. Nếu không xử lý kịp, người chốt ca phải bàn giao rõ ràng bằng ghi chú audit, và các case này hiện ở màn hình mở ca kế tiếp như "inherited exceptions".
  - Danh sách exception bàn giao được giới hạn trong tập sau, không phải mọi in-flight state:
    - `Refund Pending` chưa hoàn tất.
    - Takeaway/Pickup quá hạn chờ Quản lý quyết định (hold / remake / refund / `Forfeited`).
    - `Write-off` đã đề xuất nhưng chưa có Quản lý xác nhận.
    - `Forfeited` đã đề xuất nhưng chưa có Quản lý xác nhận.
    - Dine-in `Completed + Unpaid` chưa được chốt thanh toán.
- **Báo cáo theo ngày:**
  - Báo cáo cuối ngày là aggregation thuần các ca trong ngày. Mỗi sự kiện đã thuộc đúng một ca, nên không cần logic phân bổ lại ở cấp ngày.

### 3h. Quy tắc khuyến mãi (Promotion Rules)
- **Điều kiện áp dụng mã:**
  - Mã giảm giá phải có thời hạn hiệu lực, loại giảm giá (`%` hoặc số tiền cố định), điều kiện tối thiểu nếu có, và trạng thái `Active/Inactive`.
  - Hệ thống phải kiểm tra mã trước khi thanh toán và không cho áp dụng mã đã hết hạn, bị tắt, sai điều kiện, hoặc vượt giới hạn sử dụng.
- **Giới hạn sử dụng:**
  - Mỗi mã có thể có giới hạn tổng lượt dùng, giới hạn theo khách, hoặc giới hạn theo ngày/khung giờ. Với Guest, giới hạn theo khách được kiểm tra bằng số điện thoại.
- **Cộng dồn khuyến mãi:**
  - Mặc định không cho cộng dồn nhiều mã trên cùng một đơn. Nếu sau này cho cộng dồn, rule phải được cấu hình rõ theo từng loại mã.
- **Hủy đơn và lượt dùng mã:**
  - Nếu đơn bị hủy trước khi bếp nhận và không ghi nhận doanh thu, hệ thống trả lại lượt dùng mã nếu chính sách mã cho phép. Nếu đơn đã được phục vụ hoặc chỉ hoàn tiền một phần, Quản lý quyết định có khôi phục lượt mã hay không.
- **Audit khuyến mãi:**
  - Mọi thao tác tạo/sửa/tắt mã giảm giá và mọi lần áp mã thành công/thất bại phải lưu lịch sử để Quản lý kiểm tra doanh thu bị giảm do khuyến mãi.

### 3i. Quy tắc khiếu nại, remake và bồi hoàn dịch vụ (Complaint / Remake Rules)
- **Phân loại khiếu nại:**
  - Khi khách báo thiếu món, sai món, món lỗi, giao nhầm, hoặc trải nghiệm không đạt, FOH phải ghi nhận loại sự cố, đơn liên quan, món liên quan, và mô tả ngắn.
- **Phương án xử lý:**
  - Quản lý hoặc FOH theo quyền được cấp có thể chọn remake, đổi món tương đương, giảm giá thiện chí, hoàn tiền một phần, hoàn tiền toàn phần, `Comp` toàn đơn (miễn phí chủ động, xem §3n), hoặc ghi nhận thất thoát nội bộ (`Write-off`) nếu phù hợp ngữ cảnh.
- **Không tạo doanh thu giả:**
  - Món remake không được tạo doanh thu mới nếu chỉ là sửa lỗi phục vụ cho đơn cũ. Nếu khách gọi thêm món mới ngoài khiếu nại, phải tạo đơn mới.
- **Liên kết với đánh giá:**
  - Khi khiếu nại đã được xử lý, hệ thống vẫn cho khách đánh giá nếu khách là Registered Customer và còn trong hạn đánh giá; dữ liệu khiếu nại giúp giải thích điểm đánh giá thấp.

### 3j. Quy tắc sự cố vận hành và khôi phục thủ công (Operational Outage Rules)
- **Mất KDS hoặc máy in bếp:**
  - Nếu KDS hoặc máy in bếp lỗi, FOH/Kitchen chuyển sang phiếu thủ công tạm thời. Khi hệ thống hoạt động lại, nhân viên phải đối chiếu đơn đã xử lý thủ công để tránh nấu trùng hoặc bỏ sót.
- **Mất mạng hoặc cổng thanh toán lỗi:**
  - Đơn bắt buộc trả trước không được xuống bếp nếu chưa có bằng chứng thanh toán hợp lệ. Với Dine-in, quán có thể tiếp tục phục vụ theo quy trình nội bộ nhưng phải ghi nhận trạng thái chưa đồng bộ để đối soát sau.
- **Khôi phục sau sự cố:**
  - Khi hệ thống hoạt động lại, Quản lý/Thu ngân review danh sách đơn ở trạng thái bất thường (`Pending`, `Ready`, `Paid but not sent to kitchen`, `Manual ticket`) và đóng từng case bằng lý do rõ ràng.

### 3k. Quy tắc quyền quản lý và audit thao tác nhạy cảm (Manager Override & Audit Rules)
- **Thao tác bắt buộc có lý do:**
  - Các thao tác hủy đơn đã thanh toán, hoàn tiền, hoàn tiền một phần, `Write-off`, `Comp` (miễn phí chủ động, §3n), `Forfeited` (giữ tiền no-show, §3c), giảm giá đặc biệt, sửa đơn sau khi bếp nhận, sửa trạng thái `Completed`, và xác nhận chênh lệch tiền mặt đều phải nhập lý do.
- **Thông tin audit bắt buộc:**
  - Log phải lưu người thao tác, vai trò, thời gian, đơn/món liên quan, giá trị tiền bị ảnh hưởng, lý do, và người phê duyệt nếu có.
- **Không xóa dấu vết:**
  - Không được hard-delete audit log của thao tác tài chính/vận hành nhạy cảm. Nếu cần sửa ghi chú, hệ thống tạo bản ghi bổ sung thay vì ghi đè im lặng.

### 3l. Quy tắc hóa đơn và chứng từ (Receipt / Invoice Rules)
- **In và in lại hóa đơn:**
  - Hệ thống cho phép in hóa đơn sau khi thanh toán. In lại hóa đơn phải hiển thị là bản in lại hoặc lưu log số lần in lại để tránh nhầm lẫn.
- **Hủy/sửa chứng từ:**
  - Nếu hóa đơn đã in nhưng đơn bị hoàn tiền/hủy sau đó, hệ thống phải lưu liên kết giữa hóa đơn gốc và chứng từ điều chỉnh/ghi chú hoàn tiền.
- **Thông tin VAT/tax nếu có:**
  - Nếu khách yêu cầu thông tin xuất hóa đơn VAT/tax, Thu ngân ghi nhận tên đơn vị, mã số thuế, địa chỉ/email nhận hóa đơn theo mức prototype yêu cầu. Việc tích hợp hóa đơn điện tử thật chỉ là extension nếu chưa được promote.

### 3m. Quy tắc tồn kho nhẹ (Inventory-Lite Rules)
- **Low-stock và 86'd:**
  - Inventory-lite chỉ nhằm hỗ trợ vận hành quán nhỏ: cảnh báo nguyên liệu/món sắp hết, đánh dấu 86'd, và ghi chú lý do hết hàng.
- **Điều chỉnh thủ công:**
  - Quản lý/Bếp có thể ghi nhận stock adjustment thủ công cho hư hỏng, hao hụt, nhập thêm tạm thời, hoặc kiểm kê cuối ngày. Mỗi adjustment cần lý do và người ghi nhận.
- **Không phải procurement đầy đủ:**
  - Baseline final không bao gồm quy trình mua hàng nhà cung cấp, công nợ, hay tự động trừ nguyên liệu theo công thức chi tiết trừ khi có quyết định mở rộng scope.
- **Quan hệ giữa 86'd và stock adjustment:**
  - `86'd` (flag khả dụng do Bếp bật ở §4 KDS) và `stock adjustment` (điều chỉnh tồn kho thủ công do Quản lý/Bếp ở §3m) là **hai cơ chế độc lập** trong baseline final. Stock adjustment về 0 không tự động bật 86'd, và tắt 86'd không tự động cộng lại stock. Việc đồng bộ hai cơ chế là trách nhiệm của nhân viên vận hành. Tự động hóa hai chiều giữa chúng nằm ngoài baseline và chỉ được mở qua ADR.

### 3n. Quy tắc miễn phí đơn chủ động (Comp / Voided-by-Management Rules)
*(ADR-023)*
- **Khi nào dùng `Comp`:**
  - Khi quán **chủ động** quyết định không thu tiền một đơn hàng vì lý do thiện chí, lỗi nghiêm trọng đã phát sinh chi phí (nấu hỏng món, giao nhầm rồi phải remake), VIP treatment, hoặc sự cố an toàn thực phẩm.
  - Khác với `Write-off` (khách tự bỏ đi không trả), `Comp` là quyết định **có ý chí của quán**.
  - Khác với `Cancelled` (hủy trước khi phục vụ, không có chi phí), `Comp` áp dụng khi đã có chi phí thực phẩm.
- **Đơn đủ điều kiện `Comp`:**
  - Cho phép trên đơn ở `Cooking`, `Ready`, hoặc `Completed`.
  - Không áp dụng cho đơn ở `Pending Confirmation` (chưa bếp nhận) — trường hợp này dùng `Cancelled` thay thế.
- **Quyền phê duyệt:**
  - Chỉ Quản lý được phê duyệt `Comp`, kèm lý do bắt buộc. Thu ngân và Bếp không được tự ý miễn phí đơn. Tuân theo §3k Manager Override & Audit.
- **Tác động tài chính:**
  - Nếu đơn **chưa thanh toán** (`Unpaid`): `payment_status` chuyển sang `Comp` trực tiếp; không ghi nhận doanh thu; chi phí thực phẩm được ghi nhận thành "comp expense" trên báo cáo.
  - Nếu đơn **đã thanh toán** (`Paid`): `payment_status` đi qua `Refund Pending` → `Refunded`, số tiền thu được reclassify thành comp expense thay vì doanh thu thường.
- **Báo cáo:**
  - Comp được tách riêng trên báo cáo chốt ca và cuối ngày, không gộp chung với `Write-off`, `Refunded`, hay doanh thu thường.

### 4. Quy tắc Màn hình Bếp (Kitchen Display System - KDS)
- **FIFO (First In, First Out):** Đơn vào trước được đẩy lên màn hình trước.
- **Gom đơn / Nấu theo mẻ (Batch Cooking & Updates):**
  - Bếp không bị ép buộc bấm nút hoàn thành cho "từng bát mì đơn lẻ".
  - Hệ thống KDS cho phép gom các món giống nhau từ nhiều order khác nhau để cập nhật theo mẻ và giải phóng hàng đợi nhanh nhất.
- **Cảnh báo hết nguyên liệu (86'd Items):**
  - Nếu hết nước lèo/hết hoành thánh hoặc nguyên liệu chính, Bếp chỉ cần 1 thao tác (Báo hết nguyên liệu - 86'd).
  - Hệ thống lập tức khóa món đó trên toàn bộ Client WebApp và màn hình Thu ngân để khách không order thêm được nữa.
- **86'd ảnh hưởng các đơn đã tồn tại:**
  - 86'd không chỉ khóa món cho **đơn tương lai**. Nếu món đó đã xuất hiện trong đơn đang chờ hoặc đơn đã thanh toán nhưng chưa nấu xong, hệ thống phải gắn cờ order issue để FOH/Quản lý quyết định đổi món, hoàn một phần, hoặc hủy cả đơn trước khi tiếp tục.
- **Chống đẩy phiếu bếp trùng:**
  - Một đơn hợp lệ chỉ được sinh **một** ticket bếp logic cho mỗi lần xác nhận thanh toán hợp lệ. Callback thanh toán lặp lại, refresh màn hình, hoặc reconnect không được tạo thêm phiếu bếp trùng cho cùng một đơn.

### 5. Quy tắc Đánh giá đơn hàng (Review & Rating Rules)
- **Quyền đánh giá:**
  - Chỉ Khách hàng Thành viên (Registered Customer) mới được phép đánh giá. Khách vãng lai (Guest) không có tài khoản để gắn đánh giá.
- **Hạn đánh giá:**
  - Khách chỉ được phép đánh giá trong vòng **7 ngày** kể từ khi đơn hàng chuyển sang trạng thái `Completed`. Quá 7 ngày, nút "Đánh giá" sẽ bị vô hiệu hóa.
- **Tiêu chí đánh giá:**
  - 3 tiêu chí bắt buộc chấm sao (1-5): **Chất lượng món ăn / Tốc độ phục vụ / Trải nghiệm chung**.
  - Nhận xét văn bản là tùy chọn, tối đa **500 ký tự**.
- **Lọc nội dung không phù hợp:**
  - Hệ thống tự động kiểm tra và ẩn các đánh giá chứa từ ngữ tục tĩu, spam, hoặc nội dung vi phạm chính sách (keyword-based filter).
  - **Hạn chế đã biết:** Keyword-based filter có độ chính xác hạn chế với tiếng Việt do biến thể viết tắt, teen code và cách viết né từ khóa. Ở giai đoạn prototype/demo, hệ thống sử dụng danh sách từ cấm cơ bản; phiên bản production có thể nâng cấp lên ML-based content moderation.
- **Giới hạn:**
  - Mỗi đơn hàng chỉ được đánh giá **1 lần**. Không cho phép sửa hoặc xóa sau khi đã gửi.

### 6. Quy tắc Thông báo (Notification Rules)
- **Real-time (Thời gian thực):**
  - Thông báo **in-app cho client đang kết nối** phải được đẩy trong vòng **<= 3 giây** kể từ khi trạng thái đơn thay đổi, qua kênh WebSocket/SSE (theo NFR-06).
- **Kênh thông báo:**
  - **In-app:** Popup/toast notification ngay trên Client WebApp và Admin WebApp.
  - **Âm thanh:** Phát âm thanh cảnh báo kèm popup, đặc biệt quan trọng cho KDS màn hình Bếp và POS Thu ngân.
  - **Push notification trình duyệt:** Hỗ trợ Web Push API cho trình duyệt Chrome/Safari/Firefox khi khách cho phép. Đây là kênh **best-effort** để nhắc lại khi app không mở foreground, không phải kênh bị ràng buộc SLA `<= 3 giây`.
- **Lịch sử thông báo (🔔):**
  - Tất cả thông báo được lưu trong lịch sử; khách có thể xem lại danh sách thông báo cũ bằng cách nhấn biểu tượng 🔔 trên thanh header.
- **Đồng bộ khi mất kết nối:**
  - Nếu client bị mất kết nối (network drop), khi kết nối lại, hệ thống tự động đẩy lại toàn bộ thông báo bị lỡ (missed notifications) theo thứ tự thời gian.
- **Các sự kiện trigger thông báo:**
  - Đơn mới được tạo -> Thông báo cho Thu ngân/Bếp.
  - Trạng thái đơn thay đổi (`Cooking`, `Ready`, `Completed`, `Cancelled`) -> Thông báo cho Khách hàng.
  - Đơn `Ready` -> Thông báo cho Nhân viên Phục vụ nếu là Dine-in, hoặc cho Thu ngân nếu là Takeaway/Pickup.
  - Món hết nguyên liệu (86'd) -> Thông báo cho Thu ngân và khóa món trên Client WebApp/POS.
  - Đơn bị hủy -> Thông báo cho Khách + Bếp + Thu ngân.
