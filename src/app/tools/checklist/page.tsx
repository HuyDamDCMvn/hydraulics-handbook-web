export const metadata = { title: "Problem-solving checklist" };

const steps = [
  "Sketch the system and identify the sections or points of interest.",
  "State the assumptions: steady or unsteady, full pipe or open channel, gauge or absolute pressure.",
  "Convert every input to one consistent unit system.",
  "Select a formula whose assumptions match the physical situation and identify empirical coefficients.",
  "Substitute values with units; check dimensions and order of magnitude.",
  "Check velocity, pressure, cavitation, stability, and applicable design limits.",
];

export default function ChecklistPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">Appendix B. Problem-solving checklist</h1>
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-ink">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
