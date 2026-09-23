// Analitički događaji bez ličnih i finansijskih podataka. Po zadanom se ništa ne šalje trećoj strani:
// događaj se upisuje u window.dataLayer (ako postoji, npr. uz Google Tag Manager) i emituje kao
// DOM događaj „account:analytics“ na koji se može vezati odabrani alat za analitiku.

export type AnalyticsEvent = 'klik_telefon' | 'otvaranje_forme' | 'uspjesan_upit' | 'koristenje_alata';

// Dozvoljeni su samo kratki, unaprijed poznati opisi (npr. naziv alata), nikad unos korisnika.
export function track(event: AnalyticsEvent, label?: 'vodic' | 'konfigurator' | 'kalkulator') {
  const payload = label ? { event, label } : { event };
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer?.push(payload);
    window.dispatchEvent(new CustomEvent('account:analytics', { detail: payload }));
  } catch {
    // Analitika nikad ne smije prekinuti rad stranice.
  }
}

export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (el?.dataset.track === 'klik_telefon') track('klik_telefon');
  });
}
