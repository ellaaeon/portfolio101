"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { achievements } from "@/data/portfolio";

type EasterEggContextValue = {
  unlocked: Set<string>;
  unlock: (id: string) => void;
  developerMode: boolean;
  helloWave: boolean;
  showSecretProject: boolean;
  logoClicks: number;
  registerLogoClick: () => void;
  sectionsVisited: Set<string>;
  visitSection: (id: string) => void;
  toast: { title: string; icon: string } | null;
  dismissToast: () => void;
};

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [developerMode, setDeveloperMode] = useState(false);
  const [helloWave, setHelloWave] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [sectionsVisited, setSectionsVisited] = useState<Set<string>>(
    new Set()
  );
  const [toast, setToast] = useState<{ title: string; icon: string } | null>(
    null
  );
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [helloBuffer, setHelloBuffer] = useState("");

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      const achievement = achievements.find((a) => a.id === id);
      if (achievement) {
        setToast({ title: achievement.title, icon: achievement.icon });
        window.setTimeout(() => setToast(null), 3500);
      }
      return next;
    });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const registerLogoClick = useCallback(() => {
    setLogoClicks((c) => {
      const next = c + 1;
      if (next >= 5) unlock("logo");
      return next;
    });
  }, [unlock]);

  const visitSection = useCallback(
    (id: string) => {
      setSectionsVisited((prev) => {
        const next = new Set(prev);
        next.add(id);
        const required = ["about", "dashboard", "experience", "projects", "skills", "contact"];
        if (required.every((s) => next.has(s))) unlock("explorer");
        return next;
      });
    },
    [unlock]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (KONAMI[konamiIndex] === e.code) {
        const next = konamiIndex + 1;
        if (next === KONAMI.length) {
          setDeveloperMode(true);
          unlock("konami");
          setKonamiIndex(0);
        } else {
          setKonamiIndex(next);
        }
      } else {
        setKonamiIndex(e.code === KONAMI[0] ? 1 : 0);
      }

      if (e.key.length === 1) {
        const buffer = (helloBuffer + e.key).slice(-5).toLowerCase();
        setHelloBuffer(buffer);
        if (buffer === "hello") {
          setHelloWave(true);
          unlock("hello");
          window.setTimeout(() => setHelloWave(false), 3000);
          setHelloBuffer("");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [konamiIndex, helloBuffer, unlock]);

  const showSecretProject = useMemo(
    () => unlocked.size >= achievements.length,
    [unlocked]
  );

  return (
    <EasterEggContext.Provider
      value={{
        unlocked,
        unlock,
        developerMode,
        helloWave,
        showSecretProject,
        logoClicks,
        registerLogoClick,
        sectionsVisited,
        visitSection,
        toast,
        dismissToast,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(EasterEggContext);
  if (!ctx) throw new Error("useEasterEggs must be used within EasterEggProvider");
  return ctx;
}
