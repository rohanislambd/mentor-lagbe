import React from "react";
import { UserProfileForm } from "@/components/dashboard/profile/UserProfileForm";

export const metadata = {
  title: "Tutor Profile - MentorLagbe",
  description: "View and update your tutor profile details and avatar on MentorLagbe.",
};

export default function TutorProfilePage() {
  return <UserProfileForm roleTitle="Tutor" />;
}
