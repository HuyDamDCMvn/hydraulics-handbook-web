const fs = require("fs");
const path = require("path");

for (const f of ["part1.ts", "part2.ts"]) {
  const p = path.join("src/content/chapters", f);
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/type: "svg"/g, 'type: "r3f"');
  fs.writeFileSync(p, s);
  console.log("updated", f);
}
