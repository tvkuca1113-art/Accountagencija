import type { ImageName } from './services.ts';

// Kratki praktični članci zasnovani na temama s Instagrama agencije (septembar 2026).
// Tekst je originalan. Ako se u članak dodaju porezne stope, rokovi ili propisi, provjeriti ih
// kod nadležnih službenih izvora u BiH i ažurirati polje `updated`.

export interface Article {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO datum
  updated: string;
  readingMinutes: number;
  image: ImageName;
  imageAlt: string;
  related: { href: string; label: string }[];
  body: string; // pouzdani HTML koji piše urednik stranice
}

export const articles: Article[] = [
  {
    slug: 'prihod-i-dobit-nisu-isto',
    title: 'Prihod i dobit nisu isto',
    description:
      'Zašto uspješan mjesec po prihodu ne mora biti uspješan i po rezultatu, i kako jednostavan pregled troškova pokazuje šta zaista ostaje.',
    published: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 4,
    image: 'account-knjigovodstvo',
    imageAlt: 'Kalkulator i finansijski izvještaj sa zaglavljem ACCOUNT na radnom stolu',
    related: [
      { href: '/korisni-alati#kalkulator', label: 'Izračunajte prag pokrića troškova' },
      { href: '/racunovodstvo', label: 'Računovodstvo i knjigovodstvo' },
    ],
    body: `
<p>Kad na račun stigne veća uplata, lako je zaključiti da posao ide odlično. Ali prihod pokazuje samo koliko je novca ušlo u poslovanje. Koliko od toga zaista ostaje, vidi se tek kad od prihoda oduzmete troškove.</p>

<h2>Prihod je tek početak priče</h2>
<p>Prihod je iznos koji ste ostvarili prodajom proizvoda ili usluga. Dobit je ono što ostane kad se od prihoda oduzmu svi troškovi koji su bili potrebni da taj prihod nastane. Dvije firme s istim prihodom mogu imati potpuno različit rezultat, zavisno od toga koliko ih posao košta.</p>

<h2>Troškovi koje je lako previdjeti</h2>
<p>Većina vlasnika dobro zna svoje najveće troškove. Rezultat najčešće „pojedu“ manje stavke koje se ne prate redovno:</p>
<ul>
  <li><strong>Fiksni troškovi</strong> plaćaju se bez obzira na to koliko prodate: zakup, plate, pretplate na softver, računovodstvo, osiguranje.</li>
  <li><strong>Varijabilni troškovi</strong> rastu s prodajom: materijal, roba, pakovanje, provizije za plaćanje karticama.</li>
  <li><strong>Povremeni troškovi</strong> dolaze jednom ili dva puta godišnje, npr. održavanje opreme ili godišnje naknade, pa ih je lako zaboraviti pri mjesečnom planiranju.</li>
</ul>

<h2>Jednostavan primjer</h2>
<p>Recimo da mjesečni fiksni troškovi iznose 2.000 KM, a varijabilni troškovi čine 40 % prihoda. Uz prihod od 5.000 KM varijabilni troškovi iznose 2.000 KM. Nakon fiksnih troškova ostaje 1.000 KM.</p>
<p>Taj iznos je pojednostavljeni planski višak, a ne konačna dobit: u njega nisu uračunati porezi, doprinosi ni druge obaveze koje zavise od vašeg oblika poslovanja. Ipak, već ovakav pregled jasno pokazuje koliko prihod mora biti velik da bi posao uopće pokrio svoje troškove.</p>

<h2>Novac na računu nije isto što i rezultat</h2>
<p>Ni stanje na računu nije pouzdan pokazatelj uspjeha. Kupac može platiti s kašnjenjem, na račun može stići avans za posao koji tek treba obaviti, a neke obaveze dospijevaju tek sljedećeg mjeseca. Zato je korisno odvojeno pratiti rezultat poslovanja i novčani tok.</p>

<h2>Šta možete uraditi već ovog mjeseca</h2>
<ul>
  <li>Jednom mjesečno uporedite prihode i troškove istog perioda.</li>
  <li>Razvrstajte troškove na fiksne i varijabilne.</li>
  <li>Odvojite lične od poslovnih troškova.</li>
  <li>Unaprijed rasporedite povremene troškove na mjesece u kojima nastaju.</li>
  <li>Nejasne stavke provjerite sa svojim računovođom prije nego što donesete odluku.</li>
</ul>
`,
  },
  {
    slug: 'sta-pripremiti-za-prvi-razgovor-s-racunovodjom',
    title: 'Šta pripremiti za prvi razgovor s računovođom',
    description:
      'Kratka lista podataka i dokumenata s kojima prvi razgovor s računovođom brže prelazi u konkretan dogovor, i nekoliko navika koje čuvaju dokumentaciju urednom.',
    published: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 4,
    image: 'account-savjetovanje',
    imageAlt: 'Dvije osobe za stolom, pred njima tamnoplavi fascikl ACCOUNT i dokumenti',
    related: [
      { href: '/korisni-alati#konfigurator', label: 'Pripremite upit kroz konfigurator' },
      { href: '/kontakt', label: 'Zakažite razgovor' },
    ],
    body: `
<p>Prvi razgovor s računovođom služi da se upoznate s poslovanjem i dogovorite obim saradnje. Što više osnovnih informacija imate pri ruci, to brže dobijate konkretnu ponudu i jasan plan.</p>

<h2>Osnovni podaci o poslovanju</h2>
<ul>
  <li>Oblik poslovanja: firma, obrt ili udruženje, ili tek planirate registraciju.</li>
  <li>Djelatnost i način na koji prodajete, npr. gotovinski ili preko računa.</li>
  <li>Datum registracije i sjedište, ako poslovanje već postoji.</li>
</ul>

<h2>Obim posla</h2>
<ul>
  <li>Približan broj ulaznih i izlaznih faktura mjesečno.</li>
  <li>Broj zaposlenih i planirane promjene.</li>
  <li>Da li ste u sistemu PDV-a. Ako niste sigurni, recite to otvoreno, pa ćemo zajedno provjeriti.</li>
</ul>

<h2>Trenutno stanje evidencija</h2>
<p>Ako mijenjate računovođu, pripremite informaciju o tome ko je do sada vodio knjige, za koje periode su predane prijave i gdje se nalazi dokumentacija. Tako prijelaz prolazi bez praznina.</p>

<h2>Navike koje čuvaju dokumentaciju urednom</h2>
<ul>
  <li>Jedna fascikla, fizička ili digitalna, za svaki mjesec.</li>
  <li>Dosljedni nazivi datoteka, npr. datum, dobavljač i broj računa.</li>
  <li>Čitljivi skenovi ili fotografije, s vidljivim cijelim dokumentom.</li>
  <li>Dostava dokumentacije u dogovorenom roku, a ne tek pred kraj godine.</li>
  <li>Odvojen poslovni i lični račun, kako se troškovi ne bi miješali.</li>
</ul>

<h2>Pitanja koja vrijedi postaviti</h2>
<ul>
  <li>Šta sve ulazi u dogovoreni obim posla?</li>
  <li>Kako i do kada dostavljam dokumentaciju?</li>
  <li>Koje izvještaje dobijam i koliko često?</li>
  <li>Kome se javljam kada imam pitanje?</li>
</ul>
`,
  },
  {
    slug: 'pregled-troskova-i-planiranje-ulaganja',
    title: 'Kako pregled troškova pomaže pri planiranju ulaganja',
    description:
      'Prije nove opreme, prostora ili zaposlenja provjerite koliko vaš posao troši i kako će ulaganje promijeniti prag pokrića troškova.',
    published: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 5,
    image: 'account-poslovni-projekti',
    imageAlt: 'Otvorena bilježnica sa skicama plana i plave kartice na drvenom stolu',
    related: [
      { href: '/korisni-alati#kalkulator', label: 'Kalkulator pokrića troškova' },
      { href: '/konzultantske-usluge', label: 'Poslovno i porezno savjetovanje' },
    ],
    body: `
<p>Novo ulaganje može ubrzati rast, ali i opteretiti poslovanje ako se donese bez pregleda brojki. Dobra vijest je da za prvu procjenu ne trebate složene modele, nego uredan pregled troškova.</p>

<h2>1. Pogledajte posljednjih šest do dvanaest mjeseci</h2>
<p>Saberite prihode i troškove po mjesecima. Tako vidite prosjek, ali i sezonske oscilacije: mjesece u kojima je posla manje, a troškovi ostaju isti.</p>

<h2>2. Odvojite fiksne od varijabilnih troškova</h2>
<p>Fiksni troškovi ne zavise od prodaje, a varijabilni rastu s njom. Ta podjela pokazuje koliki promet vam treba samo da biste pokrili troškove, odnosno gdje je vaš prag pokrića.</p>

<h2>3. Procijenite kako ulaganje mijenja troškove</h2>
<p>Novi zaposlenik, veći prostor ili rata za opremu najčešće povećavaju fiksne troškove. Nova oprema ponekad smanjuje varijabilne troškove, npr. manje otpada ili brža izrada. Upišite realne iznose, a ne one koji najbolje izgledaju.</p>

<h2>4. Izračunajte novi prag pokrića</h2>
<p>Ako se nakon ulaganja prag pokrića znatno podigne, zapitajte se je li realno da promet toliko poraste i koliko bi to trajalo. Upravo za ovakvu provjeru možete koristiti naš kalkulator pokrića troškova.</p>

<h2>5. Planirajte rezervu</h2>
<p>Ulaganje rijetko počne donositi rezultat od prvog dana. Rezerva za nekoliko mjeseci fiksnih troškova daje prostor da novi dio posla zaživi bez pritiska na redovne obaveze.</p>

<h2>Finansijsko zdravlje prije rasta</h2>
<p>Prije većeg ulaganja provjerite da su redovne obaveze izmirene i da znate koje vas obaveze čekaju u narednim mjesecima. Rast je najsigurniji kad počiva na urednim evidencijama i jasnom pregledu poslovanja.</p>
`,
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

// Tri posljednje objave s Instagrama kao lagane kartice s originalnim linkovima.
// Sažetak opisuje temu objave; ne kopirati duge opise.
export const socialPosts = [
  {
    date: '2026-09-23',
    network: 'Instagram',
    url: 'https://www.instagram.com/p/Ddoqtgglapf/',
    topic: 'Kada je pravi trenutak za ulaganje',
    summary: 'Kako procijeniti trenutak i mogućnosti za ulaganje prije nego što se donese odluka.',
  },
  {
    date: '2026-09-18',
    network: 'Instagram',
    url: 'https://www.instagram.com/p/DdbSAKuFQhb/',
    topic: 'Stvarni troškovi i rezultat',
    summary: 'Zašto je važno poznavati stvarne troškove da biste vidjeli pravi rezultat poslovanja.',
  },
  {
    date: '2026-09-14',
    network: 'Instagram',
    url: 'https://www.instagram.com/p/DdRa5rOFfwK/',
    topic: 'Uredna dokumentacija',
    summary: 'Kako uredna dokumentacija pomaže da se izbjegnu česte poslovne greške.',
  },
];

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}. ${m}. ${y}.`;
};
