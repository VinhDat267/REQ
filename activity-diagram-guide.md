# Activity Diagram (UML) Guide

**Phiên bản:** 1.0
**Mục tiêu:** Tài liệu chuẩn để dùng làm nguồn chính cho người học hoặc AI Agent khi phân tích và vẽ **Activity Diagram (AD)** đúng chuẩn UML.
**Ngôn ngữ:** Tiếng Việt
**Phạm vi:** Tập trung vào bản chất, ký hiệu chuẩn UML, quy trình vẽ, quy tắc chất lượng, lỗi thường gặp, và checklist đánh giá.

---

# 1. Mục đích của tài liệu này

Tài liệu này dùng để:

- Giải thích **Activity Diagram là gì** và dùng khi nào.
- Chuẩn hóa cách hiểu về **node, edge, flow, guard, parallelism, swimlane**.
- Đưa ra **quy trình vẽ Activity Diagram chuẩn UML**.
- Đưa ra **quy tắc bắt buộc** để AI Agent hoặc người học tuân theo.
- Tránh nhầm lẫn giữa **Activity Diagram** với **flowchart** hoặc giữa các ký hiệu UML gần giống nhau.

> Mục tiêu cuối cùng: sau khi dùng guide này, người vẽ phải có khả năng tạo ra một Activity Diagram **đúng semantics UML, dễ đọc, nhất quán, và có giá trị phân tích**.

---

# 2. Activity Diagram là gì?

## 2.1 Định nghĩa ngắn gọn

**Activity Diagram (AD)** là sơ đồ hành vi trong UML dùng để mô tả **luồng hoạt động (workflow)** của một quy trình, một use case, hoặc một nghiệp vụ. Nó thể hiện:

- bước nào xảy ra trước
- bước nào là lựa chọn rẽ nhánh
- bước nào chạy song song
- bước nào đồng bộ lại
- dữ liệu nào đi qua giữa các bước
- ai hoặc thành phần nào chịu trách nhiệm cho từng bước

## 2.2 Bản chất thật sự của Activity Diagram

Activity Diagram không chỉ là “sơ đồ các bước”. Về bản chất, nó mô tả:

- **Control flow**: luồng điều khiển giữa các bước
- **Data flow / object flow**: luồng dữ liệu giữa các bước
- **Decision logic**: điều kiện rẽ nhánh
- **Concurrency**: xử lý song song
- **Responsibility**: trách nhiệm xử lý theo actor/system/department thông qua swimlane

## 2.3 Activity Diagram khác gì flowchart?

Flowchart thường chỉ mô tả quy trình một cách trực quan. Activity Diagram là mô hình UML có ngữ nghĩa chặt chẽ hơn:

- có phân biệt rõ **action**, **control node**, **object node**
- có semantics rõ giữa **decision** và **merge**
- có semantics rõ giữa **fork** và **join**
- có khái niệm **activity final** và **flow final**
- có thể biểu diễn **parallel execution** và **data flow** một cách chuẩn hóa

**Kết luận:** AD không phải flowchart vẽ bằng ký hiệu đẹp hơn; nó là mô hình hành vi chuẩn UML.

---

# 3. Khi nào nên dùng Activity Diagram?

Dùng Activity Diagram khi bạn cần mô tả:

- luồng xử lý của một **Use Case**
- một **Business Process**
- một **workflow nội bộ của hệ thống**
- luồng thao tác có nhiều **rẽ nhánh, điều kiện, loop, hoặc song song**
- trách nhiệm giữa nhiều vai trò như **User / System / Admin / External Service**

## 3.1 Trường hợp phù hợp

- Login
- Register
- Place Order
- Create In-Store Order
- Manage Tables
- Borrow Book
- Process Payment
- Approve Leave Request

## 3.2 Trường hợp không phù hợp hoặc không tối ưu

- mô tả cấu trúc lớp → nên dùng **Class Diagram**
- mô tả tương tác message giữa object → nên dùng **Sequence Diagram**
- mô tả actor và chức năng hệ thống → nên dùng **Use Case Diagram**
- mô tả toàn bộ hệ thống ở mức quá rộng → cần tách thành nhiều activity nhỏ

---

# 4. Các thành phần cốt lõi của Activity Diagram

Trong UML, Activity Diagram gồm ba nhóm chính:

