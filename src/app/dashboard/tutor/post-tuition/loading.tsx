import React from "react";

export default function PostTuitionLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-pulse">
      {/* Top Header & Back Button */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-muted rounded" />
        <div className="h-8 w-56 bg-muted rounded-xl" />
        <div className="h-4 w-80 bg-muted/60 rounded" />
      </div>

      {/* Main Form Card Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Banner Upload Box */}
        <div className="space-y-2">
          <div className="h-4 w-36 bg-muted rounded" />
          <div className="h-44 w-full rounded-2xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div className="h-3.5 w-48 bg-muted/60 rounded" />
          </div>
        </div>

        {/* Form Inputs Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Tuition Title (Full Width) */}
          <div className="sm:col-span-2 space-y-2">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Subject Dropdown */}
          <div className="space-y-2">
            <div className="h-3.5 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Class Level Dropdown */}
          <div className="space-y-2">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Mode (Online/Offline) */}
          <div className="space-y-2">
            <div className="h-3.5 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Monthly Fee */}
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Days Per Week */}
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-xl" />
          </div>

          {/* Detailed Description */}
          <div className="sm:col-span-2 space-y-2">
            <div className="h-3.5 w-32 bg-muted rounded" />
            <div className="h-28 w-full bg-muted rounded-xl" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border/60 flex justify-end">
          <div className="h-11 w-44 bg-amber-500/20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
