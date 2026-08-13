#!/usr/bin/env node

/**
 * eval-ported-patterns.mjs — hit/miss contract for the patterns ported in v1.7.0.
 *
 * Why this exists (2026-08-13). A downstream consumer kept a local de-slop
 * catalogue alongside this skill. Over time the local copy drifted into a
 * partial second source of truth, and an audit found four items it covered that
 * the skill did not: vague quantifiers, stacked modal hedges, template section
 * headers, and assertion-in-place-of-evidence. They were ported here so the
 * skill is the single authority again.
 *
 * Three of the four sit close to ordinary English, so the MISS cases below
 * matter more than the HIT cases:
 *   - a bare "might" / "could" is normal writing and must never fire;
 *   - "would likely take a week" is an estimate, not a hedge stack;
 *   - "my final thoughts are in the doc" is body prose, not a template header;
 *   - one "various" is fine — only a cluster is the signal.
 *
 * Per the skill's own detection posture, a false positive on real human prose
 * is the failure mode that matters most: it teaches writers to sand off voice.
 * Every MISS case here is a guard against exactly that.
 *
 * Run from the repo root:  node evals/eval-ported-patterns.mjs
 *   --json   Machine-readable
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const { lintText } = await import(join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs'));
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];

const idsFor = (text) => new Set(
  lintText(text).findings.map((f) => f.id).filter((id) => id !== 'texture-report'),
);

/** HIT: `id` must be among the findings. */
const hit = (id, label, text) => {
  const got = idsFor(text);
  results.push({ kind: 'hit', id, label, pass: got.has(id), detail: [...got].join(',') || 'nothing' });
};

/** MISS: `id` must NOT fire. The false-positive guards. */
const miss = (id, label, text) => {
  const got = idsFor(text);
  results.push({ kind: 'miss', id, label, pass: !got.has(id), detail: [...got].join(',') || 'nothing' });
};

// ── vague-quantifier — weak tier, 2 free per document ───────────────────────
hit('vague-quantifier', 'cluster of three', 'We ran various tests with numerous vendors across a multitude of regions.');
hit('vague-quantifier', 'a number of / a range of', 'A number of teams tried a range of tools, and a host of them failed.');
miss('vague-quantifier', 'single use is within the free allowance', 'We ran various tests last quarter.');
miss('vague-quantifier', 'two uses are within the free allowance', 'Various teams ran numerous tests.');
miss('vague-quantifier', 'concrete counts never fire', 'We ran nine tests with three vendors across four regions.');

// ── hedge-stacking — STACKED modals only ───────────────────────────────────
hit('hedge-stacking', 'might possibly', 'This might possibly improve retention.');
hit('hedge-stacking', 'could potentially', 'The change could potentially reduce latency.');
hit('hedge-stacking', 'reversed order', 'It could perhaps may be worth trying.');
hit('hedge-stacking', 'it is possible that … might', "It's possible that adoption might stall next quarter.");
miss('hedge-stacking', 'bare might is ordinary English', 'This might work if we ship on Tuesday.');
miss('hedge-stacking', 'bare could is ordinary English', 'We could migrate the database first.');
miss('hedge-stacking', '"would likely" is an estimate, not a stack', 'The migration would likely take a week.');
miss('hedge-stacking', 'single precise qualifier', 'In 7 of 10 cases the retry succeeded.');

// ── template-header — anchored to markdown heading syntax ───────────────────
hit('template-header', 'Final Thoughts', '## Final Thoughts\n\nBody text about the subject.');
hit('template-header', 'Key Takeaways', '### Key Takeaways\n\nBody text about the subject.');
hit('template-header', 'Why This Actually Works', '## Why This Actually Works\n\nBody text about the subject.');
miss('template-header', 'body prose never fires', 'My final thoughts on the migration are in the doc.');
miss('template-header', 'a content-specific header passes', '## Why we chose Postgres over DynamoDB\n\nBody text here.');
miss('template-header', 'TL;DR is a genuine human convention', '## TL;DR\n\nWe shipped it early.');

// ── assert-dont-prove — asserting obviousness instead of showing it ─────────
hit('assert-dont-prove', 'the truth is simple', 'The truth is simple: remote work wins.');
hit('assert-dont-prove', 'history is clear', 'History is clear on platform shifts.');
hit('assert-dont-prove', 'make no mistake', 'Make no mistake, this is a turning point.');
miss('assert-dont-prove', 'stating the evidence passes', 'Our remote team shipped 30% more features in 2025.');
miss('assert-dont-prove', 'a plain clarity claim is not the tell', 'The migration plan is clear and the team agreed to it.');

// ── Registration: ported ids must be in the catalogue and carry a fix ───────
const PORTED = ['vague-quantifier', 'hedge-stacking', 'template-header', 'assert-dont-prove'];
const allRules = [...PATTERNS.LEXICONS, ...PATTERNS.REGEX_RULES];
for (const id of PORTED) {
  const rule = allRules.find((r) => r.id === id);
  results.push({
    kind: 'meta', id, label: 'registered with a tier and a fix',
    pass: !!rule && !!rule.tier && !!rule.fix,
    detail: rule ? `tier=${rule.tier}` : 'NOT FOUND',
  });
}

// vague-quantifier must stay weak: it is the highest-FP-risk of the four, and
// promoting it would flag ordinary English at ship-blocking strength.
{
  const vq = allRules.find((r) => r.id === 'vague-quantifier');
  results.push({
    kind: 'meta', id: 'vague-quantifier', label: 'stays weak-tier with a free allowance',
    pass: vq?.tier === 'weak' && vq?.freeAllowance >= 2,
    detail: `tier=${vq?.tier} freeAllowance=${vq?.freeAllowance}`,
  });
}

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
const misses = results.filter((r) => r.kind === 'miss');

if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('PORTED PATTERNS (v1.7.0) — hit/miss contract');
  console.log('='.repeat(52));
  for (const r of results) {
    const tag = r.kind === 'hit' ? 'HIT ' : r.kind === 'miss' ? 'MISS' : 'META';
    console.log(`  ${r.pass ? '✓' : '✗'} [${tag}] ${r.id}: ${r.label}${r.pass ? '' : `  → got ${r.detail}`}`);
  }
  console.log('');
  console.log(`${results.length - failed.length}/${results.length} passed (${misses.length} false-positive guards)`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}

process.exit(failed.length === 0 ? 0 : 1);
