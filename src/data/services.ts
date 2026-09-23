// Pet uslužnih kategorija. Obuhvat prati ponudu postojećeg weba; kategorija „Ostale usluge“
// podijeljena je na registracije i poslovne projekte (razrada postojeće ponude, ne nova usluga).
// Obračun plaća i slične operativne usluge dodati tek kad ih agencija potvrdi.

export type ImageName =
  | 'mostar-stari-most'
  | 'account-hero'
  | 'account-knjigovodstvo'
  | 'account-savjetovanje'
  | 'account-inostrana-preduzeca'
  | 'account-registracija'
  | 'account-poslovni-projekti';

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  benefit: string;
  image: ImageName;
  imageAlt: string;
  intro: string;
  forWhom: string[];
  scope: string[];
  steps: { title: string; text: string }[];
  prepare: string[];
  faq: Faq[];
}

export const services: Service[] = [
  {
    slug: 'racunovodstvo',
    title: 'Računovodstvo i knjigovodstvo',
    h1: 'Računovodstvo i knjigovodstvo za firme i obrte u Mostaru',
    metaTitle: 'Računovodstvo i knjigovodstvo Mostar | Agencija ACCOUNT',
    metaDescription:
      'Vođenje poslovnih knjiga, finansijski izvještaji i redovne porezne prijave za firme i obrte. Dokumentaciju možete dostavljati e-mailom. Zatražite ponudu.',
    benefit: 'Uredne evidencije i razumljiviji pregled poslovanja.',
    image: 'account-knjigovodstvo',
    imageAlt:
      'Ruka vodi evidencije u bilježnici pored kalkulatora, računa i tamnoplavog fascikla sa znakom ACCOUNT (ilustrativna scena)',
    intro:
      'Vodimo poslovne knjige i evidencije, pripremamo finansijske izvještaje i brinemo o redovnim prijavama, tako da u svakom trenutku znate gdje vaše poslovanje stoji.',
    forWhom: [
      'Firme koje žele pouzdanu vanjsku računovodstvenu podršku.',
      'Obrti i preduzetnici koji trebaju uredno vođene knjige i prijave.',
      'Udruženja kojima trebaju evidencije i izvještaji.',
      'Oni koji mijenjaju računovođu i žele jasan prijelaz.',
    ],
    scope: [
      'Vođenje evidencija i poslovnih knjiga.',
      'Izrada finansijskih izvještaja.',
      'Redovne porezne prijave.',
      'Periodični izvještaji o poslovanju, u dogovorenoj dinamici.',
      'Digitalna dostava dokumentacije e-mailom.',
    ],
    steps: [
      { title: 'Razgovor o potrebama', text: 'Upoznajemo vaše poslovanje, oblik organizacije i trenutno stanje evidencija.' },
      { title: 'Dogovor o obimu i dostavi', text: 'Definišemo šta preuzimamo, kako i kojom dinamikom dostavljate dokumentaciju.' },
      { title: 'Redovna obrada i komunikacija', text: 'Knjižimo, pripremamo prijave i izvještaje te vas obavještavamo o važnim stavkama.' },
    ],
    prepare: [
      'Oblik poslovanja (firma, obrt, udruženje) i djelatnost.',
      'Približan broj ulaznih i izlaznih faktura mjesečno.',
      'Broj zaposlenih.',
      'Da li ste u sistemu PDV-a, ako znate.',
      'Kako se evidencije vode danas i od kada biste željeli početi.',
    ],
    faq: [
      {
        q: 'Mogu li dokumentaciju dostavljati e-mailom?',
        a: 'Da. Dokumentaciju možete dostavljati digitalno, e-mailom. Na početku saradnje dogovaramo format i dinamiku dostave.',
      },
      {
        q: 'Brinete li o redovnim prijavama?',
        a: 'Redovne prijave dio su računovodstvene podrške. Tačan spisak prijava i rokova koje preuzimamo definišemo u dogovoru, prema vašem obliku poslovanja.',
      },
      {
        q: 'Hoću li dobijati pregled poslovanja?',
        a: 'Da, pripremamo periodične izvještaje kako biste imali pregled prihoda, troškova i obaveza. Dinamiku dogovaramo zajedno.',
      },
      {
        q: 'Kako se određuje cijena?',
        a: 'Cijena je individualna i zavisi od obima i složenosti posla, npr. broja dokumenata i zaposlenih. Ponudu pripremamo nakon razgovora o vašim potrebama.',
      },
    ],
  },
  {
    slug: 'konzultantske-usluge',
    title: 'Poslovno i porezno savjetovanje',
    h1: 'Poslovno i porezno savjetovanje',
    metaTitle: 'Poslovno i porezno savjetovanje Mostar | Agencija ACCOUNT',
    metaDescription:
      'Savjetovanje o finansijama, porezima i narednim poslovnim odlukama. Razgovarajte s agencijom ACCOUNT iz Mostara i zatražite ponudu.',
    benefit: 'Podrška u razumijevanju finansija i planiranju narednih odluka.',
    image: 'account-savjetovanje',
    imageAlt:
      'Dvije osobe za stolom razgovaraju nad jednostavnim finansijskim prikazom, pored tamnoplavog fascikla sa znakom ACCOUNT (ilustrativna scena)',
    intro:
      'Pomažemo vam da razumijete brojke iza svog poslovanja i da prije važne odluke sagledate finansijske i porezne posljedice.',
    forWhom: [
      'Vlasnici firmi i obrta koji planiraju promjenu ili rast.',
      'Oni koji žele bolje razumjeti svoje finansijske izvještaje.',
      'Preduzetnici koji imaju pitanja o poreznim obavezama svog poslovanja.',
    ],
    scope: [
      'Porezno savjetovanje u vezi s vašim poslovanjem.',
      'Poslovno savjetovanje i analiza potreba.',
      'Objašnjenje finansijskih izvještaja i ključnih pokazatelja.',
      'Podrška pri planiranju narednih poslovnih odluka.',
    ],
    steps: [
      { title: 'Razgovor o potrebama', text: 'Opišete situaciju i pitanje na koje tražite odgovor.' },
      { title: 'Dogovor o obimu', text: 'Dogovaramo koje podatke i dokumente trebamo pregledati i u kojem roku.' },
      { title: 'Analiza i preporuka', text: 'Pregledamo podatke i razgovaramo o mogućnostima i narednim koracima.' },
    ],
    prepare: [
      'Kratak opis pitanja ili odluke koju planirate.',
      'Posljednje finansijske izvještaje, ako postoje.',
      'Oblik poslovanja i djelatnost.',
      'Vremenski okvir u kojem vam treba odgovor.',
    ],
    faq: [
      {
        q: 'Mogu li dobiti savjet i ako niste moj računovođa?',
        a: 'Da, savjetovanje možete zatražiti i kao zasebnu uslugu. Obim i način rada dogovaramo nakon što opišete šta vam treba.',
      },
      {
        q: 'Da li je savjetovanje isto što i pravno zastupanje?',
        a: 'Ne. Savjetujemo o računovodstvenim, finansijskim i poreznim pitanjima poslovanja. Za pravno zastupanje obratite se advokatu.',
      },
      {
        q: 'Kako počinje savjetovanje?',
        a: 'Uvodnim razgovorom i analizom potreba. Nakon toga znate šta ćemo pregledati i kakvu ponudu možete očekivati.',
      },
    ],
  },
  {
    slug: 'zastupanje-inostranih-poduzeca',
    title: 'Zastupanje inostranih preduzeća',
    h1: 'Zastupanje i podrška inostranim preduzećima u BiH',
    metaTitle: 'Podrška inostranim preduzećima u BiH | Agencija ACCOUNT',
    metaDescription:
      'Ovlašteno zastupanje stranih poreznih obveznika i lokalna podrška za administrativne i računovodstvene potrebe inostranih preduzeća u BiH.',
    benefit: 'Lokalna podrška za administrativne i računovodstvene potrebe poslovanja u BiH.',
    image: 'account-inostrana-preduzeca',
    imageAlt:
      'Poslovni razgovor za stolom: predaja dokumenta pored tamnoplavog fascikla sa znakom ACCOUNT, u pozadini uokvirena fotografija Mostara (ilustrativna scena)',
    intro:
      'Pružamo ovlašteno zastupanje stranih poreznih obveznika i lokalnu podršku za administrativne i računovodstvene potrebe poslovanja u Bosni i Hercegovini.',
    forWhom: [
      'Inostrana preduzeća koja posluju ili planiraju poslovati u BiH.',
      'Strani porezni obveznici kojima je potrebno ovlašteno zastupanje.',
    ],
    scope: [
      'Ovlašteno zastupanje stranih poreznih obveznika.',
      'Lokalna podrška za administrativne i računovodstvene potrebe poslovanja u BiH.',
      'Vođenje evidencija i poslovnih knjiga, kao dio računovodstvene podrške.',
    ],
    steps: [
      { title: 'Razgovor o potrebama', text: 'Upoznajemo vaše poslovanje u BiH i obaveze koje iz njega proizlaze.' },
      { title: 'Dogovor o obimu i dostavi', text: 'Definišemo odgovornosti, način komunikacije i dostave dokumentacije.' },
      { title: 'Redovna obrada i komunikacija', text: 'Obrađujemo dokumentaciju i pravovremeno vas obavještavamo o obavezama.' },
    ],
    prepare: [
      'Zemlja sjedišta i oblik preduzeća.',
      'Kakvu aktivnost obavljate ili planirate u BiH.',
      'Da li je poslovanje u BiH već registrovano.',
      'Kontakt osobu i željeni način komunikacije.',
    ],
    faq: [
      {
        q: 'Da li je ovo advokatsko zastupanje?',
        a: 'Ne. Ovlašteno zastupanje stranih poreznih obveznika nije advokatsko zastupanje. Za pravna pitanja i zastupanje pred sudom potreban je advokat.',
      },
      {
        q: 'Možemo li sarađivati ako nismo u Mostaru?',
        a: 'Da. Dokumentacija se može dostavljati e-mailom, a način komunikacije dogovaramo na početku saradnje.',
      },
      {
        q: 'Šta trebamo poslati prije prvog razgovora?',
        a: 'Dovoljan je kratak opis poslovanja u BiH i trenutnog statusa registracije. Detaljnu dokumentaciju dogovaramo kasnije.',
      },
    ],
  },
  {
    slug: 'registracija-firmi-obrta-udruzenja',
    title: 'Registracija firmi, obrta i udruženja',
    h1: 'Pomoć pri registraciji firme, obrta ili udruženja',
    metaTitle: 'Registracija obrta i firme Mostar | Agencija ACCOUNT',
    metaDescription:
      'Pomoć u pripremi dokumentacije i koracima pokretanja firme, obrta ili udruženja u Mostaru. Razgovarajte s agencijom ACCOUNT.',
    benefit: 'Pomoć u pripremi dokumentacije i koracima pokretanja poslovanja.',
    image: 'account-registracija',
    imageAlt:
      'Ključ na uredno pripremljenoj dokumentaciji pored tamnoplavog fascikla sa znakom ACCOUNT (ilustrativna scena)',
    intro:
      'Pokretanje poslovanja lakše je kad znate redoslijed koraka. Pomažemo u pripremi dokumentacije i vodimo vas kroz registraciju firme, obrta ili udruženja.',
    forWhom: [
      'Ljudi koji pokreću svoj prvi posao.',
      'Preduzetnici koji otvaraju obrt ili osnivaju firmu.',
      'Osnivači udruženja.',
    ],
    scope: [
      'Razgovor o tome šta planirate i koji su naredni koraci.',
      'Pomoć u pripremi dokumentacije za registraciju.',
      'Podrška kroz korake pokretanja poslovanja.',
      'Dogovor o računovodstvenoj podršci nakon registracije, ako je želite.',
    ],
    steps: [
      { title: 'Razgovor o planu', text: 'Opišete djelatnost i kako planirate poslovati.' },
      { title: 'Dogovor o dokumentaciji', text: 'Dobijate spisak potrebnih podataka i dokumenata te redoslijed koraka.' },
      { title: 'Registracija i početak rada', text: 'Pratimo korake do registracije i dogovaramo dalju podršku.' },
    ],
    prepare: [
      'Djelatnost kojom se planirate baviti.',
      'Da li planirate obrt, firmu ili udruženje, ako ste već odlučili.',
      'Planirani broj osnivača i zaposlenih.',
      'Željeni datum početka rada.',
    ],
    faq: [
      {
        q: 'Ne znam da li mi treba obrt ili firma. Možete li pomoći?',
        a: 'Na uvodnom razgovoru prolazimo kroz vaš plan i računovodstvene posljedice pojedinih mogućnosti, kako biste lakše donijeli odluku.',
      },
      {
        q: 'Vodite li knjige i nakon registracije?',
        a: 'Da, ako želite. Nakon registracije možemo nastaviti saradnju kroz računovodstvo i knjigovodstvo.',
      },
      {
        q: 'Koliko traje registracija?',
        a: 'Zavisi od oblika poslovanja i nadležnih institucija. Okvirni tok koraka dobijate nakon uvodnog razgovora.',
      },
    ],
  },
  {
    slug: 'poslovni-projekti',
    title: 'Poslovni projekti i planiranje',
    h1: 'Poslovni projekti i planiranje',
    metaTitle: 'Poslovni plan i projekti Mostar | Agencija ACCOUNT',
    metaDescription:
      'Razrada poslovne ideje, budžeta i poslovnog plana uz podršku agencije ACCOUNT iz Mostara. Zatražite ponudu za pripremu projekta.',
    benefit: 'Razrada ideje, budžeta i poslovnog plana.',
    image: 'account-poslovni-projekti',
    imageAlt:
      'Planiranje uz otvorenu bilježnicu, plave kartice i uzorke materijala, pored tamnoplavog fascikla sa znakom ACCOUNT (ilustrativna scena)',
    intro:
      'Pomažemo vam da ideju pretočite u jasan poslovni plan s budžetom i brojkama koje možete obrazložiti.',
    forWhom: [
      'Oni koji pripremaju poslovni plan za novu ideju.',
      'Firme koje planiraju ulaganje ili novi projekt.',
      'Podnosioci projekata kojima treba finansijski dio dokumentacije.',
    ],
    scope: [
      'Razrada poslovne ideje.',
      'Priprema budžeta i finansijskih projekcija.',
      'Izrada poslovnog plana.',
      'Priprema poslovnih projekata.',
    ],
    steps: [
      { title: 'Razgovor o ideji', text: 'Opišete ideju, cilj projekta i rok do kojeg vam treba dokumentacija.' },
      { title: 'Dogovor o obimu', text: 'Dogovaramo sadržaj plana, potrebne podatke i dinamiku rada.' },
      { title: 'Izrada i usaglašavanje', text: 'Pripremamo plan i budžet te ih usaglašavamo s vama.' },
    ],
    prepare: [
      'Kratak opis ideje ili projekta.',
      'Namjenu plana (interno planiranje, partneri, javni poziv i sl.).',
      'Procjenu potrebnih ulaganja, ako je imate.',
      'Rok do kojeg vam treba gotova dokumentacija.',
    ],
    faq: [
      {
        q: 'Garantujete li odobrenje finansiranja?',
        a: 'Ne. Pripremamo kvalitetan plan i budžet, ali odluku o finansiranju donosi banka, investitor ili davalac sredstava.',
      },
      {
        q: 'Mogu li doći samo s idejom?',
        a: 'Da. Na uvodnom razgovoru zajedno utvrđujemo koje podatke treba prikupiti da bi plan bio uvjerljiv.',
      },
      {
        q: 'Koliko unaprijed trebam javiti?',
        a: 'Što ranije, to bolje, posebno ako postoji rok za javni poziv. Tačan vremenski okvir dogovaramo prema obimu projekta.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

// Opcije za polje „Usluga“ u kontakt formi.
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'nisam-siguran', label: 'Nisam siguran/na' },
  { value: 'drugo', label: 'Drugo' },
];

// Kome pomažemo — svaka opcija vodi ka relevantnoj usluzi.
export const audiences = [
  { title: 'Postojeće firme', text: 'Vođenje knjiga, izvještaji i redovne prijave.', slug: 'racunovodstvo' },
  { title: 'Obrti', text: 'Uredne evidencije i prijave bez gubljenja vremena.', slug: 'racunovodstvo' },
  { title: 'Pokrećete posao', text: 'Registracija firme, obrta ili udruženja.', slug: 'registracija-firmi-obrta-udruzenja' },
  { title: 'Inostrana preduzeća', text: 'Lokalna podrška za poslovanje u BiH.', slug: 'zastupanje-inostranih-poduzeca' },
];
