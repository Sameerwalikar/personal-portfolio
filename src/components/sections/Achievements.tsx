"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="h-full">
                <div className="mb-3 flex items-center gap-2">
                  {index === 0 ? (
                    <Trophy className="h-5 w-5 text-accent" aria-hidden />
                  ) : (
                    <Award className="h-5 w-5 text-accent" aria-hidden />
                  )}
                </div>
                <h3 className="font-semibold leading-snug text-foreground">
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="mt-2 text-sm text-muted">{achievement.description}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
