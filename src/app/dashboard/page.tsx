export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardRootPage() {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("DashboardRootPage getSession error:", error);
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  const role = session.user.role;
  if (role === "tutor") {
    redirect("/dashboard/tutor");
  } else if (role === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/student");
  }
}
