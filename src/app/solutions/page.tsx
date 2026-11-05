import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { INFRASTRUCTURE_PAGE, IOT_PAGE, PANELS_PAGE, PM_KUSUM_PAGE, URS_PAGE, WATER_PAGE } from "@/lib/solutions";
import s from "@/components/SolutionPage.module.css";

export const metadata: Metadata = {
  title: "Solutions – URS, PM KUSUM, Electrical Panels, Water, Industrial IoT & Infrastructure",
  description:
    "AEPL's end-to-end solutions: Unified Renewable Solution (SCADA, PPC, CMS, Advance Analytics, AMS/CMMS, EMS-BESS), PM KUSUM, Electrical Panels, Water Solutions, Industrial IoT and Infrastructure Solutions.",
  alternates: { canonical: "/solutions/" },
};

const MAIN = [
  {
    page: URS_PAGE,
    image: "/solutions/urs.webp",
    summary: "SCADA, PPC, CMS, Advance Analytics, AMS/CMMS and EMS-BESS on one platform – acquisition, control and reporting from a single inverter to a national fleet.",
  },
  {
    page: PM_KUSUM_PAGE,
    image: "/solutions/pm-kusum.webp",
    summary: "One stop solution from field device to command center – RMS, CMS, AMS, ReportWiz, WMS and LT/MV panels across 2000+ sites.",
  },
  {
    page: PANELS_PAGE,
    image: "/solutions/panels.webp",
    summary: "Type-tested LT/MV renewable panels, HT VCB switchgear, PCC, MCC, IMCC, APFC, VFD, PLC and automation panels built in-house – 15000+ panels delivered.",
  },
  {
    page: WATER_PAGE,
    image: "/solutions/water/wtp.webp",
    summary: "End-to-end E&I and SCADA for water supply schemes & WTP, STP, ETP, lift and micro irrigation, with centralised SCADA – 400+ MLD treated water across 50+ schemes.",
  },
  {
    page: IOT_PAGE,
    image: "/solutions/iot/solar-noc.webp",
    summary: "SolarWiz, WaterWiz, MachineWiz and Mobile Asset Management – edge-to-cloud telemetry, central monitoring and machine learning for every industry.",
  },
  {
    page: INFRASTRUCTURE_PAGE,
    image: "/solutions/infrastructure/tunnel-modern.webp",
    summary: "Turnkey E&I, power distribution and SCADA for road, railway & metro tunnels, Tier III/IV data centers and industrial automation.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero title="Solutions" image="/hero/solutions-hero.webp" />

      <section className="section" aria-labelledby="main-solutions-title">
        <div className="container">
          <SectionHead eyebrow="Our Solutions" id="main-solutions-title" title="Renewable energy technology, plant to portfolio" />
          <div className={s.hubGrid}>
            {MAIN.map(({ page, image, summary }, i) => (
              <Link
                key={page.slug}
                href={page.path}
                className={`card ${s.hubCard} reveal`}
                style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}
                id={`solution-${page.slug}`}
              >
                <div className={s.hubImg}>
                  <img src={image} alt={page.name} loading={i < 3 ? "eager" : "lazy"} />
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

      <CtaBand />
    </>
  );
}
