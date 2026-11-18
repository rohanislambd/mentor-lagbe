import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

const menuItemsByRole = {
  admin: [
    { name: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "User Management", url: "/dashboard/admin/users", icon: Users },
    { name: "Tuition Approvals", url: "/dashboard/admin/tuitions", icon: CheckSquare },
    { name: "Transactions", url: "/dashboard/admin/transactions", icon: CreditCard },
    { name: "Update Profile", url: "/dashboard/profile", icon: UserCircle },
  ],
  tutor: [
    { name: "Overview", url: "/dashboard/tutor", icon: LayoutDashboard },
    { name: "Post a Tuition", url: "/dashboard/tutor/post-tuition", icon: PlusCircle },
    { name: "My Tuitions", url: "/dashboard/tutor/my-tuitions", icon: BookOpen },
    { name: "Manage Applicants", url: "/dashboard/tutor/applicants", icon: UserCheck },
    { name: "Update Profile", url: "/dashboard/profile", icon: UserCircle },
  ],
  student: [
    { name: "Overview", url: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Applications", url: "/dashboard/student/my-applications", icon: FileText },
    { name: "Update Profile", url: "/dashboard/profile", icon: UserCircle },
  ],
};

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user?.role as "admin" | "tutor" | "student") || "student";
  const menuItems = menuItemsByRole[role] || menuItemsByRole.student;

  return (
    <Sidebar>
      {/* Brand Header */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center p-1 shadow-2xs">
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
      </SidebarHeader>

      {/* Role Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="capitalize font-semibold text-xs tracking-wider text-muted-foreground">
            {role} Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton render={<Link href={item.url} />}>
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer Summary */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-sidebar-accent/50">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-sidebar-foreground truncate">
              {session?.user?.name || "User"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              {session?.user?.email || ""}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize border border-sidebar-border bg-sidebar-background text-sidebar-foreground shrink-0">
            {role}
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
