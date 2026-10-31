# Fixture: humanizer before/after passages

Source: the worked examples in blader/humanizer v3.1.0, commit `0ef9fe5`
(https://github.com/blader/humanizer). `hz-NN-beforeK` is the AI-sounding
input for humanizer pattern §NN, `hz-NN-afterK` its rewrite, and `readme-*`
the README examples. Copied verbatim on 2026-10-31; only the passages the evals
read are kept (every `after`, and the `before` passages
`evals/eval-staging-ports.mjs` names).

License: MIT, Copyright (c) 2025 Siqi Chen. This file is NOT covered by the
repository's own MIT grant; it stays under humanizer's license, whose full
notice is in `THIRD_PARTY_NOTICES.md` at the repo root.

Used by `evals/eval-false-positives.mjs` (every `after` passage must pass the
gate) and `evals/eval-staging-ports.mjs`. This is a TUNING fixture; the
held-out set is `evals/holdout/`.

Format: one passage per `=== id` block.

=== hz-01-after1
The heavy beat adds to the aggressive tone.

=== hz-01-after2
No external system confirms which choice is right, although the choices still have different consequences.

=== hz-01-after3
The options come from the selected item without forcing the user to guess.

=== hz-02-after1
AlphaEvolve changed the search because it did not favor symmetry or human-looking designs. That made some of the older assumptions less useful.

=== hz-02-after2
Caching cuts repeat work.
Retries hide brief outages.

=== hz-02-before2
Caching cuts repeat work.
That is the real win.
Retries hide brief outages.
That is the real win.

=== hz-03-after1
The question is whether teams can adapt. That mostly depends on whether the organization is ready to change its habits.

=== hz-03-after2
Symmetric layouts often feel more predictable to users. Teams can over-optimize workflows and miss how people actually use them.

=== hz-03-before1
The real question is whether teams can adapt. At its core, what really matters is organizational readiness.

=== hz-03-before2
Symmetry is the language of trust. Efficiency becomes a trap when teams forget the human layer.

=== hz-04-after1
Next.js caches data at multiple layers, including request memoization, the data cache, and the router cache.

=== hz-04-after2
Whether it's worth the price depends on how often you'll use it.

=== hz-04-before1
Let's dive into how caching works in Next.js. Here's what you need to know.

=== hz-04-before2
Is it worth the price? Honestly? It depends on how often you'll use it.

=== hz-05-after1
The issue is whether the agent can use the instruction when it acts.

=== hz-05-after2
Session tokens are rotated every 24 hours, in place, and clients refresh transparently.

=== hz-05-before1
This isn't mainly about prompt length, and I'm not arguing that documentation doesn't matter. You could categorize the problem another way, but the issue is whether the agent can use the instruction when it acts.

=== hz-05-before2
Session tokens are rotated every 24 hours. A tempting approach would be to rotate them by restarting the auth service on a cron job, but that would drop every active session. Rotation happens in place, and clients refresh transparently.

=== hz-06-after1
The event includes talks and panels. There's also time for informal networking between sessions.

=== hz-06-after2
A career can look promising and fail. So can a relationship that felt important and ended, or a skill that took years and remained useless. These decisions rarely explain themselves.

=== hz-07-after1
She noted the door and its lock, then filed both away.

=== hz-08-after1
The new policy, announced without warning, affects thousands of workers. The changes, long overdue according to critics, will take effect immediately.

=== hz-09-after1
The policy may affect outcomes.

=== hz-10-after1
The report is high quality, the process is well documented, and the plan is long term.

=== hz-11-after1
You do not need a configuration file. The system preserves the results automatically.

=== hz-12-after1
Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonization, remain common, especially in the south.

=== hz-13-after1
The Statistical Institute of Catalonia was established in 1989, part of a wider decentralization of administrative functions in Spain.

=== hz-13-after2
Korattur has recurring traffic congestion and water shortages.

=== hz-14-after1
He founded and conducts the Rajhans Orchestra. The concerts were part of the celebrations of Pakistan's 50th anniversary.

=== hz-15-after1
The temple is painted blue, green, and gold, colors meant to evoke Texas bluebonnets and the Gulf of Mexico.

=== hz-16-after1
Alamata Raya Kobo is a town in the Gonder region of Ethiopia.

=== hz-17-after1
Researchers and conservationists study the Haolai River for its unusual characteristics.

=== hz-17-after2
Her views have been cited in The New York Times and the BBC.

=== hz-17-before1
Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

=== hz-18-after1
Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet.

=== hz-19-after1
It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

=== hz-19-after2
The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption.

=== hz-19-before2
- **User Experience:** The user experience has been significantly improved with a new interface.
- **Performance:** Performance has been enhanced through optimized algorithms.
- **Security:** Security has been strengthened with end-to-end encryption.

=== hz-20-after1
## Strategic negotiations and global partnerships

=== hz-20-after2
The product launches in Q3. User research showed a preference for simplicity.

=== hz-20-before2
🚀 **Launch Phase:** The product launches in Q3
💡 **Key Insight:** Users prefer simplicity

=== hz-21-after1
He said "the project is on track" but others disagreed.

=== hz-22-after1
The French Revolution began in 1789 when a financial crisis and food shortages led to widespread unrest.

=== hz-23-after1
The company's founding date is not documented in the available sources.

=== hz-23-after2
Her early life is not documented in the available sources.

=== hz-23-before1
While specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s.

=== hz-23-before2
Information about her early life is not publicly available, suggesting she maintains a low profile. She likely grew up in a middle-class household, which shaped her later interest in education reform.

=== hz-24-after1
## Performance
When users hit a slow page, they leave.

=== hz-25-after1
This function uses a hash map for O(1) lookups, avoiding the O(n²) cost of naive iteration.

=== hz-25-after2
Prices are each vendor's published rate. Two vendors publish nothing; call them.

=== hz-25-before1
This function was added to replace the previous approach of iterating through all items, which caused O(n²) performance.

=== hz-25-before2
The figures below are drawn from each vendor's published pricing; anything we could not confirm is flagged rather than guessed.

=== hz-26-after1
Agreed, this is a workaround. Fixing it properly in `MergeService` would widen this ticket well past its scope: it is shared code, so it means checking the merge flow for every account, plus a backfill for the rows that are already wrong.
I'd rather keep this PR account specific and open a separate ticket for the `MergeService` fix and the backfill. Let me know if that works.

=== readme-hero-after
Shared drafts are out today. For months our own team passed around files named final_v7.docx, so we built a way for two people to edit the same doc at once, with each person's changes showing up live for the other. Comments stay pinned to the sentence they're about, even when the text around them changes. It's free on every plan.

=== readme-lisbon-after
I spent five days in Lisbon last October. My hotel was up in Alfama, with a lot of stairs between it and everything else, and my legs felt every one of them. The views from the top were worth the climb.

Everyone tells you to ride Tram 28, so I did. The trip took about forty minutes, and most of the car was other tourists taking pictures out the windows. The custard tarts at Pastéis de Belém are the famous ones, but my favorite came from a place in Graça, still warm from the oven.

The part of Lisbon I liked best starts a block or two above the main squares, where the streets go quiet and nobody is in a hurry. São Jorge Castle has good views over the rooftops and a long queue to get them.

I'd go back, in spring next time, and with better shoes.
