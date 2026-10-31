# anti-slop

A portable writing-quality skill for coding agents: prevent AI-slop patterns at
generation time, and detect + remediate them in existing text.

Built recipe-first — the skill teaches what good prose *is*, because
prohibition lists ("don't write slop") measurably backfire on shaping tasks.
The mechanical banned-lexicon lives where it belongs: in a deterministic,
zero-dependency linter.

## Install

### As a Claude Code plugin (recommended)

This repo is its own marketplace, so one add plus one install:

```bash
claude plugin marketplace add bdouble/anti-slop
claude plugin install anti-slop@anti-slop
```

Or from inside Claude Code, run `/plugin` and pick it from the marketplace.

### As a bare skill (symlink)

```bash
git clone https://github.com/bdouble/anti-slop
ln -s "$PWD/anti-slop/skills/anti-slop" ~/.claude/skills/anti-slop
```

### Codex / other runtimes

Paste the block from `skills/anti-slop/references/AGENTS-SNIPPET.md` into your
`AGENTS.md`.

## Layout

```
.claude-plugin/         plugin + marketplace manifests
skills/anti-slop/       the Agent Skill
├── SKILL.md            recipe · negative parallelism · fast catalogue · workflow
├── data/patterns.mjs   THE canonical pattern source (machine-readable, 100 patterns)
├── references/         pattern catalogue · negative parallelism · genre recipes ·
│                       detection guide · gotchas log · Codex shim
└── scripts/
    ├── slop-lint.mjs   zero-dep Node CLI linter (reads patterns.mjs)
    └── acceptance.mjs  share of a draft the author shipped unchanged
evals/                  maintainer tooling — not shipped inside the skill
├── triggers.md         skill-routing evals (should / should-not trigger)
├── check-catalogue.mjs catalogue ↔ pattern-source drift check
├── eval-antithesis.mjs contrast-family recall/precision harness
├── eval-keep-test.mjs  keep-test disposition contract (+ scoring invariance)
├── eval-ported-patterns.mjs  patterns-v1.7.0 ports: hit/miss + false-positive guards
├── eval-outreach-patterns.mjs  patterns-v1.8.0 outreach rules: hit/miss + false-positive guards
├── eval-false-positives.mjs    human-prose guards + the gateScore ship gate
├── eval-social-genre.mjs       --genre linkedin|x rules vs the Grok Bot items
├── eval-staging-ports.mjs      humanizer/Wikipedia ports + evaluated re-tiering
├── eval-tools.mjs              acceptance.mjs and --baseline
├── eval-holdout.mjs            recall + false positives on text never tuned against
├── check-release.mjs           SKILL.md word cap, frontmatter, one version everywhere
├── fixtures/           labeled tuning corpus (contrast family, humanizer, Grok)
├── holdout/            held-out contrast sentences + real human prose (never tune here)
└── corpus/             whole-document lint fixtures (slop · clean · fatal · laundered)
```

## Linter

```bash
node skills/anti-slop/scripts/slop-lint.mjs draft.md            # human report
node skills/anti-slop/scripts/slop-lint.mjs draft.md --json     # machine-readable
node skills/anti-slop/scripts/slop-lint.mjs draft.md --max 2    # exit 1 if gateScore > 2
node skills/anti-slop/scripts/slop-lint.mjs post.md --genre linkedin   # + LinkedIn/X post rules
node skills/anti-slop/scripts/slop-lint.mjs post.md --baseline samples/ # cadence vs reference posts
node skills/anti-slop/scripts/acceptance.mjs draft.md sent.md   # how much shipped unchanged
```

Findings carry reliability tiers — `fatal` (machine artifacts: placeholders,
chat leakage — any hit fails), `strong` (structural constructions), `lexical`
(date-versioned word lists; these decay), `weak` (corroborating only, never
actionable alone). Score bands: 0–5 low · 6–12 medium · 13+ high. The ship gate
is `gateScore` ≤2 with zero FATAL: `gateScore` counts fatal, strong and lexical
points only, so weak findings never block, and `--max` gates on it (since
2.0.0; before that it gated on the total score).

