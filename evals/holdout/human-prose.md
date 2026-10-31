# Held-out set: real human prose (whole passages)

Never tune a pattern against this file. `evals/eval-holdout.mjs` reports the
false-positive rate on it; a FATAL here fails the eval.

License: this file is NOT covered by the repository's MIT license. Each passage
stays under its package's license (MIT or ISC); every copyright notice is listed
in `THIRD_PARTY_NOTICES.md` at the repo root, with the MIT and ISC texts.

Rebuilt 2026-10-31 (independent re-review). The earlier version mixed Wikipedia
paragraphs with npm README paragraphs and was trimmed from 147 to 35 passages
after lint results were known, which left too little to measure and raised a
selection-bias question. This version follows one rule, written down before the
linter was run on it and applied mechanically:

1. Installed npm packages from three dependency trees, each package name
   once.
2. `package.json` license exactly MIT or ISC.
3. A LICENSE file whose copyright lines carry years, all 2022 or earlier (a
   proxy for prose written before LLM drafting was common).
4. From the README, with fenced code removed: the first prose paragraph of 30
   or more words that is not a heading, list, table, quote, HTML, badge,
   indented code or license text.
5. One passage per qualifying package, ordered by package name, nothing else
   filtered. Whitespace collapsed; otherwise verbatim.

Format: one passage per `=== id` block.

=== npm-@hono__node-server
This adapter `@hono/node-server` allows you to run your Hono application on Node.js. Initially, Hono wasn't designed for Node.js, but with this adapter, you can now use Hono on Node.js. It utilizes web standard APIs implemented in Node.js version 18 or higher.

=== npm-@isaacs__cliui
Specify the maximum width of the UI being generated. If no width is provided, cliui will try to get the current window's width and use it, and if that doesn't work, width will be set to `80`.

=== npm-@istanbuljs__schema
The maintainers of `@istanbuljs/schema` and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-istanbuljs-schema?utm_source=npm-istanbuljs-schema&utm_medium=referral&utm_campaign=enterprise)

=== npm-@phosphor-icons__react
When importing icons during development directly from the main module `@phosphor-icons/react`, some bundlers may eagerly transpile all 9,000+ modules exported by the package. This behavior can drastically increase compilation time. To avoid transpiling all modules, import individual icons from their specific file paths instead:

=== npm-@vitejs__plugin-react
The default value is `/node_modules/`. You may use it to exclude JSX/TSX files that runs in a worker or are not React files. Except if explicitly desired, you should keep `node_modules` in the exclude list:

=== npm-@yomguithereal__helpers
It is faster than doing `array.push.apply(array, values)` and works by first mutating the array's length and then setting the new indices (benchmark proved it is faster than a loop of pushes).

=== npm-accepts
Return the first accepted type (and it is returned as the same text as what appears in the `types` array). If nothing in `types` is accepted, then `false` is returned.

