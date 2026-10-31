# Held-out set: real contrast sentences

Never tune a regex against this file. The tuning fixture is
`evals/fixtures/negative-parallelism.md`; this one only measures whether a
change generalizes. `evals/eval-holdout.mjs` reports recall and false-positive
rate on it, and the labels were fixed on 2026-10-31 before any rule changed.
When a case here exposes a miss you want to fix, copy the sentence into the
tuning fixture and add a fresh real sentence here, so the set stays unseen.

Same format and labels as the tuning fixture (`LABEL | id | text`):

- `KILL`: the negated half names something no reader claimed. Recall.
- `LEGIT`: a real contrast that passes the keep-test (a technical correction, an
  aphorism). Reported, never scored.
- `CLEAN`: no contrast construction. Any match is a false positive.

Ids starting `rather-` are the bare "Y rather than X" form, which the linter
deliberately does not match (it is ordinary English in technical prose). The
eval reports recall with and without them.

License: this file is NOT covered by the repository's MIT license. Each line
stays under its source's license, listed below and in full in
`THIRD_PARTY_NOTICES.md` at the repo root. The file as a whole is shared under
CC BY-SA 4.0 because it contains Wikipedia text.

Sources, all real text and none written for this file:

- `wiki-*`: AI-generated examples quoted in Wikipedia's "Signs of AI writing"
  (2026-10-31 revision) that appear in no tuning fixture. Text © Wikipedia
  contributors, CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/),
  from https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing; unchanged
  except markup removed. Three rows that also appeared in a tuning passage
  were removed on review (2026-10-31).
- `pod-*`: AI-generated podcast transcripts shipped as sample output in
  souzatharsis/podcastfy (Apache-2.0, Copyright 2024 Tharsis T. P. Souza).
- `ace-*`: ace-step/ACE-Step-1.5 docs (MIT). `sc-*`: ScrapeCreators/
  social-media-research-skills (MIT). `bfl-*`: black-forest-labs/skills (MIT).
  `ldr-*`, `ldr2-*`: LearningCircuit/local-deep-research docs (MIT; `ldr2-*`
  added on review, 2026-10-31, as real technical negations). `sma-*`: example posts in
  langchain-ai/social-media-agent (MIT). (The `kok-*` aphorism rows from hexgrad/kokoro were
  removed on 2026-10-31: the source carries no copyright line to cite.)
- `strunk-*`: William Strunk Jr., The Elements of Style (1918), public domain.
- `npm-*`: READMEs of debug, minimatch, js-yaml, retry (MIT/BlueOak).
- `wikied-*`: editor-written prose of the same Wikipedia page (CC BY-SA 4.0).

## Cases

