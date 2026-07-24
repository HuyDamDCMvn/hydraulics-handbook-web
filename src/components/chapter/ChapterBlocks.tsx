"use client";

import type { Example, NomenclatureRow } from "@/content/types";
import { Katex } from "./Katex";
import { useT } from "@/i18n/LocaleProvider";

export function NomenclatureTable({ rows }: { rows: NomenclatureRow[] }) {
  const t = useT();
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">{t.chapter.symbol}</th>
            <th scope="col">{t.chapter.meaning}</th>
            <th scope="col">{t.chapter.unit}</th>
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
  const t = useT();
  return (
    <article className="border-t border-line py-5">
      <h3 className="font-display text-xl text-ink">
        {t.chapter.example} {example.id}
      </h3>
      <p className="mt-2 text-ink">{example.prompt}</p>
      <dl className="mt-4 space-y-3 text-[0.98rem]">
        <div>
          <dt className="font-semibold text-ink-muted">{t.chapter.physicalModel}</dt>
          <dd>{example.physicalModel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">{t.chapter.governingEquation}</dt>
          <dd>
            <Katex latex={example.governingEquation} display className="block" />
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">{t.chapter.substitution}</dt>
          <dd>
            <Katex latex={example.substitution} display className="block" />
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">{t.chapter.result}</dt>
          <dd className="font-medium">{example.result}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink-muted">{t.chapter.interpretation}</dt>
          <dd>{example.interpretation}</dd>
        </div>
      </dl>
    </article>
  );
}