=== npm-acorn
**parse**`(input, options)` is the main interface to the library. The `input` parameter is a string, `options` must be an object setting some of the options listed below. The return value will be an abstract syntax tree object as specified by the [ESTree spec](https://github.com/estree/estree).

=== npm-acorn-jsx
Please note that this tool only parses source code to JSX AST, which is useful for various language tools and services. If you want to transpile your code to regular ES5-compliant JavaScript with source map, check out [Babel](https://babeljs.io/) and [Buble](https://buble.surge.sh/) transpilers which use `acorn-jsx` under the hood.

=== npm-agent-base
Instances of this agent can be used with the `http` and `https` modules. To differentiate, the options parameter in the `connect()` function includes a `secureEndpoint` property, which can be checked to determine what type of socket should be returned.

=== npm-ajv
Ajv has been awarded a grant from Mozilla’s [Open Source Support (MOSS) program](https://www.mozilla.org/en-US/moss/) in the “Foundational Technology” track! It will sponsor the development of Ajv support of [JSON Schema version 2019-09](https://tools.ietf.org/html/draft-handrews-json-schema-02) and of [JSON Type Definition](https://tools.ietf.org/html/draft-ucarion-json-type-definition-04).

=== npm-ajv-formats
The value of keywords `formatMaximum`/`formatMinimum` and `formatExclusiveMaximum`/`formatExclusiveMinimum` should be a string or [\$data reference](https://github.com/ajv-validator/ajv/blob/master/docs/validation.md#data-reference). This value is the maximum (minimum) allowed value for the data to be valid as determined by `format` keyword. If `format` keyword is not present schema compilation will throw exception.

=== npm-array-includes
Engines that need this package include: - IE (all versions) - Safari < 9 - Firefox < 43, and 99-101 - Chrome < 47 - Edge < 14 - node < 6

=== npm-array.prototype.findlastindex
[package-url]: https://npmjs.org/package/array.prototype.findlastindex [npm-version-svg]: https://versionbadg.es/es-shims/Array.prototype.findLastIndex.svg [deps-svg]: https://david-dm.org/es-shims/Array.prototype.findLastIndex.svg [deps-url]: https://david-dm.org/es-shims/Array.prototype.findLastIndex [dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.findLastIndex/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.findLastIndex#info=devDependencies [npm-badge-png]: https://nodei.co/npm/array.prototype.findlastindex.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/array.prototype.findlastindex.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/array.prototype.findlastindex.svg [downloads-url]: https://npm-stat.com/charts.html?package=array.prototype.findlastindex [codecov-image]: https://codecov.io/gh/es-shims/Array.prototype.findLastIndex/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/Array.prototype.findLastIndex/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Array.prototype.findLastIndex [actions-url]: https://github.com/es-shims/Array.prototype.findLastIndex

=== npm-array.prototype.flat
[package-url]: https://npmjs.org/package/array.prototype.flat [npm-version-svg]: https://versionbadg.es/es-shims/Array.prototype.flat.svg [deps-svg]: https://david-dm.org/es-shims/Array.prototype.flat.svg [deps-url]: https://david-dm.org/es-shims/Array.prototype.flat [dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.flat/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.flat#info=devDependencies [npm-badge-png]: https://nodei.co/npm/array.prototype.flat.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/array.prototype.flat.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/array.prototype.flat.svg [downloads-url]: https://npm-stat.com/charts.html?package=array.prototype.flat [codecov-image]: https://codecov.io/gh/es-shims/Array.prototype.flat/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/Array.prototype.flat/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Array.prototype.flat [actions-url]: https://github.com/es-shims/Array.prototype.flat/actions

=== npm-array.prototype.flatmap
[package-url]: https://npmjs.org/package/array.prototype.flatmap [npm-version-svg]: https://versionbadg.es/es-shims/Array.prototype.flatMap.svg [deps-svg]: https://david-dm.org/es-shims/Array.prototype.flatMap.svg [deps-url]: https://david-dm.org/es-shims/Array.prototype.flatMap [dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.flatMap/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.flatMap#info=devDependencies [npm-badge-png]: https://nodei.co/npm/array.prototype.flatmap.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/array.prototype.flatmap.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/array.prototype.flatmap.svg [downloads-url]: https://npm-stat.com/charts.html?package=array.prototype.flatmap [codecov-image]: https://codecov.io/gh/es-shims/Array.prototype.flatMap/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/Array.prototype.flatMap/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Array.prototype.flatMap [actions-url]: https://github.com/es-shims/Array.prototype.flatMap/actions

=== npm-async-function
[package-url]: https://npmjs.org/package/async-function [npm-version-svg]: https://versionbadg.es/ljharb/async-function.svg [deps-svg]: https://david-dm.org/ljharb/async-function.svg [deps-url]: https://david-dm.org/ljharb/async-function [dev-deps-svg]: https://david-dm.org/ljharb/async-function/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/async-function#info=devDependencies [npm-badge-png]: https://nodei.co/npm/async-function.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/async-function.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/async-function.svg [downloads-url]: https://npm-stat.com/charts.html?package=async-function [codecov-image]: https://codecov.io/gh/ljharb/async-function/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/async-function/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/async-function [actions-url]: https://github.com/ljharb/async-function/actions

=== npm-available-typed-arrays
[1]: https://npmjs.org/package/available-typed-arrays [2]: https://versionbadg.es/inspect-js/available-typed-arrays.svg [5]: https://david-dm.org/inspect-js/available-typed-arrays.svg [6]: https://david-dm.org/inspect-js/available-typed-arrays [7]: https://david-dm.org/inspect-js/available-typed-arrays/dev-status.svg [8]: https://david-dm.org/inspect-js/available-typed-arrays#info=devDependencies [11]: https://nodei.co/npm/available-typed-arrays.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/available-typed-arrays.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/available-typed-arrays.svg [downloads-url]: https://npm-stat.com/charts.html?package=available-typed-arrays [codecov-image]: https://codecov.io/gh/inspect-js/available-typed-arrays/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/available-typed-arrays/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/available-typed-arrays [actions-url]: https://github.com/inspect-js/available-typed-arrays/actions

=== npm-better-sqlite3
`better-sqlite3` is used by thousands of developers and engineers on a daily basis. Long nights and weekends were spent keeping this project strong and dependable, with no ask for compensation or funding, until now. If your company uses `better-sqlite3`, ask your manager to consider supporting the project:

=== npm-bindings
Throughout the course of Node's native addon history, addons have ended up being compiled in a variety of different places, depending on which build tool and which version of node was used. To make matters worse, now the `gyp` build tool can produce either a __Release__ or __Debug__ build, each being built into different locations.

=== npm-bl
**bl** is a storage object for collections of Node Buffers, exposing them with the main Buffer readable API. Also works as a duplex stream so you can collect buffers from a stream that emits them and emit buffers to a stream that consumes them!

=== npm-body-parser
**Note** As `req.body`'s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, `req.body.foo.toString()` may fail in multiple ways, for example the `foo` property may not be there or may not be a string, and `toString` may not be a function and instead a string or other user input.

=== npm-braces
**Description**: To prevent malicious patterns from being passed by users, an error is thrown when `braces.expand()` is used or `options.expand` is true and the generated range will exceed the `rangeLimit`.

=== npm-browserslist
Developers set their version lists using queries like `last 2 versions` to be free from updating versions manually. Browserslist will use [`caniuse-lite`] with [Can I Use] data for this queries.

=== npm-c8
A configuration file can be specified by passing its path on the command line with `--config` or `-c`. If no config option is provided, c8 searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or `.nycrc.json`, starting from `cwd` and walking up the filesystem tree.

=== npm-call-bind
[package-url]: https://npmjs.org/package/call-bind [npm-version-svg]: https://versionbadg.es/ljharb/call-bind.svg [deps-svg]: https://david-dm.org/ljharb/call-bind.svg [deps-url]: https://david-dm.org/ljharb/call-bind [dev-deps-svg]: https://david-dm.org/ljharb/call-bind/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/call-bind#info=devDependencies [npm-badge-png]: https://nodei.co/npm/call-bind.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/call-bind.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/call-bind.svg [downloads-url]: https://npm-stat.com/charts.html?package=call-bind [codecov-image]: https://codecov.io/gh/ljharb/call-bind/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/call-bind/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/call-bind [actions-url]: https://github.com/ljharb/call-bind/actions

=== npm-ccount
I find this particularly useful when generating code, for example, when building a string that can either be double or single quoted. I use this utility to choose single quotes when double quotes are used more frequently, and double quotes otherwise.

=== npm-character-entities
This package is at least compatible with all maintained versions of Node.js. As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+. It also works in Deno and modern browsers.

=== npm-cliui
Specify the maximum width of the UI being generated. If no width is provided, cliui will try to get the current window's width and use it, and if that doesn't work, width will be set to `80`.

=== npm-color-convert
Color-convert is a color conversion library for JavaScript and node. It converts all ways between `rgb`, `hsl`, `hsv`, `hwb`, `cmyk`, `ansi`, `ansi16`, `hex` strings, and CSS `keyword`s (will round to closest):

=== npm-content-disposition
Create an attachment `Content-Disposition` header value using the given file name, if supplied. The `filename` is optional and if no file name is desired, but you want to specify `options`, set `filename` to `undefined`.

=== npm-content-type
Format an object into a `Content-Type` header. This will return a string of the content type for the given object with the following properties (examples are shown that produce the string `'image/svg+xml; charset=utf-8'`):

=== npm-convert-source-map
Prior to v2.0.0, the `fromMapFileComment` and `fromMapFileSource` functions took a String directory path and used that to resolve & read the source map file from the filesystem. However, this made the library limited to nodejs environments and broke on sources with querystrings.

=== npm-cookie
Parse an HTTP `Cookie` header string and returning an object of all cookie name-value pairs. The `str` argument is the string representing a `Cookie` header value and `options` is an optional object containing additional parsing options.

=== npm-cors
This module supports validating the origin dynamically using a function provided to the `origin` option. This function will be passed a string that is the origin (or `undefined` if the request has no origin), and a `callback` with the signature `callback(error, origin)`.

=== npm-cross-spawn
All these issues are handled correctly by `cross-spawn`. There are some known modules, such as [win-spawn](https://github.com/ForbesLindesay/win-spawn), that try to solve this but they are either broken or provide faulty escaping of shell arguments.

=== npm-csstype
In some cases, like for CSS-in-JS libraries, an array of values is a way to provide fallback values in CSS. Using `CSS.PropertiesFallback` instead of `CSS.Properties` will add the possibility to use any property value as an array of values.

=== npm-debug
`debug` exposes a function; simply pass this function the name of your module, and it will return a decorated version of `console.error` for you to pass debug statements to. This will allow you to toggle the debug output for different parts of your module as well as the module as a whole.

=== npm-define-properties
Define multiple non-enumerable properties at once. Uses `Object.defineProperty` when available; falls back to standard assignment in older engines. Existing properties are not overridden. Accepts a map of property names to a predicate that, when true, force-overrides.

=== npm-depd
This library allows you to display deprecation messages to your users. This library goes above and beyond with deprecation warnings by introspection of the call stack (but only the bits that it is interested in).

=== npm-ee-first
Invoke `listener` on the first event from the list specified in `arr`. `arr` is an array of arrays, with each array in the format `[ee, ...event]`. `listener` will be called only once, the first time any of the given events are emitted. If `error` is one of the listened events, then if that fires first, the `listener` will be given the `err` argument.

=== npm-encodeurl
This function accepts a URL and encodes all the non-URL code points (as UTF-8 byte sequences). It will not encode the "%" character unless it is not part of a valid sequence (`%20` will be left as-is, but `%foo` will be encoded as `%25foo`).

=== npm-es-abstract
All abstract operations are also available under an `es5`/`es2015`/`es2016`/`es2017`/`es2018`/`es2019`/`es2020`/`es2021` entry point, and as a property on the `main` export, but using deep imports is highly encouraged for bundle size and performance reasons. Non-deep entry points will be removed in the next semver-major release.

=== npm-es-set-tostringtag
[package-url]: https://npmjs.com/package/es-set-tostringtag [npm-version-svg]: https://versionbadg.es/es-shims/es-set-tostringtag.svg [deps-svg]: https://david-dm.org/es-shims/es-set-tostringtag.svg [deps-url]: https://david-dm.org/es-shims/es-set-tostringtag [dev-deps-svg]: https://david-dm.org/es-shims/es-set-tostringtag/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/es-set-tostringtag#info=devDependencies [npm-badge-png]: https://nodei.co/npm/es-set-tostringtag.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/es-set-tostringtag.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/es-set-tostringtag.svg [downloads-url]: https://npm-stat.com/charts.html?package=es-set-tostringtag [codecov-image]: https://codecov.io/gh/es-shims/es-set-tostringtag/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/es-set-tostringtag/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/es-set-tostringtag [actions-url]: https://github.com/es-shims/es-set-tostringtag/actions

=== npm-es-shim-unscopables
[package-url]: https://npmjs.org/package/es-shim-unscopables [npm-version-svg]: https://versionbadg.es/ljharb/es-shim-unscopables.svg [deps-svg]: https://david-dm.org/ljharb/es-shim-unscopables.svg [deps-url]: https://david-dm.org/ljharb/es-shim-unscopables [dev-deps-svg]: https://david-dm.org/ljharb/es-shim-unscopables/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/es-shim-unscopables#info=devDependencies [npm-badge-png]: https://nodei.co/npm/es-shim-unscopables.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/es-shim-unscopables.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/es-shim-unscopables.svg [downloads-url]: https://npm-stat.com/charts.html?package=es-shim-unscopables [codecov-image]: https://codecov.io/gh/ljharb/es-shim-unscopables/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/es-shim-unscopables/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/es-shim-unscopables [actions-url]: https://github.com/ljharb/es-shim-unscopables/actions

=== npm-es-to-primitive
ECMAScript “ToPrimitive” algorithm. Provides ES5 and ES2015 versions. When different versions of the spec conflict, the default export will be the latest version of the abstract operation. Alternative versions will also be available under an `es5`/`es2015` exported property if you require a specific version.

=== npm-eslint-plugin-import
This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names. All the goodness that the ES2015+ static module syntax intends to provide, marked up in your editor.

=== npm-etag
Generate a strong ETag for the given entity. This should be the complete body of the entity. Strings, `Buffer`s, and `fs.Stats` are accepted. By default, a strong ETag is generated except for `fs.Stats`, which will generate a weak ETag (this can be overwritten by `options.weak`).

=== npm-express
The Express.js project welcomes all constructive contributions. Contributions take many forms, from code for bug fixes and enhancements, to additions and fixes to documentation, additional tests, triaging incoming pull requests and issues, and more!

=== npm-extend
If a boolean true is specified as the first argument, extend performs a deep copy, recursively copying any objects it finds. Otherwise, the copy will share structure with the original object(s). Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over. Warning: passing `false` as the first argument is not supported.

=== npm-fast-deep-equal
__Please note__: this benchmark runs against the available test cases. To choose the most performant library for your application, it is recommended to benchmark against your data and to NOT expect this benchmark to reflect the performance difference in your application.

=== npm-fast-xml-parser
It can handle big files (tested up to 100mb). XML Entities, HTML entities, and DOCTYPE entites are supported. Unpaired tags (Eg `<br>` in HTML), stop nodes (Eg `<script>` in HTML) are supported. It can also preserve Order of tags in JS object

=== npm-fastq
Arguments: * `that`, optional context of the `worker` function. * `worker`, worker function, it would be called with `that` as `this`, if that is specified. It MUST return a `Promise`. * `concurrency`, number of concurrent tasks that could be executed in parallel.

=== npm-fault
This package is at least compatible with all maintained versions of Node.js. As of now, that is Node.js 12.20+, 14.14+, and 16.0+. It also works in Deno and modern browsers.

=== npm-fetch-blob
Updating from 2 to 3 should be a breeze since there is not many changes to the blob specification. The major cause of a major release is coding standards. - internal WeakMaps was replaced with private fields - internal Buffer.from was replaced with TextEncoder/Decoder - internal buffers was replaced with Uint8Arrays - CommonJS was replaced with ESM - The node stream returned by calling `blob.stream()` was replaced with whatwg streams - (Read "Differences from other blobs" for more info.)

=== npm-finalhandler
Returns function to be invoked as the final step for the given `req` and `res`. This function is to be invoked as `fn(err)`. If `err` is falsy, the handler will write out a 404 response to the `res`. If it is truthy, an error response will be written out to the `res` or `res` will be terminated if a response has already started.

=== npm-flatted
If you need anything more complex than values JSON understands, there is a standard approach to recursion and more data-types than what JSON allows, and it's part of the [Structured Clone polyfill](https://github.com/ungap/structured-clone/#readme).

=== npm-formdata-polyfill
The browser polyfill will likely have done its part already, and i hope you stop supporting old browsers c",)<br> But NodeJS still laks a proper FormData<br>The good old form-data package is a very old and isn't spec compatible and dose some abnormal stuff to construct and read FormData instances that other http libraries are not happy about when it comes to follow the spec.

=== npm-forwarded
Parse the `X-Forwarded-For` header from the request. Returns an array of the addresses, including the socket address for the `req`, in reverse order (i.e. index `0` is the socket address and the last index is the furthest address, typically the end-user).

=== npm-fresh
When the response is still "fresh" in the client's cache `true` is returned, otherwise `false` is returned to indicate that the client cache is now stale and the full response should be sent.

=== npm-function-bind
[package-url]: https://npmjs.org/package/function-bind [npm-version-svg]: https://versionbadg.es/Raynos/function-bind.svg [deps-svg]: https://david-dm.org/Raynos/function-bind.svg [deps-url]: https://david-dm.org/Raynos/function-bind [dev-deps-svg]: https://david-dm.org/Raynos/function-bind/dev-status.svg [dev-deps-url]: https://david-dm.org/Raynos/function-bind#info=devDependencies [npm-badge-png]: https://nodei.co/npm/function-bind.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/function-bind.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/function-bind.svg [downloads-url]: https://npm-stat.com/charts.html?package=function-bind [codecov-image]: https://codecov.io/gh/Raynos/function-bind/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/Raynos/function-bind/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/Raynos/function-bind [actions-url]: https://github.com/Raynos/function-bind/actions

=== npm-function.prototype.name
Manually tested in: - Safari: v4 - v15 <sub>(4, 5, 5.1, 6.0.5, 6.2, 7.1, 8, 9.1.3, 10.1.2, 11.1.2, 12.1, 13.1.2, 14.1.2, 15.3, 15.6.1)</sub> - Chrome: v15 - v81, v83 - v106<sub>(every integer version)</sub> - Note: This includes Edge v80+ and Opera v15+, which matches Chrome - Firefox: v3, v3.6, v4 - v105 <sub>(every integer version)</sub> - Note: in v42 - v63, `Function.prototype.toString` throws on HTML element constructors, or a Proxy to a function - Note: in v20 - v35, HTML element constructors are not callable, despite having typeof `function` - IE: v6 - v11<sub>(every integer version</sub> - Opera: v11.1, v11.5, v11.6, v12.0, v12.1, v12.14, v12.15, v12.16, v15+ <sub>v15+ matches Chrome</sub>

=== npm-functions-have-names
[package-url]: https://npmjs.org/package/functions-have-names [npm-version-svg]: https://versionbadg.es/inspect-js/functions-have-names.svg [deps-svg]: https://david-dm.org/inspect-js/functions-have-names.svg [deps-url]: https://david-dm.org/inspect-js/functions-have-names [dev-deps-svg]: https://david-dm.org/inspect-js/functions-have-names/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/functions-have-names#info=devDependencies [npm-badge-png]: https://nodei.co/npm/functions-have-names.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/functions-have-names.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/functions-have-names.svg [downloads-url]: https://npm-stat.com/charts.html?package=functions-have-names [codecov-image]: https://codecov.io/gh/inspect-js/functions-have-names/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/functions-have-names/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/functions-have-names [actions-url]: https://github.com/inspect-js/functions-have-names/actions

=== npm-gensync
This module allows for developers to write common code that can share implementation details, hiding whether an underlying request happens synchronously or asynchronously. This is in contrast with many current Node APIs which explicitly implement the same API twice, once with calls to synchronous functions, and once with asynchronous functions.

=== npm-get-caller-file
This is a utility, which allows a function to figure out from which file it was invoked. It does so by inspecting v8's stack trace at the time it is invoked.

=== npm-get-intrinsic
[package-url]: https://npmjs.org/package/get-intrinsic [npm-version-svg]: https://versionbadg.es/ljharb/get-intrinsic.svg [deps-svg]: https://david-dm.org/ljharb/get-intrinsic.svg [deps-url]: https://david-dm.org/ljharb/get-intrinsic [dev-deps-svg]: https://david-dm.org/ljharb/get-intrinsic/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/get-intrinsic#info=devDependencies [npm-badge-png]: https://nodei.co/npm/get-intrinsic.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/get-intrinsic.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/get-intrinsic.svg [downloads-url]: https://npm-stat.com/charts.html?package=get-intrinsic [codecov-image]: https://codecov.io/gh/ljharb/get-intrinsic/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/get-intrinsic/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/get-intrinsic [actions-url]: https://github.com/ljharb/get-intrinsic/actions

=== npm-get-symbol-description
[1]: https://npmjs.org/package/get-symbol-description [2]: https://versionbadg.es/inspect-js/get-symbol-description.svg [5]: https://david-dm.org/inspect-js/get-symbol-description.svg [6]: https://david-dm.org/inspect-js/get-symbol-description [7]: https://david-dm.org/inspect-js/get-symbol-description/dev-status.svg [8]: https://david-dm.org/inspect-js/get-symbol-description#info=devDependencies [11]: https://nodei.co/npm/get-symbol-description.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/get-symbol-description.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/get-symbol-description.svg [downloads-url]: https://npm-stat.com/charts.html?package=get-symbol-description [codecov-image]: https://codecov.io/gh/inspect-js/get-symbol-description/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/get-symbol-description/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/get-symbol-description [actions-url]: https://github.com/inspect-js/get-symbol-description/actions

=== npm-github-slugger
Generate a slug just like GitHub does for markdown headings. It also ensures slugs are unique in the same way GitHub does it. The overall goal of this package is to emulate the way GitHub handles generating markdown heading anchors as close as possible.

=== npm-glob-parent
This library attempts a quick and imperfect method of determining which path parts have glob magic without fully parsing/lexing the pattern. There are some advanced use cases that can trip it up, such as nested braces where the outer pair is escaped and the inner one contains a path separator. If you find yourself in the unlikely circumstance of being affected by this or need to ensure higher-fidelity glob handling in your library, it is recommended that you pre-process your input with [expand-braces] and/or [expand-brackets].

=== npm-globalthis
[npm-url]: https://npmjs.org/package/globalthis [npm-version-svg]: https://versionbadg.es/ljharb/globalThis.svg [deps-svg]: https://david-dm.org/ljharb/globalThis.svg?theme=shields.io [deps-url]: https://david-dm.org/ljharb/globalThis [dev-deps-svg]: https://david-dm.org/ljharb/globalThis/dev-status.svg?theme=shields.io [dev-deps-url]: https://david-dm.org/ljharb/globalThis#info=devDependencies [npm-badge-png]: https://nodei.co/npm/globalthis.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/globalthis.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/globalthis.svg [downloads-url]: https://npm-stat.com/charts.html?package=globalthis [codecov-image]: https://codecov.io/gh/es-shims/globalThis/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/globalThis/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/globalThis [actions-url]: https://github.com/es-shims/globalThis/actions

=== npm-gopd
[package-url]: https://npmjs.org/package/gopd [npm-version-svg]: https://versionbadg.es/ljharb/gopd.svg [deps-svg]: https://david-dm.org/ljharb/gopd.svg [deps-url]: https://david-dm.org/ljharb/gopd [dev-deps-svg]: https://david-dm.org/ljharb/gopd/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/gopd#info=devDependencies [npm-badge-png]: https://nodei.co/npm/gopd.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/gopd.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/gopd.svg [downloads-url]: https://npm-stat.com/charts.html?package=gopd [codecov-image]: https://codecov.io/gh/ljharb/gopd/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/gopd/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/gopd [actions-url]: https://github.com/ljharb/gopd/actions

=== npm-graceful-fs
This module cannot intercept or handle `EMFILE` or `ENFILE` errors from sync methods. If you use sync methods which open file descriptors then you are responsible for dealing with any errors.

=== npm-graphemer
In JavaScript there is not always a one-to-one relationship between string characters and what a user would call a separate visual "letter". Some symbols are represented by several characters. This can cause issues when splitting strings and inadvertently cutting a multi-char letter in half, or when you need the actual number of letters in a string.

=== npm-graphology-communities-louvain
This function also works on multi graphs but won't work with mixed graph as it is not trivial to adapt modularity to this case. As such, if you need to process a true mixed graph (this function will correctly handle mixed graphs containing only directed or undirected edges), cast your graph as either directed or undirected using [graphology-operators](https://github.com/graphology/graphology-operators) dedicated functions.

=== npm-graphology-indices
This library contains multiple low-level indexation structures used to optimize graph computations in other `graphology` libraries. This library is not meant to be used as such and this is why it is not thoroughly documented.

=== npm-graphology-metrics
Beware, the results must be interpreted thusly: a lower score means a more relevant edge, as is intuited in the paper's formulae. This means you can prune edges that have a score greater than a given threshold, as a statistical test. Some other implementations might differ in that they offer the opposite intuition (i.e. greater score = more relevant edge).

=== npm-graphology-shortest-path
Return a map of every shortest path length between the given source & all the nodes of the graph. This is basically the same as [singleSourceLength](#singlesourcelength) except that it will consider any given graph as undirected when traversing.

=== npm-graphology-utils
Function returning whether the given graph is truly multi, i.e. if we can find at least one occurrence of multiple edges of the same type and direction between two nodes.

=== npm-gray-matter
Stringify an object to YAML or the specified language, and append it to the given string. By default, only YAML and JSON can be stringified. See the [engines](#engines) section to learn how to stringify other languages.

=== npm-has-bigints
[package-url]: https://npmjs.org/package/has-bigints [npm-version-svg]: https://versionbadg.es/inspect-js/has-bigints.svg [deps-svg]: https://david-dm.org/inspect-js/has-bigints.svg [deps-url]: https://david-dm.org/inspect-js/has-bigints [dev-deps-svg]: https://david-dm.org/inspect-js/has-bigints/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/has-bigints#info=devDependencies [npm-badge-png]: https://nodei.co/npm/has-bigints.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/has-bigints.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/has-bigints.svg [downloads-url]: https://npm-stat.com/charts.html?package=has-bigints [codecov-image]: https://codecov.io/gh/inspect-js/has-bigints/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/has-bigints/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-bigints [actions-url]: https://github.com/inspect-js/has-bigints/actions

=== npm-has-property-descriptors
[package-url]: https://npmjs.org/package/has-property-descriptors [npm-version-svg]: https://versionbadg.es/inspect-js/has-property-descriptors.svg [deps-svg]: https://david-dm.org/inspect-js/has-property-descriptors.svg [deps-url]: https://david-dm.org/inspect-js/has-property-descriptors [dev-deps-svg]: https://david-dm.org/inspect-js/has-property-descriptors/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/has-property-descriptors#info=devDependencies [npm-badge-png]: https://nodei.co/npm/has-property-descriptors.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/has-property-descriptors.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/has-property-descriptors.svg [downloads-url]: https://npm-stat.com/charts.html?package=has-property-descriptors [codecov-image]: https://codecov.io/gh/inspect-js/has-property-descriptors/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/has-property-descriptors/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-property-descriptors [actions-url]: https://github.com/inspect-js/has-property-descriptors/actions

=== npm-has-proto
[package-url]: https://npmjs.org/package/has-proto [npm-version-svg]: https://versionbadg.es/inspect-js/has-proto.svg [deps-svg]: https://david-dm.org/inspect-js/has-proto.svg [deps-url]: https://david-dm.org/inspect-js/has-proto [dev-deps-svg]: https://david-dm.org/inspect-js/has-proto/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/has-proto#info=devDependencies [npm-badge-png]: https://nodei.co/npm/has-proto.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/has-proto.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/has-proto.svg [downloads-url]: https://npm-stat.com/charts.html?package=has-proto [codecov-image]: https://codecov.io/gh/inspect-js/has-proto/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/has-proto/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-proto [actions-url]: https://github.com/inspect-js/has-proto/actions

=== npm-has-symbols
[1]: https://npmjs.org/package/has-symbols [2]: https://versionbadg.es/inspect-js/has-symbols.svg [5]: https://david-dm.org/inspect-js/has-symbols.svg [6]: https://david-dm.org/inspect-js/has-symbols [7]: https://david-dm.org/inspect-js/has-symbols/dev-status.svg [8]: https://david-dm.org/inspect-js/has-symbols#info=devDependencies [11]: https://nodei.co/npm/has-symbols.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/has-symbols.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/has-symbols.svg [downloads-url]: https://npm-stat.com/charts.html?package=has-symbols [codecov-image]: https://codecov.io/gh/inspect-js/has-symbols/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/has-symbols/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-symbols [actions-url]: https://github.com/inspect-js/has-symbols/actions

=== npm-has-tostringtag
[1]: https://npmjs.org/package/has-tostringtag [2]: https://versionbadg.es/inspect-js/has-tostringtag.svg [5]: https://david-dm.org/inspect-js/has-tostringtag.svg [6]: https://david-dm.org/inspect-js/has-tostringtag [7]: https://david-dm.org/inspect-js/has-tostringtag/dev-status.svg [8]: https://david-dm.org/inspect-js/has-tostringtag#info=devDependencies [11]: https://nodei.co/npm/has-tostringtag.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/has-tostringtag.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/has-tostringtag.svg [downloads-url]: https://npm-stat.com/charts.html?package=has-tostringtag [codecov-image]: https://codecov.io/gh/inspect-js/has-tostringtag/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/has-tostringtag/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/has-tostringtag [actions-url]: https://github.com/inspect-js/has-tostringtag/actions

=== npm-hono
Hono - _**means flame🔥 in Japanese**_ - is a small, simple, and ultrafast web framework built on Web Standards. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, AWS Lambda, Lambda@Edge, and Node.js.

=== npm-html-escaper
Nothing like this could possibly happen if we grab all chars at once and either ways. It's just a fortunate case that after swapping `&` with `&amp;` no other replace will be affected, but it's not portable and universally a bad practice.

=== npm-http-errors
Determine if the provided `val` is an `HttpError`. This will return `true` if the error inherits from the `HttpError` constructor of this module or matches the "duck type" for an error this module creates. All outputs from the `createError` factory will return `true` for this function, including if an non-`HttpError` was passed into the factory.

=== npm-https-proxy-agent
Specifically, this `Agent` implementation connects to an intermediary "proxy" server and issues the [CONNECT HTTP method][CONNECT], which tells the proxy to open a direct TCP connection to the destination server.

=== npm-iconv-lite
This library supports UTF-16LE, UTF-16BE and UTF-16 encodings. First two are straightforward, but UTF-16 is trying to be smart about endianness in the following ways: * Decoding: uses BOM and 'spaces heuristic' to determine input endianness. Default is UTF-16LE, but can be overridden with `defaultEncoding: 'utf-16be'` option. Strips BOM unless `stripBOM: false`. * Encoding: uses UTF-16LE and writes BOM by default. Use `addBOM: false` to override.

=== npm-immediate
Note versions 2.6.5 and earlier were strictly speaking a 'macrotask' library not a microtask one, [see this for the difference](https://github.com/YuzuJS/setImmediate#macrotasks-and-microtasks), if you need a macrotask library, [I got you covered](https://github.com/calvinmetcalf/macrotask).

=== npm-internal-slot
[package-url]: https://npmjs.org/package/internal-slot [npm-version-svg]: https://versionbadg.es/ljharb/internal-slot.svg [deps-svg]: https://david-dm.org/ljharb/internal-slot.svg [deps-url]: https://david-dm.org/ljharb/internal-slot [dev-deps-svg]: https://david-dm.org/ljharb/internal-slot/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/internal-slot#info=devDependencies [npm-badge-png]: https://nodei.co/npm/internal-slot.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/internal-slot.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/internal-slot.svg [downloads-url]: https://npm-stat.com/charts.html?package=internal-slot [codecov-image]: https://codecov.io/gh/ljharb/internal-slot/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/internal-slot/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/internal-slot [actions-url]: https://github.com/ljharb/internal-slot/actions

=== npm-ipaddr.js
ipaddr.js allows you to verify and parse string representation of an IP address, match it against a CIDR range or range list, determine if it falls into some reserved ranges (examples include loopback and private ranges), and convert between IPv4 and IPv4-mapped IPv6 addresses.

=== npm-is-array-buffer
[package-url]: https://npmjs.org/package/is-array-buffer [npm-version-svg]: https://versionbadg.es/inspect-js/is-array-buffer.svg [deps-svg]: https://david-dm.org/inspect-js/is-array-buffer.svg [deps-url]: https://david-dm.org/inspect-js/is-array-buffer [dev-deps-svg]: https://david-dm.org/inspect-js/is-array-buffer/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-array-buffer#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-array-buffer.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-array-buffer.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-array-buffer.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-array-buffer [codecov-image]: https://codecov.io/gh/inspect-js/is-array-buffer/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-array-buffer/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-array-buffer [actions-url]: https://github.com/inspect-js/is-array-buffer/actions

=== npm-is-async-function
[1]: https://npmjs.org/package/is-async-function [2]: https://versionbadg.es/inspect-js/is-async-function.svg [5]: https://david-dm.org/inspect-js/is-async-function.svg [6]: https://david-dm.org/inspect-js/is-async-function [7]: https://david-dm.org/inspect-js/is-async-function/dev-status.svg [8]: https://david-dm.org/inspect-js/is-async-function#info=devDependencies [11]: https://nodei.co/npm/is-async-function.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-async-function.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-async-function.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-async-function [codecov-image]: https://codecov.io/gh/inspect-js/is-async-function/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-async-function/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-async-function [actions-url]: https://github.com/inspect-js/is-async-function/actions

=== npm-is-bigint
[1]: https://npmjs.org/package/is-bigint [2]: https://versionbadg.es/inspect-js/is-bigint.svg [5]: https://david-dm.org/inspect-js/is-bigint.svg [6]: https://david-dm.org/inspect-js/is-bigint [7]: https://david-dm.org/inspect-js/is-bigint/dev-status.svg [8]: https://david-dm.org/inspect-js/is-bigint#info=devDependencies [11]: https://nodei.co/npm/is-bigint.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-bigint.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-bigint.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-bigint [codecov-image]: https://codecov.io/gh/inspect-js/is-bigint/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-bigint/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-bigint [actions-url]: https://github.com/inspect-js/is-bigint/actions

=== npm-is-boolean-object
[1]: https://npmjs.org/package/is-boolean-object [2]: https://versionbadg.es/inspect-js/is-boolean-object.svg [5]: https://david-dm.org/inspect-js/is-boolean-object.svg [6]: https://david-dm.org/inspect-js/is-boolean-object [7]: https://david-dm.org/inspect-js/is-boolean-object/dev-status.svg [8]: https://david-dm.org/inspect-js/is-boolean-object#info=devDependencies [11]: https://nodei.co/npm/is-boolean-object.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-boolean-object.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-boolean-object.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-boolean-object [codecov-image]: https://codecov.io/gh/inspect-js/is-boolean-object/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-boolean-object/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-boolean-object [actions-url]: https://github.com/inspect-js/is-boolean-object/actions

=== npm-is-callable
Manually tested in: - Safari: v4 - v15 <sub>(4, 5, 5.1, 6.0.5, 6.2, 7.1, 8, 9.1.3, 10.1.2, 11.1.2, 12.1, 13.1.2, 14.1.2, 15.3, 15.6.1)</sub> - Note: Safari 9 has `class`, but `Function.prototype.toString` hides that progeny and makes them look like functions, so `class` constructors will be reported by this package as callable, when they are not in fact callable. - Chrome: v15 - v81, v83 - v106<sub>(every integer version)</sub> - Note: This includes Edge v80+ and Opera v15+, which matches Chrome - Firefox: v3, v3.6, v4 - v105 <sub>(every integer version)</sub> - Note: v45 - v54 has `class`, but `Function.prototype.toString` hides that progeny and makes them look like functions, so `class` constructors will be reported by this package as callable, when they are not in fact callable. - Note: in v42 - v63, `Function.prototype.toString` throws on HTML element constructors, or a Proxy to a function - Note: in v20 - v35, HTML element constructors are not callable, despite having typeof `function`. - Note: in v19, `document.all` is not callable. - IE: v6 - v11<sub>(every integer version</sub> - Opera: v11.1, v11.5, v11.6, v12.1, v12.14, v12.15, v12.16, v15+ <sub>v15+ matches Chrome</sub>

=== npm-is-core-module
[1]: https://npmjs.org/package/is-core-module [2]: https://versionbadg.es/inspect-js/is-core-module.svg [5]: https://david-dm.org/inspect-js/is-core-module.svg [6]: https://david-dm.org/inspect-js/is-core-module [7]: https://david-dm.org/inspect-js/is-core-module/dev-status.svg [8]: https://david-dm.org/inspect-js/is-core-module#info=devDependencies [11]: https://nodei.co/npm/is-core-module.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-core-module.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-core-module.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-core-module [codecov-image]: https://codecov.io/gh/inspect-js/is-core-module/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-core-module/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-core-module [actions-url]: https://github.com/inspect-js/is-core-module/actions

=== npm-is-date-object
[1]: https://npmjs.org/package/is-date-object [2]: https://versionbadg.es/inspect-js/is-date-object.svg [5]: https://david-dm.org/inspect-js/is-date-object.svg [6]: https://david-dm.org/inspect-js/is-date-object [7]: https://david-dm.org/inspect-js/is-date-object/dev-status.svg [8]: https://david-dm.org/inspect-js/is-date-object#info=devDependencies [11]: https://nodei.co/npm/is-date-object.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-date-object.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-date-object.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-date-object [codecov-image]: https://codecov.io/gh/inspect-js/is-date-object/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-date-object/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-date-object [actions-url]: https://github.com/inspect-js/is-date-object/actions

=== npm-is-extendable
All objects in JavaScript can have keys, but it's a pain to check for this, since we ether need to verify that the value is not `null` or `undefined` and:

=== npm-is-finalizationregistry
[package-url]: https://npmjs.org/package/is-finalizationregistry [npm-version-svg]: https://versionbadg.es/inspect-js/is-finalizationregistry.svg [deps-svg]: https://david-dm.org/inspect-js/is-finalizationregistry.svg [deps-url]: https://david-dm.org/inspect-js/is-finalizationregistry [dev-deps-svg]: https://david-dm.org/inspect-js/is-finalizationregistry/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-finalizationregistry#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-finalizationregistry.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-finalizationregistry.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-finalizationregistry.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-finalizationregistry [codecov-image]: https://codecov.io/gh/inspect-js/is-finalizationregistry/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-finalizationregistry/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-finalizationregistry [actions-url]: https://github.com/inspect-js/is-finalizationregistry/actions

=== npm-is-generator-function
[1]: https://npmjs.org/package/is-generator-function [2]: https://versionbadg.es/inspect-js/is-generator-function.svg [5]: https://david-dm.org/inspect-js/is-generator-function.svg [6]: https://david-dm.org/inspect-js/is-generator-function [7]: https://david-dm.org/inspect-js/is-generator-function/dev-status.svg [8]: https://david-dm.org/inspect-js/is-generator-function#info=devDependencies [11]: https://nodei.co/npm/is-generator-function.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-generator-function.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-generator-function.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-generator-function [codecov-image]: https://codecov.io/gh/inspect-js/is-generator-function/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-generator-function/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-generator-function [actions-url]: https://github.com/inspect-js/is-generator-function/actions

=== npm-is-glob
When `options.strict === false` the behavior is less strict in determining if a pattern is a glob. Meaning that some patterns that would return `false` may return `true`. This is done so that matching libraries like [micromatch](https://github.com/micromatch/micromatch) have a chance at determining if the pattern is a glob or not.

=== npm-is-map
[1]: https://npmjs.org/package/is-map [2]: https://versionbadg.es/inspect-js/is-map.svg [5]: https://david-dm.org/inspect-js/is-map.svg [6]: https://david-dm.org/inspect-js/is-map [7]: https://david-dm.org/inspect-js/is-map/dev-status.svg [8]: https://david-dm.org/inspect-js/is-map#info=devDependencies [11]: https://nodei.co/npm/is-map.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-map.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-map.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-map [codecov-image]: https://codecov.io/gh/inspect-js/is-map/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-map/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-map [actions-url]: https://github.com/inspect-js/is-map/actions

=== npm-is-negative-zero
[package-url]: https://npmjs.org/package/is-negative-zero [npm-version-svg]: https://versionbadg.es/inspect-js/is-negative-zero.svg [deps-svg]: https://david-dm.org/inspect-js/is-negative-zero.svg [deps-url]: https://david-dm.org/inspect-js/is-negative-zero [dev-deps-svg]: https://david-dm.org/inspect-js/is-negative-zero/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-negative-zero#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-negative-zero.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-negative-zero.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-negative-zero.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-negative-zero [codecov-image]: https://codecov.io/gh/inspect-js/is-negative-zero/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-negative-zero/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-negative-zero [actions-url]: https://github.com/inspect-js/is-negative-zero/actions

=== npm-is-number
In JavaScript, it's not always as straightforward as it should be to reliably check if a value is a number. It's common for devs to use `+`, `-`, or `Number()` to cast a string value to a number (for example, when values are returned from user input, regex matches, parsers, etc). But there are many non-intuitive edge cases that yield unexpected results:

=== npm-is-number-object
[1]: https://npmjs.org/package/is-number-object [2]: https://versionbadg.es/inspect-js/is-number-object.svg [5]: https://david-dm.org/inspect-js/is-number-object.svg [6]: https://david-dm.org/inspect-js/is-number-object [7]: https://david-dm.org/inspect-js/is-number-object/dev-status.svg [8]: https://david-dm.org/inspect-js/is-number-object#info=devDependencies [11]: https://nodei.co/npm/is-number-object.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-number-object.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-number-object.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-number-object [codecov-image]: https://codecov.io/gh/inspect-js/is-number-object/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-number-object/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-number-object [actions-url]: https://github.com/inspect-js/is-number-object/actions

=== npm-is-regex
[1]: https://npmjs.org/package/is-regex [2]: https://versionbadg.es/inspect-js/is-regex.svg [5]: https://david-dm.org/inspect-js/is-regex.svg [6]: https://david-dm.org/inspect-js/is-regex [7]: https://david-dm.org/inspect-js/is-regex/dev-status.svg [8]: https://david-dm.org/inspect-js/is-regex#info=devDependencies [11]: https://nodei.co/npm/is-regex.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-regex.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-regex.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-regex [codecov-image]: https://codecov.io/gh/inspect-js/is-regex/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-regex/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-regex [actions-url]: https://github.com/inspect-js/is-regex/actions

=== npm-is-set
[package-url]: https://npmjs.org/package/is-set [npm-version-svg]: https://versionbadg.es/inspect-js/is-set.svg [deps-svg]: https://david-dm.org/inspect-js/is-set.svg [deps-url]: https://david-dm.org/inspect-js/is-set [dev-deps-svg]: https://david-dm.org/inspect-js/is-set/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-set#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-set.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-set.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-set.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-set [codecov-image]: https://codecov.io/gh/inspect-js/is-set/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-set/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-set [actions-url]: https://github.com/inspect-js/is-set/actions

=== npm-is-shared-array-buffer
[package-url]: https://npmjs.org/package/is-shared-array-buffer [npm-version-svg]: https://versionbadg.es/inspect-js/is-shared-array-buffer.svg [deps-svg]: https://david-dm.org/inspect-js/is-shared-array-buffer.svg [deps-url]: https://david-dm.org/inspect-js/is-shared-array-buffer [dev-deps-svg]: https://david-dm.org/inspect-js/is-shared-array-buffer/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-shared-array-buffer#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-shared-array-buffer.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-shared-array-buffer.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-shared-array-buffer.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-shared-array-buffer [codecov-image]: https://codecov.io/gh/inspect-js/is-shared-array-buffer/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-shared-array-buffer/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-shared-array-buffer [actions-url]: https://github.com/inspect-js/is-shared-array-buffer/actions

=== npm-is-string
[package-url]: https://npmjs.org/package/is-string [npm-version-svg]: https://versionbadg.es/inspect-js/is-string.svg [deps-svg]: https://david-dm.org/inspect-js/is-string.svg [deps-url]: https://david-dm.org/inspect-js/is-string [dev-deps-svg]: https://david-dm.org/inspect-js/is-string/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-string#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-string.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-string.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-string.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-string [codecov-image]: https://codecov.io/gh/inspect-js/is-string/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-string/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-string [actions-url]: https://github.com/inspect-js/is-string/actions

=== npm-is-symbol
[1]: https://npmjs.org/package/is-symbol [2]: https://versionbadg.es/inspect-js/is-symbol.svg [5]: https://david-dm.org/inspect-js/is-symbol.svg [6]: https://david-dm.org/inspect-js/is-symbol [7]: https://david-dm.org/inspect-js/is-symbol/dev-status.svg [8]: https://david-dm.org/inspect-js/is-symbol#info=devDependencies [11]: https://nodei.co/npm/is-symbol.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-symbol.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-symbol.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-symbol [codecov-image]: https://codecov.io/gh/inspect-js/is-symbol/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-symbol/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-symbol [actions-url]: https://github.com/inspect-js/is-symbol/actions

=== npm-is-typed-array
[package-url]: https://npmjs.org/package/is-typed-array [npm-version-svg]: https://versionbadg.es/inspect-js/is-typed-array.svg [deps-svg]: https://david-dm.org/inspect-js/is-typed-array.svg [deps-url]: https://david-dm.org/inspect-js/is-typed-array [dev-deps-svg]: https://david-dm.org/inspect-js/is-typed-array/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-typed-array#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-typed-array.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-typed-array.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-typed-array.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-typed-array [codecov-image]: https://codecov.io/gh/inspect-js/is-typed-array/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-typed-array/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-typed-array [actions-url]: https://github.com/inspect-js/is-typed-array/actions

=== npm-is-weakmap
[package-url]: https://npmjs.org/package/is-weakmap [npm-version-svg]: https://versionbadg.es/inspect-js/is-weakmap.svg [deps-svg]: https://david-dm.org/inspect-js/is-weakmap.svg [deps-url]: https://david-dm.org/inspect-js/is-weakmap [dev-deps-svg]: https://david-dm.org/inspect-js/is-weakmap/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-weakmap#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-weakmap.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-weakmap.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-weakmap.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-weakmap [codecov-image]: https://codecov.io/gh/inspect-js/is-weakmap/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-weakmap/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-weakmap [actions-url]: https://github.com/inspect-js/is-weakmap/actions

=== npm-is-weakset
[package-url]: https://npmjs.org/package/is-weakset [npm-version-svg]: https://versionbadg.es/inspect-js/is-weakset.svg [deps-svg]: https://david-dm.org/inspect-js/is-weakset.svg [deps-url]: https://david-dm.org/inspect-js/is-weakset [dev-deps-svg]: https://david-dm.org/inspect-js/is-weakset/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/is-weakset#info=devDependencies [npm-badge-png]: https://nodei.co/npm/is-weakset.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/is-weakset.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/is-weakset.svg [downloads-url]: https://npm-stat.com/charts.html?package=is-weakset [codecov-image]: https://codecov.io/gh/inspect-js/is-weakset/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/is-weakset/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-weakset [actions-url]: https://github.com/inspect-js/is-weakset/actions

=== npm-jose
`jose` is a JavaScript module for JSON Object Signing and Encryption, providing support for JSON Web Tokens (JWT), JSON Web Signature (JWS), JSON Web Encryption (JWE), JSON Web Key (JWK), JSON Web Key Set (JWKS), and more. The module is designed to work across various Web-interoperable runtimes including Node.js, browsers, Cloudflare Workers, Deno, Bun, and others.

=== npm-js-tokens
Unterminated strings are still matched as strings. JavaScript strings cannot contain (unescaped) newlines, so unterminated strings simply end at the end of the line. Unterminated template strings can contain unescaped newlines, though, so they go on to the end of input.

=== npm-js-yaml
Parses `string` as single YAML document. Returns either a plain object, a string, a number, `null` or `undefined`, or throws `YAMLException` on error. By default, does not support regexps, functions and undefined.

=== npm-json-bigint
Native `Bigint` was added to JS recently, so we added an option to leverage it instead of `bignumber.js`. However, the parsing with native `BigInt` is kept an option for backward compability.

=== npm-json-schema-traverse
Callback function `cb` is called for each schema object (not including draft-06 boolean schemas), including the root schema, in pre-order traversal. Schema references ($ref) are not resolved, they are passed as is. Alternatively, you can pass a `{pre, post}` object as `cb`, and then `pre` will be called before traversing child elements, and `post` will be called after all child elements have been traversed.

=== npm-json5
JSON5 is an extension to the popular [JSON] file format that aims to be easier to **write and maintain _by hand_ (e.g. for config files)**. It is _not intended_ to be used for machine-to-machine communication. (Keep using JSON or other file formats for that. 🙂)

=== npm-jwa
alg Parameter Value | Digital Signature or MAC Algorithm ----------------|---------------------------- HS256 | HMAC using SHA-256 hash algorithm HS384 | HMAC using SHA-384 hash algorithm HS512 | HMAC using SHA-512 hash algorithm RS256 | RSASSA using SHA-256 hash algorithm RS384 | RSASSA using SHA-384 hash algorithm RS512 | RSASSA using SHA-512 hash algorithm PS256 | RSASSA-PSS using SHA-256 hash algorithm PS384 | RSASSA-PSS using SHA-384 hash algorithm PS512 | RSASSA-PSS using SHA-512 hash algorithm ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm none | No digital signature or MAC value included

=== npm-jws
alg Parameter Value | Digital Signature or MAC Algorithm ----------------|---------------------------- HS256 | HMAC using SHA-256 hash algorithm HS384 | HMAC using SHA-384 hash algorithm HS512 | HMAC using SHA-512 hash algorithm RS256 | RSASSA using SHA-256 hash algorithm RS384 | RSASSA using SHA-384 hash algorithm RS512 | RSASSA using SHA-512 hash algorithm PS256 | RSASSA-PSS using SHA-256 hash algorithm PS384 | RSASSA-PSS using SHA-384 hash algorithm PS512 | RSASSA-PSS using SHA-512 hash algorithm ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm none | No digital signature or MAC value included

=== npm-kind-of
In 7 out of 8 cases, this library is 2x-10x faster than other top libraries included in the benchmarks. There are a few things that lead to this performance advantage, none of them hard and fast rules, but all of them simple and repeatable in almost any code library:

=== npm-lie
In Node.js, lie emits an `unhandledRejection` event when a rejected promise isn't caught, in line with [how io.js does it](https://iojs.org/api/process.html#process_event_unhandledrejection). This allows it to act as a promise shim in both Node.js and the browser.

=== npm-magic-string
Suppose you have some source code. You want to make some light modifications to it - replacing a few characters here and there, wrapping it with a header and footer, etc - and ideally you'd like to generate a [source map](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/) at the end of it. You've thought about using something like [recast](https://github.com/benjamn/recast) (which allows you to generate an AST from some JavaScript, manipulate it, and reprint it with a sourcemap without losing your comments and formatting), but it seems like overkill for your needs (or maybe the source code isn't JavaScript).

=== npm-mdast-util-frontmatter
This package contains two extensions that add support for frontmatter syntax as often used in markdown to [mdast][]. These extensions plug into [`mdast-util-from-markdown`][mdast-util-from-markdown] (to support parsing frontmatter in markdown into a syntax tree) and [`mdast-util-to-markdown`][mdast-util-to-markdown] (to support serializing frontmatter in syntax trees to markdown).

=== npm-mdast-util-gfm-autolink-literal
This package contains two extensions that add support for GFM autolink literals syntax in markdown to [mdast][]. These extensions plug into [`mdast-util-from-markdown`][mdast-util-from-markdown] (to support parsing GFM autolinks in markdown into a syntax tree) and [`mdast-util-to-markdown`][mdast-util-to-markdown] (to support serializing GFM autolinks in syntax trees to markdown).

=== npm-mdast-util-gfm-strikethrough
This package contains two extensions that add support for GFM strikethrough syntax in markdown to [mdast][]. These extensions plug into [`mdast-util-from-markdown`][mdast-util-from-markdown] (to support parsing strikethrough in markdown into a syntax tree) and [`mdast-util-to-markdown`][mdast-util-to-markdown] (to support serializing strikethrough in syntax trees to markdown).

=== npm-mdast-util-gfm-table
This package contains two extensions that add support for GFM table syntax in markdown to [mdast][]. These extensions plug into [`mdast-util-from-markdown`][mdast-util-from-markdown] (to support parsing tables in markdown into a syntax tree) and [`mdast-util-to-markdown`][mdast-util-to-markdown] (to support serializing tables in syntax trees to markdown).

=== npm-mdast-util-gfm-task-list-item
This package contains two extensions that add support for GFM task list item syntax in markdown to [mdast][]. These extensions plug into [`mdast-util-from-markdown`][mdast-util-from-markdown] (to support parsing task lists in markdown into a syntax tree) and [`mdast-util-to-markdown`][mdast-util-to-markdown] (to support serializing task lists in syntax trees to markdown).

=== npm-mdast-util-phrasing
When we cut a new major release, we drop support for unmaintained versions of Node. This means we try to keep the current release line, `mdast-util-phrasing@^4`, compatible with Node.js 16.

=== npm-mdast-util-to-string
When we cut a new major release, we drop support for unmaintained versions of Node. This means we try to keep the current release line, `mdast-util-to-string@^4`, compatible with Node.js 16.

=== npm-media-typer
This module will parse a given media type into its component parts, like type, subtype, and suffix. A formatter is also provided to put them back together and the two can be combined to normalize media types into a canonical form.

=== npm-merge2
It will emit 'queueDrain' when all streams merged. If you set `end === false` in options, this event give you a notice that should add more streams to merge or end the mergedStream.

=== npm-micromark-extension-frontmatter
Frontmatter is a metadata format in front of the content. It’s typically written in YAML and is often used with markdown. Frontmatter does not work everywhere so it makes markdown less portable.

=== npm-micromark-extension-gfm
When we cut a new major release, we drop support for unmaintained versions of Node. This means we try to keep the current release line, `micromark-extension-gfm@^3`, compatible with Node.js 16.

=== npm-micromark-extension-gfm-autolink-literal
GitHub employs different algorithms to autolink: one at parse time and one at transform time (similar to how @mentions are done at transform time). This difference can be observed because character references and escapes are handled differently. But also because issues/PRs/comments omit (perhaps by accident?) the second algorithm for `www.`, `http://`, and `https://` links (but not for email links).

=== npm-micromark-extension-gfm-footnote
GitHub announced footnotes [on September 30, 2021][post] but did not specify them in their GFM spec. As they are implemented in their parser and supported in all places where other GFM features work, they can be considered part of GFM. GitHub employs several other features (such as mentions or frontmatter) that are either not in their parser, or not in all places where GFM features work, which should not be considered GFM.

=== npm-micromark-extension-gfm-strikethrough
Sequences are matched together to form strikethrough based on which character they contain, how long they are, and what character occurs before and after each sequence. Otherwise they are turned into data.

=== npm-micromark-extension-gfm-tagfilter
This package contains an extension that adds support for the tagfilter enabled by GFM to [`micromark`][micromark]. The tagfilter is kinda weird and kinda useless. This package exists for completeness. The tag filter is a naïve attempt at XSS protection. You should use a proper HTML sanitizing algorithm.

=== npm-micromark-extension-gfm-task-list-item
It is recommended to use lowercase `x` (instead of uppercase `X`), because in markdown, it is more common to use lowercase in places where casing does not matter. It is also recommended to use a space (instead of a tab), as there is no benefit of using tabs in this case.

=== npm-micromatch
Returns a matcher function from the given glob `pattern` and `options`. The returned function takes a string to match as its only argument and returns true if the string is a match.

=== npm-mime-db
This is a large database of mime types and information about them. It consists of a single, public JSON file and does not include any logic, allowing it to remain as un-opinionated as possible with an API. It aggregates data from the following sources:

=== npm-mime-types
This package considers the programmatic api as the semver compatibility. Additionally, the package which provides the MIME data for this package (`mime-db`) *also* considers it's programmatic api as the semver contract. This means the MIME type resolution is *not* considered in the semver bumps.

=== npm-napi-build-utils
It implements a set of functions that aid in determining the Node-API version supported by the currently running Node instance and the set of Node-API versions against which the Node-API native add-on is designed to be built. Other functions determine whether a particular Node-API version can be built and can issue console warnings for unsupported Node-API versions.

=== npm-natural-orderby
People sort strings containing numbers differently than most sorting algorithms, which sort values by comparing strings in Unicode code point order. This produces an ordering that is inconsistent with human logic.

=== npm-node-domexception
The only possible way is to use some web-ish tools that have been introduced into NodeJS that throws a DOMException and catch the constructor. This is exactly what this package dose for you and exposes it.<br> This way you will have the same class that NodeJS has and you can check if the error is a instance of DOMException.<br> The instanceof check would not have worked with a custom class such as the DOMException provided by domenic which also is much larger in size since it has to re-construct the hole class from the ground up.

=== npm-node-fetch
Instead of implementing `XMLHttpRequest` in Node.js to run browser-specific [Fetch polyfill](https://github.com/github/fetch), why not go from native `http` to `fetch` API directly? Hence, `node-fetch`, minimal code for a `window.fetch` compatible API on Node.js runtime.

=== npm-node-releases
`data/processed` contains `envs.json` with node.js releases data preprocessed to be used by [Browserslist](https://github.com/ai/browserslist) and other projects. Each version in this file contains only necessary info: version, release date, LTS flag/name, and security flag.

=== npm-object-inspect
Additional options: - `quoteStyle`: must be "single" or "double", if present. Default `'single'` for strings, `'double'` for HTML elements. - `maxStringLength`: must be `0`, a positive integer, `Infinity`, or `null`, if present. Default `Infinity`. - `customInspect`: When `true`, a custom inspect method function will be invoked (either undere the `util.inspect.custom` symbol, or the `inspect` property). When the string `'symbol'`, only the symbol method will be invoked. Default `true`. - `indent`: must be "\t", `null`, or a positive integer. Default `null`. - `numericSeparator`: must be a boolean, if present. Default `false`. If `true`, all numbers will be printed with numeric separators (eg, `1234.5678` will be printed as `'1_234.567_8'`)

=== npm-object-keys
[package-url]: https://npmjs.org/package/object-keys [npm-version-svg]: http://versionbadg.es/ljharb/object-keys.svg [travis-svg]: https://travis-ci.org/ljharb/object-keys.svg [travis-url]: https://travis-ci.org/ljharb/object-keys [deps-svg]: https://david-dm.org/ljharb/object-keys.svg [deps-url]: https://david-dm.org/ljharb/object-keys [dev-deps-svg]: https://david-dm.org/ljharb/object-keys/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/object-keys#info=devDependencies [testling-svg]: https://ci.testling.com/ljharb/object-keys.png [testling-url]: https://ci.testling.com/ljharb/object-keys [es5-shim-url]: https://github.com/es-shims/es5-shim/blob/master/es5-shim.js#L542-589 [lodash-url]: https://github.com/lodash/lodash [npm-badge-png]: https://nodei.co/npm/object-keys.png?downloads=true&stars=true [license-image]: http://img.shields.io/npm/l/object-keys.svg [license-url]: LICENSE [downloads-image]: http://img.shields.io/npm/dm/object-keys.svg [downloads-url]: http://npm-stat.com/charts.html?package=object-keys

=== npm-object.assign
Takes a minimum of 2 arguments: `target` and `source`. Takes a variable sized list of source arguments - at least 1, as many as you want. Throws a TypeError if the `target` argument is `null` or `undefined`.

=== npm-object.fromentries
[package-url]: https://npmjs.com/package/object.fromentries [npm-version-svg]: https://versionbadg.es/es-shims/Object.fromEntries.svg [deps-svg]: https://david-dm.org/es-shims/Object.fromEntries.svg [deps-url]: https://david-dm.org/es-shims/Object.fromEntries [dev-deps-svg]: https://david-dm.org/es-shims/Object.fromEntries/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/Object.fromEntries#info=devDependencies [npm-badge-png]: https://nodei.co/npm/object.fromentries.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/object.fromentries.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/object.fromentries.svg [downloads-url]: https://npm-stat.com/charts.html?package=object.fromentries [codecov-image]: https://codecov.io/gh/es-shims/Object.fromEntries/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/Object.fromEntries/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Object.fromEntries [actions-url]: https://github.com/es-shims/Object.fromEntries/actions

=== npm-object.values
[package-url]: https://npmjs.com/package/object.values [npm-version-svg]: https://versionbadg.es/es-shims/Object.values.svg [deps-svg]: https://david-dm.org/es-shims/Object.values.svg [deps-url]: https://david-dm.org/es-shims/Object.values [dev-deps-svg]: https://david-dm.org/es-shims/Object.values/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/Object.values#info=devDependencies [npm-badge-png]: https://nodei.co/npm/object.values.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/object.values.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/object.values.svg [downloads-url]: https://npm-stat.com/charts.html?package=object.values [codecov-image]: https://codecov.io/gh/es-shims/Object.values/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/Object.values/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Object.values [actions-url]: https://github.com/es-shims/Object.values/actions

=== npm-obliterator
Variant of [forEach](#foreach) one can use to iterate over mixed values but with the twist that iterables without proper keys (lists, sets etc.), will yield `null` instead of an index key.

=== npm-on-finished
Attach a listener to listen for the response to finish. The listener will be invoked only once when the response finished. If the response finished to an error, the first argument will contain the error. If the response has already finished, the listener will be invoked.

=== npm-pandemonium
Note that this function will return unordered pairs (i.e. `[0, 1]` and `[1, 0]` are to be considered the same) and will not return pairs containing twice the same item (i.e. `[0, 0]`).

=== npm-parseurl
Parse the URL of the given request object (looks at the `req.url` property) and return the result. The result is the same as `url.parse` in Node.js core. Calling this function multiple times on the same `req` where `req.url` does not change will return a cached parsed object, rather than parsing again.

=== npm-path-to-regexp
Parameters match arbitrary strings in a path by matching up to the end of the segment, or up to any proceeding tokens. They are defined by prefixing a colon to the parameter name (`:foo`). Parameter names can use any valid JavaScript identifier, or be double quoted to use other characters (`:"param-name"`).

=== npm-picomatch
Creates a matcher function from one or more glob patterns. The returned function takes a string to match as its first argument, and returns true if the string is a match. The returned matcher function also takes a boolean as the second argument that, when true, returns an object with additional information.

=== npm-prebuild-install
With `prebuildify`, all prebuilt binaries are shipped inside the package that is published to npm, which means there's no need for a separate download step like you find in `prebuild`. The irony of this approach is that it is faster to download all prebuilt binaries for every platform when they are bundled than it is to download a single prebuilt binary as an install script.

=== npm-prettier-plugin-sort-json
By default, top-level object entries are sorted by key lexically using [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), according to each character's Unicode code point value. It can be [configured](#configuration) to sort recursively, and with a custom sort order.

=== npm-proxy-addr
This module will automatically work with IPv4-mapped IPv6 addresses as well to support node.js in IPv6-only mode. This means that you do not have to specify both `::ffff:a00:1` and `10.0.0.1`.

=== npm-pump
When using standard `source.pipe(dest)` source will _not_ be destroyed if dest emits close or an error. You are also not able to provide a callback to tell when then pipe has finished.

=== npm-range-parser
Parse the given `header` string where `size` is the size of the selected representation that is to be partitioned into subranges. An array of subranges will be returned or negative numbers indicating an error parsing.

=== npm-raw-body
Gets the entire buffer of a stream either as a `Buffer` or a string. Validates the stream's length against an expected length and maximum limit. Ideal for parsing request bodies.

=== npm-reflect.getprototypeof
An ES2015 mostly-spec-compliant `Reflect.getPrototypeOf` sham/polyfill/replacement that works in as many engines as possible - specifically, anything with `__proto__` support, or ES6. Built-in types will also work correctly in older engines.

=== npm-regexp.prototype.flags
[package-url]: https://npmjs.com/package/regexp.prototype.flags [npm-version-svg]: http://versionbadg.es/es-shims/RegExp.prototype.flags.svg [travis-svg]: https://travis-ci.org/es-shims/RegExp.prototype.flags.svg [travis-url]: https://travis-ci.org/es-shims/RegExp.prototype.flags [deps-svg]: https://david-dm.org/es-shims/RegExp.prototype.flags.svg [deps-url]: https://david-dm.org/es-shims/RegExp.prototype.flags [dev-deps-svg]: https://david-dm.org/es-shims/RegExp.prototype.flags/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/RegExp.prototype.flags#info=devDependencies [testling-svg]: https://ci.testling.com/es-shims/RegExp.prototype.flags.png [testling-url]: https://ci.testling.com/es-shims/RegExp.prototype.flags [npm-badge-png]: https://nodei.co/npm/regexp.prototype.flags.png?downloads=true&stars=true [license-image]: http://img.shields.io/npm/l/regexp.prototype.flags.svg [license-url]: LICENSE [downloads-image]: http://img.shields.io/npm/dm/regexp.prototype.flags.svg [downloads-url]: http://npm-stat.com/charts.html?package=regexp.prototype.flags

=== npm-resolve
For advanced users, `paths` can also be a `opts.paths(request, start, opts)` function * request - the import specifier being resolved * start - lookup path * getNodeModulesDirs - a thunk (no-argument function) that returns the paths using standard `node_modules` resolution * opts - the resolution options

=== npm-retry
The example below will retry a potentially failing `dns.resolve` operation `10` times using an exponential backoff strategy. With the default settings, this means the last attempt is made after `17 minutes and 3 seconds`.

=== npm-router
This module is currently an extracted version from the Express project, but with the main change being it can be used with a plain `http.createServer` object or other web frameworks by removing Express-specific API calls.

=== npm-safe-regex-test
[package-url]: https://npmjs.org/package/safe-regex-test [npm-version-svg]: https://versionbadg.es/ljharb/safe-regex-test.svg [deps-svg]: https://david-dm.org/ljharb/safe-regex-test.svg [deps-url]: https://david-dm.org/ljharb/safe-regex-test [dev-deps-svg]: https://david-dm.org/ljharb/safe-regex-test/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/safe-regex-test#info=devDependencies [npm-badge-png]: https://nodei.co/npm/safe-regex-test.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/safe-regex-test.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/safe-regex-test.svg [downloads-url]: https://npm-stat.com/charts.html?package=safe-regex-test [codecov-image]: https://codecov.io/gh/ljharb/safe-regex-test/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/safe-regex-test/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/safe-regex-test [actions-url]: https://github.com/ljharb/safe-regex-test/actions

=== npm-safer-buffer
Then, to achieve compatibility with outdated Node.js versions (`<4.5.0` and 5.x `<5.9.0`), use `const Buffer = require('safer-buffer').Buffer` in all files where you make calls to the new Buffer API. _Use `var` instead of `const` if you need that for your Node.js version range support._

=== npm-section-matter
_With the exception of front-matter, **which must be the very first thing in the string**, the opening delimiter of all other sections must be followed by a string to be used as the `key` for the section._

=== npm-send
Send is a library for streaming files from the file system as a http response supporting partial responses (Ranges), conditional-GET negotiation (If-Match, If-Unmodified-Since, If-None-Match, If-Modified-Since), high test coverage, and granular events which may be leveraged to take appropriate actions in your application or framework.

=== npm-serve-static
Create a new middleware function to serve files from within a given root directory. The file to serve will be determined by combining `req.url` with the provided root directory. When a file is not found, instead of sending a 404 response, this module will instead call `next()` to move on to the next middleware, allowing for stacking and fall-backs.

=== npm-set-cookie-parser
Returns either an array of cookie objects or a map of name => cookie object with `{map: true}`. Each cookie object will have, at a minimum `name` and `value` properties, and may have additional properties depending on the set-cookie header:

=== npm-side-channel
[package-url]: https://npmjs.org/package/side-channel [npm-version-svg]: https://versionbadg.es/ljharb/side-channel.svg [deps-svg]: https://david-dm.org/ljharb/side-channel.svg [deps-url]: https://david-dm.org/ljharb/side-channel [dev-deps-svg]: https://david-dm.org/ljharb/side-channel/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/side-channel#info=devDependencies [npm-badge-png]: https://nodei.co/npm/side-channel.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/side-channel.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/side-channel.svg [downloads-url]: https://npm-stat.com/charts.html?package=side-channel [codecov-image]: https://codecov.io/gh/ljharb/side-channel/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/side-channel/ [actions-image]: https://img.shields.io/github/check-runs/ljharb/side-channel/main [actions-url]: https://github.com/ljharb/side-channel/actions

=== npm-side-channel-weakmap
[package-url]: https://npmjs.org/package/side-channel-weakmap [npm-version-svg]: https://versionbadg.es/ljharb/side-channel-weakmap.svg [deps-svg]: https://david-dm.org/ljharb/side-channel-weakmap.svg [deps-url]: https://david-dm.org/ljharb/side-channel-weakmap [dev-deps-svg]: https://david-dm.org/ljharb/side-channel-weakmap/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/side-channel-weakmap#info=devDependencies [npm-badge-png]: https://nodei.co/npm/side-channel-weakmap.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/side-channel-weakmap.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/side-channel-weakmap.svg [downloads-url]: https://npm-stat.com/charts.html?package=side-channel-weakmap [codecov-image]: https://codecov.io/gh/ljharb/side-channel-weakmap/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/side-channel-weakmap/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/side-channel-weakmap [actions-url]: https://github.com/ljharb/side-channel-weakmap/actions

=== npm-sort-package-json
When you want to check if your files are sorted, you can run CLI with the `--check` flag (or `-c`). This will output a list of not sorted files, if any.

=== npm-string.prototype.trimend
[package-url]: https://npmjs.com/package/string.prototype.trimend [npm-version-svg]: https://vb.teelaun.ch/es-shims/String.prototype.trimEnd.svg [deps-svg]: https://david-dm.org/es-shims/String.prototype.trimEnd.svg [deps-url]: https://david-dm.org/es-shims/String.prototype.trimEnd [dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.trimEnd/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/String.prototype.trimEnd#info=devDependencies [npm-badge-png]: https://nodei.co/npm/string.prototype.trimend.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/string.prototype.trimend.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/string.prototype.trimend.svg [downloads-url]: https://npm-stat.com/charts.html?package=string.prototype.trimend [codecov-image]: https://codecov.io/gh/es-shims/String.prototype.trimEnd/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/String.prototype.trimEnd/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/String.prototype.trimEnd [actions-url]: https://github.com/es-shims/String.prototype.trimEnd/actions

=== npm-string.prototype.trimstart
[package-url]: https://npmjs.com/package/string.prototype.trimstart [npm-version-svg]: https://vb.teelaun.ch/es-shims/String.prototype.trimStart.svg [deps-svg]: https://david-dm.org/es-shims/String.prototype.trimStart.svg [deps-url]: https://david-dm.org/es-shims/String.prototype.trimStart [dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.trimStart/dev-status.svg [dev-deps-url]: https://david-dm.org/es-shims/String.prototype.trimStart#info=devDependencies [npm-badge-png]: https://nodei.co/npm/string.prototype.trimstart.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/string.prototype.trimstart.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/string.prototype.trimstart.svg [downloads-url]: https://npm-stat.com/charts.html?package=string.prototype.trimstart [codecov-image]: https://codecov.io/gh/es-shims/String.prototype.trimStart/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/es-shims/String.prototype.trimStart/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/String.prototype.trimStart [actions-url]: https://github.com/es-shims/String.prototype.trimStart/actions

=== npm-supports-preserve-symlinks-flag
[package-url]: https://npmjs.org/package/node-supports-preserve-symlinks-flag [npm-version-svg]: https://versionbadg.es/inspect-js/node-supports-preserve-symlinks-flag.svg [deps-svg]: https://david-dm.org/inspect-js/node-supports-preserve-symlinks-flag.svg [deps-url]: https://david-dm.org/inspect-js/node-supports-preserve-symlinks-flag [dev-deps-svg]: https://david-dm.org/inspect-js/node-supports-preserve-symlinks-flag/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/node-supports-preserve-symlinks-flag#info=devDependencies [npm-badge-png]: https://nodei.co/npm/node-supports-preserve-symlinks-flag.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/node-supports-preserve-symlinks-flag.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/node-supports-preserve-symlinks-flag.svg [downloads-url]: https://npm-stat.com/charts.html?package=node-supports-preserve-symlinks-flag [codecov-image]: https://codecov.io/gh/inspect-js/node-supports-preserve-symlinks-flag/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/node-supports-preserve-symlinks-flag/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/node-supports-preserve-symlinks-flag [actions-url]: https://github.com/inspect-js/node-supports-preserve-symlinks-flag/actions

=== npm-synckit
js * import globalName from 'module-name' * js * import * as globalName from 'module-name' * js * import fetch from 'node-fetch' * * if (!globalThis.fetch) { * globalThis.fetch = fetch * } * `

=== npm-tar-fs
To ignore various files when packing or extracting add a ignore function to the options. `ignore` is also an alias for `filter`. Additionally you get `header` if you use ignore while extracting. That way you could also filter by metadata.

=== npm-tar-stream
tar-stream is a streaming tar parser and generator and nothing else. It is streams2 and operates purely using streams which means you can easily extract/parse tarballs without ever hitting the file system.

=== npm-test-exclude
Array of extensions that can be included. This ensures that nyc only attempts to process files which it might understand. Note use of some formats may require adding parser plugins to your nyc or babel configuration.

=== npm-to-regex-range
A string is returned so that you can do whatever you need with it before passing it to `new RegExp()` (like adding `^` or `$` boundaries, defining flags, or combining it another string).

=== npm-tsconfig-paths
Typescript by default mimics the Node.js runtime resolution strategy of modules. But it also allows the use of [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html) which allows arbitrary module paths (that doesn't start with "/" or ".") to be specified and mapped to physical paths in the filesystem. The typescript compiler can resolve these paths from `tsconfig` so it will compile OK. But if you then try to execute the compiled files with node (or ts-node), it will only look in the `node_modules` folders all the way up to the root of the filesystem and thus will not find the modules specified by `paths` in `tsconfig`.

=== npm-type-is
Checks if the `request` is one of the `types`. If the request has no body, even if there is a `Content-Type` header, then `null` is returned. If the `Content-Type` header is invalid or does not matches any of the `types`, then `false` is returned. Otherwise, a string of the type that matched is returned.

=== npm-typed-array-byte-length
Robustly get the byte offset of a Typed Array, or `false` if it is not a Typed Array. Works cross-realm, in every engine, even if the `byteOffset` property is overridden.

=== npm-typed-array-byte-offset
Robustly get the byte offset of a Typed Array, or `false` if it is not a Typed Array. Works cross-realm, in every engine, even if the `byteOffset` property is overridden.

=== npm-unbox-primitive
[package-url]: https://npmjs.org/package/unbox-primitive [npm-version-svg]: https://versionbadg.es/ljharb/unbox-primitive.svg [deps-svg]: https://david-dm.org/ljharb/unbox-primitive.svg [deps-url]: https://david-dm.org/ljharb/unbox-primitive [dev-deps-svg]: https://david-dm.org/ljharb/unbox-primitive/dev-status.svg [dev-deps-url]: https://david-dm.org/ljharb/unbox-primitive#info=devDependencies [npm-badge-png]: https://nodei.co/npm/unbox-primitive.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/unbox-primitive.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/unbox-primitive.svg [downloads-url]: https://npm-stat.com/charts.html?package=unbox-primitive [codecov-image]: https://codecov.io/gh/ljharb/unbox-primitive/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/ljharb/unbox-primitive/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/unbox-primitive [actions-url]: https://github.com/ljharb/unbox-primitive/actions

=== npm-unist-util-is
When we cut a new major release, we drop support for unmaintained versions of Node. This means we try to keep the current release line, `unist-util-is@^6`, compatible with Node.js 16.

=== npm-unist-util-stringify-position
In the format of a range `ls:cs-le:ce` (when given `node` or `position`) or a point `l:c` (when given `point`), where `l` stands for line, `c` for column, `s` for `start`, and `e` for end. An empty string (`''`) is returned if the given value is neither `node`, `position`, nor `point`.

=== npm-unist-util-visit
When adding or removing previous siblings of `node` (or next siblings, in case of reverse), the `Visitor` should return a new `Index` to specify the sibling to traverse after `node` is traversed. Adding or removing next siblings of `node` (or previous siblings, in case of reverse) is handled as expected without needing to return a new `Index`.

=== npm-unist-util-visit-parents
You can use this utility when you want to walk the tree and want to know about every parent of each node. You can use [`unist-util-visit`][unist-util-visit] if you don’t care about the entire stack of parents.

=== npm-unpipe
Unpipes all destinations from a given stream. With stream 2+, this is equivalent to `stream.unpipe()`. When used with streams 1 style streams (typically Node.js 0.8 and below), this module attempts to undo the actions done in `stream.pipe(dest)`.

=== npm-v8-to-istanbul
Sometimes you might find yourself wanting to ignore uncovered lines in your application (for example, perhaps you run your tests in Linux, but there's code that only executes on Windows).

=== npm-vary
Adds the given header `field` to the `Vary` response header of `res`. This can be a string of a single field, a string of a valid `Vary` header, or an array of multiple fields.

=== npm-which-builtin-type
[package-url]: https://npmjs.org/package/which-builtin-type [npm-version-svg]: https://versionbadg.es/inspect-js/which-builtin-type.svg [deps-svg]: https://david-dm.org/inspect-js/which-builtin-type.svg [deps-url]: https://david-dm.org/inspect-js/which-builtin-type [dev-deps-svg]: https://david-dm.org/inspect-js/which-builtin-type/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/which-builtin-type#info=devDependencies [npm-badge-png]: https://which-builtin-type/which-builtin-type.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/which-builtin-type.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/which-builtin-type.svg [downloads-url]: https://npm-stat.com/charts.html?package=which-builtin-type [codecov-image]: https://codecov.io/gh/inspect-js/which-builtin-type/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/which-builtin-type/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/which-builtin-type [actions-url]: https://github.com/inspect-js/which-builtin-type/actions

=== npm-which-collection
[1]: https://npmjs.org/package/which-collection [2]: https://versionbadg.es/inspect-js/which-collection.svg [5]: https://david-dm.org/inspect-js/which-collection.svg [6]: https://david-dm.org/inspect-js/which-collection [7]: https://david-dm.org/inspect-js/which-collection/dev-status.svg [8]: https://david-dm.org/inspect-js/which-collection#info=devDependencies [11]: https://nodei.co/npm/which-collection.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/which-collection.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/which-collection.svg [downloads-url]: https://npm-stat.com/charts.html?package=which-collection [codecov-image]: https://codecov.io/gh/inspect-js/which-collection/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/which-collection/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/which-collection [actions-url]: https://github.com/inspect-js/which-collection/actions

=== npm-which-typed-array
[package-url]: https://npmjs.org/package/which-typed-array [npm-version-svg]: https://versionbadg.es/inspect-js/which-typed-array.svg [deps-svg]: https://david-dm.org/inspect-js/which-typed-array.svg [deps-url]: https://david-dm.org/inspect-js/which-typed-array [dev-deps-svg]: https://david-dm.org/inspect-js/which-typed-array/dev-status.svg [dev-deps-url]: https://david-dm.org/inspect-js/which-typed-array#info=devDependencies [npm-badge-png]: https://nodei.co/npm/which-typed-array.png?downloads=true&stars=true [license-image]: https://img.shields.io/npm/l/which-typed-array.svg [license-url]: LICENSE [downloads-image]: https://img.shields.io/npm/dm/which-typed-array.svg [downloads-url]: https://npm-stat.com/charts.html?package=which-typed-array [codecov-image]: https://codecov.io/gh/inspect-js/which-typed-array/branch/main/graphs/badge.svg [codecov-url]: https://app.codecov.io/gh/inspect-js/which-typed-array/ [actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/which-typed-array [actions-url]: https://github.com/inspect-js/which-typed-array/actions

=== npm-ws
**Note**: This module does not work in the browser. The client in the docs is a reference to a backend with the role of a client in the WebSocket communication. Browser clients must use the native [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) object. To make the same code work seamlessly on Node.js and the browser, you can use one of the many wrappers available on npm, like [isomorphic-ws](https://github.com/heineiuo/isomorphic-ws).

=== npm-zod-to-json-schema
As of November 2025, this project will no longer be receiving updates. Zod v4 natively supports generating JSON schemas, so I recommend you switch to the new major, or better yet, a [decent language](https://rust-lang.org/) ;)

=== npm-zod-validation-error
Zod errors are difficult to consume for the end-user. This library wraps Zod validation errors in user-friendly readable messages that can be exposed to the outer world, while maintaining the original errors in an array for _dev_ use.

=== npm-zwitch
Handle one value. Based on the bound `key`, a respective handler will be called. If `value` is not an object, or doesn’t have a `key` property, the special “invalid” handler will be called. If `value` has an unknown `key`, the special “unknown” handler will be called.
