"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function Contact() {
  const { person, contact, socials } = portfolioData;

  return (
    <section
      id="contact"
      className="border-t border-border/40 bg-surface/50 py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <div className="glass glow-ring overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-14">
              <SectionHeading
                eyebrow="Available for Select Projects"
                title={contact.headline}
                description={contact.subheadline}
                className="mb-8"
              />

              <ul className="mb-10 space-y-3">
                {contact.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button
                  href={`mailto:${person.email}?subject=Portfolio%20Inquiry%20-%20Sameer%20Walikar`}
                  variant="primary"
                  size="lg"
                  external
                >
                  <Mail className="h-5 w-5" />
                  Email Me
                </Button>
                <Button href={`tel:${person.phone.replace(/\s/g, "")}`} variant="outline" size="lg" external>
                  <Phone className="h-5 w-5" />
                  Call
                </Button>
              </div>
            </div>

            <motion.div
              className="flex flex-col justify-center border-t border-border/60 bg-surface-elevated/80 p-8 sm:p-12 lg:border-l lg:border-t-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-6 text-sm font-medium uppercase tracking-widest text-accent">
                Connect
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${person.email}`}
                  className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-accent/50 hover:bg-accent/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <p className="font-medium text-foreground group-hover:text-accent">
                      {person.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${person.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-accent/50 hover:bg-accent/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Phone</p>
                    <p className="font-medium text-foreground group-hover:text-accent">
                      {person.phone}
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {socials
                  .filter((s) => s.icon === "linkedin" || s.icon === "leetcode")
                  .map((social) => (
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
