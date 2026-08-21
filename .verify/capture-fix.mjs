import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3001";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto(`${base}/gallery`, { waitUntil: "networkidle0", timeout: 120000 });

async function clickFilter(label) {
  for (const btn of await page.$$("button")) {
    const text = await page.evaluate((el) => el.textContent?.trim(), btn);
    if (text === label) {
      await btn.click();
      return;
    }
  }
}

async function shotGrid(name) {
  await page.evaluate(() => {
    document.querySelector("section.section-padding")?.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  const section = await page.$("section.section-padding");
  if (section) await section.screenshot({ path: path.join(__dirname, name) });
}

await clickFilter("Photos");
await shotGrid("fix-photos.png");
await clickFilter("Videos");
await shotGrid("fix-videos.png");

const play = await page.$("button[aria-label^='Play']");
if (play) {
  await play.click();
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: path.join(__dirname, "fix-video-lightbox.png") });
}

await page.goto(`${base}/contact`, { waitUntil: "networkidle0", timeout: 60000 });
const footer = await page.$("footer");
if (footer) {
  await footer.evaluate((el) => el.scrollIntoView());
  await new Promise((r) => setTimeout(r, 400));
  await footer.screenshot({ path: path.join(__dirname, "fix-footer.png") });
  const href = await page.$eval('a[aria-label="Developed by Caumas"]', (el) => el.href);
  console.log("caumas href", href);
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${base}/gallery`, { waitUntil: "networkidle0", timeout: 120000 });
await clickFilter("Photos");
await page.evaluate(() => {
  document.querySelector("section.section-padding")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: path.join(__dirname, "fix-photos-mobile.png") });

await browser.close();
console.log("done");
