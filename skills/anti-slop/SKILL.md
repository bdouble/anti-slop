---
name: anti-slop
description: >-
  Use when writing or editing any prose a human will read — emails, docs, posts,
  essays, cover letters, resumes, summaries, PR descriptions, release notes —
  and it must not read as generic AI writing. Triggers on "write this without
  the AI slop", "make it sound human", "de-slop", "cut the fluff", "tighten
  this", "why does this sound like ChatGPT", "remove the corporate/LLM tone",
  or when reviewing a draft that opens with throat-clearing, stacks hedges and
  empty intensifiers, overuses em-dashes, leans on delve/leverage/robust/seamless,
  or pads with rule-of-three and "it's not just X, it's Y" filler.
---

# Anti-Slop

## Overview

Slop is prose that says nothing with maximal confidence. The fix is never a
banned-word hunt: it is **specificity, subtraction, and varied cadence**.
Detection scores, it never verdicts — single tells (em-dashes, triads, clean
grammar) are false-positive traps; clusters plus emptiness are the signal.
When editing, cut only the slop: an over-correction that sands off a real voice
is its own failure, not a fix.

## When to use

- **Prevention:** before drafting anything a human will read. Write *by the
  recipe below* from the first sentence — do not draft freely and rely on cleanup.
- **Remediation:** when asked to de-slop, tighten, humanize, or review existing
  text, or when a draft you produced fails the linter.

**When NOT to use:** code and code comments; machine-facing output (logs,
schemas). For prose shipping under a specific person's byline, apply their voice
skill (e.g. a `<byline>-voice` skill) *on top of* this one — voice wins any
conflict. For
house-style mechanics (title case, number formatting), defer to the venue's
style guide (e.g. `every-style-editor`, `style-editor`).

## The recipe — what good prose IS

1. **The first sentence carries the most specific claim you have.** No
   scene-setting, no "In today's…", no restating the question.
2. **Every claim resolves to something checkable** — a number, a name, a date,
   a tool, an event. An evaluative label ("significant", "proven") is a slot
   where the evidence should be.
3. **Things ARE what they are.** Plain copulas: "is", "has", "does". A thing
   "serves as" nothing.
4. **One idea per sentence; sentences vary widely in length.** A 5-word
   sentence lands harder next to a 25-word one. Fragments are legal. Read it
   aloud; if the rhythm is a metronome, break it.
5. **Contrast, triads, dashes, and metaphors are spent deliberately — roughly
   once each per piece.** Each device used reflexively becomes a tell.
6. **State the positive.** Name what the thing is. A surviving "not X" has to
   earn its place against the keep-test below.
7. **End on substance** — the strongest fact, the next action, or a thought
   that adds something. Never a summary of what the reader just read.
8. **Write with the confidence of the evidence, no more.** Precise caveats
   ("in 7 of 10 cases") beat hedges ("arguably", "in many ways") and beat
   false certainty.

## Negative parallelism — intercept it before you write it

The most durable AI tell, which is why it gets its own section. Lexical tells
decay once publicized and models train away from them; this construction has
not abated, and every major model reaches for it.

**Why it forms.** Once a sentence commits to characterizing something, saying
what the thing *isn't* is the safer continuation. X is the obvious descriptor
you negate to buy a clause of time; Y is the punchier one you had not found yet.

**The interrupt.** The tic forms at one identifiable instant: you are about to
characterize something and you do not yet have Y. Stop there and find Y. Never
write X to reach it. If Y will not come, the sentence carries no claim — go get
a fact.

