// Test u pregledniku (Playwright). Pokretanje: vidi docs/PROVJERE.md.
import { chromium } from 'playwright';
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const results = [];
const check = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);
const errors = [];
const newPage = async (opts = {}) => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ...opts });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  return page;
};

// Kalkulator
{
  const page = await newPage();
  await page.goto(BASE + '/korisni-alati#kalkulator');
  const value = () => page.locator('[data-calc-breakeven]').innerText();
  check('kalkulator: prazno → placeholder', await page.locator('[data-calc-placeholder]').isVisible());
  await page.fill('#calc-f', '2.000'); await page.fill('#calc-v', '40'); await page.fill('#calc-d', '0');
  check('kalkulator: F=2.000 V=40 D=0 → 3.333,33 KM', (await value()) === '3.333,33 KM', await value());
  await page.fill('#calc-d', '1.000');
  const target = await page.locator('[data-calc-target]').innerText();
  check('kalkulator: D=1.000 → 5.000,00 KM', target === '5.000,00 KM', target);
  await page.fill('#calc-v', '0'); await page.fill('#calc-d', '');
  check('kalkulator: V=0 → prag = F', (await value()) === '2.000,00 KM', await value());
  check('kalkulator: prazan D → bez cilja', await page.locator('[data-calc-target-wrap]').isHidden());
  await page.fill('#calc-f', '0'); await page.fill('#calc-v', '50');
  check('kalkulator: F=0 → 0', (await value()) === '0,00 KM', await value());
  await page.fill('#calc-f', '2000'); await page.fill('#calc-v', '100');
  check('kalkulator: V=100 → nema praga', await page.locator('[data-calc-nothreshold]').isVisible());
  await page.fill('#calc-v', '37,5'); await page.fill('#calc-f', '1.000');
  check('kalkulator: decimalni zarez 37,5 → 1.600,00', (await value()) === '1.600,00 KM', await value());
  const slider = await page.locator('input[data-sync="variablePct"]').inputValue();
  check('kalkulator: klizač prati unos', slider === '37' || slider === '38' || slider === '37.5', slider);
  await page.fill('#calc-f', '-5');
  check('kalkulator: negativno → greška', (await page.locator('#calc-f-err').innerText()).includes('negativan'));
  check('kalkulator: aria-invalid', (await page.getAttribute('#calc-f', 'aria-invalid')) === 'true');
  await page.fill('#calc-f', '');
  check('kalkulator: prazno F nakon unosa → poruka', (await page.locator('#calc-f-err').innerText()).length > 0);
  await page.locator('input[data-sync="fixed"]').fill('3000');
  check('kalkulator: klizač postavlja broj', (await page.inputValue('#calc-f')) === '3000');
  await page.click('button[type="reset"]');
  await page.waitForTimeout(100);
  check('kalkulator: reset briše unos', (await page.inputValue('#calc-f')) === '' && await page.locator('[data-calc-placeholder]').isVisible());
  check('kalkulator: URL bez unosa', !page.url().includes('2000') && !page.url().includes('?'));
  await page.close();
}

// Vodič
{
  const page = await newPage();
  await page.goto(BASE + '/korisni-alati');
  const g = page.locator('#vodic');
  check('vodič: Nazad skriven na 1. koraku', await g.locator('[data-guide-back]').isHidden());
  await g.locator('[data-guide-next]').click();
  check('vodič: bez odabira → poruka', (await g.locator('[data-guide-error]').innerText()).length > 0);
  await g.locator('label.option', { hasText: 'Pokrećem posao' }).click();
  await g.locator('[data-guide-next]').click();
  check('vodič: korak 2', (await g.locator('[data-guide-progress]').innerText()) === 'Korak 2 od 3');
  await g.locator('label.option', { hasText: 'Poslovni plan' }).click();
  await g.locator('[data-guide-back]').click();
  check('vodič: povratak čuva odabir', await g.locator('input[value="pokrecem"]').isChecked());
  await g.locator('[data-guide-next]').click();
  check('vodič: odabir na koraku 2 sačuvan', await g.locator('input[value="plan"]').isChecked());
  await g.locator('[data-guide-next]').click();
  await g.locator('label.option', { hasText: 'Još ne poslujem' }).click();
  await g.locator('[data-guide-next]').click();
  check('vodič: rezultat prikazan', await g.locator('[data-guide-result]').isVisible());
  const recs = await g.locator('[data-guide-recs] li a').allInnerTexts();
  check('vodič: preporuke', recs[0] === 'Registracija firmi, obrta i udruženja' && recs.includes('Poslovni projekti i planiranje'), recs.join(' | '));
  const href = await g.locator('[data-guide-cta]').getAttribute('href');
  check('vodič: CTA s uslugom', href === '/kontakt?usluga=registracija-firmi-obrta-udruzenja#upit', href);
  check('vodič: lista za prvi razgovor', (await g.locator('[data-guide-prepare] li').count()) > 2);
  await g.locator('[data-guide-restart]').click();
  check('vodič: promjena odgovora vraća na korak 1 s odabirom', (await g.locator('[data-guide-progress]').innerText()) === 'Korak 1 od 3' && await g.locator('input[value="pokrecem"]').isChecked());
  await page.close();
}

