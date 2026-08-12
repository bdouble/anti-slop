#!/usr/bin/env node

/**
 * eval-antithesis.mjs — regression harness for the negative-parallelism family.
 *
 * The 2026-08-02 widening of the `antithesis` rule was verified by eye. This
 * makes the next one measurable: it runs the contrast-family rules from
 * skills/anti-slop/data/patterns.mjs over a labeled fixture and reports recall, precision,
 * and every individual miss and false positive by id.
 *
 * Run from the repo root:  node evals/eval-antithesis.mjs
 *
 * Labels (see evals/fixtures/negative-parallelism.md):
 *   KILL  — construction present and empty; MUST match. Recall measured here.
 *   LEGIT — construction present but passes the keep-test; a human waives it on
 *           review. Detection reported for information only, never scored —
 *           counting a LEGIT miss as failure would push the regexes to widen
 *           for cases we would have kept anyway.
 *   CLEAN — not the construction; ANY match is a regression. Precision here.
 *
 * Usage:
 *   node eval-antithesis.mjs                 Report + exit 1 below target
 *   node eval-antithesis.mjs --json          Machine-readable
 *   node eval-antithesis.mjs --fixture PATH  Alternate corpus
 *
 * Targets: recall >= 0.90 on KILL, precision 1.00 on CLEAN (zero tolerance —
 * a false positive on real human prose is the failure mode that matters most).
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Same root-resolution convention as check-catalogue.mjs.
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DEFAULT_FIXTURE = join(ROOT, 'evals', 'fixtures', 'negative-parallelism.md');
const TARGET_RECALL = 0.90;
const TARGET_PRECISION = 1.0;

const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

function contrastRules() {
  const ids = new Set(PATTERNS.CONTRAST_FAMILY?.ids || ['antithesis', 'countdown']);
  return PATTERNS.REGEX_RULES.filter((r) => ids.has(r.id) && Array.isArray(r.patterns));
}

function parseFixture(path) {
  const cases = [];
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.trim();
    const m = /^(KILL|LEGIT|CLEAN)\s*\|\s*([\w-]+)\s*\|\s*(.+)$/.exec(line);
    if (m) cases.push({ label: m[1], id: m[2], text: m[3].trim() });
  }
  return cases;
}

// Match one case against the family. Returns the rule ids and pattern indexes
// that fired, so a false positive names the exact regex to fix.
function matchCase(text, rules) {
  const hits = [];
  for (const rule of rules) {
    rule.patterns.forEach((re, i) => {
      const probe = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
      if (probe.test(text)) hits.push(`${rule.id}.p${i + 1}`);
    });
  }
  return hits;
}

function run(fixturePath) {
  const rules = contrastRules();
  const cases = parseFixture(fixturePath);
  if (!cases.length) throw new Error(`eval-antithesis: no labeled cases found in ${fixturePath}`);

  const results = cases.map((c) => ({ ...c, hits: matchCase(c.text, rules) }));
  const by = (label) => results.filter((r) => r.label === label);

  const kill = by('KILL');
  const clean = by('CLEAN');
  const legit = by('LEGIT');

  const misses = kill.filter((r) => !r.hits.length);
  const falsePositives = clean.filter((r) => r.hits.length);
  const legitMisses = legit.filter((r) => !r.hits.length);

  const recall = kill.length ? (kill.length - misses.length) / kill.length : 1;
  const precision = clean.length ? (clean.length - falsePositives.length) / clean.length : 1;
  const pass = recall >= TARGET_RECALL && precision >= TARGET_PRECISION;

  return {
    fixture: fixturePath,
    rules: rules.map((r) => `${r.id} (${r.patterns.length} patterns)`),
    counts: { kill: kill.length, legit: legit.length, clean: clean.length },
    recall, precision, pass,
    targets: { recall: TARGET_RECALL, precision: TARGET_PRECISION },
    misses: misses.map((r) => ({ id: r.id, text: r.text })),
    falsePositives: falsePositives.map((r) => ({ id: r.id, text: r.text, firedBy: r.hits })),
    legitUndetected: legitMisses.map((r) => ({ id: r.id, text: r.text })),
  };
}

function report(res) {
  const pct = (n) => `${(n * 100).toFixed(1)}%`;
  const out = [];
  out.push('ANTITHESIS EVAL — negative-parallelism family');
  out.push('='.repeat(52));
  out.push(`rules:   ${res.rules.join(', ')}`);
  out.push(`corpus:  ${res.counts.kill} KILL · ${res.counts.legit} LEGIT · ${res.counts.clean} CLEAN`);
  out.push('');
  out.push(`RECALL    ${pct(res.recall)}  (target ${pct(res.targets.recall)}, on KILL)`);
  out.push(`PRECISION ${pct(res.precision)}  (target ${pct(res.targets.precision)}, on CLEAN)`);
  out.push('');

  if (res.misses.length) {
    out.push(`MISSES (${res.misses.length}) — construction present, no rule fired:`);
    for (const m of res.misses) out.push(`  · [${m.id}] ${m.text}`);
    out.push('');
  }
  if (res.falsePositives.length) {
    out.push(`FALSE POSITIVES (${res.falsePositives.length}) — clean prose flagged. Fix the named pattern:`);
    for (const f of res.falsePositives) out.push(`  · [${f.id}] ${f.text}\n      fired by: ${f.firedBy.join(', ')}`);
    out.push('');
  }
  if (res.legitUndetected.length) {
    out.push(`KEEP-TEST CORPUS, undetected (${res.legitUndetected.length}) — informational, not a failure:`);
    for (const l of res.legitUndetected) out.push(`  · [${l.id}] ${l.text}`);
    out.push('');
  }
  out.push(res.pass ? 'PASS' : 'FAIL — do not ship the pattern change.');
  return out.join('\n');
}

const argv = process.argv.slice(2);
const fx = argv.includes('--fixture') ? argv[argv.indexOf('--fixture') + 1] : DEFAULT_FIXTURE;
const res = run(fx);
console.log(argv.includes('--json') ? JSON.stringify(res, null, 2) : report(res));
process.exit(res.pass ? 0 : 1);
