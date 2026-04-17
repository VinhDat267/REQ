from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Iterable

from bs4 import BeautifulSoup, Comment, NavigableString
from deep_translator import GoogleTranslator


TRANSLATABLE_ATTRS = ("title", "placeholder", "alt", "data-alt", "aria-label")
ASCII_LETTER_PATTERN = re.compile(r"[A-Za-z]")


EXACT_OVERRIDES = {
    "Wonton POS": "Wonton POS",
    "Menu": "Thực đơn",
    "Track Order": "Theo dõi đơn",
    "Order History": "Lịch sử đơn hàng",
    "Contact Information": "Thông tin liên hệ",
    "Login/Register": "Đăng nhập / Đăng ký",
    "Login / Register": "Đăng nhập / Đăng ký",
    "Order Now": "Đặt ngay",
    "View Menu": "Xem thực đơn",
    "Choose Your Experience": "Chọn hình thức phục vụ",
    "Fresh Wonton Noodles,": "Mì hoành thánh tươi ngon,",
    "Dine-in": "Ăn tại quán",
    "Takeaway": "Mang đi",
    "Pickup": "Hẹn giờ đến lấy",
    "Service Type": "Hình thức phục vụ",
    "Change": "Thay đổi",
    "Payment Method": "Phương thức thanh toán",
    "Full Name": "Họ và tên",
    "Phone Number": "Số điện thoại",
    "Select Table": "Chọn bàn",
    "Schedule": "Đặt lịch",
    "Order Summary": "Tóm tắt đơn hàng",
    "Place Order": "Đặt hàng",
    "Subtotal": "Tạm tính",
    "Service Fee (0%)": "Phí dịch vụ (0%)",
    "Free": "Miễn phí",
    "Packaging": "Đóng gói",
    "Total": "Tổng cộng",
    "Chef's Choice": "Đầu bếp tuyển chọn",
    "The Noodle Craft": "Tinh hoa sợi mì",
    "Learn More": "Tìm hiểu thêm",
    "Fast Lane": "Lấy nhanh",
    "Loyalty": "Tích điểm",
    "Privacy": "Quyền riêng tư",
    "Terms": "Điều khoản",
    "Information": "Thông tin",
    "Details": "Chi tiết",
    "Restaurant Info": "Thông tin nhà hàng",
    "Operating Hours": "Giờ hoạt động",
    "Contact Information": "Thông tin liên hệ",
    "Open Daily 10AM - 10PM": "Mở cửa hằng ngày 10:00 - 22:00",
    "123 Nguyen Hue, Dist. 1, Ho Chi Minh City": "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    "MoMo E-Wallet": "Ví MoMo",
    "MoMo Phone Number": "Số điện thoại MoMo",
    "Classic Wonton Noodle Soup": "Mì hoành thánh truyền thống",
    "Regular Size • Hand-pulled": "Cỡ thường • Sợi làm thủ công",
    "Thai Tea": "Trà Thái",
    "Less Ice • Extra Pearl": "Ít đá • Thêm trân châu",
    "Notification Center": "Trung tâm thông báo",
    "Today": "Hôm nay",
    "Yesterday": "Hôm qua",
    "Earlier": "Trước đó",
    "Sign In": "Đăng nhập",
    "Create Account": "Tạo tài khoản",
    "Forgot Password?": "Quên mật khẩu?",
    "Terms of Service": "Điều khoản dịch vụ",
    "Privacy Policy": "Chính sách bảo mật",
    "Dashboard": "Tổng quan",
    "Orders": "Đơn hàng",
    "Kitchen (KDS)": "Bếp (KDS)",
    "Kitchen": "Bếp",
    "Tables": "Bàn ăn",
    "Staff": "Nhân viên",
    "Reports": "Báo cáo",
    "Notifications": "Thông báo",
    "Restaurant Management": "Quản lý nhà hàng",
    "Manager": "Quản lý",
}


