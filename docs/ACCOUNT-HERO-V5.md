# ACCOUNT — početni ekran preko cijele širine

## Zahtjev i izvedba

Postojeća scena s plavim ACCOUNT znakom proširena je iza teksta preko cijelog početnog ekrana. Uklonjena je zasebna kartica s okvirom i potpisom. Tekst ostaje pravi HTML, dugmad su interaktivna, a dekorativna slika ne duplicira naziv logotipa za čitače ekrana.

Desktop koristi panoramsku kompoziciju sa znakom desno i mirnijom svijetlom površinom ispod naslova. Mobitel koristi zasebnu uspravnu kompoziciju iste scene, sa znakom niže i desno. CSS gradijenti osiguravaju svjetliju pozadinu ispod teksta. Slika se bira elementom picture prema širini ekrana, uz AVIF i WebP; ne preuzimaju se obje kompozicije odjednom.

Ograničen je pokret dugmeta i poštuje se prefers-reduced-motion. Pozadina se ne pomjera tokom čitanja i nema automatskog videa. Sadržaj o uslugama, originalne recenzije i potvrđeni podaci agencije ostaju u postojećim komponentama.

## Reference

- [Grid / The3Key](https://griddesign.co.uk/case-study/the3key): vlastiti vizuelni motiv, jasna hijerarhija i poruka prilagođena publici. Pregledana studija i screenshot prikaza.
- [Pentagram / GSA](https://www.pentagram.com/work/gsa): vlastiti simbol proširen u vizuelno okruženje brenda.
- [Devket / Future Shore](https://www.devket.com/work/future-shore): opis pune širine početnog vizuala uz pregledne usluge. Ovo je istražena studija, ne tvrdnja o univerzalnom poretku najboljih agencija.

## Provjera objave

- `npm run check`: 0 grešaka, 0 upozorenja, 0 napomena.
- `npm run build`: uspješno; `git diff --check`: bez problema.
- Vercel objava `c06caa5` uspješna.
- Pregledan desktop prikaz i responzivni prikazi na 360, 390, 768 i 1024 px. Manje širine pregledane su kroz iframe; nije provjeren fizički iPhone.
- Dugme „Zatražite ponudu” vodi na `/kontakt#upit`, provjereno klikom na objavljenoj stranici.
- Snimci stvarne objave: `docs/snimci-v5/pocetna-desktop.jpg` i `docs/snimci-v5/pocetna-mobitel.jpg`.

## Izvorne slike

`source-images/hero-v5/account-prostor-desktop.jpg` i `source-images/hero-v5/account-prostor-mobile.jpg`. Generisane ugrađenim alatom za slike kao prilagodbe prethodnog odobrenog motiva; nisu fotografije stvarnog predmeta ili kancelarije.

### Prompt za desktop

```text
Edit the supplied ACCOUNT brand sculpture image into a full-bleed website hero background. Preserve exactly the same blue double-faced ACCOUNT symbol geometry, its triangular openings, layered white paper rear edges, low pale plinth, blue materials and light. Reframe and extend the studio environment into a cinematic wide 2:1 landscape canvas. Place the complete sculpture centered at x=77% of the canvas, its top at 10% and plinth bottom at 90%; sculpture should occupy the rightmost 42% of the width. Left 52% must be calm near-white cool atmosphere with a very subtle pale blue studio light gradient and a soft diagonal window shadow in the far upper left. Continuous realistic floor and seamless background across entire image; no central seam or split panels. Much quieter background than original at left for dark navy HTML headline and paragraph to be placed later, but keep rich cyan and blue of sculpture on right. Entire symbol and plinth remain in frame with adequate margins. Premium restrained architectural product photograph, tactile cotton paper and subtle matte blue surfaces, refined daylight, soft accurate floor shadows. No text, no added logos, no frames, no UI, no decorative shapes, no extra objects. This is the existing scene reframed for a full-width hero, not a redesign of the sculpture.
```

### Prompt za mobitel

```text
Edit the supplied ACCOUNT sculpture image into a tall mobile website background, 9:16 portrait format. Preserve the exact existing blue ACCOUNT double-faced symbol, its openings, paper layers, materials, floor lighting and plinth. Recompose the SAME scene: whole sculpture centered at x=66%, top at y=49%, sculpture and very low plinth end at y=94%. Sculpture occupies 60% of image width and about 42% of total height. Leave the top 47% mostly empty near-white cool blue studio atmosphere for dark navy headline, body copy and buttons that will be rendered later as HTML. On upper left only a very faint soft window shadow; no intense contrast, no blue object behind the headline area. Continuous pale blue-white studio floor and background across the entire full-bleed composition, no horizon seam, no panels, no cards, no borders. Blue sculpture remains rich and visually dimensional in lower right, a gentle shadow flows toward lower left. Refined restrained architectural still life art direction. All parts of sculpture including top, side arms and base visible with margins. No text, no added logo, no objects, no UI, no watermark. Preserve recognizable geometry of the reference precisely, merely move and scale the existing sculpture within a taller canvas.
```
