"use client";

import React, { useTransition, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, Loader2, ChevronDown } from "lucide-react";

const SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Programming",
  "Accounting",
  "IELTS",
];

const CLASS_LEVELS = [
  "All Class Levels",
  "Class 1-5",
  "Class 6-8",
  "Class 9-10",
  "HSC / Class 11-12",
  "O-Level / IGCSE",
  "A-Level",
  "University / Skill",
];

const MODES = ["All Modes", "Online", "Offline"];

export function BrowseTuitionsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentSubject = searchParams.get("subject") || "All Subjects";
  const currentClassLevel = searchParams.get("classLevel") || "All Class Levels";
  const currentMode = searchParams.get("mode") || "All Modes";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [prevSearch, setPrevSearch] = useState(currentSearch);

  // Sync state if URL search changes externally (e.g. browser back/forward or Reset)
  if (prevSearch !== currentSearch) {
    setPrevSearch(currentSearch);
    setSearchTerm(currentSearch);
  }

  // Real-time search on text change with debounce (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (trimmed) {
          params.set("search", trimmed);
        } else {
          params.delete("search");
        }
        params.delete("page");
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, pathname, router, searchParams]);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        !value ||
        value === "All Subjects" ||
        value === "All Class Levels" ||
        value === "All Modes"
      ) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset pagination on filter change
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm.trim() });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentSubject !== "All Subjects" ||
    currentClassLevel !== "All Class Levels" ||
    currentMode !== "All Modes";

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-xs">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3"
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by tuition title, subject, or tutor..."
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-background border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-foreground"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                updateFilters({ search: "" });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0">
          {/* Subject Dropdown */}
          <div className="relative">
            <select
              value={currentSubject}
              onChange={(e) => updateFilters({ subject: e.target.value })}
              className="w-full appearance-none px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-background border border-border text-foreground hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer transition-colors pr-8 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 [&>option]:bg-white dark:[&>option]:bg-[#0f172a] [&>option]:text-slate-900 dark:[&>option]:text-slate-100"
            >
              {SUBJECTS.map((sub) => (
                <option
                  key={sub}
                  value={sub}
                  className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 py-2"
                >
                  {sub}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          </div>

          {/* Class Level Dropdown */}
          <div className="relative">
            <select
              value={currentClassLevel}
              onChange={(e) => updateFilters({ classLevel: e.target.value })}
              className="w-full appearance-none px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-background border border-border text-foreground hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer transition-colors pr-8 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 [&>option]:bg-white dark:[&>option]:bg-[#0f172a] [&>option]:text-slate-900 dark:[&>option]:text-slate-100"
            >
              {CLASS_LEVELS.map((level) => (
                <option
                  key={level}
                  value={level}
                  className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 py-2"
                >
                  {level}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          </div>

          {/* Mode Dropdown */}
          <div className="relative">
            <select
              value={currentMode}
              onChange={(e) => updateFilters({ mode: e.target.value })}
              className="w-full appearance-none px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-background border border-border text-foreground hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer transition-colors pr-8 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 [&>option]:bg-white dark:[&>option]:bg-[#0f172a] [&>option]:text-slate-900 dark:[&>option]:text-slate-100"
            >
              {MODES.map((mode) => (
                <option
                  key={mode}
                  value={mode}
                  className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 py-2"
                >
                  {mode}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Clear Filters / Loading Indicator */}
        {(hasActiveFilters || isPending) && (
          <div className="flex items-center gap-2 shrink-0">
            {isPending && (
              <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold px-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Searching...
              </span>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold px-3 py-2 rounded-xl text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
