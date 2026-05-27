import { ComingSoonPage } from "@/components/shared/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentors | Go Kids" };

export default function MentorsPage() {
  return (
    <ComingSoonPage
      title="Meet Your Mentor Soon!"
      emoji="👥"
      description="One-on-one sessions with expert educators, psychologists, and career coaches matched to your child's unique needs. Our mentor network is being carefully curated — coming very soon."
      accentColor="#4FC3F7"
      lightColor="#E8F6FE"
    />
  );
}
