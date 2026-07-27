import dynamic from "next/dynamic";
import { LazyMounted } from "@/components/ui/lazy-mounted";

const GitHubCalendar = dynamic(
  () => import("@/components/stats/GitHubCalendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const LeetCodeHeatmap = dynamic(
  () => import("@/components/stats/LeetCodeHeatmap").then((mod) => mod.LeetCodeHeatmap),
  { ssr: false }
);

export function StatsSection() {
  return (
    <div className="space-y-5">
      <LazyMounted minHeight="150px">
        <GitHubCalendar />
      </LazyMounted>
      <LazyMounted minHeight="150px">
        <LeetCodeHeatmap />
      </LazyMounted>
    </div>
  );
}
