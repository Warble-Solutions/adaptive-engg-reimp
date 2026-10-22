import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { URS_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: URS_PAGE.metaTitle,
  description: URS_PAGE.metaDescription,
  alternates: { canonical: URS_PAGE.path },
};

export default function UrsPage() {
  return <SolutionPage data={URS_PAGE} />;
}
