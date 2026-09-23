// Animacije pri skrolanju: pojavljivanje sekcija ([data-reveal]) i brojanje brojki ([data-count]).
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

  const countEls = document.querySelectorAll<HTMLElement>('[data-count]');
  if (countEls.length) {
    const run = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? '';
      if (!Number.isFinite(target)) return;
      const start = performance.now();
      const duration = 1400;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.6 },
    );
    countEls.forEach((el) => io.observe(el));
  }
}
