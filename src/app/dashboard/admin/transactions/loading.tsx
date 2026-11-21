import React from "react";

export default function AdminTransactionsLoading() {
  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6 animate-pulse">
      {/* Title & 4 Metrics Skeleton */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-8 w-72 bg-muted rounded-xl" />
          <div className="h-4 w-96 bg-muted/60 rounded" />
        </div>

        {/* 4 Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-2"
            >
              <div className="h-3.5 w-24 bg-muted rounded" />
              <div className="h-7 w-20 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="h-10 w-full sm:w-80 bg-muted rounded-xl" />
        <div className="h-10 w-64 bg-muted rounded-xl" />
      </div>

      {/* Transactions Table Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>

        <div className="divide-y divide-border">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="p-4 flex items-center justify-between gap-4"
            >
              {/* User Name & Email */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-3 w-44 bg-muted/60 rounded" />
              </div>

              {/* Role */}
              <div className="h-6 w-16 bg-muted rounded-md hidden sm:block" />

              {/* Plan Name */}
              <div className="h-5 w-28 bg-muted rounded hidden md:block" />

              {/* Amount */}
              <div className="h-6 w-20 bg-muted rounded-md" />

              {/* Transaction ID */}
              <div className="h-5 w-24 bg-muted rounded font-mono hidden lg:block" />

              {/* Date */}
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
