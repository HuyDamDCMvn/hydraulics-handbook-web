"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type FlowPath = {
  /** Sample a point on the path for u in [0,1] */
  at: (u: number) => THREE.Vector3;
  /** Optional speed multiplier along the path */
  speedAt?: (u: number) => number;
};

type Props = {
  count?: number;
  path: FlowPath;
  color?: string;
  size?: number;
  speed?: number;
  seed?: number;
};

function hash(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Animated particles following a parametric path — models advective flow. */
export function FlowParticles({
  count = 48,
  path,
  color = "#3aa6c8",
  size = 0.06,
  speed = 0.35,
  seed = 1,
}: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(
    () => Float32Array.from({ length: count }, (_, i) => hash(i, seed)),
    [count, seed],
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const clamped = Math.min(dt, 0.05);
    for (let i = 0; i < count; i++) {
      phases[i] = (phases[i] + clamped * speed * (path.speedAt?.(phases[i]) ?? 1)) % 1;
      const p = path.at(phases[i]);
      dummy.position.copy(p);
      const s = size * (0.7 + 0.6 * hash(i, seed + 2));
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
        roughness={0.3}
        metalness={0.05}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

/** Straight pipe centerline from A to B with optional radius offset for swirl. */
export function linePath(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius = 0,
  turns = 0,
): FlowPath {
  const dir = b.clone().sub(a);
  const len = dir.length();
  dir.normalize();
  const up = Math.abs(dir.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const n1 = new THREE.Vector3().crossVectors(dir, up).normalize();
  const n2 = new THREE.Vector3().crossVectors(dir, n1).normalize();
  return {
    at: (u) => {
      const p = a.clone().addScaledVector(dir, u * len);
      if (radius > 0) {
        const ang = u * turns * Math.PI * 2;
        p.addScaledVector(n1, Math.cos(ang) * radius);
        p.addScaledVector(n2, Math.sin(ang) * radius);
      }
      return p;
    },
  };
}

/** Bezier / polyline path through control points (piecewise linear). */
export function polyPath(points: THREE.Vector3[]): FlowPath {
  const segs: { a: THREE.Vector3; b: THREE.Vector3; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const len = points[i].distanceTo(points[i + 1]);
    segs.push({ a: points[i], b: points[i + 1], len });
    total += len;
  }
  return {
    at: (u) => {
      let d = u * total;
      for (const s of segs) {
        if (d <= s.len) {
          const t = s.len === 0 ? 0 : d / s.len;
          return s.a.clone().lerp(s.b, t);
        }
        d -= s.len;
      }
      return points[points.length - 1].clone();
    },
    speedAt: () => 1,
  };
}

/** Constriction: speed higher in the middle (continuity). */
export function constrictionSpeed(u: number, factor = 2.2): number {
  const mid = 1 - Math.abs(u - 0.5) * 2;
  return 1 + (factor - 1) * mid * mid;
}
