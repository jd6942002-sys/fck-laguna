/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Sparkle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your personalized learning platform with AI-powered tutoring.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/textbooks"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Textbooks
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse our collection of educational textbooks and learning materials.
            </p>
          </Link>

          <Link
            to="/lessons/1"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Lessons
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access interactive lessons with step-by-step guidance.
            </p>
          </Link>

          <Link
            to="/progress"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track your learning journey and achievements.
            </p>
          </Link>

          <Link
            to="/resources"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore additional learning resources and materials.
            </p>
          </Link>

          <Link
            to="/tests"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Tests
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Take quizzes and tests to assess your understanding.
            </p>
          </Link>

          <Link
            to="/settings"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your learning experience and accessibility options.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
