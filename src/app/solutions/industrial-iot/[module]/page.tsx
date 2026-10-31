import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/SolutionPage";
import { IOT_MODULE_PAGES } from "@/lib/solutions";

// Static export: only the IoT platforms listed in solutions.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return IOT_MODULE_PAGES.map((p) => ({ module: p.slug }));
}

type Props = { params: Promise<{ module: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const page = IOT_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
  };
}

export default async function IotModulePage({ params }: Props) {
  const { module: slug } = await params;
  const page = IOT_MODULE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SolutionPage data={page} group="iot" moduleSlug={page.slug} />;
}

