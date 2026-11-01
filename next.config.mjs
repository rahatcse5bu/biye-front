import { createRequire } from "module";
import path from "path";
import { backendUrl } from "./src/lib/backendUrl.js";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.gstatic.com https://connect.facebook.net https://analytics.tiktok.com`,
  "style-src 'self' 'unsafe-inline' https://accounts.google.com https://fonts.maateen.me",
  "font-src 'self' data: https://fonts.maateen.me",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  `connect-src 'self' https: wss:${isDevelopment ? " http://localhost:5000 ws:" : ""}`,
  "frame-src 'self' https://accounts.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

// TODO: public/ files have no content hash, so they get 30 days instead of immutable.
const staticAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=2592000, stale-while-revalidate=86400",
  },
];

const nextConfig = {
  poweredByHeader: false,

  // TODO: production builds drop console.log/info/debug (they printed user and payment data); errors and warnings stay.
  compiler: {
    removeConsole: isDevelopment ? false : { exclude: ["error", "warn"] },
  },

  webpack(config) {
    config.resolve.alias.ably = path.join(
      path.dirname(require.resolve("ably")),
      "ably.min.js",
    );
    return config;
  },

  async redirects() {
    return [
      // TODO: robots.txt names sitemap-v2.xml; the old path forwards there so Google sees one sitemap.
      {
        source: "/sitemap.xml",
        destination: "/sitemap-v2.xml",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "bibaho.org" }],
        destination: "https://www.bibaho.org/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "pncnikah.com" }],
        destination: "https://www.bibaho.org/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pncnikah.com" }],
        destination: "https://www.bibaho.org/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: staticAssetHeaders,
      },
      {
        source: "/:file(logo\\.png|logo-192\\.png|logo-512\\.png|og-image\\.png|fav\\.svg|pnc-nikah\\.ico)",
        headers: staticAssetHeaders,
      },
    ];
  },
};

export default nextConfig;
