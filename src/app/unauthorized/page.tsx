import React from "react";
import Link from "next/link";
import { ShieldAlert, LayoutDashboard, Home } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "403 - Unauthorized Access | MentorLagbe",
  description: "You do not have permission to view this dashboard or resource.",
};

export default async function UnauthorizedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role;
  const userDashboard =
    role === "tutor"
      ? "/dashboard/tutor"
      : role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/student";

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16 bg-muted/20">
      <div className="w-full max-w-lg text-center space-y-6 bg-card border border-border/80 rounded-3xl p-8 sm:p-10 shadow-xl">
        {/* Warning Badge Icon */}
        <div className="w-18 h-18 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-9 h-9" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            403 - Access Forbidden
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight pt-2">
            Unauthorized Role Access
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            You do not have permission to view or manage this dashboard portal.
            {role ? (
              <>
                {" "}
                Your current account is registered as a{" "}
                <span className="font-bold text-foreground capitalize">
                  {role}
                </span>
                .
              </>
            ) : (
              " Please log in with an authorized account."
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          {session?.user ? (
            <Link
              href={userDashboard}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to My Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Log In to Your Account</span>
            </Link>
          )}

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Security Notice */}
        <p className="text-[11px] text-muted-foreground/70 border-t border-border/60 pt-4">
          All cross-role access attempts are monitored and safeguarded by
          MentorLagbe Role-Based Access Control (RBAC).
        </p>
      </div>
    </div>
  );
}