**One tic, ten shapes.** Editors catch the first and miss the rest: additive
("not just X — it's Y") · supplanting ("It's not X. It's Y.") · never-form ("was
never X. It was Y.") · stacked negation ("No A, no B, just C") · verb-phrase
("We didn't build a tool. We built a system.") · trailing appositive ("a
hypothesis, not a fact") · question-form ("The question isn't whether, it's
when") · degree-form ("less about X, more about Y") · that-clause ("It's not
that X. It's that Y.") · point-form ("Speed isn't the point. Accuracy is.").

**The keep-test.** All three must hold, or state Y flat:

1. The reader genuinely holds belief X on arriving at this sentence.
2. X is their belief, not a strawman built so Y sounds earned.
3. The correction is the sentence's point — deleting X would break it.

**Budget: one per piece, and one is legal.** Models over-use the device; they
did not invent it. The human baseline is not zero — Shakespeare, Lombardi, and
DiGiorno all pass the keep-test. The linter gives the first contrast device a free pass and scores
every one after. Zeroing the device out is over-correction, its own failure.

**Free from scoring is not free from judgment.** The freed contrast still owes
you a keep-test verdict. The linter says so: it reports the finding under
`KEEP-TEST REQUIRED` with the three questions inline, counts it in
`requiresReview`, and deliberately keeps it out of the "corroborate only"
note. A zero score with an open keep-test is an unfinished document, not a
clean one. Gated renders can block on it with
`--require-review-disposition`.

**Displacement watch.** Cutting it must not relocate it. "Y. Full stop." · "The
real answer: Y." · "The catch? Y." · "Not X. Not Z. Just Y." · "Sure, X. But Y."
are the same impulse in a different costume: stage the claim, withhold the
payoff. A pass that cuts three antitheses and adds two colon reveals did nothing.

Repairs, keep-test procedure, and the legitimate-use gallery:
`references/negative-parallelism.md`.

## Fast catalogue (top offenders — full set in references/pattern-catalogue.md)

| Slop | Rewrite |
|---|---|
| "In today's fast-paced world…" | Open on the specific claim. |
| "It's not just X — it's Y." (and its 9 sibling shapes) | "Y." — keep only by the keep-test above; one contrast device per piece. |
| "It's worth noting that Z." | "Z." |
| "serves as / stands as a testament to" | "is" — then cut the significance claim. |
| "results-driven professional with a proven track record" | The actual result: "cut onboarding time 40%". |
| "leverage / utilize / facilitate" | "use" / "help". |
| "…enhancing scalability and driving efficiency." (trailing -ing) | Own sentence with a real number, or delete. |
| "In conclusion, …" | End on the strongest concrete point. |
| Every bullet "**Keyword**: sentence" | Vary format, or write prose. |
| "Great question!" / "I hope this helps" | Delete — chat register never ships. |
| Three perfectly parallel triads in a row | Vary to 2, 4, or 5 items; keep one deliberate triad. |
| More than one em-dash per document | Perception rule: readers read "—" as AI even when it isn't. Keep at most one; replace by role (aside→commas, definition→colon, interruption→period). |

## Editing restraint — the minimum effective edit

De-slopping earns its keep by subtraction, not by homogenizing. The failure
mode of an aggressive pass is a technically clean draft that no longer sounds
like anyone. Cut in proportion to the actual slop.

- **Name the voice before you touch it.** Note 3–5 traits that are the author's
  own — vocabulary, cadence, bluntness, humor, digressions — and keep them.
- **Leave strong human sentences alone.** Fix the tells; a rough draft with a
  real voice should still sound like the same person afterward.
- **Keep meaningful hedges and asides.** "I think", "maybe", "to be honest" stay
  when they carry genuine uncertainty or the writer's spoken rhythm; only empty
  throat-clearing goes.
- **Don't smooth toward generic polish.** Making every paragraph equally tidy is
  a tell of its own. Vary, don't flatten.

## Remediation workflow

1. Read the whole piece once without editing.
2. Run `scripts/slop-lint.mjs <file>` — fix every FATAL immediately; treat
   strong findings as edits to make, lexical as edits to consider, weak as
   corroboration only.
3. Tag remaining sentences against `references/pattern-catalogue.md`; rewrite
   by the recipe, not by synonym-swapping (thesaurus swaps create their own
   tell).
4. Apply the two judgment tests the linter cannot run: **horoscope test**
   (could anyone have written this, for anyone? → inject what only this
   author/subject could produce) and **genericness** (would it survive
   find-and-replace of the subject's name? → it must not).
5. **Edit-fidelity check** — before shipping, confirm the pass did not
   over-correct: would the author still recognize this as theirs? Did a strong
   human sentence get rewritten only for consistency, or a real hedge or aside
   get cut as if it were filler? Restore what you over-cut. Removing slop must
   not cost voice.
6. Re-run the linter, then read aloud once. Ship at score ≤2 with zero FATALs.

## Red flags — you are about to emit slop

- You are writing the intro before you know the most specific thing you'll say.
- A sentence is about the writing instead of the subject ("In this section…").
- You reach for a contrast to make a plain fact sound profound.
- Every paragraph is coming out the same size.
- You cannot point at the evidence for an adjective you just wrote.

## Genre shapes

Per-genre contracts (cover letter, email, LinkedIn, essay, resume bullets):
`references/genre-recipes.md`. Detection reliability tiers and false-positive
guardrails: `references/detection-guide.md`.

## Gotchas (append-only — grown from observed failures, never rewritten)

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

## Related

- `data/patterns.mjs` — the canonical machine-readable pattern source (linter
  reads it; the prose catalogue derives from it; append-mostly).
- `references/negative-parallelism.md` — the family reference behind the section
  above: ten shapes, five repairs, keep-test gallery, provenance.
- Repo `evals/` (maintainer tooling, not shipped inside the skill) —
  `eval-antithesis.mjs` scores the contrast family against a labeled fixture.
  Run it before and after ANY change to a contrast regex.
  `eval-keep-test.mjs` pins the disposition contract: that a freed contrast
  still reports a keep-test, and that doing so never moves a score.
- Codex / non-Claude runtimes: `references/AGENTS-SNIPPET.md`.
