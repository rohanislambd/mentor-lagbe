"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  BookOpen,
  ArrowRight,
  Plus,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { TuitionApplication } from "../../../../teype/tuitiontype";
import { deleteApplication } from "@/lib/actions api/application";
import { authClient } from "@/lib/auth-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StudentApplicationsTableProps {
  initialApplications: TuitionApplication[];
}

export function StudentApplicationsTable({
  initialApplications,
}: StudentApplicationsTableProps) {
  const [applications, setApplications] = useState<TuitionApplication[]>(initialApplications);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [applicationToCancel, setApplicationToCancel] = useState<TuitionApplication | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Format date helper
  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "Recently";
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "Recently";
      return d.toISOString().split("T")[0];
    } catch {
      return "Recently";
    }
  };

  // Status Badge Renderer
  const renderStatusBadge = (status: TuitionApplication["status"]) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  // Cancel / Delete Application
  const confirmCancelApplication = async () => {
    if (!applicationToCancel?._id) return;
    const appId = applicationToCancel._id;
    const tuitionId = applicationToCancel.tuitionId;

    try {
      setDeletingId(appId);
      await deleteApplication(appId);

      // Remove from UI state
      setApplications((prev) => prev.filter((item) => item._id !== appId));

      // Clear from localStorage cache if user exists
      if (user?.email && tuitionId) {
        try {
          const storageKey = `applied_tuitions_${user.email}`;
          const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
          const updated = saved.filter((id: string) => id !== tuitionId);
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          // Ignore localStorage errors
        }
      }

      toast.success("Application cancelled successfully");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to cancel application";
      toast.error(errMsg);
    } finally {
      setDeletingId(null);
      setApplicationToCancel(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Container Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              My Tuition Applications ({applications.length})
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Track the progress, status, and responses for all your tuition requests.
            </p>
          </div>

          <Link
            href="/browse-tuitions"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors w-fit self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Apply to More Tuitions</span>
          </Link>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">
                No Applications Found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You haven&apos;t applied to any tuitions yet. Browse our verified mentorship postings to find your ideal tutor.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/browse-tuitions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                <span>Browse Tuitions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Applications Table */
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Tuition Title
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Tutor
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Monthly Fee
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Applied Date
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {applications.map((app, index) => (
                  <TableRow key={app._id || `app-${index}`} className="hover:bg-muted/30 transition-colors">
                    {/* Tuition Title */}
                    <TableCell className="font-semibold text-foreground text-xs sm:text-sm py-4 max-w-[280px]">
                      {app.tuitionId ? (
                        <Link
                          href={`/browse-tuitions/${app.tuitionId}`}
                          className="hover:text-amber-500 hover:underline transition-colors block"
                        >
                          {app.tuitionTitle}
                        </Link>
                      ) : (
                        <span>{app.tuitionTitle}</span>
                      )}
                      <span className="text-[11px] text-muted-foreground block font-normal mt-0.5">
                        {app.subject} • {app.preferredSchedule}
                      </span>
                    </TableCell>

                    {/* Tutor Details */}
                    <TableCell className="py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {app.tutorName || "Assigned Tutor"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                          {app.tutorEmail}
                        </p>
                      </div>
                    </TableCell>

                    {/* Monthly Fee */}
                    <TableCell className="py-4 font-bold text-xs sm:text-sm text-foreground">
                      ৳{Number(app.monthlyFee || 0).toLocaleString()}
                    </TableCell>

                    {/* Applied Date */}
                    <TableCell className="py-4 text-xs text-muted-foreground font-medium">
                      {formatDate(app.appliedAt || app.appiedAt || app.createdAt)}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="py-4">
                      {renderStatusBadge(app.status)}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4 text-right">
                      {app.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => setApplicationToCancel(app)}
                          disabled={deletingId === app._id}
                          className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === app._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            "Cancel"
                          )}
                        </button>
                      ) : app.status === "accepted" ? (
                        app.tuitionId ? (
                          <Link
                            href={`/browse-tuitions/${app.tuitionId}`}
                            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline cursor-pointer"
                          >
                            View Batch
                          </Link>
                        ) : (
                          <span className="text-xs text-emerald-600 font-semibold">Enrolled</span>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={!!applicationToCancel}
        onOpenChange={(isOpen) => !isOpen && setApplicationToCancel(null)}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-1">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <AlertDialogTitle className="text-base font-bold">
              Cancel Application?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to cancel your application for{" "}
              <strong className="text-foreground">
                {applicationToCancel?.tuitionTitle}
              </strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              disabled={!!deletingId}
              className="text-xs font-semibold cursor-pointer"
            >
              Keep Application
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelApplication}
              disabled={!!deletingId}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
            >
              {deletingId ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
