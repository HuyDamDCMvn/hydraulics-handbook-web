"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, linePath, polyPath } from "@/components/media/FlowParticles";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PIPE = "#7a9aa3";
const HOUSING = "#6a8890";
const WATER = "#4eb3d0";
const FORCE = "#c9a227";

function SpinningImpeller({
  position,
  speed = 2.5,
  radius = 0.35,
  blades = 5,
}: {
  position: [number, number, number];
  speed?: number;
  radius?: number;
  blades?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
        <meshStandardMaterial color="#c8d0d4" metalness={0.6} roughness={0.3} />
      </mesh>
      {Array.from({ length: blades }, (_, i) => {
        const a = (i / blades) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * radius * 0.45, Math.sin(a) * radius * 0.45, 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[radius * 0.85, 0.08, 0.04]} />
            <meshStandardMaterial color="#9ab0b8" metalness={0.55} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Momentum change through a 90° bend — force on the wall. */
export function MomentumBendScene() {
  const flow = polyPath([
    new THREE.Vector3(-1.6, 0, 0),
    new THREE.Vector3(-0.1, 0, 0),
    new THREE.Vector3(0.05, 0.02, 0.2),
    new THREE.Vector3(0.15, 0.05, 0.55),
    new THREE.Vector3(0.2, 0.08, 1.45),
  ]);

  return (
    <SceneShell label="ΣF = ρQ(Vout−Vin)" camera={[3.8, 2.5, 3.5]}>
      <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 1.5, 22]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[0.2, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 1.5, 22]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[0.05, 0, 0.05]}>
        <torusGeometry args={[0.45, 0.26, 12, 28, Math.PI / 2]} />
        <meshStandardMaterial color="#2f8f8f" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* force cone on bend wall (momentum change) */}
      <mesh position={[0.55, 0.35, 0.35]} rotation={[0, 0, -0.85]}>
        <coneGeometry args={[0.14, 0.42, 14]} />
        <meshStandardMaterial color={FORCE} emissive={FORCE} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.38, 0.18, 0.28]} rotation={[0, 0, -0.85]}>
        <cylinderGeometry args={[0.035, 0.035, 0.28, 8]} />
        <meshStandardMaterial color={FORCE} />
      </mesh>
      <FlowParticles path={flow} speed={0.42} count={44} color={WATER} />
      <SceneLabel3D position={[0.2, 1.15, 0.4]}>ΣF = ρQ(Vout−Vin)</SceneLabel3D>
    </SceneShell>
  );
}

/** Centrifugal pump — power equation. */
export function PumpScene() {
  const inlet = linePath(new THREE.Vector3(-1.5, -0.35, 0), new THREE.Vector3(-0.35, -0.1, 0));
  const outlet = linePath(new THREE.Vector3(0.35, 0.35, 0), new THREE.Vector3(1.5, 0.75, 0));
  const rise = polyPath([
    new THREE.Vector3(-0.2, -0.15, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.15, 0.25, 0),
  ]);

  return (
    <SceneShell label="P = ρgQH/η" camera={[4, 2.4, 4]}>
      {/* volute / box housing */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.1, 0.95, 0.7]} />
        <meshStandardMaterial color={HOUSING} metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[0.35, 0.15, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.55, 20]} />
        <meshStandardMaterial color="#355860" metalness={0.4} roughness={0.35} />
      </mesh>
      <SpinningImpeller position={[0.05, 0.05, 0.28]} speed={3.2} radius={0.32} />
      {/* inlet */}
      <mesh position={[-1.0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 1.2, 18]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.5} />
      </mesh>
      {/* outlet */}
      <mesh position={[1.0, 0.55, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.16, 0.16, 1.15, 18]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.5} />
      </mesh>
      <FlowParticles path={inlet} speed={0.35} count={28} color={WATER} seed={1} />
      <FlowParticles path={rise} speed={0.45} count={16} color="#7ad8f0" seed={2} />
      <FlowParticles path={outlet} speed={0.4} count={28} color={WATER} seed={3} />
      <SceneLabel3D position={[0, 1.25, 0]}>P = ρgQH/η</SceneLabel3D>
    </SceneShell>
  );
}

