from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
import json
import math
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parent.parent
ACTIVITY_DIR = ROOT / "docs" / "diagrams" / "drawio" / "activity"
FILES = [
    "UC-01_PlaceOnlineOrder.drawio",
    "UC-02_OnlinePayment.drawio",
    "UC-03_SchedulePickupOrder.drawio",
    "UC-04_ViewOrderHistory.drawio",
    "UC-05_ManageMenu.drawio",
    "UC-06_ManageStaff.drawio",
    "UC-07_ViewRevenueStatistics.drawio",
    "UC-08_ManageTables.drawio",
    "UC-09_CreateInStoreOrder.drawio",
    "UC-10_ProcessPayment.drawio",
    "UC-11_TrackOrder.drawio",
    "UC-12_AssignOrderToTable.drawio",
    "UC-13_ReceiveKitchenOrders.drawio",
    "UC-14_UpdateDishStatus.drawio",
    "UC-15_RateOrder.drawio",
    "UC-16_ReceiveOrderNotifications.drawio",
]
HEAVY_FILES = [
    "UC-01_PlaceOnlineOrder.drawio",
    "UC-05_ManageMenu.drawio",
    "UC-10_ProcessPayment.drawio",
    "UC-16_ReceiveOrderNotifications.drawio",
]

LANE_WIDTH = 300
LANE_HEADER_SIZE = 36
ACTION_SIZE = (220, 52)
DECISION_SIZE = (84, 84)
SMALL_NODE_SIZE = (32, 32)
INITIAL_NODE_SIZE = (24, 24)
ACTION_X = 40
DECISION_X = 108
SMALL_NODE_X = 134
INITIAL_NODE_X = 138
TOP_ANCHOR = 60
Y_SCALE = 1.30
BOTTOM_MARGIN = 80
PAGE_EXTRA = 40

SWIMLANE_PREFIX = "swimlane;"
RHOMBUS_PREFIX = "rhombus;"
ELLIPSE_PREFIX = "ellipse;"
UML_ACTIVITY_FINAL_TOKEN = "shape=umlActivityFinal"
BLACK_FILL_TOKEN = "fillColor=#000000"
WHITE_FILL_TOKEN = "fillColor=#FFFFFF"
FLOW_FINAL_STYLE = (
    "ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeColor=#000000;"
    "fillColor=#FFFFFF;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;"
)
ACTIVITY_FINAL_STYLE = (
    "ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeColor=#000000;fillColor=#FFFFFF;"
    "fontSize=18;fontStyle=1;align=center;verticalAlign=middle;"
)
ACTIVITY_FINAL_VALUES = {"●", "&#9679;", "&#x25CF;", "&#x25cf;"}
CROSS_VALUES = {"×", "&#215;", "&times;", "&#xD7;", "&#xd7;"}
EDGE_ANCHOR_KEYS = {
    "entryX",
    "entryY",
    "exitX",
    "exitY",
    "entryDx",
    "entryDy",
    "exitDx",
    "exitDy",
    "jettySize",
}
ANCHOR_PRECISION = 2
CONTROLLED_ALLOWED_FIELDS = {"value", "x", "parent", "source", "target"}
CONTROLLED_FIXES: dict[str, dict[str, dict[str, dict[str, str]]]] = {
    "UC-06_ManageStaff.drawio": {
        "39": {"value": {"old": "[Edit]", "new": "[Yes]"}},
        "54": {"value": {"old": "[Deactivate]", "new": "[No]"}},
    },
    "UC-08_ManageTables.drawio": {
        "35": {"value": {"old": "[Edit]", "new": "[Yes]"}},
        "51": {"value": {"old": "[Delete table]", "new": "[No]"}},
    },
    "UC-11_TrackOrder.drawio": {
        "36": {
            "value": {
                "old": "Show realtime-update unavailable message",
                "new": "Show real-time update unavailable message",
            }
        },
        "40": {
            "value": {
                "old": "Refresh status in real time\nwhen updates occur",
                "new": "Refresh status in real-time\nwhen updates occur",
            }
        },
    },
    "UC-13_ReceiveKitchenOrders.drawio": {
        "3": {"x": {"old": "0", "new": "300"}},
        "4": {"x": {"old": "300", "new": "0"}},
        "25": {"parent": {"old": "3", "new": "4"}},
    },
    "UC-15_RateOrder.drawio": {
        "3": {"x": {"old": "0", "new": "300"}},
        "4": {"x": {"old": "300", "new": "0"}},
        "26": {"value": {"old": 'Click "Rate Order"', "new": 'Click "Rate"'}},
        "35": {"value": {"old": 'Click "Submit Rating"', "new": 'Click "Submit Review"'}},
        "49": {
            "value": {
                "old": "Validate and save rating",
                "new": "Validate review (at least 1 star) and save",
            }
        },
    },
    "UC-16_ReceiveOrderNotifications.drawio": {
        "3": {"x": {"old": "0", "new": "300"}},
        "4": {"x": {"old": "300", "new": "0"}},
        "15": {
            "value": {
                "old": "Realtime connection lost?",
                "new": "Real-time connection lost?",
            }
        },
        "21": {
            "value": {
                "old": "Send realtime notification to Client WebApp",
                "new": "Send real-time notification to Customer WebApp",
            }
        },
        "39": {"target": {"old": "38", "new": "55"}},
        "56": {"target": {"old": "55", "new": "57"}},
    },
}


