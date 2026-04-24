from __future__ import annotations

from pathlib import Path
import xml.etree.ElementTree as ET


OUT = Path("docs/diagrams/drawio/use-case/WontonPOS_FinalV3_UseCase.drawio")

BOUNDARY = (
    "rounded=0;whiteSpace=wrap;html=1;movable=0;resizable=0;rotatable=0;"
    "deletable=0;editable=0;locked=1;connectable=0;fontFamily=Times New Roman;"
    "fontSize=12;fillColor=none;strokeColor=#000000;"
)
TITLE = (
    "text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;"
    "verticalAlign=middle;rounded=0;fontFamily=Times New Roman;fontSize=18;"
    "fontStyle=1;"
)
SUBTITLE = (
    "text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;"
    "verticalAlign=middle;rounded=0;fontFamily=Times New Roman;fontSize=12;"
)
PACKAGE = (
    "rounded=0;whiteSpace=wrap;html=1;fontFamily=Times New Roman;fontSize=13;"
    "fontStyle=1;align=center;verticalAlign=top;spacingTop=6;fillColor=#ffffff;"
    "strokeColor=#000000;"
)
USECASE = "ellipse;whiteSpace=wrap;html=1;fontFamily=Times New Roman;fontSize=12;fillColor=#ffffff;strokeColor=#000000;"
ACTOR = "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;fontFamily=Times New Roman;fontSize=12;fillColor=#ffffff;strokeColor=#000000;"
ASSOC = "rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=none;endFill=0;fontFamily=Times New Roman;fontSize=11;"
DEPEND = "rounded=0;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;endArrow=open;endFill=0;fontFamily=Times New Roman;fontSize=11;"
GENERAL = "rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=0;fontFamily=Times New Roman;fontSize=11;"
INCLUDE_LABEL = "&lt;&lt;include&gt;&gt;"
EXTEND_LABEL = "&lt;&lt;extend&gt;&gt;"


def mx_cell(root: ET.Element, cell_id: str, **attrs: object) -> ET.Element:
    cell_attrs = {"id": cell_id, "parent": "1"}
    for key, value in attrs.items():
        if value is not None:
            cell_attrs[key] = str(value)
    return ET.SubElement(root, "mxCell", cell_attrs)


def geometry(cell: ET.Element, **attrs: object) -> None:
    geo_attrs = {"as": "geometry"}
    for key, value in attrs.items():
        if value is not None:
            geo_attrs[key] = str(value)
    ET.SubElement(cell, "mxGeometry", geo_attrs)


def vertex(
    root: ET.Element,
    cell_id: str,
    value: str,
    style: str,
    x: int,
    y: int,
    width: int,
    height: int,
) -> None:
    cell = mx_cell(root, cell_id, value=value, style=style, vertex=1)
    geometry(cell, x=x, y=y, width=width, height=height)


def edge(
    root: ET.Element,
    cell_id: str,
    source: str,
    target: str,
    style: str = ASSOC,
    value: str = "",
) -> None:
    cell = mx_cell(
        root,
        cell_id,
        value=value,
        style=style,
        edge=1,
        source=source,
        target=target,
    )
    geometry(cell, relative=1)


def base_diagram(mxfile: ET.Element, name: str, page_width: int, page_height: int) -> ET.Element:
    diagram = ET.SubElement(mxfile, "diagram", {"id": name.lower().replace(" ", "-"), "name": name})
    model = ET.SubElement(
        diagram,
        "mxGraphModel",
        {
            "dx": "1800",
            "dy": "1200",
            "grid": "1",
            "gridSize": "10",
            "guides": "1",
            "tooltips": "1",
            "connect": "1",
            "arrows": "1",
            "fold": "1",
            "page": "1",
            "pageScale": "1",
            "pageWidth": str(page_width),
            "pageHeight": str(page_height),
            "math": "0",
            "shadow": "0",
        },
    )
    root = ET.SubElement(model, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})
    return root


