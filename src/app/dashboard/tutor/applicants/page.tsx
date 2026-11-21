export const dynamic = "force-dynamic";

import React from "react";
import { getTutorApplicants } from "@/lib/api/applicatons";
import { TutorApplicantsTable } from "@/components/dashboard/tutor/TutorApplicantsTable";

export const metadata = {
  title: "Manage Applicants - MentorLagbe",
  description: "Review and respond to all student admission applications for your tuition listings.",
};

export default async function ManageApplicantsPage() {
  const applicants = await getTutorApplicants();

  return (
    <div className="space-y-6">
      <TutorApplicantsTable initialApplicants={applicants} />
    </div>
  );
}