@dataclass(frozen=True)
class Snapshot:
    cell_count: int
    edge_tuples: list[tuple[str, str, str]]
    parent_map: dict[str, str]
    cell_fields: dict[str, dict[str, str]]


@dataclass(frozen=True)
class FileResult:
    file: str
    page_height_before: int
    page_height_after: int
    lane_heights_before: dict[str, int]
    lane_heights_after: dict[str, int]
    normalized_flow_final_ids: list[str]
    routed_edge_ids: list[str]
    guard_warnings: list[str]
    relayout_applied: bool
    targeted_changed_fields: list[str]
    parent_moves: list[dict[str, str]]
    rewired_edges: list[dict[str, str]]


@dataclass(frozen=True)
class VertexBox:
    x: int
    y: int
    width: int
    height: int

    @property
    def center_x(self) -> float:
        return self.x + self.width / 2.0

    @property
    def center_y(self) -> float:
        return self.y + self.height / 2.0


@dataclass(frozen=True)
class GraphContext:
    vertices: dict[str, ET.Element]
    edges: list[ET.Element]
    incoming: dict[str, list[ET.Element]]
    outgoing: dict[str, list[ET.Element]]


def round_to_10(value: float) -> int:
    return int(math.floor((value + 5) / 10.0) * 10)


def scale_y(y: float) -> int:
    return round_to_10(TOP_ANCHOR + (y - TOP_ANCHOR) * Y_SCALE)


def parse_int(value: str | None, default: int = 0) -> int:
    if value is None:
        return default
    return int(round(float(value)))


def rounded_anchor(value: float) -> str:
    return f"{value:.{ANCHOR_PRECISION}f}".rstrip("0").rstrip(".")


def is_vertex(cell: ET.Element) -> bool:
    return cell.get("vertex") == "1"


def is_edge(cell: ET.Element) -> bool:
    return cell.get("edge") == "1"


def style_of(cell: ET.Element) -> str:
    return cell.get("style") or ""


def is_swimlane(cell: ET.Element) -> bool:
    return is_vertex(cell) and style_of(cell).startswith(SWIMLANE_PREFIX)


def is_decision(cell: ET.Element) -> bool:
    return is_vertex(cell) and style_of(cell).startswith(RHOMBUS_PREFIX)


def is_ellipse(cell: ET.Element) -> bool:
    return is_vertex(cell) and style_of(cell).startswith(ELLIPSE_PREFIX)


def is_initial_node(cell: ET.Element) -> bool:
    style = style_of(cell)
    return is_ellipse(cell) and BLACK_FILL_TOKEN in style and cell.get("value") in (None, "")


def is_activity_final_node(cell: ET.Element) -> bool:
    if not is_ellipse(cell):
        return False
    value = (cell.get("value") or "").strip()
    return value in ACTIVITY_FINAL_VALUES or UML_ACTIVITY_FINAL_TOKEN in style_of(cell)


def is_flow_final_node(cell: ET.Element) -> bool:
    if not is_ellipse(cell):
        return False
    style = style_of(cell)
    value = (cell.get("value") or "").strip()
    return UML_ACTIVITY_FINAL_TOKEN not in style and value in CROSS_VALUES


