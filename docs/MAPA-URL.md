# Mapa starih i novih URL-ova

Produkcijska domena u kodu: `https://www.agencija-account.com` (www, bez završne kose crte). Postojeći URL-ovi usluga su zadržani.

## Stari → novi

| Stari URL | Novi URL | Status |
|---|---|---|
| `/` | `/` | zadržan |
| `/index.html` | `/` | 301 |
| `/o-nama` | `/o-nama` | zadržan |
| `/o-nama.html` | `/o-nama` | 301 |
| `/racunovodstvo` | `/racunovodstvo` | zadržan |
| `/racunovodstvo.html` | `/racunovodstvo` | 301 |
| `/konzultantske-usluge` | `/konzultantske-usluge` | zadržan (H1: Poslovno i porezno savjetovanje) |
| `/konzultantske-usluge.html` | `/konzultantske-usluge` | 301 |
| `/zastupanje-inostranih-poduzeca` | `/zastupanje-inostranih-poduzeca` | zadržan |
| `/zastupanje-inostranih-poduzeca.html` | `/zastupanje-inostranih-poduzeca` | 301 |
| `/ostale-usluge` | `/usluge` | 301 — kategorija je podijeljena na dvije podstranice, obje povezane s `/usluge` |
| `/ostale-usluge.html` | `/usluge` | 301 |
| `/kontakt.html` | `/kontakt` | 301 (za slučaj da je postojao) |

Preusmjerenja su definisana u `astro.config.mjs` (`redirects`) i adapter ih pretvara u Vercel pravila sa statusom 301. Stare podstranice se **ne** preusmjeravaju na početnu. Završna kosa crta (`/usluge/`) preusmjerava se trajno na verziju bez nje (308).

**Prije objave:** popisati sve stvarne URL-ove starog weba (uključujući `.html` varijante i eventualne slike ili PDF-ove koje drugi linkuju) i dopuniti tabelu. Nije bilo moguće iz razvojnog okruženja jer je pristup domeni blokiran.

## Nove stranice

- `/usluge` — pregled svih usluga
- `/registracija-firmi-obrta-udruzenja` — iz „Ostalih usluga“
- `/poslovni-projekti` — iz „Ostalih usluga“
- `/kontakt` (+ `/kontakt/poslano`, noindex, potvrda za slanje bez JavaScripta)
- `/korisni-alati` (`#vodic`, `#konfigurator`, `#kalkulator`)
- `/savjeti` i tri članka pod `/savjeti/…`
- `/politika-privatnosti`
- `/sitemap-index.xml`, `/robots.txt`
- `/api/upit` — serverska obrada forme (nije u sitemapi, blokirano u robots.txt)

## Domene

- **www i non-www:** u Vercelu dodati obje domene i postaviti `agencija-account.com` → `www.agencija-account.com` kao trajno preusmjerenje.
- **accountagencija.com:** Facebook navodi ovu domenu, a web i Instagram `agencija-account.com`. Provjeriti ko upravlja domenom. Ako je stara domena agencije, dodati je u Vercel s trajnim preusmjerenjem na `https://www.agencija-account.com` (putanja se zadržava) i uskladiti link na Facebooku. Profile ne mijenjati bez pristupa i ovlaštenja.
- **Canonical:** svaka stranica ima canonical bez parametara, pa `?utm_…`, `?fbclid=…` i `?usluga=…` ne stvaraju zasebne URL-ove.
