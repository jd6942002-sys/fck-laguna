/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserPreferences {
  dyslexia: boolean;
  adhd: boolean;
  visualImpairment: boolean;
  hearingImpairment: boolean;
  motorImpairment: boolean;
  autism: boolean;
  anxiety: boolean;
}

export type LearningMode = "dyslexia-friendly" | "audio" | "visual" | "memory";
export type FontSize = "normal" | "large" | "xl";

export interface AccessibilitySettings {
  learningMode: LearningMode;
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  needs: UserPreferences;
  scale?: number;
}

export interface UserProfile {
  user_id: string;
  display_name: string;
  avatar_url?: string;
  onboarding_completed: boolean;
}

export interface Textbook {
  id: number;
  subject: string;
  title: string;
  author: string;
  description: string;
  cover_image_url: string;
  total_chapters: number;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Chapter {
  id: number;
  textbook_id: number;
  chapter_number: number;
  title: string;
  content: string;
}

export interface Lesson {
  id: number;
  subject: string;
  category: string;
  title: string;
  description: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  duration_minutes: number;
  video_id?: string;
  content_text: string;
  learning_objectives: string[];
}

export interface UserProgress {
  lesson_id: number;
  is_completed: boolean;
  score?: number;
  time_spent_minutes?: number;
  last_accessed_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
