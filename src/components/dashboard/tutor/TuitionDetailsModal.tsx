"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Eye,
  Loader2,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  BookOpen,
  DollarSign,
  User,
  Mail,
  GraduationCap,
} from "lucide-react";
import { Tuition } from "../../../../teype/tuitiontype";
import { getTuitonDetailById } from "@/lib/api/tuitons.";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TuitionDetailsModalProps {
  tuitionId: string;
  trigger?: React.ReactNode;
}

export function TuitionDetailsModal({
  tuitionId,
  trigger,
}: TuitionDetailsModalProps) {
  const [open, setOpen] = useState(false);
  const [tuition, setTuition] = useState<Tuition | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      try {
        setLoading(true);
        const data = await getTuitonDetailById(tuitionId);
        // If data is wrapped in data property or direct object
        const detail = data?.data || data;
        setTuition(detail);
      } catch (err) {
        console.error("Failed to load tuition details:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderApprovalBadge = (status?: Tuition["approvalStatus"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold gap-1 text-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-semibold gap-1 text-xs"
          >
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold gap-1 text-xs"
          >
            <Clock className="w-3.5 h-3.5" />
            Pending Approval
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger render={<span className="inline-flex cursor-pointer" />}>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              title="View Details"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground cursor-pointer rounded-md"
            />
          }
        >
          <Eye className="w-3.5 h-3.5" />
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-5">
        <DialogHeader className="pb-2 border-b border-border/60">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Tuition Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
            <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
            <p className="text-xs">Loading tuition details...</p>
          </div>
        ) : !tuition ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Unable to load tuition details. Please try again.
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Banner Image Preview */}
            {tuition.bannerImage && (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border bg-muted">
                <Image
                  src={tuition.bannerImage}
                  alt={tuition.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Title & Badges */}
            <div className="space-y-2">
              <h2 className="text-lg font-extrabold text-foreground leading-snug">
                {tuition.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {renderApprovalBadge(tuition.approvalStatus)}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                    tuition.isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {tuition.isActive ? "Active Post" : "Closed"}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {tuition.mode}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Class Level:</span>
                  <p className="font-semibold text-foreground">{tuition.classLevel}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Subject(s):</span>
                  <p className="font-semibold text-foreground">{tuition.subject}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Monthly Fee:</span>
                  <p className="font-semibold text-foreground">
                    ৳{tuition.monthlyFee?.toLocaleString()} / month
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Schedule:</span>
                  <p className="font-semibold text-foreground">{tuition.daysPerWeek}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-semibold text-foreground">{tuition.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-foreground">Tuition Description:</span>
              <div className="p-3 rounded-lg bg-background border border-border text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                {tuition.description || "No description provided."}
              </div>
            </div>

            {/* Tutor Details */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Posted by: <strong className="text-foreground">{tuition.tutorName}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>{tuition.tutorEmail}</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-border/60 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
