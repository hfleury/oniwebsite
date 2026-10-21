// Mirrors LanguageDropdown.tsx's document.cookie pattern for the "lang"
// cookie: same Path/Max-Age/SameSite/conditional-Secure shape, one year.
const COOKIE_CONSENT = "cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Fired on window after every consent write, so code outside the banner
// (analytics) can react without the banner knowing about it.
export const CONSENT_CHANGE_EVENT = "cookieconsentchange";

export type ConsentValue = "accepted" | "rejected";

export function readCookieConsent(): ConsentValue | null {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT}=`))
    ?.slice(COOKIE_CONSENT.length + 1);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function writeCookieConsent(value: ConsentValue) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT}=${value}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

export function hasOptionalConsent(): boolean {
  return readCookieConsent() === "accepted";
}
