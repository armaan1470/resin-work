"use client";
import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function SmoothScroll({ children }: SmoothScrollProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [duration, setDuration] = useState(1.5);
  const [lerp, setLerp] = useState(0.1);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("smooth-scroll-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsEnabled(settings.isEnabled ?? true);
      setDuration(settings.duration ?? 1.5);
      setLerp(settings.lerp ?? 0.1);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = { isEnabled, duration, lerp };
    localStorage.setItem("smooth-scroll-settings", JSON.stringify(settings));
  }, [isEnabled, duration, lerp]);

  const handleToggleSmooth = () => {
    setIsEnabled(!isEnabled);
  };

  const handleDurationChange = (value: number) => {
    setDuration(value);
  };

  const handleLerpChange = (value: number) => {
    setLerp(value);
  };

  const resetToDefaults = () => {
    setIsEnabled(true);
    setDuration(1.5);
    setLerp(0.1);
  };

  return (
    <>
      {isEnabled ? (
        <ReactLenis root options={{ lerp, duration, smoothWheel: true }}>
          {children}
        </ReactLenis>
      ) : (
        <>{children}</>
      )}

      {/* Control Panel */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Gear Icon Button */}
        <button
          onClick={() => setIsControlPanelOpen(!isControlPanelOpen)}
          className={`
            w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
            text-white shadow-lg hover:shadow-xl transition-all duration-300 
            flex items-center justify-center group hover:scale-110
            ${isControlPanelOpen ? "rotate-180" : "hover:rotate-90"}
          `}
          aria-label="Toggle smooth scroll controls"
        >
          {isControlPanelOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          )}
        </button>

        {/* Control Panel */}
        <div
          className={`
            absolute bottom-16 right-0 w-80 bg-white/95 dark:bg-gray-900/95 
            backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 
            dark:border-gray-700/50 p-6 transition-all duration-300 origin-bottom-right
            ${
              isControlPanelOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Smooth Scroll Controls
              </h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isEnabled ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isEnabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Smooth Scroll
              </label>
              <button
                onClick={handleToggleSmooth}
                className={`
                  relative w-12 h-6 rounded-full transition-colors duration-200
                  ${isEnabled ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}
                `}
              >
                <div
                  className={`
                    absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                    transition-transform duration-200
                    ${isEnabled ? "translate-x-6" : "translate-x-0.5"}
                  `}
                />
              </button>
            </div>

            {/* Duration Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {duration.toFixed(1)}s
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={duration}
                onChange={(e) =>
                  handleDurationChange(parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer 
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br 
                          [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600 
                          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md 
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200
                          [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg
                          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
                          [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-blue-500 
                          [&::-moz-range-thumb]:to-purple-600 [&::-moz-range-thumb]:cursor-pointer 
                          [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md
                          disabled:[&::-webkit-slider-thumb]:bg-gray-400 disabled:[&::-webkit-slider-thumb]:cursor-not-allowed
                          disabled:[&::-moz-range-thumb]:bg-gray-400 disabled:[&::-moz-range-thumb]:cursor-not-allowed"
                disabled={!isEnabled}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Fast (0.5s)</span>
                <span>Slow (3s)</span>
              </div>
            </div>

            {/* Lerp (Speed) Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Smoothness
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {lerp.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.3"
                step="0.01"
                value={lerp}
                onChange={(e) => handleLerpChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer 
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br 
                          [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600 
                          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md 
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200
                          [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg
                          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
                          [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-blue-500 
                          [&::-moz-range-thumb]:to-purple-600 [&::-moz-range-thumb]:cursor-pointer 
                          [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md
                          disabled:[&::-webkit-slider-thumb]:bg-gray-400 disabled:[&::-webkit-slider-thumb]:cursor-not-allowed
                          disabled:[&::-moz-range-thumb]:bg-gray-400 disabled:[&::-moz-range-thumb]:cursor-not-allowed"
                disabled={!isEnabled}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Smooth (0.01)</span>
                <span>Snappy (0.3)</span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToDefaults}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                       dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg 
                       transition-colors duration-200 text-sm font-medium"
              disabled={!isEnabled}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SmoothScroll;
