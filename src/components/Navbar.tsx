"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { useEasterEggs } from "@/context/EasterEggContext";
import { useTheme } from "@/context/ThemeContext";
import { useActiveSection, useScrollDirection } from "@/hooks/useMotion";
import Magnetic from "@/components/ui/Magnetic";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { registerLogoClick, developerMode, unlock } = useEasterEggs();
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(sectionIds);
  const { direction, scrollY } = useScrollDirection();
  const hidden = direction === "down" && scrollY > 120 && !mobileOpen;

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
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed left-0 right-0 top-4 z-40 mx-auto max-w-5xl px-4 transition-all duration-500`}
    >
      <nav
        className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled
            ? "glass shadow-xl shadow-black/10 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
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
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-all ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  data-cursor="link"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Magnetic strength={0.25}>
            <button
              onClick={handleThemeToggle}
              className="rounded-full p-2 text-lg transition-all hover:bg-[var(--border)]"
              aria-label="Toggle theme"
              data-cursor="button"
            >
              {theme === "dark" ? "💡" : "🌙"}
            </button>
          </Magnetic>
        </div>

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
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="mt-2 overflow-hidden rounded-2xl glass shadow-xl backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[var(--text-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text)]"
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
