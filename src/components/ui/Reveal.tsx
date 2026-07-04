"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  cinematic?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  cinematic = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const offsets = {
    up: { y: 48, x: 0 },
    left: { y: 0, x: -48 },
    right: { y: 0, x: 48 },
    none: { y: 0, x: 0 },
  };

  const { x: ox, y: oy } = offsets[direction];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: ox,
        y: oy,
        scale: cinematic ? 0.94 : 1,
        rotateX: cinematic ? 6 : 0,
        filter: cinematic ? "blur(10px)" : "blur(0px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.85,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
}: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setShown(value);
      return;
    }
    if (inView) spring.set(value);
    return display.on("change", (v) => setShown(v));
  }, [inView, value, spring, display, reduced]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

type LineRevealProps = {
  text: string;
  className?: string;
};

export function LineReveal({ text, className = "" }: LineRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotateX: 40 }}
        animate={inView ? { y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformOrigin: "bottom center" }}
      >
        {text}
      </motion.span>
    </span>
  );
}

type CharRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function CharReveal({ text, className = "", delay = 0 }: CharRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -80 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            delay: delay + i * 0.035,
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          style={{ transformOrigin: "bottom center" }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

type GradientUnderlineProps = {
  className?: string;
};

export function GradientUnderline({ className = "" }: GradientUnderlineProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={`block h-1 rounded-full bg-gradient-to-r from-[var(--accent)] via-violet-400 to-purple-500 ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ transformOrigin: "left center" }}
    />
  );
}
