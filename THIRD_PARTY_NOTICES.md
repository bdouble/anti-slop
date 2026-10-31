# Third-party notices

This repository's own code and prose are MIT-licensed (see `LICENSE`). The
evaluation data listed here is not. Files under `evals/fixtures/` and
`evals/holdout/` that quote third-party text stay under their original
licenses and are excluded from the repository's MIT grant. They are included
only to test the linter, with the changes noted.

Code-level adaptations (conorbronsdon/avoid-ai-writing, petergyang/no-ai-slop,
blader/humanizer) carry their notices in `LICENSE`.

## Wikipedia, "Wikipedia:Signs of AI writing"

- Copyright: © Wikipedia contributors (the page history lists them).
- License: Creative Commons Attribution-ShareAlike 4.0 International,
  https://creativecommons.org/licenses/by-sa/4.0/
- Source: https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
  (revision of 2026-10-31).
- Used in: `evals/holdout/contrast.md` (`wiki-*`, `wikied-*`),
  `evals/fixtures/negative-parallelism.md` (`wk-*`), and one sentence in
  `evals/eval-staging-ports.mjs`.
- Changes: wiki markup and templates removed; sentences extracted from their
  paragraphs. Share-alike: these excerpts, and `evals/holdout/contrast.md` as
  a whole, are shared under CC BY-SA 4.0.

## blader/humanizer

- Copyright (c) 2025 Siqi Chen. License: MIT (text below).
- Source: https://github.com/blader/humanizer, v3.1.0, commit `0ef9fe5`.
- Used in: `evals/fixtures/humanizer-passages.md`,
  `evals/fixtures/negative-parallelism.md` (`hz-*`). Verbatim, subset only.

## MIT-licensed sources quoted in `evals/holdout/contrast.md`

Each is quoted under the MIT License (text below) with this copyright notice.
Changes: sentences extracted, markdown stripped.

| Source | Copyright | Rows |
|---|---|---|
| ace-step/ACE-Step-1.5, https://github.com/ace-step/ACE-Step-1.5 | Copyright (c) 2026 ACEStep | `ace-*` |
| ScrapeCreators/social-media-research-skills, https://github.com/ScrapeCreators/social-media-research-skills | Copyright (c) 2026 ScrapeCreators | `sc-*` |
| black-forest-labs/skills, https://github.com/black-forest-labs/skills | Copyright (c) 2026 Black Forest Labs Inc. | `bfl-*` |
| LearningCircuit/local-deep-research, https://github.com/LearningCircuit/local-deep-research | Copyright (c) 2025 LearningCircuit | `ldr-*`, `ldr2-*` |
| langchain-ai/social-media-agent, https://github.com/langchain-ai/social-media-agent | Copyright (c) 2024 LangChain | `sma-*` |
| debug, https://github.com/debug-js/debug | Copyright (c) 2014-2017 TJ Holowaychuk / Copyright (c) 2018-2021 Josh Junon | `npm-debug-*` |
| retry, https://github.com/tim-kos/node-retry | Copyright (c) 2011: Tim Koschützki, Felix Geisendörfer | `npm-retry-*` |
| js-yaml, https://github.com/nodeca/js-yaml | Copyright (C) 2011-2015 by Vitaly Puzrin | `npm-jsyaml-*` |

## minimatch (Blue Oak Model License 1.0.0)

- Copyright: Isaac Z. Schlueter and Contributors.
- License: Blue Oak Model License 1.0.0, https://blueoakcouncil.org/license/1.0.0
- Source: https://github.com/isaacs/minimatch. Used in
  `evals/holdout/contrast.md` (`npm-minimatch-*`).

## souzatharsis/podcastfy (Apache-2.0)

- Source: https://github.com/souzatharsis/podcastfy. AI-generated sample
  transcripts quoted in `evals/holdout/contrast.md` (`pod-*`).
