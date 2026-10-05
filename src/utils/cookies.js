import Cookies from "js-cookie";

const RELIGION_COOKIE = "biye_religion";

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
  if (religion) {
    Cookies.set(RELIGION_COOKIE, religion, { expires: 365 });
  } else {
    Cookies.remove(RELIGION_COOKIE);
  }
};

export const removeReligionCookie = () => {
  Cookies.remove(RELIGION_COOKIE);
};