KILL | wiki-miata | The "Black Hole Edition" is not just a meme — it's a celebration of grassroots car culture, where ideas are limitless and fun is more important than spec sheets.
KILL | wiki-hawaii | Preserving this endemic species is vital not only for ecological diversity but also for sustaining the cultural traditions connected to Hawaii's native flora.
KILL | wiki-kusama-constitutes | Self-Portrait by Yayoi Kusama, executed in 2010 and currently preserved in the famous Uffizi Gallery in Florence, constitutes not only a work of self-representation, but a visual document of her obsessions, visual strategies and psychobiographical narratives.
KILL | wiki-blindly | Blindly cutting content risks not only violating these policies but also diminishing the quality and integrity of the article.
KILL | wiki-instead | The solution should not be to simply cut large sections of content without proper research and verification. Instead, a careful and methodical approach should be taken to ensure that the article remains accurate.
KILL | pod-ukiyo | It's more than just pretty pictures; it's a mirror reflecting the ephemeral nature of life, beauty, and, well, everything!
KILL | pod-keyword | So, it's less about a new product, more about grabbing that sweet, sweet keyword: 'chat'.
KILL | pod-reading | Whoa. So it's not just reading the text aloud, it's actually understanding it and creating a discussion?
KILL | pod-summarizing | So it's not just summarizing; it's creating engaging conversations.
KILL | pod-painting | It's not just about a painting or a song, right? It's about the story behind it.
KILL | pod-podcastfy | Well, unlike some other tools out there, Podcastfy isn't just about summarizing research. It's about creating a dynamic, bespoke audio experience from a multitude of sources.
KILL | pod-buzzword | Oh, it's not just a buzzword, my friend. It's revolutionizing how computers understand us.
KILL | pod-intelligence | It's not just about raw intelligence, it's about the messy reality of implementation.
KILL | pod-franklin | So, Franklin's autobiography, right? It's not just about his life, but how the story itself came to be.
KILL | pod-mini-program | It's like, you're not just asking a question, you're crafting a mini-program.
KILL | pod-regulation | So, it's not about being anti-regulation, it's about being pro- effective regulation.
KILL | pod-algorithm | So, not just a clever algorithm, but a thoughtful communicator.
KILL | pod-journey | It's not about the outcome, it's about the journey, the choices we make along the way.
KILL | pod-safeguards | And it's not just about building the technology, but building the safeguards too.
KILL | pod-ethics | And it's not just about technical solutions, but also about the ethical considerations and societal implications.
KILL | pod-intentional | It's not intentional, just a consequence of complex interactions within the model.
KILL | ace-bug | This isn't a bug, it's the nature of things.
KILL | ace-servant | At this point, AI is not a servant to you, but an inspirer.
KILL | ace-lyrics | Lyrics do double duty in ACE-Step. They're not just words — they tell the AI how the song should be structured over time.
KILL | ace-loop | Not a loop, not a beat — a complete song with vocals, instruments, and structure.
KILL | ace-randomness | Randomness is an essential characteristic of AI music generation, not a bug, but a feature.
KILL | ace-jukebox | Think of it as a creative collaborator, not a jukebox.
KILL | ace-caption | Caption is a starting point, not an endpoint.
KILL | sc-routing | This is not just endpoint routing. The goal is to give your AI agent complete research workflows it can run across TikTok, Instagram, YouTube, and more.
KILL | sc-views | The goal is not just to sort by views. The goal is to identify posts that performed unusually well for that creator or brand, then explain the repeatable patterns.
KILL | sc-outcome | Workflow-first, API-second — users ask for a business outcome, not an endpoint.
KILL | bfl-quarter-turn | A quarter-turn is not a safe fallback for a rotation shot, it is an invisible one.
KILL | bfl-usable | Add one motivated event so the result is not merely attractive but usable.
KILL | rather-bfl-reflections | Reflections work best as active physical participants rather than generic gloss.
KILL | sma-rag | RAG isn't just embeddings. It's a complex system that needs constant refinement.
KILL | sma-perfection | It's not about perfection. It's about creating a learning system that compounds over time.

LEGIT | ace-cloud | It's not a cloud service. It runs on your machine.
LEGIT | ace-daw | It's not a DAW. It doesn't replace Ableton, Logic, or FL Studio.
LEGIT | ace-fine-tunes | Side-Step supports training on community fine-tunes, not just the official turbo/base/sft.
LEGIT | ace-platforms | This validation applies on all platforms, not just Windows, to keep presets portable.
LEGIT | rather-ace-guidance | These parameters are guidance rather than precise commands.
LEGIT | sc-artifact | Each workflow produces a useful artifact, not just raw JSON.
LEGIT | sc-baseline | Judge performance against a creator's own normal performance, not only raw vanity metrics.
LEGIT | bfl-duration | `duration` is a tempo control, not a length estimate.
LEGIT | bfl-preview | The preview should represent a typical result, not a best-of-fifty cherry-pick.
LEGIT | ldr-hygiene | Missing dispose at exit is hygiene, not a leak.
LEGIT | ldr-denylist | The guard is a denylist, not an allowlist: it blocks cloud metadata endpoints.
LEGIT | ldr-regression | A faster search that picks different cuts is a regression, not an optimisation.
LEGIT | ldr-stall | Planning time on a complex brief is normal, not a stall.
LEGIT | ldr-commit | Explain what and why, not just what changed.
LEGIT | ldr-checklist | Don't just check boxes, verify each item.
LEGIT | strunk-action | A time not for words, but for action.
LEGIT | wikied-descriptive | Moreover, this list is descriptive, not prescriptive; it consists of observations, not rules.
LEGIT | wikied-signs | The patterns listed here are also only potential signs of a problem, not the problem itself.
LEGIT | ldr2-semantic | Semantic search lets users find research by meaning, not just title keywords.
LEGIT | ldr2-timeout | It bounds each connect, write and wait for the next response chunk individually; it is not a cap on the total duration of a response.
LEGIT | ldr2-reviewer | A reviewer that errors out (rather than returning a verdict) never counts as a "fail"; it just shows a note in its section.
LEGIT | ldr2-dropdown | Fix the model dropdown in Settings to populate for every auto-discovered LLM provider, not just Ollama / OpenAI / Anthropic / OpenAI-Compatible-Endpoint.
LEGIT | rather-ldr2-fraud | Community predatory lists occasionally flag mainstream high-volume open-access publishers, typically because of rapid-publication or fee-structure concerns rather than actual fraud.

