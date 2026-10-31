# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Until 2.0.0 the plugin release (`.claude-plugin/plugin.json`) and the pattern
data (`META.version` in `skills/anti-slop/data/patterns.mjs`) carried separate
version numbers. From 2.0.0 they are one number, and `evals/check-release.mjs`
fails CI when they disagree.

## [Unreleased]

## [2.0.0] - 2026-10-31

Major release, for three incompatible changes:

- `--max` now exits on `gateScore`, so weak findings never fail a document.
- The pattern data adds a `genres` field that an older engine would ignore,
  running the LinkedIn/X rules on every document.
- The CLI text report changed (listed below).

A consumer that vendors `patterns.mjs` must take `slop-lint.mjs` with it. The
2.0.0 engine refuses an older `patterns.mjs` with a clear message and exit code 2.

Prompted by an internal comparison (2026-10-31) against blader/humanizer
v3.1.0, Wikipedia's "Signs of AI writing" and a practitioner's published Grok
Bot prompt set. An independent review of the release candidate then found two
blockers and six majors, all fixed before release (see "Fixed in review").

### Changed

- **Ship gate is `gateScore`.** The CLI `--max <n>` exits 1 when `gateScore`
  (fatal + strong + lexical points) exceeds `n`, not `score`. SKILL.md,
  AGENTS-SNIPPET, the detection guide and the README now say "ship at gateScore
  ≤2". Bands still use `score`.
- **CLI text output.**
  - The report adds a `Gate score:` line under `Score:`.
  - It also adds a `Not linted as prose: …` line when code was skipped.
  - `formatSummary` reads "slop score N, gate M (BAND; ship at gate ≤2)".
  - The LOW band note no longer says "ship target ≤2".
  - The em-dash finding reads "N dashes, em or spaced en".
  - `--help` documents `--genre` and `--baseline`.
- **Exit code 2** for an unknown or missing `--genre` value, an unreadable
  `--baseline` path, and a `patterns.mjs` from another major version.
- **Recipe: specific means sourced.**
  - SKILL.md recipe item 2 now forbids inventing a number, quote, source,
    ranking or personal experience.
  - The remediation workflow adds a two-way fact diff.
  - "Fragments are legal" is replaced by "vary length by joining related
    clauses as often as by cutting", since hand edits of agent drafts mostly
    lengthened their short sentences. The `sentenceUniformity` fix text changed
    to match.
- **SKILL.md slimmed** from 2,672 to 2,192 words.
  - The Gotchas log moved verbatim to `references/gotchas-log.md`.
  - SKILL.md keeps a digest, including the colon-plus-three-wh-clauses triad
    rule.
  - Step 8 (keep the draft for acceptance tracking) is scoped to hand-edited
    sends with private edit records; it says never to create draft files in a
    code or public repo.
  - CI caps SKILL.md at 2,500 words.
