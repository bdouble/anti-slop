#!/usr/bin/env node

/**
 * eval-false-positives.mjs — false-positive guards and the ship-gate contract.
 *
 * Why this exists (2026-10-31). An internal comparison against blader/humanizer, Wikipedia's "Signs of AI writing" and a practitioner prompt set (2026-10-31)
 * found that human prose
 * could fail outright:
 *   - "Of course, we shipped it on Friday…" returned FATAL "Chatbot opener",
 *     because the rule matched "of course," at the start of ANY line;
 *   - three sentences opening with "The" in a row (across paragraphs) cost a
 *     strong 3 points as "anaphora";
 *   - a watched word mentioned inside `inline code` scored as a use;
 *   - the CLI `--max` gate counted weak findings, which the detection guide
 *     says must never justify action alone, and SKILL.md told agents to ship on
 *     `score` rather than `gateScore`.
 * It also found that a spaced en dash (" – ") slipped past the ≤1 dash policy.
 *
 * Every MISS below is human prose that must not fire. The HIT cases prove each
 * fix narrowed the rule rather than deleting it.
 *
 * Run from the repo root:  node evals/eval-false-positives.mjs   (--json)
 */

import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LINT = join(ROOT, 'skills', 'anti-slop', 'scripts', 'slop-lint.mjs');
const { lintText, formatReport } = await import(LINT);
const PATTERNS = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const jsonOut = process.argv.includes('--json');
const results = [];
const idsFor = (text, opts) => new Set(
  lintText(text, opts).findings.map((f) => f.id).filter((id) => id !== 'texture-report'),
);
const hit = (id, label, text, opts) => {
  const got = idsFor(text, opts);
  results.push({ kind: 'hit', id, label, pass: got.has(id), detail: [...got].join(',') || 'nothing' });
};
const miss = (id, label, text, opts) => {
  const got = idsFor(text, opts);
  results.push({ kind: 'miss', id, label, pass: !got.has(id), detail: [...got].join(',') || 'nothing' });
};
const check = (kind, id, label, pass, detail = '') => results.push({ kind, id, label, pass, detail });

