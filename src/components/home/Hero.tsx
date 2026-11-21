"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tuition } from "../../../teype/tuitiontype";

interface HeroProps {
  initialTuitions?: Tuition[];
  totalCount?: number;
  totalTutors?: number;
  totalStudents?: number;
}

const POPULAR_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Programming",
];

export default function Hero({
  initialTuitions = [],
  totalTutors,
  totalStudents,
}: HeroProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter approved or active tuitions if available
  const availableTuitions = initialTuitions.filter((t) => t.isActive !== false);
  const currentTuition = availableTuitions[activeIndex] || availableTuitions[0];

  // Dynamic user statistics from /home/totaluser with fallback
  const displayTutors =
    totalTutors !== undefined && totalTutors !== null
      ? totalTutors > 0
        ? `${totalTutors.toLocaleString()}+`
        : `${totalTutors}`
      : "1,240+";

  const displayStudents =
    totalStudents !== undefined && totalStudents !== null
      ? totalStudents > 0
        ? `${totalStudents.toLocaleString()}+`
        : `${totalStudents}`
      : "4,850+";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/browse-tuitions?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/browse-tuitions");
    }
  };

  const handlePrev = () => {
    if (availableTuitions.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? availableTuitions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (availableTuitions.length <= 1) return;
    setActiveIndex((prev) => (prev === availableTuitions.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-background pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[520px] w-full max-w-7xl -translate-x-1/2 opacity-25 blur-3xl dark:opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.45) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Search & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Ecosystem Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Smart Mentorship & Tuition Ecosystem in Bangladesh</span>
            </div>

            {/* Engaging Responsive Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
              Find Your Ideal{" "}
              <span className="text-amber-500">Tutor</span> or{" "}
              <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Mentorship Batch
              </span>{" "}
              Today
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-normal leading-relaxed">
              Connect with verified educators and subject specialists across Bangladesh. Discover
              custom 1-on-1 home tuitions or join interactive online batches tailored to your academic needs.
            </p>

            {/* Search Input & Action Button */}
            <div className="pt-2 max-w-xl">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-card border border-border shadow-md focus-within:ring-2 focus-within:ring-amber-500/40 transition-all"
              >
                <div className="relative flex-1 flex items-center min-w-0 pl-3 sm:pl-4">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search subject, class, or topic (e.g. Higher Math, Physics)..."
                    className="w-full pl-3 pr-2 py-2 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Browse Tuitions</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Quick Subject Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/80">Popular:</span>
                {POPULAR_SUBJECTS.map((subject) => (
                  <Link
                    key={subject}
                    href={`/browse-tuitions?subject=${encodeURIComponent(subject)}`}
                    className="px-2.5 py-1 rounded-lg bg-muted/50 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 border border-border/70 transition-colors"
                  >
                    {subject}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Admin-Verified Tutors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Online & Home Batches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Transparent Monthly Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Live Tuition Preview Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] rounded-3xl p-4 sm:p-5 bg-card border border-border shadow-2xl space-y-4">
              {/* Dynamic Midnight Card */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#161938] text-white shadow-lg space-y-5 border border-white/5">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Mentorship Active</span>
                  </div>
                  <span className="text-slate-300 text-[11px] font-medium">
                    98.4% Satisfaction
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Personalized Academic Matching
                  </h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed">
                    Filter by class level, budget, and schedule—apply in one click.
                  </p>
                </div>

                {/* 3 Metric Boxes (Dynamic from /home/totaluser) */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {/* Metric 1: Verified Tutors */}
                  <div className="bg-[#20254e] rounded-xl p-3 border border-white/5 text-left">
                    <div className="text-base sm:text-lg font-black text-amber-400">
                      {displayTutors}
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                      Verified Tutors
                    </div>
                  </div>

                  {/* Metric 2: Active Students */}
                  <div className="bg-[#20254e] rounded-xl p-3 border border-white/5 text-left">
                    <div className="text-base sm:text-lg font-black text-emerald-400">
                      {displayStudents}
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                      Active Students
                    </div>
                  </div>

                  {/* Metric 3: 100% Verified */}
                  <div className="bg-[#20254e] rounded-xl p-3 border border-white/5 text-left">
                    <div className="text-base sm:text-lg font-black text-white">
                      100%
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Tuition Card (Real Data from Database) */}
              {currentTuition ? (
                <div className="rounded-2xl p-4 bg-background border border-border shadow-xs space-y-3 transition-all">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Featured Mentorship
                    </span>
                    {availableTuitions.length > 1 && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Previous tuition"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-mono">
                          {activeIndex + 1}/{availableTuitions.length}
                        </span>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Next tuition"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    {/* Thumbnail / Avatar */}
                    {currentTuition.bannerImage ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                        <Image
                          src={currentTuition.bannerImage}
                          alt={currentTuition.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                        {currentTuition.tutorName?.charAt(0)?.toUpperCase() || "T"}
                      </div>
                    )}

                    {/* Details */}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-foreground truncate">
                        {currentTuition.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        By {currentTuition.tutorName || "Verified Mentor"} • {currentTuition.subject}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        <span className="font-extrabold text-amber-600 dark:text-amber-400">
                          ৳{Number(currentTuition.monthlyFee || 0).toLocaleString()}/mo
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="flex items-center gap-0.5 text-muted-foreground">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {currentTuition.mode || "Online"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link to Details */}
                  {currentTuition._id ? (
                    <Link
                      href={`/browse-tuitions/${currentTuition._id}`}
                      className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-muted/60 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-semibold border border-border transition-all"
                    >
                      <span>View Details & Apply</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  ) : null}
                </div>
              ) : (
                /* Fallback if no tuitions posted yet */
                <div className="rounded-2xl p-4 bg-background border border-border shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 font-black text-xs flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">
                        Verified Mentors Available
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Higher Math, Physics, English & Coding
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
