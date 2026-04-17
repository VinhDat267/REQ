const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\VinhDat\\Desktop\\REQ\\src\\frontend-vi';

// Extended translation map
const translations = {
  // HTML lang
  'lang="en"': 'lang="vi"',

  // NAV / SIDEBAR
  '>Menu</a>': '>Thực đơn</a>',
  '>Track Order</a>': '>Theo dõi đơn</a>',
  '>Order History</a>': '>Lịch sử đơn</a>',
  '>Login / Register<': '>Đăng nhập / Đăng ký<',
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

  // BUTTONS & ACTIONS
  '>Place Order<': '>Đặt hàng<',
  '>PLACE ORDER<': '>ĐẶT HÀNG<',
  '>Add to Cart<': '>Thêm vào giỏ<',
  '>ADD TO CART<': '>THÊM VÀO GIỎ<',
  '>Proceed to Checkout<': '>Tiến hành thanh toán<',
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
  '>Add More Items<': '>Thêm món khác<',
  '>Change Selection<': '>Đổi lựa chọn<',
  '>Continue as Guest<': '>Tiếp tục với tư cách Khách<',
  '>Secure Checkout<': '>Thanh toán an toàn<',
  '>SECURE SSL PAYMENT<': '>THANH TOÁN SSL AN TOÀN<',
  '>Next<': '>Tiếp tục<',
  '>Previous<': '>Quay lại<',
  '>Settings<': '>Cài đặt<',
  '>Remove<': '>Xóa<',
  '>Add Custom<': '>Thêm tùy chỉnh<',
  '>Select<': '>Chọn<',
  '>Disable<': '>Vô hiệu hóa<',
  '>Enable<': '>Kích hoạt<',
  '>Save Item<': '>Lưu món<',
  ">Mark 86'd<": ">Đánh dấu hết hàng<",
  '>Upload Image<': '>Tải ảnh lên<',
  '>Browse<': '>Duyệt<',
  '>Pay<': '>Thanh toán<',
  '>Confirm Order<': '>Xác nhận đơn<',
  '>Confirm Payment<': '>Xác nhận thanh toán<',
  '>Free Table<': '>Trả bàn<',
  '>View Full Order<': '>Xem toàn bộ đơn<',

  // LANDING
  '>Explore Our Menu<': '>Khám phá thực đơn<',
  '>Order Now<': '>Đặt ngay<',
  '>ORDER NOW<': '>ĐẶT NGAY<',
  '>View Menu<': '>Xem thực đơn<',
  '>Featured Items<': '>Món nổi bật<',
  '>Popular Dishes<': '>Món phổ biến<',
  '>Best Sellers<': '>Bán chạy nhất<',
  '>Bestseller<': '>Bán chạy<',
  ">Chef's Signature<": ">Đầu bếp khuyên dùng<",
  'Choose Your Experience': 'Chọn phương thức phục vụ',
  'Dine-in, Takeaway, or Schedule a Pickup — all from your browser. Fast, fresh, and convenient.': 'Dùng bữa tại chỗ, Mang đi hoặc Đến lấy — tất cả trên trình duyệt của bạn. Nhanh chóng, tươi ngon và tiện lợi.',
  'Ordered Your Way': 'Đặt hàng theo cách của bạn',
  'Seamless ordering tailored to your schedule and location.': 'Trải nghiệm đặt hàng mượt mà được thiết kế riêng cho lịch trình và vị trí của bạn.',
  'Skip the line with mobile pre-orders.': 'Không cần xếp hàng với tính năng đặt trước trên điện thoại.',
  'Scan QR at table for instant service without leaving your seat.': 'Quét mã QR tại bàn để được phục vụ ngay mà không cần rời khỏi chỗ ngồi.',
  "Order and pick up when it's ready. Hot, fresh, and perfectly packed.": 'Đặt hàng và đến lấy khi thức ăn đã sẵn sàng. Nóng hổi, tươi ngon và được đóng gói cẩn thận.',
  "Schedule a pickup for later. Your noodles will be ready exactly when you are.": 'Hẹn thời gian đến lấy. Mì của bạn sẽ sẵn sàng khi bạn đến.',

  // MENU
  '>Noodle Soup<': '>Mì nước<',
  '>Dry Noodles<': '>Mì khô<',
  '>Sides<': '>Món phụ<',
  '>Side Dishes<': '>Món phụ<',
  '>Beverages<': '>Đồ uống<',
  '>Desserts<': '>Tráng miệng<',
  '>Browse Our Menu<': '>Duyệt thực đơn<',
  'All Categories': 'Mọi danh mục',
  '>Our signature thin noodles with handmade shrimp and pork wontons in clear broth.<': '>Mì sợi nhỏ đặc trưng với hoành thánh tôm thịt thủ công trong nước dùng trong.<',

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
  '>Total Items<': '>Tổng số món<',
  '>Order Items<': '>Món trong đơn<',

  // SERVICE TYPES  
  '>Dine-in<': '>Tại chỗ<',
  '>Takeaway<': '>Mang đi<',
  '>Pickup<': '>Đến lấy<',
  '>SERVICE TYPE<': '>LOẠI DỊCH VỤ<',
  '>PICKUP DATE<': '>NGÀY LẤY<',
  '>PICKUP TIME<': '>GIỜ LẤY<',
  '>Date &amp; Time<': '>Ngày & Giờ<',
  '>Dine-in —<': '>Tại chỗ —<',
  'Only available for Dine-in orders': 'Chỉ áp dụng cho đơn tại chỗ',
  'Takeaway and Pickup orders require prepayment before kitchen processing': 'Đơn mang đi và đến lấy cần thanh toán trước khi chế biến',
  'Note: Takeaway and Pickup require prepayment': 'Lưu ý: Đơn mang đi và đến lấy cần thanh toán trước',

  // CHECKOUT
  '>Contact Information<': '>Thông tin liên hệ<',
  '>Contact Details<': '>Chi tiết liên hệ<',
  '>Payment Method<': '>Phương thức thanh toán<',
  '>MoMo E-Wallet<': '>Ví MoMo<',
  '>Cash at Counter<': '>Tiền mặt tại quầy<',
  '>QR / Bank<': '>Mã QR / Ngân hàng<',
  'No account needed': 'Không cần tài khoản',
  "No account needed — we'll use this to track your order.": 'Không cần tài khoản — chúng tôi dùng thông tin này để theo dõi đơn.',
  'Order without an account — just your name and phone number': 'Đặt hàng không cần tài khoản — chỉ cần tên và số điện thoại',
  'FULL NAME': 'HỌ VÀ TÊN',
  'PHONE NUMBER': 'SỐ ĐIỆN THOẠI',
  '>MOMO PHONE NUMBER<': '>SỐ ĐIỆN THOẠI MOMO<',
  'MoMo payment confirmation notification': 'thông báo xác nhận thanh toán MoMo',
  '>Special Instructions<': '>Hướng dẫn đặc biệt<',
  'Add note...': 'Thêm ghi chú...',

  // ORDER TRACKING
  '>Track Your Order<': '>Theo dõi đơn hàng<',
  '>Order Placed<': '>Đã đặt hàng<',
  '>Confirmed<': '>Đã xác nhận<',
  '>Preparing<': '>Đang chuẩn bị<',
  '>Ready<': '>Sẵn sàng<',
  '>Completed<': '>Hoàn thành<',
  '>Order Completed<': '>Hoàn thành<',
  '>Picked Up<': '>Đã lấy<',
  '>Estimated Time<': '>Thời gian dự kiến<',
  '>Estimated Ready:': '>Dự kiến hoàn thành:',
  '>Order Code<': '>Mã đơn hàng<',
  '>Order Details<': '>Chi tiết đơn hàng<',
  '>Reorder<': '>Đặt lại<',
  '>Order History<': '>Lịch sử đơn hàng<',
  'Thank you for dining with us!': 'Cảm ơn quý khách đã dùng bữa!',

  // STATUS BADGES
  '>READY<': '>SẴN SÀNG<',
  '>KITCHEN<': '>ĐANG NẤU<',
  '>PENDING<': '>CHỜ XỬ LÝ<',
  '>COMPLETED<': '>HOÀN THÀNH<',
  '>CANCELLED<': '>ĐÃ HỦY<',
  '>SERVED<': '>ĐÃ PHỤC VỤ<',

  // RATING
  '>Rate Your Experience<': '>Đánh giá trải nghiệm<',
  '>How was your meal?<': '>Bữa ăn thế nào?<',
  '>Leave a comment<': '>Để lại nhận xét<',
  'Share your thoughts (optional)': 'Chia sẻ ý kiến của bạn (tùy chọn)',
  'Food Quality': 'Chất lượng món ăn',
  'Service Speed': 'Tốc độ phục vụ',
  'Overall Experience': 'Trải nghiệm tổng thể',

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
  '>Terms of Service<': '>Điều khoản dịch vụ<',
  '>Privacy Policy<': '>Chính sách bảo mật<',

  // ADMIN FRONT PAGE
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

  // ADMIN ORDER MGMT
  '>Order Management<': '>Quản lý đơn hàng<',
  '>Pending Payment<': '>Chờ thanh toán<',
  '>Cancel Order<': '>Hủy đơn<',
  '>Print Receipt<': '>In hóa đơn<',
  '>Payment Pending<': '>Đang chờ thanh toán<',
  '>Payment Received<': '>Đã nhận thanh toán<',
  '>Amount Received<': '>Số tiền đã nhận<',
  '>Total Amount<': '>Tổng tiền<',
  '>Billing<': '>Thanh toán<',

  // KDS
  '>NEW ORDERS<': '>ĐƠN MỚI<',
  '>COOKING<': '>ĐANG NẤU<',
  '>ACCEPT ORDER<': '>NHẬN ĐƠN<',
  '>MARK ALL READY<': '>TẤT CẢ SẴN SÀNG<',
  '>SERVED/PICKED UP<': '>ĐÃ PHỤC VỤ/ĐÃ LẤY<',

  // TABLE MGMT
  '>Table Management<': '>Quản lý bàn ăn<',
  '>Floor Plan<': '>Sơ đồ tầng<',
  '>Floor Management<': '>Quản lý tầng<',
  '>Reservations<': '>Đặt bàn<',
  '>Waitlist<': '>Danh sách chờ<',
  '>Available<': '>Trống<',
  '>Occupied<': '>Có khách<',
  '>Reserved<': '>Đã đặt<',
  '>ENTRANCE<': '>LỐI VÀO<',
  '>WINDOW SECTION<': '>KHU CỬA SỔ<',
  '>MAIN DINING<': '>KHU ĂN CHÍNH<',
  '>KITCHEN ACCESS<': '>LỐI VÀO BẾP<',
  '>Capacity<': '>Sức chứa<',
  '>Time Elapsed<': '>Thời gian đã ở<',
  '>Guests<': '>Khách<',

  // STAFF
  '>Staff Management<': '>Quản lý nhân viên<',
  '>Add New Staff Member<': '>Thêm nhân viên mới<',
  '>Add New Staff<': '>Thêm nhân viên mới<',
  '>Full Name<': '>Họ và tên<',
  '>Phone<': '>Số ĐT<',
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
  '>Currently Clocked In<': '>Đang trong ca<',
  '>Active Shifts<': '>Ca làm việc<',
  '>Manager Profile<': '>Hồ sơ quản lý<',

  // MENU MGMT
  '>Menu Management<': '>Quản lý thực đơn<',
  '>Sold Out<': '>Hết hàng<',
  '>Item Details<': '>Chi tiết món<',
  '>Available / Hidden<': '>Hiển thị / Ẩn<',
  'Drag and drop images or': 'Kéo thả ảnh vào hoặc',
  '>Images<': '>Hình ảnh<',
  '>Description<': '>Mô tả<',
  '>Price<': '>Giá<',
  '>Basic Information<': '>Thông tin cơ bản<',
  '>Menu Item Add/Edit Form<': '>Thêm/Sửa Món<',

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
  '>Restaurant Info<': '>Thông tin nhà hàng<',
  'Open Daily 10AM - 10PM': 'Mở cửa hàng ngày 10:00 - 22:00',
  '>Operating Hours<': '>Giờ hoạt động<',
  '>Support<': '>Hỗ trợ<',
  '>Help Center<': '>Trung tâm trợ giúp<',
  '>Contact Support<': '>Liên hệ hỗ trợ<',
  '>System Settings<': '>Cài đặt hệ thống<',
  '>System Status<': '>Trạng thái hệ thống<',
  'System active.': 'Hệ thống đang hoạt động.',

  // NEW DYNAMIC STRINGS
  'Select an available table': 'Chọn bàn trống',
  'Current Order — Dine-in': 'Đơn hiện tại — Tại chỗ',
  'Payment of': 'Thanh toán',
  'received successfully': 'thành công',
  'Order #': 'Đơn hàng #',
  'Terminal Status': 'Trạng thái máy tính tiền',
  'Active Session': 'Phiên hoạt động',
  'Admin Console': 'Bảng quản trị',
  'Staff Member': 'Nhân viên',
  'Assign Order': 'Gán đơn',
  'Delete Selected': 'Xóa đã chọn',
  'Show/Hide': 'Hiện/Ẩn',
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

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  for (const [en, vi] of Object.entries(translations)) {
    if (content.includes(en)) {
      content = content.split(en).join(vi);
    }
  }

  // Handle placeholders and input values
  content = content.replace(/placeholder="Email Address"/g, 'placeholder="Địa chỉ Email"');
  content = content.replace(/placeholder="Password"/g, 'placeholder="Mật khẩu"');
  content = content.replace(/placeholder="Search orders, menu items..."/g, 'placeholder="Tìm đơn hàng, món ăn..."');
  content = content.replace(/placeholder="Search staff or records..."/g, 'placeholder="Tìm nhân viên..."');
  content = content.replace(/placeholder="Search analytics..."/g, 'placeholder="Tìm phân tích..."');
  content = content.replace(/placeholder="Search..."/g, 'placeholder="Tìm kiếm..."');

  fs.writeFileSync(file, content, 'utf8');
}

console.log('=== MASS TRANSLATION COMPLETE ===');
