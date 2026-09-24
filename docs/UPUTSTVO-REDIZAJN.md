<!-- Tekst upute koju je dostavio naručilac (ACCOUNT-Claude-Code-redizajn-prompt.docx), sačuvan radi reference. -->

# Redizajn web stranice ACCOUNT za Claude Code
Istraživačke reference i provedbena uputa za repozitorij tvkuca1113-art/Accountagencija
Cilj je dovesti postojeću računovodstvenu stranicu do vizuelno uvjerljivog, jasnog i funkcionalnog izdanja. Uputa se oslanja na pregled stvarne strukture Astro projekta i na odabrane međunarodne primjere; primjeri nisu rang lista „najbolje ocijenjenih“ stranica.
## Reference koje vrijedi proučiti
Tržište i uzor
Šta proučiti
Primjena za ACCOUNT
SAD
Little Fish Accountinglittlefishaccounting.com
Stvarna fotografija tima, jasna niša i vidljiv sljedeći korak. Za ACCOUNT prenijeti princip autentičnosti, bez izmišljanja zaposlenih.
SAD
Pilotpilot.com
U prvom ekranu jasno navodi kome i kojim računovodstvenim uslugama pomaže. Primijeniti preciznost poruke.
Ujedinjeno Kraljevstvo
Cooper Parrycooperparry.com
Velika tipografija i snažan brend razlikuju firmu od konkurencije. Za lokalni ACCOUNT primijeniti odmjereniju verziju.
Evropa, Njemačka
Taxfix i Kallan & Cotaxfix.de/en/rebrand/
Dosljedna tipografija, boje i vlastiti simboli kroz cijeli proizvod; prednost dati sistemu, ne jednom atraktivnom hero kadru.
Dubai, UAE
Kreston Menonkrestonmenon.com
Razrađene usluge, lokalno tržište i vidljivi signali povjerenja. Zadržati ono što odgovara stvarnom obimu ACCOUNT-a.
Studio u Dubaiju
The Media Labthemedialab.me/what-we-do/
Urednička tipografija, odvažan prostor i numerisan popis usluga; odmjeren ritam primijeniti na ACCOUNT.
Dizajnerski studio
Pentagram, finansijski projektipentagram.com/work/payz
Identitet za finansijske usluge zasniva se na pouzdanosti, jednostavnosti i ljudskom tonu.