def add_full_page(mxfile: ET.Element) -> None:
    root = base_diagram(mxfile, "Full 26 UC", 1800, 1200)
    vertex(root, "full_boundary", "", BOUNDARY, 250, 120, 1240, 930)
    vertex(root, "full_title", "Wonton POS - Final BRD v3 Use Case Diagram", TITLE, 250, 45, 1240, 35)
    vertex(
        root,
        "full_subtitle",
        "26 use cases in scope. Dine-in / Takeaway / Pickup. Delivery is out of scope (UC-50).",
        SUBTITLE,
        250,
        80,
        1240,
        25,
    )

    actors = {
        "customer": ("Customer<br/>(Guest / Registered)", 60, 230),
        "registered": ("Registered<br/>Customer", 60, 440),
        "manager": ("Manager", 1600, 140),
        "foh": ("FOH Staff", 1600, 310),
        "cashier": ("Cashier", 1600, 480),
        "service": ("Service Staff<br/>(Waiter)", 1600, 650),
        "boh": ("BOH Staff<br/>(Kitchen)", 1600, 850),
    }
    for key, (label, x, y) in actors.items():
        vertex(root, f"full_actor_{key}", label, ACTOR, x, y, 70, 100)

    vertex(root, "full_pkg_client", "Client WebApp - Customer Facing", PACKAGE, 290, 160, 380, 800)
    vertex(root, "full_pkg_manager", "Admin WebApp - Manager Control", PACKAGE, 720, 160, 330, 650)
    vertex(root, "full_pkg_foh", "Admin WebApp - FOH Operations", PACKAGE, 1090, 160, 350, 650)
    vertex(root, "full_pkg_boh", "Admin WebApp - BOH Operations", PACKAGE, 720, 840, 720, 160)

    usecases = {
        "uc25": ("Manage Customer Account<br/>and Authentication", 320, 220),
        "uc01": ("Place Online Order", 320, 320),
        "uc03": ("Schedule Pickup Order", 320, 410),
        "uc26": ("Complete Checkout<br/>and Apply Promotion", 320, 500),
        "uc02": ("Online Payment", 320, 590),
        "uc04": ("View Order History", 500, 320),
        "uc17": ("Reorder Past Order", 500, 410),
        "uc11": ("Track Order", 500, 500),
        "uc16": ("Receive Order Notifications", 500, 590),
        "uc15": ("Rate Order", 500, 680),
        "uc19": ("View Operational Dashboard", 750, 220),
        "uc07": ("View Revenue Statistics", 750, 305),
        "uc05": ("Manage Menu", 750, 390),
        "uc08": ("Manage Tables", 750, 475),
        "uc06": ("Manage Staff", 750, 560),
        "uc18": ("Manage Promotions", 750, 645),
        "uc21": ("Close Shift and<br/>Reconcile End-of-day", 750, 730),
        "uc09": ("Create In-Store Order", 1125, 220),
        "uc12": ("Assign Order to Table", 1125, 305),
        "uc10": ("Process Payment", 1125, 390),
        "uc20": ("Manage Active Orders", 1125, 475),
        "uc23": ("Serve and Confirm Handoff", 1125, 560),
        "uc24": ("Handle Complaint and<br/>Operational Exception", 1125, 645),
        "uc13": ("Receive Kitchen Orders", 785, 895),
        "uc14": ("Update Dish Status", 1015, 895),
        "uc22": ("Mark Menu Item as 86'd", 1245, 895),
    }
    for key, (label, x, y) in usecases.items():
        vertex(root, f"full_{key}", label, USECASE, x, y, 165, 58)

    edge(root, "full_gen_registered_customer", "full_actor_registered", "full_actor_customer", GENERAL)
    edge(root, "full_gen_cashier_foh", "full_actor_cashier", "full_actor_foh", GENERAL)
    edge(root, "full_gen_service_foh", "full_actor_service", "full_actor_foh", GENERAL)

    customer_links = ["uc25", "uc01", "uc03", "uc26", "uc02", "uc11", "uc16"]
    registered_links = ["uc04", "uc17", "uc15"]
    manager_links = ["uc19", "uc07", "uc05", "uc08", "uc06", "uc18", "uc21", "uc20", "uc22", "uc24"]
    foh_links = ["uc09", "uc12", "uc20", "uc24"]
    cashier_links = ["uc10", "uc21", "uc23"]
    service_links = ["uc23"]
    boh_links = ["uc13", "uc14", "uc22"]

    for i, uc in enumerate(customer_links, 1):
        edge(root, f"full_assoc_customer_{i}", "full_actor_customer", f"full_{uc}")
    for i, uc in enumerate(registered_links, 1):
        edge(root, f"full_assoc_registered_{i}", "full_actor_registered", f"full_{uc}")
    for i, uc in enumerate(manager_links, 1):
        edge(root, f"full_assoc_manager_{i}", "full_actor_manager", f"full_{uc}")
    for i, uc in enumerate(foh_links, 1):
        edge(root, f"full_assoc_foh_{i}", "full_actor_foh", f"full_{uc}")
    for i, uc in enumerate(cashier_links, 1):
        edge(root, f"full_assoc_cashier_{i}", "full_actor_cashier", f"full_{uc}")
    for i, uc in enumerate(service_links, 1):
        edge(root, f"full_assoc_service_{i}", "full_actor_service", f"full_{uc}")
    for i, uc in enumerate(boh_links, 1):
        edge(root, f"full_assoc_boh_{i}", "full_actor_boh", f"full_{uc}")

    include_edges = [("uc01", "uc26"), ("uc03", "uc26"), ("uc03", "uc02")]
    extend_edges = [
        ("uc02", "uc26"),
        ("uc12", "uc09"),
        ("uc10", "uc09"),
        ("uc17", "uc04"),
        ("uc15", "uc04"),
        ("uc16", "uc11"),
        ("uc22", "uc14"),
        ("uc24", "uc20"),
        ("uc24", "uc22"),
        ("uc24", "uc23"),
    ]
    for i, (source, target) in enumerate(include_edges, 1):
        edge(root, f"full_include_{i}", f"full_{source}", f"full_{target}", DEPEND, INCLUDE_LABEL)
    for i, (source, target) in enumerate(extend_edges, 1):
        edge(root, f"full_extend_{i}", f"full_{source}", f"full_{target}", DEPEND, EXTEND_LABEL)


