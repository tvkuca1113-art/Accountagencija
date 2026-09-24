# ACCOUNT — provjera redizajna

Datum: 24. 9. 2026.  
Odabrani smjer: 3, „Jasan smjer“ (prikazan korisniku u razgovoru).  
Implementacija: `src/components/HomeHero.astro`, `Header.astro`, `MobileBar.astro`, `src/pages/index.astro`, `src/pages/usluge.astro`, zajednički stilovi i dvije nove slike `public/images/account-znak-3d-*.webp`.

## Provjereno

| Područje | Rezultat |
| --- | --- |
| Astro tipovi i dijagnostika | `npm run check`: 0 grešaka, 0 upozorenja. |
| Funkcionalni testovi postojećih alata i obrasca | `npm test`: 22 od 22 prolaza. Testovi ne šalju stvarni e-mail. |
| Produkcijska izgradnja | `npm run build`: uspješno; sve postojeće rute se generišu. |
| Jezik i veze | Svih 16 izgrađenih HTML stranica ima `lang="bs-BA"`; sve interne veze pokazuju na postojeće stranice. Pregledani su naslovi, usluge, savjeti, obrasci, alati, poruke o grešci i politika privatnosti. Stari URL slugovi namjerno su sačuvani zbog postojećih veza. |
| Sadržaj | Zadržani 10+ godina i 300+ klijenata, recenzije, poslovni podaci, alati, kontaktni kanali i zasebne slike usluga. Razjašnjena je razlika između uplate, prihoda i dobiti u članku. |
| GitHub i Vercel | PR #1 ažuriran; Vercel status novog commita je uspješan. |

## Vizuelna provjera na čekanju

Lokalnu adresu `http://terminal.local:4173/` cloud preglednik blokira sa `ERR_BLOCKED_BY_CLIENT`. Vercel preview za ovu granu preusmjerava na prijavu, pa nije bilo moguće snimiti ili uporediti stvarni mobilni i desktop prikaz s odabranom slikom koncepta. Ne tvrdimo da je vizuelni kvalitet 10/10 niti da su fokus, kontrast i svi prelomi ekrana potvrđeni u browseru. PR ostaje nacrt dok se ne provjere mobilni meni, redovi usluga, prelamanje naslova, kontrast novog vizuala i sticky CTA na stvarnom previewu.

Kontaktni obrazac nije poslan na produkcijsku adresu; za stvarno slanje potrebna je provjerena konfiguracija e-mail servisa.

**Rezultat vizuelnog QA:** čeka pristup zaštićenom previewu.
