import nodemailer from "nodemailer";
import type { SendMailOptions, Transporter } from "nodemailer";

const PLACEHOLDER_PASSWORDS = new Set([
  "",
  "YOUR_EMAIL_PASSWORD",
  "changeme",
  "password",
  "SMTP_PASS",
]);

/** Correct the common missing-n typo: anntanandas → anntnandas */
export function correctFoundationDomain(value: string): string {
  return String(value || "").replace(/anntanandasfoundation\.com/gi, "anntnandasfoundation.com");
}

export function isPlaceholderSmtpPassword(pass: string): boolean {
  return PLACEHOLDER_PASSWORDS.has(pass.trim());
}

export function isSmtpConfigured(): boolean {
  const host = correctFoundationDomain(process.env.SMTP_HOST || "").trim();
  const user = correctFoundationDomain(process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  return Boolean(host && user && pass && !isPlaceholderSmtpPassword(pass));
}

export function parseEmailList(value: string): string[] {
  const seen = new Set<string>();
  const emails: string[] = [];
  for (const part of value.split(/[,;\s]+/)) {
    const email = correctFoundationDomain(part).trim();
    if (!email.includes("@") || seen.has(email.toLowerCase())) continue;
    seen.add(email.toLowerCase());
    emails.push(email);
  }
  return emails;
}

export function officeEmailAddresses(): string[] {
  const fromEnv = parseEmailList(process.env.ADMIN_EMAIL || "");
  const smtpUser = parseEmailList(process.env.SMTP_USER || "");
  const fallback = parseEmailList("info@anntnandasfoundation.com");
  const merged = [...fromEnv, ...smtpUser, ...fallback];
  const seen = new Set<string>();
  return merged.filter((email) => {
    const key = email.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function smtpSettings(port: number, secure: boolean) {
  const host = correctFoundationDomain(process.env.SMTP_HOST || "").trim();
  const user = correctFoundationDomain(process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();
  return {
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 40_000,
    tls: { servername: host },
  };
}

export function createMailTransporter(portOverride?: number): Transporter {
  const port = portOverride ?? Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;
  return nodemailer.createTransport(smtpSettings(port, secure && port !== 587));
}

export function mailFromAddress(): string {
  const user = correctFoundationDomain(process.env.SMTP_USER || "").trim() || "info@anntnandasfoundation.com";
  return `"ANNT NANDAS FOUNDATION" <${user}>`;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  const primaryPort = Number(process.env.SMTP_PORT || 465);
  const transporter = createMailTransporter(primaryPort);
  try {
    await transporter.sendMail(options);
    return;
  } catch (firstError) {
    if (primaryPort === 465) {
      const fallback = createMailTransporter(587);
      await fallback.sendMail(options);
      return;
    }
    throw firstError;
  }
}
