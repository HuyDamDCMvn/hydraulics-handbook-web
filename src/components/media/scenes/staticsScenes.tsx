"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, linePath } from "@/components/media/FlowParticles";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const WATER = "#4eb3d0";
const WATER_DEEP = "#2f8fb0";
const GLASS = "#b8dce8";
const METAL = "#8a969f";

function PistonPlate() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = 0.95 + Math.sin(clock.elapsedTime * 0.7) * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, 0.95, 0]}>
      <boxGeometry args={[1.35, 0.08, 0.95]} />
      <meshStandardMaterial color={METAL} metalness={0.55} roughness={0.35} />
    </mesh>
  );
}

/** ρ = m/V, p = F/A — tank, density spheres, animated piston. */
export function DensityScene() {
  const spheres = useMemo(
    () => [
      { pos: [-0.35, 0.25, 0.15] as [number, number, number], r: 0.12, c: "#5ec8e8" },
      { pos: [0.25, 0.35, -0.1] as [number, number, number], r: 0.18, c: "#3aa6c8" },
      { pos: [0.05, 0.2, 0.25] as [number, number, number], r: 0.09, c: "#7ad4e8" },
      { pos: [-0.15, 0.45, -0.2] as [number, number, number], r: 0.14, c: "#2a8aaa" },
    ],
    [],
  );

  return (
    <SceneShell label="ρ, γ, p=F/A" camera={[3.6, 2.4, 3.8]}>
      {/* Transparent tank */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.6, 1.3, 1.15]} />
        <meshStandardMaterial
          color={GLASS}
          transparent
          opacity={0.12}
          metalness={0.1}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Water block */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.45, 0.85, 1.0]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.55} roughness={0.25} />
      </mesh>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.r, 16, 16]} />
          <meshStandardMaterial color={s.c} metalness={0.15} roughness={0.4} />
        </mesh>
      ))}
      <PistonPlate />
      <SceneLabel3D position={[0, 1.55, 0]}>ρ, γ, p=F/A</SceneLabel3D>
    </SceneShell>
  );
}

/** Hydrostatic pressure: p = ρ g h — discs deepen with depth. */
export function HydrostaticScene() {
  const discs = useMemo(() => {
    const n = 7;
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      return {
        y: 1.15 - t * 1.55,
        opacity: 0.2 + t * 0.55,
        color: t < 0.4 ? "#5ec8e8" : t < 0.7 ? WATER : WATER_DEEP,
      };
    });
  }, []);

  const ambientPath = useMemo(
    () => linePath(new THREE.Vector3(-0.25, 0.2, 0), new THREE.Vector3(0.25, 0.15, 0.1), 0.08, 0.3),
    [],
  );

  return (
    <SceneShell label="p = ρ g h" camera={[3.2, 2.6, 3.5]}>
      {/* Tall tank shell */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.1, 2.2, 0.9]} />
        <meshStandardMaterial
          color={GLASS}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          roughness={0.2}
        />
      </mesh>
      {/* Water column */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.95, 1.9, 0.75]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.35} roughness={0.3} />
      </mesh>
      {discs.map((d, i) => (
        <mesh key={i} position={[0, d.y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 24]} />
          <meshStandardMaterial
            color={d.color}
            transparent
            opacity={d.opacity}
            side={THREE.DoubleSide}
            roughness={0.4}
          />
        </mesh>
      ))}
      <FlowParticles path={ambientPath} count={12} speed={0.06} size={0.04} color="#8ed8f0" />
      <SceneLabel3D position={[0, 1.85, 0]}>p = ρ g h</SceneLabel3D>
    </SceneShell>
  );
}

/** Inclined submerged plate with pressure arrows growing toward bottom. */
export function ForcePlateScene() {
  const arrows = useMemo(() => {
    const n = 5;
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const along = -0.55 + t * 1.1;
      const scale = 0.35 + t * 0.75;
      return { along, scale };
    });
  }, []);

  const plateAngle = -0.55;

  return (
    <SceneShell label="F, center of pressure" camera={[4.0, 2.5, 3.8]}>
      {/* Water surface */}
      <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 2.0]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Water body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3.0, 1.4, 1.8]} />
        <meshStandardMaterial color={WATER_DEEP} transparent opacity={0.28} roughness={0.35} />
      </mesh>
      {/* Inclined plate */}
      <group position={[0.15, 0.2, 0]} rotation={[0, 0, plateAngle]}>
        <mesh>
          <boxGeometry args={[0.08, 1.4, 1.0]} />
          <meshStandardMaterial color="#c4b896" metalness={0.2} roughness={0.45} />
        </mesh>
        {arrows.map((a, i) => (
          <group key={i} position={[-0.12 - a.scale * 0.25, a.along, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh scale={[a.scale * 0.55, a.scale, a.scale * 0.55]}>
              <coneGeometry args={[0.12, 0.4, 10]} />
              <meshStandardMaterial color="#e8c56b" emissive="#e8c56b" emissiveIntensity={0.2} />
            </mesh>
          </group>
        ))}
      </group>
      <SceneLabel3D position={[0, 1.55, 0]}>F, center of pressure</SceneLabel3D>
    </SceneShell>
  );
}

function BobbingBox() {
  const box = useRef<THREE.Mesh>(null);
  const displaced = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const bob = Math.sin(clock.elapsedTime * 1.1) * 0.08;
    if (box.current) box.current.position.y = 0.55 + bob;
    if (displaced.current) {
      displaced.current.position.y = 0.22 + bob * 0.35;
      displaced.current.scale.y = 1 + bob * 0.4;
    }
  });
  return (
    <>
      <mesh ref={box} position={[0, 0.55, 0]}>
        <boxGeometry args={[0.85, 0.55, 0.65]} />
        <meshStandardMaterial color="#c48a4a" metalness={0.1} roughness={0.55} />
      </mesh>
      <mesh ref={displaced} position={[0, 0.22, 0]}>
        <boxGeometry args={[0.85, 0.4, 0.65]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.4} roughness={0.3} />
      </mesh>
    </>
  );
}

/** Buoyancy: F_B = ρ g V_sub — floating box with displaced volume. */
export function BuoyancyScene() {
  const ambientPath = useMemo(
    () => linePath(new THREE.Vector3(-0.9, 0.15, 0.2), new THREE.Vector3(0.9, 0.12, -0.15), 0.12, 0.5),
    [],
  );

  return (
    <SceneShell label="F_B = ρ g V_sub" camera={[3.8, 2.4, 3.6]}>
      {/* Tank */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.4, 1.3, 1.6]} />
        <meshStandardMaterial
          color={GLASS}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          roughness={0.2}
        />
      </mesh>
      {/* Water */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.2, 0.9, 1.4]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.45} roughness={0.3} />
      </mesh>
      <BobbingBox />
      <FlowParticles path={ambientPath} count={18} speed={0.08} size={0.035} color="#8ed8f0" seed={3} />
      <SceneLabel3D position={[0, 1.35, 0]}>F_B = ρ g V_sub</SceneLabel3D>
    </SceneShell>
  );
}
