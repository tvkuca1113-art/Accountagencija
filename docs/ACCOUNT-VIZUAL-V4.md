# ACCOUNT — namjenski vizual, 24. septembar 2026.

Prethodna fotografija s logotipom preko nje nije zadovoljila zahtjev za prepoznatljivim brendom. Zamijenjena je autorskim konceptom: originalni dvoplošni znak agencije kao skulptura od plavih ploha i precizno složenih papirnih slojeva. Slojevi sugeriraju urednost poslovne dokumentacije. Vizual nije fotografija stvarnog prostora ili predmeta agencije.

## Primjena

- Početna stranica: `src/components/HomeHero.astro`, bez naljepnice preko slike; zaseban tipografski potpis ispod.
- Izvornik: `source-images/hero-v4/account-identitet.jpg`.
- Responzivne AVIF/WebP varijante: 480, 800 i 1448 px. Prikaz cijele kompozicije, bez rezanja znaka.
- Slika za dijeljenje: `public/images/og-account.jpg`.
- Originalni logotip u navigaciji ostaje službeni izvorni asset. Skulptura je njegova ilustrativna interpretacija.

## Reference i odluka

- [Pentagram / GSA](https://www.pentagram.com/work/gsa): vlastiti znak razvijen u prostorni identitet.
- [The Branded Agency / LN Accounting](https://www.brandedagency.com/case-studies/ln-accounting): oblici izvedeni iz brenda i dosljedan sistem materijala. Pregledana stranica i vizual poslovne dokumentacije.
- [Avark / Myna](https://avark.agency/case-studies/myna): računovodstveni identitet s diskretnim 3D tretmanom postojećeg motiva; pregledana studija slučaja.

Preuzeti su principi art direkcije, a ne tuđi logotipi ili slike. Ove reference nisu predstavljene kao univerzalna rang-lista najboljih agencija.

## Izrada

Korišten ugrađeni generator slika uz originalni ACCOUNT znak kao referencu. Finalni prompt:

```text
Use case: stylized-concept. Create a bespoke premium brand hero artwork for ACCOUNT accounting agency in Mostar. Input image is the OFFICIAL ACCOUNT symbol and is the mandatory exact geometry reference, not a scene to replicate. Build the hero composition around this exact double-faced pointed blue A symbol. Preserve its distinctive symmetric outer silhouette, central fold, two narrow triangular apertures, split flared lower corners and central descending point; do not turn it into a normal letter A, rocket, airplane or unrelated logo. Art direction: tangible sculptural paper-and-anodized-metal brand still life, photographed for a refined design studio identity case study. The symbol is a large freestanding folded sculpture, saturated cyan right face and deeper medium blue left face, with subtle finely brushed material, crisply cut edges and restrained thickness. Front view almost straight-on, slight elevated camera so the paper material edges are perceptible while original logo geometry stays readable. Behind the blue front face are many immaculately aligned white cotton paper layers cut to the same symbol profile, visible as delicate contour lines on its rear sides. The whole symbol stands with its central point touching a very low broad off-white rectangular paper plinth, precisely arranged like well-kept financial records. The sculpture occupies central 65% of image height and 55% of width. Surround with generous negative space. Seamless extremely pale cool blue-white architectural studio background, natural sunlight from upper left, long soft blue-grey shadow to lower right, subtle realistic microtexture. Beautiful sophisticated warm/cool light balance, luxury object photography, optical sharpness, understated asymmetry from cast shadow. 4:3 landscape composition. No people, no laptop, no desk, no glasses, no folders, no coins, no currency, no charts, no floating UI, no halos, no chrome, no neon, no other objects, no text, no watermark. This is a crafted physical interpretation of the ORIGINAL supplied brand symbol, not a new logo design. Render highest detail.
```
