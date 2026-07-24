"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

type CalcId = "pressure" | "hydrostatic" | "darcy" | "pump" | "reynolds" | "hammer";

const G = 9.81;
const RHO_WATER = 1000;

const SUPER: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
};

function toSuper(exp: number): string {
  return String(exp)
    .split("")
    .map((ch) => SUPER[ch] ?? ch)
    .join("");
}

/** Engineering display: 1000, 9.81×10³ — avoid raw 1.000e+3 */
function roundEng(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e5 || abs < 0.01)) {
    const exp = Math.floor(Math.log10(abs));
    const mant = n / 10 ** exp;
    return `${Number(mant.toPrecision(3))}×10${toSuper(exp)}`;
  }
  if (abs >= 100) return String(Number(n.toFixed(abs >= 1000 ? 0 : 2)));
  return String(Number(n.toPrecision(digits)));
}

export function CalculatorsPanel() {
  const [tab, setTab] = useState<CalcId>("pressure");
  const t = useT();

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["pressure", t.calculators.tabs.pressure],
            ["hydrostatic", t.calculators.tabs.hydrostatic],
            ["reynolds", t.calculators.tabs.reynolds],
            ["darcy", t.calculators.tabs.darcy],
            ["pump", t.calculators.tabs.pump],
            ["hammer", t.calculators.tabs.hammer],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded border px-3 py-1.5 text-sm transition-colors ${
              tab === id
                ? "border-accent bg-accent-soft text-accent"
                : "border-line bg-white/60 text-ink-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 border border-line bg-white/55 p-4 md:grid md:grid-cols-[1fr_auto] md:gap-8 md:p-6">
        <div key={tab} className="calc-panel-enter">
          {tab === "pressure" && <PressureCalc />}
          {tab === "hydrostatic" && <HydroCalc />}
          {tab === "reynolds" && <ReynoldsCalc />}
          {tab === "darcy" && <DarcyCalc />}
          {tab === "pump" && <PumpCalc />}
          {tab === "hammer" && <HammerCalc />}
        </div>
        <p className="mt-6 text-xs text-ink-muted md:mt-0 md:max-w-[14rem] md:border-l md:border-line md:pl-6">
          {t.calculators.disclaimer}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-ink-muted">
        {label} <span className="font-mono">[{unit}]</span>
      </span>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-line bg-white px-3 py-2"
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current === value) return;
    prevValue.current = value;
    const el = ref.current;
    if (!el) return;
    el.classList.remove("result-flash");
    void el.offsetWidth;
    el.classList.add("result-flash");
    const timer = window.setTimeout(() => el.classList.remove("result-flash"), 160);
    return () => window.clearTimeout(timer);
  }, [value]);

  return (
    <p ref={ref} className="mt-4 rounded bg-accent-soft px-3 py-3 text-sm">
      <span className="text-ink-muted">{label}: </span>
      <strong className="font-mono text-accent">{value}</strong>
    </p>
  );
}

function PressureCalc() {
  const t = useT();
  const [m, setM] = useState("2500");
  const [V, setV] = useState("2.5");
  const [F, setF] = useState("12000");
  const [A, setA] = useState("0.015");
  const out = useMemo(() => {
    const rho = Number(m) / Number(V);
    const gamma = rho * G;
    const p = Number(F) / Number(A);
    return { rho, gamma, p };
  }, [m, V, F, A]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={t.calculators.fields.mass} unit="kg" value={m} onChange={setM} />
      <Field label={t.calculators.fields.volume} unit="m³" value={V} onChange={setV} />
      <Field label={t.calculators.fields.force} unit="N" value={F} onChange={setF} />
      <Field label={t.calculators.fields.area} unit="m²" value={A} onChange={setA} />
      <div className="md:col-span-2">
        <Result label="ρ = m/V" value={`${roundEng(out.rho)} kg/m³`} />
        <Result label="γ = ρg" value={`${roundEng(out.gamma)} N/m³`} />
        <Result label="p = F/A" value={`${roundEng(out.p / 1000)} kPa`} />
      </div>
    </div>
  );
}

