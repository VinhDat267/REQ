const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\VinhDat\\Desktop\\REQ\\src\\frontend-vi';

const translations = {
    // HTML lang
    'lang="en"': 'lang="vi"',

    // CLIENT NAV
    '>Menu</a>': '>Thực đơn</a>',
    '>Track Order</a>': '>Theo dõi đơn</a>',
    '>Order History</a>': '>Lịch sử đơn</a>',
    '>Login / Register<': '>Đăng nhập / Đăng ký<',

    // ADMIN SIDEBAR
    '>Dashboard<': '>Tổng quan<',
    '>Orders<': '>Đơn hàng<',
    '>Kitchen (KDS)<': '>Bếp (KDS)<',
    '>Kitchen<': '>Bếp<',
    '>Tables<': '>Bàn ăn<',
    '>Staff<': '>Nhân viên<',
    '>Reports<': '>Báo cáo<',
    '>Notifications<': '>Thông báo<',
    '>Restaurant Management<': '>Quản lý nhà hàng<',
    '>Manager<': '>Quản lý<',

    // BUTTONS
    '>Place Order<': '>Đặt hàng<',
    '>PLACE ORDER<': '>ĐẶT HÀNG<',
    '>Add to Cart<': '>Thêm vào giỏ<',
    '>ADD TO CART<': '>THÊM VÀO GIỎ<',
    '>Proceed to Checkout': '>Tiến hành thanh toán',
    '>View All<': '>Xem tất cả<',
    '>Cancel<': '>Hủy<',
    '>Save Staff<': '>Lưu nhân viên<',
    '>Submit Review<': '>Gửi đánh giá<',
    '>Confirm Assignment<': '>Xác nhận gán<',
    '>Process Payment<': '>Xử lý thanh toán<',
    '>Export CSV<': '>Xuất CSV<',
    '>Filters<': '>Bộ lọc<',
    '>Add New Item<': '>Thêm món mới<',
    '>New Order<': '>Đơn mới<',
    '>Logout<': '>Đăng xuất<',
    '>Sign In<': '>Đăng nhập<',
    '>SIGN IN<': '>ĐĂNG NHẬP<',
    '>Create Account<': '>Tạo tài khoản<',
    '>Back to Menu<': '>Quay lại thực đơn<',

    // LANDING
    '>Explore Our Menu<': '>Khám phá thực đơn<',
    '>Order Now<': '>Đặt ngay<',
    '>ORDER NOW<': '>ĐẶT NGAY<',
    '>View Menu<': '>Xem thực đơn<',
    '>Featured Items<': '>Món nổi bật<',
    '>Popular Dishes<': '>Món phổ biến<',
    '>Best Sellers<': '>Bán chạy nhất<',

    // MENU
    '>Noodle Soup<': '>Mì nước<',
    '>Dry Noodles<': '>Mì khô<',
    '>Sides<': '>Món phụ<',
    '>Beverages<': '>Đồ uống<',
    '>Browse Our Menu<': '>Duyệt thực đơn<',

    // CART
    '>Your Cart<': '>Giỏ hàng<',
    '>Order Summary<': '>Tóm tắt đơn<',
    '>Subtotal<': '>Tạm tính<',
    '>Tax (0%)<': '>Thuế (0%)<',
    '>Service Fee (0%)<': '>Phí dịch vụ (0%)<',
    '>Packaging<': '>Đóng gói<',
    '>Free<': '>Miễn phí<',
    '>Total<': '>Tổng cộng<',
    '>TOTAL<': '>TỔNG CỘNG<',
    'ITEMS SELECTED': 'MÓN ĐÃ CHỌN',

    // SERVICE TYPES  
    '>Dine-in<': '>Tại chỗ<',
    '>Takeaway<': '>Mang đi<',
    '>Pickup<': '>Đến lấy<',
    '>SERVICE TYPE<': '>LOẠI DỊCH VỤ<',
    '>PICKUP DATE<': '>NGÀY LẤY<',
    '>PICKUP TIME<': '>GIỜ LẤY<',

    // CHECKOUT
    '>Contact Information<': '>Thông tin liên hệ<',
    '>Payment Method<': '>Phương thức thanh toán<',
    '>MoMo E-Wallet<': '>Ví MoMo<',
    '>Cash at Counter<': '>Tiền mặt tại quầy<',
    'Only available for Dine-in orders': 'Chỉ áp dụng cho đơn tại chỗ',
    'Takeaway and Pickup orders require prepayment before kitchen processing': 'Đơn mang đi và đến lấy cần thanh toán trước khi chế biến',
    'No account needed': 'Không cần tài khoản',
    'FULL NAME': 'HỌ VÀ TÊN',
    'PHONE NUMBER': 'SỐ ĐIỆN THOẠI',
    '>MOMO PHONE NUMBER<': '>SỐ ĐIỆN THOẠI MOMO<',
    'MoMo payment confirmation notification': 'thông báo xác nhận thanh toán MoMo',

    // ORDER TRACKING
    '>Track Your Order<': '>Theo dõi đơn hàng<',
    '>Order Placed<': '>Đã đặt hàng<',
    '>Confirmed<': '>Đã xác nhận<',
    '>Preparing<': '>Đang chuẩn bị<',
    '>Ready<': '>Sẵn sàng<',
    '>Completed<': '>Hoàn thành<',
    '>Picked Up<': '>Đã lấy<',
    '>Estimated Time<': '>Thời gian dự kiến<',

    // STATUS BADGES
    '>READY<': '>SẴN SÀNG<',
    '>KITCHEN<': '>ĐANG NẤU<',
    '>PENDING<': '>CHỜ XỬ LÝ<',
    '>COMPLETED<': '>HOÀN THÀNH<',
    '>CANCELLED<': '>ĐÃ HỦY<',

    // ORDER HISTORY
    '>Order Details<': '>Chi tiết đơn hàng<',
    '>Reorder<': '>Đặt lại<',
    '>Order History<': '>Lịch sử đơn hàng<',

    // RATING
    '>Rate Your Experience<': '>Đánh giá trải nghiệm<',
    '>How was your meal?<': '>Bữa ăn thế nào?<',
    '>Leave a comment<': '>Để lại nhận xét<',

    // NOTIFICATIONS
    '>Notification Center<': '>Trung tâm thông báo<',
    '>Mark all as read<': '>Đánh dấu đã đọc<',
    '>Today<': '>Hôm nay<',
    '>Yesterday<': '>Hôm qua<',
    '>Earlier<': '>Trước đó<',

    // AUTH
    '>Welcome Back<': '>Chào mừng trở lại<',
    '>WELCOME BACK<': '>CHÀO MỪNG TRỞ LẠI<',
    '>Sign in to your account<': '>Đăng nhập vào tài khoản<',
    '>Email Address<': '>Địa chỉ Email<',
    '>EMAIL ADDRESS<': '>ĐỊA CHỈ EMAIL<',
    '>Password<': '>Mật khẩu<',
    '>PASSWORD<': '>MẬT KHẨU<',
    '>Forgot Password?<': '>Quên mật khẩu?<',
    '>FORGOT PASSWORD?<': '>QUÊN MẬT KHẨU?<',
    '>Remember me<': '>Ghi nhớ đăng nhập<',
    "Don't have an account?": 'Chưa có tài khoản?',
    '>Already have an account?<': '>Đã có tài khoản?<',
    '>Staff Login<': '>Đăng nhập nhân viên<',
    'CONTACT YOUR MANAGER FOR ACCOUNT ACCESS': 'LIÊN HỆ QUẢN LÝ ĐỂ ĐƯỢC CẤP TÀI KHOẢN',

    // DASHBOARD
    ">Today's Revenue<": '>Doanh thu hôm nay<',
    '>Total Orders<': '>Tổng đơn hàng<',
    '>Average Order Value<': '>Giá trị đơn trung bình<',
    '>Active Orders<': '>Đơn đang xử lý<',
    '>Recent Orders<': '>Đơn hàng gần đây<',
    '>Revenue by Hour<': '>Doanh thu theo giờ<',
    '>Top Selling Items<': '>Món bán chạy nhất<',
    '>Table Overview<': '>Tổng quan bàn ăn<',
    '>Peak Hour<': '>Giờ cao điểm<',
    '>Good morning': '>Chào buổi sáng',
    '>Overview<': '>Tổng quan<',

    // TABLE HEADERS
    '>Order ID<': '>Mã đơn<',
    '>Customer<': '>Khách hàng<',
    '>Type<': '>Loại<',
    '>Status<': '>Trạng thái<',
    '>Amount<': '>Số tiền<',
    '>Time<': '>Thời gian<',

    // ORDER MANAGEMENT
    '>Order Management<': '>Quản lý đơn hàng<',
    '>Pending Payment<': '>Chờ thanh toán<',
    '>Cancel Order<': '>Hủy đơn<',
    '>Print Receipt<': '>In hóa đơn<',

    // KDS
    '>NEW ORDERS<': '>ĐƠN MỚI<',
    '>COOKING<': '>ĐANG NẤU<',
    '>ACCEPT ORDER<': '>NHẬN ĐƠN<',
    '>MARK ALL READY<': '>TẤT CẢ SẴN SÀNG<',
    '>SERVED/PICKED UP<': '>ĐÃ PHỤC VỤ/ĐÃ LẤY<',

    // TABLE MANAGEMENT
    '>Table Management<': '>Quản lý bàn ăn<',
    '>Floor Plan<': '>Sơ đồ tầng<',
    '>Reservations<': '>Đặt bàn<',
    '>Waitlist<': '>Danh sách chờ<',
    '>Available<': '>Trống<',
    '>Occupied<': '>Có khách<',
    '>Reserved<': '>Đã đặt<',
    '>ENTRANCE<': '>LỐI VÀO<',
    '>WINDOW SECTION<': '>KHU CỬA SỔ<',
    '>MAIN DINING<': '>KHU ĂN CHÍNH<',
    '>KITCHEN ACCESS<': '>LỐI VÀO BẾP<',
    '>View Full Order<': '>Xem đơn đầy đủ<',
    '>Free Table<': '>Trả bàn<',
    '>Add Table<': '>Thêm bàn<',

    // STAFF
    '>Staff Management<': '>Quản lý nhân viên<',
    '>Add New Staff Member<': '>Thêm nhân viên mới<',
    '>Add New Staff<': '>Thêm nhân viên mới<',
    '>Full Name<': '>Họ và tên<',
    '>Phone Number<': '>Số điện thoại<',
    '>Assign Roles<': '>Phân quyền<',
    '>Functional Permissions<': '>Quyền chức năng<',
    'Multi-select enabled': 'Có thể chọn nhiều',
    '>Cashier (FOH)<': '>Thu ngân (FOH)<',
    '>Server (FOH)<': '>Phục vụ (FOH)<',
    '>Kitchen (BOH)<': '>Bếp (BOH)<',
    'Process payments, manage counter orders': 'Xử lý thanh toán, quản lý đơn tại quầy',
    'Serve tables, assign orders': 'Phục vụ bàn, gán đơn hàng',
    'Kitchen display, update order status': 'Màn hình bếp, cập nhật trạng thái đơn',
    'Staff can hold multiple roles': 'Nhân viên có thể giữ nhiều vai trò',
    '>Access Security<': '>Bảo mật truy cập<',
    '>Default Password<': '>Mật khẩu mặc định<',

    // MENU MANAGEMENT
    '>Menu Management<': '>Quản lý thực đơn<',
    '>Sold Out<': '>Hết hàng<',
    '>Item Details<': '>Chi tiết món<',
    '>Category<': '>Danh mục<',

    // REPORTS
    '>Revenue Statistics<': '>Thống kê doanh thu<',
    '>Revenue Over Time<': '>Doanh thu theo thời gian<',
    '>Revenue by Service<': '>Doanh thu theo dịch vụ<',
    '>Total Revenue<': '>Tổng doanh thu<',
    '>Avg Order Value<': '>Giá trị đơn TB<',
    '>Top 10 Items<': '>Top 10 món<',
    '>Peak Hours Heatmap<': '>Biểu đồ giờ cao điểm<',
    '>This Week<': '>Tuần này<',
    '>This Month<': '>Tháng này<',
    '>All Payments<': '>Tất cả thanh toán<',
    '>Rank<': '>Hạng<',
    '>Item Name<': '>Tên món<',
    '>Qty<': '>SL<',
    '>Revenue<': '>Doanh thu<',
    '>Download Reports<': '>Tải báo cáo<',
    '>Export<': '>Xuất<',

    // MISC
    '>Customize<': '>Tùy chỉnh<',
    'Search orders, menu items...': 'Tìm đơn hàng, món ăn...',
    'Search analytics...': 'Tìm kiếm phân tích...',
    'Search staff or records...': 'Tìm nhân viên...',
    'Real-time performance metrics': 'Chỉ số hiệu suất thời gian thực',
    '>BILLING<': '>THANH TOÁN<',
    '>ORDERS<': '>ĐƠN HÀNG<',
    '>Notifications Overview<': '>Tổng quan thông báo<',
    '>New Order<': '>Đơn mới<',
};

function getAllHtmlFiles(dirPath) {
    let results = [];
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const full = path.join(dirPath, item);
        if (fs.statSync(full).isDirectory()) {
            results = results.concat(getAllHtmlFiles(full));
        } else if (item.endsWith('.html')) {
            results.push(full);
        }
    }
    return results;
}

const files = getAllHtmlFiles(dir);
let totalFixed = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    let changes = 0;

    for (const [en, vi] of Object.entries(translations)) {
        if (content.includes(en)) {
            content = content.split(en).join(vi);
            changes++;
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalFixed++;
        console.log(`TRANSLATED (${changes}): ${path.basename(file)}`);
    } else {
        console.log(`  NO MATCH: ${path.basename(file)}`);
    }
}

console.log(`\n=== DONE: ${totalFixed} files translated ===`);
