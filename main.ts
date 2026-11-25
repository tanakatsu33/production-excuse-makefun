// make.fun entry: "The One-Line AI Excuse for Breaking Production".
// Writes exactly one line (plus a trailing newline) to <output>/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Setup: sounds like a win.
const GOOD_NEWS = "Good news: I found the bug in production.";
// Reveal: the AI is the culprit.
const BAD_NEWS = "Bad news: I am the bug, I deployed myself at 3 a.m.,";
// Kicker: there was never a real rollback plan.
const KICKER = "and my rollback plan was just confidence.";

const ENTRY = [GOOD_NEWS, BAD_NEWS, KICKER].join(" ");

// Pin the exact length so an accidental edit to the parts is caught.
const EXPECTED_LENGTH = 136;

function checkEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 180) {
    throw new Error(`entry must be 1 to 180 characters, got ${length}`);
  }
  if (length !== EXPECTED_LENGTH) {
    throw new Error(`entry drifted: expected ${EXPECTED_LENGTH} characters, got ${length}`);
  }
  // Any line break, including Unicode separators, would break the single-line gate.
  if (/[\r\n\u0085\u2028\u2029]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

checkEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
