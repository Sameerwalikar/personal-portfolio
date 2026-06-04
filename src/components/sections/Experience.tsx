"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="border-y border-border/40 bg-surface/30 py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Journey"
          description="Building scalable systems through internships in web development, digital marketing, and campus leadership."
        />

        <div className="space-y-8">
          {experience.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{role.type}</Badge>
                  {role.period.includes("Present") && (
                    <Badge variant="default">Current</Badge>
                  )}
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" aria-hidden />
                  <h3 className="text-lg font-semibold text-foreground">{role.role}</h3>
                </div>

                <p className="mb-3 font-medium text-accent">{role.company}</p>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-accent/70" aria-hidden />
                    {role.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-accent/70" aria-hidden />
                    {role.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
