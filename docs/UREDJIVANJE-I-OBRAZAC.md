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

1. Originalnu datoteku (npr. `Logo.png` ili `logo.svg`) staviti u `public/brand/`.
2. U `src/data/site.ts` postaviti, npr.: `logo: { src: '/brand/Logo.png', width: 600, height: 240 }` (stvarne dimenzije datoteke).
3. Zaglavlje, podnožje i strukturirani podaci tada koriste originalni znak u izvornim proporcijama. Znak se ne crta iznova i ne preuzima s fotografija.
4. Favicon (`public/favicon.svg`) je privremen. Zamijeniti ga ikonom izvedenom iz originalnog logotipa.

## Slike

Izvornici su u `source-images/`. Nakon zamjene izvornika pokrenuti:

```bash
npm run images
```

Skripta `scripts/optimize-images.mjs` pravi AVIF i WebP varijante u više širina, mobilni kadar heroja 4:5 i OG sliku 1200×630. Kadrovi su birani tako da logo i ključni motiv ostanu u slici. Žarište za uže okvire podešava se u `src/components/ResponsiveImage.astro` (`focal`). Alt opise mijenjati u `src/data/services.ts` i na stranicama.

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
