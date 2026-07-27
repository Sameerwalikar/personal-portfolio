"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubCalendar as GitHubCalendarLib } from "react-github-calendar";

/* Green scale matching the site's accent palette */
const THEME = {
  light: ["#0d2818", "#1a3d2b", "#1e6b3a", "#22c55e", "#4ade80"],
  dark:  ["#0d2818", "#1a3d2b", "#1e6b3a", "#22c55e", "#4ade80"],
};

export function GitHubCalendar() {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-foreground">GitHub Contributions</p>
        <a
          href="https://github.com/Sameerwalikar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <ExternalLink className="h-3 w-3" aria-hidden />
          View GitHub
        </a>
      </div>

      {/* Calendar — horizontally scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <GitHubCalendarLib
            username="Sameerwalikar"
            theme={THEME}
            colorScheme="dark"
            blockSize={12}
            blockMargin={3}
            fontSize={11}
            style={{ color: "var(--color-muted)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
