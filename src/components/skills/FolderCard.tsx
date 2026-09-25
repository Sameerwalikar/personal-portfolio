"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FolderItem } from "@/data/folders";

interface FolderCardProps {
  folder: FolderItem;
  index: number;
  isSelected?: boolean;
  onClick: () => void;
}

export function FolderCard({ folder, index, isSelected, onClick }: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const active = isHovered || isSelected;

  // Paper offset presets matching the macOS fanning cards look
  const papers = folder.previewPapers;

  return (
    <div
      className="group relative flex flex-col items-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
      }}
    >
      {/* Folder Container with lift animation */}
      <motion.div
        className="relative w-36 sm:w-44 aspect-[4/3] flex items-center justify-center"
        animate={{
          y: active ? -10 : 0,
          scale: active ? 1.05 : 1,
        }}
        transition={{
          duration: 0.42,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {/* ── 1. Folder Back Panel ── */}
        <div
          className="absolute inset-x-0 bottom-0 top-[12%] rounded-xl shadow-md border border-purple-400/30 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(91, 33, 182, 0.92))",
            boxShadow: "0 8px 24px -4px rgba(109, 40, 217, 0.45)",
          }}
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Folder Top Tab Notch */}
        <div
          className="absolute left-2 top-[3%] w-[42%] h-[14%] rounded-t-lg border-t border-l border-r border-purple-400/40"
          style={{
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.98), rgba(126, 34, 206, 0.95))",
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* ── 2. Sandwiched Preview Papers (Fanning Outward) ── */}
        <div className="absolute inset-x-3 inset-y-2 z-10 pointer-events-none">
          {papers.map((paper, pIdx) => {
            // Paper fanning coordinates when active vs resting
            let restX = 0;
            const restY = 2;
            let restRotate = 0;

            let activeX = 0;
            let activeY = -34;
            let activeRotate = 0;
            let activeScale = 1.12;

            if (papers.length === 2) {
              if (pIdx === 0) {
                restX = -6;
                restRotate = -4;
                activeX = -20;
                activeY = -32;
                activeRotate = -10;
              } else {
                restX = 6;
                restRotate = 4;
                activeX = 20;
                activeY = -32;
                activeRotate = 10;
              }
            } else if (papers.length >= 3) {
              if (pIdx === 0) {
                restX = -10;
                restRotate = -6;
                activeX = -28;
                activeY = -30;
                activeRotate = -14;
              } else if (pIdx === 1) {
                restX = 10;
                restRotate = 6;
                activeX = 28;
                activeY = -30;
                activeRotate = 14;
              } else {
                restX = 0;
                restRotate = 0;
                activeX = 0;
                activeY = -40;
                activeRotate = 0;
                activeScale = 1.18;
              }
            }

            return (
              <motion.div
                key={paper.title + pIdx}
                className="absolute left-1/2 bottom-3 w-[72%] h-[82%] -translate-x-1/2 rounded-lg border border-border/80 bg-surface-elevated/95 p-2 shadow-lg backdrop-blur-md overflow-hidden flex flex-col justify-between"
                style={{
                  transformOrigin: "bottom center",
                  boxShadow: active
                    ? "0 12px 28px rgba(0,0,0,0.5), 0 0 16px rgba(168,85,247,0.3)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
                  zIndex: pIdx === 2 ? 3 : pIdx === 0 ? 2 : 1,
                }}
                animate={{
                  x: `calc(-50% + ${active ? activeX : restX}px)`,
                  y: active ? activeY : restY,
                  rotate: active ? activeRotate : restRotate,
                  scale: active ? activeScale : 0.95,
                  opacity: active ? 1 : 0.85,
                }}
                transition={{
                  duration: 0.44,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                {/* Header / Title */}
                <div className="border-b border-border/50 pb-1 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted truncate">
                    {paper.title}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
                </div>

                {/* Real Thumbnails / Items Grid */}
                <div className="my-auto grid grid-cols-2 gap-1.5 py-1">
                  {paper.items.slice(0, 4).map((item, itemIdx) => (
                    <div
                      key={item.label + itemIdx}
                      className="flex items-center gap-1 overflow-hidden rounded bg-surface/80 p-0.5"
                    >
                      <div className="relative h-4 w-4 shrink-0 rounded-sm overflow-hidden bg-background/50">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          sizes="16px"
                          className="object-contain p-0.5"
                        />
                      </div>
                      <span className="truncate text-[8px] font-medium leading-none text-foreground/90">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom detail pill or progress indicator */}
                <div className="flex items-center justify-between text-[7px] text-muted/80">
                  <span className="truncate">
                    {paper.items[0]?.sublabel || `${paper.items.length} items`}
                  </span>
                  <span className="text-accent font-semibold">VIEW</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 3. Front Flap (Rotates open around bottom edge) ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[68%] rounded-xl border border-purple-300/40 z-20 overflow-hidden"
          style={{
            transformOrigin: "bottom center",
            background: "linear-gradient(150deg, rgba(168, 85, 247, 0.92), rgba(126, 34, 206, 0.88))",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 -1px 0 rgba(109, 40, 217, 0.4), 0 12px 24px -6px rgba(0, 0, 0, 0.5)",
          }}
          animate={{
            rotateX: active ? -32 : 0,
            y: active ? 2 : 0,
          }}
          transition={{
            duration: 0.44,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          {/* Glass reflection gradient across front flap */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* Center Folder Category Badge / Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200/90 drop-shadow-sm">
              {folder.category}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Metadata below Folder ── */}
      <div className="mt-3.5 flex flex-col items-center text-center">
        <h3 className="text-sm font-bold text-foreground tracking-tight transition-colors group-hover:text-accent">
          {folder.title}
        </h3>
        <span className="text-xs font-medium text-muted/80">
          {folder.count}
        </span>
      </div>
    </div>
  );
}
