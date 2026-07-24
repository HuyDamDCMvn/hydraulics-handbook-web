"""
Build fire pump 01 — skid-mounted centrifugal pump + motor assembly.

Reference photo: fire-engine red body, orange coupling guard, common base,
motor on +X (right), volute pump on -X (left), suction flange facing -X.

Usage:
  blender --background --factory-startup --python-exit-code 1 \\
    --python scripts/blender/build_fire_pump_01.py -- \\
    --output assets/blender/library/pumps/fire-pump-01
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Euler, Vector

_SCRIPTS_DIR = Path(__file__).resolve().parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))

from library_paths import asset_dir, ensure_asset_layout  # noqa: E402


ASSET_ID = "pumps/fire-pump-01"
ASSET_STEM = "fire-pump-01"
ASSET_TITLE = {
    "en": "Fire pump 01",
    "vi": "Bơm chữa cháy 01",
}


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args(argv: list[str]) -> argparse.Namespace:
    if "--" in argv:
        argv = argv[argv.index("--") + 1 :]
    else:
        argv = []
    p = argparse.ArgumentParser(description="Build fire pump 01 asset")
    p.add_argument(
        "--output",
        type=Path,
        default=asset_dir("pumps", "fire-pump-01"),
        help="Asset root (source/ web/ previews/ meta/)",
    )
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


def new_material(
    name: str,
    color: tuple[float, float, float, float],
    *,
    metallic: float = 0.05,
    roughness: float = 0.45,
) -> bpy.types.Material:
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
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
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
        mesh.auto_smooth_angle = math.radians(30)


def apply_transforms(obj: bpy.types.Object) -> None:
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    obj.select_set(False)


def add_cylinder(
    name: str,
    radius: float,
    depth: float,
    location: Vector,
    rotation: Euler,
    collection: bpy.types.Collection,
    *,
    vertices: int = 48,
    fill_caps: bool = True,
) -> bpy.types.Object:
    mesh = bpy.data.meshes.new(f"MSH_{name}")
    obj = bpy.data.objects.new(name, mesh)
    link_object(obj, collection)

    half = depth * 0.5
    verts: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []
    for i in range(vertices):
        a = (i / vertices) * math.tau
        x = math.cos(a) * radius
        y = math.sin(a) * radius
        verts.append((x, y, -half))
    for i in range(vertices):
        a = (i / vertices) * math.tau
        x = math.cos(a) * radius
        y = math.sin(a) * radius
        verts.append((x, y, half))
    for i in range(vertices):
        j = (i + 1) % vertices
        faces.append((i, j, vertices + j, vertices + i))
    if fill_caps:
        faces.append(tuple(range(vertices)))
        faces.append(tuple(reversed(range(vertices, vertices * 2))))

    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj.location = location
    obj.rotation_euler = rotation
    return obj


def add_uv_sphere(
    name: str,
    radius: float,
    location: Vector,
    collection: bpy.types.Collection,
    *,
    segments: int = 24,
    rings: int = 12,
) -> bpy.types.Object:
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


def add_cube(
    name: str,
    size: tuple[float, float, float],
    location: Vector,
    collection: bpy.types.Collection,
    *,
    rotation: Euler | None = None,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.active_object
    obj.name = name
    if obj.data:
        obj.data.name = f"MSH_{name}"
    obj.scale = Vector(size) * 0.5
    if rotation is not None:
        obj.rotation_euler = rotation
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
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
        minor_segments=12,
        location=location,
        rotation=rotation,
    )
    obj = bpy.context.active_object
    obj.name = name
    if obj.data:
        obj.data.name = f"MSH_{name}"
    link_object(obj, collection)
    return obj


def boolean_difference(target: bpy.types.Object, cutter: bpy.types.Object) -> None:
    mod = target.modifiers.new(name=f"Bool_{cutter.name}", type="BOOLEAN")
    mod.operation = "DIFFERENCE"
    mod.solver = "EXACT"
    mod.object = cutter
    bpy.context.view_layer.objects.active = target
    bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter, do_unlink=True)


def join_objects(name: str, objects: list[bpy.types.Object], collection: bpy.types.Collection) -> bpy.types.Object:
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    joined = bpy.context.active_object
    joined.name = name
    if joined.data:
        joined.data.name = f"MSH_{name}"
    link_object(joined, collection)
    return joined


def bore_cylinder(
    target: bpy.types.Object,
    *,
    radius: float,
    depth: float,
    location: Vector,
    rotation: Euler,
    collection: bpy.types.Collection,
    name: str,
) -> None:
    cutter = add_cylinder(
        name,
        radius=radius,
        depth=depth,
        location=location,
        rotation=rotation,
        collection=collection,
        vertices=36,
        fill_caps=True,
    )
    apply_transforms(cutter)
    boolean_difference(target, cutter)


def add_bolt_ring(
    prefix: str,
    center: Vector,
    *,
    ring_r: float,
    bolt_r: float,
    bolt_h: float,
    count: int,
    axis: str,
    collection: bpy.types.Collection,
    mat: bpy.types.Material,
) -> list[bpy.types.Object]:
    bolts: list[bpy.types.Object] = []
    for i in range(count):
        a = (i / count) * math.tau + math.radians(22.5)
        if axis == "X":
            loc = center + Vector((0.0, math.cos(a) * ring_r, math.sin(a) * ring_r))
            rot = Euler((0.0, math.radians(90), 0.0), "XYZ")
        else:
            loc = center + Vector((math.cos(a) * ring_r, math.sin(a) * ring_r, 0.0))
            rot = Euler((0.0, 0.0, 0.0), "XYZ")
        bolt = add_cylinder(
            f"{prefix}_Bolt_{i+1:02d}",
            radius=bolt_r,
            depth=bolt_h,
            location=loc,
            rotation=rot,
            collection=collection,
            vertices=8,
        )
        assign_material(bolt, mat)
        apply_transforms(bolt)
        bolts.append(bolt)
    return bolts


# ---------------------------------------------------------------------------
# Geometry — fire pump 01
# ---------------------------------------------------------------------------

def build_assembly() -> dict:
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0

    col = ensure_collection("COL_FirePump_01")
    col_cam = ensure_collection("COL_Preview")

    # Fire-engine red (glossy industrial enamel) + safety orange coupling guard
    mat_red = new_material(
        "MAT_FireRed",
        (0.92, 0.05, 0.04, 1.0),
        metallic=0.08,
        roughness=0.28,
    )
    mat_orange = new_material(
        "MAT_SafetyOrange",
        (1.0, 0.38, 0.02, 1.0),
        metallic=0.05,
        roughness=0.35,
    )
    mat_metal = new_material(
        "MAT_Hardware_Zinc",
        (0.62, 0.64, 0.66, 1.0),
        metallic=0.75,
        roughness=0.32,
    )
    mat_black = new_material(
        "MAT_CableGland_Black",
        (0.04, 0.04, 0.04, 1.0),
        metallic=0.05,
        roughness=0.65,
    )
    mat_white = new_material(
        "MAT_FlangeCap_White",
        (0.92, 0.92, 0.90, 1.0),
        metallic=0.02,
        roughness=0.55,
    )
    mat_plate = new_material(
        "MAT_Nameplate_Silver",
        (0.72, 0.74, 0.76, 1.0),
        metallic=0.85,
        roughness=0.28,
    )

    # Layout (photo): pump ← left (-X), motor → right (+X), common skid
    z0 = 0.34

    motor_r = 0.155
    motor_len = 0.48
    fin_count = 22
    fin_h = 0.026
    fin_t = 0.011

    bearing_len = 0.16
    bearing_r = 0.095
    guard_w = 0.14

    casing_r = 0.20
    casing_depth = 0.20
    volute_major = 0.11
    volute_minor = 0.052

    inlet_r = 0.09
    inlet_flange_r = 0.15
    inlet_flange_d = 0.034
    discharge_r = 0.075
    discharge_h = 0.18
    discharge_flange_r = 0.135
    discharge_flange_d = 0.030

    # Centers along X
    pump_x = -0.38
    bearing_x = pump_x + casing_depth * 0.55 + bearing_len * 0.45
    guard_x = bearing_x + bearing_len * 0.55 + guard_w * 0.55
    motor_x = guard_x + guard_w * 0.55 + motor_len * 0.52

    red_parts: list[bpy.types.Object] = []

    # --- Skid base (common frame) ---
    base_len = 1.55
    base_w = 0.42
    base_h = 0.055
    base = add_cube(
        "OBJ_Skid_Base",
        (base_len, base_w, base_h),
        Vector((0.05, 0.0, base_h * 0.5)),
        col,
    )
    assign_material(base, mat_red)
    red_parts.append(base)

    # Recessed top plate edge (visual lip)
    lip = add_cube(
        "OBJ_Skid_Lip",
        (base_len * 0.98, base_w * 0.92, 0.012),
        Vector((0.05, 0.0, base_h + 0.004)),
        col,
    )
    assign_material(lip, mat_red)
    red_parts.append(lip)

    # Corner mounting feet
    feet: list[bpy.types.Object] = []
    for i, (fx, fy) in enumerate(
        (
            (-0.68, 0.18),
            (-0.68, -0.18),
            (0.72, 0.18),
            (0.72, -0.18),
        )
    ):
        foot = add_cube(
            f"OBJ_Skid_Foot_{i+1:02d}",
            (0.08, 0.055, 0.018),
            Vector((fx, fy, 0.009)),
            col,
        )
        assign_material(foot, mat_red)
        hole = add_cylinder(
            f"CUT_Foot_{i+1:02d}",
            radius=0.01,
            depth=0.04,
            location=Vector((fx, fy, 0.009)),
            rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
            collection=col,
            vertices=12,
        )
        assign_material(hole, mat_metal)
        boolean_difference(foot, hole)
        feet.append(foot)
        red_parts.append(foot)

    # --- Pump volute (left) ---
    casing = add_cylinder(
        "OBJ_Pump_Casing",
        radius=casing_r,
        depth=casing_depth,
        location=Vector((pump_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=56,
    )
    assign_material(casing, mat_red)
    apply_transforms(casing)

    volute = add_torus(
        "OBJ_Pump_Volute",
        major=volute_major,
        minor=volute_minor,
        location=Vector((pump_x, 0.035, z0 - 0.05)),
        rotation=Euler((math.radians(90), 0.0, math.radians(-20)), "XYZ"),
        collection=col,
    )
    assign_material(volute, mat_red)
    apply_transforms(volute)

    cheek = add_cylinder(
        "OBJ_Pump_Cheek",
        radius=casing_r * 1.06,
        depth=casing_depth * 0.42,
        location=Vector((pump_x - 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=48,
    )
    assign_material(cheek, mat_red)
    apply_transforms(cheek)

    # Pump pedestal / feet on skid
    for side, y in (("L", 0.12), ("R", -0.12)):
        ped = add_cube(
            f"OBJ_Pump_Pedestal_{side}",
            (0.18, 0.05, z0 - casing_r * 0.35 - base_h),
            Vector((pump_x, y, (z0 - casing_r * 0.35 + base_h) * 0.5)),
            col,
        )
        assign_material(ped, mat_red)
        red_parts.append(ped)

    # Suction inlet facing -X (photo left)
    inlet_x = pump_x - casing_depth * 0.5 - 0.07
    inlet_neck = add_cylinder(
        "OBJ_Inlet_Neck",
        radius=inlet_r + 0.012,
        depth=0.09,
        location=Vector((inlet_x + 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(inlet_neck, mat_red)
    apply_transforms(inlet_neck)

    inlet_flange = add_cylinder(
        "OBJ_Inlet_Flange",
        radius=inlet_flange_r,
        depth=inlet_flange_d,
        location=Vector((inlet_x - 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(inlet_flange, mat_red)
    apply_transforms(inlet_flange)

    # White temporary flange cap (photo)
    flange_cap = add_cylinder(
        "OBJ_Inlet_Cap",
        radius=inlet_flange_r * 0.78,
        depth=0.012,
        location=Vector((inlet_x - 0.03 - inlet_flange_d * 0.5 - 0.008, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(flange_cap, mat_white)
    apply_transforms(flange_cap)

    inlet_bolts = add_bolt_ring(
        "OBJ_Inlet",
        Vector((inlet_x - 0.03 - inlet_flange_d * 0.5 - 0.012, 0.0, z0)),
        ring_r=inlet_flange_r * 0.78,
        bolt_r=0.01,
        bolt_h=0.022,
        count=8,
        axis="X",
        collection=col,
        mat=mat_metal,
    )

    # Discharge up → horizontal flange (photo: discharge faces camera-ish / +Y-ish)
    # Use vertical riser then short elbow toward +Y for readability
    disc_z = z0 + casing_r * 0.45 + discharge_h * 0.35
    discharge = add_cylinder(
        "OBJ_Discharge_Port",
        radius=discharge_r,
        depth=discharge_h,
        location=Vector((pump_x + 0.01, 0.0, disc_z)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(discharge, mat_red)

    # Elbow toward +Y then flange
    elbow = add_uv_sphere(
        "OBJ_Discharge_Elbow",
        radius=discharge_r * 1.05,
        location=Vector((pump_x + 0.01, 0.02, disc_z + discharge_h * 0.48)),
        collection=col,
        segments=24,
        rings=12,
    )
    assign_material(elbow, mat_red)
    elbow.scale = Vector((1.0, 1.15, 0.85))
    apply_transforms(elbow)

    disc_out = add_cylinder(
        "OBJ_Discharge_Out",
        radius=discharge_r,
        depth=0.10,
        location=Vector((pump_x + 0.01, 0.08, disc_z + discharge_h * 0.48)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=32,
    )
    assign_material(disc_out, mat_red)
    apply_transforms(disc_out)

    discharge_flange = add_cylinder(
        "OBJ_Discharge_Flange",
        radius=discharge_flange_r,
        depth=discharge_flange_d,
        location=Vector((pump_x + 0.01, 0.14, disc_z + discharge_h * 0.48)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(discharge_flange, mat_red)
    apply_transforms(discharge_flange)

    # Discharge bolts on Y-facing flange (ring in XZ plane)
    disc_bolts: list[bpy.types.Object] = []
    for i in range(8):
        a = (i / 8) * math.tau + math.radians(22.5)
        loc = Vector(
            (
                pump_x + 0.01 + math.cos(a) * discharge_flange_r * 0.72,
                0.14 + discharge_flange_d * 0.5 + 0.01,
                disc_z + discharge_h * 0.48 + math.sin(a) * discharge_flange_r * 0.72,
            )
        )
        bolt = add_cylinder(
            f"OBJ_Discharge_Bolt_{i+1:02d}",
            radius=0.01,
            depth=0.02,
            location=loc,
            rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
            collection=col,
            vertices=8,
        )
        assign_material(bolt, mat_metal)
        apply_transforms(bolt)
        disc_bolts.append(bolt)

    # Bore openings
    bore_cylinder(
        casing,
        radius=inlet_r,
        depth=casing_depth + 0.12,
        location=Vector((pump_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Casing",
    )
    bore_cylinder(
        cheek,
        radius=inlet_r,
        depth=casing_depth * 0.6,
        location=Vector((pump_x - 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Cheek",
    )
    bore_cylinder(
        inlet_flange,
        radius=inlet_r * 0.92,
        depth=inlet_flange_d + 0.06,
        location=Vector((inlet_x - 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Flange",
    )
    bore_cylinder(
        inlet_neck,
        radius=inlet_r * 0.92,
        depth=0.14,
        location=Vector((inlet_x + 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Neck",
    )
    bore_cylinder(
        discharge,
        radius=discharge_r * 0.7,
        depth=discharge_h + 0.08,
        location=Vector((pump_x + 0.01, 0.0, disc_z)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        name="CUT_Discharge_Port",
    )
    bore_cylinder(
        disc_out,
        radius=discharge_r * 0.7,
        depth=0.14,
        location=Vector((pump_x + 0.01, 0.08, disc_z + discharge_h * 0.48)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col,
        name="CUT_Discharge_Out",
    )
    bore_cylinder(
        discharge_flange,
        radius=discharge_r * 0.7,
        depth=discharge_flange_d + 0.06,
        location=Vector((pump_x + 0.01, 0.14, disc_z + discharge_h * 0.48)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col,
        name="CUT_Discharge_Flange",
    )

    red_parts.extend(
        [
            casing,
            volute,
            cheek,
            inlet_neck,
            inlet_flange,
            discharge,
            elbow,
            disc_out,
            discharge_flange,
        ]
    )

    # --- Bearing housing (between volute and coupling) ---
    bearing = add_cylinder(
        "OBJ_Bearing_Housing",
        radius=bearing_r,
        depth=bearing_len,
        location=Vector((bearing_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(bearing, mat_red)
    apply_transforms(bearing)

    bearing_flange = add_cylinder(
        "OBJ_Bearing_Flange",
        radius=bearing_r + 0.035,
        depth=0.03,
        location=Vector((bearing_x - bearing_len * 0.4, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(bearing_flange, mat_red)
    apply_transforms(bearing_flange)

    for side, y in (("L", 0.09), ("R", -0.09)):
        bped = add_cube(
            f"OBJ_Bearing_Pedestal_{side}",
            (0.12, 0.04, z0 - bearing_r * 0.4 - base_h),
            Vector((bearing_x, y, (z0 - bearing_r * 0.4 + base_h) * 0.5)),
            col,
        )
        assign_material(bped, mat_red)
        red_parts.append(bped)

    red_parts.extend([bearing, bearing_flange])

    # Shaft under guard (visible stubs)
    shaft = add_cylinder(
        "OBJ_Coupling_Shaft",
        radius=0.028,
        depth=guard_w + 0.06,
        location=Vector((guard_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=24,
    )
    assign_material(shaft, mat_metal)
    apply_transforms(shaft)

    # --- Orange coupling guard (inverted U / trapezoid box) ---
    guard_top = add_cube(
        "OBJ_Coupling_Guard_Top",
        (guard_w, 0.18, 0.02),
        Vector((guard_x, 0.0, z0 + 0.095)),
        col,
    )
    assign_material(guard_top, mat_orange)

    guard_front = add_cube(
        "OBJ_Coupling_Guard_Front",
        (guard_w, 0.016, 0.16),
        Vector((guard_x, -0.09, z0 + 0.02)),
        col,
    )
    assign_material(guard_front, mat_orange)

    guard_back = add_cube(
        "OBJ_Coupling_Guard_Back",
        (guard_w, 0.016, 0.16),
        Vector((guard_x, 0.09, z0 + 0.02)),
        col,
    )
    assign_material(guard_back, mat_orange)

    # Slightly flared side panels (trapezoid look via tapered boxes)
    guard_side_l = add_cube(
        "OBJ_Coupling_Guard_SideL",
        (0.014, 0.16, 0.14),
        Vector((guard_x - guard_w * 0.48, 0.0, z0 + 0.03)),
        col,
    )
    assign_material(guard_side_l, mat_orange)
    guard_side_r = add_cube(
        "OBJ_Coupling_Guard_SideR",
        (0.014, 0.16, 0.14),
        Vector((guard_x + guard_w * 0.48, 0.0, z0 + 0.03)),
        col,
    )
    assign_material(guard_side_r, mat_orange)

    guard = join_objects(
        "OBJ_Coupling_Guard",
        [guard_top, guard_front, guard_back, guard_side_l, guard_side_r],
        col,
    )
    assign_material(guard, mat_orange)
    shade_smooth(guard)

    # --- Motor (right) ---
    motor = add_cylinder(
        "OBJ_Motor_Housing",
        radius=motor_r * 0.92,
        depth=motor_len,
        location=Vector((motor_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=48,
    )
    assign_material(motor, mat_red)
    apply_transforms(motor)

    fins: list[bpy.types.Object] = []
    for i in range(fin_count):
        a = (i / fin_count) * math.tau
        if 4.3 < a < 5.1:  # skip bottom for feet
            continue
        fy = math.cos(a) * (motor_r * 0.92 + fin_h * 0.45)
        fz = z0 + math.sin(a) * (motor_r * 0.92 + fin_h * 0.45)
        fin = add_cube(
            f"OBJ_Motor_Fin_{i+1:02d}",
            (motor_len * 0.88, fin_t, fin_h),
            Vector((motor_x, fy, fz)),
            col,
            rotation=Euler((a, 0.0, 0.0), "XYZ"),
        )
        assign_material(fin, mat_red)
        fins.append(fin)

    # Fan shroud on +X (far right)
    shroud_x = motor_x + motor_len * 0.5 + 0.035
    shroud = add_cylinder(
        "OBJ_Motor_FanShroud",
        radius=motor_r * 1.02,
        depth=0.08,
        location=Vector((shroud_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(shroud, mat_red)
    apply_transforms(shroud)

    shroud_cap = add_uv_sphere(
        "OBJ_Motor_FanCap",
        radius=motor_r * 1.0,
        location=Vector((shroud_x + 0.02, 0.0, z0)),
        collection=col,
        segments=28,
        rings=14,
    )
    assign_material(shroud_cap, mat_red)
    shroud_cap.scale = Vector((0.45, 1.0, 1.0))
    apply_transforms(shroud_cap)

    # Drive-end flange toward coupling
    drive_flange = add_cylinder(
        "OBJ_Motor_DriveFlange",
        radius=motor_r * 1.05,
        depth=0.038,
        location=Vector((motor_x - motor_len * 0.5 - 0.01, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(drive_flange, mat_red)
    apply_transforms(drive_flange)

    # Terminal box on TOP of motor (photo)
    jbox = add_cube(
        "OBJ_Motor_JunctionBox",
        (0.16, 0.12, 0.10),
        Vector((motor_x + 0.02, 0.0, z0 + motor_r + fin_h + 0.055)),
        col,
    )
    assign_material(jbox, mat_red)

    # Black cable glands on side of terminal box
    glands: list[bpy.types.Object] = []
    for i, gy in enumerate((-0.035, 0.035)):
        gland = add_cylinder(
            f"OBJ_Motor_Gland_{i+1:02d}",
            radius=0.016,
            depth=0.028,
            location=Vector((motor_x + 0.02 + 0.085, gy, z0 + motor_r + fin_h + 0.055)),
            rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
            collection=col,
            vertices=16,
        )
        assign_material(gland, mat_black)
        apply_transforms(gland)
        glands.append(gland)

    # Nameplate
    plate = add_cube(
        "OBJ_Motor_Nameplate",
        (0.14, 0.08, 0.005),
        Vector((motor_x - 0.05, -(motor_r * 0.55), z0 + motor_r * 0.35)),
        col,
        rotation=Euler((math.radians(-15), 0.0, 0.0), "XYZ"),
    )
    assign_material(plate, mat_plate)

    # Motor feet on skid
    for side, y in (("L", motor_r * 0.85), ("R", -motor_r * 0.85)):
        mfoot = add_cube(
            f"OBJ_Motor_Foot_{side}",
            (0.22, 0.05, z0 - motor_r * 0.55 - base_h),
            Vector((motor_x, y, (z0 - motor_r * 0.55 + base_h) * 0.5)),
            col,
        )
        assign_material(mfoot, mat_red)
        red_parts.append(mfoot)

    red_parts.extend([motor, shroud, shroud_cap, drive_flange, jbox, *fins])

    # Join red body; keep orange guard, hardware, glands, cap separate
    body = join_objects("OBJ_FirePump_01", red_parts, col)
    assign_material(body, mat_red)
    shade_smooth(body)

    hardware = [shaft, flange_cap, plate, *inlet_bolts, *disc_bolts, *glands, guard]
    for h in hardware:
        shade_smooth(h)

    # Camera: three-quarter matching reference photo angle
    cam_data = bpy.data.cameras.new("CAM_Hero")
    cam_data.type = "PERSP"
    cam_data.lens = 50
    cam = bpy.data.objects.new("CAM_Hero", cam_data)
    focus = Vector((0.0, 0.0, z0 + 0.05))
    cam.location = Vector((-0.55, -1.85, 0.95))
    direction = focus - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    link_object(cam, col_cam)
    scene.camera = cam

    key = bpy.data.lights.new("LGT_Key", type="AREA")
    key.energy = 320
    key.size = 3.2
    key_obj = bpy.data.objects.new("LGT_Key", key)
    key_obj.location = Vector((-1.0, -2.2, 2.8))
    key_obj.rotation_euler = Euler((math.radians(52), math.radians(-6), math.radians(-12)), "XYZ")
    link_object(key_obj, col_cam)

    fill = bpy.data.lights.new("LGT_Fill", type="AREA")
    fill.energy = 80
    fill.size = 4.0
    fill_obj = bpy.data.objects.new("LGT_Fill", fill)
    fill_obj.location = Vector((2.0, 1.5, 1.6))
    link_object(fill_obj, col_cam)

    rim = bpy.data.lights.new("LGT_Rim", type="AREA")
    rim.energy = 55
    rim.size = 2.5
    rim_obj = bpy.data.objects.new("LGT_Rim", rim)
    rim_obj.location = Vector((1.8, -0.8, 0.7))
    link_object(rim_obj, col_cam)

    world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.88, 0.89, 0.90, 1.0)
        bg.inputs[1].default_value = 0.85

    tri_count = 0
    for obj in bpy.data.objects:
        if obj.type == "MESH" and obj.data:
            mesh = obj.data
            mesh.calc_loop_triangles()
            tri_count += len(mesh.loop_triangles)

    return {
        "triangles": tri_count,
        "materials": len(bpy.data.materials),
        "objects": [
            "OBJ_FirePump_01",
            "OBJ_Coupling_Guard",
            "OBJ_Inlet_Flange",
            "OBJ_Discharge_Flange",
            "OBJ_Motor_JunctionBox",
            "OBJ_Skid_Base",
        ],
    }


# ---------------------------------------------------------------------------
# Export
# ---------------------------------------------------------------------------

def export_assets(out_dir: Path, meta: dict) -> dict:
    layout = ensure_asset_layout(out_dir)
    blend_path = layout["source"] / f"{ASSET_STEM}.blend"
    glb_path = layout["web"] / f"{ASSET_STEM}.glb"
    preview_path = layout["previews"] / "shaded.png"
    wire_path = layout["previews"] / "wireframe.png"
    report_path = layout["meta"] / "acceptance-report.json"
    card_path = layout["meta"] / "asset.json"

    bpy.ops.wm.save_as_mainfile(filepath=str(blend_path.resolve()))

    scene = bpy.context.scene
    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except Exception:
        scene.render.engine = "BLENDER_EEVEE"

    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False

    scene.render.filepath = str(preview_path.resolve())
    bpy.ops.render.render(write_still=True)

    scene.render.use_freestyle = True
    if hasattr(scene.render, "line_thickness"):
        scene.render.line_thickness = 1.0
    for mat in bpy.data.materials:
        if mat.use_nodes:
            bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
            if bsdf:
                bsdf.inputs["Base Color"].default_value = (0.95, 0.95, 0.95, 1.0)
                bsdf.inputs["Roughness"].default_value = 1.0
                bsdf.inputs["Metallic"].default_value = 0.0
    scene.render.filepath = str(wire_path.resolve())
    bpy.ops.render.render(write_still=True)

    bpy.ops.wm.open_mainfile(filepath=str(blend_path.resolve()))

    bpy.ops.export_scene.gltf(
        filepath=str(glb_path.resolve()),
        export_format="GLB",
        use_selection=False,
        export_apply=True,
        export_animations=False,
        export_extras=True,
        export_cameras=False,
        export_lights=False,
    )

    glb_size = glb_path.stat().st_size if glb_path.exists() else 0
    preview_ok = preview_path.exists() and preview_path.stat().st_size > 0
    wire_ok = wire_path.exists() and wire_path.stat().st_size > 0
    blend_ok = blend_path.exists() and blend_path.stat().st_size > 0
    glb_ok = glb_path.exists() and glb_size > 0

    checks = {
        "blend_saved": blend_ok,
        "preview_rendered": preview_ok,
        "wireframe_rendered": wire_ok,
        "glb_exported": glb_ok,
        "glb_size_bytes": glb_size,
        "glb_under_5mb": glb_size <= 5 * 1024 * 1024,
        "triangles": meta["triangles"],
        "triangles_under_100k": meta["triangles"] <= 100_000,
        "materials": meta["materials"],
        "blender_version": bpy.app.version_string,
    }
    report = {
        "result": "PASS"
        if all(
            [
                blend_ok,
                preview_ok,
                glb_ok,
                checks["glb_under_5mb"],
                checks["triangles_under_100k"],
            ]
        )
        else "FAIL",
        "checks": checks,
        "files": {
            "blend": str(blend_path.as_posix()),
            "glb": str(glb_path.as_posix()),
            "preview": str(preview_path.as_posix()),
            "wireframe": str(wire_path.as_posix()),
        },
    }
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    card = {
        "id": ASSET_ID,
        "stem": ASSET_STEM,
        "title": ASSET_TITLE,
        "category": "pumps",
        "tags": [
            "pump",
            "motor",
            "centrifugal",
            "fire-pump",
            "skid",
            "coupling-guard",
            "reusable",
        ],
        "reusable": True,
        "reference": "meta/reference-photo.png",
        "source": f"source/{ASSET_STEM}.blend",
        "web": f"web/{ASSET_STEM}.glb",
        "previews": {
            "shaded": "previews/shaded.png",
            "wireframe": "previews/wireframe.png",
        },
        "objects": meta.get("objects", []),
        "buildScript": "scripts/blender/build_fire_pump_01.py",
    }
    card_path.write_text(json.dumps(card, indent=2), encoding="utf-8")
    return report


def main() -> int:
    args = parse_args(sys.argv)
    out_dir = args.output
    if not out_dir.is_absolute():
        out_dir = Path.cwd() / out_dir

    clear_scene()
    meta = build_assembly()
    report = export_assets(out_dir, meta)

    print("=== FIRE PUMP 01 BUILD REPORT ===")
    print(json.dumps(report, indent=2))
    return 0 if report["result"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
