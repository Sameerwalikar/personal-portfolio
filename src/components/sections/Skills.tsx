"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import dynamic from "next/dynamic";

const CardStack = dynamic(() => import("@/components/skills/CardStack").then((mod) => mod.CardStack), { ssr: false });
const BadgeGrid = dynamic(() => import("@/components/skills/BadgeGrid").then((mod) => mod.BadgeGrid), { ssr: false });
const CertificatesSection = dynamic(() => import("@/components/skills/CertificatesSection").then((mod) => mod.CertificatesSection), { ssr: false });
const IUseSection = dynamic(() => import("@/components/skills/IUseSection").then((mod) => mod.IUseSection), { ssr: false });
const SystemSpecsSection = dynamic(() => import("@/components/skills/SystemSpecsSection").then((mod) => mod.SystemSpecsSection), { ssr: false });
const StatsSection = dynamic(() => import("@/components/skills/StatsSection").then((mod) => mod.StatsSection), { ssr: false });
import { cn } from "@/lib/utils";

type Tab = "skills" | "badges" | "certificates" | "iuse" | "specs" | "stats";

interface TabDef {
  id: Tab;
  label: string;
  icon: string; /* public image path */
}

const TABS: TabDef[] = [
  { id: "skills",       label: "Skills",        icon: "/images/skills-button.jpg"  },
  { id: "badges",       label: "Badges",        icon: "/images/badge-btn.jpg"      },
  { id: "certificates", label: "Certificates",  icon: "/images/cert-btn.png"       },
  { id: "iuse",         label: "I Use",         icon: "/images/iuse-btn.jpg"       },
  { id: "specs",        label: "System Specs",  icon: "/images/specs-btn.png"      },
  { id: "stats",        label: "Stats",         icon: "/images/stats-btn.png"      },
];

const contentVariants = {
  enter:  { opacity: 0, y: 16  },
  center: { opacity: 1, y: 0   },
  exit:   { opacity: 0, y: -10 },
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  return (
    <section id="skills" className="py-24 sm:py-32" aria-labelledby="skills-heading">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Technical Expertise"
            title="Skills & Toolkit"
            description="From programming fundamentals to AI integration — explore everything in my stack."
          />
        </motion.div>

        {/* ── Tab bar ──────────────────────────────────────────── */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          role="tablist"
          aria-label="Skill sections"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium",
                  "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "bg-accent text-background shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                    : "border border-border/50 text-muted hover:border-accent/30 hover:text-foreground",
                )}
              >
                <span className="relative h-[18px] w-[18px] shrink-0 overflow-hidden rounded-sm" aria-hidden>
                  <Image
                    src={tab.icon}
                    alt=""
                    fill
                    sizes="18px"
                    className="object-cover"
                  />
                </span>
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Tab panels ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-label={TABS.find((t) => t.id === activeTab)?.label}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === "skills"       && <CardStack />}
            {activeTab === "badges"       && <BadgeGrid />}
            {activeTab === "certificates" && <CertificatesSection />}
            {activeTab === "iuse"         && <IUseSection />}
            {activeTab === "specs"        && <SystemSpecsSection />}
            {activeTab === "stats"        && <StatsSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
