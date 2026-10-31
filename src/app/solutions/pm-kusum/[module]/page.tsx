import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/SolutionPage";
import { KUSUM_MODULE_PAGES } from "@/lib/solutions";

// Static export: only the PM KUSUM sub-pages listed in solutions.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return KUSUM_MODULE_PAGES.map((p) => ({ module: p.slug }));
}

type Props = { params: Promise<{ module: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const page = KUSUM_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
  };
}

export default async function KusumModulePage({ params }: Props) {
  const { module: slug } = await params;
  const page = KUSUM_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SolutionPage data={page} group="kusum" moduleSlug={page.slug} />;
}