- **Executable nodes**: nơi thực hiện xử lý, quan trọng nhất là **Action**
- **Control nodes**: nơi điều phối luồng
- **Object nodes**: nơi biểu diễn dữ liệu hoặc đối tượng đi qua quy trình

---

# 5. Các node chuẩn UML cần biết

## 5.1 Initial Node

### Ý nghĩa
Điểm bắt đầu của Activity.

### Ký hiệu
Hình tròn đen đặc.

### Quy ước render
- Phải render thành **một hình tròn đen đặc**.
- Không dùng style override làm Initial Node chuyển thành hình tròn trắng.

### Lưu ý
- Gần như mọi Activity Diagram nên có ít nhất một Initial Node.
- Một activity có thể có nhiều initial node nếu có lý do mô hình hóa phù hợp.

---

## 5.2 Action

### Ý nghĩa
Một bước xử lý cụ thể trong activity.

### Ký hiệu
Hình chữ nhật bo góc.

### Quy tắc đặt tên
Dùng dạng:

- **Động từ + bổ ngữ**

Ví dụ tốt:

- Enter credentials
- Validate order
- Check availability
- Calculate total
- Display result
- Create order
- Update inventory

Ví dụ không tốt:

- Login page
- Order
- Database
- Information
- Screen

### Nguyên tắc
Một action nên thể hiện **một hành động có ý nghĩa**. Không nên gộp quá nhiều việc vào một action.

Ví dụ không tốt:

- Validate order, calculate total, process payment, send email

Ví dụ tốt hơn:

- Validate order
- Calculate total
- Process payment
- Send confirmation email

---

## 5.3 Activity Final Node

### Ý nghĩa
Kết thúc **toàn bộ activity**.

### Ký hiệu
Hình tròn đen có vòng tròn bao ngoài.

### Quy ước render
- Phải render đúng chuẩn UML: **vòng tròn ngoài màu trắng, viền đen, bên trong là hình tròn đen**.
- Không rút gọn thành một hình tròn đen đặc vì như vậy sẽ bị lẫn với **Initial Node**.

### Dùng khi nào
Khi muốn nói rằng quy trình kết thúc hoàn toàn tại đây.

---

## 5.4 Flow Final Node

### Ý nghĩa
Chỉ kết thúc **một nhánh flow hiện tại**, không kết thúc toàn bộ activity.

### Ký hiệu
Hình tròn có dấu **X** bên trong.

### Dùng khi nào
Khi một nhánh lỗi hoặc một nhánh phụ dừng lại, nhưng những flow khác vẫn có thể tiếp tục.

### Điểm dễ nhầm
- **Activity Final** = dừng cả sơ đồ
- **Flow Final** = dừng một nhánh

---

## 5.5 Decision Node

### Ý nghĩa
Rẽ nhánh dựa trên điều kiện.

### Ký hiệu
Hình thoi.

### Đặc điểm điển hình
- 1 luồng vào
- nhiều luồng ra
- các luồng ra có **guard condition**

### Ví dụ
Sau action `Validate payment`, decision có thể có:

- `[valid]`
- `[invalid]`

### Nguyên tắc quan trọng
- Guard phải gắn trên **edge đi ra** của decision.
- Nên thiết kế để **chỉ một guard đúng** tại một thời điểm.
- Có thể dùng `[else]` cho nhánh mặc định.

---

## 5.6 Merge Node

### Ý nghĩa
Gộp các **nhánh thay thế (alternative flows)** lại thành một luồng.

### Ký hiệu
Cũng là hình thoi.

### Đặc điểm điển hình
- nhiều luồng vào
- 1 luồng ra

### Cảnh báo quan trọng
Merge **không dùng để đồng bộ các nhánh song song**.
Nếu cần đồng bộ các nhánh song song, phải dùng **Join Node**.

### Cách nhớ nhanh
- **Decision**: 1 vào, nhiều ra
- **Merge**: nhiều vào, 1 ra

---

## 5.7 Fork Node

### Ý nghĩa
Tách một flow thành nhiều flow **song song**.

### Ký hiệu
Thanh đen dày.

### Đặc điểm điển hình
- 1 luồng vào
- nhiều luồng ra

### Ví dụ
Sau `Approve order`, hệ thống có thể đồng thời:

- Send confirmation email
- Reserve inventory
- Notify warehouse

---

## 5.8 Join Node

### Ý nghĩa
Đồng bộ nhiều flow song song thành một luồng tiếp tục.

