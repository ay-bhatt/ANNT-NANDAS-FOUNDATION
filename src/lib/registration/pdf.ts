import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { REGISTRATION_TYPE_META, SPORT_OPTIONS } from "./constants";
import { DECLARATION_CLAUSES } from "./declaration";
import type { RegistrationFormState, RegistrationType } from "./types";
import { typeLabel } from "./validation";

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 42;
const NAVY = rgb(15 / 255, 23 / 255, 42 / 255);
const BLUE = rgb(29 / 255, 78 / 255, 216 / 255);
const GREEN = rgb(4 / 255, 120 / 255, 87 / 255);
const SLATE = rgb(51 / 255, 65 / 255, 85 / 255);
const LINE = rgb(226 / 255, 232 / 255, 240 / 255);

async function toPng(buffer: Buffer): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  return sharp(buffer, { failOn: "none" }).rotate().png().toBuffer();
}

async function loadLogoPng(): Promise<Buffer | null> {
  const candidates = [
    path.join(process.cwd(), "src", "assets", "logo.webp"),
    path.join(process.cwd(), "src", "assets", "logo.jpeg"),
  ];
  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file);
      return toPng(raw);
    } catch {
      // try next
    }
  }
  return null;
}

function parseDataUrl(dataUrl: string): Buffer | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return Buffer.from(match[2], "base64");
}

function sportLabel(state: RegistrationFormState): string {
  if (state.sports.sport === "other") return state.sports.otherSport || "Other";
  return SPORT_OPTIONS.find((item) => item.id === state.sports.sport)?.label || state.sports.sport || "Not provided";
}

function pdfSafe(text: string): string {
  return String(text ?? "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-")
    .replace(/₹/g, "Rs ")
    .replace(/[^\t\n\r\x20-\x7E]/g, "?");
}

function wrapText(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const words = pdfSafe(text).replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

class PdfWriter {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;

  constructor(doc: PDFDocument, page: PDFPage, font: PDFFont, bold: PDFFont) {
    this.doc = doc;
    this.page = page;
    this.font = font;
    this.bold = bold;
    this.y = PAGE.height - MARGIN;
  }

  async ensure(space: number) {
    if (this.y - space > MARGIN + 24) return;
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.y = PAGE.height - MARGIN;
    this.page.drawText("ANNT NANDAS FOUNDATION · Registration Record", {
      x: MARGIN,
      y: PAGE.height - 28,
      size: 8,
      font: this.font,
      color: SLATE,
    });
    this.y = PAGE.height - 48;
  }

  heading(title: string) {
    if (this.y < MARGIN + 70) {
      this.page = this.doc.addPage([PAGE.width, PAGE.height]);
      this.y = PAGE.height - 48;
    }
    this.y -= 8;
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y - 18,
      width: PAGE.width - MARGIN * 2,
      height: 22,
      color: NAVY,
    });
    this.page.drawText(pdfSafe(title).toUpperCase(), {
      x: MARGIN + 10,
      y: this.y - 13,
      size: 9,
      font: this.bold,
      color: rgb(1, 1, 1),
    });
    this.y -= 28;
  }

  row(label: string, value: string) {
    const labelWidth = 168;
    const valueWidth = PAGE.width - MARGIN * 2 - labelWidth - 8;
    const lines = wrapText(this.font, value || "Not provided", 10, valueWidth);
    const height = Math.max(18, lines.length * 13 + 8);
    this.y -= height;
    if (this.y < MARGIN + 24) {
      this.y += height;
      this.page = this.doc.addPage([PAGE.width, PAGE.height]);
      this.y = PAGE.height - 48 - height;
    }
    this.page.drawText(pdfSafe(label), {
      x: MARGIN + 4,
      y: this.y + height - 14,
      size: 9,
      font: this.font,
      color: SLATE,
    });
    lines.forEach((line, index) => {
      this.page.drawText(line, {
        x: MARGIN + labelWidth,
        y: this.y + height - 14 - index * 13,
        size: 10,
        font: this.bold,
        color: NAVY,
      });
    });
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE.width - MARGIN, y: this.y },
      thickness: 0.5,
      color: LINE,
    });
  }
}

