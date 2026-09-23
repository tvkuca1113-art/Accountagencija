// Kalkulator pokrića troškova — čiste funkcije, bez DOM-a, da bi se mogle testirati.
//   prag_pokrica    = F / (1 - V/100)
//   promet_za_visak = (F + D) / (1 - V/100)
// Rezultat je pojednostavljeni planski višak, ne neto dobit, novčani tok ni porezni obračun.

export type ParseResult = { ok: true; value: number } | { ok: false; error: 'empty' | 'invalid' };

/** Prihvata decimalni zarez i tačku kao separator hiljada („2.000,50“), kao i decimalnu tačku („2000.5“). */
export function parseAmount(raw: string): ParseResult {
  const s = raw.trim().replace(/\s| /g, '');
  if (s === '') return { ok: false, error: 'empty' };
  let normalized: string;
  if (s.includes(',')) {
    // Zarez je decimalni separator; tačke su separatori hiljada.
    normalized = s.replace(/\./g, '').replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    // „2.000“ ili „1.250.000“ — tačke kao separatori hiljada.
    normalized = s.replace(/\./g, '');
  } else {
    normalized = s;
  }
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) return { ok: false, error: 'invalid' };
  const value = Number(normalized);
  return Number.isFinite(value) ? { ok: true, value } : { ok: false, error: 'invalid' };
}

export interface BreakEvenInput {
  fixed: string; // F, KM mjesečno
  variablePct: string; // V, % prihoda
  surplus: string; // D, KM mjesečno, opcionalno
}

export type FieldError = 'empty' | 'invalid' | 'negative' | 'range';

export type BreakEvenResult =
  | { status: 'ok'; breakEven: number; target: number | null; fixed: number; variablePct: number; surplus: number }
  | { status: 'no-threshold' } // V >= 100: u ovom modelu nema konačnog praga
  | { status: 'invalid'; errors: Partial<Record<keyof BreakEvenInput, FieldError>> };

export function calculateBreakEven(input: BreakEvenInput): BreakEvenResult {
  const errors: Partial<Record<keyof BreakEvenInput, FieldError>> = {};

  const f = parseAmount(input.fixed);
  if (!f.ok) errors.fixed = f.error;
  else if (f.value < 0) errors.fixed = 'negative';

  const v = parseAmount(input.variablePct);
  let vIsHundredPlus = false;
  if (!v.ok) errors.variablePct = v.error;
  else if (v.value < 0) errors.variablePct = 'range';
  else if (v.value >= 100) vIsHundredPlus = true;

  let surplus = 0;
  let hasSurplus = false;
  if (input.surplus.trim() !== '') {
    const d = parseAmount(input.surplus);
    if (!d.ok) errors.surplus = d.error;
    else if (d.value < 0) errors.surplus = 'negative';
    else {
      surplus = d.value;
      hasSurplus = true;
    }
  }

  if (Object.keys(errors).length > 0) return { status: 'invalid', errors };
  if (vIsHundredPlus) return { status: 'no-threshold' };

  const fixed = (f as { value: number }).value;
  const variablePct = (v as { value: number }).value;
  const factor = 1 - variablePct / 100;
  return {
    status: 'ok',
    fixed,
    variablePct,
    surplus,
    breakEven: fixed / factor,
    target: hasSurplus ? (fixed + surplus) / factor : null,
  };
}

/** Formatira iznos kao „3.333,33 KM“ (tačka za hiljade, zarez za decimale), neovisno o ICU podacima preglednika. */
export function formatKM(value: number): string {
  const [int, dec] = (Math.round(value * 100) / 100).toFixed(2).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped},${dec} KM`;
}
