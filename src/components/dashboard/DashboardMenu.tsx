"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  UserCheck,
  PlusCircle,
  BookOpen,
  Users,
  CheckSquare,
  CreditCard,
  UserCircle,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItemsByRole = {
  admin: [
    { name: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "User Management", url: "/dashboard/admin/users", icon: Users },
    { name: "Tuition Approvals", url: "/dashboard/admin/tuitions", icon: CheckSquare },
    { name: "Transactions", url: "/dashboard/admin/transactions", icon: CreditCard },
    { name: "Update Profile", url: "/dashboard/admin/profile", icon: UserCircle },
  ],
  tutor: [
    { name: "Overview", url: "/dashboard/tutor", icon: LayoutDashboard },
    { name: "Post a Tuition", url: "/dashboard/tutor/post-tuition", icon: PlusCircle },
    { name: "My Tuitions", url: "/dashboard/tutor/my-tuitions", icon: BookOpen },
    { name: "Manage Applicants", url: "/dashboard/tutor/applicants", icon: UserCheck },
    { name: "Update Profile", url: "/dashboard/tutor/profile", icon: UserCircle },
  ],
  student: [
    { name: "Overview", url: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Applications", url: "/dashboard/student/my-applications", icon: FileText },
    { name: "Update Profile", url: "/dashboard/student/profile", icon: UserCircle },
  ],
};

interface DashboardMenuProps {
  role: "admin" | "tutor" | "student";
}

export function DashboardMenu({ role }: DashboardMenuProps) {
  const pathname = usePathname();
  const menuItems = menuItemsByRole[role] || menuItemsByRole.student;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="capitalize font-semibold text-xs tracking-wider text-muted-foreground px-3 mb-1">
        {role} Menu
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isRootRoleRoute =
              item.url === "/dashboard/tutor" ||
              item.url === "/dashboard/student" ||
              item.url === "/dashboard/admin";

            const isActive = isRootRoleRoute
              ? pathname === item.url
              : pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={isActive}
                  render={<Link href={item.url} />}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors font-medium",
                    isActive
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
