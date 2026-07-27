"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

/* ─── Collapsed vertical tab strip ─────────────────────────────── */
interface TabStripProps {
  project: (typeof PROJECTS)[number];
  isActive: boolean;
  onSelect: () => void;
  /** Whether this is the last tab (no right divider) */
  isLast: boolean;
}

function TabStrip({ project, isActive, onSelect, isLast }: TabStripProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={`View ${project.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative flex h-full flex-1 flex-col items-center justify-between",
        "cursor-pointer select-none outline-none",
        "transition-colors duration-300",
        /* right divider between tabs */
        !isLast && "border-r border-border/50",
        /* active = green tint bg, inactive = hover tint */
        isActive
          ? "bg-accent/8"
          : "bg-transparent hover:bg-accent/4",
        /* keyboard focus ring */
        "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
      )}
    >
      {/* Active left-edge indicator bar */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[2px] rounded-r-full bg-accent"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden
      />

      {/* Number badge */}
      <div
        className={cn(
          "mt-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums transition-all duration-300",
          isActive
            ? "border-accent bg-accent/20 text-accent shadow-[0_0_12px_rgba(34,197,94,0.35)]"
            : "border-border/60 bg-surface-elevated text-muted group-hover:border-accent/40 group-hover:text-accent/70",
        )}
        aria-hidden
      >
        {project.number}
      </div>

      {/* Rotated project name */}
      <div
        className="flex flex-1 items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className={cn(
            "whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
            "origin-center",
            isActive ? "text-accent" : "text-muted group-hover:text-foreground/70",
          )}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {project.title}
        </span>
      </div>

      {/* Category dot */}
      <div
        className={cn(
          "mb-5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
          isActive
            ? "bg-accent shadow-[0_0_6px_rgba(34,197,94,0.8)]"
            : "bg-border group-hover:bg-accent/40",
        )}
        aria-hidden
      />
    </button>
  );
}

/* ─── Desktop layout ────────────────────────────────────────────── */
function DesktopLayout({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {

  return (
    <div
      className="hidden overflow-hidden rounded-3xl border border-border/60 bg-surface/60 backdrop-blur-xl lg:flex"
      style={{
        boxShadow:
          "0 0 0 1px rgba(34,197,94,0.06), 0 32px 80px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        minHeight: "600px",
      }}
      role="tablist"
      aria-label="Project tabs"
    >
      {/* Expanded panel — ~60% */}
      <div className="relative flex min-w-0 flex-1 flex-col border-r border-border/50">
        {/* Top gradient accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.6) 30%, rgba(74,222,128,0.8) 55%, transparent 100%)",
          }}
          aria-hidden
        />
        <ProjectCard project={PROJECTS[active]} isActive />
      </div>

      {/* Collapsed tab strips — each ~13-14% making ~40% total */}
      <div className="flex w-[200px] shrink-0 divide-x divide-border/50 xl:w-[240px]">
        {PROJECTS.map((project, i) => {
          if (i === active) return null;
          const tabIndex = PROJECTS.indexOf(project);
          const isLast = i === PROJECTS.length - 1;
          return (
            <TabStrip
              key={project.id}
              project={project}
              isActive={false}
              onSelect={() => onSelect(tabIndex)}
              isLast={isLast}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Mobile accordion layout ───────────────────────────────────── */
function MobileAccordion({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/60 backdrop-blur-xl lg:hidden"
      role="tablist"
      aria-label="Project tabs"
    >
      {PROJECTS.map((project, i) => {
        const isActive = i === active;
        return (
          <div
            key={project.id}
            className={cn(
              "border-b border-border/50 last:border-b-0",
              "transition-colors duration-300",
              isActive ? "bg-accent/5" : "bg-transparent",
            )}
          >
            {/* Accordion header */}
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-expanded={isActive}
              aria-controls={`panel-${project.id}`}
              id={`tab-${project.id}`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
              className={cn(
                "flex w-full items-center gap-4 px-5 py-4 text-left outline-none",
                "transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                !isActive && "hover:bg-accent/4",
              )}
            >
              {/* Number badge */}
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums transition-all duration-300",
                  isActive
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border/60 bg-surface-elevated text-muted",
                )}
              >
                {project.number}
              </span>

              {/* Title + category */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold uppercase tracking-widest transition-colors duration-200",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {project.title}
                </p>
              </div>

              {/* Chevron */}
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-muted"
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>

            {/* Accordion panel */}
            <motion.div
              id={`panel-${project.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${project.id}`}
              initial={false}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              {isActive && (
                <div className="border-t border-border/40 pb-2">
                  <ProjectCard project={project} isActive />
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export function Projects() {
  const [active, setActive] = useState(0);

  const handleSelect = useCallback((i: number) => setActive(i), []);

  return (
    <section id="work" className="py-24 sm:py-32" aria-labelledby="work-heading">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Proof of Work"
            title="Selected Projects"
            description="AI-powered products, real-time systems, and full-stack builds — each shipped with production-grade architecture and measurable impact."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {/* Desktop tab layout */}
          <DesktopLayout active={active} onSelect={handleSelect} />

          {/* Mobile accordion */}
          <MobileAccordion active={active} onSelect={handleSelect} />
        </motion.div>
      </div>
    </section>
  );
}