`--genre linkedin|x` adds rules that are tells only in a post: formula hooks on
line one, generic closers ("Agree?", "Thoughts?"), fragment runs, three-question
runs, and more than five hashtags or three emojis. Without the flag they never
run, because a one-line paragraph or "Thoughts?" is normal elsewhere. The
hashtag (5) and emoji (3) caps and the no-opening-question hook rule are house
defaults from one posting guide; change them in `data/patterns.mjs` if your
venue differs.

The linter is a floor, not the whole pass. Judgment patterns it cannot see (the
horoscope test, genericness, dead metaphor, voice authenticity) print in a NOT
LINTED block and belong to the skill's recipe pass and a human read.

## Negative parallelism

*It's not X, it's Y* — and its nine sibling shapes — gets its own section in
`SKILL.md` and a dedicated reference, because it is the one tell that has not
decayed. Lexical tells fade once publicized and models train away from them;
this construction is measured at roughly 3× human frequency across every major
model and has held steady.

The skill treats it as ten shapes of one tic (additive, supplanting, never-form,
stacked negation, verb-phrase, trailing appositive, question-form, degree-form,
that-clause, point-form), gives a generation-time interrupt rather than only a
cleanup rule, and applies a three-question keep-test — because the human
baseline is not zero. Shakespeare, Lombardi, and DiGiorno all pass it. The
linter grants the first contrast device in a document a free pass and scores
every one after, so a deliberate use survives while a habit does not.

See `skills/anti-slop/references/negative-parallelism.md`.

## Maintenance contract

- `data/patterns.mjs` is the single source of truth; the prose catalogue
  derives from it.
- Append-mostly: new patterns come from observed failures; existing entries
  and the SKILL.md description are never rewritten casually (routing drift).
- Lexicons decay: each carries a date cohort; review quarterly
  (`META.lastReviewed` — the linter warns when stale).
- Any change must keep `evals/corpus/` green: clean fixtures stay LOW,
  slop fixtures stay HIGH, fatal fixtures stay FATAL.
- Any change to a contrast regex must run `evals/eval-antithesis.mjs` before
  and after. A by-eye coverage check has already missed the family's most
  common shape once.
- Report `evals/eval-holdout.mjs` before and after every rule change, and never
  tune against `evals/holdout/`. The contrast family once scored 100% on its own
  fixture and 21% on outside sentences. To fix a held-out miss, copy it into a
  tuning fixture and replace it in the holdout with a fresh real sentence.
- SKILL.md stays under 2,500 words (`evals/check-release.mjs`). Rules in
  `patterns.mjs` cost no prompt tokens; prose in SKILL.md is read on every use.
- One version: `META.version`, both manifests and the newest CHANGELOG release
  must match.
- Freeing a finding from SCORING never frees it from JUDGMENT. The contrast
  allowance zeroes points but sets `review: 'keep-test'`, counted in
  `result.requiresReview` and printed with its questions inline. Keep the two
  axes separate — filing a mandatory judgment call under a tier the report
  labels "corroborate only" is how a never-form shipped on a score of 0
  (2026-08-13). `evals/eval-keep-test.mjs` pins it, including the invariant
  that the disposition axis never moves a score.

## Verify

```bash
node evals/check-catalogue.mjs      # catalogue ↔ pattern source
node evals/eval-antithesis.mjs      # contrast family: recall + precision
node evals/eval-keep-test.mjs       # keep-test disposition + scoring invariance
node evals/eval-ported-patterns.mjs # patterns-v1.7.0 ports + their FP guards
node evals/eval-outreach-patterns.mjs # patterns-v1.8.0 outreach rules + their FP guards
node evals/eval-false-positives.mjs  # human-prose guards + the gateScore gate
node evals/eval-social-genre.mjs     # --genre linkedin|x rules
node evals/eval-staging-ports.mjs    # humanizer/Wikipedia ports + re-tiering
node evals/eval-tools.mjs            # acceptance.mjs + --baseline
node evals/eval-holdout.mjs          # held-out recall + human-prose false positives
node evals/check-release.mjs         # word cap, frontmatter, versions
```

