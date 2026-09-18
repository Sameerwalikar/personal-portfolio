"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderItem, FOLDERS_DATA } from "@/data/folders";
import { FolderCard } from "@/components/skills/FolderCard";

interface FolderDeckProps {
  onSelectFolder: (folder: FolderItem) => void;
}

// Arc offsets and rotations matching the reference CSS folder deck
const ARC_CONFIG = [
  { rotate: -24, y: 46, zIndex: 1 },
  { rotate: -12, y: 14, zIndex: 2 },
  { rotate: 0,   y: 0,  zIndex: 3 },
  { rotate: 12,  y: 14, zIndex: 2 },
  { rotate: 24,  y: 46, zIndex: 1 },
];

export function FolderDeck({ onSelectFolder }: FolderDeckProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── Desktop Arc Deck ── */}
      <div className="hidden md:flex items-start justify-center pt-8 pb-16 min-h-[280px] w-full max-w-4xl mx-auto overflow-visible select-none">
        {FOLDERS_DATA.map((folder, idx) => {
          const config = ARC_CONFIG[idx] || { rotate: 0, y: 0, zIndex: 1 };
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={folder.id}
              className="relative -mx-6 lg:-mx-7"
              style={{
                zIndex: isHovered ? 25 : config.zIndex,
                transformOrigin: "50% 140%",
              }}
              animate={{
                y: isHovered ? config.y - 16 : config.y,
                rotate: isHovered ? config.rotate * 0.4 : config.rotate,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                duration: 0.38,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <FolderCard
                folder={folder}
                index={idx}
                isSelected={isHovered}
                onClick={() => onSelectFolder(folder)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Mobile / Tablet Scroll or Grid ── */}
      <div className="flex md:hidden w-full flex-col gap-6">
        <p className="text-center text-xs text-muted">
          Tap a folder to preview its contents and click to explore details.
        </p>
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 justify-items-center">
          {FOLDERS_DATA.map((folder, idx) => (
            <div key={folder.id} className="w-full max-w-[170px] flex justify-center">
              <FolderCard
                folder={folder}
                index={idx}
                onClick={() => onSelectFolder(folder)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
