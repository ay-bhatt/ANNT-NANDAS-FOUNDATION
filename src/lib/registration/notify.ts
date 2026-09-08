import type { Attachment } from "nodemailer/lib/mailer";
import { isValidEmail, typeLabel } from "./validation";
import { buildPrintableHtml } from "./printable";
import { parseImageDataUrl } from "./image-bytes";
import type { RegistrationFormState } from "./types";
import { isSmtpConfigured, mailFromAddress, officeEmailAddresses, sendMail } from "@/lib/mail";

export interface RegistrationEmailResult {
  sentToOffice: boolean;
  sentToApplicant: boolean;
  pdfAttached: boolean;
  error?: string;
}

function applicantConfirmationHtml(options: {
  state: RegistrationFormState;
  registrationId: string;
  submittedAt: string;
}): string {
  const { state, registrationId, submittedAt } = options;
  const name = state.personal.fullName || "Applicant";
  const when = new Date(submittedAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" });
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:24px;background:#e2e8f0;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #dbe3ee;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 58%,#059669 100%);color:#ffffff;">
              <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#dbeafe;">ANNT NANDAS FOUNDATION</p>
              <h1 style="margin:6px 0 0;font-size:22px;">Registration received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">Dear ${escapeText(name)},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
                Thank you. Your ${escapeText(typeLabel(state.type))} application has been received.
                A PDF copy of your registration form is attached to this email.
              </p>
              <p style="margin:0 0 6px;font-size:13px;color:#475569;">Reference number</p>
              <p style="margin:0 0 14px;font-size:18px;font-weight:700;color:#1d4ed8;">${escapeText(registrationId)}</p>
              <p style="margin:0 0 6px;font-size:13px;color:#475569;">Submitted</p>
              <p style="margin:0 0 18px;font-size:15px;font-weight:700;">${escapeText(when)}</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:#475569;">
                Please keep this email and the attached PDF for your records. The foundation will contact you if anything further is needed.
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

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function buildPdfOrHtml(state: RegistrationFormState, registrationId: string, submittedAt: string) {
  try {
    const { buildRegistrationPdf } = await import("./pdf");
    const pdfBuffer = await buildRegistrationPdf({ state, registrationId, submittedAt });
    if (pdfBuffer?.length) {
      return {
        pdfAttached: true,
        attachment: {
          filename: `${registrationId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        } satisfies Attachment,
      };
    }
  } catch (pdfError) {
    console.error("REGISTRATION PDF WARNING:", pdfError);
  }

  return {
    pdfAttached: false,
    attachment: {
      filename: `${registrationId}.html`,
      content: buildPrintableHtml({
        state,
        registrationId,
        submittedAt,
        photoSrc: state.photograph?.dataUrl,
        signatureSrc: state.signature?.dataUrl,
        mode: "document",
      }),
      contentType: "text/html",
    } satisfies Attachment,
  };
}

export async function sendRegistrationEmails(options: {
  state: RegistrationFormState;
  registrationId: string;
  submittedAt: string;
}): Promise<RegistrationEmailResult> {
  const { state, registrationId, submittedAt } = options;
  if (!isSmtpConfigured()) {
    const message = "SMTP is not configured, so the registration email was not sent.";
    console.error("REGISTRATION EMAIL WARNING:", message);
    return { sentToOffice: false, sentToApplicant: false, pdfAttached: false, error: message };
  }

  const photoParsed = state.photograph ? parseImageDataUrl(state.photograph.dataUrl) : null;
  const signatureParsed = state.signature ? parseImageDataUrl(state.signature.dataUrl) : null;
  const aadhaarParsed = state.aadhaar ? parseImageDataUrl(state.aadhaar.dataUrl) : null;
  const paymentParsed = state.paymentProof ? parseImageDataUrl(state.paymentProof.dataUrl) : null;
  const photoCid = "photograph@registration";
  const signatureCid = "signature@registration";
  const formCopy = await buildPdfOrHtml(state, registrationId, submittedAt);

  const officeAttachments: Attachment[] = [
    photoParsed
      ? {
          filename: `${registrationId}-photograph.${photoParsed.ext}`,
          content: photoParsed.buffer,
          contentType: photoParsed.mime,
          cid: photoCid,
        }
      : null,
    signatureParsed
      ? {
          filename: `${registrationId}-signature.${signatureParsed.ext}`,
          content: signatureParsed.buffer,
          contentType: signatureParsed.mime,
          cid: signatureCid,
        }
      : null,
    aadhaarParsed
      ? {
          filename: `${registrationId}-aadhaar.${aadhaarParsed.ext}`,
          content: aadhaarParsed.buffer,
          contentType: aadhaarParsed.mime,
        }
      : null,
    paymentParsed
      ? {
          filename: `${registrationId}-payment.${paymentParsed.ext}`,
          content: paymentParsed.buffer,
          contentType: paymentParsed.mime,
        }
      : null,
    formCopy.attachment,
  ].filter((item): item is Attachment => Boolean(item));

  const officeHtml = buildPrintableHtml({
    state,
    registrationId,
    submittedAt,
    photoSrc: photoParsed ? `cid:${photoCid}` : undefined,
    signatureSrc: signatureParsed ? `cid:${signatureCid}` : undefined,
    mode: "email",
  });

  const officeTo = officeEmailAddresses();
  const subject = `New ${typeLabel(state.type)} Registration · ${registrationId} · ANNT NANDAS FOUNDATION`;
  const from = mailFromAddress();
  const applicantEmail = state.personal.email.trim();
  const applicantIsOffice = officeTo.some((email) => email.toLowerCase() === applicantEmail.toLowerCase());

  const result: RegistrationEmailResult = {
    sentToOffice: false,
    sentToApplicant: false,
    pdfAttached: formCopy.pdfAttached,
  };

  try {
    await sendMail({
      from,
      to: officeTo,
      replyTo: applicantEmail || undefined,
      subject,
      html: officeHtml,
      attachments: officeAttachments,
    });
    result.sentToOffice = true;
  } catch (officeError) {
    console.error("REGISTRATION OFFICE EMAIL ERROR:", officeError);
    try {
      await sendMail({
        from,
        to: officeTo,
        replyTo: applicantEmail || undefined,
        subject,
        html: officeHtml,
        attachments: [formCopy.attachment],
      });
      result.sentToOffice = true;
    } catch (retryError) {
      result.error = retryError instanceof Error ? retryError.message : "Office registration email failed.";
      console.error("REGISTRATION EMAIL WARNING:", retryError);
      return result;
    }
  }

  if (isValidEmail(applicantEmail) && !applicantIsOffice) {
    try {
      await sendMail({
        from,
        to: applicantEmail,
        subject: `Your ${typeLabel(state.type)} registration · ${registrationId} · ANNT NANDAS FOUNDATION`,
        html: applicantConfirmationHtml({ state, registrationId, submittedAt }),
        attachments: [formCopy.attachment],
      });
      result.sentToApplicant = true;
    } catch (applicantError) {
      console.error("REGISTRATION APPLICANT EMAIL WARNING:", applicantError);
      result.error = applicantError instanceof Error ? applicantError.message : "Applicant confirmation email failed.";
    }
  } else if (isValidEmail(applicantEmail) && applicantIsOffice) {
    result.sentToApplicant = result.sentToOffice;
  }

  return result;
}
