/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { AccessibilitySettings, LearningMode, FontSize, UserPreferences } from "../types.js";
import { supabase, isSupabaseConfigured, handleSupabaseError, OperationType } from "../lib/supabase.js";

interface AccessibilityContextProps {
  settings: AccessibilitySettings;
  setLearningMode: (mode: LearningMode) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setDarkMode: (v: boolean) => void;
  setNeeds: (needs: UserPreferences) => void;
  setScale: (scale: number) => void;
  saveSettings: () => Promise<void>;
}

const defaultSettings: AccessibilitySettings = {
  learningMode: "visual",
  fontSize: "normal",
  highContrast: false,
  reducedMotion: false,
  darkMode: false,
  needs: {
    dyslexia: false,
    adhd: false,
    visualImpairment: false,
    hearingImpairment: false,
    motorImpairment: false,
    autism: false,
    anxiety: false,
  },
  scale: 1,
};

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem("sparkle_accessibility");
      if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
    } catch {}
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("sparkle_accessibility", JSON.stringify(settings));
    document.documentElement.classList.toggle("dark", settings.darkMode);
    document.documentElement.classList.toggle("high-contrast", settings.highContrast);
    document.documentElement.style.fontSize = settings.fontSize === "xl" ? "120%" : settings.fontSize === "large" ? "110%" : "100%";
    if (settings.needs.dyslexia) {
      document.body.classList.add("font-dyslexic");
    } else {
      document.body.classList.remove("font-dyslexic");
    }
  }, [settings]);

  const setLearningMode = (mode: LearningMode) => setSettings(s => ({ ...s, learningMode: mode }));
  const setFontSize = (size: FontSize) => setSettings(s => ({ ...s, fontSize: size }));
  const setHighContrast = (v: boolean) => setSettings(s => ({ ...s, highContrast: v }));
  const setReducedMotion = (v: boolean) => setSettings(s => ({ ...s, reducedMotion: v }));
  const setDarkMode = (v: boolean) => setSettings(s => ({ ...s, darkMode: v }));
  const setNeeds = (needs: UserPreferences) => setSettings(s => ({ ...s, needs }));
  const setScale = (scale: number) => setSettings(s => ({ ...s, scale }));

  const saveSettings = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user.id,
        display_name: user.user_metadata?.display_name || "Learner",
        has_dyslexia: settings.needs.dyslexia,
        has_adhd: settings.needs.adhd,
        has_visual_impairment: settings.needs.visualImpairment,
        has_hearing_impairment: settings.needs.hearingImpairment,
        has_motor_impairment: settings.needs.motorImpairment,
        has_autism: settings.needs.autism,
        has_anxiety: settings.needs.anxiety,
        preferred_learning_mode: settings.learningMode,
        font_size_preference: settings.fontSize,
        high_contrast: settings.highContrast,
        reduced_motion: settings.reducedMotion,
        dark_mode: settings.darkMode,
        onboarding_completed: true,
      });
      if (error) throw error;
    } catch (e) {
      handleSupabaseError(e, OperationType.UPDATE, "user_profiles");
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      setLearningMode,
      setFontSize,
      setHighContrast,
      setReducedMotion,
      setDarkMode,
      setNeeds,
      setScale,
      saveSettings,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
