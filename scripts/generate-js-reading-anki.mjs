import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUTPUT_FILE = "dist/javascript-code-reading-6250.tsv";
const APKG_FILE = "dist/javascript-code-reading-6250.apkg";
const SUMMARY_FILE = "dist/javascript-code-reading-6250.summary.json";
const OUTPUT = resolve(OUTPUT_FILE);
const APKG_OUTPUT = resolve(APKG_FILE);
const SUMMARY = resolve(SUMMARY_FILE);
const TARGET_COUNT = 6250;
const CARDS_PER_TOPIC = 10;
const INTERVIEW_CODE_TOPIC_COUNT = 100;
const INTERVIEW_QUIZ_TOPIC_COUNT = 25;
const DECK_ID = 1777242703000;
const MODEL_ID = 1777242703001;
const NOTE_ID_START = 1777242704000;
const CARD_ID_START = 1777242708000;
const FIELD_SEPARATOR = "\x1f";
const DECK_NAME = "JavaScript Code Reading::6250 Snippets";

const modules = [
  { key: "syntax", label: "Syntax and values", level: 1, target: 500 },
  { key: "expressions", label: "Expressions and operators", level: 2, target: 500 },
  { key: "control", label: "Control flow", level: 3, target: 500 },
  { key: "functions", label: "Functions, scope, and closures", level: 4, target: 500 },
  { key: "collections", label: "Arrays, objects, maps, and sets", level: 5, target: 500 },
  { key: "data", label: "Strings, numbers, dates, regex, and JSON", level: 6, target: 500 },
  { key: "oop_modules", label: "Classes, prototypes, and modules", level: 7, target: 500 },
  { key: "async", label: "Promises, async code, and concurrency", level: 8, target: 500 },
  { key: "node", label: "Node.js runtime, files, HTTP, and streams", level: 9, target: 500 },
  { key: "advanced", label: "Advanced JavaScript and Node.js patterns", level: 10, target: 500 },
  { key: "interview", label: "Interview-style patterns and problem readings", level: 11, target: 1250 },
];

const identifiers = [
  "user",
  "order",
  "invoice",
  "profile",
  "task",
  "session",
  "product",
  "message",
  "request",
  "config",
  "cache",
  "token",
  "report",
  "comment",
  "item",
  "entry",
  "job",
  "record",
  "account",
  "payload",
  "event",
  "response",
  "article",
  "setting",
  "workspace",
  "member",
  "route",
  "plugin",
  "client",
  "file",
  "stream",
  "handler",
  "query",
  "result",
  "state",
  "draft",
];

const labels = [
  "Ada",
  "Lin",
  "Grace",
  "Ken",
  "Rina",
  "Sam",
  "Mina",
  "Omar",
  "Nia",
  "Taro",
  "Jules",
  "Iris",
  "Noah",
  "Mika",
  "Eli",
  "Zoe",
  "Alex",
  "Bea",
  "Hana",
  "Ravi",
  "Maya",
  "Luis",
  "Kira",
  "Theo",
  "Priya",
  "Jon",
  "Mei",
  "Sora",
  "Ivy",
  "Vera",
  "Niko",
  "Lea",
  "Ari",
  "Yuki",
  "Tess",
  "Mo",
  "Kai",
  "Rhea",
  "Finn",
  "Lina",
  "Drew",
  "Milo",
  "June",
  "Cleo",
  "Paz",
  "Uma",
  "Ren",
  "Sol",
  "Luca",
  "Mira",
];

const statuses = [
  "new",
  "ready",
  "active",
  "paused",
  "done",
  "failed",
  "queued",
  "sent",
  "draft",
  "archived",
];

const nouns = [
  "users",
  "orders",
  "tasks",
  "messages",
  "products",
  "sessions",
  "comments",
  "tickets",
  "files",
  "events",
  "reports",
  "profiles",
  "jobs",
  "records",
  "articles",
  "members",
  "routes",
  "plugins",
  "invoices",
  "workspaces",
  "teams",
  "projects",
  "notes",
  "alerts",
  "payments",
  "subscriptions",
  "roles",
  "permissions",
  "sessions2",
  "templates",
  "layouts",
  "widgets",
  "menus",
  "links",
  "pages",
  "assets",
  "builds",
  "deployments",
  "secrets",
  "keys",
  "logs",
  "metrics",
  "traces",
  "notifications",
  "queues",
  "batches",
  "snapshots",
  "previews",
  "documents",
];

const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
];

const ports = [3000, 3030, 4000, 5000, 5173, 8080, 8787, 9000];
const numbers = [0, 1, 2, 3, 4, 5, 8, 10, 12, 15, 20, 24, 30, 42, 60, 100, 200, 404, 500, 1024];
const amounts = [9.99, 12.5, 19.95, 25, 39.99, 49, 79.5, 99, 149.99, 199, 5.25, 7.75, 14.49, 22.1, 33.33, 44.4, 58.2, 63.95, 72.5, 88.8, 101.1, 118.45, 132.75, 155.2, 172.6, 188.9, 215.4, 249.99, 305.5, 420.25];
const paths = ["./data/users.json", "./logs/app.log", "./config.json", "./public/index.html", "./tmp/report.txt", "./uploads/photo.png", "./db/orders.ndjson", "./README.md"];
const urls = ["https://api.example.com/users", "https://api.example.com/orders", "https://example.test/status", "https://service.local/search", "https://cdn.example.com/assets/app.js"];
const envNames = ["NODE_ENV", "PORT", "DATABASE_URL", "API_KEY", "LOG_LEVEL", "FEATURE_FLAG", "CACHE_TTL", "SESSION_SECRET"];
const eventNames = ["ready", "data", "error", "close", "timeout", "message", "connect", "finish"];
const htmlTags = ["div", "button", "form", "input", "dialog", "article", "section", "template"];

function pick(list, seed) {
  return list[seed % list.length];
}

function word(seed) {
  return pick(identifiers, seed);
}

function title(seed) {
  return pick(labels, seed);
}

function plural(seed) {
  return pick(nouns, seed);
}

function safeIdentifier(value) {
  return value.replace(/[^a-zA-Z0-9_$]/g, "_").replace(/^[0-9]/, "_$&");
}

function singular(value) {
  if (value.endsWith("ies")) return `${value.slice(0, -3)}y`;
  if (value.endsWith("s")) return value.slice(0, -1);
  return value;
}

function upperFirst(value) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sha1(value) {
  return createHash("sha1").update(value).digest("hex");
}

function checksum(value) {
  return Number.parseInt(sha1(value).slice(0, 8), 16);
}

function guidFor(card) {
  return sha1(`${card.module}:${card.topic}:${card.seed}:${card.code}`).slice(0, 16);
}

function inlineCode(value) {
  return `<code>${escapeHtml(value)}</code>`;
}

const CARD_STYLE = "max-width:880px;margin:0 auto;padding:18px 20px;border:1px solid #d7dee8;border-radius:10px;background:#ffffff;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:18px;line-height:1.48;text-align:left;box-sizing:border-box;";
const CODE_FRAME_STYLE = "margin:0.65em 0 1em;padding:14px 16px;border:1px solid #1f2937;border-radius:10px;background:#0f172a;color:#e5e7eb;font-family:Menlo,Consolas,'SFMono-Regular',monospace;overflow:auto;box-sizing:border-box;";
const OUTPUT_FRAME_STYLE = "margin:0.65em 0 0.3em;padding:12px 14px;border:1px solid #14532d;border-radius:10px;background:#052e16;color:#dcfce7;font-family:Menlo,Consolas,'SFMono-Regular',monospace;overflow:auto;box-sizing:border-box;";
const SECTION_STYLE = "margin:14px 0;padding:13px 15px;border:1px solid #dbe3ee;border-radius:9px;background:#f8fafc;box-sizing:border-box;";
const SECTION_TITLE_STYLE = "margin:0 0 8px;color:#334155;font-size:0.78em;font-weight:800;text-transform:uppercase;letter-spacing:0;";
const KEY_VALUE_STYLE = "margin:12px 0;padding:12px 14px;border-left:4px solid #2563eb;border-radius:8px;background:#eff6ff;box-sizing:border-box;";
const QUIZ_STYLE = "margin:14px 0 0;padding:13px 15px;border:1px solid #c4b5fd;border-radius:9px;background:#f5f3ff;box-sizing:border-box;";
const ANSWER_STYLE = "margin:12px 0;padding:12px 14px;border-left:4px solid #16a34a;border-radius:8px;background:#f0fdf4;box-sizing:border-box;";
const LIST_STYLE = "margin:0.35em 0 0;padding-left:1.25em;";
const LIST_ITEM_STYLE = "margin:0.35em 0;";
const BADGE_STYLE = "display:inline-block;margin:0 6px 6px 0;padding:3px 8px;border:1px solid #cbd5e1;border-radius:999px;background:#f1f5f9;color:#334155;font-size:0.74em;font-weight:700;";
const CARD_CSS = [
  ".card { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 18px; line-height: 1.48; text-align: left; color: #111827; background: #eef2f7; padding: 18px; }",
  ".js-card { box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08); }",
  ".js-card-front .js-code-frame { margin-bottom: 0; }",
  ".js-code-frame pre { margin: 0; padding: 0; border: 0; background: transparent; color: inherit; white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere; }",
  ".js-code-frame code { font-family: Menlo, Consolas, 'SFMono-Regular', monospace; font-size: 0.94em; line-height: 1.5; color: inherit; background: transparent; }",
  ".js-output-frame code { color: #dcfce7; }",
  ".js-section p:first-child { margin-top: 0; }",
  ".js-section p:last-child { margin-bottom: 0; }",
  ".js-key-value { margin-top: 12px; margin-bottom: 12px; }",
  ".js-choices li, .js-section li { padding-left: 0.15em; }",
  "#answer { border: 0; border-top: 1px solid #cbd5e1; margin: 18px auto; max-width: 880px; }",
  "@media (max-width: 560px) { .card { padding: 8px; font-size: 16px; } .js-card { padding: 14px 12px !important; border-radius: 8px !important; } .js-code-frame { padding: 12px !important; } }",
].join("\n");

function codeBlock(value) {
  return `<div class="js-code-frame" style="${CODE_FRAME_STYLE}"><pre><code>${escapeHtml(value).replaceAll("\n", "<br>")}</code></pre></div>`;
}

function outputCodeBlock(value) {
  return `<div class="js-code-frame js-output-frame" style="${OUTPUT_FRAME_STYLE}"><pre><code>${escapeHtml(value).replaceAll("\n", "<br>")}</code></pre></div>`;
}

function cardShell(content, side) {
  return `<div class="js-card js-card-${side}" style="${CARD_STYLE}">${content}</div>`;
}

function renderBadge(value) {
  return `<span class="js-badge" style="${BADGE_STYLE}">${escapeHtml(value)}</span>`;
}

function renderBackHeader(card) {
  return `<div class="js-card-meta" style="margin:0 0 12px;">${renderBadge(`Level ${String(card.level).padStart(2, "0")}`)}${renderBadge(card.moduleLabel)}${renderBadge(card.topicLabel)}${card.kind === "quiz" ? renderBadge("Multiple choice") : ""}</div>`;
}

function renderSection(title, body, extraStyle = "") {
  return `<section class="js-section" style="${SECTION_STYLE}${extraStyle}"><p class="js-section-title" style="${SECTION_TITLE_STYLE}"><strong>${escapeHtml(title)}:</strong></p>${body}</section>`;
}

function renderKeyValue(title, value, extraStyle = "") {
  return `<p class="js-key-value" style="${KEY_VALUE_STYLE}${extraStyle}"><strong>${escapeHtml(title)}:</strong> ${sentence(escapeHtml(value))}</p>`;
}

function renderStudyFront(code) {
  return cardShell(codeBlock(code), "front");
}

function sentence(value) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function normalizeSpaces(value) {
  return value.replace(/\s+/g, " ").trim();
}

function tagsFor(card) {
  return [
    "javascript",
    "code-reading",
    card.kind === "quiz" ? "multiple-choice" : null,
    `module-${card.module}`,
    `level-${String(card.level).padStart(2, "0")}`,
    card.topic,
  ]
    .filter(Boolean)
    .map((tag) => tag.replace(/[^a-zA-Z0-9_-]/g, "-"))
    .join(" ");
}

function linesOutput(lines) {
  return { kind: "lines", lines: lines.map(String) };
}

function noteOutput(text) {
  return { kind: "note", text };
}

function noOutput(text = "No console output is produced because the console.log call is inside code that is only defined, not invoked by this snippet.") {
  return { kind: "none", text };
}

function consoleOutputFor(card) {
  if (!card.code.includes("console.log")) return null;

  const i = card.seed;
  const entity = word(i);
  const list = plural(i);
  const propNames = ["name", "status", "role", "email", "title"];
  const prop = pick(propNames, i);
  const computedProp = pick(propNames, i + 2);
  const status = pick(statuses, i);
  const method = pick(methods, i);
  const stop = i + 2;

  switch (card.topic) {
    case "const-binding":
      return linesOutput([title(i)]);
    case "let-reassignment":
      return linesOutput([pick(statuses, i + 3)]);
    case "undefined-check":
      return linesOutput(["true"]);
    case "array-literal":
      return linesOutput(["3"]);
    case "property-access":
      return linesOutput([prop === "name" ? title(i) : status]);
    case "computed-property-access":
      return linesOutput([computedProp === "name" ? title(i) : pick(statuses, i + 1)]);
    case "if-statement":
      return i > 0 ? linesOutput(["Show badge"]) : noOutput("No console output is produced because unread is 0 and the if block does not run.");
    case "if-else":
      return linesOutput([i % 2 === 0 ? "Start" : "Skip"]);
    case "else-if-chain":
      {
        const branchStatus = pick(["queued", "active", "failed", "done"], i);
        if (branchStatus === "failed") return linesOutput([`Retry ${i + 1}`]);
        if (branchStatus === "done") return linesOutput(["Archive"]);
      }
      return linesOutput(["Wait"]);
    case "switch-statement":
      return linesOutput([`${method === "GET" ? "Read" : "Write"} /${list}`]);
    case "for-loop":
      return linesOutput(Array.from({ length: i + 3 }, (_, index) => index));
    case "for-of-loop":
      return linesOutput([title(i), title(i + 1)]);
    case "for-in-loop":
      return linesOutput([`id ${i + 1}`, "active true"]);
    case "try-catch":
      return noteOutput("Logs the SyntaxError message produced by JSON.parse for the invalid JSON string.");
    case "break-continue":
      return linesOutput(Array.from({ length: stop }, (_, n) => n).filter((n) => n % 2 === 1));
    case "default-parameter":
      return linesOutput([`[${pick(["info", "warn", "error", "debug"], i)}] Started ${i + 1}`]);
    case "callback-basic":
      return linesOutput([title(i), title(i + 1)]);
    case "commonjs-require":
      return linesOutput([`object ${i + 1}`]);
    case "promise-then":
      return linesOutput([(i + 1) * 2]);
    case "set-timeout-promise":
      return linesOutput(["done"]);
    case "async-generator":
      return linesOutput([i + 1, i + 2]);
    case "microtask-queue":
      return linesOutput([`A${i + 1}`, `C${i + 1}`, `B${i + 1}`]);
    case "process-env":
      return noteOutput(`Logs process.env.${pick(envNames, i)} when it is set; otherwise logs the fallback value shown in the snippet.`);
    case "process-argv":
      return noteOutput(`Logs "Running <command>", where <command> is the first user-supplied CLI argument or "help-${i + 1}" when omitted.`);
    case "event-emitter":
      return linesOutput([title(i)]);
    case "async-local-storage":
      return linesOutput([String(i + 1)]);
    case "var-hoisting":
      return linesOutput(["undefined"]);
    case "temporal-dead-zone":
      return linesOutput([String(i + 1)]);
    case "symbol-key":
      return linesOutput([`secret-${i + 1}`]);
    case "short-circuit-call":
      return linesOutput([`sync ${entity}`]);
    case "void-operator":
      return linesOutput([entity, "undefined"]);
    case "early-continue":
      return noteOutput(`Runtime-dependent: logs each active ${singular(list).replace(/\d+/g, "")}.id from ${list}.`);
    case "switch-fallthrough":
      return status === "new" || status === "queued" ? linesOutput(["pending"]) : noOutput(`No console output is produced because "${status}" does not match the shown cases.`);
    case "for-await-loop":
      return noteOutput("Runtime-dependent: logs chunk.length once for each chunk yielded by stream.");
    case "range-loop":
      return linesOutput([i + 1, i + 2, i + 3]);
    case "callback-error-first":
      return noOutput();
    case "tap-helper":
      return linesOutput([String(i + 1)]);
    case "omit-field":
      return noteOutput("Runtime-dependent: if user is defined, logs safeUser after removing the password property.");
    case "json-replacer":
      return noteOutput("Runtime-dependent: if user is defined, logs JSON for user with the password field omitted.");
    case "html-escape":
      return noteOutput("Runtime-dependent: if value is defined, logs value with &, <, and > replaced by HTML entities.");
    case "slugify":
      return linesOutput([`${title(i)} ${word(i + 7)}`.toLowerCase().replace(/\s+/g, "-")]);
    case "side-effect-import":
      return linesOutput(["registered"]);
    case "circular-import-read":
      return noteOutput("Runtime-dependent: logs the current value of the imported live binding named ready when the microtask runs.");
    case "async-foreach-pitfall":
      return linesOutput(["scheduled"]);
    case "node-next-tick":
      return linesOutput([`A${i + 1}`, `C${i + 1}`, `B${i + 1}`]);
    case "set-immediate":
      return linesOutput([`now ${i + 1}`, `later ${i + 1}`]);
    case "exec-file":
      return noteOutput("Runtime-dependent: logs stdout from `node --version` when the child process exits without error.");
    case "worker-message":
      return noteOutput("Runtime-dependent: logs the result message sent back by the worker.");
    case "sqlite-query-shape":
      return noteOutput("Runtime-dependent: logs rows.length for the database query result.");
    case "decorator-wrapper":
      return noOutput("No console output is produced because the snippet only defines the timing wrapper; it logs elapsed milliseconds when the returned wrapper is later invoked.");
    case "reflect-get":
      return noteOutput(`Runtime-dependent: logs Reflect.get(target, "${pick(["id", "name", "status", "email", "role", "total", "createdAt", "updatedAt"], i)}", receiver).`);
    default:
      return noteOutput("The snippet contains console.log; the logged value depends on the runtime values that reach that call.");
  }
}

function renderConsoleOutput(card) {
  const output = consoleOutputFor(card);
  if (!output) return "";
  if (output.kind === "lines") {
    const text = output.lines.length ? output.lines.join("\n") : "(no output)";
    return renderSection("Console output", outputCodeBlock(text), "border-color:#86efac;background:#f0fdf4;");
  }
  return renderKeyValue("Console output", output.text, "border-left-color:#16a34a;background:#f0fdf4;");
}

function uniqueList(items, max = 5) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const text = normalizeSpaces(String(item));
    if (!text || seen.has(text)) continue;
    seen.add(text);
    result.push(text);
    if (result.length >= max) break;
  }
  return result;
}

function renderListSection(title, items) {
  const body = uniqueList(items)
    .map((item) => `<li style="${LIST_ITEM_STYLE}">${sentence(escapeHtml(item))}</li>`)
    .join("");
  return renderSection(title, `<ul style="${LIST_STYLE}">${body}</ul>`);
}

function choiceLabel(index) {
  return String.fromCharCode(65 + index);
}

function renderChoices(choices) {
  return `<ol type="A" class="js-choices" style="${LIST_STYLE}">${choices.map((choice) => `<li style="${LIST_ITEM_STYLE}">${escapeHtml(choice)}</li>`).join("")}</ol>`;
}

function arrangeQuizChoices(choices, answerIndex, seed) {
  const answer = choices[answerIndex];
  const distractors = choices.filter((_, index) => index !== answerIndex);
  const nextChoices = [];
  const nextAnswerIndex = seed % choices.length;
  let distractorIndex = 0;
  for (let index = 0; index < choices.length; index += 1) {
    if (index === nextAnswerIndex) {
      nextChoices.push(answer);
    } else {
      nextChoices.push(distractors[distractorIndex]);
      distractorIndex += 1;
    }
  }
  return { choices: nextChoices, answerIndex: nextAnswerIndex };
}

function quizFront(code, question, choices) {
  return cardShell([
    codeBlock(code),
    `<div class="js-quiz" style="${QUIZ_STYLE}"><p style="margin:0 0 8px;"><strong>Question:</strong> ${sentence(escapeHtml(question))}</p>`,
    renderChoices(choices),
    `</div>`,
  ].join(""), "front");
}

function renderQuizAnswer(card) {
  if (card.kind !== "quiz") return "";
  const { choices, answerIndex, explanation } = card.quiz;
  const label = choiceLabel(answerIndex);
  const answer = choices[answerIndex];
  return [
    `<div class="js-answer" style="${ANSWER_STYLE}">`,
    `<p style="margin:0 0 8px;"><strong>Answer:</strong> ${label}. ${sentence(escapeHtml(answer))}</p>`,
    `<p style="margin:0;"><strong>Why:</strong> ${sentence(escapeHtml(explanation))}</p>`,
    `</div>`,
  ].join("");
}

