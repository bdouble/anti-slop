# Contract: the negative-parallelism family

Run the harness after any change to a contrast regex in `skills/anti-slop/data/patterns.mjs`. If a change breaks more than two cases, revert it.

Skill-wide trigger evals live in `evals/triggers.md`; catalogue-drift checking lives in `evals/check-catalogue.mjs`. This file covers the contrast family only.

Evals exist so the skill earns its place. Add real sentences from real use over time — a set containing only cases written before shipping rots.

## 1. Contrast-family regression (the harness)

```
node evals/eval-antithesis.mjs
```

Fixture: `evals/fixtures/negative-parallelism.md`. Three labels — `KILL` (must detect), `LEGIT` (construction present but passes the keep-test; detection informational), `CLEAN` (must never match).

| Metric | Measured on | Target | Rationale |
|---|---|---|---|
| Recall | `KILL` | ≥ 0.90 | Missing real slop is the cheap failure — the recipe pass is a second net. |
| Precision | `CLEAN` | **1.00** | A false positive on genuine human prose is the expensive failure. It is what drives over-correction, and real human drafts are in this set. |

Current: 37 KILL / 8 LEGIT / 23 CLEAN, recall 1.00, precision 1.00 (2026-08-12).

**The rule:** any change to a regex in `antithesis`, `countdown`, `colon-reveal`, or `not-only-but-also` runs this harness before and after. The 2026-08-02 widening was verified by eye and left the family's single most common shape undetected for ten days; assume by-eye verification is wrong.

Never delete a fixture case to make a change pass. Append cases; if a case is genuinely mislabeled, change the label and say why in the same commit.

## 2. Contrast-budget behavior

The `CONTRAST_FAMILY` allowance is a scoring policy, so it needs its own check:

| Case | Expected |
|---|---|
| Document with one contrast device | score contribution 0; finding present at `info` tier, labelled "first contrast, free" |
| Document with four contrast devices | first free, remaining three score 2 each (+6) |
| Vendored `patterns.mjs` predating v1.5.0 (no `CONTRAST_FAMILY`) | linter runs unchanged, no crash |

Verify with:

```
node skills/anti-slop/scripts/slop-lint.mjs <file> --json
```

Regression to watch: the allowance must run **after** span-dedup, or the free pass gets spent on a finding that is then deduped away and the document silently loses its allowance.

## 3. Edit-fidelity check (judgment, not automated)

After any de-slop pass on real prose, confirm the pass did not over-correct:

- Would the author still recognize this as theirs?
- Did a strong human sentence get rewritten only for consistency?
- Did a real hedge, aside, or earned contrast get cut as if it were filler?

This is the eval the linter cannot run, and it is the one that fails most often. A technically clean draft that no longer sounds like anyone is a failed pass, not a successful one.
