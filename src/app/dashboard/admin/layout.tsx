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
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    redirect("/sign-in?callbackUrl=/dashboard/admin");
  }

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
