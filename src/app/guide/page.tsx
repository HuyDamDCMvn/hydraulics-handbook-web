export const metadata = { title: "How to use" };

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose-measure">
      <h1 className="font-display text-4xl text-ink">How to use this handbook</h1>
      <div className="callout-note mt-6">
        <strong>Recommended sequence:</strong> Read “When to use”, confirm the assumptions,
        identify known and unknown quantities, and only then substitute values. Convert all inputs
        to consistent SI units first.
      </div>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-ink">
        <li>Pressure: Pa or kPa; head: metres of the stated fluid.</li>
        <li>Discharge: m³/s; velocity: m/s; diameter and length: m.</li>
        <li>
          Use empirical coefficients only with the definition and test conditions that produced
          them.
        </li>
        <li>Worked results are rounded appropriately; small differences may arise from rounding.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl">Notation and conventions</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink">
        <li>All calculations use SI units unless explicitly stated otherwise.</li>
        <li>
          Gauge and absolute pressures are identified explicitly; they must not be mixed in one
          energy or cavitation calculation.
        </li>
        <li>
          Vector quantities are indicated by an arrow accent; section-average scalar quantities are
          typeset in italic mathematical notation.
        </li>
        <li>
          Equation numbers follow the form (chapter.equation). Figures and tables are numbered by
          chapter.
        </li>
        <li>
          Numerical answers are rounded to a practical engineering precision after calculation, not
          during intermediate steps.
        </li>
      </ul>
    </div>
  );
}
