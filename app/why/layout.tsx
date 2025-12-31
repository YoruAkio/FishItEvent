import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why",
  description: "Learn why I created Fish It Event - helping players know when events start in their local time.",
};

export default function WhyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
