"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  User,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Check,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { verifyPaymentSession, PaymentDetails } from "@/lib/actions api/payment";

export function PaymentSuccessView() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("sessionId");

  const { data: session } = authClient.useSession();
  const sessionUser = session?.user as { name?: string; email?: string; role?: string; plan?: string } | undefined;

  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!sessionId) {
      queueMicrotask(() => {
        if (isMounted) {
          setIsVerifying(false);
          setErrorMessage("No Stripe Checkout session ID found in the URL.");
        }
      });
      return;
    }

    const verify = async () => {
      try {
        setErrorMessage(null);

        const res = await verifyPaymentSession(sessionId);

        if (!isMounted) return;

        if (res.success) {
          setIsVerified(true);
          if (res.payment) {
            setPayment(res.payment);
          }
          toast.success(
            res.alreadyVerified
              ? "Payment was previously verified! Pro features are active."
              : "Payment verified successfully! Welcome to Pro."
          );
        } else {
          throw new Error(res.message || "Failed to verify payment with server");
        }
      } catch (error) {
        if (!isMounted) return;
        const errMsg = error instanceof Error ? error.message : "Payment verification failed";
        console.error("[PaymentSuccessView] Verification error:", error);
        setErrorMessage(errMsg);
        toast.error(errMsg);
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // Determine user role and active plan display
  const userRole = payment?.userRole || sessionUser?.role || "student";
  const planTitle = payment?.planName || (userRole === "tutor" ? "Pro Tutor Plan" : "Pro Student Plan");
  const amountPaid = payment?.amount ? `$${payment.amount}.00` : userRole === "tutor" ? "$15.00" : "$10.00";
  const currency = payment?.currency?.toUpperCase() || "USD";
  const transactionId = payment?.transactionId || (sessionId ? `${sessionId.slice(0, 16)}...` : "Confirmed");

  const formattedDate = payment?.paidAt
    ? new Date(payment.paidAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  // Verifying State
  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto my-16 rounded-3xl border border-border/80 bg-card p-10 text-center space-y-5 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-foreground">
            Verifying Your Payment
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please wait while we confirm your Stripe checkout session and activate your Pro privileges...
          </p>
        </div>
        <div className="pt-2">
          <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
            Session: {sessionId ? `${sessionId.slice(0, 20)}...` : "Loading"}
          </span>
        </div>
      </div>
    );
  }

  // Verification Error State
  if (errorMessage && !isVerified) {
    return (
      <div className="max-w-lg mx-auto my-14 rounded-3xl border border-rose-500/30 bg-card p-8 sm:p-10 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 border border-rose-500/20">
            Verification Issue
          </span>
          <h2 className="text-2xl font-black text-foreground">
            Unable to Verify Payment
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We couldn&apos;t automatically verify this session with the backend. If your card was charged, your account will be activated shortly.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-left text-xs font-mono text-rose-600 dark:text-rose-400 break-words">
          {errorMessage}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          {sessionId && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Verification</span>
            </button>
          )}
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-xs transition-colors"
          >
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  // Verification Success State
  return (
    <div className="max-w-2xl mx-auto my-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Congratulation Banner */}
      <div className="rounded-3xl border-2 border-emerald-500/40 bg-card p-8 sm:p-10 text-center space-y-5 shadow-xl relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/30 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Payment Confirmed & Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Welcome to MentorLagbe Pro!
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your transaction has been securely processed by Stripe. All Pro privileges and badges are now permanently unlocked.
            </p>
          </div>
        </div>
      </div>

      {/* Official Transaction Receipt Card */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Payment Receipt
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Paid
          </span>
        </div>

        {/* Receipt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Activated Plan
            </span>
            <p className="font-bold text-sm text-foreground">
              {planTitle}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-500" />
              Amount Paid
            </span>
            <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
              {amountPaid} {currency}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              Billing Customer
            </span>
            <p className="font-semibold text-foreground truncate">
              {payment?.userName || sessionUser?.name || "Subscriber"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {payment?.userEmail || sessionUser?.email}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              Payment Date
            </span>
            <p className="font-semibold text-foreground">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Transaction ID & Session Bar */}
        <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 text-[11px] space-y-1.5 font-mono text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <span>Transaction ID:</span>
            <span className="font-semibold text-foreground truncate max-w-[240px]">
              {transactionId}
            </span>
          </div>
          {sessionId && (
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/40">
              <span>Stripe Session:</span>
              <span className="truncate max-w-[240px] text-[10px]">
                {sessionId}
              </span>
            </div>
          )}
        </div>

        {/* Unlocked Benefits Summary */}
        <div className="border-t border-border/60 pt-4 space-y-3">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Your Pro Benefits are Now Live:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/80">
            {userRole === "tutor" ? (
              <>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited Tuition Batch Posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Verified Pro Mentor Shield Badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Featured Search Placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Direct WhatsApp & Phone Leads</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Priority Booking in Tutor Inboxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited Tuition Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Verified Pro Student Profile Badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Direct Mentor Contact Highlighting</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="border-t border-border/60 pt-5 flex flex-col sm:flex-row gap-3">
          <Link
            href={userRole === "tutor" ? "/dashboard/tutor" : "/dashboard/student"}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to My Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <Link
            href={userRole === "tutor" ? "/dashboard/tutor/profile" : "/dashboard/student/profile"}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-xs transition-colors"
          >
            <User className="w-4 h-4" />
            <span>View My Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
