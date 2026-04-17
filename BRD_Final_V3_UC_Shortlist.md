# BRD Final V3 - Core UC Shortlist

## Muc dich

Tai lieu nay chot bo use case cot loi de viet `BRD final v3` theo huong:

- giu nguyen ID hien tai cua nhom
- khong map sang `UC` goc trong main BRD narrative
- mo rong scope len full-system baseline
- chi dua nhung UC that su can thiet vao phan chinh cua BRD

`All_Use_Cases.md` van la nguon full-system inventory / scope source cua repo.  
Bo local UC duoi day la **authoring layer** de viet `BRD final v3`, khong phai mot scope rieng moi.

## Numbering Rule

- Giu nguyen `UC-01..UC-16` da co.
- Cac UC bo sung cho `BRD final v3` duoc danh tiep tu `UC-17`.
- Khong ep dua `UC` goc vao phan mo ta chinh cua BRD.
- Khong can liet ke du `74` UC trong than BRD final.
- Phan full-system duoc the hien qua:
  - scope statement
  - business rules
  - functional requirements
  - process/model diagrams
  - bo UC local final da duoc chon loc

## Ownership Rule

- `BRD final v3` la **mot tai lieu chung cua ca nhom**.
- Khong ap dung lai co che midterm `moi thanh vien 2 UC`.
- Khong chia `BRD final v3` thanh cac cum ownership co dinh theo tung nguoi.
- Cac bang phan chia UC trong bo tai lieu midterm chi con gia tri lich su / traceability.
- Khi viet final, nhom co the cung bien tap tren mot bo UC local final thong nhat ma khong can gan moi UC cho mot thanh vien cu the.

## Kich thuoc de xuat

- Nen chot bo local final o muc `26` UC.
- Cau truc de xuat:
  - `16` UC hien tai duoc giu nguyen
  - `10` UC bo sung de BRD final v3 du chat final-project

## 16 UC giu nguyen

| UC ID | Ten UC | Vai tro trong BRD final v3 |
|------|--------|-----------------------------|
| UC-01 | Dat mon online | Luong ordering chinh cua Client WebApp |
| UC-02 | Thanh toan online | Bat buoc cho Takeaway / Pickup online |
| UC-03 | Dat mon hen gio lay | The hien service model Pickup |
| UC-04 | Xem lich su don hang | Ho tro post-purchase flow |
| UC-05 | Quan ly menu | Nang luc quan tri cot loi cua Manager |
| UC-06 | Quan ly nhan vien | Bao phu vai tro va phan quyen |
| UC-07 | Xem thong ke doanh thu | Bao phu business reporting |
| UC-08 | Quan ly ban | Bao phu dine-in operations |
| UC-09 | Tao don hang tai quan | Luong POS tai quay |
| UC-10 | Xu ly thanh toan | Luong cashier / settlement tai quay |
| UC-11 | Theo doi don hang | Truy vet trang thai cho khach |
| UC-12 | Gan don vao ban | Lien ket order voi dine-in table flow |
| UC-13 | Nhan don tu bep | Diem vao cua kitchen workflow |
| UC-14 | Cap nhat trang thai mon | Diem van hanh KDS / BOH |
| UC-15 | Danh gia don hang | Hau kiem customer feedback |
| UC-16 | Nhan thong bao don hang | Real-time communication layer |

## 10 UC can bo sung cho final v3

