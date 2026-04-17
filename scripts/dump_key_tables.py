"""Dump full content of key tables for planning edits."""
import sys, io
from pathlib import Path
from docx import Document

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

doc = Document(str(Path(r"c:/Users/VinhDat/Desktop/REQ/Group1_Tutorial01_BRD_Ver3.docx")))

# Dump tables we plan to edit
FOCUS = [0, 2, 4, 7, 9, 10, 11]  # version, project-details, glossary, assumptions, FR, NFR, UC-01
for ti in FOCUS:
    t = doc.tables[ti]
    print(f"\n=== TABLE {ti} (rows={len(t.rows)}, cols={len(t.columns)}) ===")
    for ri, row in enumerate(t.rows):
        for ci, cell in enumerate(row.cells):
            txt = cell.text.strip().replace("\n", " / ")
            if len(txt) > 160:
                txt = txt[:157] + "..."
            print(f"  [r{ri:2d} c{ci}] {txt}")