def is_small_merge_like(cell: ET.Element) -> bool:
    geometry = cell.find("mxGeometry")
    if geometry is None:
        return False
    width = parse_int(geometry.get("width"))
    height = parse_int(geometry.get("height"))
    return width <= 32 and height <= 32


def classify_vertex(cell: ET.Element) -> str:
    if is_swimlane(cell):
        return "swimlane"
    if is_initial_node(cell):
        return "initial"
    if is_activity_final_node(cell) or is_flow_final_node(cell):
        return "small"
    if is_decision(cell):
        if is_small_merge_like(cell):
            return "small"
        return "decision"
    if is_ellipse(cell) and is_small_merge_like(cell):
        return "small"
    return "action"


def parse_style(style: str) -> tuple[list[str], dict[str, str]]:
    tokens: list[str] = []
    mapping: dict[str, str] = {}
    for part in style.split(";"):
        token = part.strip()
        if not token:
            continue
        if "=" in token:
            key, value = token.split("=", 1)
            mapping[key] = value
        else:
            tokens.append(token)
    return tokens, mapping


def serialize_style(tokens: list[str], mapping: dict[str, str]) -> str:
    parts = tokens + [f"{key}={value}" for key, value in mapping.items()]
    return ";".join(parts) + ";"


def vertex_box(cell: ET.Element) -> VertexBox | None:
    geometry = cell.find("mxGeometry")
    if geometry is None:
        return None
    return VertexBox(
        x=parse_int(geometry.get("x")),
        y=parse_int(geometry.get("y")),
        width=parse_int(geometry.get("width")),
        height=parse_int(geometry.get("height")),
    )


def tracked_cell_fields(cell: ET.Element) -> dict[str, str]:
    fields = {"value": cell.get("value", "")}
    geometry = cell.find("mxGeometry")
    if geometry is not None:
        fields["x"] = geometry.get("x", "")
    if is_vertex(cell) and not is_swimlane(cell):
        fields["parent"] = cell.get("parent", "")
    if is_edge(cell):
        fields["source"] = cell.get("source", "")
        fields["target"] = cell.get("target", "")
    return fields


def capture_snapshot(root: ET.Element) -> Snapshot:
    cells = root.findall(".//mxCell")
    edge_tuples: list[tuple[str, str, str]] = []
    parent_map: dict[str, str] = {}
    cell_fields: dict[str, dict[str, str]] = {}
    for cell in cells:
        cell_id = cell.get("id", "")
        cell_fields[cell_id] = tracked_cell_fields(cell)
        if is_edge(cell):
            edge_tuples.append(
                (
                    cell_id,
                    cell.get("source", ""),
                    cell.get("target", ""),
                )
            )
        if is_vertex(cell) and not is_swimlane(cell):
            parent_map[cell_id] = cell.get("parent", "")
    edge_tuples.sort()
    return Snapshot(
        cell_count=len(cells),
        edge_tuples=edge_tuples,
        parent_map=parent_map,
        cell_fields=cell_fields,
    )


def lane_children(root: ET.Element, lane_id: str) -> list[ET.Element]:
    return [
        cell
        for cell in root.findall(".//mxCell")
        if is_vertex(cell) and not is_swimlane(cell) and cell.get("parent") == lane_id
    ]


def get_field_value(cell: ET.Element, field: str) -> str:
    if field == "value":
        return cell.get("value", "")
    if field == "x":
        geometry = cell.find("mxGeometry")
        if geometry is None:
            raise AssertionError(f"Missing geometry for cell {cell.get('id', '')}")
        return geometry.get("x", "")
    return cell.get(field, "")


def set_field_value(cell: ET.Element, field: str, value: str) -> None:
    if field == "value":
        cell.set("value", value)
        return
    if field == "x":
        geometry = cell.find("mxGeometry")
        if geometry is None:
            raise AssertionError(f"Missing geometry for cell {cell.get('id', '')}")
        geometry.set("x", value)
        return
    cell.set(field, value)


def validate_fix_target(cell: ET.Element, file_name: str, cell_id: str, field: str) -> None:
    if field not in CONTROLLED_ALLOWED_FIELDS:
        raise AssertionError(f"Unsupported targeted field '{field}' in {file_name}:{cell_id}")
    if field == "value":
        return
    if field == "x":
        if cell.find("mxGeometry") is None:
            raise AssertionError(f"Missing geometry for targeted cell {file_name}:{cell_id}")
        return
    if field == "parent":
        if not is_vertex(cell) or is_swimlane(cell):
            raise AssertionError(f"Field 'parent' only allowed for non-swimlane vertices in {file_name}:{cell_id}")
        return
    if field in {"source", "target"}:
        if not is_edge(cell):
            raise AssertionError(f"Field '{field}' only allowed for edges in {file_name}:{cell_id}")
        return


