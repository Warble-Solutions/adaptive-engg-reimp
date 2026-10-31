import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { BROCHURE_DOCS, CASE_STUDY_DOCS, DocCard } from "@/components/Docs";
import { BLOGS } from "@/lib/blogs";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Resources – Brochures, Case Studies & Blogs",
  description:
    "AEPL resources: download brochures and case studies – SCADA, PPC, CMS, AMS, EMS-BESS, PM KUSUM, LT/MV panels, water and IoT – and read the latest AEPL blogs.",
  alternates: { canonical: "/resources/" },
};

// Overview page – linked from the footer. The header links straight to the three sub-pages.
export default function ResourcesPage() {
  const featuredBrochures = ["corporate", "scada", "ppc"].map((id) => BROCHURE_DOCS.find((d) => d.id === id)!).filter(Boolean);
  const featuredCases = CASE_STUDY_DOCS.slice(0, 3);
  const latestBlogs = BLOGS.slice(0, 3);

  return (
    <>
      <PageHero title="Resources" image="/hero/scada.webp" />

      <section className="section" aria-labelledby="brochures-title">
        <div className="container">
          <SectionHead eyebrow={`${BROCHURE_DOCS.length} downloads`} id="brochures-title" title="Brochures & flyers" />
          <div className={s.docs}>
            {featuredBrochures.map((d, i) => (
              <DocCard key={d.id} d={d} i={i} />
            ))}
          </div>
          <div className={s.center}>
            <Link href="/resources/brochures/" className="btn btn-outline" id="all-brochures">
              View all brochures <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="case-studies-title">
        <div className="container">
          <SectionHead eyebrow={`${CASE_STUDY_DOCS.length} projects`} id="case-studies-title" title="Case studies" />
          <div className={s.docs}>
            {featuredCases.map((d, i) => (
              <DocCard key={d.id} d={d} i={i} />
            ))}
          </div>
          <div className={s.center}>
            <Link href="/resources/case-studies/" className="btn btn-outline" id="all-case-studies">
              View all case studies <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="blogs-title">
        <div className="container">
          <SectionHead eyebrow="Insights" id="blogs-title" title="Latest from our blog" />
          <div className={s.blogGrid}>
            {latestBlogs.map((b, i) => (
              <Link key={b.slug} href={`/resources/blogs/${b.slug}/`} className={`card ${s.blogCard} reveal`} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <div className={s.blogImg}>
                  <img src={b.image || "/hero/solar-bess.webp"} alt="" loading="lazy" />
                </div>
                <div className={s.blogBody}>
                  {b.dateLabel && <span className={s.blogDate}>{b.dateLabel}</span>}
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                  <span className="link-arrow">
                    Read more <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className={s.center}>
            <Link href="/resources/blogs/" className="btn btn-outline" id="all-blogs">
              View all blogs <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
