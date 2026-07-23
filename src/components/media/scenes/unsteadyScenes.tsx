"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, linePath, polyPath } from "@/components/media/FlowParticles";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const WATER = "#4eb3d0";
const CONCRETE = "#b5b0a4";

function DrawdownWater() {
  const mesh = useRef<THREE.Mesh>(null);
  const t0 = useRef(0);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    // Slow drawdown, then reset
    const cycle = 8;
    const u = (t % cycle) / cycle;
    const level = 1.35 - u * 1.05;
    mesh.current.scale.y = Math.max(level, 0.12);
    mesh.current.position.y = -0.55 + (mesh.current.scale.y * 1.2) / 2;
    t0.current = t;
  });

  return (
    <mesh ref={mesh} position={[0, 0.05, 0]}>
      <boxGeometry args={[1.55, 1.2, 1.55]} />
      <meshStandardMaterial color={WATER} transparent opacity={0.72} roughness={0.25} />
    </mesh>
  );
}

/** Tank emptying through an orifice — animated free-surface drawdown. */
export function DrawdownScene() {
  const outflow = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(0.85, -0.35, 0),
        new THREE.Vector3(1.15, -0.42, 0),
        new THREE.Vector3(1.45, -0.55, 0.05),
        new THREE.Vector3(1.75, -0.85, 0.1),
        new THREE.Vector3(1.95, -1.15, 0),
      ]),
    [],
  );

  return (
    <SceneShell camera={[4.0, 2.8, 4.2]} label="Orifice tank drawdown">
      {/* Tank walls */}
      <mesh position={[0, 0.15, -0.85]}>
        <boxGeometry args={[1.8, 1.9, 0.1]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.15, 0.85]}>
        <boxGeometry args={[1.8, 1.9, 0.1]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.85, 0.15, 0]}>
        <boxGeometry args={[0.1, 1.9, 1.6]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.85, 0.15, 0]}>
        <boxGeometry args={[0.1, 1.9, 1.6]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} transparent opacity={0.45} />
      </mesh>
      {/* Floor */}
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[1.8, 0.1, 1.7]} />
        <meshStandardMaterial color={CONCRETE} roughness={0.85} />
      </mesh>
      {/* Orifice opening hint */}
      <mesh position={[0.92, -0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#5a564c" metalness={0.4} roughness={0.4} />
      </mesh>

      <DrawdownWater />
      <FlowParticles path={outflow} count={36} speed={0.55} color="#8ed8ef" size={0.045} />
      <SceneLabel3D position={[0, 1.55, 0]}>{"tank drawdown"}</SceneLabel3D>
    </SceneShell>
  );
}

function HammerPipe() {
  const valve = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const phase = useRef(0);

  useFrame((_, dt) => {
    phase.current += dt;
    const cycle = 3.2;
    const t = phase.current % cycle;

    // Valve snaps closed near t=0.4, reopens after wave passes
    const closed = t > 0.35 && t < 2.4;
    if (valve.current) {
      valve.current.rotation.z = closed ? Math.PI / 2 : 0.12;
    }

    if (pulse.current) {
      if (closed && t < 2.0) {
        // Wave travels from valve (x≈1.1) toward inlet (x≈-2.0)
        const u = (t - 0.35) / 1.5;
        const x = 1.05 - u * 3.0;
        pulse.current.visible = true;
        pulse.current.position.x = x;
        const mat = pulse.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.9 * (1 - u) + 0.15;
      } else {
        pulse.current.visible = false;
      }
    }
  });

  const openPath = useMemo(
    () => linePath(new THREE.Vector3(-2.1, 0, 0), new THREE.Vector3(0.95, 0, 0), 0.06),
    [],
  );

  return (
    <>
      {/* Pipe barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 3.4, 28]} />
        <meshStandardMaterial color="#6a7a82" metalness={0.45} roughness={0.4} />
      </mesh>
      {/* Valve housing */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[0.45, 0.7, 0.7]} />
        <meshStandardMaterial color="#5a6368" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Valve disc */}
      <mesh ref={valve} position={[1.15, 0, 0]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial color="#c4a060" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Pressure-wave pulse ring */}
      <mesh ref={pulse} position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} visible={false}>
        <torusGeometry args={[0.32, 0.045, 10, 28]} />
        <meshStandardMaterial
          color="#e8c070"
          emissive="#e8a040"
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      <FlowParticles path={openPath} count={40} speed={0.45} color="#7fd4ec" size={0.04} />
    </>
  );
}