def apply_controlled_fixes(diagram_root: ET.Element, file_name: str) -> list[str]:
    fixes = CONTROLLED_FIXES.get(file_name, {})
    if not fixes:
        return []

    cell_map = {cell.get("id", ""): cell for cell in diagram_root.findall("mxCell")}
    changed_fields: list[str] = []
    for cell_id, field_map in sorted(fixes.items()):
        cell = cell_map.get(cell_id)
        if cell is None:
            raise AssertionError(f"Missing targeted cell {cell_id} in {file_name}")
        for field, fix in sorted(field_map.items()):
            validate_fix_target(cell, file_name, cell_id, field)
            current = get_field_value(cell, field)
            if current == fix["new"]:
                continue
            if current != fix["old"]:
                raise AssertionError(
                    f"Unexpected {field} for {file_name}:{cell_id}: expected {fix['old']!r} or {fix['new']!r}, found {current!r}"
                )
            set_field_value(cell, field, fix["new"])
            changed_fields.append(f"{cell_id}:{field}")

    return changed_fields


def update_geometry(cell: ET.Element, *, x: int, y: int, width: int, height: int) -> None:
    geometry = cell.find("mxGeometry")
    if geometry is None:
        return
    geometry.set("x", str(x))
    geometry.set("y", str(y))
    geometry.set("width", str(width))
    geometry.set("height", str(height))


def build_graph_context(diagram_root: ET.Element) -> GraphContext:
    vertices = {
        cell.get("id", ""): cell
        for cell in diagram_root.findall("mxCell")
        if is_vertex(cell) and not is_swimlane(cell)
    }
    edges = [cell for cell in diagram_root.findall("mxCell") if is_edge(cell)]
    incoming: dict[str, list[ET.Element]] = {cell_id: [] for cell_id in vertices}
    outgoing: dict[str, list[ET.Element]] = {cell_id: [] for cell_id in vertices}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in outgoing:
            outgoing[source].append(edge)
        if target in incoming:
            incoming[target].append(edge)

    return GraphContext(vertices=vertices, edges=edges, incoming=incoming, outgoing=outgoing)


def is_terminal_small_node(cell: ET.Element, graph: GraphContext) -> bool:
    if not is_vertex(cell):
        return False
    geometry = cell.find("mxGeometry")
    if geometry is None:
        return False
    width = parse_int(geometry.get("width"))
    height = parse_int(geometry.get("height"))
    if width > 32 or height > 32:
        return False
    cell_id = cell.get("id", "")
    return len(graph.outgoing.get(cell_id, [])) == 0 and len(graph.incoming.get(cell_id, [])) >= 1


def is_pseudo_flow_final(cell: ET.Element, graph: GraphContext) -> bool:
    if not is_terminal_small_node(cell, graph) or not is_ellipse(cell):
        return False
    value = (cell.get("value") or "").strip()
    return value in CROSS_VALUES


def is_misconverted_flow_final(cell: ET.Element, graph: GraphContext) -> bool:
    return is_activity_final_node(cell) and is_terminal_small_node(cell, graph)


def normalize_pseudo_flow_finals(diagram_root: ET.Element, graph: GraphContext) -> list[str]:
    normalized_ids: list[str] = []
    for cell in graph.vertices.values():
        if not (is_pseudo_flow_final(cell, graph) or is_misconverted_flow_final(cell, graph)):
            continue
        cell.set("style", FLOW_FINAL_STYLE)
        cell.set("value", "×")
        normalized_ids.append(cell.get("id", ""))
    return normalized_ids


def restore_activity_final(graph: GraphContext) -> str | None:
    terminal_cells: list[tuple[tuple[int, int, str], ET.Element]] = []
    for cell in graph.vertices.values():
        if not is_terminal_small_node(cell, graph):
            continue
        box = vertex_box(cell)
        if box is None:
            continue
        terminal_cells.append(((box.y, box.x, cell.get("id", "")), cell))

    if not terminal_cells:
        return None

    _, final_cell = max(terminal_cells, key=lambda item: item[0])
    final_cell.set("style", ACTIVITY_FINAL_STYLE)
    final_cell.set("value", "●")
    return final_cell.get("id", "")


