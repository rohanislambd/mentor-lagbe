"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateTuitionApprovalStatus } from "@/lib/actions api/admin";
import { ApprovalStatus } from "../../../../teype/tuitiontype";

interface TuitionApprovalActionsProps {
  tuitionId: string;
  currentStatus: ApprovalStatus;
  onStatusUpdate?: (newStatus: "approved" | "rejected") => void;
}

export function TuitionApprovalActions({
  tuitionId,
  currentStatus,
  onStatusUpdate,
}: TuitionApprovalActionsProps) {
  const [loadingStatus, setLoadingStatus] = useState<
    "approved" | "rejected" | null
  >(null);

  const handleUpdate = async (newStatus: "approved" | "rejected") => {
    if (!tuitionId) {
      toast.error("Tuition ID not found");
      return;
    }
    if (currentStatus === newStatus) return;

    try {
      setLoadingStatus(newStatus);
      const res = await updateTuitionApprovalStatus(tuitionId, newStatus);
      console.log("Update approval status response:", res);

      if (res?.success === false || res?.error) {
        const errorMsg =
          res?.message || res?.error || `Failed to mark tuition as ${newStatus}`;
        toast.error(errorMsg);
        return;
      }

      toast.success(
        res?.message ||
          (newStatus === "approved"
            ? "Tuition approved successfully!"
            : "Tuition rejected successfully!")
      );

      // Instant optimistic state update without refreshing the page
      if (onStatusUpdate) {
        onStatusUpdate(newStatus);
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error?.message || "Error updating approval status");
    } finally {
      setLoadingStatus(null);
    }
  };

  const isApproved = currentStatus === "approved";
  const isRejected = currentStatus === "rejected";
  const isBusy = loadingStatus !== null;

  return (
    <div className="flex items-center gap-1.5 justify-end">
      {/* Approve Button */}
      <button
        type="button"
        disabled={isBusy || isApproved}
        onClick={() => handleUpdate("approved")}
        title={isApproved ? "Already Approved" : "Approve Listing"}
        className={`inline-flex items-center justify-center font-medium text-xs px-2.5 py-1 rounded-md transition-all ${
          isApproved
            ? "bg-emerald-700/30 text-white/70  dark:bg-emerald-950/40 dark:text-emerald-500/50 cursor-default"
            : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs active:scale-95 cursor-pointer"
        } ${isBusy ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loadingStatus === "approved" ? (
          <Loader2 className="w-3 h-3 animate-spin mr-1" />
        ) : null}
        <span>Approve</span>
      </button>

      {/* Reject Button */}
      <button
        type="button"
        disabled={isBusy || isRejected}
        onClick={() => handleUpdate("rejected")}
        title={isRejected ? "Already Rejected" : "Reject Listing"}
        className={`inline-flex items-center justify-center font-medium text-xs px-2.5 py-1 rounded-md transition-all ${
          isRejected
            ? "bg-rose-100/40 text-rose-400 dark:bg-rose-950/20 dark:text-rose-500 cursor-default"
            : "bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 dark:text-rose-300 active:scale-95 cursor-pointer"
        } ${isBusy ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loadingStatus === "rejected" ? (
          <Loader2 className="w-3 h-3 animate-spin mr-1" />
        ) : null}
        <span>Reject</span>
      </button>
    </div>
  );
}
