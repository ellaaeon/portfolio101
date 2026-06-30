"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { EasterEggProvider } from "@/context/EasterEggContext";
import InteractiveBackground from "@/components/effects/InteractiveBackground";
import CustomCursor from "@/components/effects/CustomCursor";
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

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <EasterEggProvider>
        <CursorBodyClass />
        <InteractiveBackground />
        <CustomCursor />
        <AchievementToast />
        {children}
      </EasterEggProvider>
    </ThemeProvider>
  );
}
