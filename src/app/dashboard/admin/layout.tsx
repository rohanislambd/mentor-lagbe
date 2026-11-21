import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard/admin");
  }

  const role = session.user.role;

  // Cross-role protection: Admin dashboard is ONLY accessible to admin
  if (role !== "admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