### Ký hiệu
Thanh đen dày.

### Đặc điểm điển hình
- nhiều luồng vào
- 1 luồng ra

### Nguyên tắc
Mặc định, Join chỉ cho đi tiếp khi **tất cả các nhánh cần thiết đã hoàn thành**.

### Cách nhớ nhanh
- **Fork** = tách song song
- **Join** = chờ các nhánh song song xong rồi mới đi tiếp

---

## 5.9 Object Node

### Ý nghĩa
Biểu diễn dữ liệu/đối tượng đi qua hoạt động.

### Ký hiệu
Hình chữ nhật.

### Ví dụ
- Order
- Invoice
- Payment Info
- Credentials

### Khi nào nên dùng
Dùng khi dữ liệu có vai trò quan trọng trong logic và bạn muốn thể hiện input/output rõ ràng.

### Khi nào không cần lạm dụng
Nếu mục tiêu chỉ là mô tả quy trình nghiệp vụ ở mức cao, không cần gắn object node cho mọi dữ liệu nhỏ.

---

## 5.10 Activity Partition / Swimlane

### Ý nghĩa
Phân chia sơ đồ theo trách nhiệm thực hiện.

### Ví dụ phổ biến
- Customer / System
- Receptionist / POS System / Kitchen
- Student / Lecturer / Registration System
- Buyer / Seller / Payment Gateway

### Lợi ích
- Làm rõ ai làm gì
- Giúp đọc sơ đồ dễ hơn
- Rất hữu ích trong bài BA, REQ, UML, tutorial, assignment

### Lưu ý
Swimlane biểu diễn **trách nhiệm**, không phải trình tự thời gian.

---

# 6. Các edge trong Activity Diagram

## 6.1 Control Flow

### Ý nghĩa
Mô tả thứ tự thực hiện giữa các node.

### Ký hiệu
Đường mũi tên.

### Ví dụ
`Validate order -> Calculate total -> Process payment`

---

## 6.2 Object Flow

### Ý nghĩa
Mô tả luồng dữ liệu hoặc object từ bước này sang bước khác.

### Ví dụ
- `Generate invoice` tạo ra `Invoice`
- `Send invoice` nhận `Invoice`

### Khi nào nên dùng
Khi bạn muốn nhấn mạnh việc dữ liệu được tạo ra, xử lý, hoặc truyền tiếp giữa các bước.

---

# 7. Guard Condition là gì?

**Guard** là điều kiện gắn lên edge, thường dùng ở outgoing edge của Decision Node.

### Cách viết chuẩn
Đặt trong dấu ngoặc vuông:

- `[valid]`
- `[invalid]`
- `[stock > 0]`
- `[approved]`
- `[else]`

### Best practice
- Guard phải rõ nghĩa nghiệp vụ.
- Tránh guard mơ hồ như `[ok]`, `[wrong]`, `[good]`.
- Với Decision, nên thiết kế sao cho các nhánh **loại trừ nhau** hoặc có `[else]` làm nhánh cuối.

---

# 8. Cách vẽ Activity Diagram chuẩn UML

Đây là quy trình nên dùng mặc định.

## Bước 1: Xác định scope chính xác

Mỗi Activity Diagram nên mô tả **một activity hoặc một use case rõ ràng**.

Ví dụ tốt:

- Login
- Checkout
- Create In-Store Order
- Manage Tables

Ví dụ quá rộng:

- E-commerce System
- Library System
- Restaurant Management System

Nếu scope quá rộng, phải tách thành nhiều sơ đồ.

---

## Bước 2: Viết luồng chữ trước khi vẽ

Trước khi chạm vào PlantUML hay draw.io, hãy viết flow text:

1. User enters credentials
2. System validates credentials
3. If invalid, display error
4. If valid, create session
5. Display dashboard

Nếu chưa viết rõ luồng chữ, vẽ sơ đồ thường sẽ rối và sai.

---

## Bước 3: Xác định loại bước

Hãy gán từng bước vào đúng loại:

- bước xử lý → **Action**
- if/else → **Decision**
- nhập lại luồng thay thế → **Merge**
- chạy đồng thời → **Fork**
- chờ đồng thời hoàn tất → **Join**
- dữ liệu quan trọng → **Object Node**
- phân vai → **Swimlane**

---

## Bước 4: Đặt Initial Node và Final Node

