import { CalculatorsPanel } from "@/components/tools/CalculatorsPanel";

export const metadata = { title: "Calculators" };

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">SI calculators</h1>
      <p className="mt-2 text-ink-muted">
        Quick checks aligned with handbook governing equations. Confirm assumptions before using
        results.
      </p>
      <div className="mt-8">
        <CalculatorsPanel />
      </div>
    </div>
  );
}
