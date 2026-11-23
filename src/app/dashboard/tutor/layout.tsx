export const dynamic = "force-dynamic";

import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function TutorLayout({
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
    console.error("TutorLayout session verification error:", error);
  }

  // Strict Isolation: only redirect if user is confirmed and not a tutor
  if (session?.user && session.user.role !== "tutor") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