// ── chat-opener: chat-specific shapes at the document start or after a blank
// line. Review 2026-10-31 (B1): a bare continuation ("I'll", "I can", "let me",
// "here's the deck") is how humans open replies, and anchoring to the document
// start alone missed a chat answer pasted under a heading or subject line.
hit('chat-opener', 'Certainly! at document start', 'Certainly! Here is the revised summary you asked for.');
hit('chat-opener', 'Great question! at document start', 'Great question! The short answer is yes.');
hit('chat-opener', '"Of course, here\'s a … version of your" at document start', "Of course, here's a tighter version of your email.");
// Re-review (2026-10-31): courtesy words are not the tell, the offer to
// produce content for the reader is. "I'd be happy to…" is a human reply.
miss('chat-opener', 'human "Sure, I\'d be happy to" reply (re-review)', "Sure, I'd be happy to review the deck before Friday.");
miss('chat-opener', 'human "Of course, I\'d be happy to" in an email (re-review)', "Hi Sam,\n\nOf course, I'd be happy to introduce you to Dana.");
miss('chat-opener', 'human "Absolutely, I\'d be glad to" reply (re-review)', "Absolutely, I'd be glad to speak at the offsite in March.");
miss('chat-opener', 'human "Absolutely, I\'d be glad to draft that"', "Absolutely, I'd be glad to draft that for you.");
hit('chat-opener', '"Absolutely! Here\'s an email you can send" (1.2.0 caught it)', "Absolutely! Here's an email you can send to the recruiter:");
hit('chat-opener', '"Of course! Here are three options" (1.2.0 caught it)', 'Of course! Here are three options for the subject line:');
hit('chat-opener', '"Sure! Below is" a draft', 'Sure! Below is a draft you can adapt.');
hit('chat-opener', '"Certainly. I\'ve rewritten your" paragraph', "Certainly. I've rewritten your paragraph to be more concise.");
// Final verification (2026-10-31): forwarding an artifact that already exists
// is a human reply, not a chat paste. Every one of these must have no FATAL.
for (const s of [
  "Sure, here's the updated budget. Finance signed off this morning.",
  "Of course, here's the summary from the board meeting.",
  "Sure, here's the draft contract Legal sent over.",
  "Sure, here are the slides you can use for Monday's intro.",
  "Of course. Here's the email Dana sent me last week.",
  'Sure. Below is the schedule for the offsite.',
  "Sure, here's the revised timeline after the vendor slipped.",
  "Hi Jo,\n\nSure, here's the post I mentioned on Friday.",
  "Sure, I've updated the doc with your notes.",
  "Absolutely, here's my reply to the vendor.",
  'Sure, below are the notes from Tuesday.',
]) miss('chat-opener', `forwarding an existing artifact: ${s.replace(/\n/g, ' ').slice(0, 50)}`, s);
// …and an offer to produce new text for the reader must stay FATAL.
for (const s of [
  "Absolutely! Here's an email you can send to the recruiter:",
  'Of course! Here are three options for the subject line:',
  "Sure! Here's a LinkedIn post announcing the launch:",
  'Certainly. Below is a cover letter tailored to the role:',
  "Absolutely! I've rewritten your summary to be more concise:",
  "Of course! Here's a more polished version of your bio:",
  "Great question! Here's a breakdown of the options:",
  "sure! here's a draft you can use",
  'Certainly! I can help with that.',
  'Great question! The short answer is yes.',
  "Of course, here's an email you can send to the hiring manager:",
  'Of course! Below are 5 hooks for your next post.',
  'Sure! Below are three ways to open your talk.',
  'Absolutely! Below is a draft you can send.',
]) hit('chat-opener', `offer of new content: ${s.slice(0, 50)}`, s);
hit('chat-opener', 'pasted directly under a heading line, no blank line', "## Draft\nOf course! Here's a revised version of your post:");
miss('chat-opener', 'human "Of course," opener (report repro)', 'Of course, we shipped it on Friday and the tests broke by Monday.');
miss('chat-opener', 'human "Of course," mid-document paragraph', 'We shipped the fix on Tuesday.\n\nOf course, the old tickets still needed triage, so Maya took those on Wednesday.');
miss('chat-opener', 'human "Absolutely," reply', 'Absolutely, send it over and I will read it tonight.');
miss('chat-opener', '"Certainly" as an adverb', 'Certainly the numbers look better than last quarter.');
miss('chat-opener', 'human "Sure, I\'ll" reply (review B1)', "Sure, I'll be there at 3. Bring the Q3 numbers if you have them.");
miss('chat-opener', 'human "Sure, I can" reply (review B1)', 'Sure, I can do Thursday at 10. Send me the invite.');
miss('chat-opener', 'human "Sure. Let me check" reply (review B1)', 'Sure. Let me check with Dana and get back to you by Friday.');
miss('chat-opener', 'human "Sure, here\'s the deck" reply (review B1)', "Sure, here's the deck from Tuesday. Slide 9 has the churn chart.");
miss('chat-opener', 'human "Absolutely, I can cover" reply (review B1)', "Absolutely, I can cover the Tuesday standup while you're out.");
miss('chat-opener', 'human "Of course, I\'ll send" reply (review B1)', "Of course, I'll send the contract over tonight.");
miss('chat-opener', 'human "Great question." answer (review B1)', 'Great question. We priced it per seat because finance asked us to.');
hit('chat-opener', 'chat answer pasted under a subject line (review B1)', 'Subject: revised summary\n\nCertainly! Here is the revised summary you asked for:');
hit('chat-opener', 'chat answer pasted under a heading (review B1)', "# Cover letter\n\nCertainly! Here's a tailored cover letter for the role:");

