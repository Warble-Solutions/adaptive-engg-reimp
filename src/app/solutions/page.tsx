import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { BrochureButton } from "@/components/BrochureModal";
import { CtaBand, PageHero, PortfolioStrip, SectionHead } from "@/components/Sections";
import { PANEL_TESTS, SOLUTIONS, URS } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Solutions – SCADA, PPC, EMS-BESS, LT/MV Panels & PM-KUSUM",
  description:
    "AEPL's renewable energy solutions: Plant SCADA (90GW+ monitored), India's first HIL tested Power Plant Controller, EMS for BESS, type-tested LT/MV panels and PM-KUSUM monitoring.",
  alternates: { canonical: "/solutions/" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumb="Solutions"
        title="Solutions for Solar, Wind, BESS & Hybrid"
        text="From switchboard to dashboard – SCADA, PPC, EMS and LT/MV panels engineered, manufactured and commissioned in-house by one trusted team."
        image="/hero/solar-bess.webp"
      />
      <PortfolioStrip />

      <nav className={s.subnav} aria-label="Solutions">
        <div className={`container ${s.subnavInner}`}>
          {SOLUTIONS.map((sol) => (
            <a key={sol.id} href={`#${sol.id}`}>
              {sol.short}
            </a>
          ))}
          <a href="#urs">URS</a>
        </div>
      </nav>

      {SOLUTIONS.map((sol, i) => (
        <section key={sol.id} id={sol.id} className={`section ${i % 2 ? "section-soft" : ""}`} aria-labelledby={`${sol.id}-title`}>
          <div className="container">
            <div className={`${s.sol} ${i % 2 ? s.solFlip : ""}`}>
              <div className={`${s.solMedia} reveal`}>
                { }
                <img src={sol.image} alt={sol.name} loading={i === 0 ? "eager" : "lazy"} />
                <span className={s.solNum}>{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="reveal" style={{ "--d": "0.1s" } as React.CSSProperties}>
                <span className="eyebrow">{sol.short}</span>
                <h2 className="h2" id={`${sol.id}-title`}>
                  {sol.name}
                </h2>
                <p className={s.solTagline}>{sol.tagline}</p>
                <p className="lead">{sol.summary}</p>

                <div className={s.highlights}>
                  {sol.highlights.map((h) => (
                    <div key={h.label}>
                      <strong>{h.value}</strong>
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>

                <div className={s.groups}>
                  {sol.groups.map((g) => (
                    <div key={g.title}>
                      <h3>{g.title}</h3>
                      <ul className={s.ticks}>
                        {g.items.map((it) => (
                          <li key={it}>
                            <Icon name="checkCircle" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className={s.solActions}>
                  <BrochureButton id={sol.brochure} buttonId={`learn-${sol.id}`} />
                  <Link href="/contact/" className="btn btn-outline" id={`enquire-${sol.id}`}>
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>

            {sol.id === "lt-mv-panels" && (
              <div className={`${s.tableWrap} reveal`}>
                <h3>Type test results</h3>
                <p>Tested at ERDA – built for renewable energy applications.</p>
                <table className={s.table}>
                  <thead>
                    <tr>
                      {PANEL_TESTS.columns.map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PANEL_TESTS.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((c, j) => (
                          <td key={j}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Unified Renewable Solution */}
      <section id="urs" className={`section ${s.urs}`} aria-labelledby="urs-title">
        <div className="container">
          <SectionHead eyebrow={URS.tagline} id="urs-title" title={URS.title} lead={URS.desc} />
          <div className={s.ursGrid}>
            {URS.modules.map((m, i) => (
              <div key={m.name} className={`${s.ursCard} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
                <h3>{m.name}</h3>
                <ul>
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={s.center}>
            <BrochureButton id="corporate" className="btn btn-amber" buttonId="learn-urs">
              Corporate Brochure <Icon name="download" />
            </BrochureButton>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
