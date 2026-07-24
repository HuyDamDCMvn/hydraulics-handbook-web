const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "vercel-debug.log");
const out = fs.createWriteStream(logPath);
const child = spawn(
  "npx",
  ["vercel", "--debug", "project", "inspect", "dig_training"],
  {
    cwd: "F:/02.Study/TechTraining/_digtraining_push/hydraulics-handbook-web",
    shell: true,
    env: process.env,
  },
);

child.stdout.pipe(out);
child.stderr.pipe(out);
child.on("close", () => {
  const text = fs.readFileSync(logPath, "utf8");
  const lines = text.split(/\r?\n/).filter((l) =>
    /authorization|bearer |access.?token|token"|x-vercel|cookie/i.test(l),
  );
  console.log("matches", lines.length);
  lines.slice(0, 40).forEach((l) => {
    // redact long tokens in console but keep prefix for debugging
    console.log(l.replace(/(Bearer\s+)[A-Za-z0-9._\-]+/gi, "$1***REDACTED***"));
  });
});
