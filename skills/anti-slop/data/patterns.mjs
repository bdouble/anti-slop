// patterns.mjs — THE canonical machine-readable AI-slop pattern source.
//
// Single source of truth for the anti-slop skill, its bundled linter
// (scripts/slop-lint.mjs), and any downstream consumers that vendor this file
// (e.g. a downstream writing pipeline). Prose catalogues are
// derived from and validated against this file — never the reverse.
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
//
// frequencyLabel governs remediation intensity (from the voice system):
//   HARD   — remove 100% of instances.
//   STRONG — remove 70–80%; keep the 20–30% doing real structural work.
//   LIGHT  — apply where it improves the text.

export const META = {
  version: '1.7.0', // 1.7.0 (2026-08-13): four patterns ported from a downstream consumer's local de-slop catalogue, which had drifted into a partial second source of truth — `vague-quantifier` (weak, free-allowance 2: various/numerous/multitude are ordinary English, a cluster is the tell), `hedge-stacking` (strong: STACKED modals only — bare "might"/"could" must never fire, and `likely` is excluded because "would likely take a week" is a normal estimate), `template-header` (strong, anchored to markdown heading syntax so body prose never fires; TL;DR deliberately excluded as a genuine human convention), `assert-dont-prove` (strong: asserting a thing is obvious in place of showing it). 1.6.0 (2026-08-13): CONTRAST_FAMILY gains a disposition axis — the freed first contrast now carries `review: 'keep-test'` alongside its info tier, the engine returns a `requiresReview` count, and the keep-test questions live in the pattern data so the report prints them inline. Fixes a gap where the free pass was filed under the report's own "corroborate only, never act on them alone" note, so the mandatory judgment call read as an instruction to ignore it (observed: a shipped never-form on a score of 0). Scoring, bands and gateScore are unchanged; the new `--require-review-disposition` exit is opt-in. 1.5.0 (2026-08-12): negative-parallelism family completed — 6 new antithesis shapes (never-form, question-form, degree-form, that-clause, point-form, past-tense verb-phrase) + "No A, no B, just C" added to countdown; CONTRAST_FAMILY introduces a one-free-per-document allowance across the contrast rules so the linter matches the skill's stated "cap at one per piece" policy instead of enforcing de facto zero tolerance (source: Oremus, The Atlantic, 2026-07-14 — Pangram measures the construction at 3x human frequency, i.e. the human baseline is not zero); 1.4.0 (2026-08-02): antithesis pattern widened — 4 new regexes covering you're/I'm/they're/he's/she's subjects, two-sentence period-separated reveal, markdown-context (table/list) sentence starts, and the mirrored trailing "X, not a/an/the Y." order (observed failure: original 4 patterns missed ~10 real instances in one document); 1.3.0 (2026-07-23): colon-reveal + dramatic-fragment + rhetorical-setup (imported from petergyang/no-ai-slop catalogue); 1.2.0 (2026-07-15): stylometric tier (adapted from conorbronsdon/avoid-ai-writing, MIT) + gateScore; 1.1.0: em-dash perception policy, FATAL FP fixes, span-dedup
  lastReviewed: '2026-08-12',
  reviewIntervalDays: 120,
  scoreBands: { low: 5, medium: 12 }, // 0–5 low · 6–12 medium · 13+ high
  shipTarget: 2,
};

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
// system's own instruction to ignore it. A consumer (career-ops) shipped a
// textbook never-form ("The hard part was never building. It was …") on a
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
    tier: 'lexical', points: 3, frequencyLabel: 'HARD', fpRisk: 'moderate-decaying',
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
    points: 3, frequencyLabel: 'HARD', fpRisk: 'low', dateCohort: '2023-2025',
    fix: 'Cut entirely and rewrite the sentence with a concrete claim.',
    terms: [
      "let's dive deep", "let's delve into", "let's dive in", "let's break this down",
      "let's unpack this", "let's explore this", 'unlock your potential',
      'harness the power of', 'transformative potential', 'unprecedented opportunities',
      'marking a pivotal moment', "here's the thing", 'the future looks bright',
      'at the end of the day', 'the bottom line is',
    ],
  },
  {
    id: 'corporate-buzzword', family: 'lexical', label: 'Corporate buzzword',
    tier: 'lexical', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
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
    tier: 'strong', points: 3, frequencyLabel: 'HARD', fpRisk: 'low',
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
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
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
    points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Own the claim, or give a precise caveat ("in 7 of 10 cases", not "in many ways").',
    terms: [
      "it's important to note", 'it is important to note', "it's worth mentioning",
      "it's worth noting", 'it is worth noting', 'it should be noted', 'it bears mentioning',
      "it's crucial to understand", 'at its core', 'in many ways', 'arguably',
      'to some extent', 'in essence', 'for the most part', 'by and large', 'in a sense',
      'generally speaking',
    ],
  },
  {
    id: 'meta-commentary', family: 'structural', label: 'Meta commentary',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
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
    points: 1, frequencyLabel: 'STRONG', fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Compress (due to the fact that→because, in order to→to, at this point in time→now).',
    terms: [
      'due to the fact that', 'at this point in time', 'in order to', 'with regard to',
      'conduct an analysis', 'make a determination', 'provide assistance',
      'take into consideration', 'on a daily basis', 'in the event that',
    ],
  },
  {
    id: 'significance-inflation', family: 'rhetorical', label: 'Significance inflation',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'moderate',
    dateCohort: '2023-2025',
    fix: 'Delete the inflation; state the specific, bounded fact and let the reader judge significance.',
    terms: [
      'testament to', 'pivotal moment', 'pivotal role', 'reflects broader',
      'setting the stage for', 'evolving landscape', 'deeply rooted', 'indelible mark',
      'key turning point', 'cannot be overstated', 'in the annals of',
      'marking a significant',
    ],
  },
  {
    id: 'despite-challenges', family: 'rhetorical', label: 'Acknowledge-and-dismiss',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
    dateCohort: '2023-2025',
    fix: 'Engage the challenge seriously or omit it; drop the boilerplate "faces challenges" formula.',
    terms: [
      'despite its challenges', 'despite these challenges', 'despite the challenges',
      'challenges and future prospects', 'faces challenges typical of',
    ],
  },
  {
    id: 'false-suspense', family: 'rhetorical', label: 'False suspense', tier: 'strong',
    points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
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
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Delete — the reader knows where they are. End on the strongest concrete point.',
    terms: ['in conclusion', 'to sum up', 'in summary', 'to wrap up', 'all in all'],
  },
  {
    id: 'closing-tautology', family: 'structural', label: 'Closing tautology',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    dateCohort: 'evergreen',
    fix: 'Delete. If the section made its point, no announcement needed. End on evidence or a next action.',
    terms: [
      'this shows why', 'demonstrates the importance of', 'this proves that',
      'this highlights the value', 'these results demonstrate',
    ],
  },
  {
    id: 'vague-attribution', family: 'rhetorical', label: 'Vague attribution',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
    dateCohort: 'evergreen',
    fix: 'Name the source or delete the claim.',
    terms: [
      'experts argue', 'experts say', 'experts agree', 'industry reports suggest',
      'observers have cited', 'studies have shown', 'research suggests', 'many believe',
    ],
  },
  {
    id: 'patronizing-analogy', family: 'tonal', label: 'Patronizing analogy',
    tier: 'strong', points: 2, frequencyLabel: 'STRONG', fpRisk: 'moderate',
    dateCohort: 'evergreen',
    fix: 'Explain the concept directly instead of reaching for an unrequested metaphor.',
    terms: ['think of it as', "it's like a "],
  },
  {
    id: 'copula-avoidance', family: 'syntactic', label: 'Copula avoidance',
    tier: 'strong', points: 2, freeAllowance: 2, frequencyLabel: 'STRONG',
    fpRisk: 'low-moderate', dateCohort: '2023-2025',
    fix: 'Use the plain copula ("serves as a hub" → "is a hub").',
    terms: ['serves as', 'stands as', 'holds the distinction of being', 'boasts', 'operates as', 'functions as'],
  },
  {
    id: 'adverbial-bloat', family: 'lexical', label: 'Adverbial bloat', tier: 'lexical',
    points: 2, freeAllowance: 1, allowTerms: { fundamentally: 1 },
    frequencyLabel: 'STRONG', fpRisk: 'moderate-high', dateCohort: 'evergreen',
    fix: 'Delete the adverb; if removal weakens the sentence, the claim is weak. Never swap an adverb for a different adverb.',
    terms: [
      'importantly', 'remarkably', 'fundamentally', 'essentially', 'notably',
      'significantly', 'critically', 'clearly', 'particularly', 'relentlessly',
      'tirelessly',
    ],
  },
  {
    id: 'engagement-bait', family: 'tonal', label: 'Engagement bait', tier: 'strong',
    points: 3, frequencyLabel: 'HARD', fpRisk: 'low', dateCohort: 'evergreen',
    fix: 'Delete. Substance earns attention; bait spends credibility.',
    terms: [
      'let that sink in', 'read that again', 'this changes everything',
      "you're not ready for this", 'are you paying attention',
    ],
  },
  {
    id: 'rhetorical-setup', family: 'rhetorical', label: 'Rhetorical setup',
    tier: 'lexical', points: 2, frequencyLabel: 'HARD', fpRisk: 'moderate',
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
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'moderate',
    dateCohort: 'evergreen',
    fix: 'Chat-assistant politeness does not belong in published prose. Delete.',
    terms: [
      "i'd be happy to help", 'happy to help', 'would you like me to',
      "let me know if you'd like me to", 'i hope this helps',
    ],
  },
  {
    // 2026-08-13, ported from a downstream consumer's local catalogue. The tell
    // is a quantity claim that avoids the quantity. Deliberately WEAK with a
    // free allowance: "numerous trials" is ordinary English, and precision on
    // clean human prose is the failure mode that matters most here. A cluster
    // is the signal. `myriad`/`plethora` are NOT here — they sit in
    // `ai-signature`, where their sharper cohort earns the higher tier.
    id: 'vague-quantifier', family: 'lexical', label: 'Vague quantifier (density signal)',
    tier: 'weak', points: 1, freeAllowance: 2, frequencyLabel: 'LIGHT',
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
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
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
    tier: 'weak', points: 1, freeAllowance: 2, frequencyLabel: 'LIGHT',
    fpRisk: 'high', dateCohort: '2024-2026',
    fix: 'Fine in isolation; a cluster reads as generated. Swap for the concrete noun/verb where possible.',
    terms: [
      'dynamic', 'ecosystem', 'landscape', 'empower', 'empowering', 'empowered',
      'elevate', 'elevating', 'accelerate', 'proactive', 'insightful', 'data-driven',
      'disruptive', 'visionary', 'immersive', 'stakeholder', 'deeply', 'quietly',
      'journey', 'scalable', 'actionable', 'optimize', 'optimized', 'optimizing',
    ],
  },
];

