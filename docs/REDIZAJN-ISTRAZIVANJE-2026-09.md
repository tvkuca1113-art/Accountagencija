# ACCOUNT — istraživanje i specifikacija redizajna
Datum: 24. 9. 2026.
Repozitorij: tvkuca1113-art/Accountagencija
Polazni commit: e3de85eb0fb6c9b3d05017e55bc2ff1a2365c5ad

## Zaključak
Problem nije nedostatak još jedne profesionalne fotografije. Postojeći identitet weba previše zavisi od generisanih uredskih scena, velikih tamnih površina i jednakih zaobljenih dugmadi. Potreban je prepoznatljiv sistem tipografije, kompozicije i originalnog ACCOUNT znaka, uz kraći put do usluge i upita.

Ovo je istraživanje i specifikacija, a ne implementiran redizajn. Ocjena 10/10 je cilj kvaliteta, ne potvrđen rezultat. Vizuelni izbor prethodi promjenama interfejsa.

## Šta je stvarno pregledano
- Živa demo početna na desktopu: hero, skok na usluge, kontaktna stranica i forma. Mobilni izgled analiziran iz korisnikovog screenshota; nije proveden zaseban mobilni browser test.
- Izvorni kod: HomeHero, Header, MobileBar, Base, index i reviews. Repo već ima recenzije i društvene objave: sačuvati ih, ne izmišljati da nedostaju.
- Instagram ayzz.thedesigner kroz već prijavljeni račun koji je korisnik odobrio. Profil, opisi i više kadrova dva pokrenuta videa. Nisu slane poruke, komentari niti praćenja.
- Facebook javna objava videa pripisana Ayzzu, kroz kadrove reprodukcije. To je repost treće strane, ne njegov potvrđen službeni profil.
- Primjeri COLLINS, Ragged Edge, Jung von Matt i TBWA/RAAD. Ovo je izbor relevantnih radova, ne objektivna rang-lista najboljih svjetskih agencija.
- Forumske rasprave kao kvalitativna mišljenja dizajnera; nisu reprezentativno istraživanje ACCOUNT klijenata.
- Dostava e-maila nije testirana slanjem upita. Nije proveden potpuni accessibility audit ili mjerenje konverzije.

## Reference i konkretna primjena

| Tržište / izvor | Šta je zanimljivo | Primjena na ACCOUNT |
| --- | --- | --- |
| USA: COLLINS / Altruist | Finansijska tema dobija ljudskost kroz ilustraciju, tipografiju i jasnu priču o odnosu savjetnika i klijenta. Vizuelno pregledana naslovna kompozicija i dio case studyja. | Pričati o urednom poslovanju i dostupnom savjetu. Promijeniti ritam sekcija; manji broj snažnijih vizuala. |
| Engleska: Ragged Edge / Wise | Dosljedan znak, karakteristična tipografija, direktan jezik i jasan glavni CTA u prikazima proizvoda. Case-study stranica prikazivala je prazan kadar, pa su pročitani sadržaj i vizuelno otvoren službeni prikaz mobilnih interfejsa. | Originalni ACCOUNT znak koristiti kao dio sistema. Plavu koristiti namjenski za glavnu akciju, ne za svaki ukras. Ne kopirati Wise zelenu, font ili ilustracije. |
| Europa: Jung von Matt Limmat / PostFinance | Asimetričan kadar, velika tipografija i ljudski motiv umjesto generičnog finansijskog dekora. Pregledan hero case-studyja, ne cijela kampanja. | Fotografiju tretirati kao urednički sadržaj s jasnim rubom. Autentične fotografije tima dodati tek kada postoje. |
| Dubai: TBWA/RAAD / Art Gap, Standard Chartered | Jedna pamtljiva vizuelna ideja prenosi poruku; nagrade su navedene u službenoj studiji. Ovo je komunikacijska kampanja, ne dokaz najboljeg web UX-a. | Odabrati jedan potpisni motiv za ACCOUNT umjesto mnoštva nepovezanih 3D efekata. |
| Instagram: Ayzz / Nike koncept | U pregledanim kadrovima znak prelazi u kompoziciju sa jednim dominantnim proizvodom. Autor navodi da je riječ o neslužbenom kreativnom konceptu. | Jedan glavni vizual, disciplinovan ulaz elemenata; bez uvodne animacije koja blokira navigaciju ili CTA. |
| Instagram: Ayzz / Smart Animate + Custom Curves | Pregledani kadrovi pokazuju dizajnerski proces i ambijentalnu biljnu stranicu sa snažnom tipografijom. | Jedna paleta, jedan smjer svjetla i dosljedan ritam animacije. Video ne dokazuje funkcionalnost stvarne stranice. |
| Facebook: Coffee Website Design in Figma | Pregledani kadrovi prelaza i završnog ekrana sa šoljom kao glavnim motivom, snažnim naslovom i usklađenom paletom. | Zadržati vizuelnu disciplinu; ne prenositi kafu ili e-commerce interakcije na računovodstvo. |

