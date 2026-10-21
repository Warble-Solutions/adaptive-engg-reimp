import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import YouTubeLite from "@/components/YouTubeLite";
import Testimonials from "@/components/Testimonials";
import Icon from "@/components/Icon";
import { BrochureButton } from "@/components/BrochureModal";
import { Achievements, Advantages, Clients, ContactSection, SectionHead } from "@/components/Sections";
import { ABOUT, COMPANY, SOLUTIONS } from "@/lib/content";
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
              <span className="eyebrow">About Us</span>
              <h2 className="h2" id="about-title">
                India&apos;s <span className="accent">Market Leader</span> in Renewable Energy Technology
              </h2>
              <p className="lead">{ABOUT.intro}</p>
              <div className={s.vm}>
                <div>
                  <small>Vision</small>
                  <strong>{ABOUT.vision}</strong>
                </div>
                <div>
                  <small>Mission</small>
                  <strong>{ABOUT.mission}</strong>
                </div>
              </div>
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
        </div>
      </section>

      {/* 3. SOLUTIONS */}
      <section className="section section-soft" aria-labelledby="solutions-title">
        <div className="container">
          <SectionHead
            eyebrow="Solutions"
            id="solutions-title"
            title={
              <>
                One platform, <span className="accent">plant to portfolio</span>
              </>
            }
            lead="Integrated technology for utility-scale Solar, Wind, BESS and Hybrid plants – engineered and manufactured in-house."
          />
          <div className={s.solGrid}>
            {SOLUTIONS.map((sol, i) => (
              <article key={sol.id} className={`card ${s.solCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <Link href={`/solutions/#${sol.id}`} className={s.solImg} tabIndex={-1} aria-hidden="true">
                  { }
                  <img src={sol.image} alt="" loading="lazy" />
                  <span className={s.solTag}>{sol.short}</span>
                </Link>
                <div className={s.solBody}>
                  <h3>
                    <Link href={`/solutions/#${sol.id}`}>{sol.name}</Link>
                  </h3>
                  <p>{sol.summary}</p>
                  <div className={s.solFoot}>
                    <Link href={`/solutions/#${sol.id}`} className="link-arrow">
                      Explore <Icon name="arrow" />
                    </Link>
                    <BrochureButton id={sol.brochure} className={s.dl} buttonId={`home-dl-${sol.id}`}>
                      <Icon name="download" /> Brochure
                    </BrochureButton>
                  </div>
                </div>
              </article>
            ))}
            <article className={`${s.solCard} ${s.solUrs} reveal`} style={{ "--d": "0.16s" } as React.CSSProperties}>
              <span className="eyebrow">Unified Renewable Solution</span>
              <h3>SCADA · PPC · CMS · Analytics · AMS · EMS</h3>
              <p>From a single inverter to a national fleet – acquisition, control and reporting on one platform.</p>
              <Link href="/solutions/#urs" className="btn btn-amber" id="home-urs">
                Discover URS <Icon name="arrow" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 4. ACHIEVEMENTS */}
      <Achievements limit={8} />

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