def clear_edge_anchor_tokens(style: str) -> tuple[list[str], dict[str, str]]:
    tokens, mapping = parse_style(style)
    for key in EDGE_ANCHOR_KEYS:
        mapping.pop(key, None)
    return tokens, mapping


def set_edge_anchors(edge: ET.Element, *, exit_x: float, exit_y: float, entry_x: float, entry_y: float) -> None:
    tokens, mapping = clear_edge_anchor_tokens(style_of(edge))
    mapping["exitX"] = rounded_anchor(exit_x)
    mapping["exitY"] = rounded_anchor(exit_y)
    mapping["entryX"] = rounded_anchor(entry_x)
    mapping["entryY"] = rounded_anchor(entry_y)
    mapping["jettySize"] = "auto"
    edge.set("style", serialize_style(tokens, mapping))


def choose_side_anchor(source_box: VertexBox, target_box: VertexBox) -> tuple[float, float, float, float]:
    if target_box.center_x >= source_box.center_x:
        return 1.0, 0.5, 0.0, 0.5
    return 0.0, 0.5, 1.0, 0.5


def route_decision_edges(graph: GraphContext) -> list[str]:
    routed_ids: list[str] = []
    for cell_id, cell in graph.vertices.items():
        if not is_decision(cell) or is_small_merge_like(cell):
            continue
        source_box = vertex_box(cell)
        if source_box is None:
            continue
        outgoing_edges = graph.outgoing.get(cell_id, [])
        if len(outgoing_edges) < 2:
            continue

        with_targets: list[tuple[ET.Element, VertexBox]] = []
        for edge in outgoing_edges:
            target = graph.vertices.get(edge.get("target", ""))
            if target is None:
                continue
            target_box = vertex_box(target)
            if target_box is None:
                continue
            with_targets.append((edge, target_box))
        if len(with_targets) < 2:
            continue

        below_candidates = [item for item in with_targets if item[1].center_y >= source_box.center_y]
        bottom_edge, _ = max(
            below_candidates or with_targets,
            key=lambda item: (item[1].center_y, -abs(item[1].center_x - source_box.center_x)),
        )
        set_edge_anchors(bottom_edge, exit_x=0.5, exit_y=1.0, entry_x=0.5, entry_y=0.0)
        routed_ids.append(bottom_edge.get("id", ""))

        for edge, target_box in with_targets:
            if edge is bottom_edge:
                continue
            exit_x, exit_y, entry_x, entry_y = choose_side_anchor(source_box, target_box)
            set_edge_anchors(edge, exit_x=exit_x, exit_y=exit_y, entry_x=entry_x, entry_y=entry_y)
            routed_ids.append(edge.get("id", ""))
    return routed_ids


def route_merge_edges(graph: GraphContext) -> list[str]:
    routed_ids: list[str] = []
    for cell_id, cell in graph.vertices.items():
        if not is_decision(cell) or not is_small_merge_like(cell):
            continue
        target_box = vertex_box(cell)
        if target_box is None:
            continue
        incoming_edges = graph.incoming.get(cell_id, [])
        if len(incoming_edges) < 2:
            continue

        with_sources: list[tuple[ET.Element, VertexBox]] = []
        for edge in incoming_edges:
            source = graph.vertices.get(edge.get("source", ""))
            if source is None:
                continue
            source_box = vertex_box(source)
            if source_box is None:
                continue
            with_sources.append((edge, source_box))
        if len(with_sources) < 2:
            continue

        above_candidates = [item for item in with_sources if item[1].center_y <= target_box.center_y]
        top_edge, _ = min(
            above_candidates or with_sources,
            key=lambda item: (abs(item[1].center_x - target_box.center_x), item[1].center_y),
        )
        set_edge_anchors(top_edge, exit_x=0.5, exit_y=1.0, entry_x=0.5, entry_y=0.0)
        routed_ids.append(top_edge.get("id", ""))

        for edge, source_box in with_sources:
            if edge is top_edge:
                continue
            if source_box.center_x <= target_box.center_x:
                set_edge_anchors(edge, exit_x=1.0, exit_y=0.5, entry_x=0.0, entry_y=0.5)
            else:
                set_edge_anchors(edge, exit_x=0.0, exit_y=0.5, entry_x=1.0, entry_y=0.5)
            routed_ids.append(edge.get("id", ""))
    return routed_ids


