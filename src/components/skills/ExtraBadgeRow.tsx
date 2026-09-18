"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ExtraBadge {
  src: string;
  name: string;
  category: string;
}

const EXTRA_BADGES: ExtraBadge[] = [
  { src: "/images/badges/coding/problem-solving.svg", name: "Problem Solving", category: "HackerRank" },
  { src: "/images/badges/coding/python.svg", name: "Python Gold", category: "HackerRank" },
  { src: "/images/badges/github/pull-shark.png", name: "Pull Shark", category: "GitHub" },
  { src: "/images/badges/github/yolo.png", name: "YOLO", category: "GitHub" },
  { src: "/images/badges/coding/100-days.png", name: "100 Days", category: "LeetCode" },
  { src: "/images/badges/cisco/cisco.png", name: "Cisco Certified", category: "Network" },
  { src: "/images/badges/github/quickdraw.png", name: "Quickdraw", category: "GitHub" },
];

export function ExtraBadgeRow() {
  return (
    <div className="mb-14 flex flex-col items-center justify-center">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted/70">
        Pinned Badges & Micro-Trophies
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {EXTRA_BADGES.map((badge, idx) => (
          <motion.div
            key={badge.name}
            className="group relative flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <motion.div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-surface/80 p-2.5 shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] sm:h-16 sm:w-16"
              animate={{
                y: [0, idx % 2 === 0 ? -4 : -6, 0],
              }}
              transition={{
                duration: 3 + (idx % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              whileHover={{
                scale: 1.15,
                rotate: (idx % 2 === 0 ? 1 : -1) * 6,
                transition: { duration: 0.2 },
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={badge.src}
                  alt={badge.name}
                  fill
                  sizes="64px"
                  className="object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </motion.div>

            {/* Micro Tooltip */}
            <div className="pointer-events-none absolute -bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/80 bg-surface-elevated px-2 py-0.5 text-[10px] font-medium text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
              {badge.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
