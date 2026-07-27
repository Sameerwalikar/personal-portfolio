"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME_SEQUENCE = [
  { text: "Sameer Walikar", lang: "English", script: "latin" },
  { text: "समीर वालिकर", lang: "Hindi", script: "devanagari" },
  { text: "ಸಮೀರ್ ವಾಲಿಕರ್", lang: "Kannada", script: "kannada" },
  { text: "サミール・ワリカー", lang: "Japanese", script: "japanese" },
] as const;

export function HeroNameAnimation() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % NAME_SEQUENCE.length);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

  const current = NAME_SEQUENCE[index];

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={advance}
      title={`${current.lang}: ${current.text}`}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(12px)", y: -8 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="text-gradient">{current.text}</span>
        </motion.h1>
      </AnimatePresence>

      {/* Language label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`lang-${index}`}
          className="absolute -bottom-6 left-0 text-xs font-medium tracking-widest text-accent/60 uppercase"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 6 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {current.lang}
        </motion.span>
      </AnimatePresence>

      {/* Hover hint dots */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/name:opacity-100 transition-opacity duration-300">
        {NAME_SEQUENCE.map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === index ? "var(--color-accent)" : "var(--color-border)",
              transform: i === index ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
