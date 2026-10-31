// patterns.mjs — THE canonical machine-readable AI-slop pattern source.
//
// Single source of truth for the anti-slop skill, its bundled linter
// (scripts/slop-lint.mjs), and any tool that vendors this file. Prose
// catalogues are derived from and validated against this file — never the
// reverse.
//
// Maintenance contract (append-mostly):
//   - New patterns come from OBSERVED failures, never imagination.
//   - Append entries; do not rewrite or re-tier existing ones without eval evidence.
//   - Lexicons decay (models train away from publicized tells): every lexicon
//     carries a dateCohort; review quarterly; bump META.lastReviewed.
//   - Any change must keep the eval corpus green (clean fixtures stay clean).
//
// Tiers (detection reliability — see references/detection-guide.md):
//   fatal   — near-zero false-positive proof of machine origin. Any hit = fail.
//   strong  — structural constructions reliable at density; act on them.
//   lexical — word/phrase lists; real signal but time-decaying and genre-noisy.
//   weak    — corroborating only; must NEVER trigger action on their own.

export const META = {
  // From 2.0.0 this equals the plugin release version (.claude-plugin/plugin.json);
  // evals/check-release.mjs enforces it. Full history: CHANGELOG.md at the repo root.
  version: '2.1.0', // 2.1.0 (2026-10-31): content release, matching behavior: examples, fixtures and comments made generic; the unused `frequencyLabel` field removed from every pattern (the engine never read it, and a 2.x engine reads this file unchanged). 2.0.1 (2026-10-31): résumé false positives — an open-ended spaced date range ("2023 – Present") no longer counts toward em-dash density, and a bold label over a short delimited list ("- **Languages:** Python, Go, SQL", the résumé Skills line) no longer counts as a bold-first bullet. 2.0.0 (2026-10-31): ship gate is gateScore; genre-gated LinkedIn/X rules (`genres` field, GENRES export); contrast-family recall fixes (hyphen in X, eight new shapes) checked against a held-out set; chat-opener limited to chat-specific shapes at document or paragraph start; FATAL rules still read code; anaphora two-word rule for function-word starters; staging ports from blader/humanizer (staged-runup, phantom-objection, deep-saying, self-narration) and Wikipedia (source-disclaimer, corrective-framing, watchlist-2026); clippedCadence; emojiBullets; single qualifiers and 'in order to' re-tiered by evaluation; density-based free allowances (freePerWords); six unreachable lexicon terms removed (score-neutral). An engine older than 2.0.0 ignores `genres` and would run the social rules on every document, so vendor this file only together with slop-lint.mjs. 1.8.0 (2026-10-14): outreach coverage — `outreach-boilerplate` (strong: regex variants of stock letter/DM openers and closers; the exact-string `application-boilerplate` lexicon missed "I hope this MESSAGE finds you well" and "I came across <Company>", and 13 common outreach clichés scored 0; "I'd love/welcome the chance" deliberately excluded because a plain statement of interest is a human close), `permission-hedge` (strong: "I was wondering if", "no pressure", "in case it got lost" — asking permission to have written; bare if/but/just/might deliberately excluded), `exclamationDensity` (strong statistical: ≤1 per piece). Source of the observed failures and the eval fixtures: yashasvishailly/job-search-writing-rules (MIT). 1.7.0 (2026-08-13): four patterns ported from a separate de-slop catalogue that had drifted into a partial second source of truth — `vague-quantifier` (weak, free-allowance 2: various/numerous/multitude are ordinary English, a cluster is the tell), `hedge-stacking` (strong: STACKED modals only — bare "might"/"could" must never fire, and `likely` is excluded because "would likely take a week" is a normal estimate), `template-header` (strong, anchored to markdown heading syntax so body prose never fires; TL;DR deliberately excluded as a genuine human convention), `assert-dont-prove` (strong: asserting a thing is obvious in place of showing it). 1.6.0 (2026-08-13): CONTRAST_FAMILY gains a disposition axis — the freed first contrast now carries `review: 'keep-test'` alongside its info tier, the engine returns a `requiresReview` count, and the keep-test questions live in the pattern data so the report prints them inline. Fixes a gap where the free pass was filed under the report's own "corroborate only, never act on them alone" note, so the mandatory judgment call read as an instruction to ignore it (observed: a shipped never-form on a score of 0). Scoring, bands and gateScore are unchanged; the new `--require-review-disposition` exit is opt-in. 1.5.0 (2026-08-12): negative-parallelism family completed — 6 new antithesis shapes (never-form, question-form, degree-form, that-clause, point-form, past-tense verb-phrase) + "No A, no B, just C" added to countdown; CONTRAST_FAMILY introduces a one-free-per-document allowance across the contrast rules so the linter matches the skill's stated "cap at one per piece" policy instead of enforcing de facto zero tolerance (source: Oremus, The Atlantic, 2026-07-14 — Pangram measures the construction at 3x human frequency, i.e. the human baseline is not zero); 1.4.0 (2026-08-02): antithesis pattern widened — 4 new regexes covering you're/I'm/they're/he's/she's subjects, two-sentence period-separated reveal, markdown-context (table/list) sentence starts, and the mirrored trailing "X, not a/an/the Y." order (observed failure: original 4 patterns missed ~10 real instances in one document); 1.3.0 (2026-07-23): colon-reveal + dramatic-fragment + rhetorical-setup (imported from petergyang/no-ai-slop catalogue); 1.2.0 (2026-07-15): stylometric tier (adapted from conorbronsdon/avoid-ai-writing, MIT) + gateScore; 1.1.0: em-dash perception policy, FATAL FP fixes, span-dedup
  lastReviewed: '2026-10-31',
  reviewIntervalDays: 120,
  scoreBands: { low: 5, medium: 12 }, // 0–5 low · 6–12 medium · 13+ high
  shipTarget: 2,
};

// ─── Genres (2026-10-31) ─────────────────────────────────────────────────────
//
// A rule or detector carrying `genres: [...]` runs only when lintText is called
// with one of those genres (`--genre linkedin|x` on the CLI). Every other rule
// runs everywhere, and default linting (no genre) is unchanged by genre rules.
// Social posts have conventions that are tells elsewhere and vice versa: a
// one-line paragraph is the LinkedIn norm, "Thoughts?" is a fine email close.
export const GENRES = ['linkedin', 'x'];
const SOCIAL = ['linkedin', 'x'];

// ─── Contrast family: one free per document ──────────────────────────────────
//
// 2026-08-12. These rules all detect the same underlying tic — a claim staged
// against its own negation or a withheld reveal. Scored flat, a SINGLE
// deliberate use consumed the entire shipTarget of 2 and two were an automatic
// fail, so the linter enforced zero tolerance while SKILL.md said "cap at one
// per piece." That gap is what produces the voiceless over-correction the
// skill's restraint section warns against: the human baseline for negative
// parallelism is not zero (Pangram measures ~3x higher rate in AI text than
// human, not presence vs absence — humans use it, models over-use it).
//
// The engine zeroes the FIRST contrast finding in document order (it stays in
// the report at info tier, labelled as the free one) and scores every one after
// it. Same mechanism as the "one free however" allowance on overused-transition
// and maxAllowed on emDashDensity.
//
// The allowance is NOT the keep-test. The linter cannot tell whether the
// negated X is a real reader misconception; that judgment call lives in
// references/negative-parallelism.md and can waive a scored finding on review.
//
// 2026-08-13: that last paragraph described an intent the output could not
// carry. The freed finding was zeroed to `info` — a tier whose only other
// occupant is the non-actionable texture report, and which the report footer
// labels "corroborate only, never act on them alone." So the one finding
// carrying a MANDATORY judgment call was filed under, and labelled with, the
// system's own instruction to ignore it. A drafting agent shipped a
// textbook never-form ("The hard part was never the migration. It was …") on a
// score of 0 with no keep-test ever run.
//
// The free pass is correct and unchanged. What was missing is a DISPOSITION
// axis: the five tiers all encode detector reliability, so "high-confidence
// match, zero points, human must rule on it" had no representation. Findings
// freed here now also carry `review: 'keep-test'`, the engine reports a
// `requiresReview` count, and the questions below travel with the pattern data
// so the report can print them inline — the drafting agent meets the keep-test
// while looking at the finding, instead of needing a reference it was never
// pointed at. Scoring is untouched; `--require-review-disposition` is opt-in.
//
// Scoped to this family deliberately. The sibling allowances ("one free
// however" on overused-transition, maxAllowed on emDashDensity) use the same
// zeroing mechanism, but those frees are unconditional — no keep-test exists
// for them, so they get no disposition flag.
export const CONTRAST_FAMILY = {
  ids: ['antithesis', 'not-only-but-also', 'countdown', 'colon-reveal'],
  freePerDocument: 1,
  requiresKeepTest: true,
  // All three must hold, or state Y flat. Mirrors SKILL.md § Negative
  // parallelism → The keep-test, and references/negative-parallelism.md.
  keepTest: [
    'Does the reader genuinely hold belief X on arriving at this sentence?',
    'Is X their belief, not a strawman built so Y sounds earned?',
    "Would deleting X break the sentence (is the correction the point)?",
  ],
};

// ─── Lexicons (phrase lists; case-insensitive, word-boundary matched) ────────

