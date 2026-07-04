"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { about } from "@/data/portfolio";
import Reveal, { AnimatedCounter } from "@/components/ui/Reveal";
import Achievements from "@/components/Achievements";
import { useReducedMotion } from "@/hooks/useMotion";

function TiltCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={reduced ? undefined : { y: -4 }}
        data-cursor="card"
      >
        {children}
      </motion.div>
    </Reveal>
  );
}

export default function About() {
  return (
    <div className="relative px-6 py-24">
      <motion.div
        className="pointer-events-none absolute right-10 top-20 h-32 w-32 rounded-full blur-3xl"
        style={{ background: "var(--aurora-1)" }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-20 left-10 h-24 w-24 rounded-full blur-3xl"
        style={{ background: "var(--aurora-2)" }}
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            About Me
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Building <span className="text-gradient">Digital Solutions</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2" style={{ perspective: 1200 }}>
          <div className="space-y-4">
            {about.intro.map((paragraph, i) => (
              <TiltCard
                key={i}
                delay={0.1 + i * 0.08}
                className="rounded-2xl glass p-6 shine"
              >
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {paragraph}
                </p>
              </TiltCard>
            ))}

            <TiltCard
              delay={0.3}
              className="rounded-2xl glass p-6 glow-accent shine"
            >
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
            </TiltCard>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((stat, index) => {
              const delayClass = [
                "float-delay-0",
                "float-delay-1",
                "float-delay-2",
                "float-delay-3",
              ][index] ?? "float-delay-0";

              return (
                <TiltCard
                  key={stat.label}
                  delay={0.15 + index * 0.08}
                  className={`flex flex-col items-center justify-center rounded-2xl glass p-6 text-center animate-float ${delayClass}`}
                >
                  <span className="text-3xl font-bold text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </span>
                </TiltCard>
              );
            })}
          </div>
        </div>

        <div className="mt-20">
          <Achievements />
        </div>
      </div>
    </div>
  );
}
