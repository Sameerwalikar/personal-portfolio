"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Medal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [Trophy, Medal, Award, Award, Award];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 22 },
  },
};

export function Achievements() {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="py-24 sm:py-32" aria-labelledby="achievements-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition & Impact"
          description="Hackathon wins, national competition rankings, and leadership recognition from industry partners."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {achievements.map((achievement, index) => {
            const Icon = ICONS[index] ?? Award;
            return (
              <motion.div
                key={achievement.id}
                variants={cardVariant}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                className="glass rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                </div>
                <h3 className="font-semibold leading-snug text-foreground highlight-word cursor-default">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="mt-2 text-sm text-muted">{achievement.description}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
