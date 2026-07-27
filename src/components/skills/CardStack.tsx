"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StackCard } from "@/components/skills/StackCard";
import { CardModal } from "@/components/skills/CardModal";
import { SKILL_CATEGORIES } from "@/data/skillCategories";

/* ─── Skill panel grid (shown inside modal) ───────────────────── */
function SkillModalContent({ id }: { id: string }) {
  const cat = SKILL_CATEGORIES.find((c) => c.id === id);
  if (!cat) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cat.panels.map((panel) => (
        <div
          key={panel.label}
          className="rounded-xl border border-border/50 bg-surface-elevated p-4"
        >
          <h4 className="mb-3 border-b border-border/40 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
            {panel.label}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {panel.items.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-1.5 text-center">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-background/60">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    sizes="36px"
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="text-[10px] leading-tight text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Mobile flat-card list ───────────────────────────────────── */
function MobileFlatList({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      {SKILL_CATEGORIES.map((cat) => {
        const itemCount = cat.panels.reduce((s, p) => s + p.items.length, 0);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onOpen(cat.id)}
            className={`flex items-center justify-between rounded-2xl border border-white/10
              bg-gradient-to-br ${cat.gradient} px-5 py-4 text-left shadow-lg
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
          >
            <div>
              <p className="text-base font-bold text-white">{cat.title}</p>
              <p className="text-xs text-white/60">
                {itemCount} items · {cat.subtitle}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M7 7l3-3 3 3M7 13l3 3 3-3"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

/* ─── CardStack (desktop fan + mobile list) ───────────────────── */
export function CardStack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const total = SKILL_CATEGORIES.length;
  /* Fan spread: total angle degrees across all cards */
  const SPREAD_DEG = 40;
  const CARD_X_GAP = 80; /* horizontal px between card centres */

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeId);

  return (
    <>
      {/* ── Desktop fan ──────────────────────────────────────────── */}
      <div
        /* Height must comfortably contain lifted card (56 * 4 + 60px lift headroom) */
        className="relative hidden h-80 w-full sm:block"
        role="list"
        aria-label="Skill categories"
      >
        {SKILL_CATEGORIES.map((cat, i) => {
          const mid = (total - 1) / 2;
          /* Symmetric fan: leftmost card gets -SPREAD/2, rightmost +SPREAD/2 */
          const angle = ((i - mid) / (total - 1)) * SPREAD_DEG;
          const xOffset = (i - mid) * CARD_X_GAP;

          return (
            <StackCard
              key={cat.id}
              category={cat}
              index={i}
              total={total}
              baseAngle={angle}
              baseX={xOffset}
              isHovered={hoveredId === cat.id}
              onHover={() => setHoveredId(cat.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => setActiveId(cat.id)}
            />
          );
        })}
      </div>

      {/* ── Mobile flat list ─────────────────────────────────────── */}
      <MobileFlatList onOpen={(id) => setActiveId(id)} />

      {/* ── Hint caption ─────────────────────────────────────────── */}
      <motion.p
        className="mt-6 hidden text-center text-xs text-muted/50 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Hover to lift · Click to explore
      </motion.p>

      {/* ── Modal ────────────────────────────────────────────────── */}
      <CardModal
        title={activeCategory?.title ?? ""}
        isOpen={!!activeId}
        onClose={() => setActiveId(null)}
      >
        {activeId && <SkillModalContent id={activeId} />}
      </CardModal>
    </>
  );
}
