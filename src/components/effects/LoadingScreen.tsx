"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMotion";

type Particle = { x: number; y: number; tx: number; ty: number; size: number };

export default function LoadingScreen() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(!reduced);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (reduced) return;

    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 400);
      }
    };
    requestAnimationFrame(tick);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const targets: { x: number; y: number }[] = [];
    const letters = ["D", "A"];
    ctx.font = "bold 72px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    letters.forEach((letter, li) => {
      const offsetX = li === 0 ? -36 : 36;
      const metrics = ctx.measureText(letter);
      const w = metrics.width;
      const h = 72;
      const step = 6;
      for (let x = -w / 2; x < w / 2; x += step) {
        for (let y = -h / 2; y < h / 2; y += step) {
          if (ctx.isPointInPath(new Path2D(), cx + offsetX + x, cy + y)) {
            targets.push({ x: cx + offsetX + x, y: cy + y });
          }
        }
      }
      ctx.fillStyle = "#6366f1";
      ctx.fillText(letter, cx + offsetX, cy);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let py = cy - h / 2; py < cy + h / 2; py += step) {
        for (let px = cx + offsetX - w / 2; px < cx + offsetX + w / 2; px += step) {
          const idx = (Math.floor(py) * canvas.width + Math.floor(px)) * 4;
          if (imageData.data[idx + 3] > 128) {
            targets.push({ x: px, y: py });
          }
        }
      }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const count = Math.min(targets.length || 120, 120);
    const picked =
      targets.length > 0
        ? targets
            .sort(() => Math.random() - 0.5)
            .slice(0, count)
        : Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2;
            return { x: cx + Math.cos(angle) * 40, y: cy + Math.sin(angle) * 40 };
          });

    particlesRef.current = picked.map((t) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      tx: t.x,
      ty: t.y,
      size: Math.random() * 2 + 1,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.x += (p.tx - p.x) * 0.06;
        p.y += (p.ty - p.y) * 0.06;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.4 + p.size * 0.2})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(frame);
  }, [reduced, visible]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg)]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <canvas
          ref={canvasRef}
          width={280}
          height={160}
          className="mb-8"
          aria-hidden
        />
        <motion.p
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Danniela Adizas
        </motion.p>
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
          {Math.round(progress)}%
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
