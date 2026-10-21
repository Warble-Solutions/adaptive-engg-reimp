import type { Metadata } from "next";
import Icon, { type IconName } from "@/components/Icon";
import Testimonials from "@/components/Testimonials";
import { Achievements, Clients, CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { ABOUT, CERTIFICATIONS, TEAM, VALUES } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "About Us – India's Market Leader in Renewable Energy Technology",
  description:
    "Adaptive Engineering Pvt. Ltd. – 16+ years, 90GW+ monitored, 750+ commissioned projects and a 2,00,000 sq.ft+ dust-free manufacturing facility in Ahmedabad.",
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

const CERT_BADGES: { icon: IconName; value: string; label: string }[] = [
  { icon: "shield", value: "ISO 9001:2015", label: "TÜV NORD certified" },
  { icon: "bolt", value: "ERDA", label: "Type-tested panels" },
  { icon: "checkCircle", value: "Authorised SI", label: "Schneider Electric" },
];

const featured = CERTIFICATIONS.filter((c) => c.kind !== "ERDA Type Test");
const tests = CERTIFICATIONS.filter((c) => c.kind === "ERDA Type Test");

function CertCard({ c, i, small = false }: { c: (typeof CERTIFICATIONS)[number]; i: number; small?: boolean }) {
  return (
    <a
      href={c.img}
      target="_blank"
      rel="noopener"
      className={`${s.certCard} ${small ? s.certSmall : ""} reveal`}
      style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
      aria-label={`${c.title} – view certificate`}
    >
      <div className={s.certFrame}>
        <img src={c.img} alt="" loading="lazy" />
      </div>
      <div className={s.certMeta}>
        {!small && <span className={s.certKind}>{c.kind}</span>}
        <h3>{c.title}</h3>
      </div>
      <span className={s.certView} aria-hidden="true">
        <Icon name="arrow" />
      </span>
    </a>
  );
}

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
            <img src="/about/team-group.webp" alt="The AEPL team" loading="lazy" />
            <img src="/about/booth-1.webp" alt="AEPL booth at an industry expo" loading="lazy" />
            <img src="/about/booth-2.webp" alt="AEPL team meeting visitors" loading="lazy" />
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
          <SectionHead eyebrow="Our journey" id="journey-title" title="From 15 engineers to India's market leader" />
          <div className={`${s.journey} reveal`}>
            <img src="/about/journey.webp" alt="AEPL journey timeline from 2014 to today" width={1920} height={864} loading="lazy" />
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

      {/* Team */}
      <section className="section section-soft" id="team" aria-labelledby="team-title">
        <div className="container">
          <SectionHead eyebrow="Our team" id="team-title" title="The people behind AEPL" lead="450+ engineers, technicians and specialists – one trusted team from engineering to handover." />
          <div className={s.team}>
            {TEAM.map((m, i) => (
              <div key={m.photo} className={`card ${s.member} reveal`} style={{ "--d": `${(i % 5) * 0.05}s` } as React.CSSProperties}>
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
      <section className={`section ${s.certSection}`} id="certifications" aria-labelledby="certs-title">
        <div className="container">
          <div className={s.certTop}>
            <SectionHead
              left
              eyebrow="Certifications & awards"
              id="certs-title"
              title={
                <>
                  Quality you can <span className="accent">verify</span>
                </>
              }
              lead="Independently certified processes, industry recognition and type-tested panels – so every installation performs for 25 years and beyond."
            />
            <ul className={`${s.certBadges} reveal`}>
              {CERT_BADGES.map((b) => (
                <li key={b.label}>
                  <span>
                    <Icon name={b.icon} />
                  </span>
                  <div>
                    <strong>{b.value}</strong>
                    <small>{b.label}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.certFeatured}>
            {featured.map((c, i) => (
              <CertCard key={c.img} c={c} i={i} />
            ))}
          </div>

          <div className={`${s.certTests} reveal`}>
            <div className={s.certTestsHead}>
              <span className="chip">
                <Icon name="bolt" width={14} height={14} /> ERDA
              </span>
              <h3>Type test reports</h3>
              <p>LT &amp; MV panels independently tested at ERDA for short circuit, temperature rise and IP55 ingress protection.</p>
            </div>
            <div className={s.certTestGrid}>
              {tests.map((c, i) => (
                <CertCard key={c.img} c={c} i={i} small />
              ))}
            </div>
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
