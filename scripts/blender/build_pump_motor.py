"""
Build a close-coupled centrifugal pump + motor assembly.

Refined against a real TECO-style industrial unit photo:
motor (finned) on -X, volute pump on +X, dark cast-iron grey, flat base rails.

Usage:
  blender --background --factory-startup --python-exit-code 1 \\
    --python scripts/blender/build_pump_motor.py -- \\
    --output assets/blender/library/pumps/close-coupled-motor
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


ASSET_ID = "pumps/close-coupled-motor"
ASSET_STEM = "pump-motor"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args(argv: list[str]) -> argparse.Namespace:
    if "--" in argv:
        argv = argv[argv.index("--") + 1 :]
    else:
        argv = []
    p = argparse.ArgumentParser(description="Build close-coupled pump+motor asset")
    p.add_argument(
        "--output",
        type=Path,
        default=asset_dir("pumps", "close-coupled-motor"),
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
    roughness: float = 0.55,
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
    """Place hex-ish bolt heads around a flange (cylinders as low-poly bolts)."""
    bolts: list[bpy.types.Object] = []
    for i in range(count):
        a = (i / count) * math.tau + math.radians(22.5)
        if axis == "X":
            loc = center + Vector((0.0, math.cos(a) * ring_r, math.sin(a) * ring_r))
            rot = Euler((0.0, math.radians(90), 0.0), "XYZ")
        else:  # Z
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
# Geometry
# ---------------------------------------------------------------------------

def build_assembly() -> dict:
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0

    col = ensure_collection("COL_PumpMotor")
    col_cam = ensure_collection("COL_Preview")

    # Industrial cast charcoal + zinc hardware (photo reference)
    mat_body = new_material(
        "MAT_CastIron_Grey",
        (0.22, 0.23, 0.24, 1.0),
        metallic=0.18,
        roughness=0.58,
    )
    mat_metal = new_material(
        "MAT_Hardware_Zinc",
        (0.62, 0.64, 0.66, 1.0),
        metallic=0.75,
        roughness=0.32,
    )
    mat_plate = new_material(
        "MAT_Nameplate_Silver",
        (0.72, 0.74, 0.76, 1.0),
        metallic=0.85,
        roughness=0.28,
    )
    mat_warn = new_material(
        "MAT_Warning_Yellow",
        (0.92, 0.78, 0.08, 1.0),
        metallic=0.05,
        roughness=0.45,
    )

    # Layout (photo): motor ← left (-X), pump → right (+X), discharge up (+Z)
    z0 = 0.30

    motor_r = 0.165
    motor_len = 0.52
    fin_count = 20
    fin_h = 0.028
    fin_t = 0.012
    end_bell_r = motor_r * 1.02

    adapter_len = 0.14
    adapter_r = 0.12

    casing_r = 0.22
    casing_depth = 0.22
    volute_major = 0.12
    volute_minor = 0.055

    inlet_r = 0.095
    inlet_flange_r = 0.155
    inlet_flange_d = 0.032
    discharge_r = 0.08
    discharge_h = 0.16
    discharge_flange_r = 0.14
    discharge_flange_d = 0.028

    # --- Motor core (left) ---
    motor_x = -0.42
    motor = add_cylinder(
        "OBJ_Motor_Housing",
        radius=motor_r * 0.92,
        depth=motor_len,
        location=Vector((motor_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=48,
    )
    assign_material(motor, mat_body)
    apply_transforms(motor)

    # Longitudinal cooling fins around motor
    fins: list[bpy.types.Object] = []
    for i in range(fin_count):
        a = (i / fin_count) * math.tau
        # Leave gap at bottom for feet clearance and at front for junction box
        if 4.2 < a < 5.2:  # skip ~bottom-front sector
            continue
        fx = motor_x
        fy = math.cos(a) * (motor_r * 0.92 + fin_h * 0.45)
        fz = z0 + math.sin(a) * (motor_r * 0.92 + fin_h * 0.45)
        fin = add_cube(
            f"OBJ_Motor_Fin_{i+1:02d}",
            (motor_len * 0.92, fin_t, fin_h),
            Vector((fx, fy, fz)),
            col,
            rotation=Euler((a, 0.0, 0.0), "XYZ"),
        )
        assign_material(fin, mat_body)
        fins.append(fin)

    # Domed fan end-bell on -X
    end_x = motor_x - motor_len * 0.5 - 0.04
    end_bell = add_uv_sphere(
        "OBJ_Motor_EndBell",
        radius=end_bell_r,
        location=Vector((end_x + 0.02, 0.0, z0)),
        collection=col,
        segments=32,
        rings=16,
    )
    assign_material(end_bell, mat_body)
    # Flatten / clip the +X half of the sphere toward motor using scale + boolean-ish: squash
    end_bell.scale = Vector((0.55, 1.0, 1.0))
    apply_transforms(end_bell)

    # Vent holes on end bell (boolean)
    for i, ang in enumerate((0.4, 1.2, 2.0, 2.8, 3.6, 4.4, 5.2, 5.9)):
        hx = end_x - 0.01
        hy = math.cos(ang) * end_bell_r * 0.55
        hz = z0 + math.sin(ang) * end_bell_r * 0.55
        bore_cylinder(
            end_bell,
            radius=0.018,
            depth=0.12,
            location=Vector((hx, hy, hz)),
            rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
            collection=col,
            name=f"CUT_Vent_{i+1:02d}",
        )

    # Drive-end flange (toward pump)
    drive_flange = add_cylinder(
        "OBJ_Motor_DriveFlange",
        radius=motor_r * 1.05,
        depth=0.04,
        location=Vector((motor_x + motor_len * 0.5 + 0.01, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(drive_flange, mat_body)
    apply_transforms(drive_flange)

    # Junction box on viewer side (-Y)
    jbox = add_cube(
        "OBJ_Motor_JunctionBox",
        (0.18, 0.12, 0.14),
        Vector((motor_x + 0.02, -(motor_r + 0.05), z0 - 0.02)),
        col,
    )
    assign_material(jbox, mat_body)
    warn = add_cube(
        "OBJ_Motor_WarningPlate",
        (0.05, 0.002, 0.05),
        Vector((motor_x + 0.02, -(motor_r + 0.112), z0 - 0.02)),
        col,
    )
    assign_material(warn, mat_warn)

    # Nameplate on top
    plate = add_cube(
        "OBJ_Motor_Nameplate",
        (0.16, 0.10, 0.006),
        Vector((motor_x, 0.0, z0 + motor_r + fin_h + 0.01)),
        col,
    )
    assign_material(plate, mat_plate)

    # Lifting eye
    eye_ring = add_torus(
        "OBJ_Motor_LiftingEye",
        major=0.018,
        minor=0.005,
        location=Vector((motor_x - 0.08, 0.0, z0 + motor_r + fin_h + 0.04)),
        rotation=Euler((math.radians(90), 0.0, 0.0), "XYZ"),
        collection=col,
    )
    assign_material(eye_ring, mat_metal)
    eye_stem = add_cylinder(
        "OBJ_Motor_LiftingStem",
        radius=0.008,
        depth=0.03,
        location=Vector((motor_x - 0.08, 0.0, z0 + motor_r + fin_h + 0.01)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=12,
    )
    assign_material(eye_stem, mat_metal)

    # --- Adapter / lantern between motor and pump ---
    adapter_x = motor_x + motor_len * 0.5 + adapter_len * 0.5 + 0.03
    adapter = add_cylinder(
        "OBJ_Adapter_Neck",
        radius=adapter_r,
        depth=adapter_len,
        location=Vector((adapter_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(adapter, mat_body)
    apply_transforms(adapter)

    adapter_flange = add_cylinder(
        "OBJ_Adapter_Flange",
        radius=adapter_r + 0.04,
        depth=0.035,
        location=Vector((adapter_x + adapter_len * 0.35, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(adapter_flange, mat_body)
    apply_transforms(adapter_flange)

    adapter_bolts = add_bolt_ring(
        "OBJ_Adapter",
        Vector((adapter_x + adapter_len * 0.35 + 0.02, 0.0, z0)),
        ring_r=adapter_r + 0.025,
        bolt_r=0.008,
        bolt_h=0.02,
        count=6,
        axis="X",
        collection=col,
        mat=mat_metal,
    )

    # --- Pump volute (right) ---
    pump_x = adapter_x + adapter_len * 0.5 + casing_depth * 0.45
    casing = add_cylinder(
        "OBJ_Pump_Casing",
        radius=casing_r,
        depth=casing_depth,
        location=Vector((pump_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=56,
    )
    assign_material(casing, mat_body)
    apply_transforms(casing)

    # Compact volute “snail” bulge on the lower-front of the casing
    volute = add_torus(
        "OBJ_Pump_Volute",
        major=volute_major,
        minor=volute_minor,
        location=Vector((pump_x, 0.04, z0 - 0.06)),
        rotation=Euler((math.radians(90), 0.0, math.radians(15)), "XYZ"),
        collection=col,
    )
    assign_material(volute, mat_body)
    apply_transforms(volute)

    # Extra casing cheek (short wider disk) for cast look
    cheek = add_cylinder(
        "OBJ_Pump_Cheek",
        radius=casing_r * 1.08,
        depth=casing_depth * 0.45,
        location=Vector((pump_x + 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=48,
    )
    assign_material(cheek, mat_body)
    apply_transforms(cheek)

    # Priming plug on casing top
    plug = add_cube(
        "OBJ_Pump_PrimingPlug",
        (0.03, 0.03, 0.035),
        Vector((pump_x - 0.02, 0.0, z0 + casing_r + 0.01)),
        col,
    )
    assign_material(plug, mat_metal)

    # Suction inlet facing +X (photo: right end) — longer neck so flange reads clearly
    inlet_x = pump_x + casing_depth * 0.5 + 0.08
    inlet_neck = add_cylinder(
        "OBJ_Inlet_Neck",
        radius=inlet_r + 0.012,
        depth=0.10,
        location=Vector((inlet_x - 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(inlet_neck, mat_body)
    apply_transforms(inlet_neck)

    inlet_flange = add_cylinder(
        "OBJ_Inlet_Flange",
        radius=inlet_flange_r,
        depth=inlet_flange_d,
        location=Vector((inlet_x + 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        vertices=40,
    )
    assign_material(inlet_flange, mat_body)
    apply_transforms(inlet_flange)

    inlet_bolts = add_bolt_ring(
        "OBJ_Inlet",
        Vector((inlet_x + 0.05, 0.0, z0)),
        ring_r=inlet_flange_r * 0.78,
        bolt_r=0.01,
        bolt_h=0.022,
        count=4,
        axis="X",
        collection=col,
        mat=mat_metal,
    )

    # Discharge up
    disc_z = z0 + casing_r * 0.55 + discharge_h * 0.4
    discharge = add_cylinder(
        "OBJ_Discharge_Port",
        radius=discharge_r,
        depth=discharge_h,
        location=Vector((pump_x + 0.02, 0.0, disc_z)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(discharge, mat_body)

    discharge_flange = add_cylinder(
        "OBJ_Discharge_Flange",
        radius=discharge_flange_r,
        depth=discharge_flange_d,
        location=Vector((pump_x + 0.02, 0.0, disc_z + discharge_h * 0.5 + discharge_flange_d * 0.5)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        vertices=36,
    )
    assign_material(discharge_flange, mat_body)

    disc_bolts = add_bolt_ring(
        "OBJ_Discharge",
        Vector((pump_x + 0.02, 0.0, disc_z + discharge_h * 0.5 + discharge_flange_d + 0.008)),
        ring_r=discharge_flange_r * 0.72,
        bolt_r=0.01,
        bolt_h=0.02,
        count=4,
        axis="Z",
        collection=col,
        mat=mat_metal,
    )

    # Bore openings
    bore_cylinder(
        casing,
        radius=inlet_r,
        depth=casing_depth + 0.1,
        location=Vector((pump_x, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Casing",
    )
    bore_cylinder(
        cheek,
        radius=inlet_r,
        depth=casing_depth * 0.6,
        location=Vector((pump_x + 0.02, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Cheek",
    )
    bore_cylinder(
        inlet_flange,
        radius=inlet_r * 0.92,
        depth=inlet_flange_d + 0.06,
        location=Vector((inlet_x + 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Flange",
    )
    bore_cylinder(
        inlet_neck,
        radius=inlet_r * 0.92,
        depth=0.14,
        location=Vector((inlet_x - 0.03, 0.0, z0)),
        rotation=Euler((0.0, math.radians(90), 0.0), "XYZ"),
        collection=col,
        name="CUT_Inlet_Neck",
    )
    bore_cylinder(
        discharge,
        radius=discharge_r * 0.7,
        depth=discharge_h + 0.08,
        location=Vector((pump_x + 0.02, 0.0, disc_z)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        name="CUT_Discharge_Port",
    )
    bore_cylinder(
        discharge_flange,
        radius=discharge_r * 0.7,
        depth=discharge_flange_d + 0.06,
        location=Vector((pump_x + 0.02, 0.0, disc_z + discharge_h * 0.5 + discharge_flange_d * 0.5)),
        rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
        collection=col,
        name="CUT_Discharge_Flange",
    )

    # --- Flat base rails (photo: long feet under motor, holes at ends) ---
    rail_y = motor_r * 0.95
    rail_len = 0.85
    rail_z = 0.012
    for side, y in (("L", rail_y), ("R", -rail_y)):
        rail = add_cube(
            f"OBJ_Mount_Rail_{side}",
            (rail_len, 0.055, 0.024),
            Vector((motor_x + 0.08, y, rail_z)),
            col,
        )
        assign_material(rail, mat_body)
        # Mount holes (visual cylinders cut / dark plugs)
        for hx in (motor_x - 0.22, motor_x + 0.28):
            hole = add_cylinder(
                f"OBJ_Mount_Hole_{side}_{hx:.2f}",
                radius=0.012,
                depth=0.04,
                location=Vector((hx, y, rail_z)),
                rotation=Euler((0.0, 0.0, 0.0), "XYZ"),
                collection=col,
                vertices=12,
            )
            assign_material(hole, mat_metal)
            # Sink into rail via boolean
            boolean_difference(rail, hole)

        # Stubs linking rail to motor belly
        stub = add_cube(
            f"OBJ_Mount_Stub_{side}",
            (0.12, 0.04, z0 - motor_r * 0.55),
            Vector((motor_x + 0.05, y * 0.85, (z0 - motor_r * 0.55) * 0.5)),
            col,
        )
        assign_material(stub, mat_body)
        fins.append(stub)
        fins.append(rail)

    # Join cast-iron body parts; keep hardware separate for zinc material
    body_parts = [
        motor,
        end_bell,
        drive_flange,
        jbox,
        adapter,
        adapter_flange,
        casing,
        volute,
        cheek,
        inlet_neck,
        inlet_flange,
        discharge,
        discharge_flange,
        *fins,
    ]
    body = join_objects("OBJ_PumpMotor_Body", body_parts, col)
    assign_material(body, mat_body)
    shade_smooth(body)

    hardware = [plate, warn, eye_ring, eye_stem, plug, *adapter_bolts, *inlet_bolts, *disc_bolts]
    for h in hardware:
        shade_smooth(h)

    # Camera: three-quarter from front so motor fins + suction flange both read
    cam_data = bpy.data.cameras.new("CAM_Hero")
    cam_data.type = "PERSP"
    cam_data.lens = 55
    cam = bpy.data.objects.new("CAM_Hero", cam_data)
    focus = Vector((0.05, 0.0, z0 + 0.08))
    cam.location = Vector((-0.35, -1.65, 0.78))
    direction = focus - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    link_object(cam, col_cam)
    scene.camera = cam

    key = bpy.data.lights.new("LGT_Key", type="AREA")
    key.energy = 280
    key.size = 3.0
    key_obj = bpy.data.objects.new("LGT_Key", key)
    key_obj.location = Vector((-1.2, -2.0, 2.6))
    key_obj.rotation_euler = Euler((math.radians(50), math.radians(-8), math.radians(-15)), "XYZ")
    link_object(key_obj, col_cam)

    fill = bpy.data.lights.new("LGT_Fill", type="AREA")
    fill.energy = 70
    fill.size = 4.0
    fill_obj = bpy.data.objects.new("LGT_Fill", fill)
    fill_obj.location = Vector((1.8, 1.4, 1.5))
    link_object(fill_obj, col_cam)

    rim = bpy.data.lights.new("LGT_Rim", type="AREA")
    rim.energy = 45
    rim.size = 2.5
    rim_obj = bpy.data.objects.new("LGT_Rim", rim)
    rim_obj.location = Vector((1.5, -1.0, 0.6))
    link_object(rim_obj, col_cam)

    world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.82, 0.84, 0.86, 1.0)
        bg.inputs[1].default_value = 0.95

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
            "OBJ_PumpMotor_Body",
            "OBJ_Motor_Nameplate",
            "OBJ_Motor_JunctionBox",
            "OBJ_Inlet_Flange",
            "OBJ_Discharge_Flange",
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
        "title": {
            "en": "Close-coupled centrifugal pump + motor",
            "vi": "Bơm ly tâm gắn motor (close-coupled)",
        },
        "category": "pumps",
        "tags": [
            "pump",
            "motor",
            "centrifugal",
            "finned-motor",
            "industrial",
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
        "buildScript": "scripts/blender/build_pump_motor.py",
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

    print("=== PUMP MOTOR BUILD REPORT ===")
    print(json.dumps(report, indent=2))
    return 0 if report["result"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
