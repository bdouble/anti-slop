#!/usr/bin/env node

/**
 * slop-lint.mjs — deterministic AI-slop linter (anti-slop skill).
 *
 * Data-driven: every phrase list, regex rule, threshold, and score lives in
 * data/patterns.mjs (the canonical pattern source). This file is the engine —
 * it should contain NO pattern knowledge of its own.
 *
 * It is a FLOOR, not the full pass. Judgment patterns (horoscope test,
 * genericness, dead metaphor, voice authenticity) are listed in the report's
 * NOT LINTED section and belong to the skill's recipe + an independent review.
 *
 * Detection posture: score, don't verdict. Findings carry a reliability tier
 * (fatal / strong / lexical / weak / info). Weak findings corroborate; they
 * never justify action alone. Any FATAL finding fails the piece outright.
 *
 * Usage:
 *   node slop-lint.mjs <file>               Human report (text/markdown)
 *   node slop-lint.mjs --html <file.html>   Strip tags first, lint visible prose
 *   node slop-lint.mjs <file> --json        Machine-readable JSON
 *   node slop-lint.mjs <file> --max 2       Exit 1 if score > 2 (FATAL always exits 1)
 *   cat draft.md | node slop-lint.mjs -     Read from stdin
 *
 * Library:
 *   import { lintText, scoreBand, formatReport, formatSummary, PATTERNS }
 *     from './slop-lint.mjs'
 *   lintText(text, { format: 'text'|'markdown'|'html', extraLexicons, extraRegexRules })
 *
 * Zero dependencies. Works from either layout:
 *   scripts/slop-lint.mjs + ../data/patterns.mjs   (skill repo)
 *   slop-lint.mjs + ./patterns.mjs                 (vendored copy)
 */

import { readFileSync, realpathSync } from 'fs';
import { pathToFileURL } from 'url';

async function loadPatterns() {
  const candidates = ['./patterns.mjs', '../data/patterns.mjs'];
  for (const rel of candidates) {
    try {
      return await import(new URL(rel, import.meta.url).href);
    } catch (e) {
      if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e;
    }
  }
  throw new Error('slop-lint: cannot locate patterns.mjs (tried ./patterns.mjs, ../data/patterns.mjs)');
}

export const PATTERNS = await loadPatterns();

const BAND_NOTE = {
  FATAL: 'contains machine artifacts — fails regardless of score',
  LOW: 'minor edits (ship target ≤2)',
  MEDIUM: 'significant editing needed',
  HIGH: 'likely unedited AI output — rewrite substantially',
};

const NOT_LINTED = PATTERNS.JUDGMENT.map(
  (j) => `${j.label} — ${j.description}`
);

// ── Text helpers ─────────────────────────────────────────────────────────────