FULL_SENTENCE_OVERRIDES = {
    "Wonton POS - Modern Culinary Ordering": "Wonton POS - Đặt món hiện đại",
    "Fresh Wonton Noodles, Ordered Your Way": "Mì hoành thánh tươi ngon, đặt món theo cách của bạn",
    "Dine-in, Takeaway, or Schedule a Pickup — all from your browser. Fast, fresh, and convenient.": (
        "Ăn tại quán, mang đi hoặc hẹn giờ đến lấy ngay trên trình duyệt của bạn. "
        "Nhanh chóng, tươi ngon và tiện lợi."
    ),
    "No account needed — we'll use this to track your order.": (
        "Không cần tài khoản — chúng tôi sẽ dùng thông tin này để theo dõi đơn hàng của bạn."
    ),
    "Seamless ordering tailored to your schedule and location.": (
        "Trải nghiệm đặt hàng mượt mà, phù hợp với lịch trình và vị trí của bạn."
    ),
    "Scan QR at table for instant service without leaving your seat.": (
        "Quét mã QR tại bàn để được phục vụ ngay mà không cần rời khỏi chỗ ngồi."
    ),
    "Order and pick up when it's ready. Hot, fresh, and perfectly packed.": (
        "Đặt món và đến lấy khi sẵn sàng. Nóng hổi, tươi ngon và được đóng gói cẩn thận."
    ),
    "Schedule a pickup for later. Your noodles will be ready exactly when you are.": (
        "Hẹn giờ đến lấy cho thời điểm phù hợp. Mì của bạn sẽ sẵn sàng đúng lúc bạn đến."
    ),
    "Our noodles are hand-pulled using traditional techniques passed down through three generations. Silk-smooth texture in every bite.": (
        "Sợi mì được làm thủ công theo kỹ thuật truyền qua ba thế hệ. "
        "Mềm mượt trong từng lần thưởng thức."
    ),
    "Skip the line with mobile pre-orders.": "Không cần xếp hàng với tính năng đặt trước trên điện thoại.",
    "Earn bowls with every order.": "Tích điểm đổi món sau mỗi đơn hàng.",
    "Wonton POS - Modern restaurant management for your wonton noodle shop.": (
        "Wonton POS - Hệ thống quản lý nhà hàng hiện đại cho quán mì hoành thánh của bạn."
    ),
    "Modern restaurant management for your wonton noodle shop": (
        "Hệ thống quản lý nhà hàng hiện đại cho quán mì hoành thánh của bạn"
    ),
    "© 2026 Wonton POS. Open Daily 10AM - 10PM.": "© 2026 Wonton POS. Mở cửa hằng ngày 10:00 - 22:00.",
    "Pickup — Apr 7, 2026, 12:30 PM": "Hẹn giờ đến lấy — 7 Thg 4, 2026, 12:30 PM",
    "Takeaway and Pickup orders require prepayment before kitchen processing": (
        "Đơn mang đi và hẹn giờ đến lấy cần thanh toán trước khi bếp chế biến."
    ),
    "MoMo payment confirmation notification": "Thông báo xác nhận thanh toán MoMo",
    "By placing this order, you agree to our Terms of Service and Privacy Policy. All digital transactions are encrypted and secure.": (
        "Khi đặt đơn này, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi. "
        "Mọi giao dịch điện tử đều được mã hóa và bảo mật."
    ),
    "Contact your manager for account access": "Liên hệ quản lý để được cấp tài khoản",
}


TERM_REPLACEMENTS = (
    ("Ăn tại chỗ", "Ăn tại quán"),
    ("Dùng bữa tại chỗ", "Ăn tại quán"),
    ("Tại chỗ", "Ăn tại quán"),
    ("Nhận tại chỗ", "Ăn tại quán"),
    ("Đón", "Hẹn giờ đến lấy"),
    ("Đến lấy", "Hẹn giờ đến lấy"),
    ("Nhận sau", "Hẹn giờ đến lấy"),
)


