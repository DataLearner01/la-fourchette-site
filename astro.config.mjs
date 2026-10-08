import { defineConfig } from 'astro/config';

// The public address of the site. It is used for share cards, the sitemap and
// search-engine tags. PLACEHOLDER: set SITE_URL (or edit the fallback) to the
// real address before publishing, e.g. the Vercel domain.
const site = process.env.SITE_URL ?? process.env.URL ?? process.env.CF_PAGES_URL ?? 'https://la-fourchette.example';
// (URL est fournie par Netlify, CF_PAGES_URL par Cloudflare Pages : l'adresse publique est détectée toute seule.)

// Sub-folder the site is served from. Empty (root) by default; on GitHub Pages
// the deploy workflow sets BASE_PATH to the repository name, e.g. /la-fourchette-site
const base = process.env.BASE_PATH || '/';

// Static output: every page is a real HTML file with its own URL.
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  server: { port: 4321, host: '127.0.0.1' },
  devToolbar: { enabled: false },
});
