/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Textbook, Chapter } from "../types";
import { getTextbookById, getChaptersByTextbookId } from "../lib/apiInterceptor";

export default function TextbookReader() {
  const { id } = useParams<{ id: string }>();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const textbookId = parseInt(id);
        const textbookData = await getTextbookById(textbookId);
        const chaptersData = await getChaptersByTextbookId(textbookId);

        setTextbook(textbookData);
        setChapters(chaptersData);

        // Select first chapter by default
        if (chaptersData.length > 0) {
          setSelectedChapter(chaptersData[0]);
        }
      } catch (err) {
        console.error("Failed to load textbook:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">Loading textbook...</p>
        </div>
      </div>
    );
  }

  if (!textbook) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            Textbook not found
          </p>
          <Link
            to="/textbooks"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block"
          >
            Back to Textbooks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <Link
            to="/textbooks"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center"
          >
            ← Back to Textbooks
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {textbook.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            by {textbook.author} - {textbook.difficulty_level}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {textbook.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chapters
              </h2>
              <nav className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedChapter?.id === chapter.id
                        ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-500"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      Chapter {chapter.chapter_number}: {chapter.title}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Chapter Content */}
          <div className="lg:col-span-3">
            {selectedChapter ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Chapter {selectedChapter.chapter_number}: {selectedChapter.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedChapter.content}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Select a chapter to read
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
