export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { getAdminStats } from "@/lib/api/admin";

export const metadata = {
  title: "Admin Overview - Platform Statistics | MentorLagbe",
  description:
    "Real-time platform statistics covering users, tutors, tuition moderation, and Stripe revenue.",
};

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
  const totalUsers = Number(stats?.totalUsers ?? 0);
  const totalTutors = Number(stats?.totalTutors ?? 0);
  const totalStudents = Number(stats?.totalStudents ?? 0);
  const pendingTuitions = Number(stats?.pendingTuitions ?? 0);
  const approvedTuitions = Number(stats?.approvedTuitions ?? 0);
  const totalTuitions =
    Number(stats?.totalTuitions ?? 0) || pendingTuitions + approvedTuitions;
  const totalRevenue = Number(stats?.totalRevenue ?? 0);
  const totalPayments = Number(stats?.totalPayments ?? 0);

  // Percentages for visual progress bars
  const approvedPercentage =
    totalTuitions > 0 ? Math.round((approvedTuitions / totalTuitions) * 100) : 0;
  const tutorPercentage =
    totalUsers > 0 ? Math.round((totalTutors / totalUsers) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Page Title & Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <span>Platform Overview</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Live Analytics
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time analytics across platform users, mentorship batches, and Stripe subscription earnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/admin/transactions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors shadow-2xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-500" />
            <span>Transactions</span>
          </Link>
          <Link
            href="/dashboard/admin/tuitions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Moderate Tuitions</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Platform Statistic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Users */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Users
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-foreground">
              {totalUsers.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span>{totalStudents.toLocaleString()} Students</span>
              <span>•</span>
              <span>{totalTutors.toLocaleString()} Tutors</span>
            </p>
          </div>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/dashboard/admin/users"
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Manage all users</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 2. Total Tutors */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Tutors
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-foreground">
              {totalTutors.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Registered & active educators
            </p>
          </div>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/dashboard/admin/users"
              className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View mentor accounts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 3. Pending vs Approved Tuitions */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tuition Posts
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-black text-foreground">
                {totalTuitions.toLocaleString()}
              </p>
              <span className="text-[11px] font-semibold text-muted-foreground">
                Total listings
              </span>
            </div>
            {/* Status pills: Pending vs Approved */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                <Clock className="w-3 h-3" />
                <span>{pendingTuitions} Pending</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                <CheckCircle2 className="w-3 h-3" />
                <span>{approvedTuitions} Approved</span>
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/dashboard/admin/tuitions"
              className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Review pending posts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 4. Total Stripe Revenue */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stripe Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ${totalRevenue.toLocaleString()}{" "}
              <span className="text-xs font-semibold text-muted-foreground">USD</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span>{totalPayments} completed subscriptions</span>
            </p>
          </div>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/dashboard/admin/transactions"
              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View transaction records</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown & Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tuition Moderation Health Breakdown */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-bold text-base text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Tuitions Moderation Ratio</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Distribution of verified vs pending tuition requests
              </p>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              {totalTuitions} Total
            </span>
          </div>

          {/* Dual Progress Bar */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
              <div
                style={{ width: `${approvedPercentage}%` }}
                className="bg-emerald-500 h-full transition-all"
                title={`Approved: ${approvedPercentage}%`}
              />
              <div
                style={{ width: `${100 - approvedPercentage}%` }}
                className="bg-amber-500 h-full transition-all"
                title={`Pending: ${100 - approvedPercentage}%`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Approved ({approvedPercentage}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Pending ({100 - approvedPercentage}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-0.5">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                Approved & Active
              </span>
              <p className="text-xl font-black text-foreground">
                {approvedTuitions}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-0.5">
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                Awaiting Moderation
              </span>
              <p className="text-xl font-black text-foreground">
                {pendingTuitions}
              </p>
            </div>
          </div>
        </div>

        {/* User Distribution Ratio Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-bold text-base text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>User Demographics</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Student to Tutor balance across the marketplace
              </p>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              {totalUsers} Total
            </span>
          </div>

          {/* User Demographic Bar */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
              <div
                style={{ width: `${100 - tutorPercentage}%` }}
                className="bg-blue-500 h-full transition-all"
                title={`Students: ${100 - tutorPercentage}%`}
              />
              <div
                style={{ width: `${tutorPercentage}%` }}
                className="bg-purple-500 h-full transition-all"
                title={`Tutors: ${tutorPercentage}%`}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Students ({100 - tutorPercentage}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Tutors ({tutorPercentage}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-0.5">
              <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                Total Students
              </span>
              <p className="text-xl font-black text-foreground">
                {totalStudents}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-0.5">
              <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-400">
                Total Tutors
              </span>
              <p className="text-xl font-black text-foreground">
                {totalTutors}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