// ── anaphora: function-word starters need two matching words ───────────────
miss('anaphora', '"The" ×3 across paragraphs (report repro)', 'The board met in March. The vote was close.\n\nThe second vote passed.');
miss('anaphora', 'humanizer Lisbon "after" (report repro)', 'The trip took about forty minutes. The custard tarts are the famous ones. The part I liked best starts a block above the main squares.');
miss('anaphora', 'narrative "It rained…" ×3 (review M2: was 0 at 1.2.0)', 'It rained. It rained again on Tuesday. It rained all week, so we moved the picnic.');
miss('anaphora', 'narrative "It was…" ×3 (review M2)', 'It was 2 a.m. It was my third night on call. It was the database again.');
hit('anaphora', '"This is" ×3 is still anaphora', 'This is fast. This is cheap. This is easy to run.');
hit('anaphora', 'content-word starter ×3 still fires', 'Every team ships weekly. Every team writes a review. Every team owns its pager.');
hit('anaphora', 'slide openings across paragraphs still fire', 'Slide one shows the setup.\n\nSlide two shows the result.\n\nSlide three shows the cost.');

// ── mention vs use: inline code and fenced code are not prose ──────────────
miss('corporate-buzzword', 'watched word inside inline code', 'The lexicon now includes `leverage` and `utilize` as watched terms.');
miss('ai-signature', 'watched word inside a code fence', 'Example input:\n\n```sh\necho "We delve into a vibrant tapestry." | node slop-lint.mjs -\n```\n\nThe linter flags all three words.');
// Review 2026-10-31 (B2): code blanking passed a fenced draft whole, FATAL
// artifacts included. FATAL rules and chat leakage still read code, and a fence
// with no info string (or md/markdown/text/txt) is prose.
{
  const draft = 'Here are the two LinkedIn drafts for review.\n\n```\nIn today\'s fast-paced world, it\'s not just about shipping — it\'s about delivering value.\n\nWe leverage cutting-edge synergy to unlock your potential.\n\nDear [Hiring Manager], as an AI language model I cannot guarantee results.\n\nAgree? Drop your thoughts in the comments!\n```\n\n```markdown\nI\'m thrilled to announce our seamless, robust, game-changing platform.\n```\n';
  const r = lintText(draft);
  check('meta', 'code', 'a fenced slop draft is not scored 0 (review B2)', r.fatal > 0 && r.score > 20, `score=${r.score} fatal=${r.fatal}`);
  const md = lintText('```markdown\nOur seamless, robust platform.\n```');
  check('meta', 'code', 'a markdown-tagged fence is linted as prose', md.findings.some((x) => x.id === 'corporate-buzzword'));
  // Re-review (2026-10-31): ```plaintext is ChatGPT's usual wrapper for a prose
  // draft. Only a real programming-language tag means code.
  for (const tag of ['plaintext', 'text', 'txt', 'plain', 'email', 'prose', 'markdown', 'md', '']) {
    const r = lintText(`\`\`\`${tag}\nWe leverage robust, seamless synergy to unlock your potential.\n\`\`\``);
    check('meta', 'code', `a \`\`\`${tag || '(untagged)'} fence is linted as prose`, r.findings.some((x) => x.id === 'corporate-buzzword'), `score=${r.score}`);
  }
  for (const tag of ['js', 'python', 'sh', 'json']) {
    const r = lintText(`\`\`\`${tag}\nconst x = "We leverage robust, seamless synergy";\n\`\`\``);
    check('meta', 'code', `a \`\`\`${tag} fence is skipped as code`, !r.findings.some((x) => x.id === 'corporate-buzzword'));
  }
  const skipped = formatReport(lintText('Intro.\n\n```js\nconst a = 1;\n```\n'));
  check('meta', 'code', 'no "✅ no tells" claim when code was skipped', !skipped.includes('✅'));
}
hit('machine-artifact', 'AI disclaimer inside inline code still FATAL (review B2)', 'The bot replied `As an AI language model, I cannot do that` again.');
hit('machine-artifact', 'utm residue inside inline code still FATAL', 'Link: `https://example.com/a?utm_source=chatgpt.com`');
hit('chat-leakage', 'chat leakage inside a code fence still fires', '```js\n// I hope this helps!\n```');
{
  const r = lintText('Intro.\n\n```js\nconst a = 1;\nconst b = 2;\n```\n\nUse `npm test` after.');
  check('meta', 'code', 'the result reports how much code was skipped', r.codeSkipped?.fencedLines === 4 && r.codeSkipped?.inlineSpans === 1, JSON.stringify(r.codeSkipped));
}
miss('exclamation-density', 'exclamation marks inside inline code', 'Use `!==` for strict checks and `!` to negate, then run `npm test`!');
hit('corporate-buzzword', 'the same word used in prose still fires', 'We leverage a shared platform.');

