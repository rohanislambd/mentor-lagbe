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
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    redirect("/sign-in?callbackUrl=/dashboard/tutor");
  }

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard/tutor");
  }

  const role = session.user.role;

  // Strict Isolation: Tutor dashboard is ONLY accessible to tutors
  if (role !== "tutor") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
