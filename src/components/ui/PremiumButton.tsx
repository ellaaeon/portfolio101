"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMotion";

type PremiumButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "glass";
  className?: string;
  cursorText?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

export default function PremiumButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  cursorText,
  type = "button",
  disabled = false,
  external = false,
}: PremiumButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 25,
  });
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const baseStyles =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)] hover:shadow-xl hover:shadow-[var(--accent-glow)]"
      : "glass hover:glow-accent";

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 0.4);
    y.set(py * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (reduced || !ref.current) {
      onClick?.();
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((ripple) => ripple.id !== id));
    }, 600);
    onClick?.();
  };

  const inner = (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-shadow ${baseStyles} ${className}`}
      style={{
        x: springX,
        y: springY,
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={reduced ? undefined : { scale: 0.96, rotateX: 2 }}
      data-cursor="button"
      data-cursor-text={cursorText}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/25"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
          animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      <span style={{ transform: "translateZ(12px)" }}>{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="inline-block"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className="inline-block disabled:opacity-60"
    >
      {inner}
    </button>
  );
}
