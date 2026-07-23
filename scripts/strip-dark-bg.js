const fs = require("fs");

const files = [
  "src/components/media/scenes/channelScenes.tsx",
  "src/components/media/scenes/unsteadyScenes.tsx",
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/\s+bg="#[0-9a-fA-F]{3,8}"/g, "");
  fs.writeFileSync(f, s);
  console.log("stripped bg from", f);
}
