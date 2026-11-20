import React from "react";
import { UserProfileForm } from "@/components/dashboard/profile/UserProfileForm";

export const metadata = {
  title: "Student Profile - MentorLagbe",
  description: "View and update your student profile details and avatar on MentorLagbe.",
};

export default function StudentProfilePage() {
  return <UserProfileForm roleTitle="Student" />;
}
