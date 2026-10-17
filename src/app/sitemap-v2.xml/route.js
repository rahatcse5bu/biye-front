import { getSitemapEntries } from "@/lib/sitemap";

export const revalidate = 3600;

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

export async function GET() {
  const entries = (await getSitemapEntries())
    .map(({ url, lastModified, changeFrequency, priority }) =>
      [
        "  <url>",
        `    <loc>${escapeXml(url)}</loc>`,
        lastModified ? `    <lastmod>${lastModified.toISOString()}</lastmod>` : "",
        changeFrequency ? `    <changefreq>${changeFrequency}</changefreq>` : "",
        priority ? `    <priority>${priority}</priority>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
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
