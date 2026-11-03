import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { INFRASTRUCTURE_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: INFRASTRUCTURE_PAGE.metaTitle,
  description: INFRASTRUCTURE_PAGE.metaDescription,
  alternates: { canonical: INFRASTRUCTURE_PAGE.path },
};

export default function InfrastructurePage() {
  return <SolutionPage data={INFRASTRUCTURE_PAGE} />;
}