export async function buildRegistrationPdf(options: {
  state: RegistrationFormState;
  registrationId: string;
  submittedAt: string;
}): Promise<Buffer> {
  const { state, registrationId, submittedAt } = options;
  const type = (state.type || "event") as RegistrationType;
  const meta = REGISTRATION_TYPE_META[type];
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([PAGE.width, PAGE.height]);
  const writer = new PdfWriter(doc, page, font, bold);

  writer.page.drawRectangle({
    x: 0,
    y: PAGE.height - 108,
    width: PAGE.width,
    height: 108,
    color: NAVY,
  });
  writer.page.drawRectangle({
    x: 0,
    y: PAGE.height - 112,
    width: PAGE.width,
    height: 4,
    color: GREEN,
  });

  const logoPng = await loadLogoPng();
  if (logoPng) {
    try {
      const embedded = await doc.embedPng(logoPng);
      writer.page.drawImage(embedded, {
        x: MARGIN,
        y: PAGE.height - 96,
        width: 54,
        height: 54,
      });
    } catch {
      // continue with text branding
    }
  }

  writer.page.drawText("ANNT NANDAS FOUNDATION", {
    x: MARGIN + 68,
    y: PAGE.height - 58,
    size: 16,
    font: bold,
    color: rgb(1, 1, 1),
  });
  writer.page.drawText("Official Registration Record", {
    x: MARGIN + 68,
    y: PAGE.height - 76,
    size: 10,
    font: font,
    color: rgb(0.75, 0.85, 1),
  });

  writer.y = PAGE.height - 138;
  writer.page.drawText(pdfSafe(`Registration Type: ${typeLabel(type)}`), {
    x: MARGIN,
    y: writer.y,
    size: 12,
    font: bold,
    color: BLUE,
  });
  writer.page.drawText(pdfSafe(`Reference: ${registrationId}`), {
    x: PAGE.width - MARGIN - bold.widthOfTextAtSize(registrationId, 11),
    y: writer.y,
    size: 11,
    font: bold,
    color: NAVY,
  });
  writer.y -= 18;
  writer.page.drawText(pdfSafe(`Submitted: ${new Date(submittedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}`), {
    x: MARGIN,
    y: writer.y,
    size: 9,
    font: font,
    color: SLATE,
  });
  writer.y -= 16;

  const p = state.personal;
  writer.heading("Personal Information");
  writer.row("Name", p.fullName);
  writer.row("Father’s Name", p.fatherName);
  writer.row("Mother’s Name", p.motherName);
  writer.row("Date of Birth", p.dob);
  writer.row("Age", p.age);
  writer.row("Gender", p.gender);
  writer.row("Blood Group", p.bloodGroup);
  writer.row("Education", p.education);
  writer.row("Special Education", p.specialEducation);
  writer.row("Occupation", p.occupation);
  writer.row("Nationality", p.nationality);
  writer.row("Address", p.address);
  writer.row("Phone", p.phone);
  writer.row("Email", p.email);
  writer.row("WhatsApp", p.whatsapp);

  if (type === "volunteer") {
    const v = state.volunteer;
    writer.heading("Volunteer Information");
    writer.row("Volunteer Name", v.volunteerName);
    writer.row("Skills / Expertise", v.skills);
    writer.row("Category / Role", v.roles.join(", "));
    writer.row("Other Skill / Role", v.otherRole);
    writer.row("Subjects", v.subjects);
    writer.row("Experience", v.experience);
    writer.row("Why They Want to Volunteer", v.motivation);
    writer.row("Preferred Location", v.preferredLocation);
    writer.row("Volunteer Timing", "Assigned by the foundation according to the activity, location, and operational requirements");
    writer.row("Food & Stay", "Provided by the foundation according to the volunteering activity and location");
    writer.row("Preferred Duration", v.duration === "Specific duration" ? v.customDuration : v.duration);
    writer.row("Additional Requirements", v.otherSupport);
    writer.row("Additional Comments", v.additionalComments);
  } else if (type === "membership") {
    const m = state.membership;
    writer.heading("Membership Information");
    writer.row("Membership Type", m.membershipType);
    writer.row("Areas of Interest", m.areasOfInterest.join(", "));
    writer.row("Contribution", m.contribution);
    writer.row("How They Heard About Us", m.howHeard);
    writer.row("Emergency Contact", m.emergencyName);
    writer.row("Emergency Phone", m.emergencyPhone);
    writer.row("Additional Comments", m.additionalComments);
  } else if (type === "sports") {
    const s = state.sports;
    writer.heading("Sports Information");
    writer.row("Sport", sportLabel(state));
    writer.row("Category", s.category);
    writer.row("Experience Level", s.experienceLevel);
    writer.row("Previous Participation", s.previousParticipation);
    writer.row("Emergency Contact", s.emergencyName);
    writer.row("Emergency Phone", s.emergencyPhone);
    writer.row("Medical Information", s.medicalInfo);
    writer.row("Medically Fit", s.medicallyFit ? "Yes" : "No");
    writer.row("T-shirt Size", s.tshirtSize);
    writer.row("Additional Comments", s.additionalComments);
  } else if (type === "employee") {
    const e = state.employee;
    writer.heading("Employment Information");
    writer.row("Position Applied For", e.position);
    writer.row("Qualifications", e.qualifications);
    writer.row("Experience", e.experience);
    writer.row("Availability to Join", e.availabilityToJoin);
    writer.row("Why They Want to Join", e.whyJoin);
    writer.row("Additional Comments", e.additionalComments);
  } else {
    const ev = state.event;
    writer.heading("Event Information");
    writer.row("Event / Activity", ev.eventInterest);
    writer.row("Participation Mode", ev.participationMode);
    writer.row("Emergency Contact", ev.emergencyName);
    writer.row("Emergency Phone", ev.emergencyPhone);
    writer.row("Additional Comments", ev.additionalComments);
  }

  await writer.ensure(180);
  writer.heading("Photograph, Signature & Declaration");
  writer.row("Declaration accepted", state.declaration.accepted ? "Yes" : "No");
  writer.row("Date", state.declaration.date);
  writer.row("Place", state.declaration.place);

  let photoImage = null;
  let signImage = null;
  try {
    if (state.photograph?.dataUrl) {
      const raw = parseDataUrl(state.photograph.dataUrl);
      if (raw) photoImage = await doc.embedPng(await toPng(raw));
    }
  } catch {
    photoImage = null;
  }
  try {
    if (state.signature?.dataUrl) {
      const raw = parseDataUrl(state.signature.dataUrl);
      if (raw) signImage = await doc.embedPng(await toPng(raw));
    }
  } catch {
    signImage = null;
  }

  await writer.ensure(150);
  writer.y -= 10;
  if (photoImage) {
    writer.page.drawText("Photograph", { x: MARGIN, y: writer.y, size: 9, font: bold, color: SLATE });
    writer.page.drawImage(photoImage, { x: MARGIN, y: writer.y - 122, width: 92, height: 112 });
  }
  if (signImage) {
    writer.page.drawText("Signature", { x: MARGIN + 140, y: writer.y, size: 9, font: bold, color: SLATE });
    writer.page.drawImage(signImage, { x: MARGIN + 140, y: writer.y - 78, width: 160, height: 64 });
  }
  writer.y -= 140;

  await writer.ensure(40);
  writer.heading("Declaration");
  for (const [index, clause] of DECLARATION_CLAUSES.entries()) {
    const text = `${index + 1}. ${clause.title}. ${clause.body}`;
    const lines = wrapText(writer.font, text, 8.5, PAGE.width - MARGIN * 2);
    await writer.ensure(lines.length * 11 + 8);
    for (const line of lines) {
      writer.y -= 11;
      writer.page.drawText(line, { x: MARGIN, y: writer.y, size: 8.5, font: writer.font, color: SLATE });
    }
    writer.y -= 4;
  }

  writer.page.drawText(`ANNT NANDAS FOUNDATION · ${meta.label} · ${registrationId}`, {
    x: MARGIN,
    y: 24,
    size: 8,
    font: font,
    color: SLATE,
  });

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
