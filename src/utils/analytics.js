import { hasConsent } from "@/utils/cookies";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// TODO: our names follow GA4; these map to Meta standard events, other names go to Meta as custom events.
const META_EVENTS = {
  sign_up: "CompleteRegistration",
  view_item: "ViewContent",
  biodata_submitted: "SubmitApplication",
  proposal_sent: "Lead",
  contact_form_submitted: "Contact",
  add_to_wishlist: "AddToWishlist",
  search: "Search",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

const loadScript = (src) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

// TODO: both loaders install a queueing stub first, so events fired before the real script arrives aren't lost.
export const loadGtag = () => {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }
  return window.gtag;
};

export const loadFbq = () => {
  if (!window.fbq) {
    const fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    Object.assign(fbq, { push: fbq, loaded: true, version: "2.0", queue: [] });
    window.fbq = window._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", FB_PIXEL_ID);
    fbq("track", "PageView");
  }
  return window.fbq;
};

// TODO: GA gets every event; Meta skips generic ui_click so clicks don't drown out conversions.
export const trackEvent = (name, params = {}) => {
  if (typeof window === "undefined") return;
  if (GA_ID && hasConsent("analytics")) loadGtag()("event", name, params);
  if (FB_PIXEL_ID && hasConsent("marketing") && name !== "ui_click") {
    const metaEvent = META_EVENTS[name];
    loadFbq()(metaEvent ? "track" : "trackCustom", metaEvent || name, params);
  }
};

// TODO: Google auth both logs in and creates accounts, so an account made in the last 5 minutes counts as a sign-up.
export const trackAuth = (user, method) => {
  const isNew = Date.now() - new Date(user?.createdAt).getTime() < 5 * 60_000;
  trackEvent(isNew ? "sign_up" : "login", { method });
};
