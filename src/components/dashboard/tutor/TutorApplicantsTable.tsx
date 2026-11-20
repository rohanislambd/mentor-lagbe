"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { TuitionApplication, ApplicationStatus } from "../../../../teype/tuitiontype";
import { updateApplicationStatus } from "@/lib/actions api/application";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TutorApplicantsTableProps {
  initialApplicants: TuitionApplication[];
}

export function TutorApplicantsTable({
  initialApplicants,
}: TutorApplicantsTableProps) {
  const [applicants, setApplicants] = useState<TuitionApplication[]>(initialApplicants);
  const [activeTab, setActiveTab] = useState<"all" | ApplicationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<{ student: string; note: string } | null>(null);

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: applicants.length,
      pending: applicants.filter((a) => a.status === "pending").length,
      accepted: applicants.filter((a) => a.status === "accepted").length,
      rejected: applicants.filter((a) => a.status === "rejected").length,
    };
  }, [applicants]);

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchesTab = activeTab === "all" || app.status === activeTab;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        app.studentName?.toLowerCase().includes(term) ||
        app.studentEmail?.toLowerCase().includes(term) ||
        app.studentPhone?.toLowerCase().includes(term) ||
        app.tuitionTitle?.toLowerCase().includes(term) ||
        app.subject?.toLowerCase().includes(term);

      return matchesTab && matchesSearch;
    });
  }, [applicants, activeTab, searchTerm]);

  // Handle Accept or Reject (Only allowed once while pending)
  const handleStatusUpdate = async (id: string, newStatus: "accepted" | "rejected") => {
    const target = applicants.find((a) => a._id === id);
    if (target && target.status !== "pending") {
      toast.error(`This application has already been ${target.status} and cannot be modified.`);
      return;
    }

    try {
      setUpdatingId(id);
      await updateApplicationStatus(id, newStatus);

      setApplicants((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success(
        `Application ${newStatus === "accepted" ? "accepted" : "rejected"} successfully`
      );
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to update status";
      toast.error(errMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status: TuitionApplication["status"]) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Manage Applicants ({counts.all})
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Review and manage student admission applications for your tuition listings.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
              {counts.pending} Pending
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              {counts.accepted} Accepted
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">
              {counts.rejected} Rejected
            </span>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60 w-fit">
            {(
              [
                { id: "all", label: `All (${counts.all})` },
                { id: "pending", label: `Pending (${counts.pending})` },
                { id: "accepted", label: `Accepted (${counts.accepted})` },
                { id: "rejected", label: `Rejected (${counts.rejected})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search student, email, tuition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredApplicants.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              No applicants found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {searchTerm || activeTab !== "all"
                ? "No applications match your current filters."
                : "No students have applied to your tuition postings yet."}
            </p>
          </div>
        ) : (
          /* Applicants Table */
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Student Info
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Tuition Title
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Schedule & Note
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplicants.map((app, index) => {
                  const studentInitial = app.studentName
                    ? app.studentName.trim().charAt(0).toUpperCase()
                    : "S";
                  const isBusy = updatingId === app._id;

                  return (
                    <TableRow key={app._id || `applicant-${index}`} className="hover:bg-muted/30 transition-colors">
                      {/* Student Info */}
                      <TableCell className="py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                            {studentInitial}
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-bold text-foreground">
                              {app.studentName}
                            </p>
                            <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                {app.studentEmail}
                              </span>
                              <span className="flex items-center gap-1 font-medium text-foreground/80">
                                <Phone className="w-3 h-3 text-amber-500" />
                                {app.studentPhone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Tuition Title & Fee */}
                      <TableCell className="py-4 max-w-[240px]">
                        <div className="space-y-1">
                          {app.tuitionId ? (
                            <Link
                              href={`/browse-tuitions/${app.tuitionId}`}
                              className="text-xs sm:text-sm font-semibold text-foreground hover:text-amber-500 hover:underline line-clamp-2"
                            >
                              {app.tuitionTitle}
                            </Link>
                          ) : (
                            <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2">
                              {app.tuitionTitle}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>{app.subject}</span>
                            <span>•</span>
                            <strong className="text-foreground">
                              ৳{Number(app.monthlyFee || 0).toLocaleString()}/mo
                            </strong>
                          </div>
                        </div>
                      </TableCell>

                      {/* Preferred Schedule & Note */}
                      <TableCell className="py-4 max-w-[220px]">
                        <div className="space-y-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/70">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            {app.preferredSchedule}
                          </span>

                          {app.studentNote ? (
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedNote({
                                  student: app.studentName,
                                  note: app.studentNote || "",
                                })
                              }
                              className="flex items-center gap-1 text-[11px] text-amber-600 hover:text-amber-700 hover:underline cursor-pointer font-medium"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span className="truncate max-w-[170px]">
                                &ldquo;{app.studentNote}&rdquo;
                              </span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-muted-foreground italic block">
                              No note provided
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4">
                        {renderStatusBadge(app.status)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 text-right">
                        {app._id && (
                          <div className="flex items-center justify-end gap-1.5">
                            {app.status === "pending" ? (
                              <>
                                {/* Accept Button */}
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() => handleStatusUpdate(app._id!, "accepted")}
                                  title="Accept Student"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                                >
                                  {isBusy && updatingId === app._id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                  <span>Accept</span>
                                </button>

                                {/* Reject Button */}
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() => handleStatusUpdate(app._id!, "rejected")}
                                  title="Reject Application"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30 shadow-xs active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              </>
                            ) : app.status === "accepted" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                <Check className="w-3 h-3" />
                                Accepted
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                                <X className="w-3 h-3" />
                                Rejected
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Student Note Modal */}
      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="border-b border-border/60 pb-3">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Note from {selectedNote?.student}
            </DialogTitle>
          </DialogHeader>

          <div className="py-3">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/70 text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedNote?.note}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
