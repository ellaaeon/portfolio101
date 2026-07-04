"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, ArrowDown } from "lucide-react";
import { siteConfig, orbitTech } from "@/data/portfolio";
import { useReducedMotion, useMousePosition, useNormalizedMouse } from "@/hooks/useMotion";
import { useEasterEggs } from "@/context/EasterEggContext";
import LightBulb from "@/components/ui/LightBulb";
import PremiumButton from "@/components/ui/PremiumButton";
import { CharReveal, GradientUnderline } from "@/components/ui/Reveal";

const HolographicOrb = dynamic(
  () => import("@/components/effects/HolographicOrb"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-52 w-52 items-center justify-center rounded-full border-2 border-[var(--accent)]/30 bg-[var(--surface)] sm:h-60 sm:w-60">
        <span className="animate-pulse font-bold text-[var(--accent)]">DA</span>
      </div>
    ),
  }
);

export default function Hero() {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const mouse = useNormalizedMouse();
  const { helloWave } = useEasterEggs();
  const containerRef = useRef<HTMLDivElement>(null);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const springParallaxX = useSpring(parallaxX, { stiffness: 45, damping: 22 });
  const springParallaxY = useSpring(parallaxY, { stiffness: 45, damping: 22 });
  const springTextX = useSpring(textX, { stiffness: 60, damping: 20 });
  const springTextY = useSpring(textY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    parallaxX.set((x / w - 0.5) * 24);
    parallaxY.set((y / h - 0.5) * 24);
    textX.set((x / w - 0.5) * -12);
    textY.set((y / h - 0.5) * -8);
  }, [x, y, reduced, parallaxX, parallaxY, textX, textY]);

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
          const radius = 200 + (i % 2) * 50;
          return (
            <motion.span
              key={tech}
              className="absolute left-1/2 top-1/2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-medium text-[var(--text-muted)] shadow-lg backdrop-blur-md"
              style={{
                animation: reduced
                  ? "none"
                  : `orbit ${22 + i * 2}s linear infinite`,
                animationDelay: `${-i * 2.5}s`,
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
            >
              {tech}
            </motion.span>
          );
        })}
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center lg:flex-row lg:gap-16 lg:text-left">
        <motion.div
          className="relative mb-10 lg:mb-0"
          animate={
            helloWave
              ? { rotate: [0, 12, -8, 10, -4, 6, 0] }
              : undefined
          }
          transition={helloWave ? { duration: 1.2 } : undefined}
        >
          <HolographicOrb mouse={mouse} />
        </motion.div>

        <motion.div style={{ x: springTextX, y: springTextY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--text-muted)] shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {siteConfig.title}
          </motion.div>

          <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <CharReveal text={siteConfig.name.split(" ")[0]} delay={0.1} />
            <br />
            <span className="text-gradient">
              <CharReveal text={siteConfig.name.split(" ")[1] ?? ""} delay={0.35} />
            </span>
          </h1>

          <GradientUnderline className="mx-auto mb-6 w-32 lg:mx-0" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 max-w-xl text-lg text-[var(--text-muted)] lg:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            style={{ perspective: 800 }}
          >
            <PremiumButton href="#projects" cursorText="Explore">
              View My Work
            </PremiumButton>
            <PremiumButton href="#contact" variant="glass" cursorText="Contact">
              <Mail size={16} />
              Get in Touch
            </PremiumButton>
            <PremiumButton
              href={siteConfig.github}
              variant="glass"
              cursorText="GitHub"
              external
            >
              <Github size={16} />
              GitHub
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        data-cursor="link"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
