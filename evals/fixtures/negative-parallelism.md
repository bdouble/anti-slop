# Fixture: negative parallelism

Labeled corpus for `scripts/eval-antithesis.mjs`. Format, one case per line:

```
LABEL | id | text
```

**Labels**

- `KILL` — the construction is present and empty. The linter MUST detect it. Recall is measured over these.
- `LEGIT` — the construction is present but passes the keep-test (the reader really does hold the negated belief). The linter is expected to flag it too, because no regex can run the keep-test; a human waives it on review. Reported informationally, never scored.
- `CLEAN` — not the construction. Any match here is a regression. Precision is measured over these.

Sources: the ten shapes of the family; the ~10 real instances that motivated the 2026-08-02 widening; and human-written drafts sampled from real use. The `CLEAN` and `LEGIT` rows are the load-bearing false-positive guard — fluent writers use corrective negation constantly and legitimately, so any widening that flags them is wrong.

Append new cases; never delete one to make a change pass.

## Cases

KILL | shape1-additive-a | It's not just a win for the private bank — it's a win for the entire enterprise.
KILL | shape1-additive-b | This is not just a tool, it's a whole new way of working.
KILL | shape1-additive-c | We're not just shipping features — we're building a platform.
KILL | shape2-supplant-a | It's not about speed. It's about accuracy.
KILL | shape2-supplant-b | This isn't a setback, it's an opportunity.
KILL | shape2-supplant-c | That's not a side effect of the ratio problem. It's the one real advantage it gives you.
KILL | shape2-supplant-d | The framework is not a checklist. It is a way of seeing the problem.
KILL | shape3-never-a | The target was never a man. The target was the truth.
KILL | shape3-never-b | The bottleneck was never headcount. It was the review queue.
KILL | shape3-never-c | Our advantage is never the model. It is the evaluation harness.
KILL | shape4-stacked-a | No bag, no things, no armor, just me.
KILL | shape4-stacked-b | No meetings, no status decks, just the work.
KILL | shape4-stacked-c | Not a bug. Not a feature. Just a design flaw.
KILL | shape5-verb-a | We don't sell software, we sell outcomes.
KILL | shape5-verb-b | We didn't build a tool. We built a system.
KILL | shape5-verb-c | They didn't run an experiment. They ran a demo.
KILL | shape6-appositive-a | The value is the question it raises, not the answer it gives.
KILL | shape6-appositive-b | Treat the estimate as a hypothesis, not a fact.
KILL | shape6-appositive-c | What we shipped was a prototype, not a product.
KILL | shape7-question-a | The question is not whether we ship, but when.
KILL | shape7-question-b | The problem is not the backlog, it's the intake.
KILL | shape7-question-c | The risk isn't the migration. It's the rollback plan.
KILL | shape8-degree-a | This is less about speed, and more about accuracy.
KILL | shape8-degree-b | The work is less about writing code, more about deciding what not to build.
KILL | shape8-degree-c | It was not so much a reorg as a rebrand.
KILL | shape9-that-a | It's not that we were slow. It's that we were wrong.
KILL | shape9-that-b | That's not that the data is bad, it's that nobody trusts it.
KILL | shape10-point-a | Speed isn't the point. Accuracy is.
KILL | shape10-point-b | Headcount is not the problem. Sequencing is.
KILL | shape10-point-c | Adoption isn't what matters here. Retention is.
KILL | observed-0802-a | You're not competing on features — you're competing on trust.
KILL | observed-0802-b | I'm not arguing for less process, but for less ceremony.
KILL | observed-0802-c | Not your direct concern for this migration, but a source of pattern intelligence.
KILL | observed-0802-d | They're not stakeholders in the usual sense, they're the actual users.
KILL | observed-0802-e | He's not the decision maker — he's the one who frames the decision.
KILL | markdown-table-cell | Signal quality | Not a ranking input, but a diagnostic for the crawl team.
KILL | markdown-list-item | - Not a replacement for the review, but a filter ahead of it.

LEGIT | voice-prototype | It's not a prototype. It's tested. It's reliable. I use it every day.
LEGIT | voice-handoff | That's not a handoff, that's a failure mode.
LEGIT | voice-danger | The danger isn't slow delivery. The danger is building too much of the wrong thing, far too fast.
LEGIT | voice-not-just | Claude Code is a massive unlock, and it's not just for coding.
LEGIT | voice-developer | You don't need to become a developer. You just need a system that turns your product judgment into production code.
LEGIT | digiorno | It's not delivery. It's DiGiorno.
LEGIT | caesar | Not that I loved Caesar less, but that I loved Rome more.
LEGIT | lombardi | Winning isn't everything; it's the only thing.
CLEAN | attributed-correction | Most teams read the drop as churn. It's a billing-cycle artifact.

CLEAN | tail-no-determiner | Product judgment grounded in architecture decisions, not slideware.
CLEAN | plain-negation-4 | I'm not the right reviewer for this one, so it's a pass from me.
CLEAN | factual-day | The meeting is Tuesday, not Wednesday.
CLEAN | factual-list | We shipped search, billing, and the admin console.
CLEAN | contrastive-list | Coffee, not tea.
CLEAN | plain-negation | The API does not support pagination on this endpoint.
CLEAN | plain-negation-2 | I don't have the Q3 numbers yet.
CLEAN | plain-negation-3 | She is not on the review panel this cycle.
CLEAN | table-na | Rollout date | Not applicable for the pilot cohort.
CLEAN | preference | I'd rather ship the smaller version this week.
CLEAN | comparison | Retention is higher on annual plans than on monthly.
CLEAN | conditional | If the crawl fails twice, page the on-call engineer.
CLEAN | correction-plain | Correction: the outage lasted 40 minutes, not four hours.
CLEAN | quantity | We interviewed nine customers, not the twelve we planned.
CLEAN | instruction | Do not merge before the migration lands.
CLEAN | definition | A spike is a time-boxed investigation with a written answer.
CLEAN | narration | We didn't sign the contract. We went home.
CLEAN | question-plain | The question came up twice in the review.
CLEAN | never-plain | I have never used that library in production.
CLEAN | just-plain | Just send me the link when it's ready.
CLEAN | point-plain | The point of the exercise is to find the constraint.
CLEAN | no-list | No blockers, two risks, one open decision.
