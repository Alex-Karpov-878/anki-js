# JavaScript Code Reading Anki Deck

This workspace contains an import-ready Anki package and TSV deck for beginner-to-advanced JavaScript and Node.js code reading practice. The current deck is `JavaScript Code Reading::6250 Snippets`.

The deck is generated from 625 distinct snippet and quiz topics, with 10 cards per topic. Cards are interleaved by topic inside each module, so the deck does not begin with long runs of nearly identical `const` or `let` examples.

## Files

- `dist/javascript-code-reading-6250.apkg` - the recommended Anki package file with 6250 Basic notes and the deck styling embedded in the note type.
- `dist/javascript-code-reading-6250.tsv` - the TSV import file with the same 6250 Basic notes. This file is larger because it includes styled HTML in every note field.
- `dist/javascript-code-reading-6250.summary.json` - module counts and output metadata.
- `scripts/generate-js-reading-anki.mjs` - deterministic generator, validator, TSV writer, and APKG writer.
- `scripts/build-apkg.py` - standard-library helper used by the generator to build `collection.anki2` and package it as `.apkg`.

Current generated artifact sizes:

- APKG: about 4.1 MB.
- TSV: about 71 MB.

## Import Into Anki Desktop

Recommended: import the package file:

```text
dist/javascript-code-reading-6250.apkg
```

In Anki Desktop, use `File -> Import`, select the `.apkg`, and confirm the import.

The TSV is also available if you want to inspect or customize the notes before importing:

```text
dist/javascript-code-reading-6250.tsv
```

The APKG path is preferred for normal use because it preserves the shared note type styling directly. The TSV also works, but it stores inline HTML styles in each field so it is much larger.

The file includes these Anki headers:

```text
#separator:tab
#html:true
#notetype:Basic
#deck:JavaScript Code Reading::6250 Snippets
#tags:javascript code-reading
#tags column:3
```

After import, Anki should create or update this deck:

```text
JavaScript Code Reading::6250 Snippets
```

## Use With AnkiWeb

AnkiWeb does not directly import local deck files in the web interface. Import the package into Anki Desktop first, then sync it to AnkiWeb:

1. Open Anki Desktop.
2. Import `dist/javascript-code-reading-6250.apkg` with `File -> Import`.
3. If you import the TSV instead, confirm the note type is `Basic`, fields are mapped as `Front`, `Back`, and `Tags`, and HTML is enabled.
4. Click `Sync`.
5. Sign in to your AnkiWeb account if prompted.
6. Choose `Upload to AnkiWeb` if this is the first sync from this profile.
7. Visit AnkiWeb and confirm the `JavaScript Code Reading::6250 Snippets` deck appears.

## Use With AnkiDroid

Recommended path: import on Anki Desktop, sync to AnkiWeb, then sync AnkiDroid.

1. Complete the Anki Desktop import above.
2. Sync Anki Desktop to AnkiWeb.
3. Open AnkiDroid.
4. Sign in with the same AnkiWeb account.
5. Tap sync.
6. Choose `Download from AnkiWeb` if this is the first sync on the device.
7. Open the `JavaScript Code Reading::6250 Snippets` deck.

Direct local import on Android is also possible if you copy `dist/javascript-code-reading-6250.apkg` onto the device and open it with AnkiDroid. The Desktop -> AnkiWeb -> AnkiDroid route is still the most reliable path when you already use Anki sync.

## Note Shape

Each note has:

- Front: a styled code snippet. Multiple-choice cards also include a styled question block and A-D answer choices on the front.
- Back: level/module/topic badges, intent, a "read it as" mental model, the correct quiz answer when relevant, annotated code line by line, targeted reading cues, nuance and pitfall notes, console output when the front contains `console.log`, and common use cases.
- Tags: module, level, topic tags, and `multiple-choice` for quiz cards.

The back matter is generated for every card, not just advanced cards. This gives beginners a consistent reading routine while still adding higher-level cautions for async behavior, mutation, coercion, closures, object identity, Node.js resources, and production-style unrefactored snippets.

## Card Styling

The generated cards use HTML styling intended to make long code-reading cards easier to scan:

- A clean card shell with constrained width and readable spacing.
- Dark monospace code blocks with static JavaScript syntax highlighting for snippets.
- Separate visual blocks for intent, mental model, annotated code, reading cues, pitfalls, console output, and use cases.
- Highlighted answer and explanation blocks for multiple-choice cards.
- Level, module, and topic badges on the back.

The APKG stores shared CSS in the Anki note type. The TSV stores inline HTML styles so the cards still render acceptably when imported from TSV.

## Coverage

The topic mix was broadened using high-level JavaScript and Node.js coverage themes rather than copied source text. Added areas include:

- Syntax details: hoisting, temporal dead zone, destructuring variants, logical assignment, tagged templates, symbols, BigInt, and automatic semicolon insertion hazards.
- Functional JavaScript: currying, partial application, composition, `pipe`, predicate combinators, memoization, `once`, debounce, throttle, IIFEs, generators, and dependency injection.
- Collections and data handling: `flatMap`, grouping with `reduce`, `Map` indexing, `Set` operations, `WeakMap`, `WeakSet`, non-mutating array methods, `structuredClone`, iterators, regex groups, `matchAll`, JSON replacers/revivers, URL APIs, encoders, and binary views.
- Node.js runtime: Fastify-style routes, request params and bodies, JWT/password-auth shapes, built-in tests, test doubles, child processes, workers, readline CLIs, streams, Redis/cache-aside, queues, schedulers, scraping, health checks, and graceful shutdown.
- Advanced patterns: revealing module, observer, strategy, adapter, decorator wrappers, command, repository, unit of work, circuit breaker, bulkhead, LRU cache, proxies, reflection, weak references, worker pools, cluster, async local request context, plugins, and middleware error boundaries.
- Complex unrefactored readings: nested normalization, state flag mazes, route selection, mutable aggregation, validation collectors, parser state machines, request coalescing, retry metadata, permission matrices, checkout totals, queue draining, stack-based tree walks, ranked search, migrations, chunking, buffering, header parsing, schedulers, feature flag resolution, and low-level token scanning.
- Interview-style expansion: 1000 code-reading cards covering scope, coercion, operators, loops, conditionals, hoisting, errors, strict mode, objects, prototypes, classes, copying, arrays, map/reduce/filter, functions, callbacks, DOM operations, call stack, and event-loop problems.
- Quiz cards: 250 multiple-choice cards across the interview-style section, tagged `multiple-choice`, with the answer and explanation on the back.

## Regenerate

Requires Node.js and Python 3:

```bash
node scripts/generate-js-reading-anki.mjs
```

The generator verifies the card count, row structure, raw newlines, tabs in fields, duplicate fronts, and required back matter before writing the deck.

It writes both:

```text
dist/javascript-code-reading-6250.tsv
dist/javascript-code-reading-6250.apkg
```

## Validation Status

The current generated files were checked after the latest styling, highlighting, and output pass:

- TSV import shape: 6250 rows, 0 malformed rows.
- APKG package: 6250 notes and 6250 cards.
- Styled fields: all 6250 fronts and backs include the styled card wrapper and highlighted JavaScript code spans.
- Snippet syntax: 5110 snippets parse as scripts, 1140 parse as modules, 0 syntax issues.
- Console output: all 510 `console.log` cards include output back matter.
- Exact console output: 351 cards were executed in Node with 0 output mismatches.
- Runtime-dependent console notes: 159 cards were checked with controlled fixtures and 0 failures.
