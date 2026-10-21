import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { BrochureButton } from "@/components/BrochureModal";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { BROCHURES } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Resources – Brochures & Flyers",
  description: "Download AEPL brochures and flyers: Corporate Brochure, Plant SCADA, Power Plant Controller, EMS for BESS, LT/MV Panels and PM-KUSUM.",
  alternates: { canonical: "/resources/" },
};

export default function ResourcesPage() {
  const docs = Object.values(BROCHURES);
  return (
    <>
      <PageHero
        crumb="Resources"
        title="Brochures & Flyers"
        text="Everything you need to evaluate AEPL solutions – download the latest brochures and flyers."
        image="/hero/scada.webp"
      />

      <section className="section" aria-labelledby="docs-title">
        <div className="container">
          <SectionHead eyebrow="Downloads" id="docs-title" title="Product literature" lead="Share a few details once and download any brochure instantly." />
          <div className={s.docs}>
            {docs.map((d, i) => (
              <article key={d.id} className={`card ${s.doc} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <div className={s.docThumb}>
                  <img src={d.thumb} alt={`${d.title} – cover`} loading="lazy" />
                </div>
                <div className={s.docBody}>
                  <span className="chip" style={{ alignSelf: "flex-start" }}>
                    <Icon name="file" width={14} height={14} /> PDF
                  </span>
                  <h2>{d.title}</h2>
                  <p>{d.desc}</p>
                  <BrochureButton id={d.id} buttonId={`resource-${d.id}`}>
                    Download <Icon name="download" />
                  </BrochureButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
