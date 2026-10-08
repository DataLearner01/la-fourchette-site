import { defineConfig } from 'astro/config';

// The public address of the site. It is used for share cards, the sitemap and
// search-engine tags. PLACEHOLDER: set SITE_URL (or edit the fallback) to the
// real address before publishing, e.g. the Vercel domain.
const site = process.env.SITE_URL ?? 'https://la-fourchette.example';

// Static output: every page is a real HTML file with its own URL.
export default defineConfig({
  site,
  trailingSlash: 'ignore',
  server: { port: 4321, host: '127.0.0.1' },
  devToolbar: { enabled: false },
});