- bắt đầu → **Initial Node**
- kết thúc toàn bộ → **Activity Final**
- kết thúc một nhánh → **Flow Final**

Phải chọn đúng loại kết thúc.

---

## Bước 5: Nối các bước theo control flow chính

Thường nên bố trí:

- trên xuống dưới, hoặc
- trái sang phải

Giữ một hướng đọc nhất quán để sơ đồ rõ ràng.

---

## Bước 6: Thêm guard cho decision

Mỗi nhánh sau Decision nên có guard rõ ràng.

Ví dụ:

- `[available]`
- `[not available]`
- `[payment success]`
- `[payment failed]`

---

## Bước 7: Xem có song song hay không

Nếu trong mô tả có các ý như:

- đồng thời
- cùng lúc
- simultaneously
- in parallel

thì phải cân nhắc dùng **Fork/Join** thay vì vẽ tuần tự giả.

---

## Bước 8: Xem có cần swimlane hay không

Nếu nhiều vai trò cùng tham gia, ví dụ User / System / Admin / External API, nên dùng swimlane để tách trách nhiệm.

---

## Bước 9: Kiểm tra semantics UML lần cuối

Phải rà lại:

- Decision có guard chưa?
- Merge có bị dùng nhầm để đồng bộ song song không?
- Join có dùng đúng chỗ không?
- Flow final và activity final có dùng đúng nghĩa không?
- Action có phải là hành động cụ thể không?

---

# 9. Cách chuyển từ Use Case Specification sang Activity Diagram

Đây là mapping rất thực tế và cực kỳ quan trọng.

## 9.1 Mapping chuẩn

- **Basic Flow** → chuỗi Action nối bằng Control Flow
- **Alternative Flow** → Decision + Guard + Merge
- **Exception Flow** → nhánh lỗi, thường đi đến Flow Final hoặc quay lại bước trước
- **Loop / Retry** → control flow quay lại action phù hợp
- **Concurrent Step** → Fork + Join
- **Input / Output data** → Object Node / Object Flow nếu cần
- **Actor/System responsibility** → Swimlane

## 9.2 Ví dụ: Login

### Use Case text
1. User enters username and password
2. System validates credentials
3. If invalid, system displays error
4. If valid, system creates session
5. System displays dashboard

### Mapping sang AD
- Initial Node
- `Enter credentials`
- `Validate credentials`
- Decision
  - `[invalid]` → `Display error` → Flow Final hoặc loop quay lại nhập
  - `[valid]` → `Create session` → `Display dashboard` → Activity Final

## 9.3 Ví dụ: Place Order

### Use Case text
1. Customer selects items
2. System calculates total
3. Customer confirms order
4. System processes payment
5. If payment fails, show failure
6. If payment succeeds, create order and send confirmation

### Mapping AD chuẩn
- Customer lane: `Select items`, `Confirm order`
- System lane: `Calculate total`, `Process payment`
- Decision sau `Process payment`
  - `[failed]` → `Display failure` → Activity Final hoặc retry loop
  - `[success]` → `Create order`
- Nếu gửi email và cập nhật tồn kho chạy song song:
  - Fork
  - `Send confirmation email`
  - `Update inventory`
  - Join
  - Activity Final

---

# 10. Quy tắc đặt tên action và điều kiện

## 10.1 Tên action

**Chuẩn nên dùng:**
- động từ ở đầu
- ngắn gọn
- mô tả 1 hành động
- dễ hiểu với người đọc nghiệp vụ và kỹ thuật

Ví dụ tốt:
- Enter order details
- Validate request
- Check stock availability
- Generate invoice
- Notify customer

Ví dụ không tốt:
- Order information
- System screen
- Invoice data processing activity
- Handle many things together

## 10.2 Tên guard

**Chuẩn nên dùng:**
- mô tả điều kiện nghiệp vụ
- có tính loại trừ
- đọc vào hiểu logic ngay

Ví dụ tốt:
- `[valid]`
- `[invalid]`
- `[approved]`
- `[rejected]`
- `[table available]`
- `[table unavailable]`
- `[else]`

Ví dụ không tốt:
- `[ok]`
- `[bad]`
- `[1]`
- `[case A]`

---

# 11. Các mẫu cấu trúc Activity Diagram thường gặp

## 11.1 Linear Flow
Luồng đơn giản từ đầu đến cuối, không nhánh, không song song.

**Mẫu:**
Initial → Action → Action → Action → Activity Final