// ── spaced en dash counts toward the ≤1 dash policy; ranges do not ─────────
hit('em-dash-density', 'two spaced en dashes used as dashes', 'The new policy – announced without warning – affects thousands of workers.');
miss('em-dash-density', 'en dash in number and date ranges', 'Revenue grew 10–12% between 2019–2021, on pages 4–9 of the filing.');
miss('em-dash-density', 'SPACED en-dash ranges (review m4)', 'Office hours are Monday – Friday, 9 – 5, in room 210, from June – August.');
miss('em-dash-density', 'open-ended résumé date ranges (2.0.1)', 'Head of Product\n2023 – Present\n\nDirector, Product\n2019 – 2023\n\nConsultant\nJan 2018 – current');
hit('em-dash-density', '"now" after a word is still a dash (2.0.1)', 'We waited – and now – we ship.');

// ── emoji: a ZWJ sequence is one emoji, and its joiner is not a bypass trick ─
miss('emoji-density', 'two ZWJ emoji count as two (review m5)', 'Pairing today 👩‍💻👨‍💻 on the billing fix.', { genre: 'linkedin' });
miss('bypass-normalization', 'a ZWJ inside an emoji is not a zero-width bypass', 'Pairing today 👩‍💻 on the billing fix.');
hit('bypass-normalization', 'a bare zero-width joiner in a word still is', 'We lev‍erage it.');
check('meta', 'emoji-bullets', 'emoji list markers are weak (release notes use ✅)', PATTERNS.STATISTICAL.emojiBullets?.tier === 'weak');

// ── bold labels: HTML colon-inside and numbered lists (review m6, n6) ──────
hit('bold-first-bullets', 'HTML <li><strong>Speed:</strong>', '<ul><li><strong>Speed:</strong> fast</li><li><strong>Cost:</strong> low</li><li><strong>Scale:</strong> big</li></ul>', { format: 'html' });
hit('bold-first-bullets', 'numbered list with bold labels', '1. **Speed:** fast\n2. **Cost:** low\n3. **Scale:** big');

// ── bold labels over short delimited lists are reference lists (2.0.1) ─────
miss('bold-first-bullets', 'résumé Skills, comma lists', '- **Product Leadership:** Product Vision & Strategy, Roadmap Development, M&A Integration\n- **Product Management:** Zero-to-One, Platform Product Management, Stakeholder Alignment\n- **Data & AI/ML:** Data Product Management, A/B Testing & Experimentation, ML Model Productization');
miss('bold-first-bullets', 'résumé Skills, pipe lists', '- **Languages:** Python | Go | SQL\n- **Cloud:** AWS | GCP | Azure\n- **Tools:** Next.js/TypeScript | pgvector | Inngest');
miss('bold-first-bullets', 'HTML Skills list', '<ul><li><strong>Languages:</strong> Python, Go, SQL</li><li><strong>Cloud:</strong> AWS, GCP, Azure</li><li><strong>Data:</strong> dbt, Airflow, Snowflake</li></ul>', { format: 'html' });
hit('bold-first-bullets', 'label + prose description still fires', '- **Speed:** It loads in under a second, even on slow networks.\n- **Cost:** It runs on one small instance, so hosting stays cheap.\n- **Scale:** It handles ten times the traffic without changes.');
hit('bold-first-bullets', 'label + two-sentence list-ish text is prose', '- **Speed:** Fast. Very fast, really, truly\n- **Cost:** Low. Cheap, lean, small\n- **Scale:** Big. Wide, tall, deep');

