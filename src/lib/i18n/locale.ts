export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "anf-locale";
export const LOCALE_STORAGE_KEY = "anf-locale";
export const HOME_CONTENT_RESTORE_EVENT = "anf:restore-home-content";
export const HOME_CONTENT_HIDE_MS = 6000;

export const ORG_NAME_EN = "ANNT NANDAS FOUNDATION";
export const ORG_NAME_HI = "अनंत नन्दा फाउण्डेशन";
export const ORG_SHORT_EN = "ANNT NANDAS";
export const ORG_FOUNDATION_EN = "Foundation";

export function parseLocale(value: string | null | undefined): Locale {
  return value === "hi" ? "hi" : "en";
}

export function localeLang(locale: Locale): string {
  return locale === "hi" ? "hi" : "en-IN";
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore private-mode storage errors
  }
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // ignore
  }
}

export function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = localeLang(locale);
  document.documentElement.classList.toggle("lang-hi", locale === "hi");
}

export function dispatchHomeContentRestore() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(HOME_CONTENT_RESTORE_EVENT));
}
