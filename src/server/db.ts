/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Textbook, Chapter, Lesson } from "../types.js";
import { SEED_LESSONS } from "./lessons.js";

// Seed Textbooks
export const SEED_TEXTBOOKS: Textbook[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Introduction to Algebra",
    author: "Dr. Sarah Johnson",
    description: "A comprehensive introduction to algebraic concepts and problem-solving techniques.",
    cover_image_url: "/covers/algebra.jpg",
    total_chapters: 12,
    difficulty_level: "Beginner",
  },
  {
    id: 2,
    subject: "Mathematics",
    title: "Advanced Calculus",
    author: "Prof. Michael Chen",
    description: "Deep dive into calculus concepts including limits, derivatives, and integrals.",
    cover_image_url: "/covers/calculus.jpg",
    total_chapters: 15,
    difficulty_level: "Advanced",
  },
  {
    id: 3,
    subject: "Science",
    title: "Basic Physics",
    author: "Dr. Emily Davis",
    description: "Fundamental principles of physics including motion, energy, and matter.",
    cover_image_url: "/covers/physics.jpg",
    total_chapters: 10,
    difficulty_level: "Intermediate",
  },
  {
    id: 4,
    subject: "Literature",
    title: "Classic Literature Collection",
    author: "Various Authors",
    description: "A curated collection of classic literary works with analysis and context.",
    cover_image_url: "/covers/literature.jpg",
    total_chapters: 8,
    difficulty_level: "Intermediate",
  },
];

// Seed Chapters
export const SEED_CHAPTERS: Chapter[] = [
  // Algebra textbook chapters
  {
    id: 1,
    textbook_id: 1,
    chapter_number: 1,
    title: "Introduction to Variables",
    content: "In this chapter, we will learn about variables and expressions...",
  },
  {
    id: 2,
    textbook_id: 1,
    chapter_number: 2,
    title: "Solving Linear Equations",
    content: "Linear equations are equations that form a straight line...",
  },
  {
    id: 3,
    textbook_id: 1,
    chapter_number: 3,
    title: "Working with Inequalities",
    content: "Inequalities compare two values, showing if one is less than, greater than...",
  },
  // Calculus textbook chapters
  {
    id: 4,
    textbook_id: 2,
    chapter_number: 1,
    title: "Understanding Limits",
    content: "A limit describes the value that a function approaches as the input...",
  },
  {
    id: 5,
    textbook_id: 2,
    chapter_number: 2,
    title: "Derivatives and Rates of Change",
    content: "The derivative measures how a function changes as its input changes...",
  },
  // Physics textbook chapters
  {
    id: 6,
    textbook_id: 3,
    chapter_number: 1,
    title: "Motion and Forces",
    content: "Newton's laws of motion describe the relationship between motion and forces...",
  },
  {
    id: 7,
    textbook_id: 3,
    chapter_number: 2,
    title: "Energy and Work",
    content: "Energy is the capacity to do work. Work is done when a force acts upon an object...",
  },
  // Literature textbook chapters
  {
    id: 8,
    textbook_id: 4,
    chapter_number: 1,
    title: "The Renaissance Period",
    content: "The Renaissance was a period of great cultural and intellectual growth...",
  },
  {
    id: 9,
    textbook_id: 4,
    chapter_number: 2,
    title: "Shakespeare's Works",
    content: "William Shakespeare is widely regarded as the greatest writer in the English language...",
  },
];

// Re-export lessons from lessons.ts
export { SEED_LESSONS };