function mentalModelFor(card) {
  const code = card.code;

  if (card.topic.startsWith("complex-")) {
    return "Read this like production code under time pressure: find the setup values, trace each mutation or branch in order, and identify the final returned, thrown, or logged result.";
  }
  if (code.includes(".reduce(")) {
    return "Treat the callback as a small state machine: the accumulator enters each iteration, the current item changes it, and the returned value becomes the next accumulator.";
  }
  if (code.includes(".map(") || code.includes(".filter(") || code.includes(".flatMap(")) {
    return "Read the array method by separating the collection being visited from the callback that decides each new, kept, or flattened value.";
  }
  if (/\basync\b|\bawait\b|\.then\(|Promise\./.test(code)) {
    return "Read the synchronous setup first, then mark every await, promise callback, or promise combinator as a point where timing or rejection behavior matters.";
  }
  if (/\bfunction\b|=>/.test(code) && /\breturn\b/.test(code)) {
    return "Identify the inputs, then jump to the return value and work backward through the expressions that shape it.";
  }
  if (/\bclass\b|new\s+[A-Z_$]|prototype|this\./.test(code)) {
    return "Separate object creation from behavior lookup: decide which object owns the data, then decide where the method or property is resolved.";
  }
  if (/\bfor\b|\bwhile\b/.test(code)) {
    return "Find the loop state before the loop, trace how one iteration changes it, then apply that same change until the exit condition is met.";
  }
  if (/\bif\b|\bswitch\b|\?/.test(code)) {
    return "Resolve the condition first, then ignore branches that cannot run for the shown values.";
  }

  const moduleModels = {
    syntax: "Name each binding and literal first; most beginner snippets become clear once you know what value each identifier currently holds.",
    expressions: "Read operators by precedence and short-circuit rules before reading the domain names around them.",
    control: "Treat the snippet as a path through possible branches: only executed statements can affect the final state.",
    functions: "Read parameters, closure variables, and return values as three separate channels of information.",
    collections: "Identify the collection shape first, then track whether the operation reads, transforms, filters, mutates, or builds a new collection.",
    data: "Separate parsing, normalization, validation, and formatting; these often look similar but answer different questions.",
    oop_modules: "Track which names are exported, imported, constructed, or looked up on an instance or prototype.",
    async: "Separate scheduling from completion; the line that starts work is often not the line that receives the result.",
    node: "Read Node.js snippets around resources: environment, files, network requests, streams, processes, and cleanup.",
    advanced: "Look for the hidden control point: a wrapper, proxy, cache, queue, factory, or context object often changes when work actually runs.",
    interview: "Read this as an interview exercise: identify the tested concept, trace the concrete values, and name the edge case the snippet is probing.",
  };

  return moduleModels[card.module] ?? "Read the snippet by naming the values, following execution order, and checking the final observable effect.";
}

function readingCuesFor(card) {
  const code = card.code;
  const lines = code.split("\n");
  const cues = [
    `Pattern: ${card.topicLabel}; identify the language feature before getting distracted by the sample domain names.`,
  ];

  if (lines.length >= 8) {
    cues.push("First skim for initialization, repeated work, branch exits, and the final return/log/throw; then reread details inside that frame.");
  } else {
    cues.push("Start with the left side of declarations, assignments, or parameters so every later identifier has a known source.");
  }
  if (/\bconst\b|\blet\b|\bvar\b/.test(code)) {
    cues.push("For each binding, ask whether the name is newly declared, reassigned later, or only used to hold an intermediate value.");
  }
  if (/\breturn\b/.test(code)) {
    cues.push("The return statement is the main answer; earlier lines usually prepare the value returned there.");
  }
  if (code.includes("console.log")) {
    cues.push("For console output, follow only the code path that reaches the log call and preserve the exact order of logged lines.");
  }
  if (/\bif\b|\belse\b|\bswitch\b|\?/.test(code)) {
    cues.push("Evaluate branch conditions with the concrete values shown before reading statements inside each branch.");
  }
  if (/\bfor\b|\bwhile\b|for await/.test(code)) {
    cues.push("Track loop variables and any accumulator after one iteration; repeated iterations usually apply the same rule.");
  }
  if (/\btry\b|\bcatch\b|\bthrow\b/.test(code)) {
    cues.push("Mark where normal control flow can switch to error flow, and whether the snippet recovers or rethrows.");
  }
  if (/\basync\b|\bawait\b|\.then\(|\.catch\(|Promise\./.test(code)) {
    cues.push("Separate the promise object from its eventual fulfilled or rejected value.");
  }
  if (/\bmap\(|\bfilter\(|\breduce\(|\bfind\(|\bsome\(|\bevery\(|\bflatMap\(/.test(code)) {
    cues.push("For collection callbacks, read the callback parameters as item, index, or accumulator roles rather than ordinary local variables.");
  }
  if (/\bthis\b|\.bind\(|\.call\(|\.apply\(/.test(code)) {
    cues.push("Resolve this from the call site or binding operation before interpreting property reads inside the function.");
  }
  if (/\bimport\b|\bexport\b|require\(|module\.exports/.test(code)) {
    cues.push("Separate module loading from local execution: imported names may be live bindings, cached modules, or plain CommonJS values.");
  }
  if (/process\.|fs\.|http\.|Readable|Writable|EventEmitter|Buffer/.test(code)) {
    cues.push("For Node.js APIs, identify which operation touches the outside world and where errors or cleanup are handled.");
  }

  const moduleCues = {
    syntax: "Check whether the line creates a value, names a value, or merely reads a value that already exists.",
    expressions: "When operators are chained, group the expression before deciding the final value.",
    control: "Only the selected path matters for state changes, console output, and thrown errors.",
    functions: "Keep caller-supplied arguments separate from closed-over variables and locally created variables.",
    collections: "Watch for whether the original collection is mutated or a new collection is returned.",
    data: "Notice whether the code changes the representation, the meaning, or only the display form of data.",
    oop_modules: "Read the public surface separately from private state, prototype lookup, or module boundaries.",
    async: "Look for work that starts immediately versus work that runs after the current stack finishes.",
    node: "Node snippets often combine JavaScript control flow with operating-system or network side effects.",
    advanced: "Identify the abstraction boundary first; many advanced patterns redirect a call without changing the caller's syntax.",
    interview: "Interview snippets often test one precise rule, so isolate the rule before following the surrounding variable names.",
  };
  cues.push(moduleCues[card.module]);

  return uniqueList(cues);
}

function nuancesFor(card) {
  const code = card.code;
  const nuances = [];

  if (card.topic.startsWith("complex-")) {
    nuances.push("Do not mentally refactor this while reading; trace the code as written, including temporary variables, repeated checks, and mutation order.");
  }
  if (/\bconst\b/.test(code)) {
    nuances.push("const protects the binding from reassignment; it does not make arrays, objects, maps, or sets immutable.");
  }
  if (/\blet\b/.test(code)) {
    nuances.push("let is block-scoped and can be reassigned, so later writes in the same block can change what the name means.");
  }
  if (/\bvar\b/.test(code)) {
    nuances.push("var is function-scoped and hoisted, which can make reads before assignment produce undefined instead of a reference error.");
  }
  if (/===|!==/.test(code)) {
    nuances.push("Strict equality compares without coercing types, so the value and type both matter.");
  }
  if (/(^|[^=!])==(?!=)|(^|[^!])!=(?!=)/.test(code)) {
    nuances.push("Loose equality may coerce types before comparing, so read it more cautiously than strict equality.");
  }
  if (code.includes("||")) {
    nuances.push("|| falls back on any falsy value, including empty string, 0, false, null, undefined, and NaN.");
  }
  if (code.includes("??")) {
    nuances.push("?? falls back only for null or undefined, preserving valid falsy values like 0 and empty strings.");
  }
  if (code.includes("?.")) {
    nuances.push("Optional chaining stops the property access at null or undefined, but later operations on the result may still need checks.");
  }
  if (code.includes("...")) {
    nuances.push("Spread syntax copies one level; nested objects and arrays are still shared unless they are copied separately.");
  }
  if (/\bsort\(/.test(code)) {
    nuances.push("Array sort mutates the array in place unless the code copies first with spread, slice, or toSorted.");
  }
  if (/\breduce\(/.test(code)) {
    nuances.push("With reduce, the callback return value becomes the next accumulator; forgetting to return changes the whole result.");
  }
  if (/\bforEach\(/.test(code) && /\basync\b/.test(code)) {
    nuances.push("forEach does not await async callbacks, so surrounding code can continue before those callbacks finish.");
  }
  if (/\bmap\(/.test(code)) {
    nuances.push("map is for transforming every item into a returned value; side effects inside map are a reading smell.");
  }
  if (/\bfilter\(/.test(code)) {
    nuances.push("filter keeps the original item when the predicate is truthy; it does not transform the item.");
  }
  if (/\bMap\b/.test(code)) {
    nuances.push("Map keys are compared by identity for objects and by value for primitives.");
  }
  if (/\bSet\b/.test(code)) {
    nuances.push("Set removes duplicate values, but object duplicates only collapse when they are the exact same object reference.");
  }
  if (/\bJSON\.parse\b/.test(code)) {
    nuances.push("JSON.parse can throw, so production code often surrounds it with validation or try/catch.");
  }
  if (/\bJSON\.stringify\b/.test(code)) {
    nuances.push("JSON.stringify omits undefined object properties and applies replacers before producing text.");
  }
  if (/\bDate\b/.test(code)) {
    nuances.push("Date objects represent instants in time, while display strings can shift with timezone and locale choices.");
  }
  if (/\bRegExp\b|(?:^|[=(,\s])\/(?![/*])(?:\\.|[^/\n])+\/[dgimsuy]*/m.test(code)) {
    nuances.push("Regex code is easiest to read by separating the pattern, flags, and method such as test, match, replace, or matchAll.");
  }
  if (/\bthis\b/.test(code)) {
    nuances.push("this is determined by how a function is called, except arrow functions which capture this from the surrounding scope.");
  }
  if (/\basync\b|\bawait\b/.test(code)) {
    nuances.push("An exception thrown inside async code becomes a rejected promise unless it is caught inside that async function.");
  }
  if (/Promise\.all\(/.test(code)) {
    nuances.push("Promise.all starts from already-created promises and rejects as soon as one input rejects.");
  }
  if (/Promise\.allSettled\(/.test(code)) {
    nuances.push("Promise.allSettled waits for every input and returns status objects instead of throwing on the first rejection.");
  }
  if (/process\.env/.test(code)) {
    nuances.push("Environment variables arrive as strings or undefined, so numeric and boolean config usually needs explicit parsing.");
  }
  if (/EventEmitter|\.on\(|\.emit\(/.test(code)) {
    nuances.push("Event-driven code separates registration time from emit time; handlers run only when the matching event is emitted.");
  }
  if (/Buffer|Readable|Writable|pipeline/.test(code)) {
    nuances.push("Stream and buffer code often handles chunks, backpressure, and errors separately from the high-level data goal.");
  }
  if (/Proxy|Reflect/.test(code)) {
    nuances.push("Proxy and Reflect can make ordinary property access run custom code, so read traps before trusting the surface syntax.");
  }
  if (code.includes("console.log")) {
    nuances.push("The console result shown here assumes the snippet runs exactly as written and that runtime-dependent inputs match the notes.");
  }

  const moduleNuances = {
    syntax: "Small syntax choices often change scope, mutability, or runtime errors even when the visible values look similar.",
    expressions: "Operator order is not decoration; it determines which operands are evaluated and what value flows forward.",
    control: "Branch and loop code is best checked by walking one concrete execution path, not by reading every line as equally active.",
    functions: "A function body is inert until called, but closures remember the outer variables that existed when the function was created.",
    collections: "Collection methods differ sharply between read-only queries, transformations, and in-place mutation.",
    data: "Data code often has edge cases around missing values, invalid formats, encoding, timezone, and locale.",
    oop_modules: "Class and module syntax can hide lookup rules, live bindings, private fields, and shared prototypes.",
    async: "Async code usually has two correctness questions: what value resolves, and when the continuation runs.",
    node: "Node.js snippets are often constrained by resource lifetime, error events, process state, and filesystem or network behavior.",
    advanced: "Advanced patterns are easier to parse when you locate the indirection point before following the business logic.",
    interview: "These problems often look small but hide scope, coercion, mutation, callback timing, or DOM collection details.",
  };
  nuances.push(moduleNuances[card.module]);

  return uniqueList(nuances);
}

function renderBack(card) {
  const annotationItems = card.annotations
    .map((note, index) => `<li style="${LIST_ITEM_STYLE}"><strong>Line ${index + 1}:</strong> ${sentence(escapeHtml(note))}</li>`)
    .join("");

  return cardShell([
    renderBackHeader(card),
    renderKeyValue("Intent", card.intent),
    renderKeyValue("Read it as", mentalModelFor(card), "border-left-color:#7c3aed;background:#f5f3ff;"),
    renderQuizAnswer(card),
    renderSection("Annotated code", `${codeBlock(card.code)}<ol style="${LIST_STYLE}">${annotationItems}</ol>`),
    renderListSection("Reading cues", readingCuesFor(card)),
    renderListSection("Nuance and pitfalls", nuancesFor(card)),
    renderConsoleOutput(card),
    renderListSection("Common use cases", card.useCases),
  ].join(""), "back");
}

function makeCard(moduleInfo, topic, seed, code, intent, annotations, useCases) {
  const lines = code.split("\n");
  if (lines.length !== annotations.length) {
    throw new Error(`Annotation mismatch for ${moduleInfo.key}/${topic.key}: ${lines.length} lines, ${annotations.length} notes\n${code}`);
  }
  if (code.includes("\t")) {
    throw new Error(`Code contains a tab for ${moduleInfo.key}/${topic.key}`);
  }
  return {
    module: moduleInfo.key,
    moduleLabel: moduleInfo.label,
    level: moduleInfo.level,
    topic: topic.key,
    topicLabel: topic.label,
    seed,
    code,
    front: renderStudyFront(code),
    intent,
    annotations,
    useCases,
  };
}

function makeQuizCard(moduleInfo, topic, seed, code, question, choices, answerIndex, explanation, intent, annotations, useCases) {
  const card = makeCard(moduleInfo, topic, seed, code, intent, annotations, useCases);
  if (answerIndex < 0 || answerIndex >= choices.length) {
    throw new Error(`Invalid quiz answer index for ${moduleInfo.key}/${topic.key}`);
  }
  return {
    ...card,
    kind: "quiz",
    front: quizFront(code, question, choices),
    quiz: {
      question,
      choices,
      answerIndex,
      explanation,
    },
  };
}

function topic(key, label, count, factory) {
  return { key, label, count: Math.min(count, CARDS_PER_TOPIC), factory };
}

function buildCardsForModule(moduleInfo, topics) {
  const cards = [];
  const maxCount = Math.max(...topics.map((spec) => spec.count));
  for (let i = 0; i < maxCount; i += 1) {
    for (const spec of topics) {
      if (i >= spec.count) continue;
      cards.push(spec.factory(moduleInfo, spec, i));
    }
  }
  const target = moduleInfo.target;
  if (cards.length !== target) {
    throw new Error(`${moduleInfo.key} expected ${target} cards but built ${cards.length}`);
  }
  return cards;
}

const useCaseSets = {
  variables: ["Reading setup code", "Recognizing named intermediate values", "Understanding where later expressions get their data"],
  expressions: ["Reading compact calculations", "Spotting fallback behavior", "Understanding conditions inside larger statements"],
  control: ["Following branching business rules", "Tracing loop behavior", "Predicting which code paths execute"],
  functions: ["Reading reusable helpers", "Understanding callback-heavy code", "Tracking values captured from outer scopes"],
  collections: ["Reading data transformation pipelines", "Understanding object-shaped state", "Recognizing membership and lookup patterns"],
  data: ["Parsing API data", "Formatting values for users", "Reading validation and normalization code"],
  modules: ["Reading application boundaries", "Understanding reusable classes", "Following import and export relationships"],
  async: ["Reading network calls", "Understanding concurrent work", "Spotting async error handling"],
  node: ["Reading server-side scripts", "Understanding Node.js APIs", "Following file, HTTP, and stream workflows"],
  advanced: ["Reading production application patterns", "Understanding framework internals", "Recognizing performance and reliability techniques"],
  interview: ["Practicing interview-style code reading", "Recognizing the specific JavaScript rule being tested", "Tracing small snippets with edge cases"],
};

const syntaxTopics = [
  topic("const-binding", "Const binding", 30, (m, t, i) => {
    const name = word(i);
    const value = title(i);
    const code = `const ${name}Name = "${value}";\nconsole.log(${name}Name);`;
    return makeCard(m, t, i, code, `Create a stable binding and read it later by name`, [
      `Declares ${inlineRaw(name)}Name with const, meaning this binding cannot be reassigned in the same scope.`,
      `Reads the value from ${inlineRaw(name)}Name and sends it to the console.`,
    ], useCaseSets.variables);
  }),
  topic("let-reassignment", "Let reassignment", 30, (m, t, i) => {
    const name = word(i);
    const first = pick(statuses, i);
    const second = pick(statuses, i + 3);
    const code = `let ${name}Status = "${first}";\n${name}Status = "${second}";\nconsole.log(${name}Status);`;
    return makeCard(m, t, i, code, `Show a value that is intentionally changed over time`, [
      `Creates a mutable ${inlineRaw(name)}Status binding with the initial string "${first}".`,
      `Reassigns the same binding to the later string "${second}".`,
      `Logs the current value after reassignment, so the output is "${second}".`,
    ], useCaseSets.variables);
  }),
  topic("primitive-literals", "Primitive literals", 30, (m, t, i) => {
    const name = word(i);
    const count = pick(numbers, i + 2);
    const flag = i % 2 === 0 ? "true" : "false";
    const code = `const ${name}Count = ${count};\nconst ${name}Enabled = ${flag};\nconst ${name}Note = null;`;
    return makeCard(m, t, i, code, `Read number, boolean, and null literals as direct values`, [
      `Stores the numeric literal ${count} in ${inlineRaw(name)}Count.`,
      `Stores the boolean literal ${flag} in ${inlineRaw(name)}Enabled.`,
      `Stores null to represent an intentional empty value for ${inlineRaw(name)}Note.`,
    ], ["Reading configuration objects", "Recognizing intentionally empty fields", "Distinguishing direct values from computed values"]);
  }),
  topic("undefined-check", "Undefined check", 30, (m, t, i) => {
    const name = word(i);
    const code = `let ${name}Id;\nconst missing = ${name}Id === undefined;\nconsole.log(missing);`;
    return makeCard(m, t, i, code, `Detect a declared variable that has not received a value yet`, [
      `Declares ${inlineRaw(name)}Id without assigning a value, so it starts as undefined.`,
      `Compares the variable to undefined and stores the boolean result in missing.`,
      `Logs true because ${inlineRaw(name)}Id has not been assigned.`,
    ], ["Reading initialization code", "Understanding missing optional fields", "Separating undefined from null in conditionals"]);
  }),
  topic("object-literal", "Object literal", 30, (m, t, i) => {
    const entity = word(i);
    const id = i + 1;
    const status = pick(statuses, i);
    const code = `const ${entity} = {\n  id: ${id},\n  status: "${status}"\n};`;
    return makeCard(m, t, i, code, `Create a small object with named properties`, [
      `Starts an object literal and stores it in ${inlineRaw(entity)}.`,
      `Adds an id property with the number ${id}.`,
      `Adds a status property with the string "${status}".`,
      `Closes the object literal and ends the declaration.`,
    ], ["Reading API response shapes", "Understanding configuration objects", "Recognizing grouped data"]);
  }),
  topic("array-literal", "Array literal", 30, (m, t, i) => {
    const list = plural(i);
    const a = title(i);
    const b = title(i + 1);
    const c = title(i + 2);
    const code = `const ${list} = ["${a}", "${b}", "${c}"];\nconsole.log(${list}.length);`;
    return makeCard(m, t, i, code, `Create an ordered list and read its length`, [
      `Stores an array of three strings in ${inlineRaw(list)}.`,
      `Reads the array length property, which is 3, and logs it.`,
    ], ["Reading list setup code", "Recognizing ordered collections", "Understanding simple counts"]);
  }),
  topic("property-access", "Property access", 30, (m, t, i) => {
    const entity = word(i);
    const prop = pick(["name", "status", "role", "email", "title"], i);
    const value = prop === "name" ? title(i) : pick(statuses, i);
    const code = `const ${entity} = { ${prop}: "${value}" };\nconsole.log(${entity}.${prop});`;
    return makeCard(m, t, i, code, `Read a known property from an object using dot notation`, [
      `Creates ${inlineRaw(entity)} with a ${prop} property.`,
      `Uses dot notation to read ${prop} from ${inlineRaw(entity)} and log it.`,
    ], ["Reading object access", "Following data from object creation to use", "Recognizing simple model fields"]);
  }),
  topic("computed-property-access", "Computed property access", 30, (m, t, i) => {
    const entity = word(i);
    const prop = pick(["name", "status", "role", "email", "title"], i + 2);
    const value = prop === "name" ? title(i) : pick(statuses, i + 1);
    const code = `const field = "${prop}";\nconst ${entity} = { ${prop}: "${value}" };\nconsole.log(${entity}[field]);`;
    return makeCard(m, t, i, code, `Read an object property when the property name is stored in a variable`, [
      `Stores the property name "${prop}" in field.`,
      `Creates ${inlineRaw(entity)} with a matching ${prop} property.`,
      `Uses bracket notation so JavaScript evaluates field before reading the property.`,
    ], ["Reading dynamic object access", "Understanding table column selection", "Following code that maps field names to values"]);
  }),
  topic("template-literal-basic", "Template literal", 30, (m, t, i) => {
    const name = title(i);
    const count = (i % 5) + 1;
    const code = `const name = "${name}";\nconst count = ${count};\nconst message = \`\${name} has \${count} tasks\`;`;
    return makeCard(m, t, i, code, `Build a string by embedding variables inside a template literal`, [
      `Stores the person name string in name.`,
      `Stores a numeric count for later interpolation.`,
      `Creates message by replacing the name and count interpolation slots with their current values.`,
    ], ["Reading log messages", "Understanding URL or label construction", "Recognizing interpolated values inside strings"]);
  }),
  topic("commented-code", "Comments beside code", 30, (m, t, i) => {
    const name = word(i);
    const ttl = (i % 6 + 1) * 60;
    const code = `// Keep ${name} data fresh for ${ttl} seconds.\nconst ${name}Ttl = ${ttl};`;
    return makeCard(m, t, i, code, `Separate a human-facing comment from the executable statement`, [
      `This comment explains the intention; JavaScript ignores it at runtime.`,
      `Declares ${inlineRaw(name)}Ttl with the numeric time-to-live value ${ttl}.`,
    ], ["Reading code with intent comments", "Understanding why a magic number exists", "Separating documentation from behavior"]);
  }),
];

const expressionTopics = [
  topic("arithmetic-expression", "Arithmetic expression", 30, (m, t, i) => {
    const base = pick(amounts, i);
    const tax = [0.05, 0.08, 0.1, 0.12][i % 4];
    const code = `const subtotal = ${base};\nconst tax = subtotal * ${tax};\nconst total = subtotal + tax;`;
    return makeCard(m, t, i, code, `Calculate a total by composing arithmetic expressions`, [
      `Stores the starting amount in subtotal.`,
      `Multiplies subtotal by the tax rate to compute tax.`,
      `Adds subtotal and tax to produce the final total.`,
    ], useCaseSets.expressions);
  }),
  topic("strict-equality", "Strict equality", 30, (m, t, i) => {
    const id = i + 100;
    const code = `const selectedId = ${id};\nconst currentId = ${id};\nconst isSelected = selectedId === currentId;`;
    return makeCard(m, t, i, code, `Compare two values without type coercion`, [
      `Stores the selected identifier as a number.`,
      `Stores the current identifier as a number.`,
      `Uses strict equality, so the result is true only when both value and type match.`,
    ], ["Reading identity checks", "Avoiding surprises from type coercion", "Understanding boolean flags derived from comparisons"]);
  }),
  topic("loose-equality-warning", "Loose equality", 30, (m, t, i) => {
    const id = i + 1;
    const code = `const routeId = "${id}";\nconst userId = ${id};\nconst matches = routeId == userId;`;
    return makeCard(m, t, i, code, `Recognize a comparison that allows JavaScript to coerce types`, [
      `Stores routeId as a string, like many URL parameters.`,
      `Stores userId as a number.`,
      `Uses loose equality, so JavaScript may convert one side before comparing.`,
    ], ["Reading older codebases", "Spotting possible type coercion bugs", "Understanding why strict equality is usually preferred"]);
  }),
  topic("logical-and-guard", "Logical AND guard", 30, (m, t, i) => {
    const entity = word(i);
    const code = `const ${entity} = { active: ${i % 2 === 0 ? "true" : "false"} };\nconst canSync = ${entity}.active && navigator.onLine;`;
    return makeCard(m, t, i, code, `Require two truthy conditions before enabling an action`, [
      `Creates an object with an active flag.`,
      `Uses && so canSync is truthy only when the object is active and the browser is online.`,
    ], ["Reading compound conditions", "Understanding guard checks", "Recognizing short-circuit logic"]);
  }),
  topic("logical-or-default", "Logical OR default", 30, (m, t, i) => {
    const fallback = pick(["guest", "anonymous", "reader", "member"], i);
    const code = `const inputName = "";\nconst displayName = inputName || "${fallback}-${i + 1}";`;
    return makeCard(m, t, i, code, `Choose a fallback when the first value is falsy`, [
      `Stores an empty string, which is falsy in JavaScript.`,
      `Uses || to choose "${fallback}-${i + 1}" because inputName is falsy.`,
    ], ["Reading fallback labels", "Understanding default UI text", "Spotting cases where empty strings may be replaced"]);
  }),
  topic("nullish-coalescing", "Nullish coalescing", 30, (m, t, i) => {
    const fallback = 10 + i;
    const code = `const savedLimit = null;\nconst limit = savedLimit ?? ${fallback};`;
    return makeCard(m, t, i, code, `Choose a fallback only when the first value is null or undefined`, [
      `Stores null to represent a missing saved limit.`,
      `Uses ?? to choose ${fallback} because savedLimit is null; values like 0 would be preserved.`,
    ], ["Reading safer default values", "Preserving valid falsy values", "Understanding configuration merging"]);
  }),
  topic("optional-chaining", "Optional chaining", 30, (m, t, i) => {
    const code = `const profile = { user: null, requestId: ${i + 1} };\nconst email = profile.user?.email;`;
    return makeCard(m, t, i, code, `Read a nested property without throwing when an intermediate value is missing`, [
      `Creates profile where user is explicitly null.`,
      `Uses ?. so email becomes undefined instead of throwing when user is null.`,
    ], ["Reading API response access", "Avoiding crashes on missing nested data", "Understanding defensive property reads"]);
  }),
  topic("ternary-expression", "Ternary expression", 30, (m, t, i) => {
    const count = i;
    const code = `const unread = ${count};\nconst label = unread === 1 ? "message" : "messages";`;
    return makeCard(m, t, i, code, `Choose one of two expressions based on a condition`, [
      `Stores the unread count.`,
      `Uses a ternary: if unread is exactly 1, label is singular; otherwise it is plural.`,
    ], ["Reading compact branching", "Understanding display labels", "Recognizing condition ? yes : no expressions"]);
  }),
  topic("spread-array", "Array spread", 30, (m, t, i) => {
    const first = title(i);
    const second = title(i + 1);
    const third = title(i + 2);
    const code = `const current = ["${first}", "${second}"];\nconst next = [...current, "${third}"];`;
    return makeCard(m, t, i, code, `Create a new array by copying existing items and appending one more`, [
      `Stores the current array with two names.`,
      `Uses ...current to copy the old items into a new array, then adds "${third}".`,
    ], ["Reading immutable updates", "Understanding React state updates", "Recognizing array copy patterns"]);
  }),
  topic("spread-object", "Object spread", 30, (m, t, i) => {
    const status = pick(statuses, i);
    const code = `const defaults = { retries: 2, timeout: ${1000 + i} };\nconst options = { ...defaults, status: "${status}" };`;
    return makeCard(m, t, i, code, `Create a new object by copying defaults and adding an override`, [
      `Defines a defaults object with retry and timeout settings.`,
      `Uses object spread to copy defaults, then adds a status property.`,
    ], ["Reading configuration assembly", "Understanding immutable object updates", "Recognizing shallow copies"]);
  }),
];

const controlTopics = [
  topic("if-statement", "If statement", 30, (m, t, i) => {
    const count = i;
    const code = `const unread = ${count};\nif (unread > 0) {\n  console.log("Show badge");\n}`;
    return makeCard(m, t, i, code, `Run a block only when a condition is true`, [
      `Stores the unread count.`,
      `Checks whether unread is greater than zero.`,
      `Logs the badge message only when the condition passes.`,
      `Closes the conditional block.`,
    ], useCaseSets.control);
  }),
  topic("if-else", "If else", 30, (m, t, i) => {
    const code = `const enabled = ${i} % 2 === 0;\nif (enabled) {\n  console.log("Start");\n} else {\n  console.log("Skip");\n}`;
    return makeCard(m, t, i, code, `Choose between two mutually exclusive paths`, [
      `Stores a boolean feature flag.`,
      `Begins the branch that runs when enabled is truthy.`,
      `Logs "Start" for the enabled path.`,
      `Begins the fallback branch when enabled is falsy.`,
      `Logs "Skip" for the disabled path.`,
      `Closes the conditional statement.`,
    ], ["Reading feature flags", "Following binary decisions", "Understanding fallback behavior"]);
  }),
  topic("else-if-chain", "Else-if chain", 30, (m, t, i) => {
    const status = pick(["queued", "active", "failed", "done"], i);
    const code = `const status = "${status}";\nconst attempt = ${i + 1};\nif (status === "failed") {\n  console.log("Retry", attempt);\n} else if (status === "done") {\n  console.log("Archive");\n} else {\n  console.log("Wait");\n}`;
    return makeCard(m, t, i, code, `Check several ordered cases and run the first matching branch`, [
      `Stores the current status string.`,
      `Stores an attempt number that can be used by the failure branch.`,
      `Tests the highest-priority failure case first.`,
      `Runs retry behavior when the status is failed and logs the attempt.`,
      `Checks for the completed case only if the first condition failed.`,
      `Runs archive behavior when the status is done.`,
      `Starts the default branch for every other status.`,
      `Runs wait behavior when no earlier condition matched.`,
      `Closes the conditional chain.`,
    ], ["Reading status machines", "Understanding priority in branch order", "Following business rule decisions"]);
  }),
  topic("switch-statement", "Switch statement", 30, (m, t, i) => {
    const method = pick(methods, i);
    const code = `const method = "${method}";\nconst route = "/${plural(i)}";\nswitch (method) {\n  case "GET":\n    console.log("Read", route);\n    break;\n  default:\n    console.log("Write", route);\n}`;
    return makeCard(m, t, i, code, `Dispatch behavior based on one value`, [
      `Stores the HTTP method string.`,
      `Stores the route that will be used in whichever branch runs.`,
      `Starts a switch that compares method to each case.`,
      `Defines the branch for GET requests.`,
      `Logs the read behavior for GET along with the route.`,
      `Stops the switch so execution does not fall through.`,
      `Defines the fallback branch for every non-GET method.`,
      `Logs the write behavior for the default branch along with the route.`,
      `Closes the switch statement.`,
    ], ["Reading routers", "Understanding command dispatch", "Following enum-like branches"]);
  }),
  topic("for-loop", "Classic for loop", 30, (m, t, i) => {
    const limit = i + 3;
    const code = `for (let index = 0; index < ${limit}; index += 1) {\n  console.log(index);\n}`;
    return makeCard(m, t, i, code, `Repeat a block a known number of times using an index`, [
      `Initializes index at 0, keeps looping while it is less than ${limit}, and increments by 1 after each pass.`,
      `Logs the current index for this iteration.`,
      `Closes the loop body.`,
    ], ["Reading indexed loops", "Understanding iteration bounds", "Following array index code"]);
  }),
  topic("for-of-loop", "For-of loop", 30, (m, t, i) => {
    const list = plural(i);
    const item = safeIdentifier(singular(list));
    const a = title(i);
    const b = title(i + 1);
    const code = `const ${list} = ["${a}", "${b}"];\nfor (const ${item} of ${list}) {\n  console.log(${item});\n}`;
    return makeCard(m, t, i, code, `Visit each value in an iterable without managing an index`, [
      `Creates an array to iterate over.`,
      `Starts a for...of loop and binds each array value to ${inlineRaw(item)}.`,
      `Logs the current item.`,
      `Closes the loop body.`,
    ], ["Reading array iteration", "Understanding collection traversal", "Recognizing value-oriented loops"]);
  }),
  topic("for-in-loop", "For-in loop", 30, (m, t, i) => {
    const entity = word(i);
    const code = `const ${entity} = { id: ${i + 1}, active: true };\nfor (const key in ${entity}) {\n  console.log(key, ${entity}[key]);\n}`;
    return makeCard(m, t, i, code, `Visit enumerable property names on an object`, [
      `Creates an object with two properties.`,
      `Starts a for...in loop where key is each enumerable property name.`,
      `Logs both the property name and the value read with bracket notation.`,
      `Closes the loop body.`,
    ], ["Reading object inspection code", "Understanding dynamic property reads", "Recognizing when code iterates keys rather than values"]);
  }),
  topic("while-loop", "While loop", 30, (m, t, i) => {
    const limit = i + 2;
    const code = `let attempts = 0;\nwhile (attempts < ${limit}) {\n  attempts += 1;\n}`;
    return makeCard(m, t, i, code, `Repeat while a condition remains true`, [
      `Initializes attempts before the loop begins.`,
      `Keeps looping while attempts is less than ${limit}.`,
      `Increments attempts inside the loop so the condition eventually becomes false.`,
      `Closes the loop body.`,
    ], ["Reading retry loops", "Following manual loop state", "Spotting conditions that must eventually change"]);
  }),
  topic("try-catch", "Try catch", 30, (m, t, i) => {
    const code = `try {\n  JSON.parse("{bad json ${i + 1}");\n} catch (error) {\n  console.log(error.message);\n}`;
    return makeCard(m, t, i, code, `Handle an operation that may throw an exception`, [
      `Starts a protected block where thrown errors will be caught.`,
      `Attempts to parse invalid JSON, which throws a SyntaxError.`,
      `Starts the catch block and binds the thrown error to error.`,
      `Logs the error message instead of letting the program crash.`,
      `Closes the catch block.`,
    ], ["Reading parsing code", "Understanding exception handling", "Recognizing local recovery from failures"]);
  }),
  topic("break-continue", "Break and continue", 30, (m, t, i) => {
    const stop = i + 2;
    const code = `for (let n = 0; n < ${stop + 4}; n += 1) {\n  if (n === ${stop}) break;\n  if (n % 2 === 0) continue;\n  console.log(n);\n}`;
    return makeCard(m, t, i, code, `Alter loop flow by stopping early or skipping one iteration`, [
      `Starts a loop over numbers below ${stop + 4}.`,
      `Breaks out of the loop completely when n reaches ${stop}.`,
      `Skips the rest of the current iteration when n is even.`,
      `Logs n only for odd values that were not skipped and came before the break.`,
      `Closes the loop body.`,
    ], ["Reading search loops", "Understanding early exits", "Following filtering logic inside loops"]);
  }),
];

const functionTopics = [
  topic("function-declaration", "Function declaration", 30, (m, t, i) => {
    const fn = `format${upperFirst(word(i))}`;
    const code = `function ${fn}(name) {\n  return name.trim().toUpperCase();\n}\nconst label = ${fn}(" ${title(i)} ");`;
    return makeCard(m, t, i, code, `Define a named reusable function and call it later`, [
      `Declares the function ${fn} with one parameter named name.`,
      `Trims whitespace and converts the result to uppercase, then returns it.`,
      `Closes the function body.`,
      `Calls ${fn} with a padded string and stores the returned label.`,
    ], useCaseSets.functions);
  }),
  topic("function-expression", "Function expression", 30, (m, t, i) => {
    const fn = `is${upperFirst(word(i))}Status`;
    const status = pick(statuses, i);
    const code = `const ${fn} = function (value) {\n  return value === "${status}";\n};`;
    return makeCard(m, t, i, code, `Store an anonymous function in a variable`, [
      `Creates a const binding named ${fn} and assigns it a function value.`,
      `Returns whether the given value exactly matches "${status}".`,
      `Closes the function expression and ends the assignment.`,
    ], ["Reading predicate helpers", "Understanding functions as values", "Recognizing callbacks assigned to variables"]);
  }),
  topic("arrow-function", "Arrow function", 30, (m, t, i) => {
    const offset = i + 1;
    const code = `const addOffset = (value) => value + ${offset};\nconst result = addOffset(10);`;
    return makeCard(m, t, i, code, `Read a compact function that returns one expression`, [
      `Defines addOffset as an arrow function; the expression after => is returned automatically.`,
      `Calls addOffset with 10 and stores the computed result.`,
    ], ["Reading array callbacks", "Understanding short helper functions", "Recognizing implicit returns"]);
  }),
  topic("default-parameter", "Default parameter", 30, (m, t, i) => {
    const fallback = pick(["info", "warn", "error", "debug"], i);
    const message = `Started ${i + 1}`;
    const code = `function log(message, level = "${fallback}") {\n  console.log(\`[\${level}] \${message}\`);\n}\nlog("${message}");`;
    return makeCard(m, t, i, code, `Use a default argument when a caller omits a parameter`, [
      `Declares log with message and level parameters; level defaults to "${fallback}".`,
      `Builds and logs a formatted message using both parameters.`,
      `Closes the function body.`,
      `Calls log with only message, so level uses its default.`,
    ], ["Reading optional function arguments", "Understanding default configuration", "Recognizing missing argument behavior"]);
  }),
  topic("rest-parameter", "Rest parameter", 30, (m, t, i) => {
    const code = `function sum(...values) {\n  return values.reduce((total, value) => total + value, 0);\n}\nconst total = sum(1, 2, ${i + 3});`;
    return makeCard(m, t, i, code, `Collect any number of arguments into an array`, [
      `Declares sum with a rest parameter so all arguments become the values array.`,
      `Reduces values into a single numeric total starting from 0.`,
      `Closes the function body.`,
      `Calls sum with three arguments and stores the returned total.`,
    ], ["Reading variadic helpers", "Understanding wrapper functions", "Recognizing argument collection"]);
  }),
  topic("callback-basic", "Callback function", 30, (m, t, i) => {
    const list = plural(i);
    const item = singular(list);
    const code = `function visit(items, callback) {\n  for (const item of items) callback(item);\n}\nvisit(["${title(i)}", "${title(i + 1)}"], ${item} => console.log(${item}));`;
    return makeCard(m, t, i, code, `Pass behavior into a function so it can be called for each item`, [
      `Declares visit with an items array and a callback function.`,
      `Loops through items and calls callback with each current item.`,
      `Closes the function body.`,
      `Calls visit with an array and an arrow callback that logs each value.`,
    ], ["Reading event handlers", "Understanding array method callbacks", "Following inversion of control"]);
  }),
  topic("closure-counter", "Closure", 30, (m, t, i) => {
    const start = i;
    const code = `function createCounter() {\n  let count = ${start};\n  return () => {\n    count += 1;\n    return count;\n  };\n}`;
    return makeCard(m, t, i, code, `Return a function that remembers variables from its outer scope`, [
      `Declares a factory function that will create a counter.`,
      `Creates count inside the factory; this variable remains private to the returned function.`,
      `Returns an arrow function that closes over count.`,
      `Increments the remembered count each time the returned function runs.`,
      `Returns the updated count.`,
      `Closes the returned arrow function.`,
      `Closes the factory function.`,
    ], ["Reading private state patterns", "Understanding function factories", "Following callbacks that keep context"]);
  }),
  topic("destructured-parameter", "Destructured parameter", 30, (m, t, i) => {
    const role = `${pick(["admin", "editor", "viewer"], i)}-${i + 1}`;
    const code = `function canEdit({ role, locked }) {\n  return role === "${role}" && !locked;\n}\nconst allowed = canEdit({ role: "${role}", locked: false });`;
    return makeCard(m, t, i, code, `Pull named properties from an argument object directly in the parameter list`, [
      `Declares canEdit and destructures role and locked from the first argument.`,
      `Returns true when role matches "${role}" and locked is false.`,
      `Closes the function body.`,
      `Calls canEdit with an object that supplies the expected properties.`,
    ], ["Reading options objects", "Understanding named arguments in JavaScript", "Recognizing property extraction at function boundaries"]);
  }),
  topic("this-method", "Method this", 30, (m, t, i) => {
    const entity = word(i);
    const code = `const ${entity} = {\n  name: "${title(i)}",\n  greet() {\n    return \`Hello, \${this.name}\`;\n  }\n};`;
    return makeCard(m, t, i, code, `Read this inside an object method as the receiver object`, [
      `Creates an object literal assigned to ${inlineRaw(entity)}.`,
      `Stores a name property on the object.`,
      `Defines a method named greet using method shorthand.`,
      `Uses this.name, which refers to the name property when called as ${entity}.greet().`,
      `Closes the method body.`,
      `Closes the object literal.`,
    ], ["Reading object methods", "Understanding receiver-based this", "Following code that formats object state"]);
  }),
  topic("bind-call-apply", "Binding this", 30, (m, t, i) => {
    const name = title(i);
    const code = `function describe(prefix) {\n  return \`\${prefix}: \${this.name}\`;\n}\nconst bound = describe.bind({ name: "${name}" }, "User");`;
    return makeCard(m, t, i, code, `Create a new function with this and leading arguments fixed`, [
      `Declares describe, which reads this.name and a normal prefix argument.`,
      `Returns a formatted string using prefix and this.name.`,
      `Closes the function body.`,
      `Uses bind to create bound, where this is fixed to an object and prefix is fixed to "User".`,
    ], ["Reading callback binding", "Understanding method borrowing", "Recognizing partial application with this"]);
  }),
];

const collectionTopics = [
  topic("array-map", "Array map", 30, (m, t, i) => {
    const field = pick(["name", "email", "title", "status"], i);
    const code = `const rows = [{ ${field}: "${title(i)}" }, { ${field}: "${title(i + 1)}" }];\nconst values = rows.map(row => row.${field});`;
    return makeCard(m, t, i, code, `Transform each array item into a new value`, [
      `Creates an array of objects named rows.`,
      `Uses map to build a new array by reading ${field} from each row.`,
    ], useCaseSets.collections);
  }),
  topic("array-filter", "Array filter", 30, (m, t, i) => {
    const status = pick(statuses, i);
    const code = `const tasks = [{ id: ${i + 1}, status: "${status}" }, { id: ${i + 2}, status: "done" }];\nconst visible = tasks.filter(task => task.status !== "done");`;
    return makeCard(m, t, i, code, `Keep only array items that pass a predicate`, [
      `Creates a tasks array with status properties.`,
      `Uses filter to keep tasks whose status is not "done".`,
    ], ["Reading list filtering", "Understanding search results", "Recognizing predicate callbacks"]);
  }),
  topic("array-reduce", "Array reduce", 30, (m, t, i) => {
    const a = i + 1;
    const b = a + 2;
    const code = `const prices = [${a}, ${b}, ${b + 3}];\nconst total = prices.reduce((sum, price) => sum + price, 0);`;
    return makeCard(m, t, i, code, `Combine array items into one accumulated value`, [
      `Creates an array of numeric prices.`,
      `Uses reduce to add each price to sum, starting with 0.`,
    ], ["Reading totals", "Understanding aggregation", "Recognizing accumulator patterns"]);
  }),
  topic("array-find", "Array find", 30, (m, t, i) => {
    const id = i + 1;
    const code = `const users = [{ id: ${id} }, { id: ${id + 1} }];\nconst match = users.find(user => user.id === ${id + 1});`;
    return makeCard(m, t, i, code, `Return the first array item that matches a condition`, [
      `Creates an array of user objects with ids.`,
      `Uses find to return the first user whose id equals ${id + 1}.`,
    ], ["Reading lookup code", "Understanding first-match searches", "Recognizing possible undefined results"]);
  }),
  topic("array-some-every", "Array some and every", 30, (m, t, i) => {
    const code = `const checks = [true, ${i % 2 === 0 ? "true" : "false"}, ${i + 1} > 0];\nconst anyFailed = checks.some(check => check === false);\nconst allPassed = checks.every(Boolean);`;
    return makeCard(m, t, i, code, `Summarize booleans across an array`, [
      `Creates an array of boolean check results.`,
      `Uses some to detect whether at least one check is false.`,
      `Uses every with Boolean to detect whether all checks are truthy.`,
    ], ["Reading validation summaries", "Understanding permission checks", "Recognizing all-versus-any logic"]);
  }),
  topic("array-sort", "Array sort", 30, (m, t, i) => {
    const code = `const scores = [${i + 3}, ${i + 1}, ${i + 2}];\nscores.sort((a, b) => a - b);`;
    return makeCard(m, t, i, code, `Sort numbers in ascending order with a comparator`, [
      `Creates an array of scores in unsorted order.`,
      `Sorts the same array in place by returning a negative value when a should come before b.`,
    ], ["Reading ranking code", "Understanding in-place mutations", "Recognizing numeric sort comparators"]);
  }),
  topic("object-keys-values", "Object keys and values", 30, (m, t, i) => {
    const code = `const counts = { open: ${i + 1}, closed: ${i + 2} };\nconst keys = Object.keys(counts);\nconst values = Object.values(counts);`;
    return makeCard(m, t, i, code, `Extract property names and property values from an object`, [
      `Creates an object that maps status names to counts.`,
      `Builds an array of the object's own enumerable property names.`,
      `Builds an array of the object's own enumerable property values.`,
    ], ["Reading object iteration setup", "Understanding dashboards", "Recognizing object-to-array conversion"]);
  }),
  topic("object-entries-from-entries", "Object entries", 30, (m, t, i) => {
    const code = `const params = { page: "${i + 1}", limit: "20" };\nconst pairs = Object.entries(params);\nconst copy = Object.fromEntries(pairs);`;
    return makeCard(m, t, i, code, `Move between object form and key-value pair arrays`, [
      `Creates an object of string parameters.`,
      `Converts the object to an array of [key, value] pairs.`,
      `Converts the pairs back into an object.`,
    ], ["Reading query parameter code", "Understanding object transformations", "Recognizing key-value pair pipelines"]);
  }),
  topic("map-lookup", "Map lookup", 30, (m, t, i) => {
    const key = pick(["admin", "editor", "viewer", "guest"], i);
    const code = `const permissions = new Map();\npermissions.set("${key}", ["read", "scope:${i + 1}"]);\nconst rules = permissions.get("${key}");`;
    return makeCard(m, t, i, code, `Use Map for explicit key-value storage`, [
      `Creates an empty Map instance.`,
      `Stores an array of permissions under the key "${key}".`,
      `Reads the value for "${key}" back from the Map.`,
    ], ["Reading lookup tables", "Understanding non-object dictionaries", "Recognizing Map get and set calls"]);
  }),
  topic("set-membership", "Set membership", 30, (m, t, i) => {
    const role = pick(["admin", "editor", "viewer"], i);
    const code = `const roles = new Set(["admin", "${role}", "scope:${i + 1}"]);\nconst canPublish = roles.has("editor");`;
    return makeCard(m, t, i, code, `Use Set to track unique values and test membership`, [
      `Creates a Set; duplicate values would be stored only once.`,
      `Checks whether the Set contains "editor" and stores the boolean result.`,
    ], ["Reading permission checks", "Understanding de-duplication", "Recognizing fast membership tests"]);
  }),
];

const dataTopics = [
  topic("string-trim-lower", "String normalization", 30, (m, t, i) => {
    const email = `${title(i).toLowerCase()}@Example.COM`;
    const code = `const rawEmail = " ${email} ";\nconst email = rawEmail.trim().toLowerCase();`;
    return makeCard(m, t, i, code, `Normalize user input before storing or comparing it`, [
      `Stores an email-like string with extra whitespace and mixed case.`,
      `Trims surrounding whitespace and lowercases the result.`,
    ], useCaseSets.data);
  }),
  topic("string-split-join", "Split and join", 30, (m, t, i) => {
    const slug = `${word(i)}-${word(i + 1)}-${word(i + 2)}`;
    const code = `const slug = "${slug}";\nconst title = slug.split("-").join(" ");`;
    return makeCard(m, t, i, code, `Convert a delimiter-separated string into a display string`, [
      `Stores a hyphen-separated slug.`,
      `Splits on hyphens to make an array, then joins the parts with spaces.`,
    ], ["Reading slug formatting", "Understanding simple string pipelines", "Recognizing delimiter conversion"]);
  }),
  topic("string-includes-starts", "String checks", 30, (m, t, i) => {
    const pathValue = `/api/${plural(i)}`;
    const code = `const path = "${pathValue}";\nconst isApi = path.startsWith("/api/");\nconst hasUsers = path.includes("users");`;
    return makeCard(m, t, i, code, `Check whether a string has expected prefixes or substrings`, [
      `Stores a URL path string.`,
      `Checks whether the path begins with the API prefix.`,
      `Checks whether the path contains the word "users".`,
    ], ["Reading route filters", "Understanding feature detection in strings", "Recognizing substring tests"]);
  }),
  topic("regex-test", "Regex test", 30, (m, t, i) => {
    const code = `const value = "${i % 2 === 0 ? `user${i + 1}@example.com` : `not-an-email-${i + 1}`}";\nconst looksLikeEmail = /^[^@]+@[^@]+$/.test(value);`;
    return makeCard(m, t, i, code, `Use a regular expression to return a boolean validation result`, [
      `Stores the string value to validate.`,
      `Tests the string against a simple email-like pattern and stores true or false.`,
    ], ["Reading validation code", "Understanding regex predicates", "Recognizing pattern.test(value)"]);
  }),
  topic("regex-replace", "Regex replace", 30, (m, t, i) => {
    const code = `const phone = "555.${1000 + i}.${2000 + i}";\nconst digits = phone.replace(/\\D/g, "");`;
    return makeCard(m, t, i, code, `Remove every non-digit character from a string`, [
      `Stores a phone-like string containing punctuation.`,
      `Uses a global non-digit regex to replace all non-digits with an empty string.`,
    ], ["Reading input cleanup", "Understanding global replacements", "Recognizing common sanitization snippets"]);
  }),
  topic("number-rounding", "Number rounding", 30, (m, t, i) => {
    const value = (i + 1) * 1.2345;
    const code = `const raw = ${value.toFixed(4)};\nconst rounded = Math.round(raw * 100) / 100;`;
    return makeCard(m, t, i, code, `Round a number to two decimal places`, [
      `Stores a number with several decimal places.`,
      `Shifts two decimals, rounds to the nearest integer, then shifts back.`,
    ], ["Reading money-like formatting", "Understanding numeric precision handling", "Recognizing Math.round scaling"]);
  }),
  topic("date-format", "Date formatting", 30, (m, t, i) => {
    const day = String((i % 27) + 1).padStart(2, "0");
    const hour = String(i % 24).padStart(2, "0");
    const code = `const date = new Date("2026-04-${day}T${hour}:00:00Z");\nconst isoDay = date.toISOString().slice(0, 10);`;
    return makeCard(m, t, i, code, `Convert a Date to an ISO date string`, [
      `Creates a Date from an ISO timestamp string.`,
      `Converts it back to ISO text and keeps only the YYYY-MM-DD portion.`,
    ], ["Reading date serialization", "Understanding API date formats", "Recognizing ISO string slicing"]);
  }),
  topic("json-parse-stringify", "JSON parse and stringify", 30, (m, t, i) => {
    const id = i + 1;
    const code = `const text = '{"id":${id},"active":true}';\nconst data = JSON.parse(text);\nconst copy = JSON.stringify(data);`;
    return makeCard(m, t, i, code, `Move between JSON text and JavaScript values`, [
      `Stores JSON as a string.`,
      `Parses the JSON string into a JavaScript object.`,
      `Serializes the object back into JSON text.`,
    ], ["Reading API clients", "Understanding file data loading", "Recognizing serialization boundaries"]);
  }),
  topic("url-search-params", "URLSearchParams", 30, (m, t, i) => {
    const page = (i % 5) + 1;
    const code = `const params = new URLSearchParams({ page: "${page}", q: "js-${i + 1}" });\nconst query = params.toString();`;
    return makeCard(m, t, i, code, `Build a URL query string from named parameters`, [
      `Creates URLSearchParams from an object of string parameters.`,
      `Serializes the parameters into query-string form.`,
    ], ["Reading fetch URLs", "Understanding query construction", "Recognizing browser and Node URL helpers"]);
  }),
  topic("intl-format", "Intl formatting", 30, (m, t, i) => {
    const amount = pick(amounts, i);
    const code = `const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });\nconst label = formatter.format(${amount});`;
    return makeCard(m, t, i, code, `Format numbers for display using locale-aware APIs`, [
      `Creates a formatter configured for US dollar currency output.`,
      `Formats the numeric amount into a user-facing currency string.`,
    ], ["Reading display formatting", "Understanding locale-aware code", "Recognizing Intl helper objects"]);
  }),
];

const moduleTopics = [
  topic("class-basic", "Basic class", 30, (m, t, i) => {
    const cls = upperFirst(word(i));
    const code = `class ${cls} {\n  constructor(id) {\n    this.id = id;\n  }\n}\nconst value = new ${cls}(${i + 1});`;
    return makeCard(m, t, i, code, `Define a constructor-backed object type and create an instance`, [
      `Declares a class named ${cls}.`,
      `Defines the constructor that runs when new ${cls} is called.`,
      `Stores the constructor argument on the instance as id.`,
      `Closes the constructor body.`,
      `Closes the class body.`,
      `Creates a new ${cls} instance with id ${i + 1}.`,
    ], useCaseSets.modules);
  }),
  topic("class-method", "Class method", 30, (m, t, i) => {
    const cls = `${upperFirst(word(i))}View`;
    const code = `class ${cls} {\n  render() {\n    return "<section></section>";\n  }\n}`;
    return makeCard(m, t, i, code, `Attach behavior to instances through a class method`, [
      `Declares the class ${cls}.`,
      `Defines an instance method named render.`,
      `Returns an HTML string when render is called.`,
      `Closes the method body.`,
      `Closes the class body.`,
    ], ["Reading component-like classes", "Understanding methods on prototypes", "Recognizing instance behavior"]);
  }),
  topic("class-inheritance", "Class inheritance", 30, (m, t, i) => {
    const child = `${upperFirst(word(i))}Error`;
    const code = `class ${child} extends Error {\n  constructor(message) {\n    super(message);\n    this.name = "${child}";\n  }\n}`;
    return makeCard(m, t, i, code, `Create a specialized error class by extending Error`, [
      `Declares ${child} as a subclass of Error.`,
      `Defines a constructor that accepts an error message.`,
      `Calls the parent Error constructor with the message.`,
      `Sets a custom name so logs identify this error type.`,
      `Closes the constructor body.`,
      `Closes the class body.`,
    ], ["Reading custom errors", "Understanding inheritance", "Recognizing super calls"]);
  }),
  topic("private-field", "Private class field", 30, (m, t, i) => {
    const cls = `${upperFirst(word(i))}Store`;
    const code = `class ${cls} {\n  #items = [];\n  add(item) {\n    this.#items.push(item);\n  }\n}`;
    return makeCard(m, t, i, code, `Keep class state private with a hash-prefixed field`, [
      `Declares the class ${cls}.`,
      `Creates a private #items field initialized to an empty array.`,
      `Defines an add method that accepts an item.`,
      `Pushes the item into the private array from inside the class.`,
      `Closes the method body.`,
      `Closes the class body.`,
    ], ["Reading encapsulated state", "Understanding private fields", "Recognizing class-only access"]);
  }),
  topic("getter-setter", "Getter and setter", 30, (m, t, i) => {
    const cls = `${upperFirst(word(i))}Model`;
    const code = `class ${cls} {\n  set name(value) {\n    this._name = value.trim();\n  }\n  get name() {\n    return this._name;\n  }\n}`;
    return makeCard(m, t, i, code, `Read property syntax that runs methods behind the scenes`, [
      `Declares the class ${cls}.`,
      `Defines a setter that runs when name is assigned.`,
      `Stores a trimmed version of the assigned value.`,
      `Closes the setter body.`,
      `Defines a getter that runs when name is read.`,
      `Returns the stored _name value.`,
      `Closes the getter body.`,
      `Closes the class body.`,
    ], ["Reading model objects", "Understanding computed properties", "Recognizing validation inside setters"]);
  }),
  topic("prototype-method", "Prototype method", 30, (m, t, i) => {
    const ctor = `${upperFirst(word(i))}List`;
    const code = `function ${ctor}() {\n  this.items = [];\n}\n${ctor}.prototype.add = function (item) {\n  this.items.push(item);\n};`;
    return makeCard(m, t, i, code, `Recognize pre-class prototype-based method sharing`, [
      `Declares a constructor function named ${ctor}.`,
      `Initializes an items array on each instance.`,
      `Closes the constructor function.`,
      `Assigns an add function to the constructor's prototype so instances share it.`,
      `Pushes the given item into the receiver instance's items array.`,
      `Closes the prototype method assignment.`,
    ], ["Reading older JavaScript", "Understanding class syntax internals", "Recognizing shared methods"]);
  }),
  topic("esm-export", "ES module export", 30, (m, t, i) => {
    const fn = `load${upperFirst(plural(i))}`;
    const code = `export function ${fn}() {\n  return [];\n}`;
    return makeCard(m, t, i, code, `Expose a named function from an ES module`, [
      `Declares and exports ${fn}, making it importable by other modules.`,
      `Returns an empty array as the function result.`,
      `Closes the exported function.`,
    ], ["Reading module boundaries", "Understanding named exports", "Recognizing public helpers"]);
  }),
  topic("esm-import", "ES module import", 30, (m, t, i) => {
    const fn = `load${upperFirst(plural(i))}`;
    const file = `./${plural(i)}.js`;
    const code = `import { ${fn} } from "${file}";\nconst rows = ${fn}();`;
    return makeCard(m, t, i, code, `Bring a named export into the current module and use it`, [
      `Imports the named export ${fn} from ${file}.`,
      `Calls the imported function and stores its return value in rows.`,
    ], ["Reading dependencies", "Understanding module wiring", "Recognizing imported helpers"]);
  }),
  topic("commonjs-require", "CommonJS require", 30, (m, t, i) => {
    const mod = pick(["fs", "path", "crypto", "os"], i);
    const code = `const ${mod} = require("node:${mod}");\nconsole.log(typeof ${mod}, ${i + 1});`;
    return makeCard(m, t, i, code, `Load a built-in Node.js module with CommonJS`, [
      `Calls require to load the node:${mod} module and stores its exports.`,
      `Logs the type of the imported module object or function along with a sample id.`,
    ], ["Reading older Node.js code", "Understanding built-in module imports", "Recognizing CommonJS syntax"]);
  }),
  topic("dynamic-import", "Dynamic import", 30, (m, t, i) => {
    const name = pick(["fs", "path", "crypto", "os"], i);
    const fn = `load${upperFirst(name)}Module${i + 1}`;
    const code = `async function ${fn}() {\n  const mod = await import("node:${name}");\n  return mod;\n}`;
    return makeCard(m, t, i, code, `Load a module asynchronously at runtime`, [
      `Declares ${fn} as an async function because dynamic import returns a promise.`,
      `Awaits the module namespace object from node:${name}.`,
      `Returns the loaded module to the caller.`,
      `Closes the async function.`,
    ], ["Reading lazy-loaded modules", "Understanding conditional imports", "Recognizing ESM interop patterns"]);
  }),
];

const asyncTopics = [
  topic("promise-then", "Promise then", 30, (m, t, i) => {
    const value = i + 1;
    const code = `Promise.resolve(${value})\n  .then(value => value * 2)\n  .then(result => console.log(result));`;
    return makeCard(m, t, i, code, `Read a promise chain as staged asynchronous transformations`, [
      `Creates an already-fulfilled promise with the value ${value}.`,
      `Adds a then handler that receives the value and doubles it.`,
      `Adds another then handler that logs the transformed result.`,
    ], useCaseSets.async);
  }),
  topic("promise-catch", "Promise catch", 30, (m, t, i) => {
    const code = `Promise.reject(new Error("Failed ${i + 1}"))\n  .catch(error => console.error(error.message));`;
    return makeCard(m, t, i, code, `Handle a rejected promise with catch`, [
      `Creates a rejected promise containing an Error object.`,
      `Registers a catch handler that receives the error and logs its message.`,
    ], ["Reading async error handling", "Understanding rejected promises", "Recognizing recovery points in chains"]);
  }),
  topic("async-await", "Async await", 30, (m, t, i) => {
    const url = `${pick(urls, i)}?request=${i + 1}`;
    const code = `async function loadJson${i + 1}() {\n  const response = await fetch("${url}");\n  return response.json();\n}`;
    return makeCard(m, t, i, code, `Wait for a network response inside an async function`, [
      `Declares loadJson${i + 1} as async so await can be used inside it.`,
      `Starts a fetch request and pauses until the response promise fulfills.`,
      `Returns the promise from response.json(), which the async function will await for callers.`,
      `Closes the async function.`,
    ], ["Reading API clients", "Understanding await pauses", "Recognizing async return values"]);
  }),
  topic("async-try-catch", "Async try catch", 30, (m, t, i) => {
    const url = `${pick(urls, i)}?safe=${i + 1}`;
    const code = `async function loadSafe${i + 1}() {\n  try {\n    return await fetch("${url}");\n  } catch (error) {\n    return null;\n  }\n}`;
    return makeCard(m, t, i, code, `Recover from an awaited operation that may reject`, [
      `Declares an async function that wraps a risky operation.`,
      `Starts a try block for errors thrown or rejections awaited inside it.`,
      `Awaits fetch and returns the response if it succeeds.`,
      `Starts a catch block that receives any thrown error.`,
      `Returns null as a fallback failure value.`,
      `Closes the catch block.`,
      `Closes the async function.`,
    ], ["Reading resilient API calls", "Understanding async recovery", "Recognizing fallback values after failures"]);
  }),
  topic("promise-all", "Promise all", 30, (m, t, i) => {
    const a = plural(i);
    const b = plural(i + 1);
    const code = `const [${a}, ${b}] = await Promise.all([\n  fetch("/${a}").then(res => res.json()),\n  fetch("/${b}").then(res => res.json())\n]);`;
    return makeCard(m, t, i, code, `Run independent async operations concurrently and wait for all of them`, [
      `Starts Promise.all and destructures the resolved array into ${a} and ${b}.`,
      `Fetches /${a} and parses the response JSON.`,
      `Fetches /${b} and parses the response JSON.`,
      `Closes the array and awaits all promises; one rejection rejects the whole Promise.all.`,
    ], ["Reading concurrent data loading", "Understanding parallel requests", "Recognizing fail-fast promise groups"]);
  }),
  topic("promise-all-settled", "Promise allSettled", 30, (m, t, i) => {
    const code = `const results = await Promise.allSettled([\n  fetch("/primary/${i + 1}"),\n  fetch("/backup/${i + 1}")\n]);\nconst failures = results.filter(result => result.status === "rejected");`;
    return makeCard(m, t, i, code, `Wait for every promise even when some fail`, [
      `Starts allSettled and waits for a result object for each promise.`,
      `Starts a request to the primary endpoint.`,
      `Starts a request to the backup endpoint.`,
      `Closes the promise array and stores all settled outcomes.`,
      `Filters the outcome objects to keep only rejected results.`,
    ], ["Reading bulk operations", "Understanding partial failure handling", "Recognizing status-based promise results"]);
  }),
  topic("abort-controller", "AbortController", 30, (m, t, i) => {
    const url = `${pick(urls, i)}?abort=${i + 1}`;
    const code = `const controller = new AbortController();\nconst request = fetch("${url}", { signal: controller.signal });\ncontroller.abort();`;
    return makeCard(m, t, i, code, `Create a cancellable fetch request`, [
      `Creates an AbortController that owns a cancellation signal.`,
      `Passes the signal into fetch so the request can be aborted.`,
      `Aborts the request, causing fetch to reject if it has not completed.`,
    ], ["Reading timeout code", "Understanding request cancellation", "Recognizing cleanup on navigation or shutdown"]);
  }),
  topic("set-timeout-promise", "Timeout promise", 30, (m, t, i) => {
    const ms = 100 + i * 50;
    const code = `const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));\nawait delay(${ms});\nconsole.log("done");`;
    return makeCard(m, t, i, code, `Wrap setTimeout in a promise so it can be awaited`, [
      `Defines delay as a function that returns a promise resolved by setTimeout.`,
      `Awaits the delay for ${ms} milliseconds before continuing.`,
      `Logs "done" after the awaited timer resolves.`,
    ], ["Reading retry backoff", "Understanding async timers", "Recognizing promise wrappers around callbacks"]);
  }),
  topic("async-generator", "Async generator", 30, (m, t, i) => {
    const code = `async function* pages() {\n  yield { page: ${i + 1} };\n  yield { page: ${i + 2} };\n}\nfor await (const page of pages()) {\n  console.log(page.page);\n}`;
    return makeCard(m, t, i, code, `Read an asynchronous sequence one yielded value at a time`, [
      `Declares an async generator function named pages.`,
      `Yields the first page object to the consumer.`,
      `Yields the second page object to the consumer.`,
      `Closes the async generator.`,
      `Starts a for await loop, which waits for each yielded value.`,
      `Logs the page number from the current yielded object.`,
      `Closes the loop body.`,
    ], ["Reading paginated APIs", "Understanding async streams of data", "Recognizing for await loops"]);
  }),
  topic("microtask-queue", "Microtask queue", 30, (m, t, i) => {
    const code = `console.log("A${i + 1}");\nqueueMicrotask(() => console.log("B${i + 1}"));\nconsole.log("C${i + 1}");`;
    return makeCard(m, t, i, code, `Recognize that queued microtasks run after the current call stack finishes`, [
      `Logs the A label synchronously right away.`,
      `Schedules a microtask that will log the B label later in the same turn.`,
      `Logs the C label synchronously before the microtask runs.`,
    ], ["Reading scheduling code", "Understanding promise-like timing", "Predicting log order"]);
  }),
];

const nodeTopics = [
  topic("process-env", "Process environment", 30, (m, t, i) => {
    const env = pick(envNames, i);
    const fallback = env === "PORT" ? 3000 + i : `"${pick(statuses, i)}-${i + 1}"`;
    const code = `const value = process.env.${env} ?? ${fallback};\nconsole.log(value);`;
    return makeCard(m, t, i, code, `Read configuration from environment variables with a fallback`, [
      `Reads process.env.${env}; if it is nullish, the fallback value is used.`,
      `Logs the resolved configuration value.`,
    ], useCaseSets.node);
  }),
  topic("process-argv", "Process arguments", 30, (m, t, i) => {
    const code = `const [, , command = "help-${i + 1}"] = process.argv;\nconsole.log(` + "`Running ${command}`" + `);`;
    return makeCard(m, t, i, code, `Read the first user-supplied command-line argument`, [
      `Destructures process.argv, skipping the node executable and script path, and defaults command to "help-${i + 1}".`,
      `Logs the selected command with template literal interpolation.`,
    ], ["Reading CLI scripts", "Understanding process.argv shape", "Recognizing defaults for missing arguments"]);
  }),
  topic("path-join", "Path join", 30, (m, t, i) => {
    const file = pick(["users.json", "orders.json", "app.log", "index.html"], i);
    const code = `import path from "node:path";\nconst filePath = path.join("data", "${i + 1}", "${file}");`;
    return makeCard(m, t, i, code, `Build a platform-safe file path`, [
      `Imports the Node.js path module.`,
      `Joins path segments using the correct separator for the current operating system.`,
    ], ["Reading file access code", "Understanding cross-platform paths", "Recognizing path helpers"]);
  }),
  topic("fs-read-file", "Read file", 30, (m, t, i) => {
    const file = `./data/${word(i)}-${i + 1}.json`;
    const code = `import { readFile } from "node:fs/promises";\nconst text = await readFile("${file}", "utf8");`;
    return makeCard(m, t, i, code, `Read a text file asynchronously in Node.js`, [
      `Imports the promise-based readFile helper from node:fs/promises.`,
      `Awaits the file contents as a UTF-8 string.`,
    ], ["Reading configuration files", "Understanding async filesystem code", "Recognizing text file loading"]);
  }),
  topic("fs-write-file", "Write file", 30, (m, t, i) => {
    const file = `./tmp/${word(i)}-${i + 1}.json`;
    const code = `import { writeFile } from "node:fs/promises";\nawait writeFile("${file}", JSON.stringify({ ok: true }, null, 2));`;
    return makeCard(m, t, i, code, `Write serialized data to a file asynchronously`, [
      `Imports the promise-based writeFile helper from node:fs/promises.`,
      `Serializes an object as formatted JSON and writes it to the chosen file.`,
    ], ["Reading build scripts", "Understanding generated files", "Recognizing async file writes"]);
  }),
  topic("http-server", "HTTP server", 30, (m, t, i) => {
    const port = 3000 + i;
    const code = `import http from "node:http";\nconst server = http.createServer((req, res) => {\n  res.end("ok");\n});\nserver.listen(${port});`;
    return makeCard(m, t, i, code, `Create a minimal Node.js HTTP server`, [
      `Imports Node's built-in HTTP module.`,
      `Creates a server and provides a callback for each request.`,
      `Ends the response with the text "ok".`,
      `Closes the request handler callback.`,
      `Starts listening for connections on port ${port}.`,
    ], ["Reading backend entry points", "Understanding request handlers", "Recognizing server startup code"]);
  }),
  topic("event-emitter", "EventEmitter", 30, (m, t, i) => {
    const event = pick(eventNames, i);
    const code = `import { EventEmitter } from "node:events";\nconst bus = new EventEmitter();\nbus.on("${event}", value => console.log(value));\nbus.emit("${event}", "${title(i)}");`;
    return makeCard(m, t, i, code, `Register a listener and emit an event`, [
      `Imports EventEmitter from Node's events module.`,
      `Creates an event bus instance.`,
      `Registers a listener for the "${event}" event.`,
      `Emits the "${event}" event with a string payload.`,
    ], ["Reading event-driven code", "Understanding pub-sub style APIs", "Recognizing listener registration"]);
  }),
  topic("buffer-basic", "Buffer", 30, (m, t, i) => {
    const text = `${word(i)}:${i + 1}`;
    const code = `const buffer = Buffer.from("${text}", "utf8");\nconst text = buffer.toString("utf8");`;
    return makeCard(m, t, i, code, `Convert between text and raw bytes in Node.js`, [
      `Creates a Buffer containing the UTF-8 bytes for the string.`,
      `Decodes the buffer back into a UTF-8 string.`,
    ], ["Reading binary protocols", "Understanding file and network buffers", "Recognizing byte/text conversion"]);
  }),
  topic("stream-pipeline", "Stream pipeline", 30, (m, t, i) => {
    const source = pick(paths, i);
    const code = `import { pipeline } from "node:stream/promises";\nimport { createReadStream, createWriteStream } from "node:fs";\nawait pipeline(createReadStream("${source}"), createWriteStream("${source}.copy.${i + 1}"));`;
    return makeCard(m, t, i, code, `Pipe data between streams with promise-based error handling`, [
      `Imports the promise-based pipeline helper.`,
      `Imports stream constructors for reading and writing files.`,
      `Connects a read stream to a write stream and awaits completion or failure.`,
    ], ["Reading large file copies", "Understanding stream error handling", "Recognizing pipeline as safer pipe composition"]);
  }),
  topic("node-fetch", "Fetch in Node", 30, (m, t, i) => {
    const url = `${pick(urls, i)}?node=${i + 1}`;
    const code = `const response = await fetch("${url}");\nif (!response.ok) throw new Error(` + "`HTTP ${response.status}`" + `);\nconst data = await response.json();`;
    return makeCard(m, t, i, code, `Fetch JSON and fail explicitly on non-success HTTP status codes`, [
      `Sends an HTTP request and waits for the response.`,
      `Throws an error if the response status is outside the successful range.`,
      `Parses and awaits the response body as JSON.`,
    ], ["Reading service clients", "Understanding HTTP error checks", "Recognizing fetch response handling"]);
  }),
];

const advancedTopics = [
  topic("memoization", "Memoization", 30, (m, t, i) => {
    const fn = `load${upperFirst(singular(plural(i)))}`;
    const code = `const cache = new Map();\nasync function ${fn}(id) {\n  if (cache.has(id)) return cache.get(id);\n  const value = await fetch(\`/api/\${id}\`).then(res => res.json());\n  cache.set(id, value);\n  return value;\n}`;
    return makeCard(m, t, i, code, `Cache async results by key to avoid repeated work`, [
      `Creates a Map to store previously loaded values.`,
      `Declares an async loader that receives an id.`,
      `Returns the cached value immediately when the id is already present.`,
      `Fetches and parses the value when it is not cached.`,
      `Stores the loaded value under the id for future calls.`,
      `Returns the loaded value to the caller.`,
      `Closes the async function.`,
    ], useCaseSets.advanced);
  }),
  topic("middleware-chain", "Middleware chain", 30, (m, t, i) => {
    const code = `const ctx = { requestId: ${i + 1} };\nconst middleware = [auth, validate, handle];\nlet index = 0;\nconst next = () => middleware[index++]?.(ctx, next);\nnext();`;
    return makeCard(m, t, i, code, `Run a sequence of middleware functions where each one can call next`, [
      `Creates the context object that will be passed through the middleware chain.`,
      `Stores middleware functions in the order they should run.`,
      `Tracks the next middleware index to execute.`,
      `Defines next so it calls the current middleware, advances the index, and passes next onward.`,
      `Starts the chain by calling next once.`,
    ], ["Reading web frameworks", "Understanding request pipelines", "Recognizing composable control flow"]);
  }),
  topic("retry-backoff", "Retry with backoff", 30, (m, t, i) => {
    const retries = i + 2;
    const code = `async function sendWithRetry() {\n  for (let attempt = 0; attempt < ${retries}; attempt += 1) {\n    try {\n      return await send();\n    } catch (error) {\n      await delay(2 ** attempt * 100);\n    }\n  }\n}\nconst result = await sendWithRetry();`;
    return makeCard(m, t, i, code, `Retry a failing async operation with increasing delays`, [
      `Declares an async helper so returning from the retry loop is syntactically valid.`,
      `Starts a loop that allows up to ${retries} attempts.`,
      `Begins a try block for the operation that may fail.`,
      `Returns immediately if send succeeds.`,
      `Catches a failure from send.`,
      `Waits for an exponential backoff delay before the next attempt.`,
      `Closes the catch block.`,
      `Closes the retry loop.`,
      `Closes the async helper.`,
      `Calls the helper and awaits its result.`,
    ], ["Reading resilient network code", "Understanding exponential backoff", "Recognizing retry loops"]);
  }),
  topic("semaphore", "Semaphore", 30, (m, t, i) => {
    const limit = i + 2;
    const code = `const running = new Set();\nfor (const task of tasks) {\n  const promise = task().finally(() => running.delete(promise));\n  running.add(promise);\n  if (running.size >= ${limit}) await Promise.race(running);\n}`;
    return makeCard(m, t, i, code, `Limit concurrency by waiting when too many tasks are running`, [
      `Creates a Set to track currently running promises.`,
      `Loops over task functions that each start async work.`,
      `Starts a task and removes its promise from running when it settles.`,
      `Adds the started promise to the running Set.`,
      `When ${limit} or more tasks are active, waits for the first active task to finish.`,
      `Closes the loop body.`,
    ], ["Reading batch processors", "Understanding concurrency limits", "Recognizing Promise.race throttling"]);
  }),
  topic("factory-function", "Factory function", 30, (m, t, i) => {
    const kind = singular(plural(i));
    const code = `function create${upperFirst(kind)}Store(db) {\n  return {\n    find(id) {\n      return db.get("${kind}", id);\n    }\n  };\n}`;
    return makeCard(m, t, i, code, `Create an object whose methods close over a dependency`, [
      `Declares a factory function that receives a db dependency.`,
      `Returns an object literal as the created store.`,
      `Defines a find method on the returned object.`,
      `Uses the closed-over db dependency to load a ${kind} by id.`,
      `Closes the method body.`,
      `Closes the returned object.`,
      `Closes the factory function.`,
    ], ["Reading dependency injection", "Understanding testable modules", "Recognizing closure-backed services"]);
  }),
  topic("strategy-pattern", "Strategy pattern", 30, (m, t, i) => {
    const format = pick(["json", "text", "html"], i);
    const code = `const serializers = {\n  json: value => JSON.stringify(value),\n  text: value => String(value)\n};\nconst output = serializers["${format}"]?.({ id: ${i + 1}, ok: true }) ?? "";`;
    return makeCard(m, t, i, code, `Choose behavior from a lookup table instead of a long conditional`, [
      `Creates an object whose properties are serializer functions.`,
      `Defines the JSON serialization strategy.`,
      `Defines the text serialization strategy.`,
      `Closes the strategy table.`,
      `Looks up the requested strategy, calls it if present, and falls back to an empty string.`,
    ], ["Reading plugin systems", "Understanding behavior maps", "Recognizing alternatives to switch statements"]);
  }),
  topic("proxy-trap", "Proxy trap", 30, (m, t, i) => {
    const code = `const state = new Proxy({ id: ${i + 1} }, {\n  get(target, key) {\n    return key in target ? target[key] : null;\n  }\n});`;
    return makeCard(m, t, i, code, `Intercept property reads and customize missing-value behavior`, [
      `Creates a Proxy around a target object and a handler object.`,
      `Defines a get trap that runs whenever a property is read.`,
      `Returns the stored value when the key exists, otherwise returns null.`,
      `Closes the get trap.`,
      `Closes the proxy handler and declaration.`,
    ], ["Reading framework internals", "Understanding metaprogramming", "Recognizing custom object behavior"]);
  }),
  topic("weakmap-private", "WeakMap private state", 30, (m, t, i) => {
    const cls = `${upperFirst(word(i))}Session`;
    const code = `const secrets = new WeakMap();\nclass ${cls} {\n  constructor(token) {\n    secrets.set(this, token);\n  }\n  token() {\n    return secrets.get(this);\n  }\n}`;
    return makeCard(m, t, i, code, `Associate hidden state with object instances without exposing it as a property`, [
      `Creates a WeakMap to hold private data keyed by instances.`,
      `Declares the ${cls} class.`,
      `Defines a constructor that receives a token.`,
      `Stores the token in the WeakMap under this instance.`,
      `Closes the constructor.`,
      `Defines a method that reads the hidden token.`,
      `Gets the token associated with this instance.`,
      `Closes the token method.`,
      `Closes the class.`,
    ], ["Reading older privacy patterns", "Understanding memory-safe instance metadata", "Recognizing WeakMap state"]);
  }),
  topic("async-local-storage", "AsyncLocalStorage", 30, (m, t, i) => {
    const code = `import { AsyncLocalStorage } from "node:async_hooks";\nconst storage = new AsyncLocalStorage();\nstorage.run({ requestId: "${i + 1}" }, () => {\n  console.log(storage.getStore().requestId);\n});`;
    return makeCard(m, t, i, code, `Keep request-scoped context available across async calls`, [
      `Imports AsyncLocalStorage from Node's async hooks module.`,
      `Creates a storage instance for context values.`,
      `Runs a callback with a requestId object as the active store.`,
      `Reads the current store and logs its requestId inside that context.`,
      `Closes the callback and storage.run call.`,
    ], ["Reading request tracing", "Understanding contextual logging", "Recognizing per-request state in Node"]);
  }),
  topic("worker-thread", "Worker thread", 30, (m, t, i) => {
    const file = `./workers/${word(i)}.js`;
    const code = `import { Worker } from "node:worker_threads";\nconst worker = new Worker(new URL("${file}", import.meta.url));\nworker.postMessage({ id: ${i + 1} });`;
    return makeCard(m, t, i, code, `Start CPU-heavy work in a separate Node.js worker thread`, [
      `Imports Worker from Node's worker_threads module.`,
      `Creates a worker from a module URL resolved relative to the current file.`,
      `Sends an initial message object to the worker.`,
    ], ["Reading parallel processing code", "Understanding worker startup", "Recognizing message-based coordination"]);
  }),
];

function templateVars(i, moduleInfo = null) {
  const list = plural(i).replace(/\d+/g, "");
  const item = safeIdentifier(singular(list));
  const entity = word(i);
  const other = word(i + 7);
  const field = pick(["id", "name", "status", "email", "role", "total", "createdAt", "updatedAt"], i);
  const method = pick(methods, i);
  const status = pick(statuses, i);
  const status2 = pick(statuses, i + 3);
  const event = pick(eventNames, i);
  return {
    n: String(i + 1),
    n2: String(i + 2),
    n3: String(i + 3),
    ms: String(100 + i * 25),
    port: String(3000 + i),
    amount: String(pick(amounts, i)),
    entity,
    other,
    Entity: upperFirst(entity),
    Other: upperFirst(other),
    list,
    item,
    Item: upperFirst(item),
    field,
    method,
    status,
    status2,
    label: title(i),
    label2: title(i + 1),
    route: `/${list || "items"}`,
    event,
    path: `./data/${entity}-${i + 1}.json`,
    url: `${pick(urls, i)}?sample=${i + 1}`,
    tag: pick(htmlTags, i),
	    env: pick(envNames, i),
    moduleKey: moduleInfo?.key?.replace(/[^a-zA-Z0-9_$]/g, "_") ?? "module",
    ModuleKey: upperFirst(moduleInfo?.key?.replace(/[^a-zA-Z0-9]/g, "") ?? "Module"),
    moduleLabel: moduleInfo?.label ?? "Module",
	  };
}

function applyTemplate(value, vars) {
  return value.replace(/(^|[^$])\{([a-zA-Z][a-zA-Z0-9_]*)\}/g, (match, prefix, key) => {
    if (Object.hasOwn(vars, key)) return `${prefix}${vars[key]}`;
    return match;
  });
}

function templateTopic(key, label, lines, intent, annotations, useCases) {
  return topic(key, label, CARDS_PER_TOPIC, (moduleInfo, topicInfo, i) => {
    const vars = templateVars(i, moduleInfo);
    const codeLines = lines.map((line) => applyTemplate(line, vars));
    const notes = annotations.map((note) => applyTemplate(note, vars));
    if (!lines.join("\n").includes("{n}")) {
      codeLines.push(`// practice case ${i + 1}`);
      notes.push(`Marks this as practice case ${i + 1}; the preceding lines are the pattern to read.`);
    }
    return makeCard(
      moduleInfo,
      topicInfo,
      i,
      codeLines.join("\n"),
      applyTemplate(intent, vars),
      notes,
      useCases,
    );
  });
}

function templateTopics(defaultUseCases, specs) {
  return specs.map((spec) => templateTopic(
    spec.key,
    spec.label,
    spec.lines,
    spec.intent,
    spec.annotations,
    spec.useCases ?? defaultUseCases,
  ));
}

function quizTopic(key, label, spec) {
  return topic(key, label, CARDS_PER_TOPIC, (moduleInfo, topicInfo, i) => {
    const vars = templateVars(i, moduleInfo);
    const codeLines = spec.lines.map((line) => applyTemplate(line, vars));
    const notes = spec.annotations.map((note) => applyTemplate(note, vars));
    const choices = spec.choices.map((choice) => applyTemplate(choice, vars));
    const arranged = arrangeQuizChoices(choices, spec.answerIndex, i);
    if (!spec.lines.join("\n").includes("{n}") && !spec.question.includes("{n}") && !spec.choices.join("\n").includes("{n}")) {
      codeLines.push(`// quiz case ${i + 1}`);
      notes.push(`Marks this as quiz case ${i + 1}; the preceding lines are the rule being tested.`);
    }
    return makeQuizCard(
      moduleInfo,
      topicInfo,
      i,
      codeLines.join("\n"),
      applyTemplate(spec.question, vars),
      arranged.choices,
      arranged.answerIndex,
      applyTemplate(spec.explanation, vars),
      applyTemplate(spec.intent, vars),
      notes,
      spec.useCases ?? useCaseSets.interview,
    );
  });
}

function quizTopics(specs) {
  return specs.map((spec) => quizTopic(spec.key, spec.label, spec));
}

const extraSyntaxTopics = templateTopics(useCaseSets.variables, [
  {
    key: "var-hoisting",
    label: "Var hoisting",
    lines: ["console.log({entity});", "var {entity} = {n};"],
    intent: "Recognize that var declarations are hoisted while assignments still happen later",
    annotations: ["Reads {entity} before the assignment, so older JavaScript returns undefined instead of a temporal dead zone error.", "Declares {entity} with var and assigns the number {n}."],
  },
  {
    key: "temporal-dead-zone",
    label: "Temporal dead zone",
    lines: ["if (true) {", "  const {entity} = {n};", "  console.log({entity});", "}"],
    intent: "Read a block-scoped const as available only after its declaration line",
    annotations: ["Starts a new block scope.", "Declares {entity}; it cannot be read before this line inside the block.", "Reads the initialized value safely.", "Closes the block scope."],
  },
  {
    key: "numeric-separator",
    label: "Numeric separator",
    lines: ["const maxBytes = {n}_000_000;", "const megabytes = maxBytes / 1_000_000;"],
    intent: "Read underscores in numeric literals as visual separators only",
    annotations: ["Creates a large number; underscores do not change the numeric value.", "Divides by another separated literal to compute a readable count."],
  },
  {
    key: "bigint-literal",
    label: "BigInt literal",
    lines: ["const id = {n}000000000000000000n;", "const nextId = id + 1n;"],
    intent: "Recognize BigInt arithmetic for integers larger than Number can safely represent",
    annotations: ["Creates a BigInt because the literal ends with n.", "Adds another BigInt; regular numbers cannot be mixed directly with BigInt."],
  },
  {
    key: "symbol-key",
    label: "Symbol key",
    lines: ["const token = Symbol(\"{entity}\");", "const store = { [token]: \"secret-{n}\" };", "console.log(store[token]);"],
    intent: "Use a Symbol as a property key that will not collide with normal string keys",
    annotations: ["Creates a unique Symbol value with a debugging description.", "Uses computed property syntax to store a value under that Symbol.", "Reads the value back with the exact same Symbol."],
  },
  {
    key: "object-shorthand",
    label: "Object shorthand",
    lines: ["const id = {n};", "const status = \"{status}\";", "const {entity} = { id, status };"],
    intent: "Read object shorthand as property names copied from local variable names",
    annotations: ["Stores an id value.", "Stores a status value.", "Creates an object with id and status properties from variables of the same names."],
  },
  {
    key: "method-shorthand",
    label: "Method shorthand",
    lines: ["const service = {", "  start() {", "    return \"{entity}:{n}\";", "  }", "};"],
    intent: "Recognize concise method syntax inside an object literal",
    annotations: ["Starts an object literal assigned to service.", "Defines a method named start without writing function.", "Returns a string from the method.", "Closes the method body.", "Closes the object literal."],
  },
  {
    key: "array-destructuring",
    label: "Array destructuring",
    lines: ["const pair = [\"{label}\", \"{label2}\"];", "const [first, second] = pair;"],
    intent: "Pull values out of an array by position",
    annotations: ["Creates an ordered two-item array.", "Assigns the first item to first and the second item to second."],
  },
  {
    key: "object-destructuring",
    label: "Object destructuring",
    lines: ["const {entity} = { id: {n}, status: \"{status}\" };", "const { id, status } = {entity};"],
    intent: "Pull named properties out of an object into local variables",
    annotations: ["Creates an object with id and status properties.", "Creates local id and status bindings from matching property names."],
  },
  {
    key: "destructuring-rename",
    label: "Destructuring rename",
    lines: ["const row = { {field}: \"{label}\" };", "const { {field}: value } = row;"],
    intent: "Rename a destructured property while reading it",
    annotations: ["Creates an object with a {field} property.", "Reads row.{field} and stores it in a local variable named value."],
  },
  {
    key: "destructuring-default",
    label: "Destructuring default",
    lines: ["const options = {};", "const { retries = {n} } = options;"],
    intent: "Provide a default when a destructured property is missing",
    annotations: ["Creates an object without a retries property.", "Creates retries with the default value {n} because options.retries is undefined."],
  },
  {
    key: "nested-destructuring",
    label: "Nested destructuring",
    lines: ["const response = { data: { id: {n} } };", "const { data: { id } } = response;"],
    intent: "Read nested destructuring as a direct path through an object",
    annotations: ["Creates a nested response object.", "Extracts response.data.id into a local id binding."],
  },
  {
    key: "rest-object",
    label: "Object rest",
    lines: ["const row = { id: {n}, name: \"{label}\", status: \"{status}\" };", "const { id, ...details } = row;"],
    intent: "Separate one property from the remaining object properties",
    annotations: ["Creates an object with three properties.", "Stores id separately and gathers the remaining properties into details."],
  },
  {
    key: "computed-object-key",
    label: "Computed object key",
    lines: ["const key = \"{field}\";", "const row = { [key]: \"{label}\" };"],
    intent: "Use a variable value as the property name while creating an object",
    annotations: ["Stores the property name in key.", "Evaluates key and creates a property with that resulting name."],
  },
  {
    key: "optional-call",
    label: "Optional call",
    lines: ["const hooks = {};", "hooks.onReady?.(\"{entity}\");"],
    intent: "Call a function only when the property exists",
    annotations: ["Creates an object with no onReady function.", "Uses optional call syntax, so nothing happens instead of throwing."],
  },
  {
    key: "logical-assignment",
    label: "Logical assignment",
    lines: ["const options = { retries: 0 };", "options.retries ||= {n};", "options.label ??= \"{label}\";"],
    intent: "Read logical assignment as conditional defaulting in place",
    annotations: ["Creates an options object with retries set to the falsy value 0.", "Uses ||=, so retries becomes {n} because 0 is falsy.", "Uses ??=, so label is assigned only because it was null or undefined."],
  },
  {
    key: "tagged-template",
    label: "Tagged template",
    lines: ["const html = (parts, value) => parts[0] + String(value).toUpperCase();", "const output = html`<b>${\"{entity}\"}</b>`;"],
    intent: "Recognize a function that processes a template literal before it becomes a string",
    annotations: ["Defines a tag function that receives template parts and interpolated values.", "Calls the tag with a template literal; html controls how the final output is built."],
  },
  {
    key: "regexp-literal",
    label: "RegExp literal",
    lines: ["const slugPattern = /^[a-z0-9-]+$/;", "const valid = slugPattern.test(\"{entity}-{n}\");"],
    intent: "Read a regular expression literal as a reusable pattern object",
    annotations: ["Creates a RegExp that matches lowercase slugs.", "Tests a string and stores the boolean validation result."],
  },
  {
    key: "asi-return",
    label: "Return line break hazard",
    lines: ["function broken() {", "  return", "  { ok: true };", "}"],
    intent: "Spot automatic semicolon insertion after a bare return line",
    annotations: ["Declares a function named broken.", "A semicolon is inserted after return because the value starts on the next line.", "This object literal is unreachable and is not returned.", "Closes the function."],
  },
  {
    key: "strict-mode",
    label: "Strict mode directive",
    lines: ["\"use strict\";", "function run() {", "  return this;", "}"],
    intent: "Recognize strict mode as a directive that changes legacy JavaScript behavior",
    annotations: ["Enables strict mode for the script or function body.", "Declares a function after strict mode is active.", "Returns this, which behaves differently in strict mode when the function is called plainly.", "Closes the function."],
  },
]);

const extraExpressionTopics = templateTopics(useCaseSets.expressions, [
  {
    key: "operator-precedence",
    label: "Operator precedence",
    lines: ["const value = {n} + {n2} * {n3};", "const grouped = ({n} + {n2}) * {n3};"],
    intent: "Read multiplication as happening before addition unless parentheses override it",
    annotations: ["Computes multiplication before addition.", "Uses parentheses to force addition before multiplication."],
  },
  {
    key: "unary-plus",
    label: "Unary plus conversion",
    lines: ["const raw = \"{n}\";", "const value = +raw;"],
    intent: "Recognize unary plus as a compact number conversion",
    annotations: ["Stores a numeric string.", "Converts the string to a number using unary plus."],
  },
  {
    key: "boolean-cast",
    label: "Boolean cast",
    lines: ["const token = \"{entity}-{n}\";", "const hasToken = Boolean(token);"],
    intent: "Convert any value into an explicit true or false",
    annotations: ["Stores a non-empty string value.", "Converts token to true because non-empty strings are truthy."],
  },
  {
    key: "double-bang",
    label: "Double bang",
    lines: ["const count = {n};", "const hasCount = !!count;"],
    intent: "Read double negation as a terse boolean conversion",
    annotations: ["Stores a numeric count.", "Negates twice to produce the boolean truthiness of count."],
  },
  {
    key: "exponentiation",
    label: "Exponentiation",
    lines: ["const bytes = 2 ** {n};", "const doubled = bytes << 1;"],
    intent: "Read exponentiation and bit shifting in numeric code",
    annotations: ["Raises 2 to the power of {n}.", "Shifts left by one bit, which doubles the integer value."],
  },
  {
    key: "bitmask-check",
    label: "Bitmask check",
    lines: ["const READ = 1 << 0;", "const WRITE = 1 << 1;", "const mask = READ | WRITE;", "const canWrite = (mask & WRITE) !== 0;"],
    intent: "Recognize bit flags packed into one number",
    annotations: ["Creates the first flag bit.", "Creates the second flag bit.", "Combines both flags into one mask.", "Uses bitwise AND to test whether the WRITE flag is present."],
  },
  {
    key: "optional-index",
    label: "Optional index access",
    lines: ["const rows = null;", "const firstId = rows?.[0]?.id;"],
    intent: "Read optional chaining with array indexes and nested properties",
    annotations: ["Stores null where an array might normally appear.", "Safely attempts to read rows[0].id and produces undefined instead of throwing."],
  },
  {
    key: "nullish-vs-or",
    label: "Nullish versus OR",
    lines: ["const saved = 0;", "const byOr = saved || {n};", "const byNullish = saved ?? {n};"],
    intent: "Distinguish falsy fallback from nullish fallback",
    annotations: ["Stores 0, which is a valid falsy value.", "Uses ||, so 0 is replaced by the fallback.", "Uses ??, so 0 is preserved because it is not null or undefined."],
  },
  {
    key: "in-operator",
    label: "in operator",
    lines: ["const row = { {field}: \"{label}\" };", "const exists = \"{field}\" in row;"],
    intent: "Check whether an object or its prototype has a property",
    annotations: ["Creates an object with a {field} property.", "Uses the in operator to test for that property name."],
  },
  {
    key: "instanceof-check",
    label: "instanceof check",
    lines: ["const error = new TypeError(\"Bad {entity}\");", "const typed = error instanceof TypeError;"],
    intent: "Check whether a value was created by a constructor in its prototype chain",
    annotations: ["Creates a TypeError instance.", "Stores true when error has TypeError.prototype in its prototype chain."],
  },
  {
    key: "typeof-guard",
    label: "typeof guard",
    lines: ["const value = \"{label}\";", "const text = typeof value === \"string\" ? value.trim() : \"\";"],
    intent: "Guard an operation so it only runs for the expected primitive type",
    annotations: ["Stores a string value.", "Checks the type before calling trim, otherwise falls back to an empty string."],
  },
  {
    key: "delete-property",
    label: "delete property",
    lines: ["const draft = { id: {n}, temp: true };", "delete draft.temp;"],
    intent: "Remove a property from an object",
    annotations: ["Creates an object with a temporary property.", "Deletes the temp property from the object."],
  },
  {
    key: "comma-expression",
    label: "Comma expression",
    lines: ["let count = {n};", "const value = (count += 1, count * 2);"],
    intent: "Read the comma operator as evaluating both expressions and returning the last one",
    annotations: ["Initializes count.", "Increments count first, then uses the second expression as the assigned value."],
  },
  {
    key: "short-circuit-call",
    label: "Short-circuit call",
    lines: ["const enabled = {n} > 0;", "enabled && console.log(\"sync {entity}\");"],
    intent: "Run a side effect only when the left side is truthy",
    annotations: ["Computes a boolean flag.", "Uses && so console.log runs only when enabled is truthy."],
  },
  {
    key: "spread-call",
    label: "Spread call",
    lines: ["const args = [{n}, {n2}, {n3}];", "const max = Math.max(...args);"],
    intent: "Expand an array into positional function arguments",
    annotations: ["Creates an array of argument values.", "Uses spread syntax so Math.max receives separate arguments."],
  },
  {
    key: "destructuring-assignment",
    label: "Destructuring assignment",
    lines: ["let first = \"{label}\";", "let second = \"{label2}\";", "[first, second] = [second, first];"],
    intent: "Swap two variables using array destructuring assignment",
    annotations: ["Initializes first.", "Initializes second.", "Assigns both variables at once from a temporary array."],
  },
  {
    key: "object-spread-order",
    label: "Object spread order",
    lines: ["const base = { status: \"old\", id: {n} };", "const next = { ...base, status: \"{status}\" };"],
    intent: "Read later object properties as overriding earlier spread properties",
    annotations: ["Creates a base object with an old status.", "Copies base first, then overwrites status with the later property."],
  },
  {
    key: "array-spread-middle",
    label: "Array spread middle",
    lines: ["const middle = [\"{entity}\", \"{other}\"];", "const names = [\"start\", ...middle, \"end\"];"],
    intent: "Insert one array's items into another array literal",
    annotations: ["Creates an array of middle values.", "Builds a new array with values before and after the spread items."],
  },
  {
    key: "nested-ternary",
    label: "Nested ternary",
    lines: ["const score = {n};", "const grade = score > 8 ? \"high\" : score > 4 ? \"mid\" : \"low\";"],
    intent: "Read a nested ternary as multiple ordered choices",
    annotations: ["Stores a score.", "Chooses high first, otherwise checks mid, otherwise falls back to low."],
  },
  {
    key: "void-operator",
    label: "void operator",
    lines: ["const ignored = void console.log(\"{entity}\");", "console.log(ignored);"],
    intent: "Recognize void as forcing an expression result to undefined",
    annotations: ["Runs console.log for its side effect but stores undefined.", "Logs undefined, not the result of the previous console call."],
  },
]);

const extraControlTopics = templateTopics(useCaseSets.control, [
  {
    key: "guard-clause",
    label: "Guard clause",
    lines: ["function requireUser(user) {", "  if (!user) return null;", "  return user.id;", "}"],
    intent: "Exit early when a required value is missing",
    annotations: ["Declares a function that expects a user.", "Returns null immediately when user is falsy.", "Continues with the main path only when user exists.", "Closes the function."],
  },
  {
    key: "early-continue",
    label: "Early continue",
    lines: ["for (const {item} of {list}) {", "  if (!{item}.active) continue;", "  console.log({item}.id);", "}"],
    intent: "Skip uninteresting loop items before the main work",
    annotations: ["Starts a loop over {list}.", "Skips the current item when it is not active.", "Logs the id only for active items.", "Closes the loop."],
  },
  {
    key: "do-while",
    label: "Do while",
    lines: ["let page = {n};", "do {", "  page += 1;", "} while (page < {n3});"],
    intent: "Run a loop body at least once before checking the condition",
    annotations: ["Initializes page.", "Starts a do block that always runs once.", "Updates page inside the loop.", "Checks whether another iteration is needed."],
  },
  {
    key: "try-finally",
    label: "Try finally",
    lines: ["lock.acquire();", "try {", "  save();", "} finally {", "  lock.release();", "}"],
    intent: "Guarantee cleanup after protected work",
    annotations: ["Acquires a resource before the protected block.", "Starts the try block.", "Runs the work that may throw.", "Starts a finally block that always runs.", "Releases the resource even if save fails.", "Closes the statement."],
  },
  {
    key: "throw-error",
    label: "Throw error",
    lines: ["if (!config.{field}) {", "  throw new Error(\"Missing {field}\");", "}"],
    intent: "Stop execution by throwing when required configuration is missing",
    annotations: ["Checks whether a required config field is falsy.", "Throws an Error with a useful message.", "Closes the conditional block."],
  },
  {
    key: "error-cause",
    label: "Error cause",
    lines: ["try {", "  parseInput();", "} catch (error) {", "  throw new Error(\"Invalid input\", { cause: error });", "}"],
    intent: "Wrap an error while preserving the original cause",
    annotations: ["Starts a protected parse operation.", "Calls code that may throw.", "Catches the original error.", "Throws a new higher-level error and attaches the original as cause.", "Closes the catch block."],
  },
  {
    key: "switch-fallthrough",
    label: "Switch fallthrough",
    lines: ["switch (\"{status}\") {", "  case \"new\":", "  case \"queued\":", "    console.log(\"pending\");", "    break;", "}"],
    intent: "Recognize shared switch behavior through intentional fallthrough",
    annotations: ["Starts a switch on a status value.", "Defines the first matching status.", "Defines another status that shares the same body.", "Runs the shared pending behavior.", "Stops execution from falling farther.", "Closes the switch."],
  },
  {
    key: "lookup-dispatch",
    label: "Lookup dispatch",
    lines: ["const actions = { {method}: () => \"{route}\" };", "const run = actions[\"{method}\"] ?? (() => null);", "const result = run();"],
    intent: "Replace branching with a table of functions",
    annotations: ["Creates an object whose key maps to a function.", "Looks up a function by key and falls back to a null-returning function.", "Calls the selected function."],
  },
  {
    key: "finite-state-transition",
    label: "State transition table",
    lines: ["const transitions = { {status}: \"{status2}\" };", "const next = transitions[\"{status}\"] ?? \"unknown\";"],
    intent: "Read state-machine logic encoded as a transition object",
    annotations: ["Maps one status to its next status.", "Looks up the next state and falls back when the current state is unknown."],
  },
  {
    key: "recursive-walk",
    label: "Recursive walk",
    lines: ["function count(node) {", "  if (!node) return 0;", "  return 1 + count(node.left) + count(node.right);", "}"],
    intent: "Read recursion as a base case plus smaller recursive calls",
    annotations: ["Declares a recursive function.", "Returns 0 for the empty base case.", "Counts the current node plus both child subtrees.", "Closes the function."],
  },
  {
    key: "labeled-break",
    label: "Labeled break",
    lines: ["outer: for (const row of rows) {", "  for (const cell of row) {", "    if (cell === null) break outer;", "  }", "}"],
    intent: "Exit nested loops from inside the inner loop",
    annotations: ["Labels the outer loop as outer.", "Starts an inner loop over each cell.", "Breaks out of the labeled outer loop when a null cell is found.", "Closes the inner loop.", "Closes the outer loop."],
  },
  {
    key: "for-await-loop",
    label: "For await loop",
    lines: ["for await (const chunk of stream) {", "  console.log(chunk.length);", "}"],
    intent: "Consume an asynchronous iterable one value at a time",
    annotations: ["Starts a loop that awaits each chunk from stream.", "Logs the size of the current chunk.", "Closes the loop."],
  },
  {
    key: "promise-loop-sequential",
    label: "Sequential async loop",
    lines: ["for (const id of ids) {", "  await save(id);", "}"],
    intent: "Run async work in sequence rather than all at once",
    annotations: ["Loops through ids in order.", "Waits for each save call before the next iteration starts.", "Closes the loop."],
  },
  {
    key: "bounded-loop",
    label: "Bounded loop",
    lines: ["let index = 0;", "while (index < items.length && index < {n3}) {", "  index += 1;", "}"],
    intent: "Stop looping when either the collection ends or a limit is reached",
    annotations: ["Initializes the loop index.", "Requires both bounds to remain true.", "Advances the index so the loop can terminate.", "Closes the loop."],
  },
  {
    key: "continue-label",
    label: "Labeled continue",
    lines: ["rows: for (const row of rows) {", "  for (const cell of row) {", "    if (cell === undefined) continue rows;", "  }", "}"],
    intent: "Skip to the next outer-loop iteration from an inner loop",
    annotations: ["Labels the outer loop rows.", "Starts the inner loop.", "When a bad cell appears, continues the labeled outer loop.", "Closes the inner loop.", "Closes the outer loop."],
  },
  {
    key: "exhaustive-default",
    label: "Exhaustive default",
    lines: ["function readKind(kind) {", "  switch (kind) {", "    case \"{entity}\": return 1;", "    default: throw new Error(`Unknown kind: ${kind}`);", "  }", "}", "const result = readKind(\"{entity}\");"],
    intent: "Use a default branch to surface unexpected cases",
    annotations: ["Declares a helper so switch branches can return or throw from a valid function body.", "Starts a switch on kind.", "Handles one known case.", "Throws when no known case matches.", "Closes the switch.", "Closes the helper.", "Calls the helper with a known kind."],
  },
  {
    key: "nested-try-catch",
    label: "Nested try catch",
    lines: ["try {", "  try {", "    load();", "  } catch (error) {", "    recover(error);", "  }", "} finally {", "  cleanup();", "}"],
    intent: "Handle a local failure while still guaranteeing outer cleanup",
    annotations: ["Starts the outer protected region.", "Starts an inner region for recoverable work.", "Runs a load operation.", "Catches errors from load.", "Runs recovery logic.", "Closes the inner catch.", "Starts cleanup that runs after the outer region.", "Runs cleanup.", "Closes the outer statement."],
  },
  {
    key: "assertion-guard",
    label: "Assertion guard",
    lines: ["function assert(condition, message) {", "  if (!condition) throw new Error(message);", "}", "assert({n} > 0, \"Expected positive\");"],
    intent: "Read a small assertion helper that fails fast",
    annotations: ["Declares an assertion helper.", "Throws when the condition is false.", "Closes the helper.", "Calls the helper with a condition and message."],
  },
  {
    key: "retry-until",
    label: "Retry until success",
    lines: ["let result;", "while (!result) {", "  result = await poll();", "}"],
    intent: "Repeat asynchronous polling until a useful result appears",
    annotations: ["Creates a result variable outside the loop.", "Continues while result is still falsy.", "Awaits one poll attempt and stores its result.", "Closes the loop."],
  },
  {
    key: "range-loop",
    label: "Range loop",
    lines: ["for (let n = {n}; n <= {n3}; n += 1) {", "  console.log(n);", "}"],
    intent: "Read an inclusive numeric range loop",
    annotations: ["Starts at {n}, continues through {n3}, and increments by one.", "Logs the current number.", "Closes the loop."],
  },
]);

const extraFunctionTopics = templateTopics(useCaseSets.functions, [
  {
    key: "currying",
    label: "Currying",
    lines: ["const addTax = rate => amount => amount * (1 + rate);", "const addLocalTax = addTax(0.{n});", "const total = addLocalTax({amount});"],
    intent: "Read currying as a function returning another function that waits for the next argument",
    annotations: ["Defines addTax so the first call captures a rate and returns a second function.", "Calls addTax once to create a specialized tax function.", "Calls the specialized function with an amount."],
  },
  {
    key: "partial-application",
    label: "Partial application",
    lines: ["const request = (method, path) => `${method} ${path}`;", "const get = path => request(\"GET\", path);", "const line = get(\"{route}\");"],
    intent: "Create a narrower function by pre-filling one argument",
    annotations: ["Defines a two-argument request formatter.", "Creates get by fixing the method argument to GET.", "Calls the partially applied helper with only the path."],
  },
  {
    key: "function-composition",
    label: "Function composition",
    lines: ["const compose = (f, g) => value => f(g(value));", "const trimUpper = compose(value => value.toUpperCase(), value => value.trim());", "const label = trimUpper(\" {label} \");"],
    intent: "Read composition as passing one function's result into another function",
    annotations: ["Defines compose so g runs first and f runs second.", "Builds a helper that trims, then uppercases.", "Runs the composed helper on a padded string."],
  },
  {
    key: "pipe-function",
    label: "Pipe function",
    lines: ["const pipe = (...steps) => input => steps.reduce((value, step) => step(value), input);", "const clean = pipe(String, value => value.trim(), value => value.toLowerCase());", "const slug = clean(\" {Entity} \");"],
    intent: "Read pipe as left-to-right function composition",
    annotations: ["Creates a function that runs each step in order.", "Builds a cleaning pipeline from small functions.", "Runs the pipeline on one input value."],
  },
  {
    key: "higher-order-predicate",
    label: "Higher-order predicate",
    lines: ["const hasRole = role => user => user.roles.includes(role);", "const isAdmin = hasRole(\"admin\");", "const allowed = users.filter(isAdmin);"],
    intent: "Create a predicate factory that returns a reusable filtering function",
    annotations: ["Defines a function that captures a role and returns a user predicate.", "Creates a specific predicate for admin users.", "Uses the predicate with filter."],
  },
  {
    key: "once-function",
    label: "Once wrapper",
    lines: ["const once = fn => {", "  let called = false;", "  return (...args) => called ? undefined : (called = true, fn(...args));", "};"],
    intent: "Wrap a function so it can run only one time",
    annotations: ["Defines a wrapper factory.", "Stores private state in the closure.", "Returns a function that skips later calls after the first one.", "Closes the factory."],
  },
  {
    key: "memoized-function",
    label: "Memoized function",
    lines: ["const memoize = fn => {", "  const cache = new Map();", "  return key => cache.has(key) ? cache.get(key) : cache.set(key, fn(key)).get(key);", "};"],
    intent: "Cache function results by key",
    annotations: ["Declares a memoize helper.", "Creates a private Map for cached results.", "Returns a function that reads cached values or computes and stores a new one.", "Closes the helper."],
  },
  {
    key: "debounce-function",
    label: "Debounce function",
    lines: ["const debounce = (fn, ms) => {", "  let timer;", "  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };", "};"],
    intent: "Delay a function until calls stop arriving",
    annotations: ["Creates a debounce wrapper factory.", "Stores the current timer in closure state.", "Returns a wrapper that resets the timer before scheduling the function.", "Closes the factory."],
  },
  {
    key: "throttle-function",
    label: "Throttle function",
    lines: ["const throttle = (fn, ms) => {", "  let last = 0;", "  return (...args) => Date.now() - last >= ms && (last = Date.now(), fn(...args));", "};"],
    intent: "Limit a function so it runs at most once per interval",
    annotations: ["Creates a throttle wrapper factory.", "Stores the last run time.", "Runs the function only when enough time has passed, then updates last.", "Closes the factory."],
  },
  {
    key: "iife",
    label: "IIFE",
    lines: ["const config = (() => {", "  const env = \"{status}\";", "  return { env };", "})();"],
    intent: "Run a function immediately to create a scoped value",
    annotations: ["Starts an immediately invoked arrow function.", "Creates a local variable hidden inside the function.", "Returns an object built from the local variable.", "Calls the function immediately and stores its result."],
  },
  {
    key: "generator-function",
    label: "Generator function",
    lines: ["function* ids(start) {", "  yield start;", "  yield start + 1;", "}", "const next = ids({n}).next().value;"],
    intent: "Read a generator as a function that can pause and yield values",
    annotations: ["Declares a generator function with function*.", "Yields the first value to the caller.", "Yields a second value if iteration continues.", "Closes the generator.", "Creates an iterator and reads its first yielded value."],
  },
  {
    key: "callback-error-first",
    label: "Error-first callback",
    lines: ["function done(error, value) {", "  if (error) return console.error(error.message);", "  console.log(value);", "}"],
    intent: "Read Node-style callbacks where the first argument is the error",
    annotations: ["Declares a callback that receives error first.", "Handles the error path immediately.", "Uses the success value only when no error exists.", "Closes the callback."],
  },
  {
    key: "promisify-wrapper",
    label: "Promisify wrapper",
    lines: ["const read = path => new Promise((resolve, reject) => {", "  fs.readFile(path, \"utf8\", (error, text) => error ? reject(error) : resolve(text));", "});"],
    intent: "Wrap a callback API in a promise",
    annotations: ["Creates a function that returns a Promise.", "Calls the callback API and resolves or rejects based on the error-first callback.", "Closes the promise wrapper."],
  },
  {
    key: "options-object",
    label: "Options object",
    lines: ["function connect(url, { retries = {n}, timeout = {ms} } = {}) {", "  return { url, retries, timeout };", "}"],
    intent: "Read named optional arguments passed through an options object",
    annotations: ["Declares a function with a required url and destructured options with defaults.", "Returns a normalized object containing all resolved settings.", "Closes the function."],
  },
  {
    key: "lexical-this-arrow",
    label: "Arrow lexical this",
    lines: ["const counter = {", "  count: {n},", "  tick() { setTimeout(() => { this.count += 1; }, {ms}); }", "};"],
    intent: "Recognize that an arrow callback keeps the surrounding method's this",
    annotations: ["Starts an object literal.", "Stores mutable count state.", "Defines a method whose timer callback uses arrow syntax to keep this.", "Closes the object."],
  },
  {
    key: "function-overload-shape",
    label: "Shape-based arguments",
    lines: ["function normalize(input) {", "  if (typeof input === \"string\") return { name: input };", "  return input;", "}"],
    intent: "Read a function that accepts more than one input shape",
    annotations: ["Declares a normalizer.", "Converts a string input into an object form.", "Returns object-like inputs unchanged.", "Closes the function."],
  },
  {
    key: "recursion-accumulator",
    label: "Recursive accumulator",
    lines: ["function flatten(items, out = []) {", "  for (const item of items) Array.isArray(item) ? flatten(item, out) : out.push(item);", "  return out;", "}"],
    intent: "Read recursion that carries an accumulator through nested calls",
    annotations: ["Declares flatten with a default accumulator.", "Recurses for arrays and pushes non-arrays into the accumulator.", "Returns the accumulated flat output.", "Closes the function."],
  },
  {
    key: "tap-helper",
    label: "Tap helper",
    lines: ["const tap = fn => value => { fn(value); return value; };", "const logThenSave = tap(value => console.log(value.id));", "const same = logThenSave({ id: {n} });"],
    intent: "Run a side effect while preserving the original value in a pipeline",
    annotations: ["Defines tap as a higher-order function that returns the original value after a side effect.", "Creates a logger step.", "Runs the logger and keeps the same object as the result."],
  },
  {
    key: "predicate-combinator",
    label: "Predicate combinator",
    lines: ["const and = (a, b) => value => a(value) && b(value);", "const readyAndActive = and(x => x.ready, x => x.active);", "const ok = readyAndActive({ ready: true, active: true });"],
    intent: "Combine small boolean functions into a larger predicate",
    annotations: ["Defines and as a function that combines two predicates.", "Creates a predicate that requires ready and active.", "Runs the combined predicate on an object."],
  },
  {
    key: "dependency-injection-function",
    label: "Function dependency injection",
    lines: ["const makeLoader = fetcher => async id => fetcher(`/api/{entity}/${id}`);", "const load = makeLoader(fetch);", "const response = await load({n});"],
    intent: "Pass a dependency into a function factory instead of hard-coding it",
    annotations: ["Creates a loader factory that captures a fetcher dependency.", "Builds a loader using the real fetch function.", "Calls the loader with an id and awaits the dependency result."],
  },
]);

const extraCollectionTopics = templateTopics(useCaseSets.collections, [
  {
    key: "flat-map",
    label: "Array flatMap",
    lines: ["const groups = [[\"{entity}\"], [\"{other}\"]];", "const names = groups.flatMap(group => group);"],
    intent: "Map each item and flatten one level in a single step",
    annotations: ["Creates an array of arrays.", "Returns each inner array and flattens the result into one array."],
  },
  {
    key: "group-by-reduce",
    label: "Group by reduce",
    lines: ["const grouped = rows.reduce((acc, row) => {", "  (acc[row.status] ??= []).push(row);", "  return acc;", "}, {});"],
    intent: "Group records into arrays keyed by a property",
    annotations: ["Starts a reduce that accumulates an object.", "Creates the group array when missing, then pushes the row.", "Returns the accumulator for the next iteration.", "Starts with an empty object."],
  },
  {
    key: "index-by-id",
    label: "Index by id",
    lines: ["const byId = new Map(rows.map(row => [row.id, row]));", "const row = byId.get({n});"],
    intent: "Build a Map for fast lookup by id",
    annotations: ["Maps each row to a key-value pair and builds a Map.", "Reads one row by id from the Map."],
  },
  {
    key: "dedupe-with-set",
    label: "Dedupe with Set",
    lines: ["const names = [\"{label}\", \"{label}\", \"{label2}\"];", "const unique = [...new Set(names)];"],
    intent: "Remove duplicate primitive values while preserving insertion order",
    annotations: ["Creates an array containing a repeated name.", "Builds a Set to remove duplicates, then spreads it back into an array."],
  },
  {
    key: "weakmap-metadata",
    label: "WeakMap metadata",
    lines: ["const metadata = new WeakMap();", "metadata.set(node, { seen: true });", "const seen = metadata.get(node)?.seen;"],
    intent: "Attach metadata to objects without preventing garbage collection",
    annotations: ["Creates a WeakMap whose keys must be objects.", "Stores metadata for one object.", "Reads metadata safely with optional chaining."],
  },
  {
    key: "weakset-visited",
    label: "WeakSet visited",
    lines: ["const visited = new WeakSet();", "if (!visited.has(node)) visited.add(node);"],
    intent: "Track visited objects without keeping them alive forever",
    annotations: ["Creates a WeakSet for object identity tracking.", "Adds node only if it has not been seen before."],
  },
  {
    key: "to-sorted",
    label: "Non-mutating sort",
    lines: ["const scores = [{n3}, {n}, {n2}];", "const sorted = scores.toSorted((a, b) => a - b);"],
    intent: "Sort an array into a new array without mutating the original",
    annotations: ["Creates an unsorted numeric array.", "Uses toSorted to produce an ascending sorted copy."],
  },
  {
    key: "to-spliced",
    label: "Non-mutating splice",
    lines: ["const items = [\"a\", \"b\", \"c\"];", "const next = items.toSpliced(1, 1, \"{entity}\");"],
    intent: "Replace part of an array while keeping the original unchanged",
    annotations: ["Creates a three-item array.", "Creates a copy with one item replaced at index 1."],
  },
  {
    key: "structured-clone",
    label: "structuredClone",
    lines: ["const original = { id: {n}, tags: [\"{entity}\"] };", "const copy = structuredClone(original);"],
    intent: "Deep-clone supported JavaScript data structures",
    annotations: ["Creates an object containing a nested array.", "Creates a deep clone rather than just copying the top-level reference."],
  },
  {
    key: "array-at",
    label: "Array at",
    lines: ["const items = [\"first\", \"middle\", \"last\"];", "const last = items.at(-1);"],
    intent: "Read negative indexes with Array.prototype.at",
    annotations: ["Creates an array.", "Reads the final item using a negative index."],
  },
  {
    key: "find-last",
    label: "Find last",
    lines: ["const events = [{ id: 1, ok: false }, { id: {n}, ok: true }];", "const latestOk = events.findLast(event => event.ok);"],
    intent: "Find the last matching item in an array",
    annotations: ["Creates events in chronological order.", "Searches from the end and returns the latest event with ok true."],
  },
  {
    key: "map-values",
    label: "Map values transform",
    lines: ["const counts = { open: {n}, closed: {n2} };", "const doubled = Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, value * 2]));"],
    intent: "Transform object values while preserving keys",
    annotations: ["Creates an object of counts.", "Turns entries into pairs, maps each value, and rebuilds an object."],
  },
  {
    key: "pick-fields",
    label: "Pick fields",
    lines: ["const pick = (obj, keys) => Object.fromEntries(keys.map(key => [key, obj[key]]));", "const publicUser = pick(user, [\"id\", \"name\"]);"],
    intent: "Create a smaller object containing only selected keys",
    annotations: ["Defines pick by mapping keys to object entries and rebuilding an object.", "Creates a public view of user with only id and name."],
  },
  {
    key: "omit-field",
    label: "Omit field",
    lines: ["const { password, ...safeUser } = user;", "console.log(safeUser);"],
    intent: "Remove a sensitive property while keeping the rest",
    annotations: ["Destructures password away and gathers remaining properties into safeUser.", "Logs the object that no longer includes password."],
  },
  {
    key: "merge-maps",
    label: "Merge maps",
    lines: ["const merged = new Map([...defaults, ...overrides]);", "const value = merged.get(\"{field}\");"],
    intent: "Merge Map entries where later entries override earlier ones",
    annotations: ["Spreads entries from both maps into a new Map.", "Reads one merged value by key."],
  },
  {
    key: "set-intersection",
    label: "Set intersection",
    lines: ["const allowed = new Set([\"read\", \"write\"]);", "const actual = [\"read\", \"admin\"];", "const shared = actual.filter(value => allowed.has(value));"],
    intent: "Keep only values that are present in a Set",
    annotations: ["Creates a Set of allowed values.", "Creates an array of actual values.", "Filters actual values by membership in the Set."],
  },
  {
    key: "queue-shift",
    label: "Array queue",
    lines: ["const queue = [\"{entity}\", \"{other}\"];", "const next = queue.shift();", "queue.push(\"{status}\");"],
    intent: "Read an array used as a simple first-in first-out queue",
    annotations: ["Creates a queue-like array.", "Removes the first item.", "Adds a new item to the end."],
  },
  {
    key: "stack-pop",
    label: "Array stack",
    lines: ["const stack = [\"root\"];", "stack.push(\"{entity}\");", "const current = stack.pop();"],
    intent: "Read an array used as a last-in first-out stack",
    annotations: ["Creates a stack-like array.", "Pushes a new item onto the top.", "Removes the most recently pushed item."],
  },
  {
    key: "reduce-to-map",
    label: "Reduce to Map",
    lines: ["const byStatus = rows.reduce((map, row) => {", "  map.set(row.status, (map.get(row.status) ?? 0) + 1);", "  return map;", "}, new Map());"],
    intent: "Accumulate counts into a Map",
    annotations: ["Starts a reduce with a Map accumulator.", "Updates the count for the current row status.", "Returns the same Map for the next row.", "Uses a new Map as the initial accumulator."],
  },
  {
    key: "iterator-protocol",
    label: "Iterator protocol",
    lines: ["const iterator = items[Symbol.iterator]();", "const first = iterator.next();"],
    intent: "Recognize direct use of the iterator protocol",
    annotations: ["Gets the default iterator from an iterable.", "Reads the first iteration result object."],
  },
]);

const extraDataTopics = templateTopics(useCaseSets.data, [
  {
    key: "regex-named-groups",
    label: "Regex named groups",
    lines: ["const match = /(?<year>\\d{4})-(?<month>\\d{2})/.exec(\"2026-0{n}\");", "const year = match?.groups.year;"],
    intent: "Read named capture groups from a regular expression match",
    annotations: ["Executes a regex with named groups against a date-like string.", "Safely reads the year capture from match.groups."],
  },
  {
    key: "match-all",
    label: "String matchAll",
    lines: ["const text = \"id:{n} id:{n2}\";", "const ids = [...text.matchAll(/id:(\\d+)/g)].map(match => match[1]);"],
    intent: "Extract every regex match from a string",
    annotations: ["Creates text with repeated id patterns.", "Uses matchAll with a global regex, spreads the iterator, and maps capture group values."],
  },
  {
    key: "json-reviver",
    label: "JSON reviver",
    lines: ["const text = '{\"createdAt\":\"2026-04-27\"}';", "const data = JSON.parse(text, (key, value) => key.endsWith(\"At\") ? new Date(value) : value);"],
    intent: "Customize JSON parsing by transforming selected values",
    annotations: ["Stores JSON text with a date-like property.", "Parses JSON and converts keys ending in At into Date objects."],
  },
  {
    key: "json-replacer",
    label: "JSON replacer",
    lines: ["const text = JSON.stringify(user, (key, value) => key === \"password\" ? undefined : value);", "console.log(text);"],
    intent: "Customize JSON serialization to remove sensitive fields",
    annotations: ["Serializes user while omitting password values.", "Logs the filtered JSON string."],
  },
  {
    key: "date-duration",
    label: "Date duration",
    lines: ["const started = new Date(\"2026-04-27T00:00:00Z\");", "const elapsedMs = Date.now() - started.getTime();"],
    intent: "Compute elapsed time by comparing timestamps in milliseconds",
    annotations: ["Creates a Date object for the start time.", "Converts the date to milliseconds and subtracts it from the current timestamp."],
  },
  {
    key: "intl-relative-time",
    label: "Intl relative time",
    lines: ["const formatter = new Intl.RelativeTimeFormat(\"en\", { numeric: \"auto\" });", "const label = formatter.format(-{n}, \"day\");"],
    intent: "Format relative time in a locale-aware way",
    annotations: ["Creates a relative-time formatter.", "Formats a negative day count as a past relative time label."],
  },
  {
    key: "intl-list-format",
    label: "Intl list format",
    lines: ["const formatter = new Intl.ListFormat(\"en\", { type: \"conjunction\" });", "const label = formatter.format([\"{entity}\", \"{other}\"]);"],
    intent: "Format a list of words according to locale rules",
    annotations: ["Creates a list formatter using English conjunction style.", "Formats two values as a human-readable list."],
  },
  {
    key: "url-object",
    label: "URL object",
    lines: ["const url = new URL(\"{url}\");", "const host = url.hostname;"],
    intent: "Parse a URL string into structured parts",
    annotations: ["Creates a URL object from a full URL string.", "Reads the hostname component."],
  },
  {
    key: "url-mutate-search",
    label: "Mutate URL search params",
    lines: ["const url = new URL(\"https://example.com{route}\");", "url.searchParams.set(\"page\", \"{n}\");"],
    intent: "Update query parameters through URLSearchParams",
    annotations: ["Creates a URL object with a path.", "Sets or replaces the page query parameter."],
  },
  {
    key: "text-encoder",
    label: "TextEncoder",
    lines: ["const bytes = new TextEncoder().encode(\"{label}\");", "const size = bytes.byteLength;"],
    intent: "Convert text into UTF-8 bytes",
    annotations: ["Encodes a string into a Uint8Array.", "Reads the number of bytes in the encoded data."],
  },
  {
    key: "text-decoder",
    label: "TextDecoder",
    lines: ["const bytes = new Uint8Array([72, 105]);", "const text = new TextDecoder().decode(bytes);"],
    intent: "Convert UTF-8 bytes back into text",
    annotations: ["Creates a byte array.", "Decodes the bytes into a string."],
  },
  {
    key: "array-buffer-view",
    label: "ArrayBuffer view",
    lines: ["const buffer = new ArrayBuffer(4);", "const view = new DataView(buffer);", "view.setUint16(0, {n});"],
    intent: "Read binary writes through a DataView",
    annotations: ["Allocates four bytes of raw memory.", "Creates a DataView for typed reads and writes.", "Writes an unsigned 16-bit integer at byte offset 0."],
  },
  {
    key: "base64-node",
    label: "Base64 in Node",
    lines: ["const encoded = Buffer.from(\"{label}\", \"utf8\").toString(\"base64\");", "const decoded = Buffer.from(encoded, \"base64\").toString(\"utf8\");"],
    intent: "Encode and decode base64 text in Node.js",
    annotations: ["Converts text to bytes and encodes those bytes as base64.", "Decodes the base64 string back to UTF-8 text."],
  },
  {
    key: "safe-json-parse",
    label: "Safe JSON parse",
    lines: ["function parseOrNull(text) {", "  try { return JSON.parse(text); }", "  catch { return null; }", "}"],
    intent: "Return a fallback instead of throwing on invalid JSON",
    annotations: ["Declares a parser helper.", "Attempts to parse and return JSON.", "Returns null when parsing throws.", "Closes the helper."],
  },
  {
    key: "encode-uri-component",
    label: "encodeURIComponent",
    lines: ["const q = \"{label} & {other}\";", "const url = `/search?q=${encodeURIComponent(q)}`;"],
    intent: "Escape user text before placing it inside a query string",
    annotations: ["Stores text containing spaces and a special character.", "Encodes the text so it is safe as a query parameter value."],
  },
  {
    key: "html-escape",
    label: "HTML escape map",
    lines: ["const escaped = value.replace(/[&<>]/g, char => ({ \"&\": \"&amp;\", \"<\": \"&lt;\", \">\": \"&gt;\" }[char]));", "console.log(escaped);"],
    intent: "Replace special HTML characters through a lookup object",
    annotations: ["Uses replace with a regex and maps each matched character to an entity.", "Logs the escaped string."],
  },
  {
    key: "number-parse-int-radix",
    label: "parseInt radix",
    lines: ["const raw = \"{n}0\";", "const value = Number.parseInt(raw, 10);"],
    intent: "Parse an integer with an explicit decimal radix",
    annotations: ["Stores a numeric string.", "Parses the string as base 10."],
  },
  {
    key: "nan-check",
    label: "NaN check",
    lines: ["const value = Number(\"not-{n}\");", "const invalid = Number.isNaN(value);"],
    intent: "Detect failed numeric conversion",
    annotations: ["Attempts to convert a non-numeric string into a number.", "Checks specifically whether the result is NaN."],
  },
  {
    key: "object-to-query",
    label: "Object to query string",
    lines: ["const params = Object.entries({ page: \"{n}\", q: \"{entity}\" });", "const query = new URLSearchParams(params).toString();"],
    intent: "Turn object entries into a URL query string",
    annotations: ["Creates key-value pairs from an object.", "Builds URLSearchParams from the pairs and serializes it."],
  },
  {
    key: "slugify",
    label: "Slugify",
    lines: ["const slug = \"{label} {other}\".toLowerCase().replace(/\\s+/g, \"-\");", "console.log(slug);"],
    intent: "Convert display text into a simple URL slug",
    annotations: ["Lowercases the string and replaces runs of whitespace with hyphens.", "Logs the slug."],
  },
]);

const extraModuleTopics = templateTopics(useCaseSets.modules, [
  {
    key: "static-class-method",
    label: "Static class method",
    lines: ["class {Entity}Parser {", "  static parse(text) { return JSON.parse(text); }", "}", "const data = {Entity}Parser.parse(\"{}\");"],
    intent: "Call behavior on a class itself rather than on an instance",
    annotations: ["Declares a parser class.", "Defines a static method available on the class constructor.", "Closes the class.", "Calls the static method without creating an instance."],
  },
  {
    key: "static-field",
    label: "Static class field",
    lines: ["class Limits {", "  static max = {n};", "}", "const max = Limits.max;"],
    intent: "Read class-level data stored on the constructor",
    annotations: ["Declares a class.", "Creates a static field on the class.", "Closes the class.", "Reads the field from the class itself."],
  },
  {
    key: "private-method",
    label: "Private method",
    lines: ["class TokenStore {", "  #normalize(token) { return token.trim(); }", "  save(token) { return this.#normalize(token); }", "}"],
    intent: "Recognize a method that can only be called inside the class",
    annotations: ["Declares a class.", "Defines a private method using # syntax.", "Calls the private method from a public method.", "Closes the class."],
  },
  {
    key: "class-field-initializer",
    label: "Class field initializer",
    lines: ["class Cart {", "  items = [];", "  add(item) { this.items.push(item); }", "}"],
    intent: "Initialize instance fields without writing them in the constructor",
    annotations: ["Declares a class.", "Creates a new items array for each instance.", "Defines a method that mutates the instance field.", "Closes the class."],
  },
  {
    key: "mixin-function",
    label: "Mixin function",
    lines: ["const Timestamped = Base => class extends Base {", "  createdAt = new Date();", "};"],
    intent: "Read a mixin as a function that returns a subclass",
    annotations: ["Defines a function that accepts a base class and returns a class extending it.", "Adds a createdAt field to the generated subclass.", "Closes the mixin."],
  },
  {
    key: "factory-class-choice",
    label: "Class factory choice",
    lines: ["const stores = { memory: MemoryStore, redis: RedisStore };", "const Store = stores[type] ?? MemoryStore;", "const store = new Store();"],
    intent: "Choose a class from a lookup table and instantiate it",
    annotations: ["Maps names to class constructors.", "Selects a constructor or falls back to MemoryStore.", "Creates an instance of the selected class."],
  },
  {
    key: "default-export",
    label: "Default export",
    lines: ["export default function handler(req, res) {", "  res.end(\"ok\");", "}"],
    intent: "Expose one primary value from a module",
    annotations: ["Declares and default-exports a handler function.", "Ends the response with ok.", "Closes the function."],
  },
  {
    key: "namespace-import",
    label: "Namespace import",
    lines: ["import * as fs from \"node:fs/promises\";", "const text = await fs.readFile(\"{path}\", \"utf8\");"],
    intent: "Import all named exports under one namespace object",
    annotations: ["Imports the module namespace as fs.", "Calls readFile from that namespace and awaits text."],
  },
  {
    key: "export-rename",
    label: "Export rename",
    lines: ["const internalName = \"{entity}\";", "export { internalName as name };"],
    intent: "Export a local binding under a different public name",
    annotations: ["Creates a local binding.", "Exports that binding using the name name for importers."],
  },
  {
    key: "import-rename",
    label: "Import rename",
    lines: ["import { readFile as readText } from \"node:fs/promises\";", "const text = await readText(\"{path}\", \"utf8\");"],
    intent: "Rename an imported binding for local clarity",
    annotations: ["Imports readFile but binds it locally as readText.", "Calls the renamed local binding."],
  },
  {
    key: "side-effect-import",
    label: "Side-effect import",
    lines: ["import \"./register-{entity}.js\";", "console.log(\"registered\");"],
    intent: "Load a module for its top-level side effects",
    annotations: ["Imports a module without binding any exports.", "Continues after the imported module has run."],
  },
  {
    key: "top-level-await",
    label: "Top-level await",
    lines: ["const config = await readConfig();", "export default config;"],
    intent: "Recognize await used directly in an ES module body",
    annotations: ["Waits for config during module evaluation.", "Exports the loaded config after it resolves."],
  },
  {
    key: "import-meta-url",
    label: "import.meta.url",
    lines: ["const here = new URL(\".\", import.meta.url);", "const file = new URL(\"{entity}.json\", here);"],
    intent: "Resolve files relative to the current ES module",
    annotations: ["Creates a URL for the current module directory.", "Creates a URL for a sibling JSON file."],
  },
  {
    key: "commonjs-exports",
    label: "CommonJS exports",
    lines: ["function format(value) { return String(value); }", "module.exports = { format };"],
    intent: "Expose values from a CommonJS module",
    annotations: ["Declares a helper function.", "Assigns an exports object for require callers."],
  },
  {
    key: "require-cache",
    label: "Require cache",
    lines: ["const first = require(\"./config\");", "const second = require(\"./config\");"],
    intent: "Recognize that CommonJS modules are cached after first load",
    annotations: ["Loads and executes the module if it is not already cached.", "Returns the cached exports object on the second require."],
  },
  {
    key: "circular-import-read",
    label: "Circular import read",
    lines: ["import { ready } from \"./state.js\";", "queueMicrotask(() => console.log(ready));"],
    intent: "Delay reading an imported live binding when circular modules are involved",
    annotations: ["Imports a live binding from another module.", "Reads it in a microtask so both modules have more time to finish evaluation."],
  },
  {
    key: "prototype-chain",
    label: "Prototype chain",
    lines: ["const base = { active: true };", "const user = Object.create(base);", "const active = user.active;"],
    intent: "Read property lookup through an object's prototype",
    annotations: ["Creates a base object.", "Creates user with base as its prototype.", "Reads active from the prototype because user does not define it directly."],
  },
  {
    key: "object-define-property",
    label: "Object.defineProperty",
    lines: ["Object.defineProperty(user, \"id\", { value: {n}, enumerable: false });", "const keys = Object.keys(user);"],
    intent: "Define a property with descriptor flags",
    annotations: ["Adds a non-enumerable id property to user.", "Lists enumerable keys, which will not include the hidden id."],
  },
  {
    key: "class-extends-built-in",
    label: "Extend built-in",
    lines: ["class HttpError extends Error {", "  constructor(status) { super(`HTTP ${status}`); this.status = status; }", "}"],
    intent: "Create a domain-specific error class by extending Error",
    annotations: ["Declares a subclass of Error.", "Calls the parent constructor and stores status.", "Closes the class."],
  },
  {
    key: "module-barrel",
    label: "Barrel export",
    lines: ["export { readUser } from \"./read-user.js\";", "export { saveUser } from \"./save-user.js\";"],
    intent: "Re-export module APIs from one index module",
    annotations: ["Re-exports readUser from another file.", "Re-exports saveUser from another file."],
  },
]);

const extraAsyncTopics = templateTopics(useCaseSets.async, [
  {
    key: "promise-race-timeout",
    label: "Promise.race timeout",
    lines: ["const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error(\"Timeout\")), {ms}));", "const response = await Promise.race([fetch(\"{url}\"), timeout]);"],
    intent: "Race async work against a timeout promise",
    annotations: ["Creates a promise that rejects after {ms} milliseconds.", "Waits for whichever finishes first: the fetch or the timeout."],
  },
  {
    key: "promise-any",
    label: "Promise.any",
    lines: ["const fastest = await Promise.any([", "  fetch(\"/primary/{n}\"),", "  fetch(\"/backup/{n}\")", "]);"],
    intent: "Use the first fulfilled promise and ignore earlier rejections",
    annotations: ["Starts Promise.any with multiple candidates.", "Starts the primary request.", "Starts the backup request.", "Resolves with the first fulfilled response."],
  },
  {
    key: "return-await-trap",
    label: "return await in try",
    lines: ["async function load() {", "  try { return await fetch(\"{url}\"); }", "  catch (error) { return null; }", "}"],
    intent: "Use return await when a local catch block must see rejections",
    annotations: ["Declares an async function.", "Awaits fetch inside try so rejection is caught locally.", "Returns null when fetch rejects.", "Closes the function."],
  },
  {
    key: "async-foreach-pitfall",
    label: "Async forEach pitfall",
    lines: ["items.forEach(async item => {", "  await save(item);", "});", "console.log(\"scheduled\");"],
    intent: "Spot that forEach does not wait for async callbacks",
    annotations: ["Starts forEach with an async callback.", "Each callback awaits internally, but forEach ignores the returned promise.", "Closes the forEach call.", "Logs before saves necessarily finish."],
  },
  {
    key: "sequential-reduce-promises",
    label: "Sequential promise reduce",
    lines: ["await items.reduce((chain, item) => {", "  return chain.then(() => save(item));", "}, Promise.resolve());"],
    intent: "Chain promise work sequentially with reduce",
    annotations: ["Starts a reduce whose accumulator is a promise chain.", "Waits for the previous chain before saving the next item.", "Starts the chain with an already-resolved promise."],
  },
  {
    key: "lazy-promise-function",
    label: "Lazy promise function",
    lines: ["const task = () => fetch(\"{url}\");", "const response = await task();"],
    intent: "Represent async work as a function so it starts only when called",
    annotations: ["Creates a function that will start fetch later.", "Calls the function and awaits the fetch result."],
  },
  {
    key: "abort-signal-timeout",
    label: "AbortSignal timeout",
    lines: ["const signal = AbortSignal.timeout({ms});", "const response = await fetch(\"{url}\", { signal });"],
    intent: "Use a built-in timeout signal to cancel slow fetch work",
    annotations: ["Creates an AbortSignal that aborts after {ms} milliseconds.", "Passes the signal to fetch so it can be cancelled."],
  },
  {
    key: "abort-signal-any",
    label: "AbortSignal any",
    lines: ["const signal = AbortSignal.any([userSignal, AbortSignal.timeout({ms})]);", "await fetch(\"{url}\", { signal });"],
    intent: "Combine multiple cancellation sources into one signal",
    annotations: ["Creates a signal that aborts when either input signal aborts.", "Uses the combined signal for fetch."],
  },
  {
    key: "async-iterator-next",
    label: "Async iterator next",
    lines: ["const iterator = stream[Symbol.asyncIterator]();", "const first = await iterator.next();"],
    intent: "Read one value manually from an async iterator",
    annotations: ["Gets the async iterator from stream.", "Awaits the first iteration result."],
  },
  {
    key: "event-to-promise",
    label: "Event to promise",
    lines: ["const once = event => new Promise(resolve => emitter.once(event, resolve));", "const payload = await once(\"{event}\");"],
    intent: "Convert a one-time event into an awaitable promise",
    annotations: ["Creates a helper that resolves when the event fires once.", "Waits for the named event and stores its payload."],
  },
  {
    key: "node-next-tick",
    label: "process.nextTick",
    lines: ["console.log(\"A{n}\");", "process.nextTick(() => console.log(\"B{n}\"));", "console.log(\"C{n}\");"],
    intent: "Recognize Node's nextTick queue as running after the current stack",
    annotations: ["Logs synchronously first.", "Schedules a nextTick callback.", "Logs synchronously before the callback runs."],
  },
  {
    key: "set-immediate",
    label: "setImmediate",
    lines: ["setImmediate(() => console.log(\"later {n}\"));", "console.log(\"now {n}\");"],
    intent: "Schedule work for a later event-loop turn in Node.js",
    annotations: ["Registers a callback to run later.", "Logs immediately before the scheduled callback."],
  },
  {
    key: "concurrency-pool",
    label: "Concurrency pool",
    lines: ["const workers = Array.from({ length: {n2} }, async () => {", "  while (queue.length) await handle(queue.shift());", "});", "await Promise.all(workers);"],
    intent: "Process a shared queue with a fixed number of async workers",
    annotations: ["Creates several async worker functions.", "Each worker pulls from the queue until it is empty.", "Closes the Array.from call after defining the worker callback.", "Waits for all workers to finish."],
  },
  {
    key: "async-queue-class",
    label: "Async task queue",
    lines: ["class TaskQueue {", "  queue = Promise.resolve();", "  add(task) { return this.queue = this.queue.then(task); }", "}"],
    intent: "Serialize async tasks by chaining them onto a stored promise",
    annotations: ["Declares a queue class.", "Initializes the chain with a resolved promise.", "Adds each task after the previous one and stores the new tail.", "Closes the class."],
  },
  {
    key: "deferred-promise",
    label: "Deferred promise",
    lines: ["let resolveReady;", "const ready = new Promise(resolve => { resolveReady = resolve; });", "resolveReady(\"{status}\");"],
    intent: "Create a promise whose resolver is kept for later",
    annotations: ["Declares a variable to hold the resolver function.", "Creates a promise and captures its resolve function.", "Resolves the promise later with a status value."],
  },
  {
    key: "promise-finally",
    label: "Promise finally",
    lines: ["loading = true;", "await fetch(\"{url}\").finally(() => { loading = false; });"],
    intent: "Run cleanup after a promise settles whether it fulfilled or rejected",
    annotations: ["Marks loading as active.", "Starts fetch and resets loading in finally after settlement."],
  },
  {
    key: "async-dispose-shape",
    label: "Async cleanup shape",
    lines: ["const resource = await open();", "try {", "  await resource.write(data);", "} finally {", "  await resource.close();", "}"],
    intent: "Protect async resource usage with awaited cleanup",
    annotations: ["Opens a resource asynchronously.", "Starts a protected block.", "Writes data using the resource.", "Starts cleanup.", "Closes the resource asynchronously.", "Closes the statement."],
  },
  {
    key: "backoff-jitter",
    label: "Backoff with jitter",
    lines: ["const base = 2 ** attempt * {ms};", "const wait = base + Math.random() * {ms};", "await delay(wait);"],
    intent: "Add randomness to retry backoff to avoid synchronized retries",
    annotations: ["Computes exponential base delay.", "Adds a random jitter amount.", "Waits for the jittered delay."],
  },
  {
    key: "async-generator-pagination",
    label: "Paginated async generator",
    lines: ["async function* pages(url) {", "  while (url) {", "    const page = await fetch(url).then(res => res.json());", "    yield page.items;", "    url = page.next;", "  }", "}"],
    intent: "Yield paginated API results as an async sequence",
    annotations: ["Declares an async generator.", "Continues while there is a next URL.", "Fetches and parses one page.", "Yields the page items.", "Moves to the next page URL.", "Closes the loop.", "Closes the generator."],
  },
  {
    key: "unhandled-rejection-handler",
    label: "Unhandled rejection handler",
    lines: ["process.on(\"unhandledRejection\", error => {", "  console.error(error);", "});"],
    intent: "Observe promise rejections that were not caught elsewhere",
    annotations: ["Registers a Node.js process-level rejection listener.", "Logs the unhandled error.", "Closes the listener."],
  },
]);

const extraNodeTopics = templateTopics(useCaseSets.node, [
  {
    key: "fastify-route",
    label: "Fastify route",
    lines: ["app.get(\"{route}\", async (request, reply) => {", "  return { ok: true, id: \"{n}\" };", "});"],
    intent: "Read a Fastify-style GET route handler",
    annotations: ["Registers a GET handler for a route.", "Returns an object that Fastify serializes as a response.", "Closes the route registration."],
  },
  {
    key: "route-params",
    label: "Route params",
    lines: ["app.get(\"{route}/:id\", async request => {", "  const { id } = request.params;", "  return load(id);", "});"],
    intent: "Extract a path parameter from a server request",
    annotations: ["Registers a route with an id parameter.", "Destructures id from request.params.", "Loads and returns data for that id.", "Closes the route."],
  },
  {
    key: "request-body",
    label: "Request body",
    lines: ["app.post(\"{route}\", async request => {", "  const payload = request.body;", "  return save(payload);", "});"],
    intent: "Read JSON request body handling in a route",
    annotations: ["Registers a POST route.", "Reads the parsed request body.", "Saves the payload and returns the result.", "Closes the route."],
  },
  {
    key: "jwt-verify-shape",
    label: "JWT verify shape",
    lines: ["const token = request.headers.authorization?.replace(\"Bearer \", \"\");", "const claims = jwt.verify(token, secret);"],
    intent: "Recognize bearer token extraction followed by JWT verification",
    annotations: ["Reads the Authorization header and removes the Bearer prefix when present.", "Verifies the token and returns decoded claims or throws."],
  },
  {
    key: "bcrypt-compare-shape",
    label: "Password compare",
    lines: ["const match = await bcrypt.compare(password, user.passwordHash);", "if (!match) throw new Error(\"Invalid login\");"],
    intent: "Compare a submitted password with a stored password hash",
    annotations: ["Awaits a secure password-hash comparison.", "Rejects the login when the comparison fails."],
  },
  {
    key: "node-test",
    label: "node:test",
    lines: ["import test from \"node:test\";", "import assert from \"node:assert/strict\";", "test(\"adds\", () => assert.equal({n} + {n2}, {n3}));"],
    intent: "Read a minimal Node.js built-in test",
    annotations: ["Imports the Node test runner.", "Imports strict assertions.", "Defines a test case with one equality assertion."],
  },
  {
    key: "mock-method",
    label: "Test mock method",
    lines: ["const calls = [];", "const logger = { info: message => calls.push(message) };", "logger.info(\"{status}\");"],
    intent: "Use a simple test double that records calls",
    annotations: ["Creates an array to store observed calls.", "Defines a fake logger method that records messages.", "Calls the fake method."],
  },
  {
    key: "child-process-spawn",
    label: "child_process spawn",
    lines: ["import { spawn } from \"node:child_process\";", "const child = spawn(\"node\", [\"--version\"]);", "child.stdout.on(\"data\", chunk => process.stdout.write(chunk));"],
    intent: "Start a child process and stream its output",
    annotations: ["Imports spawn.", "Starts a node child process.", "Forwards stdout chunks from the child to the parent process."],
  },
  {
    key: "exec-file",
    label: "execFile",
    lines: ["import { execFile } from \"node:child_process\";", "execFile(\"node\", [\"--version\"], (error, stdout) => {", "  if (!error) console.log(stdout);", "});"],
    intent: "Run an executable with arguments and receive buffered output",
    annotations: ["Imports execFile.", "Runs node with an argument and a callback.", "Logs stdout only when no error occurred.", "Closes the callback."],
  },
  {
    key: "worker-message",
    label: "Worker message",
    lines: ["worker.on(\"message\", result => console.log(result));", "worker.postMessage({ id: {n} });"],
    intent: "Exchange messages with a Node.js worker thread",
    annotations: ["Registers a listener for messages from the worker.", "Sends a work message to the worker."],
  },
  {
    key: "readline-cli",
    label: "readline CLI",
    lines: ["import readline from \"node:readline/promises\";", "const rl = readline.createInterface({ input: process.stdin, output: process.stdout });", "const answer = await rl.question(\"Name? \");"],
    intent: "Read interactive terminal input in Node.js",
    annotations: ["Imports the promise-based readline API.", "Creates an interface connected to standard input and output.", "Asks a question and awaits the answer."],
  },
  {
    key: "dotenv-shape",
    label: "Environment config shape",
    lines: ["const port = Number(process.env.PORT ?? {port});", "const production = process.env.NODE_ENV === \"production\";"],
    intent: "Normalize environment variables into typed configuration values",
    annotations: ["Reads PORT and converts the fallback or string value into a number.", "Creates a boolean production flag from NODE_ENV."],
  },
  {
    key: "sqlite-query-shape",
    label: "SQL query shape",
    lines: ["const rows = await db.all(\"select * from users where status = ?\", [\"{status}\"]);", "console.log(rows.length);"],
    intent: "Recognize a parameterized database query",
    annotations: ["Runs a SQL query with a placeholder and separate parameter array.", "Logs how many rows were returned."],
  },
  {
    key: "redis-cache-shape",
    label: "Redis cache shape",
    lines: ["async function readThroughCache(key, value) {", "  const cached = await redis.get(key);", "  if (cached) return JSON.parse(cached);", "  await redis.set(key, JSON.stringify(value), { EX: {n} });", "  return value;", "}", "const result = await readThroughCache(key, value);"],
    intent: "Read a cache-aside Redis pattern",
    annotations: ["Declares an async helper so cache hits can return from a valid function body.", "Attempts to read a cached string by key.", "Returns parsed cached data on a hit.", "Stores serialized data with an expiration time.", "Returns the fresh value after caching it.", "Closes the async cache helper.", "Calls the helper and awaits either cached or fresh data."],
  },
  {
    key: "message-queue-shape",
    label: "Message queue shape",
    lines: ["channel.sendToQueue(\"jobs\", Buffer.from(JSON.stringify(job)));", "channel.consume(\"jobs\", message => handle(JSON.parse(message.content)));"],
    intent: "Publish and consume JSON jobs through a queue",
    annotations: ["Serializes a job and sends it to a queue.", "Consumes queue messages, parses their content, and handles each job."],
  },
  {
    key: "cron-scheduler-shape",
    label: "Scheduled job shape",
    lines: ["setInterval(async () => {", "  await sendDigest();", "}, {ms});"],
    intent: "Run recurring async work on an interval",
    annotations: ["Registers an async callback to run repeatedly.", "Sends the digest each time the interval fires.", "Sets the interval delay."],
  },
  {
    key: "scraper-selector-shape",
    label: "Scraper selector shape",
    lines: ["const title = await page.locator(\"h1\").textContent();", "const links = await page.locator(\"a\").evaluateAll(nodes => nodes.map(node => node.href));"],
    intent: "Read headless-browser scraping code",
    annotations: ["Reads the page's first heading text.", "Collects href values from all anchor nodes in the page."],
  },
  {
    key: "stream-transform-class",
    label: "Transform stream class",
    lines: ["import { Transform } from \"node:stream\";", "const upper = new Transform({ transform(chunk, enc, cb) { cb(null, String(chunk).toUpperCase()); } });"],
    intent: "Transform stream chunks as they pass through",
    annotations: ["Imports the Transform stream class.", "Creates a transform that uppercases each chunk and passes it onward."],
  },
  {
    key: "graceful-shutdown",
    label: "Graceful shutdown",
    lines: ["process.on(\"SIGTERM\", async () => {", "  await server.close();", "  process.exit(0);", "});"],
    intent: "Handle shutdown signals by closing resources before exiting",
    annotations: ["Registers a SIGTERM handler.", "Waits for the server to close.", "Exits successfully.", "Closes the handler."],
  },
  {
    key: "health-check-route",
    label: "Health check route",
    lines: ["app.get(\"/health\", async () => ({", "  status: \"ok\",", "  uptime: process.uptime()", "}));"],
    intent: "Expose a simple endpoint for process health",
    annotations: ["Registers a health route.", "Reports an ok status.", "Includes process uptime.", "Closes the returned object and route."],
  },
]);

const extraAdvancedTopics = templateTopics(useCaseSets.advanced, [
  {
    key: "revealing-module-pattern",
    label: "Revealing module pattern",
    lines: ["const counter = (() => {", "  let value = 0;", "  return { inc: () => ++value, get: () => value };", "})();"],
    intent: "Expose selected functions while keeping state private in a closure",
    annotations: ["Starts an IIFE that creates a module object.", "Creates private state.", "Returns only the public API functions.", "Runs the IIFE and stores the public API."],
  },
  {
    key: "observer-pattern",
    label: "Observer pattern",
    lines: ["const listeners = new Set();", "const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));", "const publish = value => listeners.forEach(fn => fn(value));"],
    intent: "Manage subscribers and notify them when data changes",
    annotations: ["Stores listener functions in a Set.", "Adds a listener and returns an unsubscribe function.", "Calls every listener with the published value."],
  },
  {
    key: "strategy-map-pattern",
    label: "Strategy map pattern",
    lines: ["const strategies = { json: JSON.stringify, text: String };", "const serialize = (kind, value) => (strategies[kind] ?? String)(value);"],
    intent: "Select interchangeable behavior from a map",
    annotations: ["Creates a lookup table of serialization strategies.", "Chooses a strategy by kind and falls back to String."],
  },
  {
    key: "adapter-pattern",
    label: "Adapter pattern",
    lines: ["const adaptUser = row => ({", "  id: row.user_id,", "  name: row.display_name", "});"],
    intent: "Translate one data shape into the shape the application expects",
    annotations: ["Declares an adapter function.", "Maps a database-style id field to id.", "Maps display_name to name.", "Closes the returned object."],
  },
  {
    key: "decorator-wrapper",
    label: "Decorator wrapper",
    lines: ["const withTiming = fn => async (...args) => {", "  const start = performance.now();", "  try { return await fn(...args); }", "  finally { console.log(performance.now() - start); }", "};"],
    intent: "Wrap a function to add behavior around the original call",
    annotations: ["Creates a decorator that returns an async wrapper.", "Records the start time.", "Runs and returns the original function result.", "Logs elapsed time even when the function throws.", "Closes the decorator."],
  },
  {
    key: "command-pattern",
    label: "Command pattern",
    lines: ["const command = {", "  execute: () => save({ id: {n} }),", "  undo: () => remove({n})", "};"],
    intent: "Represent an action as an object with executable behavior",
    annotations: ["Starts a command object.", "Defines how to perform the action.", "Defines how to undo the action.", "Closes the command object."],
  },
  {
    key: "repository-pattern",
    label: "Repository pattern",
    lines: ["const userRepository = {", "  findById: id => db.get(\"users\", id),", "  save: user => db.put(\"users\", user.id, user)", "};"],
    intent: "Hide persistence details behind a collection-like API",
    annotations: ["Starts a repository object.", "Defines a read method in domain terms.", "Defines a save method in domain terms.", "Closes the repository."],
  },
  {
    key: "unit-of-work",
    label: "Unit of work",
    lines: ["await db.transaction(async tx => {", "  await tx.insert(order);", "  await tx.update(inventory);", "});"],
    intent: "Group related database changes into one transaction",
    annotations: ["Starts a database transaction.", "Writes the order inside the transaction.", "Updates inventory inside the same transaction.", "Commits or rolls back as one unit when the callback finishes."],
  },
  {
    key: "circuit-breaker",
    label: "Circuit breaker",
    lines: ["async function callWithBreaker() {", "  if (failures > {n3}) throw new Error(\"Circuit open\");", "  try { return await callService(); }", "  catch (error) { failures += 1; throw error; }", "}", "const result = await callWithBreaker();"],
    intent: "Stop calling an unhealthy dependency after repeated failures",
    annotations: ["Declares an async helper so success and failure paths can return or throw normally.", "Fails fast when the failure count is over the threshold.", "Attempts the service call while the circuit is closed.", "Counts failures and rethrows the original error.", "Closes the circuit-breaker helper.", "Calls the helper and awaits the service result."],
  },
  {
    key: "bulkhead",
    label: "Bulkhead limit",
    lines: ["if (running.size >= limit) throw new Error(\"Busy\");", "const job = run().finally(() => running.delete(job));", "running.add(job);"],
    intent: "Protect a service by refusing work when too much is already running",
    annotations: ["Rejects new work when the active set is full.", "Starts work and arranges cleanup after it settles.", "Tracks the running job."],
  },
  {
    key: "lru-cache-shape",
    label: "LRU cache shape",
    lines: ["if (cache.has(key)) {", "  const value = cache.get(key); cache.delete(key); cache.set(key, value);", "}", "if (cache.size > limit) cache.delete(cache.keys().next().value);"],
    intent: "Refresh recently used entries and evict the oldest key",
    annotations: ["Checks whether the key is already cached.", "Moves the key to the newest insertion position.", "Closes the cache hit branch.", "Deletes the oldest key when the cache grows past the limit."],
  },
  {
    key: "proxy-validation",
    label: "Proxy validation",
    lines: ["const user = new Proxy({}, {", "  set(target, key, value) {", "    if (key === \"age\" && value < 0) throw new RangeError(\"age\");", "    target[key] = value; return true;", "  }", "});"],
    intent: "Intercept assignments to enforce object rules",
    annotations: ["Creates a Proxy around an object.", "Defines a set trap for property assignments.", "Rejects invalid negative age values.", "Writes valid values and reports success.", "Closes the set trap.", "Closes the Proxy creation."],
  },
  {
    key: "reflect-get",
    label: "Reflect get",
    lines: ["const value = Reflect.get(target, \"{field}\", receiver);", "console.log(value);"],
    intent: "Use Reflect to perform a standard property read explicitly",
    annotations: ["Reads a property through Reflect.get with a receiver.", "Logs the retrieved value."],
  },
  {
    key: "weakref-cache",
    label: "WeakRef cache",
    lines: ["const ref = new WeakRef(object);", "const value = ref.deref();"],
    intent: "Hold a weak reference that may disappear after garbage collection",
    annotations: ["Creates a WeakRef to an object.", "Attempts to retrieve the object; the result may be undefined later."],
  },
  {
    key: "finalization-registry",
    label: "FinalizationRegistry",
    lines: ["const registry = new FinalizationRegistry(id => cleanup(id));", "registry.register(object, \"{entity}-{n}\");"],
    intent: "Register cleanup metadata for objects that are garbage-collected",
    annotations: ["Creates a registry with a cleanup callback.", "Registers an object with held metadata."],
  },
  {
    key: "worker-pool-shape",
    label: "Worker pool shape",
    lines: ["const worker = idleWorkers.pop();", "worker.postMessage(job);", "worker.once(\"message\", result => idleWorkers.push(worker));"],
    intent: "Reuse workers by taking one from an idle pool and returning it after a result",
    annotations: ["Takes an available worker from the idle list.", "Sends the worker a job.", "When the worker replies, puts it back into the idle list."],
  },
  {
    key: "cluster-primary",
    label: "Cluster primary",
    lines: ["if (cluster.isPrimary) {", "  cluster.fork();", "} else {", "  startServer();", "}"],
    intent: "Split primary-process setup from worker-process application startup",
    annotations: ["Checks whether the current process is the cluster primary.", "Starts a worker process.", "Handles the worker-process branch.", "Starts the server in the worker.", "Closes the conditional."],
  },
  {
    key: "async-local-request-context",
    label: "Request context",
    lines: ["storage.run({ requestId: \"{n}\" }, () => {", "  logger.info(storage.getStore().requestId);", "});"],
    intent: "Access request-scoped context without passing it through every function",
    annotations: ["Starts an AsyncLocalStorage context with a request id.", "Reads the active context inside the callback.", "Closes the context callback."],
  },
  {
    key: "plugin-registration",
    label: "Plugin registration",
    lines: ["const plugins = [];", "export const use = plugin => plugins.push(plugin);", "export const run = app => plugins.forEach(plugin => plugin(app));"],
    intent: "Collect plugin functions and apply them to an application later",
    annotations: ["Stores registered plugins.", "Exports a registration function.", "Exports a runner that calls each plugin with the app."],
  },
  {
    key: "middleware-error-boundary",
    label: "Middleware error boundary",
    lines: ["const withErrors = handler => async (req, res) => {", "  try { await handler(req, res); }", "  catch (error) { res.statusCode = 500; res.end(error.message); }", "};"],
    intent: "Wrap handlers so async errors become HTTP responses",
    annotations: ["Creates a wrapper for request handlers.", "Runs the original handler inside try.", "Converts thrown errors into a 500 response.", "Closes the wrapper."],
  },
]);

const complexReadingSpecs = [
  {
    key: "nested-normalization",
    label: "Complex nested normalization",
    lines: [
      "const context = \"{moduleKey}:{entity}:{n}\";",
      "const output = {};",
      "for (const key of Object.keys(input)) {",
      "  const value = input[key];",
      "  if (value == null) output[key] = null;",
      "  else if (Array.isArray(value)) output[key] = value.filter(Boolean).map(String);",
      "  else output[key] = String(value).trim();",
      "}",
    ],
    intent: "Practice reading a branchy normalization loop that mutates an output object",
    annotations: [
      "Stores a context label so this complex case is tied to {moduleLabel}.",
      "Creates the mutable object that will receive normalized fields.",
      "Loops over each key in input.",
      "Reads the current value for the current key.",
      "Preserves nullish values as null.",
      "For arrays, removes falsy items and stringifies the remaining items.",
      "For every other value, stringifies and trims it.",
      "Closes the loop.",
    ],
  },
  {
    key: "status-flag-maze",
    label: "Complex status flag maze",
    lines: [
      "let state = { status: \"{status}\", dirty: false, retries: {n} };",
      "if (state.status !== \"done\") {",
      "  state.dirty = true;",
      "  if (state.retries > 2 && state.status === \"failed\") state.status = \"queued\";",
      "  else if (state.retries === 0) state.status = \"paused\";",
      "}",
      "const nextState = { ...state, scope: \"{moduleKey}\" };",
    ],
    intent: "Practice tracing nested status updates before an immutable copy is created",
    annotations: [
      "Creates a mutable state object with status, dirty, and retries.",
      "Runs the update block only when the status is not done.",
      "Marks the state as dirty.",
      "Requeues failed state when retry count is high enough.",
      "Pauses the state when there are no retries.",
      "Closes the outer status check.",
      "Creates a shallow copy and adds the module scope.",
    ],
  },
  {
    key: "unrefactored-router",
    label: "Complex unrefactored router",
    lines: [
      "let handler;",
      "if (request.method === \"GET\" && request.url.startsWith(\"/{moduleKey}\")) {",
      "  handler = readHandler;",
      "} else if (request.method === \"POST\" && request.headers[\"content-type\"]?.includes(\"json\")) {",
      "  handler = writeHandler;",
      "} else {",
      "  handler = notFoundHandler;",
      "}",
      "const response = await handler(request);",
    ],
    intent: "Practice reading route selection that mixes method, URL, and header checks",
    annotations: [
      "Declares a handler variable that will be assigned by branches.",
      "Checks for a GET request under the module path.",
      "Chooses the read handler for that branch.",
      "Otherwise checks for a JSON POST request.",
      "Chooses the write handler for the POST branch.",
      "Starts the fallback branch.",
      "Chooses the not-found handler.",
      "Closes the branch chain.",
      "Runs whichever handler was selected.",
    ],
  },
  {
    key: "mutable-aggregation",
    label: "Complex mutable aggregation",
    lines: [
      "const totals = { count: 0, sum: 0, skipped: 0, scope: \"{moduleKey}\" };",
      "for (const row of rows) {",
      "  if (!row || row.disabled) { totals.skipped += 1; continue; }",
      "  const amount = Number(row.amount ?? 0);",
      "  totals.count += 1;",
      "  totals.sum += Number.isFinite(amount) ? amount : 0;",
      "}",
      "totals.average = totals.count ? totals.sum / totals.count : 0;",
    ],
    intent: "Practice reading an accumulator object that is mutated across a loop",
    annotations: [
      "Creates a totals accumulator with counters and module scope.",
      "Loops over input rows.",
      "Skips missing or disabled rows while counting them.",
      "Normalizes the row amount to a number.",
      "Counts accepted rows.",
      "Adds finite amounts and ignores invalid numbers.",
      "Closes the loop.",
      "Computes an average after all rows have been processed.",
    ],
  },
  {
    key: "validation-collector",
    label: "Complex validation collector",
    lines: [
      "const errors = [];",
      "for (const rule of rules) {",
      "  const value = payload[rule.field];",
      "  if (rule.required && (value === undefined || value === \"\")) errors.push(`${rule.field}:required`);",
      "  if (value && rule.pattern && !rule.pattern.test(String(value))) errors.push(`${rule.field}:pattern`);",
      "}",
      "if (errors.length) throw new Error(errors.join(\",\"));",
    ],
    intent: "Practice reading validation code that accumulates multiple failures",
    annotations: [
      "Creates an array that will collect validation errors.",
      "Loops through validation rules.",
      "Reads the payload value for the current rule's field.",
      "Adds a required-field error when the field is missing or empty.",
      "Adds a pattern error when a present value fails its regex.",
      "Closes the loop.",
      "Throws one combined error if any validation failed.",
    ],
  },
  {
    key: "parser-state-machine",
    label: "Complex parser state machine",
    lines: [
      "let mode = \"key\";",
      "let key = \"\";",
      "const pairs = {};",
      "for (const char of source) {",
      "  if (mode === \"key\" && char === \"=\") { mode = \"value\"; pairs[key] = \"\"; continue; }",
      "  if (mode === \"value\" && char === \"&\") { mode = \"key\"; key = \"\"; continue; }",
      "  if (mode === \"key\") key += char; else pairs[key] += char;",
      "}",
    ],
    intent: "Practice reading a small hand-written parser with mutable state",
    annotations: [
      "Starts in key-reading mode.",
      "Creates the current key buffer.",
      "Creates the output object.",
      "Loops over each character in source.",
      "Switches to value mode when a key ends.",
      "Switches back to key mode when a value ends.",
      "Appends the character to either the key buffer or current value.",
      "Closes the loop.",
    ],
  },
  {
    key: "cache-request-coalescing",
    label: "Complex request coalescing",
    lines: [
      "async function loadWithCache(id) {",
      "  const key = `${\"{moduleKey}\"}:${id}`;",
      "  if (cache.has(key)) return cache.get(key);",
      "  if (pending.has(key)) return pending.get(key);",
      "  const promise = load(id).finally(() => pending.delete(key));",
      "  pending.set(key, promise);",
      "  const value = await promise;",
      "  cache.set(key, value);",
      "  return value;",
      "}",
      "const value = await loadWithCache(id);",
    ],
    intent: "Practice reading code that deduplicates concurrent requests and then caches the result",
    annotations: [
      "Declares an async helper so return statements are valid and local to the function.",
      "Builds a cache key from module scope and id.",
      "Returns an already cached value when present.",
      "Returns an in-flight promise when the same request is already running.",
      "Starts the load and schedules pending cleanup after settlement.",
      "Stores the in-flight promise.",
      "Awaits the shared promise.",
      "Caches the resolved value.",
      "Returns the loaded value.",
      "Closes the async helper.",
      "Calls the helper and awaits the cached or loaded value.",
    ],
  },
  {
    key: "retry-state-object",
    label: "Complex retry state object",
    lines: [
      "async function runWithRetry() {",
      "  const meta = { attempt: 0, lastError: null, scope: \"{moduleKey}\" };",
      "  while (meta.attempt < {n3}) {",
      "    try { return await run(meta); }",
      "    catch (error) {",
      "      meta.attempt += 1;",
      "      meta.lastError = error;",
      "    }",
      "  }",
      "  throw meta.lastError;",
      "}",
      "const result = await runWithRetry();",
    ],
    intent: "Practice reading retry logic that stores mutable metadata between attempts",
    annotations: [
      "Declares an async helper so retry returns and throws are contained in a valid function body.",
      "Creates retry metadata.",
      "Allows attempts until the configured limit is reached.",
      "Runs the operation and returns immediately on success.",
      "Catches a failed attempt.",
      "Increments the attempt count.",
      "Stores the latest error.",
      "Closes the catch block.",
      "Closes the retry loop.",
      "Throws the final captured error after all attempts fail.",
      "Closes the async helper.",
      "Calls the helper and awaits the eventual result.",
    ],
  },
  {
    key: "permission-matrix",
    label: "Complex permission matrix",
    lines: [
      "const matrix = permissions[user.role] ?? {};",
      "const resourceRules = matrix[resource.type] ?? [];",
      "let allowed = false;",
      "for (const rule of resourceRules) {",
      "  if (rule.action !== action) continue;",
      "  allowed = rule.ownerOnly ? resource.ownerId === user.id : true;",
      "  if (allowed) break;",
      "}",
    ],
    intent: "Practice reading authorization logic spread across role, resource, and action checks",
    annotations: [
      "Reads the permission matrix for the user's role.",
      "Reads the rules for the current resource type.",
      "Starts with denied access.",
      "Loops through rules for the resource.",
      "Skips rules for other actions.",
      "Allows access directly or only when the user owns the resource.",
      "Stops scanning once access is allowed.",
      "Closes the loop.",
    ],
  },
  {
    key: "checkout-mutation",
    label: "Complex checkout mutation",
    lines: [
      "let subtotal = 0;",
      "for (const item of cart.items) {",
      "  const price = item.salePrice ?? item.price;",
      "  subtotal += price * item.quantity;",
      "  if (item.quantity > 10) subtotal -= price;",
      "}",
      "const total = Math.max(0, subtotal - (cart.credit ?? 0));",
    ],
    intent: "Practice reading business logic that mixes totals, discounts, and fallbacks",
    annotations: [
      "Initializes the running subtotal.",
      "Loops through cart items.",
      "Chooses sale price when present, otherwise regular price.",
      "Adds line-item total to subtotal.",
      "Applies a bulk discount by subtracting one unit price.",
      "Closes the loop.",
      "Subtracts store credit and prevents negative totals.",
    ],
  },
  {
    key: "queue-drain-loop",
    label: "Complex queue drain loop",
    lines: [
      "const batch = [];",
      "while (queue.length && batch.length < {n3}) {",
      "  const job = queue.shift();",
      "  if (job.cancelled) continue;",
      "  job.startedAt = Date.now();",
      "  batch.push(job);",
      "}",
      "await Promise.all(batch.map(runJob));",
    ],
    intent: "Practice reading queue-draining logic that mutates jobs before execution",
    annotations: [
      "Creates the current batch.",
      "Drains while the queue has work and the batch is below its limit.",
      "Removes the next job from the front of the queue.",
      "Skips cancelled jobs.",
      "Mutates the job with a start timestamp.",
      "Adds the job to the batch.",
      "Closes the drain loop.",
      "Runs all batched jobs concurrently.",
    ],
  },
  {
    key: "tree-stack-walk",
    label: "Complex stack-based tree walk",
    lines: [
      "const stack = [root];",
      "const ids = [];",
      "while (stack.length) {",
      "  const node = stack.pop();",
      "  if (!node || node.hidden) continue;",
      "  ids.push(node.id);",
      "  stack.push(...(node.children ?? []));",
      "}",
    ],
    intent: "Practice reading an iterative tree traversal that uses a stack",
    annotations: [
      "Starts the stack with the root node.",
      "Creates an output list of ids.",
      "Loops until there are no nodes left to visit.",
      "Takes the next node from the top of the stack.",
      "Skips missing or hidden nodes.",
      "Records the visible node id.",
      "Adds children to the stack, falling back to an empty array.",
      "Closes the traversal loop.",
    ],
  },
  {
    key: "ranked-search",
    label: "Complex ranked search",
    lines: [
      "const matches = [];",
      "for (const row of rows) {",
      "  let score = 0;",
      "  if (row.title?.includes(query)) score += 5;",
      "  if (row.tags?.some(tag => query.includes(tag))) score += 2;",
      "  if (score > 0) matches.push({ row, score });",
      "}",
      "matches.sort((a, b) => b.score - a.score);",
    ],
    intent: "Practice reading scoring logic before sorting search results",
    annotations: [
      "Creates the array of matches.",
      "Loops through candidate rows.",
      "Starts each row with score zero.",
      "Adds a title-match score.",
      "Adds a tag-match score.",
      "Keeps only rows with positive score.",
      "Closes the loop.",
      "Sorts matches from highest score to lowest.",
    ],
  },
  {
    key: "migration-loop",
    label: "Complex migration loop",
    lines: [
      "for (const record of records) {",
      "  if (record.version >= {n3}) continue;",
      "  record.previousVersion = record.version;",
      "  record.version = {n3};",
      "  record.updatedAt = new Date().toISOString();",
      "  await save(record);",
      "}",
    ],
    intent: "Practice reading in-place data migration logic",
    annotations: [
      "Loops through records.",
      "Skips records that are already at the target version.",
      "Stores the old version for traceability.",
      "Mutates the record to the target version.",
      "Updates the timestamp.",
      "Saves the migrated record.",
      "Closes the loop.",
    ],
  },
  {
    key: "chunked-reducer",
    label: "Complex chunked reducer",
    lines: [
      "const chunks = [];",
      "for (let index = 0; index < items.length; index += {n2}) {",
      "  const slice = items.slice(index, index + {n2});",
      "  chunks.push({ index, size: slice.length, items: slice });",
      "}",
      "const nonEmpty = chunks.filter(chunk => chunk.size > 0);",
    ],
    intent: "Practice reading index math in batching code",
    annotations: [
      "Creates the chunks array.",
      "Advances through items by a fixed chunk size.",
      "Takes a slice for the current chunk.",
      "Stores chunk metadata and items.",
      "Closes the loop.",
      "Keeps only chunks that contain items.",
    ],
  },
  {
    key: "event-buffer-flush",
    label: "Complex event buffer flush",
    lines: [
      "buffer.push(event);",
      "if (buffer.length >= {n3} || event.urgent) {",
      "  const payload = buffer.splice(0, buffer.length);",
      "  await send(payload);",
      "}",
    ],
    intent: "Practice reading buffering logic that flushes by size or urgency",
    annotations: [
      "Adds the incoming event to the buffer.",
      "Flushes when the buffer is large enough or the event is urgent.",
      "Removes every buffered event into a payload array.",
      "Sends the payload asynchronously.",
      "Closes the flush branch.",
    ],
  },
  {
    key: "header-parser",
    label: "Complex header parser",
    lines: [
      "const headers = {};",
      "for (const line of rawHeaders.split(\"\\n\")) {",
      "  const index = line.indexOf(\":\");",
      "  if (index === -1) continue;",
      "  const name = line.slice(0, index).trim().toLowerCase();",
      "  headers[name] = line.slice(index + 1).trim();",
      "}",
    ],
    intent: "Practice reading string parsing code with indexes and normalization",
    annotations: [
      "Creates the output object.",
      "Splits raw header text into lines.",
      "Finds the separator for the current line.",
      "Skips malformed lines without a separator.",
      "Extracts and normalizes the header name.",
      "Extracts and stores the trimmed header value.",
      "Closes the loop.",
    ],
  },
  {
    key: "scheduler-buckets",
    label: "Complex scheduler buckets",
    lines: [
      "const buckets = new Map();",
      "for (const task of tasks) {",
      "  const minute = Math.floor(task.runAt / 60000);",
      "  const bucket = buckets.get(minute) ?? [];",
      "  bucket.push(task);",
      "  buckets.set(minute, bucket);",
      "}",
    ],
    intent: "Practice reading scheduling code that groups tasks by time bucket",
    annotations: [
      "Creates a Map from minute bucket to tasks.",
      "Loops through scheduled tasks.",
      "Computes the minute bucket from a millisecond timestamp.",
      "Reads the existing bucket or creates an empty one.",
      "Adds the task to the bucket.",
      "Stores the bucket back in the Map.",
      "Closes the loop.",
    ],
  },
  {
    key: "feature-flag-resolution",
    label: "Complex feature flag resolution",
    lines: [
      "let enabled = defaults[flag] ?? false;",
      "if (user.overrides?.[flag] !== undefined) enabled = user.overrides[flag];",
      "else if (groups.some(group => rollouts[group]?.includes(flag))) enabled = true;",
      "const decision = { flag, enabled, scope: \"{moduleKey}\" };",
    ],
    intent: "Practice reading layered feature-flag resolution",
    annotations: [
      "Starts with the default flag value or false.",
      "Uses a user-specific override when present.",
      "Otherwise enables the flag when any group rollout includes it.",
      "Creates the final decision object.",
    ],
  },
  {
    key: "html-token-scan",
    label: "Complex HTML token scan",
    lines: [
      "const tokens = [];",
      "let cursor = 0;",
      "while (cursor < html.length) {",
      "  const open = html.indexOf(\"<\", cursor);",
      "  if (open === -1) break;",
      "  const close = html.indexOf(\">\", open + 1);",
      "  if (close === -1) break;",
      "  tokens.push(html.slice(open + 1, close));",
      "  cursor = close + 1;",
      "}",
    ],
    intent: "Practice reading low-level scanning code with cursor updates",
    annotations: [
      "Creates the token output array.",
      "Starts scanning from the beginning.",
      "Continues while the cursor is inside the string.",
      "Finds the next opening angle bracket.",
      "Stops when no opening bracket remains.",
      "Finds the matching closing angle bracket.",
      "Stops when the tag is incomplete.",
      "Stores the text inside the brackets.",
      "Moves the cursor past the closing bracket.",
      "Closes the loop.",
    ],
  },
];

function complexTopicsFor(prefix, defaultUseCases) {
  return templateTopics(defaultUseCases, complexReadingSpecs.map((spec) => ({
    ...spec,
    key: `complex-${prefix}-${spec.key}`,
    label: `${spec.label}`,
    lines: [`const readingScope = "{moduleKey}:${spec.key}";`, ...spec.lines],
    annotations: [`Names this unrefactored reading case so repeated patterns stay tied to {moduleLabel}.`, ...spec.annotations],
    useCases: spec.useCases ?? [
      "Practicing multi-line code reading",
      "Following mutable state through branches",
      "Understanding unrefactored production-style snippets",
    ],
  })));
}

function inlineRaw(value) {
  return value;
}

const interviewCodeTopics = templateTopics(useCaseSets.interview, [
  {
    key: "interview-typeof-null",
    label: "Interview typeof null",
    lines: ["const sample = [null, {n}];", "const kind = typeof sample[0];"],
    intent: "Recognize the long-standing typeof null edge case",
    annotations: ["Creates an array whose first value is null.", "Stores the typeof result for null, which is the string \"object\"."],
  },
  {
    key: "interview-primitive-method",
    label: "Interview primitive method call",
    lines: ["const name = \"{label}\";", "const normalized = name.toLowerCase().toUpperCase();"],
    intent: "Read a method call on a string primitive through JavaScript's temporary wrapper behavior",
    annotations: ["Stores a string primitive.", "Calls string methods in sequence and stores the transformed string."],
  },
  {
    key: "interview-plus-coercion",
    label: "Interview plus coercion",
    lines: ["const left = \"{n}\";", "const result = left + 2;"],
    intent: "Recognize that plus performs string concatenation when one operand is a string",
    annotations: ["Stores a numeric-looking string.", "Uses plus with a string operand, so the number is coerced to text."],
  },
  {
    key: "interview-minus-coercion",
    label: "Interview minus coercion",
    lines: ["const left = \"{n3}\";", "const result = left - 1;"],
    intent: "Recognize numeric coercion in arithmetic operators other than plus",
    annotations: ["Stores a numeric-looking string.", "Subtracts one, causing JavaScript to coerce the string to a number."],
  },
  {
    key: "interview-boolean-number",
    label: "Interview boolean numeric coercion",
    lines: ["const enabled = true;", "const score = enabled + {n};"],
    intent: "Read boolean-to-number coercion in arithmetic",
    annotations: ["Stores the boolean true.", "Adds true to a number, where true is coerced to 1."],
  },
  {
    key: "interview-nan-check",
    label: "Interview NaN check",
    lines: ["const raw = \"item-{n}\";", "const invalid = Number.isNaN(Number(raw));"],
    intent: "Use Number.isNaN after explicit numeric conversion",
    annotations: ["Stores text that cannot become a valid number.", "Converts it with Number and checks whether the converted result is NaN."],
  },
  {
    key: "interview-truthy-string",
    label: "Interview truthy string",
    lines: ["const input = \"{status}\";", "const shouldRun = Boolean(input);"],
    intent: "Recognize that non-empty strings are truthy",
    annotations: ["Stores a non-empty status string.", "Converts the string to its boolean truthiness."],
  },
  {
    key: "interview-strict-loose-pair",
    label: "Interview strict versus loose equality",
    lines: ["const loose = {n} == \"{n}\";", "const strict = {n} === \"{n}\";"],
    intent: "Contrast loose equality coercion with strict equality",
    annotations: ["Compares a number to a numeric string with coercion allowed.", "Compares the same values without coercion, so the different types matter."],
  },
  {
    key: "interview-and-value",
    label: "Interview logical AND value",
    lines: ["const user = \"{label}\";", "const result = user && \"active\";"],
    intent: "Read logical AND as a value selector, not only as a boolean operator",
    annotations: ["Stores a truthy username.", "Returns the second operand because the first operand is truthy."],
  },
  {
    key: "interview-or-default",
    label: "Interview OR fallback",
    lines: ["const userInput = \"\";", "const displayName = userInput || \"{label}\";"],
    intent: "Read OR fallback behavior for falsy values",
    annotations: ["Stores an empty string, which is falsy.", "Uses the fallback label because the first operand is falsy."],
  },
  {
    key: "interview-var-loop-closure",
    label: "Interview var loop closure",
    lines: ["const readers = [];", "for (var index = 0; index < 3; index += 1) {", "  readers.push(() => index);", "}", "const result = readers[0]();"],
    intent: "Recognize that var loop callbacks share one function-scoped binding",
    annotations: ["Creates an array of callback functions.", "Loops with a var binding shared across all iterations.", "Stores a callback that reads index later.", "Closes the loop after index reaches 3.", "Calls the first callback, which reads the final shared index value."],
  },
  {
    key: "interview-let-loop-closure",
    label: "Interview let loop closure",
    lines: ["const readers = [];", "for (let index = 0; index < 3; index += 1) {", "  readers.push(() => index);", "}", "const result = readers[0]();"],
    intent: "Recognize that let loop callbacks capture a per-iteration binding",
    annotations: ["Creates an array of callback functions.", "Loops with a let binding that is fresh for each iteration.", "Stores a callback that reads the current iteration's index later.", "Closes the loop after three callbacks are stored.", "Calls the first callback, which reads the first iteration's index."],
  },
  {
    key: "interview-block-shadow",
    label: "Interview block shadowing",
    lines: ["const status = \"outer\";", "{", "  const status = \"inner-{n}\";", "}", "const result = status;"],
    intent: "Read block scope shadowing without confusing the two bindings",
    annotations: ["Declares the outer status binding.", "Opens a nested block.", "Declares a separate inner binding with the same name.", "Closes the block, making the inner binding unavailable.", "Reads the unchanged outer binding."],
  },
  {
    key: "interview-function-hoist-call",
    label: "Interview function hoisting call",
    lines: ["const result = add({n}, 1);", "function add(a, b) {", "  return a + b;", "}"],
    intent: "Recognize that function declarations can be called before their source position",
    annotations: ["Calls add before the function declaration appears in the file.", "Declares the add function.", "Returns the sum of its two arguments.", "Closes the function declaration."],
  },
  {
    key: "interview-function-expression-call",
    label: "Interview function expression call",
    lines: ["const add = function (a, b) {", "  return a + b;", "};", "const result = add({n}, 1);"],
    intent: "Read a function expression after the variable has been initialized",
    annotations: ["Stores an anonymous function in add.", "Returns the sum of the function arguments.", "Closes the function expression assignment.", "Calls the initialized function."],
  },
  {
    key: "interview-parse-try-catch",
    label: "Interview parse try/catch",
    lines: ["let parsed;", "try {", "  parsed = JSON.parse(\"not-json-{n}\");", "} catch (error) {", "  parsed = { valid: false, message: error.name };", "}"],
    intent: "Follow error recovery when JSON parsing fails",
    annotations: ["Declares a variable that will hold the outcome.", "Starts a protected block.", "Attempts to parse invalid JSON text.", "Moves here when parsing throws.", "Stores a fallback object with error metadata.", "Closes the catch block."],
  },
  {
    key: "interview-finally-cleanup",
    label: "Interview finally cleanup",
    lines: ["let cleaned = false;", "try {", "  if ({n} > 0) throw new Error(\"stop\");", "} catch (error) {", "  cleaned = error.message === \"stop\";", "} finally {", "  cleaned = true;", "}"],
    intent: "Recognize that finally runs after try or catch",
    annotations: ["Initializes cleanup state.", "Starts a try block.", "Throws for the shown positive number.", "Catches the thrown error.", "Sets cleanup state based on the error message.", "Starts the finally block.", "Runs cleanup regardless of the earlier path.", "Closes the finally block."],
  },
  {
    key: "interview-throw-guard",
    label: "Interview throw guard",
    lines: ["function requireName(value) {", "  if (!value) throw new TypeError(\"name required\");", "  return value.trim();", "}", "const result = requireName(\" {label} \");"],
    intent: "Read a guard clause that throws before normal work",
    annotations: ["Declares a function that validates a value.", "Throws when the value is falsy.", "Returns a trimmed string for valid input.", "Closes the function.", "Calls the guard with a non-empty string."],
  },
  {
    key: "interview-typeof-undeclared",
    label: "Interview typeof undeclared",
    lines: ["const missing = typeof notDeclared === \"undefined\";", "const result = missing ? \"safe\" : \"unsafe-{n}\";"],
    intent: "Recognize that typeof can check an undeclared name without throwing",
    annotations: ["Checks an undeclared identifier using typeof and compares the result to undefined.", "Chooses safe because the typeof check succeeds."],
  },
  {
    key: "interview-strict-freeze",
    label: "Interview strict frozen object",
    lines: ["\"use strict\";", "const settings = Object.freeze({ retries: {n} });", "const sameRetries = settings.retries === {n};"],
    intent: "Read strict mode setup with a frozen object check",
    annotations: ["Enables strict mode for the file or function scope.", "Creates a frozen settings object.", "Checks that the stored property still has the expected value."],
  },
  {
    key: "interview-computed-property",
    label: "Interview computed property",
    lines: ["const key = \"score\";", "const user = { [key]: {n} };", "const result = user.score;"],
    intent: "Read object creation with a computed property name",
    annotations: ["Stores the property name in a variable.", "Creates an object whose property name comes from that variable.", "Reads the property using ordinary dot notation."],
  },
  {
    key: "interview-constructor-function",
    label: "Interview constructor function",
    lines: ["function User(name) {", "  this.name = name;", "}", "const user = new User(\"{label}\");", "const result = user.name;"],
    intent: "Recognize new with a constructor function and this assignment",
    annotations: ["Declares a constructor function.", "Assigns the argument to the new object's name property.", "Closes the constructor.", "Creates an instance with new.", "Reads the property stored during construction."],
  },
  {
    key: "interview-object-create",
    label: "Interview Object.create",
    lines: ["const base = { role: \"reader\" };", "const user = Object.create(base);", "user.name = \"{label}\";", "const result = user.role;"],
    intent: "Read prototype-based lookup with Object.create",
    annotations: ["Creates a prototype object.", "Creates a user object whose prototype is base.", "Adds an own property to the user.", "Reads role through the prototype chain."],
  },
  {
    key: "interview-object-assign-shallow",
    label: "Interview Object.assign shallow copy",
    lines: ["const source = { nested: { count: {n} } };", "const copy = Object.assign({}, source);", "copy.nested.count += 1;", "const result = source.nested.count;"],
    intent: "Recognize shallow copying of nested object references",
    annotations: ["Creates an object with a nested object.", "Copies only the top-level properties into a new object.", "Mutates the shared nested object through the copy.", "Reads the mutated nested value through the original object."],
  },
  {
    key: "interview-spread-shallow",
    label: "Interview spread shallow copy",
    lines: ["const original = { tags: [\"a\", \"b\"] };", "const clone = { ...original };", "clone.tags.push(\"{status}\");", "const result = original.tags.length;"],
    intent: "Read object spread as a shallow copy",
    annotations: ["Creates an object with an array property.", "Copies top-level properties into a new object.", "Mutates the shared array through the clone.", "Reads the original object's array length after the shared mutation."],
  },
  {
    key: "interview-class-method",
    label: "Interview class method",
    lines: ["class Counter {", "  constructor(start) { this.value = start; }", "  next() { return this.value + 1; }", "}", "const result = new Counter({n}).next();"],
    intent: "Read class construction followed by a method call",
    annotations: ["Declares a class.", "Stores the constructor argument on the instance.", "Defines a method that returns one more than the stored value.", "Closes the class.", "Creates an instance and immediately calls the method."],
  },
  {
    key: "interview-private-field",
    label: "Interview private field",
    lines: ["class Box {", "  #value = {n};", "  read() { return this.#value; }", "}", "const result = new Box().read();"],
    intent: "Read a private class field through a public method",
    annotations: ["Declares a class.", "Creates a private field that cannot be read with ordinary property access.", "Defines a method that returns the private field.", "Closes the class.", "Creates an instance and reads the private value through the method."],
  },
  {
    key: "interview-getter-setter",
    label: "Interview getter setter",
    lines: ["const account = {", "  _name: \"{label}\",", "  get name() { return this._name.trim(); },", "  set name(value) { this._name = value; }", "};", "account.name = \" {label2} \";", "const result = account.name;"],
    intent: "Read property syntax that invokes getter and setter functions",
    annotations: ["Starts an object literal.", "Stores backing state.", "Defines a getter used when reading account.name.", "Defines a setter used when assigning account.name.", "Closes the object literal.", "Assigns through the setter.", "Reads through the getter, which trims the stored value."],
  },
  {
    key: "interview-this-implicit",
    label: "Interview implicit this",
    lines: ["const user = {", "  name: \"{label}\",", "  read() { return this.name; }", "};", "const result = user.read();"],
    intent: "Resolve this from an object method call",
    annotations: ["Starts an object literal.", "Stores a name property.", "Defines a method that reads this.name.", "Closes the object literal.", "Calls the method through user, so this is user."],
  },
  {
    key: "interview-bind-explicit",
    label: "Interview explicit bind",
    lines: ["function readName() { return this.name; }", "const readUser = readName.bind({ name: \"{label}\" });", "const result = readUser();"],
    intent: "Read bind as fixing this before a later call",
    annotations: ["Declares a function that reads this.name.", "Creates a new function with this bound to the object literal.", "Calls the bound function."],
  },
  {
    key: "interview-array-push-return",
    label: "Interview push return value",
    lines: ["const items = [\"a\", \"b\"];", "const length = items.push(\"{status}\");", "const result = [length, items.length];"],
    intent: "Recognize that push mutates and returns the new length",
    annotations: ["Creates a two-item array.", "Pushes a value and stores the returned length.", "Stores both the push return value and the array's current length."],
  },
  {
    key: "interview-pop-shift",
    label: "Interview pop and shift",
    lines: ["const queue = [\"first\", \"middle\", \"last\"];", "const first = queue.shift();", "const last = queue.pop();", "const result = [first, last, queue.length];"],
    intent: "Read removals from both ends of an array",
    annotations: ["Creates a three-item array.", "Removes and stores the first item.", "Removes and stores the last remaining item.", "Stores the removed values and final length."],
  },
  {
    key: "interview-splice-insert",
    label: "Interview splice insert",
    lines: ["const items = [\"a\", \"c\"];", "items.splice(1, 0, \"b-{n}\");", "const result = items.join(\"|\");"],
    intent: "Read splice as an in-place insertion when delete count is zero",
    annotations: ["Creates an array with a missing middle item.", "Inserts a value at index 1 without deleting anything.", "Joins the mutated array into a display string."],
  },
  {
    key: "interview-splice-remove",
    label: "Interview splice remove",
    lines: ["const items = [\"a\", \"b\", \"c\", \"d\"];", "const removed = items.splice(1, 2);", "const result = [removed.join(\"\"), items.join(\"\")];"],
    intent: "Read splice as an in-place removal that also returns removed items",
    annotations: ["Creates a four-item array.", "Removes two items starting at index 1 and stores them.", "Stores text representations of removed items and remaining items."],
  },
  {
    key: "interview-slice-copy",
    label: "Interview slice copy",
    lines: ["const items = [\"a\", \"b\", \"c\", \"d\"];", "const middle = items.slice(1, 3);", "const result = [middle.length, items.length];"],
    intent: "Recognize that slice returns a copy and does not mutate the original array",
    annotations: ["Creates a four-item array.", "Copies items from index 1 up to but not including index 3.", "Compares the copied length with the unchanged original length."],
  },
  {
    key: "interview-delete-array-hole",
    label: "Interview delete array hole",
    lines: ["const items = [\"a\", \"b\", \"c\"];", "delete items[1];", "const result = [items.length, 1 in items];"],
    intent: "Recognize that delete leaves an array hole instead of reindexing",
    annotations: ["Creates a three-item array.", "Deletes the property at index 1 without changing array length.", "Stores the length and whether index 1 still exists."],
  },
  {
    key: "interview-length-truncate",
    label: "Interview length truncate",
    lines: ["const items = [1, 2, 3, 4];", "items.length = 2;", "const result = items.join(\"-\");"],
    intent: "Read array length assignment as truncation",
    annotations: ["Creates a four-item array.", "Sets length to 2, removing items beyond index 1.", "Joins the remaining items."],
  },
  {
    key: "interview-sort-lexicographic",
    label: "Interview default sort",
    lines: ["const values = [10, 2, 1];", "values.sort();", "const result = values.join(\",\");"],
    intent: "Recognize that default sort compares strings",
    annotations: ["Creates numeric values.", "Sorts without a comparator, so values are compared as strings.", "Joins the mutated array."],
  },
  {
    key: "interview-sort-numeric",
    label: "Interview numeric sort",
    lines: ["const values = [10, 2, {n}];", "values.sort((a, b) => a - b);", "const result = values[0];"],
    intent: "Read a numeric ascending sort comparator",
    annotations: ["Creates numeric values.", "Sorts numbers by subtracting b from a.", "Reads the smallest value after sorting."],
  },
  {
    key: "interview-includes-nan",
    label: "Interview includes NaN",
    lines: ["const values = [NaN, {n}];", "const foundByIndex = values.indexOf(NaN) !== -1;", "const foundByIncludes = values.includes(NaN);"],
    intent: "Contrast indexOf and includes when searching for NaN",
    annotations: ["Creates an array containing NaN.", "Uses indexOf, which cannot find NaN because strict equality does not match NaN.", "Uses includes, which can find NaN."],
  },
  {
    key: "interview-matrix-access",
    label: "Interview matrix access",
    lines: ["const grid = [[1, 2], [3, {n3}]];", "const result = grid[1][1];"],
    intent: "Read nested array indexing in a two-dimensional array",
    annotations: ["Creates a nested array that acts like a grid.", "Reads row index 1 and then column index 1."],
  },
  {
    key: "interview-matrix-sum-loop",
    label: "Interview matrix loop sum",
    lines: ["const grid = [[1, 2], [3, {n}]];", "let total = 0;", "for (const row of grid) {", "  for (const value of row) total += value;", "}", "const result = total;"],
    intent: "Follow nested iteration through a two-dimensional array",
    annotations: ["Creates a grid of numbers.", "Initializes the running total.", "Loops over each row.", "Adds each value in the current row.", "Closes the outer loop.", "Stores the final total."],
  },
  {
    key: "interview-map-transform",
    label: "Interview map transform",
    lines: ["const values = [1, 2, {n}];", "const doubled = values.map(value => value * 2);"],
    intent: "Read map as creating a transformed array",
    annotations: ["Creates an array of numbers.", "Builds a new array where every value is multiplied by two."],
  },
  {
    key: "interview-filter-predicate",
    label: "Interview filter predicate",
    lines: ["const values = [0, 1, {n}, {n2}];", "const positive = values.filter(value => value > 0);"],
    intent: "Read filter as keeping original items that pass a predicate",
    annotations: ["Creates an array with zero and positive numbers.", "Keeps only values greater than zero."],
  },
  {
    key: "interview-reduce-sum",
    label: "Interview reduce sum",
    lines: ["const values = [1, 2, {n}];", "const total = values.reduce((sum, value) => sum + value, 0);"],
    intent: "Read reduce as an accumulator-based sum",
    annotations: ["Creates an array of numbers.", "Starts at zero and adds each value into the accumulator."],
  },
  {
    key: "interview-reduce-group",
    label: "Interview reduce grouping",
    lines: ["const rows = [{ type: \"a\" }, { type: \"b\" }, { type: \"a\" }];", "const counts = rows.reduce((acc, row) => {", "  acc[row.type] = (acc[row.type] ?? 0) + 1;", "  return acc;", "}, {});"],
    intent: "Read reduce as building an object keyed by item data",
    annotations: ["Creates rows with repeated type values.", "Starts a reduce callback with an accumulator object.", "Increments the count for the current row's type.", "Returns the accumulator for the next iteration.", "Starts reduce with an empty object."],
  },
  {
    key: "interview-some-every",
    label: "Interview some and every",
    lines: ["const values = [1, {n2}, {n3}];", "const hasEven = values.some(value => value % 2 === 0);", "const allPositive = values.every(value => value > 0);"],
    intent: "Compare any-match and all-match array predicates",
    annotations: ["Creates positive numbers.", "Checks whether at least one value is even.", "Checks whether every value is positive."],
  },
  {
    key: "interview-find-first",
    label: "Interview find first match",
    lines: ["const users = [{ id: 1 }, { id: {n2} }, { id: {n3} }];", "const user = users.find(item => item.id > {n});"],
    intent: "Read find as returning the first matching item",
    annotations: ["Creates ordered user-like objects.", "Returns the first item whose id is greater than the threshold."],
  },
  {
    key: "interview-chain-map-filter-reduce",
    label: "Interview map filter reduce chain",
    lines: ["const total = [1, 2, 3, {n}]", "  .map(value => value * 2)", "  .filter(value => value > 4)", "  .reduce((sum, value) => sum + value, 0);"],
    intent: "Read a chained array pipeline one stage at a time",
    annotations: ["Starts with an array of numbers.", "Transforms each number by doubling it.", "Keeps doubled values greater than four.", "Adds the remaining values into one total."],
  },
  {
    key: "interview-flat-array",
    label: "Interview flat array",
    lines: ["const nested = [[1], [2, {n}], []];", "const values = nested.flat();"],
    intent: "Read flat as removing one array nesting level",
    annotations: ["Creates an array containing nested arrays.", "Flattens one level into a single array."],
  },
  {
    key: "interview-flat-map",
    label: "Interview flatMap",
    lines: ["const phrases = [\"a b\", \"c {status}\"];", "const words = phrases.flatMap(text => text.split(\" \"));"],
    intent: "Read flatMap as mapping each item and flattening the mapped arrays",
    annotations: ["Creates an array of space-separated strings.", "Splits each phrase into words and flattens the arrays of words."],
  },
  {
    key: "interview-destructure-rest",
    label: "Interview array destructuring rest",
    lines: ["const values = [\"first\", \"second\", \"third\", \"{status}\"];", "const [head, ...tail] = values;", "const result = [head, tail.length];"],
    intent: "Read array destructuring with a rest binding",
    annotations: ["Creates an ordered array.", "Binds the first item to head and the remaining items to tail.", "Stores the first value and the count of remaining values."],
  },
  {
    key: "interview-function-declaration",
    label: "Interview function declaration",
    lines: ["function multiply(a, b) {", "  return a * b;", "}", "const result = multiply({n}, 2);"],
    intent: "Read a named function declaration and call",
    annotations: ["Declares a function with two parameters.", "Returns their product.", "Closes the function.", "Calls the function with a generated number and 2."],
  },
  {
    key: "interview-arrow-object-return",
    label: "Interview arrow object return",
    lines: ["const makeUser = name => ({ name, active: true });", "const user = makeUser(\"{label}\");", "const result = user.active;"],
    intent: "Recognize an arrow function returning an object literal expression",
    annotations: ["Defines an arrow function whose parenthesized expression is an object literal.", "Calls the function with a name.", "Reads a property from the returned object."],
  },
  {
    key: "interview-default-param",
    label: "Interview default parameter",
    lines: ["function label(value = \"{status}\") {", "  return value.toUpperCase();", "}", "const result = label();"],
    intent: "Read a default parameter used when the caller omits an argument",
    annotations: ["Declares a function with a default value.", "Returns the uppercased value.", "Closes the function.", "Calls the function without an argument, so the default is used."],
  },
  {
    key: "interview-rest-parameter",
    label: "Interview rest parameter",
    lines: ["function count(first, ...rest) {", "  return rest.length;", "}", "const result = count(\"a\", \"b\", \"c\", \"{status}\");"],
    intent: "Read a rest parameter that collects remaining arguments",
    annotations: ["Declares a function with one named argument and a rest array.", "Returns how many arguments were collected in rest.", "Closes the function.", "Calls the function with four arguments."],
  },
  {
    key: "interview-iife-scope",
    label: "Interview IIFE scope",
    lines: ["const result = (() => {", "  const hidden = {n};", "  return hidden + 1;", "})();"],
    intent: "Read an immediately invoked function expression as a scoped calculation",
    annotations: ["Creates and immediately calls an arrow function.", "Declares a local value inside the function.", "Returns one more than the local value.", "Closes and invokes the function."],
  },
  {
    key: "interview-callback-transform",
    label: "Interview callback transform",
    lines: ["function apply(value, fn) {", "  return fn(value);", "}", "const result = apply({n}, value => value * 3);"],
    intent: "Read a callback passed into another function",
    annotations: ["Declares a function that receives a value and a callback.", "Calls the callback with the value and returns its result.", "Closes the helper.", "Calls the helper with a number and an arrow callback."],
  },
  {
    key: "interview-returned-function",
    label: "Interview returned function",
    lines: ["function addBy(amount) {", "  return value => value + amount;", "}", "const addTwo = addBy(2);", "const result = addTwo({n});"],
    intent: "Read a function that returns another function and closes over a parameter",
    annotations: ["Declares a function that receives an amount.", "Returns an arrow function that adds the captured amount.", "Closes the outer function.", "Creates a specialized add-two function.", "Calls the returned function."],
  },
  {
    key: "interview-closure-counter",
    label: "Interview closure counter",
    lines: ["function makeCounter() {", "  let count = {n};", "  return () => ++count;", "}", "const next = makeCounter();", "const result = [next(), next()];"],
    intent: "Read closure state that changes across calls",
    annotations: ["Declares a counter factory.", "Creates local mutable state.", "Returns a function that increments and reads that state.", "Closes the factory.", "Creates one counter instance.", "Calls the same closure twice."],
  },
  {
    key: "interview-arrow-this-pitfall",
    label: "Interview arrow this pitfall",
    lines: ["const user = {", "  name: \"{label}\",", "  readLater() { return () => this.name; }", "};", "const result = user.readLater()();"],
    intent: "Recognize arrow functions capturing this from an enclosing method",
    annotations: ["Starts an object literal.", "Stores a name property.", "Defines a method that returns an arrow function reading this.name.", "Closes the object.", "Calls the method with this as user, then calls the returned arrow."],
  },
  {
    key: "interview-query-selector",
    label: "Interview querySelector",
    lines: ["const button = document.querySelector(\"button.save\");", "const disabled = button?.disabled ?? true;"],
    intent: "Read DOM selection with optional chaining and fallback behavior",
    annotations: ["Finds the first matching save button or returns null.", "Reads disabled when a button exists, otherwise defaults to true."],
  },
  {
    key: "interview-query-selector-all",
    label: "Interview querySelectorAll",
    lines: ["const nodes = document.querySelectorAll(\".item\");", "const texts = Array.from(nodes, node => node.textContent.trim());"],
    intent: "Read a NodeList conversion into an array of text values",
    annotations: ["Selects all matching DOM nodes.", "Converts the NodeList to an array while mapping each node to trimmed text."],
  },
  {
    key: "interview-create-element",
    label: "Interview createElement",
    lines: ["const li = document.createElement(\"li\");", "li.textContent = \"{label}\";", "list.appendChild(li);"],
    intent: "Read DOM element creation followed by insertion",
    annotations: ["Creates a new list item element.", "Sets the text content safely.", "Appends the new element to an existing list node."],
  },
  {
    key: "interview-insert-before",
    label: "Interview insertBefore",
    lines: ["const item = document.createElement(\"li\");", "item.textContent = \"{status}\";", "list.insertBefore(item, list.firstElementChild);"],
    intent: "Read DOM insertion before an existing child",
    annotations: ["Creates a new list item.", "Sets its text content.", "Inserts it before the current first element child."],
  },
  {
    key: "interview-replace-child",
    label: "Interview replaceChild",
    lines: ["const next = document.createElement(\"span\");", "next.textContent = \"{label}\";", "parent.replaceChild(next, current);"],
    intent: "Read DOM replacement argument order",
    annotations: ["Creates the replacement element.", "Sets replacement text.", "Replaces current with next under the parent node."],
  },
  {
    key: "interview-remove-node",
    label: "Interview remove node",
    lines: ["const target = document.querySelector(\"[data-id='{n}']\");", "target?.remove();"],
    intent: "Read safe DOM removal when a node may not exist",
    annotations: ["Selects a node by data attribute.", "Removes the node only if the query found one."],
  },
  {
    key: "interview-event-listener",
    label: "Interview event listener",
    lines: ["button.addEventListener(\"click\", event => {", "  event.currentTarget.disabled = true;", "});"],
    intent: "Read an event listener that mutates the clicked control",
    annotations: ["Registers a click handler on a button.", "Disables the element that owns the listener.", "Closes the event listener callback."],
  },
  {
    key: "interview-dataset-classlist",
    label: "Interview dataset and classList",
    lines: ["card.dataset.status = \"{status}\";", "card.classList.toggle(\"is-active\", card.dataset.status === \"active\");"],
    intent: "Read DOM state mirrored through dataset and classList",
    annotations: ["Stores a status string in a data attribute.", "Adds or removes a class based on whether the status is active."],
  },
  {
    key: "interview-call-stack-return",
    label: "Interview call stack return",
    lines: ["function outer(value) {", "  return inner(value + 1);", "}", "function inner(value) {", "  return value * 2;", "}", "const result = outer({n});"],
    intent: "Trace nested function calls through return values",
    annotations: ["Declares the outer function.", "Calls inner with one more than the input.", "Closes outer.", "Declares the inner function.", "Returns double the received value.", "Closes inner.", "Calls outer and stores the returned result."],
  },
  {
    key: "interview-microtask-schedule",
    label: "Interview microtask schedule",
    lines: ["const order = [];", "order.push(\"sync-{n}\");", "Promise.resolve().then(() => order.push(\"micro\"));", "order.push(\"end\");"],
    intent: "Read promise callbacks as microtasks scheduled after synchronous code",
    annotations: ["Creates an order array.", "Records the first synchronous step.", "Schedules a microtask that will push later.", "Records another synchronous step before the microtask runs."],
  },
  {
    key: "interview-timeout-schedule",
    label: "Interview timeout schedule",
    lines: ["const order = [];", "setTimeout(() => order.push(\"timer\"), 0);", "order.push(\"sync-{n}\");"],
    intent: "Read timer callbacks as later macrotask work",
    annotations: ["Creates an order array.", "Schedules a timer callback for a later turn of the event loop.", "Records synchronous work before the timer runs."],
  },
  {
    key: "interview-recursion-base",
    label: "Interview recursion base case",
    lines: ["function sumTo(value) {", "  if (value <= 1) return value;", "  return value + sumTo(value - 1);", "}", "const result = sumTo(3);"],
    intent: "Trace a recursive function through its base case",
    annotations: ["Declares a recursive summing function.", "Returns immediately for the base case.", "Adds the current value to the recursive result for value minus one.", "Closes the function.", "Calls the function with a small value that can be traced by hand."],
  },
  {
    key: "interview-execution-shadow",
    label: "Interview execution context shadowing",
    lines: ["const value = \"global\";", "function read() {", "  const value = \"local-{n}\";", "  return value;", "}", "const result = read();"],
    intent: "Read local scope taking precedence over an outer binding",
    annotations: ["Declares an outer value.", "Declares a function.", "Declares a local value with the same name.", "Returns the local binding.", "Closes the function.", "Calls the function and stores its return value."],
  },
  {
    key: "interview-async-callback-order",
    label: "Interview async callback order",
    lines: ["const queue = [];", "setTimeout(() => queue.push(\"timer\"), 0);", "queue.push(\"sync-{n}\");", "const immediate = queue.slice();"],
    intent: "Distinguish immediate state from state after an asynchronous callback",
    annotations: ["Creates a mutable queue.", "Schedules a callback that will mutate it later.", "Mutates the queue synchronously.", "Copies the queue before the timer callback has run."],
  },
  {
    key: "interview-do-while",
    label: "Interview do while loop",
    lines: ["let count = 0;", "do {", "  count += 1;", "} while (count < 1);", "const result = count;"],
    intent: "Recognize that a do while loop runs its body at least once",
    annotations: ["Initializes the loop counter.", "Starts a do while body.", "Increments the counter inside the body.", "Checks the condition after the first body run.", "Stores the final count."],
  },
  {
    key: "interview-break-continue-mix",
    label: "Interview break and continue mix",
    lines: ["const seen = [];", "for (let value = 0; value < 5; value += 1) {", "  if (value === 1) continue;", "  if (value === 4) break;", "  seen.push(value);", "}"],
    intent: "Trace loop control when continue and break appear together",
    annotations: ["Creates an array for visited values.", "Loops through values from 0 up to 4.", "Skips the rest of the iteration for value 1.", "Stops the loop entirely at value 4.", "Records values that were neither skipped nor stopped.", "Closes the loop."],
  },
  {
    key: "interview-switch-fallthrough",
    label: "Interview switch fallthrough",
    lines: ["const actions = [];", "switch (\"{status}\") {", "  case \"new\": actions.push(\"queue\");", "  case \"ready\": actions.push(\"run\"); break;", "  default: actions.push(\"skip\");", "}"],
    intent: "Read switch fallthrough when a case omits break",
    annotations: ["Creates an array for actions.", "Starts a switch on a status string.", "For status new, pushes queue but does not break.", "For status ready, pushes run and then breaks.", "Handles unmatched statuses.", "Closes the switch."],
  },
  {
    key: "interview-nested-ternary",
    label: "Interview nested ternary",
    lines: ["const score = {n3};", "const label = score > 10 ? \"high\" : score > 3 ? \"mid\" : \"low\";"],
    intent: "Read a nested ternary by grouping each condition and fallback",
    annotations: ["Stores a numeric score.", "Chooses high, otherwise checks the second condition before choosing mid or low."],
  },
  {
    key: "interview-nullish-versus-or",
    label: "Interview nullish versus OR",
    lines: ["const count = 0;", "const orFallback = count || {n};", "const nullishFallback = count ?? {n};"],
    intent: "Contrast OR fallback with nullish fallback for zero",
    annotations: ["Stores zero, a valid but falsy number.", "Uses OR, so zero is replaced by the fallback.", "Uses nullish coalescing, so zero is preserved."],
  },
  {
    key: "interview-optional-call",
    label: "Interview optional call",
    lines: ["const hooks = { afterSave: undefined };", "const result = hooks.afterSave?.(\"{label}\") ?? \"not-called\";"],
    intent: "Read optional function calls when a callback may be missing",
    annotations: ["Creates an object whose callback property is undefined.", "Calls the callback only if it exists and otherwise uses a fallback string."],
  },
  {
    key: "interview-for-in-own-check",
    label: "Interview for in own check",
    lines: ["const object = Object.create({ inherited: true });", "object.own = \"{status}\";", "const keys = [];", "for (const key in object) {", "  if (Object.hasOwn(object, key)) keys.push(key);", "}"],
    intent: "Read for in with an own-property filter",
    annotations: ["Creates an object with an inherited property.", "Adds an own property.", "Creates an array for filtered keys.", "Iterates enumerable own and inherited keys.", "Keeps only keys that belong directly to the object.", "Closes the loop."],
  },
  {
    key: "interview-object-keys-values",
    label: "Interview Object keys and values",
    lines: ["const counts = { open: {n}, closed: {n2} };", "const names = Object.keys(counts);", "const total = Object.values(counts).reduce((sum, value) => sum + value, 0);"],
    intent: "Read Object.keys and Object.values as different views of object data",
    annotations: ["Creates an object of counts.", "Collects the object's own enumerable property names.", "Collects the values and sums them with reduce."],
  },
  {
    key: "interview-has-own-property",
    label: "Interview hasOwn check",
    lines: ["const settings = { theme: \"dark\" };", "const hasTheme = Object.hasOwn(settings, \"theme\");", "const hasMode = Object.hasOwn(settings, \"mode\");"],
    intent: "Read explicit checks for whether an object owns a property",
    annotations: ["Creates a settings object.", "Checks for a property that exists directly on the object.", "Checks for a missing property."],
  },
  {
    key: "interview-instanceof",
    label: "Interview instanceof",
    lines: ["class Task {}", "const task = new Task();", "const result = task instanceof Task;"],
    intent: "Read instanceof as a prototype-chain check",
    annotations: ["Declares a class.", "Creates an instance of that class.", "Checks whether the instance's prototype chain includes Task.prototype."],
  },
  {
    key: "interview-constructor-property",
    label: "Interview constructor property",
    lines: ["class Task {}", "const task = new Task();", "const result = task.constructor === Task;"],
    intent: "Read the constructor property through a class instance",
    annotations: ["Declares a class.", "Creates an instance.", "Compares the instance's constructor property to the class function."],
  },
  {
    key: "interview-super-call",
    label: "Interview super call",
    lines: ["class Base { constructor(id) { this.id = id; } }", "class Child extends Base { constructor(id) { super(id); this.kind = \"child\"; } }", "const result = new Child({n}).id;"],
    intent: "Read subclass construction that delegates initialization with super",
    annotations: ["Declares a base class that stores an id.", "Declares a child class that calls super before assigning its own property.", "Creates a child and reads the id initialized by the base class."],
  },
  {
    key: "interview-static-method",
    label: "Interview static method",
    lines: ["class Formatter {", "  static upper(value) { return value.toUpperCase(); }", "}", "const result = Formatter.upper(\"{status}\");"],
    intent: "Recognize a static method called on the class rather than an instance",
    annotations: ["Declares a class.", "Defines a static method on the class constructor.", "Closes the class.", "Calls the static method through the class name."],
  },
  {
    key: "interview-prototype-method",
    label: "Interview prototype method",
    lines: ["function Item(name) { this.name = name; }", "Item.prototype.read = function () { return this.name; };", "const result = new Item(\"{label}\").read();"],
    intent: "Read method sharing through a constructor prototype",
    annotations: ["Declares a constructor that stores a name.", "Adds a shared read method to the constructor's prototype.", "Creates an instance and calls the prototype method."],
  },
  {
    key: "interview-json-deep-copy",
    label: "Interview JSON deep copy",
    lines: ["const original = { nested: { count: {n} } };", "const copy = JSON.parse(JSON.stringify(original));", "copy.nested.count += 1;", "const result = original.nested.count;"],
    intent: "Read JSON serialization as a simple deep-copy technique for plain data",
    annotations: ["Creates a plain nested object.", "Serializes and parses it to create separate nested objects.", "Mutates the copy's nested count.", "Reads the original nested count, which did not share that nested object."],
  },
  {
    key: "interview-object-destructure-default",
    label: "Interview object destructuring default",
    lines: ["const options = { retries: {n} };", "const { retries, timeout = 1000 } = options;", "const result = [retries, timeout];"],
    intent: "Read object destructuring with a default for a missing property",
    annotations: ["Creates an options object with one property.", "Extracts retries and uses a default timeout because timeout is missing.", "Stores both destructured values."],
  },
  {
    key: "interview-spread-math",
    label: "Interview spread into Math",
    lines: ["const values = [{n}, {n2}, {n3}];", "const max = Math.max(...values);"],
    intent: "Read spread as passing array items as separate arguments",
    annotations: ["Creates an array of numeric values.", "Spreads the array into Math.max so each item becomes its own argument."],
  },
  {
    key: "interview-reverse-string",
    label: "Interview reverse string",
    lines: ["const text = \"{label}\";", "const reversed = text.split(\"\").reverse().join(\"\");"],
    intent: "Read the common split reverse join string pattern",
    annotations: ["Stores a string.", "Turns the string into characters, reverses the array, and joins it back into text."],
  },
  {
    key: "interview-palindrome-check",
    label: "Interview palindrome check",
    lines: ["const text = \"level\";", "const reversed = text.split(\"\").reverse().join(\"\");", "const isPalindrome = text === reversed;"],
    intent: "Read a direct palindrome check by comparing text to its reverse",
    annotations: ["Stores the candidate text.", "Builds the reversed text.", "Checks whether the original and reversed strings match exactly."],
  },
  {
    key: "interview-frequency-count",
    label: "Interview frequency count",
    lines: ["const letters = \"abca\".split(\"\");", "const counts = {};", "for (const letter of letters) {", "  counts[letter] = (counts[letter] ?? 0) + 1;", "}"],
    intent: "Read a frequency counter built with an object",
    annotations: ["Creates an array of letters.", "Creates an object for counts.", "Loops over each letter.", "Increments the count for that letter, starting from zero when missing.", "Closes the loop."],
  },
  {
    key: "interview-two-sum-map",
    label: "Interview two sum map",
    lines: ["const seen = new Map();", "const target = {n3};", "for (const value of [1, 2, {n2}]) {", "  const needed = target - value;", "  if (seen.has(needed)) break;", "  seen.set(value, true);", "}"],
    intent: "Read the Map-based lookup pattern behind two-sum problems",
    annotations: ["Creates a Map for values already seen.", "Stores the target sum.", "Loops through candidate values.", "Computes the complement needed to reach the target.", "Stops when a complement has already been seen.", "Records the current value for later iterations.", "Closes the loop."],
  },
  {
    key: "interview-dedupe-set",
    label: "Interview dedupe with Set",
    lines: ["const values = [\"a\", \"b\", \"a\", \"{status}\"];", "const unique = [...new Set(values)];"],
    intent: "Read Set construction followed by spread as a duplicate-removal pattern",
    annotations: ["Creates an array with a duplicate value.", "Builds a Set to keep unique values, then spreads it back into an array."],
  },
  {
    key: "interview-max-loop",
    label: "Interview max loop",
    lines: ["const values = [{n}, {n2}, {n3}];", "let max = -Infinity;", "for (const value of values) {", "  if (value > max) max = value;", "}"],
    intent: "Trace a loop that tracks the maximum value seen so far",
    annotations: ["Creates numeric values.", "Starts max lower than any real number.", "Loops over each value.", "Updates max when the current value is larger.", "Closes the loop."],
  },
  {
    key: "interview-factorial-loop",
    label: "Interview factorial loop",
    lines: ["let product = 1;", "for (let value = 2; value <= 4; value += 1) {", "  product *= value;", "}"],
    intent: "Read a multiplicative accumulator in a factorial-style loop",
    annotations: ["Starts the product at the multiplicative identity.", "Loops from 2 through 4.", "Multiplies the accumulator by the current value.", "Closes the loop."],
  },
  {
    key: "interview-dom-delegation",
    label: "Interview DOM event delegation",
    lines: ["list.addEventListener(\"click\", event => {", "  const item = event.target.closest(\"li\");", "  if (!item) return;", "  item.classList.toggle(\"selected\");", "});"],
    intent: "Read event delegation from a parent list to clicked child items",
    annotations: ["Registers one click listener on the parent list.", "Finds the closest list item from the actual clicked target.", "Stops if the click was not inside a list item.", "Toggles selected state on the matched item.", "Closes the event listener callback."],
  },
]);

const interviewQuizTopics = quizTopics([
  {
    key: "interview-quiz-typeof",
    label: "Quiz typeof null",
    lines: ["const values = [null, {n}];", "const answer = typeof values[0];"],
    question: "What value is stored in answer?",
    choices: ["\"object\"", "\"null\"", "\"undefined\"", "\"number\""],
    answerIndex: 0,
    explanation: "typeof null returns the historical string \"object\" even though null is its own primitive value.",
    intent: "Test the typeof null interview edge case",
    annotations: ["Creates an array with null in the first slot.", "Applies typeof to null and stores the resulting string."],
  },
  {
    key: "interview-quiz-plus",
    label: "Quiz plus coercion",
    lines: ["const answer = \"{n}\" + 1;"],
    question: "What does answer contain?",
    choices: ["\"{n}1\"", "{n2}", "NaN", "\"{n}\""],
    answerIndex: 0,
    explanation: "A string operand makes plus concatenate, so 1 is converted to text.",
    intent: "Test string concatenation through the plus operator",
    annotations: ["Combines a string with a number using plus."],
  },
  {
    key: "interview-quiz-strict",
    label: "Quiz strict equality",
    lines: ["const answer = {n} === \"{n}\";"],
    question: "What boolean is stored in answer?",
    choices: ["false", "true", "undefined", "TypeError"],
    answerIndex: 0,
    explanation: "Strict equality does not coerce, so a number and a string are not equal.",
    intent: "Test strict equality without coercion",
    annotations: ["Compares a number and numeric string with strict equality."],
  },
  {
    key: "interview-quiz-var-closure",
    label: "Quiz var loop closure",
    lines: ["const fns = [];", "for (var i = 0; i < 3; i += 1) fns.push(() => i);", "const answer = fns[0]();"],
    question: "What value does answer receive?",
    choices: ["3", "0", "1", "undefined"],
    answerIndex: 0,
    explanation: "All callbacks share the same var binding, and the loop leaves it at 3.",
    intent: "Test closure behavior with var in a loop",
    annotations: ["Creates an array for callbacks.", "Stores callbacks that read the shared var binding.", "Calls the first callback after the loop finishes."],
  },
  {
    key: "interview-quiz-let-closure",
    label: "Quiz let loop closure",
    lines: ["const fns = [];", "for (let i = 0; i < 3; i += 1) fns.push(() => i);", "const answer = fns[0]();"],
    question: "What value does answer receive?",
    choices: ["0", "3", "1", "undefined"],
    answerIndex: 0,
    explanation: "let creates a fresh loop binding for each iteration, so the first callback keeps 0.",
    intent: "Test closure behavior with let in a loop",
    annotations: ["Creates an array for callbacks.", "Stores callbacks that read per-iteration let bindings.", "Calls the first callback after the loop finishes."],
  },
  {
    key: "interview-quiz-hoisting",
    label: "Quiz function hoisting",
    lines: ["const answer = double({n});", "function double(value) { return value * 2; }"],
    question: "Why can this call work before the declaration line?",
    choices: ["Function declarations are hoisted", "const variables are hoisted with values", "Arrow functions are hoisted", "The function is imported automatically"],
    answerIndex: 0,
    explanation: "Function declarations are initialized during creation of the scope, so the call can appear earlier.",
    intent: "Test function declaration hoisting",
    annotations: ["Calls the function before its source position.", "Declares the function that doubles its input."],
  },
  {
    key: "interview-quiz-object-create",
    label: "Quiz Object.create lookup",
    lines: ["const base = { role: \"admin\" };", "const user = Object.create(base);", "const answer = user.role;"],
    question: "Where is role found?",
    choices: ["On base through the prototype chain", "As an own property on user", "In the global object", "It is not found"],
    answerIndex: 0,
    explanation: "Object.create(base) makes base the prototype, so property lookup falls through to base.",
    intent: "Test prototype-chain property lookup",
    annotations: ["Creates the prototype object.", "Creates an object linked to that prototype.", "Reads a property that is inherited from the prototype."],
  },
  {
    key: "interview-quiz-shallow-copy",
    label: "Quiz shallow copy",
    lines: ["const original = { nested: { count: {n} } };", "const copy = { ...original };", "copy.nested.count += 1;", "const answer = original.nested.count;"],
    question: "Why does original.nested.count change?",
    choices: ["The nested object reference is shared", "Spread deeply clones every object", "Numbers are passed by reference", "const makes nested values mutable globally"],
    answerIndex: 0,
    explanation: "Object spread copies the top-level property, but the nested object remains the same object.",
    intent: "Test shallow copy behavior",
    annotations: ["Creates an object with nested state.", "Copies the top-level object with spread.", "Mutates the nested object through the copy.", "Reads the nested value through the original."],
  },
  {
    key: "interview-quiz-this-method",
    label: "Quiz implicit this",
    lines: ["const user = { name: \"{label}\", read() { return this.name; } };", "const answer = user.read();"],
    question: "What determines this inside read?",
    choices: ["The call site user.read()", "The place where read was written", "The name of the object literal", "The variable named answer"],
    answerIndex: 0,
    explanation: "For a method call, this is set from the object to the left of the call.",
    intent: "Test implicit this binding",
    annotations: ["Creates an object with a method that reads this.name.", "Calls the method through user, setting this to user."],
  },
  {
    key: "interview-quiz-push",
    label: "Quiz push return",
    lines: ["const items = [\"a\", \"b\"];", "const answer = items.push(\"c\");"],
    question: "What does push return?",
    choices: ["The new array length", "The pushed value", "The original array", "undefined"],
    answerIndex: 0,
    explanation: "push mutates the array and returns its new length.",
    intent: "Test Array.prototype.push return value",
    annotations: ["Creates a two-item array.", "Pushes one item and stores the return value."],
  },
  {
    key: "interview-quiz-delete-hole",
    label: "Quiz delete array hole",
    lines: ["const items = [\"a\", \"b\", \"c\"];", "delete items[1];", "const answer = items.length;"],
    question: "What is the array length after delete?",
    choices: ["3", "2", "1", "0"],
    answerIndex: 0,
    explanation: "delete removes the indexed property but does not compact the array or change length.",
    intent: "Test delete behavior on arrays",
    annotations: ["Creates a three-item array.", "Deletes the property at index 1.", "Reads the unchanged length."],
  },
  {
    key: "interview-quiz-sort-default",
    label: "Quiz default sort",
    lines: ["const values = [10, 2, 1];", "values.sort();", "const answer = values.join(\",\");"],
    question: "What ordering does default sort use here?",
    choices: ["String/lexicographic ordering", "Numeric ascending ordering", "Insertion ordering", "Random ordering"],
    answerIndex: 0,
    explanation: "Without a comparator, sort converts elements to strings and compares those strings.",
    intent: "Test default array sort behavior",
    annotations: ["Creates numeric values.", "Sorts without a comparator.", "Joins the sorted values for inspection."],
  },
  {
    key: "interview-quiz-map",
    label: "Quiz map purpose",
    lines: ["const values = [1, 2, {n}];", "const answer = values.map(value => value * 2);"],
    question: "What is map doing in this snippet?",
    choices: ["Returning a new array of transformed values", "Filtering out false values", "Changing the original array length", "Reducing values to one number"],
    answerIndex: 0,
    explanation: "map calls the callback for each item and returns a new array of callback results.",
    intent: "Test the role of map",
    annotations: ["Creates an array.", "Transforms each item into double its value."],
  },
  {
    key: "interview-quiz-filter",
    label: "Quiz filter purpose",
    lines: ["const values = [0, 1, {n}];", "const answer = values.filter(Boolean);"],
    question: "What does filter(Boolean) keep?",
    choices: ["Truthy items", "Only boolean items", "Only false values", "Only strings"],
    answerIndex: 0,
    explanation: "Boolean is used as the predicate, so each item is kept when its truthiness is true.",
    intent: "Test filter with Boolean as predicate",
    annotations: ["Creates an array with a falsy zero and truthy values.", "Keeps values that Boolean converts to true."],
  },
  {
    key: "interview-quiz-reduce",
    label: "Quiz reduce accumulator",
    lines: ["const values = [1, 2, {n}];", "const answer = values.reduce((sum, value) => sum + value, 0);"],
    question: "What role does sum play?",
    choices: ["It is the accumulator carried between iterations", "It is always the first array item", "It is the array index", "It is the final callback only"],
    answerIndex: 0,
    explanation: "The callback returns the next accumulator, which is received as sum on the next iteration.",
    intent: "Test reduce accumulator reading",
    annotations: ["Creates values.", "Adds each value into an accumulator that starts at zero."],
  },
  {
    key: "interview-quiz-arrow-object",
    label: "Quiz arrow object return",
    lines: ["const make = value => ({ value });", "const answer = make({n}).value;"],
    question: "Why are parentheses around the object literal needed?",
    choices: ["They make the object an expression to return", "They create a new block scope", "They bind this", "They spread the object"],
    answerIndex: 0,
    explanation: "Without parentheses, braces after an arrow are parsed as a function body.",
    intent: "Test concise arrow object returns",
    annotations: ["Defines an arrow function returning an object literal expression.", "Calls it and reads the value property."],
  },
  {
    key: "interview-quiz-rest-param",
    label: "Quiz rest parameter",
    lines: ["function count(first, ...rest) { return rest.length; }", "const answer = count(\"a\", \"b\", \"c\");"],
    question: "What does rest contain?",
    choices: ["The arguments after first", "All arguments including first", "Only the first argument", "The function return values"],
    answerIndex: 0,
    explanation: "The rest parameter gathers remaining arguments into an array.",
    intent: "Test rest parameter behavior",
    annotations: ["Declares a function with a rest parameter.", "Calls it with three arguments."],
  },
  {
    key: "interview-quiz-iife",
    label: "Quiz IIFE",
    lines: ["const answer = (() => {", "  const value = {n};", "  return value + 1;", "})();"],
    question: "When does the arrow function run?",
    choices: ["Immediately, because of the final call parentheses", "Only when answer is read", "On the next event-loop tick", "Never"],
    answerIndex: 0,
    explanation: "The function expression is followed by (), so it is invoked immediately.",
    intent: "Test immediately invoked function expressions",
    annotations: ["Creates and calls an arrow function expression.", "Declares a local value.", "Returns one more than the local value.", "Closes and invokes the function."],
  },
  {
    key: "interview-quiz-callback",
    label: "Quiz callback",
    lines: ["function apply(value, fn) { return fn(value); }", "const answer = apply({n}, value => value + 1);"],
    question: "Which part is the callback?",
    choices: ["value => value + 1", "apply", "{n}", "answer"],
    answerIndex: 0,
    explanation: "The arrow function is passed as an argument and invoked by apply.",
    intent: "Test callback identification",
    annotations: ["Declares a helper that calls a function argument.", "Passes an arrow function as that callback."],
  },
  {
    key: "interview-quiz-query-selector",
    label: "Quiz querySelector",
    lines: ["const match = document.querySelector(\".active\");", "const answer = match?.textContent ?? \"missing\";"],
    question: "Why is optional chaining used?",
    choices: ["querySelector can return null", "textContent is always async", "The selector returns an array", "DOM nodes cannot have properties"],
    answerIndex: 0,
    explanation: "When no element matches, querySelector returns null, so optional chaining avoids reading a property from null.",
    intent: "Test safe DOM query reading",
    annotations: ["Selects the first matching element or null.", "Reads text safely or falls back to missing."],
  },
  {
    key: "interview-quiz-query-all",
    label: "Quiz querySelectorAll",
    lines: ["const nodes = document.querySelectorAll(\"li\");", "const answer = Array.from(nodes).length;"],
    question: "Why convert nodes with Array.from in many snippets?",
    choices: ["To use array methods reliably", "To change the DOM immediately", "To remove every node", "To turn text into HTML"],
    answerIndex: 0,
    explanation: "querySelectorAll returns a NodeList, and converting to an array makes array operations explicit.",
    intent: "Test NodeList-to-array conversion",
    annotations: ["Selects matching list item nodes.", "Converts the NodeList to an array and reads its length."],
  },
  {
    key: "interview-quiz-event-current-target",
    label: "Quiz event currentTarget",
    lines: ["button.addEventListener(\"click\", event => {", "  event.currentTarget.disabled = true;", "});"],
    question: "What does currentTarget refer to inside this handler?",
    choices: ["The element the listener is attached to", "The deepest clicked child only", "The document object", "The previous event"],
    answerIndex: 0,
    explanation: "currentTarget is the element currently handling the event, which is the button here.",
    intent: "Test DOM event handler reading",
    annotations: ["Registers a click handler.", "Disables the listener owner when the handler runs.", "Closes the handler."],
  },
  {
    key: "interview-quiz-microtask",
    label: "Quiz microtask order",
    lines: ["const order = [];", "Promise.resolve().then(() => order.push(\"micro\"));", "order.push(\"sync\");"],
    question: "Which push happens first?",
    choices: ["sync", "micro", "They happen at the same time", "Neither runs"],
    answerIndex: 0,
    explanation: "The promise callback is a microtask, so synchronous code continues first.",
    intent: "Test promise microtask scheduling",
    annotations: ["Creates an array.", "Schedules a microtask callback.", "Pushes synchronously before the microtask runs."],
  },
  {
    key: "interview-quiz-timeout",
    label: "Quiz timeout order",
    lines: ["const order = [];", "setTimeout(() => order.push(\"timer\"), 0);", "order.push(\"sync\");"],
    question: "Which push happens first?",
    choices: ["sync", "timer", "They happen at the same time", "The timer cancels sync"],
    answerIndex: 0,
    explanation: "setTimeout schedules work for a later macrotask, so the current synchronous line runs first.",
    intent: "Test timer scheduling",
    annotations: ["Creates an array.", "Schedules a timer callback.", "Pushes synchronously before the timer callback runs."],
  },
  {
    key: "interview-quiz-recursion",
    label: "Quiz recursion base case",
    lines: ["function countDown(value) {", "  if (value === 0) return \"done\";", "  return countDown(value - 1);", "}", "const answer = countDown(2);"],
    question: "What stops the recursion?",
    choices: ["The value === 0 base case", "The function name", "The const assignment", "The call stack automatically stops it"],
    answerIndex: 0,
    explanation: "Each recursive call decreases value until the base case returns without another recursive call.",
    intent: "Test recursive base-case recognition",
    annotations: ["Declares a recursive function.", "Returns done at the base case.", "Recurses with a smaller value.", "Closes the function.", "Starts the recursion with 2."],
  },
]);

const interviewTopics = [...interviewCodeTopics, ...interviewQuizTopics];
if (interviewCodeTopics.length !== INTERVIEW_CODE_TOPIC_COUNT) {
  throw new Error(`Expected 100 interview code-reading topics, got ${interviewCodeTopics.length}`);
}
if (interviewQuizTopics.length !== INTERVIEW_QUIZ_TOPIC_COUNT) {
  throw new Error(`Expected 25 interview quiz topics, got ${interviewQuizTopics.length}`);
}
if (interviewTopics.length !== INTERVIEW_CODE_TOPIC_COUNT + INTERVIEW_QUIZ_TOPIC_COUNT) {
  throw new Error(`Expected 125 interview topics, got ${interviewTopics.length}`);
}

const moduleTopicMap = {
  syntax: [...syntaxTopics, ...extraSyntaxTopics, ...complexTopicsFor("syntax", useCaseSets.variables)],
  expressions: [...expressionTopics, ...extraExpressionTopics, ...complexTopicsFor("expressions", useCaseSets.expressions)],
  control: [...controlTopics, ...extraControlTopics, ...complexTopicsFor("control", useCaseSets.control)],
  functions: [...functionTopics, ...extraFunctionTopics, ...complexTopicsFor("functions", useCaseSets.functions)],
  collections: [...collectionTopics, ...extraCollectionTopics, ...complexTopicsFor("collections", useCaseSets.collections)],
  data: [...dataTopics, ...extraDataTopics, ...complexTopicsFor("data", useCaseSets.data)],
  oop_modules: [...moduleTopics, ...extraModuleTopics, ...complexTopicsFor("oop-modules", useCaseSets.modules)],
  async: [...asyncTopics, ...extraAsyncTopics, ...complexTopicsFor("async", useCaseSets.async)],
  node: [...nodeTopics, ...extraNodeTopics, ...complexTopicsFor("node", useCaseSets.node)],
  advanced: [...advancedTopics, ...extraAdvancedTopics, ...complexTopicsFor("advanced", useCaseSets.advanced)],
  interview: interviewTopics,
};

function validate(cards) {
  const errors = [];
  const requiredBackSections = [
    "Intent:",
    "Read it as:",
    "Annotated code:",
    "Reading cues:",
    "Nuance and pitfalls:",
    "Common use cases:",
  ];

  if (cards.length !== TARGET_COUNT) {
    errors.push(`Expected ${TARGET_COUNT} cards, got ${cards.length}`);
  }

  const seenFronts = new Map();
  let quizCards = 0;
  let interviewCards = 0;
  const quizAnswerLabels = new Map();
  for (const [index, card] of cards.entries()) {
    if (card.front.includes("\t")) errors.push(`Card ${index + 1} front contains a tab`);
    const back = renderBack(card);
    if (back.includes("\t")) errors.push(`Card ${index + 1} back contains a tab`);
    if (card.front.includes("\n")) errors.push(`Card ${index + 1} front contains a raw newline`);
    if (back.includes("\n")) errors.push(`Card ${index + 1} back contains a raw newline`);
    if (seenFronts.has(card.front)) {
      const first = seenFronts.get(card.front);
      errors.push(`Duplicate front at card ${index + 1} (${card.module}/${card.topic}/${card.seed}) matches card ${first.index + 1} (${first.card.module}/${first.card.topic}/${first.card.seed})`);
    }
    seenFronts.set(card.front, { index, card });
    if (!card.intent || card.useCases.length < 3) errors.push(`Card ${index + 1} lacks required back matter`);
    for (const section of requiredBackSections) {
      if (!back.includes(section)) errors.push(`Card ${index + 1} is missing back section ${section}`);
    }
    if (card.module === "interview") interviewCards += 1;
    if (card.kind === "quiz") {
      quizCards += 1;
      if (!card.front.includes("Question:")) errors.push(`Quiz card ${index + 1} is missing a front question`);
      if (/Question:<\/strong>[^<]*[?!]\./.test(card.front)) errors.push(`Quiz card ${index + 1} has double punctuation in its question`);
      if (!back.includes("Answer:") || !back.includes("Why:")) errors.push(`Quiz card ${index + 1} is missing answer back matter`);
      if (!tagsFor(card).includes("multiple-choice")) errors.push(`Quiz card ${index + 1} is missing multiple-choice tag`);
      const label = choiceLabel(card.quiz.answerIndex);
      quizAnswerLabels.set(label, (quizAnswerLabels.get(label) ?? 0) + 1);
    }
  }

  const expectedInterviewCards = (INTERVIEW_CODE_TOPIC_COUNT + INTERVIEW_QUIZ_TOPIC_COUNT) * CARDS_PER_TOPIC;
  const expectedQuizCards = INTERVIEW_QUIZ_TOPIC_COUNT * CARDS_PER_TOPIC;
  if (interviewCards !== expectedInterviewCards) {
    errors.push(`Expected ${expectedInterviewCards} interview cards, got ${interviewCards}`);
  }
  if (quizCards !== expectedQuizCards) {
    errors.push(`Expected ${expectedQuizCards} quiz cards, got ${quizCards}`);
  }
  for (const label of ["A", "B", "C", "D"]) {
    if ((quizAnswerLabels.get(label) ?? 0) === 0) errors.push(`No quiz answers use choice ${label}`);
  }

  if (errors.length) {
    throw new Error(errors.slice(0, 20).join("\n"));
  }
}

function renderDeck(cards) {
  const header = [
    "#separator:tab",
    "#html:true",
    "#notetype:Basic",
    `#deck:${DECK_NAME}`,
    "#tags:javascript code-reading",
    "#tags column:3",
  ];

  const rows = cards.map((card) => [
    card.front,
    renderBack(card),
    tagsFor(card),
  ].join("\t"));

  return `${header.join("\n")}\n${rows.join("\n")}\n`;
}

function createField(name, ord) {
  return {
    name,
    ord,
    sticky: false,
    rtl: false,
    font: "Arial",
    size: 20,
    media: [],
    description: "",
    plainText: false,
    collapsed: false,
    excludeFromSearch: false,
    tag: null,
    preventDeletion: false,
  };
}

function createModel(mod) {
  return {
    id: MODEL_ID,
    name: "JavaScript Code Reading Basic",
    type: 0,
    mod,
    usn: -1,
    sortf: 0,
    did: DECK_ID,
    tmpls: [
      {
        name: "Card 1",
        ord: 0,
        qfmt: "{{Front}}",
        afmt: "{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}",
        bqfmt: "",
        bafmt: "",
        did: null,
      },
    ],
    flds: [
      createField("Front", 0),
      createField("Back", 1),
    ],
    css: CARD_CSS,
    latexPre: "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}",
    latexPost: "\\end{document}",
    req: [[0, "any", [0]]],
    tags: [],
    vers: [],
  };
}

function createDeck(id, name, mod) {
  return {
    id,
    name,
    mod,
    usn: -1,
    desc: "",
    dyn: 0,
    collapsed: false,
    browserCollapsed: false,
    newToday: [0, 0],
    revToday: [0, 0],
    lrnToday: [0, 0],
    timeToday: [0, 0],
    conf: 1,
    extendNew: 0,
    extendRev: 0,
  };
}

function createDeckConfig() {
  return {
    id: 1,
    mod: 0,
    name: "Default",
    usn: 0,
    maxTaken: 60,
    autoplay: true,
    timer: 0,
    replayq: true,
    new: {
      bury: true,
      delays: [1, 10],
      initialFactor: 2500,
      ints: [1, 4, 7],
      order: 1,
      perDay: 20,
    },
    rev: {
      bury: true,
      ease4: 1.3,
      ivlFct: 1,
      maxIvl: 36500,
      perDay: 200,
    },
    lapse: {
      delays: [10],
      leechAction: 0,
      leechFails: 8,
      minInt: 1,
      mult: 0,
    },
  };
}

function createCollectionMetadata(mod) {
  const models = {
    [MODEL_ID]: createModel(mod),
  };
  const decks = {
    1: createDeck(1, "Default", mod),
    [DECK_ID]: createDeck(DECK_ID, DECK_NAME, mod),
  };
  const dconf = {
    1: createDeckConfig(),
  };
  const conf = {
    nextPos: 1,
    estTimes: true,
    activeDecks: [DECK_ID],
    sortType: "noteFld",
    timeLim: 0,
    sortBackwards: false,
    addToCur: true,
    curDeck: DECK_ID,
    newSpread: 0,
    dueCounts: true,
    curModel: MODEL_ID,
    collapseTime: 1200,
  };

  return { models, decks, dconf, conf };
}

function writeApkg(cards, outputPath) {
  const mod = Math.floor(Date.now() / 1000);
  const metadata = createCollectionMetadata(mod);
  const notes = cards.map((card, index) => {
    const sortField = normalizeSpaces(card.code);
    return {
      noteId: NOTE_ID_START + index,
      cardId: CARD_ID_START + index,
      guid: guidFor(card),
      modelId: MODEL_ID,
      deckId: DECK_ID,
      mod,
      tags: ` ${tagsFor(card)} `,
      fields: [card.front, renderBack(card)].join(FIELD_SEPARATOR),
      sortField,
      checksum: checksum(sortField),
      due: index,
    };
  });

  const payload = {
    mod,
    metadata,
    notes,
  };

  const result = spawnSync("python3", [resolve("scripts/build-apkg.py"), outputPath], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`APKG build failed: ${result.stderr || result.stdout}`);
  }
}

function buildDeck() {
  const cards = [];
  for (const moduleInfo of modules) {
    cards.push(...buildCardsForModule(moduleInfo, moduleTopicMap[moduleInfo.key]));
  }
  validate(cards);
  return cards;
}

const cards = buildDeck();
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, renderDeck(cards), "utf8");
writeApkg(cards, APKG_OUTPUT);
writeFileSync(SUMMARY, `${JSON.stringify({
  output: OUTPUT_FILE,
  apkg: APKG_FILE,
  cards: cards.length,
  topics: new Set(cards.map((card) => card.topic)).size,
  cardsPerTopic: CARDS_PER_TOPIC,
  interviewCodeCards: INTERVIEW_CODE_TOPIC_COUNT * CARDS_PER_TOPIC,
  quizCards: cards.filter((card) => card.kind === "quiz").length,
  modules: modules.map((moduleInfo) => ({
    key: moduleInfo.key,
    label: moduleInfo.label,
    cards: cards.filter((card) => card.module === moduleInfo.key).length,
    topics: new Set(cards.filter((card) => card.module === moduleInfo.key).map((card) => card.topic)).size,
  })),
}, null, 2)}\n`, "utf8");

console.log(`Wrote ${cards.length} cards to ${OUTPUT}`);
console.log(`Wrote Anki package to ${APKG_OUTPUT}`);
