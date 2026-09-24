// Provjereno prema živoj izvornoj stranici 24. 9. 2026.
// https://www.agencija-account.com/ — četiri recenzije u izvornom redoslijedu.
export interface Review {
  name: string;
  text: string;
  image?: string;
}

export const reviews: Review[] = [
  {
    name: 'Adis Krvavac',
    image: '/images/reviews/Adis-Krvavac.webp',
    text: 'Stvarno su odlični! Profesionalni, brzi i uvijek na raspolaganju kada treba pomoć ili savjet. Zaista su pravi izbor za svakoga ko traži kvalitetnu i pouzdanu računovodstvenu podršku. Preporučujem ih od srca!',
  },
  {
    name: 'Maja',
    text: 'Uvijek su na raspolaganju i stvarno znaju svoj posao. Bez obzira na složenost, sve završe precizno i tačno, a komunikacija s njima je uvijek jasna i ugodna. Definitivno ih preporučujem svima koji žele pouzdan tim na svojoj strani!',
  },
  { name: 'Alem Šunje', text: 'Preporučujem.', image: '/images/reviews/Alem-Sunje.webp' },
  { name: 'Almir Eglenović', text: 'Preporučujem.', image: '/images/reviews/Almir-Eglenovic.webp' },
];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
