import katex from "katex";

export function renderKatex(latex: string, displayMode = false): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode,
      strict: "ignore",
    });
  } catch {
    return latex;
  }
}
