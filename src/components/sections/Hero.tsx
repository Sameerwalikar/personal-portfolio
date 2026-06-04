"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const { person, stats } = portfolioData;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center pt-28 pb-20"
      aria-label="Introduction"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" className="mb-6">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            {person.availability}
          </Badge>

          <p className="mb-2 text-lg text-muted sm:text-xl">
            Hello<span aria-hidden>👋</span>, I&apos;m
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-gradient">{person.firstName}</span>
          </h1>

          <h2 className="mt-2 text-3xl font-semibold text-foreground/90 sm:text-4xl lg:text-5xl">
            {person.title}
          </h2>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted sm:text-base">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            {person.location}
          </p>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {person.heroTagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#work" variant="primary" size="lg">
              View Selected Work
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Let&apos;s Connect
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center transition-all hover:border-accent/30"
            >
              <p className="text-3xl font-bold text-accent sm:text-4xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-accent-bright">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-12 text-center text-sm text-muted sm:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Open to remote collaboration, internships & hackathons.
        </motion.p>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 0.8, y: { repeat: Infinity, duration: 2 } }}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>

      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
