"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useEasterEggs } from "@/context/EasterEggContext";

export default function LightBulb() {
  const { theme, toggleTheme, bulbSwinging } = useTheme();
  const { unlock } = useEasterEggs();
  const isOn = theme === "light";

  const handleClick = () => {
    toggleTheme();
    unlock("lights");
  };

  return (
    <div className="absolute right-8 top-0 z-20 hidden lg:block">
      <div className="flex flex-col items-center">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-[var(--text-muted)]" />
        <motion.button
          onClick={handleClick}
          className={`group relative ${bulbSwinging ? "bulb-swing" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOn ? "Turn lights off" : "Turn lights on"}
          data-cursor="button"
          data-cursor-text={isOn ? "Lights Off" : "Lights On"}
        >
          <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
            <path
              d="M20 52h8v6a4 4 0 01-8 0v-6z"
              fill={isOn ? "#fbbf24" : "#64748b"}
            />
            <rect x="18" y="48" width="12" height="4" rx="1" fill="#94a3b8" />
            <path
              d="M24 4C14 4 8 14 8 24c0 8 4 14 8 18h16c4-4 8-10 8-18C40 14 34 4 24 4z"
              fill={isOn ? "#fde68a" : "#cbd5e1"}
              stroke={isOn ? "#f59e0b" : "#94a3b8"}
              strokeWidth="1.5"
            />
            <path
              d="M16 28h16M18 34h12M20 40h8"
              stroke={isOn ? "#f59e0b" : "#94a3b8"}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {isOn && (
            <motion.div
              className="absolute -inset-8 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background:
                  "radial-gradient(circle, var(--bulb-glow) 0%, transparent 70%)",
              }}
            />
          )}

          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
            {isOn ? "Click to dim" : "Click to illuminate"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
