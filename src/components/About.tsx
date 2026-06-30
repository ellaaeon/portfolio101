"use client";

import { GraduationCap } from "lucide-react";
import { about } from "@/data/portfolio";
import Reveal, { AnimatedCounter } from "@/components/ui/Reveal";
import Achievements from "@/components/Achievements";

export default function About() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            About Me
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Building <span className="text-gradient">Digital Solutions</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal className="space-y-4" delay={0.1}>
            {about.intro.map((paragraph, i) => (
              <p key={i} className="text-[var(--text-muted)] leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 rounded-2xl glass p-6 glow-accent shine">
              <div className="mb-3 flex items-center gap-3">
                <GraduationCap className="text-[var(--accent)]" size={22} />
                <h3 className="font-semibold">Education</h3>
              </div>
              <p className="font-medium">{about.education.degree}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {about.education.school}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {about.education.location} &bull; {about.education.period}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat, index) => {
                const delayClass = [
                  "float-delay-0",
                  "float-delay-1",
                  "float-delay-2",
                  "float-delay-3",
                ][index] ?? "float-delay-0";

                return (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center rounded-2xl glass p-6 text-center transition-all hover:-translate-y-1 hover:glow-accent animate-float ${delayClass}`}
                >
                  <span className="text-3xl font-bold text-gradient">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="mt-1 text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </span>
                </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Achievements />
        </div>
      </div>
    </div>
  );
}
