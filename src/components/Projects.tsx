"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { useEasterEggs } from "@/context/EasterEggContext";
import Reveal from "@/components/ui/Reveal";
import ProjectModal from "@/components/ui/ProjectModal";
import { useReducedMotion } from "@/hooks/useMotion";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
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

  const cursorText = project.url ? "Open Project" : "Explore";

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onOpen(project)}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl gradient-border ${
          project.featured ? "md:col-span-2" : ""
        }`}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: reduced ? 1 : 1.02 }}
        data-cursor="link"
        data-cursor-text={cursorText}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient ?? "from-indigo-500 to-purple-500"} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
        />

        <div className="relative flex h-full flex-col p-6 md:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
              {project.category}
            </span>
            {project.period && (
              <span className="text-xs text-[var(--text-muted)]">
                {project.period}
              </span>
            )}
            {project.secret && (
              <span className="rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-400">
                Secret
              </span>
            )}
          </div>

          <div
            className={`mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient ?? "from-indigo-500/20 to-purple-500/20"} transition-transform duration-700 group-hover:scale-105`}
          >
            <span className="font-mono text-4xl font-bold opacity-20">
              {project.title.charAt(0)}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mb-4 flex-1 text-sm text-[var(--text-muted)] line-clamp-2">
            {project.description}
          </p>

          <AnimatePresence>
            <motion.div
              className="mb-4 flex flex-wrap gap-2"
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
            >
              {project.technologies.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech}
                  className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-muted)]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex items-center justify-between"
            initial={{ y: 0 }}
            whileHover={{ y: -4 }}
          >
            <span className="text-sm font-medium text-[var(--accent)]">
              View details
            </span>
            <ArrowUpRight
              size={18}
              className="text-[var(--accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
        />
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { showSecretProject, unlock } = useEasterEggs();

  const visibleProjects = projects.filter(
    (p) => !p.secret || showSecretProject
  );

  const handleOpen = (project: Project) => {
    setSelected(project);
    unlock("projects");
  };

  return (
    <>
      <div className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 text-center">
            <p className="mb-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
              Featured Work
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2" style={{ perspective: 1200 }}>
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
