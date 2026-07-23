const fs = require("fs");
const path = require("path");

for (const file of ["part1.ts", "part2.ts"]) {
  const p = path.join("src/content/chapters", file);
  let s = fs.readFileSync(p, "utf8");

  // Fix example ids like id: "ch1-ex1" -> we'll do chapter by chapter via regex on blocks
  // Better approach: parse chapter id and renumber equations/examples in order

  const chapters = [];
  const chapterRegex = /\{\s*id:\s*(\d+),[\s\S]*?(?=\n  \{\s*id:\s*\d+,|\n\];\s*$)/g;
  // Simpler line-based rewrite

  let chapterId = null;
  let eqIndex = 0;
  let exIndex = 0;
  const lines = s.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const idMatch = line.match(/^\s*id:\s*(\d+),$/);
    if (idMatch && lines[i + 1]?.includes("slug:")) {
      chapterId = Number(idMatch[1]);
      eqIndex = 0;
      exIndex = 0;
      out.push(line);
      continue;
    }

    // equation id inside equations arrays: id: "something" followed soon by latex
    if (
      chapterId &&
      /^\s*id:\s*"/.test(line) &&
      lines.slice(i, i + 4).some((l) => l.includes("latex:"))
    ) {
      eqIndex += 1;
      line = line.replace(/id:\s*"[^"]+"/, `id: "${chapterId}.${eqIndex}"`);
    }

    // example id: followed by prompt
    if (
      chapterId &&
      /^\s*id:\s*"/.test(line) &&
      lines.slice(i, i + 4).some((l) => l.includes("prompt:"))
    ) {
      exIndex += 1;
      line = line.replace(/id:\s*"[^"]+"/, `id: "${chapterId}.${exIndex}"`);
    }

    // nomenclature unicode -> keep but wrap common ones; skip for now

    // schematic paths ch-1.svg vs ch-01.svg
    line = line.replace(/src: "\/schematics\/ch-(\d)\.svg"/, (_, d) => {
      return `src: "/schematics/ch-${d.padStart(2, "0")}.svg"`;
    });

    out.push(line);
  }

  fs.writeFileSync(p, out.join("\n"));
  console.log("normalized", file);
}
