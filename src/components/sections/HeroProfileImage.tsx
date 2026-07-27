"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { portfolioData } from "@/data/portfolio";
import Bb8Toggle from "@/components/ui/bb8-toggle";

/* ─── Floating particles ──────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function useParticles(count: number): Particle[] {
  return useMemo(
    () =>
      /* Deterministic positions — avoid SSR/client mismatch */
      Array.from({ length: count }, (_, i) => {
        return {
          id: i,
          x: ((i * 73 + 17) % 100),
          y: ((i * 47 + 31) % 100),
          size: 1.5 + (i % 3) * 0.9,
          delay: (i * 0.37) % 4,
          duration: 4 + (i % 5),
          opacity: 0.25 + ((i / count) * 0.55),
        };
      }),
    [count],
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export function HeroProfileImage() {
  const { person } = portfolioData;
  const ref = useRef<HTMLDivElement>(null);
  const [isRealPhoto, setIsRealPhoto] = useState(false); // false = pixel art (default), true = real photo
  const particles = useParticles(12);

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
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    /* Outer wrapper: full column width, children centred */
    <div className="flex flex-col items-center w-full">
      {/* Avatar container — centres the image + decorative rings */}
      <motion.div
        className="group/avatar relative flex items-center justify-center w-full max-w-[420px]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 scale-110 rounded-full bg-accent/20 opacity-70 blur-3xl transition-opacity duration-500 group-hover/avatar:opacity-100"
          aria-hidden
        />

        {/* Outer spinning rings */}
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

        {/* Floating particles */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          aria-hidden
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-accent"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{
                y: [0, -60, -100],
                x: [0, (p.id % 2 === 0 ? 1 : -1) * 15],
                opacity: [0, p.opacity, 0],
                scale: [1, 0.8, 0.1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Pulse ring */}
        <div
          className="absolute h-[92%] w-[92%] rounded-full border border-accent/10 animate-pulse-ring"
          aria-hidden
        />

        {/* 3-D tilt card */}
        <motion.div
          ref={ref}
          className="group relative aspect-square w-full max-w-[320px] cursor-pointer sm:max-w-[380px] lg:max-w-[420px]"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Rotating gradient ring */}
          <div
            className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),var(--color-accent-dim),transparent,var(--color-accent-bright),var(--color-accent))] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.45)] motion-safe:animate-[spin_8s_linear_infinite] group-hover:motion-safe:animate-[spin_3s_linear_infinite]"
            aria-hidden
          />

          {/* Inner mask */}
          <div className="absolute inset-[3px] overflow-hidden rounded-full bg-background">
            {/* Crossfade between pixel art and real photo */}
            <AnimatePresence mode="sync">
              {!isRealPhoto ? (
                <motion.div
                  key="pixel"
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src="/images/pixel.png"
                    alt={`${person.fullName} — pixel art`}
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover object-center"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="real"
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src="/images/profile.png"
                    alt={`${person.fullName} — ${person.title}`}
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover object-[50%_38%] scale-[1.18] transition-all duration-500 group-hover:scale-[1.26] group-hover:brightness-110"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/25 via-transparent to-background/10 opacity-60 transition-opacity duration-500 group-hover:opacity-40"
              aria-hidden
            />

            {/* Shine sweep */}
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

          {/* Mode badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={!isRealPhoto ? "pixel-label" : "real-label"}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-surface/90 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm"
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              {!isRealPhoto ? "🎮 Pixel Art" : "📷 Real Photo"}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Toggle — sits below the avatar wrapper, perfectly centred */}
      <motion.div
        className="mt-8 w-full flex justify-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* Premium pill container */}
        <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-surface/80 px-4 py-2.5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          {/* Label */}
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted select-none whitespace-nowrap leading-none">
            Graphic Mode
          </span>
          <div style={{ fontSize: "5.5px" }} className="flex items-center">
            <Bb8Toggle checked={isRealPhoto} onChange={setIsRealPhoto} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
