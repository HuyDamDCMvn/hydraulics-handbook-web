"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

/** Shared light academic palette for all formula schematics */
export const LIGHT_BG = "#f4f1ea";
export const LIGHT_FLOOR = "#e5dfd2";
export const PIPE_LIGHT = "#7a8a96";
export const WATER_LIGHT = "#4eb3d0";
export const ACCENT_TEAL = "#0d6e6e";

type Props = {
  children: ReactNode;
  camera?: [number, number, number];
  bg?: string;
  label?: string;
};

export function SceneShell({
  children,
  camera = [4.2, 2.8, 4.2],
  bg = LIGHT_BG,
  label,
}: Props) {
  return (
    <div className="relative h-80 w-full border border-line" style={{ background: bg }}>
      <Canvas camera={{ position: camera, fov: 42 }} dpr={[1, 1.75]}>
        <color attach="background" args={[bg]} />
        <ambientLight intensity={1.05} />
        <directionalLight position={[5, 8, 4]} intensity={1.25} castShadow />
        <directionalLight position={[-4, 3, -2]} intensity={0.35} />
        <hemisphereLight args={["#ffffff", "#d8d0c0", 0.65]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
          <circleGeometry args={[6, 48]} />
          <meshStandardMaterial color={LIGHT_FLOOR} roughness={0.95} metalness={0} />
        </mesh>
        <Suspense fallback={null}>{children}</Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={10}
          maxPolarAngle={Math.PI * 0.49}
        />
      </Canvas>
      {label ? (
        <p className="pointer-events-none absolute bottom-2 left-3 right-3 text-xs text-ink-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}

/** HTML overlay label — dark ink on light translucent chip */
export function SceneLabel3D({
  children,
  position,
}: {
  children: string;
  position: [number, number, number];
  color?: string;
}) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }}>
      <div
        style={{
          color: "#1a2330",
          fontSize: 12,
          fontFamily: "Georgia, serif",
          whiteSpace: "nowrap",
          background: "rgba(255,255,255,0.82)",
          border: "1px solid #c9c0b0",
          padding: "3px 9px",
          borderRadius: 4,
          boxShadow: "0 1px 4px rgba(26,35,48,0.12)",
        }}
      >
        {children}
      </div>
    </Html>
  );
}
