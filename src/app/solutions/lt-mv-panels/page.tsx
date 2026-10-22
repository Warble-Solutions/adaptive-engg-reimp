import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { PANELS_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: PANELS_PAGE.metaTitle,
  description: PANELS_PAGE.metaDescription,
  alternates: { canonical: PANELS_PAGE.path },
};

export default function PanelsPage() {
  return <SolutionPage data={PANELS_PAGE} />;
}
