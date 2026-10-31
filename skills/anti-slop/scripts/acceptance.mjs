#!/usr/bin/env node

/**
 * acceptance.mjs — how much of a draft the author shipped unchanged.
 *
 * A lint score is a proxy. The outcome that matters is whether the author kept
 * what was drafted. This compares a draft with the version that was actually
 * sent or posted and reports the share of drafted sentences that survived
 * verbatim. Only whitespace and quote style (curly vs straight) are ignored;
 * a capitalization or punctuation edit counts as a change. Sentences are
 * matched as a multiset, so a sentence drafted twice and kept once counts once.
 * `.html`/`.htm` files are reduced to their visible text first.
 *
 * Usage:
 *   node acceptance.mjs <draft> <final>                        One-line summary
 *   node acceptance.mjs <draft> <final> --json                 One JSON record
 *   node acceptance.mjs <draft> <final> --drafted-with 2.0.0   Record the version that wrote the draft
 *
 * `linterVersion` is the patterns version installed when you run this, which
 * may be newer than the one that produced the draft; pass --drafted-with to
 * record the drafting version. Append records to your own private log:
 *   node acceptance.mjs draft.md sent.md --json >> acceptance.jsonl
 *
 * Keep drafts and logs with the author's own working files, never in a public
 * repo or a scratchpad that is deleted with the session.
 */

import { readFileSync, realpathSync } from 'fs';
import { pathToFileURL } from 'url';

const { sentencesOf, htmlToText, PATTERNS } = await import(new URL('./slop-lint.mjs', import.meta.url).href);

const norm = (s) => s.replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"').replace(/\s+/g, ' ').trim();

export function acceptance(draft, final) {
  const kept = new Map();
  for (const s of sentencesOf(final).map(norm).filter(Boolean)) kept.set(s, (kept.get(s) || 0) + 1);
  const drafted = sentencesOf(draft).map(norm).filter(Boolean);
  let unchanged = 0;
  for (const s of drafted) {
    const n = kept.get(s) || 0;
    if (n > 0) { unchanged++; kept.set(s, n - 1); }
  }
  return {
    linterVersion: PATTERNS.META.version,
    draftSentences: drafted.length,
    unchanged,
    // null, not 0, for an empty draft: there was nothing to accept or reject.
    acceptance: drafted.length ? unchanged / drafted.length : null,
  };
}

function isMain() {
  try {
    return import.meta.url === pathToFileURL(realpathSync(process.argv[1] || '')).href;
  } catch {
    return false;
  }
}

if (isMain()) {
  const argv = process.argv.slice(2);
  const dwIdx = argv.indexOf('--drafted-with');
  const draftedWith = dwIdx !== -1 ? argv[dwIdx + 1] : undefined;
  const args = argv.filter((a, i) => a !== '--json' && (dwIdx === -1 || (i !== dwIdx && i !== dwIdx + 1)));
  if (args.length !== 2 || (dwIdx !== -1 && !draftedWith)) {
    console.error('usage: node acceptance.mjs <draft> <final> [--json] [--drafted-with <version>]');
    process.exit(2);
  }
  let draft, final;
  try {
    [draft, final] = args.map((p) => {
      const text = readFileSync(p, 'utf-8');
      return /\.html?$/i.test(p) ? htmlToText(text) : text;
    });
  } catch (e) {
    console.error(`acceptance: ${e.message}`);
    process.exit(2);
  }
  const r = { draft: args[0], final: args[1], ...acceptance(draft, final), ...(draftedWith ? { draftedWith } : {}) };
  if (argv.includes('--json')) console.log(JSON.stringify(r));
  else if (r.acceptance === null) console.log('acceptance n/a: the draft has no sentences');
  else console.log(`acceptance ${(r.acceptance * 100).toFixed(0)}%: ${r.unchanged}/${r.draftSentences} drafted sentences shipped unchanged (linter v${r.linterVersion}${draftedWith ? `, drafted with v${draftedWith}` : ''})`);
}
