const urls = [
  'https://www.biye.info/',
  'https://www.biye.info/biodatas',
  'https://www.biye.info/biodata-submit',
  'https://www.biye.info/points-package',
  'https://www.biye.info/about-us',
  'https://www.biye.info/contact-us',
  'https://www.biye.info/faq',
  'https://www.biye.info/privacy-policy',
  'https://www.biye.info/refund-policy',
  'https://www.biye.info/terms-and-condition',
];

export const dynamic = 'force-static';

export function GET() {
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
