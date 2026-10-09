import Cookies from "js-cookie";

const RELIGION_COOKIE = "biye_religion";
const CONSENT_COOKIE = "biye_consent";
// TODO: bump when cookie categories change so everyone is asked again.
const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "biye:consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "biye:open-cookie-settings";

export const getConsent = () => {
  try {
    const consent = JSON.parse(Cookies.get(CONSENT_COOKIE) || "null");
    return consent?.v === CONSENT_VERSION ? consent : null;
  } catch {
    return null;
  }
};

export const hasConsent = (category) => Boolean(getConsent()?.[category]);

export const saveConsent = ({ preferences }) => {
  const consent = { v: CONSENT_VERSION, preferences: Boolean(preferences), at: new Date().toISOString() };
  Cookies.set(CONSENT_COOKIE, JSON.stringify(consent), { expires: 180, sameSite: "lax" });
  // TODO: withdrawing consent also deletes what that category already stored.
  if (!consent.preferences) Cookies.remove(RELIGION_COOKIE);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
};

export const getToken = () => {
  const token = Cookies.get("token");
  return token ? { token } : null;
};

// TODO: Lax (not Strict) so the cookie still arrives on the redirect back from bKash; Secure on https only.
const tokenCookieOptions = () => ({
  expires: 30,
  sameSite: "lax",
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
});

export const setToken = (tokenInfo) => {
  if (tokenInfo?.token) {
    Cookies.set("token", tokenInfo.token, tokenCookieOptions());
  } else {
    Cookies.remove("token");
  }
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const getReligionCookie = () => {
  return Cookies.get(RELIGION_COOKIE) || null;
};

export const setReligionCookie = (religion) => {
  if (religion && hasConsent("preferences")) {
    Cookies.set(RELIGION_COOKIE, religion, { expires: 365 });
  } else {
    Cookies.remove(RELIGION_COOKIE);
  }
};

export const removeReligionCookie = () => {
  Cookies.remove(RELIGION_COOKIE);
};
