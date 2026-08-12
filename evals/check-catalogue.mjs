#!/usr/bin/env node
/**
 * check-catalogue.mjs — anti-drift check: every pattern id in data/patterns.mjs
 * must appear exactly once in references/pattern-catalogue.md, and the
 * catalogue must contain no ids the data file lacks.
 *
 * (Idea adopted from conorbronsdon/avoid-ai-writing's CATEGORIES.md contract.)
 * Run after any change to either file:  node evals/check-catalogue.mjs
 * Exits 1 on drift.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const P = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));
const catalogue = readFileSync(join(ROOT, 'skills', 'anti-slop', 'references', 'pattern-catalogue.md'), 'utf-8');

const ids = [
  ...P.LEXICONS.map((g) => g.id),
  P.FATAL_LEXICON.id,
  ...P.FATAL_REGEX.map((r) => r.id),
  ...P.REGEX_RULES.map((r) => r.id),
  ...Object.keys(P.STATISTICAL),
  ...P.JUDGMENT.map((j) => j.id),
];

let bad = 0;
for (const id of ids) {
  const n = (catalogue.match(new RegExp('\\(`' + id + '`\\)', 'g')) || []).length;
  if (n !== 1) { console.error(`✗ ${id}: appears ${n}× in the catalogue (want exactly 1)`); bad++; }
}
const catalogueIds = [...catalogue.matchAll(/\(`([a-zA-Z][\w-]*)`\)/g)].map((m) => m[1]);
for (const cid of new Set(catalogueIds)) {
  if (!ids.includes(cid)) { console.error(`✗ ${cid}: in the catalogue but not in patterns.mjs`); bad++; }
}

if (bad) { console.error(`\n${bad} drift issue(s) between patterns.mjs and pattern-catalogue.md`); process.exit(1); }
console.log(`✓ catalogue ↔ patterns.mjs aligned: ${ids.length} pattern ids, all exactly once.`);
