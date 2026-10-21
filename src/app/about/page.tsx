import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import { Achievements, Clients, CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { ABOUT, CERTIFICATIONS, JOURNEY, TEAM, VALUES } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "About Us – India's Market Leader in Renewable Energy Technology",
  description:
    "Adaptive Engineering Pvt. Ltd. – 16+ years, 90GW+ monitored, 750+ commissioned projects and a 2 Lacs sq.ft+ dust-free manufacturing facility in Ahmedabad.",
  alternates: { canonical: "/about/" },
};

const MFG = [
  { img: "/solutions/panel-factory.webp", cap: "Dust-free panel manufacturing" },
  { img: "/about/factory-floor.webp", cap: "In-house fabrication" },
  { img: "/solutions/fat.webp", cap: "Factory acceptance testing" },
  { img: "/about/control-room.webp", cap: "SCADA & control engineering" },
  { img: "/solutions/cms.webp", cap: "Central monitoring" },
  { img: "/about/expo.webp", cap: "AEPL at industry events" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About Us" title="Engineering the backbone of India's clean energy" text={ABOUT.intro} image="/about/control-room.webp" />

      {/* Who we are */}
      <section className="section" aria-labelledby="who-title">
        <div className="container grid-2">
          <div className={`${s.aboutText} reveal`}>
            <span className="eyebrow">Who we are</span>
            <h2 className="h2" id="who-title">
              India&apos;s <span className="accent">Market Leader</span> in Renewable Energy Technology
            </h2>
            <div className="lead">
              {ABOUT.more.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className={`${s.collage} reveal`} style={{ "--d": "0.1s" } as React.CSSProperties}>
            { }
            <img src="/about/team-group.webp" alt="The AEPL team" loading="lazy" />
            <img src="/about/booth-1.webp" alt="AEPL booth at an industry expo" loading="lazy" />
            <img src="/about/booth-2.webp" alt="AEPL team meeting visitors" loading="lazy" />
            { }
          </div>
        </div>
      </section>

      {/* Vision, mission, values */}
      <section className="section section-soft" aria-labelledby="values-title">
        <div className="container">
          <div className={s.vmGrid}>
            <div className={`card ${s.vmCard} reveal`}>
              <small>Vision</small>
              <strong>{ABOUT.vision}</strong>
            </div>
            <div className={`card ${s.vmCard} reveal`} style={{ "--d": "0.08s" } as React.CSSProperties}>
              <small>Mission</small>
              <strong>{ABOUT.mission}</strong>
            </div>
          </div>
          <SectionHead
            eyebrow="Our values"
            id="values-title"
            title={
              <>
                We <span className="accent">SCALE</span> together
              </>
            }
          />
          <div className={s.values}>
            {VALUES.map((v, i) => (
              <div key={v.letter} className={`card ${s.value} reveal`} style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <b>{v.letter}</b>
                <span>{v.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section" id="journey" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead eyebrow="Our journey" id="journey-title" title="From 15 engineers to 90GW+ monitored" />
          <div className={s.timeline}>
            {JOURNEY.map((j, i) => (
              <div
                key={j.year}
                className={`${s.milestone} ${j.year === "Today" ? s.milestoneNow : ""} reveal`}
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={s.year}>{j.year}</span>
                <ul>
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
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
            lead="A 2 Lacs sq.ft+ state of the art, dust-free facility with in-house fabrication, an automated paint shop and automated wire preparation – full control of quality and delivery."
          />
          <div className={s.mfgGrid}>
            {MFG.map((m, i) => (
              <figure key={m.img} className="reveal" style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                { }
                <img src={m.img} alt={m.cap} loading="lazy" />
                <figcaption>{m.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-soft" id="team" aria-labelledby="team-title">
        <div className="container">
          <SectionHead eyebrow="Our team" id="team-title" title="The people behind AEPL" lead="450+ engineers, technicians and specialists – one trusted team from engineering to handover." />
          <div className={s.team}>
            {TEAM.map((m, i) => (
              <div key={m.photo} className={`card ${s.member} reveal`} style={{ "--d": `${(i % 5) * 0.05}s` } as React.CSSProperties}>
                { }
                <img src={m.photo} alt={m.name} loading="lazy" />
                <div>
                  <h3>{m.name}</h3>
                  {m.role && <p>{m.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section" id="certifications" aria-labelledby="certs-title">
        <div className="container">
          <SectionHead eyebrow="Certifications & awards" id="certs-title" title="Quality you can verify" />
          <div className={s.certs}>
            {CERTIFICATIONS.map((c, i) => (
              <div key={c.img} className={`card ${s.cert} reveal`} style={{ "--d": `${(i % 4) * 0.06}s` } as React.CSSProperties}>
                { }
                <img src={c.img} alt={c.title} loading="lazy" />
                <p>{c.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Clients />

      <section className="section" aria-labelledby="about-testimonials-title">
        <div className="container">
          <SectionHead eyebrow="Testimonials" id="about-testimonials-title" title="What our partners say" />
          <Testimonials />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
