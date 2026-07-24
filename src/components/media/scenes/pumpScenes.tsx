"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, polyPath } from "@/components/media/FlowParticles";
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
  const R = 0.4;
  const r = 0.26;
  const run = 1.35;
  const flow = useMemo(() => {
    const pts = [new THREE.Vector3(-(R + run), 0, 0), new THREE.Vector3(-R, 0, 0)];
    for (let i = 1; i <= 8; i++) {
      const a = Math.PI - (i / 8) * (Math.PI / 2); // π (−X) → π/2 (+Y)
      pts.push(new THREE.Vector3(R * Math.cos(a), R * Math.sin(a), 0));
    }
    pts.push(new THREE.Vector3(0, R + run, 0));
    return polyPath(pts);
  }, []);

  return (
    <SceneShell label="ΣF = ρQ(Vout−Vin)" camera={[4.2, 2.6, 4.2]}>
      <mesh position={[-(R + run / 2), 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[r, r, run, 22]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[0, R + run / 2, 0]}>
        <cylinderGeometry args={[r, r, run, 22]} />
        <meshStandardMaterial color={PIPE} metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[R, r, 12, 28, Math.PI / 2]} />
        <meshStandardMaterial color="#2f8f8f" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* force on outer wall of bend */}
      <mesh position={[0.42, 0.42, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <coneGeometry args={[0.14, 0.42, 14]} />
        <meshStandardMaterial color={FORCE} emissive={FORCE} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.22, 0.22, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.035, 0.035, 0.28, 8]} />
        <meshStandardMaterial color={FORCE} />
      </mesh>
      <FlowParticles path={flow} speed={0.42} count={44} color={WATER} />
      <SceneLabel3D position={[0.25, 1.6, 0]}>ΣF = ρQ(Vout−Vin)</SceneLabel3D>
    </SceneShell>
  );
}

/** Centrifugal pump — power equation P = ρgQH/η.
 * Side view: suction → translucent volute + impeller → vertical discharge (head). */
export function PumpScene() {
  const CX = 0;
  const CY = 0.1;
  const VOLUTE_R = 0.55;
  const Y_IN = 0;
  const X_OUT = 0.12;
  const Y_TAKEOFF = CY + VOLUTE_R - 0.02; // flush with volute crown
  const rIn = 0.16;
  const rOut = 0.14;

  const path = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-1.7, Y_IN, 0),
        new THREE.Vector3(-VOLUTE_R - 0.05, Y_IN, 0),
        new THREE.Vector3(-0.2, CY, 0),
        new THREE.Vector3(0.05, CY + 0.2, 0),
        new THREE.Vector3(X_OUT, Y_TAKEOFF, 0),
        new THREE.Vector3(X_OUT, 1.5, 0),
      ]),
    [],
  );

  return (
    <SceneShell label="P = ρgQH/η" camera={[4.2, 2.6, 5.0]}>
      {/* Volute drum (axis toward camera) */}
      <mesh position={[CX, CY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[VOLUTE_R, VOLUTE_R, 0.38, 36]} />
        <meshStandardMaterial
          color={HOUSING}
          metalness={0.35}
          roughness={0.42}
          transparent
          opacity={0.34}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[CX, CY, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[VOLUTE_R - 0.06, 0.03, 8, 36]} />
        <meshStandardMaterial color="#9aadb4" metalness={0.45} roughness={0.35} />
      </mesh>

      <SpinningImpeller position={[CX, CY, 0.06]} speed={3.2} radius={0.32} />

      {/* Suction — meets left wall of volute */}
      <mesh position={[-(1.05 + VOLUTE_R) / 2, Y_IN, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[rIn, rIn, 1.05 + VOLUTE_R - 0.08, 20]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.28}
          roughness={0.48}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>

      {/* Discharge nozzle on volute crown + riser */}
      <mesh position={[X_OUT, Y_TAKEOFF, 0]}>
        <sphereGeometry args={[rOut * 1.3, 16, 16]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.3}
          roughness={0.45}
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[X_OUT, (Y_TAKEOFF + 1.5) / 2, 0]}>
        <cylinderGeometry args={[rOut, rOut, 1.5 - Y_TAKEOFF, 20]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.28}
          roughness={0.48}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>

      <FlowParticles path={path} speed={0.4} count={56} size={0.05} color={WATER} seed={1} />
      <SceneLabel3D position={[0.05, 1.85, 0]}>P = ρgQH/η</SceneLabel3D>
    </SceneShell>
  );
}



