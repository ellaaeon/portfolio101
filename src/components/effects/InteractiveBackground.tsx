"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion, useMousePosition } from "@/hooks/useMotion";

export default function InteractiveBackground() {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const blob1X = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const blob1Y = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const blob2X = useSpring(useMotionValue(0), { stiffness: 30, damping: 25 });
  const blob2Y = useSpring(useMotionValue(0), { stiffness: 30, damping: 25 });
  const blob3X = useSpring(useMotionValue(0), { stiffness: 25, damping: 30 });
  const blob3Y = useSpring(useMotionValue(0), { stiffness: 25, damping: 30 });
  const lightX = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });
  const lightY = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; size: number; depth: number }[]
  >([]);
  const starsRef = useRef<
    { x: number; y: number; size: number; twinkle: number; speed: number }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = (x / w - 0.5) * 50;
    const cy = (y / h - 0.5) * 50;
    blob1X.set(cx);
    blob1Y.set(cy);
    blob2X.set(-cx * 0.65);
    blob2Y.set(-cy * 0.65);
    blob3X.set(cx * 0.35);
    blob3Y.set(-cy * 0.4);
    lightX.set(x);
    lightY.set(y);
  }, [x, y, reduced, blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y, lightX, lightY]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.4,
        depth: Math.random(),
      }));
      starsRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = x;
      const my = y;
      const time = performance.now() * 0.001;

      for (const star of starsRef.current) {
        star.twinkle += 0.02 * star.speed;
        const opacity = 0.15 + Math.sin(star.twinkle) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
        ctx.fill();
      }

      for (const p of particlesRef.current) {
        const speed = 0.6 + p.depth * 0.8;
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x -= dx * 0.006;
          p.y -= dy * 0.006;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + p.depth), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.12 + p.depth * 0.2})`;
        ctx.fill();
      }

      gridOffset.current = (gridOffset.current + 0.15) % 72;
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";
      ctx.lineWidth = 1;
      const offset = gridOffset.current;
      for (let gx = -offset; gx < canvas.width + 72; gx += 72) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }
      for (let gy = -offset; gy < canvas.height + 72; gy += 72) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
      grad.addColorStop(0, `rgba(99, 102, 241, ${0.06 + Math.sin(time) * 0.02})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      <motion.div
        className="absolute inset-0 opacity-70"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 30%, var(--aurora-1), transparent 50%), radial-gradient(ellipse 60% 50% at 80% 70%, var(--aurora-2), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 50%, var(--aurora-3), transparent 60%), var(--bg)",
            "radial-gradient(ellipse 70% 55% at 30% 60%, var(--aurora-2), transparent 50%), radial-gradient(ellipse 65% 45% at 70% 30%, var(--aurora-1), transparent 50%), radial-gradient(ellipse 55% 45% at 45% 45%, var(--aurora-3), transparent 60%), var(--bg)",
            "radial-gradient(ellipse 80% 60% at 20% 30%, var(--aurora-1), transparent 50%), radial-gradient(ellipse 60% 50% at 80% 70%, var(--aurora-2), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 50%, var(--aurora-3), transparent 60%), var(--bg)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

      <motion.div
        className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{ background: "var(--aurora-1)", x: blob1X, y: blob1Y }}
      />
      <motion.div
        className="absolute -right-32 top-1/2 h-[440px] w-[440px] rounded-full blur-[100px]"
        style={{ background: "var(--aurora-2)", x: blob2X, y: blob2Y }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-[120px]"
        style={{ background: "var(--aurora-3)", x: blob3X, y: blob3Y }}
      />

      <motion.div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          x: lightX,
          y: lightY,
          left: 0,
          top: 0,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--bg) 100%)",
          opacity: 0.5,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(5,5,8,0.4) 100%)",
        }}
      />
    </div>
  );
}
