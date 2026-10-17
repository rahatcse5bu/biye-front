'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { CONSENT_EVENT, getConsent } from '@/utils/cookies';
import { FB_PIXEL_ID, GA_ID, loadFbq, loadGtag, loadTtq, trackEvent } from '@/utils/analytics';

// TODO: GA and the Pixel write cookies on the apex domain, so clear both host and apex copies.
const clearCookies = (match) => {
  const apex = window.location.hostname.replace(/^www\./, '');
  Object.keys(Cookies.get())
    .filter(match)
    .forEach((name) => {
      Cookies.remove(name);
      Cookies.remove(name, { domain: `.${apex}` });
    });
};

// TODO: both tags auto-track App Router navigations via history.pushState, so no route listener is needed.
export default function Analytics() {
  const [consent, setConsent] = useState();
  const pathname = usePathname();

  useEffect(() => {
    setConsent(getConsent());
    const sync = (event) => setConsent(event.detail);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const loaded = consent !== undefined;
  const analytics = Boolean(GA_ID && consent?.analytics);
  const marketing = Boolean(FB_PIXEL_ID && consent?.marketing);
  const tiktokMarketing = Boolean(consent?.marketing);

  // TODO: a loaded script can't be unloaded, so withdrawing consent disables it and deletes its cookies.
  useEffect(() => {
    if (!loaded || !GA_ID) return;
    window[`ga-disable-${GA_ID}`] = !analytics;
    if (analytics) loadGtag();
    else clearCookies((name) => name.startsWith('_ga'));
  }, [loaded, analytics]);

  useEffect(() => {
    if (!loaded || !FB_PIXEL_ID) return;
    if (marketing) {
      loadFbq()('consent', 'grant');
    } else {
      window.fbq?.('consent', 'revoke');
      clearCookies((name) => name === '_fbp');
    }
  }, [loaded, marketing]);

  useEffect(() => {
    if (!loaded) return;
    if (tiktokMarketing) {
      const ttq = loadTtq();
      ttq?.enableCookie();
      ttq?.grantConsent();
    } else {
      window.ttq?.revokeConsent();
      window.ttq?.disableCookie();
      clearCookies((name) => name === '_ttp' || name.startsWith('ttcsid'));
    }
  }, [loaded, tiktokMarketing]);

  // TODO: one capture-phase listener reports every button/link click; data-track renames it, first text line only so card details stay out.
  useEffect(() => {
    if (!GA_ID && !FB_PIXEL_ID) return;
    const onClick = (event) => {
      const video = event.target.closest?.('.yt-lite:not(.lyt-activated)');
      if (video) trackEvent('video_start', { video_title: video.dataset.title || video.getAttribute('aria-label') || '' });
      const el = event.target.closest?.('a, button, [role="button"], [data-track]');
      if (!el) return;
      const text = el.dataset.trackLabel || el.getAttribute('aria-label') || el.innerText || '';
      trackEvent(el.dataset.track || 'ui_click', {
        link_text: text.trim().split('\n')[0].slice(0, 60),
        link_url: el.href || undefined,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // TODO: scroll milestones reset on every route, since App Router navigations keep the same window.
  useEffect(() => {
    if (!GA_ID) return;
    const seen = new Set();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = (window.scrollY / max) * 100;
      [25, 50, 75, 100].forEach((mark) => {
        if (percent >= mark - 1 && !seen.has(mark)) {
          seen.add(mark);
          trackEvent('scroll_depth', { percent: mark });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