// Konfigurator → kontakt
{
  const page = await newPage();
  await page.goto(BASE + '/korisni-alati#konfigurator');
  await page.locator('[data-config] button[type="submit"]').click();
  check('konfigurator: prazno → poruka', (await page.locator('[data-config-error]').innerText()).length > 0);
  await page.locator('[data-config] label.option', { hasText: 'Obrt ili samostalna' }).click();
  await page.locator('[data-config] label.choice', { hasText: '21–50' }).click();
  await page.locator('[data-config] input[name="zaposleni"][value="1–5"]').check();
  await page.locator('[data-config] input[name="pdv"][value="Nisam siguran/na"]').check();
  await page.locator('[data-config] label.option', { hasText: 'Računovodstvo i knjigovodstvo' }).click();
  const summary = await page.locator('[data-config-list]').innerText();
  check('konfigurator: sažetak', summary.includes('Obrt') && summary.includes('21–50') && summary.includes('Nisam siguran'), summary.replace(/\n/g, ' / '));
  check('konfigurator: nema cijene', !(await page.locator('[data-config]').innerText()).match(/\d+\s?KM/));
  await page.locator('[data-config] button[type="submit"]').click();
  await page.waitForURL(/\/kontakt/);
  check('konfigurator: prelaz na kontakt s uslugom', page.url().endsWith('/kontakt?usluga=racunovodstvo#upit'), page.url());
  check('kontakt: URL ne sadrži sažetak', !decodeURIComponent(page.url()).includes('21–50'));
  check('kontakt: sažetak prikazan', await page.locator('[data-summary]').isVisible());
  check('kontakt: usluga unaprijed odabrana', (await page.inputValue('#cf-service')) === 'racunovodstvo');
  await page.click('[data-summary-remove]');
  check('kontakt: sažetak uklonjen', await page.locator('[data-summary]').isHidden());
  await page.reload();
  check('kontakt: uklonjen sažetak ne vraća se', await page.locator('[data-summary]').isHidden());
  await page.close();
}

// Forma: validacija i greška slanja (server bez konfiguracije)
{
  const page = await newPage();
  await page.goto(BASE + '/kontakt');
  check('forma: telefon skriven kad je odabran e-mail', await page.locator('#cf-phone').isHidden());
  await page.click('[data-submit]');
  check('forma: greške uz polja', (await page.locator('#cf-name-err').innerText()).length > 0 && (await page.locator('#cf-email-err').innerText()).length > 0);
  check('forma: fokus na prvo neispravno polje', await page.evaluate(() => document.activeElement?.id) === 'cf-name');
  check('forma: status za čitače ekrana', (await page.locator('[data-status]').innerText()).includes('Provjerite'));
  await page.locator('label.choice', { hasText: 'Telefonom' }).click();
  check('forma: odabir telefona prikazuje polje telefona', await page.locator('#cf-phone').isVisible() && await page.locator('#cf-email').isHidden());
  await page.fill('#cf-name', 'Test Korisnik');
  await page.fill('#cf-phone', '+387 61 000 000');
  await page.selectOption('#cf-service', 'konzultantske-usluge');
  await page.fill('#cf-message', 'Ovo je testna poruka za provjeru forme.');
  await page.waitForTimeout(3100); // minimalno vrijeme popunjavanja
  const [resp] = await Promise.all([page.waitForResponse(r => r.url().endsWith('/api/upit')), page.click('[data-submit]')]);
  await page.waitForTimeout(200);
  check('forma: bez konfiguracije server vraća 503', resp.status() === 503, String(resp.status()));
  const statusText = await page.locator('[data-status]').innerText();
  check('forma: poruka o grešci s telefonom', statusText.includes('+387 62 675 596'), statusText);
  check('forma: unos sačuvan nakon greške', (await page.inputValue('#cf-message')).startsWith('Ovo je testna'));
  check('forma: uspjeh nije prikazan', await page.locator('[data-success]').isHidden());
  await page.close();
}