// ─── Fatal artifacts (near-zero false positives; any hit fails the piece) ────

export const FATAL_LEXICON = {
  id: 'machine-artifact', family: 'mechanical', label: 'Machine artifact (FATAL)',
  tier: 'fatal', points: 10, frequencyLabel: 'HARD', fpRisk: 'near-zero',
  dateCohort: 'evergreen',
  fix: 'Proof of unedited machine output. Remove the artifact and re-review the whole piece.',
  terms: [
    'as an ai language model', 'as a language model', 'as an ai assistant',
    'my knowledge cutoff', 'my training data', 'i cannot browse the internet',
    'as of my last update', 'while specific details are limited',
    'oaicite', 'oai_citation', 'contentreference', 'turn0search', ':::writing',
    'attached_file',
    // 2026-07-15 review (Q1a): "i hope this helps" demoted to chat-leakage —
    // it is a normal human email closer, violating the fatal near-zero-FP contract.
  ],
};

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
    patterns: [
      /^\s*great question[!.]/im,
      /^\s*(?:certainly|absolutely|of course)[!,]\s/im,
    ],
  },
];

// ─── Regex rules (structural/syntactic constructions) ────────────────────────

export const REGEX_RULES = [
  {
    id: 'antithesis', family: 'syntactic', label: 'antithesis / negative parallelism ("not X, it\'s Y")',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-at-density',
    fix: 'Coffee test: is the "not X" naming a real misconception? If not, state Y directly. Cap at one per piece.',
    // 2026-08-02: observed-failure additions (Political Landscape Mapping guide,
    // manual anti-slop pass caught ~10 instances the original 4 patterns missed
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
      /\b(it'?s|this is|that'?s|we'?re)\s+not\s+(just\s+)?[\w\s]{2,40}?[—,-]\s*(it'?s|it is|but|they'?re|we'?re|that'?s|this is|you'?re|i'?m)\b/gi,
      /\bwe\s+don'?t\s+[\w\s]{2,30}?,?\s+we\s+\w+/gi,
      /\b(isn'?t|aren'?t)\s+[\w\s]{2,30}?[.,;]\s*(it'?s|they'?re)\b/gi,
      /(?:^|[.!?—]\s+)not\s+(?:just\s+|only\s+|merely\s+)?[\w][\w\s'-]{2,40}?[,—-]\s+(?:but|it'?s|rather)\b/gi,
      // (a) widened subject/connector set (you're/I'm/they're/he's/she's)
      /\b(you'?re|i'?m|they'?re|he'?s|she'?s)\s+not\s+(just\s+)?[\w\s]{2,40}?[—,-]\s*(it'?s|it is|but|they'?re|we'?re|you'?re|i'?m|he'?s|she'?s)\b/gi,
      // (b) two-sentence reveal, uncontracted negation, optional short interstitial clause
      /\b(?:is|are|was|were)\s+not\s+[\w\s'"()-]{2,60}?[.]\s+(?:[A-Z][\w\s]{0,35},\s+)?(it'?s|it is|this is|that'?s|they'?re|we'?re|you'?re)\s+(?:the|a|an)\b/gi,
      // (c) markdown-context sentence-initial "Not X, but Y" (table cells, list items)
      /(?:\|\s+|^[ \t]*(?:[-*+]|\d+[.)])\s+)not\s+(?:just\s+|only\s+|merely\s+)?[\w][\w\s'-]{2,40}?[,—-]\s+(?:but|it'?s|rather)\b/gim,
      // (d) mirrored trailing order: "X, not a/an/the Y."
      // The determiner requirement is load-bearing and must NOT be relaxed:
      // it is what separates the rhetorical reveal ("a hypothesis, not a fact")
      // from the bare contrastive tail real writers use ("grounded in
      // architecture decisions, not slideware"). See the KEEP fixtures.
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
      /\bthe\s+(?:question|issue|problem|point|challenge|risk|danger|fix|answer)\s+(?:is\s+not|isn'?t|was\s+not|wasn'?t)\s+[\w\s'"()-]{2,60}?[.,;]\s*(?:but|it'?s|it is|it was|the\s+\w{2,20}\s+(?:is|was))\b/gi,
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
    ],
  },
  {
    id: 'not-only-but-also', family: 'syntactic', label: '"Not only X but also Y"',
    tier: 'strong', points: 2, frequencyLabel: 'STRONG', fpRisk: 'moderate',
    fix: 'Usually padding: state the stronger half. Keep only when both halves carry distinct weight.',
    patterns: [/\bnot\s+only\s+[^.,;:]{2,50}[,;]?\s+but\s+(?:also\s+)?/gi],
  },
  {
    id: 'concession-pivot', family: 'syntactic', label: 'Concession-pivot (sneaky reframe)',
    tier: 'weak', points: 1, frequencyLabel: 'STRONG', fpRisk: 'high',
    fix: 'Same skeleton as "not X, it\'s Y" in a trench coat. If the concession is empty, cut it and assert directly.',
    patterns: [
      /\b(?:sure|granted|yes),\s+[^.!?]{2,60}[.!?]\s+but\b/gi,
      /\bwhile\s+[^,]{2,50}\s+(?:might|may)\s+(?:seem|sound|appear)\b[^,]{0,30},/gi,
    ],
  },
  {
    id: 'self-posed-qa', family: 'syntactic', label: 'Self-posed Q&A',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
    fix: 'Delete the question nobody asked; keep the answer as a statement.',
    patterns: [/\b(the result|the problem|the worst part|the catch|the kicker|the best part|the twist)\?\s+[A-Z][^.?!]{0,60}[.?!]/gi],
  },
  {
    id: 'colon-reveal', family: 'syntactic', label: 'Colon reveal ("The best part: it learns.")',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low-moderate',
    // 2026-07-23: imported from petergyang/no-ai-slop ("Colon reveals"). Sibling of
    // self-posed-qa — same dramatic-reveal noun phrases, but a colon + lowercase
    // continuation instead of a question mark. Scoped to a curated noun set AND a
    // required lowercase reveal so labels and list intros ("Requirements:", "Total
    // cost:") and Title-Case headings never match.
    fix: 'Rewrite as one plain sentence. Colons are for lists, labels, and quotes — not manufactured drama.',
    patterns: [/\b(?:the\s+(?:best|worst|hardest|weirdest|strangest|surprising|real|key|fun|scariest|craziest)\s+part|the\s+(?:catch|kicker|twist|irony|reality|truth|secret|beauty|magic|upshot|punchline)|the\s+(?:detail|thing|part|reason|trick|feature|insight|move|question)\s+(?:that|is|here)[\w\s'’-]{0,40})\s*:\s+[a-z][^.?!\n]{0,80}[.?!]/gi],
  },
  {
    // 2026-08-13, ported from a downstream consumer's local catalogue.
    // STACKED modals only. A bare "might" / "could" is ordinary English and
    // must never fire — the tell is two hedges doing one hedge's job, which
    // marks a writer buying time instead of committing. `likely` is excluded
    // on purpose: "would likely take a week" is a normal, useful estimate.
    id: 'hedge-stacking', family: 'syntactic', label: 'Stacked modal hedge ("might possibly")',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'Keep one hedge at most, or replace with a precise qualifier ("in 7 of 10 cases", not "might possibly").',
    patterns: [
      /\b(?:might|may|could|can|would)\s+(?:possibly|potentially|perhaps|conceivably|arguably)\b/gi,
      /\b(?:possibly|potentially|perhaps|conceivably)\s+(?:might|may|could|would)\b/gi,
      /\bit(?:'s|\s+is)\s+possible\s+that\b[^.!?]{0,60}?\b(?:might|may|could)\b/gi,
    ],
  },
  {
    // 2026-08-13, ported from a downstream consumer's local catalogue. Headings
    // that label the section's ROLE instead of its content — the blog-template
    // shape. Anchored to markdown heading syntax so body prose ("my final
    // thoughts on this are…") never fires. `TL;DR` is deliberately absent: it
    // is a genuine human convention, not a template tell.
    id: 'template-header', family: 'structural', label: 'Template section header',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'Replace with a header naming the specific content ("Final Thoughts" → "Why we chose Postgres").',
    patterns: [
      /^#{1,6}\s+(?:final thoughts|closing thoughts|parting thoughts|key takeaways?|the takeaway|the bottom line|why this (?:actually )?works|what this means(?: for you)?|wrapping up|in closing)\s*:?\s*$/gim,
    ],
  },
  {
    id: 'countdown', family: 'syntactic', label: 'Countdown ("Not X. Not Y. Just Z.")',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'State the point directly.',
    patterns: [
      // 2026-08-12: noun phrases widened to 3 tokens — "Not a bug. Not a
      // feature. Just a design flaw." missed because each negated item was
      // more than a bare word.
      /\bnot\s+[\w-]+(?:\s+[\w-]+){0,2}\.\s+not\s+[\w-]+(?:\s+[\w-]+){0,2}\.\s+(just|only|simply)\b/gi,
      // 2026-08-12: comma-joined "No A, no B, just C" — the stacked-negation
      // shape the Atlantic flags as endemic in AI-generated fiction ("No bag,
      // no things, no armor, just me"). Only the period-separated form matched.
      /\bno\s+[\w-]+(?:\s+[\w-]+){0,2},\s+no\s+[\w-]+(?:\s+[\w-]+){0,2}(?:,\s+no\s+[\w-]+(?:\s+[\w-]+){0,2})*,\s+(?:just|only|simply)\b/gi,
    ],
  },
  {
    id: 'dramatic-fragment', family: 'syntactic', label: 'Dramatic fragmentation ("That\'s it. That\'s the whole thing.")',
    tier: 'strong', points: 2, frequencyLabel: 'STRONG', fpRisk: 'moderate',
    // 2026-07-23: imported from petergyang/no-ai-slop ("Dramatic fragmentation").
    // countdown covers the NEGATION form ("Not X. Not Y. Just Z."); this covers the
    // affirmative mic-drop. The terminal-punctuation guard on the second pattern
    // keeps "that's the whole point of the exercise" (mid-sentence) clean.
    fix: 'Mic-drop fragments manufacture drama. State the point in one complete sentence.',
    patterns: [
      /\bthat(?:’|'|\s+i)?s\s+it[.!]\s+that(?:’|'|\s+i)?s\s+(?:the\s+)?(?:whole\s+|entire\s+)?\w+/gi,
      /\bthat(?:’|'|\s+i)?s\s+(?:the\s+)?(?:whole\s+|entire\s+)(?:thing|point|story|trick|secret|magic|ballgame|game|deal)\b[.!]/gi,
    ],
  },
  {
    id: 'trailing-participle', family: 'syntactic', label: 'trailing participial commentary',
    tier: 'strong', points: 3, frequencyLabel: 'HARD', fpRisk: 'moderate',
    sentenceFinal: true, // engine applies per-sentence, anchored to sentence end
    fix: 'Delete the trailing "-ing" phrase, or make it its own sentence with a real claim.',
    patterns: [/,\s+(contributing|highlighting|underscoring|fostering|reflecting|showcasing|emphasizing|demonstrating|reinforcing|cementing|solidifying|underlining|signaling|ensuring|cultivating)\b[^.?!]*[.?!]?$/i],
  },
  {
    id: 'overused-transition', family: 'syntactic', label: 'Overused transition',
    tier: 'lexical', points: 2, frequencyLabel: 'STRONG', fpRisk: 'moderate',
    special: 'transitions', // engine: sentence-start However/Moreover/... with "however ≤1 free"
    fix: 'moreover/furthermore/additionally→also; nevertheless→still; however (sentence start)→but.',
    patterns: [/(?:^|[.!?]\s+|\n)\s*(However|Moreover|Furthermore|Additionally|Nevertheless)\b/g],
  },
  {
    id: 'latin-sidebar', family: 'mechanical', label: 'Latin sidebar (e.g.,/i.e.,)',
    tier: 'weak', points: 1, frequencyLabel: 'STRONG', fpRisk: 'moderate',
    fix: 'e.g.,→like/such as/for example; i.e.,→meaning/specifically.',
    patterns: [/\b(e\.g\.,|i\.e\.,)/gi],
  },
  {
    id: 'era-opener', family: 'tonal', label: 'Era/context opener ("In today\'s…")',
    tier: 'strong', points: 3, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'Cut the scene-setting preamble; open on the specific claim or fact.',
    patterns: [/(?:^|[.!?]\s+)in\s+(?:today'?s|the\s+(?:ever-evolving|fast-paced|rapidly\s+evolving|modern|digital))\b/gi],
  },
  {
    id: 'imagine-opener', family: 'rhetorical', label: 'Futurism opener ("Imagine a world…")',
    tier: 'strong', points: 3, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'Open with a concrete fact or claim, not a hypothetical utopia.',
    patterns: [/(?:^|[.!?]\s+)(?:imagine|picture)\s+(?:a\s+world|a\s+company|a\s+future|this)\b/gi],
  },
  {
    id: 'false-range', family: 'rhetorical', label: 'False range ("from X to Y")',
    tier: 'weak', points: 1, frequencyLabel: 'LIGHT', fpRisk: 'high',
    fix: 'If there is no real spectrum between the endpoints, name the actual items without the range frame.',
    patterns: [/\bfrom\s+(?![\d$])[a-z][\w-]{2,20}(?:\s+[\w-]{2,20}){0,2}\s+to\s+(?![\d$])[a-z][\w-]{2,20}(?:\s+[\w-]{2,20}){0,2}\b/gi],
  },
  {
    id: 'invented-label', family: 'rhetorical', label: 'Invented concept label',
    tier: 'weak', points: 1, frequencyLabel: 'LIGHT', fpRisk: 'high',
    fix: 'Only name a concept if you define and earn it; otherwise describe plainly.',
    patterns: [/\bthe\s+\w+\s+(?:paradox|trap|creep|divide|vacuum|inversion)\b/gi],
  },
  {
    id: 'ten-x-hype', family: 'tonal', label: 'Hype multiplier ("10x your…")',
    tier: 'strong', points: 2, frequencyLabel: 'HARD', fpRisk: 'low',
    fix: 'Replace the promise with the specific, bounded result.',
    patterns: [/\b10x\s+(?:your|the)\b/gi],
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
    fix: 'Low burstiness is the most durable statistical tell. Vary drastically: a 5-word sentence next to a 25-word one; use a fragment for punch.',
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
    tier: 'strong', points: 3, run: 3,
    fix: 'Vary the openings; deliberate anaphora is a device, three-in-a-row by default is a tell.',
  },
  boldFirstBullets: {
    tier: 'strong', points: 3, min: 3,
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
];
