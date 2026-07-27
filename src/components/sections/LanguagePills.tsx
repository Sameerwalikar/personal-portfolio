"use client";

import { motion } from "framer-motion";

const LANGUAGES = [
  {
    name: "Python",
    icon: "🐍",
    color: "from-yellow-500/20 to-blue-500/20",
    border: "border-yellow-500/30 hover:border-yellow-400/60",
    glow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]",
  },
  {
    name: "Java",
    icon: "☕",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30 hover:border-orange-400/60",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
  },
  {
    name: "TypeScript",
    icon: "𝗧𝗦",
    color: "from-blue-500/20 to-blue-700/20",
    border: "border-blue-500/30 hover:border-blue-400/60",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  },
  {
    name: "JavaScript",
    icon: "𝗝𝗦",
    color: "from-yellow-400/20 to-yellow-600/20",
    border: "border-yellow-400/30 hover:border-yellow-300/60",
    glow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
};

const pill = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

export function LanguagePills() {
  return (
    <motion.div
      className="flex flex-wrap gap-3"
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="Programming languages"
    >
      {LANGUAGES.map((lang) => (
        <motion.div
          key={lang.name}
          variants={pill}
          whileHover={{ scale: 1.08, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`
            inline-flex items-center gap-2 rounded-full border px-4 py-2
            bg-gradient-to-br ${lang.color} ${lang.border} ${lang.glow}
            text-sm font-medium text-foreground/90
            cursor-default transition-all duration-300 backdrop-blur-sm
          `}
        >
          <span className="text-base leading-none" aria-hidden>
            {lang.icon}
          </span>
          {lang.name}
        </motion.div>
      ))}
    </motion.div>
  );
}
