"use client";

import { useEffect, useRef } from "react";
import { useEasterEggs } from "@/context/EasterEggContext";

export default function SectionObserver({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { visitSection } = useEasterEggs();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visitSection(id);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, visitSection]);

  return (
    <section ref={ref} id={id}>
      {children}
    </section>
  );
}
