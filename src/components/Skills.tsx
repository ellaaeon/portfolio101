"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillDetails } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useMotion";

function RadialChart({ level }: { level: number }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="relative h-[88px] w-[88px] shrink-0">
      <svg width="88" height="88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
        />
        <motion.circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {level}%
      </span>
    </div>
  );
}

function ConnectionLines({
  activeIndex,
  positions,
}: {
  activeIndex: number | null;
  positions: { x: number; y: number }[];
}) {
  if (activeIndex === null) return null;
  const target = positions[activeIndex];

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 440"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.line
        x1={200}
        y1={220}
        x2={200 + target.x}
        y2={220 + target.y}
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSkill = skillDetails.find((s) => s.name === active);
  const activeIndex = active
    ? skillDetails.findIndex((s) => s.name === active)
    : null;

  const positions = skillDetails.map((_, i) => {
    const angle = (i / skillDetails.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 130 + (i % 3) * 22;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.55,
    };
  });

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            Expertise
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Hover a sphere to explore proficiency &amp; projects
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div
              ref={containerRef}
              className="relative mx-auto flex h-[440px] w-full max-w-lg items-center justify-center"
            >
              <motion.div
                className="absolute inset-4 rounded-full border border-[var(--border)] opacity-20"
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border border-[var(--accent)]/20 opacity-30"
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-28 rounded-full border border-dashed border-[var(--border)] opacity-15"
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />

              <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)]/10 ring-2 ring-[var(--accent)]/30">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  DA
                </span>
              </div>

              <ConnectionLines
                activeIndex={activeIndex}
                positions={positions}
              />

              {skillDetails.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  className={`absolute z-20 rounded-full border backdrop-blur-md transition-shadow ${
                    active === skill.name
                      ? "z-30 border-[var(--accent)] bg-[var(--accent)]/25 text-[var(--text)] shadow-lg shadow-[var(--accent-glow)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:shadow-md hover:shadow-[var(--accent-glow)]"
                  }`}
                  style={{
                    left: `calc(50% + ${positions[i].x}px)`,
                    top: `calc(50% + ${positions[i].y}px)`,
                    transform: "translate(-50%, -50%)",
                    width: active === skill.name ? 56 : 44,
                    height: active === skill.name ? 56 : 44,
                  }}
                  onMouseEnter={() => setActive(skill.name)}
                  onFocus={() => setActive(skill.name)}
                  onClick={() =>
                    setActive(active === skill.name ? null : skill.name)
                  }
                  animate={{
                    y: reduced ? 0 : [0, -5, 0],
                    scale: active === skill.name ? 1.15 : 1,
                  }}
                  transition={{
                    y: {
                      duration: 3 + (i % 4),
                      repeat: Infinity,
                      delay: i * 0.15,
                    },
                    scale: { duration: 0.3 },
                  }}
                  data-cursor="link"
                  aria-label={`${skill.name}, ${skill.level}% proficiency`}
                >
                  <span className="flex h-full w-full items-center justify-center text-[9px] font-semibold leading-tight">
                    {skill.name.length > 8
                      ? skill.name.slice(0, 6) + "…"
                      : skill.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, x: 24, rotateY: -8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -24, rotateY: 8 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center rounded-2xl glass p-8 glow-accent md:flex-row md:items-start md:gap-8"
                  style={{ transformPerspective: 1000 }}
                >
                  <RadialChart level={activeSkill.level} />
                  <div>
                    <h3 className="text-2xl font-bold">{activeSkill.name}</h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {activeSkill.category} &bull; {activeSkill.years}{" "}
                      {activeSkill.years === 1 ? "year" : "years"}
                    </p>
                    <p className="mt-4 text-sm font-medium text-[var(--text-muted)]">
                      Used in:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeSkill.projects.map((p) => (
                        <span
                          key={p}
                          className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--text-muted)]"
                >
                  Select a skill sphere to see details
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
