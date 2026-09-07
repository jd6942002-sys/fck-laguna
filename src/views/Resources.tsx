/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "Study Guides",
      description: "Comprehensive study guides for all subjects and difficulty levels.",
      category: "Study Materials",
      link: "/study-guides",
    },
    {
      id: 2,
      title: "Practice Exercises",
      description: "Interactive exercises to reinforce your learning.",
      category: "Practice",
      link: "/practice",
    },
    {
      id: 3,
      title: "Video Tutorials",
      description: "Video lessons explaining key concepts visually.",
      category: "Multimedia",
      link: "/videos",
    },
    {
      id: 4,
      title: "Glossary",
      description: "Definitions and explanations of important terms.",
      category: "Reference",
      link: "/glossary",
    },
    {
      id: 5,
      title: "Community Forum",
      description: "Connect with other learners and ask questions.",
      category: "Community",
      link: "/forum",
    },
    {
      id: 6,
      title: "Accessibility Tools",
      description: "Tools and features to support diverse learning needs.",
      category: "Accessibility",
      link: "/accessibility",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore additional materials to enhance your learning experience
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              to={resource.link}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-4">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {resource.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {resource.description}
              </p>
              <div className="mt-4">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            External Resources
          </h2>
          <div className="space-y-3">
            <a
              href="https://khanacademy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Khan Academy
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Free online courses and lessons
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400">→</span>
            </a>
            <a
              href="https://www.coursera.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Coursera
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Online courses from top universities
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400">→</span>
            </a>
            <a
              href="https://edx.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  edX
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  High-quality courses from leading institutions
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
