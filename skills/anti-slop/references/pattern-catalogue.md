# Anti-Slop Pattern Catalogue

Last updated: 2026-10-31

This catalogue is derived from `data/patterns.mjs`. The .mjs file wins any conflict. It exists to give each machine-detectable pattern a plain-language rule and concrete before/after rewrites, so a writer can fix a finding by recipe instead of by synonym-swap. When the skill misses a new slop pattern in real use, append a new entry under "Appended from observed failures" with a date; never rewrite an existing entry, and never edit this file to disagree with the .mjs source.

Every id in `data/patterns.mjs` appears here once: the `LEXICONS`, `FATAL_LEXICON`, `FATAL_REGEX`, `REGEX_RULES`, `STATISTICAL`, and `JUDGMENT` collections. Entries are grouped by family and ordered within a family by tier (fatal, strong, lexical, weak, info, judgment). Each entry states its **Detection** as `linter` (the bundled `scripts/slop-lint.mjs` catches it) or `judgment (not linted)` (a `JUDGMENT` pattern the linter cannot see, so it needs the recipe pass and a human read).

Two representation notes, both faithful to the source:
- `JUDGMENT` patterns carry no `tier` field in `data/patterns.mjs`; they are marked **Tier:** judgment here rather than assigned a lint tier.
- `STATISTICAL` detectors carry no `family` field; each is filed under its taxonomy level (em-dash and unicode under Mechanical, burstiness and starters under Syntactic, paragraph/bold/heading/duplication under Structural). Their ids use the camelCase key from `data/patterns.mjs`; the linter prints kebab-case display names (e.g. `emDashDensity` → "em-dash density").

## Contents

