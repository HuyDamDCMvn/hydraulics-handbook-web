"use client";

import { useEffect, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import type { Chapter } from "@/content/types";

function SchematicImg({ src, title }: { src: string; title: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={title} className="w-full border border-line bg-white/70" />
  );
}

function loading(src: string) {
  function SchematicLoading() {
    return <SchematicImg src={src} title="Loading 3D flow simulation…" />;
  }
  SchematicLoading.displayName = `SchematicLoading(${src})`;
  return SchematicLoading;
}

const DensityScene = dynamic(
  () => import("./scenes/staticsScenes").then((m) => m.DensityScene),
  { ssr: false, loading: loading("/schematics/ch-01.svg") },
);
const HydrostaticScene = dynamic(
  () => import("./scenes/staticsScenes").then((m) => m.HydrostaticScene),
  { ssr: false, loading: loading("/schematics/ch-02.svg") },
);
const ForcePlateScene = dynamic(
  () => import("./scenes/staticsScenes").then((m) => m.ForcePlateScene),
  { ssr: false, loading: loading("/schematics/ch-03.svg") },
);
const BuoyancyScene = dynamic(
  () => import("./scenes/staticsScenes").then((m) => m.BuoyancyScene),
  { ssr: false, loading: loading("/schematics/ch-04.svg") },
);
const ContinuityScene = dynamic(
  () => import("./scenes/flowScenes").then((m) => m.ContinuityScene),
  { ssr: false, loading: loading("/schematics/ch-05.svg") },
);
const BernoulliScene = dynamic(
  () => import("./scenes/flowScenes").then((m) => m.BernoulliScene),
  { ssr: false, loading: loading("/schematics/ch-06.svg") },
);
const TorricelliScene = dynamic(
  () => import("./scenes/flowScenes").then((m) => m.TorricelliScene),
  { ssr: false, loading: loading("/schematics/ch-07.svg") },
);
const ReynoldsScene = dynamic(
  () => import("./scenes/flowScenes").then((m) => m.ReynoldsScene),
  { ssr: false, loading: loading("/schematics/ch-08.svg") },
);
const DarcyScene = dynamic(
  () => import("./scenes/pipeScenes").then((m) => m.DarcyScene),
  { ssr: false, loading: loading("/schematics/ch-09.svg") },
);
const FrictionScene = dynamic(
  () => import("./scenes/pipeScenes").then((m) => m.FrictionScene),
  { ssr: false, loading: loading("/schematics/ch-10.svg") },
);
const MinorLossScene = dynamic(
  () => import("./scenes/pipeScenes").then((m) => m.MinorLossScene),
  { ssr: false, loading: loading("/schematics/ch-11.svg") },
);
const HazenScene = dynamic(
  () => import("./scenes/pipeScenes").then((m) => m.HazenScene),
  { ssr: false, loading: loading("/schematics/ch-12.svg") },
);
const MomentumBendScene = dynamic(
  () => import("./scenes/pumpScenes").then((m) => m.MomentumBendScene),
  { ssr: false, loading: loading("/schematics/ch-13.svg") },
);
const PumpScene = dynamic(
  () => import("./scenes/pumpScenes").then((m) => m.PumpScene),
  { ssr: false, loading: loading("/schematics/ch-14.svg") },
);
const AffinityScene = dynamic(
  () => import("./scenes/pumpScenes").then((m) => m.AffinityScene),
  { ssr: false, loading: loading("/schematics/ch-15.svg") },
);
const NpshScene = dynamic(
  () => import("./scenes/pumpScenes").then((m) => m.NpshScene),
  { ssr: false, loading: loading("/schematics/ch-16.svg") },
);
const ManningScene = dynamic(
  () => import("./scenes/channelScenes").then((m) => m.ManningScene),
  { ssr: false, loading: loading("/schematics/ch-17.svg") },
);
const ChannelGeomScene = dynamic(
  () => import("./scenes/channelScenes").then((m) => m.ChannelGeomScene),
  { ssr: false, loading: loading("/schematics/ch-18.svg") },
);
const FroudeScene = dynamic(
  () => import("./scenes/channelScenes").then((m) => m.FroudeScene),
  { ssr: false, loading: loading("/schematics/ch-19.svg") },
);
const JumpFlowScene = dynamic(
  () => import("./scenes/channelScenes").then((m) => m.JumpFlowScene),
  { ssr: false, loading: loading("/schematics/ch-20.svg") },
);
const WeirFlowScene = dynamic(
  () => import("./scenes/channelScenes").then((m) => m.WeirFlowScene),
  { ssr: false, loading: loading("/schematics/ch-21.svg") },
);
const DrawdownScene = dynamic(
  () => import("./scenes/unsteadyScenes").then((m) => m.DrawdownScene),
  { ssr: false, loading: loading("/schematics/ch-22.svg") },
);
const HammerScene = dynamic(
  () => import("./scenes/unsteadyScenes").then((m) => m.HammerScene),
  { ssr: false, loading: loading("/schematics/ch-23.svg") },
);
const SeepageScene = dynamic(
  () => import("./scenes/unsteadyScenes").then((m) => m.SeepageScene),
  { ssr: false, loading: loading("/schematics/ch-24.svg") },
);

const SCENE_BY_ID: Record<number, ComponentType> = {
  1: DensityScene,
  2: HydrostaticScene,
  3: ForcePlateScene,
  4: BuoyancyScene,
  5: ContinuityScene,
  6: BernoulliScene,
  7: TorricelliScene,
  8: ReynoldsScene,
  9: DarcyScene,
  10: FrictionScene,
  11: MinorLossScene,
  12: HazenScene,
  13: MomentumBendScene,
  14: PumpScene,
  15: AffinityScene,
  16: NpshScene,
  17: ManningScene,
  18: ChannelGeomScene,
  19: FroudeScene,
  20: JumpFlowScene,
  21: WeirFlowScene,
  22: DrawdownScene,
  23: HammerScene,
  24: SeepageScene,
};

export function SchematicMedia({ chapter }: { chapter: Chapter }) {
  const [reduced, setReduced] = useState(false);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }

    return () => mq.removeEventListener("change", onChange);
  }, []);

  const Scene = SCENE_BY_ID[chapter.id];

  if (!reduced && webglOk && Scene) {
    return (
      <div>
        <Scene />
        <p className="mt-2 text-xs text-ink-muted">
          Interactive 3D flow schematic — drag to orbit. Reflects the governing physics of this
          chapter (not a CFD solution).
        </p>
      </div>
    );
  }

  return <SchematicImg src={chapter.schematic.src} title={chapter.schematic.caption} />;
}
