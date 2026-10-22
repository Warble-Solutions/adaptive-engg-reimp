import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import YouTubeLite from "@/components/YouTubeLite";
import Testimonials from "@/components/Testimonials";
import Icon, { type IconName } from "@/components/Icon";
import { BrochureButton } from "@/components/BrochureModal";
import { Achievements, Advantages, Clients, ContactSection, SectionHead } from "@/components/Sections";
import { ABOUT, COMPANY, MAIN_SOLUTIONS, URS } from "@/lib/content";
import { getLatestVideos } from "@/lib/youtube";
import s from "./page.module.css";

export default async function HomePage() {
  const videos = await getLatestVideos(6);

  return (
    <>
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. ABOUT – text left | video right | rest full width */}
      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <div className={s.aboutTop}>
            <div className="reveal">
              <h2 className="eyebrow" id="about-title">
                About Us
              </h2>
              <p className="lead">{ABOUT.intro}</p>
            </div>
            <div className={`${s.videoCol} reveal`} style={{ "--d": "0.12s" } as React.CSSProperties}>
              <YouTubeLite id={COMPANY.aboutVideoId} title="About Adaptive Engineering Pvt. Ltd." />
              <div className={s.videoBadge}>
                <strong>16+</strong>
                <span>Years of expertise</span>
              </div>
            </div>
          </div>

          <div className={`${s.aboutBottom} reveal`}>
            {ABOUT.more.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className={s.aboutCtas}>
              <Link href="/about/" className="btn" id="home-about-more">
                Read More <Icon name="arrow" />
              </Link>
              <Link href="/contact/" className="btn btn-outline" id="home-about-contact">
                Contact Us
              </Link>
            </div>
          </div>

          <figure className={`${s.vision} reveal`}>
            <img
              src="/about/vision.webp"
              width={1687}
              height={767}
              loading="lazy"
              alt="Vision: Embrace technology to maximize value. Mission: Continuously evolve to maximize value of each installation towards providing the best customer experience."
            />
          </figure>
        </div>
      </section>

      {/* 3. SOLUTIONS */}
      <section className="section section-soft" aria-labelledby="solutions-title">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="eyebrow" id="solutions-title">
              Our Solutions
            </h2>
          </div>
          <div className={s.solGrid}>
            {MAIN_SOLUTIONS.map((sol, i) => (
              <article key={sol.id} className={`card ${s.solCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <Link href={sol.href} className={s.solImg} tabIndex={-1} aria-hidden="true">
                  <img src={sol.image} alt="" loading="lazy" />
                  <span className={s.solTag}>{sol.short}</span>
                </Link>
                <div className={s.solBody}>
                  <h3>
                    <Link href={sol.href}>{sol.name}</Link>
                  </h3>
                  <p>{sol.summary}</p>
                  <div className={s.solFoot}>
                    <Link href={sol.href} className="link-arrow">
                      Explore <Icon name="arrow" />
                    </Link>
                    <BrochureButton id={sol.brochure} className={s.dl} buttonId={`home-dl-${sol.id}`}>
                      <Icon name="download" /> Brochure
                    </BrochureButton>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* URS modules */}
          <div className={`${s.ursHead} reveal`}>
            <h3 id="urs-title">Unified Renewable Solution (URS)</h3>
          </div>
          <div className={s.ursGrid}>
            {URS.modules.map((m, i) => (
              <article key={m.name} className={`card ${s.ursCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <div className={s.ursTop}>
                  <span className={s.ursIcon}>
                    <Icon name={m.icon as IconName} />
                  </span>
                  <h4>{m.name}</h4>
                </div>
                <ul className={s.ursList}>
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {(m.href || m.brochure) && (
                  <div className={s.solFoot}>
                    {m.href ? (
                      <Link href={m.href} className="link-arrow">
                        Explore <Icon name="arrow" />
                      </Link>
                    ) : (
                      <span />
                    )}
                    {m.brochure && (
                      <BrochureButton id={m.brochure} className={s.dl} buttonId={`home-urs-dl-${i + 1}`}>
                        <Icon name="download" /> Brochure
                      </BrochureButton>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS */}
      <Achievements limit={8} />

      {/* SCALE values graphic */}
      <section className="section" aria-label="Our values – SCALE" style={{ paddingBottom: 0 }}>
        <div className="container">
          <figure className={`${s.scale} reveal`}>
            <img
              src="/about/scale.webp"
              width={1566}
              height={784}
              loading="lazy"
              alt="Our values – SCALE: Speed, Courage & Commitment, Adapt, Liveliness, Evolve to Excel"
            />
          </figure>
        </div>
      </section>

      {/* 5. AEPL ADVANTAGE */}
      <Advantages />

      {/* 6. YOUTUBE */}
      <section className="section section-soft" aria-labelledby="videos-title">
        <div className="container">
          <div className={s.videoHead}>
            <SectionHead left eyebrow="YouTube" id="videos-title" title="Engineering in motion" />
            <a href={COMPANY.socials.youtube} target="_blank" rel="noreferrer" className="btn btn-outline reveal" id="home-youtube-subscribe">
              <Icon name="youtube" /> Visit our channel
            </a>
          </div>
          <div className={s.videoGrid}>
            {videos.map((v, i) => (
              <div key={v.id} className={`${s.videoCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <YouTubeLite id={v.id} title={v.title} />
                <h3>{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENTS */}
      <Clients />

      {/* 8. TESTIMONIALS */}
      <section className="section" aria-labelledby="testimonials-title">
        <div className="container">
          <SectionHead eyebrow="Testimonials" id="testimonials-title" title="What our partners say" />
          <Testimonials />
        </div>
      </section>

      {/* 9. CONTACT FORM */}
      <ContactSection />
    </>
  );
}
