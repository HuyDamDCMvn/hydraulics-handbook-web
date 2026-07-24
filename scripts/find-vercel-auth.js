const path = require("path");
const fs = require("fs");
const os = require("os");

const candidates = [
  path.join(os.homedir(), ".config", "vercel", "auth.json"),
  path.join(os.homedir(), "AppData", "Roaming", "vercel", "auth.json"),
  path.join(os.homedir(), "AppData", "Local", "vercel", "auth.json"),
  path.join(process.env.LOCALAPPDATA || "", "vercel", "auth.json"),
  path.join(process.env.APPDATA || "", "vercel", "auth.json"),
  path.join(process.env.LOCALAPPDATA || "", "com.vercel.cli", "auth.json"),
  path.join(process.env.LOCALAPPDATA || "", "com.vercel.cli", "config.json"),
];

for (const c of candidates) {
  console.log(fs.existsSync(c) ? "EXISTS" : "missing", c);
}

// try require vercel auth helpers from npx cache
const npxRoot = path.join(process.env.LOCALAPPDATA || "", "npm-cache", "_npx");
function walk(dir, depth = 0) {
  if (depth > 5 || !fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    let st;
    try {
      st = fs.statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (name === "vercel" || name.includes("get-auth") || name === "files") {
        if (name === "files" && p.includes("vercel")) console.log("dir", p);
      }
      if (depth < 4) walk(p, depth + 1);
    } else if (/auth\.json$|config\.json$/.test(name) && p.toLowerCase().includes("vercel")) {
      console.log("file", p);
    }
  }
}
walk(npxRoot);
