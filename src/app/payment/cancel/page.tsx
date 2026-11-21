import React from "react";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Payment Cancelled - MentorLagbe",
  description: "The payment process was cancelled.",
};

export default function PaymentCancelPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-border/80 bg-card p-8 text-center space-y-6 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <XCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You cancelled the checkout session. No charges were made to your account.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/pricing"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Plans</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