export const LEXICONS = [
  {
    id: 'ai-signature', family: 'lexical', label: 'AI-signature word',
    tier: 'lexical', points: 3, fpRisk: 'moderate-decaying',
    dateCohort: '2023-2025',
    fix: 'Delete, then rewrite the sentence with a concrete claim. If you cannot, the sentence was empty.',
    terms: [
      'delve', 'delves', 'delving', 'revolutionary', 'game-changing', 'game changer',
      'game-changer', 'paradigm shift', 'cutting-edge', 'cutting edge', 'unprecedented',
      'transformative', 'reimagine', 'synergy', 'synergies', 'holistic', 'pivotal',
      'crucial', 'tapestry', 'testament', 'vibrant', 'fostering', 'enduring',
      'intricate', 'intricacies', 'meticulous', 'meticulously', 'bolstered', 'garner',
      'interplay', 'showcasing', 'enhancing', 'nestled', 'groundbreaking', 'renowned',
      'realm', 'unparalleled', 'commendable', 'pioneering', 'trailblazing', 'unleash',
      'multifaceted', 'myriad', 'plethora', 'underscores', 'underscoring', 'underscored',
    ],
  },
  {
    id: 'ai-cliche', family: 'lexical', label: 'AI cliché', tier: 'lexical',
    points: 3, fpRisk: 'low', dateCohort: '2023-2025',
    fix: 'Cut entirely and rewrite the sentence with a concrete claim.',
    terms: [
      "let's dive deep", "let's delve into", "let's dive in", "let's break this down",
      "let's unpack this", "let's explore this", 'unlock your potential',
      // 2026-10-31 merge pass: "transformative potential" and "unprecedented
      // opportunities" removed. Span-dedup could never keep them: ai-signature
      // "transformative"/"unprecedented" (same points, listed first, same
      // start) always won. Score-neutral.
      'harness the power of',
      'marking a pivotal moment', "here's the thing", 'the future looks bright',
      'at the end of the day', 'the bottom line is',
    ],
  },
  {
    id: 'corporate-buzzword', family: 'lexical', label: 'Corporate buzzword',
    tier: 'lexical', points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Replace with the plain word (utilize→use, leverage→use, facilitate→help, robust→strong, seamless→smooth) or name the specific thing.',
    terms: [
      'utilize', 'utilized', 'utilizing', 'leverage', 'leveraged', 'leveraging',
      'facilitate', 'facilitated', 'facilitating', 'streamline', 'streamlined',
      'synergize', 'robust', 'seamless', 'seamlessly', 'spearheaded', 'spearhead',
      'best-in-class', 'best in class', 'innovative', 'mission-critical',
      'future-proof', 'turnkey', 'plug-and-play', 'frictionless', 'supercharge',
      'state-of-the-art', 'best practices', 'demonstrated ability to',
    ],
  },
  {
    id: 'self-praise', family: 'lexical', label: 'Unsupported self-praise',
    tier: 'strong', points: 3, fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Delete the label, keep the proof: replace the adjective with the specific result it claims.',
    terms: [
      'results-driven', 'results-oriented', 'go-getter', 'team player', 'self-starter',
      'detail-oriented', 'hardworking professional', 'hard-working professional',
      'excellent communicator', 'dynamic professional', 'seasoned professional',
      'passionate about', 'proven track record', 'thought leader', 'adept at',
      'tech-savvy', 'motivated professional', 'think outside the box',
      'thinks outside the box',
    ],
  },
  {
    id: 'application-boilerplate', family: 'tonal', label: 'Application boilerplate',
    tier: 'strong', points: 2, fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Replace decades-old letter formulae with a specific claim about this company and this role.',
    terms: [
      'i am writing to express', 'i am writing to apply', 'to whom it may concern',
      'excited to apply', 'thrilled to apply', 'perfect fit for', 'i am confident that i would be',
      'i would welcome the opportunity', 'please do not hesitate',
      'looking forward to hearing from you', 'i hope this finds you well',
      'aligns perfectly with', 'i came across your profile', 'pick your brain',
    ],
  },
  {
    id: 'hedge', family: 'syntactic', label: 'Hedge phrase', tier: 'strong',
    points: 2, fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Own the claim, or give a precise caveat ("in 7 of 10 cases", not "in many ways").',
    terms: [
      "it's important to note", 'it is important to note', "it's worth mentioning",
      "it's worth noting", 'it is worth noting', 'it should be noted', 'it bears mentioning',
      'at its core', 'in essence',
      // 2026-10-31 merge pass: "it's crucial to understand" removed. Span-dedup
      // could never keep it, because ai-signature "crucial" (3 points) always
      // covers it. Score-neutral.
      // 2026-10-31: the single qualifiers (arguably, in many ways, to some
      // extent, for the most part, by and large, in a sense, generally
      // speaking) moved to the weak `single-qualifier` lexicon below.
    ],
  },
  {
    id: 'meta-commentary', family: 'structural', label: 'Meta commentary',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Say the thing; never announce that you are about to say the thing.',
    terms: [
      'in this article', 'in this post', 'in this section', 'in this essay',
      "we'll cover", 'we will cover', 'we will explore', 'we will discuss',
      'let me walk you through', "here's a comprehensive", 'by the end of this article',
      'without further ado', "let's take a closer look",
    ],
  },
  {
    id: 'wordy', family: 'syntactic', label: 'Wordy construction', tier: 'weak',
    points: 1, fpRisk: 'low',
    dateCohort: 'evergreen',
    // 2026-10-31: "in order to" removed. Wikipedia's "Signs of human writing"
    // lists it, and a small local count found it in human reference text (BSD
    // and git man pages) and not in the AI fixtures. Directional evidence.
    fix: 'Compress (due to the fact that→because, at this point in time→now, with regard to→about).',
    terms: [
      'due to the fact that', 'at this point in time', 'with regard to',
      'conduct an analysis', 'make a determination', 'provide assistance',
      'take into consideration', 'on a daily basis', 'in the event that',
    ],
  },
  {
    id: 'significance-inflation', family: 'rhetorical', label: 'Significance inflation',
    tier: 'strong', points: 2, fpRisk: 'moderate',
    dateCohort: '2023-2025',
    fix: 'Delete the inflation; state the specific, bounded fact and let the reader judge significance.',
    terms: [
      // 2026-10-31 merge pass: "testament to", "pivotal moment" and "pivotal
      // role" removed. Span-dedup could never keep them, because ai-signature
      // "testament"/"pivotal" (3 points) always covers them. Score-neutral.
      'reflects broader',
      'setting the stage for', 'evolving landscape', 'deeply rooted', 'indelible mark',
      'key turning point', 'cannot be overstated', 'in the annals of',
      'marking a significant',
    ],
  },
  {
    id: 'despite-challenges', family: 'rhetorical', label: 'Acknowledge-and-dismiss',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    dateCohort: '2023-2025',
    fix: 'Engage the challenge seriously or omit it; drop the boilerplate "faces challenges" formula.',
    terms: [
      'despite its challenges', 'despite these challenges', 'despite the challenges',
      'challenges and future prospects', 'faces challenges typical of',
    ],
  },
  {
    id: 'false-suspense', family: 'rhetorical', label: 'False suspense', tier: 'strong',
    points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Delete the tease; lead with the actual point.',
    terms: [
      "here's the kicker", "here's where it gets interesting",
      "here's what most people miss", "here's what most people get wrong",
      "but here's the truth", "here's the part nobody talks about",
    ],
  },
  {
    id: 'signposted-conclusion', family: 'structural', label: 'Signposted conclusion',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Delete — the reader knows where they are. End on the strongest concrete point.',
    terms: ['in conclusion', 'to sum up', 'in summary', 'to wrap up', 'all in all'],
  },
  {
    id: 'closing-tautology', family: 'structural', label: 'Closing tautology',
    tier: 'strong', points: 2, fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Delete. If the section made its point, no announcement needed. End on evidence or a next action.',
    terms: [
      'this shows why', 'demonstrates the importance of', 'this proves that',
      'this highlights the value', 'these results demonstrate',
    ],
  },
  {
    id: 'vague-attribution', family: 'rhetorical', label: 'Vague attribution',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Name the source or delete the claim.',
    terms: [
      'experts argue', 'experts say', 'experts agree', 'industry reports suggest',
      'observers have cited', 'studies have shown', 'research suggests', 'many believe',
      'experts believe', // 2026-10-31, humanizer §17 example (hz-17-before1)
    ],
  },
  {
    id: 'patronizing-analogy', family: 'tonal', label: 'Patronizing analogy',
    tier: 'strong', points: 2, fpRisk: 'moderate',
    dateCohort: 'evergreen',
    fix: 'Explain the concept directly instead of reaching for an unrequested metaphor.',
    terms: ['think of it as', "it's like a "],
  },
  {
    id: 'copula-avoidance', family: 'syntactic', label: 'Copula avoidance',
    // 2026-10-31: `freeAllowance: 2` let a 100-word post use two for free. A
    // small local count found none in ~94k words of human man pages and four in
    // ~19k words of AI fixtures (directional), so the allowance now scales with
    // length: one free use per 250 words.
    tier: 'strong', points: 2, freePerWords: 250,
    fpRisk: 'low-moderate', dateCohort: '2023-2025',
    fix: 'Use the plain copula ("serves as a hub" → "is a hub").',
    terms: ['serves as', 'stands as', 'holds the distinction of being', 'boasts', 'operates as', 'functions as'],
  },
  {
    id: 'adverbial-bloat', family: 'lexical', label: 'Adverbial bloat', tier: 'lexical',
    points: 2, freeAllowance: 1, allowTerms: { fundamentally: 1 },
    fpRisk: 'moderate-high', dateCohort: 'evergreen',
    fix: 'Delete the adverb; if removal weakens the sentence, the claim is weak. Never swap an adverb for a different adverb.',
    terms: [
      'importantly', 'remarkably', 'fundamentally', 'essentially', 'notably',
      'significantly', 'critically', 'clearly', 'particularly', 'relentlessly',
      'tirelessly',
    ],
  },
  {
    id: 'engagement-bait', family: 'tonal', label: 'Engagement bait', tier: 'strong',
    points: 3, fpRisk: 'low', dateCohort: 'evergreen',
    fix: 'Delete. Substance earns attention; bait spends credibility.',
    terms: [
      'let that sink in', 'read that again', 'this changes everything',
      "you're not ready for this", 'are you paying attention',
    ],
  },
  {
    // 2026-10-31, from the social-post item list ("The future is here").
    // All genres: a proclamation in place of a claim reads the same in a
    // memo as in a post. Kept to phrasings with no literal use.
    id: 'stock-proclamation', family: 'tonal', label: 'Stock proclamation',
    tier: 'lexical', points: 2, fpRisk: 'low', dateCohort: '2024-2026',
    fix: 'Delete it and end on the fact that made you want to write it.',
    terms: ['the future is here', 'the future is now', 'welcome to the future'],
  },
  {
    id: 'rhetorical-setup', family: 'rhetorical', label: 'Rhetorical setup',
    tier: 'lexical', points: 2, fpRisk: 'moderate',
    dateCohort: 'evergreen',
    // 2026-07-23: imported from petergyang/no-ai-slop ("Rhetorical setups"). The
    // self-answered "Question? Answer." half of that pattern is already covered by
    // self-posed-qa; this lexicon catches the phrase-led wind-ups it does not.
    // Genre-noisy (fiction/film writing uses "plot twist" straight), hence lexical
    // tier — an edit to consider, not a structural certainty.
    fix: 'Drop the wind-up and make the point. The fact is the hook.',
    terms: [
      'what if i told you', 'plot twist', 'let me ask you this', 'ask yourself this',
      "here's a thought experiment", 'riddle me this', "bet you didn't know",
      "here's a fun fact",
    ],
  },
  {
    id: 'chat-leakage', family: 'tonal', label: 'Chatbot register leakage',
    tier: 'strong', points: 2, fpRisk: 'moderate',
    dateCohort: 'evergreen',
    // 2026-10-31: read inside code too (as FATAL rules are). A pasted chat
    // answer often arrives inside a fence; "I hope this helps" is never code.
    lintsCode: true,
    fix: 'Chat-assistant politeness does not belong in published prose. Delete.',
    terms: [
      "i'd be happy to help", 'happy to help', 'would you like me to',
      "let me know if you'd like me to", 'i hope this helps',
    ],
  },
  {
    // 2026-08-13, ported from a separate de-slop catalogue. The tell
    // is a quantity claim that avoids the quantity. Deliberately WEAK with a
    // free allowance: "numerous trials" is ordinary English, and precision on
    // clean human prose is the failure mode that matters most here. A cluster
    // is the signal. `myriad`/`plethora` are NOT here — they sit in
    // `ai-signature`, where their sharper cohort earns the higher tier.
    id: 'vague-quantifier', family: 'lexical', label: 'Vague quantifier (density signal)',
    tier: 'weak', points: 1, freeAllowance: 2, freePerWords: 300,
    fpRisk: 'high', dateCohort: 'evergreen',
    fix: 'Give the number, or name them. "various stakeholders" → "the CFO and two board members"; "numerous trials" → "nine trials".',
    terms: [
      'various', 'numerous', 'multitude', 'countless', 'a variety of',
      'a range of', 'a host of', 'a number of', 'a wide array of',
    ],
  },
  {
    // 2026-08-13. Asserting that a thing is obvious, in place of showing it.
    // Distinct from `hedge` (which under-claims) — this over-claims by fiat,
    // and from `significance-inflation` (which inflates a fact rather than
    // substituting for one).
    id: 'assert-dont-prove', family: 'rhetorical', label: 'Assertion in place of evidence',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Delete the assertion and state the evidence. If you have none, you have no claim.',
    terms: [
      'the truth is simple', 'the reality is simple', 'history is clear',
      'the evidence is clear', 'one thing is clear', 'the answer is simple',
      'make no mistake', 'the fact of the matter is',
    ],
  },
  {
    id: 'watchlist', family: 'lexical', label: 'Watchlist word (density signal)',
    tier: 'weak', points: 1, freeAllowance: 2, freePerWords: 300,
    fpRisk: 'high', dateCohort: '2024-2026',
    fix: 'Fine in isolation; a cluster reads as generated. Swap for the concrete noun/verb where possible.',
    terms: [
      'dynamic', 'ecosystem', 'landscape', 'empower', 'empowering', 'empowered',
      'elevate', 'elevating', 'accelerate', 'proactive', 'insightful', 'data-driven',
      'disruptive', 'visionary', 'immersive', 'stakeholder', 'deeply', 'quietly',
      'journey', 'scalable', 'actionable', 'optimize', 'optimized', 'optimizing',
    ],
  },
  // ── 2026-10-31 ports. Staging lexicons from blader/humanizer v3.1.0 (MIT,
  // © 2025 Siqi Chen) §2-§5 and §25, trimmed to phrasings with no ordinary
  // use: "to be clear", "I'm not saying", "the thing is", "heads up", "in
  // reality", "the architecture of" and bare "honestly"/"look" were left out
  // as everyday English (humanizer itself says a casual "honestly" is fine).
  // Pinned with false-positive guards in evals/eval-staging-ports.mjs.
  {
    id: 'single-qualifier', family: 'syntactic', label: 'Single qualifier (density signal)',
    // Moved out of strong `hedge`. Humanizer §9 and Wikipedia's "Signs of human
    // writing" both call a lone qualifier a human habit; local counts found no
    // signal (a small, directional local count). The tell is a
    // stack, which `hedge-stacking` still catches at strong tier.
    tier: 'weak', points: 1, freeAllowance: 1,
    fpRisk: 'high', dateCohort: 'evergreen',
    fix: 'One qualifier is a choice; several in a short piece make every claim sound unsure. Keep the one the evidence needs.',
    terms: ['arguably', 'in many ways', 'to some extent', 'for the most part', 'by and large', 'in a sense', 'generally speaking'],
  },
  {
    id: 'phantom-objection', family: 'rhetorical', label: 'Arguing with no one (humanizer §5)',
    tier: 'lexical', points: 2, fpRisk: 'moderate', dateCohort: '2024-2026',
    fix: 'Remove the defense against an objection nobody raised. Keep an objection only when you name who holds it and answer it in full.',
    terms: [
      'a tempting approach would be', 'one might be tempted to', 'an obvious approach would be',
      'it would be easy to just', "this isn't mainly about", 'this is not mainly about',
      // "don't get me wrong" and "this is not to say" dropped (review M1): both
      // open ordinary human asides ("Don't get me wrong, I loved the job.").
      'some might say', "i'm not arguing that",
    ],
  },
  {
    id: 'deep-saying', family: 'rhetorical', label: 'Saying that sounds deep (humanizer §3)',
    // Review 2026-10-31 (M1): weak, not lexical, and "is the currency of", "is the
    // language of" and "the heart of the matter" dropped: "The yen is the
    // currency of Japan" and "The real question is whether finance will fund
    // it" are ordinary English. What stays is corroboration only.
    tier: 'weak', points: 1, fpRisk: 'moderate', dateCohort: '2024-2026',
    fix: 'State the claim it gestures at, with its evidence. "X becomes a trap" says nothing a reader can check.',
    terms: ['the real question is', 'what really matters is', 'the deeper issue is', 'becomes a trap'],
  },
  {
    id: 'self-narration', family: 'structural', label: 'Writing about the document (humanizer §25)',
    // Weak: humanizer marks a single description of the page "weak alone",
    // and change logs legitimately say what replaced what.
    tier: 'weak', points: 1, fpRisk: 'moderate', dateCohort: '2024-2026',
    fix: 'Describe the subject, not how the text was assembled. Keep a caveat only if it changes what the reader should do.',
    terms: [
      'was added to replace', 'flagged rather than guessed', 'the table below compares',
      'this section is organized by', 'this page is organized by', 'this document is organized by',
    ],
  },
  {
    // Wikipedia "Signs of AI writing" (2026-10-31): a mid-2026 vocabulary
    // cohort with a SINGLE vendor-blog source. Weak, two free plus one per 300
    // words, never actionable alone; review at the next quarterly pass.
    // (leverage, multifaceted and quietly from the same list already sit in
    // corporate-buzzword, ai-signature and watchlist.)
    id: 'watchlist-2026', family: 'lexical', label: 'Mid-2026 cohort word (density signal)',
    tier: 'weak', points: 1, freeAllowance: 2, freePerWords: 300,
    fpRisk: 'high', dateCohort: '2026-mid',
    fix: 'Fine in isolation; a cluster reads as current-model output. Swap for the concrete noun or verb.',
    // "matters" and "challenge" dropped (review m12): too common to signal anything.
    terms: ['clearer', 'dependable', 'echoed', 'foster', 'practical', 'prioritize', 'steady', 'universally'],
  },
];

