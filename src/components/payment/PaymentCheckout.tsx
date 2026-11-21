"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Lock,
  Loader2,
  Check,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { createCheckoutSession } from "@/lib/actions api/payment";

export function PaymentCheckout() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as { name?: string; email?: string; role?: string; plan?: string } | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // User's actual logged in role
  const userRole = user?.role; // 'student' | 'tutor' | 'admin'
  const isUserTutor = userRole === "tutor";

  // Requested plan from query param (if any)
  const requestedPlan = planParam === "tutor" ? "tutor" : planParam === "student" ? "student" : null;

  // Validate cross-role purchase:
  const isRoleMismatch =
    (userRole === "tutor" && requestedPlan === "student") ||
    (userRole === "student" && requestedPlan === "tutor");

  // Determine user role and corresponding plan details
  const isTutor = userRole ? isUserTutor : planParam === "tutor";
  const planName = isTutor ? "Pro Tutor Plan" : "Pro Student Plan";
  const price = isTutor ? 15 : 10;
  const isAlreadyPro = user?.plan === "pro";

  const handleStripeCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed with payment");
      return;
    }

    if (isRoleMismatch) {
      const msg =
        userRole === "tutor"
          ? "As a Tutor, you cannot purchase the Student Plan. Please upgrade to the Pro Tutor Plan ($15)."
          : "As a Student, you cannot purchase the Tutor Plan. Please upgrade to the Pro Student Plan ($10).";
      toast.error(msg);
      setErrorMessage(msg);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      toast.loading("Preparing Stripe secure checkout...", { id: "stripe-loading" });

      const data = await createCheckoutSession(requestedPlan || userRole);

      if (data?.url) {
        toast.success("Redirecting to Stripe...", { id: "stripe-loading" });
        window.location.href = data.url;
      } else {
        throw new Error("Invalid checkout response from server");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to initiate payment";
      toast.error(errMsg, { id: "stripe-loading" });
      setErrorMessage(errMsg);
      setIsLoading(false);
    }
  };

  // Loading Session State
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm">Verifying your account details...</p>
      </div>
    );
  }

  // Not Logged In State
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 rounded-3xl border border-border/80 bg-card p-8 text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-foreground">
            Sign In Required
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You must be logged in as a registered Student or Tutor to upgrade your account and proceed to Stripe checkout.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href={`/login?callbackUrl=/payment${planParam ? `?plan=${planParam}` : ""}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs"
          >
            <span>Log In to Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-xs transition-colors"
          >
            Create an Account
          </Link>
        </div>
      </div>
    );
  }

  // Already a Pro Member State
  if (isAlreadyPro) {
    return (
      <div className="max-w-md mx-auto my-12 rounded-3xl border border-emerald-500/30 bg-card p-8 text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            <span>Active Pro Member</span>
          </div>
          <h2 className="text-xl font-black text-foreground">
            You&apos;re Already a Pro Member!
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your account currently has full Pro access activated with all premium privileges.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href={user.role === "tutor" ? "/dashboard/tutor" : "/dashboard/student"}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
            <CreditCard className="w-3.5 h-3.5 text-amber-500" />
            <span>Stripe Secure Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Review & Complete Upgrade
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review your order summary and complete your one-time upgrade with Stripe.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Plan</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Plan Benefits */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  {isTutor ? (
                    <Briefcase className="w-5 h-5" />
                  ) : (
                    <GraduationCap className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    {planName}
                  </h2>
                  <span className="text-[11px] text-muted-foreground">
                    One-time payment • Lifetime account upgrade
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                ${price}.00 USD
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Included Privileges & Perks:
              </h3>

              <ul className="space-y-3 text-xs text-muted-foreground">
                {isTutor ? (
                  <>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground">
                        <strong>Unlimited Tuition Batch Posts</strong> — Removes the 2-post limitation permanently
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Verified Pro Mentor Shield badge on your profile and posts</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Featured top placement in Subject & Location searches</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Direct phone and WhatsApp contact access to interested student applicants</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground">
                        <strong>Priority Booking & Fast-Track Placement</strong> — Pinned to the top of tutors&apos; applicant lists
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Unlimited simultaneous batch applications without any restrictions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Verified Pro Student Badge shown across all your tuition applications</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Direct contact highlighting and priority mentorship doubt resolution</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Account Details Box */}
          <div className="rounded-2xl border border-border/70 bg-muted/30 p-5 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Account to be Upgraded:
            </h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subscriber Name:</span>
              <span className="font-semibold text-foreground">{user.name || "User"}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Account Email:</span>
              <span className="font-semibold text-foreground">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-semibold capitalize text-foreground">{user.role || "student"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary & Stripe Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border-2 border-amber-500/40 bg-card p-6 sm:p-7 space-y-6 shadow-md sticky top-20">
            <h2 className="text-base font-bold text-foreground border-b border-border/60 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{planName}</span>
                <span className="font-semibold text-foreground">${price}.00</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Platform Processing Fee</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Taxes & VAT</span>
                <span className="font-semibold text-foreground">$0.00</span>
              </div>

              <div className="border-t border-border/60 pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-foreground">Total Due Today</span>
                  <span className="text-[10px] text-muted-foreground block">One-time payment</span>
                </div>
                <span className="text-2xl font-black text-foreground">
                  ${price}.00 <span className="text-xs font-normal text-muted-foreground">USD</span>
                </span>
              </div>
            </div>

            {/* Role Mismatch Alert */}
            {isRoleMismatch && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>Role Mismatch Detected</span>
                </div>
                <p className="leading-relaxed">
                  You are logged in as a <strong className="capitalize">{userRole}</strong>, but this checkout is configured for the <strong>{requestedPlan} plan</strong>. Tutors cannot purchase student plans, and students cannot purchase tutor plans.
                </p>
                <div className="pt-1">
                  <Link
                    href={`/payment?plan=${userRole}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Switch to {userRole === "tutor" ? "Pro Tutor Plan ($15)" : "Pro Student Plan ($10)"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {errorMessage && !isRoleMismatch && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <span>Checkout Failed</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-[10px] underline hover:no-underline font-semibold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="break-words font-mono text-[11px] leading-relaxed bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Pay Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleStripeCheckout}
                disabled={isLoading || isRoleMismatch}
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Stripe...</span>
                  </>
                ) : isRoleMismatch ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Unavailable for {userRole === "tutor" ? "Tutors" : "Students"}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${price}.00 with Stripe</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Powered by Stripe 256-Bit SSL Checkout</span>
              </div>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-border/60 space-y-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Instant automated role & badge activation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Official PDF transaction receipt via Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
