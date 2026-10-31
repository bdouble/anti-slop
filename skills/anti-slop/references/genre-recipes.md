# Genre Recipes

Last updated: 2026-10-14

Each genre below is a positive contract: what the output IS — its shape, length, opening, closing, and register. Write to the contract from the first sentence; do not draft freely and clean up after. The pattern catalogue (`pattern-catalogue.md`) names what to cut; these recipes name what to build.

**These are generic defaults.** They set structure and register, not personal voice. When a byline voice skill (e.g. a `<byline>-voice` skill) or a venue house-style guide applies, it wins any conflict with this file — layer it on top. The cover-letter and resume-bullet contracts are grounded in current recruiter and ATS practice; the rest are general craft.

## Contents

- [Professional email](#professional-email)
- [Executive email / update](#executive-email--update)
- [Cover letter](#cover-letter)
- [LinkedIn post](#linkedin-post)
- [Long-form essay / blog](#long-form-essay--blog)
- [Resume bullets](#resume-bullets)
- [Short bio](#short-bio)
- [Recruiter / networking message](#recruiter--networking-message)
- [Follow-up after silence](#follow-up-after-silence)
- [Referral ask](#referral-ask)
- [Application form answer](#application-form-answer)

---

## Professional email

- **Shape:** one ask or one piece of news, then the minimum context that supports it. Bullets only when listing 3+ discrete items.
- **Length:** under 150 words; most fit in five sentences.
- **Opening contract:** first sentence states the ask or the news. No "I hope this finds you well", no restating the thread.
- **Closing contract:** a specific next step with an owner and a date. A plain human sign-off is fine.
- **Register:** direct, warm, contractions on. One idea per sentence.

**Before → After:**
- "I hope you're doing well. I wanted to reach out because I've been thinking about the timeline we discussed, and I was wondering whether it might be possible to potentially revisit it." → "Can we move the launch to the 14th? QA found two blockers that need a week. I'll send the fix plan Thursday."

## Executive email / update

- **Shape:** bottom line first, then 2–4 bullets of support. Decision or status up top; detail only if it changes the decision.
- **Length:** under 250 words; a busy reader gets the whole point from the first two lines.
- **Opening contract:** the subject line names the decision or outcome; line one is the bottom line ("We should ship Tuesday" / "Q3 is on track, one risk").
- **Closing contract:** a specific ask with a deadline, or the single next action.
- **Register:** calm, matter-of-fact, high directness. Evidence stated plainly beats emphasis.

**Before → After:**
- "After a lot of discussion and analysis, the team has been working through the various considerations around the migration, and there are several factors at play that I wanted to walk you through before we get to a recommendation." → "Recommendation: delay the migration one sprint. Two of five services fail the load test. Fix is scoped, owner is Priya, done by the 20th. Need your sign-off to reset the date."

## Cover letter

- **Shape:** one central narrative — a company-specific problem you can solve, backed by proof. 3–4 short paragraphs, one page.
- **Length:** 250–400 words general; 200–300 for executive letters, tighter and every sentence signaling scope or judgment.
- **Opening contract:** lead with a specific quantified achievement or a company-specific observation. Never "I am writing to apply", "To Whom It May Concern", or a self-label ("results-driven", "perfect fit"). The observation is one sourced clause that sets up your claim, never a paragraph reciting what the company does; if you can't cite where a fact about their business came from (their posting, their post, a named article), it is a guess, so cut it or state it as a pattern of their stage.
- **Body contract:** open on their specific need, connect it to a relevant achievement of yours carrying a number, and land on one clear benefit to them. Two or three mapped outcomes, not a duties list.
- **Closing contract:** state the next step. No "looking forward to hearing from you."
- **Register:** confident, specific, first-person with contractions; at least one fact that only applies to this company.

**Before → After:**
- "I am writing to express my strong interest in the Director of Product role. I am a results-driven professional with a proven track record, and I believe I would be a perfect fit for your dynamic team." → "Your Q2 shareholder letter put checkout abandonment at the top of the fix list. I cut a 31% mobile-checkout drop-off to 12% at Acme in two quarters by rebuilding the payment step — the same pattern I'd start on here."

## LinkedIn post

- **Shape:** one claim, developed in short paragraphs. Tactical and purpose-driven, not a personal diary.
- **Length:** roughly 1,200–1,500 characters of effective content; the first ~140 characters show before the "see more" fold.
- **Opening contract:** line one is a concrete claim, a contrarian take, or a number that earns the click. No opening question, no stacked rhetorical questions, no "1, 2, 3 — here's why" listicle framing.
- **Closing contract:** a pointed final line that leaves a thought, or a low-friction, specific CTA. No "Agree? Let me know in the comments."
- **Register:** professional, plain, one to three sentences per paragraph. No personal or political content.
- **Hook procedure:** write five first lines (≤110 characters each), keep the one that states something only you could, and discard the rest. Then draft, then make one pass that cuts repetition and throat-clearing. Never shorten sentences for punch: a row of fragments is the broetry tell, and real authors lengthen clipped drafts.
- **Facts:** every number, name and anecdote comes from your notes or the source. A fake "last week a junior PM asked me…" story is the tell readers can least forgive; if the story did not happen, make the point without it.
- **Lint:** `slop-lint.mjs post.md --genre linkedin` (or `--genre x`) adds the post rules: formula hooks on line one, generic closers ("Agree?", "Thoughts?", "drop it in the comments"), fragment runs, three-question runs, more than five hashtags or three emojis. One-sentence paragraphs, a one-line close, a specific question and a comment-gated lead magnet stay clean.

**Before → After:**
- "Ever wonder why most product launches fail? 🤔 Here's the thing nobody tells you... (1) timing (2) messaging (3) luck. Let that sink in. Agree? 👇" → "Most launches I've seen fail on distribution, not the product. We built a good tool last year and shipped it to silence — until we spent two weeks seeding it in five communities first. Same product, 4x the signups. Build is table stakes; the launch is the work."

## Long-form essay / blog

- **Shape:** hook, then bottom line, then the strongest argument first with support building behind it. One thesis, developed — not restated.
- **Length:** as long as the idea earns; every section adds new information. No padding to a word count.
- **Opening contract:** open on the sharpest claim or a concrete scene. No "In today's world", no "In this post we'll cover."
- **Closing contract:** a pithy ending that circles back to the opening and leaves the reader something to think about. Never "In conclusion" or a recap of what they just read.
- **Register:** varied cadence — long explanatory sentences against short punches, occasional fragment for emphasis. Devices (dash, triad, metaphor) spent once each.

**Before → After:**
- "In today's rapidly evolving digital landscape, it's more important than ever to consider the profound impact of remote work. In this post, we'll explore three key ways it's changing everything." → "Remote work did not kill the office. It killed the commute, and the commute was doing more social work than anyone admitted."

## Resume bullets

- **Shape:** the XYZ shape, "accomplished X, as measured by Y, by doing Z": impact, then a number, then the method.
- **Length:** one to two lines each; the highest-value bullet first in each role (some parsers keep only the first).
- **Opening contract:** start with a strong, truthful action verb (drove, launched, scaled, cut, owned, defined). Never "Responsible for", "Helped with", "Worked on", "Tasked with."
- **Content contract:** every bullet carries a quantified result or a concrete scope/outcome. No pure duty statements, no self-praise ("proven track record"), no participial inflation ("...enhancing scalability and driving efficiency").
- **Register:** terse, concrete, past tense; scope in the reader's terms (revenue, users, headcount, time, cost) where truthful.

**Before → After:**
- "Responsible for leading a cross-functional team to drive various initiatives, leveraging best practices to enhance efficiency and deliver results." → "Led a 9-person team through a billing rebuild that cut failed payments 40% and recovered $1.2M in annual revenue."

## Short bio

- **Shape:** plain-language current role, then 2–3 specific outcomes, then a distinctive angle, then current focus.
- **Length:** two to four sentences for a byline bio; a paragraph at most.
- **Opening contract:** name what you do now in plain words. No "X is a passionate, results-driven thought leader" and no third-person throat-clearing that says nothing.
- **Closing contract:** end on current focus or how to engage — concrete, not a slogan.
- **Register:** third person, factual, one distinctive detail that only fits you. Ban "passionate", "results-driven", "thought leader", "evangelist".

**Before → After:**
- "Jordan Lee is a passionate, results-driven product leader and thought leader with a proven track record of driving innovation and delivering excellence across dynamic organizations." → "Jordan Lee runs product at Ravel, where the team took the API from 3 to 40 enterprise customers in 18 months. Before that she built the checkout at Honza. She writes about pricing and API design."

## Recruiter / networking message

- **Shape:** specific signal first, one line on what you're working on, one low-friction ask.
- **Length:** under 150 words; a cold message earns a reply by being short and specific.
- **Opening contract:** a specific, real reason for reaching out to this person. Never "I came across your profile" or "I'd love to pick your brain." One clause on how you found them is the ceiling: never describe their own company, product, funding, or thesis back to them. They were there.
- **Closing contract:** one concrete, easy-to-say-yes-to ask (a 15-minute call, one question, an intro). For recruiter replies, state your status plainly — open, not open, or open under conditions — plus band and fit.
- **Register:** warm, brief, direct; no filler pleasantries, no flattery that could go to anyone.

**Before → After:**
- "Hi! I came across your profile and was really impressed by your background. I'd love to connect and pick your brain about your career journey sometime if you're open to it!" → "Your post on migrating off Segment matched a problem my team is hitting now. I'm the PM on our analytics rebuild. Could I ask you two questions about how you handled the event backfill — happy to keep it to email or a 15-minute call."

## Follow-up after silence

- **Shape:** say once that it is a follow-up, add one thing the first message did not have, then give the reader a clean way out.
- **Length:** two to four sentences; shorter than the message it follows.
- **Opening contract:** name the role or thread in the first clause. Never "just following up", "just checking in", "circling back", or "in case it got lost".
- **Closing contract:** one specific next step, or an explicit exit ("or I can leave it here; either is fine"). A second follow-up takes a new angle; there is no third.
- **Register:** calm, unneedy. No apology for writing, no guilt framing, at most one exclamation mark (usually none).

**Before → After:**
- "Hello again! Just checking in on my note from last week in case it got buried. No pressure at all, and feel free to let me know if now is a bad time. Would love to connect if you have a few minutes!" → "Hi Marcus, one follow-up on the data-platform role. Since I wrote, our team cut nightly pipeline failures from twelve a week to one, which is the problem your posting describes. Happy to walk through how on a call, or I can leave it here."

## Referral ask

- **Shape:** the role and why it fits in one line, then a paste-ready blurb the referrer can forward unchanged, then an explicit out.
- **Length:** under 120 words including the blurb; the blurb itself is two lines.
- **Opening contract:** the specific posting (company, role, when it went up). Never "I hope you don't mind me reaching out."
- **Closing contract:** make saying no as cheap as saying yes ("If you'd rather not, say so and I'll apply cold"). Never make the referrer decide whether you fit; the blurb decides it for them.
- **Register:** warm, direct, low-cost to act on.

**Before → After:**
- "Hi Jordan! Hope you're doing well. I hope you don't mind me asking, but your team just posted an analytics role that looks like a match for my background. Would it be possible for you to put my name forward? It would mean a lot!" → "Hi Jordan, Lumen Labs posted a senior analytics role on Monday, and it is the work I have done for four years. Two lines you can forward as-is: I rebuilt a retail chain's demand forecast and cut stockouts 18%; I run SQL and dbt daily. If you would rather not refer me, tell me and I'll apply directly."

## Application form answer

- **Shape:** answer the literal question in the first sentence, give one proof, stop. No bonus material, no restating the question.
- **Length:** what the box asks for; when unbounded, two to four sentences.
- **Opening contract:** the answer itself. "Why do you want to work here?" opens on the reason, not on enthusiasm.
- **Closing contract:** none needed; the proof is the last sentence.
- **Register:** plain and specific; a sentence that would fit any company's form unchanged is cut.

**Before → After:**
- "I'm so excited about Fernway's mission and I truly believe my values align with the team's. I've always been passionate about logistics and would love to join such an innovative journey." → "Freight brokers lose margin when a load is re-booked by hand after a missed pickup. I built the re-booking flow at my last company and cut those hours by half. That is the problem I want to work on here."
