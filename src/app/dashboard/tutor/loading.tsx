import React from "react";

export default function TutorOverviewLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Header with Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded-xl" />
          <div className="h-4 w-96 bg-muted/60 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-36 bg-amber-500/20 rounded-xl" />
          <div className="h-10 w-28 bg-muted rounded-xl" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-border bg-card space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-muted rounded" />
              <div className="w-10 h-10 rounded-xl bg-muted" />
            </div>
            <div className="h-8 w-20 bg-muted rounded-lg" />
            <div className="h-3.5 w-32 bg-muted/60 rounded" />
          </div>
        ))}
      </div>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column (2 Cols): Recent Tuitions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="space-y-1.5">
                <div className="h-5 w-44 bg-muted rounded-md" />
                <div className="h-3.5 w-60 bg-muted/60 rounded" />
              </div>
              <div className="h-4 w-20 bg-muted rounded" />
            </div>

            {/* List Skeletons */}
            <div className="space-y-3 pt-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border/70 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-52 bg-muted rounded" />
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-20 bg-muted rounded-full" />
                    <div className="h-6 w-16 bg-muted rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Mentor Status & Quick Tips */}
        <div className="space-y-6">
          {/* Plan Card */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-28 bg-muted rounded" />
              <div className="h-6 w-16 bg-amber-500/20 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted/70 rounded" />
              <div className="h-4 w-4/5 bg-muted/50 rounded" />
            </div>
            <div className="pt-2 space-y-2 border-t border-border/60">
              <div className="h-3.5 w-3/4 bg-muted/60 rounded" />
              <div className="h-3.5 w-2/3 bg-muted/60 rounded" />
            </div>
            <div className="pt-2">
              <div className="h-10 w-full bg-muted rounded-xl" />
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-3.5 w-full bg-muted/60 rounded" />
            <div className="h-3.5 w-5/6 bg-muted/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
