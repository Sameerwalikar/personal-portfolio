"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BADGE_GROUPS } from "@/data/badgeLinks";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
};

export function BadgeGrid() {
  return (
    <div className="space-y-8">
      {BADGE_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">
            {group.label}
          </p>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {group.badges.map((badge) => (
              <motion.a
                key={badge.src}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={badge.alt}
                variants={item}
                whileHover={{
                  scale: 1.12,
                  y: -4,
                  boxShadow: "0 0 20px rgba(34,197,94,0.35)",
                  transition: { type: "spring", stiffness: 400, damping: 18 },
                }}
                className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-20 sm:w-20"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
