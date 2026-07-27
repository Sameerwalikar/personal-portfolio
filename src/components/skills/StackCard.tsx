"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/data/skillCategories";

interface StackCardProps {
  category: SkillCategory;
  index: number;
  total: number;
  /** CSS left offset from center (px) — applied as static style, never animated */
  baseX: number;
  /** Resting fan rotation (deg) */
  baseAngle: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export function StackCard({
  category,
  index,
  baseAngle,
  baseX,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: StackCardProps) {
  const itemCount = category.panels.reduce((s, p) => s + p.items.length, 0);

  return (
    <motion.button
      type="button"
      aria-label={`Open ${category.title} skills`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      /* ── Positioning: absolute, x handled by CSS left — NOT animated ── */
      className={`absolute bottom-0 flex h-52 w-36 origin-bottom cursor-pointer
        flex-col justify-end rounded-2xl border border-white/10 p-4 text-left
        shadow-xl focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent sm:h-56 sm:w-40
        bg-gradient-to-br ${category.gradient}`}
      style={{
        left: `calc(50% + ${baseX}px - 72px)`, /* 72 = half card width (144/2) */
        /* only z-index is toggled via style — keeps it outside Framer layout */
        zIndex: isHovered ? 50 : index + 1,
      }}
      /* ── Only rotate / y / scale are spring-animated ── */
      animate={{
        rotate: isHovered ? 0 : baseAngle,
        y: isHovered ? -52 : 0,
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Corner dot */}
      <div
        className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white/25"
        aria-hidden
      />

      {/* Hover accent bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-white/40"
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.25 }}
        aria-hidden
      />

      <span className="relative text-base font-bold leading-tight text-white sm:text-lg">
        {category.title}
      </span>
      <span className="relative mt-1 text-xs text-white/60 sm:text-sm">
        {itemCount} items · {category.subtitle}
      </span>
    </motion.button>
  );
}
