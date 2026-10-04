const urls = [
  "https://www.bibaho.org/",
  "https://www.bibaho.org/biodatas",
  "https://www.bibaho.org/biodata-submit",
  "https://www.bibaho.org/points-package",
  "https://www.bibaho.org/about-us",
  "https://www.bibaho.org/contact-us",
  "https://www.bibaho.org/faq",
  "https://www.bibaho.org/privacy-policy",
  "https://www.bibaho.org/refund-policy",
  "https://www.bibaho.org/terms-and-condition",
];

export const dynamic = "force-static";

export function GET() {
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
