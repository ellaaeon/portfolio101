"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { EasterEggProvider } from "@/context/EasterEggContext";
import InteractiveBackground from "@/components/effects/InteractiveBackground";
import CustomCursor from "@/components/effects/CustomCursor";
import SmoothScroll from "@/components/effects/SmoothScroll";
import LoadingScreen from "@/components/effects/LoadingScreen";
import FloatingCube from "@/components/effects/FloatingCube";
import AchievementToast from "@/components/ui/AchievementToast";
import { useEffect } from "react";
import { useIsTouchDevice } from "@/hooks/useMotion";

function CursorBodyClass() {
  const touch = useIsTouchDevice();

  useEffect(() => {
    if (!touch) document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, [touch]);

  return null;
}

function DevConsoleMessage() {
  useEffect(() => {
    console.log(
      "%c👋 Hey there, curious developer!",
      "color: #6366f1; font-size: 16px; font-weight: bold;"
    );
    console.log(
      "%cTry the Konami code ↑↑↓↓←→←→BA for Developer Mode",
      "color: #a855f7; font-size: 12px;"
    );
    console.log(
      "%cType 'hello' anywhere for a surprise wave",
      "color: #94a3b8; font-size: 11px;"
    );
  }, []);

  return null;
}

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <EasterEggProvider>
        <CursorBodyClass />
        <DevConsoleMessage />
        <LoadingScreen />
        <SmoothScroll />
        <InteractiveBackground />
        <CustomCursor />
        <FloatingCube />
        <AchievementToast />
        {children}
      </EasterEggProvider>
    </ThemeProvider>
  );
}
