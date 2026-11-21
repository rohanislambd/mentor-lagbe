import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TutorApplicantsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header Card (Contains Header, Tabs/Search, and Table) */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        {/* Header: Title + Quick Stats Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="space-y-2">
            <div className="h-7 w-60 bg-muted rounded-xl" />
            <div className="h-3.5 w-80 sm:w-96 bg-muted/60 rounded" />
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-7 w-24 bg-amber-500/10 border border-amber-500/20 rounded-xl" />
            <div className="h-7 w-24 bg-emerald-500/10 border border-emerald-500/20 rounded-xl" />
            <div className="h-7 w-24 bg-rose-500/10 border border-rose-500/20 rounded-xl" />
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60 w-fit">
            <div className="h-7 w-16 bg-background rounded-lg shadow-xs" />
            <div className="h-7 w-24 bg-muted/40 rounded-lg" />
            <div className="h-7 w-24 bg-muted/40 rounded-lg" />
            <div className="h-7 w-24 bg-muted/40 rounded-lg" />
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 h-9 bg-muted/60 border border-border/80 rounded-xl" />
        </div>

        {/* Applicants Table */}
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-3.5">
                  <div className="h-3.5 w-24 bg-muted rounded" />
                </TableHead>
                <TableHead className="py-3.5">
                  <div className="h-3.5 w-24 bg-muted rounded" />
                </TableHead>
                <TableHead className="py-3.5">
                  <div className="h-3.5 w-28 bg-muted rounded" />
                </TableHead>
                <TableHead className="py-3.5">
                  <div className="h-3.5 w-16 bg-muted rounded" />
                </TableHead>
                <TableHead className="py-3.5 text-right">
                  <div className="h-3.5 w-16 bg-muted rounded ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-transparent transition-colors"
                >
                  {/* Student Info */}
                  <TableCell className="py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-muted shrink-0 mt-0.5" />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="h-3 w-40 bg-muted/60 rounded" />
                        <div className="h-3 w-28 bg-muted/60 rounded" />
                      </div>
                    </div>
                  </TableCell>

                  {/* Tuition Title & Fee */}
                  <TableCell className="py-4 max-w-[240px]">
                    <div className="space-y-1.5">
                      <div className="h-4 w-44 bg-muted rounded" />
                      <div className="h-3 w-28 bg-muted/60 rounded" />
                    </div>
                  </TableCell>

                  {/* Preferred Schedule & Note */}
                  <TableCell className="py-4 max-w-[220px]">
                    <div className="space-y-1.5">
                      <div className="h-5 w-28 bg-muted rounded-md" />
                      <div className="h-3 w-36 bg-muted/60 rounded" />
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <div className="h-6 w-20 rounded-full bg-amber-500/10 border border-amber-500/20" />
                  </TableCell>

                  {/* Actions (Accept & Reject Buttons) */}
                  <TableCell className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="h-8 w-20 bg-emerald-500/20 rounded-lg" />
                      <div className="h-8 w-20 bg-rose-500/20 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
