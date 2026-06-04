"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function Education() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="border-y border-border/40 bg-surface/30 py-24 sm:py-32"
      aria-labelledby="education-heading"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          description="Formal training in computer engineering with a strong foundation in science and mathematics."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <GraduationCap className="h-6 w-6 text-accent" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.institution}
                </h3>
                <p className="mt-1 font-medium text-accent">{item.degree}</p>
                <p className="mt-3 text-sm text-muted">{item.period}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-accent/70" aria-hidden />
                  {item.location}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
