import type { Faq } from './services.ts';

// Opća pitanja — sadržaj prati FAQ postojećeg weba, prepisan jasnije.
export const generalFaq: Faq[] = [
  {
    q: 'Kako počinje saradnja?',
    a: 'Uvodnim razgovorom i analizom vaših potreba. Nakon toga dogovaramo obim posla, način dostave dokumentacije i dinamiku izvještavanja.',
  },
  {
    q: 'Mogu li dokumentaciju dostavljati e-mailom?',
    a: 'Da. Dokumentaciju možete dostavljati digitalno, e-mailom. Format i dinamiku dostave dogovaramo na početku saradnje.',
  },
  {
    q: 'Koliko koštaju vaše usluge?',
    a: 'Cijena je individualna i zavisi od obima i složenosti posla. Ponudu pripremamo prema potrebama vašeg poslovanja, nakon razgovora.',
  },
  {
    q: 'Brinete li o redovnim prijavama?',
    a: 'Da, redovne prijave dio su računovodstvene podrške. Tačan obuhvat definišemo u dogovoru o saradnji.',
  },
  {
    q: 'Hoću li imati pregled svog poslovanja?',
    a: 'Pripremamo periodične izvještaje, u dogovorenoj dinamici, kako biste znali kako posluje vaša firma.',
  },
];
