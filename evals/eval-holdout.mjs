#!/usr/bin/env node

/**
 * eval-holdout.mjs — generalization check on text no rule was tuned against.
 *
 * Why this exists (2026-10-31). The contrast family scored 100% recall on its
 * own fixture and caught 7 of 33 real contrast sentences from outside it (21%).
 * A fixture you tune against stops measuring anything once the regexes are
 * fitted to it. This eval reads two files that must never be tuned against:
 *
 *   evals/holdout/contrast.md     real contrast sentences (KILL/LEGIT/CLEAN)
 *   evals/holdout/human-prose.md  real human passages, linted whole
 *
 * It reports contrast recall and the false-positive rate of the full linter on
 * human prose. Only one result fails the run: a FATAL finding on human prose,
 * because FATAL promises near-zero false positives. Everything else is
 * reported, not gated, so nobody is tempted to fit a regex to this file.
 *
 * Run from the repo root:  node evals/eval-holdout.mjs
 *   --json              Machine-readable
 *   --human-dir <dir>   Also lint every .md/.txt file in <dir> as human prose,
 *                       reported separately. For private writing samples that
 *                       must never be committed to this public repo.
 */

import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));
const { lintText } = await import(join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs'));

const argv = process.argv.slice(2);
const jsonOut = argv.includes('--json');
const humanDir = argv.includes('--human-dir') ? argv[argv.indexOf('--human-dir') + 1] : null;

// ── Contrast sentences (same matcher as eval-antithesis.mjs) ────────────────
const familyIds = new Set(PATTERNS.CONTRAST_FAMILY.ids);
const rules = PATTERNS.REGEX_RULES.filter((r) => familyIds.has(r.id));
const fires = (text) => rules.some((r) => r.patterns.some((re) => new RegExp(re.source, re.flags).test(text)));

const cases = [];
for (const line of readFileSync(join(ROOT, 'evals', 'holdout', 'contrast.md'), 'utf8').split('\n')) {
  const m = /^(KILL|LEGIT|CLEAN)\s*\|\s*([\w-]+)\s*\|\s*(.+)$/.exec(line.trim());
  if (m) cases.push({ label: m[1], id: m[2], text: m[3].trim(), hit: fires(m[3]) });
}
const of = (label, pred = () => true) => cases.filter((c) => c.label === label && pred(c));
const rate = (arr) => (arr.length ? arr.filter((c) => c.hit).length / arr.length : 0);
const kill = of('KILL');
const killNoRather = of('KILL', (c) => !c.id.startsWith('rather-'));
const contrast = {
  counts: { kill: kill.length, legit: of('LEGIT').length, clean: of('CLEAN').length },
  recall: rate(kill),
  recallExcludingRather: rate(killNoRather),
  legitDetected: rate(of('LEGIT')),
  cleanFalsePositiveRate: rate(of('CLEAN')),
  misses: kill.filter((c) => !c.hit).map((c) => `${c.id}: ${c.text}`),
  falsePositives: of('CLEAN').filter((c) => c.hit).map((c) => `${c.id}: ${c.text}`),
};

// ── Human prose, linted whole ───────────────────────────────────────────────
const ship = PATTERNS.META.shipTarget;
function lintPassages(passages) {
  const rows = passages.map(({ id, text }) => {
    const r = lintText(text, { format: 'markdown' });
    const acted = r.findings.filter((f) => ['fatal', 'strong', 'lexical'].includes(f.tier));
    return { id, fatal: r.fatal, gateScore: r.gateScore ?? r.score, flagged: acted.map((f) => f.id) };
  });
  const n = rows.length || 1;
  return {
    passages: rows.length,
    fatal: rows.filter((r) => r.fatal > 0).length,
    blocked: rows.filter((r) => r.gateScore > ship).length,
    anyActionable: rows.filter((r) => r.flagged.length > 0).length,
    blockedRate: rows.filter((r) => r.gateScore > ship).length / n,
    actionableRate: rows.filter((r) => r.flagged.length > 0).length / n,
    flagged: rows.filter((r) => r.flagged.length).map((r) => `${r.id} (gate ${r.gateScore}): ${r.flagged.join(', ')}`),
  };
}
const humanSrc = readFileSync(join(ROOT, 'evals', 'holdout', 'human-prose.md'), 'utf8');
const publicPassages = [...humanSrc.matchAll(/^=== (\S+)\n([\s\S]*?)(?=^=== |(?![\s\S]))/gm)]
  .map((m) => ({ id: m[1], text: m[2].trim() }));
const human = lintPassages(publicPassages);
const local = humanDir
  ? lintPassages(readdirSync(humanDir).filter((f) => /\.(md|txt)$/.test(f)).sort()
    .map((f) => ({ id: f, text: readFileSync(join(humanDir, f), 'utf8') })))
  : null;

const fail = human.fatal > 0 || (local && local.fatal > 0);
const res = { patternsVersion: PATTERNS.META.version, contrast, human, local, pass: !fail };

if (jsonOut) {
  console.log(JSON.stringify(res, null, 2));
} else {
  const pct = (x) => `${(x * 100).toFixed(1)}%`;
  const out = ['HELD-OUT EVAL — never tuned against', '='.repeat(52)];
  out.push(`contrast:  ${contrast.counts.kill} KILL · ${contrast.counts.legit} LEGIT · ${contrast.counts.clean} CLEAN`);
  out.push(`  recall              ${pct(contrast.recall)}  (excluding bare "rather than": ${pct(contrast.recallExcludingRather)})`);
  out.push(`  LEGIT detected      ${pct(contrast.legitDetected)}  (informational)`);
  out.push(`  CLEAN false-pos     ${pct(contrast.cleanFalsePositiveRate)}`);
  if (contrast.misses.length) out.push('  misses:', ...contrast.misses.map((m) => `    · ${m}`));
  if (contrast.falsePositives.length) out.push('  false positives:', ...contrast.falsePositives.map((m) => `    · ${m}`));
  for (const [name, h] of [['human prose', human], ['local human prose', local]]) {
    if (!h) continue;
    out.push('', `${name}: ${h.passages} passages`);
    out.push(`  FATAL               ${h.fatal}  (must be 0)`);
    out.push(`  gate-blocked        ${h.blocked} (${pct(h.blockedRate)}; gateScore > ${ship})`);
    out.push(`  any actionable flag ${h.anyActionable} (${pct(h.actionableRate)}; fatal/strong/lexical)`);
    if (h.flagged.length) out.push(...h.flagged.map((f) => `    · ${f}`));
  }
  out.push('', res.pass ? 'PASS' : 'FAIL — a FATAL finding on human prose breaks the near-zero-FP contract.');
  console.log(out.join('\n'));
}
process.exit(res.pass ? 0 : 1);
