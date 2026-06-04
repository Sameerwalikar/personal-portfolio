"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="work" className="py-24 sm:py-32" aria-labelledby="work-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="Proof of Work"
          title="Selected Projects"
          description="Technical projects spanning blockchain, AI, full-stack development, and real-world safety systems — built with production-minded architecture."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <motion.article key={project.id} variants={item}>
              <Card className="flex h-full flex-col">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="accent" className="mb-3">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  {(project.href || project.github) && (
                    <a
                      href={project.href ?? project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                      aria-label={`View ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mb-6 flex-1 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
