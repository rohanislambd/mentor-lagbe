import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
  Award,
} from "lucide-react";
import { getTuitonDetailById } from "@/lib/api/tuitons.";
import { Tuition } from "../../../../teype/tuitiontype";
import { ApplyTuitionModal } from "@/components/tuitions/ApplyTuitionModal";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tuition Details - MentorLagbe",
  description: "View comprehensive mentorship details, syllabus, schedule, and tutor profile.",
};

interface TuitionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TuitionDetailsPage({ params }: TuitionDetailsPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const rawData = await getTuitonDetailById(id);
  const tuition: Tuition | null = rawData?.data || rawData?.result || rawData;

  if (!tuition || !tuition.title) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Tuition Post Not Found
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          The tuition posting you are looking for may have been removed, closed, or does not exist.
        </p>
        <Link
          href="/browse-tuitions"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Tuitions</span>
        </Link>
      </div>
    );
  }

  const tutorInitial = tuition.tutorName
    ? tuition.tutorName.trim().charAt(0).toUpperCase()
    : "T";

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/browse-tuitions"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all tuitions</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Browse Tuitions</span>
            <span>/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">
              {tuition.subject}
            </span>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-muted">
            {tuition.bannerImage ? (
              <Image
                src={tuition.bannerImage}
                alt={tuition.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-amber-500/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30" />

            {/* Badges on Top */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/90 text-slate-900 hover:bg-white font-bold text-xs uppercase tracking-wider backdrop-blur-md border-0">
                  {tuition.subject}
                </Badge>
                <Badge className="bg-amber-500 text-white font-bold text-xs border-0">
                  {tuition.classLevel}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${
                    tuition.mode === "Online"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-amber-500/90 text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {tuition.mode} Mentorship
                </span>
              </div>
            </div>

            {/* Bottom Overlay Title & Tutor Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight drop-shadow-md">
                {tuition.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {tutorInitial}
                  </span>
                  Mentor: <strong>{tuition.tutorName}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Admin Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Main Details & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-card border border-border shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  <span>Class Level</span>
                </div>
                <p className="text-sm font-bold text-foreground">{tuition.classLevel}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Schedule</span>
                </div>
                <p className="text-sm font-bold text-foreground">{tuition.daysPerWeek}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Mode</span>
                </div>
                <p className="text-sm font-bold text-foreground">{tuition.mode}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Location</span>
                </div>
                <p className="text-sm font-bold text-foreground truncate">{tuition.location}</p>
              </div>
            </div>

            {/* About / Course Description */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-foreground">
                  About This Mentorship / Tuition
                </h2>
              </div>

              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {tuition.description || "No detailed description provided for this tuition post."}
              </div>
            </div>

            {/* Program Highlights */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-foreground">
                  What You Get With This Tuition
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block font-semibold">
                      Personalized 1-on-1 Guidance
                    </strong>
                    <span className="text-muted-foreground">
                      Structured curriculum paced specifically to your individual learning needs.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block font-semibold">
                      Dedicated Problem Solving
                    </strong>
                    <span className="text-muted-foreground">
                      Continuous doubt resolution and deep dive into weak areas and test papers.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <Calendar className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block font-semibold">
                      Flexible Batch Schedule
                    </strong>
                    <span className="text-muted-foreground">
                      Coordinated timing: {tuition.daysPerWeek} ({tuition.mode}).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border/60">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground block font-semibold">
                      Verified Quality Assurance
                    </strong>
                    <span className="text-muted-foreground">
                      Teacher profile, credentials, and academic background verified by MentorLagbe.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Enrollment / Pricing Card */}
            <div className="p-6 rounded-2xl bg-card border-2 border-amber-500/30 shadow-md space-y-5 sticky top-20">
              <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Tuition Fee
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-black text-foreground">
                      ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">/ month</span>
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/5 text-xs font-bold">
                  Active Post
                </Badge>
              </div>

              {/* Quick Summary list */}
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    Subject
                  </span>
                  <span className="font-semibold text-foreground">{tuition.subject}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Days
                  </span>
                  <span className="font-semibold text-foreground">{tuition.daysPerWeek}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Location
                  </span>
                  <span className="font-semibold text-foreground truncate max-w-[150px]">
                    {tuition.location}
                  </span>
                </div>
              </div>

              {/* Apply for Tuition Modal Action */}
              <div className="pt-2">
                <Suspense
                  fallback={
                    <div className="h-12 w-full rounded-xl bg-amber-500/20 animate-pulse" />
                  }
                >
                  <ApplyTuitionModal tuition={tuition} />
                </Suspense>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified & Protected Mentorship</span>
              </div>

              {/* Tutor Profile Mini Card */}
              <div className="pt-4 border-t border-border/60">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                  About the Tutor
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {tutorInitial}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {tuition.tutorName}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {tuition.tutorEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