## 11.2 Decision / Alternative Flow
Có if/else.

**Mẫu:**
Action → Decision → nhiều nhánh có guard → Merge → Action tiếp → Final

## 11.3 Loop / Retry
Có bước nhập lại hoặc làm lại.

**Mẫu:**
Action → Decision
- `[retry]` → quay lại Action cũ
- `[continue]` → đi tiếp

## 11.4 Parallel Flow
Có nhiều bước xử lý đồng thời.

**Mẫu:**
Action → Fork → Action A & Action B → Join → Action tiếp → Final

## 11.5 Role-based Workflow với Swimlane
Dùng khi nhiều actor/bộ phận/system tham gia.

**Mẫu:**
- Lane 1: User actions
- Lane 2: System actions
- Lane 3: External service actions

---

# 12. Anti-patterns: những lỗi sai phổ biến cần cấm

## 12.1 Dùng Merge để đồng bộ song song
**Sai.** Merge chỉ gộp alternative flows, không sync concurrency.

## 12.2 Dùng Decision mà không có guard
**Sai hoặc rất kém chất lượng.** Người đọc không biết logic rẽ nhánh.

## 12.3 Gộp quá nhiều việc vào một action
Làm mất ý nghĩa mô hình hóa và giảm khả năng phân tích.

## 12.4 Vẽ action bằng danh từ hoặc tên màn hình
AD mô tả **hành động**, không phải tên UI.

## 12.5 Không phân biệt Flow Final và Activity Final
Đây là lỗi rất phổ biến và làm sai nghĩa của sơ đồ.

## 12.6 Không dùng swimlane khi có nhiều trách nhiệm rõ ràng
Sơ đồ vẫn có thể chạy, nhưng khó đọc, khó chấm, khó bảo vệ.

## 12.7 Mô tả quá nhiều chi tiết code-level
AD không phải nơi để nhét logic if-else của code từng dòng.
Nó nên dừng ở mức workflow/hành vi có ý nghĩa phân tích.

## 12.8 Vẽ một sơ đồ quá lớn ôm cả hệ thống
Một Activity Diagram nên tập trung vào **một process/use case cụ thể**.

---

# 13. Checklist đánh giá một Activity Diagram chuẩn

## 13.1 Checklist ngắn

- [ ] Có đúng phạm vi một use case/process cụ thể không?
- [ ] Có Initial Node không?
- [ ] Có Final Node phù hợp không?
- [ ] Action có đúng dạng hành động không?
- [ ] Decision có guard chưa?
- [ ] Merge có dùng đúng nghĩa chưa?
- [ ] Parallel có dùng Fork/Join đúng chưa?
- [ ] Có cần swimlane không? Nếu cần thì đã dùng chưa?
- [ ] Các luồng có dễ đọc, nhất quán hướng không?
- [ ] Có quá nhiều chi tiết thừa không?

## 13.2 Checklist sâu hơn

- [ ] Từng action có thể giải thích bằng câu “ai làm gì” một cách rõ ràng không?
- [ ] Guard có loại trừ nhau hợp lý không?
- [ ] Nhánh lỗi kết thúc có đúng semantics không?
- [ ] Có lẫn lộn business step với UI artifact không?
- [ ] Sơ đồ có hỗ trợ việc thuyết trình/bảo vệ logic quy trình không?
- [ ] Nếu chuyển từ Use Case Specification, đã phản ánh đầy đủ Basic/Alternative/Exception flows chưa?

---

# 14. Quy tắc dành cho AI Agent khi sinh Activity Diagram

Phần này có thể dùng gần như trực tiếp làm “ruleset” cho AI Agent.

## 14.1 Mục tiêu của AI Agent
AI Agent phải tạo ra Activity Diagram:

- đúng semantics UML
- phản ánh đúng logic nghiệp vụ hoặc use case text
- dễ đọc
- không lẫn với flowchart tự do
- nhất quán về tên action, guard, node type

## 14.2 Quy tắc bắt buộc

