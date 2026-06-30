"use client";

import { dashboardStats } from "@/data/portfolio";
import Reveal, { AnimatedCounter } from "@/components/ui/Reveal";
import { useEasterEggs } from "@/context/EasterEggContext";

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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:glow-accent shine">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    LIVE
                  </span>
                </div>
                <p className="text-3xl font-bold text-gradient">
                  <AnimatedCounter
                    value={developerMode ? Math.round(stat.value * 1.1) : stat.value}
                  />
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
