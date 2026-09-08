import { REGISTRATION_FEE_PAYEE, REGISTRATION_TYPE_META, SPORT_OPTIONS, registrationFeeFor, registrationRequiresPayment } from "./constants";
import { DECLARATION_CLAUSES, DECLARATION_TITLE } from "./declaration";
import { formatMembershipDate, membershipPeriodFrom, membershipStatusAt, membershipStatusLabel } from "./membership";
import type { PersonalInformation, RegistrationFormState, RegistrationType } from "./types";
import { formatAadhaarNumber, formatDob, typeLabel } from "./validation";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function display(value: unknown, fallback = "Not provided"): string {
  const text = String(value ?? "").trim();
  return text ? escapeHtml(text) : fallback;
}

function filled(value: unknown): boolean {
  return Boolean(String(value ?? "").trim());
}

function formatDate(value: string): string {
  if (!value) return "Not provided";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function cell(label: string, value: string, span = false): string {
  const width = span ? 'width="21%"' : 'width="21%"';
  const valueWidth = span ? 'width="79%"' : 'width="29%"';
  return `<td ${width} style="padding:2px 6px;border-bottom:1px solid #e2e8f0;border-right:1px solid #e2e8f0;color:#475569;font-size:9.5px;line-height:1.25;vertical-align:top;">${escapeHtml(label)}</td><td ${valueWidth} colspan="${span ? 3 : 1}" style="padding:2px 6px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:9.5px;line-height:1.25;font-weight:700;vertical-align:top;">${value}</td>`;
}

function pairRow(left: [string, string], right?: [string, string]): string {
  if (!right) {
    return `<tr>${cell(left[0], left[1], true)}</tr>`;
  }
  return `<tr>${cell(left[0], left[1])}${cell(right[0], right[1])}</tr>`;
}

function rowsFromPairs(entries: Array<[string, string] | { label: string; value: string; span: true } | null>): string {
  const html: string[] = [];
  const compact = entries.filter((entry): entry is [string, string] | { label: string; value: string; span: true } => Boolean(entry));
  for (let i = 0; i < compact.length; i += 1) {
    const current = compact[i];
    if (!Array.isArray(current)) {
      html.push(pairRow([current.label, current.value]));
      continue;
    }
    const next = compact[i + 1];
    if (next && Array.isArray(next)) {
      html.push(pairRow(current, next));
      i += 1;
    } else {
      html.push(pairRow(current));
    }
  }
  return html.join("");
}

function section(title: string, rows: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 5px;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;background:#ffffff;">
      <tr>
        <td style="padding:4px 8px;background:#0f172a;color:#ffffff;font-size:9.5px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">
          ${escapeHtml(title)}
        </td>
      </tr>
      <tr>
        <td style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td>
      </tr>
    </table>
  `;
}

function personalRows(personal: PersonalInformation): string {
  const contact = [personal.phone, personal.email, personal.whatsapp ? `WhatsApp: ${personal.whatsapp}` : ""]
    .filter(Boolean)
    .join(" · ");

  return rowsFromPairs([
    ["Name", display(personal.fullName)],
    ["Father’s Name", display(personal.fatherName)],
    ["Mother’s Name", display(personal.motherName)],
    ["Date of Birth", escapeHtml(formatDob(personal.dob))],
    ["Age", display(personal.age)],
    ["Gender", display(personal.gender)],
    ["Blood Group", display(personal.bloodGroup)],
    filled(personal.education) ? ["Education", display(personal.education)] : null,
    filled(personal.specialEducation) ? ["Special Education", display(personal.specialEducation)] : null,
    filled(personal.occupation) ? ["Occupation", display(personal.occupation)] : null,
    filled(personal.nationality) ? ["Nationality", display(personal.nationality)] : null,
    ["PIN Code", display(personal.pinCode)],
    ["Post Office", display(personal.postOffice)],
    ["Tehsil", display(personal.tehsil)],
    ["District", display(personal.district)],
    ["State", display(personal.state)],
    ["Country", display(personal.country)],
    { label: "Address", value: display(personal.address), span: true },
    { label: "Contact Information", value: display(contact), span: true },
    ["Emergency contact", display(personal.emergencyName)],
    ["Relation", display(personal.emergencyRelation)],
    { label: "Emergency number", value: display(personal.emergencyPhone), span: true },
  ]);
}

function sportLabel(state: RegistrationFormState): string {
  if (state.sports.sport === "other") return state.sports.otherSport || "Other";
  const found = SPORT_OPTIONS.find((item) => item.id === state.sports.sport);
  return found?.label || state.sports.sport || "Not provided";
}

function categorySpecificRows(state: RegistrationFormState, submittedAt?: string): string {
  if (state.type === "volunteer") {
    const v = state.volunteer;
    return section(
      "Volunteer Information",
      rowsFromPairs([
        ["Volunteer Name", display(v.volunteerName)],
        ["Skills / Expertise", display(v.skills)],
        ["Category / Role", display(v.roles.join(", "))],
        filled(v.otherRole) ? ["Other Skill / Role", display(v.otherRole)] : null,
        filled(v.subjects) ? ["Subjects They Can Teach", display(v.subjects)] : null,
        filled(v.experience) ? ["Experience", display(v.experience)] : null,
        ["Preferred Location", display(v.preferredLocation)],
        ["Preferred Duration", display(v.duration === "Specific duration" ? v.customDuration : v.duration)],
        { label: "Why They Want to Volunteer", value: display(v.motivation), span: true },
        filled(v.otherSupport) ? { label: "Additional Requirements", value: display(v.otherSupport), span: true } : null,
        filled(v.additionalComments) ? { label: "Additional Comments", value: display(v.additionalComments), span: true } : null,
      ]),
    );
  }

  if (state.type === "membership") {
    const m = state.membership;
    const period = membershipPeriodFrom(submittedAt || new Date().toISOString());
    return section(
      "Membership Information",
      rowsFromPairs([
        ["Membership Type", display(m.membershipType)],
        ["Membership Fee", `₹${period.feeAmount}`],
        ["Validity", period.validityLabel],
        ["Membership Start Date", formatMembershipDate(period.startDate)],
        ["Membership Expiry Date", formatMembershipDate(period.expiryDate)],
        ["Membership Status", membershipStatusLabel(membershipStatusAt(period.expiryDate))],
        filled(m.howHeard) ? ["How They Heard About Us", display(m.howHeard)] : null,
        { label: "Areas of Interest", value: display(m.areasOfInterest.join(", ")), span: true },
        { label: "Contribution", value: display(m.contribution), span: true },
        filled(m.additionalComments) ? { label: "Additional Comments", value: display(m.additionalComments), span: true } : null,
      ]),
    );
  }

  if (state.type === "sports") {
    const s = state.sports;
    return section(
      "Sports Information",
      rowsFromPairs([
        ["Sport", display(sportLabel(state))],
        ["Category", display(s.category)],
        ["Experience Level", display(s.experienceLevel)],
        filled(s.tshirtSize) ? ["T-shirt Size", display(s.tshirtSize)] : null,
        ["Medically Fit", s.medicallyFit ? "Yes" : "No"],
        filled(s.previousParticipation) ? ["Previous Participation", display(s.previousParticipation)] : null,
        filled(s.medicalInfo) ? { label: "Medical Information", value: display(s.medicalInfo), span: true } : null,
        filled(s.additionalComments) ? { label: "Additional Comments", value: display(s.additionalComments), span: true } : null,
      ]),
    );
  }

  if (state.type === "employee") {
    const e = state.employee;
    return section(
      "Employment Information",
      rowsFromPairs([
        ["Position Applied For", display(e.position)],
        filled(e.availabilityToJoin) ? ["Availability to Join", display(e.availabilityToJoin)] : null,
        { label: "Qualifications", value: display(e.qualifications), span: true },
        filled(e.experience) ? { label: "Experience", value: display(e.experience), span: true } : null,
        { label: "Why They Want to Join", value: display(e.whyJoin), span: true },
        filled(e.additionalComments) ? { label: "Additional Comments", value: display(e.additionalComments), span: true } : null,
      ]),
    );
  }

  if (state.type === "talent-hunt") {
    const t = state.talentHunt;
    return section(
      "Runner Talent Hunt Program",
      rowsFromPairs([
        ["Talent category", display(t.talentCategory === "Other" ? t.otherTalent : t.talentCategory)],
        ["School name", display(t.schoolName)],
        ["Class studying in", display(t.classGrade)],
        ["Aadhaar number", display(formatAadhaarNumber(t.aadhaarNumber))],
        ["Parent / consultant name", display(t.parentName)],
        ["Relation", display(t.parentRelation)],
        ["Parent phone", display(t.parentPhone)],
        filled(t.parentEmail) ? { label: "Parent email", value: display(t.parentEmail), span: true } : null,
        { label: "Why they want to take part", value: display(t.whyParticipate), span: true },
        filled(t.previousAchievements) ? { label: "Previous achievements", value: display(t.previousAchievements), span: true } : null,
        filled(t.additionalComments) ? { label: "Additional comments", value: display(t.additionalComments), span: true } : null,
      ]),
    );
  }

  const ev = state.event;
  return section(
    "Event Information",
    rowsFromPairs([
      ["Event / Activity", display(ev.eventInterest)],
      ["Participation Mode", display(ev.participationMode)],
      filled(ev.additionalComments) ? { label: "Additional Comments", value: display(ev.additionalComments), span: true } : null,
    ]),
  );
}

export function buildPrintableHtml(options: {
  state: RegistrationFormState;
  registrationId: string;
  submittedAt?: string;
  photoSrc?: string;
  signatureSrc?: string;
  mode?: "email" | "document";
}): string {
  const { state, registrationId, photoSrc, signatureSrc, mode = "document" } = options;
  const type = (state.type || "event") as RegistrationType;
  const meta = REGISTRATION_TYPE_META[type];
  const submitted = options.submittedAt
    ? new Date(options.submittedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })
    : new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" });

  const personal = state.personal;

  const photoBlock = photoSrc
    ? `<img src="${photoSrc}" alt="Applicant photograph" style="width:78px;height:96px;object-fit:cover;border:1px solid #cbd5e1;border-radius:4px;background:#f8fafc;" />`
    : `<div style="width:78px;height:96px;border:1px dashed #94a3b8;border-radius:4px;background:#f8fafc;color:#64748b;font-size:9px;text-align:center;line-height:96px;">No photo</div>`;

  const signatureBlock = signatureSrc
    ? `<img src="${signatureSrc}" alt="Applicant signature" style="width:140px;height:40px;object-fit:contain;border:1px solid #cbd5e1;border-radius:4px;background:#ffffff;padding:2px;" />`
    : `<div style="width:140px;height:40px;border:1px dashed #94a3b8;border-radius:4px;background:#f8fafc;color:#64748b;font-size:9px;text-align:center;line-height:40px;">No signature</div>`;

  const feeAmount = registrationFeeFor(type);
  const paid = registrationRequiresPayment(type);
  const membershipPeriod = type === "membership" ? membershipPeriodFrom(options.submittedAt || new Date().toISOString()) : null;
  const feeRows = paid
    ? rowsFromPairs([
        type === "membership" ? ["Membership Fee", `₹${feeAmount}`] : ["Amount", `₹${feeAmount}`],
        type === "membership" ? ["Validity", membershipPeriod?.validityLabel || "1 Year"] : null,
        ["Payee", display(REGISTRATION_FEE_PAYEE)],
        ["Status", "Paid · payment screenshot on file (not printed)"],
      ])
    : rowsFromPairs([
        ["Amount", "Free"],
        ["Status", "No payment required"],
      ]);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ANNT NANDAS FOUNDATION · ${escapeHtml(meta.label)} · ${escapeHtml(registrationId)}</title>
  <style>
    @page { size: A4 portrait; margin: 8mm; }
    html, body { margin: 0; padding: 0; background: ${mode === "email" ? "#e2e8f0" : "#ffffff"}; }
    body { font-family: Arial, Helvetica, sans-serif; color: #0f172a; }
    .sheet { width: 100%; max-width: 190mm; }
    @media print {
      html, body { background: #ffffff !important; width: 210mm; height: 297mm; overflow: hidden; }
      .sheet { page-break-after: avoid; page-break-inside: avoid; }
      .no-print { display: none !important; }
      a { color: inherit !important; text-decoration: none !important; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${mode === "email" ? "#e2e8f0" : "#ffffff"};padding:${mode === "email" ? "8px" : "0"};">
    <tr>
      <td align="center">
        <table class="sheet" width="720" cellpadding="0" cellspacing="0" style="max-width:720px;width:100%;background:#ffffff;border:1px solid #dbe3ee;overflow:hidden;">
          <tr>
            <td style="padding:6px 10px;background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 58%,#059669 100%);color:#ffffff;">
              <p style="margin:0;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#dbeafe;">Official Registration Record · One page</p>
              <h1 style="margin:1px 0 0;font-size:15px;line-height:1.15;letter-spacing:0.04em;">ANNT NANDAS FOUNDATION</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:5px 10px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Registration Type</p>
                    <p style="margin:1px 0 0;font-size:12px;font-weight:700;color:#0f172a;">${escapeHtml(typeLabel(type))}</p>
                    <p style="margin:2px 0 0;font-size:9px;color:#475569;">Submitted: ${escapeHtml(submitted)}</p>
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <p style="margin:0;font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Reference Number</p>
                    <p style="margin:1px 0 0;font-size:12px;font-weight:700;color:#1d4ed8;">${escapeHtml(registrationId)}</p>
                  </td>
                  <td width="90" align="right" style="padding-left:10px;">${photoBlock}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 10px 4px;">
              <h2 style="margin:0 0 4px;font-size:14px;line-height:1.15;color:#0f172a;">${display(personal.fullName)}</h2>
              ${section("Personal Information", personalRows(personal))}
              ${categorySpecificRows(state, options.submittedAt)}
              ${section("Registration fee & identity", feeRows)}
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 4px;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;background:#ffffff;">
                <tr>
                  <td style="padding:3px 8px;background:#0f172a;color:#ffffff;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;">
                    ${escapeHtml(DECLARATION_TITLE)} &amp; Signature
                  </td>
                </tr>
                <tr>
                  <td style="padding:5px 8px 6px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:bottom;">
                          <p style="margin:0 0 3px;font-size:8.5px;color:#334155;">Declaration accepted: <strong>${state.declaration.accepted ? "Yes" : "No"}</strong>. The applicant has read and accepted the Declaration &amp; Responsibility in full.</p>
                          ${signatureBlock}
                          <p style="margin:3px 0 0;font-size:9px;color:#0f172a;"><strong>Name:</strong> ${display(personal.fullName)}</p>
                        </td>
                        <td style="vertical-align:bottom;text-align:right;">
                          <p style="margin:0 0 3px;font-size:9px;color:#0f172a;"><strong>Date:</strong> ${formatDate(state.declaration.date)}</p>
                          <p style="margin:0;font-size:9px;color:#0f172a;"><strong>Place:</strong> ${display(state.declaration.place)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:8px;line-height:1.3;color:#64748b;">
                One-page record from the ANNT NANDAS FOUNDATION registration system. Aadhaar card image and payment screenshot are stored privately and attached to the office email, not printed here.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildDeclarationHtml(): string {
  const clauses = DECLARATION_CLAUSES.map(
    (clause, index) =>
      `<div style="margin:0 0 14px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:14px;background:#ffffff;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#0f172a;">${index + 1}. ${escapeHtml(clause.title)}</p>
        <p style="margin:0;font-size:13px;line-height:1.65;color:#334155;">${escapeHtml(clause.body)}</p>
      </div>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ANNT NANDAS FOUNDATION · Declaration &amp; Responsibility</title>
  <style>
    @page { size: A4 portrait; margin: 16mm; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #0f172a; background: #ffffff; }
    @media print { .no-print { display: none !important; } }
  </style>
</head>
<body>
  <div style="max-width:760px;margin:0 auto;padding:28px 22px;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1d4ed8;">ANNT NANDAS FOUNDATION</p>
    <h1 style="margin:0 0 8px;font-size:28px;">Declaration &amp; Responsibility</h1>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:#475569;">
      This declaration applies to every registration submitted to ANNT NANDAS FOUNDATION, including volunteer, membership, sports, event, and team applications.
    </p>
    ${clauses}
    <div style="margin-top:24px;padding:16px;border:1px solid #cbd5e1;border-radius:14px;">
      <p style="margin:0 0 18px;font-size:13px;line-height:1.65;color:#334155;">I have read, understood, and accept this Declaration &amp; Responsibility in full.</p>
      <p style="margin:0 0 28px;font-size:13px;">Applicant signature: ______________________________</p>
      <p style="margin:0;font-size:13px;">Date: ____________________ &nbsp;&nbsp; Place: ____________________</p>
    </div>
  </div>
</body>
</html>`;
}

export function formatSubmittedAt(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" });
}