def guard_warnings_for_decisions(graph: GraphContext, file_name: str) -> list[str]:
    warnings: list[str] = []
    for cell_id, cell in graph.vertices.items():
        if not is_decision(cell) or is_small_merge_like(cell):
            continue
        outgoing_edges = graph.outgoing.get(cell_id, [])
        if len(outgoing_edges) < 2:
            continue
        labels = [(edge.get("value") or "").strip() for edge in outgoing_edges]
        non_empty = [label for label in labels if label]
        decision_label = cell.get("value") or cell_id

        if len(non_empty) != len(labels):
            warnings.append(
                f"{file_name}: decision '{decision_label}' ({cell_id}) has unlabeled outgoing branch(es): {labels}"
            )
            continue

        normalized = [label.casefold() for label in non_empty]
        if len(set(normalized)) != len(normalized):
            warnings.append(
                f"{file_name}: decision '{decision_label}' ({cell_id}) has duplicate guard labels: {labels}"
            )
            continue

        if len(non_empty) == 2:
            paired = {"[yes]", "[no]"}
            if set(normalized) != paired and any(label in paired for label in normalized):
                warnings.append(
                    f"{file_name}: decision '{decision_label}' ({cell_id}) uses inconsistent yes/no guards: {labels}"
                )
    return warnings


def diff_cell_fields(before: Snapshot, after: Snapshot) -> dict[str, dict[str, tuple[str, str]]]:
    diffs: dict[str, dict[str, tuple[str, str]]] = {}
    all_cell_ids = set(before.cell_fields) | set(after.cell_fields)
    for cell_id in sorted(all_cell_ids):
        before_fields = before.cell_fields.get(cell_id, {})
        after_fields = after.cell_fields.get(cell_id, {})
        changed = {
            field: (before_fields.get(field, ""), after_fields.get(field, ""))
            for field in sorted(set(before_fields) | set(after_fields))
            if before_fields.get(field, "") != after_fields.get(field, "")
        }
        if changed:
            diffs[cell_id] = changed
    return diffs


def validate_controlled_diffs(
    before: Snapshot,
    after: Snapshot,
    file_name: str,
) -> tuple[list[str], list[dict[str, str]], list[dict[str, str]]]:
    if before.cell_count != after.cell_count:
        raise AssertionError(f"Cell count changed in {file_name}")

    approved_fixes = CONTROLLED_FIXES.get(file_name, {})

    before_edges = {cell_id: (source, target) for cell_id, source, target in before.edge_tuples}
    after_edges = {cell_id: (source, target) for cell_id, source, target in after.edge_tuples}
    if set(before_edges) != set(after_edges):
        raise AssertionError(f"Edge id set changed in {file_name}")
    for cell_id in sorted(before_edges):
        before_source, before_target = before_edges[cell_id]
        after_source, after_target = after_edges[cell_id]
        if before_source != after_source and approved_fixes.get(cell_id, {}).get("source", {}).get("new") != after_source:
            raise AssertionError(f"Unapproved source change in {file_name}:{cell_id}")
        if before_target != after_target and approved_fixes.get(cell_id, {}).get("target", {}).get("new") != after_target:
            raise AssertionError(f"Unapproved target change in {file_name}:{cell_id}")

    before_parents = before.parent_map
    after_parents = after.parent_map
    if set(before_parents) != set(after_parents):
        raise AssertionError(f"Vertex parent id set changed in {file_name}")
    for cell_id in sorted(before_parents):
        if before_parents[cell_id] != after_parents[cell_id] and approved_fixes.get(cell_id, {}).get("parent", {}).get("new") != after_parents[cell_id]:
            raise AssertionError(f"Unapproved parent change in {file_name}:{cell_id}")

    diffs = diff_cell_fields(before, after)
    changed_fields: list[str] = []
    parent_moves: list[dict[str, str]] = []
    rewired_edges: list[dict[str, str]] = []
    for cell_id, field_diffs in diffs.items():
        approved_fields = approved_fixes.get(cell_id, {})
        unexpected_fields = sorted(set(field_diffs) - set(approved_fields))
        if unexpected_fields:
            raise AssertionError(
                f"Unapproved targeted change in {file_name}:{cell_id} -> {unexpected_fields}"
            )
        for field, (old_value, new_value) in field_diffs.items():
            approved = approved_fields[field]
            if old_value != approved["old"] or new_value != approved["new"]:
                raise AssertionError(
                    f"Targeted change mismatch in {file_name}:{cell_id}:{field}: "
                    f"expected {approved['old']!r}->{approved['new']!r}, found {old_value!r}->{new_value!r}"
                )
            changed_fields.append(f"{cell_id}:{field}")
            if field == "parent":
                parent_moves.append(
                    {"cell": cell_id, "old_parent": old_value, "new_parent": new_value}
                )
            if field in {"source", "target"}:
                edge_record = next((item for item in rewired_edges if item["edge"] == cell_id), None)
                if edge_record is None:
                    edge_record = {
                        "edge": cell_id,
                        "source_old": before.cell_fields.get(cell_id, {}).get("source", ""),
                        "source_new": after.cell_fields.get(cell_id, {}).get("source", ""),
                        "target_old": before.cell_fields.get(cell_id, {}).get("target", ""),
                        "target_new": after.cell_fields.get(cell_id, {}).get("target", ""),
                    }
                    rewired_edges.append(edge_record)

    return sorted(changed_fields), parent_moves, rewired_edges


