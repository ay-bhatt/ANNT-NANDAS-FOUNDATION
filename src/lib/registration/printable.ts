import { REGISTRATION_TYPE_META, SPORT_OPTIONS } from "./constants";
import { DECLARATION_CLAUSES, DECLARATION_TITLE } from "./declaration";
import type { RegistrationFormState, RegistrationType } from "./types";
import { typeLabel } from "./validation";

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

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="width:38%;padding:9px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:9px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;font-weight:600;vertical-align:top;">${value}</td>
    </tr>
  `;
}

function section(title: string, rows: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      <tr>
        <td style="padding:12px 14px;background:#0f172a;color:#ffffff;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">
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

function sportLabel(state: RegistrationFormState): string {
  if (state.sports.sport === "other") return state.sports.otherSport || "Other";
  const found = SPORT_OPTIONS.find((item) => item.id === state.sports.sport);
  return found?.label || state.sports.sport || "Not provided";
}

function categorySpecificRows(state: RegistrationFormState): string {
  if (state.type === "volunteer") {
    const v = state.volunteer;
    return section(
      "Volunteer Information",
      [
        row("Volunteer Name", display(v.volunteerName)),
        row("Skills / Expertise", display(v.skills)),
        row("Category / Role", display(v.roles.join(", "))),
        row("Other Skill / Role", display(v.otherRole)),
        row("Subjects They Can Teach", display(v.subjects)),
        row("Experience", display(v.experience)),
        row("Why They Want to Volunteer", display(v.motivation)),
        row("Preferred Location", display(v.preferredLocation)),
        row(
          "Volunteer Timing",
          "Assigned by the foundation according to the activity, location, and operational requirements",
        ),
        row(
          "Food & Stay",
          "Provided by the foundation according to the volunteering activity and location",
        ),
        row("Preferred Duration", display(v.duration === "Specific duration" ? v.customDuration : v.duration)),
        row("Additional Requirements", display(v.otherSupport)),
        row("Additional Comments", display(v.additionalComments)),
      ].join(""),
    );
  }

  if (state.type === "membership") {
    const m = state.membership;
    return section(
      "Membership Information",
      [
        row("Membership Type", display(m.membershipType)),
        row("Areas of Interest", display(m.areasOfInterest.join(", "))),
        row("Contribution", display(m.contribution)),
        row("How They Heard About Us", display(m.howHeard)),
        row("Emergency Contact", display(m.emergencyName)),
        row("Emergency Phone", display(m.emergencyPhone)),
        row("Additional Comments", display(m.additionalComments)),
      ].join(""),
    );
  }

  if (state.type === "sports") {
    const s = state.sports;
    return section(
      "Sports Information",
      [
        row("Sport", display(sportLabel(state))),
        row("Category", display(s.category)),
        row("Experience Level", display(s.experienceLevel)),
        row("Previous Participation", display(s.previousParticipation)),
        row("Emergency Contact", display(s.emergencyName)),
        row("Emergency Phone", display(s.emergencyPhone)),
        row("Medical Information", display(s.medicalInfo)),
        row("Medically Fit", s.medicallyFit ? "Yes" : "No"),
        row("T-shirt Size", display(s.tshirtSize)),
        row("Additional Comments", display(s.additionalComments)),
      ].join(""),
    );
  }

  if (state.type === "employee") {
    const e = state.employee;
    return section(
      "Employment Information",
      [
        row("Position Applied For", display(e.position)),
        row("Qualifications", display(e.qualifications)),
        row("Experience", display(e.experience)),
        row("Availability to Join", display(e.availabilityToJoin)),
        row("Why They Want to Join", display(e.whyJoin)),
        row("Additional Comments", display(e.additionalComments)),
      ].join(""),
    );
  }

  const ev = state.event;
  return section(
    "Event Information",
    [
      row("Event / Activity", display(ev.eventInterest)),
      row("Participation Mode", display(ev.participationMode)),
      row("Emergency Contact", display(ev.emergencyName)),
      row("Emergency Phone", display(ev.emergencyPhone)),
      row("Additional Comments", display(ev.additionalComments)),
    ].join(""),
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
  const contact = [personal.phone, personal.email, personal.whatsapp ? `WhatsApp: ${personal.whatsapp}` : ""]
    .filter(Boolean)
    .join(" · ");

  const photoBlock = photoSrc
    ? `<img src="${photoSrc}" alt="Applicant photograph" style="width:118px;height:142px;object-fit:cover;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;" />`
    : `<div style="width:118px;height:142px;border:1px dashed #94a3b8;border-radius:8px;background:#f8fafc;color:#64748b;font-size:11px;text-align:center;line-height:142px;">No photo</div>`;

  const signatureBlock = signatureSrc
    ? `<img src="${signatureSrc}" alt="Applicant signature" style="width:180px;height:78px;object-fit:contain;border:1px solid #cbd5e1;border-radius:8px;background:#ffffff;padding:6px;" />`
    : `<div style="width:180px;height:78px;border:1px dashed #94a3b8;border-radius:8px;background:#f8fafc;color:#64748b;font-size:11px;text-align:center;line-height:78px;">No signature</div>`;

  const clauses = DECLARATION_CLAUSES.map(
    (clause, index) =>
      `<p style="margin:0 0 8px;font-size:12px;line-height:1.55;color:#334155;"><strong>${index + 1}. ${escapeHtml(clause.title)}.</strong> ${escapeHtml(clause.body)}</p>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ANNT NANDAS FOUNDATION · ${escapeHtml(meta.label)} · ${escapeHtml(registrationId)}</title>
  <style>
    @page { margin: 14mm; }
    body { margin: 0; padding: 0; background: ${mode === "email" ? "#e2e8f0" : "#ffffff"}; }
    @media print {
      body { background: #ffffff !important; }
      .no-print { display: none !important; }
      a { color: inherit !important; text-decoration: none !important; }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${mode === "email" ? "#e2e8f0" : "#ffffff"};padding:${mode === "email" ? "18px 10px" : "0"};">
    <tr>
      <td align="center">
        <table width="720" cellpadding="0" cellspacing="0" style="max-width:720px;width:100%;background:#ffffff;border:1px solid #dbe3ee;overflow:hidden;">
          <tr>
            <td style="padding:22px 24px 18px;background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 58%,#059669 100%);color:#ffffff;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#dbeafe;">Official Registration Record</p>
              <h1 style="margin:0;font-size:26px;line-height:1.15;letter-spacing:0.04em;">ANNT NANDAS FOUNDATION</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#d1fae5;">From the Heart of the Himalayas · Building Futures Without Limits</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">Registration Type</p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;">${escapeHtml(typeLabel(type))}</p>
                  </td>
                  <td style="vertical-align:top;text-align:right;">
                    <p style="margin:0 0 4px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">Reference Number</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#1d4ed8;">${escapeHtml(registrationId)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:10px;font-size:12px;color:#475569;">Submitted: ${escapeHtml(submitted)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 24px 8px;">
              ${section(
                "Personal Information",
                [
                  row("Name", display(personal.fullName)),
                  row("Father’s Name", display(personal.fatherName)),
                  row("Mother’s Name", display(personal.motherName)),
                  row("Date of Birth", formatDate(personal.dob)),
                  row("Age", display(personal.age)),
                  row("Gender", display(personal.gender)),
                  row("Blood Group", display(personal.bloodGroup)),
                  row("Education", display(personal.education)),
                  row("Special Education / Qualification", display(personal.specialEducation)),
                  row("Occupation", display(personal.occupation)),
                  row("Nationality", display(personal.nationality)),
                  row("Address", display(personal.address)),
                  row("Contact Information", display(contact)),
                ].join(""),
              )}
              ${categorySpecificRows(state)}
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
                <tr>
                  <td style="padding:12px 14px;background:#0f172a;color:#ffffff;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">
                    Photograph, Signature &amp; Declaration
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 14px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="38%" style="vertical-align:top;padding-right:12px;">
                          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">Photograph</p>
                          ${photoBlock}
                        </td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">Signature</p>
                          ${signatureBlock}
                          <p style="margin:14px 0 0;font-size:13px;color:#0f172a;"><strong>Date:</strong> ${formatDate(state.declaration.date)}</p>
                          <p style="margin:6px 0 0;font-size:13px;color:#0f172a;"><strong>Place:</strong> ${display(state.declaration.place)}</p>
                          <p style="margin:6px 0 0;font-size:13px;color:#0f172a;"><strong>Declaration accepted:</strong> ${state.declaration.accepted ? "Yes" : "No"}</p>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:16px;padding-top:12px;border-top:1px solid #e2e8f0;">
                      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0f172a;">${escapeHtml(DECLARATION_TITLE)}</p>
                      ${clauses}
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 18px;font-size:11px;line-height:1.6;color:#64748b;">
                This document was generated from the ANNT NANDAS FOUNDATION website registration system.
                It is intended as an official printable record for administrative review.
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
    @page { margin: 16mm; }
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
