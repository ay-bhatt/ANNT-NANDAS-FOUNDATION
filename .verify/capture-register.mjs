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
page.setDefaultTimeout(30000);

async function shot(name) {
  await page.screenshot({ path: path.join(__dirname, name), fullPage: false });
}

await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 1 });
await page.goto(`${base}/volunteer-registration`, { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 800));

const joinUsCount = await page.evaluate(() =>
  [...document.querySelectorAll("a, p, span, h4")].filter((el) => el.textContent?.trim() === "Join Us").length,
);
const getInvolvedCount = await page.evaluate(() =>
  [...document.querySelectorAll("a, p, span, h4")].filter((el) => el.textContent?.trim() === "Get Involved").length,
);

await shot("register-join-us.png");

const labels = await page.evaluate(() =>
  [...document.querySelectorAll("label, p.mb-2, h2")].map((el) => el.textContent?.replace(/\s+/g, " ").trim()).filter(Boolean),
);

await page.evaluate(() => {
  const dob = document.getElementById("dob-day");
  dob?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 200));
await shot("register-dob.png");

await page.evaluate(() => {
  document.getElementById("address")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 200));
await shot("register-address.png");

await page.evaluate(() => {
  document.getElementById("emergencyName")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 200));
await shot("register-emergency.png");

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 300));
await shot("register-mobile-top.png");

await page.evaluate(() => {
  document.getElementById("address")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 200));
await shot("register-mobile-address.png");

await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 1 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.click("button.btn-primary");
await new Promise((r) => setTimeout(r, 400));
const validationErrors = await page.evaluate(() =>
  [...document.querySelectorAll('[role="alert"]')].map((el) => el.textContent?.trim()).filter(Boolean),
);

await page.select("#dob-day", "15");
await page.select("#dob-month", "08");
await page.select("#dob", "1998");
await new Promise((r) => setTimeout(r, 200));
const ageValue = await page.evaluate(() => document.getElementById("age")?.value || "");
await shot("register-dob-filled.png");

await page.evaluate(() => {
  document.getElementById("preferredLocation") || window.scrollTo(0, 0);
});

const continueBtn = await page.$("button.btn-primary");
await continueBtn?.evaluate((el) => el.scrollIntoView({ block: "center" }));

await page.goto(`${base}/volunteer-registration`, { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => {
  const fields = {
    fullName: "Test User",
    fatherName: "Test Father",
    motherName: "Test Mother",
    nationality: "Indian",
    phone: "9876543210",
    email: "test@example.com",
    address: "Village road, Ward 1",
    postOffice: "Mundoli",
    tehsil: "Tharali",
    district: "Chamoli",
    country: "India",
    pinCode: "246443",
    emergencyName: "Anita Devi",
    emergencyPhone: "9876543211",
  };
  for (const [id, value] of Object.entries(fields)) {
    const input = document.getElementById(id);
    if (!input) continue;
    const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
  const setSelect = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  setSelect("gender", "Female");
  setSelect("bloodGroup", "B+");
  setSelect("education", "Graduate");
  setSelect("occupation", "Teacher");
  setSelect("state", "Uttarakhand");
  setSelect("emergencyRelation", "Mother");
  setSelect("dob-day", "15");
  setSelect("dob-month", "08");
  setSelect("dob", "1998");
});
await new Promise((r) => setTimeout(r, 300));
await page.click("button.btn-primary");
await new Promise((r) => setTimeout(r, 800));

const detailsHeading = await page.evaluate(() => document.querySelector("h2")?.textContent || "");
await page.evaluate(() => {
  document.getElementById("duration")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 200));
const durationOptions = await page.evaluate(() =>
  [...document.querySelectorAll("#duration option")].map((el) => el.textContent?.trim()).filter(Boolean),
);
await shot("register-duration.png");

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await new Promise((r) => setTimeout(r, 200));
await shot("register-mobile-duration.png");

console.log(JSON.stringify({
  joinUsCount,
  getInvolvedCount,
  labels: labels.filter((label) =>
    /date of birth|post office|tehsil|district|state|country|pin|emergency|relation/i.test(label),
  ),
  validationErrors,
  ageValue,
  detailsHeading,
  durationOptions,
}, null, 2));

await browser.close();
