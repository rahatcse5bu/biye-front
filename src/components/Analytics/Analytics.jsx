'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Cookies from 'js-cookie';
import { CONSENT_EVENT, getConsent } from '@/utils/cookies';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

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

  useEffect(() => {
    setConsent(getConsent());
    const sync = (event) => setConsent(event.detail);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const loaded = consent !== undefined;
  const analytics = Boolean(GA_ID && consent?.analytics);
  const marketing = Boolean(FB_PIXEL_ID && consent?.marketing);

  // TODO: a loaded script can't be unloaded, so withdrawing consent disables it and deletes its cookies.
  useEffect(() => {
    if (!loaded || !GA_ID) return;
    window[`ga-disable-${GA_ID}`] = !analytics;
    if (!analytics) clearCookies((name) => name.startsWith('_ga'));
  }, [loaded, analytics]);

  useEffect(() => {
    if (!loaded || !FB_PIXEL_ID) return;
    window.fbq?.('consent', marketing ? 'grant' : 'revoke');
    if (!marketing) clearCookies((name) => name === '_fbp');
  }, [loaded, marketing]);

  return (
    <>
      {analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {marketing && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
