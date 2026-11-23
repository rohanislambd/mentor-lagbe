export const dynamic = "force-dynamic";

import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("AdminLayout session verification error:", error);
  }

  // Cross-role protection: only redirect if user is confirmed and not an admin
  if (session?.user && session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
