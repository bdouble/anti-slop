# Trigger evals — anti-slop

Boundary contract: anti-slop fires for generic prose quality (both prevention
and remediation), any byline. It does NOT fire for code, machine-facing output,
or requests that are purely about a person's voice or a house style guide
(those skills may then invoke anti-slop themselves).

## Should trigger (12)

1. "Write a launch announcement for this feature — and none of that AI slop."
2. "De-slop this paragraph."
3. "Why does this sound like ChatGPT wrote it?"
4. "Make this email sound human."
5. "Tighten this up, it's full of fluff."
6. "Draft a cover letter for this JD." (prevention mode — prose a human reads)
7. "Review this blog draft — it opens with 'In today's fast-paced world'."
8. "Remove the corporate tone from this doc."
9. "This PR description reads like a robot wrote it. Fix it."
10. "Write my conference talk abstract." (prevention mode)

11. "Too many em-dashes in here, fix it."
12. "This is full of 'it's not just X, it's Y' — fix it."

## Should NOT trigger (10)

1. "Refactor this function." (code)
2. "Write a JSON schema for the config." (machine-facing)
3. "Add docstrings to these methods." (code comments)
4. "What's the difference between em and en dashes?" (reference question, no artifact)
5. "Translate this paragraph to Spanish." (translation, not quality editing)
6. "Fix the typos in this doc." (mechanical proofread only)
7. "Summarize this meeting transcript for my own notes." (machine-facing/self notes)
8. "Format this list as a markdown table." (formatting only)
9. "Write a commit message." (terse machine convention)
10. "Check this contract for legal risks." (analysis, not writing quality)

## Boundary cases (fire together with the named skill, anti-slop as the base layer)

- "Draft a LinkedIn post in my voice" → byline voice skill leads; anti-slop recipe still applies underneath.
- "Copyedit this to Every's style guide" → every-style-editor leads on mechanics; anti-slop patterns still banned.
