"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Star, Sparkles, CheckCircle2, Quote } from "lucide-react";

interface TestimonialItem {
  name: string;
  role: string;
  institution: string;
  badge: string;
  badgeColor: string;
  rating: number;
  comment: string;
  initials: string;
  avatarBg: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Tanvir Hasan",
    role: "HSC Science Candidate",
    institution: "Notre Dame College, Dhaka",
    badge: "Verified Student",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    rating: 5,
    comment:
      "Finding a BUET mentor for Higher Math seemed daunting until I applied on MentorLagbe. Applied in one click, and my tutor explained complex calculus with step-by-step clarity. Truly a game-changer for board exam prep!",
    initials: "TH",
    avatarBg: "bg-linear-to-tr from-amber-500 to-orange-500",
  },
  {
    name: "Engr. Mahmudul Karim",
    role: "Physics Specialist & Tutor",
    institution: "BUET Graduate • 4+ Yrs Mentoring",
    badge: "Verified Pro Tutor",
    badgeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    rating: 5,
    comment:
      "Posting my Physics batch took less than two minutes. The tutor dashboard makes managing student admission applications effortless. Upgraded to Pro Tutor and filled both my batches in under a week!",
    initials: "MK",
    avatarBg: "bg-linear-to-tr from-indigo-600 to-purple-600",
  },
  {
    name: "Nusrat Jahan",
    role: "IELTS Exam Candidate",
    institution: "University of Dhaka (DU)",
    badge: "Verified Student",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    rating: 5,
    comment:
      "I connected with an expert IELTS mentor for speaking and academic writing. Having direct contact details and structured weekly schedule helped me score Band 7.5 on my very first attempt!",
    initials: "NJ",
    avatarBg: "bg-linear-to-tr from-emerald-500 to-teal-600",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0c0f1d] relative overflow-hidden border-t border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="uppercase tracking-widest text-[11px] font-extrabold">
              Real Stories & Reviews
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by Students &{" "}
            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Verified Tutors
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            See how MentorLagbe helps learners master tough subjects and empowers tutors to build thriving mentorship batches.
          </p>
        </motion.div>

        {/* 3 Feedback Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#13172e] p-7 sm:p-8 shadow-xs hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between group relative"
            >
              <div className="space-y-5">
                {/* Top Row: 5 Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                </div>

                {/* Review Comment */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-6 border-t border-border/70 flex items-center justify-between gap-3 mt-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.avatarBg} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                      {item.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 inline" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <span className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