function HydroCalc() {
  const t = useT();
  const [h, setH] = useState("6");
  const [p, setP] = useState("245000");
  const out = useMemo(() => {
    const pGauge = RHO_WATER * G * Number(h);
    const head = Number(p) / (RHO_WATER * G);
    return { pGauge, head };
  }, [h, p]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={t.calculators.fields.depth} unit="m" value={h} onChange={setH} />
      <Field label={t.calculators.fields.pressure} unit="Pa" value={p} onChange={setP} />
      <div className="md:col-span-2">
        <Result label="p = ρgh (gauge)" value={`${roundEng(out.pGauge / 1000)} kPa`} />
        <Result label="h_p = p/γ" value={`${roundEng(out.head)} m`} />
      </div>
    </div>
  );
}

function ReynoldsCalc() {
  const t = useT();
  const [V, setV] = useState("1.5");
  const [D, setD] = useState("0.2");
  const [nu, setNu] = useState("1e-6");
  const Re = useMemo(
    () => (Number(V) * Number(D)) / Number(nu),
    [V, D, nu],
  );
  const regime = Re < 2300 ? "laminar" : Re > 4000 ? "turbulent" : "transitional";
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Field label={t.calculators.fields.velocity} unit="m/s" value={V} onChange={setV} />
      <Field label={t.calculators.fields.diameter} unit="m" value={D} onChange={setD} />
      <Field label={t.calculators.fields.viscosity} unit="m²/s" value={nu} onChange={setNu} />
      <div className="md:col-span-3">
        <Result label="Re = VD/ν" value={`${roundEng(Re)} · ${regime}`} />
      </div>
    </div>
  );
}

function DarcyCalc() {
  const t = useT();
  const [f, setF] = useState("0.02");
  const [L, setL] = useState("100");
  const [D, setD] = useState("0.2");
  const [V, setV] = useState("1.5");
  const hf = useMemo(
    () => (Number(f) * (Number(L) / Number(D)) * (Number(V) ** 2)) / (2 * G),
    [f, L, D, V],
  );
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={t.calculators.fields.friction} unit="—" value={f} onChange={setF} />
      <Field label={t.calculators.fields.length} unit="m" value={L} onChange={setL} />
      <Field label={t.calculators.fields.diameter} unit="m" value={D} onChange={setD} />
      <Field label={t.calculators.fields.velocity} unit="m/s" value={V} onChange={setV} />
      <div className="md:col-span-2">
        <Result label="h_f = f(L/D)V²/(2g)" value={`${roundEng(hf)} m`} />
      </div>
    </div>
  );
}

function PumpCalc() {
  const t = useT();
  const [Q, setQ] = useState("0.05");
  const [H, setH] = useState("30");
  const [eta, setEta] = useState("0.75");
  const P = useMemo(
    () => (RHO_WATER * G * Number(Q) * Number(H)) / Number(eta),
    [Q, H, eta],
  );
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Field label={t.calculators.fields.discharge} unit="m³/s" value={Q} onChange={setQ} />
      <Field label={t.calculators.fields.head} unit="m" value={H} onChange={setH} />
      <Field label={t.calculators.fields.efficiency} unit="—" value={eta} onChange={setEta} />
      <div className="md:col-span-3">
        <Result label="P = ρgQH/η" value={`${roundEng(P / 1000)} kW`} />
      </div>
    </div>
  );
}

function HammerCalc() {
  const t = useT();
  const [c, setC] = useState("1000");
  const [dV, setDV] = useState("1.2");
  const dp = useMemo(() => RHO_WATER * Number(c) * Number(dV), [c, dV]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label={t.calculators.fields.wavespeed} unit="m/s" value={c} onChange={setC} />
      <Field label={t.calculators.fields.deltaV} unit="m/s" value={dV} onChange={setDV} />
      <div className="md:col-span-2">
        <Result label="Δp = ρ c ΔV" value={`${roundEng(dp / 1e6)} MPa`} />
      </div>
    </div>
  );
}
