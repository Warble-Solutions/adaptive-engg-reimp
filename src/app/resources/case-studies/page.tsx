import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { CaseStudyGrid } from "@/components/Docs";

export const metadata: Metadata = {
  title: "Case Studies – Renewable, PM KUSUM, Water & Infrastructure Projects",
  description:
    "AEPL case studies: Khavda 1300MW hybrid plant, TATA Master PPC, 70MW floating solar, IoT SCADA for PM KUSUM, water supply schemes, WTP, EMS and tunnel automation.",
  alternates: { canonical: "/resources/case-studies/" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero title="Case Studies" image="/hero/solar-wind.webp" />
      <section className="section" aria-labelledby="case-studies-title">
        <div className="container">
          <SectionHead eyebrow="Proven results" id="case-studies-title" title="Case studies" lead="How AEPL delivers for India's leading developers, utilities and industries." />
          <CaseStudyGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

