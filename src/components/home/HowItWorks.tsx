"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Search,
  FileCheck2,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  UserCheck,
  Send,
  Users,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  tagColor: string;
}

const STUDENT_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Discover Verified Mentors",
    description: "Browse approved listings and filter by subject, class level, mode (online or home tuition), and budget.",
    icon: Search,
    tag: "Smart Search & Filters",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    number: "02",
    title: "Apply with One Click",
    description: "Submit a free admission application with your contact number, preferred days, and any learning notes.",
    icon: Send,
    tag: "Free Application",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    number: "03",
    title: "Track & Get Accepted",
    description: "Monitor application progress in real-time from your student dashboard as tutors review and accept your request.",
    icon: FileCheck2,
    tag: "Real-time Tracking",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    number: "04",
    title: "Start Learning & Excel",
    description: "Direct contact is unlocked. Connect with your mentor and begin structured personalized sessions.",
    icon: GraduationCap,
    tag: "Mentorship Begins",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

const TUTOR_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Register & Build Profile",
    description: "Sign up as a tutor, showcase your educational background, and highlight your teaching expertise.",
    icon: UserCheck,
    tag: "Quick Sign Up",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    number: "02",
    title: "Post Tuition Batches",
    description: "Publish your tuition posts with subject, class, monthly fee, schedule, and online or in-person location.",
    icon: BookOpen,
    tag: "Fast Admin Review",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    number: "03",
    title: "Manage Student Applicants",
    description: "Receive incoming admission requests directly in your dashboard with student contact details and preferred times.",
    icon: Users,
    tag: "One-Click Review",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    number: "04",
    title: "Accept & Teach Students",
    description: "Accept suitable students, coordinate lesson schedules, and grow your teaching career with zero commission cuts.",
    icon: CheckCircle2,
    tag: "0% Commission",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");
  const steps = activeTab === "student" ? STUDENT_STEPS : TUTOR_STEPS;

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Simple & Transparent Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            How{" "}
            <span className="bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              MentorLagbe Works
            </span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether you are looking to learn or ready to teach, MentorLagbe makes finding and managing academic mentorship effortless in 4 simple steps.
          </p>

          {/* Role Switcher Pill */}
          <div className="pt-3 inline-flex p-1.5 rounded-2xl bg-muted/80 border border-border backdrop-blur-md shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("student")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "student"
                  ? "bg-card text-foreground shadow-xs border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>For Students (Finding Tutors)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tutor")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "tutor"
                  ? "bg-card text-foreground shadow-xs border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>For Tutors (Posting Batches)</span>
            </button>
          </div>
        </motion.div>

        {/* 4 Steps Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-card border border-border/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative group"
                >
                  <div className="space-y-4">
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-amber-500/40 group-hover:text-amber-500 transition-colors font-mono">
                        {step.number}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Tag */}
                    <div className="space-y-1.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border ${step.tagColor}`}>
                        {step.tag}
                      </span>
                      <h3 className="text-base font-bold text-foreground tracking-tight leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    {/* Step Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom visual accent line */}
                  <div className="pt-2">
                    <div className="h-1 w-12 rounded-full bg-amber-500/20 group-hover:w-full group-hover:bg-amber-500 transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic CTA depending on selected role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="text-center pt-2"
        >
          {activeTab === "student" ? (
            <Link
              href="/browse-tuitions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <span>Explore Verified Tuitions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/dashboard/tutor/post-tuition"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <span>Post Your Tuition Batch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
