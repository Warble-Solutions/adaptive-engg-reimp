import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { BrochureGroups } from "@/components/Docs";

export const metadata: Metadata = {
  title: "Brochures – SCADA, PPC, CMS, EMS-BESS, PM KUSUM, Panels, Water & IoT",
  description:
    "Download AEPL brochures and flyers: corporate brochure, Plant SCADA, Power Plant Controller, CMS, AMS, EMS-BESS, PM KUSUM, LT/MV panels, water and Industrial IoT solutions.",
  alternates: { canonical: "/resources/brochures/" },
};

export default function BrochuresPage() {
  return (
    <>
      <PageHero title="Brochures" image="/hero/scada.webp" />
      <section className="section" aria-labelledby="brochures-title">
        <div className="container">
          <SectionHead eyebrow="Downloads" id="brochures-title" title="Brochures & flyers" lead="Share a few details once and download any brochure instantly." />
          <BrochureGroups />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

