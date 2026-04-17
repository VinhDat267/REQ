const fs = require('fs');
const file = 'C:\\Users\\VinhDat\\Desktop\\REQ\\src\\frontend-vi\\shared\\nav-components.js';
let c = fs.readFileSync(file, 'utf8');

const replacements = [
    ["label: 'Menu'", "label: 'Thực đơn'"],
    ["label: 'Track Order'", "label: 'Theo dõi đơn'"],
    ["label: 'Order History'", "label: 'Lịch sử đơn'"],
    ["Login / Register", "Đăng nhập / Đăng ký"],
    ["label: 'Dashboard'", "label: 'Tổng quan'"],
    ["label: 'Orders'", "label: 'Đơn hàng'"],
    ["label: 'Kitchen (KDS)'", "label: 'Bếp (KDS)'"],
    ["label: 'Tables'", "label: 'Bàn ăn'"],
    ["label: 'Staff'", "label: 'Nhân viên'"],
    ["label: 'Reports'", "label: 'Báo cáo'"],
    ["label: 'Notifications'", "label: 'Thông báo'"],
    ["Restaurant Management", "Quản lý nhà hàng"],
    [">Manager<", ">Quản lý<"],
];

for (const [en, vi] of replacements) {
    if (c.includes(en)) {
        c = c.split(en).join(vi);
        console.log(`  OK: "${en}" -> "${vi}"`);
    }
}

// Fix the second 'Menu' in admin sidebar (after first was already replaced)
c = c.replace("label: 'Menu'", "label: 'Thực đơn'");

fs.writeFileSync(file, c, 'utf8');
console.log('\nnav-components.js translated!');
