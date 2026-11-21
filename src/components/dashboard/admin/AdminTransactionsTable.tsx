"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  Search,
  DollarSign,
  Calendar,
  Sparkles,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { PaymentTransaction } from "@/lib/api/payment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface AdminTransactionsTableProps {
  initialTransactions: PaymentTransaction[];
}

export function AdminTransactionsTable({
  initialTransactions,
}: AdminTransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "student" | "tutor">("all");

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalCount = initialTransactions.length;
    const totalAmount = initialTransactions.reduce(
      (sum, t) => sum + (Number(t.amount) || 0),
      0
    );
    const studentCount = initialTransactions.filter(
      (t) => (t.userRole?.toLowerCase() === "student" || t.planName?.toLowerCase().includes("student"))
    ).length;
    const tutorCount = initialTransactions.filter(
      (t) => (t.userRole?.toLowerCase() === "tutor" || t.planName?.toLowerCase().includes("tutor"))
    ).length;

    return { totalCount, totalAmount, studentCount, tutorCount };
  }, [initialTransactions]);

  // Filtered List
  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter((item) => {
      const term = searchTerm.toLowerCase().trim();
      const roleMatch =
        roleFilter === "all" ||
        item.userRole?.toLowerCase() === roleFilter ||
        item.planName?.toLowerCase().includes(roleFilter);

      const searchMatch =
        !term ||
        item.userName?.toLowerCase().includes(term) ||
        item.userEmail?.toLowerCase().includes(term) ||
        item.transactionId?.toLowerCase().includes(term) ||
        item.stripeSessionId?.toLowerCase().includes(term) ||
        item.planName?.toLowerCase().includes(term);

      return roleMatch && searchMatch;
    });
  }, [initialTransactions, searchTerm, roleFilter]);

  // Format Date
  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "N/A";
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return "N/A";
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Cards */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-500" />
            <span>Stripe Subscription Transactions</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Complete record of all Student and Tutor Pro plan subscription payments.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Total Revenue
            </span>
            <p className="text-2xl font-black text-foreground">
              ${metrics.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-500" /> Total Payments
            </span>
            <p className="text-2xl font-black text-foreground">
              {metrics.totalCount}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Pro Students
            </span>
            <p className="text-2xl font-black text-foreground">
              {metrics.studentCount}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-500" /> Pro Tutors
            </span>
            <p className="text-2xl font-black text-foreground">
              {metrics.tutorCount}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by user name, email, transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-xs rounded-xl"
          />
        </div>

        {/* Role Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border self-start sm:self-auto">
          {(["all", "student", "tutor"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRoleFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                roleFilter === tab
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "all" ? "All Payments" : `${tab} Plans`}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-bold text-foreground">User Name</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Email</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Role</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Plan Name</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Amount</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Transaction ID</TableHead>
              <TableHead className="text-xs font-bold text-foreground">Payment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CreditCard className="w-8 h-8 text-muted-foreground/40" />
                    <p className="text-sm font-semibold">No payment records found</p>
                    <p className="text-xs text-muted-foreground/70">
                      Transactions will automatically appear here once users complete Stripe checkout.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx, idx) => {
                const isTutor =
                  tx.userRole?.toLowerCase() === "tutor" ||
                  tx.planName?.toLowerCase().includes("tutor");
                const roleBadgeClass = isTutor
                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20"
                  : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20";

                const txId = tx.transactionId || tx.stripeSessionId || tx._id || "N/A";

                return (
                  <TableRow key={tx._id || idx} className="text-xs hover:bg-muted/30">
                    {/* User Name */}
                    <TableCell className="font-semibold text-foreground py-3.5">
                      {tx.userName || "Verified User"}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-muted-foreground">
                      {tx.userEmail}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${roleBadgeClass}`}
                      >
                        {isTutor ? "Tutor" : "Student"}
                      </span>
                    </TableCell>

                    {/* Plan Name */}
                    <TableCell>
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                        {tx.planName || (isTutor ? "Pro Tutor Plan" : "Pro Student Plan")}
                      </span>
                    </TableCell>

                    {/* Amount */}
                    <TableCell>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        ${Number(tx.amount || 0).toFixed(2)}{" "}
                        <span className="text-[10px] font-medium uppercase text-muted-foreground">
                          {tx.currency || "USD"}
                        </span>
                      </span>
                    </TableCell>

                    {/* Transaction ID */}
                    <TableCell>
                      <span
                        className="font-mono text-[11px] bg-muted/60 px-2 py-1 rounded-md border border-border text-foreground/80 select-all"
                        title={txId}
                      >
                        {txId.length > 20 ? `${txId.slice(0, 10)}...${txId.slice(-8)}` : txId}
                      </span>
                    </TableCell>

                    {/* Payment Date */}
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                        <span>{formatDate(tx.paidAt || tx.createdAt)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