def add_client_page(mxfile: ET.Element) -> None:
    root = base_diagram(mxfile, "Client WebApp", 1400, 900)
    vertex(root, "client_boundary", "", BOUNDARY, 220, 120, 960, 650)
    vertex(root, "client_title", "Wonton POS - Client WebApp Use Case Diagram", TITLE, 220, 45, 960, 35)
    vertex(
        root,
        "client_subtitle",
        "10 customer-facing use cases. Guest checkout remains allowed; registered-only actions inherit Customer behavior.",
        SUBTITLE,
        220,
        80,
        960,
        25,
    )

    vertex(root, "client_actor_customer", "Customer<br/>(Guest / Registered)", ACTOR, 60, 250, 70, 100)
    vertex(root, "client_actor_registered", "Registered<br/>Customer", ACTOR, 60, 520, 70, 100)
    edge(root, "client_gen_registered_customer", "client_actor_registered", "client_actor_customer", GENERAL)

    vertex(root, "client_pkg_access", "Customer Access and Onboarding", PACKAGE, 260, 170, 240, 150)
    vertex(root, "client_pkg_order", "Ordering and Checkout", PACKAGE, 540, 170, 560, 250)
    vertex(root, "client_pkg_post", "Post-order Journey", PACKAGE, 360, 470, 650, 240)

    usecases = {
        "uc25": ("Manage Customer Account<br/>and Authentication", 295, 225),
        "uc01": ("Place Online Order", 580, 230),
        "uc03": ("Schedule Pickup Order", 820, 230),
        "uc26": ("Complete Checkout<br/>and Apply Promotion", 580, 330),
        "uc02": ("Online Payment", 820, 330),
        "uc04": ("View Order History", 400, 535),
        "uc17": ("Reorder Past Order", 620, 535),
        "uc11": ("Track Order", 840, 535),
        "uc15": ("Rate Order", 510, 640),
        "uc16": ("Receive Order Notifications", 730, 640),
    }
    for key, (label, x, y) in usecases.items():
        vertex(root, f"client_{key}", label, USECASE, x, y, 170, 58)

    for i, uc in enumerate(["uc25", "uc01", "uc03", "uc26", "uc02", "uc11", "uc16"], 1):
        edge(root, f"client_assoc_customer_{i}", "client_actor_customer", f"client_{uc}")
    for i, uc in enumerate(["uc04", "uc17", "uc15"], 1):
        edge(root, f"client_assoc_registered_{i}", "client_actor_registered", f"client_{uc}")

    for i, (source, target) in enumerate([("uc01", "uc26"), ("uc03", "uc26"), ("uc03", "uc02")], 1):
        edge(root, f"client_include_{i}", f"client_{source}", f"client_{target}", DEPEND, INCLUDE_LABEL)
    for i, (source, target) in enumerate([("uc02", "uc26"), ("uc17", "uc04"), ("uc15", "uc04"), ("uc16", "uc11")], 1):
        edge(root, f"client_extend_{i}", f"client_{source}", f"client_{target}", DEPEND, EXTEND_LABEL)


