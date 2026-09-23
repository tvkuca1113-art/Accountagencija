// Slanje upita e-mailom preko Resend API-ja (https://resend.com/docs/api-reference/emails/send-email).
// Ključ i adrese čitaju se isključivo na serveru iz varijabli okruženja; nikad ne idu u preglednik.
//   RESEND_API_KEY  — API ključ
//   CONTACT_FROM    — verifikovani pošiljalac, npr. "Web ACCOUNT <upit@agencija-account.com>"
//   CONTACT_TO      — primalac kojeg agencija potvrdi (jedna ili više adresa odvojenih zarezom)
//   RESEND_API_URL  — opcionalno; samo za lokalni test s lažnim serverom (zadano: https://api.resend.com)
import type { Inquiry } from './inquiry.ts';
import { serviceOptions } from '../data/services.ts';

export type SendResult = { ok: true } | { ok: false; reason: 'not_configured' | 'provider_error' };

export interface MailConfig {
  apiKey: string;
  from: string;
  to: string[];
  apiUrl?: string;
}

export function readMailConfig(env: Record<string, string | undefined>): MailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.CONTACT_FROM?.trim();
  const to = (env.CONTACT_TO ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  const apiUrl = env.RESEND_API_URL?.trim();
  return { apiKey, from, to, ...(apiUrl ? { apiUrl } : {}) };
}

const serviceLabel = (value: string) => serviceOptions.find((o) => o.value === value)?.label ?? value;

export function buildEmail(inquiry: Inquiry) {
  const service = serviceLabel(inquiry.service);
  // Predmet je jedan red bez prijeloma, s odabranom uslugom.
  const subject = `Upit s weba: ${service} — ${inquiry.name}`.replace(/[\r\n]+/g, ' ').slice(0, 200);
  const contact =
    inquiry.contactMethod === 'email'
      ? `E-mail (preferirano): ${inquiry.email}${inquiry.phone ? `\nTelefon: ${inquiry.phone}` : ''}`
      : `Telefon (preferirano): ${inquiry.phone}${inquiry.email ? `\nE-mail: ${inquiry.email}` : ''}`;
  const lines = [
    `Usluga: ${service}`,
    `Ime i prezime: ${inquiry.name}`,
    inquiry.company ? `Firma: ${inquiry.company}` : null,
    contact,
    '',
    'Poruka:',
    inquiry.message,
    inquiry.summary ? `\nSažetak iz konfiguratora (poslan uz znanje pošiljaoca):\n${inquiry.summary}` : null,
    '',
    '—',
    'Poslano putem kontakt forme na web stranici agencije ACCOUNT.',
  ].filter((l) => l !== null);
  // Samo tekstualna poruka: sadržaj posjetioca se ne ubacuje u HTML.
  return { subject, text: lines.join('\n') };
}

export async function sendInquiry(inquiry: Inquiry, config: MailConfig | null, fetchImpl: typeof fetch = fetch): Promise<SendResult> {
  if (!config) return { ok: false, reason: 'not_configured' };
  const { subject, text } = buildEmail(inquiry);
  try {
    const res = await fetchImpl(`${config.apiUrl ?? 'https://api.resend.com'}/emails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject,
        text,
        ...(inquiry.email ? { reply_to: inquiry.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[upit] Resend odgovor ${res.status}`);
      return { ok: false, reason: 'provider_error' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[upit] Greška pri slanju:', err instanceof Error ? err.name : 'nepoznato');
    return { ok: false, reason: 'provider_error' };
  }
}
