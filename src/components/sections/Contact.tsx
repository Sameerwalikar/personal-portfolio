"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function Contact() {
  const { contact, socials } = portfolioData;

  const publicSocials = socials.filter(
    (s) => s.icon === "linkedin" || s.icon === "leetcode",
  );

  return (
    <section
      id="contact"
      className="border-t border-border/40 bg-surface/50 py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <motion.div
          className="glass glow-ring mx-auto max-w-3xl rounded-3xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="Available for Select Projects"
            title={contact.headline}
            description={contact.subheadline}
            align="center"
            className="mx-auto mb-8"
          />

          <ul className="mb-10 space-y-3">
            {contact.perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center justify-center gap-3 text-sm text-muted"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                {perk}
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Me
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {publicSocials.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-3 border-t border-border/60 pt-8">
              {publicSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted transition-all hover:border-accent hover:text-accent"
                >
                  <SocialIcon icon={social.icon} className="h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