/** Water hammer — valve slam and traveling pressure wave. */
export function HammerScene() {
  return (
    <SceneShell camera={[3.5, 2.2, 4.0]} label="Water hammer surge">
      <HammerPipe />
      {/* Support stands */}
      <mesh position={[-1.6, -0.55, 0]}>
        <boxGeometry args={[0.15, 0.55, 0.35]} />
        <meshStandardMaterial color={CONCRETE} />
      </mesh>
      <mesh position={[0.4, -0.55, 0]}>
        <boxGeometry args={[0.15, 0.55, 0.35]} />
        <meshStandardMaterial color={CONCRETE} />
      </mesh>
      <SceneLabel3D position={[0, 1.15, 0]}>{"Δp = ρ c ΔV"}</SceneLabel3D>
    </SceneShell>
  );
}

/** Darcy seepage through a soil block. */
export function SeepageScene() {
  const seepageA = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-0.7, 0.85, 0.3),
        new THREE.Vector3(-0.45, 0.55, 0.15),
        new THREE.Vector3(-0.2, 0.35, -0.1),
        new THREE.Vector3(0.05, 0.1, 0.2),
        new THREE.Vector3(0.25, -0.2, 0.05),
        new THREE.Vector3(0.45, -0.55, -0.15),
        new THREE.Vector3(0.65, -0.85, 0.1),
      ]),
    [],
  );
  const seepageB = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(0.5, 0.9, -0.25),
        new THREE.Vector3(0.25, 0.6, -0.05),
        new THREE.Vector3(-0.05, 0.3, 0.25),
        new THREE.Vector3(-0.3, 0.0, 0.05),
        new THREE.Vector3(-0.45, -0.35, -0.2),
        new THREE.Vector3(-0.55, -0.7, 0.0),
        new THREE.Vector3(-0.4, -0.95, 0.15),
      ]),
    [],
  );
  const seepageC = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(0.1, 0.95, 0.4),
        new THREE.Vector3(0.35, 0.65, 0.2),
        new THREE.Vector3(0.5, 0.35, -0.15),
        new THREE.Vector3(0.35, 0.05, -0.35),
        new THREE.Vector3(0.1, -0.3, -0.1),
        new THREE.Vector3(-0.15, -0.6, 0.2),
        new THREE.Vector3(0.0, -0.95, 0.05),
      ]),
    [],
  );

  return (
    <SceneShell camera={[4.0, 3.0, 4.2]} label="Darcy seepage">
      {/* Soil block */}
      <mesh>
        <boxGeometry args={[2.2, 2.0, 1.6]} />
        <meshStandardMaterial
          color="#6b4a2e"
          transparent
          opacity={0.45}
          roughness={0.9}
          depthWrite={false}
        />
      </mesh>
      {/* Grid wireframe overlay */}
      <mesh>
        <boxGeometry args={[2.22, 2.02, 1.62]} />
        <meshBasicMaterial color="#a07848" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Impermeable base */}
      <mesh position={[0, -1.12, 0]}>
        <boxGeometry args={[2.5, 0.16, 1.9]} />
        <meshStandardMaterial color="#4a463c" roughness={0.85} />
      </mesh>
      {/* Headwater pond above */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[2.0, 0.2, 1.4]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.55} />
      </mesh>

      <FlowParticles path={seepageA} count={22} speed={0.12} seed={1} color="#6ec0d8" size={0.04} />
      <FlowParticles path={seepageB} count={20} speed={0.1} seed={3} color="#5eb0c8" size={0.038} />
      <FlowParticles path={seepageC} count={18} speed={0.11} seed={6} color="#7ad0e4" size={0.036} />
      <SceneLabel3D position={[0, 1.65, 0]}>{"q = −k i A"}</SceneLabel3D>
    </SceneShell>
  );
}
