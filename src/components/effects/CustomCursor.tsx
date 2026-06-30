"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/useMotion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const touch = useIsTouchDevice();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 });
  const labelRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      const type = el?.dataset.cursor ?? "default";
      const text = el?.dataset.cursorText ?? "";

      if (ringRef.current) {
        ringRef.current.style.width =
          type === "button" ? "56px" : type === "link" ? "48px" : "36px";
        ringRef.current.style.height =
          type === "button" ? "56px" : type === "link" ? "48px" : "36px";
        ringRef.current.style.opacity = type === "default" ? "0.4" : "0.7";
      }

      if (dotRef.current) {
        dotRef.current.style.transform =
          type === "button" ? "scale(0)" : "scale(1)";
      }

      if (labelRef.current) {
        labelRef.current.textContent = text;
        labelRef.current.style.opacity = text ? "1" : "0";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, [reduced, touch, cursorX, cursorY]);

  if (reduced || touch) return null;

  return (
    <>
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[var(--accent)] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
        }}
      />
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.span
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-0 transition-opacity"
        style={{
          x: springX,
          y: springY,
          translateY: 28,
        }}
      />
    </>
  );
}
