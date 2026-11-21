import React from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Checkout & Payment - MentorLagbe",
  description: "Complete your Stripe payment to unlock Pro plan benefits on MentorLagbe.",
};

export default function PaymentPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-border/80 bg-card p-8 text-center space-y-6 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <CreditCard className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">
            Stripe Payment Checkout
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Payment integration and checkout preparation in progress.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/pricing"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
