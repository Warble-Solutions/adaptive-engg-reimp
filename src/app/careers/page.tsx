import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/Sections";
import { COMPANY } from "@/lib/content";
import { JOBS } from "@/lib/careers";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career with Adaptive Engineering Pvt. Ltd., Ahmedabad – open positions in engineering, quality, techno-commercial, supply chain, management and IT.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero title="Careers" image="/hero/solar-bess.webp" />

      <section className="section" aria-labelledby="open-roles-title">
        <div className="container">
          <h2 className="sr-only" id="open-roles-title">
            Open positions
          </h2>

          <div className={s.jobGrid}>
            {JOBS.map((j, i) => (
              <Link key={j.slug} href={`/careers/${j.slug}/`} className={`card ${s.jobCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties} id={`job-${j.slug}`}>
                <span className={s.jobDept}>{j.department}</span>
                <h3 className="h3">{j.title}</h3>
                <ul className={s.jobMeta}>
                  <li>
                    <Icon name="pin" />
                    {j.location}
                  </li>
                  <li>
                    <Icon name="gauge" />
                    {j.experience}
                  </li>
                </ul>
                <p>{j.summary}</p>
                <span className={s.jobCta}>
                  View details &amp; apply <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>

          <p className={s.jobNote}>
            Don&apos;t see a role that fits? Write to us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
