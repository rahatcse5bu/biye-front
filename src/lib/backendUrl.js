// TODO: server-only (next.config rewrites + server components); never import from client code or the URL ships to the browser.
const fallback =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://biye-backend.vercel.app/api/v1';

const configured = process.env.BACKEND_API_URL?.trim().replace(/\/+$/, '');

// TODO: Vercel "Sensitive" vars arrive as "[SENSITIVE]" in CLI/CI builds; only a real http(s) URL may replace the fallback.
const isValid = Boolean(configured && /^https?:\/\/[^\s/]+/.test(configured));
if (configured && !isValid) {
  console.warn(`BACKEND_API_URL is not an http(s) URL ("${configured.slice(0, 12)}..."); using ${fallback}`);
}

export const backendUrl = isValid ? configured : fallback;
