"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { person } = portfolioData;

  return (
    <section id="about" className="py-24 sm:py-32" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Professional Summary"
          description={person.summary}
        />

        <motion.div
          className="glass glow-ring max-w-3xl rounded-2xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Focus areas include{" "}
            <span className="text-accent">full-stack web development</span>,{" "}
            <span className="text-accent">blockchain transparency systems</span>,{" "}
            <span className="text-accent">AI-powered tooling</span>, and{" "}
            <span className="text-accent">competitive programming</span> — with a
            track record of shipping real projects through internships and
            hackathons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
