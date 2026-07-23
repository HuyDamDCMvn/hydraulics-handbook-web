"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, linePath, polyPath } from "@/components/media/FlowParticles";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const WATER = "#4eb3d0";
const CONCRETE = "#b5b0a4";

/** Open rectangular channel with free-surface flow and Manning formula. */
export function ManningScene() {
  const path = useMemo(
    () => linePath(new THREE.Vector3(-2.2, 0.35, 0), new THREE.Vector3(2.2, 0.15, 0), 0.08, 0.4),
    [],
  );

  return (
    <SceneShell camera={[4.5, 3.2, 4.5]} label="Manning uniform flow">
      <group rotation={[0, 0, -0.06]}>
        {/* Bed */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[4.6, 0.12, 1.6]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        {/* Left wall */}
        <mesh position={[0, 0.35, -0.74]}>
          <boxGeometry args={[4.6, 0.9, 0.12]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        {/* Right wall */}
        <mesh position={[0, 0.35, 0.74]}>
          <boxGeometry args={[4.6, 0.9, 0.12]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        {/* Free-surface water slab */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[4.4, 0.55, 1.36]} />
          <meshStandardMaterial color={WATER} transparent opacity={0.72} roughness={0.25} />
        </mesh>
      </group>
      <FlowParticles path={path} count={56} speed={0.42} color="#7fd4ec" size={0.05} />
      <SceneLabel3D position={[0, 1.35, 0]}>{"V=(1/n)Rh^(2/3)S^(1/2)"}</SceneLabel3D>
    </SceneShell>
  );
}

/** Side-by-side rectangular and trapezoidal channel cross-sections. */
export function ChannelGeomScene() {
  const rectPath = useMemo(
    () => linePath(new THREE.Vector3(-2.0, 0.3, -0.9), new THREE.Vector3(-0.4, 0.3, -0.9), 0.04),
    [],
  );
  const trapPath = useMemo(
    () => linePath(new THREE.Vector3(0.4, 0.28, 0.9), new THREE.Vector3(2.0, 0.28, 0.9), 0.04),
    [],
  );

  return (
    <SceneShell camera={[0, 2.8, 5.2]} label="Channel geometry — A, P, Rh">
      {/* Rectangular section (left) */}
      <group position={[-1.2, 0, 0]}>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[1.4, 0.12, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[-0.64, 0.4, 0]}>
          <boxGeometry args={[0.12, 0.9, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0.64, 0.4, 0]}>
          <boxGeometry args={[0.12, 0.9, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[1.16, 0.55, 1.4]} />
          <meshStandardMaterial color={WATER} transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Trapezoidal section (right) — flared walls via rotated slabs */}
      <group position={[1.2, 0, 0]}>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[1.1, 0.12, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[-0.72, 0.4, 0]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.12, 1.05, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0.72, 0.4, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.12, 1.05, 1.5]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        {/* Water fill approximating trapezoid */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[1.35, 0.5, 1.4]} />
          <meshStandardMaterial color={WATER} transparent opacity={0.75} />
        </mesh>
      </group>

      <FlowParticles path={rectPath} count={28} speed={0.18} seed={2} size={0.04} />
      <FlowParticles path={trapPath} count={28} speed={0.18} seed={5} size={0.04} />
      <SceneLabel3D position={[0, 1.4, 0]}>{"A, P, Rh"}</SceneLabel3D>
    </SceneShell>
  );
}

function RippleSurface({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number];
}) {
  const geo = useRef<THREE.PlaneGeometry>(null);
  const base = useMemo(() => {
    const g = new THREE.PlaneGeometry(size[0], size[1], 24, 12);
    return Float32Array.from(g.attributes.position.array as ArrayLike<number>);
  }, [size]);

  useFrame(({ clock }) => {
    const geom = geo.current;
    if (!geom) return;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const wave =
        Math.sin(x * 6.5 + t * 8) * 0.035 + Math.sin(y * 4.2 + t * 5.5) * 0.02;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geo} args={[size[0], size[1], 24, 12]} />
      <meshStandardMaterial
        color={WATER}
        transparent
        opacity={0.78}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Subcritical (deep/slow) vs supercritical (shallow/fast) channels. */
export function FroudeScene() {
  const slowPath = useMemo(
    () => linePath(new THREE.Vector3(-2.0, 0.45, -1.1), new THREE.Vector3(2.0, 0.45, -1.1), 0.05),
    [],
  );
  const fastPath = useMemo(
    () => linePath(new THREE.Vector3(-2.0, 0.18, 1.1), new THREE.Vector3(2.0, 0.18, 1.1), 0.03),
    [],
  );

  return (
    <SceneShell camera={[4.2, 3.0, 4.8]} label="Froude number regimes">
      {/* Left: deep slow — subcritical */}
      <group position={[0, 0, -1.1]}>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[4.2, 0.12, 1.3]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.4, -0.59]}>
          <boxGeometry args={[4.2, 0.95, 0.1]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.4, 0.59]}>
          <boxGeometry args={[4.2, 0.95, 0.1]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[4.0, 0.72, 1.08]} />
          <meshStandardMaterial color={WATER} transparent opacity={0.7} roughness={0.35} />
        </mesh>
      </group>

      {/* Right: shallow fast — supercritical with ripples */}
      <group position={[0, 0, 1.1]}>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[4.2, 0.12, 1.3]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.22, -0.59]}>
          <boxGeometry args={[4.2, 0.55, 0.1]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.22, 0.59]}>
          <boxGeometry args={[4.2, 0.55, 0.1]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[4.0, 0.22, 1.08]} />
          <meshStandardMaterial color={WATER} transparent opacity={0.65} />
        </mesh>
        <RippleSurface position={[0, 0.2, 0]} size={[3.9, 1.05]} />
      </group>

      <FlowParticles path={slowPath} count={36} speed={0.22} seed={3} size={0.045} />
      <FlowParticles path={fastPath} count={48} speed={0.75} seed={7} color="#9ee4f5" size={0.04} />
      <SceneLabel3D position={[0, 1.45, 0]}>{"Fr = V/√(gy)"}</SceneLabel3D>
    </SceneShell>
  );
}

