import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  BookOpen,
} from "lucide-react";
import { TuitionDetailsModal } from "@/components/dashboard/tutor/TuitionDetailsModal";
import { TuitionEditModal } from "@/components/dashboard/tutor/TuitionEditModal";
import { TuitionStatusToggle } from "@/components/dashboard/tutor/TuitionStatusToggle";
import { TuitionDeleteDialog } from "@/components/dashboard/tutor/TuitionDeleteDialog";
import { getMyTuitions } from "@/lib/api/tuitons.";
import { Tuition } from "../../../../../teype/tuitiontype";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function renderApprovalBadge(status: Tuition["approvalStatus"]) {
  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold gap-1 text-[11px]"
        >
          <CheckCircle2 className="w-3 h-3" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-semibold gap-1 text-[11px]"
        >
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>
      );
    case "pending":
    default:
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold gap-1 text-[11px]"
        >
          <Clock className="w-3 h-3" />
          Pending
        </Badge>
      );
  }
}

const MyTuitionsPage = async () => {
  const result = await getMyTuitions();

  const tuitions: Tuition[] = Array.isArray(result)
    ? result
    : result?.data && Array.isArray(result.data)
      ? result.data
      : [];

  const totalCount = tuitions.length;
  const activeCount = tuitions.filter((t) => t.isActive).length;
  const closedCount = tuitions.filter((t) => !t.isActive).length;
  const approvedCount = tuitions.filter(
    (t) => t.approvalStatus === "approved",
  ).length;
  const pendingCount = tuitions.filter(
    (t) => t.approvalStatus === "pending",
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-500" />
            My Created Tuitions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Displaying all tuitions you have posted with their admin approval
            and active status.
          </p>
        </div>
        <Link
          href="/dashboard/tutor/post-tuition"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Post New Tuition
        </Link>
      </div>

      {/* Summary Stats Badges */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        <span className="px-3 py-1.5 rounded-lg bg-card border border-border font-medium text-foreground shadow-2xs">
          Total Tuitions: <strong className="text-foreground">{totalCount}</strong>
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Active: <strong>{activeCount}</strong>
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Approved: <strong>{approvedCount}</strong>
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1.5 shadow-2xs">
          <Clock className="w-3.5 h-3.5" />
          Pending: <strong>{pendingCount}</strong>
        </span>
        {closedCount > 0 && (
          <span className="px-3 py-1.5 rounded-lg bg-muted/60 border border-border text-muted-foreground font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Closed: <strong>{closedCount}</strong>
          </span>
        )}
      </div>

      {/* Main Table / Empty State */}
      {tuitions.length === 0 ? (
        <Card className="border-border/70 text-center py-16">
          <CardContent className="space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                No Tuitions Found
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                You haven&apos;t created any tuition posts yet. Start by posting
                your first tuition offer.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard/tutor/post-tuition"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Post Your First Tuition
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table className="border-separate border-spacing-y-3">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent [&>th]:px-4">
                <TableHead className="min-w-[280px]">
                  Tuition Title & Location
                </TableHead>
                <TableHead>Class & Subjects</TableHead>
                <TableHead>Fee & Schedule</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>
                  Active Status{" "}
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {activeCount} Active
                  </span>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            
            </TableHeader>
            <TableBody>
              {tuitions.map((tuition) => (
                <TableRow
                  key={tuition._id || tuition.title}
                  className="border-none bg-card hover:bg-muted/20 transition-all shadow-2xs rounded-xl [&>td]:border-y [&>td]:border-border/80 [&>td:first-child]:border-l [&>td:first-child]:rounded-l-xl [&>td:last-child]:border-r [&>td:last-child]:rounded-r-xl"
                >
                  {/* Tuition Banner & Info */}
                  <TableCell className="align-top py-4 px-4">
                    <div className="flex gap-3">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                        {tuition.bannerImage ? (
                          <Image
                            src={tuition.bannerImage}
                            alt={tuition.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
                          {tuition.title}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 shrink-0 text-amber-500" />
                          <span className="truncate">
                            {tuition.mode} • {tuition.location}
                          </span>
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Class & Subject */}
                  <TableCell className="align-top py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-xs text-foreground">
                        {tuition.classLevel}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {tuition.subject}
                      </span>
                    </div>
                  </TableCell>

                  {/* Fee & Days */}
                  <TableCell className="align-top py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm text-foreground">
                        ৳{tuition.monthlyFee?.toLocaleString()}{" "}
                        <span className="text-[11px] font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 text-amber-500" />
                        {tuition.daysPerWeek}
                      </span>
                    </div>
                  </TableCell>

                  {/* Admin Approval Status */}
                  <TableCell className="align-top py-4 px-4">
                    {renderApprovalBadge(tuition.approvalStatus)}
                  </TableCell>

                  {/* Active / Closed Status Toggle */}
                  <TableCell className="align-top py-4 px-4">
                    <TuitionStatusToggle
                      tuitionId={tuition._id || ""}
                      initialIsActive={tuition.isActive}
                    />
                  </TableCell>

                  {/* Action Buttons: View Details Modal, Edit, Delete */}
                  <TableCell className="align-top py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <TuitionDetailsModal tuitionId={tuition._id || ""} />
                      <TuitionEditModal tuition={tuition} />
                      <TuitionDeleteDialog
                        tuitionId={tuition._id || ""}
                        tuitionTitle={tuition.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyTuitionsPage;
