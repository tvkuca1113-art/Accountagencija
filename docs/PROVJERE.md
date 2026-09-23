# Sažetak izvršenih provjera

Stanje: 23. 9. 2026. Provjere su izvršene lokalno, u razvojnom okruženju; pregledna verzija je objavljena na Vercelu (vercel.app adresa), ne na produkcijskoj domeni.

**Izmjene nakon prvog pregleda na iPhoneu:** ispravljen mobilni meni (backdrop-filter na zaglavlju pravio je okvir za `position: fixed`, pa se meni nije širio preko ekrana; sada je zamućenje na pseudo-elementu i test provjerava visinu menija). Početna je redizajnirana: tamni hero u bojama znaka s fotografijom koja izranja iz pozadine, blagim uvećanjem i paralaksom, animiranim sjajem, linijama poslovne knjige i trima plohama; brojke se broje pri prikazu; sekcije se blago pojavljuju pri skrolanju. Sve animacije se gase uz `prefers-reduced-motion`, a bez JavaScripta sadržaj je odmah vidljiv.

## Radi i testirano

**Build i kod**
- `npm run build` — uspješan (Astro 7.3.4, adapter @astrojs/vercel 11).
- `npm run check` — 0 grešaka, 0 upozorenja.
- `npm audit` — 0 ranjivosti (u `package.json` je `overrides` koji podiže `path-to-regexp` u `@vercel/routing-utils` na 6.3.0 zbog GHSA-9wv6-86v2-598j; ukloniti kad adapter sam ažurira zavisnost).
- `npm test` — 22/22 testa: formula kalkulatora (svi primjeri iz specifikacije), decimalni zarez, prazno, negativno, 100 %; validacija upita; sastav e-maila (predmet s uslugom, Reply-To, samo tekst); slanje bez konfiguracije se ne simulira; greška pružaoca; ograničenje učestalosti.

**Preglednik (Playwright, Chromium) — `tests/e2e/`**
- Kalkulator: F=2.000, V=40 %, D=0 → 3.333,33 KM; D=1.000 → 5.000,00 KM; V=0 → prag = F; F=0 → 0; V=100 % → objašnjenje bez praga; 37,5 → ispravno; klizači i brojčani unos usklađeni; greške uz polja i `aria-invalid`; reset; unosi se ne pojavljuju u URL-u.
- Vodič: validacija svakog koraka, povratak čuva odabire, rezultat bez traženja kontakta, CTA vodi na formu s unaprijed odabranom uslugom.
- Konfigurator: sažetak bez cijene, prenos u formu preko `sessionStorage` (ne preko URL-a), sažetak vidljiv i uklonjiv prije slanja.
- Forma: greške uz polja i fokus na prvo neispravno; prikazuje se samo polje za odabrani način kontakta; dugme onemogućeno tokom slanja, samo jedan zahtjev pri dvostrukom slanju; uspjeh tek nakon potvrde servera; pri grešci (503) unos ostaje i nudi se telefon.
- Tok slanja s lažnim Resend serverom (bez slanja pravih e-mailova): server šalje jedan zahtjev pružaocu, ključ ostaje na serveru i ne pojavljuje se u pregledniku, predmet sadrži uslugu, Reply-To je posjetilac, primalac i pošiljalac su iz konfiguracije.
- Server: honeypot i prebrzo popunjavanje → tiho odbijanje bez slanja; tuđe porijeklo → 403; serverska validacija → 422 s porukama po poljima; slanje bez JavaScripta → 303 na `/kontakt/poslano`; GET → 405; šesti zahtjev u prozoru → 429.
- Mobilni meni (`aria-expanded`, Escape, pokriva cijeli ekran ispod zaglavlja), FAQ (`<details>`), donja traka „Pozovite / Pošaljite upit“ (skriva se kad je forma na ekranu ili je polje u fokusu; tijelo ima prostor ispod sadržaja; safe-area).
- Na mobitelu su naslov i primarni CTA iznad slike i unutar prvog ekrana.
- Sidra (`/racunovodstvo#upit`, `/kontakt#upit`, `/korisni-alati#kalkulator`) staju ispod ljepljivog zaglavlja.
- Tastatura: link za preskakanje na sadržaj, vidljiv fokus na svim linkovima.
- 15 stranica × 5 širina (360, 390, 768, 1024, 1440 px): nema horizontalnog preljeva ni grešaka u konzoli; svaka stranica ima tačno jedan H1, sve slike imaju `alt`, sva polja imaju labelu; 404 vraća status 404.
- Vizuelni pregled snimaka ekrana: početna, usluge, podstranica usluge, O nama, kontakt, korisni alati, članak (desktop i mobitel).

