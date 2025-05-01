// components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";          // SSR safety
  const stored = localStorage.getItem("theme");
  if (stored) return stored;                                   // user choice

  // fallback → OS preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Every time `theme` changes: put on <html> and remember it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  /* ⭕️  A pill-style button that reuses the global button rules */
  return (
    <button onClick={toggle} className="theme-toggle-btn">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
