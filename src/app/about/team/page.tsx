import type { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Our Team – Leadership & Engineering Experts",
  description:
    "Meet the leadership and engineering team behind Adaptive Engineering Pvt. Ltd. (AEPL) – 450+ engineers, technicians and specialists powering India's clean energy transition.",
  alternates: { canonical: "/about/team/" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero title="Our Team" image="/hero/about-team.webp" />

      <section className="section section-soft" id="team" aria-labelledby="team-title">
        <div className="container">
          <SectionHead
            eyebrow="Our team"
            id="team-title"
            title="The people behind AEPL"
            lead="450+ engineers, technicians and specialists – one trusted team from engineering to handover."
          />
          <TeamGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

