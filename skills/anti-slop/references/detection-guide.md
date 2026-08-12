# Detection Guide

Last updated: 2026-07-15

This guide governs how much weight a finding carries and what action it justifies. It is the guardrail that keeps the skill a remediation tool, not an accusation engine. Detection scores; it never verdicts.

## Score, don't verdict

No single lexical or punctuation feature reliably proves machine origin. The reliable signal is a *cluster* of tells plus low burstiness plus emptiness: many independent hits, not one loud one. Weigh a basket of features and require multiple independent hits before treating a text as machine-written. When in doubt, remediate the prose; do not label the author.

## Reliability tiers and the action each justifies

Findings carry a tier from `data/patterns.mjs`. Act by tier, not by count:

- fatal: machine artifacts and unfilled placeholders (`machine-artifact`, `placeholder`, `chat-opener`). Near-zero false positives. Any single hit fails the piece; fix it before anything else, then re-review the whole document.
- strong: structural constructions reliable at density (antithesis, trailing participials, era openers, signposted conclusions, low burstiness). Treat each as an edit to make.
- lexical: word and phrase lists (AI-signature words, buzzwords, adverbial bloat). Real signal, but time-decaying and genre-noisy. Treat as an edit to consider; confirm the word is empty in context before cutting.
- weak and info: paragraph uniformity, starter monotony, zero contractions. Corroboration only. Never act on a weak finding alone; it counts only inside a cluster. (Em-dash density moved to strong on 2026-07-15 — as a *shipping policy*, not a detection signal; see the myth section for the distinction.)

Ship target: total score of 2 or below, with zero fatals.

## The em-dash myth (worked example of a bad standalone tell)

Models do use em-dashes more than the average writer, and academic em-dash use climbed after late 2022. It is still the weakest actionable tell, for three reasons: one line of prompt instruction removes it, so it is trivially defeated; many skilled human writers use dashes constantly; and detectors weight punctuation lightly — stripping every em-dash from AI text moves a detector score only a few points. So the dash is corroborating evidence at most, never a basis for a judgment about someone else's text.

**Detection posture vs shipping policy (2026-07-15):** the two deliberately run in opposite directions. Judging *incoming* text, the em-dash stays weak — never accuse on it. Shipping *our own* text, the linter enforces at most one per document at strong tier, because readers apply the folk heuristic whether or not it is valid: a legitimate dash still costs credibility with a reader who pattern-matches it to AI. The shipping rule prices in perception risk, not authorship evidence.

## Red herrings: never flag on their own

Each of these is produced by careful human writers as often as by models. On their own they mean nothing:

- perfect grammar and no typos
- absence of contractions
- academic vocabulary in isolation ("delve", "unpack", "ascertain")
- em-dashes
- the rule of three (a cornerstone of good human rhetoric)

Use them only to corroborate a cluster already flagged by stronger tells.

## The durable tells (survive word-swapping and prompt tweaks)

These persist because they are structural, not lexical:

- low burstiness: sentences clustered at a uniform 15 to 20 words with the same shape. The single most durable statistical signal.
- structural constructions at density: "not just X but Y", hedged preambles, tidy three-beat filler lists, generic closers, all appearing repeatedly.
- sentence-starter monotony: an excess of sentences opening with The/This/It/In.

When these cluster, the text reads machine-written regardless of which words it uses. This is where remediation effort pays off.

The stylometric tier (2026-07-15) automates this class of signal: function-word trigram entropy, cross-paragraph burstiness, punctuation-distribution CV, MATTR vocabulary diversity, and the smart-punctuation co-occurrence signature, plus a bypass-normalization pre-pass that both defeats and flags humanizer evasion tricks. Each is weak alone; three or more together produce a strong `stylometricCluster` finding. The linter's texture report prints every measurement with its human reference range even when nothing flags, so cadence can be steered by number.

## Lexicons decay: date cohorts and quarterly review

The word list is a moving target. "Delve" and "intricate" spiked after ChatGPT, then *fell* around early 2024 once the tell was publicized and models trained away from it. Vocabulary shifts in cohorts (2023–mid-24: delve/tapestry/testament; mid-24–mid-25: showcasing/underscore; later: emphasizing/highlighting). So every lexicon in `data/patterns.mjs` carries a `dateCohort`, and the file sets a review interval. Review the lexical tells quarterly, bump the review date, and append new observed words rather than rewriting the list. A lexicon-only detector ages fast; the structural tells above do not.

## Human ceiling, detector error, and what it means for action

Humans do no better than chance at spotting AI writing in general; only heavy LLM users approach ~90%, and recruiters who *claim* 20-second detection are self-reporting, likely overconfident. Automated detectors wrongly flag human writing as AI 12–26% of the time, and they disproportionately misflag non-native English and highly formal prose. Real applicants have been rejected on false positives.

The implication is a hard rule: **never accuse, always remediate.** Do not tell a user their text "is AI" or that a detector will catch it. Fix the prose (add specificity, concrete detail, personalization, varied cadence) because that is what genuinely improves it and what no detector penalizes. The durable win is better writing, not a passing detector score. Triads and similar devices get minimized rather than zeroed, so genuine voice is not flattened; em-dashes are the deliberate exception — the shipping policy allows one per document because reader perception punishes them regardless of authorship.
