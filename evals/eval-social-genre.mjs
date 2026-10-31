#!/usr/bin/env node

/**
 * eval-social-genre.mjs — hit/miss contract for the `--genre linkedin|x` rules.
 *
 * Why this exists (2026-10-31). LinkedIn now demotes AI slop, and the linter
 * caught 8 of 24 items on the skill's social-post item list. The HIT cases are
 * those items, as synthetic sentences in `evals/fixtures/social-post-items.md`. Four items are judgment calls no
 * regex can make (a fake anecdote, manufactured vulnerability, an unsupported
 * dramatic claim, suspiciously balanced pairs) and one more ("empty hype") is
 * too close to ordinary speech; they are reported, not scored.
 *
 * The MISS cases matter more. Common posting practice is a line
 * break every 1-2 sentences, a one-sentence close, at most 3 emojis, 3-5
 * hashtags or none, and a comment-gated lead magnet at most weekly. Posts that
 * follow it must stay clean, and so must specific closing questions: only
 * generic bait ("Agree?", "Thoughts?") is the tell.
 *
 * Genre rules apply only under `genre: 'linkedin'|'x'`; default linting is
 * unchanged by them.
 *
 * Run from the repo root:  node evals/eval-social-genre.mjs   (--json)
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const { lintText } = await import(join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs'));
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];
const actionable = (text, genre) => lintText(text, { genre }).findings
  .filter((f) => f.id !== 'texture-report' && (f.points > 0 || f.review)).map((f) => f.id);

// ── The social-post items, each linted under its channel's genre ────────────
const src = readFileSync(join(ROOT, 'evals', 'fixtures', 'social-post-items.md'), 'utf8');
const items = Object.fromEntries([...src.matchAll(/^=== (\S+)\n([\s\S]*?)(?=^=== |(?![\s\S]))/gm)]
  .map((m) => [m[1], m[2].trim()]));
const genreOf = (id) => (id.startsWith('sp-x-') ? 'x' : 'linkedin');

// Items that must produce at least one actionable finding, with the id we expect.
const EXPECT = {
  'sp-li-stock-opener-thrilled-to-announce': 'hook-formula',
  'sp-li-here-s-the-thing': 'ai-cliche',
  'sp-li-let-that-sink-in': 'engagement-bait',
  'sp-li-read-that-again': 'engagement-bait',
  'sp-li-the-future-is-here': 'stock-proclamation',
  'sp-li-this-changes-everything': 'engagement-bait',
  'sp-li-generic-inspirational-lesson': 'self-posed-qa',
  'sp-li-excessive-one-sentence-paragraphs': 'broetry',
  'sp-li-engagement-bait-agree-': 'social-closer',
  'sp-li-emoji-filled-list': 'emoji-bullets',
  'sp-x-unnecessary-headings': 'social-heading',
  'sp-x-excessive-rhetorical-questions': 'rhetorical-run',
  'sp-x-choppy-fragments': 'broetry',
  'sp-car-em-dashes': 'em-dash-density',
  'sp-car-furthermore-moreover-additionally-in-con': 'overused-transition',
  'sp-car-it-s-not-just-x-it-s-y': 'antithesis',
  'sp-car-throat-clearing': 'hedge',
  'sp-car-same-structure-opening-every-slide': 'anaphora',
};
// Allowed by the house cap: five hashtags is inside "3-5 hashtags or none".
const BRIEF_ALLOWED = ['sp-li-hashtags'];
const JUDGMENT = ['sp-li-fake-personal-anecdote', 'sp-li-manufactured-vulnerability',
  'sp-li-dramatic-unsupported-claim', 'sp-car-suspiciously-balanced-sentence-pairs', 'sp-x-empty-hype'];

for (const [id, want] of Object.entries(EXPECT)) {
  const got = actionable(items[id], genreOf(id));
  results.push({ kind: 'hit', id, label: `${id} → ${want}`, pass: got.includes(want), detail: got.join(',') || 'nothing' });
}
for (const id of BRIEF_ALLOWED) {
  const got = actionable(items[id], genreOf(id));
  results.push({ kind: 'miss', id, label: `${id} stays clean (house cap allows 3-5 hashtags)`, pass: !got.includes('hashtag-density'), detail: got.join(',') });
}
const judgment = JUDGMENT.map((id) => ({ id, flagged: actionable(items[id], genreOf(id)) }));
results.push({ kind: 'meta', id: 'coverage', label: `every social-post item is accounted for`,
  pass: Object.keys(EXPECT).length + BRIEF_ALLOWED.length + JUDGMENT.length === Object.keys(items).length,
  detail: `${Object.keys(items).length} items` });

// ── Six-plus hashtags and four-plus emojis exceed the house caps ────────────────
const hit = (id, label, text, genre) => {
  const got = actionable(text, genre);
  results.push({ kind: 'hit', id, label, pass: got.includes(id), detail: got.join(',') || 'nothing' });
};
const miss = (id, label, text, genre) => {
  const got = actionable(text, genre);
  results.push({ kind: 'miss', id, label, pass: !got.includes(id), detail: got.join(',') || 'nothing' });
};
hit('hashtag-density', 'six hashtags', 'We cut onboarding to two steps.\n\n#Product #AI #Leadership #Startups #Growth #SaaS', 'linkedin');
hit('emoji-density', 'four emojis', 'Shipped 🚀 Tested ✅ Measured 📈 Celebrated 🎉 the new billing page this week.', 'linkedin');
hit('hook-formula', 'opening question', 'Ever wonder why most product launches fail?\n\nWe shipped ours to silence.', 'linkedin');
hit('hook-formula', 'unpopular opinion', 'Unpopular opinion: roadmaps are a promise you cannot keep.', 'linkedin');
hit('social-closer', '"Drop it in the comments"', 'What would you delete first? Drop it in the comments.', 'linkedin');
hit('social-closer', '"Follow for more"', 'That is the whole playbook. Follow for more.', 'x');

// ── Genre rules are opt-in: default linting does not apply them ────────────
miss('social-closer', 'no genre: "Thoughts?" in an email', 'Draft attached for Thursday. Thoughts?');
miss('hook-formula', 'no genre: an essay may open with a question', 'Why do onboarding flows grow? Every team adds one step and nobody removes one.');
miss('broetry', 'no genre: short lines in a status note', 'Status.\n\nGreen.\n\nShips Friday.');

// ── Posts that follow common posting practice must stay clean ───────────────────
const POSTS = {
  'li-build-in-public': `We deleted two of the nine onboarding steps last week, and signups rose 31% by Friday.

The two steps asked for a company size and a team name. Nobody on the sales side had read either field in a year.

I found that out by asking, which took one Slack message and a day of waiting.

Before you add a field to a signup form, find the person who will read it.

#Onboarding #CustomerSuccess #SaaS`,
  'li-lead-magnet': `I rebuilt our churn review as a one-page checklist, and it cut the meeting from an hour to twenty minutes.

The trick was a single rule: every row needs an owner and a date before anyone discusses it.

Comment CHECKLIST and I'll send you the template.`,
  'li-specific-question': `Our support queue halved after we moved the renewal date above the fold on the billing page.

Four percent of users had ever opened the section where it used to live.

What is the one field on your billing page that nobody reads? 🙂`,
  'x-two-step-dm': 'We cut our CI time from 22 minutes to 9 by caching the dependency install and splitting the slowest test file in two.\n\nReply "cache" and I\'ll DM you the config.',
};
const SOCIAL_IDS = ['social-closer', 'hook-formula', 'broetry', 'rhetorical-run', 'hashtag-density',
  'emoji-density', 'emoji-bullets', 'social-heading', 'stock-proclamation'];
for (const [id, text] of Object.entries(POSTS)) {
  const genre = id.startsWith('x-') ? 'x' : 'linkedin';
  const r = lintText(text, { genre });
  const social = r.findings.filter((f) => SOCIAL_IDS.includes(f.id)).map((f) => f.id);
  results.push({ kind: 'miss', id, label: `${id} (follows common posting practice) has no social finding and passes the gate`,
    pass: social.length === 0 && r.gateScore <= PATTERNS.META.shipTarget, detail: `gate=${r.gateScore} ${social.join(',')}` });
}

// ── Registration ────────────────────────────────────────────────────────────
results.push({ kind: 'meta', id: 'GENRES', label: 'patterns.mjs exports the genre list',
  pass: Array.isArray(PATTERNS.GENRES) && PATTERNS.GENRES.includes('linkedin') && PATTERNS.GENRES.includes('x') });

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results, judgment }, null, 2));
} else {
  console.log('SOCIAL GENRE (--genre linkedin|x) — hit/miss contract');
  console.log('='.repeat(52));
  for (const r of results) {
    const tag = { hit: 'HIT ', miss: 'MISS', meta: 'META' }[r.kind];
    console.log(`  ${r.pass ? '✓' : '✗'} [${tag}] ${r.label}${r.pass ? '' : `  → got ${r.detail}`}`);
  }
  console.log('\nJudgment items (not lintable, reported only):');
  for (const j of judgment) console.log(`  · ${j.id}: ${j.flagged.join(', ') || 'no finding'}`);
  const caught = Object.keys(EXPECT).length;
  console.log(`\nSocial-post items: ${caught} lintable, ${BRIEF_ALLOWED.length} allowed by the house caps, ${JUDGMENT.length} judgment-only`);
  console.log('(Fit on fixtures written alongside the rules, not recall: no held-out real posts exist yet.)');
  console.log(`${results.length - failed.length}/${results.length} passed`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}
process.exit(failed.length === 0 ? 0 : 1);
