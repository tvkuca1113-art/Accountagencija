// Animacija pri skrolanju: diskretno pojavljivanje sekcija ([data-reveal]) — samo opacity i translate.
// Ništa se ne sakriva ni ne mijenja ako korisnik traži smanjeno kretanje ili preglednik nema IntersectionObserver.

export function initMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  // Elementi koji su već na ekranu pri učitavanju ostaju vidljivi (bez treptanja).
  const revealEls = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
    (el) => el.getBoundingClientRect().top > innerHeight * 0.9,
  );
  if (revealEls.length) {
    document.documentElement.classList.add('reveal-on');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (revealEls.includes(el)) io.observe(el);
      else el.classList.add('is-revealed');
    });
  }
}
