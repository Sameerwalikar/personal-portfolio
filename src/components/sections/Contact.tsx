"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LeetCodeIcon } from "@/components/icons/SocialIcons";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

export function Contact() {
  const { contact, person } = portfolioData;

  const dockItems = [
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/Sameerwalikar",
    },
    {
      title: "LeetCode",
      icon: <LeetCodeIcon className="h-full w-full" />,
      href: "https://leetcode.com/u/SameerWalikar/",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: "https://www.linkedin.com/in/sameer-walikar/",
    },
    {
      title: "Email",
      icon: <IconMail className="h-full w-full" />,
      href: `mailto:${person.email}`,
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full" />,
      href: "https://www.instagram.com/sameer.rw/?hl=en",
    },
  ];

  return (
    <section
      id="contact"
      className="border-t border-border/40 bg-surface/50 py-24 sm:py-32 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="section-container relative">
        {/* Soft green radial blur behind the card */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] rounded-full bg-emerald-500/10 blur-[80px] md:blur-[120px] pointer-events-none"></div>
        </div>

        <motion.div
          className="relative overflow-hidden glass mx-auto max-w-3xl rounded-3xl p-8 sm:p-12 border border-white/10 hover:border-emerald-500/30 transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.12)",
          }}
        >
          {/* Card Header Content */}
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <div className="mb-3 inline-flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-accent">
                Available for Select Projects
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              {contact.headline}
            </h2>
            
            {contact.subheadline && (
              <p className="mt-4 text-base leading-relaxed text-muted">
                {contact.subheadline}
              </p>
            )}
          </div>

          {/* Perks list */}
          <ul className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-sm text-muted">
            {contact.perks.map((perk, index) => (
              <React.Fragment key={perk}>
                {index > 0 && <span className="hidden md:inline text-border/60">|</span>}
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{perk}</span>
                </li>
              </React.Fragment>
            ))}
          </ul>

          {/* Action button */}
          <div className="flex justify-center">
            <Button href="/contact" variant="primary" size="lg" className="group">
              Contact Me
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Name & Tagline block + FloatingDock */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">{person.fullName}</h3>
              <p className="text-xs text-muted mt-1">{person.title} · {person.location}</p>
            </div>
            
            <div className="flex justify-center w-full py-2">
              <FloatingDock items={dockItems} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