CLEAN | strunk-on-time | He was not very often on time.
CLEAN | strunk-latin | He did not think that studying Latin was much use.
CLEAN | strunk-sorry | It was not long before he was very sorry that he had said what he had.
CLEAN | strunk-members | All the members were not present.
CLEAN | strunk-heart | However discouraging the prospect, he never lost heart.
CLEAN | strunk-place | I had never been in the place before; so I had difficulty in finding my way about.
CLEAN | strunk-america | America had vast resources, but she seemed almost wholly unprepared for war. But within a year she had created an army of four million men.
CLEAN | strunk-shrew | Shakespeare does not portray Katharine as a very admirable character, nor does Bianca remain long in memory as an important character in Shakespeare's works.
CLEAN | strunk-gold | Gold was not allowed to be exported.
CLEAN | strunk-courses | There were several less important courses, but these were the most important, and although they did not come every day, they came often enough to keep you in such a state of mind that you never knew what your next move would be.
CLEAN | npm-debug-tty | Due to the way `debug` detects if the output is a TTY or not, colors are not shown in child processes when `stderr` is piped.
CLEAN | npm-minimatch-mean | This does not mean that the pattern string can be used as a literal filename, as it may contain magic glob characters that are escaped.
CLEAN | npm-minimatch-foo | Thus, `foo*` will not match `foo/bar` in this library, even though it would in `fnmatch(3)`.
CLEAN | npm-jsyaml-schema | So, the JSON schema is not as strictly defined in the YAML specification.
CLEAN | npm-jsyaml-keys | If true, then duplicate keys in a mapping will override values rather than throwing an error.
CLEAN | npm-retry-deprecated | This is an alias for `retryOperation.attempt(fn)`. This is deprecated. Please use `retryOperation.attempt(fn)` instead.
CLEAN | ldr-rejected | Symlinks whose target is missing or is a directory, submodule gitlinks and other non-regular entries are rejected rather than skipped.
CLEAN | ldr-listener | This setting does not control the web listener.
CLEAN | ldr-password | Your password is never stored, and notification settings cannot be recovered without it.
CLEAN | ace-git | The update check is silently skipped if git is not available.
CLEAN | ace-perfect | It's not perfect every time. Expect to generate several versions and pick the best.
CLEAN | ace-google | Essentially, it's not much different from searching on Google or finding songs on Spotify.
CLEAN | wikied-not-all | Not all text featuring these indicators is AI-generated, as the large language models that power AI chatbots are trained on human writing, including Wikipedia.
CLEAN | wikied-criterion | A high percentage of detected AI writing from the results of a detection tool is not a valid criterion for speedy deletion under G15.
CLEAN | wikied-reverse | However, this is a lagging and patchwork process, and the reverse is not true: LLM output is not becoming more similar to that of human writing.
CLEAN | wikied-literally | This section is to be taken as literally as possible: a word being overused by AI does not imply that its synonyms are also overused.
CLEAN | wikied-promotional | Note: Not all promotional or spammy writing is AI-generated.
CLEAN | wikied-hallucinations | These may resemble AI hallucinations (and should be fixed regardless), but they generally are not.
CLEAN | wikied-boilerplate | These are not the same as the predefined boilerplate comments included in many templates, such as Infobox company, despite occasional resemblances.
CLEAN | wikied-cutoffs | While these are not hard cutoffs, they should give you a rough idea of how earlier vs later LLM output reads.
CLEAN | wikied-unusual | It is unusual for a human edit summary to include mention of material that was not edited or things that they didn't do.
CLEAN | wikied-merely | Please do not merely treat these signs as the problems to be fixed; that could just make detection harder.
CLEAN | wikied-belong | Advice about formatting or language to avoid can be found in the policies and guidelines and the Manual of Style, but does not belong on this page.
CLEAN | ldr2-openlibrary | Open Library is free and does not require an API key.
CLEAN | ldr2-filter | This filters what is imported; changing it does not remove items already imported.
CLEAN | ldr2-retry | Applies to OpenAI-compatible and Anthropic SDKs; the Ollama client does not retry.
CLEAN | ldr2-gate | Entries are lazy and retained; releasing a call's gate does not remove its entry.
CLEAN | ldr2-optin | Without the opt-in, such a send is refused as a security block and is not retried.
