// Serverska obrada kontakt forme: provjera porijekla, zaštita od spama, ograničenje učestalosti,
// validacija i slanje e-mailom. Uspjeh se vraća tek kad pružalac usluge prihvati poruku.
import type { APIRoute } from 'astro';
import { validateInquiry, ERROR_TEXT, type InquiryField } from '../../lib/inquiry.ts';
import { readMailConfig, sendInquiry } from '../../lib/mailer.ts';
import { createRateLimiter } from '../../lib/rate-limit.ts';
import { site, primaryPhone } from '../../data/site.ts';

export const prerender = false;

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const MIN_FILL_MS = 3000; // brže popunjavanje od ovoga tretira se kao automatizovano
const MAX_BODY_BYTES = 20_000;

const FIELDS: InquiryField[] = ['name', 'company', 'contactMethod', 'email', 'phone', 'service', 'message', 'summary'];

type Outcome =
  | { kind: 'success' }
  | { kind: 'invalid'; errors: Partial<Record<InquiryField, string>> }
  | { kind: 'error'; code: 'rate_limited' | 'not_configured' | 'provider_error' | 'bad_request' | 'forbidden'; status: number };

const messages: Record<string, string> = {
  rate_limited: 'Poslali ste više upita u kratkom roku. Pokušajte ponovo za nekoliko minuta ili nas pozovite.',
  not_configured: 'Slanje upita trenutno nije dostupno. Pozovite nas ili nam pošaljite e-mail.',
  provider_error: 'Upit trenutno nije moguće poslati. Vaš unos je sačuvan — pokušajte ponovo ili nas pozovite.',
  bad_request: 'Zahtjev nije ispravan. Osvježite stranicu i pokušajte ponovo.',
  forbidden: 'Zahtjev nije dozvoljen.',
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const outcome = await handle(request, clientAddress);
  return wantsJson ? jsonResponse(outcome) : htmlResponse(outcome);
};

async function handle(request: Request, clientAddress: string | undefined): Promise<Outcome> {
  // Prihvatamo samo zahtjeve s vlastite stranice.
  const origin = request.headers.get('origin');
  if (origin && hostOf(origin) !== new URL(request.url).host) {
    return { kind: 'error', code: 'forbidden', status: 403 };
  }

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY_BYTES) return { kind: 'error', code: 'bad_request', status: 413 };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { kind: 'error', code: 'bad_request', status: 400 };
  }

  // Honeypot i vrijeme popunjavanja: botovima tiho vraćamo „uspjeh“ bez slanja.
  const honeypot = String(form.get('adresa_2') ?? '');
  const startedAt = Number(form.get('started_at') ?? 0);
  if (honeypot !== '' || (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS)) {
    return { kind: 'success' };
  }

  const ip = (request.headers.get('x-forwarded-for')?.split(',')[0] ?? clientAddress ?? 'nepoznato').trim();
  const rate = limiter(ip);
  if (!rate.allowed) return { kind: 'error', code: 'rate_limited', status: 429 };

  const raw: Partial<Record<InquiryField, unknown>> = {};
  for (const f of FIELDS) raw[f] = form.get(f) ?? '';
  // Sažetak konfiguratora šalje se samo ako ga je korisnik ostavio uključenog.
  if (form.get('attach_summary') !== 'da') raw.summary = '';

  const result = validateInquiry(raw);
  if (!result.ok) return { kind: 'invalid', errors: result.errors };

  const sent = await sendInquiry(result.data, readMailConfig(process.env));
  if (!sent.ok) {
    return { kind: 'error', code: sent.reason, status: sent.reason === 'not_configured' ? 503 : 502 };
  }
  return { kind: 'success' };
}

function jsonResponse(outcome: Outcome) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  if (outcome.kind === 'success') return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  if (outcome.kind === 'invalid') {
    const errors = Object.fromEntries(Object.entries(outcome.errors).map(([k, code]) => [k, ERROR_TEXT[code!] ?? code]));
    return new Response(JSON.stringify({ ok: false, code: 'invalid', errors }), { status: 422, headers });
  }
  return new Response(JSON.stringify({ ok: false, code: outcome.code, message: messages[outcome.code] }), {
    status: outcome.status,
    headers,
  });
}

// Rezervni odgovor kad JavaScript nije dostupan (obična HTML forma).
function htmlResponse(outcome: Outcome) {
  if (outcome.kind === 'success') {
    return new Response(null, { status: 303, headers: { Location: '/kontakt/poslano' } });
  }
  const items =
    outcome.kind === 'invalid'
      ? Object.values(outcome.errors).map((code) => `<li>${escapeHtml(ERROR_TEXT[code!] ?? String(code))}</li>`).join('')
      : `<li>${escapeHtml(messages[outcome.code])}</li>`;
  const status = outcome.kind === 'invalid' ? 422 : outcome.status;
  const html = `<!doctype html><html lang="bs-BA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Upit nije poslan | ${site.name}</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.6;color:#0e1f3a}a{color:#1d6db3}</style></head>
<body><h1>Upit nije poslan</h1><ul>${items}</ul>
<p><a href="/kontakt#upit">Vratite se na obrazac</a> ili nas pozovite na <a href="${primaryPhone.href}">${primaryPhone.display}</a>.</p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export const ALL: APIRoute = () =>
  new Response('Metoda nije dozvoljena.', { status: 405, headers: { Allow: 'POST' } });
