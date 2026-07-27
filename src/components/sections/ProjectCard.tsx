"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { ProjectData } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectData;
  /** Whether this card is the currently expanded one */
  isActive: boolean;
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={project.id}
          className="flex h-full flex-col"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── Screenshot ──────────────────────────────────────── */}
          <div
            className="relative mx-6 mt-6 overflow-hidden rounded-2xl border border-border/50 bg-surface-elevated"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Subtle inner glow on the frame */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(34,197,94,0.08)",
              }}
              aria-hidden
            />
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              /* object-contain so full screenshot is always visible */
              className="object-contain p-1"
            />
          </div>

          {/* ── Details ─────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col gap-5 p-6 pt-5">
            {/* Category + title */}
            <div>
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-accent/70">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent/60"
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs transition-all duration-200 hover:border-accent/50 hover:text-accent"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Spacer pushes buttons to bottom */}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-elevated px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_16px_rgba(34,197,94,0.15)]"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
              )}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-background hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Live Demo
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
