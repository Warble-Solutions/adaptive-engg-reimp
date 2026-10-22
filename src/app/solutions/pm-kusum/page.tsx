import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { PM_KUSUM_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: PM_KUSUM_PAGE.metaTitle,
  description: PM_KUSUM_PAGE.metaDescription,
  alternates: { canonical: PM_KUSUM_PAGE.path },
};

export default function PmKusumPage() {
  return <SolutionPage data={PM_KUSUM_PAGE} />;
}
