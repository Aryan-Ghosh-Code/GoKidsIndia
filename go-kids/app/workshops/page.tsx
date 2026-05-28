import { ComingSoonPage } from "@/components/shared/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Workshops | Go Kids" };

export default function WorkshopsPage() {
  return (
    <ComingSoonPage
      title="Workshops Are Coming!"
      emoji="📚"
      description="Skill-building sessions on communication, leadership, creativity, and future-ready careers — live and self-paced. We're putting the finishing touches on 50+ workshops for ages 4–16."
      accentColor="#F4845F"
      lightColor="#FEF0EB"
    />
  );
}
