"""Dump UC-01..UC-16 specification tables from the BRD v3 docx for comparison."""
import sys, io
from pathlib import Path
from docx import Document

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

doc = Document(str(Path(r"c:/Users/VinhDat/Desktop/REQ/Group1_Tutorial01_BRD_Ver3.docx")))

# UC-01..UC-16 spec tables are Tables 11..26
for ti in range(11, 27):
    t = doc.tables[ti]
    print(f"\n{'=' * 80}")
    print(f"TABLE {ti} (rows={len(t.rows)})")
    for ri, row in enumerate(t.rows):
        label = row.cells[0].text.strip().replace("\n", " | ")
        value = row.cells[1].text.strip().replace("\n", " | ")
        print(f"[r{ri:2d}] {label}")
        print(f"      {value}")
