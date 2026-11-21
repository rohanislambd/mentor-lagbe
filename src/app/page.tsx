export const dynamic = "force-dynamic";

import Hero from "@/components/home/Hero";
import TopSubjects from "@/components/home/TopSubjects";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import PricingSection from "@/components/home/PricingSection";
import Testimonials from "@/components/home/Testimonials";
import { getBrowseTuitions } from "@/lib/api/tuitons.";
import { getHomeTotalUsers } from "@/lib/api/home";
import { Tuition } from "../../teype/tuitiontype";

export const metadata = {
  title: "MentorLagbe - Find Your Ideal Tutor or Mentorship Batch",
  description:
    "Connect with verified subject specialist tutors and mentors across Bangladesh for 1-on-1 personalized tuitions and structured batches.",
};

export default async function Home() {
  // Fetch real verified tuitions & total user stats concurrently
  const [tuitionsData, userStats] = await Promise.all([
    getBrowseTuitions("limit=6"),
    getHomeTotalUsers(),
  ]);

  const tuitions: Tuition[] = Array.isArray(tuitionsData)
    ? tuitionsData
    : Array.isArray(tuitionsData?.result)
      ? tuitionsData.result
      : Array.isArray(tuitionsData?.data)
        ? tuitionsData.data
        : [];

  const total =
    Number(tuitionsData?.total) ||
    (Array.isArray(tuitionsData) ? tuitionsData.length : tuitions.length);

  return (
    <div className="min-h-screen">
      <Hero
        initialTuitions={tuitions}
        totalCount={total}
        totalTutors={userStats?.totalTutors}
        totalStudents={userStats?.totalStudents}
      />
      <FeaturedTuitions tuitions={tuitions} />
        <TopSubjects
        totalTutors={userStats?.totalTutors}
        totalStudents={userStats?.totalStudents}
        totalTuitions={total}
      />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
    
    </div>
  );
}
