# Headless fire pump 01 asset build → library
$ErrorActionPreference = 'Stop'
$Root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$Blender = Join-Path $Root 'tools\blender-4.5.10\blender-4.5.10-windows-x64\blender.exe'
$Script = Join-Path $Root 'scripts\blender\build_fire_pump_01.py'
$OutDir = Join-Path $Root 'assets\blender\library\pumps\fire-pump-01'
$Catalog = Join-Path $Root 'scripts\blender\refresh_catalog.py'

if (-not (Test-Path -LiteralPath $Blender)) {
  throw "Blender not found at $Blender. Extract tools/blender-4.5.10 first."
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Set-Location -LiteralPath $Root

& $Blender `
  --background `
  --factory-startup `
  --python-exit-code 1 `
  --python $Script `
  -- `
  --output $OutDir

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Catalog refresh does not need bpy — prefer system Python
$Py = Get-Command python -ErrorAction SilentlyContinue
if ($Py) {
  & python $Catalog
} else {
  & $Blender --background --factory-startup --python-exit-code 1 --python $Catalog
}

exit $LASTEXITCODE
