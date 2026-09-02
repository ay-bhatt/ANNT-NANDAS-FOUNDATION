import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
import { REGISTRATION_FEE_AMOUNT, REGISTRATION_FEE_PAYEE, REGISTRATION_TYPE_META, SPORT_OPTIONS } from "./constants";
import type { RegistrationFormState, RegistrationType } from "./types";
import { formatAadhaarNumber, formatDob, typeLabel } from "./validation";

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 22;
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

  heading(title: string) {
    this.y -= 5;
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y - 14,
      width: PAGE.width - MARGIN * 2,
      height: 16,
      color: NAVY,
    });
    this.page.drawText(pdfSafe(title).toUpperCase(), {
      x: MARGIN + 8,
      y: this.y - 11,
      size: 8,
      font: this.bold,
      color: rgb(1, 1, 1),
    });
    this.y -= 18;
  }

  row(label: string, value: string) {
    const labelWidth = 150;
    const valueWidth = PAGE.width - MARGIN * 2 - labelWidth - 8;
    const lines = wrapText(this.font, value || "Not provided", 8.5, valueWidth);
    const height = Math.max(13, lines.length * 10 + 4);
    this.y -= height;
    this.page.drawText(pdfSafe(label), {
      x: MARGIN + 4,
      y: this.y + height - 11,
      size: 8,
      font: this.font,
      color: SLATE,
    });
    lines.forEach((line, index) => {
      this.page.drawText(line, {
        x: MARGIN + labelWidth,
        y: this.y + height - 11 - index * 10,
        size: 8.5,
        font: this.bold,
        color: NAVY,
      });
    });
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE.width - MARGIN, y: this.y },
      thickness: 0.4,
      color: LINE,
    });
  }

  pairRow(label1: string, value1: string, label2?: string, value2?: string) {
    const colW = (PAGE.width - MARGIN * 2) / 2;
    const labelW = 88;
    const valueW = colW - labelW - 6;
    const lines1 = wrapText(this.font, value1 || "Not provided", 8, valueW);
    const lines2 = label2 ? wrapText(this.font, value2 || "Not provided", 8, valueW) : [""];
    const height = Math.max(13, Math.max(lines1.length, lines2.length) * 10 + 4);
    this.y -= height;
    this.page.drawText(pdfSafe(label1), {
      x: MARGIN + 3,
      y: this.y + height - 11,
      size: 7.5,
      font: this.font,
      color: SLATE,
    });
    lines1.forEach((line, index) => {
      this.page.drawText(line, {
        x: MARGIN + labelW,
        y: this.y + height - 11 - index * 10,
        size: 8,
        font: this.bold,
        color: NAVY,
      });
    });
    if (label2) {
      this.page.drawText(pdfSafe(label2), {
        x: MARGIN + colW + 3,
        y: this.y + height - 11,
        size: 7.5,
        font: this.font,
        color: SLATE,
      });
      lines2.forEach((line, index) => {
        this.page.drawText(line, {
          x: MARGIN + colW + labelW,
          y: this.y + height - 11 - index * 10,
          size: 8,
          font: this.bold,
          color: NAVY,
        });
      });
    }
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE.width - MARGIN, y: this.y },
      thickness: 0.4,
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
    y: PAGE.height - 58,
    width: PAGE.width,
    height: 58,
    color: NAVY,
  });
  writer.page.drawRectangle({
    x: 0,
    y: PAGE.height - 61,
    width: PAGE.width,
    height: 3,
    color: GREEN,
  });

  const logoPng = await loadLogoPng();
  if (logoPng) {
    try {
      const embedded = await doc.embedPng(logoPng);
      writer.page.drawImage(embedded, {
        x: MARGIN,
        y: PAGE.height - 50,
        width: 32,
        height: 32,
      });
    } catch {
      // continue with text branding
    }
  }

  writer.page.drawText("ANNT NANDAS FOUNDATION", {
    x: MARGIN + 42,
    y: PAGE.height - 32,
    size: 13,
    font: bold,
    color: rgb(1, 1, 1),
  });
  writer.page.drawText("Official Registration Record · One page", {
    x: MARGIN + 42,
    y: PAGE.height - 46,
    size: 8,
    font: font,
    color: rgb(0.75, 0.85, 1),
  });

  writer.y = PAGE.height - 78;
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

  const p = state.personal;
  writer.page.drawText("Photograph", {
    x: MARGIN,
    y: writer.y,
    size: 7,
    font: bold,
    color: SLATE,
  });
  writer.y -= 4;
  if (photoImage) {
    writer.page.drawImage(photoImage, { x: MARGIN, y: writer.y - 70, width: 58, height: 70 });
  } else {
    writer.page.drawRectangle({
      x: MARGIN,
      y: writer.y - 70,
      width: 58,
      height: 70,
      borderColor: LINE,
      borderWidth: 1,
    });
  }
  const nameLines = wrapText(bold, p.fullName || "Not provided", 12, PAGE.width - MARGIN * 2 - 76);
  let nameY = writer.y - 16;
  for (const line of nameLines) {
    writer.page.drawText(line, { x: MARGIN + 70, y: nameY, size: 12, font: bold, color: NAVY });
    nameY -= 13;
  }
  writer.page.drawText(pdfSafe(`${typeLabel(type)}  |  ${registrationId}`), {
    x: MARGIN + 70,
    y: nameY - 2,
    size: 8,
    font: font,
    color: SLATE,
  });
  writer.y -= 78;

  writer.heading("Personal Information");
  writer.pairRow("Name", p.fullName, "Father’s Name", p.fatherName);
  writer.pairRow("Mother’s Name", p.motherName, "Date of Birth", formatDob(p.dob));
  writer.pairRow("Age", p.age, "Gender", p.gender);
  writer.pairRow("Blood Group", p.bloodGroup, "PIN Code", p.pinCode);
  if (p.education.trim() || p.occupation.trim()) {
    writer.pairRow("Education", p.education, "Occupation", p.occupation);
  }
  if (p.nationality.trim() || p.specialEducation.trim()) {
    writer.pairRow("Nationality", p.nationality, "Special Education", p.specialEducation);
  }
  writer.pairRow("Post Office", p.postOffice, "Tehsil", p.tehsil);
  writer.pairRow("District", p.district, "State", p.state);
  writer.pairRow("Country", p.country, "Phone", p.phone);
  writer.pairRow("Email", p.email, "WhatsApp", p.whatsapp);
  writer.row("Address", p.address);
  writer.pairRow("Emergency contact", p.emergencyName, "Relation", p.emergencyRelation);
  writer.row("Emergency number", p.emergencyPhone);

  if (type === "volunteer") {
    const v = state.volunteer;
    writer.heading("Volunteer Information");
    writer.pairRow("Volunteer Name", v.volunteerName, "Skills / Expertise", v.skills);
    writer.pairRow("Category / Role", v.roles.join(", "), "Preferred Location", v.preferredLocation);
    writer.pairRow("Preferred Duration", v.duration === "Specific duration" ? v.customDuration : v.duration, "Experience", v.experience);
    writer.row("Why They Want to Volunteer", v.motivation);
    if (v.otherSupport.trim()) writer.row("Additional Requirements", v.otherSupport);
    if (v.additionalComments.trim()) writer.row("Additional Comments", v.additionalComments);
  } else if (type === "membership") {
    const m = state.membership;
    writer.heading("Membership Information");
    writer.pairRow("Membership Type", m.membershipType, "How They Heard About Us", m.howHeard);
    writer.row("Areas of Interest", m.areasOfInterest.join(", "));
    writer.row("Contribution", m.contribution);
    if (m.additionalComments.trim()) writer.row("Additional Comments", m.additionalComments);
  } else if (type === "sports") {
    const s = state.sports;
    writer.heading("Sports Information");
    writer.pairRow("Sport", sportLabel(state), "Category", s.category);
    writer.pairRow("Experience Level", s.experienceLevel, "T-shirt Size", s.tshirtSize);
    writer.pairRow("Medically Fit", s.medicallyFit ? "Yes" : "No", "Previous Participation", s.previousParticipation);
    if (s.medicalInfo.trim()) writer.row("Medical Information", s.medicalInfo);
    if (s.additionalComments.trim()) writer.row("Additional Comments", s.additionalComments);
  } else if (type === "talent-hunt") {
    const t = state.talentHunt;
    writer.heading("Runner Talent Hunt Program");
    writer.pairRow("Talent category", t.talentCategory === "Other" ? t.otherTalent : t.talentCategory, "Class studying in", t.classGrade);
    writer.row("School name", t.schoolName);
    writer.row("Aadhaar number", formatAadhaarNumber(t.aadhaarNumber));
    writer.pairRow("Parent / consultant", t.parentName, "Relation", t.parentRelation);
    writer.pairRow("Parent phone", t.parentPhone, "Parent email", t.parentEmail);
    writer.row("Why they want to take part", t.whyParticipate);
    if (t.previousAchievements.trim()) writer.row("Previous achievements", t.previousAchievements);
    if (t.additionalComments.trim()) writer.row("Additional comments", t.additionalComments);
  } else if (type === "employee") {
    const e = state.employee;
    writer.heading("Employment Information");
    writer.pairRow("Position Applied For", e.position, "Availability to Join", e.availabilityToJoin);
    writer.row("Qualifications", e.qualifications);
    writer.row("Experience", e.experience);
    writer.row("Why They Want to Join", e.whyJoin);
    if (e.additionalComments.trim()) writer.row("Additional Comments", e.additionalComments);
  } else {
    const ev = state.event;
    writer.heading("Event Information");
    writer.pairRow("Event / Activity", ev.eventInterest, "Participation Mode", ev.participationMode);
    if (ev.additionalComments.trim()) writer.row("Additional Comments", ev.additionalComments);
  }

  writer.heading("Registration fee");
  writer.pairRow("Amount", `Rs ${REGISTRATION_FEE_AMOUNT}`, "Payee", REGISTRATION_FEE_PAYEE);
  writer.row("Status", "Paid. Payment screenshot is on file and is not printed on this page.");

  writer.heading("Declaration");
  writer.row("Declaration accepted", state.declaration.accepted ? "Yes" : "No");
  writer.row("Note", "The applicant has read and accepted the Declaration & Responsibility in full.");

  writer.heading("Applicant Signature");
  writer.pairRow("Name", p.fullName, "Date", formatDob(state.declaration.date));
  writer.row("Place", state.declaration.place);
  writer.y -= 6;
  writer.page.drawText("Signature", { x: MARGIN, y: writer.y, size: 8, font: bold, color: SLATE });
  writer.y -= 6;
  if (signImage) {
    writer.page.drawImage(signImage, { x: MARGIN, y: writer.y - 46, width: 150, height: 46 });
    writer.y -= 52;
  } else {
    writer.page.drawRectangle({
      x: MARGIN,
      y: writer.y - 46,
      width: 150,
      height: 46,
      borderColor: LINE,
      borderWidth: 1,
    });
    writer.y -= 52;
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
