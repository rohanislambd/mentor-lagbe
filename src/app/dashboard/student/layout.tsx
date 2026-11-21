import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard/student");
  }

  const role = session.user.role;

  // Strict Isolation: Student dashboard is ONLY accessible to students
  if (role !== "student") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
