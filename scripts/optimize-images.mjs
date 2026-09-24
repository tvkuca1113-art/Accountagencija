// Izrađuje optimizirane web varijante iz izvornih slika u source-images/.
// Pokretanje: npm run images  (izlaz ide u public/images/, izvornici ostaju netaknuti)
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'source-images';
const OUT = 'public/images';

// crop: dio izvorne slike koji se zadržava (u pikselima izvornika).
const jobs = [
  // Naslovna konceptualna fotografija (hercegovački kamen i tamnoplavi papir), 1672×941.
  // Desktop: cijela scena, tamni zid lijevo je prostor za tipografiju.
  { name: 'account-hero-kamen', from: 'hero-koncept/ACCOUNT-hero-koncept-bez-mosta', widths: [640, 960, 1280, 1672], quality: { webp: 80, avif: 60 } },
  // Mobitel i tablet: kadar 4:3 s prelazom zid–kamen i papirom.
  { name: 'account-hero-kamen-mobile', from: 'hero-koncept/ACCOUNT-hero-koncept-bez-mosta', crop: { left: 700, top: 150, width: 972, height: 729 }, widths: [480, 800, 972], quality: { webp: 80, avif: 60 } },
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
await sharp(path.join(SRC, 'hero-koncept/ACCOUNT-hero-koncept-bez-mosta.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og-account.jpg'));
console.log(`og-account.jpg: ${await kb(path.join(OUT, 'og-account.jpg'))} KB`);