def relayout_file(path: Path) -> FileResult:
    tree = ET.parse(path)
    root = tree.getroot()
    graph_model = root.find("./diagram/mxGraphModel")
    if graph_model is None:
        raise ValueError(f"Missing mxGraphModel in {path}")
    diagram_root = graph_model.find("root")
    if diagram_root is None:
        raise ValueError(f"Missing root in {path}")

    before = capture_snapshot(diagram_root)

    lanes = [cell for cell in diagram_root.findall("mxCell") if is_swimlane(cell)]
    lanes.sort(
        key=lambda lane: parse_int(
            lane.find("mxGeometry").get("x") if lane.find("mxGeometry") is not None else "0"
        )
    )

    lane_heights_before: dict[str, int] = {}
    lane_heights_after: dict[str, int] = {}
    relayout_applied = not all(
        parse_int(lane.find("mxGeometry").get("width") if lane.find("mxGeometry") is not None else "0") == LANE_WIDTH
        for lane in lanes
    )

    for index, lane in enumerate(lanes):
        geometry = lane.find("mxGeometry")
        if geometry is None:
            continue
        lane_heights_before[lane.get("id", "")] = parse_int(geometry.get("height"))
        geometry.set("x", str(index * LANE_WIDTH))
        geometry.set("width", str(LANE_WIDTH))

    if relayout_applied:
        for lane in lanes:
            lane_id = lane.get("id", "")
            max_bottom = LANE_HEADER_SIZE
            for cell in lane_children(diagram_root, lane_id):
                geometry = cell.find("mxGeometry")
                if geometry is None:
                    continue
                current_y = parse_int(geometry.get("y"))
                new_y = scale_y(current_y)
                kind = classify_vertex(cell)
                if kind == "action":
                    width, height = ACTION_SIZE
                    x = ACTION_X
                elif kind == "decision":
                    width, height = DECISION_SIZE
                    x = DECISION_X
                elif kind == "small":
                    width, height = SMALL_NODE_SIZE
                    x = SMALL_NODE_X
                elif kind == "initial":
                    width, height = INITIAL_NODE_SIZE
                    x = INITIAL_NODE_X
                else:
                    width = parse_int(geometry.get("width"))
                    height = parse_int(geometry.get("height"))
                    x = parse_int(geometry.get("x"))
                update_geometry(cell, x=x, y=new_y, width=width, height=height)
                max_bottom = max(max_bottom, new_y + height)

            lane_geometry = lane.find("mxGeometry")
            if lane_geometry is not None:
                new_height = int(math.ceil((max_bottom + BOTTOM_MARGIN) / 10.0) * 10)
                lane_geometry.set("height", str(new_height))
                lane_heights_after[lane_id] = new_height
    else:
        for lane in lanes:
            lane_geometry = lane.find("mxGeometry")
            if lane_geometry is not None:
                lane_heights_after[lane.get("id", "")] = parse_int(lane_geometry.get("height"))

    _ = apply_controlled_fixes(diagram_root, path.name)

    graph = build_graph_context(diagram_root)
    normalized_flow_final_ids = normalize_pseudo_flow_finals(diagram_root, graph)
    restored_activity_final_id = restore_activity_final(graph)
    if restored_activity_final_id and restored_activity_final_id in normalized_flow_final_ids:
        normalized_flow_final_ids.remove(restored_activity_final_id)
    routed_edge_ids = sorted(set(route_decision_edges(graph) + route_merge_edges(graph)))
    guard_warnings = guard_warnings_for_decisions(graph, path.name)

    page_height_before = parse_int(graph_model.get("pageHeight"))
    if relayout_applied:
        max_lane_height = max(lane_heights_after.values(), default=page_height_before)
        page_height_after = int(math.ceil((max_lane_height + PAGE_EXTRA) / 10.0) * 10)
        graph_model.set("pageHeight", str(page_height_after))
    else:
        page_height_after = page_height_before

    after = capture_snapshot(diagram_root)
    targeted_changed_fields, parent_moves, rewired_edges = validate_controlled_diffs(before, after, path.name)

    ET.indent(tree, space="  ")
    tree.write(path, encoding="UTF-8", xml_declaration=True)

    return FileResult(
        file=path.name,
        page_height_before=page_height_before,
        page_height_after=page_height_after,
        lane_heights_before=lane_heights_before,
        lane_heights_after=lane_heights_after,
        normalized_flow_final_ids=normalized_flow_final_ids,
        routed_edge_ids=routed_edge_ids,
        guard_warnings=guard_warnings,
        relayout_applied=relayout_applied,
        targeted_changed_fields=targeted_changed_fields,
        parent_moves=parent_moves,
        rewired_edges=rewired_edges,
    )


