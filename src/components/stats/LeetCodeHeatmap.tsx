"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────── */
interface CalendarData {
  calendar: Record<string, number>; /* unix-ts → count */
  totalActiveDays: number;
  streak: number;
}

/* ─── Color scale matching LeetCode palette on dark background ── */
function getColor(count: number): string {
  if (count === 0)  return "rgba(255,255,255,0.05)";
  if (count <= 1)   return "#1a3d2b";
  if (count <= 3)   return "#1e6b3a";
  if (count <= 6)   return "#22c55e";
  return "#4ade80";
}

function getTooltip(dateStr: string, count: number): string {
  const d = new Date(dateStr);
  const label = d.toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  return count === 0 ? `${label} — No submissions` : `${label} — ${count} submission${count > 1 ? "s" : ""}`;
}

/* ─── Build a 52-week grid (364 days) ending today ─────────────── */
function buildGrid(calendar: Record<string, number>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* Start on the most recent Sunday >= 364 days ago */
  const start = new Date(today);
  start.setDate(start.getDate() - 363);
  const dow = start.getDay();
  start.setDate(start.getDate() - dow);

  const weeks: { date: string; count: number }[][] = [];
  const cur = new Date(start);

  while (cur <= today) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const ds = cur.toISOString().slice(0, 10);
      const ts = String(Math.floor(cur.getTime() / 1000));
      const count = calendar[ts] ?? calendar[ds] ?? 0;
      week.push({ date: ds, count });
      cur.setDate(cur.getDate() + 1);
      if (cur > today && d < 6) {
        /* pad remaining days of last week with empty */
        for (let r = d + 1; r < 7; r++) {
          week.push({ date: "", count: -1 });
        }
        break;
      }
    }
    weeks.push(week);
  }
  return weeks;
}

/* ─── Skeleton ────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {Array.from({ length: 52 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => (
              <div
                key={d}
                className="h-3 w-3 rounded-sm animate-pulse"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────── */
export function LeetCodeHeatmap() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode?username=SameerWalikar")
      .then((r) => {
        if (!r.ok) throw new Error("api-error");
        return r.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-foreground">LeetCode Activity</p>
          {data && (
            <p className="text-xs text-muted">
              {data.totalActiveDays} active days · {data.streak} day streak
            </p>
          )}
        </div>
        <a
          href="https://leetcode.com/u/SameerWalikar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <ExternalLink className="h-3 w-3" aria-hidden />
          View Profile
        </a>
      </div>

      {loading && <Skeleton />}

      {error && !loading && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="text-3xl" aria-hidden>📊</span>
          <p className="text-sm font-medium text-foreground/70">
            LeetCode activity temporarily unavailable
          </p>
          <p className="text-xs text-muted">Check back soon</p>
          <a
            href="https://leetcode.com/u/SameerWalikar/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/10"
          >
            <ExternalLink className="h-3 w-3" aria-hidden />
            Open LeetCode
          </a>
        </div>
      )}

      {data && !loading && (
        <div className="overflow-x-auto">
          <div className="flex gap-[3px] min-w-max" role="img" aria-label="LeetCode submission heatmap">
            {buildGrid(data.calendar).map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell, di) =>
                  cell.count === -1 ? (
                    <div key={di} className="h-3 w-3" />
                  ) : (
                    <div
                      key={di}
                      className="h-3 w-3 rounded-sm transition-transform hover:scale-125"
                      style={{ background: getColor(cell.count) }}
                      title={cell.date ? getTooltip(cell.date, cell.count) : undefined}
                      aria-label={cell.date ? getTooltip(cell.date, cell.count) : undefined}
                    />
                  )
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-2 justify-end">
            <span className="text-[10px] text-muted/50">Less</span>
            {[0, 1, 3, 6, 9].map((v) => (
              <div
                key={v}
                className="h-3 w-3 rounded-sm"
                style={{ background: getColor(v) }}
                aria-hidden
              />
            ))}
            <span className="text-[10px] text-muted/50">More</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
