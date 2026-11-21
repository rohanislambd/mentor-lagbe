"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Lock,
  Star,
  AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function PricingCards() {
  const { data: session } = authClient.useSession();
  const user = session?.user as { role?: string; plan?: string } | undefined;
  const currentPlan = user?.plan || "free";
  const userRole = user?.role;

  // Active Role Tab: 'student' | 'tutor'
  const [activeRole, setActiveRole] = useState<"student" | "tutor">(
    userRole === "tutor" ? "tutor" : "student"
  );

  return (
    <div className="space-y-10">
      {/* Role Selection Tabs */}
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex p-1.5 rounded-2xl bg-muted/80 border border-border/80 backdrop-blur-md shadow-inner gap-1">
          <button
            type="button"
            onClick={() => setActiveRole("student")}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeRole === "student"
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Student Plans (Free vs Pro)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole("tutor")}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeRole === "tutor"
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>Tutor Plans (Free vs Pro)</span>
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          {activeRole === "student"
            ? "Compare the Student Free tier with the Pro Student upgrade ($10)"
            : "Compare the Tutor Free tier with the Pro Tutor upgrade ($15)"}
        </p>
      </div>

      {/* ================= STUDENT PLANS (FREE VS PRO) ================= */}
      {activeRole === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Student Free Plan */}
          <div className="rounded-3xl border border-border/80 bg-card/70 p-7 sm:p-8 flex flex-col justify-between hover:border-border hover:shadow-md transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border/60">
                  Student Free
                </span>
                {userRole === "student" && currentPlan === "free" && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Your Current Plan
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                  Free Student Plan
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Basic access to explore verified tuition batches and connect with potential mentors.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pb-2 border-b border-border/60">
                <span className="text-4xl sm:text-5xl font-black text-foreground">$0</span>
                <span className="text-xs font-semibold text-muted-foreground">/ forever</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Browse all verified tuition batch postings</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-foreground">Unlimited Tuition Applications</strong> (No application limits)
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Real-time in-app application status tracking</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground/60">
                  <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">No priority booking (standard queue behind Pro students)</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground/60">
                  <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">No Pro Student verified shield badge</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/browse-tuitions"
                className="w-full h-12 rounded-xl text-xs font-bold border border-input bg-background hover:bg-muted text-foreground flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer"
              >
                <span>Browse Tuitions Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Student Pro Plan (HIGHLIGHTED) */}
          <div className="relative rounded-3xl border-2 border-indigo-500/60 bg-card p-7 sm:p-8 flex flex-col justify-between shadow-xl ring-2 ring-indigo-500/20 hover:shadow-2xl transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                  Pro Student
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                  <Zap className="w-3 h-3 fill-white" />
                  Priority Booking
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <span>Pro Student Plan</span>
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Stand out to top BUET/DU mentors with <strong>priority booking</strong>, fast-track admission, and verified student credibility.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pb-2 border-b border-border/60">
                <span className="text-4xl sm:text-5xl font-black text-indigo-600 dark:text-indigo-400">$10</span>
                <span className="text-xs font-semibold text-muted-foreground">/ one-time upgrade</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs text-foreground/90">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-foreground">Priority Booking & Placement</strong> — Tutors review and accept your application first before seats fill up
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-foreground">Unlimited Tuition Applications</strong> (Apply to as many batches as you want)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-foreground">Verified Pro Student Badge</strong> on profile & requests
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct phone & WhatsApp contact highlight to mentors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dedicated mentorship assistance & priority doubt resolution</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              {userRole === "student" && currentPlan === "pro" ? (
                <div className="w-full h-12 rounded-xl text-xs font-bold border border-emerald-500/40 text-emerald-600 bg-emerald-500/10 flex items-center justify-center cursor-default">
                  Already Subscribed to Pro
                </div>
              ) : userRole === "tutor" ? (
                <div className="space-y-1.5">
                  <button
                    type="button"
                    disabled
                    className="w-full h-12 rounded-xl text-xs font-bold bg-muted/70 text-muted-foreground border border-border/80 flex items-center justify-center gap-1.5 cursor-not-allowed opacity-80"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Students Only (You are a Tutor)</span>
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Tutors cannot buy student plans. Switch to{" "}
                    <button
                      type="button"
                      onClick={() => setActiveRole("tutor")}
                      className="text-amber-500 underline font-semibold cursor-pointer"
                    >
                      Tutor Plans
                    </button>
                    .
                  </p>
                </div>
              ) : userRole === "admin" ? (
                <div className="w-full h-12 rounded-xl text-xs font-bold bg-muted/60 text-muted-foreground border border-border/80 flex items-center justify-center cursor-default">
                  Admins Have Full Access
                </div>
              ) : (
                <Link
                  href="/payment?plan=student"
                  className="w-full h-12 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Get Priority Booking ($10)</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TUTOR PLANS (FREE VS PRO) ================= */}
      {activeRole === "tutor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Tutor Free Plan */}
          <div className="rounded-3xl border border-border/80 bg-card/70 p-7 sm:p-8 flex flex-col justify-between hover:border-border hover:shadow-md transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border/60">
                  Tutor Free
                </span>
                {userRole === "tutor" && currentPlan === "free" && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Your Current Plan
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                  Free Tutor Plan
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Start teaching with up to 2 active batches and receive student applications.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pb-2 border-b border-border/60">
                <span className="text-4xl sm:text-5xl font-black text-foreground">$0</span>
                <span className="text-xs font-semibold text-muted-foreground">/ forever</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs">
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Post up to <strong>2 active tuition batches</strong></span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Receive and review incoming student applicants</span>
                </li>
                <li className="flex items-start gap-2.5 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>One-click Accept or Reject applicant status</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground/60">
                  <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Capped strictly at 2 batch postings</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground/60">
                  <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">No Verified Pro Mentor shield badge</span>
                </li>
                <li className="flex items-start gap-2.5 text-muted-foreground/60">
                  <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Standard search placement in subject lists</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/dashboard/tutor/post-tuition"
                className="w-full h-12 rounded-xl text-xs font-bold border border-input bg-background hover:bg-muted text-foreground flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer"
              >
                <span>Post Free Batch (Max 2)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tutor Pro Plan (HIGHLIGHTED - MOST POPULAR) */}
          <div className="relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#121624] text-white border-2 border-amber-500/80 hover:border-amber-400 transition-all">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Pro Tutor
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm">
                  <Star className="w-3 h-3 fill-slate-950" />
                  Most Popular
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Pro Tutor Plan</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Scale your tutoring career with unlimited batches, top search ranking, and verified credibility.
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-800">
                <span className="text-4xl sm:text-5xl font-black text-amber-400">$15</span>
                <span className="text-xs font-semibold text-slate-400">/ one-time upgrade</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Unlimited Tuition Batch Posts</strong> (No 2-post limit)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Verified Pro Mentor Shield Badge</strong> on all posts
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong className="text-white">Featured Top Placement</strong> in Subject & Location filters
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct phone & WhatsApp applicant visibility</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Instant student applicant contact alerts via dashboard</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              {userRole === "tutor" && currentPlan === "pro" ? (
                <div className="w-full h-12 rounded-xl text-xs font-bold border border-amber-500/40 text-amber-400 bg-amber-500/10 flex items-center justify-center cursor-default">
                  Already Subscribed to Pro
                </div>
              ) : userRole === "student" ? (
                <div className="space-y-1.5">
                  <button
                    type="button"
                    disabled
                    className="w-full h-12 rounded-xl text-xs font-bold bg-slate-800/80 text-slate-400 border border-slate-700 flex items-center justify-center gap-1.5 cursor-not-allowed opacity-80"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tutors Only (You are a Student)</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Students cannot buy tutor plans. Switch to{" "}
                    <button
                      type="button"
                      onClick={() => setActiveRole("student")}
                      className="text-amber-400 underline font-semibold cursor-pointer"
                    >
                      Student Plans
                    </button>
                    .
                  </p>
                </div>
              ) : userRole === "admin" ? (
                <div className="w-full h-12 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center cursor-default">
                  Admins Have Full Access
                </div>
              ) : (
                <Link
                  href="/payment?plan=tutor"
                  className="w-full h-12 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg hover:shadow-amber-500/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Upgrade to Pro Tutor ($15)</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges Footer */}
      <div className="pt-4 border-t border-border/60 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Stripe 256-Bit SSL Encrypted Checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Instant Automatic Role Activation</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-500" />
          <span>One-Time Upgrade, No Monthly Fees</span>
        </div>
      </div>
    </div>
  );
}
