import React from "react";

export default function TutorApplicantsLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="space-y-2">
            <div className="h-7 w-56 bg-muted rounded-xl" />
            <div className="h-3.5 w-80 bg-muted/60 rounded" />
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-7 w-24 bg-amber-500/10 rounded-xl" />
            <div className="h-7 w-24 bg-emerald-500/10 rounded-xl" />
            <div className="h-7 w-24 bg-rose-500/10 rounded-xl" />
          </div>
        </div>

        {/* Filter Controls (Search + Tabs) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="h-10 w-full sm:w-72 bg-muted rounded-xl" />
          <div className="flex items-center gap-1.5">
            <div className="h-9 w-16 bg-muted rounded-lg" />
            <div className="h-9 w-24 bg-muted rounded-lg" />
            <div className="h-9 w-24 bg-muted rounded-lg" />
            <div className="h-9 w-24 bg-muted rounded-lg" />
          </div>
        </div>
      </div>

      {/* Applicants Table Skeleton */}
      <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-xs">
        {/* Table Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 border-b border-border/80">
          <div className="col-span-3 h-3.5 w-32 bg-muted rounded" />
          <div className="col-span-2 h-3.5 w-24 bg-muted rounded" />
          <div className="col-span-3 h-3.5 w-28 bg-muted rounded" />
          <div className="col-span-1 h-3.5 w-16 bg-muted rounded" />
          <div className="col-span-1 h-3.5 w-16 bg-muted rounded" />
          <div className="col-span-2 h-3.5 w-20 bg-muted rounded text-right" />
        </div>

        {/* Table Rows Skeleton */}
        <div className="divide-y divide-border/60">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 sm:px-6 sm:py-4 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 md:items-center"
            >
              {/* Student Name & Email */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-40 bg-muted/60 rounded" />
                </div>
              </div>

              {/* Phone & Schedule */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="h-3.5 w-24 bg-muted rounded" />
                <div className="h-3 w-28 bg-muted/60 rounded" />
              </div>

              {/* Tuition Post */}
              <div className="md:col-span-3 space-y-1.5">
                <div className="h-3.5 w-36 bg-muted rounded" />
                <div className="h-3 w-24 bg-muted/60 rounded" />
              </div>

              {/* Applied Date */}
              <div className="md:col-span-1">
                <div className="h-3.5 w-16 bg-muted/60 rounded" />
              </div>

              {/* Status Badge */}
              <div className="md:col-span-1">
                <div className="h-6 w-20 bg-muted rounded-full" />
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <div className="h-8 w-20 bg-emerald-500/20 rounded-lg" />
                <div className="h-8 w-20 bg-rose-500/20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