// ── library genre validation (review n2) ───────────────────────────────────
{
  let threw = false;
  try { lintText('x', { genre: 'LinkedIn' }); } catch { threw = true; }
  check('meta', 'genre', 'an unknown library genre throws instead of silently disabling rules', threw);
}

// ── clippedCadence: weak, fires only when 40%+ of 10+ sentences are clipped ─
hit('clipped-cadence', 'ten clipped sentences', 'We shipped it. It broke. We fixed it. Users came back. Churn fell. Revenue rose. The team cheered. Then the board met. They asked for more. We said yes.');
miss('clipped-cadence', 'the clean essay fixture (varied cadence)', readFileSync(join(ROOT, 'evals', 'corpus', 'clean-essay.md'), 'utf8'));
check('meta', 'clipped-cadence', 'stays weak-tier (corroboration only)', PATTERNS.STATISTICAL.clippedCadence?.tier === 'weak');

// ── humanizer "after" passages must pass the gate ──────────────────────────
{
  const src = readFileSync(join(ROOT, 'evals', 'fixtures', 'humanizer-passages.md'), 'utf8');
  const afters = [...src.matchAll(/^=== (\S*after\S*)\n([\s\S]*?)(?=^=== |(?![\s\S]))/gm)];
  const ship = PATTERNS.META.shipTarget;
  for (const [, id, text] of afters) {
    const r = lintText(text.trim(), { format: 'markdown' });
    check('miss', 'gate', `humanizer ${id} passes the gate`, r.fatal === 0 && r.gateScore <= ship,
      `gate=${r.gateScore} fatal=${r.fatal} ${r.findings.filter((f) => f.points > 0).map((f) => f.id).join(',')}`);
  }
}

// ── the ship gate is gateScore, in the CLI and in the docs ─────────────────
{
  // Weak-only findings: score above the target, gateScore zero.
  const weakOnly = 'We ran various tests with numerous vendors in a multitude of regions over countless weeks, e.g., Ohio, i.e., the pilot.';
  const r = lintText(weakOnly);
  check('meta', 'gate', 'fixture is weak-only (score > target, gateScore 0)', r.score > PATTERNS.META.shipTarget && r.gateScore === 0,
    `score=${r.score} gate=${r.gateScore}`);
  const run = (text, args) => spawnSync(process.execPath, [LINT, '-', ...args], { input: text, encoding: 'utf8' }).status;
  check('meta', 'gate', 'CLI --max 2 passes a weak-only document', run(weakOnly, ['--max', '2']) === 0);
  check('meta', 'gate', 'CLI --max 2 still blocks a strong finding above the target',
    run("In today's fast-paced world, we leverage synergy.", ['--max', '2']) === 1);
  const skill = readFileSync(join(ROOT, 'skills', 'anti-slop', 'SKILL.md'), 'utf8');
  check('meta', 'gate', 'SKILL.md ships on gateScore', /gateScore\s*≤\s*2/.test(skill) && !/Ship at score ≤2/.test(skill));
}

// ── Report ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => !r.pass);
if (jsonOut) {
  console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log('FALSE-POSITIVE GUARDS + SHIP GATE');
  console.log('='.repeat(52));
  for (const r of results) {
    const tag = { hit: 'HIT ', miss: 'MISS', meta: 'META' }[r.kind];
    console.log(`  ${r.pass ? '✓' : '✗'} [${tag}] ${r.id}: ${r.label}${r.pass ? '' : `  → got ${r.detail}`}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} passed (${results.filter((r) => r.kind === 'miss').length} false-positive guards)`);
  console.log(failed.length === 0 ? '\nPASS' : '\nFAIL');
}
process.exit(failed.length === 0 ? 0 : 1);
