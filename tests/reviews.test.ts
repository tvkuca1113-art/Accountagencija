import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { reviews } from '../src/data/reviews.ts';

// Fixture extracted from the original site's HTML, independently of the redesign.
const original = JSON.parse(readFileSync(new URL('./fixtures/original-reviews.json', import.meta.url), 'utf8'));
test('recenzije zadržavaju izvorni tekst, imena i redoslijed', () => {
  assert.deepEqual(reviews.map(({ name, text }) => ({ name, text })), original.reviews);
});
