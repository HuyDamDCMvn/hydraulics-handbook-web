# Blender asset library (handbook)

Reusable 3D raw materials for schematics / R3F / chapter figures.
Do **not** dump one-off QA screenshots here — only versioned, rebuildable assets.

## Layout

```text
assets/blender/
  README.md                 ← this file
  catalog.json              ← index (auto-refreshed after builds)
  library/
    <category>/             ← pumps | valves | cylinders | fittings | motors
      <asset-slug>/
        source/             ← editable .blend (primary reusable material)
        web/                ← .glb for frontend
        previews/           ← shaded.png, wireframe.png, …
        meta/               ← asset.json, manifests, acceptance reports
```

## Current assets

| ID | Role |
| --- | --- |
| `pumps/close-coupled-motor` | Close-coupled pump + motor (isometric reference) |
| `pumps/cutaway-flow` | Cutaway pump with suction/discharge + flow animation |
| `pumps/fire-pump-01` | Skid-mounted fire pump + motor (red, orange coupling guard) |

Empty category folders (`valves/`, `cylinders/`, …) are reserved for future parts.

## Per-asset rules

Each asset folder **must** contain:

1. `source/*.blend` — open / append / link in Blender
2. `web/*.glb` — web delivery (≤ 5 MB target)
3. `previews/shaded.png` — still for docs / agent QA
4. `meta/asset.json` — bilingual title, tags, object names, build script

Optional: `previews/wireframe.png`, `meta/interaction-manifest.json`, `meta/acceptance-report.json`.

## Rebuild

```powershell
# Close-coupled pump + motor
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_pump_motor_build.ps1

# Cutaway + flow
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_pump_build.ps1

# Fire pump 01 (skid + orange guard)
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_fire_pump_01_build.ps1

# Refresh catalog only
python .\scripts\blender\refresh_catalog.py
```

## Reuse in Blender

- **Append** objects/collections from `source/*.blend` into a new scene.
- Prefer linking when the part should stay synced with the library source.
- Keep naming: `COL_*`, `OBJ_*`, `MAT_*` (see `docs/BLENDER_AGENT_GUIDE.md` §6).

## Reuse on web

Import `web/*.glb` (lazy R3F). Object names in `meta/asset.json` / interaction manifests are the contract — do not rename without updating the frontend.
