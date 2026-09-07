/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * API Interceptor for client-side data fetching.
 * This provides a fallback mechanism when running in client-only mode
 * without a server backend.
 */

import { Lesson, Textbook, Chapter } from "../types.js";

// In-memory cache for seed data
let cachedData: {
  textbooks: Textbook[];
  textbook_chapters: Chapter[];
  lessons: Lesson[];
} | null = null;

/**
 * Fetch seed data from the server or fallback to local storage
 */
async function fetchSeedData(): Promise<{
  textbooks: Textbook[];
  textbook_chapters: Chapter[];
  lessons: Lesson[];
}> {
  // Try to fetch from server API first
  try {
    const [textbooksRes, chaptersRes, lessonsRes] = await Promise.all([
      fetch("/api/textbooks"),
      fetch("/api/chapters"),
      fetch("/api/lessons"),
    ]);

    if (textbooksRes.ok && chaptersRes.ok && lessonsRes.ok) {
      const textbooks = await textbooksRes.json();
      const chapters = await chaptersRes.json();
      const lessons = await lessonsRes.json();
      return { textbooks, textbook_chapters: chapters, lessons };
    }
  } catch (err) {
    console.warn("Failed to fetch from server API:", err);
  }

  // Fallback: Try to load from sparkle_db.json
  try {
    const response = await fetch("/sparkle_db.json");
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Failed to load sparkle_db.json:", err);
  }

  // Final fallback: Return empty arrays
  return { textbooks: [], textbook_chapters: [], lessons: [] };
}

/**
 * Get seed data, using cache when available
 */
export async function getSeedData() {
  if (cachedData) {
    return cachedData;
  }
  cachedData = await fetchSeedData();
  return cachedData;
}

/**
 * Refresh the cached seed data
 */
export async function refreshSeedData() {
  cachedData = await fetchSeedData();
  return cachedData;
}

/**
 * Individual data fetchers for convenience
 */
export async function getTextbooks(): Promise<Textbook[]> {
  const data = await getSeedData();
  return data.textbooks;
}

export async function getChapters(): Promise<Chapter[]> {
  const data = await getSeedData();
  return data.textbook_chapters;
}

export async function getLessons(): Promise<Lesson[]> {
  const data = await getSeedData();
  return data.lessons;
}

export async function getLessonById(id: number): Promise<Lesson | null> {
  const lessons = await getLessons();
  return lessons.find((l) => l.id === id) || null;
}

export async function getTextbookById(id: number): Promise<Textbook | null> {
  const textbooks = await getTextbooks();
  return textbooks.find((t) => t.id === id) || null;
}

export async function getChaptersByTextbookId(textbookId: number): Promise<Chapter[]> {
  const chapters = await getChapters();
  return chapters.filter((c) => c.textbook_id === textbookId);
}

// Initialize the cache on module load
getSeedData().catch(console.error);
