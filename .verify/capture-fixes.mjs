import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
page.setDefaultTimeout(60000);

async function shot(name) {
  await page.screenshot({ path: path.join(__dirname, name) });
}

page.on("pageerror", (err) => console.log("PAGEERROR", err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("CONSOLE", msg.text());
});
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${base}/volunteer-registration`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 2500));
const debug = await page.evaluate(() => ({
  title: document.title,
  hasFullName: Boolean(document.getElementById("fullName")),
  bodyStart: document.body?.innerText?.slice(0, 400),
}));
console.log("debug", JSON.stringify(debug, null, 2));
await page.screenshot({ path: path.join(__dirname, "fix-form-debug.png") });
await page.waitForSelector("#fullName", { timeout: 20000 });
await page.evaluate(() => document.getElementById("emergencyName")?.scrollIntoView({ block: "end" }));
await new Promise((r) => setTimeout(r, 400));
await shot("fix-form-mobile.png");

const buttons = await page.evaluate(() =>
  [...document.querySelectorAll("button")]
    .map((btn) => ({
      text: btn.textContent?.replace(/\s+/g, " ").trim(),
      visible: !!(btn.offsetWidth || btn.offsetHeight),
    }))
    .filter((btn) => ["Back", "Continue", "Submit Registration"].includes(btn.text)),
);

await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1500));
await shot("fix-home-mobile.png");

const homeOverflow = await page.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  bodyWidth: document.body.scrollWidth,
  hasStats: document.body.innerText.includes("Villages Connected"),
}));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
await shot("fix-home-desktop.png");

await page.goto(`${base}/programs`, { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 600));
await shot("fix-programs-desktop.png");
await page.evaluate(() => window.scrollTo(0, 900));
await new Promise((r) => setTimeout(r, 300));
await shot("fix-programs-mid.png");

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 500));
await shot("fix-programs-mobile.png");

console.log(JSON.stringify({ buttons, homeOverflow }, null, 2));
await browser.close();
