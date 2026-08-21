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
page.on("pageerror", (err) => console.log("PAGEERROR", err.message));

async function shot(name) {
  await page.screenshot({ path: path.join(__dirname, name) });
}

async function measure(label) {
  const box = await page.evaluate(() => ({
    inner: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  console.log(label, box);
  return box;
}

await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });
await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1200));
await measure("home-mobile");
await shot("qa-home-mobile.png");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 400));
await shot("qa-footer-mobile.png");
await measure("home-footer-mobile");

await page.goto(`${base}/programs`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1000));
await page.evaluate(() => window.scrollTo(0, 1400));
await new Promise((r) => setTimeout(r, 300));
await shot("qa-programs-mobile.png");

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(`${base}/programs`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1000));
await measure("programs-desktop");
await page.evaluate(() => window.scrollTo(0, 900));
await new Promise((r) => setTimeout(r, 300));
await shot("qa-programs-desktop.png");

await page.goto(`${base}/our-work`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1000));
await page.evaluate(() => window.scrollTo(0, 2200));
await new Promise((r) => setTimeout(r, 300));
await shot("qa-ourwork-desktop.png");

await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1000));
await page.evaluate(() => {
  document.getElementById("founder-achievements")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 400));
await shot("qa-founder-desktop.png");

await page.goto(`${base}/privacy-policy`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 600));
await shot("qa-privacy.png");

await page.goto(`${base}/not-a-real-page`, { waitUntil: "domcontentloaded", timeout: 120000 });
await new Promise((r) => setTimeout(r, 600));
await shot("qa-404.png");

const footerLinks = await page.evaluate(async () => {
  // go home footer via fetch in node instead
  return true;
});

await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 400));
const links = await page.evaluate(() =>
  [...document.querySelector("footer")?.querySelectorAll("a") || []].map((a) => ({
    href: a.getAttribute("href"),
    text: a.textContent?.replace(/\s+/g, " ").trim(),
  })),
);
console.log("footerLinks", JSON.stringify(links.filter((l) => /privacy|terms|cookie|accessib|refund/i.test(l.text + l.href)), null, 2));

await browser.close();