## Nalazi na trenutnom demo prikazu
1. **Mobilni prvi ekran:** visoko zaglavlje, dugi naslov i uvod odlažu pojavu vizuala. Skratiti uvod na jednu do dvije rečenice i osigurati da dio vizuelnog potpisa stane uz primarnu akciju.
2. **Konkurencija poziva na akciju:** hero ima dva dugmeta, uz stalnu donju traku sa još dvije akcije. Jedan primarni CTA „Zatražite ponudu“, sekundarni tekstualni link „Usluge“. Donju traku prikazivati tek nakon što primarni CTA izađe iz vidljivog područja; zadržati postojeće skrivanje uz formu, tastaturu i meni.
3. **Identitet:** fotografije uredskih stolova nisu dovoljne da se prepozna agencija. Originalni znak, karakterističan naslovni stil, odnosi veličina i raspored trebaju nositi identitet.
4. **Fotografije:** ne prikazivati ilustrativni ured kao stvarnu lokaciju. Mostar diskretno kroz stvarnu fotografiju detalja grada ili mali potpis lokacije, bez panoramske razglednice u svakom kadru.
5. **Usluge:** postojeća istaknuta usluga i lista su dobra osnova. Dodati čitljive brojeve 01–05 i jasnu korist po usluzi. Ne pretvoriti svaku stavku u istu karticu.
6. **Povjerenje:** 10+ godina i 300+ klijenata ostaju jer ih je korisnik potvrdio. Postojeće recenzije sačuvati bez izmišljenih zvjezdica, novih imena ili datuma.
7. **Kontakt:** dobar postojeći izbor jednog kontaktnog kanala. Zadržati ga i kontekst odabrane usluge; prikaz uspjeha smije slijediti samo stvarno prihvaćeno slanje.
8. **Pristupačnost:** tokom implementacije provjeriti fokus, kontrast, čitljivost, meni, veličinu dodirnih meta i smanjenje animacija. Screenshot sam ne dokazuje WCAG usklađenost.

## Tri vizuelna pravca za izbor
- **Preciznost:** svijetla podloga, snažna plava tipografija, originalni znak kao samostalni grafički potpis, usluge u urednim redovima. Najmanje zavisnosti od generisanih fotografija.
- **Lokalno povjerenje:** bijela i blaga kamena nijansa, izražajnija serifna naslovna tipografija u kombinaciji s čitljivim sans fontom, diskretan fotografski detalj Mostara, miran urednički raspored.
- **Jasan smjer:** tamnoplava, velika kompaktna tipografija, jedan prostorni prikaz originalnog znaka i kratka animacija, zatim svijetle funkcionalne sekcije. Izbjegavati generičnu tamnu SaaS estetiku i svjetleće kugle.

## Implementacijski prompt
Redizajniraj postojeću Astro stranicu ACCOUNT prema odabranom vizuelnom konceptu. Radi na zasebnoj grani iz postojeće default grane claude/slike-za-slanje-cui34c. Sačuvaj sve postojeće poslovne informacije, rute, recenzije, članke, društvene linkove, alate, kalkulatore, API i SEO ponašanje.

