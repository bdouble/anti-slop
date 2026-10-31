#!/usr/bin/env node

/**
 * eval-staging-ports.mjs — hit/miss contract for the 2026-10-31 ports from
 * blader/humanizer (MIT) and Wikipedia's "Signs of AI writing", plus the
 * re-tiering an internal comparison (2026-10-31) asked to settle by evaluation.
 *
 * Why this exists. The linter flagged the target tell in 14 of 42 humanizer
 * "before" passages. Humanizer's strongest tells are staging, not vocabulary:
 * a run-up before the point (§4), an argument with no one (§5), a saying that
 * sounds deep (§3), a closer that restates (§2), and text that narrates itself
 * (§25). Wikipedia adds source-availability disclaimers and the mid-2026
 * corrective framing ("should be treated as X rather than Y"). The HIT cases
 * are the humanizer/Wikipedia examples; every MISS is ordinary English that
 * sits next to them ("not publicly available until Q3", "To be clear, the
 * deadline is Friday", "the architecture of the service").
 *
 * Re-tiering, decided by small local frequency counts on ~94k words of human
 * BSD and git man pages vs ~19k words of AI fixtures. Directional only: at
 * these sizes a zero is weak evidence (see CHANGELOG 2.0.0): "in order to" (human 7, AI 0) leaves `wordy`; single qualifiers
 * (human 2, AI 1: no signal) move from strong `hedge` to weak
 * `single-qualifier`; copula avoidance (human 0, AI 4) gets a density-based
 * allowance instead of two free per document.
 *
 * Run from the repo root:  node evals/eval-staging-ports.mjs   (--json)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const { lintText } = await import(join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs'));
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];
const findingsFor = (text) => lintText(text).findings.filter((f) => f.id !== 'texture-report');
const idsFor = (text) => new Set(findingsFor(text).map((f) => f.id));
const hit = (id, label, text) => {
  const got = idsFor(text);
  results.push({ kind: 'hit', id, label, pass: got.has(id), detail: [...got].join(',') || 'nothing' });
};
const miss = (id, label, text) => {
  const got = idsFor(text);
  results.push({ kind: 'miss', id, label, pass: !got.has(id), detail: [...got].join(',') || 'nothing' });
};
const meta = (id, label, pass, detail = '') => results.push({ kind: 'meta', id, label, pass, detail });
// No gate points at all: the sentence may still carry a weak note, but it can
// never block a document. For literal English the review found the 2.0.0-rc
// rules scoring at gate-counting tiers.
const noGate = (label, text) => {
  const r = lintText(text);
  results.push({ kind: 'miss', id: 'gate', label, pass: r.gateScore === 0 && r.fatal === 0,
    detail: `gate=${r.gateScore} ${r.findings.filter((f) => ['fatal', 'strong', 'lexical'].includes(f.tier)).map((f) => f.id).join(',')}` });
};

const src = readFileSync(join(ROOT, 'evals', 'fixtures', 'humanizer-passages.md'), 'utf8');
const hz = Object.fromEntries([...src.matchAll(/^=== (\S+)\n([\s\S]*?)(?=^=== |(?![\s\S]))/gm)].map((m) => [m[1], m[2].trim()]));

// ── staged-runup (humanizer §4) ─────────────────────────────────────────────
hit('staged-runup', 'hz-04-before1 "Let\'s dive into … Here\'s what you need to know"', hz['hz-04-before1']);
hit('staged-runup', 'hz-04-before2 "Honestly?"', hz['hz-04-before2']);
miss('staged-runup', '"honestly" inside a casual sentence', 'I honestly forgot to send it, sorry.');
miss('staged-runup', '"let\'s look at" as a plan', "Let's look at the numbers on Thursday.");

// ── phantom-objection (humanizer §5) ────────────────────────────────────────
hit('phantom-objection', 'hz-05-before1 "This isn\'t mainly about … I\'m not arguing that"', hz['hz-05-before1']);
hit('phantom-objection', 'hz-05-before2 "A tempting approach would be"', hz['hz-05-before2']);
miss('phantom-objection', '"To be clear" is ordinary', 'To be clear, the deadline is Friday at noon.');
miss('phantom-objection', 'an attributed objection answered in full', 'Priya argued we should restart the service nightly; that drops every session, so we rotate in place.');

// ── deep-saying (humanizer §3) ──────────────────────────────────────────────
hit('deep-saying', 'hz-03-before1 "The real question is"', hz['hz-03-before1']);
hit('deep-saying', 'hz-03-before2 "is the language of … becomes a trap"', hz['hz-03-before2']);
miss('deep-saying', 'literal "the architecture of"', 'The architecture of the service has three queues and one worker pool.');
// Review 2026-10-31 (M1): literal and ordinary English, each scored 2 gate points before.
for (const s of [
  "Here's what you need to know before Monday: the badge office opens at 8 and parking is on level 2.",
  'Now let\'s look at the numbers: churn fell from 4.1% to 2.9% after the change.',
  "Let's be honest with the customer about the delay and give them a new date.",
  'Did I enjoy it, honestly? Yes.',
  'The yen is the currency of Japan.',
  'SQL is the language of the warehouse team.',
  'At the heart of the matter is a $2M contract dispute.',
  'The real question is whether finance will fund the second team in Q2.',
  'The second-mover position becomes a trap once incumbents bundle the feature.',
  "Don't get me wrong, I loved the job. I left because the commute was two hours.",
  'This is not to say the old system was bad; it ran for nine years without an outage.',
  'The firm maintains a low profile in the press but closed four deals in 2025.',
  'The email does not establish that the defendant knew about the transfer.',
  'The 2024 figure should be treated as a floor rather than an estimate, because two regions had not reported.',
  'The game has changed since the league moved the trade deadline to July.',
]) noGate(`no gate points: ${s.slice(0, 60)}`, s);

// ── dramatic-fragment closer (humanizer §2) ─────────────────────────────────
hit('dramatic-fragment', 'hz-02-before2 "That is the real win."', hz['hz-02-before2']);
miss('dramatic-fragment', '"the real win" mid-sentence', 'That is the real win for the support team, because tickets fell by half.');

// ── self-narration (humanizer §25, weak) ────────────────────────────────────
hit('self-narration', 'hz-25-before1 "was added to replace"', hz['hz-25-before1']);
hit('self-narration', 'hz-25-before2 "flagged rather than guessed"', hz['hz-25-before2']);
miss('self-narration', 'a change log may say what replaced what', 'Replaced the linear scan with a hash lookup.');

// ── source-disclaimer (humanizer §23, Wikipedia) ────────────────────────────
hit('source-disclaimer', 'hz-23-before1 "not extensively documented in readily available sources"', hz['hz-23-before1']);
hit('source-disclaimer', 'hz-23-before2 "maintains a low profile"', hz['hz-23-before2']);
hit('source-disclaimer', '"in the provided sources"', 'Revenue figures do not appear in the provided sources.');
hit('source-disclaimer', '"based on available information"', 'Based on available information, the firm was founded in 1994.');
miss('source-disclaimer', '"not publicly available until Q3" (report guard)', 'The beta is not publicly available until Q3.');
miss('source-disclaimer', '"not well documented" is a human complaint', 'The API is not well documented, so we read the source.');
miss('source-disclaimer', '"widely available" product claim', 'The drug is now widely available in pharmacies.');

// ── corrective-framing (Wikipedia, mid-2026) ────────────────────────────────
hit('corrective-framing', 'wk-07 "should be treated as X rather than Y"', 'Claims concerning its suspension should be treated as religious tradition rather than as an archaeological explanation.');
hit('corrective-framing', '"does not establish that"', 'The single study does not establish that the effect generalizes.');
miss('corrective-framing', 'a plain "rather than"', 'We picked Postgres rather than DynamoDB because the team knows it.');
miss('corrective-framing', '"treated as" without the corrective tail', 'Empty strings are treated as null by the importer.');

// ── borrowed authority (humanizer §17) and citation-link residue ───────────
hit('vague-attribution', 'hz-17-before1 "Experts believe"', hz['hz-17-before1']);
hit('machine-artifact', 'a link carrying utm_source=chatgpt.com', 'See the report (https://example.com/q3?utm_source=chatgpt.com) for details.');
miss('machine-artifact', 'an ordinary utm_source', 'See the report (https://example.com/q3?utm_source=newsletter) for details.');

// ── bold-first bullets: the colon-inside form ───────────────────────────────
hit('bold-first-bullets', 'hz-19-before2 "- **User Experience:** …" (colon inside)', hz['hz-19-before2']);
miss('bold-first-bullets', 'one bold label is not a pattern', '- **Note:** the API changed.\n- It now needs a token.\n- Tokens expire daily.');

// ── emoji list markers (humanizer §20) ──────────────────────────────────────
hit('emoji-bullets', 'hz-20-before2 emoji-led lines', hz['hz-20-before2']);
miss('emoji-bullets', 'a single emoji line', '✅ Shipped the billing fix.\nNext up is the export bug.');
miss('emoji-bullets', '© and ™ are not emoji', '© 2026 Acme Corp.\n™ Acme is a trademark.');

// ── single-qualifier: weak now, a cluster is the tell ───────────────────────
{
  const one = findingsFor('Arguably the launch went fine.');
  meta('single-qualifier', 'one "arguably" is free (no finding, no points)', !one.some((f) => f.id === 'single-qualifier' || f.id === 'hedge'),
    one.map((f) => f.id).join(','));
  const two = lintText('Arguably the launch went fine. In many ways it was early. To some extent we were lucky.');
  const sq = two.findings.filter((f) => f.id === 'single-qualifier');
  meta('single-qualifier', 'three single qualifiers score, at weak tier only', sq.length >= 1 && sq.every((f) => f.tier === 'weak') && two.gateScore === 0,
    `findings=${sq.length} gate=${two.gateScore}`);
  hit('hedge', '"it\'s worth noting" stays a strong hedge', "It's worth noting that the pilot ran in May.");
  hit('hedge-stacking', '"might arguably" is still a stack', 'This might arguably help retention.');
}

// ── "in order to" left `wordy` (Wikipedia: a sign of human writing) ────────
miss('wordy', '"in order to"', 'We moved the meeting in order to include the London team.');
hit('wordy', 'other wordy forms still fire', 'Due to the fact that the build failed, we stopped.');

// ── copula-avoidance: density-based allowance ───────────────────────────────
hit('copula-avoidance', 'one "serves as" in a short post now scores', 'Gallery 825 serves as the exhibition space for the association.');
{
  const filler = ' The team met weekly and wrote short notes about what shipped.'.repeat(30);
  const r = lintText(`The hall serves as a venue.${filler}`);
  meta('copula-avoidance', 'a long document still gets a free use', !r.findings.some((f) => f.id === 'copula-avoidance'),
    r.findings.map((f) => f.id).join(','));
}

// ── watchlist-2026: the mid-2026 cohort, weak and density-free ──────────────
hit('watchlist-2026', 'a cluster of mid-2026 cohort words', 'The plan is practical and steady. It matters because teams prioritize dependable tools. Leaders echoed this.');
miss('watchlist-2026', 'two cohort words are free', 'The plan is practical. It matters.');

// ── Registration: every new id carries a tier and a fix ─────────────────────
const all = [...PATTERNS.LEXICONS, ...PATTERNS.REGEX_RULES];
for (const id of ['staged-runup', 'phantom-objection', 'deep-saying', 'self-narration', 'source-disclaimer',
  'corrective-framing', 'single-qualifier', 'watchlist-2026']) {
  const r = all.find((x) => x.id === id);
  meta(id, 'registered with a tier and a fix', !!r && !!r.tier && !!r.fix, r ? `tier=${r.tier}` : 'NOT FOUND');
}
for (const id of ['unprompted-defense', 'heading-restated', 'process-narration', 're-explaining', 'invented-detail']) {
  meta(id, 'judgment entry exists (prints under NOT LINTED)', PATTERNS.JUDGMENT.some((j) => j.id === id));
}

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('STAGING PORTS + RE-TIERING (2026-10-31) — hit/miss contract');
  console.log('='.repeat(52));
  for (const r of results) {
    const tag = { hit: 'HIT ', miss: 'MISS', meta: 'META' }[r.kind];
    console.log(`  ${r.pass ? '✓' : '✗'} [${tag}] ${r.id}: ${r.label}${r.pass ? '' : `  → got ${r.detail}`}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} passed (${results.filter((r) => r.kind === 'miss').length} false-positive guards)`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}
process.exit(failed.length === 0 ? 0 : 1);
