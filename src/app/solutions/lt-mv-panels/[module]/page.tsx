import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/SolutionPage";
import { PANEL_MODULE_PAGES } from "@/lib/solutions";

// Static export: only the panel types listed in solutions.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return PANEL_MODULE_PAGES.map((p) => ({ module: p.slug }));
}

type Props = { params: Promise<{ module: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const page = PANEL_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
  };
}

export default async function PanelTypePage({ params }: Props) {
  const { module: slug } = await params;
  const page = PANEL_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SolutionPage data={page} group="panels" moduleSlug={page.slug} />;
}

