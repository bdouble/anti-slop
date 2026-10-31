#!/usr/bin/env node
/**
 * check-release.mjs — release hygiene, run in CI.
 *
 * 1. SKILL.md stays under its word budget. Every word of SKILL.md is read on
 *    every use; the 2026-10-31 review found the append-only Gotchas log had
 *    grown to 38% of it. Rules that live in data/patterns.mjs cost no prompt
 *    tokens and may grow; the prose layer may not. Move detail to references/.
 * 2. The SKILL.md frontmatter still parses (name + description).
 * 3. One version everywhere: META.version in patterns.mjs, both plugin
 *    manifests, and the newest released CHANGELOG heading. Before 2.0.0 the
 *    plugin said 1.2.0 while the patterns said 1.8.0.
 *
 * Run from the repo root:  node evals/check-release.mjs   Exits 1 on any failure.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const WORD_CAP = 2500;
const read = (...p) => readFileSync(join(ROOT, ...p), 'utf8');
const P = await import(join(ROOT, 'skills', 'anti-slop', 'data', 'patterns.mjs'));

const errors = [];
const skill = read('skills', 'anti-slop', 'SKILL.md');
const words = (skill.match(/\S+/g) || []).length;
if (words > WORD_CAP) errors.push(`SKILL.md is ${words} words (cap ${WORD_CAP}); move detail into references/`);

const fm = /^---\n([\s\S]*?)\n---\n/.exec(skill);
if (!fm) errors.push('SKILL.md has no frontmatter block');
else {
  if (!/^name:\s*anti-slop\s*$/m.test(fm[1])) errors.push('SKILL.md frontmatter: name must be anti-slop');
  if (!/^description:\s*\S/m.test(fm[1])) errors.push('SKILL.md frontmatter: description missing');
}

const plugin = JSON.parse(read('.claude-plugin', 'plugin.json')).version;
const market = JSON.parse(read('.claude-plugin', 'marketplace.json')).plugins?.[0]?.version;
const released = /^## \[(\d+\.\d+\.\d+)\] - \d{4}-\d{2}-\d{2}$/m.exec(read('CHANGELOG.md'))?.[1];
const versions = { 'patterns.mjs META.version': P.META.version, 'plugin.json': plugin, 'marketplace.json': market, 'CHANGELOG.md (newest release)': released };
if (new Set(Object.values(versions)).size !== 1) {
  errors.push(`versions disagree: ${Object.entries(versions).map(([k, v]) => `${k}=${v}`).join(', ')}`);
}

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`✓ release: SKILL.md ${words}/${WORD_CAP} words, frontmatter valid, version ${P.META.version} everywhere.`);
