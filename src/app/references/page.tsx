export const metadata = { title: "References" };

const refs = [
  "White, F. M., and Xue, H. Fluid Mechanics, 9th ed. McGraw Hill, ISBN 978-1-260-25831-8.",
  "Çengel, Y. A., and Cimbala, J. M. Fluid Mechanics: Fundamentals and Applications, 4th ed., 2024 release. McGraw Hill.",
  "Gerhart, A. L., Hochstein, J. I., and Gerhart, P. M. Munson, Young and Okiishi's Fundamentals of Fluid Mechanics, 9th ed. Wiley, 2020, ISBN 978-1-119-68945-4.",
  "Chow, V. T. Open-Channel Hydraulics. McGraw-Hill, 1959.",
  "Idelchik, I. E. Handbook of Hydraulic Resistance, 3rd ed. CRC Press, 1994.",
];

export default function ReferencesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">References</h1>
      <ol className="mt-6 list-decimal space-y-4 pl-5 text-ink">
        {refs.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-ink-muted">
        Equations and examples in this handbook are synthesized for instruction from standard
        fluid-mechanics relationships. Empirical coefficients must be selected from the governing
        standard, manufacturer data, or validated project-specific sources.
      </p>
    </div>
  );
}
