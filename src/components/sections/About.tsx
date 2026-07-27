"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOCUS_AREAS = [
  {
    label: "Full-Stack Web Development",
    description: "Production-ready applications with modern React, Next.js, and Node.js",
  },
  {
    label: "AI & LLM Integration",
    description: "Intelligent automation and AI-powered features built into real products",
  },
  {
    label: "Blockchain Systems",
    description: "Transparent, on-chain data with Ethereum smart contract architecture",
  },
  {
    label: "System Design",
    description: "Scalable architecture, clean code, and performance-first thinking",
  },
] as const;

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Professional Summary"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Summary text */}
          <motion.div
            className="glass glow-ring rounded-2xl p-8 sm:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m a{" "}
              <span className="highlight-word text-foreground font-medium">Computer Engineering</span>{" "}
              undergraduate who ships{" "}
              <span className="highlight-word text-accent">production-grade software</span>{" "}
              — not just side projects. My work spans{" "}
              <span className="highlight-word text-foreground/90">scalable web applications</span>,{" "}
              <span className="highlight-word text-foreground/90">AI systems</span>,{" "}
              <span className="highlight-word text-foreground/90">blockchain transparency layers</span>,{" "}
              and{" "}
              <span className="highlight-word text-foreground/90">LLM integrations</span>{" "}
              — all built with clean architecture and a bias toward real-world impact.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              I care deeply about{" "}
              <span className="highlight-word text-foreground/90">system design</span>{" "}
              and{" "}
              <span className="highlight-word text-foreground/90">developer experience</span>,{" "}
              and I bring that same rigor to hackathons, internships, and collaborative builds.
            </p>
          </motion.div>

          {/* Focus areas grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FOCUS_AREAS.map((area, index) => (
              <motion.div
                key={area.label}
                className="glass rounded-xl p-5 transition-all duration-300 hover:border-accent/30 hover:glow-ring"
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="mb-1.5 h-1 w-8 rounded-full bg-accent" aria-hidden />
                <h3 className="mb-1 text-sm font-semibold text-foreground">{area.label}</h3>
                <p className="text-xs leading-relaxed text-muted">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
