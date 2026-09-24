# Sadržaj i izvori — interni dokument

Ovaj dokument nije dio web stranice i ne prikazuje se posjetiocima. Razdvaja provjerene podatke, tvrdnje postojećeg weba, nove prijedloge sadržaja i stavke koje agencija treba potvrditi prije objave.

Stanje: 24. 9. 2026. (upoređeno sa živom izvornom stranicom)

## Dopuna provjere izvora

Dana 24. 9. 2026. otvorena je živa izvorna stranica i pregledane su sve stranice ponude. Recenzije su upoređene doslovno s izvornim HTML-om, a nedostajući dijelovi ponude vraćeni su u podatke o uslugama. Ranije ograničenje pristupa originalnom sajtu više ne vrijedi za ovu provjeru. Instagram objave ostaju preuzete iz ranije dokumentovanog istraživanja.

## 1. Provjereni kontakt podaci

| Podatak | Vrijednost | Izvor |
|---|---|---|
| Naziv | Računovodstvena agencija ACCOUNT / Agencija Account | Superprompt, web, Facebook |
| Adresa | Lacina bb, Villa Neretva, 1. sprat, 88000 Mostar | Facebook (detaljnija), web navodi „Lacina, Mostar“ |
| Mobilni | +387 62 675 596 | web |
| Fiksni | +387 36 550 385 | web; isti broj u javnom registru (companywall.ba) |
| E-mail | aldijana_suta@hotmail.com | web |
| Instagram | https://www.instagram.com/agencijaaccount/ | web |
| Facebook | https://www.facebook.com/accountagencija/ | web |
| LinkedIn | https://www.linkedin.com/in/aldijana-suta-811a352b4/ | web — **lični** profesionalni profil; na stranici O nama prikazan samo kao profil osobe, nije u strukturiranim podacima kompanije |
| Registracija | poslovni subjekt u Mostaru od 18. 9. 2015. | javna pretraga (companywall.ba) — informativno, nije prikazano na stranici |

## 2. Podaci koje je agencija potvrdila (23. 9. 2026.)

| Podatak | Gdje je na novoj stranici | Napomena |
|---|---|---|
| 10+ godina iskustva | hero, O agenciji, O nama | potvrđeno; ne povećavati |
| 300+ klijenata | hero, O agenciji, O nama | potvrđeno; nije pretvoreno u „aktivne klijente“ |
| Ovlašteno zastupanje stranih poreznih obveznika | /zastupanje-inostranih-poduzeca, O nama | potvrđeno; opseg opisan formulacijom s postojećeg weba, bez proširivanja. Na stranici je navedeno da to nije advokatsko zastupanje |

Tvrdnja postojećeg weba koja ostaje u tekstu: FAQ (digitalna dostava e-mailom, redovne prijave, individualna cijena, uvodni razgovor i analiza potreba, periodični izvještaji) — prepisano jasnije na početnoj i podstranicama usluga.

## 3. Recenzije (prikazane na početnoj)

Četiri recenzije provjerene su na živoj stranici 24. 9. 2026. Imena, tekstovi i redoslijed odgovaraju originalu. Nema dodanih zvjezdica, ocjena, datuma ni oznake Googlea. Test `reviews.test.ts` poredi podatke s nezavisno izvučenim izvornim HTML-om.

| Ime | Tekst |
|---|---|
| Adis Krvavac | Stvarno su odlični! Profesionalni, brzi i uvijek na raspolaganju kada treba pomoć ili savjet. Zaista su pravi izbor za svakoga ko traži kvalitetnu i pouzdanu računovodstvenu podršku. Preporučujem ih od srca! |
| Maja | Uvijek su na raspolaganju i stvarno znaju svoj posao. Bez obzira na složenost, sve završe precizno i tačno, a komunikacija s njima je uvijek jasna i ugodna. Definitivno ih preporučujem svima koji žele pouzdan tim na svojoj strani! |
| Alem Šunje | Preporučujem. |
| Almir Eglenović | Preporučujem. |

Prikazane su originalne fotografije Adisa, Alema i Almira; Maja ima inicijal jer original koristi generičku ikonu.