/** Affinity laws — speed ratio n₁ vs n₂. */
export function AffinityScene() {
  const leftFlow = linePath(new THREE.Vector3(-1.55, -0.45, 0), new THREE.Vector3(-0.55, 0.55, 0));
  const rightFlow = linePath(new THREE.Vector3(0.55, -0.45, 0), new THREE.Vector3(1.55, 0.55, 0));

  return (
    <SceneShell label="affinity laws" camera={[4.2, 2.2, 4]}>
      {/* left pump — slow */}
      <mesh position={[-1.05, 0, 0]}>
        <boxGeometry args={[0.75, 0.7, 0.5]} />
        <meshStandardMaterial color={HOUSING} metalness={0.3} roughness={0.45} />
      </mesh>
      <SpinningImpeller position={[-1.05, 0, 0.22]} speed={1.4} radius={0.22} blades={4} />
      <mesh position={[-1.05, -0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.55, 14]} />
        <meshStandardMaterial color={PIPE} />
      </mesh>
      <mesh position={[-1.05, 0.5, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.45, 14]} />
        <meshStandardMaterial color={PIPE} />
      </mesh>
      <FlowParticles path={leftFlow} speed={0.25} count={22} color="#5ab8d0" seed={1} />
      <SceneLabel3D position={[-1.05, 1.0, 0]}>n₁</SceneLabel3D>

      {/* right pump — 2× speed */}
      <mesh position={[1.05, 0, 0]}>
        <boxGeometry args={[0.75, 0.7, 0.5]} />
        <meshStandardMaterial color={HOUSING} metalness={0.3} roughness={0.45} />
      </mesh>
      <SpinningImpeller position={[1.05, 0, 0.22]} speed={2.8} radius={0.22} blades={4} />
      <mesh position={[1.05, -0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.55, 14]} />
        <meshStandardMaterial color={PIPE} />
      </mesh>
      <mesh position={[1.05, 0.5, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.45, 14]} />
        <meshStandardMaterial color={PIPE} />
      </mesh>
      <FlowParticles path={rightFlow} speed={0.5} count={22} color="#7ad8f0" seed={2} />
      <SceneLabel3D position={[1.05, 1.0, 0]}>n₂</SceneLabel3D>

      <SceneLabel3D position={[0, 1.4, 0]}>affinity laws</SceneLabel3D>
    </SceneShell>
  );
}

function CavitationBubbles({
  origin,
  count = 14,
}: {
  origin: [number, number, number];
  count?: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const state = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: origin[0] + (Math.sin(i * 12.1) * 0.5 + 0.5) * 0.35 - 0.1,
        y: origin[1] + (i / count) * 0.5,
        z: origin[2] + (Math.cos(i * 7.3) * 0.5) * 0.2,
        phase: Math.sin(i * 3.7) * 0.5 + 0.5,
        speed: 0.25 + (i % 5) * 0.06,
      })),
    [count, origin],
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const clamped = Math.min(dt, 0.05);
    for (let i = 0; i < count; i++) {
      const s = state[i];
      s.y += clamped * s.speed;
      s.phase += clamped;
      if (s.y > origin[1] + 0.75) {
        s.y = origin[1] - 0.05;
        s.x = origin[0] + (Math.random() - 0.5) * 0.35;
        s.z = origin[2] + (Math.random() - 0.5) * 0.25;
      }
      dummy.position.set(s.x, s.y, s.z);
      const sc = 0.04 + 0.03 * Math.abs(Math.sin(s.phase * 2));
      dummy.scale.setScalar(sc);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#f0f8ff"
        transparent
        opacity={0.45}
        roughness={0.2}
        metalness={0.05}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/** NPSH — cavitation risk near pump inlet. */
export function NpshScene() {
  const inlet = linePath(new THREE.Vector3(-1.7, -0.25, 0), new THREE.Vector3(-0.4, -0.05, 0));
  const outlet = linePath(new THREE.Vector3(0.4, 0.4, 0), new THREE.Vector3(1.4, 0.7, 0));

  return (
    <SceneShell label="NPSHₐ > NPSHᵣ" camera={[4, 2.3, 3.8]}>
      <mesh position={[0.1, 0.1, 0]}>
        <boxGeometry args={[1.0, 0.9, 0.65]} />
        <meshStandardMaterial color={HOUSING} metalness={0.35} roughness={0.4} />
      </mesh>
      <SpinningImpeller position={[0.05, 0.05, 0.26]} speed={2.8} radius={0.28} />
      <mesh position={[-1.05, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.17, 0.17, 1.35, 18]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.5} />
      </mesh>
      <mesh position={[0.95, 0.55, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.14, 0.14, 0.95, 16]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.5} />
      </mesh>
      <FlowParticles path={inlet} speed={0.38} count={32} color={WATER} seed={1} />
      <FlowParticles path={outlet} speed={0.42} count={24} color="#7ad8f0" seed={2} />
      <CavitationBubbles origin={[-0.85, -0.15, 0]} count={16} />
      <SceneLabel3D position={[0, 1.2, 0]}>{"NPSHₐ > NPSHᵣ"}</SceneLabel3D>
    </SceneShell>
  );
}
