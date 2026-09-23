// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Produkcijska domena (www). Non-www i stara domena preusmjeravaju se u postavkama hostinga — vidi docs/MAPA-URL.md.
const SITE = 'https://www.agencija-account.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // Stranice su statične (prerender); samo /api/upit radi na serveru.
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/kontakt/poslano'),
    }),
  ],
  // Pojedinačna trajna (301) preusmjerenja starih URL-ova. Postojeći URL-ovi usluga su zadržani.
  redirects: {
    '/ostale-usluge': '/usluge',
    '/ostale-usluge.html': '/usluge',
    '/index.html': '/',
    '/o-nama.html': '/o-nama',
    '/racunovodstvo.html': '/racunovodstvo',
    '/konzultantske-usluge.html': '/konzultantske-usluge',
    '/zastupanje-inostranih-poduzeca.html': '/zastupanje-inostranih-poduzeca',
    '/kontakt.html': '/kontakt',
  },
  // Kompresija bez gubitka razmaka između teksta i linkova (Astro 7 zadano koristi JSX pravila razmaka).
  compressHTML: true,
  devToolbar: { enabled: false },
});
