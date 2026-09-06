/**
 * Generates the static `sparkle_db.json` snapshot used by the client-side
 * fallback interceptor (src/lib/apiInterceptor.ts).
 *
 * The snapshot intentionally contains ONLY the read-only seed content
 * (textbooks, chapters, lessons) — never user profiles or progress, which
 * live in the in-memory/JSON store on the server side instead.
 *
 * Run via: `npm run db:generate`  (also runs automatically on `npm run dev`)
 */

import fs from "fs";
import path from "path";
import { SEED_TEXTBOOKS, SEED_CHAPTERS, SEED_LESSONS } from "../src/server/db.js";

const snapshot = {
  textbooks: SEED_TEXTBOOKS,
  textbook_chapters: SEED_CHAPTERS,
  lessons: SEED_LESSONS,
};

const target = path.join(process.cwd(), "sparkle_db.json");

try {
  fs.writeFileSync(target, JSON.stringify(snapshot, null, 2) + "\n", "utf-8");
  console.log(
    `[generate-db] Wrote ${target} (${snapshot.textbooks.length} textbooks, ${snapshot.textbook_chapters.length} chapters, ${snapshot.lessons.length} lessons).`
  );
} catch (err) {
  console.error("[generate-db] Failed to write sparkle_db.json:", err);
  process.exit(1);
}
