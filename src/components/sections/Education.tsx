"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Star, Briefcase, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/* ─── Tab button ────────────────────────────────────────────────── */
function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300",
        active
          ? "bg-accent text-background shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          : "text-muted hover:text-foreground hover:bg-surface-elevated",
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}

/* ─── Education timeline card ──────────────────────────────────── */
function EducationCard({
  item,
  index,
  isLeft,
}: {
  item: (typeof portfolioData.education)[number];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative flex w-full flex-col md:w-[calc(50%-2rem)]",
        isLeft ? "md:mr-auto md:pr-8 md:text-right md:items-end" : "md:ml-auto md:pl-8",
      )}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Connector dot */}
      <div
        className={cn(
          "absolute top-7 hidden h-4 w-4 rounded-full border-2 border-background bg-accent shadow-[0_0_12px_rgba(34,197,94,0.7)] md:block",
          isLeft ? "-right-[calc(2rem+7px)]" : "-left-[calc(2rem+7px)]",
        )}
        aria-hidden
      />
      {/* Connector line to center */}
      <div
        className={cn(
          "absolute top-[calc(1.75rem+1px)] hidden h-px bg-gradient-to-r from-accent/40 to-transparent md:block",
          isLeft
            ? "right-0 w-8 bg-gradient-to-l from-accent/40 to-transparent"
            : "left-0 w-8",
        )}
        aria-hidden
      />

      <div className="glass glow-ring rounded-2xl p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]">
        {/* Logo + institution */}
        <div className={cn("mb-4 flex items-center gap-3", isLeft && "md:flex-row-reverse")}>
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface-elevated">
            {item.logo ? (
              <Image
                src={item.logo}
                alt={`${item.institution} logo`}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{item.institution}</h3>
            <p className="text-sm font-medium text-accent">{item.degree}</p>
          </div>
        </div>

        <div className={cn("space-y-2", isLeft && "md:items-end md:flex md:flex-col")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Calendar className="h-3.5 w-3.5 text-accent/70" aria-hidden />
              {item.period}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent/70" aria-hidden />
              {item.location}
            </span>
          </div>
          {item.score && (
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-accent" aria-hidden />
              <span className="text-sm font-semibold text-accent">{item.score}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Experience timeline card ─────────────────────────────────── */
function ExperienceCard({
  item,
  index,
  isLeft,
}: {
  item: (typeof portfolioData.experience)[number];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative flex w-full flex-col md:w-[calc(50%-2rem)]",
        isLeft ? "md:mr-auto md:pr-8 md:text-right md:items-end" : "md:ml-auto md:pl-8",
      )}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Connector dot */}
      <div
        className={cn(
          "absolute top-7 hidden h-4 w-4 rounded-full border-2 border-background bg-accent shadow-[0_0_12px_rgba(34,197,94,0.7)] md:block",
          isLeft ? "-right-[calc(2rem+7px)]" : "-left-[calc(2rem+7px)]",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute top-[calc(1.75rem+1px)] hidden h-px md:block",
          isLeft
            ? "right-0 w-8 bg-gradient-to-l from-accent/40 to-transparent"
            : "left-0 w-8 bg-gradient-to-r from-accent/40 to-transparent",
        )}
        aria-hidden
      />

      <div className="glass glow-ring rounded-2xl p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]">
        {/* Header */}
        <div className={cn("mb-4 flex items-start gap-3", isLeft && "md:flex-row-reverse")}>
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface-elevated">
            {item.logo ? (
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="accent" className="text-xs">{item.type}</Badge>
              {item.period.includes("Present") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
                  Current
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground leading-tight">{item.role}</h3>
            <p className="text-sm font-medium text-accent">{item.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className={cn("mb-4 flex flex-wrap gap-3", isLeft && "md:justify-end")}>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5 text-accent/70" aria-hidden />
            {item.period}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-accent/70" aria-hidden />
            {item.location}
          </span>
        </div>

        {/* Highlights */}
        <ul className={cn("space-y-2", isLeft && "md:text-right")}>
          {item.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className={cn(
                "flex gap-2 text-xs text-muted leading-relaxed",
                isLeft && "md:flex-row-reverse",
              )}
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/60" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export function Education() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");
  const { education, experience } = portfolioData;

  const tabVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      id="education"
      className="border-y border-border/40 bg-surface/30 py-24 sm:py-32 overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Background"
          title="Education & Experience"
          description="Academic training in Computer Engineering combined with hands-on industry experience building real products."
        />

        {/* Tab switcher */}
        <motion.div
          className="mb-14 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <TabButton
            active={activeTab === "education"}
            onClick={() => setActiveTab("education")}
            icon={GraduationCap}
            label="Education"
          />
          <TabButton
            active={activeTab === "experience"}
            onClick={() => setActiveTab("experience")}
            icon={Briefcase}
            label="Experience"
          />
        </motion.div>

        {/* Timeline content */}
        <AnimatePresence mode="wait">
          {activeTab === "education" ? (
            <motion.div
              key="education"
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative">
                {/* Center vertical line (desktop) */}
                <div className="timeline-line hidden md:block" aria-hidden />

                {/* Cards */}
                <div className="flex flex-col gap-10 md:gap-14">
                  {education.map((item, index) => (
                    <EducationCard
                      key={item.id}
                      item={item}
                      index={index}
                      isLeft={index % 2 === 0}
                    />
                  ))}
                </div>

                {/* End cap */}
                <motion.div
                  className="mx-auto mt-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  aria-hidden
                >
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="experience"
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative">
                {/* Center vertical line (desktop) */}
                <div className="timeline-line hidden md:block" aria-hidden />

                {/* Cards */}
                <div className="flex flex-col gap-10 md:gap-14">
                  {experience.map((item, index) => (
                    <ExperienceCard
                      key={item.id}
                      item={item}
                      index={index}
                      isLeft={index % 2 === 0}
                    />
                  ))}
                </div>

                {/* End cap */}
                <motion.div
                  className="mx-auto mt-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  aria-hidden
                >
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
