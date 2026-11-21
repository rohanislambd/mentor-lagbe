export const dynamic = "force-dynamic";

import React from "react";
import { getAdminAllUsers } from "@/lib/api/admin";
import { AdminUserManagementTable } from "@/components/dashboard/admin/AdminUserManagementTable";
import { AppUser } from "../../../../../teype/tuitiontype";

export const metadata = {
  title: "User Management - Admin Dashboard | MentorLagbe",
  description: "View all registered users and manage user roles across the platform.",
};

export default async function AdminUserManagementPage() {
  const rawUsers = await getAdminAllUsers();
  const users: AppUser[] = Array.isArray(rawUsers)
    ? rawUsers
    : rawUsers?.data || rawUsers?.result || [];

  return (
    <div className="space-y-6">
      <AdminUserManagementTable initialUsers={users} />
    </div>
  );
}
