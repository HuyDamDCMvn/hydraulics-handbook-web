import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const out = [];

await p.goto("https://hydraulics-handbook-web.vercel.app/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await p.waitForTimeout(2000);
const h1 = p.locator("h1").first();
const h1Box = await h1.boundingBox();
const h1Opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
out.push({
  page: "/",
  h1: (await h1.textContent())?.trim(),
  h1Opacity,
  h1Visible: !!h1Box && h1Box.height > 20,
  cta: await p.getByRole("link", { name: /Start chapters/i }).count(),
});

await p.goto("https://hydraulics-handbook-web.vercel.app/chapters", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await p.waitForTimeout(1000);
const showing = await p
  .locator("text=/Showing \\d+ of 24/")
  .first()
  .textContent()
  .catch(() => "");
const search = p.getByPlaceholder(/Search|Darcy/i).first();
await search.fill("Darcy");
await p.waitForTimeout(500);
const afterDarcy = await p
  .locator("text=/Showing \\d+ of 24/")
  .first()
  .textContent()
  .catch(() => "");
const listCount = await p.locator('a[href*="/chapters/"]').count();
out.push({ page: "/chapters", showing, afterDarcy, listCount });

for (const id of [1, 5, 9, 14, 24]) {
  await p.goto(`https://hydraulics-handbook-web.vercel.app/chapters/${id}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await p.waitForTimeout(800);
  const t = await p.locator("body").innerText();
  out.push({
    id,
    equations: /Governing equations/i.test(t),
    scope: /Scope of application/i.test(t),
    assumptions: /Assumptions/i.test(t),
    nomenclature: /Nomenclature/i.test(t),
    schematic: /Formula concept diagram|Interactive 3D/i.test(t),
    note: /Engineering note/i.test(t),
    examples: (t.match(/Example \d+\.\d+/g) || []).length,
    katex: await p.locator(".katex").count(),
    eqAnchor: await p.locator('a[href^="#eq-"]').count(),
  });
}

for (const id of [1, 2, 5, 8, 13, 16, 20, 21, 23, 24]) {
  await p.goto(
    `https://hydraulics-handbook-web.vercel.app/chapters/${id}#schematic`,
    {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    },
  );
  await p.waitForTimeout(2500);
  const info = await p.evaluate(() => {
    const root =
      document.querySelector("#schematic .relative") ||
      document.querySelector("#schematic");
    const bg = root ? getComputedStyle(root).backgroundColor : "";
    const canvas = !!document.querySelector("canvas");
    const text = (document.querySelector("#schematic")?.innerText || "")
      .replace(/\s+/g, " ")
      .slice(0, 200);
    return { bg, canvas, text };
  });
  out.push({ schematic: id, ...info });
}

const outPath = path.join(__dirname, "live-qa-result.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("wrote", outPath, "items", out.length);
await b.close();
