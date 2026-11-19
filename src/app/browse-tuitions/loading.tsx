import React from "react";
import { TuitionGridSkeleton } from "@/components/tuitions/TuitionCardSkeleton";

export default function BrowseTuitionsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-28 bg-muted rounded-full" />
        <div className="h-9 w-72 bg-muted rounded-lg" />
        <div className="h-4 w-56 bg-muted/60 rounded" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-16 bg-card border border-border/80 rounded-2xl p-4" />

      {/* Grid Skeleton */}
      <TuitionGridSkeleton count={6} />
    </div>
  );
}
