# ACCOUNT — web stranica računovodstvene agencije (Mostar)

Redizajn stranice Računovodstvene agencije ACCOUNT: statične stranice (Astro 7) sa serverskom obradom kontakt forme, spremno za objavu na Vercelu.

```bash
npm install
npm run dev      # http://localhost:4321
npm test
npm run build
```

## Struktura

- `src/pages/` — stranice: početna, `/usluge`, pet podstranica usluga, `/o-nama`, `/kontakt`, `/korisni-alati`, `/savjeti`, `/politika-privatnosti`, `/api/upit`
- `src/data/` — sav tekstualni sadržaj (kontakti, usluge, FAQ, savjeti)
- `src/components/` — zaglavlje, podnožje, forma, vodič, konfigurator, kalkulator, animacija
- `src/lib/` — formula kalkulatora, validacija upita, slanje e-maila, ograničenje učestalosti, strukturirani podaci
- `source-images/` — izvorne slike; `public/images/` — optimizirane varijante (`npm run images`)
- `tests/` — jedinični testovi (`npm test`) i testovi u pregledniku (`tests/e2e/`)

## Dokumentacija

- [Uređivanje sadržaja i povezivanje obrasca](docs/UREDJIVANJE-I-OBRAZAC.md)
- [Sadržaj i izvori — provjereno, tvrdnje, za potvrdu](docs/SADRZAJ-I-IZVORI.md)
- [Mapa starih i novih URL-ova](docs/MAPA-URL.md)
- [Sažetak izvršenih provjera](docs/PROVJERE.md)
- [Izvještaj o redizajnu, snimci prije/poslije](docs/REDIZAJN-IZVJESTAJ.md)

Stranica je zadano zaštićena od indeksiranja. U produkciji postaviti `PUBLIC_ALLOW_INDEXING=true` (vidi `.env.example`).
