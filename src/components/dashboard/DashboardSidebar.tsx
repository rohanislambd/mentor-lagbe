import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

const menuItemsByRole = {
  admin: [
    { name: "Dashboard", url: "/dashboard", icon: "dashboard" },

    { name: "Users", url: "/dashboard/users", icon: "users" },
    { name: "Settings", url: "/dashboard/settings", icon: "settings" },
  ],   
  tutor: [
    { name: "Dashboard", url: "/dashboard", icon: "dashboard" },
    { name: "My Courses", url: "/dashboard/courses", icon: "courses" }, 
    { name: "Settings", url: "/dashboard/settings", icon: "settings" },
  ],
  student: [
    { name: "Dashboard", url: "/dashboard", icon: "dashboard" },
    { name: "My Courses", url: "/dashboard/courses", icon: "courses" },
    { name: "Settings", url: "/dashboard/settings", icon: "settings" },
  ],
};

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers() 
})

const role = session?.user?.role || "student";


  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<a href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))} 
            
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