/** Hydraulic jump with roller recirculation. */
export function JumpFlowScene() {
  const inflow = useMemo(
    () => linePath(new THREE.Vector3(-2.3, 0.18, 0), new THREE.Vector3(-0.35, 0.18, 0), 0.04),
    [],
  );
  const roller = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-0.25, 0.22, 0),
        new THREE.Vector3(-0.05, 0.55, 0.15),
        new THREE.Vector3(0.25, 0.7, 0),
        new THREE.Vector3(0.1, 0.4, -0.12),
        new THREE.Vector3(-0.15, 0.28, 0),
        new THREE.Vector3(-0.25, 0.22, 0),
      ]),
    [],
  );
  const outflow = useMemo(
    () => linePath(new THREE.Vector3(0.35, 0.55, 0), new THREE.Vector3(2.3, 0.55, 0), 0.06),
    [],
  );

  return (
    <SceneShell camera={[4.5, 2.8, 4.2]} label="Hydraulic jump">
      {/* Channel bed */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[5.0, 0.12, 1.7]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.45, -0.8]}>
        <boxGeometry args={[5.0, 1.05, 0.1]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.45, 0.8]}>
        <boxGeometry args={[5.0, 1.05, 0.1]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} />
      </mesh>

      {/* Shallow supercritical inflow */}
      <mesh position={[-1.35, 0.14, 0]}>
        <boxGeometry args={[2.4, 0.28, 1.45]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.72} />
      </mesh>
      {/* Jump face */}
      <mesh position={[0.05, 0.4, 0]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.85, 0.45, 1.4]} />
        <meshStandardMaterial color="#6bc4de" transparent opacity={0.65} />
      </mesh>
      {/* Deep subcritical outflow */}
      <mesh position={[1.4, 0.48, 0]}>
        <boxGeometry args={[2.3, 0.95, 1.45]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.72} />
      </mesh>

      <FlowParticles path={inflow} count={40} speed={0.7} seed={1} color="#9ee4f5" size={0.045} />
      <FlowParticles path={roller} count={32} speed={0.55} seed={4} color="#b8ecf5" size={0.05} />
      <FlowParticles path={outflow} count={36} speed={0.28} seed={8} size={0.05} />
      <SceneLabel3D position={[0, 1.5, 0]}>{"y2/y1 from Fr1"}</SceneLabel3D>
    </SceneShell>
  );
}

/** Sharp-crested weir with overflow nappe. */
export function WeirFlowScene() {
  const overCrest = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-1.6, 0.55, 0),
        new THREE.Vector3(-0.35, 0.72, 0),
        new THREE.Vector3(0.05, 0.85, 0),
        new THREE.Vector3(0.35, 0.55, 0),
        new THREE.Vector3(0.55, 0.15, 0),
        new THREE.Vector3(0.75, -0.05, 0),
        new THREE.Vector3(1.1, -0.35, 0),
      ]),
    [],
  );

  return (
    <SceneShell camera={[3.8, 2.6, 4.0]} label="Sharp-crested weir">
      {/* Floor */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[4.2, 0.12, 2.2]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} />
      </mesh>
      {/* Sharp crest wall */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.12, 1.35, 2.0]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Crest tip highlight */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[0.06, 0.04, 2.0]} />
        <meshStandardMaterial color="#c4c0b4" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Upstream pool */}
      <mesh position={[-1.05, 0.25, 0]}>
        <boxGeometry args={[1.9, 1.15, 1.85]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.72} />
      </mesh>
      {/* Downstream splash / pool */}
      <mesh position={[1.15, -0.28, 0]}>
        <boxGeometry args={[1.5, 0.35, 1.6]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.65} />
      </mesh>

      <FlowParticles path={overCrest} count={52} speed={0.48} color="#8ed8ef" size={0.048} />
      <SceneLabel3D position={[0, 1.55, 0]}>{"Q ∝ L H^(3/2)"}</SceneLabel3D>
    </SceneShell>
  );
}
