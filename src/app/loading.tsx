import React from "react";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background space-y-16 sm:space-y-24 pb-20 animate-pulse">
      {/* 1. Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:max-w-none lg:mx-0">
              {/* Top Ecosystem Pill */}
              <div className="h-7 w-72 bg-amber-500/15 rounded-full" />

              {/* Headline */}
              <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
                <div className="h-10 sm:h-14 w-full max-w-lg bg-muted rounded-2xl" />
                <div className="h-10 sm:h-14 w-3/4 max-w-md bg-muted rounded-2xl" />
              </div>

              {/* Subtitle */}
              <div className="space-y-2 max-w-xl w-full flex flex-col items-center lg:items-start">
                <div className="h-4 w-full bg-muted/60 rounded" />
                <div className="h-4 w-5/6 bg-muted/60 rounded" />
              </div>

              {/* Capsule Search Bar */}
              <div className="pt-2 w-full max-w-xl mx-auto lg:mx-0">
                <div className="h-14 w-full rounded-full bg-card border border-border p-2 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3 pl-3 flex-1">
                    <div className="w-4 h-4 rounded-full bg-muted shrink-0" />
                    <div className="h-4 w-48 bg-muted/60 rounded" />
                  </div>
                  <div className="h-10 w-36 rounded-full bg-amber-500/20 shrink-0" />
                </div>

                {/* Popular Tags */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-3">
                  <div className="h-3.5 w-12 bg-muted/60 rounded" />
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-muted/40 rounded-lg" />
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-32 bg-muted/50 rounded" />
                ))}
              </div>
            </div>

            {/* Right Column: Hero Live Card Skeleton */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[460px] rounded-3xl p-4 sm:p-5 bg-card border border-border shadow-2xl space-y-4">
                {/* Midnight Card */}
                <div className="rounded-2xl p-5 sm:p-6 bg-[#161938]/90 space-y-5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-36 rounded-full bg-emerald-500/20" />
                    <div className="h-4 w-24 bg-white/20 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 w-56 bg-white/30 rounded" />
                    <div className="h-3.5 w-72 bg-white/15 rounded" />
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-3 space-y-1.5">
                        <div className="h-5 w-12 bg-white/20 rounded" />
                        <div className="h-3 w-16 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Tutor Mini-Card */}
                <div className="rounded-2xl p-4 bg-background border border-border shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-4 w-12 bg-muted rounded" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-36 bg-muted rounded" />
                      <div className="h-3 w-48 bg-muted/60 rounded" />
                      <div className="h-3 w-28 bg-amber-500/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Subjects Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-36 bg-amber-500/15 rounded-full" />
            <div className="h-8 w-64 bg-muted rounded-xl" />
            <div className="h-4 w-80 bg-muted/60 rounded" />
          </div>
          <div className="h-9 w-32 bg-muted rounded-xl" />
        </div>

        {/* 8 Subject Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border-2 border-border/80 bg-card p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15" />
                <div className="h-5 w-20 bg-muted/50 rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-28 bg-muted rounded" />
                <div className="h-3.5 w-full bg-muted/60 rounded" />
                <div className="h-3.5 w-4/5 bg-muted/40 rounded" />
              </div>
              <div className="pt-2 border-t border-border/60">
                <div className="h-4 w-24 bg-muted/50 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Bar Skeleton */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-7 w-20 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Tuitions Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-amber-500/15 rounded-full" />
            <div className="h-8 w-60 bg-muted rounded-xl" />
          </div>
          <div className="h-8 w-28 bg-muted rounded-xl" />
        </div>

        {/* 6 Tuition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs space-y-4"
            >
              <div className="h-52 w-full bg-muted" />
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-24 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted/60 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-4/5 bg-muted rounded" />
                  <div className="h-3.5 w-full bg-muted/60 rounded" />
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-3 w-16 bg-muted/60 rounded" />
                    <div className="h-5 w-20 bg-muted rounded" />
                  </div>
                  <div className="h-9 w-28 bg-amber-500/20 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
