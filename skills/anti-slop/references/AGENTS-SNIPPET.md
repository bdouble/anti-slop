# AGENTS.md snippet — anti-slop for Codex and other non-Claude runtimes

Codex (and most non-Claude agents) have no skill metadata preload, so the
trigger and the core recipe must live inline in your `AGENTS.md`. Paste the
block below into the `AGENTS.md` of any project (adjust the path to wherever
this skill folder lives — a git submodule, a vendored copy, or an absolute
path).

---

```markdown
## Writing prose (anti-slop)

When writing or editing any prose a human will read (emails, docs, posts,
cover letters, summaries, PR descriptions), or when asked to "de-slop",
"tighten", "make it sound human", or "remove the AI tone":

1. Write by this recipe from the first sentence:
   - The first sentence carries the most specific claim available. No
     scene-setting preambles.
   - Every claim resolves to something checkable (number, name, date, tool).
     An evaluative label is a slot where evidence should be.
   - Plain copulas: things "are", they never "serve as".
   - One idea per sentence; vary sentence length widely; fragments are legal.
   - Contrast ("not X, it's Y"), triads, dashes, metaphors: at most one
     deliberate use of each per piece.
   - State the positive; end on substance, never a summary.
   - Match confidence to evidence: precise caveats, no hedge phrases.
2. Before finishing, read `<path-to-anti-slop>/references/pattern-catalogue.md`
   and remove every pattern it names from the draft.
3. Run the deterministic linter and fix findings by tier (FATAL immediately,
   strong as edits, weak as corroboration only):
   `node <path-to-anti-slop>/scripts/slop-lint.mjs <file>`
   Ship at score ≤2 with zero FATALs.
4. Apply the two judgment tests the linter cannot run: the horoscope test
   (could anyone have written this, for anyone?) and genericness (would it
   survive find-and-replace of the subject's name?).
```

---

Notes:

- The linter is a plain Node CLI with zero dependencies; it needs only
  `node >= 18`. It reads its patterns from `data/patterns.mjs` next to it.
- Genre-specific shapes (cover letter, email, LinkedIn, resume bullets) are in
  `references/genre-recipes.md` — reference it the same way when the task is
  one of those genres.
- Keep references one level deep: point AGENTS.md at files in this folder
  directly; do not chain references.
