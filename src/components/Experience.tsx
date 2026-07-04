"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
import { experience } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useMotion";

export default function Experience() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const lineGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);

  return (
    <div className="relative px-6 py-24" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            Career
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Work Experience</h2>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            A journey through professional milestones
          </p>
        </Reveal>

        <div className="relative">
          {!reduced && (
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[var(--border)] md:block">
              <motion.div
                className="relative w-full bg-gradient-to-b from-[var(--accent)] via-violet-500 to-purple-500"
                style={{ height: lineHeight, opacity: lineGlow }}
              >
                <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent-glow)]" />
              </motion.div>
            </div>
          )}

          <div className="space-y-6 md:pl-16">
            {experience.map((job, index) => {
              const isOpen = expanded === index;
              return (
                <Reveal key={job.company} delay={index * 0.12}>
                  <motion.article
                    className="relative overflow-hidden rounded-2xl glass transition-shadow hover:shadow-lg hover:shadow-[var(--accent-glow)]"
                    layout
                    data-cursor="card"
                  >
                    {!reduced && (
                      <motion.div
                        className="absolute -left-[3.25rem] top-10 hidden h-5 w-5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:block"
                        animate={{
                          boxShadow: isOpen
                            ? "0 0 20px var(--accent-glow)"
                            : "0 0 0px transparent",
                          scale: isOpen ? 1.2 : 1,
                        }}
                      />
                    )}

                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 p-8 text-left"
                      onClick={() => setExpanded(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                          <Briefcase className="text-[var(--accent)]" size={22} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{job.role}</h3>
                          <p className="text-[var(--text-muted)]">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden rounded-full glass px-4 py-1 text-sm text-[var(--text-muted)] sm:inline">
                          {job.period}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={20} className="text-[var(--text-muted)]" />
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[var(--border)] px-8 pb-8 pt-4">
                            <span className="mb-4 inline-block rounded-full glass px-4 py-1 text-sm text-[var(--text-muted)] sm:hidden">
                              {job.period}
                            </span>
                            <p className="mb-6 text-[var(--text-muted)]">
                              {job.description}
                            </p>
                            <ul className="space-y-3">
                              {job.highlights.map((item, hi) => (
                                <motion.li
                                  key={item}
                                  className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: hi * 0.06 }}
                                >
                                  <span className="mt-1 text-[var(--accent)]">
                                    &rarr;
                                  </span>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
