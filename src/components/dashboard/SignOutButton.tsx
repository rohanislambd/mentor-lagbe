"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
  variant?: "sidebar" | "header";
}

export function SignOutButton({
  className,
  variant = "sidebar",
}: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "header") {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        title="Sign Out"
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors disabled:opacity-50 cursor-pointer",
          className
        )}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <LogOut className="w-3.5 h-3.5" />
        )}
        <span className="hidden sm:inline">Sign Out</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors disabled:opacity-50 text-left",
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <LogOut className="w-4 h-4 shrink-0" />
      )}
      <span>Sign Out</span>
    </button>
  );
}
