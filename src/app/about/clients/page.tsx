import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import { Clients, CtaBand, PageHero, SectionHead } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Our Clients – Trusted by 500+ Industry Leaders",
  description:
    "500+ satisfied customers across India's leading IPPs, EPCs, utilities and industries trust Adaptive Engineering Pvt. Ltd. (AEPL).",
  alternates: { canonical: "/about/clients/" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero title="Our Clients" image="/about/mfg-1.webp" />

      <Clients grid />

      <section className="section" aria-labelledby="clients-testimonials-title">
        <div className="container">
          <SectionHead eyebrow="Testimonials" id="clients-testimonials-title" title="What our partners say" />
          <Testimonials />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

