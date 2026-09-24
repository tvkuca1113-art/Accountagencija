# Uređivanje sadržaja i povezivanje obrasca

Stranica je izrađena u [Astro](https://astro.build) 7 (statične stranice + jedna serverska ruta za formu) s adapterom za Vercel. CMS nije uveden: sadržaj je u nekoliko preglednih TypeScript datoteka, pa izmjena teksta ne zahtijeva poznavanje ostatka koda. Svaka izmjena ide kroz pregled (pull request / preview deployment) prije objave.

## Lokalno pokretanje

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # testovi kalkulatora, validacije, slanja i ograničenja učestalosti
npm run check      # provjera tipova
npm run build      # produkcijski build (Vercel izlaz u .vercel/output)
```

Potreban je Node.js 22.12 ili noviji.

## Gdje se šta uređuje

| Sadržaj | Datoteka |
|---|---|
| Kontakti, adresa, društvene mreže, brojke (10+, 300+), logo, verifikacijske oznake | `src/data/site.ts` |
| Usluge: naslovi, opisi, obuhvat, koraci, „pripremite“, FAQ po usluzi, meta opisi | `src/data/services.ts` |
| Opća česta pitanja | `src/data/faq.ts` |
| Savjeti (članci) i kartice s Instagram objavama | `src/data/articles.ts` |
| Politika privatnosti | `src/pages/politika-privatnosti.astro` |
| Boje, tipografija, razmaci | `src/styles/global.css` (varijable na vrhu) |

Nova usluga ili članak: dodati objekt u odgovarajući niz. Stranica, sitemap i linkovi nastaju automatski. Za novu uslugu dodati i vrijednost u `SERVICE_VALUES` u `src/lib/inquiry.ts`.

Ako članak navodi porezne stope, rokove ili propise, provjeriti ih kod nadležnih službenih izvora u BiH i ažurirati polje `updated`.

## Logo

- Izvornik originalnog znaka: `source-images/brand/account-znak-original.png`.
- Web varijante: `public/brand/account-znak.png` (puna veličina, za strukturirane podatke) i `account-znak-112.png` / `.webp` (zaglavlje i podnožje). Od izvornika se razlikuju samo po uklonjenom praznom prozirnom rubu.
- Putanje i izvorne dimenzije (806×1025) upisane su u `src/data/site.ts` (`logo`). Komponenta `src/components/Logo.astro` prikazuje znak u izvornim proporcijama i naziv „ACCOUNT“ kao tekst.
- Favicon: `public/favicon-32.png`, `favicon-48.png` i `apple-touch-icon.png` (bijela pozadina), izvedeni iz istog izvornika.
- Ako agencija dostavi vektorsku verziju (SVG) ili zvaničnu kombinaciju znaka i naziva, zamijeniti datoteke i dimenzije u `site.ts`.

## Slike i motivi

- **Naslovna fotografija:** `source-images/hero-koncept/ACCOUNT-hero-koncept-bez-mosta.png`, konceptualna fotografija hercegovačkog kamena i tamnoplavog papira (bez logotipa u fotografiji). Nakon zamjene izvornika pokrenuti `npm run images`: skripta `scripts/optimize-images.mjs` pravi AVIF/WebP varijante (desktop cijela scena, mobitel kadar 4:3) i OG sliku 1200×630.
- **Motivi usluga:** `src/components/ServiceMotif.astro`, ravne SVG kompozicije izvedene iz znaka (trokut s tamnijom lijevom i svjetlijom desnom polovinom). Nova usluga dobija motiv dodavanjem grane za njen `slug`.
- **O nama:** stvarna fotografija Starog mosta (Alen Kajimović, CC0 1.0), s potpisom.
- Inscenirane fotografije iz druge serije (`source-images/v2-izvornici/`, obrađene u `source-images/account-*.png`) više se ne prikazuju; ostaju u repozitoriju, a web varijante se mogu vratiti iz git historije.

## Kontakt forma — povezivanje slanja

Forma šalje na `/api/upit`. Server provjerava porijeklo zahtjeva, honeypot polje i vrijeme popunjavanja, ograničava učestalost (5 upita u 10 minuta po IP adresi), validira polja i šalje e-mail preko [Resend](https://resend.com) API-ja. Uspjeh se prikazuje tek kad Resend prihvati poruku. Pri grešci unos ostaje u formi i nudi se telefon.

Koraci:

1. Napraviti Resend račun (ili račun koji agencija odobri) i verifikovati domenu pošiljaoca (DNS zapisi na `agencija-account.com`).
2. U Vercelu (Project → Settings → Environment Variables) postaviti:
   - `RESEND_API_KEY` — API ključ (samo server; nikad s prefiksom `PUBLIC_`)
   - `CONTACT_FROM` — npr. `Web ACCOUNT <upit@agencija-account.com>`
   - `CONTACT_TO` — primalac kojeg agencija potvrdi (više adresa odvojiti zarezom)
3. Ponovo objaviti (redeploy).
4. **Kontrolisani test isporuke:** uz saglasnost agencije poslati jedan testni upit i potvrditi da je stigao u inbox (provjeriti i spam). Ne slati testne poruke agenciji bez odobrenja.

Bez ovih varijabli forma ne glumi uspjeh: server vraća 503, a posjetilac vidi poruku da slanje trenutno nije dostupno i broj telefona.

Posjetiočev e-mail postavlja se kao `Reply-To`, a predmet poruke sadrži odabranu uslugu. Poruka je čisti tekst.

Za lokalni test bez slanja pravih e-mailova može se postaviti `RESEND_API_URL` na lažni lokalni server (vidi `docs/PROVJERE.md`).

**Ograničenje učestalosti** radi u memoriji serverske funkcije. Na Vercelu svaka instanca ima svoju memoriju, pa je to prva linija zaštite. Ako se pojavi spam, uvesti dijeljenu pohranu (npr. Upstash Redis) u `src/lib/rate-limit.ts` ili Vercel Firewall pravilo za `/api/upit`.

## Indeksiranje (demo i produkcija)

- Zadano je stranica zaštićena od indeksiranja: `<meta name="robots" content="noindex, nofollow">` i `robots.txt` s `Disallow: /`.
- **Samo u produkcijskom okruženju** postaviti `PUBLIC_ALLOW_INDEXING=true` i ponovo objaviti.
- Nakon objave provjeriti `https://www.agencija-account.com/robots.txt` i izvorni kod početne (`index, follow`). Zaštita ne smije ostati uključena u produkciji.

## Analitika

Stranica ne učitava alat za analitiku. Događaji `klik_telefon`, `otvaranje_forme`, `uspjesan_upit` i `koristenje_alata` (uz naziv alata) upisuju se u `window.dataLayer`, ako postoji, i emituju kao DOM događaj `account:analytics` (`src/scripts/analytics.ts`). Ne sadrže lične ni finansijske podatke. Iznosi iz kalkulatora nikad ne napuštaju preglednik. Prije uvođenja alata ažurirati politiku privatnosti.

## Objava na Vercel

1. Uvesti GitHub repozitorij u Vercel (framework: Astro, build `npm run build`).
2. Postaviti varijable okruženja (gore).
3. Dodati domene (`www.agencija-account.com` kao primarnu; non-www i eventualno `accountagencija.com` s preusmjerenjem) — vidi `docs/MAPA-URL.md`.
4. Provjeriti HTTPS, canonical, `robots.txt`, `sitemap-index.xml` i preusmjerenja starih URL-ova (npr. `curl -I https://www.agencija-account.com/ostale-usluge` → 301).