## Prompt za Claude Code
### Zadatak
Redizajniraj postojeću web stranicu računovodstvene agencije ACCOUNT iz Mostara u repozitoriju https://github.com/tvkuca1113-art/Accountagencija. Prvo pregledaj sve rute, komponente, globalne stilove, podatke i stvarni prikaz postojeće stranice https://accountagencija.vercel.app/ na desktopu i mobitelu. Implementiraj rješenje i isporuči preglednu granu ili PR sa snimcima ekrana i rezultatima provjera. Cilj „10/10“ je smjer kvaliteta, ne samoproglašena ocjena.
### Vizuelni smjer
Brend neka djeluje kao iskusna lokalna firma: urednička tipografija, jasna hijerarhija, puno kontrolisanog prostora, toplije kamene neutralne boje, tamnoplava i prepoznatljiva plava izvornog znaka. Koristi pažljivo komponovan raspored i nekoliko vlastitih ravnih geometrijskih detalja izvedenih iz originalnog A znaka. Izbjegni generičke AI kartice, veliki sjajni 3D A, lebdeće oblike, staklene efekte, lažne portrete, ponavljane inscenirane stolove, fascikle i kalkulatore. Inspiraciju iz primjera koristi kao principe; dizajn i tekst neka budu originalni za ACCOUNT.
### Priložena početna slika
Koristi datoteku ACCOUNT-hero-koncept-bez-mosta.png kao kandidata za početni vizual. To je stilizovana konceptualna fotografija hercegovačkog kamena i tamnoplavog papira; nije dokumentarna fotografija stvarnog prostora agencije. Ne prikazuj je kao stvarni ured ili radni tim. Originalni logo je u public/brand/account-znak.png i mora biti zaseban, oštar HTML/SVG/PNG element u zaglavlju. Nemoj AI-em iscrtavati logo na fotografiji. Na desktopu postavi tipografiju u tamnu lijevu zonu; na mobitelu testiraj izdvojenu kompoziciju i, ako kadar ne radi, koristi boju i tipografiju bez slike. Optimizuj WebP/AVIF, responsive srcset, object-position i LCP. Nemoj koristiti Stari most u početnoj slici.
### Prvi ekran i sadržaj
U roku od dvije sekunde mora biti jasno šta firma radi, za koga i gdje: „Računovodstvo za firme i obrte u Mostaru.“ Podnaslov može biti „Poslovne knjige, porezne obaveze i savjetovanje uz jasan dogovor i dostupnu podršku.“ Primarni poziv „Zatražite ponudu“, sekundarni „Pregledajte usluge“. Vidljivo istakni potvrđene podatke 10+ godina iskustva i 300+ klijenata, bez dodavanja novih brojki, priznanja, fotografija tima ili izjava. Preispitaj formulacije na cijelom sajtu, ukloni fraze poput „Pouzdan partner“ ako se ponavljaju bez konkretnog objašnjenja.
### Arhitektura stranice
U početnoj stranici napravi jasan slijed: hero; pregled pet usluga s opisom konkretne pomoći i jednim jasnim linkom; za koga je agencija; dokaz iz postojećih potvrđenih podataka i stvarnih recenzija sa izvora; jednostavan tok saradnje; korisni alat; savjeti; kontakt. Zadrži sve postojeće usluge, savjete, alate, FAQ, kontakt i pravilne URL adrese. Sekcijama daj različit ritam: tekst, kvalitetan prostor, diskretna linija, autentičan dokaz. Ne pretvaraj svaku sekciju u identične kartice. Na pojedinačnim stranicama usluga koristi posebne odgovarajuće motive ili čistu tipografiju umjesto jedne ponovljene AI scene.
### Funkcionalnost i povjerenje
Sačuvaj postojeći vodič, kalkulator pokrića troškova, konfigurator, kontakt formular, validaciju i status slanja, Instagram/Facebook linkove, mobilni poziv i mjerenje događaja. Provjeri da CTA zaista vodi na korisnu radnju. Prikaži stvarnu adresu Lacina bb, Villa Neretva, 1. sprat, Mostar i postojeće telefone, e-mail, recenzije i opseg usluga iz src/data. Ne izmišljaj novi domen e-pošte niti mijenjaj poslovne činjenice. Vanjske društvene sadržaje ugrađuj samo ako se pouzdano i brzo učitavaju; u suprotnom koristi jasne linkove. Kalkulator mora imati razumljiv rezultat, objašnjene pretpostavke i napomenu o ilustrativnoj prirodi, bez predstavljanja kao porezni savjet.
### Bosanski jezik
Pregledaj sve javno vidljive stringove: navigaciju, hero, usluge, opise, FAQ, članke, kalkulator, formu, validacijske i uspješne poruke, alt tekstove, title/meta, 404, politiku privatnosti i mobilni meni. Dosljedno koristi bosanski standard, prirodan poslovni ton, č/ć/đ/dž/š/ž i bosanske oblike poput „preduzeće“, „savjetovanje“, „izvještaj“, „klijent“. U zatečenim nazivima i potvrđenim poslovnim podacima čuvaj original. Posebno provjeri pogrešne i miješane varijante, ali ne mijenjaj postojeće URL slugove bez ispravnih 301 preusmjeravanja.
### Tehnička provedba
Projekt je Astro 7. Relevantno: src/components/HomeHero.astro, src/pages/index.astro, src/styles/global.css, src/data/site.ts, src/data/services.ts, src/components/Header.astro, ContactForm.astro, ServiceGuide.astro, BreakEvenCalculator.astro i public/brand. Počni auditom i planom, pa implementiraj u postojećoj strukturi. Zadrži semantički HTML i brz statički prikaz. Animacije ograniči na diskretne opacity/translate promjene koje ne koče navigaciju, uz prefers-reduced-motion. Provjeri fokus, tastaturu, kontrast i interaktivna stanja. Bez nepotrebnih biblioteka ili autoplay 3D pozadine.
### Obavezna provjera
Testiraj stvarne ekrane na širinama 360, 390, 768, 1280 i 1440 px. Pregledaj sve rute, mobilni meni, CTA dugmad, alate, interakcije i formu (bez slanja test upita stvarnim osobama). Provjeri da nema horizontalnog skrola, odrezanog teksta, preklapanja fiksne mobilne trake i čudnog kroja hero slike. Pokreni npm run check, npm test i npm run build. U PR priloži desktop i mobilne snimke prije/poslije, spisak sadržajnih izmjena, izvještaj o funkcionalnosti i poznata ograničenja. Ne tvrdi da je 10/10 bez vizuelnog pregleda i demonstracije rezultata.
