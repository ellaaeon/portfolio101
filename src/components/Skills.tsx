"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillDetails } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

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

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const activeSkill = skillDetails.find((s) => s.name === active);

  const positions = skillDetails.map((_, i) => {
    const angle = (i / skillDetails.length) * Math.PI * 2;
    const radius = 120 + (i % 3) * 30;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6,
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
            Hover a bubble to explore proficiency &amp; projects
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto flex h-[420px] w-full max-w-lg items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[var(--border)] opacity-30" />
              <div className="absolute inset-12 rounded-full border border-[var(--border)] opacity-20" />

              {skillDetails.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  className={`absolute rounded-full border px-3 py-2 text-xs font-medium backdrop-blur-sm transition-all ${
                    active === skill.name
                      ? "z-10 border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--text)] shadow-lg shadow-[var(--accent-glow)] scale-110"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)]/50"
                  }`}
                  style={{
                    left: `calc(50% + ${positions[i].x}px)`,
                    top: `calc(50% + ${positions[i].y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActive(skill.name)}
                  onFocus={() => setActive(skill.name)}
                  onClick={() =>
                    setActive(active === skill.name ? null : skill.name)
                  }
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  data-cursor="link"
                >
                  {skill.name}
                </motion.button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center justify-center rounded-2xl glass p-8 glow-accent md:items-start md:flex-row md:gap-8"
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
                  Select a skill bubble to see details
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
