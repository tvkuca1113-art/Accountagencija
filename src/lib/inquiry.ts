// Validacija upita iz kontakt forme. Koristi se na serveru (izvor istine) i u pregledniku.

export const SERVICE_VALUES = [
  'racunovodstvo',
  'konzultantske-usluge',
  'zastupanje-inostranih-poduzeca',
  'registracija-firmi-obrta-udruzenja',
  'poslovni-projekti',
  'nisam-siguran',
  'drugo',
] as const;

export const LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  email: { max: 254 },
  phone: { max: 30 },
  message: { min: 10, max: 4000 },
  summary: { max: 2000 },
};

export interface InquiryInput {
  name: string;
  company: string;
  contactMethod: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  summary: string;
}

export type InquiryField = keyof InquiryInput;

export interface Inquiry {
  name: string;
  company: string;
  contactMethod: 'email' | 'telefon';
  email: string;
  phone: string;
  service: (typeof SERVICE_VALUES)[number];
  message: string;
  summary: string;
}

export const ERROR_TEXT: Record<string, string> = {
  'name.required': 'Upišite ime i prezime.',
  'name.length': `Ime i prezime treba imati od ${LIMITS.name.min} do ${LIMITS.name.max} znakova.`,
  'company.length': `Naziv firme može imati najviše ${LIMITS.company.max} znakova.`,
  'contactMethod.invalid': 'Odaberite kako da vas kontaktiramo.',
  'email.required': 'Upišite e-mail adresu na koju želite odgovor.',
  'email.invalid': 'Provjerite e-mail adresu, npr. ime@firma.ba.',
  'phone.required': 'Upišite broj telefona na koji vas možemo pozvati.',
  'phone.invalid': 'Provjerite broj telefona, npr. +387 61 234 567.',
  'service.invalid': 'Odaberite uslugu ili opciju „Nisam siguran/na“.',
  'message.required': 'Napišite kratku poruku o tome šta vam treba.',
  'message.length': `Poruka treba imati od ${LIMITS.message.min} do ${LIMITS.message.max} znakova.`,
  'summary.length': 'Sažetak je predug. Uklonite ga ili skratite poruku.',
};

// Uklanja kontrolne znakove osim novog reda i taba; normalizuje prelome reda.
const clean = (v: unknown, multiline = false) => {
  const s = typeof v === 'string' ? v : '';
  const noCtrl = s.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return multiline ? noCtrl.trim() : noCtrl.replace(/[\n\t]+/g, ' ').trim();
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_RE = /^\+?[\d\s/().-]+$/;

export function validateInquiry(raw: Partial<Record<InquiryField, unknown>>):
  | { ok: true; data: Inquiry }
  | { ok: false; errors: Partial<Record<InquiryField, string>> } {
  const v: InquiryInput = {
    name: clean(raw.name),
    company: clean(raw.company),
    contactMethod: clean(raw.contactMethod),
    email: clean(raw.email),
    phone: clean(raw.phone),
    service: clean(raw.service),
    message: clean(raw.message, true),
    summary: clean(raw.summary, true),
  };
  const errors: Partial<Record<InquiryField, string>> = {};

  if (!v.name) errors.name = 'name.required';
  else if (v.name.length < LIMITS.name.min || v.name.length > LIMITS.name.max) errors.name = 'name.length';

  if (v.company.length > LIMITS.company.max) errors.company = 'company.length';

  if (v.contactMethod !== 'email' && v.contactMethod !== 'telefon') errors.contactMethod = 'contactMethod.invalid';

  // Obavezno je samo polje za odabrani način kontakta; drugo se provjerava samo ako je popunjeno.
  const checkEmail = v.contactMethod === 'email' || v.email !== '';
  if (checkEmail) {
    if (!v.email) errors.email = 'email.required';
    else if (v.email.length > LIMITS.email.max || !EMAIL_RE.test(v.email)) errors.email = 'email.invalid';
  }
  const checkPhone = v.contactMethod === 'telefon' || v.phone !== '';
  if (checkPhone) {
    const digits = v.phone.replace(/\D/g, '');
    if (!v.phone) errors.phone = 'phone.required';
    else if (v.phone.length > LIMITS.phone.max || !PHONE_RE.test(v.phone) || digits.length < 6 || digits.length > 15)
      errors.phone = 'phone.invalid';
  }

  if (!(SERVICE_VALUES as readonly string[]).includes(v.service)) errors.service = 'service.invalid';

  if (!v.message) errors.message = 'message.required';
  else if (v.message.length < LIMITS.message.min || v.message.length > LIMITS.message.max) errors.message = 'message.length';

  if (v.summary.length > LIMITS.summary.max) errors.summary = 'summary.length';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      ...v,
      contactMethod: v.contactMethod as Inquiry['contactMethod'],
      service: v.service as Inquiry['service'],
    },
  };
}
