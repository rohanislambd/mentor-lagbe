"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Tuition, CreateApplicationInput } from "../../../teype/tuitiontype";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createApplication } from "@/lib/actions api/application";

interface ApplyTuitionModalProps {
  tuition: Tuition;
}

export const PREFERRED_SCHEDULE_OPTIONS = [
  "Flexible / Discuss with Tutor",
  "Morning (7:30 AM - 11:00 AM)",
  "Afternoon (2:00 PM - 5:00 PM)",
  "Evening (5:00 PM - 8:00 PM)",
  "Night (8:00 PM - 10:30 PM)",
  "Weekend (Friday - Saturday)",
];

export function ApplyTuitionModal({ tuition }: ApplyTuitionModalProps) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("Flexible / Discuss with Tutor");
  const [preferredStartDate, setPreferredStartDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const userRole = (user as { role?: string })?.role || "student";

  // Check localStorage immediately on mount to prevent any flash/reversion on refresh
  useEffect(() => {
    if (!user?.email || !tuition._id) return;
    try {
      const storageKey = `applied_tuitions_${user.email}`;
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved) && saved.includes(tuition._id)) {
        queueMicrotask(() => {
          setIsSuccess(true);
        });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [user?.email, tuition._id]);

  // Sync applied status with the database
  useEffect(() => {
    if (!user || userRole !== "student" || !tuition._id) return;

    const checkAppliedStatus = async () => {
      try {
        const { getTokenClient } = await import("@/lib/common/getTokenClient");
        const token = await getTokenClient();
        if (!token) return;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";
        
        let res = await fetch(`${baseUrl}/applications/my-applications`, {
          headers: { authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          res = await fetch(`${baseUrl}/applications`, {
            headers: { authorization: `Bearer ${token}` },
          });
        }

        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data?.data || data?.result || [];
          const hasApplied = list.some(
            (app: { tuitionId?: string; tuition?: { _id?: string } }) =>
              String(app.tuitionId) === String(tuition._id) ||
              String(app.tuition?._id) === String(tuition._id)
          );

          if (hasApplied) {
            setIsSuccess(true);
            if (user?.email && tuition._id) {
              const storageKey = `applied_tuitions_${user.email}`;
              const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
              if (!saved.includes(tuition._id)) {
                localStorage.setItem(storageKey, JSON.stringify([...saved, tuition._id]));
              }
            }
          }
        }
      } catch {
        // Silent catch
      }
    };

    checkAppliedStatus();
  }, [user, userRole, tuition._id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to apply for this tuition");
      return;
    }

    if (userRole !== "student") {
      toast.error("Only registered students can apply for tuitions");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please provide your contact phone number");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: CreateApplicationInput = {
        tuitionId: tuition._id || "",
        tuitionTitle: tuition.title,
        subject: tuition.subject,
        monthlyFee: Number(tuition.monthlyFee || 0),
        tutorEmail: tuition.tutorEmail,
        studentName: user.name || "",
        studentEmail: user.email || "",
        studentPhone: phone.trim(),
        preferredSchedule,
        studentNote: message.trim(),
        status: "pending",
      };

      await createApplication(payload);

      setIsSuccess(true);
      setOpen(false);

      if (user?.email && tuition._id) {
        try {
          const storageKey = `applied_tuitions_${user.email}`;
          const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
          if (!saved.includes(tuition._id)) {
            localStorage.setItem(storageKey, JSON.stringify([...saved, tuition._id]));
          }
        } catch {
          // Ignore
        }
      }

      toast.success("Application submitted successfully!");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to submit application";
      if (errMsg.toLowerCase().includes("already") || errMsg.toLowerCase().includes("duplicate")) {
        setIsSuccess(true);
        setOpen(false);

        if (user?.email && tuition._id) {
          try {
            const storageKey = `applied_tuitions_${user.email}`;
            const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
            if (!saved.includes(tuition._id)) {
              localStorage.setItem(storageKey, JSON.stringify([...saved, tuition._id]));
            }
          } catch {
            // Ignore
          }
        }

        toast.error(errMsg);
      } else {
        toast.error(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // If already submitted, replace the Apply button with a cohesive, beautiful card matching the UI
  if (isSuccess) {
    return (
      <div className="space-y-2">
        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/15 border border-amber-500/30 text-left space-y-3 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="font-bold text-xs sm:text-sm text-foreground">
                Application Submitted
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
              Under Review
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Your tuition request has been sent to <strong className="text-foreground">{tuition.tutorName}</strong>. You can track response updates and manage your application inside your student dashboard.
          </p>

          <div className="pt-1">
            <Link
              href="/dashboard/student/my-applications"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer"
            >
              <span>Go to My Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="lg"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm h-12 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          />
        }
      >
        <Send className="w-4 h-4" />
        <span>Apply for Tuition</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-6 max-h-[92vh] overflow-y-auto">
        <DialogHeader className="pb-3 border-b border-border/60">
          <DialogTitle className="text-lg font-bold text-foreground">
            Apply for This Tuition
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Submit your preferred schedule directly to {tuition.tutorName}
          </p>
        </DialogHeader>

        {isPending ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            <p className="text-xs">Checking session status...</p>
          </div>
        ) : !user ? (
          /* Not Logged In State */
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-base">
                Sign In Required
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You need a verified Student account to apply for this tuition post.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
              >
                Log In as Student
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-input transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : userRole !== "student" ? (
          /* Logged In But Not a Student */
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground text-base">
              Students Only
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              You are currently logged in as a <strong>{userRole}</strong>. Only registered students are eligible to apply for tuition posts.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : isSuccess ? (
          /* Application Success State */
          <div className="py-4 space-y-4">
            <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/15 border border-amber-500/30 text-left space-y-3 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-sm text-foreground">
                    Application Submitted
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/25">
                  Under Review
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Your tuition request has been sent to <strong className="text-foreground">{tuition.tutorName}</strong>. You can track response updates and manage your application inside your student dashboard.
              </p>

              <div className="pt-1">
                <Link
                  href="/dashboard/student/my-applications"
                  onClick={handleClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer"
                >
                  <span>Go to My Applications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Student Application Form */
          <form onSubmit={handleApply} className="space-y-4 py-2">
            {/* Tuition Mini Summary */}
            <div className="p-3 rounded-xl bg-muted/40 border border-border/70 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-foreground line-clamp-1">{tuition.title}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Tutor: {tuition.tutorName} • {tuition.mode} ({tuition.daysPerWeek})
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-extrabold text-amber-500 text-sm">
                  ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground block">/month</span>
              </div>
            </div>

            {/* Student Info (Read-only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Your Name</Label>
                <Input
                  value={user.name || ""}
                  disabled
                  className="h-9 text-xs bg-muted/30"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Your Email</Label>
                <Input
                  value={user.email || ""}
                  disabled
                  className="h-9 text-xs bg-muted/30"
                />
              </div>
            </div>

            {/* Contact Phone & Preferred Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="app-phone" className="text-xs font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  Contact Number <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="app-phone"
                  type="tel"
                  placeholder="e.g. 017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="app-date" className="text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  Preferred Start Date
                </Label>
                <Input
                  id="app-date"
                  type="date"
                  value={preferredStartDate}
                  onChange={(e) => setPreferredStartDate(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Preferred Schedule Dropdown */}
            <div className="space-y-1">
              <Label htmlFor="app-schedule" className="text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Preferred Schedule
              </Label>
              <select
                id="app-schedule"
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value)}
                className="w-full h-9 px-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                {PREFERRED_SCHEDULE_OPTIONS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Note to Tutor */}
            <div className="space-y-1">
              <Label htmlFor="app-message" className="text-xs font-semibold flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                Message or Learning Goals (Optional)
              </Label>
              <Textarea
                id="app-message"
                placeholder="Mention your specific focus areas, syllabus, or preferred tuition timing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="text-xs resize-none"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-start gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Your application will be sent directly to the tutor. All tuition matches are protected by MentorLagbe student verification.
              </span>
            </div>

            <DialogFooter className="pt-2 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="w-full sm:w-auto text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Application</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
