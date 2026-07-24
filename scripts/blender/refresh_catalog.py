"""
Scan assets/blender/library/**/meta/asset.json and write catalog.json.

Can run with system Python or Blender:
  python scripts/blender/refresh_catalog.py
  blender --background --factory-startup --python scripts/blender/refresh_catalog.py
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LIBRARY = ROOT / "assets" / "blender" / "library"
CATALOG = ROOT / "assets" / "blender" / "catalog.json"


def main() -> int:
    assets: list[dict] = []
    if LIBRARY.exists():
        for card in sorted(LIBRARY.glob("**/meta/asset.json")):
            data = json.loads(card.read_text(encoding="utf-8"))
            rel = card.parent.parent.relative_to(LIBRARY).as_posix()
            data.setdefault("id", rel)
            data["path"] = f"library/{rel}"
            assets.append(data)

    categories = sorted(
        {
            p.name
            for p in LIBRARY.iterdir()
            if p.is_dir() and not p.name.startswith(".")
        }
    ) if LIBRARY.exists() else []

    catalog = {
        "version": 1,
        "updatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "root": "assets/blender/library",
        "layout": ["source", "web", "previews", "meta"],
        "categories": categories,
        "assets": assets,
    }
    CATALOG.parent.mkdir(parents=True, exist_ok=True)
    CATALOG.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {CATALOG.as_posix()} ({len(assets)} assets)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