- **Contrast family recall.**
  - Patterns 1, 3, 4, 5 and 7 of `antithesis` accept a hyphen inside X ("a
    weight-loss drug" scored clean while "a weight loss drug" fired), `;` and
    `–` as separators, and a colon before "not X, but Y". "Not just yet, but…"
    is excluded.
  - Eight new shapes:
    - "are not just X—they're Y"
    - "doesn't just X; it Y"
    - "doesn't grow… — it grows"
    - "not a mirror but a portal"
    - "not just X, but Y"
    - "not grounded in X, but in Y"
    - "does not mean X. It means Y."
    - "is not X. Rather, …"
  - `countdown` accepts "not A, not B — just C", with the repeated group
    capped at six items so long lists stay linear.
- **`chat-opener` (FATAL)** matches "Great question!", "Certainly!", or an
  acknowledgement followed by an offer of content for the reader: "Absolutely!
  Here's an email you can send…", "Of course! Here are three options…", "Sure!
  Below is…", "Certainly. I've rewritten…".
  - It fires at the start of the document, of a paragraph, or of the line under
    a heading or "Subject:" line, so a pasted chat answer still fails there.
  - Forwarding an artifact that already exists never fails: "Sure, here's the
    updated budget", "Of course. Here's the email Dana sent", "Sure. Below is
    the schedule", "Sure, I've updated the doc". An offer needs an indefinite
    determiner (a/an/some/a number), "version of your" or "I've rewritten
    your"; after a comma or period, "Sure"/"Of course"/"Absolutely" also need
    "version of your" or a "you can send/post/copy/paste" tail.
  - Courtesy words alone never fail: "Of course, we shipped it on Friday…",
    "Sure, I'll be there at 3", "Sure, I'd be happy to review the deck", "Of
    course, I'd be happy to introduce you", "Great question. We priced it per
    seat…". (The last was FATAL in 1.2.0 too.)
- **`anaphora`**: after "The" or "This", the first two words must match, so
  "The board… The vote… The second vote…" stays clean. One- and two-letter
  starters ("It", "In", "A", "We") stay excluded as in 1.2.0, so this is a
  strict narrowing. The run is not reset at blank lines, so identical slide
  or paragraph openings still count.
- **Code is a mention, not a use**, for prose-style rules only.
  - Inline code spans and fences with a language tag are blanked before the
    lexical, strong and weak rules run.
  - Only a fence tagged with a programming language (js, python, sh, json…)
    is code. An untagged fence, or any other tag (`plaintext`, `text`,
    `txt`, `markdown`, `md`, `email`…), is prose and is linted.
  - FATAL rules and chat leakage still read code.
  - The report no longer prints "✅" when code was skipped.
  - Results report `codeSkipped: { fencedLines, inlineSpans }`.
- **`emDashDensity`** counts a spaced en dash (" – ") as a dash. Ranges do
  not count, unspaced ("2019–2021") or spaced between numbers, weekdays or
  months ("Monday – Friday", "9 – 5").
- **`boldFirstBullets`** also matches the colon-inside form (`- **Speed:** …`),
  numbered lists, and HTML `<li><strong>Speed:</strong>`.
- **Emoji counting**: a ZWJ sequence (👩‍💻) is one emoji, and a ZWJ inside an
  emoji is no longer counted by `bypassNormalization` as a zero-width trick.
- **Re-tiered by evaluation.** These are small local frequency counts over
  ~94k words of human BSD/git man pages vs ~19k words of AI fixtures. They
  are directional only: at these sizes a zero is weak evidence.
  - Single qualifiers ("arguably", "in many ways", "to some extent", …) moved
    from strong `hedge` to weak `single-qualifier`, because they showed no
    signal.
  - "in order to" left `wordy`: Wikipedia lists it as a sign of human writing.
  - `copula-avoidance` allows one per 250 words instead of two per document.
- **Density-based free allowances.** Lexicons can set `freePerWords`;
  `watchlist`, `vague-quantifier` and `watchlist-2026` get one extra free hit
  per 300 words.
- **Lexicon merge pass.** Six terms that span-dedup could never keep were
  removed:
  - `hedge`: "it's crucial to understand";
  - `significance-inflation`: "testament to", "pivotal moment", "pivotal role";
  - `ai-cliche`: "transformative potential", "unprecedented opportunities".

  Scores on every corpus and fixture file are identical before and after.
- `self-posed-qa` adds "The lesson?" and "The takeaway?"; `dramatic-fragment`
  adds the "That is the real win." and "That distinction matters." closers;
  `vague-attribution` adds "experts believe".
- AGENTS-SNIPPET no longer tells agents to "remove every pattern" the catalogue
  names; it says to fix what the findings and the recipe call for.
- An unknown `genre` passed to `lintText` throws instead of silently
  disabling the genre rules.

### Added

- **`--genre linkedin|x`** (library: `lintText(text, { genre })`; export
  `GENRES`) and a `genres` field on rules. Genre-gated rules:
  - `social-closer`: "Agree?", "Thoughts?", "drop it in the comments",
    "follow for more";
  - `hook-formula`, first line only: "I'm thrilled to announce", "Unpopular
    opinion", "Here's what I learned", an opening question;
  - `broetry` (weak): three or more sentences in a row of five words or fewer;
  - `rhetoricalRun`: three questions in a row;
  - `hashtagDensity` (more than five) and `emojiDensity` (more than three),
    house defaults from one posting guide, set in `patterns.mjs`;
  - `social-heading`: a markdown heading under `--genre x`.
- All-genre rules:
  - `stock-proclamation` ("The future is here");
  - `emojiBullets` (weak): emoji opening two or more list lines;
  - `source-disclaimer`: "not extensively documented in readily available
    sources", "in the provided sources", or "maintains a low profile" after a
    speculation verb;
  - humanizer staging rules: `staged-runup` (lexical, standalone run-ups
    only), `phantom-objection` (lexical), and weak `deep-saying`,
    `self-narration` and `corrective-framing`.
- `watchlist-2026`: Wikipedia's mid-2026 vocabulary cohort. Weak and
  single-sourced; "matters" and "challenge" are left out as too common.
- `clippedCadence` (weak, feeds `stylometricCluster`): 40% or more of 10+
  sentences at eight words or fewer. Calibrated locally on a private set of
  hand-edited human letters, none of which reached 40%.
- FATAL machine artifacts `utm_source=chatgpt.com` and `utm_source=openai`.
- Judgment entries, printed under NOT LINTED: `invented-detail`,
  `unprompted-defense`, `heading-restated`, `process-narration`,
  `re-explaining`.
- `--baseline <file|dir>` compares a draft's cadence with reference samples
  and warns when a sample carries a tell. Samples never license a pattern.
- `scripts/acceptance.mjs <draft> <final> [--drafted-with <v>]` reports the
  share of drafted sentences that shipped unchanged.
  - Sentences match as a multiset; only whitespace and quote style are
    ignored.
  - HTML files are reduced to visible text.
  - An empty draft reports null.
- New library exports: `sentencesOf`, `textureProfile`, `formatBaseline`,
  `htmlToText`.
- New references and docs:
  - `references/gotchas-log.md`;
  - the LinkedIn hook procedure ("write five hooks, keep one"), fact rule and
    lint line in `references/genre-recipes.md`;
  - `THIRD_PARTY_NOTICES.md` and a LICENSE statement that quoted evaluation
    text is excluded from the MIT grant.
- Evals:
  - `eval-holdout.mjs` with `evals/holdout/`: real contrast sentences and real
    human passages that no rule is tuned against. It fails only on a FATAL in
    human prose.
  - `eval-false-positives.mjs`, `eval-social-genre.mjs`,
    `eval-staging-ports.mjs`, `eval-tools.mjs`.
  - `check-release.mjs`: SKILL.md word cap, frontmatter, and one version
    everywhere.

### Measured

- **Held-out set** (36 KILL, 23 LEGIT and 38 CLEAN real contrast sentences;
  208 real human passages). Never tuned against; 1.2.0 vs 2.0.0 on the same set:

  | Metric | 1.2.0 | 2.0.0 |
  |---|---|---|
  | Contrast recall | 47.2% | 63.9% |
  | Recall, excluding bare "rather than" | 48.6% | 65.7% |
  | CLEAN false positives | 0% | 0% |
  | LEGIT contrasts flagged (each one needs a keep-test) | 26.1% | 30.4% |
  | Human prose: FATAL | 0 | 0 |
  | Human prose: gate-blocked | 3 (1.4%) | 3 (1.4%) |
  | Human prose: any actionable flag | 9 (4.3%) | 9 (4.3%) |

  The tuning fixture scores 100%; the gap to the held-out 64% is the overfit
  that remains.
- **Fit on fixtures written or chosen alongside the rules.** These measure fit,
  not generalization:
  - the 33 contrast sentences behind the recall work: 7 caught before, 26
    after;
  - the synthetic Grok Bot items: 8 of 24 before, 20 of 24 with `--genre`;
  - the humanizer "before" passages with any finding: 16 of 42 before, 30 of 42
    after.
- **Humanizer "after" rewrites passing the gate**: 40 of 41 before, 41 of 41
  after. Two of them score 2 (still passing) on `source-disclaimer` for "not
  documented in the available sources".

### Fixed in review (release candidate → 2.0.0)

- B1: `chat-opener` had become FATAL on "Sure, I'll…"/"Sure, I can…" replies,
  then (second pass) on "…, I'd be happy to…", then (third pass) on replies
  that forward an existing artifact ("Sure, here's the updated budget"), and
  it missed chat answers
  pasted under a heading and "Absolutely! Here's an email you can send…".
  Fixed as described above.
- B2: code blanking had hidden whole fenced drafts, FATAL artifacts included,
  and (second pass) any `plaintext`-tagged draft. Fixed as described above.
- M1: the staging and Wikipedia rules fired on literal English ("The yen is the
  currency of Japan"). Those phrasings were narrowed or re-tiered as described
  above, and 15 such sentences are pinned as no-gate guards.
- M2: the release candidate's anaphora change had widened two-letter starters.
  It is now a strict narrowing.
- M3, M4: SKILL.md step 8 was unscoped, and the digest had dropped three
  drafting lessons. Both fixed.
- M5: added license notices, with full MIT, ISC and Apache-2.0 texts, and the
  carve-out from the MIT grant. The unused Wikipedia passages file was removed,
  and `humanizer-passages.md` went from 83 to 55 passages (only what the
  evals read). Two sources whose copyright line could not be confirmed were
  dropped: the hexgrad/kokoro rows of the contrast holdout, and the quoted
  yashasvishailly messages in `eval-outreach-patterns.mjs` and three
  Before → After examples in `references/genre-recipes.md`, all now written
  for this repo.
- **The human-prose holdout was rebuilt.** A first trim cut it from 147 to 35
  passages after lint results were known, which left too little to measure
  and raised a selection-bias question. It now holds 208 passages chosen by a
  mechanical rule written into its header before the linter ran on it: one
  README paragraph from every locally installed MIT or ISC npm package whose
  copyright years are all 2022 or earlier. It holds no Wikipedia text.
- M6: removed private provenance from committed files.
- Held-out set: dropped three rows that also appeared in a tuning passage. Added
  ten real technical sentences (5 LEGIT, 5 CLEAN) from local-deep-research
  docs, labelled before measurement.

### Rejected after evaluation

- `punctVariety`, a flag for a low share of `; : ( )`: hand-edited human
  letters used those marks no more often than agent drafts, so it would flag
  human style.
- Resetting `anaphora` at blank lines: it would miss identical slide or
  paragraph openings.
- Matching bare "Y rather than X": it is ordinary technical English.

### Known limitations

- Mentions in double quotes still score as uses.
- On the 208 held-out human passages, 9 carry an actionable flag and 3 exceed the
  gate (the same counts as 1.2.0). They are "leverage", "seamlessly", "could
  possibly", two "Additionally", one anaphora run in an option list, and a
  technical "realm" (a JavaScript realm) that `ai-signature` scores 3.
- Held-out contrast misses cluster in shapes the tuning fixture lacks:
  - a question mark or vocative between the halves ("…, right? It's about…");
  - "X, not Y" with no determiner;
  - "is not just X. The goal is…".
- The genre rules have no held-out set of real human posts.
- The new factual-correction false positives (for example "The test wasn't
  flaky; it was the network.") cost 2 points from the second one onward.
- HTML `<code>` content is still linted as prose.

### Not changed (needs human raters)

- Four of the comparison's toss-ups each need blind ratings or acceptance data
  that do not exist yet:
  - one free contrast vs acting on sight;
  - zero vs one dash;
  - gate vs critique;
  - examples-first vs rules-first voice.
- `acceptance.mjs` and `--baseline` are the instruments for the last two.

## [1.2.0] - 2026-10-14

Patterns 1.8.0.

### Added

- `outreach-boilerplate` and `permission-hedge` (strong regex rules) and a
  one-free `exclamationDensity`, after stock outreach openers and closers
  scored 0. `evals/eval-outreach-patterns.mjs` (54 checks) wired into CI.
- Genre recipes for the follow-up, referral ask and form answer.

## [1.1.0] - 2026-08-13

Patterns 1.6.0 and 1.7.0.

### Added

- Keep-test disposition axis: the freed first contrast carries
  `review: 'keep-test'`, `lintText` returns `requiresReview`, the report prints
  the keep-test questions inline, and `--require-review-disposition` is an
  opt-in gate. Pinned by `evals/eval-keep-test.mjs`.
- Four patterns ported from a consumer's local catalogue: `vague-quantifier`,
  `hedge-stacking`, `template-header`, `assert-dont-prove`
  (`evals/eval-ported-patterns.mjs`).

## [1.0.1] - 2026-08-12

Patterns 1.5.0 (unchanged).

### Fixed

- `--html` drops `<title>` with its contents, so templated head markup no
  longer counts toward the dash policy.

## [1.0.0] - 2026-08-12

Patterns 1.5.0. First release:

- a recipe-first SKILL.md with the negative-parallelism section;
- `data/patterns.mjs` (70 patterns);
- `scripts/slop-lint.mjs`;
- the reference set;
- the evals, with CI.

Only `v1.1.0` is tagged; the other releases link to their commits.

[Unreleased]: https://github.com/bdouble/anti-slop/compare/f1ea509...HEAD
[2.0.0]: https://github.com/bdouble/anti-slop/compare/f1ea509...HEAD
[1.2.0]: https://github.com/bdouble/anti-slop/commit/f1ea509
[1.1.0]: https://github.com/bdouble/anti-slop/releases/tag/v1.1.0
[1.0.1]: https://github.com/bdouble/anti-slop/commit/8ab6e64
[1.0.0]: https://github.com/bdouble/anti-slop/commit/5535790
