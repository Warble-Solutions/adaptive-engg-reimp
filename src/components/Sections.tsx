import Link from "next/link";
import { ADVANTAGES, CLIENT_LOGOS, COMPANY, STATS } from "@/lib/content";
import Counter from "./Counter";
import EnquiryForm from "./EnquiryForm";
import Icon, { type IconName } from "./Icon";
import s from "./Sections.module.css";

export function SectionHead({
  eyebrow,
  title,
  lead,
  left,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  left?: boolean;
  id?: string;
}) {
  return (
    <div className={`section-head reveal ${left ? "left" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function PortfolioStrip() {
  return (
    <div className="strip" aria-label="Portfolio">
      <div className="container strip-inner">
        {COMPANY.portfolio.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    </div>
  );
}

/** Achievements – brochure numbers with count-up. */
export function Achievements({ limit = 8, dark = true }: { limit?: number; dark?: boolean }) {
  return (
    <section className={`section ${dark ? s.achDark : "section-soft"}`} aria-labelledby="achievements-title">
      <div className="container">
        <div className={`section-head reveal ${dark ? s.headLight : ""}`}>
          <span className="eyebrow">Achievements</span>
          <h2 className="h2" id="achievements-title">
            Engineering the backbone of India&apos;s clean energy
          </h2>
        </div>
        <div className={s.statsGrid}>
          {STATS.slice(0, limit).map((st, i) => (
            <div key={st.label} className={`${s.statCard} reveal`} style={{ "--d": `${(i % 4) * 0.08}s` } as React.CSSProperties}>
              <Counter stat={st} className={s.statVal} />
              <span className={s.statLabel}>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Advantages() {
  return (
    <section className="section" aria-labelledby="advantage-title">
      <div className="container">
        <div className={s.advGrid}>
          <div className={s.advIntro}>
            <div className="section-head left reveal">
              <h2 className="h2" id="advantage-title">
                The <span className="accent">AEPL</span> Advantage
              </h2>
            </div>
            <div className={`${s.advImg} reveal`}>
              <img src="/about/team-group.webp" alt="The Adaptive Engineering team" loading="lazy" />
              <div className={s.advBadge}>
                <strong>450+ Experts</strong>
                <span>One trusted team</span>
              </div>
            </div>
          </div>
          <div className={s.advList}>
            {ADVANTAGES.map((a, i) => (
              <div key={a.title} className={`card ${s.advCard} reveal`} style={{ "--d": `${(i % 2) * 0.08}s` } as React.CSSProperties}>
                <span className={s.advIcon}>
                  <Icon name={a.icon as IconName} />
                </span>
                <h3>{a.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Clients({ id = "clients" }: { id?: string }) {
  const logos = CLIENT_LOGOS;
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];
  return (
    <section className="section section-soft" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHead eyebrow="Clients" id={`${id}-title`} title="Industry leaders trust us" lead="500+ customers across India's leading IPPs, EPCs, utilities and industries." />
      </div>
      <div className={s.marquees}>
        {rows.map((row, r) => (
          <div key={r} className={`${s.marquee} ${r === 1 ? s.reverse : ""}`}>
            <div className={s.track}>
              {[...row, ...row].map((src, i) => (
                <div className={s.logo} key={`${src}-${i}`} aria-hidden={i >= row.length}>
                  <img src={src} alt={i < row.length ? "Client logo" : ""} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ title = "Let's Connect!", idPrefix = "home-enquiry" }: { title?: string; idPrefix?: string }) {
  const items: { icon: IconName; label: string; value: React.ReactNode }[] = [
    { icon: "phone", label: "Call us", value: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a> },
    { icon: "mail", label: "Email", value: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> },
    { icon: "pin", label: "Head office", value: COMPANY.address.join(" ") },
  ];
  return (
    <section className={`section ${s.contact}`} id="contact" aria-labelledby={`${idPrefix}-title`}>
      <div className={`container ${s.contactGrid}`}>
        <div className={s.contactInfo}>
          <span className="eyebrow">Contact</span>
          <h2 className="h2" id={`${idPrefix}-title`}>
            {title}
          </h2>
          <p className="lead">Give us a call or drop by anytime – we endeavour to answer all enquiries within 24 hours on business days.</p>
          <ul className={s.contactList}>
            {items.map((it) => (
              <li key={it.label}>
                <span className={s.contactIcon}>
                  <Icon name={it.icon} />
                </span>
                <span>
                  <small>{it.label}</small>
                  {it.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${s.formCard} reveal`}>
          <EnquiryForm idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`}>
        <div>
          <h2>Planning a solar, wind, BESS or hybrid project?</h2>
          <p>Talk to India&apos;s most trusted renewable technology partner.</p>
        </div>
        <div className={s.ctaBtns}>
          <Link href="/contact/" className="btn btn-light" id="cta-contact">
            Get in Touch <Icon name="arrow" />
          </Link>
          <Link href="/resources/" className="btn btn-ghost-light" id="cta-resources">
            Download Brochures
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Simple inner-page banner: white page title over a photo. */
export function PageHero({ title, image }: { title: string; image: string }) {
  return (
    <section className="page-hero" style={{ "--img": `url(${image})` } as React.CSSProperties}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}
