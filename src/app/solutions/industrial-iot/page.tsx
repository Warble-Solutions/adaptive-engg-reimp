import type { Metadata } from "next";
import SolutionPage from "@/components/SolutionPage";
import { IOT_PAGE } from "@/lib/solutions";

export const metadata: Metadata = {
  title: IOT_PAGE.metaTitle,
  description: IOT_PAGE.metaDescription,
  alternates: { canonical: IOT_PAGE.path },
};

export default function IndustrialIotPage() {
  return <SolutionPage data={IOT_PAGE} />;
}

