"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroProfileImage } from "@/components/sections/HeroProfileImage";
import { HeroNameAnimation } from "@/components/sections/HeroNameAnimation";


/* ─── Highlighted role word ────────────────────────────────────── */
function RoleWord({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "ai";
}) {
  if (variant === "ai") {
    return (
      <span className="relative inline-block">
        <span className="shimmer-text font-bold">{children}</span>
      </span>
    );
  }
  return (
    <span className="relative inline-block group/role">
      <span className="text-gradient font-bold">{children}</span>
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-accent-dim to-accent-bright transition-all duration-500 group-hover/role:w-full"
        aria-hidden
      />
    </span>
  );
}

/* ─── Hero section ─────────────────────────────────────────────── */
export function Hero() {
  const { person } = portfolioData;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center pt-28 pb-20 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"
        aria-hidden
      />

      <div className="section-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left column ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="flex flex-col"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <Badge variant="accent" className="group cursor-default">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
                {person.availability}
                <Sparkles className="ml-2 h-3 w-3 opacity-60" aria-hidden />
              </Badge>
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="mb-3 text-lg text-muted sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello<span aria-hidden>👋</span>, I&apos;m
            </motion.p>

            {/* Animated name — multilingual on hover */}
            <div className="group/name mb-8">
              <HeroNameAnimation />
            </div>

            {/* Role */}
            <motion.h2
              className="mb-6 text-2xl font-semibold text-foreground/90 sm:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <RoleWord>Full Stack</RoleWord>
              <span className="text-muted"> &amp; </span>
              <RoleWord variant="ai">AI</RoleWord>
              <span className="text-foreground/80"> Developer</span>
            </motion.h2>

            {/* Location */}
            <motion.p
              className="mb-6 flex items-center gap-2 text-sm text-muted sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {person.location}
            </motion.p>

            {/* Introduction with India flag effect */}
            <motion.p
              className="mb-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              Hello, I am a 20-year-old Computer Engineering student from{" "}
              <span className="india-underline text-foreground font-medium">
                India
              </span>
              .
            </motion.p>

            {/* About paragraph — keyword underlines on hover */}
            <motion.p
              className="mb-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              I build{" "}
              <span className="highlight-word text-foreground/90">scalable web applications</span>
              {", "}
              <span className="highlight-word text-foreground/90">AI systems</span>
              {", and "}
              <span className="highlight-word text-foreground/90">blockchain</span>
              {" solutions — integrating "}
              <span className="highlight-word text-foreground/90">LLMs</span>
              {" and "}
              <span className="highlight-word text-foreground/90">production-grade architecture</span>
              {" to ship software that actually works at scale."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mb-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Button
                href="#work"
                variant="primary"
                size="lg"
                className="btn-ripple"
              >
                View Selected Work
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="btn-ripple"
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Collaboration note */}
            <motion.p
              className="mt-8 text-sm text-muted/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              Open to remote collaboration, internships &amp; hackathons.
            </motion.p>
          </motion.div>

          {/* ── Right column ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <HeroProfileImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } }}
        aria-label="Scroll to projects"
      >
        <span className="text-xs font-medium tracking-widest uppercase opacity-60">Scroll</span>
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