- [Lexical](#lexical) — `self-praise` · `ai-signature` · `ai-cliche` · `corporate-buzzword` · `adverbial-bloat` · `vague-quantifier` · `watchlist` · `elegant-variation` · `over-correction` · `watchlist-2026`
- [Syntactic](#syntactic) — `hedge` · `hedge-stacking` · `copula-avoidance` · `antithesis` · `not-only-but-also` · `self-posed-qa` · `colon-reveal` · `countdown` · `dramatic-fragment` · `trailing-participle` · `sentenceUniformity` · `anaphora` · `overused-transition` · `wordy` · `concession-pivot` · `starterMonotony` · `contractionRate` · `rule-of-three-abuse` · `single-qualifier` · `clippedCadence` · `rhetoricalRun`
- [Structural](#structural) — `meta-commentary` · `signposted-conclusion` · `closing-tautology` · `template-header` · `boldFirstBullets` · `duplication` · `paragraphUniformity` · `boldDensity` · `titleCaseHeadings` · `one-point-dilution` · `fractal-summaries` · `self-narration` · `broetry` · `social-heading` · `heading-restated` · `process-narration`
- [Rhetorical](#rhetorical) — `significance-inflation` · `assert-dont-prove` · `despite-challenges` · `false-suspense` · `rhetorical-setup` · `vague-attribution` · `imagine-opener` · `false-range` · `invented-label` · `dead-metaphor` · `analogy-stacking` · `mirrored-metaphor` · `staged-runup` · `phantom-objection` · `deep-saying` · `corrective-framing` · `unprompted-defense`
- [Tonal](#tonal) — `application-boilerplate` · `outreach-boilerplate` · `permission-hedge` · `era-opener` · `chat-leakage` · `engagement-bait` · `patronizing-analogy` · `ten-x-hype` · `horoscope` · `genericness` · `forced-positivity` · `manufactured-personality` · `false-vulnerability` · `stock-proclamation` · `social-closer` · `hook-formula` · `invented-detail` · `re-explaining`
- [Mechanical](#mechanical) — `machine-artifact` · `placeholder` · `chat-opener` · `emDashDensity` · `exclamationDensity` · `unicodeDecoration` · `latin-sidebar` · `source-disclaimer` · `emojiBullets` · `hashtagDensity` · `emojiDensity`
- [Stylometric texture](#stylometric-texture) — `trigramEntropy` · `crossParaBurstiness` · `punctDistribution` · `lowTtr` · `smartPunctSignature` · `bypassNormalization` · `stylometricCluster`
- [Appended from observed failures](#appended-from-observed-failures)

---

## Lexical

Word- and phrase-level tells. Lexicons decay as models train away from publicized words, so treat these as real signal with a shelf life (see `detection-guide.md`).

### Unsupported self-praise (`self-praise`)
**Tier:** strong · **Family:** Lexical · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** an evaluative label about yourself with no evidence attached fills the slot where the proof belongs.
**Before → After:**
- "Results-driven professional with a proven track record." → "Cut onboarding from six weeks to ten days across two teams."
- "A passionate, detail-oriented self-starter." → "Caught a pricing bug that had over-charged 400 accounts for a month."
- "Seasoned thought leader, adept at strategy." → "Set the roadmap that grew the API from 3 to 40 enterprise customers."
**The rule (positive form):** name the result the label is standing in for.

### AI-signature word (`ai-signature`)
**Tier:** lexical · **Family:** Lexical · **Detection:** linter · **False-positive risk:** moderate-decaying
**Why it's slop:** a small set of ornate depth-and-transformation words that models over-select (delve, tapestry, testament, realm, underscore) marks the prose as machine-selected.
**Before → After:**
- "Let's delve into the rich tapestry of this intricate landscape." → "Here is how the refund actually routes through the payments system."
- "The framework underscores the pivotal role of collaboration." → "Two teams share one on-call rotation, so every incident has one owner."
- "a testament to the team's meticulous work" → "the team shipped 14 releases with zero rollbacks."
**The rule (positive form):** use the plain word, then check the sentence still carries a checkable claim.

### AI cliché (`ai-cliche`)
**Tier:** lexical · **Family:** Lexical · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** stock openers and closers ("let's dive in", "harness the power of", "at the end of the day") announce a register, not a point.
**Before → After:**
- "Let's dive deep and unlock your potential." → "Start with the three settings most new users get wrong."
- "This tool harnesses the power of AI to transform your workflow." → "This tool drafts your standup from yesterday's commits."
- "At the end of the day, the bottom line is results." → "Renewals rose nine points last quarter."
**The rule (positive form):** cut the frame and lead with the concrete claim it was wrapping.

### Corporate buzzword (`corporate-buzzword`)
**Tier:** lexical · **Family:** Lexical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** inflated verbs and adjectives (leverage, utilize, facilitate, robust, seamless, best-in-class) replace the specific thing with a category.
**Before → After:**
- "We leverage best-in-class tools to facilitate seamless collaboration." → "We use Linear for tickets and Slack for handoffs."
- "a robust, future-proof, mission-critical platform" → "a platform that has run five years without a data-loss incident."
- "utilize the framework to streamline operations" → "use the checklist to cut the closing steps from nine to four."
**The rule (positive form):** swap for the plain verb (use, help, strong, smooth) or name the specific tool, number, or step.

### Adverbial bloat (`adverbial-bloat`)
**Tier:** lexical · **Family:** Lexical · **Detection:** linter · **False-positive risk:** moderate-high
**Why it's slop:** importantly/remarkably/notably/significantly manufacture emphasis the sentence has not earned; if removing the adverb weakens the claim, the claim was weak.
**Before → After:**
- "This significantly and remarkably improves reliability." → "This cut error rates from 2% to 0.1%."
- "Notably, the team worked tirelessly to deliver." → "The team delivered the migration two weeks early."
- "Clearly, this is critically important." → "This blocks the launch."
**The rule (positive form):** delete the adverb; if the sentence needs propping up, add a number instead. Never swap one adverb for another. ("fundamentally" is allowed once when anchoring a core argument.)

### Vague quantifier (`vague-quantifier`)
**Tier:** weak · **Family:** Lexical · **Detection:** linter · **False-positive risk:** high
**Why it's slop:** a quantity claim that avoids the quantity. "various", "numerous", "a number of" occupy the slot where the number goes and commit to nothing, so the sentence sounds evidenced without being checkable. Ordinary English on its own — the linter allows two before scoring, and a cluster is the signal.
**Before → After:**
- "We interviewed various stakeholders." → "We interviewed the CFO and two board members."
- "The migration broke numerous downstream jobs." → "The migration broke nine downstream jobs."
- "a multitude of options across a range of vendors" → "eleven options across four vendors."
**The rule (positive form):** give the number, or name them. If you know neither, say what you do know ("most of the team", "everyone who tested it").
**Note:** `myriad` and `plethora` live in `ai-signature`, not here — their cohort is sharper and earns the higher tier.

### Watchlist word (`watchlist`)
**Tier:** weak · **Family:** Lexical · **Detection:** linter · **False-positive risk:** high
**Why it's slop:** dynamic/ecosystem/landscape/empower/data-driven/scalable are fine once; a cluster of them reads as generated. Density is the signal, not any single word.
**Before → After:**
- "an actionable, data-driven, scalable solution that empowers stakeholders" → "a dashboard that flags accounts likely to churn this month."
- "navigating the evolving ecosystem and landscape" → "tracking which of our six competitors shipped SSO."
**The rule (positive form):** keep at most one or two; replace the rest with the concrete noun or verb they gesture at.

### Elegant variation / synonym cycling (`elegant-variation`)
**Tier:** judgment · **Family:** Lexical · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** renaming one person or thing each mention ("the entrepreneur", "the visionary", "the key figure") is forced variety that costs the reader tracking effort.
**Before → After:**
- "Musk founded the company. The entrepreneur raised $2M. The visionary hired ten engineers." → "Musk founded the company, raised $2M, and hired ten engineers."
- "Dr. Chen led the study. The researcher published in March. The scientist presented in June." → "Dr. Chen led the study, published in March, and presented in June."
**The rule (positive form):** pick one name and repeat it; repetition reads cleaner than a thesaurus.

### Humanizer artifacts / over-correction (`over-correction`)
**Tier:** judgment · **Family:** Lexical · **Detection:** judgment (not linted) · **False-positive risk:** low
**Why it's slop:** aggressive de-AI passes and "humanizer" tools leave awkward synonyms no fluent writer picks ("paramountly significant"), a tell of processed text.
**Before → After:**
- "paramountly significant to our overarching objectives" → "central to the goal."
- "We endeavored to ameliorate the situation." → "We fixed it."
**The rule (positive form):** revert to the plain word; anything that fails the say-it-aloud test goes.

### Mid-2026 cohort word (`watchlist-2026`)
**Tier:** weak · **Family:** Lexical · **Detection:** linter · **False-positive risk:** high
**Why it's slop:** Wikipedia's "Signs of AI writing" (2026-10-31 revision) lists a vocabulary cohort for mid-2026 models; the linter keeps clearer, dependable, echoed, foster, practical, prioritize, steady and universally ("matters" and "challenge" were dropped on review as too common to signal anything). Every word is ordinary English, and the list has a single vendor-blog source, so only a cluster counts: two free plus one per 300 words.
**Before → After:**
- "The plan is practical and steady. It matters because teams prioritize dependable tools." → "The plan reuses the billing service we already run, so it ships in two sprints."
**The rule (positive form):** name the concrete thing the cohort word gestures at. Review this list at the next quarterly pass.

---

## Syntactic

Sentence-level constructions. Several are legitimate rhetorical figures used once; the tell is reflexive use and density.

### Hedge phrase (`hedge`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "it's worth noting", "it is important to note", "at its core" is throat-clearing that delays the sentence that stands on its own. (2026-10-31: lone qualifiers such as "arguably" and "in many ways" moved to the weak Single qualifier entry below.)
**Before → After:**
- "It's worth noting that the API is rate-limited." → "The API allows 100 requests a minute."
- "In many ways, this is arguably the better approach." → "This approach wins on latency and costs the same."
- "It is important to note that adoption grew." → "Adoption grew 40% in March."
**The rule (positive form):** delete the preamble and start on the claim; if you need a caveat, make it precise ("in 7 of 10 cases").

### Stacked modal hedge (`hedge-stacking`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** two hedges doing one hedge's job. "might possibly", "could potentially" marks a writer buying time rather than committing — the doubling adds no caution the single word did not already carry, and signals that no evidence is coming.
**Before → After:**
- "This might possibly improve retention." → "This lifted retention 4 points in the pilot."
- "The change could potentially reduce latency." → "The change cut p99 latency by about a third in staging."
- "It's possible that adoption might stall." → "Adoption stalls if fewer than 30% of teams migrate by June."
**The rule (positive form):** keep at most one hedge, and prefer a precise qualifier to any of them ("in 7 of 10 cases" beats "might possibly").
**Note:** a bare "might" or "could" never fires — those are ordinary English. `likely` is excluded from the pattern on purpose: "would likely take a week" is a normal estimate, not a hedge stack.

### Copula avoidance (`copula-avoidance`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "serves as", "stands as", "boasts", "operates as" inflate a plain "is" into a claim of significance the fact does not need.
**Before → After:**
- "The library serves as a central hub for logging." → "The library is where all logging goes."
- "The city boasts a thriving tech scene." → "The city has 200 funded startups."
- "This role stands as a testament to her growth." → "She was promoted twice in three years."
**The rule (positive form):** use the plain copula: things are what they are. (2026-10-31: the linter allows one per 250 words, so a short post gets none free.)

### Negative parallelism / antithesis (`antithesis`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-at-density
**Why it's slop:** "it's not X, it's Y" negates a strawman to make an ordinary claim sound profound. One per piece is rhetoric; one per paragraph is a signature.
**Before → After:**
- "It's not about speed. It's about accuracy." → "Accuracy matters more than speed here."
- "We don't sell software, we sell outcomes." → "The software cuts your monthly close from ten days to three."
- "This isn't a setback, it's an opportunity." → "The outage cost a day; here is what we changed."
- "That's not a side effect of the ratio problem. It's the one real advantage it gives you." → "That's the one real advantage your ratio problem gives you." (two-sentence reveal, not just same-clause)
- "Not a blocker for this release, but a source of early warnings." → "It doesn't block this release, and it warns us early." (markdown/table-cell context)
- "The value is the question it raises, not the answer it gives." → "Its value is the question it raises." (mirrored trailing order)
**The rule (positive form):** state Y directly; keep the "not X" only when X is a real misconception the reader holds (the coffee test). Cap at one per piece.
**Family (2026-08-12):** this rule covers ten shapes of one tic, not one phrasing — additive · supplanting · never-form · stacked negation · verb-phrase · trailing appositive · question-form · degree-form · that-clause · point-form. Editors reliably catch the first and miss the rest. Full taxonomy, the three-question keep-test, five repairs keyed to *why* the negation appeared, and the legitimate-use gallery: `references/negative-parallelism.md`.
**Budget (2026-08-12):** the first contrast device in a document is free (`CONTRAST_FAMILY` in `data/patterns.mjs`, shared with `not-only-but-also`, `countdown`, and `colon-reveal`); every one after it scores. Scored flat, a single deliberate use had been consuming the entire ship target. The human baseline is not zero — Pangram measures ~3× the human *rate* in AI text, not presence versus absence.
**Two scope notes for anyone editing the regexes:** the trailing-appositive shape requires a determiner after "not" (this is what separates "a hypothesis, not a fact" from the bare contrastive tail real writers use, "grounded in customer interviews, not guesswork"), and the mirrored trailing order excludes number words after the determiner (quantity corrections such as "nine customers, not the twelve we planned" are arithmetic, not rhetoric). Both are asserted by `evals/fixtures/negative-parallelism.md`. Run `evals/eval-antithesis.mjs` before and after any change here.

### "Not only X but also Y" (`not-only-but-also`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** the frame usually pads a single point into two halves, one of which is filler.
**Before → After:**
- "The redesign not only improved speed but also increased signups." → "The redesign cut load time to 400ms and lifted signups 12%."
- "She is not only a strong engineer but also a mentor." → "She ships core features and mentors three juniors."
**The rule (positive form):** state the stronger half; keep both only when each carries distinct weight.

### Self-posed Q&A (`self-posed-qa`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "The result? Devastating." poses a question nobody asked to manufacture a beat of drama.
**Before → After:**
- "The result? A 30% drop in churn." → "Churn dropped 30%."
- "The best part? It runs on the free tier." → "It runs on the free tier."
**The rule (positive form):** keep the answer as a statement and drop the question.

### Colon reveal (`colon-reveal`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** a dramatic-reveal noun phrase, a colon, then a lowercase punchline ("The best part: it learns.") manufactures suspense a plain sentence delivers cleaner. The colon-form sibling of `self-posed-qa`; scoped to a curated noun set plus a required lowercase reveal, so labels and list intros ("Requirements:", "Total cost:") and Title-Case headings never match.
**Before → After:**
- "The best part: it learns from every correction." → "It learns from every correction."
- "The detail that makes it work: a separate agent grades the output." → "A separate agent grades the output — that's what makes it work."
- "The catch: it only runs offline." → "It only runs offline."
**The rule (positive form):** rewrite as one plain sentence. Reserve colons for lists, labels, and quotes, not drama.

### Countdown negation (`countdown`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "Not X. Not Y. Just Z." stacks fragment negations for a reveal that a single sentence delivers better.
**Before → After:**
- "Not a bug. Not a feature. A design flaw." → "It's a design flaw."
- "Not ten. Not fifty. Five hundred sign-ups in a week." → "500 sign-ups in a week."
- "No bag, no things, no armor, just me." → "I brought nothing." (comma-joined stacked form, added 2026-08-12 — endemic in AI-generated fiction per the Atlantic's reporting)
**The rule (positive form):** state the point in one declarative sentence. Shape 4 of the negative-parallelism family; shares the one-free-per-document `CONTRAST_FAMILY` budget.

### Dramatic fragmentation (`dramatic-fragment`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** affirmative mic-drop fragments ("That's it. That's the whole thing.") stack short sentences for a beat of drama a single declarative delivers better. The affirmative twin of `countdown`, which catches the "Not X. Not Y. Just Z." negation form. A terminal-punctuation guard keeps mid-sentence uses ("that's the whole point of the exercise") clean.
**Before → After:**
- "That's it. That's the whole thing." → "That's the entire design."
- "We shipped one feature this quarter. That's the whole story." → "We shipped one feature this quarter."
**The rule (positive form):** state the point in one complete sentence; let the fact carry the weight.

### Trailing participial commentary (`trailing-participle`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** a sentence-final "-ing" clause (enhancing scalability, underscoring its role) bolts on shallow significance instead of a real consequence. Classic resume-bullet inflation.
**Before → After:**
- "Led the migration, enhancing scalability and driving efficiency." → "Led the migration; it cut server costs 35%."
- "Launched the program, underscoring our commitment to growth." → "Launched the program; 1,200 users joined in month one."
- "Rebuilt the pipeline, ensuring seamless integration." → "Rebuilt the pipeline; deploys dropped from an hour to six minutes."
**The rule (positive form):** end on the concrete result, in its own clause, with a number.

### Sentence uniformity / low burstiness (`sentenceUniformity`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low (some technical and legal prose is naturally uniform)
**Why it's slop:** when every sentence lands at 15–20 words with the same subject-verb-object shape, the metronome rhythm is the most durable statistical tell; it survives word-swapping.
**Before → After:**
- "The team met on Monday. They reviewed the plan. They agreed on scope. They set a deadline." → "The team met Monday. In an hour they had scope, an owner, and a date two weeks out."
**The rule (positive form):** vary length by joining related clauses as often as by cutting: a 25-word sentence next to a 6-word one. (2026-10-31: "a fragment for punch" removed; human edits of agent drafts mostly lengthened their short sentences.)

### Anaphora abuse (`anaphora`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate (deliberate anaphora is a known device)
**Why it's slop:** three or more consecutive sentences opening with the same words reads as a template unless it is a deliberate, earned build.
**Before → After:**
- "They assume users will pay. They assume developers will build. They assume ecosystems will emerge." → "The plan assumes users pay, developers build on top, and an ecosystem follows — none of which has happened yet."
**The rule (positive form):** vary the openings, or merge the parallel items into one sentence. (2026-10-31: after "The" or "This" the first two words must match, so "The board… The vote… The second vote…" stays clean; one- and two-letter starters such as "It" stay excluded, as before.)

### Overused transition (`overused-transition`)
**Tier:** lexical · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** sentence-initial However/Moreover/Furthermore/Additionally/Nevertheless at density is formal connective tissue humans rarely stack.
**Before → After:**
- "Moreover, the results were strong. Furthermore, costs fell." → "The results were strong, and costs fell."
- "However, we shipped on time." → "But we shipped on time."
**The rule (positive form):** use "also", "but", "still"; the linter allows "however" once.

### Wordy construction (`wordy`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "due to the fact that", "at this point in time" spend five words on one word's work. (2026-10-31: "in order to" left the list; Wikipedia counts it as a sign of human writing.)
**Before → After:**
- "We delayed the release due to the fact that the tests were failing." → "We delayed the release because the tests were failing."
- "With regard to cost, we conducted an analysis." → "We analyzed the invoices for cost."
- "At this point in time we monitor it on a daily basis." → "We monitor it daily now."
**The rule (positive form):** compress to the single word (because, about, now).

### Concession-pivot (`concession-pivot`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** high
**Why it's slop:** "Sure, X. But Y." and "While X might seem Y" are the antithesis skeleton in a trench coat, an empty concession set up only to be knocked down.
**Before → After:**
- "Sure, it's a small feature. But it changes everything." → "The feature is small; it removed our top support ticket."
- "While this might seem minor, it matters." → "This bug blocked checkout for mobile users."
**The rule (positive form):** if the concession is empty, cut it and assert the point directly.

### Sentence-starter monotony (`starterMonotony`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** too many sentences opening with The/This/It/In signals a single default sentence shape repeated.
**Before → After:**
- "The app loads fast. The design is clean. This makes it usable. It works." → "The app loads in half a second. Onboarding takes three taps. Users hit their first result before they would normally finish signing up."
**The rule (positive form):** front-load different subjects; let sentences start on a name, a verb, or a number.

### Zero contractions, first-person (`contractionRate`)
**Tier:** info · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** high (formal registers legitimately avoid contractions)
**Why it's slop:** across a long first-person piece, never using "I'm/don't/it's" reads stiff. This is corroboration only; never act on it alone.
**Before → After:**
- "I am confident that I would be a strong fit. I do not think the transition would be difficult." → "I'm confident I'd fit, and I don't expect a hard transition."
**The rule (positive form):** in first-person prose, use the contractions you would say aloud.

### Rule-of-three compulsion (`rule-of-three-abuse`)
**Tier:** judgment · **Family:** Syntactic · **Detection:** judgment (not linted) · **False-positive risk:** high (the rule of three is good rhetoric)
**Why it's slop:** every list arriving as exactly three items, triads as filler rhythm, is mechanical repetition. Deliberate triads are fine; flag only the reflex.
**Before → After:**
- "Fast, efficient, and reliable." → "It answers in under 200ms."
- "We build, we ship, we scale." → "We shipped the beta to 5,000 users last month."
**The rule (positive form):** vary list length to 2, 4, or 5; replace a filler adjective triad with one precise word.

### Single qualifier (`single-qualifier`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** high
**Why it's slop:** usually it isn't. Humanizer §9 and Wikipedia's "Signs of human writing" both call a lone qualifier ("arguably", "in many ways", "to some extent") a human habit, and a small local frequency count found no signal either way. A pile of them makes every claim sound unsure, so only the second one in a piece scores, at weak tier. Moved out of strong `hedge` on 2026-10-31; stacks ("might arguably") still score as `hedge-stacking`.
**Before → After:**
- "Arguably the launch went fine. In many ways it was early. To some extent we were lucky." → "The launch went fine, two weeks early, helped by a quiet news cycle."
**The rule (positive form):** keep the one qualifier the evidence needs, and make it precise.

### Clipped cadence (`clippedCadence`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter (10+ sentences) · **False-positive risk:** moderate
**Why it's slop:** when 40% or more of the sentences run eight words or fewer, the prose reads as a row of punches. It is the cadence an agent produces when told to "vary length" by cutting, and human edits of agent drafts went the other way, mostly lengthening the short sentences. Calibrated on a private set of human-edited drafts (not published), none of which reached 40%. Feeds `stylometricCluster`.
**Before → After:**
- "We shipped it. It broke. We fixed it. Users came back. Churn fell." → "We shipped it, it broke, and the fix took two days; within a month the users who had left were back and churn was down."
**The rule (positive form):** join related clauses as often as you cut; keep a short sentence where it lands a new fact.

### Rhetorical-question run (`rhetoricalRun`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter, under `--genre linkedin|x` only · **False-positive risk:** low in posts
**Why it's slop:** three questions in a row ("Why does this matter? What does it mean for teams? Where do we go from here?") stage a reveal instead of making the point. Elsewhere a run of questions can be an honest agenda, so the rule is genre-gated.
**Before → After:**
- "Why does this matter? What does it mean for teams? Where do we go from here?" → "Teams that skip churn interviews lose the cheapest data they will ever get."
**The rule (positive form):** ask one question you will answer, or answer it.

---

## Structural

Document shape and formatting tells: how the piece is laid out and where it announces itself.

### Meta commentary (`meta-commentary`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "in this post we'll cover", "let me walk you through" describes the writing instead of doing it.
**Before → After:**
- "In this post, we'll cover three ways to cut churn." → "Cut churn by fixing the first-week experience."
- "Let me walk you through the architecture." → "The architecture has three services: ingest, score, serve."
**The rule (positive form):** say the thing; never announce that you are about to say it.

### Signposted conclusion (`signposted-conclusion`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "in conclusion", "to sum up" restate what the reader just read; the closer is prime real estate spent on a recap.
**Before → After:**
- "In conclusion, I'm confident I'd be a great fit." → "I'd start by fixing the checkout drop-off you flagged in your Q2 letter."
- "To sum up, these trends will shape the market." → "Watch pricing: two competitors just moved to usage-based."
**The rule (positive form):** end on the strongest concrete point or the next action.

### Closing tautology (`closing-tautology`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "this shows why X matters", "these results demonstrate" asserts significance the evidence should have already made obvious.
**Before → After:**
- "These results demonstrate the importance of testing." → "The rollback rate fell to zero after we added the smoke tests."
- "This proves that design matters." → "Redesigning the form lifted completion from 40% to 71%."
**The rule (positive form):** let the evidence stand; if the point landed, no announcement is needed.

### Template section header (`template-header`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** the header names the section's ROLE instead of its content. "Final Thoughts" tells the reader where they are in a template; it tells them nothing about what the section says, and it is interchangeable across every piece ever written.
**Before → After:**
- "## Final Thoughts" → "## Why we chose Postgres over DynamoDB"
- "## Key Takeaways" → "## The three numbers that decided it"
- "## Why This Actually Works" → "## The cache invalidation trick"
**The rule (positive form):** a header should be the most specific true sentence about what follows — readable on its own in a table of contents.
**Note:** anchored to markdown heading syntax, so body prose ("my final thoughts are in the doc") never fires. `TL;DR` is deliberately not on the list: it is a genuine human convention, not a template tell.

### Bold-first bullets (`boldFirstBullets`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** every list item formatted `**Keyword**: sentence` (or `**Keyword:** sentence`, the colon-inside form matched since 2026-10-31) is a near-ubiquitous generated-markdown shape almost nobody hand-writes for a whole list.
**Before → After:**
- "**Security**: we encrypt at rest. **Performance**: we cache reads. **Scale**: we shard by tenant." → "We encrypt at rest, cache reads, and shard by tenant."
**The rule (positive form):** write the bullets as prose, or vary the formatting so it does not scan as a template.

### Content duplication (`duplication`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low (for verbatim repeats)
**Why it's slop:** a sentence or paragraph repeated verbatim later in the piece is a dead giveaway of unedited output that lost the thread.
**Before → After:**
- Paragraph 3 and paragraph 17 are word-for-word identical. → Keep one; cut the repeat.
**The rule (positive form):** each paragraph earns its place with new information; say it once.

### Paragraph uniformity (`paragraphUniformity`)
**Tier:** weak · **Family:** Structural · **Detection:** linter · **False-positive risk:** moderate (disciplined writers also keep steady lengths)
**Why it's slop:** every paragraph running 3–4 sentences is machine rhythm; human writing varies. Corroborating only; flag as part of a cluster.
**Before → After:**
- Five paragraphs, each exactly three sentences. → A one-line paragraph for the key point, a longer one for the evidence behind it.
**The rule (positive form):** vary paragraph length on purpose; let some be a single line.

### Bold overuse (`boldDensity`)
**Tier:** weak · **Family:** Structural · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** bolding many terms per hundred words is mechanical emphasis that reads as generated highlighting.
**Before → After:**
- "A **leveraged buyout** uses **debt financing** to acquire a **target company**." → "A leveraged buyout uses debt to acquire a target company."
**The rule (positive form):** reserve bold for the one phrase that genuinely needs emphasis.

### Title Case headings (`titleCaseHeadings`)
**Tier:** weak · **Family:** Structural · **Detection:** linter · **False-positive risk:** moderate (house styles vary)
**Why it's slop:** Title Case On Every Heading is a generated-document default; most writers use sentence case unless a house style says otherwise.
**Before → After:**
- "## The Impact Of Technology On Modern Business" → "## How the new API changed our onboarding"
**The rule (positive form):** use sentence case for headings, and defer to the venue's style guide when it specifies.

### One-point dilution (`one-point-dilution`)
**Tier:** judgment · **Family:** Structural · **Detection:** judgment (not linted) · **False-positive risk:** low-moderate
**Why it's slop:** a single thesis restated many ways to fill length; the 800-word idea padded to 4,000.
**Before → After:**
- Eight paragraphs circling "talk to your customers". → One paragraph plus a concrete technique the reader can use tomorrow.
**The rule (positive form):** compress to the strongest statement of the point and cut the rephrasings.

### Fractal summaries (`fractal-summaries`)
**Tier:** judgment · **Family:** Structural · **Detection:** judgment (not linted) · **False-positive risk:** low-moderate
**Why it's slop:** preview, then content, then recap at every nesting level: tell-them-what-you'll-tell-them repeated recursively.
**Before → After:**
- "In this section we'll explore X. [content] As we've seen, X." → The content alone.
**The rule (positive form):** one summary per document at most; trust the reader.

### Writing about the document (`self-narration`)
**Tier:** weak · **Family:** Structural · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** humanizer §25. Text that says what it replaced, how it was assembled, or how it is laid out ("was added to replace", "anything unconfirmed is flagged rather than guessed", "the table below compares") describes itself instead of its subject. Weak, because a change log legitimately says what replaced what.
**Before → After:**
- "This function was added to replace the previous approach of iterating through all items." → "This function looks items up by key, so it runs in constant time."
**The rule (positive form):** describe the subject; keep a caveat only if it changes what the reader should do.

### Fragment run (`broetry`)
**Tier:** weak · **Family:** Structural · **Detection:** linter, under `--genre linkedin|x` only · **False-positive risk:** moderate
**Why it's slop:** three or more sentences in a row of five words or fewer ("I got fired. On a Tuesday. No warning."), whether on one line or one per paragraph, is the LinkedIn "broetry" shape and the X "choppy fragments" tell. Short paragraphs as such are not flagged: common posting practice is a line break every one or two sentences.
**Before → After:**
- "I got fired.\n\nOn a Tuesday.\n\nNo warning." → "I was let go on a Tuesday, with no warning, three weeks after a strong review."
**The rule (positive form):** merge the fragments into one sentence that carries the fact.

### Markdown heading in an X post (`social-heading`)
**Tier:** strong · **Family:** Structural · **Detection:** linter, under `--genre x` only · **False-positive risk:** low
**Why it's slop:** X renders no markdown, so "## The Problem" in a post is a pasted document, not a post.
**Before → After:**
- "## The Problem\nTeams ship too slowly." → "Most teams ship too slowly because every change waits on one reviewer."
**The rule (positive form):** make the heading a sentence or delete it.

### Heading restated (`heading-restated`)
**Tier:** judgment · **Family:** Structural · **Detection:** judgment (not linted) · **False-positive risk:** n/a
**Why it's slop:** humanizer §24. The first sentence under a heading repeats the heading ("## Performance" → "Speed matters.").
**Before → After:**
- "## Performance\nSpeed matters. When users hit a slow page, they leave." → "## Performance\nPages that take over two seconds lose a third of visitors."
**The rule (positive form):** start each section with its first new fact.

### Narrating the work (`process-narration`)
**Tier:** judgment · **Family:** Structural · **Detection:** judgment (not linted) · **False-positive risk:** n/a
**Why it's slop:** humanizer §25 at paragraph scale: an account of how the document was researched, sourced or organized that the reader did not need. The phrase-level form is linted as `self-narration`.
**Before → After:**
- "To prepare this summary I reviewed each vendor's pricing page and cross-checked the figures." → "Vendor A charges $12 a seat; vendor B charges $9 with a 50-seat minimum."
**The rule (positive form):** keep a source credit the reader can follow; cut the story of how you worked.

---

## Rhetorical

Argument and persuasion moves that inflate, tease, or borrow authority.

### Significance inflation (`significance-inflation`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** "pivotal moment", "cannot be overstated", "indelible mark", "testament to" frame routine work as world-historical.
**Before → After:**
- "This marks a pivotal moment that cannot be overstated." → "This is our first release to clear one million daily users."
- "Her work left an indelible mark on the field." → "Her paper is cited in three of the four leading textbooks."
**The rule (positive form):** state the specific, bounded fact and let the reader judge its size.

### Assertion in place of evidence (`assert-dont-prove`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** declaring a thing obvious, instead of showing it. "History is clear", "the truth is simple", "make no mistake" borrow the cadence of a proven point without paying for one — and they appear most often exactly where the evidence is missing.
**Before → After:**
- "The truth is simple: remote work wins." → "Our remote team shipped 30% more features in 2025 than the year we were in-office."
- "History is clear on platform shifts." → "Every platform shift since 1995 took roughly a decade to reach half of users."
- "Make no mistake, this is a turning point." → "This is the first quarter self-serve outsold enterprise."
**The rule (positive form):** delete the assertion and lead with the evidence. If you have none, you have no claim yet — go get the fact.
**Note:** distinct from `hedge`, which under-claims, and from `significance-inflation`, which inflates a fact rather than substituting for one.

### Acknowledge-and-dismiss (`despite-challenges`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "despite these challenges, it continues to thrive" raises a problem only to wave it away with vague optimism.
**Before → After:**
- "Despite its challenges, the initiative continues to thrive." → "The rollout hit two outages; both are fixed, and usage is back above launch levels."
- "Despite these challenges, the future looks bright." → "The next blocker is billing; we expect a fix by June."
**The rule (positive form):** engage the challenge with specifics, or omit it.

### False suspense (`false-suspense`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "here's the kicker", "here's what most people miss" promises a revelation and delivers something ordinary.
**Before → After:**
- "Here's the kicker: it runs on a Raspberry Pi." → "It runs on a Raspberry Pi."
- "Here's what most people miss about caching." → "Caching the auth check saved 60% of database calls."
**The rule (positive form):** lead with the actual point; the fact is the hook.

### Rhetorical setup (`rhetorical-setup`)
**Tier:** lexical · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** moderate (genre-noisy — fiction and film writing use "plot twist" straight)
**Why it's slop:** phrase-led wind-ups ("What if I told you…", "Plot twist:", "Riddle me this") tee up a revelation instead of stating it. The self-answered "Question? Answer." form of this device is covered separately by `self-posed-qa`.
**Before → After:**
- "What if I told you the launch already slipped?" → "The launch slipped to June."
- "Plot twist: nobody tested the migration." → "Nobody tested the migration."
- "Here's a fun fact: retention doubled after we cut onboarding to four steps." → "Retention doubled after we cut onboarding to four steps."
**The rule (positive form):** drop the wind-up and lead with the fact; the fact is the hook.

### Vague attribution (`vague-attribution`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "studies show", "experts agree" sources a claim to nobody in particular.
**Before → After:**
- "Studies show remote teams are more productive." → "Stanford's 2015 Ctrip trial found remote workers 13% more productive."
- "Experts agree this is the future." → "Gartner projects 40% of teams will adopt this by 2027."
**The rule (positive form):** name the source, or delete the claim.

### Futurism opener (`imagine-opener`)
**Tier:** strong · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "Imagine a world where..." invites the reader into a hypothetical utopia instead of stating a fact.
**Before → After:**
- "Imagine a world where every tool just works." → "Our onboarding takes eleven clicks; three of them fail."
- "Picture a company where meetings never run long." → "We cut standup from 30 minutes to 8 by posting updates in a thread."
**The rule (positive form):** open on a concrete fact or claim.

### False range (`false-range`)
**Tier:** weak · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** high (real ranges exist)
**Why it's slop:** "from X to Y" where the endpoints sit on no real spectrum ("from innovation to implementation to transformation") fakes breadth.
**Before → After:**
- "From innovation to implementation to transformation, we do it all." → "We design the feature, build it, and support it after launch."
- "Everything from strategy to execution." → "We set the roadmap and ship it."
**The rule (positive form):** name the actual items without the range frame.

### Invented concept label (`invented-label`)
**Tier:** weak · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** high (real coinages exist)
**Why it's slop:** coining "the supervision paradox", "the acceleration trap" presents a pseudo-analytical term as established fact.
**Before → After:**
- "This is the supervision paradox in action." → "Managers who review every commit slow the team more than they catch bugs."
- "Beware the acceleration trap." → "Teams that add scope every sprint miss more deadlines."
**The rule (positive form):** describe the mechanism plainly; only name a concept if you define and earn it.

### Dead metaphor (`dead-metaphor`)
**Tier:** judgment · **Family:** Rhetorical · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** one metaphor worked five or more times across a piece collapses into noise ("the ecosystem feeds the ecosystem to build ecosystem value").
**Before → After:**
- "The ecosystem needs ecosystems to build ecosystem value." → "Each new plugin brings developers, who build more plugins."
**The rule (positive form):** introduce a metaphor once, use it, move on.

### Historical/brand analogy stacking (`analogy-stacking`)
**Tier:** judgment · **Family:** Rhetorical · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** rapid-fire famous-company analogies fabricate authority ("Apple didn't build Uber. Facebook didn't build Spotify.").
**Before → After:**
- "Apple didn't build Uber. Facebook didn't build Spotify. Stripe didn't build Shopify." → "We're doing for logistics what Stripe did for payments: one API instead of ten integrations."
**The rule (positive form):** use one apt, specific analogy you can defend.

### Mirrored metaphor / aphorism cosplay (`mirrored-metaphor`)
**Tier:** judgment · **Family:** Rhetorical · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** motivational-poster reversals ("success isn't a destination, it's a journey") sound deep and say nothing.
**Before → After:**
- "Success isn't a destination, it's a journey." → "We review goals every quarter and cut what isn't working."
- "Culture isn't what you say, it's what you do." → "We publish every postmortem, names included."
**The rule (positive form):** if it would fit on a poster, delete it and state what you actually do.

### Staged run-up (`staged-runup`)
**Tier:** lexical · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** humanizer §4. "Let's dive into", a "Here's what you need to know." that ends its line, a sentence-initial "Honestly?", "Let's be honest:" announce a point instead of making it. Only the standalone run-up fires: "Here's what you need to know before Monday: the badge office opens at 8", "Let's be honest with the customer" and "Did I enjoy it, honestly?" are ordinary (review, 2026-10-31).
**Before → After:**
- "Let's dive into how caching works in Next.js. Here's what you need to know." → "Next.js caches each route's output until you revalidate it."
- "Is it worth the price? Honestly? It depends." → "It is worth it if you use it weekly."
**The rule (positive form):** delete the run-up and start with the point.

### Arguing with no one (`phantom-objection`)
**Tier:** lexical · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** humanizer §5. "A tempting approach would be…", "I'm not arguing that…", "This isn't mainly about…" rebut an objection nobody raised, usually left over from an earlier draft. "To be clear", "I'm not saying", "Don't get me wrong" and "This is not to say" are left out as everyday speech.
**Before → After:**
- "A tempting approach would be to rotate tokens by restarting the auth service, but that would drop every session. Rotation happens in place." → "Tokens rotate in place, so active sessions survive."
**The rule (positive form):** keep an objection only when you name who holds it and answer it in full.

### Saying that sounds deep (`deep-saying`)
**Tier:** weak · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** humanizer §3. "The real question is…", "What really matters is…", "Efficiency becomes a trap" sound profound and assert nothing a reader can check. Weak, corroboration only, since the review found ordinary uses ("The real question is whether finance will fund the second team"); "is the language of", "is the currency of" and "the heart of the matter" were dropped because "The yen is the currency of Japan" is literal.
**Before → After:**
- "The real question is whether teams can adapt." → "Two of the five teams missed the migration date."
**The rule (positive form):** state the claim the saying gestures at, with its evidence.

### Corrective framing (`corrective-framing`)
**Tier:** weak · **Family:** Rhetorical · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** Wikipedia's mid-2026 sign. "Should be treated as X rather than Y" and "does not establish that" tell the reader how to classify a claim in place of showing the evidence. Weak, corroboration only: legal and statistical prose uses both plainly ("should be treated as a floor rather than an estimate").
**Before → After:**
- "Claims about its suspension should be treated as religious tradition rather than as an archaeological explanation." → "The suspension story appears in two 19th-century travel accounts and no excavation report."
**The rule (positive form):** say what the source shows, and stop.

### Arguing with no one, paragraph scale (`unprompted-defense`)
**Tier:** judgment · **Family:** Rhetorical · **Detection:** judgment (not linted) · **False-positive risk:** n/a
**Why it's slop:** humanizer §5 beyond the phrase list: whole paragraphs that rebut an objection or reject an option nobody proposed. Several in a row is a stronger sign than one.
**Before → After:**
- "Some will say we should have built this in-house. That would have taken a year." (nobody said so) → delete; keep the reason you chose the vendor.
**The rule (positive form):** answer objections the reader actually holds, and name who holds them.

---

## Tonal

Register and stance problems: the prose adopts a voice (chatbot, brochure, hype) that does not fit published writing.

### Application boilerplate (`application-boilerplate`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "I am writing to apply", "to whom it may concern", "I would welcome the opportunity" are decades-old letter formulae that carry zero information about you or the role.
**Before → After:**
- "I am writing to express my interest in the operations role. I would welcome the opportunity to contribute." → "Your Q2 letter named checkout drop-off as the top priority; I cut a similar drop-off 22% at Acme."
- "I am confident that I would be a perfect fit." → "I've shipped three billing systems; yours is the problem I want next."
- "I hope this finds you well. I came across your profile." → "Your talk on eval harnesses matched a problem I'm solving now."
**The rule (positive form):** open with a specific claim about this company and this role.

### Era/context opener (`era-opener`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "In today's fast-paced world", "In the ever-evolving landscape of..." buys time with scene-setting that establishes nothing.
**Before → After:**
- "In today's fast-paced digital world, companies must adapt." → "Three of your five competitors shipped AI search this quarter."
- "In the ever-evolving landscape of fintech..." → "Card fraud rose 18% last year; here is what changed."
**The rule (positive form):** cut the preamble and open on the specific fact.

### Chatbot register leakage (`chat-leakage`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** "happy to help", "would you like me to", "let me know if you'd like me to", "I hope this helps" (demoted here from fatal 2026-07-15 — humans write it in email too) is assistant politeness that does not belong in published prose.
**Before → After:**
- "I'd be happy to help you draft the announcement. Let me know if you'd like me to expand." → Publish the announcement; drop the offer.
- "Would you like me to add more detail here?" → Add the detail or leave it out; the meta-question goes.
**The rule (positive form):** publish the content, not the offer to produce it. (Plain human closers like "let me know if you have questions" are fine; only assistant-offer phrasings are the tell.)

### Engagement bait (`engagement-bait`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "let that sink in", "read that again", "this changes everything" spends credibility to manufacture attention.
**Before → After:**
- "We cut costs by 90%. Let that sink in." → "We cut costs 90%, from $50K to $5K a month."
- "This changes everything." → "This removes the manual approval step entirely."
**The rule (positive form):** let the substance earn the attention; delete the instruction to be impressed.

### Patronizing analogy (`patronizing-analogy`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** "think of it as...", "it's like a..." hand-holds an expert audience with an unrequested metaphor.
**Before → After:**
- "Think of it as a highway system for your data." → "The bus routes events from producers to subscribers."
- "It's like a Swiss Army knife for marketers." → "It handles email, ads, and analytics in one place."
**The rule (positive form):** explain the concept directly; reach for a metaphor only when the reader actually needs one.

### Hype multiplier (`ten-x-hype`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "10x your productivity" promises an unbacked multiple in place of a real result.
**Before → After:**
- "10x your productivity with this one trick." → "This shortcut saves about an hour a week on reports."
- "10x your team's output." → "This cut our release cycle from two weeks to two days."
**The rule (positive form):** replace the multiplier with the specific, bounded result.

### Outreach boilerplate (`outreach-boilerplate`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** stock openers and closers for a letter or message to someone who owes you nothing: "I hope this message finds you well", "I just wanted to reach out", "I came across Northwind", "I've been following your journey", "I look forward to the opportunity", "Thank you for your time and consideration", "Let's circle back". The reader has seen each one hundreds of times, and each delays or replaces the reason you wrote. The regex sibling of `application-boilerplate`, whose exact strings missed every variant. A plain one-sentence statement of interest ("I'd love the chance to talk it through") is NOT this pattern; reusing the same closer across many letters is, and that is a corpus-level check.
**Before → After:**
- "Hi Sarah, I hope this message finds you well! I came across Northwind and I've been following your journey since the seed round." → "Hi Sarah, saw the ops hire go up."
- "I just wanted to reach out about the platform role. Looking forward to hearing from you!" → "The platform role is the job I've done for three years: I moved Acme's billing off the monolith in six weeks. Worth fifteen minutes?"
**The rule (positive form):** the first clause names why you are writing to this person; the last line is one specific ask, alone. Delete the formula; nothing replaces it.

### Permission-seeking hedge (`permission-hedge`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "I was wondering if", "would it be possible to", "no pressure at all", "feel free to let me know", "hope you don't mind", "if you're open to it", "in case it got lost", "sorry to bother you". Distinct from `hedge`, which softens a claim: these ask the reader's permission to have written at all, before the message has said anything worth standing on. Bare "if", "but", "just", and "might" are ordinary English and are deliberately not matched; banning them sands off voice.
**Before → After:**
- "Just following up on my previous message in case it got lost. No pressure at all, but feel free to let me know either way!" → "Following up once. The billing rebuild I mentioned took six weeks; I can walk you through it, or I can leave it here. Either is fine."
- "I was wondering if it would be possible to set up a call if you're open to it." → "Worth fifteen minutes on Thursday?"
**The rule (positive form):** make the ask plainly, or give the reader a clean exit ("If you'd rather not, say so and I'll apply cold"). Never apologize for writing.

### Horoscope test (`horoscope`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** prose that could have been written by anyone, for anyone: vague claims and universal advice that pass find-and-replace unchanged. This is the whole-document test to run first.
**Before → After:**
- "Great leaders inspire their teams to achieve more." → "Our lead posts the on-call postmortem publicly, so the same outage never repeats."
- "We are committed to delivering excellence for our customers." → "We refund automatically the moment an SLA is missed — no ticket required."
**The rule (positive form):** inject what only this author, company, or moment could produce: tools, dates, metrics, named projects, opinions not everyone shares.

### Un-tailored content (`genericness`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** low-moderate
**Why it's slop:** the top recruiter complaint: text that could go to any company unchanged. The "why them" survives a find-and-replace of the name.
**Before → After:**
- "I admire your company's commitment to innovation and excellence." → "Your decision to open-source the eval harness is why I want to work here — I've built against it for six months."
- "Your product is a leader in the space." → "Your Postgres-over-Kafka bet is the architecture I'd have chosen; I want to help scale it."
**The rule (positive form):** put at least one fact per section that only applies to this specific reader.

### Forced positivity (`forced-positivity`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** moderate (enthusiastic humans exist)
**Why it's slop:** everything is exciting and beneficial; no stance, no tension, no cost named.
**Before → After:**
- "Everything about this launch is exciting and beneficial." → "The launch hit its signup goal; retention is still below target."
- "We're thrilled about every part of the roadmap." → "The billing rebuild is the risky bet; if it slips, Q3 slips."
**The rule (positive form):** take a position and name the tension. CAUTION: in applications and self-assessments, never "fix" forced positivity by inserting self-deprecating gap admissions; that is a different failure, not a repair.

### Manufactured personality (`manufactured-personality`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** performed quirkiness or forced informality that does not match the author ("Confession: I'm a total spreadsheet nerd, yes really!").
**Before → After:**
- "Confession: I'm a total spreadsheet nerd (yes, really!)." → "I rebuilt our forecast model; it now flags churn a month out."
**The rule (positive form):** less imitation, more inhabitation; if a line feels performed, pull it back.

### False vulnerability (`false-vulnerability`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** moderate
**Why it's slop:** polished, risk-free "honesty" that performs self-awareness ("This is not a rant; it's a diagnosis").
**Before → After:**
- "This isn't a rant; it's a diagnosis." → State the diagnosis; drop the frame.
- "And yes, I'm openly obsessed with this product." → "I've used it daily for two years; here's the one feature I'd change."
**The rule (positive form):** remove the meta-commentary and let the substance carry the sincerity.

### Stock proclamation (`stock-proclamation`)
**Tier:** lexical · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "The future is here", "Welcome to the future" proclaim instead of claim. ("The game has changed" was dropped on review: sports writing uses it literally.) From the social-post item list; applies in every genre.
**Before → After:**
- "AI agents now write the first draft of every spec. The future is here." → "AI agents now write the first draft of every spec on our team; review takes ten minutes."
**The rule (positive form):** end on the fact that made you want to write it.

### Engagement-bait closer (`social-closer`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter, under `--genre linkedin|x` only · **False-positive risk:** low in posts
**Why it's slop:** "Agree?", "Thoughts?", "Drop it in the comments", "Follow for more" ask for nothing specific, so they rarely draw a real reply. A specific question ("Which field would you cut first?") and a comment-gated lead magnet ("Comment CHECKLIST and I'll send it") stay clean. In an email, "Thoughts?" is a fine close, so the rule is genre-gated.
**Before → After:**
- "Roadmaps are a promise you cannot keep.\n\nAgree?" → "Roadmaps are a promise you cannot keep. Which date on yours would you defend in public?"
**The rule (positive form):** end on one question the reader can answer, or on your strongest fact.

### Formula hook (`hook-formula`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter, first line only, under `--genre linkedin|x` · **False-positive risk:** low in posts
**Why it's slop:** "I'm thrilled to announce", "Unpopular opinion:", "Here's what I learned", and an opening question are the stock LinkedIn hooks, and the house default is no opening question. An essay may open with a question, so the rule is genre-gated.
**Before → After:**
- "I'm thrilled to announce that our new support portal is live." → "Our new support portal opens Monday for 1,400 customers on the Pro plan."
**The rule (positive form):** write five first lines of 110 characters or fewer and keep the one that states something only you could.

### Invented detail (`invented-detail`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** n/a
**Why it's slop:** a number, name, quote, source, ranking or anecdote that is not in the source or the author's notes. The recipe's specificity rule invites it unless the fact has to come from somewhere; a fake "last week a junior colleague asked me…" is the LinkedIn failure readers forgive least. Humanizer states the same rule.
**Before → After:**
- "Last week a junior colleague asked me a question that stopped me in my tracks." (it didn't happen) → state the point without the story, or use one that did.
**The rule (positive form):** diff facts both ways against the source; if a fact is missing, write the plainer sentence or ask.

### Re-explaining what the reader knows (`re-explaining`)
**Tier:** judgment · **Family:** Tonal · **Detection:** judgment (not linted) · **False-positive risk:** n/a
**Why it's slop:** humanizer §26. A reply that restates the problem, the diagnosis and the evidence the other person already has, with the decision in the last line.
**Before → After:**
- "As you noted, the merge leaves pipeline_id stale… [four sentences of their own findings] …so I'll open a ticket." → "I'll open a separate ticket for MergeService; the fallback here can stay until then."
**The rule (positive form):** lead with the decision and add only what the reader does not have.

---

## Mechanical

Markup and artifact tells. The three fatal entries are near-certain proof of unedited machine output; any single hit fails the piece.

### Machine artifact (`machine-artifact`)
**Tier:** fatal · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** near-zero
**Why it's slop:** "as an AI language model", "my knowledge cutoff", search-tool residue (`oaicite`, `oai_citation`, `turn0search`) is proof of raw model output pasted without a read.
**Before → After:**
- "As an AI language model, I don't have personal opinions, but here's a summary." → Delete the line; write the summary.
- "The study found X oai_citation turn0search3." → "The study found X." Remove the artifact and verify the source resolves.
**The rule (positive form):** remove the artifact and re-review the whole piece; its presence means nothing was proofread.

### Leftover placeholder (`placeholder`)
**Tier:** fatal · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** near-zero (scope narrowed 2026-07-15: only unambiguous placeholder cues fatal — `[insert…]`, `[add…]`, `[todo]`, `[Your Name]`-style compounds, `…here`, `{{var}}`; bare bracketed words like "[title]" in ordinary prose no longer auto-fail. 2026-07-16: re-admitted a curated NAMED set of bare single-word slots — `[Company]`, `[Role]`, `[Name]`, `[Title]`, `[Date]`, `[City]`, `[Team]`, `[Manager]` — these exact bracketed nouns are template conventions, not prose; guards exclude markdown links `[x](url)`/`[x][`/`[x]:`, code access `df[Date]`, inline code `` `[Date]` ``, Obsidian wiki-links `[[Company]]`, footnotes `[1]`, `[sic]`, and checkboxes `[x]`/`[ ]`)
**Why it's slop:** an unfilled template slot (`[insert accomplishment here]`, `{{name}}`, "add numbers here", "lorem ipsum", a bare `[Company]`/`[Name]` slot) in a submitted document is an instant reject.
**Before → After:**
- "I increased revenue by [X]% at [Company Name]." → "I increased revenue 22% at Acme."
- "Dear [Name], I'm applying to [Role] at [Company]." → "Dear Ms. Okafor, I'm applying to Staff Engineer at Acme."
- "Dear {{hiring_manager}}," → "Dear Ms. Okafor,"
**The rule (positive form):** fill every slot with a real value before the piece leaves your hands.

### Chatbot opener (`chat-opener`)
**Tier:** fatal · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** near-zero
**Why it's slop:** "Great question!", "Certainly!", or an acknowledgement followed by an offer of content ("Absolutely! Here's an email you can send…", "Of course! Here are three options…", "Below is…", "I've rewritten…") opening the document, a paragraph, or the line under a heading or subject line betrays copy-paste straight from a chat window. (2026-10-31: courtesy words alone never fire, so "Of course, we shipped it on Friday…", "Sure, I'll be there at 3", "Of course, I'd be happy to introduce you" and "Great question. We priced it per seat…" stay clean.)
**Before → After:**
- "Great question! Here are the top three considerations." → "The top consideration is data residency."
- "Certainly, I can help with that." → Delete; answer the question.
**The rule (positive form):** open on the answer; delete the acknowledgement and re-review the piece.

### Em-dash density (`emDashDensity`)
**Tier:** strong · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** n/a as a shipping rule (see note)
**Why it's slop:** perception, not authorship. Readers now read "—" as AI-generated even when it isn't, so shipped prose carries the cost either way. (As a DETECTION signal about someone else's text, the em-dash remains the weakest tell — see detection-guide. This entry is a shipping policy, set 2026-07-15.)
**Before → After:**
- "The plan — which we drafted in March — has three parts — each with a lead — and ships in June." → "We drafted the plan in March. It has three parts, each with a lead, and ships in June."
- "We shipped it — and it broke." → "We shipped it. And it broke."
**The rule (positive form):** at most one em-dash per document (attribution lines "— Name" exempt; a spaced en dash " – " counts as a dash since 2026-10-31; ranges such as "2019–2021", "Monday – Friday" and "9 – 5" do not); replace every other one by role: aside → commas or parentheses, definition → colon, interruption → period, list-explanation → semicolon.

### Exclamation density (`exclamationDensity`)
**Tier:** strong · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** low (one per piece is always free; markdown images and `!=` are skipped)
**Why it's slop:** one exclamation mark is a choice. Two or more in a piece sent to someone who owes you nothing reads as eager, and as generated: the stock outreach drafts that motivated this rule carried two to four each.
**Before → After:**
- "Hi again! Just following up! Let me know either way!" → "Following up once."
- "Excited to share our launch! It's live today!" → "Our launch is live today."
**The rule (positive form):** keep at most one exclamation mark per piece; end the rest with a period and let the content carry the energy.

### Unicode decoration (`unicodeDecoration`)
**Tier:** weak · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** low (single curly apostrophes — contractions, possessives — are ignored as of 2026-07-15; arrows, bullets, and curly double quotes still flag)
**Why it's slop:** decorative unicode — arrows (→), styled bullets (•), emoji list markers, styled letters — in plain professional prose reads as machine output.
**Before → After:**
- "Input → Processing → Output" → "Input, processing, output."
- "• Ships Monday • Owned by Dana" → "Ships Monday, owned by Dana."
**The rule (positive form):** use ASCII: a straight hyphen for a dash, straight quotes, plain list markers.

### Latin sidebar (`latin-sidebar`)
**Tier:** weak · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** "e.g.," and "i.e.," at density are a bookish default where a plain English word reads better.
**Before → After:**
- "Use a fast store (e.g., Redis)." → "Use a fast store like Redis."
- "the primary owner (i.e., the on-call engineer)" → "the primary owner, meaning the on-call engineer."
**The rule (positive form):** write "like" or "such as" for examples, "meaning" or "specifically" for restatements.

### Source-availability disclaimer (`source-disclaimer`)
**Tier:** strong · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** a retrieval chatbot that found nothing says so ("not extensively documented in readily available sources", "in the provided sources", "based on available information") and then guesses, often adding that a person "maintains a low profile" (matched only after a speculation verb, "suggesting she maintains a low profile"; "The firm maintains a low profile in the press" is a plain fact). Humanizer §23 and Wikipedia's words to watch. Not matched: "not publicly available until Q3" (a release date), "not well documented" (a human complaint), "widely available" (a product claim).
**Before → After:**
- "While details about the company's founding are not extensively documented in readily available sources, it appears to have been established in the 1990s." → "The company was founded in 1994 (state business registry)." — or leave the founding date out.
**The rule (positive form):** state what you know with its source; leave out what you don't.

### Emoji list markers (`emojiBullets`)
**Tier:** weak · **Family:** Mechanical · **Detection:** linter (2+ lines) · **False-positive risk:** low-moderate
**Why it's slop:** humanizer §20 and the social-post item "emoji-filled list": "✅ Ship small / ✅ Measure retention" or "🚀 **Launch Phase:**" decorates a list instead of writing it. © ® ™ are not counted. Weak since review: human release notes and checklists use ✅ markers too.
**Before → After:**
- "✅ Talk to users weekly\n✅ Ship small\n✅ Measure retention" → "Talk to users every week, ship in small pieces, and watch retention."
**The rule (positive form):** use plain markers or a sentence.

### Hashtags over the cap (`hashtagDensity`)
**Tier:** strong · **Family:** Mechanical · **Detection:** linter, under `--genre linkedin|x` only · **False-positive risk:** low
**Why it's slop:** the house default allows three to five hashtags or none; six or more reads as reach-farming. Change `maxAllowed` in `data/patterns.mjs` if your venue differs.
**Before → After:**
- "#Product #AI #Leadership #Startups #Growth #SaaS" → "#Onboarding #CustomerSuccess #SaaS"
**The rule (positive form):** three to five specific hashtags, or none.

### Emojis over the cap (`emojiDensity`)
**Tier:** strong · **Family:** Mechanical · **Detection:** linter, under `--genre linkedin|x` only · **False-positive risk:** low
**Why it's slop:** the house default allows three emojis per post; more stand in for words. Change `maxAllowed` in `data/patterns.mjs` if your venue differs.
**Before → After:**
- "Shipped 🚀 Tested ✅ Measured 📈 Celebrated 🎉" → "We shipped, tested and measured the billing page this week. 🎉"
**The rule (positive form):** at most three, none in place of a word.

---

## Stylometric texture

Added 2026-07-15, adapted from conorbronsdon/avoid-ai-writing (MIT). These measure statistical texture, not vocabulary, so they survive synonym-swapping and lexicon decay — they exist to catch "laundered" slop that passes every word list. Each is weak/corroborating alone; the cluster rule escalates. Whole-document math: no before/after pairs apply — the remediation is always cadence work (vary sentence and paragraph lengths, openings, punctuation rhythm). The linter's texture report prints each measurement with its human reference range.

### Function-word trigram entropy (`trigramEntropy`)
**Tier:** weak · **Family:** Stylometric · **Detection:** linter · **False-positive risk:** low at the 0.82 threshold (real prose measures 0.85–0.97 in calibration)
**Why it's slop:** LLM sampling collapses onto a narrow set of grammatical templates; the function-word skeleton repeats. Human range ~0.85–0.95 normalized.
**The rule (positive form):** vary clause shapes — move subordinate clauses, split and merge sentences, change what sentences start with.

### Cross-paragraph burstiness (`crossParaBurstiness`)
**Tier:** weak · **Family:** Stylometric · **Detection:** linter · **False-positive risk:** low-moderate (disciplined human prose can run ~0.08–0.13; flag is <0.08)
**Why it's slop:** AI is flat *across* paragraphs — every paragraph has the same internal sentence-length rhythm. Humans put terse paragraphs next to discursive ones.
**The rule (positive form):** let paragraphs differ in rhythm on purpose; one-line paragraphs are legal.

### Punctuation distribution (`punctDistribution`)
**Tier:** weak · **Family:** Stylometric · **Detection:** linter · **False-positive risk:** low (calibrated human prose measures CV 0.35–1.42; flag is <0.25)
**Why it's slop:** AI holds punctuation density steady across paragraphs; human writers swing between dense and sparse.
**The rule (positive form):** punctuate by need, not by rhythm; some paragraphs deserve none of it.

### Vocabulary diversity (`lowTtr`)
**Tier:** weak · **Family:** Stylometric · **Detection:** linter (MATTR, window 100 — length-stable, unlike raw TTR) · **False-positive risk:** low at 0.55 (human calibration 0.74–0.82)
**Why it's slop:** the same category words recycle instead of specifics being named.
**The rule (positive form):** name the specific thing each time a category word tempts you.

### Smart-punctuation co-occurrence (`smartPunctSignature`)
**Tier:** weak · **Family:** Stylometric · **Detection:** linter · **False-positive risk:** moderate — any writer drafting in Word/Docs with careful habits can hit all four; corroborating only
**Why it's slop:** curly quotes + em-dash + Oxford comma + zero typos *together* is a paste-from-LLM signature. Any one alone means nothing.
**The rule (positive form):** none — this is detection-only corroboration; fix whatever else flagged.

### Bypass-tool characters (`bypassNormalization`)
**Tier:** strong · **Family:** Stylometric · **Detection:** linter · **False-positive risk:** low (a single leading BOM is excluded; web copy-paste can rarely carry zero-widths)
**Why it's slop:** zero-width characters, Cyrillic/Greek homoglyphs, and *roleplay-action* markers are the fingerprints of AI-humanizer bypass tools; humans do not type them.
**The rule (positive form):** re-type the text cleanly from your own keyboard.

### Stylometric cluster (`stylometricCluster`)
**Tier:** strong · **Family:** Stylometric · **Detection:** linter (emergent — fires when ≥3 texture signals co-occur) · **False-positive risk:** low (requires three independent signals)
**Why it's slop:** clean vocabulary with machine rhythm is still machine writing; the co-occurrence is the reliable signal single metrics can't give.
**The rule (positive form):** rework cadence wholesale — sentence lengths, paragraph shapes, openings, punctuation rhythm — then re-measure.

## Appended from observed failures

New patterns land here, each with a date, when the skill misses a slop pattern in real use. New entries come from observed failures only, never from imagination, and follow the same fixed schema as the entries above. Existing entries are never rewritten; if the machine-detectable form changes, it belongs in `data/patterns.mjs` first, and this section documents the judgment context around it.

### 2026-08-12 — the contracted two-sentence reveal was never detected

**Observed failure:** `"It's not about speed. It's about accuracy."` — this catalogue's own headline example for `antithesis` — matched no regex in `data/patterns.mjs` at all. It fell between three patterns that each required something the sentence lacked: p1 needs a comma or dash separator, p3 needs an uncontracted "isn't", p6 needs an uncontracted "is not". The gap survived the 2026-08-02 widening because that pass was verified by reading, and it was found within minutes of the fixture existing.

**Judgment context:** this is the argument for `evals/`, not just for one more regex. The family's *most common* shape was invisible for the entire life of the rule while the catalogue documented it as covered. Coverage claims about regex sets are not verifiable by eye. Run `evals/eval-antithesis.mjs` before and after any change to a contrast pattern, and treat a passing read-through as no evidence.

### 2026-08-12 — the budget contradicted itself

**Observed failure:** `SKILL.md` said "cap at one per piece"; the linter charged 2 points per hit against a ship target of 2, so one deliberate contrast consumed the whole budget and two failed the document outright. Effective policy was zero tolerance.

**Judgment context:** zero tolerance is what produces the flattened, voiceless output the skill's own restraint section exists to prevent. Real human-written sentences turned out to use corrective negation repeatedly and legitimately — every instance corrects a belief the reader actually holds. Sentences of the same shapes, written for this repo, are now `LEGIT` and `CLEAN` fixtures precisely so no future widening can flag them. `CONTRAST_FAMILY` gives the first device a free pass; the keep-test, which no regex can run, decides the rest.

### 2026-10-14 — outreach formulae scored 0

**Observed failure:** `application-boilerplate` is an exact-string lexicon, so "I hope this finds you well" fired and "I hope this message finds you well" did not; "I came across your profile" fired and "I came across Northwind" did not. Thirteen common outreach openers and closers scored 0 one by one, and two whole stock messages (a follow-up after silence and a referral ask, from yashasvishailly/job-search-writing-rules, MIT) scored 0 end to end. Cold DMs, follow-ups, and referral asks usually ship without a render gate, so the linter is often the only mechanical check they get.

**Judgment context:** the fix is two regex rules (`outreach-boilerplate`, `permission-hedge`) and a one-free `exclamationDensity`, held to `evals/eval-outreach-patterns.mjs`. Two candidate bans were rejected after checking them against human-written letters. "I'd love the chance to talk it through" is a common human close, so a plain one-sentence statement of interest stays legal; what is a tell is the same closer across many letters, which only a corpus check can see. And the source list's blanket ban on "if", "but", "just", and "I think" would flag ordinary connected prose ("That said", "But" as an opener), the over-correction the restraint section warns against. Only phrases that ask permission to have written are matched.

### 2026-10-31 — 100% on the fixture, 21% outside it

**Observed failure:** a comparison against blader/humanizer, Wikipedia's "Signs of AI writing" and the skill's own social-post item list ran the contrast family over 33 real contrast sentences and caught 7. The fixture still scored 100%, because every regex had been fitted to it. A hyphen inside X broke the headline shape ("It's not just a weight-loss drug, it's…" scored clean; "a weight loss drug" fired). The same pass found human prose failing outright: "Of course, we shipped it on Friday…" was FATAL "Chatbot opener", three sentences opening with "The" cost a strong 3 points, and a word mentioned inside inline code scored as a use. It also found the linter catching 14 of 42 humanizer "before" passages and 8 of 24 social-post items: the staging tells (run-ups, phantom objections, deep sayings, closers, source disclaimers) and every post-specific tell were missing.

**Judgment context:** a fixture you tune against stops measuring once the regexes fit it, so `evals/holdout/` holds real contrast sentences and real human prose that no rule may be tuned against, reported by `evals/eval-holdout.mjs` before and after every change. Three proposals were settled by evidence rather than adopted: `punctVariety` (a low share of ; : ( )) was rejected because a private set of human-edited drafts (not published) used those marks no more often than agent drafts did, so it would flag human style; resetting `anaphora` at blank lines was rejected because identical slide or paragraph openings are a tell, and requiring two matching words after "The" or "This" fixes the "The…" false positive on its own (one- and two-letter starters such as "It" stay excluded, as in 1.x); and bare "Y rather than X" stays unmatched because technical prose uses it constantly. Post-specific rules are genre-gated (`--genre linkedin|x`) so that "Thoughts?" in an email and a one-line paragraph in a memo are untouched.