## 4. Novi sadržaj (prijedlozi napisani za redizajn)

- Hero, „Kome pomažemo“, opisi pet uslužnih kategorija, koraci saradnje i liste „Za prvi razgovor pripremite“.
- Podjela „Ostalih usluga“ na **Registracija firmi, obrta i udruženja** i **Poslovni projekti i planiranje** (razrada postojeće ponude).
- FAQ po uslugama (3–4 pitanja) — izvedeni iz opće ponude; bez rokova, stopa i obećanja.
- Tri članka u `/savjeti` (originalan tekst, bez poreznih stopa i rokova): „Prihod i dobit nisu isto“, „Šta pripremiti za prvi razgovor s računovođom“, „Kako pregled troškova pomaže pri planiranju ulaganja“.
- Tri kartice s temama Instagram objava (23. 9., 18. 9. i 14. 9. 2026.) s originalnim linkovima; objava od 8. 9. 2026. (finansijsko zdravlje) iskorištena kao tema u trećem članku.
- Politika privatnosti opisuje stvarnu obradu (Resend za e-mail, Vercel hosting, lokalni alati). Pregledati prije objave.

## 5. Čeka potvrdu agencije

- [x] Originalni znak — dostavljen i postavljen u zaglavlje i podnožje; favicon izveden iz njega.
- [x] Plavi tonovi — preuzeti iz originalnog znaka (`#00A0EC`, `#187CC4`, `#14B8EC`).
- [x] 10+ godina, 300+ klijenata i ovlašteno zastupanje stranih poreznih obveznika — potvrđeno.
- [ ] Primalac upita s forme (početni javni kontakt: aldijana_suta@hotmail.com), verifikovani pošiljalac na domeni i Resend ključ — povezuje se naknadno.
- [ ] Obračun plaća i druge operativne usluge — dodati tek nakon potvrde.
- [ ] Destinacija Google Maps linka `https://maps.app.goo.gl/kQYnpVpSFJQg96QZ8` (trenutno se koristi pretraga po adresi).
- [ ] Radno vrijeme — nije prikazano i nije u strukturiranim podacima.
- [ ] WhatsApp — nije dodan (broj mobitela sam po sebi nije potvrda kanala).
- [ ] Domena `accountagencija.com` (navodi je Facebook) — status i ovlaštenje; vidi `docs/MAPA-URL.md`.
- [ ] Fotografije osoblja i prostora — koristiti samo potvrđene i dozvoljene; do tada O nama koristi neutralan detalj.
- [ ] Verifikacijske meta oznake sa starog weba (`site.verification` u `src/data/site.ts`).
- [ ] Tekst politike privatnosti (po potrebi uz pravnog savjetnika).

## 6. Slike (treća runda, 24. 9. 2026.)

- **Početna:** `source-images/hero-v3/account-rad.jpg` — ilustrativna fotografija pregleda računovodstvene dokumentacije. Originalni logo prikazuje se zasebno preko slike. Fotografija ne predstavlja stvarno osoblje ili prostor agencije.
- **Stranice usluga i pregled usluga:** umjesto inscenirane scene svaka usluga ima vlastiti ravni motiv izveden iz znaka (`src/components/ServiceMotif.astro`): poslovna knjiga, dva trokuta (savjet), globus s oznakom (inostrana preduzeća), stepenice (registracija), plan s putanjom (projekti).
- **Savjeti:** bez fotografija, urednička lista.
- **O nama:** stvarna fotografija Starog mosta (Alen Kajimović, CC0 1.0, https://commons.wikimedia.org/wiki/File:Old_Bridge_Mostar_(125653963).jpeg), s potpisom; izvornik u `source-images/mostar/`.

Druga serija (šest inscenirana stola s fasciklama, dostavljena 23. 9. 2026.) zamijenjena je prema uputi „ACCOUNT-Claude-Code-redizajn-prompt“ (izbjeći ponavljane inscenirane stolove, fascikle i kalkulatore). Izvornici i obrađene verzije s originalnim znakom ostaju u `source-images/v2-izvornici/` i `source-images/account-*.png`.
