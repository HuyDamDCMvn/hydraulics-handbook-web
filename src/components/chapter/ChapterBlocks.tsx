import type { Example, NomenclatureRow } from "@/content/types";
import { Katex } from "./Katex";

export function NomenclatureTable({ rows }: { rows: NomenclatureRow[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Meaning</th>
            <th scope="col">Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.symbol}-${row.meaning}`}>
              <td>
                <Katex latex={row.symbol} />
              </td>
              <td>{row.meaning}</td>
              <td className="font-mono text-sm">{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WorkedExample({ example }: { example: Example }) {
  return (
    <article className="border-t border-line py-5">
      <h3 className="font-display text-xl text-ink">
        Example {example.id}
      </h3>
      <p className="mt-2 text-ink">{example.prompt}</p>
      <dl className="mt-4 space-y-3 text-[0.98rem]">
        <div>
          <dt className="font-semibold text-ink-muted">Physical model</dt>
          <dd>{example.physicalModel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">Governing equation</dt>
          <dd>
            <Katex latex={example.governingEquation} display className="block" />
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">Substitution</dt>
          <dd>
            <Katex latex={example.substitution} display className="block" />
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">Result</dt>
          <dd className="font-medium">{example.result}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">Interpretation</dt>
          <dd>{example.interpretation}</dd>
        </div>
      </dl>
    </article>
  );
}
