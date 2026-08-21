import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3000";
const photoPath = path.join(
  process.cwd(),
  "anntnandasfoundation",
  "data",
  "uploads",
  "volunteer",
  "ANF-VOL-260819-BFRY-photograph.jpg",
);
const signPath = path.join(
  process.cwd(),
  "anntnandasfoundation",
  "data",
  "uploads",
  "volunteer",
  "ANF-VOL-260819-BFRY-signature.jpg",
);

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
page.setDefaultTimeout(60000);
await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 1 });

await page.goto(`${base}/volunteer-registration`, { waitUntil: "networkidle0", timeout: 120000 });

async function fill() {
  await page.evaluate(() => {
    const setInput = (id, value) => {
      const input = document.getElementById(id);
      if (!input) return;
      const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      setter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    };
    const setSelect = (id, value) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = value;
      el.dispatchEvent(new Event("change", { bubbles: true }));
      el.dispatchEvent(new Event("input", { bubbles: true }));
    };

    setInput("fullName", "Kavita Bisht");
    setInput("fatherName", "Kalam Singh Bisht");
    setInput("motherName", "Anita Devi");
    setSelect("gender", "Female");
    setInput("nationality", "Indian");
    setSelect("bloodGroup", "B+");
    setSelect("education", "Graduate");
    setSelect("occupation", "Teacher");
    setInput("phone", "9876543210");
    setInput("email", "kavita.test@example.com");
    setInput("whatsapp", "9876543210");
    setInput("address", "Village Mundoli, near community hall");
    setInput("postOffice", "Mundoli");
    setInput("tehsil", "Tharali");
    setInput("district", "Chamoli");
    setSelect("state", "Uttarakhand");
    setInput("country", "India");
    setInput("pinCode", "246443");
    setInput("emergencyName", "Anita Devi");
    setSelect("emergencyRelation", "Mother");
    setInput("emergencyPhone", "9876543211");
  });
}

async function clickLabeled(label) {
  await page.waitForFunction(
    (text) => [...document.querySelectorAll("button")].some((btn) => btn.textContent?.trim() === text),
    { timeout: 15000 },
    label,
  );
  await page.evaluate((text) => {
    const btn = [...document.querySelectorAll("button")].find((item) => item.textContent?.trim() === text);
    btn?.click();
  }, label);
}

await page.waitForSelector("#fullName");
await fill();
await page.select("#dob-day", "15");
await page.select("#dob-month", "08");
await page.select("#dob", "1998");
const dobState = await page.evaluate(() => ({
  day: document.getElementById("dob-day")?.value,
  month: document.getElementById("dob-month")?.value,
  year: document.getElementById("dob")?.value,
  age: document.getElementById("age")?.value,
}));
console.log("dobState", dobState);
await clickLabeled("Continue");
await new Promise((r) => setTimeout(r, 600));
const afterPersonal = await page.evaluate(() => ({
  heading: [...document.querySelectorAll("h2")].map((el) => el.textContent?.trim()),
  errors: [...document.querySelectorAll("[role='alert']")].map((el) => el.textContent?.trim()),
  age: document.getElementById("age")?.value,
}));
console.log("afterPersonal", afterPersonal);
if (!afterPersonal.heading.some((text) => String(text).includes("Volunteer"))) {
  await page.screenshot({ path: path.join(__dirname, "register-personal-fail.png"), fullPage: true });
  throw new Error(`Did not reach volunteer details: ${JSON.stringify(afterPersonal)}`);
}

await page.evaluate(() => {
  const setInput = (id, value) => {
    const input = document.getElementById(id);
    if (!input) return;
    const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const setSelect = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };
  setInput("volunteerName", "Kavita Bisht");
  setInput("skills", "Teaching English and supporting village learning sessions.");
  setInput("subjects", "English, Social Studies");
  setInput("motivation", "I want to support children in Himalayan villages.");
  setInput("preferredLocation", "Mundoli, Chamoli");
  setSelect("duration", "Lifetime");
  [...document.querySelectorAll("button")].find((btn) => btn.textContent?.trim() === "Teacher")?.click();
});

