# Anti-Slop Pattern Catalogue

Last updated: 2026-08-12

This catalogue is derived from `data/patterns.mjs`. The .mjs file wins any conflict. It exists to give each machine-detectable pattern a plain-language rule and concrete before/after rewrites, so a writer can fix a finding by recipe instead of by synonym-swap. When the skill misses a new slop pattern in real use, append a new entry under "Appended from observed failures" with a date; never rewrite an existing entry, and never edit this file to disagree with the .mjs source.

Every id in `data/patterns.mjs` appears here once: the `LEXICONS`, `FATAL_LEXICON`, `FATAL_REGEX`, `REGEX_RULES`, `STATISTICAL`, and `JUDGMENT` collections. Entries are grouped by family and ordered within a family by tier (fatal, strong, lexical, weak, info, judgment). Each entry states its **Detection** as `linter` (the bundled `scripts/slop-lint.mjs` catches it) or `judgment (not linted)` (a `JUDGMENT` pattern the linter cannot see, so it needs the recipe pass and a human read).

Two representation notes, both faithful to the source:
- `JUDGMENT` patterns carry no `tier` field in `data/patterns.mjs`; they are marked **Tier:** judgment here rather than assigned a lint tier.
- `STATISTICAL` detectors carry no `family` field; each is filed under its taxonomy level (em-dash and unicode under Mechanical, burstiness and starters under Syntactic, paragraph/bold/heading/duplication under Structural). Their ids use the camelCase key from `data/patterns.mjs`; the linter prints kebab-case display names (e.g. `emDashDensity` → "em-dash density").

## Contents

