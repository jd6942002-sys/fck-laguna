/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lesson, UserProgress } from "../types";
import { getLessons } from "../lib/apiInterceptor";

export default function Progress() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessonsData = await getLessons();
        setLessons(lessonsData);
        
        // Load progress from localStorage (demo mode)
        const savedProgress = localStorage.getItem("userProgress");
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      } catch (err) {
        console.error("Failed to load progress data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getProgressForLesson = (lessonId: number) => {
    return progress.find((p) => p.lesson_id === lessonId);
  };

  const calculateOverallProgress = () => {
    if (lessons.length === 0) return 0;
    const completed = progress.filter((p) => p.is_completed).length;
    return Math.round((completed / lessons.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Learning Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your journey and achievements
          </p>
        </header>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Overall Progress
          </h2>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {calculateOverallProgress()}% complete - {progress.filter((p) => p.is_completed).length} of {lessons.length} lessons completed
          </p>
        </div>

        {/* Lesson Progress List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Lesson Progress
          </h2>
          
          {lessons.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No lessons available
            </p>
          ) : (
            <div className="space-y-4">
              {lessons.map((lesson) => {
                const lessonProgress = getProgressForLesson(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    to={`/lessons/${lesson.id}`}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lesson.subject} - {lesson.difficulty_level}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {lessonProgress?.is_completed ? (
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                          Completed
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Not started
                        </span>
                      )}
                      {lessonProgress?.score && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Score: {lessonProgress.score}%
                        </span>
                      )}
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