// ─── Fatal artifacts (near-zero false positives; any hit fails the piece) ────

export const FATAL_LEXICON = {
  id: 'machine-artifact', family: 'mechanical', label: 'Machine artifact (FATAL)',
  tier: 'fatal', points: 10, fpRisk: 'near-zero',
  dateCohort: 'evergreen',
  fix: 'Proof of unedited machine output. Remove the artifact and re-review the whole piece.',
  terms: [
    'as an ai language model', 'as a language model', 'as an ai assistant',
    'my knowledge cutoff', 'my training data', 'i cannot browse the internet',
    'as of my last update', 'while specific details are limited',
    'oaicite', 'oai_citation', 'contentreference', 'turn0search', ':::writing',
    'attached_file',
    // 2026-10-31: citation-link residue (Wikipedia "Signs of AI writing"):
    // a link copied out of a chat answer carries the tracking parameter.
    'utm_source=chatgpt.com', 'utm_source=openai',
    // 2026-07-15 review (Q1a): "i hope this helps" demoted to chat-leakage —
    // it is a normal human email closer, violating the fatal near-zero-FP contract.
  ],
};

// chat-opener building blocks (2026-10-31). Start of the document, of a
// paragraph, or of the line under a markdown heading or a "Subject:" line.
const CHAT_START = String.raw`(?:^\s*|(?<=\n[ \t]*\n)[ \t]*|(?<=(?:^|\n)(?:#{1,6}[ \t][^\n]*|subject:[^\n]*)\n)[ \t]*)`;
const HERE = String.raw`here(?:'s|\s+is|\s+are)`;
const INDEF = String.raw`(?:a|an|some|two|three|four|five|\d+)`;
const OFFER_NOUN = String.raw`(?:revised|updated|polished|rewritten|improved|refined|tailored|shorter|tighter|longer|draft|drafts|version|versions|summary|overview|breakdown|email|message|post|letter|options|template|rewrite|reply|response|outline)`;
const VERSION_OF_YOUR = String.raw`${HERE}\s+(?:a|an|the|your)\s+(?:[\w-]+\s+){0,2}?(?:version|rewrite)\s+of\s+your\b`;
const TAIL = String.raw`${HERE}\s+${INDEF}\s+[^.\n]{0,40}?\byou\s+can\s+(?:send|post|copy|paste|adapt)\b`;
const OFFER_ANY = [
  String.raw`${HERE}\s+${INDEF}\s+(?:[\w-]+\s+){0,3}?${OFFER_NOUN}\b`,
  VERSION_OF_YOUR,
  // Same determiners as the here's branch, so plural "Below are 5 hooks" counts.
  String.raw`below\s+(?:is|are)\s+(?:${INDEF}|your)\b`,
  String.raw`i'?ve\s+(?:rewritten|revised|polished|tightened)\s+your\b`,
].join('|');
const OFFER_STRICT = [VERSION_OF_YOUR, TAIL].join('|');