def verify_xml_roundtrip(path: Path) -> None:
    ET.parse(path)


def verify_targeted_notation(path: Path) -> dict[str, object]:
    tree = ET.parse(path)
    root = tree.getroot()
    diagram_root = root.find("./diagram/mxGraphModel/root")
    if diagram_root is None:
        raise ValueError(f"Missing root in {path}")

    graph = build_graph_context(diagram_root)
    flow_final_ids = sorted(
        cell.get("id", "")
        for cell in graph.vertices.values()
        if is_flow_final_node(cell)
    )
    activity_final_ids = sorted(
        cell.get("id", "")
        for cell in graph.vertices.values()
        if is_activity_final_node(cell)
    )
    return {
        "flow_final_ids": flow_final_ids,
        "activity_final_ids": activity_final_ids,
    }


def resolve_files(args: argparse.Namespace) -> list[str]:
    if args.heavy_only:
        return HEAVY_FILES
    if args.files:
        return args.files
    return FILES


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", nargs="+", choices=FILES)
    parser.add_argument("--heavy-only", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    selected_files = resolve_files(args)

    results = [relayout_file(ACTIVITY_DIR / name) for name in selected_files]

    for name in selected_files:
        verify_xml_roundtrip(ACTIVITY_DIR / name)

    notation_checks = {
        name: verify_targeted_notation(ACTIVITY_DIR / name) for name in selected_files
    }

    summary = {
        "files": [result.file for result in results],
        "page_heights": {
            result.file: {
                "before": result.page_height_before,
                "after": result.page_height_after,
            }
            for result in results
        },
        "lane_heights": {
            result.file: {
                lane_id: {
                    "before": result.lane_heights_before.get(lane_id),
                    "after": result.lane_heights_after.get(lane_id),
                }
                for lane_id in result.lane_heights_after
            }
            for result in results
        },
        "normalized_flow_finals": {
            result.file: result.normalized_flow_final_ids for result in results
        },
        "routed_edges": {
            result.file: result.routed_edge_ids for result in results
        },
        "relayout_applied": {
            result.file: result.relayout_applied for result in results
        },
        "guard_warnings": {
            result.file: result.guard_warnings for result in results if result.guard_warnings
        },
        "targeted_changed_fields": {
            result.file: result.targeted_changed_fields for result in results if result.targeted_changed_fields
        },
        "parent_moves": {
            result.file: result.parent_moves for result in results if result.parent_moves
        },
        "rewired_edges": {
            result.file: result.rewired_edges for result in results if result.rewired_edges
        },
        "notation_checks": notation_checks,
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
