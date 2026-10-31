import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { BLOGS, getBlog } from "@/lib/blogs";
import s from "../../../inner.module.css";

// Static export: only the posts in src/lib/blogs.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBlog(slug);
  if (!b) return {};
  return {
    title: b.title,
    description: b.excerpt,
    alternates: { canonical: `/resources/blogs/${b.slug}/` },
    openGraph: { type: "article", title: b.title, description: b.excerpt, ...(b.image ? { images: [b.image] } : {}) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const b = getBlog(slug);
  if (!b) notFound();
  const more = BLOGS.filter((x) => x.slug !== b.slug).slice(0, 3);

  return (
    <>
      <PageHero title={b.title} image={b.image || "/hero/solar-wind.webp"} />
      <section className="section">
        <div className="container">
          <article className={s.blogArticle}>
            <p className={s.blogMeta}>
              {b.dateLabel ? `${b.dateLabel} · ` : ""}Adaptive Engineering Pvt. Ltd.
            </p>
            {b.image && <img className={s.blogCover} src={b.image} alt="" />}
            {/* Static, trusted content from src/lib/blogs.ts */}
            <div dangerouslySetInnerHTML={{ __html: b.html }} />
            <p style={{ marginTop: 36 }}>
              <Link href="/resources/blogs/" className="link-arrow">
                <Icon name="chevronLeft" /> All blogs
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="more-blogs-title">
        <div className="container">
          <SectionHead eyebrow="Keep reading" id="more-blogs-title" title="More from our blog" />
          <div className={s.blogGrid}>
            {more.map((m) => (
              <Link key={m.slug} href={`/resources/blogs/${m.slug}/`} className={`card ${s.blogCard}`}>
                <div className={s.blogImg}>
                  <img src={m.image || "/hero/solar-bess.webp"} alt="" loading="lazy" />
                </div>
                <div className={s.blogBody}>
                  {m.dateLabel && <span className={s.blogDate}>{m.dateLabel}</span>}
                  <h3>{m.title}</h3>
                  <p>{m.excerpt}</p>
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
