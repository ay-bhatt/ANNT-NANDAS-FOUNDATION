import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

async function capture(url, viewport, prefix) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  const journey = await page.evaluateHandle(() => {
    const heading = [...document.querySelectorAll("h2")].find((el) =>
      el.textContent?.includes("Built step by step")
    );
    return heading?.closest("section") ?? null;
  });
  if (journey.asElement()) {
    await journey.asElement().screenshot({
      path: path.join(__dirname, `${prefix}-journey.png`),
    });
  }

  const footer = await page.$("footer");
  if (footer) {
    await footer.screenshot({
      path: path.join(__dirname, `${prefix}-footer.png`),
    });
  }

  const aboutCard = await page.evaluateHandle(() => {
    const title = [...document.querySelectorAll("p")].find((el) =>
      el.textContent?.includes("Rooted in the community")
    );
    return title?.closest("div.relative") ?? null;
  });
  if (aboutCard.asElement()) {
    await aboutCard.asElement().screenshot({
      path: path.join(__dirname, `${prefix}-about-card.png`),
    });
  }

  await page.close();
}

await capture("http://localhost:3000/", { width: 1440, height: 900, deviceScaleFactor: 1 }, "desk");
await capture("http://localhost:3000/", { width: 390, height: 844, deviceScaleFactor: 2 }, "mob");
await capture("http://localhost:3000/about", { width: 1440, height: 900, deviceScaleFactor: 1 }, "about");
await capture("http://localhost:3000/contact", { width: 1440, height: 900, deviceScaleFactor: 1 }, "contact");
await capture("http://localhost:3000/donate", { width: 1440, height: 900, deviceScaleFactor: 1 }, "donate");

await browser.close();
console.log("done");
