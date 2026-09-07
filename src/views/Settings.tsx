/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { AccessibilitySettings, LearningMode, FontSize } from "../types";

export default function Settings() {
  const { settings, updateSettings } = useContext(AccessibilityContext);
  const [tempSettings, setTempSettings] = useState<AccessibilitySettings>(settings);

  const handleSave = () => {
    updateSettings(tempSettings);
  };

  const handleReset = () => {
    setTempSettings(settings);
  };

  const learningModes: { value: LearningMode; label: string; description: string }[] = [
    {
      value: "dyslexia-friendly",
      label: "Dyslexia Friendly",
      description: "Optimized for readers with dyslexia",
    },
    {
      value: "audio",
      label: "Audio Mode",
      description: "Text-to-speech enabled",
    },
    {
      value: "visual",
      label: "Visual Mode",
      description: "Enhanced visual aids and diagrams",
    },
    {
      value: "memory",
      label: "Memory Mode",
      description: "Simplified interface for better focus",
    },
  ];

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: "normal", label: "Normal" },
    { value: "large", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your learning experience
          </p>
        </header>

        <div className="space-y-6">
          {/* Learning Mode */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Learning Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() =>
                    setTempSettings({ ...tempSettings, learningMode: mode.value })
                  }
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    tempSettings.learningMode === mode.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {mode.label}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {mode.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility
            </h2>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Font Size
                </h3>
                <div className="flex gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() =>
                        setTempSettings({ ...tempSettings, fontSize: size.value })
                      }
                      className={`px-4 py-2 rounded-lg ${
                        tempSettings.fontSize === size.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      High Contrast
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Increase color contrast for better visibility
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setTempSettings({
                        ...tempSettings,
                        highContrast: !tempSettings.highContrast,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors flex items-center justify-${
                      tempSettings.highContrast ? "end" : "start"
                    } ${
                      tempSettings.highContrast
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        tempSettings.highContrast ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Reduced Motion
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reduce animations and transitions
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setTempSettings({
                        ...tempSettings,
                        reducedMotion: !tempSettings.reducedMotion,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors flex items-center justify-${
                      tempSettings.reducedMotion ? "end" : "start"
                    } ${
                      tempSettings.reducedMotion
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        tempSettings.reducedMotion ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use dark theme for low light conditions
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setTempSettings({
                        ...tempSettings,
                        darkMode: !tempSettings.darkMode,
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors flex items-center justify-${
                      tempSettings.darkMode ? "end" : "start"
                    } ${
                      tempSettings.darkMode
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        tempSettings.darkMode ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
