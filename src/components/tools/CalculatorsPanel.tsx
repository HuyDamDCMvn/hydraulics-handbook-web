"use client";

import { useMemo, useState } from "react";

type CalcId = "pressure" | "hydrostatic" | "darcy" | "pump" | "reynolds" | "hammer";

const G = 9.81;
const RHO_WATER = 1000;

function roundEng(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1000 || (Math.abs(n) > 0 && Math.abs(n) < 0.01)) {
    return n.toExponential(3);
  }
  return String(Number(n.toPrecision(digits)));
}

export function CalculatorsPanel() {
  const [tab, setTab] = useState<CalcId>("pressure");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["pressure", "Density / pressure"],
            ["hydrostatic", "Hydrostatic head"],
            ["reynolds", "Reynolds"],
            ["darcy", "Darcy–Weisbach"],
            ["pump", "Pump power"],
            ["hammer", "Joukowsky"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded border px-3 py-1.5 text-sm ${
              tab === id
                ? "border-accent bg-accent-soft text-accent"
                : "border-line bg-white/60 text-ink-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 border border-line bg-white/55 p-4 md:p-6">
        {tab === "pressure" && <PressureCalc />}
        {tab === "hydrostatic" && <HydroCalc />}
        {tab === "reynolds" && <ReynoldsCalc />}
        {tab === "darcy" && <DarcyCalc />}
        {tab === "pump" && <PumpCalc />}
        {tab === "hammer" && <HammerCalc />}
        <p className="mt-6 text-xs text-ink-muted">
          SI units only. Learning aid — not a substitute for standards or engineering review.
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
  return (
    <p className="mt-4 rounded bg-accent-soft px-3 py-3 text-sm">
      <span className="text-ink-muted">{label}: </span>
      <strong className="font-mono text-accent">{value}</strong>
    </p>
  );
}

function PressureCalc() {
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
      <Field label="Mass m" unit="kg" value={m} onChange={setM} />
      <Field label="Volume V" unit="m³" value={V} onChange={setV} />
      <Field label="Force F" unit="N" value={F} onChange={setF} />
      <Field label="Area A" unit="m²" value={A} onChange={setA} />
      <div className="md:col-span-2">
        <Result label="ρ = m/V" value={`${roundEng(out.rho)} kg/m³`} />
        <Result label="γ = ρg" value={`${roundEng(out.gamma)} N/m³`} />
        <Result label="p = F/A" value={`${roundEng(out.p / 1000)} kPa`} />
      </div>
    </div>
  );
}

function HydroCalc() {
  const [h, setH] = useState("6");
  const [p, setP] = useState("245000");
  const out = useMemo(() => {
    const pGauge = RHO_WATER * G * Number(h);
    const head = Number(p) / (RHO_WATER * G);
    return { pGauge, head };
  }, [h, p]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label="Depth h" unit="m" value={h} onChange={setH} />
      <Field label="Pressure p" unit="Pa" value={p} onChange={setP} />
      <div className="md:col-span-2">
        <Result label="p = ρgh (gauge)" value={`${roundEng(out.pGauge / 1000)} kPa`} />
        <Result label="h_p = p/γ" value={`${roundEng(out.head)} m`} />
      </div>
    </div>
  );
}

function ReynoldsCalc() {
  const [V, setV] = useState("1.5");
  const [D, setD] = useState("0.2");
  const [nu, setNu] = useState("1e-6");
  const Re = useMemo(
    () => (Number(V) * Number(D)) / Number(nu),
    [V, D, nu],
  );
  const regime = Re < 2300 ? "laminar (typical)" : Re > 4000 ? "turbulent (typical)" : "transitional";
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Field label="Velocity V" unit="m/s" value={V} onChange={setV} />
      <Field label="Diameter D" unit="m" value={D} onChange={setD} />
      <Field label="Kinematic viscosity ν" unit="m²/s" value={nu} onChange={setNu} />
      <div className="md:col-span-3">
        <Result label="Re = VD/ν" value={`${roundEng(Re)} · ${regime}`} />
      </div>
    </div>
  );
}

function DarcyCalc() {
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
      <Field label="Friction factor f" unit="—" value={f} onChange={setF} />
      <Field label="Length L" unit="m" value={L} onChange={setL} />
      <Field label="Diameter D" unit="m" value={D} onChange={setD} />
      <Field label="Velocity V" unit="m/s" value={V} onChange={setV} />
      <div className="md:col-span-2">
        <Result label="h_f = f(L/D)V²/(2g)" value={`${roundEng(hf)} m`} />
      </div>
    </div>
  );
}

function PumpCalc() {
  const [Q, setQ] = useState("0.05");
  const [H, setH] = useState("30");
  const [eta, setEta] = useState("0.75");
  const P = useMemo(
    () => (RHO_WATER * G * Number(Q) * Number(H)) / Number(eta),
    [Q, H, eta],
  );
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Field label="Discharge Q" unit="m³/s" value={Q} onChange={setQ} />
      <Field label="Head H" unit="m" value={H} onChange={setH} />
      <Field label="Efficiency η" unit="—" value={eta} onChange={setEta} />
      <div className="md:col-span-3">
        <Result label="P = ρgQH/η" value={`${roundEng(P / 1000)} kW`} />
      </div>
    </div>
  );
}

function HammerCalc() {
  const [c, setC] = useState("1000");
  const [dV, setDV] = useState("1.2");
  const dp = useMemo(() => RHO_WATER * Number(c) * Number(dV), [c, dV]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field label="Wave speed c" unit="m/s" value={c} onChange={setC} />
      <Field label="Velocity change ΔV" unit="m/s" value={dV} onChange={setDV} />
      <div className="md:col-span-2">
        <Result label="Δp = ρ c ΔV" value={`${roundEng(dp / 1e6)} MPa`} />
      </div>
    </div>
  );
}
