import React from "react";

export default function AdminProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-pulse">
      {/* Title & Description */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded-xl" />
        <div className="h-4 w-72 bg-muted/60 rounded" />
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Profile Avatar Skeleton */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-muted shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-8 w-36 bg-muted rounded-lg" />
          </div>
        </div>

        {/* Form Inputs Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-border/60">
          <div className="space-y-2">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <div className="h-3.5 w-16 bg-muted rounded" />
            <div className="h-24 w-full bg-muted rounded-xl" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="pt-2 flex justify-end">
          <div className="h-10 w-36 bg-amber-500/20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
