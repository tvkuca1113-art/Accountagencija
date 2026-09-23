# Sadržaj i izvori — interni dokument

Ovaj dokument nije dio web stranice i ne prikazuje se posjetiocima. Razdvaja provjerene podatke, tvrdnje postojećeg weba, nove prijedloge sadržaja i stavke koje agencija treba potvrditi prije objave.

Stanje: 23. 9. 2026.

## Važno ograničenje pri izradi

Mrežna politika razvojnog okruženja blokirala je pristup domenama `agencija-account.com`, `instagram.com`, `facebook.com` i `web.archive.org`. Zbog toga:

- tekstovi postojećih podstranica (`/o-nama`, `/racunovodstvo`, `/konzultantske-usluge`, `/zastupanje-inostranih-poduzeca`, `/ostale-usluge` i njihove `.html` varijante) **nisu preuzeti doslovno** niti popisani iz izvora. Sadržaj je napisan na osnovu podataka iz Superprompta (odjeljak 1) i javne pretrage (naslov početne: „Agencija Account - Računovodstvena agencija | Pouzdana & Efikasna“);
- originalni logo (`/images/Logo.png`) **nije preuzet** — stranica privremeno prikazuje tekstualni naziv „ACCOUNT“ (vidi `docs/UREDJIVANJE-I-OBRAZAC.md`);
- postojeće verifikacijske meta oznake (npr. Google Search Console) nisu poznate;
- objave na Instagramu nisu otvorene; kartice na stranici opisuju samo teme navedene u Superpromptu.

Prije produkcije: otvoriti postojeći web, popisati sadržaj svih podstranica, uporediti s novim tekstom i prenijeti eventualne dodatne informacije.

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

## 2. Tvrdnje postojećeg weba (prikazane, ali ih agencija treba potvrditi)

| Tvrdnja | Gdje je na novoj stranici | Napomena |
|---|---|---|
| 10+ godina iskustva | hero, O agenciji, O nama | tvrdnja agencije; ne povećavati |
| 300+ klijenata | hero, O agenciji, O nama | nije pretvoreno u „aktivne klijente“ |
| Zastupanje stranih poreznih obveznika („ovlašteno“) | /zastupanje-inostranih-poduzeca, O nama | riječ „ovlašteno“ je izostavljena dok agencija ne potvrdi tačan opseg; na stranici je jasno da to nije advokatsko zastupanje |
| FAQ: digitalna dostava e-mailom, redovne prijave, individualna cijena, uvodni razgovor i analiza potreba, periodični izvještaji | početna, podstranice usluga | prepisano jasnije; tačan obuhvat saradnje potvrditi |

## 3. Recenzije (inventar — ne prikazuju se)

Postojeći web navodi recenzije koje se pripisuju osobama: **Adis Krvavac, Maja, Alem Šunja, Almir Eglenović**. Tekstovi recenzija nisu preuzeti (blokiran pristup). Na novoj stranici se ne prikazuju dok ne postoji provjerljiv izvor (npr. Google profil) i dozvola za korištenje. Ne dodavati ocjenu 5,0, zvjezdice, datume, logotipe klijenata ni `aggregateRating`.

## 4. Novi sadržaj (prijedlozi napisani za redizajn)

- Hero, „Kome pomažemo“, opisi pet uslužnih kategorija, koraci saradnje i liste „Za prvi razgovor pripremite“.
- Podjela „Ostalih usluga“ na **Registracija firmi, obrta i udruženja** i **Poslovni projekti i planiranje** (razrada postojeće ponude).
- FAQ po uslugama (3–4 pitanja) — izvedeni iz opće ponude; bez rokova, stopa i obećanja.
- Tri članka u `/savjeti` (originalan tekst, bez poreznih stopa i rokova): „Prihod i dobit nisu isto“, „Šta pripremiti za prvi razgovor s računovođom“, „Kako pregled troškova pomaže pri planiranju ulaganja“.
- Tri kartice s temama Instagram objava (23. 9., 18. 9. i 14. 9. 2026.) s originalnim linkovima; objava od 8. 9. 2026. (finansijsko zdravlje) iskorištena kao tema u trećem članku.
- Politika privatnosti opisuje stvarnu obradu (Resend za e-mail, Vercel hosting, lokalni alati). Pregledati prije objave.

## 5. Čeka potvrdu agencije

- [ ] Originalni logo (`Logo.png` ili SVG) i favicon izveden iz njega.
- [ ] Tačni plavi tonovi logotipa (trenutno uzorkovani s fotografija: `#0098E8`, `#2070B0`; vidi `src/styles/global.css`).
- [ ] Primalac upita s forme (početni javni kontakt: aldijana_suta@hotmail.com) i verifikovani pošiljalac na domeni.
- [ ] 10+ godina i 300+ klijenata.
- [ ] Opseg „ovlaštenog zastupanja stranih poreznih obveznika“.
- [ ] Obračun plaća i druge operativne usluge — dodati tek nakon potvrde.
- [ ] Destinacija Google Maps linka `https://maps.app.goo.gl/kQYnpVpSFJQg96QZ8` (trenutno se koristi pretraga po adresi).
- [ ] Radno vrijeme — nije prikazano i nije u strukturiranim podacima.
- [ ] WhatsApp — nije dodan (broj mobitela sam po sebi nije potvrda kanala).
- [ ] Domena `accountagencija.com` (navodi je Facebook) — status i ovlaštenje; vidi `docs/MAPA-URL.md`.
- [ ] Fotografije osoblja i prostora — koristiti samo potvrđene i dozvoljene; do tada O nama koristi neutralan detalj.
- [ ] Verifikacijske meta oznake sa starog weba (`site.verification` u `src/data/site.ts`).
- [ ] Tekst politike privatnosti (po potrebi uz pravnog savjetnika).

## 6. Slike

Šest priloženih završnih slika s logotipom ACCOUNT (izvornici u `source-images/`, optimizirane varijante u `public/images/`):

| # | Motiv | Upotreba | Datoteka |
|---|---|---|---|
| 1 | Radni sto, pogled na Stari most, fascikl s logotipom | hero početne | `account-hero.webp` (+ mobilni kadar 4:5) |
| 2 | Kalkulator, dokumenti, logo na zaglavlju | Računovodstvo i knjigovodstvo | `account-knjigovodstvo.webp` |
| 3 | Savjetovanje za stolom, bez vidljivih lica | Poslovno i porezno savjetovanje | `account-savjetovanje.webp` |
| 4 | Globus, laptop, poslovni dosje | Zastupanje inostranih preduzeća | `account-inostrana-preduzeca.webp` |
| 5 | Ključevi i fascikl | Registracija firmi, obrta i udruženja | `account-registracija.webp` |
| 6 | Bilježnica, plave kartice | Poslovni projekti i planiranje; O nama (neutralan detalj) | `account-poslovni-projekti.webp` |

Slike su ilustrativne poslovne scene; stranica ih ne predstavlja kao fotografije stvarnog tima, kancelarije ni pogleda iz prostora agencije (napomena u podnožju).
