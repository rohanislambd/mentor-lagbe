import React from "react";

export default function AdminUsersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-56 bg-muted rounded-xl" />
        <div className="h-4 w-80 bg-muted/60 rounded" />
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="h-10 w-full sm:w-80 bg-muted rounded-xl" />
        <div className="h-10 w-64 bg-muted rounded-xl" />
      </div>

      {/* Users Table Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>

        <div className="divide-y divide-border">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between gap-4"
            >
              {/* User Avatar & Name */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                <div className="space-y-1.5 min-w-0">
                  <div className="h-4 w-36 bg-muted rounded" />
                  <div className="h-3 w-48 bg-muted/60 rounded" />
                </div>
              </div>

              {/* Role Badge Skeleton */}
              <div className="h-6 w-20 bg-muted rounded-md hidden sm:block" />

              {/* Plan Badge Skeleton */}
              <div className="h-6 w-16 bg-muted rounded-md hidden md:block" />

              {/* Action Button Skeleton */}
              <div className="h-8 w-24 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