def add_admin_page(mxfile: ET.Element) -> None:
    root = base_diagram(mxfile, "Admin WebApp", 1600, 980)
    vertex(root, "admin_boundary", "", BOUNDARY, 220, 120, 1120, 760)
    vertex(root, "admin_title", "Wonton POS - Admin WebApp Use Case Diagram", TITLE, 220, 45, 1120, 35)
    vertex(
        root,
        "admin_subtitle",
        "16 use cases for Manager, FOH / Cashier / Service Staff, and BOH Staff. Multi-role staffing is allowed.",
        SUBTITLE,
        220,
        80,
        1120,
        25,
    )

    actor_positions = {
        "foh": ("FOH Staff", 40, 220),
        "cashier": ("Cashier", 40, 390),
        "service": ("Service Staff<br/>(Waiter)", 40, 560),
        "manager": ("Manager", 1450, 260),
        "boh": ("BOH Staff<br/>(Kitchen)", 1450, 680),
    }
    for key, (label, x, y) in actor_positions.items():
        vertex(root, f"admin_actor_{key}", label, ACTOR, x, y, 70, 100)

    edge(root, "admin_gen_cashier_foh", "admin_actor_cashier", "admin_actor_foh", GENERAL)
    edge(root, "admin_gen_service_foh", "admin_actor_service", "admin_actor_foh", GENERAL)

    vertex(root, "admin_pkg_foh", "FOH Operations", PACKAGE, 270, 170, 390, 560)
    vertex(root, "admin_pkg_manager", "Manager Control", PACKAGE, 720, 170, 500, 430)
    vertex(root, "admin_pkg_boh", "BOH Operations", PACKAGE, 720, 650, 500, 170)

    usecases = {
        "uc09": ("Create In-Store Order", 305, 235),
        "uc12": ("Assign Order to Table", 305, 330),
        "uc10": ("Process Payment", 305, 425),
        "uc20": ("Manage Active Orders", 470, 235),
        "uc23": ("Serve and Confirm Handoff", 470, 330),
        "uc24": ("Handle Complaint and<br/>Operational Exception", 470, 425),
        "uc19": ("View Operational Dashboard", 755, 235),
        "uc07": ("View Revenue Statistics", 980, 235),
        "uc05": ("Manage Menu", 755, 330),
        "uc08": ("Manage Tables", 980, 330),
        "uc06": ("Manage Staff", 755, 425),
        "uc18": ("Manage Promotions", 980, 425),
        "uc21": ("Close Shift and<br/>Reconcile End-of-day", 865, 520),
        "uc13": ("Receive Kitchen Orders", 760, 710),
        "uc14": ("Update Dish Status", 930, 710),
        "uc22": ("Mark Menu Item as 86'd", 1100, 710),
    }
    for key, (label, x, y) in usecases.items():
        vertex(root, f"admin_{key}", label, USECASE, x, y, 165, 58)

    for i, uc in enumerate(["uc19", "uc07", "uc05", "uc08", "uc06", "uc18", "uc21", "uc20", "uc22", "uc24"], 1):
        edge(root, f"admin_assoc_manager_{i}", "admin_actor_manager", f"admin_{uc}")
    for i, uc in enumerate(["uc09", "uc12", "uc20", "uc24"], 1):
        edge(root, f"admin_assoc_foh_{i}", "admin_actor_foh", f"admin_{uc}")
    for i, uc in enumerate(["uc10", "uc21", "uc23"], 1):
        edge(root, f"admin_assoc_cashier_{i}", "admin_actor_cashier", f"admin_{uc}")
    edge(root, "admin_assoc_service_1", "admin_actor_service", "admin_uc23")
    for i, uc in enumerate(["uc13", "uc14", "uc22"], 1):
        edge(root, f"admin_assoc_boh_{i}", "admin_actor_boh", f"admin_{uc}")

    extend_edges = [
        ("uc12", "uc09"),
        ("uc10", "uc09"),
        ("uc22", "uc14"),
        ("uc24", "uc20"),
        ("uc24", "uc22"),
        ("uc24", "uc23"),
    ]
    for i, (source, target) in enumerate(extend_edges, 1):
        edge(root, f"admin_extend_{i}", f"admin_{source}", f"admin_{target}", DEPEND, EXTEND_LABEL)


def main() -> None:
    mxfile = ET.Element(
        "mxfile",
        {
            "host": "app.diagrams.net",
            "agent": "Codex",
            "version": "29.6.1",
        },
    )
    add_full_page(mxfile)
    add_client_page(mxfile)
    add_admin_page(mxfile)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    tree = ET.ElementTree(mxfile)
    ET.indent(tree, space="  ")
    tree.write(OUT, encoding="utf-8", xml_declaration=False)
    print(OUT)


if __name__ == "__main__":
    main()
