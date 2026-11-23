import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-[65vh] w-full flex flex-col items-center justify-center p-6 select-none">
      {/* Animated Glowing Logo Circle */}
      <div className="relative flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/25 via-indigo-500/20 to-amber-500/25 rounded-full blur-xl opacity-80 animate-pulse" />

        {/* Dual spinning outer rings */}
        <div className="h-20 w-20 rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-400 animate-spin" />
        <div className="absolute h-16 w-16 rounded-full border-2 border-transparent border-b-indigo-500 border-l-indigo-400 animate-[spin_2s_linear_infinite_reverse]" />

        {/* Centered Brand Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-11 w-11 rounded-2xl bg-card border border-border/80 shadow-md flex items-center justify-center p-2">
            <Image
              src="/logo.png"
              alt="MentorLagbe"
              width={30}
              height={30}
              className="h-6 w-auto object-contain animate-pulse"
              priority
            />
          </div>
        </div>
      </div>

      {/* Loading Status Pill */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-2xs text-xs font-semibold text-foreground">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          <span>Entering Dashboard</span>
        </div>

        {/* Animated Three Dots */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
        </div>

        <p className="text-[11px] text-muted-foreground tracking-wide pt-1">
          Synchronizing role & preparing workspace
        </p>
      </div>
    </div>
  );
}
