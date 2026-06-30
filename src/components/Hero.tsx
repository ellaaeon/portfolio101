"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, ArrowDown } from "lucide-react";
import { siteConfig, orbitTech } from "@/data/portfolio";
import { useReducedMotion, useMousePosition } from "@/hooks/useMotion";
import { useEasterEggs } from "@/context/EasterEggContext";
import LightBulb from "@/components/ui/LightBulb";
import Magnetic from "@/components/ui/Magnetic";
import { LineReveal } from "@/components/ui/Reveal";

export default function Hero() {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const { helloWave } = useEasterEggs();
  const containerRef = useRef<HTMLDivElement>(null);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const avatarX = useMotionValue(0);
  const avatarY = useMotionValue(0);
  const springParallaxX = useSpring(parallaxX, { stiffness: 50, damping: 20 });
  const springParallaxY = useSpring(parallaxY, { stiffness: 50, damping: 20 });
  const springAvatarX = useSpring(avatarX, { stiffness: 80, damping: 15 });
  const springAvatarY = useSpring(avatarY, { stiffness: 80, damping: 15 });

  useEffect(() => {
    if (reduced) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    parallaxX.set((x / w - 0.5) * 20);
    parallaxY.set((y / h - 0.5) * 20);
    avatarX.set((x / w - 0.5) * 16);
    avatarY.set((y / h - 0.5) * 16);
  }, [x, y, reduced, parallaxX, parallaxY, avatarX, avatarY]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      <LightBulb />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: springParallaxX, y: springParallaxY }}
      >
        {orbitTech.map((tech, i) => {
          const angle = (i / orbitTech.length) * 360;
          const radius = 180 + (i % 2) * 40;
          return (
            <motion.span
              key={tech}
              className="absolute left-1/2 top-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[10px] font-medium text-[var(--text-muted)] backdrop-blur-sm"
              style={{
                animation: reduced
                  ? "none"
                  : `orbit ${20 + i * 2}s linear infinite`,
                animationDelay: `${-i * 2}s`,
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {tech}
            </motion.span>
          );
        })}
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center lg:flex-row lg:gap-16 lg:text-left">
        <motion.div
          className="relative mb-10 lg:mb-0"
          style={{ x: springAvatarX, y: springAvatarY }}
        >
          <div className="relative">
            <motion.div
              className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 text-4xl font-bold shadow-2xl glow-accent"
              animate={
                helloWave
                  ? { rotate: [0, 14, -8, 14, -4, 10, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={
                helloWave
                  ? { duration: 1.2 }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
            >
              DA
            </motion.div>
            <motion.div
              className="absolute -inset-4 rounded-full border border-[var(--accent)]/20"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--text-muted)]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {siteConfig.title}
          </motion.div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <LineReveal text={siteConfig.name.split(" ")[0]} />
            <br />
            <span className="text-gradient">
              <LineReveal text={siteConfig.name.split(" ")[1] ?? ""} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 max-w-xl text-lg text-[var(--text-muted)] lg:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[var(--accent-glow)] transition-shadow hover:shadow-xl"
                data-cursor="button"
                data-cursor-text="Explore"
              >
                View My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:glow-accent"
                data-cursor="button"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:glow-accent"
                data-cursor="link"
                data-cursor-text="GitHub"
              >
                <Github size={16} />
                GitHub
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-cursor="link"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
