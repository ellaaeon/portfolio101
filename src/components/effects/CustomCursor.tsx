"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/useMotion";

type TrailDot = { x: number; y: number; life: number };

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const touch = useIsTouchDevice();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailDot[]>([]);
  const glowPos = useRef({ x: -100, y: -100 });
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const trail = trailRef.current;
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > 6) trail.shift();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      const type = el?.dataset.cursor ?? "default";
      const text = el?.dataset.cursorText ?? "";

      if (ringRef.current) {
        const size =
          type === "button" ? 64 : type === "link" ? 52 : type === "card" ? 72 : 40;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = type === "default" ? "0.35" : "0.75";
        ringRef.current.style.borderWidth = type === "button" ? "2px" : "1px";
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

    const onClick = (e: MouseEvent) => {
      const container = rippleContainerRef.current;
      if (!container) return;

      const ripple = document.createElement("div");
      ripple.className =
        "pointer-events-none absolute rounded-full border border-[var(--accent)]";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.opacity = "0.5";
      ripple.style.transition =
        "width 0.55s ease-out, height 0.55s ease-out, opacity 0.55s ease-out";
      container.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.width = "72px";
        ripple.style.height = "72px";
        ripple.style.opacity = "0";
      });

      window.setTimeout(() => ripple.remove(), 600);
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let frame: number;
    const tick = () => {
      const tx = cursorX.get();
      const ty = cursorY.get();

      glowPos.current.x += (tx - glowPos.current.x) * 0.22;
      glowPos.current.y += (ty - glowPos.current.y) * 0.22;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const trail = trailRef.current;
        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].life -= 0.14;
          if (trail[i].life <= 0) {
            trail.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, 2 * trail[i].life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${trail[i].life * 0.35})`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [reduced, touch, cursorX, cursorY]);

  if (reduced || touch) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-28 w-28 rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden
      />

      <div
        ref={rippleContainerRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden
      />

      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[var(--accent)] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
        }}
      />

      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.span
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-0 will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateY: 36,
        }}
      />
    </>
  );
}
