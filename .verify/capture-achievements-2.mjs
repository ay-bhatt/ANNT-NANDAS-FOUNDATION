import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => document.getElementById("founder-achievements")?.scrollIntoView({ block: "start" }));
await new Promise((r) => setTimeout(r, 900));
const section = await page.$("#founder-achievements");
if (section) await section.screenshot({ path: ".verify/achievements-desktop.png" });

await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 2 });
await page.reload({ waitUntil: "networkidle0" });
await page.evaluate(() => {
  const el = document.getElementById("founder-achievements");
  el?.scrollIntoView({ block: "start" });
  window.scrollBy(0, 280);
});
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: ".verify/achievements-mobile.png" });
await browser.close();
console.log("ok");
