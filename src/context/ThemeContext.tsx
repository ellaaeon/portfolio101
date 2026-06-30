"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  swingBulb: () => void;
  bulbSwinging: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [bulbSwinging, setBulbSwinging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  const swingBulb = useCallback(() => {
    setBulbSwinging(true);
    window.setTimeout(() => setBulbSwinging(false), 800);
  }, []);

  const toggleTheme = useCallback(() => {
    swingBulb();
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [swingBulb]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, swingBulb, bulbSwinging }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
