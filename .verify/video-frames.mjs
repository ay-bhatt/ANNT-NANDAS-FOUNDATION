import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.setViewport({ width: 960, height: 540 });

for (const n of ["01", "02", "03", "04", "05"]) {
  const url = `http://localhost:3001/gallery/videos/${n}.mp4`;
  await page.setContent(`
    <html><body style="margin:0;background:#000">
      <video id="v" src="${url}" muted playsinline style="width:100%;height:100vh;object-fit:contain"></video>
      <script>
        const v = document.getElementById('v');
        v.addEventListener('loadeddata', () => { v.currentTime = 0.4; });
      </script>
    </body></html>
  `);
  await page.waitForFunction(() => {
    const v = document.querySelector("video");
    return v && v.readyState >= 2 && v.currentTime > 0;
  }, { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, `video-${n}.png`) });
}

await browser.close();
console.log("frames saved");
