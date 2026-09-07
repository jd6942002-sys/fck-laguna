/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../types";
import { getLessons } from "../lib/apiInterceptor";

interface Test {
  id: number;
  lessonId: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function Tests() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessonsData = await getLessons();
        setLessons(lessonsData);

        // Generate sample tests from lessons
        const sampleTests: Test[] = lessonsData.map((lesson, index) => ({
          id: index + 1,
          lessonId: lesson.id,
          title: `${lesson.title} - Quiz`,
          description: `Test your knowledge of ${lesson.title}`,
          questions: [
            {
              id: 1,
              text: `What is the main topic of ${lesson.title}?`,
              options: [
                "Mathematics",
                "Science",
                lesson.subject,
                "History",
              ],
              correctAnswer: 2,
            },
            {
              id: 2,
              text: `What difficulty level is this lesson?`,
              options: [
                "Beginner",
                "Intermediate",
                "Advanced",
                lesson.difficulty_level,
              ],
              correctAnswer: 3,
            },
          ],
        }));

        setTests(sampleTests);
      } catch (err) {
        console.error("Failed to load tests:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getLessonById = (id: number) => {
    return lessons.find((l) => l.id === id);
  };

  const filteredTests = selectedLesson
    ? tests.filter((t) => t.lessonId === selectedLesson)
    : tests;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">Loading tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tests & Quizzes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Assess your understanding and track your progress
          </p>
        </header>

        {/* Lesson Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filter by Lesson
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedLesson(null)}
              className={`px-4 py-2 rounded-lg ${
                selectedLesson === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              All Lessons
            </button>
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedLesson === lesson.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tests List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Available Tests
          </h2>

          {filteredTests.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No tests available for the selected filter
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTests.map((test) => {
                const lesson = getLessonById(test.lessonId);
                return (
                  <Link
                    key={test.id}
                    to={`/tests/${test.id}`}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {test.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {test.description}
                      </p>
                      {lesson && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Lesson: {lesson.title} - {lesson.subject} - {lesson.difficulty_level}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {test.questions.length} questions
                      </span>
                      <span className="ml-4 text-blue-600 dark:text-blue-400">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
