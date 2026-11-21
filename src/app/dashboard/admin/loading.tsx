import React from "react";

export default function AdminOverviewLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Page Title & Action Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-56 bg-muted rounded-xl" />
            <div className="h-6 w-24 bg-muted/70 rounded-full" />
          </div>
          <div className="h-4 w-80 sm:w-96 bg-muted/60 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-muted rounded-xl" />
          <div className="h-9 w-36 bg-amber-500/20 rounded-xl" />
        </div>
      </div>

      {/* 4 Core KPI Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="w-10 h-10 rounded-xl bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-20 bg-muted rounded-lg" />
              <div className="h-3.5 w-36 bg-muted/60 rounded" />
            </div>
            <div className="pt-2 border-t border-border/60">
              <div className="h-3 w-28 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 2 Analytics Breakdown Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-5 w-44 bg-muted rounded-md" />
                <div className="h-3.5 w-56 bg-muted/60 rounded" />
              </div>
              <div className="h-4 w-16 bg-muted rounded" />
            </div>

            {/* Progress Bar Skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded-full bg-muted" />
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-3 w-24 bg-muted rounded" />
              </div>
            </div>

            {/* 2 Metric Boxes */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-6 w-16 bg-muted rounded-md" />
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-6 w-16 bg-muted rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