- Changes: sentences extracted, speaker tags removed.
- License: Apache License 2.0, full text below. The project's NOTICE file,
  reproduced as required by section 4(d):

```
Podcastfy
Copyright 2024 Tharsis T. P. Souza
------------------------
This product includes software developed by:
Tharsis T. P. Souza (www.souzatharsis.com) and all of the great contributors listed at https://github.com/souzatharsis/podcastfy/graphs/contributors.
------------------------
The text of the Apache License, Version 2.0 can be found in the LICENSE file.
```

## npm README passages in `evals/holdout/human-prose.md`

One paragraph from the README of each package below, selected by the rule in
that file's header. Changes: whitespace collapsed. Each is quoted under its
license, MIT or ISC (texts below), with the copyright notice from the
package's own LICENSE file:

| Package | License | Copyright notice |
|---|---|---|
| @hono/node-server | MIT | Copyright (c) 2022 - present, Yusuke Wada and Hono contributors |
| @isaacs/cliui | ISC | Copyright (c) 2015, Contributors |
| @istanbuljs/schema | MIT | Copyright (c) 2019 CFWare, LLC |
| @phosphor-icons/react | MIT | Copyright (c) 2020 Phosphor Icons |
| @vitejs/plugin-react | MIT | Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors |
| @yomguithereal/helpers | MIT | Copyright (c) 2018 Guillaume Plique (Yomguithereal) |
| accepts | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| acorn | MIT | Copyright (C) 2012-2022 by various contributors (see AUTHORS) |
| acorn-jsx | MIT | Copyright (C) 2012-2017 by Ingvar Stepanyan |
| agent-base | MIT | Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net> |
| ajv | MIT | Copyright (c) 2015-2017 Evgeny Poberezkin |
| ajv-formats | MIT | Copyright (c) 2020 Evgeny Poberezkin |
| array-includes | MIT | Copyright (C) 2015 Jordan Harband |
| array.prototype.findlastindex | MIT | Copyright (c) 2021 ECMAScript Shims |
| array.prototype.flat | MIT | Copyright (c) 2017 ECMAScript Shims |
| array.prototype.flatmap | MIT | Copyright (c) 2017 ECMAScript Shims |
| async-function | MIT | Copyright (c) 2016 EduardoRFS |
| available-typed-arrays | MIT | Copyright (c) 2020 Inspect JS |
| better-sqlite3 | MIT | Copyright (c) 2017 Joshua Wise |
| bindings | MIT | Copyright (c) 2012 Nathan Rajlich &lt;nathan@tootallnate.net&gt; |
| bl | MIT | Copyright (c) 2013-2019 bl contributors |
| body-parser | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| braces | MIT | Copyright (c) 2014-present, Jon Schlinkert. |
| browserslist | MIT | Copyright 2014 Andrey Sitnik <andrey@sitnik.es> and other contributors |
| c8 | ISC | Copyright (c) 2017, Contributors |
| call-bind | MIT | Copyright (c) 2020 Jordan Harband |
| ccount | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| character-entities | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| cliui | ISC | Copyright (c) 2015, Contributors |
| color-convert | MIT | Copyright (c) 2011-2016 Heather Arthur <fayearthur@gmail.com> |
| content-disposition | MIT | Copyright (c) 2014-2017 Douglas Christopher Wilson |
| content-type | MIT | Copyright (c) 2015 Douglas Christopher Wilson |
| convert-source-map | MIT | Copyright 2013 Thorsten Lorenz. |
| cookie | MIT | Copyright (c) 2012-2014 Roman Shtylman <shtylman@gmail.com> / Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| cors | MIT | Copyright (c) 2013 Troy Goode <troygoode@gmail.com> |
| cross-spawn | MIT | Copyright (c) 2018 Made With MOXY Lda <hello@moxy.studio> |
| csstype | MIT | Copyright (c) 2017-2018 Fredrik Nicol |
| debug | MIT | Copyright (c) 2014-2017 TJ Holowaychuk <tj@vision-media.ca> / Copyright (c) 2018-2021 Josh Junon |
| define-properties | MIT | Copyright (C) 2015 Jordan Harband |
| depd | MIT | Copyright (c) 2014-2018 Douglas Christopher Wilson |
| ee-first | MIT | Copyright (c) 2014 Jonathan Ong me@jongleberry.com |
| encodeurl | MIT | Copyright (c) 2016 Douglas Christopher Wilson |
| es-abstract | MIT | Copyright (C) 2015 Jordan Harband |
| es-set-tostringtag | MIT | Copyright (c) 2022 ECMAScript Shims |
| es-shim-unscopables | MIT | Copyright (c) 2022 Jordan Harband |
| es-to-primitive | MIT | Copyright (c) 2015 Jordan Harband |
| eslint-plugin-import | MIT | Copyright (c) 2015 Ben Mosher |
| etag | MIT | Copyright (c) 2014-2016 Douglas Christopher Wilson |
| express | MIT | Copyright (c) 2009-2014 TJ Holowaychuk <tj@vision-media.ca> / Copyright (c) 2013-2014 Roman Shtylman <shtylman+expressjs@gmail.com> / Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| extend | MIT | Copyright (c) 2014 Stefan Thomas |
| fast-deep-equal | MIT | Copyright (c) 2017 Evgeny Poberezkin |
| fast-xml-parser | MIT | Copyright (c) 2017 Amit Kumar Gupta |
| fastq | ISC | Copyright (c) 2015-2020, Matteo Collina <matteo.collina@gmail.com> |
| fault | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| fetch-blob | MIT | Copyright (c) 2019 David Frank |
| finalhandler | MIT | Copyright (c) 2014-2022 Douglas Christopher Wilson <doug@somethingdoug.com> |
| flatted | ISC | Copyright (c) 2018-2020, Andrea Giammarchi, @WebReflection |
| formdata-polyfill | MIT | Copyright (c) 2016 Jimmy Karl Roland Wärting |
| forwarded | MIT | Copyright (c) 2014-2017 Douglas Christopher Wilson |
| fresh | MIT | Copyright (c) 2012 TJ Holowaychuk <tj@vision-media.ca> / Copyright (c) 2016-2017 Douglas Christopher Wilson <doug@somethingdoug.com> |
| function-bind | MIT | Copyright (c) 2013 Raynos. |
| function.prototype.name | MIT | Copyright (c) 2016 Jordan Harband |
| functions-have-names | MIT | Copyright (c) 2019 Jordan Harband |
| gensync | MIT | Copyright 2018 Logan Smyth <loganfsmyth@gmail.com> |
| get-caller-file | ISC | Copyright 2018 Stefan Penner |
| get-intrinsic | MIT | Copyright (c) 2020 Jordan Harband |
| get-symbol-description | MIT | Copyright (c) 2021 Inspect JS |
| github-slugger | ISC | Copyright (c) 2015, Dan Flettre <fletd01@yahoo.com> |
| glob-parent | ISC | Copyright (c) 2015, 2019 Elan Shanker, 2021 Blaine Bublitz <blaine.bublitz@gmail.com>, Eric Schoffstall <yo@contra.io> and other contributors |
| globalthis | MIT | Copyright (c) 2016 Jordan Harband |
| gopd | MIT | Copyright (c) 2022 Jordan Harband |
| graceful-fs | ISC | Copyright (c) 2011-2022 Isaac Z. Schlueter, Ben Noordhuis, and Contributors |
| graphemer | MIT | Copyright 2020 Filament (Anomalous Technologies Limited) |
| graphology-communities-louvain | MIT | Copyright (c) 2017-2021 Guillaume Plique (Yomguithereal) |
| graphology-indices | MIT | Copyright (c) 2020-2021 Guillaume Plique (Yomguithereal) |
| graphology-metrics | MIT | Copyright (c) 2017-2021 Guillaume Plique (Yomguithereal) |
| graphology-shortest-path | MIT | Copyright (c) 2017-2021 Guillaume Plique (Yomguithereal) |
| graphology-utils | MIT | Copyright (c) 2017-2021 Guillaume Plique (Yomguithereal) |
| gray-matter | MIT | Copyright (c) 2014-2018, Jon Schlinkert. |
| has-bigints | MIT | Copyright (c) 2019 Jordan Harband |
| has-property-descriptors | MIT | Copyright (c) 2022 Inspect JS |
| has-proto | MIT | Copyright (c) 2022 Inspect JS |
| has-symbols | MIT | Copyright (c) 2016 Jordan Harband |
| has-tostringtag | MIT | Copyright (c) 2021 Inspect JS |
| hono | MIT | Copyright (c) 2021 - present, Yusuke Wada and Hono contributors |
| html-escaper | MIT | Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection |
| http-errors | MIT | Copyright (c) 2014 Jonathan Ong me@jongleberry.com / Copyright (c) 2016 Douglas Christopher Wilson doug@somethingdoug.com |
| https-proxy-agent | MIT | Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net> |
| iconv-lite | MIT | Copyright (c) 2011 Alexander Shtuchkin |
| immediate | MIT | Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, Domenic Denicola, Brian Cavalier |
| internal-slot | MIT | Copyright (c) 2019 Jordan Harband |
| ipaddr.js | MIT | Copyright (C) 2011-2017 whitequark <whitequark@whitequark.org> |
| is-array-buffer | MIT | Copyright (c) 2015 Chen Gengyuan, Inspect JS |
| is-async-function | MIT | Copyright (c) 2021 Jordan Harband |
| is-bigint | MIT | Copyright (c) 2018 Jordan Harband |
| is-boolean-object | MIT | Copyright (c) 2015 Jordan Harband |
| is-callable | MIT | Copyright (c) 2015 Jordan Harband |
| is-core-module | MIT | Copyright (c) 2014 Dave Justice |
| is-date-object | MIT | Copyright (c) 2015 Jordan Harband |
| is-extendable | MIT | Copyright (c) 2015, Jon Schlinkert. |
| is-finalizationregistry | MIT | Copyright (c) 2020 Inspect JS |
| is-generator-function | MIT | Copyright (c) 2014 Jordan Harband |
| is-glob | MIT | Copyright (c) 2014-2017, Jon Schlinkert. |
| is-map | MIT | Copyright (c) 2019 Inspect JS |
| is-negative-zero | MIT | Copyright (c) 2014 Jordan Harband |
| is-number | MIT | Copyright (c) 2014-present, Jon Schlinkert. |
| is-number-object | MIT | Copyright (c) 2015 Jordan Harband |
| is-regex | MIT | Copyright (c) 2014 Jordan Harband |
| is-set | MIT | Copyright (c) 2019 Inspect JS |
| is-shared-array-buffer | MIT | Copyright (c) 2021 Inspect JS |
| is-string | MIT | Copyright (c) 2015 Jordan Harband |
| is-symbol | MIT | Copyright (c) 2015 Jordan Harband |
| is-typed-array | MIT | Copyright (c) 2015 Jordan Harband |
| is-weakmap | MIT | Copyright (c) 2019 Inspect JS |
| is-weakset | MIT | Copyright (c) 2019 Inspect JS |
| jose | MIT | Copyright (c) 2018 Filip Skokan |
| js-tokens | MIT | Copyright (c) 2014, 2015, 2016, 2017, 2018 Simon Lydell |
| js-yaml | MIT | Copyright (C) 2011-2015 by Vitaly Puzrin |
| json-bigint | MIT | Copyright (c) 2013 Andrey Sidorov |
| json-schema-traverse | MIT | Copyright (c) 2017 Evgeny Poberezkin |
| json5 | MIT | Copyright (c) 2012-2018 Aseem Kishore, and [others]. |
| jwa | MIT | Copyright (c) 2013 Brian J. Brennan |
| jws | MIT | Copyright (c) 2013 Brian J. Brennan |
| kind-of | MIT | Copyright (c) 2014-2017, Jon Schlinkert. |
| lie | MIT | #Copyright (c) 2014-2018 Calvin Metcalf, Jordan Harband |
| magic-string | MIT | Copyright 2018 Rich Harris |
| mdast-util-frontmatter | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| mdast-util-gfm-autolink-literal | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| mdast-util-gfm-strikethrough | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| mdast-util-gfm-table | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| mdast-util-gfm-task-list-item | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| mdast-util-phrasing | MIT | Copyright (c) 2017 Titus Wormer <tituswormer@gmail.com> / Copyright (c) 2017 Victor Felder <victor@draft.li> |
| mdast-util-to-string | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| media-typer | MIT | Copyright (c) 2014-2017 Douglas Christopher Wilson |
| merge2 | MIT | Copyright (c) 2014-2020 Teambition |
| micromark-extension-frontmatter | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm-autolink-literal | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm-footnote | MIT | Copyright (c) 2021 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm-strikethrough | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm-tagfilter | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromark-extension-gfm-task-list-item | MIT | Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com> |
| micromatch | MIT | Copyright (c) 2014-present, Jon Schlinkert. |
| mime-db | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2015-2022 Douglas Christopher Wilson <doug@somethingdoug.com> |
| mime-types | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| napi-build-utils | MIT | Copyright (c) 2018 inspiredware |
| natural-orderby | MIT | Copyright (c) 2018 - present Olaf Ennen |
| node-domexception | MIT | Copyright (c) 2021 Jimmy Wärting |
| node-fetch | MIT | Copyright (c) 2016 - 2020 Node Fetch Team |
| node-releases | MIT | Copyright (c) 2017 Sergey Rubanov (https://github.com/chicoxyzzy) |
| object-inspect | MIT | Copyright (c) 2013 James Halliday |
| object-keys | MIT | Copyright (C) 2013 Jordan Harband |
| object.assign | MIT | Copyright (c) 2014 Jordan Harband |
| object.fromentries | MIT | Copyright (c) 2018 Jordan Harband |
| object.values | MIT | Copyright (c) 2015 Jordan Harband |
| obliterator | MIT | Copyright (c) 2017-2021 Guillaume Plique (Yomguithereal) |
| on-finished | MIT | Copyright (c) 2013 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2014 Douglas Christopher Wilson <doug@somethingdoug.com> |
| pandemonium | MIT | Copyright (c) 2017-2020 Guillaume Plique (Yomguithereal) |
| parseurl | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2014-2017 Douglas Christopher Wilson <doug@somethingdoug.com> |
| path-to-regexp | MIT | Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com) |
| picomatch | MIT | Copyright (c) 2017-present, Jon Schlinkert. |
| prebuild-install | MIT | Copyright (c) 2015 Mathias Buus |
| prettier-plugin-sort-json | MIT | Copyright (c) 2020 Mark Stacey |
| proxy-addr | MIT | Copyright (c) 2014-2016 Douglas Christopher Wilson |
| pump | MIT | Copyright (c) 2014 Mathias Buus |
| range-parser | MIT | Copyright (c) 2012-2014 TJ Holowaychuk <tj@vision-media.ca> / Copyright (c) 2015-2016 Douglas Christopher Wilson <doug@somethingdoug.com |
| raw-body | MIT | Copyright (c) 2013-2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2014-2022 Douglas Christopher Wilson <doug@somethingdoug.com> |
| reflect.getprototypeof | MIT | Copyright (c) 2021 ECMAScript Shims |
| regexp.prototype.flags | MIT | Copyright (C) 2014 Jordan Harband |
| resolve | MIT | Copyright (c) 2012 James Halliday |
| retry | MIT | Copyright (c) 2011: Tim Koschützki (tim@debuggable.com), Felix Geisendörfer (felix@debuggable.com) |
| router | MIT | Copyright (c) 2013 Roman Shtylman / Copyright (c) 2014-2022 Douglas Christopher Wilson |
| safe-regex-test | MIT | Copyright (c) 2022 Jordan Harband |
| safer-buffer | MIT | Copyright (c) 2018 Nikita Skovoroda <chalkerx@gmail.com> |
| section-matter | MIT | Copyright (c) 2017, Jon Schlinkert. |
| send | MIT | Copyright (c) 2012 TJ Holowaychuk / Copyright (c) 2014-2022 Douglas Christopher Wilson |
| serve-static | MIT | Copyright (c) 2010 Sencha Inc. / Copyright (c) 2011 LearnBoost / Copyright (c) 2011 TJ Holowaychuk / Copyright (c) 2014-2016 Douglas Christopher Wilson |
| set-cookie-parser | MIT | Copyright (c) 2015 Nathan Friedly <nathan@nfriedly.com> (http://nfriedly.com/) |
| side-channel | MIT | Copyright (c) 2019 Jordan Harband |
| side-channel-weakmap | MIT | Copyright (c) 2019 Jordan Harband |
| sort-package-json | MIT | Copyright (c) 2015 Keith Cirkel |
| string.prototype.trimend | MIT | Copyright (c) 2017 Khaled Al-Ansari |
| string.prototype.trimstart | MIT | Copyright (c) 2017 Khaled Al-Ansari |
| supports-preserve-symlinks-flag | MIT | Copyright (c) 2022 Inspect JS |
| synckit | MIT | Copyright (c) 2021 UnTS |
| tar-fs | MIT | Copyright (c) 2014 Mathias Buus |
| tar-stream | MIT | Copyright (c) 2014 Mathias Buus |
| test-exclude | ISC | Copyright (c) 2016, Contributors |
| to-regex-range | MIT | Copyright (c) 2015-present, Jon Schlinkert. |
| tsconfig-paths | MIT | Copyright (c) 2016 Jonas Kello |
| type-is | MIT | Copyright (c) 2014 Jonathan Ong <me@jongleberry.com> / Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| typed-array-byte-length | MIT | Copyright (c) 2020 Inspect JS |
| typed-array-byte-offset | MIT | Copyright (c) 2020 Inspect JS |
| unbox-primitive | MIT | Copyright (c) 2019 Jordan Harband |
| unist-util-is | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| unist-util-stringify-position | MIT | Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com> |
| unist-util-visit | MIT | Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com> |
| unist-util-visit-parents | MIT | Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com> |
| unpipe | MIT | Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com> |
| v8-to-istanbul | ISC | Copyright (c) 2017, Contributors |
| vary | MIT | Copyright (c) 2014-2017 Douglas Christopher Wilson |
| which-builtin-type | MIT | Copyright (c) 2020 ECMAScript Shims |
| which-collection | MIT | Copyright (c) 2019 Inspect JS |
| which-typed-array | MIT | Copyright (c) 2015 Jordan Harband |
| ws | MIT | Copyright (c) 2011 Einar Otto Stangvik <einaros@gmail.com> / Copyright (c) 2013 Arnout Kazemier and contributors / Copyright (c) 2016 Luigi Pinca and contributors |
| zod-to-json-schema | ISC | Copyright (c) 2020, Stefan Terdell |
| zod-validation-error | MIT | Copyright 2022 Causaly, Inc <front-end@causaly.com> |
| zwitch | MIT | Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com> |

## Public domain

- William Strunk Jr., *The Elements of Style* (1918): example sentences in
  `evals/holdout/contrast.md` (`strunk-*`).
- William Shakespeare, *Julius Caesar*: one line in
  `evals/fixtures/negative-parallelism.md`.

## License texts

### MIT

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### ISC

```
ISC License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

### Apache License, Version 2.0

```
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
