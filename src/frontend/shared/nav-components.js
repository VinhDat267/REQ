/**
 * Wonton POS - Shared Navigation Components
 * Standardizes navigation across all Client and Admin screens.
 * Injected into each HTML page via <script> tag.
 */

(function () {
  'use strict';

  const currentFile = window.location.pathname.split('/').pop();
  const isAdmin = window.location.pathname.includes('/admin/');
  const isClient = window.location.pathname.includes('/client/');

  const PAGE_MAP_CLIENT = {
    '02-wonton-pos-landing-page.html': 'home',
    '04-wonton-item-detail-customize.html': 'menu',
    '03-wonton-pos-menu-browse.html': 'menu',
    '05-wonton-pos-cart-review.html': 'cart',
    '08-order-history-detail.html': 'history',
    '10-notifications-center.html': 'notifications',
    '09-order-rating-page.html': 'history',
    '06-wonton-pos-checkout.html': 'checkout',
    '01-wonton-pos-auth-page.html': 'auth',
    '07-order-tracking.html': 'tracking',
  };

  const PAGE_MAP_ADMIN = {
    '01-wonton-pos-admin-login.html': 'login',
    '05-process-payment---order-wnt-032.html': 'orders',
    '13-admin-notifications-overview.html': 'notifications',
    '06-kitchen-display-system-kds.html': 'kitchen',
    '11-staff-management-list.html': 'staff',
    '08-assign-order-to-table.html': 'tables',
    '07-table-management---floor-plan-view.html': 'tables',
    '03-order-management.html': 'orders',
    '04-create-in-store-order.html': 'orders',
    '09-menu-management-list.html': 'menu',
    '12-add-new-staff-member-form.html': 'staff',
    '10-add-new-menu-item-form.html': 'menu',
    '02-admin-dashboard-overview.html': 'dashboard',
    '14-revenue-statistics-reports.html': 'reports',
    '16-voucher-management-list.html': 'vouchers',
    '17-pickup-schedule-management.html': 'pickup',
    '18-admin-settings-profile.html': 'settings',
  };

  const SKIP_NAV = ['auth', 'checkout', 'login'];
  const ADMIN_SHELL_WIDTH = '16rem';

  function buildClientNav(activePage) {
    const navItems = [
      { label: 'Thực Đơn', href: '03-wonton-pos-menu-browse.html', key: 'menu' },
      { label: 'Theo Dõi Đơn', href: '07-order-tracking.html', key: 'tracking' },
      { label: 'Lịch Sử Đơn', href: '08-order-history-detail.html', key: 'history' },
    ];

    const linksHTML = navItems.map((item) => {
      const isActive = activePage === item.key;
      const cls = isActive
        ? 'text-red-700 font-semibold border-b-2 border-red-700 py-1'
        : 'text-slate-600 font-medium hover:text-red-600 transition-colors';
      return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
    }).join('\n');

    const mobileLinksHTML = navItems.map((item) => {
      const isActive = activePage === item.key;
      const cls = isActive
        ? 'text-red-700 font-bold bg-red-50 p-3 rounded-lg block'
        : 'text-slate-700 font-semibold p-3 hover:bg-slate-50 rounded-lg block transition-colors';
      return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
    }).join('\n');

    const isLoggedIn = ['history', 'checkout', 'tracking', 'notifications'].includes(activePage);

    const authBlock = isLoggedIn ? `
      <div class="hidden sm:flex relative group items-center cursor-pointer">
        <button class="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none">
          <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
            VD
          </div>
          <span class="text-sm font-semibold text-slate-700">Vinh Đạt</span>
          <span class="material-symbols-outlined text-sm text-slate-400 group-hover:text-red-600 transition-colors">expand_more</span>
        </button>
        <!-- Dropdown Desktop -->
        <div class="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-100 bg-slate-50">
            <p class="text-xs text-slate-500">Khách hàng thành viên</p>
            <p class="text-sm font-bold text-slate-800 truncate">dat.vinh@example.com</p>
          </div>
          <a href="08-order-history-detail.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors group/link">
            <span class="material-symbols-outlined text-lg text-slate-400 group-hover/link:text-red-600 transition-colors">receipt_long</span>
            Lịch sử đơn hàng
          </a>
          <div class="border-t border-slate-100"></div>
          <a href="02-wonton-pos-landing-page.html" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
            <span class="material-symbols-outlined text-lg">logout</span>
            Đăng xuất
          </a>
        </div>
      </div>
    ` : `
      <a href="01-wonton-pos-auth-page.html" class="hidden sm:block bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg font-semibold transition-all text-sm active:scale-95 shadow-sm">
        Đăng nhập / Đăng ký
      </a>
    `;

    const mobileAuthBlock = isLoggedIn ? `
      <div class="mt-4 border-t border-slate-100 pt-4 px-3 flex flex-col gap-3">
        <div class="flex items-center gap-3 mb-2">
           <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">VD</div>
           <div>
             <div class="font-bold text-slate-800">Vinh Đạt</div>
             <div class="text-xs text-slate-500">Thành viên</div>
           </div>
        </div>
        <a href="08-order-history-detail.html" class="flex items-center gap-3 font-semibold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">
          <span class="material-symbols-outlined text-slate-400">receipt_long</span>
          Lịch sử đơn hàng
        </a>
        <a href="02-wonton-pos-landing-page.html" class="flex items-center gap-3 font-semibold text-red-600 p-2 hover:bg-red-50 rounded-lg mt-1">
          <span class="material-symbols-outlined">logout</span>
          Đăng xuất
        </a>
      </div>
    ` : `
      <a href="01-wonton-pos-auth-page.html" class="mt-4 bg-red-700 hover:bg-red-800 text-white p-3 rounded-lg font-bold text-center active:scale-95 transition-all shadow-sm mx-3 mb-3">Đăng nhập / Đăng ký</a>
    `;

    return `
<nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm font-['Inter'] antialiased tracking-tight border-b border-slate-100" id="wonton-client-nav">
  <div class="max-w-[1440px] mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12 h-20">
    <div class="flex items-center gap-12">
      <div class="flex items-center gap-2">
          <!-- Mobile Hamburger Toggle -->
          <button class="md:hidden p-1.5 -ml-1 text-slate-600 active:scale-95 transition-transform rounded-lg hover:bg-slate-100" onclick="document.getElementById('mobile-client-menu').classList.toggle('hidden')">
            <span class="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <a href="02-wonton-pos-landing-page.html" class="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600" style="font-variation-settings: 'FILL' 1;">ramen_dining</span>
            Wonton POS
          </a>
      </div>
      <div class="hidden md:flex items-center gap-8">
        ${linksHTML}
      </div>
    </div>
    <div class="flex items-center gap-3 lg:gap-5">
      <a href="10-notifications-center.html" class="relative text-slate-600 hover:text-red-700 transition-all p-2 rounded-full hover:bg-red-50 ${activePage === 'notifications' ? 'text-red-700 bg-red-50' : ''}" title="Thông báo">
        <span class="material-symbols-outlined" style="font-size:26px">notifications</span>
        <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm ring-2 ring-white">3</span>
      </a>
      <a href="05-wonton-pos-cart-review.html" class="relative text-slate-600 hover:text-red-700 transition-all p-2 rounded-full hover:bg-red-50 ${activePage === 'cart' ? 'text-red-700 bg-red-50' : ''}" title="Giỏ hàng">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;font-size:26px">shopping_cart</span>
        <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm ring-2 ring-white">2</span>
      </a>
      
      <div class="hidden sm:block w-px h-8 bg-slate-200 mx-1"></div>
      
      ${authBlock}
    </div>
  </div>
  <!-- Mobile Dropdown Menu -->
  <div id="mobile-client-menu" class="hidden md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl border-t border-slate-100 p-2 flex flex-col gap-1 pb-4">
      <div class="px-3 pb-2 pt-1 border-b border-slate-100 mb-2">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Menu</p>
      </div>
      ${mobileLinksHTML}
      ${mobileAuthBlock}
  </div>
</nav>`;
  }

  const ADMIN_PAGE_TITLES = {
    dashboard: 'Bảng điều khiển',
    orders: 'Quản lý Đơn hàng',
    kitchen: 'Màn hình Bếp (KDS)',
    tables: 'Quản lý Bàn',
    menu: 'Quản lý Thực đơn',
    staff: 'Quản lý Nhân sự',
    reports: 'Doanh thu & Báo cáo',
    notifications: 'Thông Báo',
    vouchers: 'Quản lý Khuyến Mãi',
    pickup: 'Lịch Hẹn Pickup',
    settings: 'Cài Đặt Hệ Thống',
  };

  function buildAdminSidebar(activePage) {
    const sidebarItems = [
      { icon: 'dashboard', label: 'Bảng điều khiển', href: '02-admin-dashboard-overview.html', key: 'dashboard' },
      { icon: 'receipt_long', label: 'Đơn Hàng', href: '03-order-management.html', key: 'orders' },
      { icon: 'schedule', label: 'Lịch Pickup', href: '17-pickup-schedule-management.html', key: 'pickup' },
      { icon: 'soup_kitchen', label: 'Màn Hình Bếp', href: '06-kitchen-display-system-kds.html', key: 'kitchen' },
      { icon: 'table_restaurant', label: 'Sơ Đồ Bàn', href: '07-table-management---floor-plan-view.html', key: 'tables' },
      { icon: 'restaurant_menu', label: 'Thực Đơn', href: '09-menu-management-list.html', key: 'menu' },
      { icon: 'local_activity', label: 'Khuyến Mãi', href: '16-voucher-management-list.html', key: 'vouchers' },
      { icon: 'group', label: 'Nhân Sự', href: '11-staff-management-list.html', key: 'staff' },
      { icon: 'bar_chart', label: 'Báo Cáo', href: '14-revenue-statistics-reports.html', key: 'reports' },
      { icon: 'notifications', label: 'Thông Báo', href: '13-admin-notifications-overview.html', key: 'notifications', badge: '5' },
    ];

    const itemsHTML = sidebarItems.map((item) => {
      const isActive = activePage === item.key;
      const cls = isActive
        ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 font-semibold text-sm'
        : 'flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors';
      const badge = item.badge ? `<span class="ml-auto bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">${item.badge}</span>` : '';
      return `<a class="${cls}" href="${item.href}"><span class="material-symbols-outlined text-xl">${item.icon}</span><span>${item.label}</span>${badge}</a>`;
    }).join('\n');

    return `
<aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col z-50 font-['Inter'] transition-transform duration-300 -translate-x-full lg:translate-x-0" id="wonton-admin-sidebar" data-shell-source="injected">
  <div class="px-6 py-5 border-b border-slate-100">
    <a href="02-admin-dashboard-overview.html" class="text-xl font-bold text-red-700 tracking-tighter">Wonton POS</a>
    <p class="text-xs text-slate-400 mt-0.5">Hệ thống Quản lý Nhà hàng</p>
  </div>
  <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
    ${itemsHTML}
  </nav>
  <div class="px-4 py-4 border-t border-slate-100">
    <div class="flex items-center gap-3 px-2">
      <div class="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
        <span class="material-symbols-outlined text-red-700 text-lg">person</span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-slate-800 truncate">Nguyen Quang Anh</p>
        <p class="text-xs text-slate-400">Quản lý</p>
      </div>
      <a href="01-wonton-pos-admin-login.html" class="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-slate-50 inline-block text-center" title="Đăng xuất">
        <span class="material-symbols-outlined text-lg">logout</span>
      </a>
    </div>
  </div>
</aside>`;
  }

  function findAuthoredAdminSidebar() {
    const selectors = ['body > aside', 'body > div > aside'];

    for (const selector of selectors) {
      const candidate = Array.from(document.querySelectorAll(selector)).find((element) => (
        element.querySelector('nav') || element.querySelector('a[href]')
      ));

      if (candidate) {
        return candidate;
      }
    }

    return null;
  }

  function ensureAdminSidebar(activePage) {
    let sidebar = document.getElementById('wonton-admin-sidebar');

    if (sidebar) {
      return sidebar;
    }

    sidebar = findAuthoredAdminSidebar();

    if (sidebar) {
      sidebar.id = 'wonton-admin-sidebar';
      sidebar.dataset.shellSource = 'authored';
      return sidebar;
    }

    document.body.insertAdjacentHTML('afterbegin', buildAdminSidebar(activePage));
    return document.getElementById('wonton-admin-sidebar');
  }

  function getAdminHeaderInnerHTML(activePage) {
    const pageTitle = ADMIN_PAGE_TITLES[activePage] || 'Bảng điều khiển';

    return `
  <div class="flex items-center gap-4">
    <!-- Mobile Hamburger Toggle -->
    <button class="lg:hidden p-1 text-slate-600 active:scale-95 transition-transform cursor-pointer" onclick="document.getElementById('wonton-admin-sidebar').classList.toggle('-translate-x-full')">
      <span class="material-symbols-outlined text-[28px]">menu</span>
    </button>
    <h2 class="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight whitespace-nowrap">${pageTitle}</h2>
    <div class="relative group hidden sm:block">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-red-600 transition-colors">search</span>
      <input class="pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-full text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-300 w-64 transition-all placeholder:text-slate-400 dark:text-slate-200" placeholder="Tìm kiếm ${pageTitle.toLowerCase()}..." type="text">
    </div>
  </div>
  <div class="flex items-center gap-2">
    <!-- Notification Dropdown -->
    <div class="relative group">
      <button class="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-100" title="Thông Báo">
        <span class="material-symbols-outlined text-[24px]">notifications</span>
        <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 rounded-full text-[9px] text-white flex items-center justify-center font-bold leading-none ring-2 ring-white dark:ring-slate-950">3</span>
      </button>
      
      <!-- Popover Menu -->
      <div class="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
        <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <h3 class="font-bold text-slate-800">Thông báo mới</h3>
          <a href="13-admin-notifications-overview.html" class="text-xs text-red-600 font-semibold hover:underline">Xem tất cả</a>
        </div>
        <div class="max-h-[300px] overflow-y-auto">
          <div class="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
            <p class="text-xs font-bold text-slate-800">Bếp báo Hết Nguyên Liệu (86'd)</p>
            <p class="text-[11px] text-slate-500 mt-1">Món "Mì khô xá xíu" đã hết. Hệ thống tự động khóa món.</p>
            <p class="text-[9px] text-slate-400 mt-2">Vừa xong</p>
          </div>
          <div class="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
            <p class="text-xs font-bold text-slate-800">Đơn #WNT-034 đã sẵn sàng</p>
            <p class="text-[11px] text-slate-500 mt-1">Bếp đã làm xong món. Vui lòng gọi khách nhận hàng.</p>
            <p class="text-[9px] text-slate-400 mt-2">5 phút trước</p>
          </div>
        </div>
      </div>
    </div>
    <button class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" title="Trợ Giúp">
      <span class="material-symbols-outlined text-[24px]">help</span>
    </button>
    <a href="18-admin-settings-profile.html" class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all inline-block text-center" title="Cài Đặt">
      <span class="material-symbols-outlined text-[24px]">settings</span>
    </a>>
    <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
    <a href="18-admin-settings-profile.html" class="hidden sm:flex items-center gap-3 active:scale-95 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-all">
        <img alt="Quản lý Profile" class="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 shadow-sm object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrcoRDwsc-uQj77LkpmE4BHKe8591KMku0NoZqO4MBoP7B0lfMNKZgEnRcifNdEYAFZ7VgOm7DY-J4Y2KB64CAHsge-hJvCnF2nV4WZIlclDK_WE8TuWy5MQAbqy20QiBNrDJHpBmXl9P23OiX97efbnsrNHP7U-_6qBWKMwwLIqFr9SyZO6WodxUrvsyAi_cI6mSX8ohfLuuchJo489XU0hJ6l8SyV61tz-t2Gskjwtf5dK51ivdNjXDjtwK6a1kZzqBOXE1bl5Ft">
    </a>
  </div>`;
  }

  function ensureAdminHeader(activePage) {
    let header = document.getElementById('wonton-admin-header');

    if (header) {
      return header;
    }

    const headerHTML = `<header class="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-40 ml-0 lg:ml-64 w-full lg:w-[calc(100%_-_16rem)] transition-all duration-300" id="wonton-admin-header" data-shell-source="injected">${getAdminHeaderInnerHTML(activePage)}</header>`;
    
    // We append the header directly to body before the main to adhere to our standard
    const main = document.querySelector('main');
    if (main) {
      main.insertAdjacentHTML('beforebegin', headerHTML);
    } else {
      const sidebar = document.getElementById('wonton-admin-sidebar');
      if (sidebar) {
        sidebar.insertAdjacentHTML('afterend', headerHTML);
      } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
      }
    }

    return document.getElementById('wonton-admin-header');
  }

  function buildClientFooterMinimal() {
    return `
<footer class="bg-stone-900 dark:bg-black py-10 w-full mt-auto relative z-40" id="wonton-client-footer">
  <div class="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
    <div class="flex items-center gap-3">
        <span class="text-lg font-black text-stone-200 tracking-tighter italic uppercase">Wonton POS</span>
        <span class="h-4 w-[1px] bg-stone-700"></span>
        <span class="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">Thanh Toán Bảo Mật</span>
    </div>
    <div class="flex gap-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
        <a class="hover:text-stone-300 transition-colors" href="#">Bảo Mật</a>
        <a class="hover:text-stone-300 transition-colors" href="#">Điều Khoản</a>
        <a class="hover:text-stone-300 transition-colors" href="#">Trợ Giúp</a>
    </div>
    <p class="text-[10px] uppercase font-bold tracking-widest text-stone-600">&copy; 2026 Wonton POS</p>
  </div>
</footer>`;
  }

  function buildClientFooterFull() {
    return `
<footer class="bg-stone-900 dark:bg-black w-full py-16 px-6 lg:px-12 font-sans font-['Inter'] text-sm tracking-wide mt-auto z-40 relative" id="wonton-client-footer">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1440px] mx-auto">
    <div class="space-y-6">
      <div class="text-xl font-bold text-white tracking-tighter">WONTON POS</div>
      <p class="text-stone-400 max-w-xs leading-relaxed">
          Hệ thống quản lý và E-commerce hiện đại dành riêng cho mô hình tiệm Mì Vằn Thắn.
      </p>
      <div class="flex space-x-6 text-stone-400">
        <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors" data-icon="public">public</span>
        <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors" data-icon="language">language</span>
        <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors" data-icon="mail">mail</span>
      </div>
    </div>
    <div class="space-y-6">
      <h6 class="text-stone-200 font-bold uppercase tracking-widest text-xs">Thông Tin</h6>
      <nav class="flex flex-col space-y-4">
        <a class="text-stone-400 hover:text-white transition-colors w-fit" href="#">Câu Chuyện Thương Hiệu</a>
        <a class="text-stone-400 hover:text-white transition-colors w-fit" href="#">Giờ Hoạt Động</a>
        <a class="text-stone-400 hover:text-white transition-colors w-fit" href="#">Trung Tâm Hỗ Trợ</a>
      </nav>
    </div>
    <div class="space-y-6">
      <h6 class="text-stone-200 font-bold uppercase tracking-widest text-xs">Vị Trí Cửa Hàng</h6>
      <div class="space-y-4 text-stone-400">
        <p class="flex items-start group"><span class="material-symbols-outlined text-[18px] mr-3 mt-0.5 group-hover:text-white transition-colors" data-icon="schedule">schedule</span> Mở cửa mỗi ngày 10:00 - 22:00</p>
        <p class="flex items-start group"><span class="material-symbols-outlined text-[18px] mr-3 mt-0.5 group-hover:text-white transition-colors" data-icon="location_on">location_on</span> 123 Nguyen Hue Blvd,<br/>Dist. 1, Ho Chi Minh City</p>
        <p class="flex items-start group"><span class="material-symbols-outlined text-[18px] mr-3 mt-0.5 group-hover:text-white transition-colors" data-icon="call">call</span> +84 28 1234 5678</p>
      </div>
    </div>
  </div>
  <div class="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
    <p class="text-stone-500 text-[10px] font-bold uppercase tracking-widest">&copy; 2026 Wonton POS. Hoạt động mỗi ngày.</p>
    <div class="flex space-x-6 text-stone-500 text-[10px] font-bold uppercase tracking-widest">
      <a class="hover:text-stone-300 transition-colors" href="#">Bảo Mật</a>
      <a class="hover:text-stone-300 transition-colors" href="#">Điều Khoản</a>
    </div>
  </div>
</footer>`;
  }

  function ensureClientFooter(activePage) {
    if (document.getElementById('wonton-client-footer')) return;
    
    const MINIMAL_PAGES = ['cart', 'checkout', 'tracking', 'auth'];
    const footerHTML = MINIMAL_PAGES.includes(activePage) ? buildClientFooterMinimal() : buildClientFooterFull();
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  function injectNav() {
    let activePage = '';

    if (isClient) {
      activePage = PAGE_MAP_CLIENT[currentFile] || 'home';
      if (SKIP_NAV.includes(activePage)) return;

      const oldNavs = document.querySelectorAll('nav.fixed, header.fixed, nav[class*="fixed top-0"], header[class*="fixed top-0"]');
      oldNavs.forEach((element) => {
        if (element.closest('footer')) return;
        element.remove();
      });

      document.body.insertAdjacentHTML('afterbegin', buildClientNav(activePage));
      ensureClientFooter(activePage);
      return;
    }

    if (!isAdmin) {
      return;
    }

    activePage = PAGE_MAP_ADMIN[currentFile] || 'dashboard';
    if (SKIP_NAV.includes(activePage)) return;

    document.body.classList.remove('overflow-hidden');
    document.body.style.overflow = '';
    document.body.style.minHeight = '100vh';
    document.documentElement.style.overflow = '';

    const sidebar = ensureAdminSidebar(activePage);
    const header = ensureAdminHeader(activePage);

    if (sidebar && sidebar.dataset.shellSource === 'injected') {
      // Inline styles for margin have been migrated to responsive CSS classes
      // administered globally to allow iPad/Mobile compatibility.
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    injectNav();
  }
})();
