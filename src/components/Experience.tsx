"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useMotion";

export default function Experience() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative px-6 py-24" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            Career
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Work Experience</h2>
        </Reveal>

        <div className="relative">
          {!reduced && (
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[var(--border)] md:block">
              <motion.div
                className="w-full bg-gradient-to-b from-[var(--accent)] to-purple-500"
                style={{ height: lineHeight }}
              />
            </div>
          )}

          <div className="space-y-8 md:pl-16">
            {experience.map((job, index) => (
              <Reveal key={job.company} delay={index * 0.1}>
                <article className="relative rounded-2xl glass p-8 glow-accent shine transition-all hover:-translate-y-1">
                  {!reduced && (
                    <div className="absolute -left-[3.25rem] top-10 hidden h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:block" />
                  )}

                  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                        <Briefcase className="text-[var(--accent)]" size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{job.role}</h3>
                        <p className="text-[var(--text-muted)]">{job.company}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full glass px-4 py-1 text-sm text-[var(--text-muted)]">
                      {job.period}
                    </span>
                  </div>

                  <p className="mb-6 text-[var(--text-muted)]">{job.description}</p>

                  <ul className="space-y-2">
                    {job.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                      >
                        <span className="mt-1 text-[var(--accent)]">&rarr;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
