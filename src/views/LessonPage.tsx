/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Lesson, UserProgress } from "../types";
import { getLessonById } from "../lib/apiInterceptor";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "content" | "objectives">("overview");

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const lessonId = parseInt(id);
        const lessonData = await getLessonById(lessonId);

        setLesson(lessonData);

        // Load progress from localStorage
        const savedProgress = localStorage.getItem("userProgress");
        if (savedProgress) {
          const allProgress: UserProgress[] = JSON.parse(savedProgress);
          const lessonProgress = allProgress.find((p) => p.lesson_id === lessonId);
          setProgress(lessonProgress || null);
        }
      } catch (err) {
        console.error("Failed to load lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const markAsComplete = () => {
    if (!lesson || !id) return;

    const lessonId = parseInt(id);
    const newProgress: UserProgress = {
      lesson_id: lessonId,
      is_completed: true,
      score: 100,
      time_spent_minutes: lesson.duration_minutes,
      last_accessed_at: new Date().toISOString(),
    };

    setProgress(newProgress);

    // Save to localStorage
    const savedProgress = localStorage.getItem("userProgress");
    const allProgress: UserProgress[] = savedProgress ? JSON.parse(savedProgress) : [];
    const existingIndex = allProgress.findIndex((p) => p.lesson_id === lessonId);

    if (existingIndex >= 0) {
      allProgress[existingIndex] = newProgress;
    } else {
      allProgress.push(newProgress);
    }

    localStorage.setItem("userProgress", JSON.stringify(allProgress));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            Lesson not found
          </p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block"
          >
            Back to Home
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
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
              {lesson.subject}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm">
              {lesson.difficulty_level}
            </span>
            {lesson.duration_minutes && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm">
                {lesson.duration_minutes} min
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {lesson.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {lesson.description}
          </p>
        </header>

        {/* Progress Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Progress
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {progress?.is_completed
                  ? "Completed"
                  : "Not started"}
              </p>
            </div>
            <button
              onClick={markAsComplete}
              disabled={progress?.is_completed}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                progress?.is_completed
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {progress?.is_completed ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>
          {progress?.score && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Score:
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {progress.score}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-8 p-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 border-b-2 ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                    : "border-transparent text-gray-500 dark:text-gray-400"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`pb-2 border-b-2 ${
                  activeTab === "content"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                    : "border-transparent text-gray-500 dark:text-gray-400"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("objectives")}
                className={`pb-2 border-b-2 ${
                  activeTab === "objectives"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                    : "border-transparent text-gray-500 dark:text-gray-400"
                }`}
              >
                Learning Objectives
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Lesson Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This lesson covers the fundamental concepts of {lesson.title}.
                  It is designed for {lesson.difficulty_level.toLowerCase()} learners
                  and takes approximately {lesson.duration_minutes} minutes to complete.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Category
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {lesson.category}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Lesson Content
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {lesson.content_text}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "objectives" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Objectives
                </h2>
                {lesson.learning_objectives.length > 0 ? (
                  <ul className="space-y-3">
                    {lesson.learning_objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="w-6 h-6 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {objective}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No learning objectives defined for this lesson.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
