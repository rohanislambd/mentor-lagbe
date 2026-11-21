import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PaymentCheckout } from "@/components/payment/PaymentCheckout";

export const metadata = {
  title: "Secure Checkout - MentorLagbe",
  description: "Complete your one-time Stripe checkout to activate MentorLagbe Pro privileges.",
};

function PaymentCheckoutFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      <p className="text-sm">Loading checkout details...</p>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-background relative">
      <Suspense fallback={<PaymentCheckoutFallback />}>
        <PaymentCheckout />
      </Suspense>
    </main>
  );
}
