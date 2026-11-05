import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { LT_MV_PANELS_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: LT_MV_PANELS_PAGE.metaTitle,
  description: LT_MV_PANELS_PAGE.metaDescription,
  alternates: { canonical: LT_MV_PANELS_PAGE.path },
};

export default function PanelsPage() {
  return <SolutionPage data={LT_MV_PANELS_PAGE} group="panels" moduleSlug={LT_MV_PANELS_PAGE.slug} />;
}
