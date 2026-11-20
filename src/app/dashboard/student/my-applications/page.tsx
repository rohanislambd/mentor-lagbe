import React from "react";
import { getStudentApplications } from "@/lib/api/applicatons";
import { StudentApplicationsTable } from "@/components/dashboard/student/StudentApplicationsTable";

export const metadata = {
  title: "My Applications - MentorLagbe",
  description: "View and manage all your applied tuition requests and admission status.",
};

export default async function StudentMyApplicationsPage() {
  const applications = await getStudentApplications();

  return (
    <div className="space-y-6">
      <StudentApplicationsTable initialApplications={applications} />
    </div>
  );
}
