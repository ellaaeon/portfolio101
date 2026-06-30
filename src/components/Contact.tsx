"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Github, Send } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: undefined,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/villagonz",
    href: siteConfig.github,
  },
];

function Confetti() {
  const height =
    typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-sm"
          style={{
            left: `${(i * 17) % 100}%`,
            background: ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"][
              i % 4
            ],
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: height + 20,
            opacity: 0,
            rotate: (i * 47) % 720,
            x: ((i % 10) - 5) * 20,
          }}
          transition={{ duration: 2 + (i % 3) * 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [planeFlying, setPlaneFlying] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setPlaneFlying(true);

    window.setTimeout(() => {
      setPlaneFlying(false);
      setSent(true);
      setSending(false);
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(form.message);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      window.setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {sent && <Confetti />}
      </AnimatePresence>

      <div className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
              Get In Touch
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Let&apos;s Work <span className="text-gradient">Together</span>
            </h2>
            <p className="mx-auto max-w-xl text-[var(--text-muted)]">
              Send a message — watch the paper plane take off.
            </p>
          </Reveal>

          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <Reveal delay={i * 0.05}>
                  <div className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:glow-accent shine">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 transition-transform group-hover:scale-110">
                      <Icon className="text-[var(--accent)]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        {item.label}
                      </p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                </Reveal>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor="link"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl glass p-8 glow-accent"
            >
              <motion.div
                className="mb-6 flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-4xl"
                  animate={{ rotateX: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✉️
                </motion.div>
                <p className="text-sm text-[var(--text-muted)]">
                  Hover the envelope, then send your message
                </p>
              </motion.div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow)]"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow)]"
                />
                <textarea
                  placeholder="Your message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow)]"
                />
              </div>

              <div className="relative mt-6 flex justify-end">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={sending}
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-[var(--accent-glow)] disabled:opacity-60"
                    data-cursor="button"
                    data-cursor-text="Send"
                  >
                    <Send size={16} />
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </Magnetic>

                <AnimatePresence>
                  {planeFlying && (
                    <motion.div
                      className="pointer-events-none absolute right-0 top-1/2 text-2xl"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: 300, y: -200, opacity: 0, rotate: 25 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeIn" }}
                    >
                      ✈️
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </>
  );
}
