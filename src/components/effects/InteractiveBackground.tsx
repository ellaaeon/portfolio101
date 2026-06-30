"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMotion";
import { useMousePosition } from "@/hooks/useMotion";

export default function InteractiveBackground() {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const blob1X = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const blob1Y = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const blob2X = useSpring(useMotionValue(0), { stiffness: 30, damping: 25 });
  const blob2Y = useSpring(useMotionValue(0), { stiffness: 30, damping: 25 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; size: number }[]
  >([]);

  useEffect(() => {
    if (reduced) return;
    const cx = (x / window.innerWidth - 0.5) * 40;
    const cy = (y / window.innerHeight - 0.5) * 40;
    blob1X.set(cx);
    blob1Y.set(cy);
    blob2X.set(-cx * 0.6);
    blob2Y.set(-cy * 0.6);
  }, [x, y, reduced, blob1X, blob1Y, blob2X, blob2Y]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = x;
      const my = y;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.25)";
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [x, y, reduced]);

  if (reduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--bg)" }}
      />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full blur-[100px]"
        style={{
          background: "var(--aurora-1)",
          x: blob1X,
          y: blob1Y,
        }}
      />
      <motion.div
        className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{
          background: "var(--aurora-2)",
          x: blob2X,
          y: blob2Y,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full blur-[120px]"
        style={{ background: "var(--aurora-3)" }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
    </div>
  );
}
