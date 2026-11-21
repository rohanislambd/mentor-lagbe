import React from "react";

export default function TuitionDetailLoading() {
  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-4 w-36 bg-muted rounded-md" />
          <div className="h-4 w-48 bg-muted rounded-md hidden sm:block" />
        </div>

        {/* Hero Banner Skeleton */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xs">
          <div className="w-full h-64 sm:h-80 md:h-96 bg-muted relative p-4 sm:p-6 flex flex-col justify-between">
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-24 bg-muted-foreground/20 rounded-full" />
                <div className="h-6 w-20 bg-muted-foreground/20 rounded-full" />
              </div>
              <div className="h-6 w-32 bg-muted-foreground/20 rounded-full" />
            </div>

            {/* Bottom Title & Meta */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="h-7 sm:h-9 md:h-10 w-4/5 bg-muted-foreground/25 rounded-xl" />
              <div className="flex items-center gap-3">
                <div className="h-5 w-36 bg-muted-foreground/20 rounded-md" />
                <div className="h-5 w-24 bg-muted-foreground/20 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Main Details & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Info Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-card border border-border">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="space-y-2 p-2">
                  <div className="h-3 w-16 bg-muted rounded" />
                  <div className="h-5 w-24 bg-muted rounded-md" />
                </div>
              ))}
            </div>

            {/* About / Description Box Skeleton */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="h-5 w-48 bg-muted rounded-md" />
              <div className="space-y-2.5 pt-2">
                <div className="h-3.5 w-full bg-muted rounded" />
                <div className="h-3.5 w-11/12 bg-muted rounded" />
                <div className="h-3.5 w-4/5 bg-muted rounded" />
                <div className="h-3.5 w-3/4 bg-muted rounded" />
              </div>
            </div>

            {/* Program Highlights Skeleton */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="h-5 w-56 bg-muted rounded-md" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-md bg-muted shrink-0 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-full bg-muted/70 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (Right 1 col) */}
          <div className="space-y-6">
            {/* Enrollment / Pricing Card Skeleton */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5">
              {/* Fee Header */}
              <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
                <div className="space-y-1.5">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-8 w-28 bg-muted rounded-lg" />
                </div>
                <div className="h-6 w-20 bg-muted rounded-full" />
              </div>

              {/* Quick Summary Specs */}
              <div className="space-y-3">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="h-3.5 w-20 bg-muted rounded" />
                    <div className="h-3.5 w-24 bg-muted rounded" />
                  </div>
                ))}
              </div>

              {/* Big Action Button Skeleton */}
              <div className="pt-2">
                <div className="h-12 w-full rounded-xl bg-amber-500/25" />
              </div>

              <div className="h-3 w-40 bg-muted rounded mx-auto" />

              {/* Tutor Mini Card Skeleton */}
              <div className="pt-4 border-t border-border/60 space-y-3">
                <div className="h-3 w-28 bg-muted rounded" />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-muted shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-40 bg-muted/70 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
