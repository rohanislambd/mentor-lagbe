import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Payment Successful - MentorLagbe",
  description: "Your payment was processed successfully.",
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-border/80 bg-card p-8 text-center space-y-6 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">
            Payment Successful!
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your Pro plan is being verified and activated on your account.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
