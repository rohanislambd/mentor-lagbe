import React from "react";
import { Sparkles } from "lucide-react";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PricingFaq } from "@/components/pricing/PricingFaq";

export const metadata = {
  title: "Pricing & Pro Plans - MentorLagbe",
  description:
    "Upgrade to MentorLagbe Pro. Unlock unlimited tuition batches for tutors, priority application placement for students, and verified credibility.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-amber-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Stripe Powered Upgrades</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Simple, Transparent Pro Plans
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instant Stripe Checkout synchronization automatically updates your account role privileges and records your transaction receipt.
          </p>
        </div>

        {/* Pricing Cards Component */}
        <PricingCards />

        {/* FAQ Section */}
        <PricingFaq />
      </div>
    </main>
  );
}
