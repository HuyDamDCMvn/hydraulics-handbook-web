"""Shared paths for the Blender reusable asset library."""

from __future__ import annotations

from pathlib import Path


LIBRARY_ROOT = Path("assets/blender/library")


def asset_dir(category: str, slug: str, root: Path | None = None) -> Path:
    base = root if root is not None else LIBRARY_ROOT
    return base / category / slug


def ensure_asset_layout(out_dir: Path) -> dict[str, Path]:
    """Create source / web / previews / meta under an asset folder."""
    paths = {
        "root": out_dir,
        "source": out_dir / "source",
        "web": out_dir / "web",
        "previews": out_dir / "previews",
        "meta": out_dir / "meta",
    }
    for p in paths.values():
        p.mkdir(parents=True, exist_ok=True)
    return paths
