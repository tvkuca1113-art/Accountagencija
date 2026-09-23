# ACCOUNT: vizuelni update postojećeg demo sajta

**Cilj:** Doraditi postojeći demo https://accountagencija.vercel.app/ tako da se vizuelni kvalitet približi najvišem nivou za lokalnu računovodstvenu agenciju. Sačuvati funkcionalne stranice, alate, tekstove i potvrđene podatke. Ne tvrditi unaprijed da je rezultat „10/10“; kvalitet utvrditi nakon pregleda desktop i mobilnih prikaza.

## Polazna ocjena i konkretni problemi

Vizuelna ocjena sadašnjeg demo sajta je približno 8/10 u desktop prikazu. Naslov je jasan, hijerarhija čitljiva i brend dosljedan, ali na velikom dijelu stranice ponavljaju se isti motivi fascikli, kartica i dekorativnih oznaka. Fotografija u hero sekciji s prikazom Starog mosta može djelovati kao stvarna kancelarija agencije iako je ilustrativna. Sekcija usluga je opširna, a dio početne izgleda kao niz blokova jednakog prioriteta. U ilustrativnom „izvještaju“ vidi se tekst koji djeluje nepotpuno; takve informacije treba izraditi precizno u HTML/CSS-u. Sadašnja stranica nema istaknute postojeće recenzije s originalnog sajta. Originalni sajt javno prikazuje tvrdnje 10+ godina i 300+ klijenata; korisnik je potvrdio da su tačne, zato ih zadrži.

## Fajlovi u priloženom ZIP-u

| Fajl | Primarna pozicija | Motiv |
|---|---|---|
| 01-account-hero.png | Naslovni ekran početne | Osoba otvara plavu fasciklu; tamniji slobodan prostor lijevo za naslov. |
| 02-account-knjigovodstvo.png | Prva usluga na početnoj i podstranica računovodstva | Ruka vodi evidencije uz kalkulator i račune. |
| 03-account-savjetovanje.png | Uslužni pregled i podstranica savjetovanja | Razgovor nad jednostavnim finansijskim prikazom. |
| 04-account-inostrana-preduzeca.png | Podstranica zastupanja inostranih preduzeća | Poslovni razgovor i fascikla; Mostar se vidi samo na maloj uokvirenoj fotografiji u pozadini. |
| 05-account-registracija.png | Uslužni pregled i podstranica registracije | Ključ i uredno pripremljena dokumentacija. |
| 06-account-poslovni-projekti.png | Podstranica poslovnih projekata | Planiranje kroz bilježnicu i kartice. |
| account-original-logo.png | Zaglavlje, podnožje i završno tačno brendiranje fotografija | Izvorni, tačan znak agencije. |
| mostar-originalna-fotografija.jpeg | Opcionalna autentična alternativa za Mostar | Stvarna fotografija Starog mosta objavljena pod CC0 licencom. |

**Važna napomena:** Slike jesu novoizrađeni ilustrativni motivi s generisanim simbolom nalik ACCOUNT logu, ali sitni znakovi na fasciklama nisu svuda vjerni izvornom znaku. Priloženi `account-original-logo.png` je jedini autoritativan logo. Za finalnu isporuku ne treba predstavljati generisani simbol kao preciznu reprodukciju logotipa. Zamijeni ga izvornim grafičkim assetom kroz tačnu masku/kompoziting u editoru; gdje to ne možeš izvesti uvjerljivo, primijeni kadar bez problematičnog znaka i stavi tačan logo u UI iznad ili pored fotografije. Provjeri svaki prikaz pri stvarnoj veličini.

Izvor za mali detalj Mostara: https://commons.wikimedia.org/wiki/File:Old_Bridge_Mostar_(125653963).jpeg ; fotograf Alen Kajimović; CC0 1.0. Slika `04-account-inostrana-preduzeca.png` je ilustrativna poslovna scena s uokvirenim prizorom inspirisanim stvarnom fotografijom. Originalni JPEG u paketu služi kao geografska referenca; ne koristi ga umjesto diskretne slike 04 bez posebnog razloga. Ne prikazuj generisanu scenu kao stvarnu kancelariju agencije.

## Prompt za Claude Code — kopiraj odavde

Radi kao senior art direktor, UX dizajner i frontend inženjer. Unaprijedi postojeći ACCOUNT demo, a ne pravi novi projekat. Početno stanje: https://accountagencija.vercel.app/. Referentni stari sajt: https://www.agencija-account.com/. Uz ovaj prompt prilažem ZIP sa šest novih slika i izvornim znakom agencije. Prvo pročitaj AGENTS.md, package.json i strukturu projekta; zatim provjeri gdje se slike trenutno koriste, kako su riješeni navigacija, forma, alati i stilovi. Zadrži postojeće URL-ove, sadržaj, funkcionalne alate i potvrđene podatke agencije.

### A. Precizan dizajnerski smjer

ACCOUNT treba izgledati kao moderna, pouzdana računovodstvena agencija iz Mostara: jasnoća, mir, stručnost i ljudski odnos. Koristi postojeću tamnoplavu i plavu paletu iz izvornog loga uz prirodne krem i svijetlosive površine. Miješaj tamne i svijetle sekcije s razlogom. Izbjegni ponavljanje istog izgleda svih kartica, velik broj plutajućih pločica, lažne digitalne ekrane, prenaglašene sjene i generičke poslovne osmijehe. Tipografiju i razmake podesi urednički: velike čitljive naslove, pasuse širine oko 55–70 znakova, dva jasna nivoa dugmadi, dovoljno bijelog prostora i poravnanja unutar jedne mreže.

### B. Prvi ekran i ritam početne

