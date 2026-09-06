/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import Header from "./components/Header";
import Home from "./views/Home";
import Onboarding from "./views/Onboarding";
import Textbooks from "./views/Textbooks";
import TextbookReader from "./views/TextbookReader";
import Progress from "./views/Progress";
import Resources from "./views/Resources";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Tests from "./views/Tests";
import LessonPage from "./views/LessonPage";
import TwinkleChat from "./components/TwinkleChat";

function AppRoutes() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isOnboarding = location.pathname === "/onboarding";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {!isLogin && !isOnboarding && <Header />}
      <main className={!isLogin && !isOnboarding ? "pb-20" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<Home />} />
          <Route path="/textbooks" element={<Textbooks />} />
          <Route path="/textbooks/:id" element={<TextbookReader />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/lessons/:id" element={<LessonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isLogin && !isOnboarding && <TwinkleChat />}
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AccessibilityProvider>
  );
}