Glavni cilj: posjetilac brzo razumije uslugu, prepozna lokalnu stručnost i pronađe kontakt. Ne dodavati nove izmišljene rezultate, rokove odgovora, cijene, tim ili certifikate. Originalni logo koristiti iz postojećih datoteka, bez generisane zamjene.

Kreni od HomeHero.astro, Header.astro, MobileBar.astro i global.css. Zatim uskladi početnu i podstranice. Na mobitelu ciljaj kompaktno zaglavlje približno 64–72 px, čitljiv H1 oko 38–46 px zavisno od širine, tekst najmanje 16 px i dodirne mete približno 44 px ili veće. Ovo su početne dizajnerske vrijednosti, ne zamjena za provjeru preloma.

Predloženi naslov: „Uredne knjige. Jasni poslovni koraci.“ Uz njega jasno navesti „Računovodstvena agencija · Mostar“ i kratak opis računovodstva, poreznih prijava i savjetovanja. Primarni CTA „Zatražite ponudu“ i tekstualni link ka uslugama. Sačuvati postojeći slogan ako je potreban u ostatku sadržaja.

Originalni znak može dobiti diskretno pojavljivanje ili blag prostorni pomak, ali navigacija i sadržaj su odmah dostupni. Bez scroll-jackinga, automatskog zvuka, beskonačnog pomjeranja naslova i WebGL tereta bez jasne potrebe. Poštovati prefers-reduced-motion. Animacije stanja oko 150–250 ms; ulazi sekcija oko 350–550 ms kao početni raspon.

Početna treba imati namjerno različit ritam: sažet hero; dokaz iskustva; pregled usluga; postojeće recenzije; tri koraka saradnje; postojeći vodič i kalkulator kao korisna podrška; savjeti; FAQ i kontakt. Redoslijed prilagoditi odabranom konceptu bez gubitka sadržaja.

Društvene mreže ostaju direktno povezane. Ne uvoditi težak Instagram embed u prvi ekran. Ne preuzimati tuđe kreativne materijale u public direktorij; reference služe za principe kompozicije.

## Kriteriji prije predaje
- Provjera na širinama 360, 390, 768 i 1440 px: bez horizontalnog preljeva, odsječenog loga ili pokrivenih kontrola.
- Primarna akcija dostupna bez čekanja animacije. Donja mobilna traka ne duplira vidljivu primarnu akciju.
- Meni se otvara, zatvara Escape tipkom i vraća fokus. Provjeriti fokus u otvorenom meniju.
- Put početna → usluga → upit čuva kontekst. Provjeriti vodič i kalkulatore na poznatim ulazima.
- Provjeriti prikaz validacije i grešaka bez slanja izmišljenih upita agenciji.
- Pokrenuti postojeće check, test i build skripte kada se promijeni kod.
- Prije i poslije screenshotovi u istom viewportu. Jasno navesti šta nije testirano.
- Mjeriti konverziju tek nakon objave i stvarnog prometa; lijep mockup nije dokaz poslovnog rezultata.

## Izvori
- https://wearecollins.com/case-studies/altruist/
- https://raggededge.com/partnerships/wise
- https://www.jvm.ch/de/arbeiten/limmat-postfinance-ist-doch-ganz-normal
- https://tbwaraad.com/work/art-gap/
- https://www.instagram.com/ayzz.thedesigner/reel/DDHfjS_AB8l/
- https://www.instagram.com/ayzz.thedesigner/reel/Dc8wTTji5q-/
- https://www.facebook.com/100093555158263/videos/coffee-website-design-in-figma-by-ayzz-the-designer/1326348545370455/
- https://www.reddit.com/r/webdesign/comments/1u1579w/so_many_websites_look_like_this_now/
- https://www.reddit.com/r/web_design/comments/1vxra9d/what_makes_a_website_feel_human_instead_of/
- https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- https://www.nngroup.com/articles/gestalt-similarity/

Forumske rasprave spominju ponavljanje šablona i nedosljedne komponente; to podržava temu za razmatranje, ali nije dokaz uzroka ili efektivnosti određenog redizajna.
