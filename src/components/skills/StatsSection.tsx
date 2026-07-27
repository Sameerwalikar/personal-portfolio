"use client";

import { GitHubCalendar } from "@/components/stats/GitHubCalendar";
import { LeetCodeHeatmap } from "@/components/stats/LeetCodeHeatmap";

export function StatsSection() {
  return (
    <div className="space-y-5">
      <GitHubCalendar />
      <LeetCodeHeatmap />
    </div>
  );
}
