"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/data/portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.article
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass glow-accent"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className={`h-2 bg-gradient-to-r ${project.gradient ?? "from-indigo-500 to-purple-500"}`}
            />

            <div className="p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    {project.category}
                  </span>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {project.title}
                  </h2>
                  {project.period && (
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {project.period}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition-colors hover:bg-[var(--border)]"
                  aria-label="Close"
                  data-cursor="button"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-6 text-[var(--text-muted)] leading-relaxed">
                {project.description}
              </p>

              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Highlights
              </h3>
              <ul className="mb-8 space-y-2">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <span className="text-[var(--accent)]">&rarr;</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                    data-cursor="link"
                    data-cursor-text="Open Project"
                  >
                    Visit Live Site
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
