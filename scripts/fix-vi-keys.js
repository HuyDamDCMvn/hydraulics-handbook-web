const fs = require("fs");

const files = [
  "src/content/chapters/vi/part1.ts",
  "src/content/chapters/vi/part2.ts",
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  // Quote any object key that contains non-ASCII (unicode letters/subscripts)
  s = s.replace(
    /([{,]\s*)([A-Za-z0-9_]*[^\x00-\x7F][A-Za-z0-9_\u0080-\uFFFF]*)\s*:/gu,
    (m, pre, key) => {
      if (key.startsWith('"') || key.startsWith("'")) return m;
      return `${pre}${JSON.stringify(key)}:`;
    },
  );
  fs.writeFileSync(f, s);
  console.log("fixed", f);
}
