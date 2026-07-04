"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { dashboardStats } from "@/data/portfolio";
import Reveal, { AnimatedCounter } from "@/components/ui/Reveal";
import { useEasterEggs } from "@/context/EasterEggContext";
import { useReducedMotion } from "@/hooks/useMotion";

function StatCard({
  stat,
  index,
  boosted,
}: {
  stat: (typeof dashboardStats)[number];
  index: number;
  boosted: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (reduced || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="group rounded-2xl glass p-6 shine transition-shadow hover:glow-accent"
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={reduced ? undefined : { y: -6 }}
        data-cursor="card"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-2xl transition-transform group-hover:scale-110">
            {stat.icon}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">LIVE</span>
        </div>
        <p className="text-3xl font-bold text-gradient">
          <AnimatedCounter
            value={boosted ? Math.round(stat.value * 1.1) : stat.value}
          />
        </p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
      </motion.div>
    </Reveal>
  );
}

export default function Dashboard() {
  const { developerMode } = useEasterEggs();

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            Live Stats
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Developer <span className="text-gradient">Dashboard</span>
          </h2>
          {developerMode && (
            <p className="mt-2 text-sm text-green-400">
              Developer Mode active — enhanced metrics visible
            </p>
          )}
        </Reveal>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {dashboardStats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              boosted={developerMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