// HTML/markdown comments are authoring notes, never reader-facing prose —
// voice notes, TODOs, and drafting scaffolding. Blanked length-preservingly
// (newlines kept) so every downstream consumer ignores them: the prose rules,
// the markdown structural detectors, and the paragraph splitter alike, while
// line numbers and finding spans stay aligned to the original file.
// Observed failure 2026-08-12: a `<!-- Voice notes: … -->` header quoting a
// sentence spent the document's free contrast pass on the comment instead of
// on the prose, and bold/heading markup inside comments fed the structural
// detectors.
function blankComments(input) {
  return input.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

// `title` is dropped WITH its contents, alongside style/script: it lives in <head>,
// never renders as prose, and its text is usually templated boilerplate ("Name — CV").
// Leaving it in charged the document for punctuation the reader never sees.
// Observed failure 2026-08-12: a resume whose body carried zero em-dashes still tripped
// the ≤1 shipping policy and blocked a DOCX render, on the <title> alone.
function stripHtml(input) {
  return input
    .replace(/<(style|script|title)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#?\w+;/g, ' ')
    .replace(/[ \t]+/g, ' ');
}

function lineAt(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === '\n') line++;
  return line;
}

function snippet(text, index, len) {
  const start = Math.max(0, index - 12);
  const end = Math.min(text.length, index + len + 18);
  return (start > 0 ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ').trim() + (end < text.length ? '…' : '');
}

function phraseRegex(phrase) {
  const esc = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  const startB = /^[a-z0-9]/i.test(phrase) ? '\\b' : '';
  const endB = /[a-z0-9]$/i.test(phrase) ? '\\b' : '';
  return new RegExp(startB + esc + endB, 'gi');
}

// Length-preserving fold of curly quotes/apostrophes so phrase rules match
// smart-punctuation prose; indices stay aligned for line/snippet reporting.
function normalizeQuotes(s) {
  return s.replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"');
}

function pushSentence(out, text, from, to) {
  const seg = text.slice(from, to);
  const norm = seg.replace(/\s+/g, ' ').trim();
  if (norm) out.push({ text: norm, index: from + (seg.length - seg.trimStart().length) });
}

function splitSentencesWithPos(text) {
  const out = [];
  const boundary = /(?<=[.!?])\s+(?=[A-Z"'(])/g;
  let start = 0;
  let m;
  while ((m = boundary.exec(text)) !== null) {
    pushSentence(out, text, start, m.index);
    start = m.index + m[0].length;
  }
  pushSentence(out, text, start, text.length);
  return out;
}

function wordCount(s) {
  return (s.match(/[A-Za-z0-9'’$%]+/g) || []).length;
}

function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function stdev(arr) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length);
}

// ── Lexicon matching (with allowances) ───────────────────────────────────────

function lintLexicon(group, prose, findings) {
  const hits = [];
  for (const term of group.terms) {
    for (const m of prose.matchAll(phraseRegex(term))) {
      hits.push({ term: term.toLowerCase(), index: m.index, len: m[0].length, text: m[0] });
    }
  }
  hits.sort((a, b) => a.index - b.index);
  const perTermFree = {};
  let groupFreeLeft = group.freeAllowance || 0;
  for (const h of hits) {
    const allowN = group.allowTerms && group.allowTerms[h.term] ? group.allowTerms[h.term] : 0;
    if (allowN) {
      perTermFree[h.term] = (perTermFree[h.term] || 0) + 1;
      if (perTermFree[h.term] <= allowN) continue;
    }
    if (groupFreeLeft > 0) { groupFreeLeft--; continue; }
    findings.push({
      rule: group.label, id: group.id, tier: group.tier, points: group.points,
      line: lineAt(prose, h.index), match: `"${h.text}"`, fix: group.fix,
      span: [h.index, h.index + h.len],
    });
  }
}

// ── Regex rules ──────────────────────────────────────────────────────────────

function lintRegexRule(rule, prose, sentenceObjs, findings) {
  if (rule.special === 'transitions') {
    let howeverCount = 0;
    for (const m of prose.matchAll(rule.patterns[0])) {
      const word = m[1];
      const idx = m.index + m[0].indexOf(word);
      if (/however/i.test(word)) {
        howeverCount++;
        if (howeverCount <= 1) continue; // one "however" is fine
      }
      findings.push({
        rule: rule.label, id: rule.id, tier: rule.tier, points: rule.points,
        line: lineAt(prose, idx), match: word, fix: rule.fix,
        span: [idx, idx + word.length],
      });
    }
    return;
  }
  if (rule.sentenceFinal) {
    for (const { text: s, index } of sentenceObjs) {
      const m = s.match(rule.patterns[0]);
      if (m) {
        // Span is approximate (sentence text is whitespace-normalized) but
        // close enough for overlap dedup within the same sentence tail.
        const start = index + Math.max(0, s.length - m[0].length);
        findings.push({
          rule: rule.label, id: rule.id, tier: rule.tier, points: rule.points,
          line: lineAt(prose, index),
          match: snippet(s, s.length - m[0].length, m[0].length),
          fix: rule.fix,
          span: [start, index + s.length],
        });
      }
    }
    return;
  }
  const seen = new Set();
  for (const re of rule.patterns) {
    const global = re.global ? re : new RegExp(re.source, re.flags + 'g');
    for (const m of prose.matchAll(global)) {
      if (seen.has(m.index)) continue;
      seen.add(m.index);
      findings.push({
        rule: rule.label, id: rule.id, tier: rule.tier, points: rule.points,
        line: lineAt(prose, m.index), match: snippet(prose, m.index, m[0].length),
        fix: rule.fix,
        span: [m.index, m.index + m[0].length],
      });
    }
  }
}

// ── Statistical detectors ────────────────────────────────────────────────────

function detectEmDashDensity(cfg, prose, sentences, findings) {
  // Perception policy (2026-07-15): allow cfg.maxAllowed per document; flag
  // from the next one, +cfg.perExtraPoint per additional dash, capped at
  // cfg.maxPoints. Attribution lines ("— Person Name") are exempt.
  const attributions = new Set(
    [...prose.matchAll(/^\s*—\s+[A-Z]/gm)].map((m) => m.index + m[0].indexOf('—'))
  );
  const matches = [...prose.matchAll(/—|(?<=\s)--(?=\s)/g)].filter((m) => !attributions.has(m.index));
  const count = matches.length;
  if (count <= cfg.maxAllowed) return;
  const extra = count - cfg.maxAllowed;
  const points = Math.min(cfg.points + cfg.perExtraPoint * (extra - 1), cfg.maxPoints);
  findings.push({
    rule: 'em-dash density', id: 'em-dash-density', tier: cfg.tier, points,
    line: lineAt(prose, matches[cfg.maxAllowed].index),
    match: `${count} em-dashes (shipping policy: ≤${cfg.maxAllowed} per document)`,
    fix: cfg.fix,
  });
}

function detectSentenceUniformity(cfg, sentences, findings) {
  if (sentences.length < cfg.minSentences) return;
  const counts = sentences.map(wordCount).filter((n) => n > 0);
  if (counts.length < cfg.minSentences) return;
  const m = mean(counts);
  const sd = stdev(counts);
  if (m >= cfg.meanMin && m <= cfg.meanMax && sd < cfg.stdevBelow) {
    findings.push({
      rule: 'sentence uniformity (low burstiness)', id: 'sentence-uniformity',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${counts.length} sentences, mean ${m.toFixed(1)} words, stdev ${sd.toFixed(1)} (metronomic)`,
      fix: cfg.fix,
    });
  }
}

function detectParagraphUniformity(cfg, raw, findings) {
  const paras = raw.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => wordCount(p) >= 15);
  if (paras.length < cfg.minParagraphs) return;
  const counts = paras.map((p) => splitSentencesWithPos(p).length);
  const m = mean(counts);
  const sd = stdev(counts);
  if (m >= cfg.meanMin && m <= cfg.meanMax && sd < cfg.stdevBelow) {
    findings.push({
      rule: 'paragraph uniformity', id: 'paragraph-uniformity',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${paras.length} paragraphs, all ~${Math.round(m)} sentences (stdev ${sd.toFixed(2)})`,
      fix: cfg.fix,
    });
  }
}

function detectStarterMonotony(cfg, sentenceObjs, prose, findings) {
  if (sentenceObjs.length < cfg.minSentences) return;
  const starters = new Set(cfg.starters);
  let hits = 0;
  for (const { text: s } of sentenceObjs) {
    const first = (s.match(/^\W*([A-Za-z]+)/) || [])[1];
    if (first && starters.has(first.toLowerCase())) hits++;
  }
  const ratio = hits / sentenceObjs.length;
  if (ratio > cfg.ratio) {
    findings.push({
      rule: 'sentence-starter monotony', id: 'starter-monotony',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${hits}/${sentenceObjs.length} sentences open with ${cfg.starters.join('/')}`,
      fix: cfg.fix,
    });
  }
}

function detectAnaphora(cfg, sentenceObjs, prose, findings) {
  let run = 1;
  for (let i = 1; i < sentenceObjs.length; i++) {
    const prev = (sentenceObjs[i - 1].text.match(/^\W*(\w+)/) || [])[1];
    const cur = (sentenceObjs[i].text.match(/^\W*(\w+)/) || [])[1];
    if (prev && cur && prev.toLowerCase() === cur.toLowerCase() && prev.length > 2) {
      run++;
      if (run >= cfg.run) {
        findings.push({
          rule: 'anaphora abuse', id: 'anaphora', tier: cfg.tier, points: cfg.points,
          line: lineAt(prose, sentenceObjs[i - 2].index),
          match: `${run} consecutive sentences open with "${cur}"`,
          fix: cfg.fix,
        });
        return;
      }
    } else {
      run = 1;
    }
  }
}

function detectBoldFirstBullets(cfg, raw, findings) {
  const md = [...raw.matchAll(/^[ \t]*[-*+][ \t]+\*\*[^*\n]+\*\*\s*[:：—-]/gm)];
  const html = [...raw.matchAll(/<li\b[^>]*>\s*<(strong|b)\b[^>]*>[^<]+<\/\1>\s*[:：—-]/gi)];
  const total = md.length + html.length;
  if (total < cfg.min) return;
  const first = md[0] || html[0];
  findings.push({
    rule: 'bold-first bullets', id: 'bold-first-bullets', tier: cfg.tier, points: cfg.points,
    line: lineAt(raw, first.index),
    match: `${total} bullets open with a bold keyword label`,
    fix: cfg.fix,
  });
}

function detectBoldDensity(cfg, raw, findings) {
  const words = wordCount(raw);
  if (words < cfg.minWords) return;
  const bolds = [...raw.matchAll(/\*\*[^*\n]{2,60}\*\*/g)];
  const per100 = (bolds.length / words) * 100;
  if (per100 > cfg.per100Words) {
    findings.push({
      rule: 'bold overuse', id: 'bold-density', tier: cfg.tier, points: cfg.points,
      line: bolds.length ? lineAt(raw, bolds[0].index) : 1,
      match: `${bolds.length} bold spans in ${words} words (${per100.toFixed(1)}/100 words)`,
      fix: cfg.fix,
    });
  }
}

function detectTitleCaseHeadings(cfg, raw, findings) {
  const headings = [...raw.matchAll(/^#{1,6}[ \t]+(.+)$/gm)];
  if (!headings.length) return;
  const stop = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'with', 'vs']);
  let titleCased = 0;
  let firstIdx = null;
  for (const h of headings) {
    const words = h[1].replace(/[`*_]/g, '').split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
    const significant = words.filter((w) => w.length > 3 && !stop.has(w.toLowerCase()));
    if (words.length >= cfg.minWords && significant.length >= 2 &&
        significant.every((w) => /^[A-Z]/.test(w))) {
      titleCased++;
      if (firstIdx === null) firstIdx = h.index;
    }
  }
  if (titleCased >= cfg.minHeadings) {
    findings.push({
      rule: 'Title Case headings', id: 'title-case-headings', tier: cfg.tier, points: cfg.points,
      line: lineAt(raw, firstIdx),
      match: `${titleCased} headings in Title Case`,
      fix: cfg.fix,
    });
  }
}

function detectDuplication(cfg, prose, findings) {
  const sentences = splitSentencesWithPos(prose).map((s) => s.text).filter((s) => wordCount(s) >= cfg.minWords);
  const seen = new Map();
  for (const s of sentences) {
    const key = s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    seen.set(key, (seen.get(key) || 0) + 1);
  }
  for (const [key, n] of seen) {
    if (n >= 2) {
      findings.push({
        rule: 'content duplication', id: 'duplication', tier: cfg.tier, points: cfg.points, line: 1,
        match: `a sentence appears ${n}× verbatim: "${key.slice(0, 60)}…"`,
        fix: cfg.fix,
      });
    }
  }
}

function detectUnicodeDecoration(cfg, visible, findings) {
  // Q4 (2026-07-15): single curly apostrophes are ignored entirely — they are
  // universal in Word/Docs/macOS output (contractions, possessives) and are
  // not decoration. Arrows, bullets, and curly DOUBLE quotes still flag.
  const m = visible.match(/[→⇒➜➡➔•]|[“”]/);
  if (!m) return;
  findings.push({
    rule: 'unicode decoration', id: 'unicode-decoration', tier: cfg.tier, points: cfg.points,
    line: lineAt(visible, m.index),
    match: `found "${m[0]}" (fancy arrow / curly quote / bullet)`,
    fix: cfg.fix,
  });
}

// ── Stylometric texture tier ─────────────────────────────────────────────────
// Adapted from conorbronsdon/avoid-ai-writing detector/patterns.js
// (MIT License, © 2026 Conor Bronsdon), with local changes: thresholds and
// tiers live in patterns.mjs; full normalization runs ONLY for these
// whole-document statistics (localized findings keep index-aligned text);
// MATTR replaces raw TTR; a leading BOM is not counted as a bypass trick.

const CYRILLIC_LOOKALIKES = {
  'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'х': 'x',
  'у': 'y', 'к': 'k', 'м': 'm', 'н': 'h', 'в': 'b', 'т': 't',
  'А': 'A', 'Е': 'E', 'О': 'O', 'Р': 'P', 'С': 'C', 'Х': 'X',
  'У': 'Y', 'К': 'K', 'М': 'M', 'Н': 'H', 'В': 'B', 'Т': 'T',
};
const GREEK_LOOKALIKES = { 'ο': 'o', 'Ο': 'O', 'α': 'a', 'Α': 'A', 'ρ': 'p', 'Ρ': 'P' };
const ROLEPLAY_VERBS = /^(?:nods|sighs|laughs|smiles|frowns|shrugs|grins|winks|chuckles|gasps|pauses|whispers|shouts|gestures|leans|glances|smirks|blinks|nodding|sighing|laughing|smiling|gesturing)\b/i;

/** Full normalization for stylometrics + bypass flags. Length-changing — never
 *  use its output for line-numbered findings. A single leading BOM is stripped
 *  without counting as a bypass signal (innocent in Windows-saved files). */
function normalizeFull(text) {
  const flags = { zeroWidth: 0, homoglyph: 0, roleplay: 0 };
  let out = text.replace(/^﻿/, '');
  out = out.replace(/[​‌‍﻿⁠]/g, () => { flags.zeroWidth++; return ''; });
  out = out.replace(/[Ѐ-ӿͰ-Ͽ]/g, (m) => {
    const swap = CYRILLIC_LOOKALIKES[m] ?? GREEK_LOOKALIKES[m];
    if (swap) { flags.homoglyph++; return swap; }
    return m;
  });
  out = out.replace(/(?<!\*)\*([^*\n]{1,80}?)\*(?!\*)/g, (m, inner) => {
    if (ROLEPLAY_VERBS.test(inner)) { flags.roleplay++; return ''; }
    return m;
  });
  return { text: out, flags };
}

const FUNC_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with',
  'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can',
  'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'there', 'here',
  'we', 'our', 'us', 'i', 'you', 'your', 'he', 'she', 'his', 'her', 'him', 'not', 'no', 'so',
  'if', 'then', 'than', 'when', 'where', 'which', 'who', 'what', 'how', 'why', 'because',
]);

function tokenizeWords(text) {
  return (text.toLowerCase().match(/[a-z0-9']+/g) || []);
}

function detectTrigramEntropy(cfg, tokens, findings, texture) {
  if (tokens.length < cfg.minWords) return;
  const seq = tokens.map((t) => (FUNC_WORDS.has(t) ? t : '_'))
    .filter((t, i, arr) => t !== '_' || (i > 0 && arr[i - 1] !== '_'));
  if (seq.length < cfg.minSeq) return;
  const trigrams = {};
  for (let i = 0; i < seq.length - 2; i++) {
    const tg = `${seq[i]}|${seq[i + 1]}|${seq[i + 2]}`;
    trigrams[tg] = (trigrams[tg] || 0) + 1;
  }
  const total = seq.length - 2;
  let entropy = 0;
  for (const c of Object.values(trigrams)) {
    const p = c / total;
    entropy -= p * Math.log2(p);
  }
  const distinct = Object.keys(trigrams).length;
  // Degenerate case: one trigram repeated everywhere normalizes to 1.0
  // ("fully human") and inverts the signal — catch it explicitly.
  const normalized = distinct > 1 ? entropy / Math.log2(distinct) : 0;
  texture.trigramEntropy = normalized;
  if (normalized < cfg.threshold && total >= cfg.minSeq) {
    findings.push({
      rule: 'function-word trigram entropy (low)', id: 'trigram-entropy',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${normalized.toFixed(2)} normalized (human ~0.85–0.95)`,
      fix: cfg.fix,
    });
  }
}

function detectCrossParaBurstiness(cfg, rawParas, findings, texture) {
  if (rawParas.length < cfg.minParagraphs) return;
  const cvs = rawParas.map((p) => {
    const sents = splitSentencesWithPos(p).map((s) => s.text);
    if (sents.length < cfg.minSentencesPerPara) return null;
    const lens = sents.map(wordCount);
    const m = mean(lens);
    return m > 0 ? stdev(lens) / m : null;
  }).filter((c) => c !== null);
  if (cvs.length < cfg.minParagraphs) return;
  const sd = stdev(cvs);
  texture.crossParaBurstiness = sd;
  if (sd < cfg.stdOfCvBelow && mean(cvs) < cfg.meanCvBelow) {
    findings.push({
      rule: 'cross-paragraph burstiness (flat)', id: 'cross-para-burstiness',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `σCV=${sd.toFixed(2)} across ${cvs.length} paragraphs (human ~0.15–0.40)`,
      fix: cfg.fix,
    });
  }
}

function detectPunctDistribution(cfg, rawParas, findings, texture) {
  if (rawParas.length < cfg.minParagraphs) return;
  const densities = rawParas.map((p) => {
    const words = (p.match(/\S+/g) || []).length;
    if (words < 5) return null;
    return ((p.match(/[,;:—()]/g) || []).length) / words;
  }).filter((d) => d !== null);
  if (densities.length < cfg.minParagraphs) return;
  const m = mean(densities);
  const cv = m > 0 ? stdev(densities) / m : 0;
  texture.punctDistributionCv = cv;
  if (cv < cfg.cvBelow && m >= cfg.minMeanDensity) {
    findings.push({
      rule: 'punctuation distribution (uniform)', id: 'punct-distribution',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `CV=${cv.toFixed(2)} across ${densities.length} paragraphs`,
      fix: cfg.fix,
    });
  }
}

function detectLowMattr(cfg, tokens, findings, texture) {
  if (tokens.length < cfg.minTokens) return;
  const w = cfg.window;
  const step = 10;
  const ratios = [];
  for (let i = 0; i + w <= tokens.length; i += step) {
    ratios.push(new Set(tokens.slice(i, i + w)).size / w);
  }
  if (!ratios.length) return;
  const mattr = mean(ratios);
  texture.mattr = mattr;
  if (mattr < cfg.threshold) {
    findings.push({
      rule: 'vocabulary diversity (low MATTR)', id: 'low-ttr',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `MATTR-${w}=${mattr.toFixed(2)} over ${tokens.length} tokens`,
      fix: cfg.fix,
    });
  }
}

function detectSmartPunctSignature(cfg, visible, findings, texture) {
  if (wordCount(visible) < cfg.minWords) return;
  const hasCurly = /[“”‘’]/.test(visible);
  const hasEmDash = /—/.test(visible);
  const hasOxford = /\b\w+,\s+\w+,\s+and\s+\w+/.test(visible);
  const doubleSpaces = (visible.match(/[^.!?\n]  +/g) || []).length;
  const missingApos = /\b(?:dont|wont|cant|isnt|wasnt|shouldnt|wouldnt|couldnt|youre|theyre)\b/i.test(visible);
  const clean = doubleSpaces === 0 && !missingApos;
  const signals = [hasCurly, hasEmDash, hasOxford, clean].filter(Boolean).length;
  texture.smartPunctSignals = signals;
  if (signals >= cfg.minSignals) {
    findings.push({
      rule: 'smart-punctuation co-occurrence', id: 'smart-punct-signature',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: 'curly quotes + em-dash + Oxford comma + zero typos',
      fix: cfg.fix,
    });
  }
}

function detectBypassNormalization(cfg, flags, findings) {
  if (flags.zeroWidth >= cfg.minZeroWidth || flags.homoglyph >= cfg.minHomoglyphs) {
    findings.push({
      rule: 'bypass-tool characters', id: 'bypass-normalization',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${flags.zeroWidth} zero-width, ${flags.homoglyph} homoglyph(s)`,
      fix: cfg.fix,
    });
  }
  if (flags.roleplay >= cfg.minRoleplay) {
    findings.push({
      rule: 'roleplay-action markers', id: 'bypass-normalization',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `${flags.roleplay} *action* markers`,
      fix: 'Paired *action* markers are a chat-model artifact. Remove them.',
    });
  }
}

const STYLOMETRIC_IDS = new Set([
  'trigram-entropy', 'cross-para-burstiness', 'punct-distribution', 'low-ttr',
  'smart-punct-signature', 'sentence-uniformity', 'paragraph-uniformity',
  'starter-monotony',
]);

function detectContractionRate(cfg, prose, findings) {
  const words = wordCount(prose);
  if (words < cfg.minWords) return;
  const firstPerson = (prose.match(/\bI\b/g) || []).length >= 3;
  if (!firstPerson) return;
  const contractions = (prose.match(/\b\w+'(?:t|s|re|ve|ll|d|m)\b/gi) || []).length;
  if (contractions === 0) {
    findings.push({
      rule: 'zero contractions (first-person)', id: 'contraction-rate',
      tier: cfg.tier, points: cfg.points, line: 1,
      match: `0 contractions across ${words} first-person words`,
      fix: cfg.fix,
    });
  }
}

// ── Core lint ────────────────────────────────────────────────────────────────

/**
 * Lint a string for mechanical AI-writing tells.
 * @param {string} input
 * @param {{format?: 'text'|'markdown'|'html', extraLexicons?: Array, extraRegexRules?: Array}} [opts]
 * @returns {{score:number, band:string, fatal:number, findings:Array, notLinted:string[]}}
 */
export function lintText(input, opts = {}) {
  const raw = blankComments(String(input || ''));
  const format = opts.format || 'text';
  const visible = format === 'html' ? stripHtml(raw) : raw;
  const prose = normalizeQuotes(visible);
  const sentenceObjs = splitSentencesWithPos(prose);
  const sentences = sentenceObjs.map((s) => s.text);
  const findings = [];
  const S = PATTERNS.STATISTICAL;

  for (const g of [PATTERNS.FATAL_LEXICON, ...PATTERNS.LEXICONS, ...(opts.extraLexicons || [])]) {
    lintLexicon(g, prose, findings);
  }
  for (const r of [...PATTERNS.FATAL_REGEX, ...PATTERNS.REGEX_RULES, ...(opts.extraRegexRules || [])]) {
    lintRegexRule(r, prose, sentenceObjs, findings);
  }

  detectEmDashDensity(S.emDashDensity, prose, sentences, findings);
  detectSentenceUniformity(S.sentenceUniformity, sentences, findings);
  detectParagraphUniformity(S.paragraphUniformity, format === 'html' ? visible : raw, findings);
  detectStarterMonotony(S.starterMonotony, sentenceObjs, prose, findings);
  detectAnaphora(S.anaphora, sentenceObjs, prose, findings);
  detectBoldFirstBullets(S.boldFirstBullets, raw, findings);
  detectBoldDensity(S.boldDensity, format === 'html' ? '' : raw, findings);
  detectTitleCaseHeadings(S.titleCaseHeadings, format === 'html' ? '' : raw, findings);
  detectDuplication(S.duplication, prose, findings);
  detectUnicodeDecoration(S.unicodeDecoration, visible, findings);
  detectContractionRate(S.contractionRate, prose, findings);

  // Stylometric texture tier: full normalization (length-changing) feeds ONLY
  // these whole-document statistics + bypass flags; localized findings above
  // keep the index-aligned text.
  const texture = {};
  const norm = normalizeFull(visible);
  const tokens = tokenizeWords(norm.text);
  const rawParas = (format === 'html' ? visible : raw).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  detectTrigramEntropy(S.trigramEntropy, tokens, findings, texture);
  detectCrossParaBurstiness(S.crossParaBurstiness, rawParas, findings, texture);
  detectPunctDistribution(S.punctDistribution, rawParas, findings, texture);
  detectLowMattr(S.lowTtr, tokens, findings, texture);
  detectSmartPunctSignature(S.smartPunctSignature, visible, findings, texture);
  detectBypassNormalization(S.bypassNormalization, norm.flags, findings);

  // Cluster escalation: several independent texture signals together = machine
  // rhythm, even with clean vocabulary. Single weak signals never act alone.
  const styloHits = new Set(findings.filter((f) => STYLOMETRIC_IDS.has(f.id)).map((f) => f.id));
  if (styloHits.size >= S.stylometricCluster.minHits) {
    findings.push({
      rule: 'stylometric cluster', id: 'stylometric-cluster',
      tier: S.stylometricCluster.tier, points: S.stylometricCluster.points, line: 1,
      match: `${styloHits.size} independent texture signals: ${[...styloHits].join(', ')}`,
      fix: S.stylometricCluster.fix,
    });
  }

  // Texture info block (0 points): measurements with human reference ranges,
  // so remediation can steer cadence by number instead of by feel.
  if (tokens.length >= 150) {
    const parts = [];
    if (texture.trigramEntropy !== undefined) parts.push(`trigram entropy ${texture.trigramEntropy.toFixed(2)} (human ~0.85–0.95)`);
    if (texture.crossParaBurstiness !== undefined) parts.push(`para-burstiness σCV ${texture.crossParaBurstiness.toFixed(2)} (human ~0.15–0.40)`);
    if (texture.punctDistributionCv !== undefined) parts.push(`punct CV ${texture.punctDistributionCv.toFixed(2)} (flag <0.25)`);
    if (texture.mattr !== undefined) parts.push(`MATTR ${texture.mattr.toFixed(2)} (flag <${S.lowTtr.threshold})`);
    if (parts.length) {
      findings.push({
        rule: 'texture report', id: 'texture-report', tier: 'info', points: 0, line: 1,
        match: parts.join(' · '),
        fix: 'Informational only — reference ranges for cadence work.',
      });
    }
  }

  // Q2 span-dedup (2026-07-15): overlapping matches count once, keeping the
  // highest-points finding — "marking a pivotal moment" no longer stacks
  // ai-cliche + ai-signature + significance-inflation for one span. Findings
  // without spans (whole-document statistics) are never deduped.
  const spanless = findings.filter((f) => !f.span);
  const spanful = findings.filter((f) => f.span)
    .sort((a, b) => b.points - a.points || a.span[0] - b.span[0]);
  const kept = [];
  for (const f of spanful) {
    if (!kept.some((k) => f.span[0] < k.span[1] && k.span[0] < f.span[1])) kept.push(f);
  }
  const deduped = [...spanless, ...kept];

  // Contrast-family allowance (2026-08-12): the first contrast device in the
  // document is free — zeroed to info tier but kept visible in the report — and
  // every one after it scores. Runs AFTER span-dedup so the free pass is never
  // spent on a finding that gets deduped away. Guarded for vendored copies of
  // patterns.mjs predating CONTRAST_FAMILY.
  //
  // 2026-08-13: freeing it is a SCORING decision, not a disposition. The freed
  // finding also gets `review: 'keep-test'` so the report can lift it out of
  // the "corroborate only" bucket it shared with the texture dump. Guarded on
  // requiresKeepTest for vendored patterns.mjs predating the flag.
  const CF = PATTERNS.CONTRAST_FAMILY;
  if (CF && CF.freePerDocument > 0) {
    const famIds = new Set(CF.ids);
    const contrast = deduped
      .filter((f) => famIds.has(f.id))
      .sort((a, b) => (a.span ? a.span[0] : 0) - (b.span ? b.span[0] : 0));
    for (const f of contrast.slice(0, CF.freePerDocument)) {
      f.tier = 'info';
      f.points = 0;
      f.rule = `${f.rule} — first contrast, free`;
      f.fix = 'Free by policy (one contrast device per piece). Any further contrast scores. '
        + 'Keeping it still requires the keep-test: does the reader actually believe the negated half? '
        + 'See references/negative-parallelism.md.';
      if (CF.requiresKeepTest) f.review = 'keep-test';
    }
  }

  const tierRank = { fatal: 0, strong: 1, lexical: 2, weak: 3, info: 4 };
  deduped.sort((a, b) => (tierRank[a.tier] ?? 5) - (tierRank[b.tier] ?? 5) || b.points - a.points || a.line - b.line);

  const fatal = deduped.filter((f) => f.tier === 'fatal').length;
  const score = deduped.filter((f) => f.tier !== 'info').reduce((sum, f) => sum + f.points, 0);
  // gateScore excludes weak/info tiers: per the detection guide, weak findings
  // corroborate but never justify action alone — so they never block a render.
  const gateScore = deduped.filter((f) => f.tier === 'fatal' || f.tier === 'strong' || f.tier === 'lexical')
    .reduce((sum, f) => sum + f.points, 0);
  // requiresReview (2026-08-13): findings the linter deliberately did not score
  // but which a human/agent must still rule on. Orthogonal to tier and to both
  // score aggregates by design — a document can be score 0, gateScore 0, band
  // LOW and still owe a disposition. Consumers that want to block on it opt in
  // via --require-review-disposition; nothing here changes existing exit codes.
  const requiresReview = deduped.filter((f) => f.review).length;
  return { score, gateScore, band: fatal ? 'FATAL' : scoreBand(score), fatal, requiresReview, findings: deduped, notLinted: NOT_LINTED };
}

export function scoreBand(score) {
  const { low, medium } = PATTERNS.META.scoreBands;
  if (score <= low) return 'LOW';
  if (score <= medium) return 'MEDIUM';
  return 'HIGH';
}

// ── Formatting ───────────────────────────────────────────────────────────────

// Questions for each review kind, sourced from the pattern data so the report
// and the catalogue cannot drift. Add a kind here when a second one appears.
function reviewQuestions(kind) {
  if (kind === 'keep-test') return PATTERNS.CONTRAST_FAMILY?.keepTest || [];
  return [];
}

// The keep-test block (2026-08-13). Printed for findings the linter freed from
// scoring but which still owe a judgment call. It exists because pointing at a
// reference file did not work: the drafting agent has to meet the questions in
// the artifact it is already reading.
export function formatReviewBlock(result) {
  const flagged = result.findings.filter((f) => f.review);
  if (flagged.length === 0) return [];
  const lines = ['', `KEEP-TEST REQUIRED (${flagged.length}) — scored free, but you must still rule on each`];
  for (const f of flagged) {
    lines.push(`  line ${f.line}: ${f.rule}`);
    lines.push(`    "${f.match}"`);
    const qs = reviewQuestions(f.review);
    if (qs.length) {
      lines.push('    All three must hold, or state Y flat:');
      qs.forEach((q, i) => lines.push(`      ${i + 1}. ${q}`));
    }
  }
  lines.push('  Any test fails → cut the negated half and state the claim directly.');
  lines.push('  Procedure, repairs, and the legitimate-use gallery: references/negative-parallelism.md');
  return lines;
}

export function formatReport(result, { file } = {}) {
  const lines = [];
  lines.push('SLOP LINT' + (file ? ` — ${file}` : ''));
  lines.push('='.repeat(52));
  lines.push(`Score: ${result.score}  (${result.band} — ${BAND_NOTE[result.band]})`);
  if (result.fatal) lines.push(`⛔ ${result.fatal} FATAL artifact(s) — fix these before anything else.`);
  lines.push('');
  if (result.findings.length === 0) {
    lines.push('No mechanical AI-writing tells detected. ✅');
  } else {
    lines.push(`FINDINGS (${result.findings.length})`);
    for (const f of result.findings) {
      const mark = f.review ? ` ⚑${f.review}` : '';
      lines.push(`  [${f.tier} +${f.points}${mark}] line ${f.line}: ${f.rule} — ${f.match}`);
      lines.push(`      → ${f.fix}`);
    }
    // The "corroborate only" note must NOT cover review-flagged findings: they
    // are exactly the ones you have to act on. It still covers the texture
    // report and the weak tier, which are genuinely corroborating.
    if (result.findings.some((f) => (f.tier === 'weak' || f.tier === 'info') && !f.review)) {
      lines.push('');
      lines.push('  Note: weak/info findings corroborate only — never act on them alone.');
    }
  }
  lines.push(...formatReviewBlock(result));
  lines.push('');
  lines.push('NOT LINTED (judgment patterns — needs the recipe pass + independent review)');
  for (const n of result.notLinted) lines.push(`  - ${n}`);
  lines.push('');
  lines.push(`Deterministic floor only (patterns v${PATTERNS.META.version}, reviewed ${PATTERNS.META.lastReviewed}).`);
  const age = (Date.now() - Date.parse(PATTERNS.META.lastReviewed)) / 86400000;
  if (age > PATTERNS.META.reviewIntervalDays) {
    lines.push(`⚠ Pattern lexicons are ${Math.round(age)} days old (review interval ${PATTERNS.META.reviewIntervalDays}d) — lexical tells decay; schedule a review.`);
  }
  return lines.join('\n');
}

export function formatSummary(result, { file } = {}) {
  if (result.fatal) {
    const top = result.findings.filter((f) => f.tier === 'fatal').slice(0, 3).map((f) => `${f.rule} ${f.match}`).join('; ');
    return `⛔ Voice lint: FATAL — ${top}.` + (file ? ` Full report: node slop-lint.mjs "${file}"` : '');
  }
  if (result.score === 0) return `📝 Voice lint: clean (slop score 0).`;
  const top = result.findings.slice(0, 4).map((f) => `${f.rule} ${f.match}`).join('; ');
  const hint = file ? ` Full report: node slop-lint.mjs "${file}"` : ' Run: node slop-lint.mjs <file>';
  return [
    `📝 Voice lint: slop score ${result.score} (${result.band}; target ≤${PATTERNS.META.shipTarget}). ${result.findings.length} flag(s).`,
    `   Top: ${top}.`,
    `  ${hint}`,
  ].join('\n');
}

// ── CLI ──────────────────────────────────────────────────────────────────────

export function runCli(argv = process.argv.slice(2)) {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    console.log(`slop-lint — deterministic anti-slop linter (data: patterns.mjs v${PATTERNS.META.version})

Usage:
  node slop-lint.mjs <file>              Human report
  node slop-lint.mjs --html <file.html>  Strip tags, lint visible prose
  node slop-lint.mjs <file> --json       JSON output
  node slop-lint.mjs <file> --max <n>    Exit 1 if score > n (FATAL always exits 1)
  cat draft.md | node slop-lint.mjs -    Read from stdin

  --require-review-disposition           Exit 1 while any finding still owes a
                                         judgment call (see KEEP-TEST REQUIRED).
                                         Off by default; for gated renders.

Bands: 0–5 low · 6–12 medium · 13+ high · FATAL overrides all. Ship target: ≤${PATTERNS.META.shipTarget}.`);
    process.exit(argv.length === 0 ? 1 : 0);
  }

  const json = argv.includes('--json');
  const isHtml = argv.includes('--html');
  const maxIdx = argv.indexOf('--max');
  const max = maxIdx !== -1 && argv[maxIdx + 1] !== undefined ? Number(argv[maxIdx + 1]) : null;
  const flagValues = new Set([maxIdx !== -1 ? argv[maxIdx + 1] : undefined]);
  const file = argv.find((a) => !a.startsWith('-') && !flagValues.has(a)) || (argv.includes('-') ? '-' : undefined);

  let content;
  try {
    content = file && file !== '-' ? readFileSync(file, 'utf-8') : readFileSync(0, 'utf-8');
  } catch (e) {
    console.error(`slop-lint: cannot read ${file === '-' || !file ? 'stdin' : `"${file}"`}: ${e.message}`);
    process.exit(2);
  }

  const format = isHtml || /\.html?$/i.test(file || '') ? 'html' : 'text';
  const result = lintText(content, { format });

  if (json) {
    console.log(JSON.stringify({ file: file || 'stdin', ...result }, null, 2));
  } else {
    console.log(formatReport(result, { file: file || 'stdin' }));
  }

  if (result.fatal > 0) process.exit(1);
  if (max !== null && !Number.isNaN(max) && result.score > max) process.exit(1);
  // Opt-in only: a keep-test owed is invisible to score and gateScore by
  // design, so a caller that wants it to block must ask for it explicitly.
  if (argv.includes('--require-review-disposition') && result.requiresReview > 0) {
    console.error(`slop-lint: ${result.requiresReview} finding(s) still owe a keep-test disposition.`);
    process.exit(1);
  }
  process.exit(0);
}

// Main-module guard resolves symlinks (2026-07-15): invoked via the installed
// symlink (~/.claude/skills/anti-slop/...), argv[1] is the link path while
// import.meta.url is the real path — a bare comparison silently no-ops with
// exit 0, indistinguishable from a clean report. realpath both sides.
function isMain() {
  try {
    return import.meta.url === pathToFileURL(realpathSync(process.argv[1] || '')).href;
  } catch {
    return false;
  }
}
if (isMain()) runCli();