// Dvostruko slanje (mock odgovora sa zakašnjenjem)
{
  const page = await newPage();
  let hits = 0;
  await page.route('**/api/upit', async route => { hits++; await new Promise(r => setTimeout(r, 800)); await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
  await page.goto(BASE + '/kontakt');
  await page.fill('#cf-name', 'Test Korisnik'); await page.fill('#cf-email', 'test@example.invalid');
  await page.selectOption('#cf-service', 'drugo'); await page.fill('#cf-message', 'Provjera dvostrukog slanja.');
  await page.click('[data-submit]');
  check('forma: dugme onemogućeno tokom slanja', await page.locator('[data-submit]').isDisabled());
  await page.locator('[data-contact-form]').evaluate(f => f.requestSubmit());
  await page.waitForTimeout(1200);
  check('forma: samo jedan zahtjev', hits === 1, String(hits));
  check('forma: uspjeh nakon potvrde servera', await page.locator('[data-success]').isVisible());
  await page.close();
}

// Mobilni prikaz: meni i donja traka
{
  const page = await newPage({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  await page.goto(BASE + '/');
  const toggle = page.locator('[data-nav-toggle]');
  check('mobilni meni: zatvoren', (await toggle.getAttribute('aria-expanded')) === 'false' && await page.locator('#glavni-meni').isHidden());
  await toggle.click();
  check('mobilni meni: otvoren', (await toggle.getAttribute('aria-expanded')) === 'true' && await page.locator('#glavni-meni').isVisible());
  await page.waitForTimeout(350); // kraj animacije otvaranja
  const panelBox = await page.locator('#glavni-meni').boundingBox();
  check('mobilni meni: pokriva ekran ispod zaglavlja', panelBox && panelBox.y + panelBox.height >= 800 - 1 && panelBox.height > 500, JSON.stringify(panelBox));
  await page.keyboard.press('Escape');
  check('mobilni meni: Escape zatvara', (await toggle.getAttribute('aria-expanded')) === 'false');
  const bar = page.locator('[data-mobile-bar]');
  check('donja traka vidljiva', await bar.isVisible());
  const h1Box = await page.locator('h1').boundingBox();
  const ctaBox = await page.locator('.hero__actions .btn').first().boundingBox();
  const imgBox = await page.locator('.hero__media').boundingBox();
  check('mobitel: naslov i CTA prije slike', h1Box.y < imgBox.y && ctaBox.y < imgBox.y && ctaBox.y + ctaBox.height < 800);
  await page.goto(BASE + '/kontakt#upit');
  await page.waitForTimeout(500);
  check('donja traka skrivena kad je forma na ekranu', await bar.evaluate(el => el.classList.contains('is-hidden')));
  const pad = await page.evaluate(() => getComputedStyle(document.body).paddingBottom);
  check('tijelo ima prostor ispod sadržaja', parseInt(pad) >= 64, pad);
  await page.close();
}

// FAQ
{
  const page = await newPage();
  await page.goto(BASE + '/');
  const item = page.locator('.faq__item').first();
  check('FAQ: zatvoren', !(await item.evaluate(el => el.open)));
  await item.locator('summary').click();
  check('FAQ: otvoren i sadržaj vidljiv', await item.evaluate(el => el.open) && await item.locator('.faq__a').isVisible());
  await page.close();
}

await browser.close();
console.log(results.join('\n'));
console.log('page errors:', errors.length ? errors : 'none');
