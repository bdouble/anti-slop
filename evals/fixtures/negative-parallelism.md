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

License: rows written for this repo are MIT. Quoted rows stay under their
sources' licenses and are NOT covered by the repository's MIT grant: `hz-*`
rows quote blader/humanizer (MIT, Copyright (c) 2025 Siqi Chen), `wk-*` rows
quote Wikipedia's "Signs of AI writing" (© Wikipedia contributors, CC BY-SA 4.0,
https://creativecommons.org/licenses/by-sa/4.0/), and the `caesar` row is
Shakespeare (public domain). Full notices: `THIRD_PARTY_NOTICES.md` at the
repo root.

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

## Appended 2026-10-31: external contrast sentences

An internal comparison against blader/humanizer, Wikipedia's "Signs of AI writing" and a practitioner prompt set (2026-10-31) ran the family over 33 contrast sentences
taken verbatim from humanizer's examples (blader/humanizer, MIT) and Wikipedia's
"Signs of AI writing" (CC BY-SA 4.0), and caught 7 (21%). They are appended
here so the misses are pinned. Bare "Y rather than X" sentences from that set
are left out on purpose: the linter does not match bare "rather than", which is
ordinary technical English (the corrective "should be treated as X rather than
Y" form is covered by `corrective-framing` instead). A held-out set that no
regex is tuned against lives in `evals/holdout/contrast.md`.

KILL | hz-beat | It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere.
KILL | hz-merely-song | It's not merely a song, it's a statement.
KILL | hz-does-not-mean | This does not mean every choice is equal. It means there is no external system that confirms which choice is right.
KILL | hz-hero-feature | It's not just a feature; it's a whole new way to collaborate.
KILL | hz-lisbon-sights | But what truly makes Lisbon special isn't just the sights — it's the feeling.
KILL | hz-lisbon-place | Lisbon isn't just a place to visit; it's a place to fall in love with, again and again.
KILL | wk-not-only-dismissive | This choice of language is not only dismissive but also unnecessarily harsh and confrontational.
KILL | wk-doesnt-just | This remark doesn't just undermine the editor's argument; it questions their very right to participate.
KILL | wk-it-only | This approach doesn't help resolve disputes or improve content; it only escalates tensions.
KILL | wk-are-not-just | These comments are not just dismissive—they're outright disrespectful.
KILL | wk-you-not-only | By continuing, you not only discourage participation but also damage the collaborative spirit.
KILL | wk-not-grounded | The viewer is presented with a self-image that is not grounded in visual mastery, but in what Amelia Jones terms performance.
KILL | wk-rather-sentence | This dispersal is not dissolution. Rather, it constitutes what Deleuze might describe as becoming.
KILL | wk-mirror-portal | Through this lens, Kusama's self-portrait is not a mirror but a portal.
KILL | wk-colon-not | It is a portal: not a representation of self, but a mechanism for its constant reinvention.
KILL | wk-isnt-just-sourcing | The issue here isn't just sourcing—it's framing.
KILL | wk-thats-not-just | That's not just a sourcing issue—it's a systemic bias.
KILL | wk-derives-not-only | The film's popularity derives not only from its digital animation, but also from its ability to make a figure meaningful.
KILL | wk-isnt-wp | This isn't WP:NBIO — it's WP:1EVENT in disguise.
KILL | wk-not-a-career | Not a career, not a body of work, not sustained relevance — just an algorithmic moment.
KILL | wk-topic-is-not | The topic is not who feels warm fuzzies from visibility, it's whether this article meets the threshold.
KILL | wk-aint | This ain't bludgeoning — it's surgical teardown of a weak argument.
KILL | wk-not-just-but | This requires not just respectful communication, but a genuine focus on resolving issues constructively.
KILL | wk-isnt-imagining | This isn't imagining what policy should be — it's recognizing how consensus has shaped its application.
KILL | wk-same-verb | And consensus doesn't grow from silence — it grows from critique, correction, and clarity.
LEGIT | wk-my-own | If there were any errors in interpretation, they were my own — not mistakes caused by the AI.
LEGIT | wk-not-because | One of the admins blocked me — not because of the AI usage itself — but because I didn't respond.

Hyphenated compounds inside X broke the headline shape (2026-10-31 bug: the
first scored clean while "a weight loss drug" without the hyphen was flagged).

KILL | hyphen-weight-loss | It's not just a weight-loss drug, it's a turning point for obesity care.
KILL | hyphen-real-time | It's not just a real-time dashboard, it's an early-warning system.
KILL | hyphen-ai-powered | This is not just an AI-powered tool, it's a teammate.

Factual corrections share the shape. They are LEGIT: the reader really may
believe X, so a human waives them on review.

LEGIT | factual-tokenizer | The bug isn't in the parser; it's in the tokenizer.
LEGIT | factual-cert | The outage wasn't the deploy; it was an expired certificate.
LEGIT | factual-same-verb | The script doesn't run on Windows; it runs on macOS and Linux.
LEGIT | factual-preposition | We met not in Boston but in Chicago.

Guards for the 2026-10-31 shapes: near-misses that must stay clean.

CLEAN | guard-does-not-mean | A green build does not mean the migration ran. Check the row count.
CLEAN | guard-not-just-yet | Can we ship it today? Not just yet, but Thursday looks likely.
CLEAN | guard-not-a-but | The vendor was not a fit for us, but the call was useful.
CLEAN | guard-no-repeat | No coffee, one croissant, and two hours of review.
CLEAN | guard-doesnt-semicolon | The cron job doesn't retry; we page the on-call engineer instead.
CLEAN | guard-rather-plain | Duplicate keys override earlier values rather than throwing an error.
