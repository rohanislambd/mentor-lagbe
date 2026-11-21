"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Tuition } from "../../../teype/tuitiontype";
import { TuitionCard } from "@/components/tuitions/TuitionCard";

interface FeaturedTuitionsProps {
  tuitions: Tuition[];
}

// Stagger container animation for cards
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

// Child card entrance animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function FeaturedTuitions({ tuitions }: FeaturedTuitionsProps) {
  // Display up to 6 latest approved tuitions
  const latestTuitions = tuitions.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-muted/20 border-t border-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with smooth viewport entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Latest Approved Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              Featured{" "}
              <span className="bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Tuitions & Mentorships
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Explore the latest admin-verified tuition posts from expert educators across Bangladesh. Apply in one click.
            </p>
          </div>

          <Link
            href="/browse-tuitions"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors group shrink-0"
          >
            <span>View All Tuitions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 6 Tuitions Grid with Staggered Scroll Animation */}
        {latestTuitions.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {latestTuitions.map((tuition, index) => (
              <motion.div
                key={tuition._id || `featured-tuition-${index}`}
                variants={cardVariants}
                className="h-full"
              >
                <TuitionCard tuition={tuition} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty Fallback State */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center space-y-4 rounded-3xl border border-dashed border-border bg-card p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                No Tuitions Available Right Now
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                New tuition postings will appear here once verified by our moderation team.
              </p>
            </div>
            <Link
              href="/browse-tuitions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              <span>Explore All Tuitions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Bottom Explore Button with Fade-Up */}
        {latestTuitions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="pt-4 text-center"
          >
            <Link
              href="/browse-tuitions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 group"
            >
              <span>Explore All {tuitions.length > 6 ? `${tuitions.length}+` : ""} Tuitions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