| UC ID | Ten UC | Tai sao nen them |
|------|--------|-------------------|
| UC-17 | Dat lai don cu | Cho thay full customer lifecycle, tan dung lich su mua hang |
| UC-18 | Quan ly khuyen mai | Bat buoc de scope final co pricing / promo governance |
| UC-19 | Xem dashboard tong quan | Tach lop giam sat van hanh cap quan ly khoi reporting chi tiet |
| UC-20 | Quan ly don hang dang hoat dong | Gom xac nhan, theo doi, huy, va xu ly don dang chay o phia van hanh |
| UC-21 | Chot ca va doi soat cuoi ngay | Them lop van hanh / tai chinh ma midterm chua the hien du |
| UC-22 | Danh dau mon het hang (86'd) | Bat buoc de scope final co inventory-lite / menu availability control |
| UC-23 | Phuc vu mon va xac nhan giao dung | Khop tron vong doi dine-in / handoff / ready-to-completed |
| UC-24 | Xu ly khieu nai va ngoai le van hanh | Bao phu remake, goodwill, refund, wrong handoff, manager correction |
| UC-25 | Quan ly tai khoan khach hang va xac thuc | Lap day khoang trong o lop account / login / profile / password, giup BRD final khong bi lech sang van hanh noi bo |
| UC-26 | Hoan tat checkout va ap dung uu dai | Lam ro service model selection, guest-vs-registered checkout, va customer-side promotion application trong main BRD flow |

## Local Final UC Set De Xuat

### Client + Customer-facing

- `UC-01` Dat mon online
- `UC-02` Thanh toan online
- `UC-03` Dat mon hen gio lay
- `UC-04` Xem lich su don hang
- `UC-11` Theo doi don hang
- `UC-15` Danh gia don hang
- `UC-16` Nhan thong bao don hang
- `UC-17` Dat lai don cu
- `UC-25` Quan ly tai khoan khach hang va xac thuc
- `UC-26` Hoan tat checkout va ap dung uu dai

### Admin / Manager

- `UC-05` Quan ly menu
- `UC-06` Quan ly nhan vien
- `UC-07` Xem thong ke doanh thu
- `UC-08` Quan ly ban
- `UC-18` Quan ly khuyen mai
- `UC-19` Xem dashboard tong quan
- `UC-21` Chot ca va doi soat cuoi ngay
- `UC-22` Danh dau mon het hang (86'd)

### FOH / Cashier / Service

- `UC-09` Tao don hang tai quan
- `UC-10` Xu ly thanh toan
- `UC-12` Gan don vao ban
- `UC-20` Quan ly don hang dang hoat dong
- `UC-23` Phuc vu mon va xac nhan giao dung
- `UC-24` Xu ly khieu nai va ngoai le van hanh

### BOH / Kitchen

- `UC-13` Nhan don tu bep
- `UC-14` Cap nhat trang thai mon

## Catalog 26 UC dung de dua vao BRD final v3

Bang duoi day la phien ban **ready-to-paste** cho muc Use Cases trong BRD final v3.  
Moi UC duoc dat ten theo huong:

- du rong de dai dien cho mot capability cluster
- du gon de doc trong BRD
- khong can liet ke toan bo `74` UC ma van giup nguoi doc hinh dung he thong kha day du

| UC ID | Ten UC de xuat cho BRD final v3 | Mo ta ngan | Cum pham vi dai dien |
|------|----------------------------------|------------|----------------------|
| UC-01 | Dat mon truc tuyen | Khach hang duyet menu, chon mon, tuy chinh lua chon va tao yeu cau dat hang tren Client WebApp. | menu, tim kiem, cart, order creation |
| UC-02 | Thanh toan truc tuyen | Khach hang thanh toan cho cac don can prepay bang cac phuong thuc online duoc ho tro va nhan ket qua thanh toan hop le. | payment gateway, QR, retry, callback |
| UC-03 | Dat don Pickup theo khung gio | Khach hang dat don hen gio lay va he thong kiem tra slot truoc khi tiep tuc luong thanh toan / xu ly. | pickup slot, capacity, auto-accept |
| UC-04 | Xem lich su va chi tiet don hang | Khach hang xem danh sach don da dat va xem thong tin chi tiet cua tung don da phat sinh. | history, detail, post-purchase visibility |
| UC-05 | Quan ly menu va danh muc | Quan ly cap nhat mon an, danh muc, topping va tinh trang kha dung cua menu. | menu item, category, topping, availability |
| UC-06 | Quan ly nhan vien va phan quyen | Quan ly tao, cap nhat, vo hieu hoa tai khoan nhan vien va gan vai tro / quyen truy cap phu hop. | staff account, role, permission |
| UC-07 | Xem thong ke va bao cao doanh thu | Quan ly xem doanh thu, chi so van hanh, top mon, khung gio cao diem va xuat bao cao. | reporting, analytics, export |
| UC-08 | Quan ly ban va so do ban | Quan ly duy tri du lieu ban va theo doi so do ban phuc vu cho dine-in operations. | table master data, floor layout |
| UC-09 | Tao don hang tai quay | FOH / Cashier tao don cho khach dine-in hoac takeaway tai diem ban. | walk-in order, counter POS |
| UC-10 | Xu ly thanh toan tai quay | FOH / Cashier xu ly thanh toan bang tien mat, QR hoac phuong thuc ho tro tai quay. | cashier settlement, cash, QR, counter payment |
| UC-11 | Theo doi trang thai don hang | Khach hang theo doi trang thai don hang theo thoi gian thuc bang tai khoan hoac ma don + so dien thoai. | order tracking, guest lookup |
| UC-12 | Gan va dieu phoi don theo ban | FOH gan, dieu chinh, hoac chuyen don theo ban de phuc vu nghiep vu dine-in. | assign table, transfer table, multi-open-order table |
| UC-13 | Nhan va tiep nhan don tai bep | BOH xem danh sach don moi va dua don vao quy trinh xu ly tai bep. | new orders, kitchen intake, accept/reject decision |
| UC-14 | Cap nhat trang thai che bien | BOH cap nhat tien do che bien theo mon hoac theo don cho den khi san sang phuc vu. | cooking status, ready status, grouped update |
| UC-15 | Danh gia trai nghiem don hang | Khach hang gui danh gia va nhan xet sau khi don da hoan tat. | rating, review, feedback |
| UC-16 | Nhan thong bao don hang | Khach hang nhan thong bao khi trang thai don thay doi trong qua trinh xu ly. | real-time notification, notification history |
| UC-17 | Dat lai tu don da hoan thanh | Khach hang co the su dung don cu lam co so tao don moi de dat lai nhanh hon. | reorder, repeat purchase |
| UC-18 | Quan ly khuyen mai va ma giam gia | Quan ly tao, sua, ngung va theo doi viec su dung khuyen mai / ma giam gia. | promotion setup, validity, usage history |
| UC-19 | Xem dashboard van hanh tong quan | Quan ly xem nhanh tinh hinh don, doanh thu, canh bao va chi so van hanh quan trong trong ngay. | dashboard snapshot, operational alerts |
| UC-20 | Quan ly don hang dang hoat dong | FOH / Quan ly theo doi, xac nhan, xu ly, hoac huy cac don dang chay trong van hanh hang ngay. | active order list, confirm/cancel/monitor |
| UC-21 | Chot ca va doi soat cuoi ngay | Quan ly / Cashier thuc hien tong hop giao dich, doi soat doanh thu va xu ly chenhlech cuoi ca. | shift close, reconciliation, cash drawer review |
| UC-22 | Quan ly tinh trang mon kha dung (86'd) | Quan ly / van hanh danh dau mon tam het va kiem soat kha nang ban moi cua mon an. | 86'd, out-of-stock, availability control |
| UC-23 | Phuc vu mon va xac nhan giao dung | FOH phuc vu mon da san sang, xac nhan giao dung khach / dung ban va dong vong doi phuc vu. | serve, handoff, complete, service confirmation |
| UC-24 | Xu ly khieu nai va ngoai le van hanh | He thong va nhan vien xu ly complaint, remake, refund, wrong handoff va cac tinh huong can manager correction. | complaint, remake, refund, operational exception |
| UC-25 | Quan ly tai khoan khach hang va xac thuc | Khach hang dang ky, dang nhap, cap nhat thong tin, khoi phuc mat khau va quan ly truy cap vao tai khoan. | register, login, logout, profile, password |
| UC-26 | Hoan tat checkout va ap dung uu dai | Khach hang chot gio hang, chon hinh thuc phuc vu, nhap thong tin can thiet va ap dung uu dai truoc khi dat / thanh toan. | service model selection, promo apply, checkout completion |

## Coverage Check

Neu nhin bo `26` UC nay nhu mot BRD-level capability map, nguoi doc co the hinh dung he thong qua `6` lop chinh:

1. **Customer access va onboarding**
   - `UC-25`
2. **Customer ordering va checkout**
   - `UC-01`, `UC-02`, `UC-03`, `UC-26`
3. **Post-order customer journey**
   - `UC-04`, `UC-11`, `UC-15`, `UC-16`, `UC-17`
4. **Manager control va business oversight**
   - `UC-05`, `UC-06`, `UC-07`, `UC-18`, `UC-19`, `UC-21`, `UC-22`
5. **FOH / Cashier / dine-in operations**
   - `UC-09`, `UC-10`, `UC-12`, `UC-20`, `UC-23`, `UC-24`
6. **BOH / kitchen execution**
   - `UC-13`, `UC-14`

O cap do BRD, cau truc nay da du de:

- goi dung hinh dang full-system
- khong phai liet ke het `74` UC
- giu tai lieu gon, de doc, de thuyet trinh
- day cac UC nho hon xuong business rules, FR table, subflow, alternate flow, exception flow, hoac appendix

## Nhung noi dung nen de o muc subflow, khong can tach thanh UC rieng

- In hoa don / in phieu bep
- Giai phong ban
- Xem top mon ban chay / khung gio cao diem / loc theo payment method
- Xac nhan don online / huy don online o muc thao tac nho
- Late callback / duplicate callback / refund fail
- Wrong handoff correction chi tiet
- Low-stock warning / waste note / spoilage note

Nhung noi dung tren van phai xuat hien trong BRD final v3, nhung nen dat o:

- business rules
- alternative flows
- exception flows
- mo ta functional requirement
- operational policy sections

## Cach viet BRD final v3 tu bo shortlist nay

1. Khai bao scope la `full-system locked baseline`.
2. Noi ro BRD final v3 chi trinh bay bo `core UC set` de giu tai lieu gon va reviewable.
3. Dung bo local `UC-01..UC-26` lam visible numbering lane trong than BRD.
4. Khong can nhung toan bo `74` UC vao phan main body.
5. De cac edge cases va operational rules vao:
   - Functional Requirements
   - Business Rules
   - Process Flows
   - Appendix neu can

## Thu tu viet de xuat

1. Giu nguyen va polish `UC-01..UC-16`
2. Them `UC-17..UC-26`
3. Cap nhat Scope / FR / BR tables de phu hop bo `26` UC
4. Sau cung moi cap nhat diagram va appendix traceability neu can

## Ket luan

Neu muon `BRD final v3` vua dung huong final-project, vua khong qua tai, thi bo local final hop ly nhat luc nay la:

- **giu `UC-01..UC-16`**
- **them `UC-17..UC-26`**
- **tong cong `26` UC**

Bo nay du de ke cau chuyen full-system o muc BRD ma van giu duoc nhung gi nhom da viet, dong thoi lap day 2 khoang trong quan trong nhat o phia customer-facing flow.
