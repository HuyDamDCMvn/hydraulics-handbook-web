"""
Build a didactic centrifugal-pump assembly with suction/discharge pipes
and animated internal flow markers. Headless-safe (Blender Data API).

Usage:
  blender --background --factory-startup --python-exit-code 1 \\
    --python scripts/blender/build_pump_flow.py -- \\
    --output assets/blender/library/pumps/cutaway-flow
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Euler, Vector

_SCRIPTS_DIR = Path(__file__).resolve().parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))

from library_paths import asset_dir, ensure_asset_layout  # noqa: E402


ASSET_ID = "pumps/cutaway-flow"
ASSET_STEM = "pump-flow"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args(argv: list[str]) -> argparse.Namespace:
    if "--" in argv:
        argv = argv[argv.index("--") + 1 :]
    else:
        argv = []
    p = argparse.ArgumentParser(description="Build pump + flow animation asset")
    p.add_argument(
        "--output",
        type=Path,
        default=asset_dir("pumps", "cutaway-flow"),
        help="Asset root (source/ web/ previews/ meta/)",
    )
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--flow-seconds", type=float, default=4.0)
    p.add_argument("--preview-samples", type=int, default=32)
    return p.parse_args(argv)


# ---------------------------------------------------------------------------
# Scene helpers
# ---------------------------------------------------------------------------

def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.curves, bpy.data.actions):
        for item in list(block):
            block.remove(item)


def ensure_collection(name: str) -> bpy.types.Collection:
    col = bpy.data.collections.get(name)
    if col is None:
        col = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(col)
    return col


def link_object(obj: bpy.types.Object, collection: bpy.types.Collection) -> None:
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    collection.objects.link(obj)


def new_material(name: str, color: tuple[float, float, float, float], **kw) -> bpy.types.Material:
    mat = bpy.data.materials.get(name)
    if mat is None:
        mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    out = nodes.new("ShaderNodeOutputMaterial")
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = float(kw.get("metallic", 0.05))
    bsdf.inputs["Roughness"].default_value = float(kw.get("roughness", 0.45))
    if "transmission" in kw and "Transmission Weight" in bsdf.inputs:
        bsdf.inputs["Transmission Weight"].default_value = float(kw["transmission"])
    if "alpha" in kw:
        bsdf.inputs["Alpha"].default_value = float(kw["alpha"])
        mat.blend_method = "BLEND"
        if hasattr(mat, "surface_render_method"):
            mat.surface_render_method = "BLENDED"
        if hasattr(mat, "use_transparency_overlap"):
            mat.use_transparency_overlap = True
    if "emission" in kw:
        bsdf.inputs["Emission Color"].default_value = kw["emission"]
        bsdf.inputs["Emission Strength"].default_value = float(kw.get("emission_strength", 2.0))
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat


def assign_material(obj: bpy.types.Object, mat: bpy.types.Material) -> None:
    if obj.data.materials:
        obj.data.materials[0] = mat
    else:
        obj.data.materials.append(mat)


def shade_smooth(obj: bpy.types.Object) -> None:
    if obj.type != "MESH":
        return
    mesh = obj.data
    values = [True] * len(mesh.polygons)
    mesh.polygons.foreach_set("use_smooth", values)
    if hasattr(mesh, "use_auto_smooth"):
        mesh.use_auto_smooth = True


def bisect_open_toward_neg_y(obj: bpy.types.Object) -> None:
    """Remove the -Y half so a camera on -Y looks into the open cutaway."""
    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    bmesh.ops.bisect_plane(
        bm,
        geom=geom,
        dist=0.0001,
        plane_co=(0.0, 0.0, 0.0),
        plane_no=(0.0, -1.0, 0.0),
        clear_outer=True,
        clear_inner=False,
    )
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()


def delete_object(obj: bpy.types.Object) -> None:
    bpy.data.objects.remove(obj, do_unlink=True)


def add_cylinder(
    name: str,
    radius: float,
    depth: float,
    location: Vector,
    rotation: Euler,
    collection: bpy.types.Collection,
    vertices: int = 48,
) -> bpy.types.Object:
    mesh = bpy.data.meshes.new(f"MSH_{name}")
    obj = bpy.data.objects.new(name, mesh)
    link_object(obj, collection)
    bpy.context.view_layer.objects.active = obj

    # Build cylinder via bmesh-free primitive ops in OBJECT mode with context override
    bm_verts = []
    bm_faces = []
    # Manual mesh: top/bottom rings
    half = depth * 0.5
    for i in range(vertices):
        a = (i / vertices) * math.tau
        x = math.cos(a) * radius
        y = math.sin(a) * radius
        bm_verts.append((x, y, -half))
    for i in range(vertices):
        a = (i / vertices) * math.tau
        x = math.cos(a) * radius
        y = math.sin(a) * radius
        bm_verts.append((x, y, half))
    # side faces
    for i in range(vertices):
        j = (i + 1) % vertices
        bm_faces.append((i, j, vertices + j, vertices + i))
    # caps
    bottom = list(range(vertices))
    top = list(range(vertices, vertices * 2))
    bm_faces.append(bottom)
    bm_faces.append(list(reversed(top)))

    mesh.from_pydata(bm_verts, [], bm_faces)
    mesh.update()
    obj.location = location
    obj.rotation_euler = rotation
    return obj


def add_uv_sphere(
    name: str,
    radius: float,
    location: Vector,
    collection: bpy.types.Collection,
    segments: int = 16,
    rings: int = 8,
) -> bpy.types.Object:
    # Lightweight icosphere-like UV sphere via ops with temporary context
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=radius,
        segments=segments,
        ring_count=rings,
        location=location,
    )
    obj = bpy.context.active_object
    obj.name = name
    if obj.data:
        obj.data.name = f"MSH_{name}"
    link_object(obj, collection)
    return obj


def add_torus(
    name: str,
    major: float,
    minor: float,
    location: Vector,
    rotation: Euler,
    collection: bpy.types.Collection,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major,
        minor_radius=minor,
        major_segments=48,
        minor_segments=16,
        location=location,
        rotation=rotation,
    )
    obj = bpy.context.active_object
    obj.name = name
    if obj.data:
        obj.data.name = f"MSH_{name}"
    link_object(obj, collection)
    return obj


def add_cube(
    name: str,
    size: tuple[float, float, float],
    location: Vector,
    collection: bpy.types.Collection,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.active_object
    obj.name = name
    if obj.data:
        obj.data.name = f"MSH_{name}"
    obj.scale = Vector(size) * 0.5
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    link_object(obj, collection)
    return obj


def apply_object_transforms(obj: bpy.types.Object) -> None:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    obj.select_set(False)


# ---------------------------------------------------------------------------
# Geometry: pump
# ---------------------------------------------------------------------------

def build_pump(args: argparse.Namespace) -> dict:
    scene = bpy.context.scene
    scene.render.fps = args.fps
    scene.frame_start = 1
    total_frames = max(2, int(args.flow_seconds * args.fps))
    scene.frame_end = total_frames
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0

    col_main = ensure_collection("COL_PumpAssembly")
    col_flow = ensure_collection("COL_FlowMarkers")
    col_cam = ensure_collection("COL_Preview")

    mat_metal = new_material(
        "MAT_Pump_CastIron",
        (0.22, 0.28, 0.34, 1.0),
        metallic=0.55,
        roughness=0.38,
    )
    mat_pipe = new_material(
        "MAT_Pipe_Steel",
        (0.55, 0.62, 0.68, 1.0),
        metallic=0.65,
        roughness=0.35,
    )
    mat_impeller = new_material(
        "MAT_Impeller_Bronze",
        (0.82, 0.55, 0.2, 1.0),
        metallic=0.55,
        roughness=0.3,
    )
    mat_flow = new_material(
        "MAT_Flow_Cyan",
        (0.05, 0.75, 0.95, 1.0),
        metallic=0.0,
        roughness=0.25,
        emission=(0.1, 0.9, 1.0, 1.0),
        emission_strength=6.0,
    )
    mat_base = new_material(
        "MAT_Base_Concrete",
        (0.55, 0.54, 0.52, 1.0),
        metallic=0.0,
        roughness=0.85,
    )
    mat_arrow = new_material(
        "MAT_Label_Accent",
        (0.0, 0.45, 0.55, 1.0),
        metallic=0.1,
        roughness=0.4,
        emission=(0.05, 0.55, 0.65, 1.0),
        emission_strength=1.5,
    )

    # --- Base plate ---
    base = add_cube("OBJ_Pump_Base", (1.4, 0.9, 0.08), Vector((0.0, 0.0, 0.04)), col_main)
    assign_material(base, mat_base)

    # --- Volute / casing (torus segment approx as full torus + cylinder body) ---
    casing = add_torus(
        "OBJ_Pump_Casing",
        major=0.28,
        minor=0.12,
        location=Vector((0.0, 0.0, 0.42)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col_main,
    )
    assign_material(casing, mat_metal)
    shade_smooth(casing)
    # Apply rotation so bisect uses world-ish local axes after apply
    bpy.context.view_layer.update()
    bpy.ops.object.select_all(action="DESELECT")
    casing.select_set(True)
    bpy.context.view_layer.objects.active = casing
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    bisect_open_toward_neg_y(casing)

    body = add_cylinder(
        "OBJ_Pump_Body",
        radius=0.22,
        depth=0.28,
        location=Vector((0.0, 0.0, 0.42)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=48,
    )
    assign_material(body, mat_metal)
    shade_smooth(body)
    bisect_open_toward_neg_y(body)

    # Motor / drive stub
    motor = add_cylinder(
        "OBJ_Pump_Motor",
        radius=0.16,
        depth=0.36,
        location=Vector((0.0, -0.42, 0.42)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=32,
    )
    assign_material(motor, mat_metal)

    # Impeller (visible in cutaway) — disk + blades
    impeller = add_cylinder(
        "OBJ_Impeller",
        radius=0.16,
        depth=0.04,
        location=Vector((0.0, 0.0, 0.42)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=32,
    )
    assign_material(impeller, mat_impeller)

    blades = []
    for i in range(6):
        ang = i * (math.tau / 6)
        blade = add_cube(
            f"OBJ_Impeller_Blade_{i+1:02d}",
            (0.14, 0.03, 0.05),
            Vector((math.cos(ang) * 0.08, math.sin(ang) * 0.08, 0.42)),
            col_main,
        )
        blade.rotation_euler = Euler((0.0, 0.0, ang), "XYZ")
        assign_material(blade, mat_impeller)
        blades.append(blade)
        blade.parent = impeller

    # Rotate impeller continuously
    impeller.rotation_mode = "XYZ"
    impeller.keyframe_insert(data_path="rotation_euler", frame=1, index=2)
    impeller.rotation_euler[2] = math.tau
    impeller.keyframe_insert(data_path="rotation_euler", frame=total_frames, index=2)
    if impeller.animation_data and impeller.animation_data.action:
        action = impeller.animation_data.action
        action.name = "ACT_Impeller_Spin"
        for fc in action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"

    # --- Suction pipe (horizontal inlet from -X) ---
    suction = add_cylinder(
        "OBJ_Pipe_Suction",
        radius=0.09,
        depth=0.95,
        location=Vector((-0.72, 0.0, 0.42)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col_main,
        vertices=40,
    )
    assign_material(suction, mat_pipe)
    shade_smooth(suction)
    bpy.ops.object.select_all(action="DESELECT")
    suction.select_set(True)
    bpy.context.view_layer.objects.active = suction
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    bisect_open_toward_neg_y(suction)

    suction_flange = add_cylinder(
        "OBJ_Pipe_Suction_Flange",
        radius=0.14,
        depth=0.04,
        location=Vector((-1.18, 0.0, 0.42)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col_main,
        vertices=32,
    )
    assign_material(suction_flange, mat_pipe)
    shade_smooth(suction_flange)

    # --- Discharge pipe (vertical upward then short elbow to +Y) ---
    discharge_v = add_cylinder(
        "OBJ_Pipe_Discharge",
        radius=0.075,
        depth=0.7,
        location=Vector((0.35, 0.0, 0.78)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=40,
    )
    assign_material(discharge_v, mat_pipe)
    shade_smooth(discharge_v)
    bisect_open_toward_neg_y(discharge_v)

    # Elbow / outlet stub
    discharge_h = add_cylinder(
        "OBJ_Pipe_Discharge_Outlet",
        radius=0.075,
        depth=0.45,
        location=Vector((0.35, 0.28, 1.12)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=40,
    )
    assign_material(discharge_h, mat_pipe)
    shade_smooth(discharge_h)
    # Open top of horizontal outlet toward +Z camera-up visibility: bisect local after apply
    bpy.ops.object.select_all(action="DESELECT")
    discharge_h.select_set(True)
    bpy.context.view_layer.objects.active = discharge_h
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    # After apply, cylinder axis is along Y; open toward +Z with a Z plane keep -Z
    mesh = discharge_h.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    bmesh.ops.bisect_plane(
        bm,
        geom=geom,
        dist=0.0001,
        plane_co=(0.0, 0.0, 0.0),
        plane_no=(0.0, 0.0, 1.0),
        clear_outer=True,
        clear_inner=False,
    )
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()

    discharge_flange = add_cylinder(
        "OBJ_Pipe_Discharge_Flange",
        radius=0.12,
        depth=0.035,
        location=Vector((0.35, 0.50, 1.12)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=32,
    )
    assign_material(discharge_flange, mat_pipe)
    shade_smooth(discharge_flange)

    # Direction labels (simple cones as arrow heads)
    arrow_in = add_cylinder(
        "OBJ_Arrow_Suction",
        radius=0.04,
        depth=0.12,
        location=Vector((-1.35, 0.0, 0.42)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col_main,
        vertices=12,
    )
    assign_material(arrow_in, mat_arrow)

    arrow_out = add_cylinder(
        "OBJ_Arrow_Discharge",
        radius=0.035,
        depth=0.1,
        location=Vector((0.35, 0.62, 1.12)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col_main,
        vertices=12,
    )
    assign_material(arrow_out, mat_arrow)

    # Hotspots for frontend
    emp_suction = bpy.data.objects.new("EMP_Hotspot_Suction", None)
    emp_suction.empty_display_type = "SPHERE"
    emp_suction.empty_display_size = 0.08
    emp_suction.location = Vector((-1.18, 0.0, 0.42))
    emp_suction["interactive"] = True
    emp_suction["event"] = "suction-inspect"
    emp_suction["label"] = "Suction inlet"
    link_object(emp_suction, col_main)

    emp_discharge = bpy.data.objects.new("EMP_Hotspot_Discharge", None)
    emp_discharge.empty_display_type = "SPHERE"
    emp_discharge.empty_display_size = 0.08
    emp_discharge.location = Vector((0.35, 0.50, 1.12))
    emp_discharge["interactive"] = True
    emp_discharge["event"] = "discharge-inspect"
    emp_discharge["label"] = "Discharge outlet"
    link_object(emp_discharge, col_main)

    emp_casing = bpy.data.objects.new("EMP_Hotspot_Casing", None)
    emp_casing.empty_display_type = "SPHERE"
    emp_casing.empty_display_size = 0.1
    emp_casing.location = Vector((0.0, 0.28, 0.42))
    emp_casing["interactive"] = True
    emp_casing["event"] = "pump-select"
    emp_casing["label"] = "Pump casing"
    link_object(emp_casing, col_main)

    # --- Flow path polyline (suction → impeller → discharge → outlet) ---
    path_points = [
        Vector((-1.15, 0.0, 0.42)),
        Vector((-0.55, 0.0, 0.42)),
        Vector((-0.15, 0.0, 0.42)),
        Vector((0.0, 0.0, 0.42)),
        Vector((0.22, 0.0, 0.55)),
        Vector((0.35, 0.0, 0.75)),
        Vector((0.35, 0.0, 1.05)),
        Vector((0.35, 0.22, 1.12)),
        Vector((0.35, 0.48, 1.12)),
    ]

    def sample_path(t: float) -> Vector:
        """t in [0, 1] along polyline."""
        t = max(0.0, min(1.0, t))
        segs = len(path_points) - 1
        x = t * segs
        i = min(int(x), segs - 1)
        local = x - i
        return path_points[i].lerp(path_points[i + 1], local)

    bead_count = 12
    flow_objects = []
    for i in range(bead_count):
        phase = i / bead_count
        bead = add_uv_sphere(
            f"OBJ_Flow_Bead_{i+1:02d}",
            radius=0.055,
            location=sample_path(phase),
            collection=col_flow,
            segments=16,
            rings=10,
        )
        assign_material(bead, mat_flow)
        shade_smooth(bead)
        flow_objects.append((bead, phase))

        # Keyframes looping along path
        for f in range(1, total_frames + 1):
            u = (phase + (f - 1) / total_frames) % 1.0
            bead.location = sample_path(u)
            bead.keyframe_insert(data_path="location", frame=f)

        if bead.animation_data and bead.animation_data.action:
            action = bead.animation_data.action
            if i == 0:
                action.name = "ACT_Flow_Loop"
            for fc in action.fcurves:
                for kp in fc.keyframe_points:
                    kp.interpolation = "LINEAR"
                # cyclic modifier for clean loop
                mod = fc.modifiers.new(type="CYCLES")
                mod.mode_before = "REPEAT"
                mod.mode_after = "REPEAT"

    # Parent remaining beads' actions naming for clarity
    for bead, _ in flow_objects[1:]:
        if bead.animation_data and bead.animation_data.action:
            bead.animation_data.action.name = f"ACT_{bead.name}_Flow"

    # --- Camera + light ---
    cam_data = bpy.data.cameras.new("CAM_Hero")
    cam_data.lens = 50
    cam = bpy.data.objects.new("CAM_Hero", cam_data)
    cam.location = Vector((1.9, -2.1, 1.45))
    cam.rotation_euler = Euler((math.radians(58), 0.0, math.radians(38)), "XYZ")
    link_object(cam, col_cam)
    scene.camera = cam

    # Also shade metal parts
    for obj_name in ("OBJ_Pump_Motor", "OBJ_Pump_Base", "OBJ_Impeller"):
        o = bpy.data.objects.get(obj_name)
        if o:
            shade_smooth(o)
    for blade in blades:
        shade_smooth(blade)
    shade_smooth(motor)

    light_data = bpy.data.lights.new("LGT_Key_Sun", type="AREA")
    light_data.energy = 250
    light_data.size = 2.5
    light = bpy.data.objects.new("LGT_Key_Sun", light_data)
    light.location = Vector((1.5, -1.2, 3.0))
    light.rotation_euler = Euler((math.radians(40), math.radians(15), math.radians(20)), "XYZ")
    link_object(light, col_cam)

    fill_data = bpy.data.lights.new("LGT_Fill", type="AREA")
    fill_data.energy = 80
    fill_data.size = 3.0
    fill = bpy.data.objects.new("LGT_Fill", fill_data)
    fill.location = Vector((-1.8, 1.5, 2.2))
    link_object(fill, col_cam)

    # World soft gray-blue
    world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.78, 0.84, 0.88, 1.0)
        bg.inputs[1].default_value = 0.9

    # Stats
    tri_count = 0
    for obj in bpy.data.objects:
        if obj.type == "MESH" and obj.data:
            mesh = obj.data
            mesh.calc_loop_triangles()
            tri_count += len(mesh.loop_triangles)

    return {
        "frame_end": total_frames,
        "fps": args.fps,
        "triangles": tri_count,
        "materials": len(bpy.data.materials),
        "flow_beads": bead_count,
        "animations": ["ACT_Impeller_Spin", "ACT_Flow_Loop"],
        "objects": [
            "OBJ_Pump_Casing",
            "OBJ_Pipe_Suction",
            "OBJ_Pipe_Discharge",
            "OBJ_Impeller",
        ],
        "hotspots": [
            "EMP_Hotspot_Suction",
            "EMP_Hotspot_Discharge",
            "EMP_Hotspot_Casing",
        ],
    }


# ---------------------------------------------------------------------------
# Export / render
# ---------------------------------------------------------------------------

def export_assets(out_dir: Path, meta: dict, preview_samples: int) -> dict:
    layout = ensure_asset_layout(out_dir)
    blend_path = layout["source"] / f"{ASSET_STEM}.blend"
    glb_path = layout["web"] / f"{ASSET_STEM}.glb"
    preview_path = layout["previews"] / "shaded.png"
    manifest_path = layout["meta"] / "interaction-manifest.json"
    report_path = layout["meta"] / "acceptance-report.json"
    card_path = layout["meta"] / "asset.json"

    bpy.ops.wm.save_as_mainfile(filepath=str(blend_path.resolve()))

    # Preview render (Eevee)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT" if hasattr(bpy.types, "EEVEE") or True else "BLENDER_EEVEE"
    # Prefer EEVEE_NEXT on 4.2+, fall back
    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except Exception:
        scene.render.engine = "BLENDER_EEVEE"

    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.filepath = str(preview_path.resolve())
    scene.render.image_settings.file_format = "PNG"
    scene.frame_set(meta["frame_end"] // 2)
    bpy.ops.render.render(write_still=True)

    # GLB export — include animations
    bpy.ops.export_scene.gltf(
        filepath=str(glb_path.resolve()),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_animations=True,
        export_animation_mode="ACTIONS",
        export_nla_strips=False,
        export_extras=True,
        export_cameras=False,
        export_lights=False,
    )

    glb_size = glb_path.stat().st_size if glb_path.exists() else 0
    preview_ok = preview_path.exists() and preview_path.stat().st_size > 0
    blend_ok = blend_path.exists() and blend_path.stat().st_size > 0
    glb_ok = glb_path.exists() and glb_size > 0

    manifest = {
        "asset": f"web/{ASSET_STEM}.glb",
        "coordinateSystem": "Blender Z-up; converted by glTF exporter",
        "purpose": "Acceptance test: centrifugal pump with suction/discharge and internal flow",
        "objects": [
            {
                "name": "OBJ_Pump_Casing",
                "events": ["pointerenter", "pointerleave", "click"],
                "animations": ["ACT_Impeller_Spin"],
            },
            {
                "name": "OBJ_Impeller",
                "events": [],
                "animations": ["ACT_Impeller_Spin"],
            },
            {
                "name": "OBJ_Flow_Bead_01",
                "events": [],
                "animations": ["ACT_Flow_Loop"],
            },
        ],
        "hotspots": [
            {"name": "EMP_Hotspot_Suction", "label": "Suction inlet"},
            {"name": "EMP_Hotspot_Discharge", "label": "Discharge outlet"},
            {"name": "EMP_Hotspot_Casing", "label": "Pump casing"},
        ],
        "pipes": {
            "suction": "OBJ_Pipe_Suction",
            "discharge": "OBJ_Pipe_Discharge",
        },
    }
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    checks = {
        "blend_saved": blend_ok,
        "preview_rendered": preview_ok,
        "glb_exported": glb_ok,
        "glb_size_bytes": glb_size,
        "glb_under_5mb": glb_size <= 5 * 1024 * 1024,
        "triangles": meta["triangles"],
        "triangles_under_100k": meta["triangles"] <= 100_000,
        "materials": meta["materials"],
        "flow_beads": meta["flow_beads"],
        "animations": meta["animations"],
        "blender_version": bpy.app.version_string,
    }
    report = {
        "result": "PASS" if all([blend_ok, preview_ok, glb_ok, checks["glb_under_5mb"], checks["triangles_under_100k"]]) else "FAIL",
        "checks": checks,
        "files": {
            "blend": str(blend_path.as_posix()),
            "glb": str(glb_path.as_posix()),
            "preview": str(preview_path.as_posix()),
            "manifest": str(manifest_path.as_posix()),
        },
    }
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    card = {
        "id": ASSET_ID,
        "stem": ASSET_STEM,
        "title": {
            "en": "Centrifugal pump cutaway with flow markers",
            "vi": "Bơm ly tâm cắt mở + marker dòng chảy",
        },
        "category": "pumps",
        "tags": ["pump", "cutaway", "flow", "impeller", "animation", "reusable"],
        "reusable": True,
        "source": f"source/{ASSET_STEM}.blend",
        "web": f"web/{ASSET_STEM}.glb",
        "previews": {"shaded": "previews/shaded.png"},
        "objects": meta.get("objects", []),
        "animations": meta.get("animations", []),
        "hotspots": meta.get("hotspots", []),
        "buildScript": "scripts/blender/build_pump_flow.py",
    }
    card_path.write_text(json.dumps(card, indent=2), encoding="utf-8")
    return report


def main() -> int:
    args = parse_args(sys.argv)
    out_dir = args.output
    if not out_dir.is_absolute():
        # Resolve relative to blend cwd (project root when launched correctly)
        out_dir = Path.cwd() / out_dir

    clear_scene()
    meta = build_pump(args)
    report = export_assets(out_dir, meta, args.preview_samples)

    print("=== PUMP FLOW BUILD REPORT ===")
    print(json.dumps(report, indent=2))
    return 0 if report["result"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
