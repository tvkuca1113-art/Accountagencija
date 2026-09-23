// Izrađuje optimizirane web varijante iz izvornih slika u source-images/.
// Pokretanje: npm run images  (izlaz ide u public/images/, izvornici ostaju netaknuti)
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'source-images';
const OUT = 'public/images';

// crop: dio izvorne slike koji se zadržava (u pikselima izvornika).
// Izvornici su obrađeni skriptom scripts/zamijeni-logo.py (originalni znak umjesto generisanog).
const jobs = [
  // Hero 1672×941: na desktopu cijela scena (tamni zid lijevo je prostor za naslov),
  // na mobitelu 4:3 kadar s rukama i fasciklom.
  { name: 'account-hero', widths: [640, 960, 1280, 1672], quality: { webp: 80, avif: 60 } },
  { name: 'account-hero-mobile', from: 'account-hero', crop: { left: 418, top: 0, width: 1254, height: 941 }, widths: [480, 800, 1254], quality: { webp: 80, avif: 60 } },
  // Kartice i uvodi podstranica, 4:3 — bez rezanja.
  ...[
    'account-knjigovodstvo',
    'account-savjetovanje',
    'account-inostrana-preduzeca',
    'account-registracija',
    'account-poslovni-projekti',
  ].map((name) => ({ name, widths: [480, 800, 1200], quality: { webp: 78, avif: 58 } })),
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
await sharp(path.join(SRC, 'account-hero.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'right' })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(path.join(OUT, 'og-account.jpg'));
console.log(`og-account.jpg: ${await kb(path.join(OUT, 'og-account.jpg'))} KB`);
