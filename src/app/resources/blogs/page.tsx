import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/Sections";
import { BLOGS } from "@/lib/blogs";
import s from "../../inner.module.css";

export const metadata: Metadata = {
  title: "Blogs – Renewable Energy, SCADA, Water & Automation Insights",
  description: "Insights from Adaptive Engineering on renewable energy, SCADA, energy storage, water management, automation and industrial IoT.",
  alternates: { canonical: "/resources/blogs/" },
};

export default function BlogsPage() {
  return (
    <>
      <PageHero title="Blogs" image="/hero/solar-wind.webp" />
      <section className="section">
        <div className="container">
          <div className={s.blogGrid}>
            {BLOGS.map((b, i) => (
              <Link key={b.slug} href={`/resources/blogs/${b.slug}/`} className={`card ${s.blogCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <div className={s.blogImg}>
                  <img src={b.image || "/hero/solar-bess.webp"} alt="" loading={i < 3 ? "eager" : "lazy"} />
                </div>
                <div className={s.blogBody}>
                  {b.dateLabel && <span className={s.blogDate}>{b.dateLabel}</span>}
                  <h2 style={{ fontSize: "18.5px", lineHeight: 1.35 }}>{b.title}</h2>
                  <p>{b.excerpt}</p>
                  <span className="link-arrow">
                    Read more <Icon name="arrow" />
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

