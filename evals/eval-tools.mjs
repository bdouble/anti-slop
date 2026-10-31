#!/usr/bin/env node

/**
 * eval-tools.mjs — contract for the 2.0.0 measurement tools.
 *
 *   scripts/acceptance.mjs   share of drafted sentences the author shipped
 *                            unchanged. A lint score is a proxy; acceptance is
 *                            the outcome, and drafts kept only in temporary
 *                            session folders cannot be measured later.
 *   slop-lint --baseline     draft cadence vs the author's reference samples,
 *                            with a warning on any sample that carries a tell,
 *                            because a contaminated sample teaches its tells.
 *
 * Run from the repo root:  node evals/eval-tools.mjs   (--json)
 */

import { spawnSync } from 'child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SCRIPTS = join(ROOT, 'skills', 'anti-slop', 'scripts');
const { acceptance } = await import(join(SCRIPTS, 'acceptance.mjs'));
const { textureProfile, PATTERNS } = await import(join(SCRIPTS, 'slop-lint.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// ── acceptance ──────────────────────────────────────────────────────────────
{
  const draft = 'We cut churn by 9%. The fix took a week. It shipped on Friday. Support tickets fell.';
  const final = 'We cut churn by 9%. The fix took a week and two engineers. It shipped on Friday.\n\nSupport tickets fell.';
  const r = acceptance(draft, final);
  check('acceptance counts verbatim survivors (3 of 4)', r.unchanged === 3 && r.draftSentences === 4, JSON.stringify(r));
  check('acceptance ignores whitespace and quote style', acceptance("It's done.", 'It’s   done.').acceptance === 1);
  check('acceptance records the installed linter version', r.linterVersion === PATTERNS.META.version);
  check('an empty draft reports null, not 0 or NaN (review m9)', acceptance('', 'Anything.').acceptance === null);
  check('a sentence drafted twice and kept once counts once (review m9)', acceptance('Ship it. Ship it.', 'Ship it.').unchanged === 1);
  check('a capitalization edit counts as a change (review m9)', acceptance('ship it today.', 'Ship it today.').unchanged === 0);
}

// ── --baseline ──────────────────────────────────────────────────────────────
const dir = mkdtempSync(join(tmpdir(), 'anti-slop-baseline-'));
try {
  writeFileSync(join(dir, 'clean.md'), 'We moved the renewal date above the fold. Support tickets fell by half within a month, and nobody missed the old layout.');
  writeFileSync(join(dir, 'tainted.md'), "Here's what they're missing: it's not just a tool, it's a system. We leverage it daily.");
  const draft = join(dir, '..', `${dir.split('/').pop()}-draft.txt`);
  writeFileSync(draft, 'We shipped the export fix on Tuesday. Two customers wrote back the same day.');
  const lint = (args) => spawnSync(process.execPath, [join(SCRIPTS, 'slop-lint.mjs'), draft, ...args], { encoding: 'utf8' });
  const text = lint(['--baseline', dir]);
  check('--baseline prints the comparison table', /TEXTURE vs BASELINE \(2 samples\)/.test(text.stdout), text.stderr);
  check('--baseline warns on a sample that carries tells', /sample \S*tainted\.md carries tells/.test(text.stdout));
  check('--baseline does not warn on a clean sample', !/clean\.md carries tells/.test(text.stdout));
  const json = JSON.parse(lint(['--baseline', dir, '--json']).stdout);
  check('--json includes the baseline block', json.baseline?.samples?.length === 2 && typeof json.baseline.draft.meanWords === 'number');
  check('--baseline never changes the draft score', json.score === JSON.parse(lint(['--json']).stdout).score);
  check('a missing baseline path exits 2', lint(['--baseline', join(dir, 'nope')]).status === 2);
  check('an unknown --genre exits 2', lint(['--genre', 'tiktok']).status === 2);
} finally {
  rmSync(dir, { recursive: true, force: true });
  rmSync(`${dir}-draft.txt`, { force: true });
}
// ── version mismatch: a newer engine with an older patterns.mjs (review m7) ─
{
  const vdir = mkdtempSync(join(tmpdir(), 'anti-slop-vendor-'));
  try {
    writeFileSync(join(vdir, 'slop-lint.mjs'), readFileSync(join(SCRIPTS, 'slop-lint.mjs')));
    writeFileSync(join(vdir, 'patterns.mjs'), "export const META = { version: '1.8.0', lastReviewed: '2026-10-14', reviewIntervalDays: 120, scoreBands: { low: 5, medium: 12 }, shipTarget: 2 };\nexport const LEXICONS = []; export const REGEX_RULES = []; export const JUDGMENT = []; export const STATISTICAL = {};\nexport const FATAL_LEXICON = { terms: [] }; export const FATAL_REGEX = [];\n");
    const r = spawnSync(process.execPath, [join(vdir, 'slop-lint.mjs'), '--help'], { encoding: 'utf8' });
    check('an older patterns.mjs fails with a clear message and exit 2', r.status === 2 && /needs patterns\.mjs 2\.x but found 1\.8\.0/.test(r.stderr), r.stderr.slice(0, 200));
  } finally {
    rmSync(vdir, { recursive: true, force: true });
  }
}
{
  const p = textureProfile('One two three four five six seven eight nine ten. Short one. Is it?');
  check('textureProfile measures clipped share and questions', p.sentences === 3 && Math.abs(p.clippedShare - 2 / 3) < 1e-9 && Math.abs(p.questionShare - 1 / 3) < 1e-9, JSON.stringify(p));
}

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('MEASUREMENT TOOLS — acceptance.mjs + --baseline');
  console.log('='.repeat(52));
  for (const r of results) console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${r.pass || !r.detail ? '' : ` — ${r.detail}`}`);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}
process.exit(failed.length === 0 ? 0 : 1);
