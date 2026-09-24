// Izrađuje optimizirane web varijante iz izvornih slika u source-images/.
// Pokretanje: npm run images  (izlaz ide u public/images/, izvornici ostaju netaknuti)
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'source-images';
const OUT = 'public/images';

// crop: dio izvorne slike koji se zadržava (u pikselima izvornika).
const jobs = [
  // Dvije kompozicije iste scene za pozadinu cijelog početnog ekrana.
  { name: 'account-prostor-desktop', from: 'hero-v5/account-prostor-desktop', ext: 'jpg', widths: [1280, 1920], quality: { webp: 85, avif: 60 } },
  { name: 'account-prostor-mobile', from: 'hero-v5/account-prostor-mobile', ext: 'jpg', widths: [480, 940], quality: { webp: 85, avif: 60 } },
  // Namjenski ACCOUNT vizual, razvijen iz originalnog znaka agencije.
  { name: 'account-identitet', from: 'hero-v4/account-identitet', ext: 'jpg', widths: [480, 800, 1448], quality: { webp: 85, avif: 60 } },
  // Ilustrativna fotografija rada, originalni znak prikazan je odvojeno u HTML-u.
  { name: 'account-rad', from: 'hero-v3/account-rad', ext: 'jpg', widths: [480, 800, 1122], quality: { webp: 80, avif: 55 } },
  // Stvarna fotografija Starog mosta (Alen Kajimović, CC0 1.0) — O nama.
  { name: 'mostar-stari-most', from: 'mostar/mostar-originalna-fotografija', ext: 'jpeg', widths: [480, 800, 1200], quality: { webp: 78, avif: 58 } },
];

await mkdir(OUT, { recursive: true });

const kb = async (file) => ((await stat(file)).size / 1024).toFixed(0);

for (const job of jobs) {
  const input = path.join(SRC, `${job.from ?? job.name}.${job.ext ?? 'png'}`);
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
await sharp(path.join(SRC, 'hero-v4/account-identitet.jpg'))
  .resize({ width: 1200, height: 630, fit: 'contain', background: '#edf3f8' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og-account.jpg'));
console.log(`og-account.jpg: ${await kb(path.join(OUT, 'og-account.jpg'))} KB`);

// Portreti iz izvornih recenzija; 2x veličina za prikaz od 52 px.
await mkdir(path.join(OUT, 'reviews'), { recursive: true });
for (const name of ['Adis-Krvavac', 'Alem-Sunje', 'Almir-Eglenovic']) {
  await sharp(path.join(SRC, 'reviews', `${name}.jpg`))
    .resize(104, 104, { fit: 'cover' }).webp({ quality: 85 })
    .toFile(path.join(OUT, 'reviews', `${name}.webp`));
}
