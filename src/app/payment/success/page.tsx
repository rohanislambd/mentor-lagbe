export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PaymentSuccessView } from "@/components/payment/PaymentSuccessView";

export const metadata = {
  title: "Payment Successful - MentorLagbe",
  description: "Your Stripe payment has been confirmed and your Pro plan is now active.",
};

function PaymentSuccessFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      <p className="text-sm">Loading payment confirmation...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background relative">
      <Suspense fallback={<PaymentSuccessFallback />}>
        <PaymentSuccessView />
      </Suspense>
    </main>
  );
}
