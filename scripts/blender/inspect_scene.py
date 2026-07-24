import bpy

print("FRAME", bpy.context.scene.frame_current, "END", bpy.context.scene.frame_end)
for o in sorted(bpy.data.objects, key=lambda x: x.name):
    if o.type not in {"MESH", "EMPTY"}:
        continue
    mats = []
    if o.type == "MESH":
        mats = [m.name for m in o.data.materials if m]
    loc = tuple(round(c, 3) for c in o.location)
    print(f"{o.name:32} loc={loc} hide_render={o.hide_render} mats={mats}")
