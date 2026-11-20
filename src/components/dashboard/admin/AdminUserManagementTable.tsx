"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Shield,
  GraduationCap,
  Sparkles,
  Loader2,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";
import { AppUser, UserRole } from "../../../../teype/tuitiontype";
import { updateUserRole } from "@/lib/actions api/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface AdminUserManagementTableProps {
  initialUsers: AppUser[];
}

export function AdminUserManagementTable({
  initialUsers,
}: AdminUserManagementTableProps) {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [activeTab, setActiveTab] = useState<"all" | UserRole>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Stats Counts
  const counts = useMemo(() => {
    return {
      all: users.length,
      student: users.filter((u) => u.role === "student").length,
      tutor: users.filter((u) => u.role === "tutor").length,
      admin: users.filter((u) => u.role === "admin").length,
    };
  }, [users]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab = activeTab === "all" || user.role === activeTab;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term);

      return matchesTab && matchesSearch;
    });
  }, [users, activeTab, searchTerm]);

  // Update Role Handler
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      setUpdatingId(userId);
      await updateUserRole(userId, newRole);

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );

      toast.success(`Role updated to ${newRole.toUpperCase()} successfully`);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to update role";
      toast.error(errMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  // Format Date Helper
  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "Recently";
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "Recently";
      return d.toISOString().split("T")[0];
    } catch {
      return "Recently";
    }
  };

  // Role Badge Renderer
  const renderRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Shield className="w-3.5 h-3.5" />
            Admin
          </span>
        );
      case "tutor":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Tutor
          </span>
        );
      case "student":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            Student
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Container Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              User Management ({counts.all})
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              View all registered users and manage their access roles across the platform.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
              {counts.student} Students
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
              {counts.tutor} Tutors
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20">
              {counts.admin} Admins
            </span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60 w-fit">
            {(
              [
                { id: "all", label: `All (${counts.all})` },
                { id: "student", label: `Students (${counts.student})` },
                { id: "tutor", label: `Tutors (${counts.tutor})` },
                { id: "admin", label: `Admins (${counts.admin})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              No users found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {searchTerm || activeTab !== "all"
                ? "No users match your search criteria."
                : "No registered users found in the system."}
            </p>
          </div>
        ) : (
          /* Users Table */
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    User Info
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Current Role
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Plan
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5">
                    Joined Date
                  </TableHead>
                  <TableHead className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase py-3.5 text-right">
                    Change Role
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user, index) => {
                  const initial = user.name
                    ? user.name.trim().charAt(0).toUpperCase()
                    : "U";
                  const isUpdating = updatingId === user._id;

                  // Avatar linear background based on role
                  const avatarBg =
                    user.role === "admin"
                      ? "from-purple-500 to-indigo-600"
                      : user.role === "tutor"
                      ? "from-amber-400 to-amber-600"
                      : "from-blue-500 to-indigo-600";

                  return (
                    <TableRow
                      key={user._id || `user-${index}`}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* User Info */}
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            {initial}
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs sm:text-sm font-bold text-foreground">
                              {user.name || "Anonymous User"}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                {user.email}
                              </span>
                              {user.phone && (
                                <span className="flex items-center gap-1 font-medium text-foreground/80">
                                  <Phone className="w-3 h-3 text-amber-500" />
                                  {user.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Current Role */}
                      <TableCell className="py-4">
                        {renderRoleBadge(user.role)}
                      </TableCell>

                      {/* Subscription Plan */}
                      <TableCell className="py-4">
                        {user.plan === "pro" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Pro
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Free</span>
                        )}
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="py-4 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          {formatDate(user.createdAt)}
                        </span>
                      </TableCell>

                      {/* Role Management Select */}
                      <TableCell className="py-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          {isUpdating && (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                          )}
                          <select
                            value={user.role}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value as UserRole)
                            }
                            className="h-8 px-2.5 py-1 text-xs font-semibold bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
