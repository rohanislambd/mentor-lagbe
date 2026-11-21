import React from "react";
import { getAllPayments, PaymentTransaction } from "@/lib/api/payment";
import { AdminTransactionsTable } from "@/components/dashboard/admin/AdminTransactionsTable";

export const metadata = {
  title: "Subscription Payments - Admin Dashboard | MentorLagbe",
  description: "View and monitor all Stripe subscription payment records and transactions.",
};

export default async function TransactionsHistoryPage() {
  const rawPayments = await getAllPayments();
  const transactions: PaymentTransaction[] = Array.isArray(rawPayments)
    ? rawPayments
    : (rawPayments as unknown as { data?: PaymentTransaction[] })?.data || [];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <AdminTransactionsTable initialTransactions={transactions} />
    </div>
  );
}
