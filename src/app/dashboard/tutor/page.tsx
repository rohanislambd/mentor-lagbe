export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import {
  BookOpen,
  CheckCircle2,
  Users,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Clock,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getMyTuitions } from "@/lib/api/tuitons.";
import { getTutorApplicants } from "@/lib/api/applicatons";
import { Tuition } from "../../../../teype/tuitiontype";
import { DashboardStatsCard } from "@/components/dashboard/DashboardStatsCard";

export const metadata = {
  title: "Tutor Dashboard - Overview | MentorLagbe",
  description: "View tuition statistics, student applications, and active mentorship listings.",
};

export default async function TutorOverviewPage() {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("TutorOverviewPage getSession error:", error);
  }

  const userName = session?.user?.name || "Tutor";

  // Fetch real-time fresh plan (fallback to session plan)
  let currentPlan = (session?.user as { plan?: string })?.plan || "free";
  try {
    const { getTokenServer } = await import("@/lib/common/getTokenServer");
    const token = await getTokenServer();
    if (token) {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "";
      const res = await fetch(`${baseUrl}/users/me`, {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.plan) currentPlan = data.plan;
      }
    }
  } catch {
    // Fallback to session
  }

  const isPro = currentPlan === "pro";

  // Fetch Tutor's Tuitions
  const rawTuitions = await getMyTuitions();
  const tuitions: Tuition[] = Array.isArray(rawTuitions)
    ? rawTuitions
    : rawTuitions?.data || rawTuitions?.result || [];

  const totalTuitions = tuitions.length;
  const approvedTuitions = tuitions.filter(
    (t) => t.approvalStatus === "approved" && t.isActive !== false
  ).length;
  const pendingTuitions = tuitions.filter(
    (t) => t.approvalStatus === "pending"
  ).length;

  // Fetch Tutor's Student Applicants
  const applicants = await getTutorApplicants();
  const totalApplicants = applicants.length;
  const pendingApplicants = applicants.filter(
    (a) => a.status === "pending"
  ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header with Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
            <span>Welcome back, {userName}!</span>
            {isPro && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-2xs">
                <Sparkles className="w-2.5 h-2.5" /> PRO
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Monitor your mentorship listings, incoming student applications, and account status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Tuition</span>
          </Link>
          <Link
            href="/dashboard/tutor/applicants"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors shadow-2xs"
          >
            <Users className="w-4 h-4 text-purple-500" />
            <span>Applicants</span>
            {pendingApplicants > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500 text-white font-black">
                {pendingApplicants}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 4 Reusable Dashboard Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Tuitions Posted */}
        <DashboardStatsCard
          title="Total Tuitions Posted"
          value={totalTuitions}
          subtitle={`${pendingTuitions} currently awaiting admin review`}
          icon={BookOpen}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-500/10"
          linkHref="/dashboard/tutor/my-tuitions"
          linkLabel="View all tuitions"
        />

        {/* 2. Active / Approved Tuitions */}
        <DashboardStatsCard
          title="Active / Approved"
          value={approvedTuitions}
          subtitle="Currently live and visible to students"
          icon={CheckCircle2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-500/10"
          badge={
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          }
          linkHref="/dashboard/tutor/my-tuitions"
          linkLabel="Manage live listings"
        />

        {/* 3. Total Applicants Received */}
        <DashboardStatsCard
          title="Applicants Received"
          value={totalApplicants}
          subtitle={
            pendingApplicants > 0
              ? `${pendingApplicants} student applications need response`
              : "All student applications responded"
          }
          icon={Users}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-500/10"
          badge={
            pendingApplicants > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                {pendingApplicants} New
              </span>
            ) : undefined
          }
          linkHref="/dashboard/tutor/applicants"
          linkLabel="Review applications"
        />

        {/* 4. Current Plan: Free / Pro */}
        <DashboardStatsCard
          title="Current Plan"
          value={isPro ? "Pro Tutor" : "Free Plan"}
          subtitle={
            isPro
              ? "Priority placement & verified tutor badge active"
              : "Upgrade to Pro ($15) for unlimited postings & priority badge"
          }
          icon={Sparkles}
          iconColor={isPro ? "text-amber-500" : "text-slate-500"}
          iconBg={isPro ? "bg-amber-500/10" : "bg-slate-500/10"}
          badge={
            isPro ? (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-2xs">
                <Sparkles className="w-2.5 h-2.5" /> PRO
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                FREE
              </span>
            )
          }
          linkHref="/pricing"
          linkLabel={isPro ? "View Pro benefits" : "Upgrade to Pro ($15)"}
        />
      </div>

      {/* Quick Summary & Recent Tuitions Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Tuitions Summary */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Recent Tuition Postings
              </h2>
              <p className="text-xs text-muted-foreground">
                Your latest mentorship batches and their status
              </p>
            </div>
            <Link
              href="/dashboard/tutor/my-tuitions"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {tuitions.length === 0 ? (
            <div className="py-10 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed border-border">
              <BookOpen className="w-8 h-8 text-muted-foreground/40 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  No tuition posts yet
                </p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Create your first mentorship posting to start receiving student applications.
                </p>
              </div>
              <Link
                href="/dashboard/tutor/post-tuition"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create First Tuition</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {tuitions.slice(0, 4).map((t, idx) => {
                const isApproved = t.approvalStatus === "approved";
                const isPendingReview = t.approvalStatus === "pending";

                return (
                  <div
                    key={t._id || idx}
                    className="p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/80 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground truncate max-w-[240px] sm:max-w-md">
                          {t.title}
                        </span>
                        <span className="px-2 py-0.2 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          {t.classLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {t.subject} • ৳{Number(t.monthlyFee || 0).toLocaleString()}/month • {t.mode}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Approved
                        </span>
                      ) : isPendingReview ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Pro Perks / Account Status Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Mentor Status
              </span>
              <GraduationCap className="w-5 h-5 text-amber-500" />
            </div>

            <div className="p-4 rounded-xl bg-linear-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">
                  {isPro ? "Verified Pro Mentor" : "Standard Tutor Tier"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isPro
                  ? "Your tuitions receive top search ranking, priority applicant alerts, and a verified mentor shield."
                  : "Upgrade to Pro to boost tuition visibility, unlock unlimited posts, and stand out to students."}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-2">
              <Link
                href="/dashboard/tutor/post-tuition"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-amber-500" />
                  <span>Post Tuition Listing</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link
                href="/dashboard/tutor/applicants"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Student Applicants</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
              <Link
                href="/pricing"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pro Plan Benefits</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            {!isPro ? (
              <Link
                href="/payment?plan=tutor"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade to Pro ($15)</span>
              </Link>
            ) : (
              <div className="w-full text-center py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pro Membership Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
