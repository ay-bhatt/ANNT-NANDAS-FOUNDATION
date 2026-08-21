import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => {
  document.getElementById("founder-achievements")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 800));
const section = await page.$("#founder-achievements");
if (section) await section.screenshot({ path: path.join(__dirname, "achievements-desktop.png") });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(base, { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => {
  document.getElementById("founder-achievements")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: path.join(__dirname, "achievements-mobile.png") });

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${base}/about`, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: path.join(__dirname, "about-achievements.png") });

await browser.close();
console.log("done");
