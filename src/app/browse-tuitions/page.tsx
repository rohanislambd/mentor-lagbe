import React, { Suspense } from "react";
import { getBrowseTuitions } from "@/lib/api/tuitons.";
import { Tuition } from "../../../teype/tuitiontype";
import { TuitionCard } from "@/components/tuitions/TuitionCard";
import { BrowseTuitionsFilters } from "@/components/tuitions/BrowseTuitionsFilters";
import { BrowseTuitionsPagination } from "@/components/tuitions/BrowseTuitionsPagination";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Browse Approved Tuitions - MentorLagbe",
  description:
    "Explore verified and active tuition and mentorship listings across various subjects, classes, and modes.",
};

interface BrowseTuitionsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BrowseTuitionsPage = async ({ searchParams }: BrowseTuitionsProps) => {
  const search = await searchParams;
  const searchUrl = new URLSearchParams(search as Record<string, string>);

  // Default limit to 6 (matching 3x2 grid)
  if (!searchUrl.has("limit")) {
    searchUrl.set("limit", "6");
  }

  const query = searchUrl.toString();
  const data = await getBrowseTuitions(query);

  const tuitions: Tuition[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.result)
      ? data.result
      : Array.isArray(data?.data)
        ? data.data
        : [];

  const total =
    Number(data?.total) ||
    (Array.isArray(data) ? data.length : tuitions.length);

  const totalPages = Math.max(
    1,
    Number(data?.totalPages) || Math.ceil(total / 6)
  );

  const currentPage = Math.max(1, Number(search?.page) || 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-1.5">
        <span className="text-amber-500 font-extrabold text-[11px] tracking-widest uppercase">
          Verified Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Browse Approved Tuitions
        </h1>
        <p className="text-sm text-muted-foreground">
          Showing {total} active, Admin-verified mentorship listings
        </p>
      </div>

      {/* Dynamic Search & Filter Dropdowns */}
      <Suspense fallback={<div className="h-14 bg-muted/30 rounded-2xl animate-pulse" />}>
        <BrowseTuitionsFilters />
      </Suspense>

      {/* Tuitions Cards Grid */}
      {tuitions.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border/80 rounded-2xl p-8 space-y-3 shadow-xs">
          <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No Tuitions Found
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            We couldn&apos;t find any tuition listings matching your search or
            filter criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition, index) => (
            <TuitionCard
              key={tuition._id || index}
              tuition={tuition}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <Suspense fallback={null}>
        <BrowseTuitionsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
        />
      </Suspense>
    </div>
  );
};

export default BrowseTuitionsPage;
