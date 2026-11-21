"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  Crown,
  GraduationCap,
  ShieldCheck,
  Lock,
} from "lucide-react";

interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "outline" | "primary" | "secondary";
  icon: React.ElementType;
}

const PRICING_PLANS: PlanItem[] = [
  {
    id: "student-free",
    name: "Free Student",
    subtitle: "Standard Access",
    price: "$0",
    period: "forever",
    description: "Browse all verified tuition postings and apply to mentors across Bangladesh.",
    icon: GraduationCap,
    ctaLabel: "Browse Tuitions Free",
    ctaHref: "/browse-tuitions",
    ctaVariant: "outline",
    features: [
      "Browse all verified tuition batch postings",
      "Unlimited tuition applications (No limit)",
      "Real-time in-app application status tracking",
      "Search & filter by subject, class and mode",
      "Standard booking queue",
    ],
  },
  {
    id: "student-pro",
    name: "Pro Student",
    subtitle: "Priority Mentorship",
    badge: "⚡ Priority Booking",
    isPopular: true,
    price: "$10",
    period: "one-time upgrade",
    description: "Stand out to top tutors with priority booking, fast review, and verified credibility.",
    icon: Zap,
    ctaLabel: "Get Priority Booking ($10)",
    ctaHref: "/payment?plan=student",
    ctaVariant: "primary",
    features: [
      "Priority Booking — Tutors review your application first",
      "Unlimited tuition applications",
      "Verified Pro Student Badge on profile & requests",
      "Direct phone & WhatsApp contact visible to mentors",
      "Instant status tracking in Student Dashboard",
    ],
  },
  {
    id: "tutor-pro",
    name: "Pro Tutor",
    subtitle: "For Active Mentors",
    badge: "⭐ Most Popular",
    price: "$15",
    period: "one-time upgrade",
    description: "Scale your tutoring with unlimited batch posts, top search ranking, and Pro badge.",
    icon: Crown,
    ctaLabel: "Upgrade to Pro Tutor ($15)",
    ctaHref: "/payment?plan=tutor",
    ctaVariant: "secondary",
    features: [
      "Unlimited tuition batch posts (No 2-post limit)",
      "Golden Verified Pro Tutor Badge across the platform",
      "Featured top placement in subject & class searches",
      "Full applicant phone & preferred schedule visibility",
      "One-click Accept or Reject application status",
    ],
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
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-background relative overflow-hidden border-t border-border/60">
      {/* Ambient background decoration */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl dark:opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.35) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Stripe Powered Pro Plans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Simple, Transparent{" "}
            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Pro Plans
            </span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            One-time upgrades through Stripe Checkout. Instant account activation with verified privileges for students and mentors.
          </p>
        </motion.div>

        {/* 3 Pricing Cards Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {PRICING_PLANS.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.isPopular;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-card border-2 border-indigo-500/70 shadow-xl shadow-indigo-500/10 ring-4 ring-indigo-500/10"
                    : plan.id === "tutor-pro"
                    ? "bg-card border-2 border-amber-500/70 shadow-xl shadow-amber-500/10 ring-4 ring-amber-500/10"
                    : "bg-card/70 border border-border shadow-xs hover:border-border hover:shadow-md"
                }`}
              >
                {/* Floating Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm ${
                        isPopular
                          ? "bg-indigo-600 text-white"
                          : "bg-linear-to-r from-amber-500 to-amber-600 text-slate-950 font-black"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-foreground tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {plan.subtitle}
                      </p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isPopular
                          ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                          : plan.id === "tutor-pro"
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 border-b border-border/60 pb-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        / {plan.period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Real Implemented Feature Checklist */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Included Privileges:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isPopular
                                ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                                : plan.id === "tutor-pro"
                                ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                                : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="leading-tight text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-8 mt-auto">
                  <Link
                    href={plan.ctaHref}
                    className={`w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs ${
                      isPopular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                        : plan.id === "tutor-pro"
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-md hover:shadow-lg"
                        : "bg-muted/70 hover:bg-muted text-foreground border border-border/80"
                    }`}
                  >
                    {plan.price !== "$0" && <Lock className="w-3.5 h-3.5" />}
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Real Implemented Stripe Integration Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Stripe Checkout Verified</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Instant Role Privilege Activation</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>One-Time Payment, No Recurring Charges</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