1. Mỗi Activity Diagram chỉ mô tả **một use case hoặc một process cụ thể**.
2. Luôn bắt đầu bằng **Initial Node**.
3. Luôn kết thúc bằng **Activity Final** hoặc **Flow Final** đúng semantics.
4. Mỗi bước xử lý phải là **Action** với tên theo dạng **động từ + bổ ngữ**.
5. Mọi rẽ nhánh điều kiện phải dùng **Decision Node** với **guard condition trên outgoing edges**.
6. Nhập lại các nhánh thay thế phải dùng **Merge Node**.
7. Xử lý song song phải dùng **Fork Node** và đồng bộ bằng **Join Node**.
8. Không dùng Merge để thay thế Join.
9. Nếu nhiều actor/system role cùng tham gia, phải cân nhắc dùng **Swimlane**.
10. Chỉ dùng **Object Node / Object Flow** khi dữ liệu có ý nghĩa phân tích rõ ràng.
11. Không gộp nhiều bước nghiệp vụ lớn vào một Action.
12. Không dùng tên màn hình, tên form, tên database làm tên action nếu đó không phải hành động.
13. Sơ đồ phải đọc được theo hướng nhất quán: trên xuống dưới hoặc trái sang phải.
14. Nếu có luồng lỗi/ngoại lệ, phải thể hiện rõ bằng nhánh riêng.
15. Nếu có loop/retry, phải nối lại đúng bước cần lặp.

## 14.3 Quy trình AI Agent nên làm trước khi vẽ

1. Đọc mô tả use case hoặc process text.
2. Tách các bước thành danh sách action tuần tự.
3. Đánh dấu chỗ nào là:
   - điều kiện
   - ngoại lệ
   - loop
   - song song
   - dữ liệu quan trọng
   - actor/system boundary
4. Chọn có dùng swimlane hay không.
5. Sinh Activity Diagram theo UML node semantics.
6. Tự kiểm tra bằng checklist.

## 14.4 Điều AI Agent không được làm

- Không biến mọi câu trong use case thành action máy móc mà không phân tích semantics.
- Không dùng một hình thoi cho mọi mục đích mà không phân biệt Decision/Merge.
- Không vẽ song song bằng hai mũi tên rời mà không dùng Fork/Join.
- Không kết thúc mọi nhánh bằng Activity Final nếu chỉ là lỗi cục bộ.
- Không dùng action quá dài, quá mơ hồ, hoặc mang tính code-level.

---

# 15. Khung phân tích nhanh trước khi vẽ AD

Khi nhận một Use Case Specification, hãy phân tích theo mẫu sau:

## 15.1 Scope
- Tên use case/process là gì?
- Bắt đầu từ đâu?
- Kết thúc khi nào?

## 15.2 Main Flow
- Các action chính theo thứ tự là gì?

## 15.3 Alternative Flow
- Có if/else ở đâu?
- Có nhánh thành công/thất bại ở đâu?

## 15.4 Exception Flow
- Có lỗi đầu vào?
- Có timeout?
- Có external service fail?

## 15.5 Concurrency
- Có bước nào chạy song song không?

## 15.6 Responsibility
- Những ai hoặc subsystem nào tham gia?
- Có cần swimlane không?

## 15.7 Data
- Có object/dữ liệu nào cần thể hiện không?

---

# 16. Mẫu chuẩn rất ngắn để tham chiếu

## 16.1 Login

- Initial
- Enter credentials
- Validate credentials
- Decision
  - `[invalid]` → Display error → Flow Final hoặc loop
  - `[valid]` → Create session → Display dashboard → Activity Final

## 16.2 Place Order

- Initial
- Select items
- Calculate total
- Confirm order
- Process payment
- Decision
  - `[failed]` → Display payment failure → Activity Final hoặc retry
  - `[success]` → Create order → Fork
    - Send confirmation email
    - Update inventory
  → Join → Activity Final

---

# 17. Hướng dẫn mức chi tiết phù hợp

Một sơ đồ Activity Diagram tốt nên ở mức:

- đủ chi tiết để hiểu logic nghiệp vụ
- nhưng không đi sâu đến từng dòng code

## 17.1 Nên thể hiện
- các bước xử lý chính
- các điểm rẽ nhánh nghiệp vụ
- các nhánh lỗi quan trọng
- song song nếu có
- vai trò thực hiện nếu cần

## 17.2 Không nên thể hiện quá mức
- từng lệnh SQL
- từng method nhỏ trong code
- từng thành phần UI phụ không có giá trị phân tích
- từng thao tác framework nội bộ không quan trọng với nghiệp vụ

---

# 18. Tiêu chuẩn chất lượng của một AD tốt

Một Activity Diagram chất lượng cao cần đạt:

## 18.1 Đúng
- đúng use case text hoặc nghiệp vụ gốc
- đúng semantics UML

