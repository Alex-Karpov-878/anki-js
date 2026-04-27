# JavaScript Code Reading Anki Deck

This workspace contains an import-ready Anki package and TSV deck for beginner-to-advanced JavaScript and Node.js code reading practice.

The deck is generated from 500 distinct snippet topics, with 10 cards per topic. Cards are interleaved by topic inside each module, so the deck does not begin with long runs of nearly identical `const` or `let` examples.

## Files

- `dist/javascript-code-reading-5000.tsv` - the Anki import file with 5000 Basic notes.
- `dist/javascript-code-reading-5000.apkg` - the Anki package file with the same 5000 notes.
- `dist/javascript-code-reading-5000.summary.json` - module counts and output metadata.
- `scripts/generate-js-reading-anki.mjs` - deterministic generator, validator, TSV writer, and APKG writer.
- `scripts/build-apkg.py` - standard-library helper used by the generator to build `collection.anki2` and package it as `.apkg`.

## Import Into Anki Desktop

Recommended: import the package file:

```text
dist/javascript-code-reading-5000.apkg
```

In Anki Desktop, use `File -> Import`, select the `.apkg`, and confirm the import.

The TSV is also available if you want to inspect or customize the notes before importing:

```text
dist/javascript-code-reading-5000.tsv
```

The file includes these Anki headers:

```text
#separator:tab
#html:true
#notetype:Basic
#deck:JavaScript Code Reading::5000 Snippets
#tags:javascript code-reading
#tags column:3
```

After import, Anki should create or update this deck:

```text
JavaScript Code Reading::5000 Snippets
```

## Use With AnkiWeb

AnkiWeb does not directly import local deck files in the web interface. Import the package into Anki Desktop first, then sync it to AnkiWeb:

1. Open Anki Desktop.
2. Import `dist/javascript-code-reading-5000.apkg` with `File -> Import`.
3. If you import the TSV instead, confirm the note type is `Basic`, fields are mapped as `Front`, `Back`, and `Tags`, and HTML is enabled.
4. Click `Sync`.
5. Sign in to your AnkiWeb account if prompted.
6. Choose `Upload to AnkiWeb` if this is the first sync from this profile.
7. Visit AnkiWeb and confirm the `JavaScript Code Reading::5000 Snippets` deck appears.

## Use With AnkiDroid

Recommended path: import on Anki Desktop, sync to AnkiWeb, then sync AnkiDroid.

1. Complete the Anki Desktop import above.
2. Sync Anki Desktop to AnkiWeb.
3. Open AnkiDroid.
4. Sign in with the same AnkiWeb account.
5. Tap sync.
6. Choose `Download from AnkiWeb` if this is the first sync on the device.
7. Open the `JavaScript Code Reading::5000 Snippets` deck.

Direct local import on Android is also possible if you copy `dist/javascript-code-reading-5000.apkg` onto the device and open it with AnkiDroid. The Desktop -> AnkiWeb -> AnkiDroid route is still the most reliable path when you already use Anki sync.

## Note Shape

Each note has:

- Front: a code snippet rendered as HTML.
- Back: intent, annotated code line by line, console output when the front contains `console.log`, and common use cases.
- Tags: module, level, and topic tags.

## Coverage

The topic mix was broadened using high-level JavaScript and Node.js coverage themes rather than copied source text. Added areas include:

- Syntax details: hoisting, temporal dead zone, destructuring variants, logical assignment, tagged templates, symbols, BigInt, and automatic semicolon insertion hazards.
- Functional JavaScript: currying, partial application, composition, `pipe`, predicate combinators, memoization, `once`, debounce, throttle, IIFEs, generators, and dependency injection.
- Collections and data handling: `flatMap`, grouping with `reduce`, `Map` indexing, `Set` operations, `WeakMap`, `WeakSet`, non-mutating array methods, `structuredClone`, iterators, regex groups, `matchAll`, JSON replacers/revivers, URL APIs, encoders, and binary views.
- Node.js runtime: Fastify-style routes, request params and bodies, JWT/password-auth shapes, built-in tests, test doubles, child processes, workers, readline CLIs, streams, Redis/cache-aside, queues, schedulers, scraping, health checks, and graceful shutdown.
- Advanced patterns: revealing module, observer, strategy, adapter, decorator wrappers, command, repository, unit of work, circuit breaker, bulkhead, LRU cache, proxies, reflection, weak references, worker pools, cluster, async local request context, plugins, and middleware error boundaries.
- Complex unrefactored readings: nested normalization, state flag mazes, route selection, mutable aggregation, validation collectors, parser state machines, request coalescing, retry metadata, permission matrices, checkout totals, queue draining, stack-based tree walks, ranked search, migrations, chunking, buffering, header parsing, schedulers, feature flag resolution, and low-level token scanning.

## Regenerate

Requires Node.js and Python 3:

```bash
node scripts/generate-js-reading-anki.mjs
```

The generator verifies the card count, row structure, raw newlines, tabs in fields, duplicate fronts, and required back matter before writing the deck.

It writes both:

```text
dist/javascript-code-reading-5000.tsv
dist/javascript-code-reading-5000.apkg
```
