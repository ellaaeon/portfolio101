"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/portfolio";
import { useEasterEggs } from "@/context/EasterEggContext";
import Reveal from "@/components/ui/Reveal";

export default function Achievements() {
  const { unlocked } = useEasterEggs();

  return (
    <div>
      <Reveal className="mb-8 text-center">
        <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
          Collectibles
        </p>
        <h3 className="text-2xl font-bold">
          Achievements{" "}
          <span className="text-[var(--text-muted)] text-lg font-normal">
            ({unlocked.size}/{achievements.length})
          </span>
        </h3>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <Reveal key={a.id} delay={i * 0.05}>
              <motion.div
                className={`group relative h-36 cursor-default rounded-2xl glass shine transition-all ${
                  isUnlocked
                    ? "hover:-translate-y-2 hover:glow-accent"
                    : "opacity-40 grayscale"
                }`}
                whileHover={isUnlocked ? { rotateY: 5 } : undefined}
                style={{ perspective: 1000 }}
              >
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <span className="mb-2 text-3xl">{a.icon}</span>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {isUnlocked ? a.description : "???"}
                  </p>
                </div>
                {isUnlocked && (
                  <div
                    className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${a.color} opacity-10`}
                  />
                )}
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
