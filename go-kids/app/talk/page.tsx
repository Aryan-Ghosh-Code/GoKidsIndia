import { ComingSoonPage } from "@/components/shared/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Talk | Go Kids" };

export default function TalkPage() {
  return (
    <ComingSoonPage
      title="Expert Talks Coming Soon!"
      emoji="🎤"
      description="Expert webinars, panel discussions, and recorded sessions for parents and kids navigating growth and change. We're scheduling our first batch of incredible speakers."
      accentColor="#F5C518"
      lightColor="#FFF9E6"
    />
  );
}
