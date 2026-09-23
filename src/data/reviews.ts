// Recenzije objavljene na dosadašnjoj web stranici agencije (agencija-account.com), s istim imenima i tekstom.
// Tekst je preuzet iz indeksa pretraživača jer stranici nije bilo moguće pristupiti iz razvojnog okruženja —
// prije produkcije uporediti sa živom stranicom (docs/SADRZAJ-I-IZVORI.md). Bez zvjezdica, ocjena i datuma.

export interface Review {
  name: string;
  text: string;
}

export const reviews: Review[] = [
  {
    name: 'Adis Krvavac',
    text: 'Stvarno su odlični! Profesionalni, brzi i uvijek na raspolaganju kada treba pomoć ili savjet. Zaista su pravi izbor za svakoga ko traži kvalitetnu i pouzdanu računovodstvenu podršku. Preporučujem ih od srca!',
  },
  {
    name: 'Maja',
    text: 'Uvijek su na raspolaganju i stvarno znaju svoj posao. Bez obzira na složenost, sve završe precizno i tačno, a komunikacija s njima je uvijek jasna i ugodna. Definitivno ih preporučujem svima koji žele pouzdan tim na svojoj strani!',
  },
  { name: 'Alem Šunja', text: 'Preporučujem.' },
  { name: 'Almir Eglenović', text: 'Preporučujem.' },
];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
