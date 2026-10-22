import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { UrsModuleGrid } from "@/components/SolutionPage";
import { PANELS_PAGE, PM_KUSUM_PAGE, URS_PAGE } from "@/lib/solutions";
import s from "@/components/SolutionPage.module.css";

export const metadata: Metadata = {
  title: "Solutions – URS (SCADA, PPC, AMS, CMS, Analytics, EMS-BESS), PM KUSUM & LT/MV Panels",
  description:
    "AEPL's renewable energy solutions: the Unified Renewable Solution (SCADA, PPC, AMS, CMS, Advanced Analytics, EMS-BESS), PM KUSUM solutions and type-tested LT/MV panels.",
  alternates: { canonical: "/solutions/" },
};

const MAIN = [
  {
    page: URS_PAGE,
    image: "/solutions/urs.webp",
    summary: "SCADA, PPC, AMS, CMS, Advanced Analytics and EMS-BESS on one platform – acquisition, control and reporting from a single inverter to a national fleet.",
  },
  {
    page: PM_KUSUM_PAGE,
    image: "/solutions/pm-kusum.webp",
    summary: "One stop solution from field device to command center – RMS, CMS, AMS, ReportWiz, WMS and LT/MV panels across 2000+ sites.",
  },
  {
    page: PANELS_PAGE,
    image: "/solutions/panels.webp",
    summary: "Type-tested LT (800V · 415V) and MV (33kV · 11kV) panels built in-house – 15000+ panels delivered with native SCADA integration.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero title="Solutions" image="/hero/solar-bess.webp" />

      <section className="section" aria-labelledby="main-solutions-title">
        <div className="container">
          <SectionHead eyebrow="Our Solutions" id="main-solutions-title" title="Renewable energy technology, plant to portfolio" />
          <div className={s.hubGrid}>
            {MAIN.map(({ page, image, summary }, i) => (
              <Link
                key={page.slug}
                href={page.path}
                className={`card ${s.hubCard} reveal`}
                style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
                id={`solution-${page.slug}`}
              >
                <div className={s.hubImg}>
                  <img src={image} alt={page.name} loading={i === 0 ? "eager" : "lazy"} />
                </div>
                <div className={s.hubBody}>
                  <h3>{page.name}</h3>
                  <p>{summary}</p>
                  <span className={s.modMore}>
                    Explore <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="urs-modules-title">
        <div className="container">
          <SectionHead eyebrow="Unified Renewable Solution" id="urs-modules-title" title="Our 6 integrated URS solutions" />
          <UrsModuleGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
