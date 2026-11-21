import React from "react";

export default function AdminTuitionsLoading() {
  return (
    <div className="max-w-8xl mx-auto pb-12 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-60 bg-muted rounded-xl" />
        <div className="h-4 w-96 bg-muted/60 rounded" />
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="h-10 w-full sm:w-80 bg-muted rounded-xl" />
        <div className="h-10 w-72 bg-muted rounded-xl" />
      </div>

      {/* Tuitions Moderation Table Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="h-4 w-36 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>

        <div className="divide-y divide-border">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between gap-4"
            >
              {/* Tuition Info */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-4 w-60 bg-muted rounded" />
                <div className="h-3 w-40 bg-muted/60 rounded" />
              </div>

              {/* Class & Mode */}
              <div className="h-5 w-24 bg-muted rounded hidden sm:block" />

              {/* Monthly Fee */}
              <div className="h-5 w-20 bg-muted rounded hidden md:block" />

              {/* Status Badge */}
              <div className="h-6 w-20 bg-muted rounded-full" />

              {/* Actions */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-20 bg-muted rounded-lg" />
                <div className="h-8 w-20 bg-muted rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