## 18.2 Rõ
- dễ đọc
- tên action nhất quán
- guard rõ ràng

## 18.3 Gọn
- không nhồi nhét chi tiết thừa
- không quá nhiều action mơ hồ

## 18.4 Có thể bảo vệ
Người trình bày có thể giải thích:
- tại sao dùng Decision ở đây
- tại sao cần Fork/Join
- tại sao nhánh lỗi dùng Flow Final hay quay lại bước trước
- tại sao chia swimlane như vậy

---

# 19. Kết luận cốt lõi cần nhớ

Nếu chỉ nhớ những ý quan trọng nhất, hãy nhớ 10 dòng này:

1. Activity Diagram mô tả **workflow hành vi** của process/use case.
2. Action là **hành động cụ thể**, không phải danh từ mơ hồ.
3. Initial Node là điểm bắt đầu.
4. Activity Final kết thúc toàn bộ activity.
5. Flow Final chỉ kết thúc một nhánh.
6. Decision dùng để rẽ nhánh theo điều kiện.
7. Merge dùng để nhập lại các nhánh thay thế.
8. Fork dùng để tách song song.
9. Join dùng để đồng bộ song song.
10. Swimlane dùng để thể hiện trách nhiệm của actor/role/system.

---

# 20. Reference nền tảng

Tài liệu này được biên soạn dựa trên tinh thần và ký hiệu của UML Activity Diagram trong UML 2.5.1, kết hợp với best practices thực tế khi phân tích use case và workflow.

Nguồn nền tảng nên tham khảo thêm:

- OMG Unified Modeling Language (UML) Version 2.5.1 Specification
- Tài liệu UML của các công cụ mô hình hóa như MagicDraw / Cameo / Visual Paradigm
- Tài liệu môn học về Software Requirements Analysis, UML, Software Engineering

---

# 21. Cách dùng guide này cho AI Agent

Bạn có thể dùng tài liệu này theo một trong ba cách:

## Cách 1: Làm nguồn chính duy nhất
Dùng toàn bộ file này làm “ground rules” cho AI Agent khi sinh Activity Diagram.

## Cách 2: Làm checklist kiểm định
Sau khi AI Agent vẽ xong, dùng các mục:
- Section 12: Anti-patterns
- Section 13: Checklist
- Section 14: Rules for AI Agent
để kiểm tra chất lượng.

## Cách 3: Làm prompt nền
Chèn tinh gọn các phần sau vào system prompt hoặc project instructions:
- Section 5
- Section 8
- Section 9
- Section 12
- Section 14

---

# 22. Prompt mẫu ngắn cho AI Agent

Bạn có thể dùng prompt mẫu sau:

> Hãy vẽ Activity Diagram chuẩn UML cho use case/process được cung cấp.
> Bắt buộc tuân thủ các quy tắc sau:
> - Mỗi sơ đồ chỉ mô tả một use case hoặc process cụ thể.
> - Dùng Initial Node, Action, Decision, Merge, Fork, Join, Activity Final, Flow Final đúng semantics UML.
> - Tên action phải theo dạng động từ + bổ ngữ.
> - Mọi decision phải có guard condition trên outgoing edges.
> - Merge chỉ dùng cho alternative flows, không dùng để đồng bộ song song.
> - Parallel flows phải dùng Fork/Join.
> - Dùng swimlane nếu có nhiều actor/role/system responsibility.
> - Chỉ thêm object node khi dữ liệu thực sự có ý nghĩa phân tích.
> - Sơ đồ phải rõ ràng, nhất quán, dễ đọc, phản ánh đúng logic của use case text.
> Trước khi vẽ, hãy phân tích main flow, alternative flow, exception flow, concurrency, và trách nhiệm của từng actor.

---

# 23. Ghi chú cuối cùng

Guide này phù hợp để dùng cho:

- học Activity Diagram từ gốc
- làm tutorial / lab / assignment
- chuyển từ Use Case Specification sang AD
- dùng làm “source of truth” cho AI Agent
- review chất lượng sơ đồ trước khi nộp bài hoặc thuyết trình

Nếu cần mở rộng, nên bổ sung thêm:

- bộ ví dụ mẫu theo từng domain
- template PlantUML chuẩn của riêng nhóm
- convention riêng cho tên lane / guard / action
- rule mapping cụ thể từ Use Case Specification của môn học sang AD
