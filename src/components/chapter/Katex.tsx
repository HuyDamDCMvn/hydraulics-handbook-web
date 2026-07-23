import { renderKatex } from "@/lib/math";

type Props = {
  latex: string;
  display?: boolean;
  className?: string;
};

export function Katex({ latex, display = false, className }: Props) {
  const html = renderKatex(latex, display);
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
