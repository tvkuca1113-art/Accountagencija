// Test u pregledniku (Playwright). Pokretanje: vidi docs/PROVJERE.md.
import { chromium } from 'playwright';
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const paths = ['/', '/usluge', '/racunovodstvo', '/konzultantske-usluge', '/zastupanje-inostranih-poduzeca', '/registracija-firmi-obrta-udruzenja', '/poslovni-projekti', '/o-nama', '/kontakt', '/korisni-alati', '/savjeti', '/savjeti/prihod-i-dobit-nisu-isto', '/politika-privatnosti', '/kontakt/poslano', '/nepostojeca-stranica'];
const widths = [360, 390, 768, 1024, 1440];
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const problems = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
  for (const p of paths) {
    const page = await ctx.newPage();
    page.on('pageerror', e => problems.push(`${w} ${p} pageerror ${e.message}`));
    page.on('console', m => { if (m.type() === 'error' && !m.text().includes('404')) problems.push(`${w} ${p} console ${m.text()}`); });
    const resp = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    if (p === '/nepostojeca-stranica' ? resp.status() !== 404 : resp.status() !== 200) problems.push(`${w} ${p} status ${resp.status()}`);
    const r = await page.evaluate(() => {
      const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll('body *')].filter(el => { const b = el.getBoundingClientRect(); return b.width > 0 && (b.right > innerWidth + 1) && getComputedStyle(el).position !== 'fixed' && !el.closest('.cform__trap, .visually-hidden, .skip-link, .planes'); }).slice(0, 3).map(el => el.tagName + '.' + el.className);
      const h1s = document.querySelectorAll('h1').length;
      const imgsNoAlt = [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length;
      const inputsNoLabel = [...document.querySelectorAll('input:not([type=hidden]), select, textarea')].filter(i => !i.closest('.cform__trap') && !i.hidden && !(i.labels?.length) && !i.getAttribute('aria-label') && !i.closest('label')).map(i => i.name);
      const canonical = document.querySelector('link[rel=canonical]')?.href;
      const title = document.title;
      return { over, wide, h1s, imgsNoAlt, inputsNoLabel, canonical, title };
    });
    if (r.over > 0) problems.push(`${w} ${p} horizontal overflow ${r.over}px ${r.wide.join(', ')}`);
    if (r.h1s !== 1) problems.push(`${w} ${p} h1 count ${r.h1s}`);
    if (r.imgsNoAlt) problems.push(`${w} ${p} img without alt ${r.imgsNoAlt}`);
    if (r.inputsNoLabel.length) problems.push(`${w} ${p} unlabeled ${r.inputsNoLabel}`);
    if (w === 1440) console.log(p.padEnd(40), '|', r.title, '|', r.canonical);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'NO PROBLEMS');
