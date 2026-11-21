import React from "react";

export default function StudentApplicationsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title & Subtitle Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-56 bg-muted rounded-xl" />
        <div className="h-4 w-80 sm:w-96 bg-muted/60 rounded" />
      </div>

      {/* Applications Table Card Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="h-4 w-36 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>

        <div className="divide-y divide-border">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between gap-4"
            >
              {/* Tuition Title & Subject */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-4 w-60 bg-muted rounded" />
                <div className="h-3 w-36 bg-muted/60 rounded" />
              </div>

              {/* Tutor Info */}
              <div className="h-4 w-32 bg-muted rounded hidden sm:block" />

              {/* Monthly Fee */}
              <div className="h-5 w-20 bg-muted rounded hidden md:block" />

              {/* Status Badge */}
              <div className="h-6 w-24 bg-muted rounded-full" />

              {/* Action Button */}
              <div className="h-8 w-20 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
