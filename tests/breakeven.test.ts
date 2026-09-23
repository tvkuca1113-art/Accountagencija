import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateBreakEven, formatKM, parseAmount } from '../src/lib/breakeven.ts';

const calc = (fixed: string, variablePct: string, surplus = '') => calculateBreakEven({ fixed, variablePct, surplus });

test('primjer iz specifikacije: F=2.000, V=40 %, D=0 → 3.333,33 KM', () => {
  const r = calc('2.000', '40', '0');
  assert.equal(r.status, 'ok');
  if (r.status !== 'ok') return;
  assert.equal(formatKM(r.breakEven), '3.333,33 KM');
  assert.equal(formatKM(r.target!), '3.333,33 KM');
});

test('primjer iz specifikacije: D=1.000 → cilj 5.000,00 KM', () => {
  const r = calc('2.000', '40', '1.000');
  assert.equal(r.status, 'ok');
  if (r.status !== 'ok') return;
  assert.equal(formatKM(r.target!), '5.000,00 KM');
});

test('uz V=0 prag je jednak F', () => {
  const r = calc('2500', '0');
  assert.equal(r.status, 'ok');
  if (r.status === 'ok') assert.equal(r.breakEven, 2500);
});

test('uz F=0 i V<100 prag pokrića je 0', () => {
  const r = calc('0', '99');
  assert.equal(r.status, 'ok');
  if (r.status === 'ok') assert.equal(r.breakEven, 0);
});

test('V=100 % ili više: nema konačnog praga', () => {
  assert.equal(calc('2000', '100').status, 'no-threshold');
  assert.equal(calc('2000', '120').status, 'no-threshold');
});

test('prazan unos nije validan obračun', () => {
  const r = calc('', '');
  assert.equal(r.status, 'invalid');
  if (r.status === 'invalid') {
    assert.equal(r.errors.fixed, 'empty');
    assert.equal(r.errors.variablePct, 'empty');
  }
});

test('negativne vrijednosti se odbijaju', () => {
  const r = calc('-100', '-5', '-1');
  assert.equal(r.status, 'invalid');
  if (r.status === 'invalid') {
    assert.equal(r.errors.fixed, 'negative');
    assert.equal(r.errors.variablePct, 'range');
    assert.equal(r.errors.surplus, 'negative');
  }
});

test('opcionalni višak: prazno polje ne daje cilj', () => {
  const r = calc('1000', '20', '   ');
  assert.equal(r.status, 'ok');
  if (r.status === 'ok') assert.equal(r.target, null);
});

test('decimalni zarez i separatori hiljada', () => {
  assert.deepEqual(parseAmount('2.000,50'), { ok: true, value: 2000.5 });
  assert.deepEqual(parseAmount('37,5'), { ok: true, value: 37.5 });
  assert.deepEqual(parseAmount('1.250.000'), { ok: true, value: 1250000 });
  assert.deepEqual(parseAmount('2000.5'), { ok: true, value: 2000.5 });
  assert.deepEqual(parseAmount('2 000'), { ok: true, value: 2000 });
  assert.deepEqual(parseAmount('abc'), { ok: false, error: 'invalid' });
  assert.deepEqual(parseAmount('1,2,3'), { ok: false, error: 'invalid' });
  assert.deepEqual(parseAmount(''), { ok: false, error: 'empty' });
});

test('decimalni zarez u procentu daje ispravan izračun', () => {
  const r = calc('1.000', '37,5');
  assert.equal(r.status, 'ok');
  if (r.status === 'ok') assert.equal(formatKM(r.breakEven), '1.600,00 KM');
});

test('formatiranje iznosa', () => {
  assert.equal(formatKM(0), '0,00 KM');
  assert.equal(formatKM(999.999), '1.000,00 KM');
  assert.equal(formatKM(1234567.891), '1.234.567,89 KM');
});
