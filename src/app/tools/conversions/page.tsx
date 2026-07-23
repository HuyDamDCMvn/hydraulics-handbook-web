export const metadata = { title: "Quick conversions" };

const rows = [
  ["1 m³/s", "1,000 L/s = 3,600 m³/h"],
  ["1 L/s", "3.6 m³/h"],
  ["1 bar", "100 kPa"],
  ["1 mH₂O", "≈ 9.81 kPa ≈ 0.0981 bar"],
  ["1 MPa", "≈ 101.97 mH₂O"],
  ["Engineering water", "ρ ≈ 1,000 kg/m³; γ ≈ 9,810 N/m³"],
];

export default function ConversionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">Appendix A. Quick conversions</h1>
      <div className="table-wrap mt-6">
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([q, c]) => (
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
