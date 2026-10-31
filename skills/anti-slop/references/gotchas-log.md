# Gotchas log

Append-only. Each entry is an observed failure and the rule it produced; none
is rewritten. Moved here verbatim from SKILL.md on 2026-10-31 (v2.0.0) so the
skill stays under its word budget; SKILL.md keeps a short digest of the rules
these entries taught. Names of people and employers were redacted on the
move (2026-10-31, "[Company]", "the author"); nothing else changed. Add new entries at the bottom, dated, and add a line to
the digest only when an entry changes what a writer should do.

- 2026-07-15: "Let me know if you have questions" is normal human email
  register — only flag chat-leakage phrasings ("let me know if you'd like me
  to"), never plain closers.
- 2026-07-15: Do not "fix" forced positivity in job applications by inserting
  self-deprecating gap admissions — that is a different failure, not a repair.
- 2026-07-15: Em-dash policy hardened to ≤1 per document (perception rule:
  readers assume "—" means AI even in genuinely human prose). This is a
  SHIPPING policy for text we produce; as a detection signal about someone
  else's text the em-dash remains weak — never accuse on it.
- 2026-08-12: The linter had been enforcing de facto ZERO negative parallelism
  (2 points flat against a ship target of 2) while this file said "cap at one."
  Contrast devices now get one free per document. If a piece reads flattened
  after a de-slop pass, check whether a legitimate contrast was cut to satisfy
  a budget that no longer exists.
- 2026-08-12: `"It's not about speed. It's about accuracy."` — the catalogue's
  own headline example — matched no regex at all until the eval fixture caught
  it. Assume by-eye verification of regex coverage is wrong; run
  `evals/eval-antithesis.mjs` in the repo.
- 2026-08-12: `--html` linted `<title>` text as prose. A resume whose body had
  zero em-dashes still tripped the ≤1 policy and blocked a DOCX render, on the
  templated `<title>Name — CV</title>` alone. `stripHtml` now drops `title` with
  its contents alongside `style`/`script`. When a lint finding cites punctuation
  or a phrase you cannot find in the visible copy, check `<head>` before editing
  the prose — the finding may be about markup no reader sees.
- 2026-08-13: A downstream consumer kept a local de-slop catalogue beside this
  skill, and it drifted into a partial second source of truth — an audit found
  four items it covered that the skill did not (vague quantifiers, stacked modal
  hedges, template section headers, assertion-in-place-of-evidence), ported in
  v1.7.0. Lesson for consumers: a local catalogue kept "for convenience" becomes
  a rival authority, and the drift runs BOTH ways — the copy can fall behind the
  skill, and it can also hold rules the skill never learned. Keep one catalogue.
  Three of the four ports sit close to ordinary English, so they carry explicit
  false-positive guards in `evals/eval-ported-patterns.mjs`: a bare
  "might"/"could" never fires, `likely` is excluded from the hedge stack
  ("would likely take a week" is an estimate, not a hedge), `template-header` is
  anchored to markdown heading syntax, and `vague-quantifier` stays weak-tier
  with two free per document.
- 2026-08-13: The one-free-contrast allowance was zeroing the freed finding to
  `info` — the same tier as the non-actionable texture report, which the report
  footer labels "corroborate only — never act on them alone." So the single
  finding carrying a MANDATORY keep-test was filed under the system's own
  instruction to ignore it, and a consumer shipped a textbook never-form ("The
  hard part was never building. It was …") on a score of 0. Freeing something
  from SCORING is not the same as freeing it from JUDGMENT; the five tiers only
  encode detector reliability, so that state had no representation. Findings now
  carry a `review` disposition, `lintText` returns `requiresReview`, and the
  report prints the three keep-test questions inline — pointing at
  `references/negative-parallelism.md` did not work, because the drafting agent
  only reads the lint output. Pinned by `evals/eval-keep-test.mjs`.
- 2026-08-12: A vendored copy of this skill drifted two minor versions behind
  (v1.3.0 vs v1.5.0) and silently enforced the retired zero-contrast budget, so
  a legitimate contrast got cut from a shipping document to satisfy a rule that
  no longer existed. If a consumer vendors these files, it must verify the hash
  before trusting a score — a stale linter fails closed in the wrong direction,
  flattening prose rather than passing slop.
- 2026-09-30: A cover-letter sentence built as a colon + a three-part list of parallel wh-clauses ("[Company] speeds up the early decisions every project depends on: where it can go, how it connects to the grid, and what it will take to permit.") passed the linter at score 0, the corpus and package overlap checks, and the voice-judge (which counted it as one of two triads, under its three-list threshold and as company-specific), and the author cut it by hand as "the AI slop pattern": three examples plus the common phrasing. It is specific to the company but the SHAPE is the tell: abstract lead ("the early decisions every project depends on") + colon + where/how/what triplet that lists the obvious parts of the domain. Company-specific nouns do not launder a stock structure. When a sentence defines what the employer does, say the one thing that matters to the writer in their own words ("working on electric infrastructure acceleration is incredibly compelling") instead of enumerating three sub-parts. Not yet lintable as a regex (the colon-then-triplet form is common in legitimate prose); treat as a judgment check alongside rule-of-three, and count this shape toward the triad budget even when the triad is inside one sentence.
- 2026-10-14: Outreach formulae scored 0. `application-boilerplate` matched exact
  strings, so "I hope this MESSAGE finds you well" and "I came across Northwind"
  slipped past, and whole stock follow-ups and referral asks linted clean. Cold
  DMs and follow-ups rarely pass a render gate, so the linter is often their only
  mechanical check. Now covered by `outreach-boilerplate`, `permission-hedge`,
  and a one-free `exclamationDensity`. Two things stay legal on purpose: a plain
  one-sentence statement of interest ("I'd love the chance to talk it through"),
  which real hand-edited letters use, and bare "if/but/just/I think", whose
  blanket ban (common in job-search rule lists) flattens connected prose. A
  closer is a tell when it repeats across letters; catch that at the corpus
  level, not per document. Pinned by `evals/eval-outreach-patterns.mjs`.
- 2026-10-31: The contrast family scored 100% recall on its own fixture and
  caught 7 of 33 real contrast sentences from humanizer's examples and
  Wikipedia (21%). A hyphen inside X ("It's not just a weight-loss drug, it's…")
  broke the headline shape, while the unhyphenated sentence fired. Tuning
  against a fixture you wrote stops measuring anything once the regexes fit it,
  so `evals/holdout/` now holds real contrast sentences and real human prose
  that no rule may be tuned against, reported by `evals/eval-holdout.mjs`. The
  same review found FATAL on human prose ("Of course, we shipped it on
  Friday…" matched the chat-opener rule on any line), anaphora on three
  sentences opening with "The", mentions inside `inline code` scored as uses,
  and a `--max` gate that counted weak findings. And the recipe was pushing the
  wrong way: it said "fragments are legal" and demanded "a number, a name, a
  date" with no source clause, while hand edits of agent drafts mostly lengthened
  sentences of 8 words or fewer. The recipe now says to join clauses as often
  as you cut, and never to invent a fact to satisfy the specificity rule.
- 2026-10-31 (independent review, before release): two "fixes" made the linter
  worse at its own job. Skipping code to stop mentions scoring as uses also hid
  whole drafts: an LLM that wraps its answer in a code fence passed with FATAL
  artifacts inside ("As an AI language model", "[Hiring Manager]"). And
  widening "chat-opener" continuations to "I'll", "I can" and "let me" made
  "Sure, I'll be there at 3" FATAL. Rules: FATAL checks read every byte,
  including code; a fence with no language tag is prose; a FATAL pattern must
  match something only a chatbot writes, never a reply a person would send.
  Every new rule ships with false-positive guards of real, literal English
  ("The yen is the currency of Japan"), not just the examples it was built from.
