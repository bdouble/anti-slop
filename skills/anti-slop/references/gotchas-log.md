# Gotchas

Lessons from observed failures, each stated as a rule with the reason behind
it. SKILL.md keeps a one-line digest of each. When a new failure changes what a
writer or a rule should do, add an entry here with its reason, keep any example
synthetic, and add a digest line to SKILL.md only if it changes what a writer
should do.

## Writing and editing

- **Plain human closers stay legal.** "Let me know if you have questions" is
  normal email register. Flag only chat-leakage phrasings ("let me know if
  you'd like me to"), never plain closers.
- **Never "fix" forced positivity with self-deprecating admissions.** In an
  application or a self-assessment, inserting gap admissions to sound less
  polished is a different failure, not a repair. Name a real tension instead.
- **≤1 em-dash is a shipping policy, not evidence.** Readers assume "—" means
  AI even in human prose, so text you produce keeps at most one. As a signal
  about someone else's text the em-dash stays weak: never accuse on it.
- **One contrast per piece is legal.** A linter that charged the first
  contrast in full enforced zero tolerance in practice, and zero tolerance
  produces flattened, voiceless prose. If a piece reads flat after a de-slop
  pass, check whether a legitimate contrast was cut.
- **A colon plus three parallel wh-clauses counts toward the triad budget**,
  even inside one sentence. "Fernway shortens the steps every shipment
  depends on: where it sits, how it moves, and what it costs to clear." lints
  clean and still reads as generated: an abstract lead, a colon, then the
  obvious parts of the domain. Company-specific nouns do not launder a stock
  structure. Say the one thing that matters to the writer, in their own
  words. Not lintable as a regex (the form is common in legitimate prose), so
  it is a judgment check alongside rule-of-three.
- **A plain one-sentence statement of interest is a human close.** "I'd love
  the chance to talk it through" stays legal. The tell is the same closer
  reused across many letters, which only a check across a writer's whole set
  of letters can see.
- **Bare "if", "but", "just" and "I think" stay legal.** Blanket bans on them,
  common in job-search rule lists, flatten connected prose. Match only phrases
  that ask permission to have written ("I was wondering if", "no pressure at
  all").
- **Specific means sourced.** The specificity rule invites invented numbers,
  names and anecdotes unless every fact has to come from the source or the
  author. Diff facts both ways; if a fact is missing, write the plainer
  sentence or ask.
- **Join clauses as often as you cut.** Telling a drafter to "vary length"
  produces rows of clipped fragments; human edits of agent drafts mostly
  lengthen sentences of eight words or fewer.

## Rules and the linter

- **Verify regex coverage with the evals, never by eye.** The catalogue's own
  headline example, "It's not about speed. It's about accuracy.", matched no
  regex until a labeled fixture caught it. Run `evals/eval-antithesis.mjs`
  before and after any contrast-rule change.
- **A fixture you tune against stops measuring.** The contrast family scored
  100% on its own fixture and 21% on outside sentences; a hyphen inside X
  ("a weight-loss drug") broke the headline shape. `evals/holdout/` holds real
  text no rule may be tuned against. Report `evals/eval-holdout.mjs` before and
  after every change.
- **A finding you cannot see in the copy may sit in markup.** An HTML
  document's `<title>` ("Name — CV"), a comment, or a code span can carry the
  punctuation or phrase a finding cites. Check `<head>`, comments and code
  before editing the prose. `--html` now drops `<title>`.
- **Freeing a finding from scoring never frees it from judgment.** The free
  first contrast used to land at `info` tier, under a footer that said "never
  act on them alone", and a textbook never-form ("The hard part was never
  the migration. It was …") shipped on a score of 0. Findings now carry a `review`
  disposition, `lintText` returns `requiresReview`, and the report prints the
  keep-test questions inline, because the drafting agent reads only the lint
  output. Pinned by `evals/eval-keep-test.mjs`.
- **Keep one catalogue.** A local de-slop catalogue kept beside the skill "for
  convenience" becomes a rival authority, and the drift runs both ways: the
  copy falls behind the skill, and it also holds rules the skill never
  learned. Port what it has, then delete it.
- **A vendored copy must match the source.** A copy two minor versions behind
  silently enforced a retired zero-contrast budget, so a legitimate contrast
  was cut to satisfy a rule that no longer existed. A stale linter fails closed
  in the wrong direction: it flattens prose rather than passing slop. Vendor
  `slop-lint.mjs` and `patterns.mjs` together and check the version.
- **Exact-string lexicons miss variants.** "I hope this finds you well" fired
  while "I hope this message finds you well" did not, and whole stock
  follow-ups scored 0. Outreach rarely passes any other mechanical check, so
  its rules are regexes (`outreach-boilerplate`, `permission-hedge`).
- **FATAL checks read every byte, including code.** Skipping code to stop
  mentions scoring as uses also hid whole drafts: an answer wrapped in a code
  fence passed with "As an AI language model" inside. A fence with no
  language tag is prose.
- **A FATAL pattern must match only what a chatbot writes.** Widening
  `chat-opener` to "Sure, I'll…" made "Sure, I'll be there at 3" FATAL. Every
  new rule ships with false-positive guards of real, literal English ("The yen
  is the currency of Japan"), not just the examples it was built from.
- **Weak findings never block.** Gate on `gateScore`; the total score, which
  includes weak findings, only sets the descriptive band.