Zadrži H1 „Vi vodite posao. Mi brinemo o računovodstvu.“ i postojeću suštinu podnaslova. Zamijeni trenutni hero novom slikom `01-account-hero.png`; sačuvaj lijevi slobodan prostor za tekst i obezbijedi kontrast bez teškog tamnog sloja preko cijele fotografije. Glavni CTA „Zatražite ponudu“, sekundarni „Pogledajte usluge“. Na mobitelu naslov i CTA moraju biti vidljivi bez agresivnog odsijecanja fotografije. Statistiku 10+ godina i 300+ klijenata pokaži čisto, kao tekstualni dokaz pored relevantnog sadržaja, bez dekorativnih pločica preko slike. Sačuvaj ih kao tačne prema potvrdi korisnika.

Na početnoj koristi najviše tri fotografije: novu naslovnu, `02-account-knjigovodstvo.png` i jednu od `03-account-savjetovanje.png` ili `05-account-registracija.png`. Ostale koristi na podstranicama. Usluge prikaži različitim vizuelnim ritmom: jedna izdvojena usluga s fotografijom i sadržajem, ostale u konciznoj listi s jasnim opisom i linkom. Nemoj imati pet ogromnih identičnih foto-kartica jednu za drugom. Prije dugog objašnjavanja rada prikaži stvarni dokaz: recenzije s originalnog sajta s tačnim imenima i tekstom, bez izmišljene zvjezdane ocjene ili Google oznake. Zadrži FAQ i praktične alate, ali na početnoj samo kratak pregled; puna iskustva ostaju na odgovarajućim stranicama.

### C. Slike, logo i autentičnost

Integriraj svih šest priloženih slika tačno prema tabeli iznad. Nova slika 04 zamjenjuje prethodne verzije s panoramom nalik Sarajevu ili velikim prikazom Starog mosta; te verzije nemoj koristiti. Na novoj slici 04 Mostar je samo mali fotografski detalj u pozadini poslovne scene, u istom toplom vizuelnom jeziku kao ostatak serije. U ZIP-u je i stvarna CC0 fotografija Mostara kao geografska referenca; nemoj je postaviti preko cijelog ekrana. Koristi originalni `account-original-logo.png` za zaglavlje, podnožje, favicon kada tehnički odgovara i precizno finalno brendiranje. Znak generisan unutar fotografija može biti vizuelno netačan; nemoj ostaviti očito pogrešan simbol i ne tvrdi da je znak identičan izvornom. Ako pouzdan grafički kompoziting nije moguć, radije kadriraj/retuširaj scenu tako da netačan znak nije u fokusu, a autentični logo stavi kao zaseban sloj u dizajnu stranice. Sačuvaj izvorne PNG-ove; napravi optimizirane WebP/AVIF verzije uz srcset i smislene `sizes`, provjeri fokus i kvalitet na telefonu. Ne prikazuj ilustrativne osobe ili lokaciju kao stvarno osoblje ili stvarnu kancelariju agencije. Ne pravi netačne vizuale Starog mosta. Nikad ne stavljaj čitljiv tekst i brojke u generisanu fotografiju; dijagrame i stvarne podatke prikaži u HTML/SVG-u.

### D. Precizna završna dorada

Preuredi veliki tamni blok procesa: manje teksta po koraku, bolje svjetlije/tamnije površine i jasni odnosi između koraka. U alatu „Koja vam usluga treba?“ pojednostavi okvir, bez dodatnih nepotrebnih kartica. Početna mora imati jasnu sekvencu: kome pomažemo, usluge, zašto nam vjerovati, recenzije, tri koraka saradnje, alat, savjeti i kontakt. Svaki blok treba imati jednu vizuelnu ulogu. Ispravi eventualni nečitljiv tekst na ilustrativnom izvještaju i uskladi stil ikona. Dodaj postojeće recenzije iz originalnog sajta u uredničkom prikazu, sa sadržajem koji odgovara izvoru. Sačuvaj direktne linkove na Instagram i Facebook, ali izbjegni teški automatski feed.

### E. Stvarna funkcionalnost i predaja

Provjeri navigaciju, linkove, logotip kao povratak na početnu, savjete, uslužne stranice, kontakt formu i kalkulator. Prema ranijoj predaji, forma nije imala podešeno stvarno slanje poruka; ako konfiguracija i dalje nedostaje, pripremi kod za slanje bez otkrivanja ključeva, a korisniku jasno prikaži alternativu telefon/e-mail bez lažne potvrde slanja. U demo okruženju zadrži noindex; prije produkcije planiraj uklanjanje noindex i usklađivanje canonicala s produkcijskom domenom. Ne najavljuj objavu na originalnu domenu bez pristupa i odobrenja. Dodaj podršku za reduced motion; animacija mora biti diskretna i služiti razumijevanju, bez stalnog 3D efekta.

Pregledaj i snimi početnu i sve relevantne podstranice na širinama 390, 768 i 1440 px. Testiraj kontakt obrazac bez slanja stvarnih testnih upita agenciji, provjeri da forma ne prikazuje uspjeh ako slanje nije uspjelo, pregledaj tekst, logo i kadrove svih šest slika pri prikazanoj veličini. Pokreni build i postojeće testove. Predaj finalne snimke ekrana, sažetak promjena, listu šta je testirano i listu eventualnih blokada. Neka rezultat bude stvarno bolje dizajniran i provjeren, bez automatske tvrdnje da je „10/10“.

## Kraj prompta

Vizuelna ocjena 10/10 zahtijeva da slika, originalni logo, stvarne recenzije, tipografija i mobilni raspored zajedno izgledaju uvjerljivo. Završnu ocjenu dati tek nakon pregleda stvarno objavljene verzije.
