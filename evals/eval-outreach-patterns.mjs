#!/usr/bin/env node

/**
 * eval-outreach-patterns.mjs — hit/miss contract for the v1.8.0 outreach rules:
 * `outreach-boilerplate`, `permission-hedge`, and the `exclamationDensity`
 * statistical detector.
 *
 * Why this exists (2026-10-14). The exact-string `application-boilerplate`
 * lexicon caught "I hope this finds you well" but not "I hope this MESSAGE
 * finds you well", and "I came across your profile" but not "I came across
 * Northwind". Thirteen common outreach clichés each scored 0, and two whole
 * "before" messages (a follow-up after silence and a referral ask) scored 0 end
 * to end. The whole-message HIT cases below rebuild those shapes in messages
 * written for this repo (2026-10-31: the earlier quoted examples were replaced
 * because their copyright line could not be confirmed).
 *
 * The MISS cases matter more than the HITs. Several of these phrases sit next
 * to ordinary English: "I look forward to the day…" in an essay, "I came across
 * this bug" in a narrative, "feel free to open an issue" in a README, a single
 * exclamation mark. A false positive on human prose teaches writers to sand off
 * voice, so every MISS case is a guard against exactly that.
 *
 * Run from the repo root:  node evals/eval-outreach-patterns.mjs
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

/** MIN: the whole message must reach at least `min` score (it used to score 0). */
const minScore = (label, text, min) => {
  const { score } = lintText(text);
  results.push({ kind: 'hit', id: 'whole-message', label, pass: score >= min, detail: `score ${score}` });
};

// ── outreach-boilerplate — openers ─────────────────────────────────────────
hit('outreach-boilerplate', 'hope this message finds you well', 'Hi Sarah, I hope this message finds you well.');
hit('outreach-boilerplate', 'hope this email finds you', 'I hope this email finds you in good spirits.');
hit('outreach-boilerplate', "hope you're doing well", "Hope you're doing well. Northwind posted an ops role.");
hit('outreach-boilerplate', 'just wanted to reach out', 'I just wanted to reach out about the ops role.');
hit('outreach-boilerplate', 'just following up', 'Just following up on my last note.');
hit('outreach-boilerplate', "I'm reaching out because", "I'm reaching out because your team is hiring.");
hit('outreach-boilerplate', 'came across your profile (variant)', 'I came across your posting on LinkedIn last week.');
hit('outreach-boilerplate', 'came across <Company>', 'Hi Sarah, I came across Northwind last week.');
hit('outreach-boilerplate', 'following your journey', "I've been following your journey since the seed round.");
hit('outreach-boilerplate', 'my name is X and I am', 'My name is Dana Ruiz and I am a product manager.');
hit('outreach-boilerplate', 'quick question opener', 'Quick question about the platform role.');
// ── outreach-boilerplate — closers ─────────────────────────────────────────
hit('outreach-boilerplate', 'I look forward to the opportunity', 'I look forward to the opportunity to discuss it.');
hit('outreach-boilerplate', 'looking forward to hearing back', 'Looking forward to hearing back.');
hit('outreach-boilerplate', 'time and consideration', 'Thank you for your time and consideration.');
hit('outreach-boilerplate', "don't hesitate (contracted)", "Don't hesitate to reach out with questions.");
hit('outreach-boilerplate', 'excited about the possibility', 'Excited about the possibility of joining.');
hit('outreach-boilerplate', 'circle back', "Let's circle back next week.");
hit('outreach-boilerplate', 'would love to connect', 'Would love to connect when you have time.');
hit('outreach-boilerplate', 'curly apostrophe still matches', 'I’m reaching out because the role is open.');

miss('outreach-boilerplate', 'essay "look forward to the day"', 'I look forward to the day when billing is boring.');
miss('outreach-boilerplate', 'narrative "came across this bug"', 'Last week I came across this bug in the retry loop.');
miss('outreach-boilerplate', 'lowercase "came across a" mid-sentence', 'We came across a gap in the audit trail.');
miss('outreach-boilerplate', '"hope" as a plain verb', 'I hope the migration lands before the holidays.');
miss('outreach-boilerplate', '"follow up" as a plan', 'We will follow up with the vendor on Tuesday.');
miss('outreach-boilerplate', 'a direct ask', 'Worth fifteen minutes on Thursday?');
// SKILL.md gotcha 2026-07-15: a plain human email closer, never flagged.
miss('outreach-boilerplate', 'plain closer: let me know if you have questions', 'Let me know if you have any questions.');
// A plain one-sentence statement of interest is a human close, common in
// human-written letters. The tell is the same closer reused across letters (a
// corpus check), not one use.
miss('outreach-boilerplate', "plain interest close: I'd love the chance", "I'd love the chance to talk it through.");
miss('outreach-boilerplate', "plain interest close: I'd welcome the chance", 'I’d welcome the chance to talk about the role.');
miss('outreach-boilerplate', '"my name is" mid-story', 'She asked what my name was and I told her.');
miss('outreach-boilerplate', 'clean after-rewrite (cold DM)', 'Hi Sarah, saw the ops hire go up. The last company I joined went from 9 people to 30 in fourteen months and billing broke before anything else did. I rebuilt the invoicing flow and cut the delay in half. Worth fifteen minutes?');

