import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { DashboardMenu } from "./DashboardMenu";
import { SignOutButton } from "./SignOutButton";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user?.role as "admin" | "tutor" | "student") || "student";
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const firstLetter = userName.charAt(0).toUpperCase();

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
            <span className="text-xs font-semibold text-sidebar-foreground truncate">
              {userName}
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              {userEmail}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize border border-sidebar-border bg-sidebar-background text-sidebar-foreground shrink-0">
            {role}
          </span>
        </div>
      </SidebarHeader>

      {/* Role Navigation Menu with Active Pathname */}
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
