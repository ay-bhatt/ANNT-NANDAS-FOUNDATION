import { HI } from "./hi";
import { DEFAULT_LOCALE, type Locale } from "./locale";

export {
  DEFAULT_LOCALE,
  HOME_CONTENT_HIDE_MS,
  HOME_CONTENT_RESTORE_EVENT,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  ORG_FOUNDATION_EN,
  ORG_NAME_EN,
  ORG_NAME_HI,
  ORG_SHORT_EN,
  applyDocumentLocale,
  dispatchHomeContentRestore,
  localeLang,
  parseLocale,
  persistLocale,
} from "./locale";
export type { Locale } from "./locale";

const SKIP_KEYS = new Set([
  "href",
  "image",
  "src",
  "imageSrc",
  "videoSrc",
  "email",
  "phone1",
  "phone2",
  "upiId",
  "qrImage",
  "icon",
  "color",
  "id",
  "kind",
  "year",
  "value",
  "founded",
  "registered",
  "facebook",
  "instagram",
  "youtube",
  "code",
  "accent",
  "tan",
  "registrationNo",
  "darpanId",
  "registration12A",
  "registration80G",
  "payeeName",
  "shortName",
  "name",
  "hindiName",
  "founder",
  "address",
  "day",
  "month",
  "time",
]);

function looksLikeUrl(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.includes("@") && !value.includes(" ")
  );
}

export function translate(locale: Locale, text: string): string {
  if (!text || locale === DEFAULT_LOCALE) return text;
  return HI[text] ?? text;
}

export function localizeValue<T>(value: T, locale: Locale, key?: string): T {
  if (locale === DEFAULT_LOCALE || value == null) return value;
  if (key && SKIP_KEYS.has(key)) return value;
  if (typeof value === "string") {
    if (value === "photo" || value === "video") return value;
    if (looksLikeUrl(value)) return value;
    return translate(locale, value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, locale, key)) as T;
  }
  if (typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [entryKey, entryValue] of Object.entries(value as Record<string, unknown>)) {
      next[entryKey] = localizeValue(entryValue, locale, entryKey);
    }
    return next as T;
  }
  return value;
}
