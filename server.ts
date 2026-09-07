/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Import and serve seed data for client fallback
let seedData: any = null;
try {
  const fs = await import("fs/promises");
  const data = await fs.readFile(path.join(__dirname, "sparkle_db.json"), "utf-8");
  seedData = JSON.parse(data);
} catch (err) {
  console.warn("No sparkle_db.json found, using empty data");
  seedData = { textbooks: [], textbook_chapters: [], lessons: [] };
}

// API endpoint for textbooks
app.get("/api/textbooks", (req, res) => {
  res.json(seedData.textbooks || []);
});

// API endpoint for chapters
app.get("/api/chapters", (req, res) => {
  res.json(seedData.textbook_chapters || []);
});

// API endpoint for lessons
app.get("/api/lessons", (req, res) => {
  res.json(seedData.lessons || []);
});

// API endpoint for a specific lesson
app.get("/api/lessons/:id", (req, res) => {
  const lesson = seedData.lessons?.find((l: any) => l.id === parseInt(req.params.id));
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ error: "Lesson not found" });
  }
});

// API endpoint for a specific textbook
app.get("/api/textbooks/:id", (req, res) => {
  const textbook = seedData.textbooks?.find((t: any) => t.id === parseInt(req.params.id));
  if (textbook) {
    res.json(textbook);
  } else {
    res.status(404).json({ error: "Textbook not found" });
  }
});

// API endpoint for chapters of a specific textbook
app.get("/api/textbooks/:id/chapters", (req, res) => {
  const chapters = seedData.textbook_chapters?.filter(
    (c: any) => c.textbook_id === parseInt(req.params.id)
  );
  res.json(chapters || []);
});

// Serve index.html for all other routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
