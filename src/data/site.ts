// Jedinstveni izvor kontakt podataka i osnovnih informacija o agenciji.
// Status svakog podatka (provjereno / potvrdila agencija / čeka potvrdu) vodi se u docs/SADRZAJ-I-IZVORI.md.

export const site = {
  name: 'ACCOUNT',
  legalName: 'Računovodstvena agencija ACCOUNT',
  shortDescription: 'Računovodstvena agencija · Mostar',
  url: 'https://www.agencija-account.com',
  locale: 'bs-BA',

  address: {
    street: 'Lacina bb, Villa Neretva, 1. sprat',
    postalCode: '88000',
    city: 'Mostar',
    country: 'Bosna i Hercegovina',
    countryCode: 'BA',
  },
  // Pretraga po adresi umjesto skraćenog maps.app.goo.gl linka, čija destinacija još nije potvrđena.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lacina%20bb%2C%20Villa%20Neretva%2C%2088000%20Mostar',

  phones: [
    { label: 'Mobilni', display: '+387 62 675 596', href: 'tel:+38762675596', e164: '+38762675596' },
    { label: 'Fiksni', display: '+387 36 550 385', href: 'tel:+38736550385', e164: '+38736550385' },
  ],
  email: 'aldijana_suta@hotmail.com',

  social: [
    { name: 'Instagram', handle: '@agencijaaccount', url: 'https://www.instagram.com/agencijaaccount/' },
    { name: 'Facebook', handle: 'accountagencija', url: 'https://www.facebook.com/accountagencija/' },
  ],
  // Lični profesionalni profil; ne predstavljati kao profil kompanije i ne dodavati u sameAs.
  linkedinPersonal: 'https://www.linkedin.com/in/aldijana-suta-811a352b4/',

  // Potvrdila agencija 23. 9. 2026.
  stats: [
    { value: '10+', label: 'godina iskustva' },
    { value: '300+', label: 'klijenata' },
  ],

  // Originalni znak agencije (izvornik: source-images/brand/account-znak-original.png), u izvornim proporcijama.
  // Uklonjen je samo prazan prozirni rub; sam znak nije mijenjan.
  logo: {
    src: '/brand/account-znak-112.png',
    srcWebp: '/brand/account-znak-112.webp',
    full: '/brand/account-znak.png',
    width: 806,
    height: 1025,
  } as null | { src: string; srcWebp: string; full: string; width: number; height: number },

  // Postojeće verifikacijske meta oznake (npr. Google Search Console) prepisati ovdje: { name, content }.
  verification: [] as { name: string; content: string }[],
};

export const nav = [
  { href: '/usluge', label: 'Usluge' },
  { href: '/o-nama', label: 'O nama' },
  { href: '/korisni-alati', label: 'Korisni alati' },
  { href: '/savjeti', label: 'Savjeti' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const primaryPhone = site.phones[0];

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
