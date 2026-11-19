"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrowseTuitionsPaginationProps {
  currentPage: number;
  totalPages: number;
  total?: number;
}

export function BrowseTuitionsPagination({
  currentPage,
  totalPages,
  total,
}: BrowseTuitionsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Normalize pages
  const validTotalPages = Math.max(1, totalPages || 1);
  const validCurrentPage = Math.min(Math.max(1, currentPage || 1), validTotalPages);

  const navigateToPage = (page: number) => {
    if (page < 1 || page > validTotalPages || page === validCurrentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to display (smart pagination with ellipsis if > 7 pages)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (validTotalPages <= 7) {
      for (let i = 1; i <= validTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (validCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", validTotalPages);
      } else if (validCurrentPage >= validTotalPages - 3) {
        pages.push(
          1,
          "...",
          validTotalPages - 4,
          validTotalPages - 3,
          validTotalPages - 2,
          validTotalPages - 1,
          validTotalPages
        );
      } else {
        pages.push(
          1,
          "...",
          validCurrentPage - 1,
          validCurrentPage,
          validCurrentPage + 1,
          "...",
          validTotalPages
        );
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4 border-t border-border/60">
      {/* Total Results Summary */}
      <div className="text-xs text-muted-foreground font-medium">
        {total !== undefined && (
          <span>
            Showing Page <strong className="text-foreground">{validCurrentPage}</strong> of{" "}
            <strong className="text-foreground">{validTotalPages}</strong> ({total} total listings)
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          type="button"
          disabled={validCurrentPage <= 1}
          onClick={() => navigateToPage(validCurrentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
          title="Go to previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = Number(page);
            const isActive = pageNum === validCurrentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => navigateToPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-[#1e1b4b] text-white dark:bg-amber-500 dark:text-slate-950 shadow-xs scale-105"
                    : "border border-border/70 bg-card text-foreground hover:bg-muted hover:border-border"
                }`}
                title={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={validCurrentPage >= validTotalPages}
          onClick={() => navigateToPage(validCurrentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
          title="Go to next page"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
