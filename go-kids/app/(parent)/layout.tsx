import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Go Kids",
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {children}
    </div>
  );
}