`eval-holdout.mjs --human-dir <dir>` also lints a private folder of your own
writing, reported separately; keep that folder out of this public repo.

Whole-document bands:

```bash
for f in evals/corpus/*.md; do node skills/anti-slop/scripts/slop-lint.mjs "$f" --json \
  | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const r=JSON.parse(d);console.log(process.argv[1]+': '+r.score+' '+r.band)})" "$f"; done
```

Expected: `clean-*` → LOW (≤5, letters 0) · `slop-*` → HIGH · `fatal-*` → FATAL ·
`laundered-*` → MEDIUM+ with a `stylometric-cluster` finding (texture tier catches
what word lists cannot). CI runs all three on every push and pull request.

## Contributing

Fixture first. The most useful contribution is a sentence the skill gets wrong,
added as a labeled case — that is how the pattern set has actually improved.

- **Slop we miss** → add a `KILL` line to `evals/fixtures/negative-parallelism.md`
  (contrast family) or a passage to `evals/corpus/` (anything else).
- **Good writing we flag** → add a `CLEAN` line (to the tuning fixture or an
  eval's MISS cases, never to `evals/holdout/`). These matter most: a false
  positive on real human prose is what drives the over-correction that leaves a
  draft technically clean and voiceless.
- **A construction that is real but earns its keep** → add a `LEGIT` line.

Then make the pattern change and show the harness output before and after.
Never delete a fixture case to make a change pass.

## Prior art & credits

- **conorbronsdon/avoid-ai-writing** (MIT, © 2026 Conor Bronsdon) — the closest
  prior implementation; we adopted its catalogue↔engine anti-drift contract
  (`evals/check-catalogue.mjs`), its FP-suppression posture, and its stylometric
  detectors (trigram entropy, cross-paragraph burstiness, punctuation CV,
  smart-punct signature, bypass normalization — adapted in `slop-lint.mjs` with
  MATTR replacing raw TTR, two-stage normalization preserving index alignment,
  and cluster escalation replacing the trinary classifier).
- **petergyang/no-ai-slop** (MIT, © 2026 Peter Yang) — the `colon-reveal`,
  `dramatic-fragment`, and `rhetorical-setup` patterns, re-scoped locally to
  reduce false positives.
- **blader/humanizer** (MIT, © 2025 Siqi Chen) — the 2.0.0 staging lexicons
  (`staged-runup`, `phantom-objection`, `deep-saying`, `self-narration`), the
  no-invention rule and two-way fact diff, and the before/after fixtures in
  `evals/fixtures/humanizer-passages.md`.
- **A practitioner's published Grok Bot content prompts** — the LinkedIn and X
  slop items behind the `--genre` rules and `evals/fixtures/grok-items.md`
  (synthetic sentences; the prompts name items without examples).
- **tropes.fyi** (Ossama Chaib), **Pangram's guide to spotting AI writing**,
  **Wikipedia:Signs of AI writing**, and Kobak et al.'s excess-vocabulary study
  — primary pattern sources (see per-pattern citations in the catalogue).
- **obra/superpowers writing-skills** — the skill-authoring methodology
  (recipe-over-prohibition, WHEN-only descriptions, pressure testing).
- **proselint, write-good, retext, textlint-rule-preset-ai-writing** — rule
  ideas and config-schema inspiration for the linter.

Full third-party notices: [LICENSE](LICENSE).

## License

MIT — see [LICENSE](LICENSE). Third-party text quoted in `evals/fixtures/` and
`evals/holdout/` keeps its own license (including CC BY-SA 4.0 for Wikipedia)
and is not covered by the MIT grant; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
