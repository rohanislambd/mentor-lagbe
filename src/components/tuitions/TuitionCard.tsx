"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight, MapPin, BookOpen } from "lucide-react";
import { Tuition } from "../../../teype/tuitiontype";

interface TuitionCardProps {
  tuition: Tuition;
}

export function TuitionCard({ tuition }: TuitionCardProps) {
  const tuitionId =
    tuition._id || (tuition as unknown as { id?: string }).id || "";

  // Tutor initials for avatar fallback
  const initials = tuition.tutorName
    ? tuition.tutorName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "TL";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
    >
      {/* Banner Image Container with generous height */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {tuition.bannerImage ? (
          <>
            <Image
              src={tuition.bannerImage}
              alt={tuition.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle soft gradient only at the very top for badge readability */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Modern fallback when tutor has not uploaded an image */
          <div className="w-full h-full bg-gradient-to-br from-amber-600/15 via-indigo-900/10 to-slate-900/20 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {tuition.subject} Mentorship
            </span>
          </div>
        )}

        {/* Floating Top Badges (Minimal, crisp, no text clutter) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* Subject Tag */}
          <span className="backdrop-blur-md bg-black/60 text-white font-bold text-[11px] tracking-wide uppercase px-3 py-1 rounded-full border border-white/20 shadow-md">
            {tuition.subject}
          </span>

          {/* Online / Offline Mode Pill */}
          <span
            className={`backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border shadow-md ${
              tuition.mode === "Online"
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                : "bg-amber-950/70 text-amber-300 border-amber-500/40"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                tuition.mode === "Online"
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-amber-400"
              }`}
            />
            {tuition.mode}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Class Level & Days per Week Meta Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-md font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {tuition.classLevel}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 font-medium text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {tuition.daysPerWeek}
            </span>
          </div>

          {/* Tuition Title */}
          <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {tuition.title}
          </h3>

          {/* Description Preview */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-normal">
            {tuition.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Tutor Profile Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-400/40">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5 truncate">
                {tuition.tutorName || "Experienced Tutor"}
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 inline" />
              </span>
              <span className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                {tuition.mode === "Online"
                  ? "Online Class"
                  : tuition.location || "In-Person Tuition"}
              </span>
            </div>
          </div>

          {/* Pricing & View Details Action */}
          <div className="border-t border-border/80 pt-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Monthly Fee
              </p>
              <p className="text-lg font-black text-foreground leading-none mt-0.5">
                ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground ml-0.5">
                  /mo
                </span>
              </p>
            </div>

            <Link
              href={`/browse-tuitions/${tuitionId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
