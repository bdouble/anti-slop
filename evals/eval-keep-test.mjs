#!/usr/bin/env node

/**
 * eval-keep-test.mjs — contract harness for the keep-test disposition axis.
 *
 * Why this exists (2026-08-13). The contrast family's "one free per document"
 * allowance zeroes the first contrast finding to `info` tier. That is a SCORING
 * decision, and it was the right one. But `info` is also the tier of the
 * non-actionable texture report, and the report footer labels the whole bucket
 * "corroborate only — never act on them alone". So the single finding carrying
 * a MANDATORY judgment call was filed under, and labelled with, the system's
 * own instruction to ignore it. A downstream consumer shipped a textbook
 * never-form ("The hard part was never building. It was …") on a score of 0
 * with no keep-test ever run.
 *
 * The fix added a disposition axis (`finding.review`, `result.requiresReview`)
 * orthogonal to the five reliability tiers, and made the report print the
 * keep-test questions inline. This harness pins that contract so it cannot
 * silently revert — including the invariant that matters most: the disposition
 * axis must NEVER move a score. If freeing a contrast starts costing points,
 * the over-correction the 1.5.0 allowance was written to prevent comes back.
 *
 * Run from the repo root:  node evals/eval-keep-test.mjs
 *   --json   Machine-readable
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LINT = join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs');
const { lintText, formatReport } = await import(LINT);
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// The sentence that motivated the fix. Never-form, fails keep-test 2 and 3.
const CONTRAST = 'The hard part was never building. It was deciding what the company would stop doing.';
const PLAIN = 'The deploy finished at 14:02. Rollback took nine minutes.';

// ── 1. The finding carries a disposition ────────────────────────────────────
{
  const r = lintText(CONTRAST);
  const flagged = r.findings.filter((f) => f.review === 'keep-test');
  check('contrast finding carries review:"keep-test"', flagged.length === 1,
    `got ${flagged.length}`);
  check('result exposes requiresReview count', r.requiresReview === 1,
    `got ${r.requiresReview}`);
  check('freed finding is still zero-point info tier',
    flagged[0]?.tier === 'info' && flagged[0]?.points === 0,
    `tier=${flagged[0]?.tier} points=${flagged[0]?.points}`);
}

// ── 2. Scoring invariance — the axis must not cost points ───────────────────
// The whole point of the 1.5.0 allowance is that one deliberate contrast is
// free. If this fails, prose gets flattened to satisfy a budget that the skill
// explicitly retired.
{
  const r = lintText(CONTRAST);
  check('a lone contrast still scores 0', r.score === 0, `score=${r.score}`);
  check('a lone contrast still has gateScore 0', r.gateScore === 0, `gateScore=${r.gateScore}`);
  check('a lone contrast does not band above LOW', r.band === 'LOW', `band=${r.band}`);
}

// ── 3. Clean prose owes nothing ─────────────────────────────────────────────
{
  const r = lintText(PLAIN);
  check('clean prose has requiresReview 0', r.requiresReview === 0, `got ${r.requiresReview}`);
  check('clean prose prints no keep-test block',
    !formatReport(r).includes('KEEP-TEST REQUIRED'));
}

// ── 4. Only the FIRST contrast is freed; the rest score ─────────────────────
{
  const two = `${CONTRAST} We didn't build a tool. We built a system.`;
  const r = lintText(two);
  check('second contrast still scores', r.score > 0, `score=${r.score}`);
  check('only one contrast is freed', r.requiresReview === 1, `got ${r.requiresReview}`);
}

// ── 5. The report teaches the test inline ───────────────────────────────────
// The behavioural fix: pointing at references/negative-parallelism.md did not
// work, so the questions must appear in the artifact the agent already reads.
{
  const report = formatReport(lintText(CONTRAST));
  check('report prints the KEEP-TEST REQUIRED block', report.includes('KEEP-TEST REQUIRED'));
  const qs = PATTERNS.CONTRAST_FAMILY.keepTest;
  check('all keep-test questions appear verbatim in the report',
    qs.every((q) => report.includes(q)), `${qs.length} questions expected`);
  check('report states the failure action',
    report.includes('cut the negated half'));
}

// ── 6. The "corroborate only" note must not cover a keep-test ───────────────
// This is the exact defect: the note is the instruction that overrode the
// finding's own "you must still rule on this".
{
  const report = formatReport(lintText(CONTRAST));
  check('lone keep-test does NOT trigger the "corroborate only" note',
    !report.includes('corroborate only'));
}

// ── 7. …but genuinely corroborating findings still get the note ─────────────
// Narrowing the note must not silence it for the weak tier and texture report.
{
  const slop = 'We leverage cutting-edge synergy to unlock potential. '
    + 'Importantly, this is a testament to our robust, seamless platform. '
    + 'It is worth noting that we utilize best-in-class solutions. '
    + `${CONTRAST} Our transformative approach delivers unprecedented value.`;
  const r = lintText(slop);
  const report = formatReport(r);
  const hasCorroborating = r.findings.some((f) => (f.tier === 'weak' || f.tier === 'info') && !f.review);
  if (hasCorroborating) {
    check('weak/info note still prints alongside a keep-test block',
      report.includes('corroborate only') && report.includes('KEEP-TEST REQUIRED'));
  } else {
    check('weak/info note still prints alongside a keep-test block', true, 'no corroborating finding in fixture — vacuous');
  }
  check('texture report is never flagged for review',
    !r.findings.some((f) => f.id === 'texture-report' && f.review));
}

// ── 8. Pattern data carries the questions (no drift with the reference) ─────
{
  const CF = PATTERNS.CONTRAST_FAMILY;
  check('CONTRAST_FAMILY.requiresKeepTest is set', CF.requiresKeepTest === true);
  check('CONTRAST_FAMILY.keepTest has all three tests',
    Array.isArray(CF.keepTest) && CF.keepTest.length === 3, `got ${CF.keepTest?.length}`);
}

// ── 9. Backward compatibility with a vendored patterns.mjs predating the flag ─
// Consumers pin their own copy of patterns.mjs. An older copy has no
// requiresKeepTest, and must degrade to plain 1.5.0 behaviour, not throw.
{
  const saved = PATTERNS.CONTRAST_FAMILY.requiresKeepTest;
  try {
    delete PATTERNS.CONTRAST_FAMILY.requiresKeepTest;
    const r = lintText(CONTRAST);
    check('old patterns.mjs degrades to 1.5.0 behaviour (no review flag, no throw)',
      r.requiresReview === 0 && r.score === 0, `requiresReview=${r.requiresReview} score=${r.score}`);
  } catch (e) {
    check('old patterns.mjs degrades to 1.5.0 behaviour (no review flag, no throw)', false, e.message);
  } finally {
    PATTERNS.CONTRAST_FAMILY.requiresKeepTest = saved;
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);

if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('KEEP-TEST DISPOSITION CONTRACT');
  console.log('='.repeat(52));
  for (const r of results) {
    console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${r.pass || !r.detail ? '' : ` — ${r.detail}`}`);
  }
  console.log('');
  console.log(`${results.length - failed.length}/${results.length} passed`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}

process.exit(failed.length === 0 ? 0 : 1);
