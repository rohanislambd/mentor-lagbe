import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyTuitionsLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 shrink-0" />
            <div className="h-8 w-60 bg-muted rounded-xl" />
          </div>
          <div className="h-4 w-80 sm:w-96 bg-muted/60 rounded mt-2" />
        </div>
        <div className="h-9 w-40 bg-amber-500/20 rounded-lg shrink-0" />
      </div>

      {/* Summary Stats Badges (Pills) */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="h-8 w-32 rounded-lg bg-card border border-border" />
        <div className="h-8 w-24 rounded-lg bg-emerald-500/10 border border-emerald-500/20" />
        <div className="h-8 w-28 rounded-lg bg-emerald-500/10 border border-emerald-500/20" />
        <div className="h-8 w-24 rounded-lg bg-amber-500/10 border border-amber-500/20" />
      </div>

      {/* Main Table Skeleton */}
      <div className="overflow-x-auto">
        <Table className="border-separate border-spacing-y-3">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent [&>th]:px-4">
              <TableHead className="min-w-[280px]">
                <div className="h-4 w-40 bg-muted rounded" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-28 bg-muted rounded" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-28 bg-muted rounded" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-20 bg-muted rounded" />
              </TableHead>
              <TableHead>
                <div className="h-4 w-24 bg-muted rounded" />
              </TableHead>
              <TableHead className="text-right">
                <div className="h-4 w-16 bg-muted rounded ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, idx) => (
              <TableRow
                key={idx}
                className="border-none bg-card hover:bg-card shadow-2xs rounded-xl [&>td]:border-y [&>td]:border-border/80 [&>td:first-child]:border-l [&>td:first-child]:rounded-l-xl [&>td:last-child]:border-r [&>td:last-child]:rounded-r-xl"
              >
                {/* Tuition Banner & Info */}
                <TableCell className="align-top py-4 px-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-14 rounded-lg bg-muted shrink-0 border border-border/80" />
                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                      <div className="h-4 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted/60 rounded" />
                    </div>
                  </div>
                </TableCell>

                {/* Class & Subject */}
                <TableCell className="align-top py-4 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="h-3.5 w-24 bg-muted rounded" />
                    <div className="h-3 w-20 bg-muted/60 rounded" />
                  </div>
                </TableCell>

                {/* Fee & Days */}
                <TableCell className="align-top py-4 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-3 w-20 bg-muted/60 rounded" />
                  </div>
                </TableCell>

                {/* Admin Approval Status Badge */}
                <TableCell className="align-top py-4 px-4">
                  <div className="h-6 w-20 bg-muted rounded-md" />
                </TableCell>

                {/* Active / Closed Status Toggle */}
                <TableCell className="align-top py-4 px-4">
                  <div className="h-6 w-11 bg-muted rounded-full" />
                </TableCell>

                {/* Action Buttons: View Details, Edit, Delete */}
                <TableCell className="align-top py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-muted" />
                    <div className="w-8 h-8 rounded-lg bg-muted" />
                    <div className="w-8 h-8 rounded-lg bg-muted" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
