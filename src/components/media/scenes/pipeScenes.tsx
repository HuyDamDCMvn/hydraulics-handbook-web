"use client";

import { SceneShell, SceneLabel3D } from "@/components/media/SceneShell";
import { FlowParticles, linePath, polyPath } from "@/components/media/FlowParticles";
import * as THREE from "three";

const PIPE = "#7a9aa3";
const PIPE_ROUGH = "#5f7f88";
const WATER = "#4eb3d0";

function RoughnessDots({
  length = 3.6,
  radius = 0.32,
  count = 28,
}: {
  length?: number;
  radius?: number;
  count?: number;
}) {
  const dots = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    const ang = i * 2.4;
    return {
      key: i,
      pos: [
        -length / 2 + t * length,
        Math.sin(ang) * (radius + 0.02),
        Math.cos(ang) * (radius + 0.02),
      ] as [number, number, number],
    };
  });
  return (
    <>
      {dots.map((d) => (
        <mesh key={d.key} position={d.pos}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color="#8a7a5a" roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}

/** Darcy–Weisbach friction head loss along a long pipe. */
export function DarcyScene() {
  const path = linePath(new THREE.Vector3(-1.9, 0, 0), new THREE.Vector3(1.9, 0, 0));
  return (
    <SceneShell label="h_f = f(L/D)V²/(2g)" camera={[4.5, 2.2, 3.2]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.32, 3.8, 28, 1, true]} />
        <meshStandardMaterial
          color={PIPE}
          metalness={0.25}
          roughness={0.55}
          side={THREE.DoubleSide}
          transparent
          opacity={0.55}
        />
      </mesh>
      <RoughnessDots />
      <FlowParticles path={path} speed={0.22} count={40} color={WATER} />
      <SceneLabel3D position={[0, 0.85, 0]}>h_f = f(L/D)V²/(2g)</SceneLabel3D>
    </SceneShell>
  );
}

/** Smooth vs rough wall — friction factor contrast. */
export function FrictionScene() {
  const smooth = linePath(new THREE.Vector3(-1.7, 0.7, 0), new THREE.Vector3(1.7, 0.7, 0));
  const rough = linePath(
    new THREE.Vector3(-1.7, -0.55, 0),
    new THREE.Vector3(1.7, -0.55, 0),
    0.12,
    1.2,
  );
  const bumps = Array.from({ length: 16 }, (_, i) => {
    const t = (i + 0.5) / 16;
    const ang = i * 1.7;
    return {
      key: i,
      pos: [
        -1.6 + t * 3.2,
        -0.55 + Math.sin(ang) * 0.28,
        Math.cos(ang) * 0.28,
      ] as [number, number, number],
    };
  });

  return (
    <SceneShell label="friction factor f" camera={[4.2, 1.8, 4]}>
      {/* smooth */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 3.4, 24, 1, true]} />
        <meshStandardMaterial
          color="#4a8a92"
          metalness={0.3}
          roughness={0.3}
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>
      <FlowParticles path={smooth} speed={0.55} count={36} color="#7ad8f0" seed={2} />
      <SceneLabel3D position={[-1.9, 0.7, 0]} color="#a8e0e8">
        smooth
      </SceneLabel3D>

      {/* rough */}
      <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 3.4, 24, 1, true]} />
        <meshStandardMaterial
          color={PIPE_ROUGH}
          metalness={0.15}
          roughness={0.75}
          side={THREE.DoubleSide}
          transparent
          opacity={0.55}
        />
      </mesh>
      {bumps.map((b) => (
        <mesh key={b.key} position={b.pos}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color="#6a5a40" roughness={1} />
        </mesh>
      ))}
      <FlowParticles path={rough} speed={0.22} count={36} color="#4aa8c0" size={0.045} seed={5} />
      <SceneLabel3D position={[-1.9, -0.55, 0]} color="#c8b890">
        rough
      </SceneLabel3D>
      <SceneLabel3D position={[0, 1.35, 0]}>friction factor f</SceneLabel3D>
    </SceneShell>
  );
}

/** Minor loss at a 90° elbow. */
export function MinorLossScene() {
  const bend = polyPath([
    new THREE.Vector3(-1.6, 0, 0),
    new THREE.Vector3(-0.15, 0, 0),
    new THREE.Vector3(0.05, 0.05, 0.15),
    new THREE.Vector3(0.15, 0.12, 0.35),
    new THREE.Vector3(0.2, 0.18, 0.7),
    new THREE.Vector3(0.2, 0.22, 1.5),
  ]);
  const swirl = linePath(
    new THREE.Vector3(-0.1, 0, 0.05),
    new THREE.Vector3(0.15, 0.15, 0.55),
    0.1,
    2.5,
  );

  return (
    <SceneShell label="h_m = K V²/(2g)" camera={[3.8, 2.4, 3.6]}>
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
      {/* energy-loss swirl region */}
      <mesh position={[0.12, 0.08, 0.35]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial
          color="#e8a060"
          transparent
          opacity={0.28}
          emissive="#c07030"
          emissiveIntensity={0.25}
        />
      </mesh>
      <FlowParticles path={bend} speed={0.38} count={42} color={WATER} />
      <FlowParticles path={swirl} speed={0.55} count={18} color="#e8b070" size={0.04} seed={9} />
      <SceneLabel3D position={[0.3, 1.1, 0.4]}>h_m = K V²/(2g)</SceneLabel3D>
    </SceneShell>
  );
}

/** Hazen–Williams water-main T-junction. */
export function HazenScene() {
  const main = linePath(new THREE.Vector3(-1.9, 0, 0), new THREE.Vector3(1.9, 0, 0));
  const branch = linePath(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1.5));

  return (
    <SceneShell label="Hazen–Williams" camera={[4, 2.6, 4]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 3.8, 24]} />
        <meshStandardMaterial color={PIPE} metalness={0.22} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 1.5, 22]} />
        <meshStandardMaterial color="#2f7a82" metalness={0.22} roughness={0.5} />
      </mesh>
      {/* T fitting */}
      <mesh>
        <boxGeometry args={[0.7, 0.55, 0.55]} />
        <meshStandardMaterial color="#356870" metalness={0.3} roughness={0.4} />
      </mesh>
      <FlowParticles path={main} speed={0.4} count={40} color={WATER} seed={1} />
      <FlowParticles path={branch} speed={0.32} count={24} color="#7ad0e8" seed={4} />
      <SceneLabel3D position={[0, 0.95, 0]}>Hazen–Williams</SceneLabel3D>
    </SceneShell>
  );
}
