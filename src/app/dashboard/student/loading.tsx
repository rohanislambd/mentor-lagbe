import React from "react";

export default function StudentOverviewLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header with Greeting & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded-xl" />
          <div className="h-4 w-80 sm:w-96 bg-muted/60 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-36 bg-amber-500/20 rounded-xl" />
          <div className="h-10 w-36 bg-muted rounded-xl" />
        </div>
      </div>

      {/* 4 Reusable Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-28 bg-muted rounded" />
              <div className="w-10 h-10 rounded-xl bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-16 bg-muted rounded-lg" />
              <div className="h-3.5 w-40 bg-muted/60 rounded" />
            </div>
            <div className="pt-2 border-t border-border/60">
              <div className="h-3 w-28 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Grid: Recent Applications & Student Tier Perks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Applications Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-5 w-40 bg-muted rounded-md" />
              <div className="h-3.5 w-56 bg-muted/60 rounded" />
            </div>
            <div className="h-4 w-16 bg-muted rounded" />
          </div>

          <div className="space-y-2.5 pt-2">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-muted/30 border border-border/80 flex items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-4 w-52 bg-muted rounded" />
                  <div className="h-3 w-40 bg-muted/60 rounded" />
                </div>
                <div className="h-6 w-20 bg-muted rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Student Tier Card Skeleton */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="w-5 h-5 bg-muted rounded" />
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
              <div className="h-5 w-36 bg-muted rounded-md" />
              <div className="space-y-1 pt-1">
                <div className="h-3 w-full bg-muted/70 rounded" />
                <div className="h-3 w-4/5 bg-muted/70 rounded" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-9 w-full rounded-xl bg-muted/40 border border-border/40"
                />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <div className="h-10 w-full rounded-xl bg-amber-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
