import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post New Tuition - Tutor Dashboard | MentorLagbe",
  description:
    "Create and publish a new tuition listing to connect with students seeking mentorship.",
};

export default function PostTuitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
