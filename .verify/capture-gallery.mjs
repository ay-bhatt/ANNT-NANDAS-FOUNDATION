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

async function shot(page, name) {
  await page.screenshot({ path: path.join(__dirname, name), fullPage: false });
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${base}/gallery`, { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1200));

const grid = await page.evaluateHandle(() => {
  const heading = [...document.querySelectorAll("h2")].find((el) =>
    el.textContent?.includes("Real field moments")
  );
  return heading?.parentElement?.parentElement ?? document.querySelector("section.section-padding");
});
if (grid.asElement()) {
  await grid.asElement().screenshot({ path: path.join(__dirname, "gallery-all.png") });
}

await shot(page, "gallery-desktop.png");

const videosBtn = await page.$('button[aria-pressed] ~ button, button');
const buttons = await page.$$("button");
for (const btn of buttons) {
  const text = await page.evaluate((el) => el.textContent?.trim(), btn);
  if (text === "Videos") {
    await btn.click();
    break;
  }
}
await new Promise((r) => setTimeout(r, 800));
if (grid.asElement()) {
  await grid.asElement().screenshot({ path: path.join(__dirname, "gallery-videos.png") });
}

const firstCard = await page.$("section.section-padding button[aria-label^='Play']");
if (firstCard) {
  await firstCard.click();
  await new Promise((r) => setTimeout(r, 1500));
  await shot(page, "gallery-video-lightbox.png");
  const close = await page.$('button[aria-label="Close viewer"]');
  if (close) await close.click();
}

for (const btn of await page.$$("button")) {
  const text = await page.evaluate((el) => el.textContent?.trim(), btn);
  if (text === "Photos") {
    await btn.click();
    break;
  }
}
await new Promise((r) => setTimeout(r, 800));
if (grid.asElement()) {
  await grid.asElement().screenshot({ path: path.join(__dirname, "gallery-photos.png") });
}

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${base}/gallery`, { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 800));
await page.evaluate(() => window.scrollTo(0, 700));
await new Promise((r) => setTimeout(r, 400));
await shot(page, "gallery-mobile.png");

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${base}/about`, { waitUntil: "networkidle0", timeout: 60000 });
const footer = await page.$("footer");
if (footer) await footer.screenshot({ path: path.join(__dirname, "about-footer.png") });

await page.goto(`${base}/`, { waitUntil: "networkidle0", timeout: 60000 });
await shot(page, "home-desktop.png");

await browser.close();
console.log("done");
