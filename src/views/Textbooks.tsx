/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";
import { Textbook } from "../types.js";

export default function Textbooks() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/textbooks")
      .then(r => r.json())
      .then(data => {
        setTextbooks(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading textbooks...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        <Book className="text-indigo-600" /> Textbooks
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Explore our collection of accessible learning materials.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {textbooks.map(tb => (
          <Link
            key={tb.id}
            to={`/textbooks/${tb.id}`}
            className="block bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="h-40 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl">
              📚
            </div>
            <div className="p-5">
              <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1">{tb.subject}</div>
              <h2 className="font-bold text-lg mb-1">{tb.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{tb.description}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{tb.total_chapters} chapters</span>
                <span>{tb.difficulty_level}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {textbooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">No textbooks available yet.</div>
      )}
    </div>
  );
}
