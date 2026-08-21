import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3001";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto(`${base}/gallery`, { waitUntil: "networkidle0", timeout: 120000 });

async function clickFilter(label) {
  const buttons = await page.$$("button");
  for (const btn of buttons) {
    const text = await page.evaluate((el) => el.textContent?.trim(), btn);
    if (text === label) {
      await btn.click();
      return;
    }
  }
}

async function shotGrid(name) {
  await page.evaluate(() => {
    const section = document.querySelector("section.section-padding");
    section?.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 900));
  const section = await page.$("section.section-padding");
  if (section) await section.screenshot({ path: path.join(__dirname, name) });
}

await shotGrid("grid-all.png");
await clickFilter("Photos");
await shotGrid("grid-photos.png");
await clickFilter("Videos");
await shotGrid("grid-videos.png");

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await clickFilter("Photos");
await page.evaluate(() => {
  document.querySelector("section.section-padding")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: path.join(__dirname, "grid-photos-mobile.png") });

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${base}/donate`, { waitUntil: "networkidle0", timeout: 60000 });
const footer = await page.$("footer");
if (footer) {
  await footer.evaluate((el) => el.scrollIntoView());
  await new Promise((r) => setTimeout(r, 400));
  await footer.screenshot({ path: path.join(__dirname, "donate-footer.png") });
}

await browser.close();
console.log("done");
