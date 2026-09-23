import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry } from '../src/lib/inquiry.ts';
import { buildEmail, readMailConfig, sendInquiry } from '../src/lib/mailer.ts';
import { createRateLimiter } from '../src/lib/rate-limit.ts';

const base = {
  name: 'Amra Test',
  company: '',
  contactMethod: 'email',
  email: 'amra@example.ba',
  phone: '',
  service: 'racunovodstvo',
  message: 'Trebam vođenje knjiga za mali obrt.',
  summary: '',
};

test('validan upit s e-mailom prolazi bez telefona', () => {
  const r = validateInquiry(base);
  assert.equal(r.ok, true);
});

test('validan upit s telefonom prolazi bez e-maila', () => {
  const r = validateInquiry({ ...base, contactMethod: 'telefon', email: '', phone: '+387 61 234 567' });
  assert.equal(r.ok, true);
});

test('odabrani način kontakta zahtijeva odgovarajuće polje', () => {
  const r1 = validateInquiry({ ...base, email: '' });
  assert.equal(r1.ok, false);
  if (!r1.ok) assert.equal(r1.errors.email, 'email.required');
  const r2 = validateInquiry({ ...base, contactMethod: 'telefon', phone: '' });
  assert.equal(r2.ok, false);
  if (!r2.ok) assert.equal(r2.errors.phone, 'phone.required');
});

test('nevalidan unos daje greške po poljima', () => {
  const r = validateInquiry({ ...base, name: 'A', email: 'nije-email', service: 'nepostojeca', message: 'kratko', contactMethod: 'fax' });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.errors.name, 'name.length');
    assert.equal(r.errors.email, 'email.invalid');
    assert.equal(r.errors.service, 'service.invalid');
    assert.equal(r.errors.message, 'message.length');
    assert.equal(r.errors.contactMethod, 'contactMethod.invalid');
  }
});

test('neispravan telefon se odbija i kad nije obavezan', () => {
  const r = validateInquiry({ ...base, phone: 'zovi me' });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.errors.phone, 'phone.invalid');
});

test('kontrolni znakovi i prelomi u imenu se uklanjaju', () => {
  const r = validateInquiry({ ...base, name: 'Amra\r\nBcc: x@y.z\u0007' });
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.data.name, 'Amra Bcc: x@y.z');
});

test('e-mail: predmet sadrži uslugu i nema prelome reda; reply-to je posjetilac', async () => {
  const r = validateInquiry(base);
  assert.ok(r.ok);
  if (!r.ok) return;
  const { subject, text } = buildEmail(r.data);
  assert.match(subject, /Računovodstvo i knjigovodstvo/);
  assert.doesNotMatch(subject, /[\r\n]/);
  assert.match(text, /Poruka:\nTrebam vođenje knjiga/);

  let sent: { url: string; body: Record<string, unknown>; auth: string } | undefined;
  const fakeFetch = (async (url: string, init: RequestInit) => {
    sent = { url, body: JSON.parse(String(init.body)), auth: String((init.headers as Record<string, string>).Authorization) };
    return new Response('{}', { status: 200 });
  }) as unknown as typeof fetch;
  const result = await sendInquiry(r.data, { apiKey: 'test_key', from: 'Web <upit@example.ba>', to: ['agencija@example.ba'] }, fakeFetch);
  assert.deepEqual(result, { ok: true });
  assert.equal(sent?.url, 'https://api.resend.com/emails');
  assert.equal(sent?.body.reply_to, 'amra@example.ba');
  assert.deepEqual(sent?.body.to, ['agencija@example.ba']);
  assert.equal(sent?.auth, 'Bearer test_key');
});

test('bez konfiguracije slanje se ne simulira', async () => {
  const r = validateInquiry(base);
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(readMailConfig({}), null);
  assert.deepEqual(await sendInquiry(r.data, null), { ok: false, reason: 'not_configured' });
});

test('greška pružaoca se vraća kao neuspjeh', async () => {
  const r = validateInquiry(base);
  if (!r.ok) return assert.fail();
  const failing = (async () => new Response('err', { status: 500 })) as unknown as typeof fetch;
  const result = await sendInquiry(r.data, { apiKey: 'k', from: 'a@b.ba', to: ['c@d.ba'] }, failing);
  assert.deepEqual(result, { ok: false, reason: 'provider_error' });
});

test('konfiguracija: više primalaca odvojenih zarezom', () => {
  assert.deepEqual(readMailConfig({ RESEND_API_KEY: 'k', CONTACT_FROM: 'a@b.ba', CONTACT_TO: 'x@y.ba, z@w.ba' }), {
    apiKey: 'k',
    from: 'a@b.ba',
    to: ['x@y.ba', 'z@w.ba'],
  });
});

test('ograničenje učestalosti: 5 zahtjeva u prozoru, zatim blokada', () => {
  const check = createRateLimiter({ limit: 5, windowMs: 60_000 });
  const t0 = 1_000_000;
  for (let i = 0; i < 5; i++) assert.equal(check('1.2.3.4', t0 + i).allowed, true);
  assert.equal(check('1.2.3.4', t0 + 10).allowed, false);
  assert.equal(check('5.6.7.8', t0 + 10).allowed, true);
  assert.equal(check('1.2.3.4', t0 + 61_000).allowed, true);
});
