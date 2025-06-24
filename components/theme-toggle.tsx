"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering only after mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={handleToggle}
      className="z-[10] fixed bottom-4 left-4 size-12 rounded-full bg-[var(--toggle-bg-color)] backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative">
        {/* Sun/Moon Icon */}
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[2rem] w-[2rem] text-amber-300 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              fill="currentColor"
              d="M21 12.79A9 9 0 0111.21 3c-.29 0-.57.02-.85.05A7 7 0 1019 13.64c.03-.28.05-.56.05-.85z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[2rem] w-[2rem] text-yellow-500 transition-transform duration-300 group-hover:rotate-[360deg]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}

        {/* Tooltip */}
        <div className="absolute top-1/2 left-[130%] ml-2 -translate-y-1/2 overflow-hidden w-0 group-hover:w-[140px] transition-all duration-300 ease-out">
          <div className="bg-brand text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 whitespace-nowrap">
            {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