export const FATAL_REGEX = [
  {
    id: 'placeholder', family: 'mechanical', label: 'Leftover placeholder (FATAL)',
    tier: 'fatal', points: 10,
    fix: 'An unfilled template slot is an instant reject in any submitted document.',
    // 2026-07-15 review (Q1b): fatal placeholders require an unambiguous
    // placeholder cue. Bare [title]/[date]/[your call] in ordinary prose no
    // longer auto-fail (they violated the near-zero-FP contract).
    // 2026-07-16 (B4): re-admit a CURATED, NAMED list of bare single-word slots
    // ([Company]/[Role]/[Name]/[Title]/[Date]/[City]/[Team]/[Manager]) — these
    // exact bracketed nouns are template-slot conventions, not natural prose, so
    // the named list stays inside the near-zero-FP contract. Excluded by the
    // guards below: markdown inline links [x](url) and reference links [x][ /
    // [x]:, code index/member access (df[Date], arr[name], a[b][name]),
    // inline-code spans `[Date]`, and Obsidian wiki-links [[Company]]
    // (lookbehind rejects a preceding '[', lookahead rejects a trailing ']').
    // Footnotes [1], [sic], and checkboxes [x]/[ ] never match because they
    // are not in the named alternation. Known residual: a markdown SHORTCUT
    // reference link whose text is exactly a named slot ("see [Title] here"
    // with a [title]: url definition elsewhere) still matches — detecting it
    // needs document-level context the per-pattern engine doesn't have.
    patterns: [
      /\[(?:insert|add|todo|tbd|xx+)[^\]]{0,60}\]/i,
      /\[(?:your|company|candidate|hiring manager|recruiter)\s+(?:name|title|company|accomplishment|achievement|metric|number|date)[^\]]{0,40}\]/i,
      /(?<![\w`)\]\[])\[(?:company|role|name|title|date|city|team|manager)\](?![(\[:\w`\]])/i,
      /\b(?:add|insert)\s+(?:numbers?|metrics?|details?|accomplishments?|examples?)\s+here\b/i,
      /\blorem ipsum\b/i,
      /\{\{[^}]+\}\}/, // unfilled template variable
    ],
  },
  {
    id: 'chat-opener', family: 'mechanical', label: 'Chatbot opener (FATAL)',
    tier: 'fatal', points: 10,
    fix: 'Betrays raw copy-paste from a chat window. Delete and re-review the piece.',
    // 2026-10-31: the tell is an acknowledgement followed by an OFFER TO PRODUCE
    // NEW TEXT for the reader, at the start of the document, of a paragraph, or
    // of the line under a heading or "Subject:" line. Three passes of review:
    //   - Courtesy words alone are human ("Sure, I'll be there at 3", "Of
    //     course, I'd be happy to introduce you", "Great question. We priced it
    //     per seat…"). (1.x matched "of course," at the start of any line.)
    //   - FORWARDING an artifact that already exists is human too: "Sure,
    //     here's the updated budget", "Of course. Here's the email Dana sent",
    //     "Sure. Below is the schedule", "here's my reply", "I've updated the
    //     doc". So the offer needs an INDEFINITE determiner (a/an/some/a number:
    //     new content, not a known thing), "version of your", or "I've
    //     rewritten your".
    //   - "Certainly" and "Great question" may precede any offer. "Sure", "Of
    //     course" and "Absolutely" need "!" before an indefinite offer; after a
    //     comma or period they need "version of your" or an indefinite offer
    //     with a "you can send/post/copy/paste/adapt" tail.
    // Pinned by both lists in evals/eval-false-positives.mjs.
    patterns: [
      new RegExp(`${CHAT_START}(?:great question|certainly)!`, 'i'),
      new RegExp(`${CHAT_START}(?:certainly|great question)[!,.]\\s+(?:${OFFER_ANY})`, 'i'),
      new RegExp(`${CHAT_START}(?:absolutely|of course|sure)!\\s+(?:${OFFER_ANY})`, 'i'),
      new RegExp(`${CHAT_START}(?:absolutely|of course|sure)[,.]\\s+(?:${OFFER_STRICT})`, 'i'),
    ],
  },
];

// ─── Regex rules (structural/syntactic constructions) ────────────────────────