const durationValue = await page.$eval("#duration", (el) => el.value);
await page.evaluate(() => document.getElementById("duration")?.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 200));
await page.screenshot({ path: path.join(__dirname, "register-duration-lifetime.png") });

await clickLabeled("Continue");
await page.waitForFunction(() => document.body.innerText.includes("Photograph"), { timeout: 10000 });

if (!fs.existsSync(photoPath) || !fs.existsSync(signPath)) {
  throw new Error("Missing sample photo/signature files for printable verification.");
}

await page.$eval("#photograph", (el) => el.classList.remove("sr-only"));
await page.$eval("#signature", (el) => el.classList.remove("sr-only"));
const photoInput = await page.$("#photograph");
const signInput = await page.$("#signature");
await photoInput.uploadFile(photoPath);
await signInput.uploadFile(signPath);
await page.waitForFunction(() => document.querySelectorAll("img[alt$='preview']").length >= 2, { timeout: 20000 });
await page.screenshot({ path: path.join(__dirname, "register-documents.png") });

await clickLabeled("Continue");
await page.waitForFunction(() => document.body.innerText.includes("Declaration"), { timeout: 10000 });

await page.evaluate(() => {
  const checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox && !checkbox.checked) checkbox.click();
  const place = document.getElementById("declarationPlace");
  if (place) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(place, "Chamoli");
    place.dispatchEvent(new Event("input", { bubbles: true }));
    place.dispatchEvent(new Event("change", { bubbles: true }));
  }
});

await page.setRequestInterception(true);
page.on("request", (request) => {
  if (request.url().includes("/api/registration") && request.method() === "POST") {
    request.respond({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Registration submitted successfully.",
        registrationId: "ANF-VOL-260821-TEST",
        submittedAt: new Date().toISOString(),
      }),
    });
    return;
  }
  request.continue();
});

await clickLabeled("Submit Registration");
await page.waitForFunction(() => document.body.innerText.includes("Registration submitted successfully"), {
  timeout: 15000,
});
await page.screenshot({ path: path.join(__dirname, "register-success.png") });

const printablePath = path.join(__dirname, "register-printable.html");
await page.exposeFunction("savePrintableHtml", (html) => {
  fs.writeFileSync(printablePath, html, "utf-8");
});
await page.evaluate(() => {
  window.open = () => ({
    document: {
      open() {},
      write(html) {
        window.savePrintableHtml(html);
      },
      close() {},
    },
    focus() {},
    print() {},
  });
});

const printButtons = await page.$$("button");
for (const btn of printButtons) {
  const text = await page.evaluate((el) => el.textContent?.trim(), btn);
  if (text === "Download / Print Application") {
    await btn.click();
    break;
  }
}
await new Promise((r) => setTimeout(r, 800));
if (!fs.existsSync(printablePath)) {
  throw new Error("Printable HTML was not generated.");
}

const preview = await browser.newPage();
await preview.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });
await preview.goto(`file://${printablePath.replace(/\\/g, "/")}`, { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 400));
await preview.screenshot({ path: path.join(__dirname, "register-printable-top.png") });
await preview.evaluate(() => window.scrollTo(0, 1100));
await new Promise((r) => setTimeout(r, 200));
await preview.screenshot({ path: path.join(__dirname, "register-printable-mid.png") });
await preview.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 200));
await preview.screenshot({ path: path.join(__dirname, "register-printable-bottom.png") });

const printableText = await preview.evaluate(() => document.body.innerText);
console.log(
  JSON.stringify(
    {
      durationValue,
      hasPhotoHeading: printableText.includes("Photograph"),
      hasName: printableText.includes("Kavita Bisht"),
      hasDob: /15\/08\/1998/.test(printableText) || printableText.includes("15/08/1998"),
      hasPostOffice: printableText.includes("Mundoli"),
      hasTehsil: printableText.includes("Tharali"),
      hasEmergency: printableText.includes("Anita Devi") && printableText.includes("Mother"),
      hasLifetime: printableText.includes("Lifetime"),
      hasSignatureHeading: printableText.includes("Applicant Signature"),
      snippet: printableText.slice(0, 500),
      tail: printableText.slice(-500),
    },
    null,
    2,
  ),
);

await browser.close();
