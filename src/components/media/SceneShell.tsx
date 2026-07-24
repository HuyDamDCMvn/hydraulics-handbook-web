"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useT } from "@/i18n/LocaleProvider";

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
  const t = useT();
  const [reduceMotion, setReduceMotion] = useState(true);
  // Selective R3F per chapter (e.g. Ch.13/20/21) is a future product decision —
  // this shell pauses off-screen scenes without removing 3D from all chapters.
  // Assume on-screen until IO says otherwise — avoids first-frame freeze on sticky schematics
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({
    initialInView: true,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[22rem] w-full overflow-hidden border border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] xl:h-[26rem]"
      style={{ background: bg }}
    >
      <Canvas
        camera={{ position: camera, fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={inView ? "always" : "demand"}
      >
        <color attach="background" args={[bg]} />
        <ambientLight intensity={1.12} />
        <directionalLight position={[5, 8, 4]} intensity={1.35} castShadow />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} />
        <hemisphereLight args={["#ffffff", "#d8d0c0", 0.7]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
          <circleGeometry args={[6, 48]} />
          <meshStandardMaterial color={LIGHT_FLOOR} roughness={0.92} metalness={0} />
        </mesh>
        <Suspense fallback={null}>{children}</Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={10}
          maxPolarAngle={Math.PI * 0.49}
          autoRotate={!reduceMotion}
          autoRotateSpeed={0.35}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--paper)_55%,transparent)] to-transparent" />
      {label ? (
        <p className="pointer-events-none absolute bottom-2 left-3 right-3 rounded bg-[color-mix(in_srgb,white_78%,transparent)] px-2 py-1 text-xs text-ink-muted backdrop-blur-[2px]">
          {label} · {t.schematic.dragOrbit}
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
