import { ComingSoonPage } from "@/components/shared/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Assessments | Go Kids" };

export default function AssessmentsPage() {
  return (
    <ComingSoonPage
      title="Assessments Launching Soon!"
      emoji="📋"
      description="Discover your child's strengths, learning style, and career aptitude through guided psychometric assessments. Our expert team is crafting personalised assessments for every age group."
      accentColor="#2BBCB0"
      lightColor="#E8F8F7"
    />
  );
}