**SEO i brzina — laboratorijsko mjerenje (Lighthouse 13, lokalni statički server, simulirani mobitel)**

| Stranica | Performanse | Pristupačnost | Najbolje prakse | LCP | CLS | TBT |
|---|---|---|---|---|---|---|
| `/` (novi hero s animacijama) | 99 | 100 | 100 | 2,1 s | 0 | 0 ms |
| `/racunovodstvo` | 99 | 100 | 100 | 1,8 s | 0 | 0 ms |
| `/korisni-alati` | 99 | 100 | 100 | 1,8 s | 0 | 0 ms |

SEO: 100 uz `PUBLIC_ALLOW_INDEXING=true`; u demo načinu je niži samo zbog namjernog `noindex`. Laboratorijsko mjerenje služi za otkrivanje problema i **nije dokaz** da će LCP ≤ 2,5 s, INP ≤ 200 ms i CLS ≤ 0,1 biti ostvareni na 75. percentilu stvarnih posjeta. To se mjeri nakon objave (npr. Vercel Speed Insights ili CrUX).

- Canonical bez parametara na svakoj stranici; zaseban title, opis i H1; sitemap bez preusmjerenja i noindex stranica; JSON-LD `AccountingService` (adresa, telefoni, e-mail, Instagram i Facebook), `Service` i `BreadcrumbList` na podstranicama, `Article` na člancima — bez ocjena, radnog vremena i certifikata.
- Vercel pravila: 301 za stare URL-ove (vidi `docs/MAPA-URL.md`), 308 za završnu kosu crtu, 404 za nepostojeće.

**Slike:** hero 49–66 KB (AVIF/WebP, 4 širine + mobilni kadar 4:5), kartice 38–84 KB na najvećoj širini. Eksplicitne dimenzije, hero učitan prioritetno, ostale odgođeno. Logo u scenama provjeren nakon kompresije i kadriranja.

## Nije verifikovano / čeka pristup ili potvrdu

- **Stvarna isporuka e-maila nije verifikovana.** Nema Resend ključa ni potvrđenog primaoca. Potreban je kontrolisani test uz saglasnost agencije (vidi `docs/UREDJIVANJE-I-OBRAZAC.md`).
- Sadržaj starih podstranica i originalni logo nisu preuzeti (pristup domeni blokiran u okruženju) — vidi `docs/SADRZAJ-I-IZVORI.md`.
- Produkcija: HTTPS, www/non-www, stara domena `accountagencija.com`, indeksiranje (`PUBLIC_ALLOW_INDEXING`) i preusmjerenja na stvarnoj domeni provjeriti nakon objave.
- Ograničenje učestalosti je po instanci serverske funkcije (vidi napomenu u uputama).
- Testirano u Chromiumu; Safari i Firefox nisu testirani u ovom okruženju.

## Kako ponoviti testove u pregledniku

```bash
npm install
npm i --no-save playwright && npx playwright install chromium
npm run dev -- --port 4321 --host 127.0.0.1           # u drugom terminalu
node tests/e2e/alati-i-forma.mjs                      # server bez konfiguracije slanja
node tests/e2e/pregled-stranica.mjs

# tok slanja s lažnim pružaocem (ne šalje e-mailove):
node tests/e2e/mock-resend.mjs /tmp/mock.log &
RESEND_API_KEY=test_key_lokalno CONTACT_FROM="Web ACCOUNT <upit@example.invalid>" \
  CONTACT_TO=primalac@example.invalid RESEND_API_URL=http://127.0.0.1:4999 \
  npm run dev -- --port 4321 --host 127.0.0.1
node tests/e2e/slanje-upita.mjs /tmp/mock.log
```
