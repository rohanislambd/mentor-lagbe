import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Tuitions - Tutor Dashboard | MentorLagbe",
  description:
    "Manage your tuition listings, update status, edit subjects, and monitor student applications.",
};

export default function MyTuitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
