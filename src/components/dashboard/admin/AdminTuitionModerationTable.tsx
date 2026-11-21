"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Globe,
  BookOpen,
} from "lucide-react";
import { Tuition, ApprovalStatus } from "../../../../teype/tuitiontype";
import { TuitionApprovalActions } from "./TuitionApprovalActions";
import { TuitionDetailsModal } from "@/components/dashboard/tutor/TuitionDetailsModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminTuitionModerationTableProps {
  initialTuitions: Tuition[];
}

export function AdminTuitionModerationTable({
  initialTuitions,
}: AdminTuitionModerationTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | ApprovalStatus>("all");

  const counts = useMemo(() => {
    return {
      all: initialTuitions.length,
      pending: initialTuitions.filter((t) => t.approvalStatus === "pending")
        .length,
      approved: initialTuitions.filter((t) => t.approvalStatus === "approved")
        .length,
      rejected: initialTuitions.filter((t) => t.approvalStatus === "rejected")
        .length,
    };
  }, [initialTuitions]);

  const filteredTuitions = useMemo(() => {
    if (activeTab === "all") return initialTuitions;
    return initialTuitions.filter((t) => t.approvalStatus === activeTab);
  }, [initialTuitions, activeTab]);

  const renderApprovalBadge = (status: Tuition["approvalStatus"]) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-5">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Tuition Moderation
        </h1>
        <p className="text-sm text-muted-foreground">
          Review, approve, or reject tuition listings submitted by tutors before
          they become visible to students.
        </p>
      </div>

      {/* Filter Tabs with Counts */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Pending Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "pending"
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-2xs"
              : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70 border border-transparent"
          }`}
        >
          <span>Pending</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300">
            {counts.pending}
          </span>
        </button>

        {/* Approved Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("approved")}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "approved"
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-2xs"
              : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70 border border-transparent"
          }`}
        >
          <span>Approved</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
            {counts.approved}
          </span>
        </button>

        {/* Rejected Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("rejected")}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "rejected"
              ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-2xs"
              : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70 border border-transparent"
          }`}
        >
          <span>Rejected</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300">
            {counts.rejected}
          </span>
        </button>

        {/* All Tuitions Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "all"
              ? "bg-card text-foreground border border-border shadow-xs"
              : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted/70 border border-transparent"
          }`}
        >
          <span>All Tuitions</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-muted text-foreground">
            {counts.all}
          </span>
        </button>
      </div>

      {/* Table / Empty State */}
      {filteredTuitions.length === 0 ? (
        <div className="text-center py-16 space-y-3 border border-dashed border-border/70 rounded-xl">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            No Tuitions Found
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {activeTab !== "all"
              ? `There are no ${activeTab} tuition listings right now.`
              : "No tuition submissions found."}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/70 hover:bg-transparent [&>th]:px-2.5 sm:[&>th]:px-3">
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[160px] lg:min-w-[180px]">
                Title
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[90px] lg:min-w-[100px]">
                Subject
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[120px] lg:min-w-[135px]">
                Tutor
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[80px]">
                Monthly Fee
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[95px]">
                Approval Status
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider min-w-[70px]">
                Active
              </TableHead>
              <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right min-w-[145px] sticky right-0 bg-card z-10 shadow-[-6px_0_8px_-4px_rgba(0,0,0,0.1)] dark:shadow-[-6px_0_8px_-4px_rgba(0,0,0,0.5)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTuitions.map((tuition) => {
              const tuitionId =
                tuition._id ||
                (tuition as unknown as { id?: string }).id ||
                "";

              return (
                <TableRow
                  key={tuitionId}
                  className="border-b border-border/40 hover:bg-muted/30 transition-colors group"
                >
                  {/* Title + Location/Mode */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle">
                    <div className="flex flex-col gap-0.5 min-w-[150px] max-w-[200px] xl:max-w-[260px]">
                      <span
                        className="font-bold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                        title={tuition.title}
                      >
                        {tuition.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-normal">
                        {tuition.mode === "Online" ? (
                          <Globe className="w-3 h-3 text-blue-500 shrink-0" />
                        ) : (
                          <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                        )}
                        <span className="truncate max-w-[150px]">
                          {tuition.mode === "Online"
                            ? "Online"
                            : tuition.location || "Offline"}
                        </span>
                      </span>
                    </div>
                  </TableCell>

                  {/* Subject Badge */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 max-w-[110px] truncate"
                      title={tuition.subject}
                    >
                      {tuition.subject}
                    </span>
                  </TableCell>

                  {/* Tutor Name & Email */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle">
                    <div className="flex flex-col gap-0.5 min-w-[110px] max-w-[145px]">
                      <span
                        className="font-semibold text-xs text-foreground truncate"
                        title={tuition.tutorName}
                      >
                        {tuition.tutorName || "Unknown Tutor"}
                      </span>
                      <span
                        className="text-[10px] text-muted-foreground truncate"
                        title={tuition.tutorEmail}
                      >
                        {tuition.tutorEmail || "No email"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Monthly Fee */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                    </span>
                  </TableCell>

                  {/* Approval Status */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle whitespace-nowrap">
                    {renderApprovalBadge(tuition.approvalStatus)}
                  </TableCell>

                  {/* Active Status (Open or Closed by Tutor) */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle whitespace-nowrap">
                    {tuition.isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Closed
                      </span>
                    )}
                  </TableCell>

                  {/* Actions: View Details Modal + Approve/Reject */}
                  <TableCell className="py-3 px-2.5 sm:px-3 align-middle text-right whitespace-nowrap sticky right-0 bg-card group-hover:bg-muted/60 transition-colors z-10 shadow-[-6px_0_8px_-4px_rgba(0,0,0,0.1)] dark:shadow-[-6px_0_8px_-4px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-end gap-1.5">
                      <TuitionDetailsModal tuitionId={tuitionId} />
                      <TuitionApprovalActions
                        tuitionId={tuitionId}
                        currentStatus={tuition.approvalStatus}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