export const REGEX_RULES = [
  {
    id: 'antithesis', family: 'syntactic', label: 'antithesis / negative parallelism ("not X, it\'s Y")',
    tier: 'strong', points: 2, fpRisk: 'low-at-density',
    fix: 'Coffee test: is the "not X" naming a real misconception? If not, state Y directly. Cap at one per piece.',
    // 2026-08-02: observed-failure additions (a manual anti-slop pass over one
    // real document caught ~10 instances the original 4 patterns missed
    // entirely — patterns 1–4 below are the original set, unchanged). Three
    // distinct shapes were slipping through:
    //   (a) subjects outside it's/this-is/that's/we're — "you're not X, you're Y",
    //       "I'm/they're/he's/she's not X, ... Y" never matched at all.
    //   (b) the two-SENTENCE reveal ("X is not A. It is B.") — patterns 1 & 3
    //       only fire within one clause (comma/dash separator); a period plus a
    //       short interstitial clause ("X is not A. For reasons Y, it is B.")
    //       was invisible.
    //   (c) markdown contexts — pattern 4's sentence-initial form required a
    //       preceding [.!?—], so "Not X, but Y" as a table-cell value or list
    //       item (preceded by "| " or "- ") never matched; needed 'm' flag +
    //       markdown-aware prefixes.
    //   (d) the mirrored TRAILING order ("X, not a/an/the Y." — positive claim
    //       first, punchy redefinition second) had no coverage at all. Scoped to
    //       require a determiner (a/an/the) right after "not" — this is what
    //       separates the rhetorical reveal ("a hypothesis, not a fact") from an
    //       ordinary contrastive list ("coffee, not tea"), keeping FP risk low.
    patterns: [
      /\b(it'?s|this is|that'?s|we'?re)\s+not\s+(just\s+)?[\w\s'-]{2,40}?[—–,;-]\s*(it'?s|it is|but|they'?re|we'?re|that'?s|this is|you'?re|i'?m)\b/gi,
      /\bwe\s+don'?t\s+[\w\s]{2,30}?,?\s+we\s+\w+/gi,
      /\b(isn'?t|aren'?t)\s+[\w\s'-]{2,40}?[.,;—–]\s*(it'?s|they'?re)\b/gi,
      /(?:^|[.!?—:]\s+)not\s+(?!just\s+yet\b)(?:just\s+|only\s+|merely\s+)?[\w][\w\s'-]{2,40}?[,—-]\s+(?:but|it'?s|rather)\b/gi,
      // (a) widened subject/connector set (you're/I'm/they're/he's/she's)
      /\b(you'?re|i'?m|they'?re|he'?s|she'?s)\s+not\s+(just\s+)?[\w\s'-]{2,40}?[—–,;-]\s*(it'?s|it is|but|they'?re|we'?re|you'?re|i'?m|he'?s|she'?s)\b/gi,
      // (b) two-sentence reveal, uncontracted negation, optional short interstitial clause
      /\b(?:is|are|was|were)\s+not\s+[\w\s'"()-]{2,60}?[.]\s+(?:[A-Z][\w\s]{0,35},\s+)?(it'?s|it is|this is|that'?s|they'?re|we'?re|you'?re)\s+(?:the|a|an)\b/gi,
      // (c) markdown-context sentence-initial "Not X, but Y" (table cells, list items)
      /(?:\|\s+|^[ \t]*(?:[-*+]|\d+[.)])\s+)not\s+(?!just\s+yet\b)(?:just\s+|only\s+|merely\s+)?[\w][\w\s'-]{2,40}?[,—-]\s+(?:but|it'?s|rather)\b/gim,
      // (d) mirrored trailing order: "X, not a/an/the Y."
      // The determiner requirement is load-bearing and must NOT be relaxed:
      // it is what separates the rhetorical reveal ("a hypothesis, not a fact")
      // from the bare contrastive tail real writers use ("grounded in customer
      // interviews, not guesswork"). See the KEEP fixtures.
      // The number-word lookahead excludes factual quantity corrections
      // ("nine customers, not the twelve we planned") — those are arithmetic,
      // not rhetoric. Caught as an FP by the eval fixture, 2026-08-12.
      /,\s+not\s+(?:a|an|the)\s+(?!\d|one\b|two\b|three\b|four\b|five\b|six\b|seven\b|eight\b|nine\b|ten\b|eleven\b|twelve\b|dozen\b)[\w\s'-]{2,40}?[.?!]/gi,
      // ── 2026-08-12: shapes 5–10 of the family (Oremus, The Atlantic,
      // 2026-07-14). Patterns 1–8 above covered the additive and supplanting
      // forms only; an audit against the article's corpus found five more
      // shapes with no coverage at all and one with partial coverage.
      // (e) never-form — "The target was never a man. The target was the truth."
      /\b(?:is|was|are|were)\s+never\s+[\w\s'"()-]{2,60}?[.,]\s+(?:the\s+\w{2,20}\s+(?:is|was|are|were)|it'?s|it\s+(?:is|was)|this\s+(?:is|was)|that'?s|they'?re|but)\b/gi,
      // (k) contracted two-sentence reveal — "It's not about speed. It's about
      // accuracy." The single largest pre-existing gap, found by the eval
      // fixture on 2026-08-12: p1 needs a comma/dash separator, p3 needs an
      // uncontracted "isn't", and p6 needs an uncontracted "is not" — so the
      // most common form of the whole family, and the catalogue's own headline
      // example, matched nothing at all.
      // Case is explicit rather than using the /i flag: the reveal half must be
      // sentence-initial (capitalized), while the setup half can be either.
      /\b(?:[Ii]t'?s|[Tt]his is|[Tt]hat'?s|[Ww]e'?re|[Yy]ou'?re|[Ii]'?m|[Tt]hey'?re|[Hh]e'?s|[Ss]he'?s)\s+not\s+(?:just\s+|only\s+|merely\s+)?[\w\s'"()-]{2,60}?[.]\s+(?:It'?s|It is|This is|That'?s|They'?re|We'?re|You'?re|I'?m|He'?s|She'?s)\b/g,
      // (f) question-form — "The question is not whether we ship, but when."
      // (the contracted "The question isn't X. It's Y." already hits pattern 3)
      /\bthe\s+(?:question|issue|problem|point|challenge|risk|danger|fix|answer|topic)\s+(?:is\s+not|isn'?t|was\s+not|wasn'?t)\s+[\w\s'"()-]{2,60}?[.,;]\s*(?:but|it'?s|it is|it was|the\s+\w{2,20}\s+(?:is|was))\b/gi,
      // (g) degree-form — "less about speed, more about accuracy"
      /\b(?:less\s+about\s+[\w\s'-]{2,40}?,?\s+(?:and\s+)?more\s+about|not\s+so\s+much\s+[\w\s'-]{2,40}?\s+as)\b/gi,
      // (h) that-clause — "It's not that we were slow. It's that we were wrong."
      /\b(?:it'?s|this is|that'?s)\s+not\s+that\s+[\w\s'"()-]{2,60}?[.,;]\s*(?:it'?s|it is|this is|that'?s|but)\s+that\b/gi,
      // (i) point-form — "Speed isn't the point. Accuracy is."
      /\b(?:is\s+not|isn'?t|are\s+not|aren'?t)\s+(?:the\s+(?:point|issue|problem|goal|question|answer|reason|story)|what\s+matters)\b[^.?!]{0,40}[.;]\s+[A-Z][\w\s'-]{1,40}\s+(?:is|are|was|were|does|do|matters)\b/g,
      // (j) past-tense verb-phrase across two sentences — "We didn't build a
      // tool. We built a system." Pattern 2 only reached the present-tense
      // single-clause form ("we don't sell software, we sell outcomes").
      // Determiners on both objects keep ordinary sequential narration out
      // ("We didn't sign the contract. We went home.") at some FP cost.
      /\b(we|they|i|you)\s+(?:didn'?t|did\s+not)\s+\w+\s+(?:a|an|the)\s+[\w\s'-]{2,30}?[.]\s+(?:We|They|I|You)\s+\w+\s+(?:a|an|the)\b/gi,
      // ── 2026-10-31: recall on outside text. The family scored 100% on its
      // own fixture and 7 of 33 (21%) on contrast sentences from humanizer's
      // examples and Wikipedia's "Signs of AI writing". Patterns 1, 3, 4, 5 and
      // 7 above were widened in place: a hyphen is legal inside X ("a
      // weight-loss drug" scored clean while "a weight loss drug" fired),
      // ";" and "–" join the separators, a colon can open a "not X, but Y"
      // clause, and "Not just yet, but…" is excluded. The shapes below had no
      // coverage at all. Factual corrections share them ("The bug isn't in the
      // parser; it's in the tokenizer"), which is what the keep-test is for.
      // (l) any subject + uncontracted or contracted copula, dash/semicolon
      // reveal — "These comments are not just dismissive—they're disrespectful."
      /\b(?:(?:is|are|was|were)\s+not|isn'?t|aren'?t|wasn'?t|weren'?t|ain'?t)\s+(?:just\s+|only\s+|merely\s+)?[\w\s'"():-]{2,40}?\s*[—–;]\s*(?:it'?s|they'?re|that'?s|it\s+(?:is|was))\b/gi,
      // (m) "doesn't just X; it Y" — the additive verb form
      /\b(?:doesn'?t|don'?t|didn'?t|does\s+not|do\s+not|did\s+not)\s+just\s+\w+[^.;—–]{0,60}[;—–]\s*(?:it|they|we|you|he|she)\s+\w+/gi,
      // (n) "doesn't X …; it only Z" and the same-verb echo "doesn't grow
      // from silence — it grows from critique". A different verb without
      // "only" stays clean ("doesn't retry; we page the on-call").
      /\b(?:doesn'?t|don'?t|didn'?t)\s+(\w+)\b[^.;—–]{0,60}[;—–]\s*(?:it|they|we|you|he|she)\s+(?:only\s+\w+|\1s?\b)/gi,
      // (o) "not a mirror but a portal" — determiners on both nouns keep
      // "not a fit for us, but the call was useful" out
      /\bnot\s+(?:a|an|the)\s+[\w-]+\s+but\s+(?:a|an|the)\s+\w+/gi,
      // (p) "not just/merely X, but Y" without "also" (humanizer §1)
      /\bnot\s+(?:just|merely)\s+(?!yet\b)[^.;]{2,50}?,?\s+but\b/gi,
      // (q) parallel preposition — "not grounded in X, but in Y"
      /\bnot\s+(?:\w+\s+){0,2}?(in|on|at|by|for|from|to|with|about)\s+[^,.;—]{2,40}?,?\s+but\s+\1\b/gi,
      // (r) split reveal — "This does not mean X. It means Y." (humanizer §1).
      // Case is explicit: the reveal must open a new sentence.
      /\b(?:[Dd]oes\s+not|[Dd]oesn'?t|[Dd]id\s+not|[Dd]idn'?t)\s+mean\s+[^.!?]{2,80}[.]\s+It\s+(?:means|meant)\b/g,
      // (s) split reveal with "Rather," — "This dispersal is not dissolution.
      // Rather, it constitutes…"
      /\b(?:is|are|was|were)\s+not\s+[\w\s'-]{2,40}?[.]\s+Rather,\s/g,
    ],
  },
  {
    id: 'not-only-but-also', family: 'syntactic', label: '"Not only X but also Y"',
    tier: 'strong', points: 2, fpRisk: 'moderate',
    fix: 'Usually padding: state the stronger half. Keep only when both halves carry distinct weight.',
    patterns: [/\bnot\s+only\s+[^.,;:]{2,50}[,;]?\s+but\s+(?:also\s+)?/gi],
  },
  {
    id: 'concession-pivot', family: 'syntactic', label: 'Concession-pivot (sneaky reframe)',
    tier: 'weak', points: 1, fpRisk: 'high',
    fix: 'Same skeleton as "not X, it\'s Y" in a trench coat. If the concession is empty, cut it and assert directly.',
    patterns: [
      /\b(?:sure|granted|yes),\s+[^.!?]{2,60}[.!?]\s+but\b/gi,
      /\bwhile\s+[^,]{2,50}\s+(?:might|may)\s+(?:seem|sound|appear)\b[^,]{0,30},/gi,
    ],
  },
  {
    id: 'self-posed-qa', family: 'syntactic', label: 'Self-posed Q&A',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    fix: 'Delete the question nobody asked; keep the answer as a statement.',
    // 2026-10-31: + "the lesson" / "the takeaway" (social-post item
    // "generic inspirational lesson": "The lesson? Consistency beats talent.").
    patterns: [/\b(the result|the problem|the worst part|the catch|the kicker|the best part|the twist|the lesson|the takeaway)\?\s+[A-Z][^.?!]{0,60}[.?!]/gi],
  },
  {
    id: 'colon-reveal', family: 'syntactic', label: 'Colon reveal ("The best part: it learns.")',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    // 2026-07-23: imported from petergyang/no-ai-slop ("Colon reveals"). Sibling of
    // self-posed-qa — same dramatic-reveal noun phrases, but a colon + lowercase
    // continuation instead of a question mark. Scoped to a curated noun set AND a
    // required lowercase reveal so labels and list intros ("Requirements:", "Total
    // cost:") and Title-Case headings never match.
    fix: 'Rewrite as one plain sentence. Colons are for lists, labels, and quotes — not manufactured drama.',
    patterns: [/\b(?:the\s+(?:best|worst|hardest|weirdest|strangest|surprising|real|key|fun|scariest|craziest)\s+part|the\s+(?:catch|kicker|twist|irony|reality|truth|secret|beauty|magic|upshot|punchline)|the\s+(?:detail|thing|part|reason|trick|feature|insight|move|question)\s+(?:that|is|here)[\w\s'’-]{0,40})\s*:\s+[a-z][^.?!\n]{0,80}[.?!]/gi],
  },
  {
    // 2026-08-13, ported from a separate de-slop catalogue.
    // STACKED modals only. A bare "might" / "could" is ordinary English and
    // must never fire — the tell is two hedges doing one hedge's job, which
    // marks a writer buying time instead of committing. `likely` is excluded
    // on purpose: "would likely take a week" is a normal, useful estimate.
    id: 'hedge-stacking', family: 'syntactic', label: 'Stacked modal hedge ("might possibly")',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'Keep one hedge at most, or replace with a precise qualifier ("in 7 of 10 cases", not "might possibly").',
    patterns: [
      /\b(?:might|may|could|can|would)\s+(?:possibly|potentially|perhaps|conceivably|arguably)\b/gi,
      /\b(?:possibly|potentially|perhaps|conceivably)\s+(?:might|may|could|would)\b/gi,
      /\bit(?:'s|\s+is)\s+possible\s+that\b[^.!?]{0,60}?\b(?:might|may|could)\b/gi,
    ],
  },
  {
    // 2026-08-13, ported from a separate de-slop catalogue. Headings
    // that label the section's ROLE instead of its content — the blog-template
    // shape. Anchored to markdown heading syntax so body prose ("my final
    // thoughts on this are…") never fires. `TL;DR` is deliberately absent: it
    // is a genuine human convention, not a template tell.
    id: 'template-header', family: 'structural', label: 'Template section header',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'Replace with a header naming the specific content ("Final Thoughts" → "Why we chose Postgres").',
    patterns: [
      /^#{1,6}\s+(?:final thoughts|closing thoughts|parting thoughts|key takeaways?|the takeaway|the bottom line|why this (?:actually )?works|what this means(?: for you)?|wrapping up|in closing)\s*:?\s*$/gim,
    ],
  },
  {
    id: 'countdown', family: 'syntactic', label: 'Countdown ("Not X. Not Y. Just Z.")',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'State the point directly.',
    patterns: [
      // 2026-08-12: noun phrases widened to 3 tokens — "Not a bug. Not a
      // feature. Just a design flaw." missed because each negated item was
      // more than a bare word.
      /\bnot\s+[\w-]+(?:\s+[\w-]+){0,2}\.\s+not\s+[\w-]+(?:\s+[\w-]+){0,2}\.\s+(just|only|simply)\b/gi,
      // 2026-08-12: comma-joined "No A, no B, just C" — the stacked-negation
      // shape the Atlantic flags as endemic in AI-generated fiction ("No bag,
      // no things, no armor, just me"). Only the period-separated form matched.
      // 2026-10-31: the negator can be "not" as well as "no" (one word
      // throughout, via the backreference), items run to four tokens ("not a
      // body of work"), and a dash can stand before "just": "Not a career,
      // not a body of work, not sustained relevance — just an algorithmic
      // moment."
      /\b(no|not)\s+[\w-]+(?:\s+[\w-]+){0,3},\s+\1\s+[\w-]+(?:\s+[\w-]+){0,3}(?:,\s+\1\s+[\w-]+(?:\s+[\w-]+){0,3}){0,6}\s*[,—–]\s*(?:just|only|simply)\b/gi,
    ],
  },
  {
    id: 'dramatic-fragment', family: 'syntactic', label: 'Dramatic fragmentation ("That\'s it. That\'s the whole thing.")',
    tier: 'strong', points: 2, fpRisk: 'moderate',
    // 2026-07-23: imported from petergyang/no-ai-slop ("Dramatic fragmentation").
    // countdown covers the NEGATION form ("Not X. Not Y. Just Z."); this covers the
    // affirmative mic-drop. The terminal-punctuation guard on the second pattern
    // keeps "that's the whole point of the exercise" (mid-sentence) clean.
    fix: 'Mic-drop fragments manufacture drama. State the point in one complete sentence.',
    patterns: [
      /\bthat(?:’|'|\s+i)?s\s+it[.!]\s+that(?:’|'|\s+i)?s\s+(?:the\s+)?(?:whole\s+|entire\s+)?\w+/gi,
      /\bthat(?:’|'|\s+i)?s\s+(?:the\s+)?(?:whole\s+|entire\s+)(?:thing|point|story|trick|secret|magic|ballgame|game|deal)\b[.!]/gi,
      // 2026-10-31, humanizer §2: the one-line closer that names what the
      // line before it showed. Terminal punctuation keeps "That is the real
      // win for the support team, because…" clean.
      /\bthat(?:’|'|\s+i)?s\s+the\s+real\s+(?:win|story|lesson|unlock|point)[.!]/gi,
      /\bthat\s+distinction\s+matters[.!]/gi,
    ],
  },
  {
    id: 'trailing-participle', family: 'syntactic', label: 'trailing participial commentary',
    tier: 'strong', points: 3, fpRisk: 'moderate',
    sentenceFinal: true, // engine applies per-sentence, anchored to sentence end
    fix: 'Delete the trailing "-ing" phrase, or make it its own sentence with a real claim.',
    patterns: [/,\s+(contributing|highlighting|underscoring|fostering|reflecting|showcasing|emphasizing|demonstrating|reinforcing|cementing|solidifying|underlining|signaling|ensuring|cultivating)\b[^.?!]*[.?!]?$/i],
  },
  {
    id: 'overused-transition', family: 'syntactic', label: 'Overused transition',
    tier: 'lexical', points: 2, fpRisk: 'moderate',
    special: 'transitions', // engine: sentence-start However/Moreover/... with "however ≤1 free"
    fix: 'moreover/furthermore/additionally→also; nevertheless→still; however (sentence start)→but.',
    patterns: [/(?:^|[.!?]\s+|\n)\s*(However|Moreover|Furthermore|Additionally|Nevertheless)\b/g],
  },
  {
    id: 'latin-sidebar', family: 'mechanical', label: 'Latin sidebar (e.g.,/i.e.,)',
    tier: 'weak', points: 1, fpRisk: 'moderate',
    fix: 'e.g.,→like/such as/for example; i.e.,→meaning/specifically.',
    patterns: [/\b(e\.g\.,|i\.e\.,)/gi],
  },
  {
    id: 'era-opener', family: 'tonal', label: 'Era/context opener ("In today\'s…")',
    tier: 'strong', points: 3, fpRisk: 'low',
    fix: 'Cut the scene-setting preamble; open on the specific claim or fact.',
    patterns: [/(?:^|[.!?]\s+)in\s+(?:today'?s|the\s+(?:ever-evolving|fast-paced|rapidly\s+evolving|modern|digital))\b/gi],
  },
  {
    id: 'imagine-opener', family: 'rhetorical', label: 'Futurism opener ("Imagine a world…")',
    tier: 'strong', points: 3, fpRisk: 'low',
    fix: 'Open with a concrete fact or claim, not a hypothetical utopia.',
    patterns: [/(?:^|[.!?]\s+)(?:imagine|picture)\s+(?:a\s+world|a\s+company|a\s+future|this)\b/gi],
  },
  {
    id: 'false-range', family: 'rhetorical', label: 'False range ("from X to Y")',
    tier: 'weak', points: 1, fpRisk: 'high',
    fix: 'If there is no real spectrum between the endpoints, name the actual items without the range frame.',
    patterns: [/\bfrom\s+(?![\d$])[a-z][\w-]{2,20}(?:\s+[\w-]{2,20}){0,2}\s+to\s+(?![\d$])[a-z][\w-]{2,20}(?:\s+[\w-]{2,20}){0,2}\b/gi],
  },
  {
    id: 'invented-label', family: 'rhetorical', label: 'Invented concept label',
    tier: 'weak', points: 1, fpRisk: 'high',
    fix: 'Only name a concept if you define and earn it; otherwise describe plainly.',
    patterns: [/\bthe\s+\w+\s+(?:paradox|trap|creep|divide|vacuum|inversion)\b/gi],
  },
  {
    id: 'ten-x-hype', family: 'tonal', label: 'Hype multiplier ("10x your…")',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'Replace the promise with the specific, bounded result.',
    patterns: [/\b10x\s+(?:your|the)\b/gi],
  },
  {
    // 2026-10-14, observed failure. `application-boilerplate` matches exact
    // strings, so "I hope this finds you well" fired and "I hope this MESSAGE
    // finds you well" did not; "I came across your profile" fired and "I came
    // across Northwind" did not. Thirteen stock outreach openers and closers
    // all scored 0, and two whole messages (a follow-up after silence and a
    // referral ask, from yashasvishailly/job-search-writing-rules, MIT) scored
    // 0 end to end. These are the regex variants.
    //
    // Scoped to phrasings that only occur in a letter or message to a reader
    // you want something from. "I look forward to the day…" (essay) and "I came
    // across this bug" (narrative) must never fire; see the MISS cases in
    // evals/eval-outreach-patterns.mjs.
    id: 'outreach-boilerplate', family: 'tonal', label: 'Outreach boilerplate (stock opener/closer)',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'Open on the reason you are writing to THIS person (one clause), close on one specific ask. Delete the formula; nothing replaces it.',
    patterns: [
      // Openers
      /\b(?:I\s+)?hope\s+(?:this|my)\s+(?:(?:e-?mail|message|note|letter)\s+)?finds\s+you\b/gi,
      /\b(?:I\s+)?hope\s+you(?:'re|\s+are)\s+(?:doing\s+)?(?:well|great|good)\b/gi,
      /\b(?:I\s+)?hope\s+you(?:'re|\s+are)\s+having\s+an?\s+(?:great|good|wonderful)\s+(?:week|day)\b/gi,
      /\bI\s+(?:just\s+)?wanted\s+to\s+(?:reach\s+out|follow\s+up|check\s+in|touch\s+base|introduce\s+myself)\b/gi,
      /\bjust\s+(?:following\s+up|checking\s+in|circling\s+back|bumping\s+this)\b/gi,
      /\bI(?:'m|\s+am)\s+reaching\s+out\s+(?:because|to)\b/gi,
      /\bI\s+(?:recently\s+)?(?:came\s+across|stumbled\s+(?:upon|across))\s+(?:your|the)\s+(?:profile|post|posting|company|work|role|job|listing|opening|website|article|team)\b/gi,
      /(?:^|[.!?]\s+|,\s+)I\s+(?:recently\s+)?(?:came\s+across|stumbled\s+(?:upon|across))\s+[A-Z][\w&.-]*/gm,
      /\b(?:been\s+)?following\s+your\s+(?:journey|story|progress|career)\b/gi,
      /\ballow\s+me\s+to\s+introduce\s+myself\b/gi,
      /(?:^|[.!?,]\s+)[Mm]y\s+name\s+is\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,?\s+and\s+I(?:'m|\s+am)\b/gm,
      /(?:^|[.!?,]\s+)quick\s+question\b/gim,
      // Closers
      /\b(?:I\s+)?look(?:ing)?\s+forward\s+to\s+(?:hearing\s+(?:from\s+you|back)|the\s+opportunity|speaking\s+with\s+you|connecting|discussing\s+(?:this|the\s+role|further)|your\s+(?:reply|response))\b/gi,
      /\bthank\s+you\s+for\s+your\s+time\s+and\s+consideration\b/gi,
      /\bdon't\s+hesitate\s+to\s+(?:reach\s+out|contact|let\s+me\s+know|get\s+in\s+touch)\b/gi,
      // NOT here: "Let me know if you have any questions". The gotcha "Plain
      // human closers stay legal" (references/gotchas-log.md) rules it normal
      // human email register.
      /\bexcited\s+(?:about|by)\s+the\s+(?:possibility|prospect)\b/gi,
      /\b(?:let's\s+)?(?:touch\s+base|circle\s+back)\b/gi,
      /\bwould\s+love\s+to\s+(?:connect|chat|hop\s+on|grab\s+(?:a\s+)?(?:coffee|time))\b/gi,
      // NOT here: "I'd love the chance to talk it through" / "I'd welcome the
      // chance to talk". A plain one-sentence statement of interest is a human
      // close that human-written letters use.
      // The tell is the same closer reused across many letters, which is a
      // corpus-level check, not a per-document lexical one.
    ],
  },
  {
    // 2026-10-14, same observed failure as `outreach-boilerplate`. Distinct
    // from `hedge` (which softens a CLAIM) and `hedge-stacking`: these phrases
    // ask the reader for permission to have written at all. Bare "if", "but",
    // "just", "might" are ordinary English and are NOT here — a blanket ban on
    // them sands off voice (and "that said" / "But" openers are human).
    id: 'permission-hedge', family: 'tonal', label: 'Permission-seeking hedge',
    tier: 'strong', points: 2, fpRisk: 'low-moderate',
    fix: 'Make the ask plainly ("Worth 15 minutes?") or give the reader a clean exit ("If not, say so and I\'ll apply cold."). Do not apologize for writing.',
    patterns: [
      /\bI\s+was\s+wondering\s+(?:if|whether)\b/gi,
      /\bwould\s+it\s+be\s+possible\s+(?:to|for)\b/gi,
      /\bno\s+pressure(?:\s+at\s+all)?\b/gi,
      /\bfeel\s+free\s+to\s+(?:let\s+me\s+know|reach\s+out|ignore|say\s+no|pass)\b/gi,
      /\bhope\s+you\s+don't\s+mind\b/gi,
      /\bif\s+you(?:'re|\s+are)\s+open\s+to\s+it\b/gi,
      /\bif\s+you\s+have\s+a\s+(?:few|spare|couple\s+of)\s+minutes\b/gi,
      /\bin\s+case\s+(?:it|this|my\s+(?:last\s+|previous\s+)?(?:message|e-?mail|note))\s+got\s+(?:lost|buried)\b/gi,
      /\b(?:at\s+your\s+earliest\s+convenience|whenever\s+(?:it's\s+)?convenient(?:\s+for\s+you)?)\b/gi,
      /\bsorry\s+to\s+(?:bother|bug|trouble)\s+you\b/gi,
    ],
  },
  {
    // 2026-10-31, humanizer §4 (blader/humanizer, MIT). A regex rule, not a
    // lexicon, because the run-up must STAND ALONE (review M1): "Here's what
    // you need to know before Monday: the badge office…", "Let's be honest
    // with the customer" and "Did I enjoy it, honestly?" are ordinary.
    id: 'staged-runup', family: 'rhetorical', label: 'Staged run-up (humanizer §4)',
    tier: 'lexical', points: 2, fpRisk: 'low-moderate',
    fix: 'Delete the run-up and start with the point it was announcing.',
    patterns: [
      /\blet'?s\s+dive\s+into\b/gi,
      /\bhere'?s\s+what\s+you\s+need\s+to\s+know[.:!]?[ \t]*$/gim,
      /(?:^|[.!?]\s+)honestly\?/gim,
      /(?:^|[.!?]\s+)(?:let'?s\s+be\s+honest|real\s+talk)\s*[:.!]/gim,
    ],
  },
  {
    // 2026-10-31, humanizer §23 + Wikipedia "Signs of AI writing" words to
    // watch. A retrieval chatbot that found nothing says so, then guesses.
    // The FATAL lexicon already holds "while specific details are limited";
    // these are its variants. Excluded on purpose: "not publicly available"
    // alone ("until Q3" is a release date), "not well documented" (a human
    // complaint) and "widely available" (a product claim).
    id: 'source-disclaimer', family: 'mechanical', label: 'Source-availability disclaimer',
    tier: 'strong', points: 2, fpRisk: 'low',
    fix: 'Delete the disclaimer and the guess that follows it. If a fact is unknown, leave it out or say who to ask.',
    patterns: [
      /\b(?:in|from|across)\s+(?:the\s+)?(?:provided|available|readily\s+available|publicly\s+available|accessible)\s+(?:sources|search\s+results|materials|documents)\b/gi,
      /\bnot\s+(?:widely|extensively)\s+(?:documented|disclosed)\b/gi,
      /\bbased\s+on\s+(?:the\s+)?available\s+information\b/gi,
      // The low-profile guess only after a speculation verb (review M1): "The
      // firm maintains a low profile in the press" is a plain fact.
      /\b(?:suggesting|indicating|implying)\s+(?:that\s+)?\w+(?:\s+\w+)?\s+(?:maintains|keeps)\s+(?:a\s+low\s+profile|(?:(?:his|her|their)\s+)?personal\s+(?:details|life)\s+private)\b/gi,
    ],
  },
  {
    // 2026-10-31, Wikipedia's mid-2026 corrective framings. Lexical tier, not
    // strong: legal and academic prose says "does not establish that" too.
    id: 'corrective-framing', family: 'rhetorical', label: 'Corrective framing ("should be treated as X rather than Y")',
    // Review 2026-10-31 (M1): weak. Legal and statistical prose uses both forms
    // plainly ("should be treated as a floor rather than an estimate").
    tier: 'weak', points: 1, fpRisk: 'moderate',
    fix: 'Say what the source shows and stop. Telling the reader how to classify a claim stands in for the evidence.',
    patterns: [
      /\bshould\s+be\s+(?:treated|read|understood|presented|seen|viewed)\s+as\s+[^.;]{2,80}?\brather\s+than\b/gi,
      /\bdoes\s+not\s+(?:by\s+itself\s+)?establish\s+that\b/gi,
    ],
  },
  // ── Social genres (2026-10-31; run only under genre linkedin|x) ────────────
  // Sources: the skill's own social-post item list
  // (evals/fixtures/social-post-items.md) and humanizer §2/§4. Common posting
  // practice (1-2 sentence paragraphs, a one-sentence close, a specific CTA, an
  // occasional comment-gated lead magnet) must stay clean
  // (evals/eval-social-genre.mjs). Only generic bait is matched.
  {
    id: 'social-closer', family: 'tonal', label: 'Engagement-bait closer (social)',
    tier: 'strong', points: 2, fpRisk: 'low', genres: SOCIAL,
    fix: 'End on one specific ask the reader can answer ("Which field would you cut first?"), or on your strongest fact. "Thoughts?" and "Agree?" ask for nothing.',
    patterns: [
      /(?:^|[.!?]\s+)(?:agree|thoughts|agree or disagree|am i wrong|anyone else|sound familiar)\?/gim,
      /\b(?:drop|share|leave)\s+(?:it|them|yours|your\s+\w+(?:\s+\w+)?)\s+(?:in\s+the\s+comments|below)\b/gi,
      /\b(?:let\s+me\s+know|comment)\s+(?:in\s+the\s+comments|below)\b/gi,
      /\bfollow\s+(?:me\s+)?for\s+more\b/gi,
      /\brepost\s+(?:this\s+)?(?:if|to)\b/gi,
    ],
  },
  {
    // First line only: no `m` flag, so ^ is the start of the post.
    id: 'hook-formula', family: 'tonal', label: 'Formula hook (first line, social)',
    tier: 'strong', points: 2, fpRisk: 'low', genres: SOCIAL,
    fix: 'Open on the concrete claim or number itself (≤110 characters). Write five hooks and keep the one that states something only you could.',
    patterns: [
      /^\s*(?:i'?m|we'?re|i\s+am|we\s+are)\s+(?:so\s+)?(?:thrilled|excited|delighted|honou?red|proud|humbled)\s+to\s+(?:announce|share)\b/i,
      /^\s*(?:unpopular\s+opinion|hot\s+take)\b/i,
      /^\s*here'?s\s+what\s+(?:i\s+learned|they'?re\s+missing|nobody\s+tells\s+you|no\s+one\s+tells\s+you)\b/i,
      // An opening question (a house default: no opening question).
      /^\s*[^\n.!?]{3,120}\?/,
    ],
  },
  {
    id: 'social-heading', family: 'structural', label: 'Markdown heading in an X post',
    tier: 'strong', points: 2, fpRisk: 'low', genres: ['x'],
    fix: 'X renders no markdown, so a heading reads as a pasted document. Make it a sentence.',
    patterns: [/^#{1,6}[ \t]+\S/gm],
  },
];

// ─── Statistical detectors (engine-implemented; thresholds configured here) ──

export const STATISTICAL = {
  emDashDensity: {
    // PERCEPTION POLICY (2026-07-15): readers now assume em-dashes mean
    // AI-generated text, even when they don't. Shipped prose eliminates almost
    // all of them, legitimacy notwithstanding. Allow 1 per document (plus
    // attribution lines "— Name"); flag from the 2nd, escalating per dash.
    // NOTE: as a DETECTION signal about someone else's text this remains weak
    // (see references/detection-guide.md); this rule is a generation-side
    // shipping policy, hence tier strong.
    tier: 'strong', points: 3, perExtraPoint: 1, maxPoints: 8, maxAllowed: 1,
    fix: 'Perception rule: readers read "—" as AI even when it isn\'t. Keep at most one (or an attribution); replace the rest by role (aside→commas/parens, definition→colon, interruption→period, list-explanation→semicolon).',
  },
  sentenceUniformity: {
    tier: 'strong', points: 3, minSentences: 6, meanMin: 10, meanMax: 20, stdevBelow: 3.5,
    // 2026-10-31: the fix no longer says "use a fragment for punch". In a
    // private set of human-edited agent drafts (not published), the edits
    // mostly LENGTHENED short sentences; the clipped cadence was what the
    // writers undid.
    fix: 'Low burstiness is the most durable statistical tell. Vary length: join related clauses as often as you cut, so a 25-word sentence sits next to a 6-word one.',
  },
  clippedCadence: {
    // 2026-10-31, weak and cluster-only. Share of sentences of <= maxWords
    // words. Calibrated on a private set of human-edited drafts (not
    // published; none reached 40%); the most clipped AI fixture sits at 50%.
    // Its sibling proposal, a low share of ; : ( ) among punctuation
    // ("punctVariety"), was REJECTED on the same data: the human-edited drafts
    // used those marks no more often than agent drafts did, so it would have
    // flagged human style.
    tier: 'weak', points: 2, minSentences: 10, maxWords: 8, ratio: 0.4,
    fix: 'Most sentences are clipped short. Join related clauses into longer sentences; keep a short one only where it lands a new fact.',
  },
  paragraphUniformity: {
    // Weak/corroborating per the taxonomy: disciplined human writers also keep
    // steady paragraph lengths; only flag as part of a cluster.
    tier: 'weak', points: 2, minParagraphs: 5, meanMin: 2.5, meanMax: 4.5, stdevBelow: 0.9,
    fix: 'Uniform 3–4-sentence paragraphs read as machine rhythm. Let some paragraphs be one line.',
  },
  starterMonotony: {
    tier: 'weak', points: 2, minSentences: 8, ratio: 0.5, starters: ['the', 'this', 'it', 'in'],
    fix: 'Too many sentences opening with The/This/It/In. Vary the openings; front-load different subjects.',
  },
  anaphora: {
    // 2026-10-31: three sentences opening with "The" ("The trip… The custard
    // tarts… The part I liked…") cost 3 strong points on human prose. After
    // "The" or "This" the run now needs the first TWO words to match (one- and
    // two-letter starters such as "It" stay excluded, as in 1.x):
    // "This is fast. This is cheap. This is easy." still fires, "The board…
    // The vote… The second vote…" does not. The run is NOT reset at blank
    // lines, so identical openings across slides or paragraphs ("Slide one…
    // Slide two… Slide three…") still count.
    tier: 'strong', points: 3, run: 3, functionStarters: ['the', 'this'],
    fix: 'Vary the openings; deliberate anaphora is a device, three-in-a-row by default is a tell.',
  },
  boldFirstBullets: {
    // listMinItems/listItemMaxWords (2.0.1): "**Label:** a, b, c" with at least
    // that many short items is a reference list (résumé Skills) and is skipped.
    tier: 'strong', points: 3, min: 3, listMinItems: 3, listItemMaxWords: 6,
    fix: 'Rewrite as prose or vary the formatting — almost nobody hand-formats every bullet as **Keyword**: description.',
  },
  boldDensity: {
    tier: 'weak', points: 2, per100Words: 4, minWords: 120,
    fix: 'Reserve bold for genuine emphasis; mechanical bolding reads as generated.',
  },
  titleCaseHeadings: {
    tier: 'weak', points: 1, minHeadings: 2, minWords: 3,
    fix: 'Use sentence case for headings unless the house style says otherwise.',
  },
  duplication: {
    tier: 'strong', points: 5, minWords: 8,
    fix: 'Cut the repeat — verbatim repeated sentences are a dead giveaway of unedited output.',
  },
  exclamationDensity: {
    // 2026-10-14. One exclamation mark is a choice; two or more in a piece
    // sent to someone who owes you nothing reads as eager or generated (the
    // observed outreach "before" messages carried two to four each). The
    // engine skips markdown images ("![") and "!=" so code-ish text is clean.
    tier: 'strong', points: 2, perExtraPoint: 1, maxPoints: 4, maxAllowed: 1,
    fix: 'Keep at most one exclamation mark per piece; end the rest with a period and let the content carry the energy.',
  },
  emojiBullets: {
    // 2026-10-31, all genres. Emoji opening list lines ("✅ Ship small",
    // "🚀 **Launch Phase:**") is the decorative-heading tell (humanizer §20,
    // social-post item "emoji-filled list"). ©/®/™ are not counted as emoji.
    // Weak since review 2026-10-31 (m5): human release notes and checklists use
    // ✅ markers too, so it corroborates and never blocks on its own.
    tier: 'weak', points: 2, min: 2,
    fix: 'Drop the emoji from list lines; if the list needs markers, use plain bullets or write it as a sentence.',
  },
  // ── Social genres (2026-10-31; only under genre linkedin|x) ────────────────
  broetry: {
    // Runs of very short sentences or one-line paragraphs ("I got fired.\n\nOn
    // a Tuesday.\n\nNo warning."). Common posting practice is a line break
    // every 1-2 sentences, so only a run of FRAGMENTS (≤ maxWords words each)
    // is flagged, never short paragraphs as such. Weak: corroboration only.
    tier: 'weak', points: 2, genres: SOCIAL, run: 3, maxWords: 5,
    fix: 'Merge the fragments into one sentence that carries the fact. Short paragraphs are fine; a row of fragments is the tell.',
  },
  rhetoricalRun: {
    tier: 'strong', points: 2, genres: SOCIAL, run: 3,
    fix: 'Three questions in a row stage a reveal. Ask one, or answer it.',
  },
  hashtagDensity: {
    // House default ("3-5 hashtags or none"); change maxAllowed here if your
    // venue differs.
    tier: 'strong', points: 2, genres: SOCIAL, maxAllowed: 5,
    fix: 'Keep three to five specific hashtags, or none.',
  },
  emojiDensity: {
    // House default ("≤3 emojis"); change maxAllowed here if your venue
    // differs.
    tier: 'strong', points: 2, genres: SOCIAL, maxAllowed: 3,
    fix: 'Keep at most three emojis per post, and none that stand in for a word.',
  },
  unicodeDecoration: {
    tier: 'weak', points: 2,
    fix: 'Use ASCII (-> not →, straight quotes). Decorative unicode in professional prose reads machine-generated.',
  },
  contractionRate: {
    tier: 'info', points: 0, minWords: 150,
    fix: 'Zero contractions across a long first-person piece reads stiff. Corroborating signal only — never act on it alone.',
  },

  // ── Stylometric texture tier (2026-07-15) ─────────────────────────────────
  // Adapted from conorbronsdon/avoid-ai-writing (MIT, © 2026 Conor Bronsdon).
  // These measure statistical texture, not vocabulary — they survive
  // synonym-swapping and lexicon decay. Each is weak/corroborating alone;
  // stylometricCluster escalates when several fire together. Thresholds cite
  // stylometry literature (arXiv 2507.00838) and are calibrated against the
  // eval corpus + real human writing samples.
  trigramEntropy: {
    tier: 'weak', points: 2, minWords: 150, minSeq: 50, threshold: 0.82,
    fix: 'Grammatical structure is unusually repetitive (LLM sampling collapses onto narrow templates). Vary clause shapes: move subordinate clauses, split and merge sentences, change what a sentence starts with.',
  },
  crossParaBurstiness: {
    tier: 'weak', points: 2, minParagraphs: 4, minSentencesPerPara: 3, stdOfCvBelow: 0.08, meanCvBelow: 0.45,
    fix: 'Every paragraph has the same internal rhythm. Let some paragraphs run terse and others discursive.',
  },
  punctDistribution: {
    tier: 'weak', points: 2, minParagraphs: 4, cvBelow: 0.25, minMeanDensity: 0.04,
    fix: 'Punctuation density is uniform across paragraphs; human writers swing between dense and sparse.',
  },
  lowTtr: {
    // MATTR (moving-average type-token ratio, window 100) instead of raw TTR —
    // raw TTR degrades with length regardless of author. Conservative threshold.
    tier: 'weak', points: 2, minTokens: 200, window: 100, threshold: 0.55,
    fix: 'Vocabulary diversity is low — the same words recycle. Name specifics instead of repeating category words.',
  },
  smartPunctSignature: {
    tier: 'weak', points: 2, minWords: 80, minSignals: 4,
    fix: 'Curly quotes + em-dash + Oxford comma + zero typos together reads as pasted-from-LLM. Any one alone means nothing.',
  },
  bypassNormalization: {
    tier: 'strong', points: 3, minZeroWidth: 1, minHomoglyphs: 2, minRoleplay: 2,
    fix: 'Invisible/lookalike characters typical of AI-humanizer bypass tools (zero-width chars, Cyrillic/Greek homoglyphs). Re-type the text cleanly.',
  },
  stylometricCluster: {
    tier: 'strong', points: 4, minHits: 3,
    fix: 'Several independent texture signals fired together — the text has machine rhythm even if the vocabulary is clean. Rework cadence: vary sentence and paragraph length, openings, and punctuation density.',
  },
};

// ─── Judgment-only patterns (not lintable; for the catalogue and the judge) ──

export const JUDGMENT = [
  { id: 'horoscope', label: 'Horoscope test', family: 'tonal',
    description: 'Could anyone have written this, for anyone? Vague claims, universal advice, any-byline prose.',
    fix: 'Inject what only this author/company/moment could produce: tools, dates, metrics, named projects, opinions not everyone shares.' },
  { id: 'genericness', label: 'Un-tailored content', family: 'tonal',
    description: 'The #1 recruiter complaint: prose that could go to any company unchanged.',
    fix: 'At least one company-specific fact per section; the "why them" must not survive a find-and-replace of the company name.' },
  { id: 'elegant-variation', label: 'Elegant variation / synonym cycling', family: 'lexical',
    description: 'The same person/thing renamed each mention ("the entrepreneur", "the visionary", "the key figure").',
    fix: 'Pick one name and repeat it. Forced synonyms are worse than repetition.' },
  { id: 'rule-of-three-abuse', label: 'Rule-of-three compulsion', family: 'syntactic',
    description: 'Every list has exactly three items; triads as filler rhythm. (Deliberate triads are good rhetoric — flag only mechanical repetition.)',
    fix: 'Vary to 2, 4, or 5; replace filler adjective triads with one precise word.' },
  { id: 'dead-metaphor', label: 'Dead metaphor', family: 'rhetorical',
    description: 'One metaphor worked 5+ times across the piece.',
    fix: 'Introduce a metaphor once, use it, move on.' },
  { id: 'one-point-dilution', label: 'One-point dilution', family: 'structural',
    description: 'A single thesis restated many ways to fill length.',
    fix: 'Compress to the strongest statement; cut the rephrasings.' },
  { id: 'fractal-summaries', label: 'Fractal summaries', family: 'structural',
    description: 'Preview → content → recap at every nesting level.',
    fix: 'One summary max per document; trust the reader.' },
  { id: 'manufactured-personality', label: 'Manufactured personality', family: 'tonal',
    description: 'Performed quirkiness or forced informality that does not match the author.',
    fix: 'Less imitation, more inhabitation; if it feels forced, pull back.' },
  { id: 'false-vulnerability', label: 'False vulnerability', family: 'tonal',
    description: 'Polished, risk-free "honesty" performing self-awareness ("This is not a rant; it\'s a diagnosis").',
    fix: 'Remove the meta-commentary; let substance carry sincerity.' },
  { id: 'forced-positivity', label: 'Forced positivity', family: 'tonal',
    description: 'Everything is exciting and beneficial; no stance, no tension. CAUTION: in job applications, never "fix" this by inserting self-deprecating gap admissions.',
    fix: 'Allow specificity and tension; take a position.' },
  { id: 'analogy-stacking', label: 'Historical/brand analogy stacking', family: 'rhetorical',
    description: 'Rapid-fire famous-company analogies to fabricate authority ("Apple didn\'t build Uber. Facebook didn\'t…").',
    fix: 'One apt, specific analogy you can defend.' },
  { id: 'mirrored-metaphor', label: 'Mirrored metaphor / aphorism cosplay', family: 'rhetorical',
    description: 'Motivational-poster reversals ("Success isn\'t a destination, it\'s a journey").',
    fix: 'Motivational-poster test → delete; state what you actually do.' },
  { id: 'over-correction', label: 'Humanizer artifacts', family: 'lexical',
    description: 'Unnatural thesaurus swaps from aggressive de-AI passes ("paramountly significant").',
    fix: 'Revert to the plain word; anything failing the say-it-aloud test goes.' },
  // 2026-10-31: the paragraph-scale halves of humanizer §5, §24-§26, and the
  // no-invention rule humanizer also states.
  { id: 'invented-detail', label: 'Invented detail', family: 'tonal',
    description: 'A number, name, quote, source, ranking or personal anecdote that is not in the source or the author\'s notes. A specificity mandate with no source pushes a drafter to fabricate.',
    fix: 'Diff facts both ways against the source: an added claim is an error, a lost one is too. Missing fact → write the plainer sentence or ask.' },
  { id: 'unprompted-defense', label: 'Arguing with no one', family: 'rhetorical',
    description: 'Paragraphs that rebut an objection or reject an option nobody raised, often left over from an earlier draft. Several in a row is a stronger sign than one.',
    fix: 'Cut the defense; keep an objection only when you name who holds it and answer it in full.' },
  { id: 'heading-restated', label: 'Heading restated', family: 'structural',
    description: 'The first sentence under a heading repeats the heading ("## Performance" → "Speed matters.").',
    fix: 'Start the section with its first new fact.' },
  { id: 'process-narration', label: 'Narrating the work', family: 'structural',
    description: 'Text about how the document was assembled, sourced or laid out instead of about the subject.',
    fix: 'Keep a source credit the reader can follow and a caveat that changes what they do; cut the account of how you worked.' },
  { id: 're-explaining', label: 'Re-explaining what the reader knows', family: 'tonal',
    description: 'A reply that restates the problem and the evidence before reaching the decision, which sits in the last line.',
    fix: 'Lead with the decision; add only what the reader does not already have.' },
];
