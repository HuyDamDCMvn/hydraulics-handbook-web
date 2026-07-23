"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import {
  FlowParticles,
  linePath,
  polyPath,
  constrictionSpeed,
} from "@/components/media/FlowParticles";
import { useMemo } from "react";
import * as THREE from "three";

const WATER = "#4eb3d0";
const PIPE = "#8a969f";
const PIPE_MID = "#9aa6b0";

function DarkPipe({
  position,
  rotation,
  args,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number, number?];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial
        color={PIPE}
        metalness={0.45}
        roughness={0.4}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Continuity: A₁V₁ = A₂V₂ — narrowing pipe with faster mid particles. */
export function ContinuityScene() {
  const path = useMemo(() => {
    const p = linePath(new THREE.Vector3(-2.0, 0, 0), new THREE.Vector3(2.0, 0, 0));
    p.speedAt = constrictionSpeed;
    return p;
  }, []);

  return (
    <SceneShell label="A₁V₁ = A₂V₂" camera={[4.2, 2.2, 3.5]}>
      {/* Wide inlet */}
      <DarkPipe position={[-1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.38, 0.38, 1.5, 24]} />
      {/* Constriction (scaled cylinders) */}
      <DarkPipe position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.38, 0.18, 0.55, 20]} />
      <DarkPipe position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.18, 0.38, 0.55, 20]} />
      {/* Throat ring */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.35, 20]} />
        <meshStandardMaterial color={PIPE_MID} metalness={0.5} roughness={0.38} />
      </mesh>
      {/* Wide outlet */}
      <DarkPipe position={[1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.38, 0.38, 1.5, 24]} />
      <FlowParticles path={path} count={80} speed={0.55} size={0.07} color="#7fe0ff" seed={5} />
      <SceneLabel3D position={[0, 0.95, 0]}>A₁V₁ = A₂V₂</SceneLabel3D>
    </SceneShell>
  );
}

/** Bernoulli / total head — high reservoir to lower outlet. */
export function BernoulliScene() {
  const path = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(-1.35, 1.35, 0),
        new THREE.Vector3(-1.35, 0.55, 0),
        new THREE.Vector3(-0.55, 0.15, 0),
        new THREE.Vector3(0.4, -0.05, 0),
        new THREE.Vector3(1.6, -0.05, 0),
      ]),
    [],
  );

  return (
    <SceneShell label="Bernoulli / total head" camera={[4.0, 2.8, 4.0]}>
      {/* Elevated tank */}
      <mesh position={[-1.35, 1.15, 0]}>
        <boxGeometry args={[1.1, 1.0, 0.9]} />
        <meshStandardMaterial
          color="#8ec8d8"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[-1.35, 1.05, 0]}>
        <boxGeometry args={[0.95, 0.75, 0.75]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.55} roughness={0.3} />
      </mesh>
      {/* Downcomer + lower pipe */}
      <DarkPipe position={[-1.35, 0.35, 0]} args={[0.16, 0.16, 0.7, 16]} />
      <DarkPipe position={[0.35, -0.05, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.16, 0.16, 2.4, 16]} />
      <FlowParticles path={path} count={42} speed={0.38} size={0.048} color="#5ec8e8" seed={2} />
      <SceneLabel3D position={[0.2, 1.75, 0]}>Bernoulli / total head</SceneLabel3D>
    </SceneShell>
  );
}

/** Torricelli: V = √(2gh) — side orifice jet. */
export function TorricelliScene() {
  const path = useMemo(
    () =>
      polyPath([
        new THREE.Vector3(0.55, 0.35, 0),
        new THREE.Vector3(1.0, 0.32, 0),
        new THREE.Vector3(1.45, 0.15, 0),
        new THREE.Vector3(1.85, -0.15, 0),
        new THREE.Vector3(2.15, -0.55, 0),
      ]),
    [],
  );

  return (
    <SceneShell label="V=√(2gh)" camera={[4.2, 2.4, 3.8]}>
      {/* Tank */}
      <mesh position={[-0.15, 0.55, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.1]} />
        <meshStandardMaterial
          color="#8ec8d8"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          roughness={0.2}
        />
      </mesh>
      {/* Water */}
      <mesh position={[-0.15, 0.45, 0]}>
        <boxGeometry args={[1.35, 1.2, 0.95]} />
        <meshStandardMaterial color={WATER} transparent opacity={0.5} roughness={0.3} />
      </mesh>
      {/* Orifice rim */}
      <mesh position={[0.58, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
        <meshStandardMaterial color={PIPE} metalness={0.5} roughness={0.4} />
      </mesh>
      <FlowParticles path={path} count={36} speed={0.45} size={0.045} color="#7ad4e8" seed={4} />
      <SceneLabel3D position={[0.4, 1.55, 0]}>V=√(2gh)</SceneLabel3D>
    </SceneShell>
  );
}

/** Reynolds: laminar (ordered) vs turbulent (swirling) parallel pipes. */
export function ReynoldsScene() {
  const laminar = useMemo(
    () => linePath(new THREE.Vector3(-1.5, 0.55, 0), new THREE.Vector3(1.5, 0.55, 0), 0, 0),
    [],
  );
  const turbulent = useMemo(
    () => linePath(new THREE.Vector3(-1.5, -0.55, 0), new THREE.Vector3(1.5, -0.55, 0), 0.14, 3),
    [],
  );

  return (
    <SceneShell label="Re" camera={[4.0, 2.2, 4.0]}>
      {/* Laminar pipe (top) */}
      <DarkPipe position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.28, 0.28, 3.2, 22]} />
      <FlowParticles path={laminar} count={40} speed={0.28} size={0.042} color="#5ec8e8" seed={1} />
      <SceneLabel3D position={[0, 1.05, 0]} color="#a8dce8">
        Laminar
      </SceneLabel3D>

      {/* Turbulent pipe (bottom) */}
      <DarkPipe position={[0, -0.55, 0]} rotation={[0, 0, Math.PI / 2]} args={[0.28, 0.28, 3.2, 22]} />
      <FlowParticles path={turbulent} count={52} speed={0.55} size={0.042} color="#7ad" seed={7} />
      <SceneLabel3D position={[0, -1.05, 0]} color="#9bb8d8">
        Turbulent
      </SceneLabel3D>

      <SceneLabel3D position={[0, 1.55, 0]}>Re</SceneLabel3D>
    </SceneShell>
  );
}
