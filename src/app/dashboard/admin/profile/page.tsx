export const dynamic = "force-dynamic";

import React from "react";
import { UserProfileForm } from "@/components/dashboard/profile/UserProfileForm";

export const metadata = {
  title: "Admin Profile - MentorLagbe",
  description: "View and update your administrator profile details and avatar on MentorLagbe.",
};

export default function AdminProfilePage() {
  return <UserProfileForm roleTitle="Admin" />;
}
