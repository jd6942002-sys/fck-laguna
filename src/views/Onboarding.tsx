/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessibility } from "../context/AccessibilityContext";
import { UserPreferences } from "../types.js";

const needsOptions = [
  { key: "dyslexia", label: "Dyslexia", desc: "Special fonts and syllable coloring" },
  { key: "adhd", label: "ADHD", desc: "Focus mode and reduced distractions" },
  { key: "visualImpairment", label: "Visual Impairment", desc: "Larger text and high contrast" },
  { key: "hearingImpairment", label: "Hearing Impairment", desc: "Captions and visual cues" },
  { key: "motorImpairment", label: "Motor Impairment", desc: "Keyboard-friendly navigation" },
  { key: "autism", label: "Autism", desc: "Predictable layouts and calm colors" },
  { key: "anxiety", label: "Anxiety", desc: "Gentle guidance and reduced pressure" },
] as const;

export default function Onboarding() {
  const navigate = useNavigate();
  const { setNeeds, setLearningMode, saveSettings } = useAccessibility();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<UserPreferences>({
    dyslexia: false, adhd: false, visualImpairment: false,
    hearingImpairment: false, motorImpairment: false, autism: false, anxiety: false,
  });

  const toggle = (key: keyof UserPreferences) => {
    setSelected(s => ({ ...s, [key]: !s[key] }));
  };

  const finish = async () => {
    setNeeds(selected);
    if (selected.dyslexia) setLearningMode("dyslexia-friendly");
    else if (selected.adhd) setLearningMode("visual");
    await saveSettings();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {step === 0 && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">Welcome to Sparkle ✨</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Let's personalize your learning experience. This only takes a minute.</p>
            <button onClick={() => setStep(1)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">
              Get Started
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">What helps you learn best?</h2>
            <p className="text-sm text-gray-500 mb-4">Select all that apply. You can change these later in Settings.</p>
            <div className="space-y-3 mb-6">
              {needsOptions.map(opt => (
                <label key={opt.key} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selected[opt.key] ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"
                }`}>
                  <input type="checkbox" checked={selected[opt.key]} onChange={() => toggle(opt.key)} className="mt-1" />
                  <div>
                    <div className="font-medium">{opt.label}</div>
                    <div className="text-sm text-gray-500">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={finish} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">
              Finish Setup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
