import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { WATER_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: WATER_PAGE.metaTitle,
  description: WATER_PAGE.metaDescription,
  alternates: { canonical: WATER_PAGE.path },
};

export default function WaterPage() {
  return <SolutionPage data={WATER_PAGE} />;
}

