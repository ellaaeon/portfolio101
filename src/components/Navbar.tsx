"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { useEasterEggs } from "@/context/EasterEggContext";
import { useTheme } from "@/context/ThemeContext";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { registerLogoClick, developerMode, unlock } = useEasterEggs();
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
    unlock("lights");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass shadow-lg" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Magnetic strength={0.2}>
          <a
            href="#"
            onClick={registerLogoClick}
            className="font-mono text-lg font-bold tracking-tight"
            data-cursor="link"
          >
            <span className="text-[var(--accent)]">DA</span>
            <span>DEV</span>
            {developerMode && (
              <span className="ml-2 text-[10px] font-normal uppercase tracking-widest text-green-400">
                dev mode
              </span>
            )}
          </a>
        </Magnetic>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--text-muted)] transition-all hover:bg-[var(--border)] hover:text-[var(--text)]"
                data-cursor="link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleThemeToggle}
            className="rounded-full p-2 text-lg"
            aria-label="Toggle theme"
            data-cursor="button"
          >
            {theme === "dark" ? "💡" : "🌙"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2"
            aria-label="Toggle menu"
            data-cursor="button"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-[var(--border)] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
