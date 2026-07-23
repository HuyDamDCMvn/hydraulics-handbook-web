export type ThemeId =
  | "statics"
  | "flow"
  | "pipe"
  | "momentum"
  | "channel"
  | "unsteady";

export type Equation = {
  id: string;
  latex: string;
  label: string;
};

export type NomenclatureRow = {
  symbol: string;
  meaning: string;
  unit: string;
};

export type Example = {
  id: string;
  prompt: string;
  physicalModel: string;
  governingEquation: string;
  substitution: string;
  result: string;
  interpretation: string;
};

export type Chapter = {
  id: number;
  slug: string;
  title: string;
  theme: ThemeId;
  equations: Equation[];
  scope: string;
  assumptions: string;
  nomenclature: NomenclatureRow[];
  schematic: {
    type: "svg" | "r3f";
    src: string;
    caption: string;
  };
  engineeringNote: string;
  examples: Example[];
};

export const THEME_LABELS: Record<ThemeId, string> = {
  statics: "Fluid properties & statics",
  flow: "Flow fundamentals",
  pipe: "Pipe losses",
  momentum: "Momentum & pumps",
  channel: "Open channel",
  unsteady: "Unsteady / seepage",
};
