import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import { Achievements, CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { ABOUT } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "About Us – India's Market Leader in Renewable Energy Technology",
  description:
    "Adaptive Engineering Pvt. Ltd. – 16+ years, 90GW+ monitored, 750+ commissioned projects and a 2,00,000 sq.ft+ dust-free manufacturing facility in Ahmedabad.",
  alternates: { canonical: "/about/" },
};

const MFG = [
  { img: "/solutions/panels/mfg-15.webp", cap: "Dust-free panel manufacturing" },
  { img: "/about/factory-floor.webp", cap: "In-house fabrication" },
  { img: "/solutions/fat.webp", cap: "Factory acceptance testing" },
  { img: "/about/control-room.webp", cap: "SCADA & control engineering" },
  { img: "/about/mfg-2.webp", cap: "Central monitoring" },
  { img: "/about/expo.webp", cap: "AEPL at industry events" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" image="/hero/about-ref.webp" />

      {/* Who we are */}
      <section className="section" aria-labelledby="who-title">
        <div className="container grid-2">
          <div className={`${s.aboutText} reveal`}>
            <span className="eyebrow">Who we are</span>
            <h2 className="h2" id="who-title">
              India&apos;s <span className="accent">Market Leader</span> in Renewable Energy Technology
            </h2>
            <div className="lead">
              <p>{ABOUT.intro}</p>
              {ABOUT.more.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className={`${s.collage} reveal`} style={{ "--d": "0.1s" } as React.CSSProperties}>
            <img src="/about/who-1.webp" alt="Utility-scale solar and wind plant" loading="lazy" />
            <img src="/about/who-2.webp" alt="SCADA control room monitoring renewable assets" loading="lazy" />
            <img src="/about/who-3.webp" alt="AEPL LT/MV switchgear panels" loading="lazy" />
          </div>
        </div>
        <div className="container">
          <figure className={`${s.visionImg} reveal`}>
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

      {/* Values */}
      <section className="section section-soft" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="eyebrow" id="values-title">
              Our values
            </h2>
          </div>
          <figure className={`${s.scaleImg} reveal`}>
            <img
              src="/about/scale.png"
              width={1566}
              height={784}
              loading="lazy"
              alt="Our values – SCALE: Speed, Courage & Commitment, Adapt, Liveliness, Evolve to Excel"
            />
          </figure>
        </div>
      </section>

      {/* Journey */}
      <section className="section" id="journey" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead eyebrow="Our journey" id="journey-title" title="From 15 engineers to India's market leader" />
          <div className={`${s.journey} reveal`}>
            <img src="/about/journey.webp" alt="AEPL journey timeline from 2014 to today" width={1600} height={900} loading="lazy" />
          </div>
        </div>
      </section>

      <Achievements limit={12} />

      {/* Manufacturing */}
      <section className="section" id="manufacturing" aria-labelledby="mfg-title">
        <div className="container">
          <SectionHead
            eyebrow="Manufacturing"
            id="mfg-title"
            title="Built in-house, built to last"
            lead="A 2,00,000 sq.ft+ state of the art, dust-free facility with in-house fabrication, an automated paint shop and automated wire preparation – full control of quality and delivery."
          />
          <div className={s.mfgGrid}>
            {MFG.map((m, i) => (
              <figure key={m.img} className="reveal" style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <img src={m.img} alt={m.cap} loading="lazy" />
                <figcaption>{m.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="about-testimonials-title">
        <div className="container">
          <SectionHead eyebrow="Testimonials" id="about-testimonials-title" title="What our partners say" />
          <Testimonials />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
