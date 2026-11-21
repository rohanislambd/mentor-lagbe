"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  UserPlus,
  Search,
  FileCheck2,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Create Role Account",
    description:
      "Sign up as a Student or Tutor with instant dashboard access and profile customization.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Post or Browse Batches",
    description:
      "Tutors publish subject batches; Admins verify quality before listings go live.",
    icon: Search,
  },
  {
    number: "03",
    title: "Apply & Track Real-Time",
    description:
      "Students submit preferred schedules and track application status directly in their dashboard.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Upgrade to Pro via Stripe",
    description:
      "Unlock unlimited tuition posts, verified badges, and priority booking with Stripe.",
    icon: CreditCard,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 dark:bg-[#0b0e1b] relative overflow-hidden border-t border-border/80">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[450px] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl dark:opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.4) 0%, rgba(249, 115, 22, 0.2) 45%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="uppercase tracking-widest text-[11px] font-extrabold">
              Seamless Ecosystem
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How{" "}
            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              MentorLagbe Works
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
            Whether you are a student seeking structured mentorship or a qualified tutor building batches, getting started takes minutes.
          </p>
        </motion.div>

        {/* 4 Cards Grid with High-Contrast Backgrounds & Sharp Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#13172e] p-7 shadow-xs hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-amber-500 transition-colors duration-300" />

                <div>
                  {/* Top Row: Icon on left, Step Number on right */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:scale-105 transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-3xl font-black text-amber-500/50 dark:text-amber-400/40 font-mono group-hover:text-amber-500 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title (High Contrast & Clear) */}
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mt-5 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description (Crisp, High-Readability Text) */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