// ── permission-hedge ───────────────────────────────────────────────────────
hit('permission-hedge', 'I was wondering if', 'I was wondering if you had time this week.');
hit('permission-hedge', 'would it be possible to', 'Would it be possible to set up a call?');
hit('permission-hedge', 'no pressure at all', 'No pressure at all.');
hit('permission-hedge', 'feel free to let me know', 'Feel free to let me know either way.');
hit('permission-hedge', "hope you don't mind", "I hope you don't mind me reaching out.");
hit('permission-hedge', "if you're open to it", "I'd like to chat if you're open to it.");
hit('permission-hedge', 'in case it got lost', 'Following up in case my last message got lost.');
hit('permission-hedge', 'earliest convenience', 'Please reply at your earliest convenience.');
hit('permission-hedge', 'sorry to bother you', 'Sorry to bother you again.');

miss('permission-hedge', 'bare "if" is ordinary English', 'If the pilot works, we roll it out in May.');
miss('permission-hedge', 'bare "but" and "just"', 'It shipped late, but it just worked.');
miss('permission-hedge', 'README "feel free to open an issue"', 'Feel free to open an issue or a pull request.');
miss('permission-hedge', '"wondering" as narrative', 'I spent the week wondering why churn rose.');
miss('permission-hedge', 'clean exit offered plainly', "If you'd rather not, say so and I'll apply cold.");
miss('permission-hedge', 'clean after-rewrite (follow-up)', 'Hi Sarah, following up once. The billing rebuild I mentioned took six weeks and I can walk you through exactly how, or I can leave it here. Either is fine.');

// ── exclamationDensity ─────────────────────────────────────────────────────
hit('exclamation-density', 'two exclamation marks', 'Hi again! Thanks for the note!');
miss('exclamation-density', 'one exclamation mark is a choice', 'We shipped it on Friday!');
miss('exclamation-density', 'markdown image and != are not exclamations', '![diagram](a.png) Use a != b here. ![second](b.png)');

// ── Whole "before" messages that previously scored 0 ───────────────────────
minScore('follow-up after silence (scored 0 before v1.8.0)',
  'Hello again! Just checking in on my note from last week in case it got buried. No pressure at all, and feel free to let me know if now is a bad time. Would love to connect if you have a few minutes!', 6);
minScore('referral ask (scored 0 before v1.8.0)',
  "Hi Jordan! Hope you're doing well. I hope you don't mind me asking, but your team just posted an analytics role that looks like a match for my background. Would it be possible for you to put my name forward? It would mean a lot!", 6);
minScore('cold DM (scored 5 before v1.8.0)',
  "Hi Priya, I hope this email finds you well! I recently came across Lumen Labs and I've been following your journey since the Series A. I'm deeply passionate about developer tools and I just wanted to reach out. I'm new to the space, but I learn quickly and would love the chance to chat if you're open to it. Looking forward to hearing from you!", 13);

// ── Registration ───────────────────────────────────────────────────────────
for (const id of ['outreach-boilerplate', 'permission-hedge']) {
  const rule = PATTERNS.REGEX_RULES.find((r) => r.id === id);
  results.push({
    kind: 'meta', id, label: 'registered with a tier and a fix',
    pass: !!rule && !!rule.tier && !!rule.fix,
    detail: rule ? `tier=${rule.tier}` : 'NOT FOUND',
  });
}
{
  const ex = PATTERNS.STATISTICAL.exclamationDensity;
  results.push({
    kind: 'meta', id: 'exclamationDensity', label: 'allows exactly one per piece',
    pass: ex?.maxAllowed === 1, detail: `maxAllowed=${ex?.maxAllowed}`,
  });
}

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
const misses = results.filter((r) => r.kind === 'miss');

if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('OUTREACH PATTERNS (v1.8.0) — hit/miss contract');
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
