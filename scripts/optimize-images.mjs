// Izrađuje optimizirane web varijante iz izvornih slika u source-images/.
// Pokretanje: npm run images  (izlaz ide u public/images/, izvornici ostaju netaknuti)
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'source-images';
const OUT = 'public/images';

// crop: dio izvorne slike koji se zadržava (u pikselima izvornika).
// Kadrovi su birani tako da logo i ključni motiv ostanu u slici.
const jobs = [
  // Hero, izvornik 1672×941 (16:9). Desktop 16:10 i mobilni 4:5, oba poravnata desno
  // jer su prozor sa Starim mostom, laptop i fascikl s logotipom na desnoj strani.
  { name: 'account-hero', crop: { left: 166, top: 0, width: 1506, height: 941 }, widths: [640, 960, 1280, 1506], quality: { webp: 80, avif: 60 } },
  { name: 'account-hero-mobile', from: 'account-hero', crop: { left: 919, top: 0, width: 753, height: 941 }, widths: [480, 753], quality: { webp: 80, avif: 60 } },
  // Kartice i uvodi podstranica, izvornici 1448×1086 (4:3) — bez rezanja.
  ...[
    'account-knjigovodstvo',
    'account-savjetovanje',
    'account-inostrana-preduzeca',
    'account-registracija',
    'account-poslovni-projekti',
  ].map((name) => ({ name, widths: [480, 800, 1200], quality: { webp: 78, avif: 58 } })),
];

await mkdir(OUT, { recursive: true });

const kb = async (file) => ((await stat(file)).size / 1024).toFixed(0);

for (const job of jobs) {
  const input = path.join(SRC, `${job.from ?? job.name}.png`);
  for (const width of job.widths) {
    const base = () => {
      let img = sharp(input);
      if (job.crop) img = img.extract(job.crop);
      return img.resize({ width, withoutEnlargement: true });
    };
    const webp = path.join(OUT, `${job.name}-${width}.webp`);
    const avif = path.join(OUT, `${job.name}-${width}.avif`);
    await base().webp({ quality: job.quality.webp, effort: 6 }).toFile(webp);
    await base().avif({ quality: job.quality.avif, effort: 6 }).toFile(avif);
    console.log(`${job.name}-${width}: webp ${await kb(webp)} KB, avif ${await kb(avif)} KB`);
  }
  // Glavna datoteka s predloženim nazivom (najveća varijanta).
  const largest = Math.max(...job.widths);
  let img = sharp(input);
  if (job.crop) img = img.extract(job.crop);
  await img.resize({ width: largest }).webp({ quality: job.quality.webp, effort: 6 }).toFile(path.join(OUT, `${job.name}.webp`));
}

// OG slika za društvene mreže (1200×630), JPEG radi kompatibilnosti.
await sharp(path.join(SRC, 'account-hero.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'right' })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(path.join(OUT, 'og-account.jpg'));
console.log(`og-account.jpg: ${await kb(path.join(OUT, 'og-account.jpg'))} KB`);
