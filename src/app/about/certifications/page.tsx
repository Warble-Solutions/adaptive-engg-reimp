import type { Metadata } from "next";
import Icon, { type IconName } from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { CERTIFICATIONS } from "@/lib/content";
import s from "../../inner.module.css";

export const metadata: Metadata = {
  title: "Certificates & Type Test Reports",
  description:
    "ISO 9001:2015 certified by TÜV NORD, Schneider Electric Authorised System Integrator, and ERDA type-tested LT & MV panels.",
  alternates: { canonical: "/about/certifications/" },
};

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

export default function CertificationsPage() {
  return (
    <>
      <PageHero title="Certificates" image="/about/certificates-solar-hero.webp" />

      <section className={`section ${s.certSection}`} id="certifications" aria-labelledby="certs-title">
        <div className="container">
          <div className={s.certTop}>
            <SectionHead
              eyebrow="Certificates & awards"
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

      <CtaBand />
    </>
  );
}

