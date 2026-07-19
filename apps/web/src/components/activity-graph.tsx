"use client";
 
import { useIdeas } from "@/hooks/use-ideas";
 
export function ActivityGraph() {
  const { data } = useIdeas("all");
  const ideas = data?.ideas ?? [];
 
  // Calculate active ideas count
  const activeCount = ideas.filter((i) => i.status !== "kill").length;
 
  // Generate a beautiful sparkline path that goes edge-to-edge
  // Flat line when 0 ideas, dynamic wave line when ideas exist
  const pathD =
    activeCount > 0
      ? "M 0 22 Q 15 10 30 18 T 60 5 T 90 12 L 100 8"
      : "M 0 20 Q 25 20 50 20 T 100 20";
 
  return (
    <div className="card p-4 flex flex-col justify-between h-36 relative overflow-hidden group">
      <div className="space-y-1">
        <span className="text-[11px] font-sans font-medium text-zinc-500 uppercase tracking-widest block">
          Creative Spark
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-white">{activeCount}</span>
          <span className="text-[12px] text-zinc-500 font-sans">active ideas</span>
        </div>
        <p className="text-[12px] text-zinc-500 leading-relaxed font-sans max-w-[220px]">
          {activeCount > 0
            ? "Your ideas velocity is healthy this week."
            : "No active drafts yet. Capture your first idea."}
        </p>
      </div>
 
      {/* Edge-to-edge Sparkline Graph */}
      <div className="absolute bottom-0 left-0 right-0 h-10 w-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
