// Test u pregledniku (Playwright). Pokretanje: vidi docs/PROVJERE.md.
import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const LOG = process.argv[2];
const results = [];
const check = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
const entries = () => fs.existsSync(LOG) ? fs.readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : [];

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE + '/racunovodstvo#upit');
check('podstranica: usluga unaprijed odabrana', (await page.inputValue('#cf-service')) === 'racunovodstvo');
await page.fill('#cf-name', 'Test Korisnik');
await page.fill('#cf-company', 'Test d.o.o.');
await page.fill('#cf-email', 'posjetilac@example.invalid');
await page.fill('#cf-message', 'Zanima me vođenje knjiga za malu firmu.');
await page.waitForTimeout(3100);
const [resp] = await Promise.all([page.waitForResponse(r => r.url().endsWith('/api/upit')), page.click('[data-submit]')]);
await page.waitForTimeout(300);
check('slanje: server 200 nakon prihvata', resp.status() === 200, String(resp.status()));
check('slanje: prikaz uspjeha', await page.locator('[data-success]').isVisible());
const sent = entries().at(-1);
check('pružalac: jedan zahtjev', entries().length === 1, String(entries().length));
check('pružalac: API ključ samo na serveru', sent?.auth === 'Bearer test_key_lokalno');
check('pružalac: predmet s uslugom', sent?.body.subject === 'Upit s weba: Računovodstvo i knjigovodstvo — Test Korisnik', sent?.body.subject);
check('pružalac: reply-to posjetilac', sent?.body.reply_to === 'posjetilac@example.invalid');
check('pružalac: primalac iz konfiguracije', JSON.stringify(sent?.body.to) === '["primalac@example.invalid"]');
check('pružalac: pošiljalac verifikovan', sent?.body.from === 'Web ACCOUNT <upit@example.invalid>');
check('pružalac: samo tekst (bez HTML-a)', typeof sent?.body.text === 'string' && !('html' in (sent?.body ?? {})));
const html = await page.content();
check('preglednik: ključ nije izložen', !html.includes('test_key_lokalno'));
await browser.close();

// Direktni HTTP testovi
const post = (fields, headers = {}) => fetch(BASE + '/api/upit', { method: 'POST', body: new URLSearchParams(fields), headers: { Accept: 'application/json', Origin: BASE, ...headers }, redirect: 'manual' });
const valid = { name: 'Test Korisnik', contactMethod: 'telefon', phone: '+387 61 000 000', service: 'drugo', message: 'Provjera direktnog slanja.' };

let before = entries().length;
let r = await post({ ...valid, adresa_2: 'http://spam.example' });
check('honeypot: tihi uspjeh bez slanja', r.status === 200 && entries().length === before);
r = await post({ ...valid, started_at: String(Date.now()) });
check('prebrzo popunjavanje: bez slanja', r.status === 200 && entries().length === before);
r = await post(valid, { Origin: 'https://zlonamjerno.example' });
check('tuđe porijeklo: 403', r.status === 403, String(r.status));
r = await post({ ...valid, phone: '' });
const body = await r.json();
check('serverska validacija: 422 s porukom uz polje', r.status === 422 && body.errors?.phone, JSON.stringify(body.errors));
r = await fetch(BASE + '/api/upit', { method: 'POST', body: new URLSearchParams(valid), headers: { Origin: BASE }, redirect: 'manual' });
check('bez JS-a: 303 na potvrdu', r.status === 303 && r.headers.get('location') === '/kontakt/poslano', `${r.status} ${r.headers.get('location')}`);
r = await fetch(BASE + '/api/upit', { method: 'GET' });
check('GET nije dozvoljen', r.status === 405, String(r.status));
// Ograničenje: do sada je sa ovog IP-a prihvaćeno slanje iz preglednika + 1 validacija + 1 bez JS-a => nastavljamo do blokade
let codes = [];
for (let i = 0; i < 6; i++) codes.push((await post(valid)).status);
check('ograničenje učestalosti: 429 nakon 5 zahtjeva', codes.includes(429), codes.join(','));
console.log(results.join('\n'));
console.log('ukupno poziva pružaocu:', entries().length);
