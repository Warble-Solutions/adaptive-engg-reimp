import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/Sections";
import { JOBS, getJob } from "@/lib/careers";
import s from "../../inner.module.css";

// Static export: only the jobs listed in src/lib/careers.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: `${job.title} – Careers`,
    description: `${job.title} at Adaptive Engineering Pvt. Ltd., ${job.location}. ${job.summary}`.slice(0, 300),
    alternates: { canonical: `/careers/${job.slug}/` },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={s.jobBlock}>
      <h3 className={s.jobH}>{title}</h3>
      <ul className={s.ticks}>
        {items.map((t) => (
          <li key={t}>
            <Icon name="check" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const facts: [string, string][] = [
    ["Department", job.department],
    ["Location", job.location],
    ["Experience", job.experience],
    ["Education", job.education],
    ["Employment", job.type],
    ...(job.reportingTo ? ([["Reporting to", job.reportingTo]] as [string, string][]) : []),
  ];

  return (
    <>
      <PageHero title={job.title} image="/hero/solar-wind.webp" />

      <section className="section" aria-labelledby="job-title">
        <div className="container">
          <Link href="/careers/" className={s.back} id="job-back">
            <Icon name="chevronLeft" /> All openings
          </Link>
          <div className={s.jobLayout}>
            <div>
              <h2 className="h2" id="job-title">
                About the role
              </h2>
              <p className="lead" style={{ marginTop: 12 }}>
                {job.summary}
              </p>
              <List title="Key responsibilities" items={job.responsibilities} />
              <List title="Required skills & qualifications" items={job.required} />
              {job.preferred && <List title="Preferred skills" items={job.preferred} />}
            </div>

            <aside className={s.jobAside}>
              <dl className={`card ${s.jobFacts}`}>
                {facts.map(([k, val]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="apply" aria-labelledby="apply-title">
        <div className="container">
          <div className={s.applyBox}>
            <div className="section-head left reveal">
              <span className="eyebrow">Apply</span>
              <h2 className="h2" id="apply-title">
                Apply for {job.title}
              </h2>
              <p className="lead">Fill in your details and attach your resume. A cover letter is optional.</p>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <ApplyForm defaultPosition={job.title} idPrefix={`apply-${job.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
