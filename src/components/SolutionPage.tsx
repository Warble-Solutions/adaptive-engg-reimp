import Link from "next/link";
import { BrochureButton } from "@/components/BrochureModal";
import Icon, { type IconName } from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { URS } from "@/lib/content";
import { URS_MODULE_PAGES, type SolutionPageData, type SolutionSection } from "@/lib/solutions";
import s from "./SolutionPage.module.css";

const delay = (i: number, n = 3) => ({ "--d": `${(i % n) * 0.08}s` }) as React.CSSProperties;

/** Grid of the 6 URS modules, each linking to its own page. */
export function UrsModuleGrid({ exclude }: { exclude?: string }) {
  const mods = URS.modules
    .map((m, i) => ({ ...m, page: URS_MODULE_PAGES[i] }))
    .filter((m) => m.page && m.page.slug !== exclude);
  return (
    <div className={s.modGrid}>
      {mods.map((m, i) => (
        <Link key={m.name} href={m.page.path} className={`card ${s.modCard} reveal`} style={delay(i)} id={`urs-module-${m.page.slug}`}>
          <span className={s.modIcon}>
            <Icon name={m.icon as IconName} />
          </span>
          <h3>{m.page.name}</h3>
          <ul>
            {m.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
          <span className={s.modMore}>
            Explore <Icon name="arrow" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function Section({ sec, idx }: { sec: SolutionSection; idx: number }) {
  const id = `sec-${idx}`;
  switch (sec.type) {
    case "cards": {
      const cols = sec.cols ?? 3;
      return (
        <>
          <SectionHead eyebrow={sec.eyebrow} title={sec.title} lead={sec.lead} id={id} />
          <div className={`${s.cards} ${s[`cols${cols}`]}`}>
            {sec.items.map((it, i) => (
              <div key={it.title} className={`card ${s.card} ${it.desc ? "" : s.cardCompact} reveal`} style={delay(i, cols)}>
                {it.icon ? (
                  <span className={s.cardIcon}>
                    <Icon name={it.icon} />
                  </span>
                ) : (
                  <span className={s.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                )}
                <h3>{it.title}</h3>
                {it.desc && <p>{it.desc}</p>}
              </div>
            ))}
          </div>
        </>
      );
    }
    case "split":
      return (
        <div className={`${s.split} ${sec.flip ? s.splitFlip : ""}`}>
          <div className={`${s.splitMedia} reveal`}>
            <img src={sec.image} alt={sec.imageAlt} loading="lazy" />
          </div>
          <div className="reveal" style={delay(1)}>
            <span className="eyebrow">{sec.eyebrow}</span>
            <h2 className="h2" id={id}>
              {sec.title}
            </h2>
            {sec.text && <p className={`lead ${s.splitText}`}>{sec.text}</p>}
            {sec.bullets && (
              <ul className={s.ticks}>
                {sec.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="checkCircle" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    case "steps":
      return (
        <>
          <SectionHead eyebrow={sec.eyebrow} title={sec.title} id={id} />
          <ol className={s.steps}>
            {sec.items.map((it, i) => (
              <li key={it.title} className="reveal" style={delay(i, 4)}>
                <span className={s.stepNum}>{i + 1}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </li>
            ))}
          </ol>
        </>
      );
    case "table":
      return (
        <>
          <SectionHead eyebrow={sec.eyebrow} title={sec.title} lead={sec.lead} id={id} />
          <div className={`${s.tableWrap} reveal`}>
            <table className={s.table}>
              <thead>
                <tr>
                  {sec.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, j) => (
                      <td key={j}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    case "tiles":
      return (
        <>
          <SectionHead eyebrow={sec.eyebrow} title={sec.title} lead={sec.lead} id={id} />
          <div className={s.tiles}>
            {sec.items.map((it, i) => (
              <figure key={it.label} className={`${s.tile} reveal`} style={delay(i)}>
                <img src={it.image} alt={it.label} loading="lazy" />
                <figcaption>{it.label}</figcaption>
              </figure>
            ))}
          </div>
        </>
      );
    case "modules":
      return (
        <>
          <SectionHead eyebrow={sec.eyebrow} title={sec.title} lead={sec.lead} id={id} />
          <UrsModuleGrid />
        </>
      );
  }
}

/** Full solution page: banner, intro, content sections and CTA. */
export default function SolutionPage({ data, moduleSlug }: { data: SolutionPageData; moduleSlug?: string }) {
  // Alternate white / soft backgrounds. Sections with photos stay on white
  // (some images have white corners baked in).
  const bgs: string[] = [];
  let soft = true;
  for (const sec of data.sections) {
    const hasImage = sec.type === "split" || sec.type === "tiles";
    bgs.push(hasImage ? "" : soft ? "section-soft" : "");
    soft = hasImage ? true : !soft;
  }
  return (
    <>
      <PageHero title={data.name} image={data.banner} />

      {/* Intro */}
      <section className="section" aria-labelledby="sol-intro-title">
        <div className="container">
          <div className={s.intro}>
            <div className="reveal">
              <span className="eyebrow">{data.label}</span>
              <h2 className="h2" id="sol-intro-title">
                {data.tagline}
              </h2>
              <div className={s.introText}>
                {data.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className={s.actions}>
                <BrochureButton id={data.brochure} buttonId={`learn-${data.slug}`} />
                <Link href="/contact/" className="btn btn-outline" id={`enquire-${data.slug}`}>
                  Enquire Now
                </Link>
              </div>
            </div>
            <div className={`${s.introMedia} reveal`} style={delay(1)}>
              <img src={data.image} alt={data.imageAlt} />
            </div>
          </div>

          {data.stats && (
            <div className={s.stats}>
              {data.stats.map((st, i) => (
                <div key={st.label} className="reveal" style={delay(i, 4)}>
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {data.sections.map((sec, i) => (
        <section key={i} className={`section ${bgs[i]}`} aria-labelledby={`sec-${i}`}>
          <div className="container">
            <Section sec={sec} idx={i} />
          </div>
        </section>
      ))}

      {moduleSlug && (
        <section className="section section-soft" aria-labelledby="other-urs-title">
          <div className="container">
            <SectionHead eyebrow="Unified Renewable Solution" title="Explore other URS solutions" id="other-urs-title" />
            <UrsModuleGrid exclude={moduleSlug} />
            <div className={s.center}>
              <Link href="/solutions/urs/" className="btn btn-outline" id="back-to-urs">
                View URS overview <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
