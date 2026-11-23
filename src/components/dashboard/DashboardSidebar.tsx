"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { getCurrentUserProfile } from "@/lib/actions api/users";
import { DashboardMenu } from "./DashboardMenu";
import { SignOutButton } from "./SignOutButton";

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role as "admin" | "tutor" | "student" | undefined;

  const [currentPlan, setCurrentPlan] = useState<string>(
    (user as { plan?: string })?.plan || "free"
  );

  useEffect(() => {
    if (!user || role === "admin") return;

    let isMounted = true;
    const fetchFreshPlan = async () => {
      try {
        const data = await getCurrentUserProfile();
        if (isMounted && data?.plan) {
          setCurrentPlan(data.plan);
        }
      } catch {
        // Fallback to session plan
      }
    };

    fetchFreshPlan();

    return () => {
      isMounted = false;
    };
  }, [user, role]);

  
  if (isPending || !role) {
    return (
      <Sidebar className="border-r border-sidebar-border bg-sidebar">
        <SidebarHeader className="border-b border-sidebar-border p-3.5 space-y-3">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2.5 px-1 pb-3 border-b border-sidebar-border">
            <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-2 w-14 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* User Detail Box Skeleton */}
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
            <div className="h-7 w-7 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
              <div className="h-2 w-28 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-4 w-12 bg-muted animate-pulse rounded-full shrink-0" />
          </div>
        </SidebarHeader>

        {/* Menu Items Skeleton */}
        <SidebarContent className="py-4 px-3 space-y-2">
          <div className="h-3 w-16 bg-muted animate-pulse rounded mb-3" />
          <div className="h-8 w-full bg-muted/60 animate-pulse rounded-lg" />
          <div className="h-8 w-full bg-muted/60 animate-pulse rounded-lg" />
          <div className="h-8 w-full bg-muted/60 animate-pulse rounded-lg" />
        </SidebarContent>
      </Sidebar>
    );
  }

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const firstLetter = userName.charAt(0).toUpperCase();
  const isPro = currentPlan.toLowerCase() === "pro";

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      {/* Brand & User Header */}
      <SidebarHeader className="border-b border-sidebar-border p-3.5 space-y-3">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group px-1 pb-3 border-b border-sidebar-border"
        >
          <div className="h-8 w-8 rounded-lg bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center p-1 shadow-2xs">
            <Image
              src="/logo.png"
              alt="MentorLagbe Logo"
              width={28}
              height={28}
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-sidebar-foreground leading-none">
              Mentor<span className="text-amber-500">Lagbe</span>
            </span>
            <span className="text-[8px] font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
              Dashboard
            </span>
          </div>
        </Link>

        {/* User Detail Box */}
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
          <div className="h-7 w-7 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/20">
            {firstLetter}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-sidebar-foreground truncate">
                {userName}
              </span>
              {isPro && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-2xs shrink-0 leading-none">
                  <Sparkles className="w-2.5 h-2.5" /> PRO
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground truncate">
              {userEmail}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize border border-sidebar-border bg-sidebar-background text-sidebar-foreground shrink-0">
            {role}
          </span>
        </div>
      </SidebarHeader>

      {/* Role Navigation Menu */}
      <SidebarContent className="py-2">
        <DashboardMenu role={role} />
      </SidebarContent>

      {/* Footer Navigation: Sign Out */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOutButton variant="sidebar" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
