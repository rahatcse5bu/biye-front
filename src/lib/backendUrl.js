// TODO: server-only (next.config rewrites + server components); never import from client code or the URL ships to the browser.
export const backendUrl =
  process.env.BACKEND_API_URL?.trim() ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://biye-backend.vercel.app/api/v1');
