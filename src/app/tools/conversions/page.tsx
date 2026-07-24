"use client";

import { useT } from "@/i18n/LocaleProvider";

export default function ConversionsPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">{t.conversions.title}</h1>
      <div className="table-wrap mt-6">
        <table>
          <thead>
            <tr>
              <th>{t.conversions.quantity}</th>
              <th>{t.conversions.conversion}</th>
            </tr>
          </thead>
          <tbody>
            {t.conversions.rows.map(([q, c]) => (
              <tr key={q}>
                <td className="font-medium">{q}</td>
                <td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
