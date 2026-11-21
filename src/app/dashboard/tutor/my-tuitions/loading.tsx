import React from "react";

export default function MyTuitionsLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20" />
            <div className="h-8 w-60 bg-muted rounded-xl" />
          </div>
          <div className="h-4 w-96 bg-muted/60 rounded" />
        </div>
        <div className="h-10 w-36 bg-amber-500/20 rounded-xl" />
      </div>

      {/* Summary KPI Badges/Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl border border-border bg-card space-y-2"
          >
            <div className="h-3 w-20 bg-muted/60 rounded" />
            <div className="h-6 w-12 bg-muted rounded" />
          </div>
        ))}
      </div>

      {/* Tuitions Table Skeleton */}
      <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted/60 rounded" />
        </div>

        {/* Table Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-muted/30 border-b border-border/80">
          <div className="col-span-4 h-3.5 w-28 bg-muted rounded" />
          <div className="col-span-2 h-3.5 w-24 bg-muted rounded" />
          <div className="col-span-2 h-3.5 w-20 bg-muted rounded" />
          <div className="col-span-2 h-3.5 w-20 bg-muted rounded" />
          <div className="col-span-1 h-3.5 w-12 bg-muted rounded" />
          <div className="col-span-1 h-3.5 w-16 bg-muted rounded text-right" />
        </div>

        {/* Table Rows Skeleton */}
        <div className="divide-y divide-border/60">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 sm:px-6 sm:py-4 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 md:items-center"
            >
              {/* Tuition Details */}
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-4 w-40 bg-muted rounded" />
                  <div className="h-3 w-28 bg-muted/60 rounded" />
                </div>
              </div>

              {/* Subject & Class */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="h-3.5 w-24 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted/60 rounded" />
              </div>

              {/* Fee & Schedule */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="h-3.5 w-20 bg-muted rounded" />
                <div className="h-3 w-24 bg-muted/60 rounded" />
              </div>

              {/* Approval Badge */}
              <div className="md:col-span-2">
                <div className="h-6 w-24 bg-muted rounded-full" />
              </div>

              {/* Active Toggle */}
              <div className="md:col-span-1">
                <div className="h-5 w-9 bg-muted rounded-full" />
              </div>

              {/* Actions */}
              <div className="md:col-span-1 flex items-center justify-end gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-muted" />
                <div className="w-8 h-8 rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