POST_REPLACEMENTS = (
    ("POS hoành thánh", "Wonton POS"),
    ("Hoành Thánh POS", "Wonton POS"),
    ("bún hoành thánh", "mì hoành thánh"),
    ("Bún hoành thánh", "Mì hoành thánh"),
    ("Bát bún thủ công", "Tô mì thủ công"),
    ("Đơn hàng nhận hàng mới", "Đơn hẹn giờ đến lấy mới"),
    ("Đơn nhận hàng", "Đơn hẹn giờ đến lấy"),
    ("Khe nhận hàng", "Khung giờ đến lấy"),
    ("Hoành Thánh POS - Access", "Wonton POS - Truy cập"),
    ("Xưởng may | Quản trị viên Wonton POS", "Atelier | Quản trị Wonton POS"),
    ("Mở cửa hàng ngày", "Mở cửa hằng ngày"),
)


class Translator:
    def __init__(self) -> None:
        self._translator = GoogleTranslator(source="en", target="vi")
        self._cache: dict[str, str] = {}

    def translate(self, text: str) -> str:
        source = collapse_whitespace(text)
        if not source:
            return text
        if source in FULL_SENTENCE_OVERRIDES:
            return FULL_SENTENCE_OVERRIDES[source]
        if source in EXACT_OVERRIDES:
            return EXACT_OVERRIDES[source]
        if source in self._cache:
            return self._cache[source]
        try:
            translated = self._translator.translate(source) or source
        except Exception:
            translated = source
        translated = apply_canonical_terms(translated)
        self._cache[source] = translated
        return translated


def collapse_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def contains_human_language(text: str) -> bool:
    if not ASCII_LETTER_PATTERN.search(text):
        return False
    if text.isupper() and len(text) <= 5:
        return False
    if text in {"notifications", "shopping_cart", "arrow_forward", "north_east", "star"}:
        return False
    return True


def apply_canonical_terms(text: str) -> str:
    fixed = text
    for source, target in TERM_REPLACEMENTS:
        fixed = fixed.replace(source, target)
    for source, target in EXACT_OVERRIDES.items():
        fixed = fixed.replace(source, target)
    return fixed


def apply_post_replacements(text: str) -> str:
    fixed = text
    for source, target in POST_REPLACEMENTS:
        fixed = fixed.replace(source, target)
    return fixed


def iter_text_nodes(soup: BeautifulSoup) -> Iterable[NavigableString]:
    for node in soup.descendants:
        if not isinstance(node, NavigableString):
            continue
        if isinstance(node, Comment):
            continue
        parent = node.parent
        if parent and parent.name in {"script", "style"}:
            continue
        if not collapse_whitespace(str(node)):
            continue
        yield node


def is_icon_text(node: NavigableString) -> bool:
    parent = node.parent
    if parent is None:
        return False
    classes = parent.get("class", [])
    return "material-symbols-outlined" in classes


def fix_dom(source_html: str, translator: Translator) -> tuple[str, dict[str, int]]:
    soup = BeautifulSoup(source_html, "html.parser")
    stats = {
        "text_translated": 0,
        "attr_translated": 0,
    }

    for node in list(iter_text_nodes(soup)):
        text = str(node)
        if is_icon_text(node):
            continue
        if not contains_human_language(text):
            continue
        translated = translator.translate(text)
        if translated != text:
            node.replace_with(translated)
            stats["text_translated"] += 1

    for tag in soup.find_all(True):
        for attr in TRANSLATABLE_ATTRS:
            value = tag.get(attr)
            if not isinstance(value, str):
                continue
            if not contains_human_language(value):
                continue
            translated = translator.translate(value)
            if translated != value:
                tag[attr] = translated
                stats["attr_translated"] += 1

    if soup.html is not None:
        soup.html["lang"] = "vi"

    return apply_post_replacements(str(soup)), stats


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--target", required=True, type=Path)
    args = parser.parse_args()

    source_html = args.source.read_text(encoding="utf-8")
    fixed_html, stats = fix_dom(source_html, Translator())
    args.target.write_text(fixed_html, encoding="utf-8")

    print(f"Normalized: {args.target}")
    for key, value in stats.items():
        print(f"{key}={value}")


if __name__ == "__main__":
    main()
