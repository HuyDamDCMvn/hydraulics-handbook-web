# Blender local toolchain (handbook)

Portable **Blender 4.5.10 LTS** lives under `tools/blender-4.5.10/` (gitignored). Official `download.blender.org` returned HTTP 403 on this network; the zip was taken from the Blender mirror `ftp.nluug.nl`.

## Asset library (reusable materials)

Versioned library under `assets/blender/library/`. See `assets/blender/README.md` and `catalog.json`.

```text
assets/blender/library/<category>/<asset-slug>/
  source/     ← .blend (append / link later)
  web/        ← .glb
  previews/   ← shaded.png, …
  meta/       ← asset.json, manifests, reports
```

Categories reserved: `pumps`, `valves`, `cylinders`, `fittings`, `motors`.

## Headless builds

```powershell
# Close-coupled pump + motor → library/pumps/close-coupled-motor
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_pump_motor_build.ps1

# Cutaway pump + flow → library/pumps/cutaway-flow
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_pump_build.ps1

# Fire pump 01 → library/pumps/fire-pump-01
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\blender\run_fire_pump_01_build.ps1

# Rebuild catalog index only
python .\scripts\blender\refresh_catalog.py
```

Each build writes `source/`, `web/`, `previews/`, `meta/`, then refreshes `assets/blender/catalog.json`.

## MCP (optional, interactive)

Not required for the headless pipeline. To enable Cursor ↔ Blender MCP later: install `uv`/`uvx`, install `addon.py` from [ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp), Connect on `localhost:9876`, then add `.cursor/mcp.json` per `docs/BLENDER_AGENT_GUIDE.md` §4.8.
