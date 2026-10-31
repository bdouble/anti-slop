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
   - Every claim resolves to something checkable (number, name, date, tool)
     taken from the source or the author. Never invent a number, quote,
     source, or personal experience; if the fact is missing, write the plainer
     sentence or ask. An evaluative label is a slot where evidence should be.
   - Plain copulas: things "are", they never "serve as".
   - One idea per sentence; vary length by joining related clauses as often
     as by cutting. A row of clipped fragments is a tell.
   - Contrast ("not X, it's Y"), triads, dashes, metaphors: at most one
     deliberate use of each per piece.
   - State the positive; end on substance, never a summary.
   - Match confidence to evidence: precise caveats, no hedge phrases.
2. Run the deterministic linter and fix findings by tier (FATAL immediately,
   strong as edits, weak as corroboration only):
   `node <path-to-anti-slop>/scripts/slop-lint.mjs <file>` (add
   `--genre linkedin` or `--genre x` for a post).
   Ship at gateScore ≤2 with zero FATALs; `--max 2` gates on it.
3. Look up each finding in
   `<path-to-anti-slop>/references/pattern-catalogue.md` for its rewrite. Fix
   what the findings and the recipe call for; do not strip every listed
   construction on sight (one deliberate contrast, triad or dash is legal, and
   flattening a real voice is its own failure).
4. Apply the two judgment tests the linter cannot run: the horoscope test
   (could anyone have written this, for anyone?) and genericness (would it
   survive find-and-replace of the subject's name?), then diff facts both
   ways against the source: an added claim is an error, a lost one too.
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