- [Lexical](#lexical) — `self-praise` · `ai-signature` · `ai-cliche` · `corporate-buzzword` · `adverbial-bloat` · `watchlist` · `elegant-variation` · `over-correction`
- [Syntactic](#syntactic) — `hedge` · `copula-avoidance` · `antithesis` · `not-only-but-also` · `self-posed-qa` · `colon-reveal` · `countdown` · `dramatic-fragment` · `trailing-participle` · `sentenceUniformity` · `anaphora` · `overused-transition` · `wordy` · `concession-pivot` · `starterMonotony` · `contractionRate` · `rule-of-three-abuse`
- [Structural](#structural) — `meta-commentary` · `signposted-conclusion` · `closing-tautology` · `boldFirstBullets` · `duplication` · `paragraphUniformity` · `boldDensity` · `titleCaseHeadings` · `one-point-dilution` · `fractal-summaries`
- [Rhetorical](#rhetorical) — `significance-inflation` · `despite-challenges` · `false-suspense` · `rhetorical-setup` · `vague-attribution` · `imagine-opener` · `false-range` · `invented-label` · `dead-metaphor` · `analogy-stacking` · `mirrored-metaphor`
- [Tonal](#tonal) — `application-boilerplate` · `era-opener` · `chat-leakage` · `engagement-bait` · `patronizing-analogy` · `ten-x-hype` · `horoscope` · `genericness` · `forced-positivity` · `manufactured-personality` · `false-vulnerability`
- [Mechanical](#mechanical) — `machine-artifact` · `placeholder` · `chat-opener` · `emDashDensity` · `unicodeDecoration` · `latin-sidebar`
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

---

## Syntactic

Sentence-level constructions. Several are legitimate rhetorical figures used once; the tell is reflexive use and density.

### Hedge phrase (`hedge`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "it's worth noting", "at its core", "in many ways" is throat-clearing that delays the sentence that stands on its own.
**Before → After:**
- "It's worth noting that the API is rate-limited." → "The API allows 100 requests a minute."
- "In many ways, this is arguably the better approach." → "This approach wins on latency and costs the same."
- "It is important to note that adoption grew." → "Adoption grew 40% in March."
**The rule (positive form):** delete the preamble and start on the claim; if you need a caveat, make it precise ("in 7 of 10 cases").

### Copula avoidance (`copula-avoidance`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** "serves as", "stands as", "boasts", "operates as" inflate a plain "is" into a claim of significance the fact does not need.
**Before → After:**
- "The library serves as a central hub for logging." → "The library is where all logging goes."
- "The city boasts a thriving tech scene." → "The city has 200 funded startups."
- "This role stands as a testament to her growth." → "She was promoted twice in three years."
**The rule (positive form):** use the plain copula: things are what they are. (The linter allows two before flagging.)

### Negative parallelism / antithesis (`antithesis`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-at-density
**Why it's slop:** "it's not X, it's Y" negates a strawman to make an ordinary claim sound profound. One per piece is rhetoric; one per paragraph is a signature.
**Before → After:**
- "It's not about speed. It's about accuracy." → "Accuracy matters more than speed here."
- "We don't sell software, we sell outcomes." → "The software cuts your monthly close from ten days to three."
- "This isn't a setback, it's an opportunity." → "The outage cost a day; here is what we changed."
- "That's not a side effect of the ratio problem. It's the one real advantage it gives you." → "That's the one real advantage your ratio problem gives you." (two-sentence reveal, not just same-clause)
- "Not your direct concern for this migration, but a source of pattern intelligence." → "Outside this migration's scope, but useful pattern intelligence." (markdown/table-cell context)
- "The value is the question it raises, not the answer it gives." → "Its value is the question it raises." (mirrored trailing order)
**The rule (positive form):** state Y directly; keep the "not X" only when X is a real misconception the reader holds (the coffee test). Cap at one per piece.
**Family (2026-08-12):** this rule covers ten shapes of one tic, not one phrasing — additive · supplanting · never-form · stacked negation · verb-phrase · trailing appositive · question-form · degree-form · that-clause · point-form. Editors reliably catch the first and miss the rest. Full taxonomy, the three-question keep-test, five repairs keyed to *why* the negation appeared, and the legitimate-use gallery: `references/negative-parallelism.md`.
**Budget (2026-08-12):** the first contrast device in a document is free (`CONTRAST_FAMILY` in `data/patterns.mjs`, shared with `not-only-but-also`, `countdown`, and `colon-reveal`); every one after it scores. Scored flat, a single deliberate use had been consuming the entire ship target. The human baseline is not zero — Pangram measures ~3× the human *rate* in AI text, not presence versus absence.
**Two scope notes for anyone editing the regexes:** the trailing-appositive shape requires a determiner after "not" (this is what separates "a hypothesis, not a fact" from the bare contrastive tail real writers use, "grounded in architecture decisions, not slideware"), and the mirrored trailing order excludes number words after the determiner (quantity corrections such as "nine customers, not the twelve we planned" are arithmetic, not rhetoric). Both are asserted by `evals/fixtures/negative-parallelism.md`. Run `evals/eval-antithesis.mjs` before and after any change here.

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
**The rule (positive form):** vary length drastically: a 5-word sentence next to a 25-word one, a fragment for punch.

### Anaphora abuse (`anaphora`)
**Tier:** strong · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low-moderate (deliberate anaphora is a known device)
**Why it's slop:** three or more consecutive sentences opening with the same words reads as a template unless it is a deliberate, earned build.
**Before → After:**
- "They assume users will pay. They assume developers will build. They assume ecosystems will emerge." → "The plan assumes users pay, developers build on top, and an ecosystem follows — none of which has happened yet."
**The rule (positive form):** vary the openings, or merge the parallel items into one sentence.

### Overused transition (`overused-transition`)
**Tier:** lexical · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** moderate
**Why it's slop:** sentence-initial However/Moreover/Furthermore/Additionally/Nevertheless at density is formal connective tissue humans rarely stack.
**Before → After:**
- "Moreover, the results were strong. Furthermore, costs fell." → "The results were strong, and costs fell."
- "However, we shipped on time." → "But we shipped on time."
**The rule (positive form):** use "also", "but", "still"; the linter allows "however" once.

### Wordy construction (`wordy`)
**Tier:** weak · **Family:** Syntactic · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "due to the fact that", "in order to", "at this point in time" spend five words on one word's work.
**Before → After:**
- "We delayed the release due to the fact that the tests were failing." → "We delayed the release because the tests were failing."
- "In order to reduce cost, we conducted an analysis." → "To cut cost, we analyzed the invoices."
- "At this point in time we monitor it on a daily basis." → "We monitor it daily now."
**The rule (positive form):** compress to the single word (because, to, now).

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

### Bold-first bullets (`boldFirstBullets`)
**Tier:** strong · **Family:** Structural · **Detection:** linter · **False-positive risk:** low-moderate
**Why it's slop:** every list item formatted `**Keyword**: sentence` is a near-ubiquitous generated-markdown shape almost nobody hand-writes for a whole list.
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

---

## Tonal

Register and stance problems: the prose adopts a voice (chatbot, brochure, hype) that does not fit published writing.

### Application boilerplate (`application-boilerplate`)
**Tier:** strong · **Family:** Tonal · **Detection:** linter · **False-positive risk:** low
**Why it's slop:** "I am writing to apply", "to whom it may concern", "I would welcome the opportunity" are decades-old letter formulae that carry zero information about you or the role.
**Before → After:**
- "I am writing to express my interest in the PM role. I would welcome the opportunity to contribute." → "Your Q2 letter named checkout drop-off as the top priority; I cut a similar drop-off 22% at Acme."
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
**The rule (positive form):** take a position and name the tension. CAUTION: in job applications, never "fix" forced positivity by inserting self-deprecating gap admissions; that is a different failure, not a repair.

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
- "Dear [Name], I'm applying to [Role] at [Company]." → "Dear Ms. Okafor, I'm applying to Staff PM at Acme."
- "Dear {{hiring_manager}}," → "Dear Ms. Okafor,"
**The rule (positive form):** fill every slot with a real value before the piece leaves your hands.

### Chatbot opener (`chat-opener`)
**Tier:** fatal · **Family:** Mechanical · **Detection:** linter · **False-positive risk:** near-zero
**Why it's slop:** "Great question!", "Certainly!", "Absolutely!" at the start betrays copy-paste straight from a chat window.
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
**The rule (positive form):** at most one em-dash per document (attribution lines "— Name" exempt); replace every other one by role: aside → commas or parentheses, definition → colon, interruption → period, list-explanation → semicolon.

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

**Judgment context:** zero tolerance is what produces the flattened, voiceless output the skill's own restraint section exists to prevent. Real human drafts sampled from actual use turned out to use corrective negation repeatedly and legitimately — every instance corrects a belief the reader actually holds. Those sentences are now `LEGIT` and `CLEAN` fixtures precisely so no future widening can flag them. `CONTRAST_FAMILY` gives the first device a free pass; the keep-test, which no regex can run, decides the rest.