/** Affinity laws — speed ratio n₁ vs n₂ (same readable pump silhouette as ch.14). */
export function AffinityScene() {
  // Paths are local to each pump group (origin at impeller).
  const flow = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(0, -0.95, 0),
        new THREE.Vector3(0, -0.35, 0),
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(0, 0.95, 0),
      ]),
    [],
  );

  return (
    <SceneShell label="affinity laws" camera={[4.4, 2.4, 4.2]}>
      {([-1.15, 1.15] as const).map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.32, 28]} />
            <meshStandardMaterial
              color={HOUSING}
              metalness={0.3}
              roughness={0.45}
              transparent
              opacity={0.36}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <SpinningImpeller
            position={[0, 0, 0.06]}
            speed={i === 0 ? 1.4 : 2.8}
            radius={0.22}
            blades={4}
          />
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.6, 14]} />
            <meshStandardMaterial
              color={PIPE}
              metalness={0.25}
              roughness={0.5}
              transparent
              opacity={0.75}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.6, 14]} />
            <meshStandardMaterial
              color={PIPE}
              metalness={0.25}
              roughness={0.5}
              transparent
              opacity={0.75}
              depthWrite={false}
            />
          </mesh>
          <FlowParticles
            path={flow}
            speed={i === 0 ? 0.25 : 0.5}
            count={22}
            color={i === 0 ? "#5ab8d0" : "#7ad8f0"}
            seed={i + 1}
          />
          <SceneLabel3D position={[0, 1.15, 0]}>{i === 0 ? "n₁" : "n₂"}</SceneLabel3D>
        </group>
      ))}
      <SceneLabel3D position={[0, 1.55, 0]}>affinity laws</SceneLabel3D>
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
        x: origin[0] + (Math.sin(i * 12.1) * 0.5 + 0.5) * 0.45 - 0.1,
        y: origin[1] + (Math.sin(i * 5.1) * 0.5) * 0.08,
        z: origin[2] + (Math.cos(i * 7.3) * 0.5) * 0.08,
        phase: Math.sin(i * 3.7) * 0.5 + 0.5,
        speed: 0.2 + (i % 5) * 0.05,
      })),
    [count, origin],
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const clamped = Math.min(dt, 0.05);
    for (let i = 0; i < count; i++) {
      const s = state[i];
      s.x += clamped * s.speed * 0.35;
      s.phase += clamped;
      if (s.x > origin[0] + 0.55) {
        s.x = origin[0] - 0.15;
        s.y = origin[1] + (Math.random() - 0.5) * 0.1;
        s.z = origin[2] + (Math.random() - 0.5) * 0.1;
      }
      dummy.position.set(s.x, s.y, s.z);
      const sc = 0.035 + 0.025 * Math.abs(Math.sin(s.phase * 2));
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

/** NPSH — cavitation risk near pump inlet (same clear suction→volute→discharge layout). */
export function NpshScene() {
  const CX = 0;
  const CY = 0.1;
  const VOLUTE_R = 0.5;
  const Y_IN = 0;
  const X_OUT = 0.1;
  const Y_TAKEOFF = CY + VOLUTE_R - 0.02;

  const path = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-1.7, Y_IN, 0),
        new THREE.Vector3(-VOLUTE_R - 0.05, Y_IN, 0),
        new THREE.Vector3(-0.15, CY, 0),
        new THREE.Vector3(X_OUT, Y_TAKEOFF, 0),
        new THREE.Vector3(X_OUT, 1.35, 0),
      ]),
    [],
  );

  return (
    <SceneShell label="NPSHₐ > NPSHᵣ" camera={[4.0, 2.5, 4.6]}>
      <mesh position={[CX, CY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[VOLUTE_R, VOLUTE_R, 0.36, 32]} />
        <meshStandardMaterial
          color={HOUSING}
          metalness={0.35}
          roughness={0.42}
          transparent
          opacity={0.34}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <SpinningImpeller position={[CX, CY, 0.06]} speed={2.8} radius={0.28} />

      <mesh position={[-(1.05 + VOLUTE_R) / 2, Y_IN, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 1.05 + VOLUTE_R - 0.08, 18]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.25}
          roughness={0.5}
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[X_OUT, Y_TAKEOFF, 0]}>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.3}
          roughness={0.45}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[X_OUT, (Y_TAKEOFF + 1.35) / 2, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 1.35 - Y_TAKEOFF, 16]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.25}
          roughness={0.5}
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </mesh>

      <FlowParticles path={path} speed={0.38} count={48} color={WATER} seed={1} />
      {/* Vapor bubbles stay inside suction barrel near impeller eye */}
      <CavitationBubbles origin={[-0.85, Y_IN, 0]} count={14} />
      <SceneLabel3D position={[0, 1.7, 0]}>{"NPSHₐ > NPSHᵣ"}</SceneLabel3D>
    </SceneShell>
  );
}
