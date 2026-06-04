"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export function HeroProfileImage() {
  const { person } = portfolioData;
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="group/avatar relative mx-auto flex w-full max-w-md items-center justify-center lg:mx-0 lg:max-w-none"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      {/* Ambient glow rings */}
      <div
        className="absolute inset-0 scale-110 rounded-full bg-accent/20 opacity-70 blur-3xl transition-opacity duration-500 group-hover/avatar:opacity-100"
        aria-hidden
      />
      <motion.div
        className="absolute h-[88%] w-[88%] rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="absolute h-[96%] w-[96%] rounded-full border border-dashed border-accent/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <motion.div
        ref={ref}
        className="group relative aspect-square w-full max-w-[320px] cursor-pointer sm:max-w-[380px] lg:max-w-[420px]"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Rotating gradient ring — intensifies on hover */}
        <div
          className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),var(--color-accent-dim),transparent,var(--color-accent-bright),var(--color-accent))] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.45)] motion-safe:animate-[spin_8s_linear_infinite] group-hover:motion-safe:animate-[spin_3s_linear_infinite]"
          aria-hidden
        />

        {/* Inner mask */}
        <div className="absolute inset-[3px] overflow-hidden rounded-full bg-background">
          {/* Slight zoom + lower focal point keeps face & shoulders centered in the circle */}
          <Image
            src="/images/profile.png"
            alt={`${person.fullName} — ${person.title}`}
            fill
            priority
            sizes="(max-width: 768px) 320px, 420px"
            className="object-cover object-[50%_38%] scale-[1.18] transition-all duration-500 group-hover:scale-[1.26] group-hover:brightness-110"
          />

          {/* Light vignette — does not hide the subject */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/25 via-transparent to-background/10 opacity-60 transition-opacity duration-500 group-hover:opacity-40"
            aria-hidden
          />

          {/* Shine sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
            aria-hidden
          />
        </div>

        {/* Floating accent dot */}
        <span
          className="absolute -right-1 top-8 h-4 w-4 rounded-full border-2 border-background bg-accent shadow-[0_0_12px_rgba(34,197,94,0.8)] transition-transform duration-300 group-hover:scale-125"
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}
