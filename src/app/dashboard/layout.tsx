export const dynamic = "force-dynamic";


import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 min-w-0 min-h-screen bg-background text-foreground">
        {/* Dashboard Topbar with Sidebar Toggle & Theme Switcher */}
        <header className="h-14 border-b border-sidebar-border bg-background/95 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:inline">
              MentorLagbe Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <ThemeToggle />
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <SignOutButton variant="header" />
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-background text-foreground">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
