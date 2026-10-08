import type { APIRoute } from 'astro';
import { langs, pageOrder, routes } from '../data/routes';

// Lists the twelve pages for search engines, each with its other-language twin.
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;

  const entries = pageOrder.flatMap((key) =>
    langs.map(
      (lang) => `  <url>
    <loc>${url(routes[key][lang])}</loc>
${langs.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${url(routes[key][code])}"/>`).join('\n')}
  </url>`,
    ),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
