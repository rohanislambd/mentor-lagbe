import React from "react";
import { getAdminAllTuitions } from "@/lib/api/admin";
import { Tuition } from "../../../../../teype/tuitiontype";
import { AdminTuitionModerationTable } from "@/components/dashboard/admin/AdminTuitionModerationTable";

export const metadata = {
  title: "Tuition Moderation - Admin Dashboard | MentorLagbe",
  description: "Review, approve, or reject tuition listings submitted by tutors.",
};

const TuitionsApprovalsPage = async () => {
  const result = await getAdminAllTuitions();

  const tuitions: Tuition[] = Array.isArray(result)
    ? result
    : result?.data && Array.isArray(result.data)
      ? result.data
      : [];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <AdminTuitionModerationTable initialTuitions={tuitions} />
    </div>
  );
};

export default TuitionsApprovalsPage;
