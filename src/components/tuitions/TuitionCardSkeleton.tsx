import React from "react";

export function TuitionCardSkeleton() {
  return (
    <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs flex flex-col h-full animate-pulse">
      {/* Banner Skeleton with matching h-52 */}
      <div className="h-52 w-145 bg-muted/80 p-3 flex justify-between items-start">
        <div className="h-6 w-24 bg-muted-foreground/20 rounded-full" />
        <div className="h-6 w-16 bg-muted-foreground/20 rounded-full" />
      </div>

      {/* Body Skeleton */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-muted-foreground/20 rounded-md" />
            <div className="h-3 w-16 bg-muted-foreground/20 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4.5 w-full bg-muted-foreground/25 rounded" />
            <div className="h-4.5 w-4/5 bg-muted-foreground/25 rounded" />
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-muted-foreground/15 rounded" />
            <div className="h-3 w-3/4 bg-muted-foreground/15 rounded" />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {/* Tutor Info Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/25 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 w-32 bg-muted-foreground/25 rounded" />
              <div className="h-2.5 w-24 bg-muted-foreground/15 rounded" />
            </div>
          </div>

          {/* Pricing & Button Skeleton */}
          <div className="border-t border-border/80 pt-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-2.5 w-14 bg-muted-foreground/20 rounded" />
              <div className="h-6 w-24 bg-muted-foreground/30 rounded" />
            </div>
            <div className="h-9 w-28 bg-muted-foreground/25 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TuitionGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TuitionCardSkeleton key={i} />
      ))}
    </div>
  );
}
