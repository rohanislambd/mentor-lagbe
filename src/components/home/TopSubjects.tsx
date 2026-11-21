"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Calculator,
  Atom,
  Code2,
  Globe2,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Star,
  FileSpreadsheet,
  Dna,
} from "lucide-react";

interface TopSubjectsProps {
  totalTutors?: number;
  totalStudents?: number;
  totalTuitions?: number;
}

interface SubjectCategory {
  name: string;
  query: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
}

const POPULAR_SUBJECTS: SubjectCategory[] = [
  {
    name: "Mathematics",
    query: "Mathematics",
    description: "Calculus, Higher Math, General Math & Cambridge O/A-Levels.",
    icon: Calculator,
    badge: "Most Demanded",
    badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  },
  {
    name: "Physics",
    query: "Physics",
    description: "Mechanics, Electromagnetism, Modern Physics & Board Exam prep.",
    icon: Atom,
    badge: "HSC & A-Level",
    badgeColor: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  },
  {
    name: "Chemistry",
    query: "Chemistry",
    description: "Organic, Inorganic Chemistry & Chemical equations clarity.",
    icon: FlaskConical,
    badge: "Science Core",
    badgeColor: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  },
  {
    name: "Biology",
    query: "Biology",
    description: "Botany, Zoology, Genetics & Medical admission foundation.",
    icon: Dna,
    badge: "Medical Prep",
    badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    name: "English",
    query: "English",
    description: "Grammar, Comprehension, Academic Writing & Spoken fluency.",
    icon: BookOpen,
    badge: "Language Skill",
    badgeColor: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30",
  },
  {
    name: "Programming",
    query: "Programming",
    description: "Python, C++, Web Development, Algorithms & Computer Science.",
    icon: Code2,
    badge: "Future Skill",
    badgeColor: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
  },
  {
    name: "Accounting",
    query: "Accounting",
    description: "Financial Accounting, Cost Accounting & Business Studies.",
    icon: FileSpreadsheet,
    badge: "Commerce Core",
    badgeColor: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30",
  },
  {
    name: "IELTS",
    query: "IELTS",
    description: "Band 7.5+ Mentors for Speaking, Writing, Reading & Listening.",
    icon: Globe2,
    badge: "Study Abroad",
    badgeColor: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function TopSubjects({
  totalTutors,
  totalStudents,
  totalTuitions,
}: TopSubjectsProps) {
  const displayTutors =
    totalTutors && totalTutors > 0 ? `${totalTutors.toLocaleString()}+` : "1,240+";
  const displayStudents =
    totalStudents && totalStudents > 0 ? `${totalStudents.toLocaleString()}+` : "4,850+";
  const displayTuitions =
    totalTuitions && totalTuitions > 0 ? `${totalTuitions.toLocaleString()}+` : "500+";

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Explore by Specialization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Top Subject{" "}
              <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Find qualified subject specialists from top universities. Click any category to instantly view and filter available mentorship batches.
            </p>
          </div>

          <Link
            href="/browse-tuitions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 group shrink-0"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 8 Subject Cards Grid (4 Columns on LG, 2 on SM, 1 on Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {POPULAR_SUBJECTS.map((sub) => {
            const Icon = sub.icon;

            return (
              <motion.div
                key={sub.name}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/browse-tuitions?subject=${encodeURIComponent(sub.query)}`}
                  className="rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#13172e] p-6 shadow-xs hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between h-full group block"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${sub.badgeColor}`}>
                        {sub.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 font-medium line-clamp-2">
                        {sub.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Browse {sub.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Platform Statistics Counters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#13172e] p-6 sm:p-8 shadow-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-border/80">
            {/* Stat 1: Verified Tutors */}
            <div className="flex items-center gap-4 pt-4 first:pt-0 lg:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {displayTutors}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                  Verified Mentors
                </p>
              </div>
            </div>

            {/* Stat 2: Active Students */}
            <div className="flex items-center gap-4 pt-4 first:pt-0 lg:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {displayStudents}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                  Active Students
                </p>
              </div>
            </div>

            {/* Stat 3: Total Batches */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {displayTuitions}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                  Approved Listings
                </p>
              </div>
            </div>

            {/* Stat 4: Average Rating */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>4.9</span>
                  <span className="text-sm font-bold text-muted-foreground">/ 5.0</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
