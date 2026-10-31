import Icon from "@/components/Icon";
import { BrochureButton } from "@/components/BrochureModal";
import { BROCHURES, type Brochure, type BrochureCategory } from "@/lib/content";
import s from "@/app/inner.module.css";

export const CATEGORY_ORDER: BrochureCategory[] = [
  "Company",
  "Unified Renewable Solution",
  "PM KUSUM",
  "LT/MV Panels",
  "Renewable Energy",
  "Water",
  "Industrial IoT",
  "Infrastructure",
];

export const ALL_DOCS = Object.values(BROCHURES);
export const BROCHURE_DOCS = ALL_DOCS.filter((d) => d.kind !== "case-study");
export const CASE_STUDY_DOCS = ALL_DOCS.filter((d) => d.kind === "case-study");

/** Brochures grouped by category, in display order. */
export const brochureGroups = () =>
  CATEGORY_ORDER.map((c) => ({ c, items: BROCHURE_DOCS.filter((d) => (d.category ?? "Company") === c) })).filter((g) => g.items.length);

/** Card for a downloadable PDF (brochure or case study) – opens the gated download form. */
export function DocCard({ d, i }: { d: Brochure; i: number }) {
  const label = d.kind === "case-study" ? "Case Study" : "Brochure";
  return (
    <article className={`card ${s.doc} reveal`} style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
      <div className={s.docThumb}>
        <img src={d.thumb} alt={`${d.title} – cover`} loading="lazy" />
      </div>
      <div className={s.docBody}>
        <span className="chip" style={{ alignSelf: "flex-start" }}>
          <Icon name="file" width={14} height={14} /> {label}
        </span>
        <h3>{d.title}</h3>
        <p>{d.desc}</p>
        <BrochureButton id={d.id} buttonId={`resource-${d.id}`}>
          Download <Icon name="download" />
        </BrochureButton>
      </div>
    </article>
  );
}

/** Category-grouped brochure grid. */
export function BrochureGroups() {
  return (
    <>
      {brochureGroups().map((g) => (
        <div key={g.c} className={s.docGroup}>
          <h3 className={s.docGroupTitle}>{g.c}</h3>
          <div className={s.docs}>
            {g.items.map((d, i) => (
              <DocCard key={d.id} d={d} i={i} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/** Case study grid. */
export function CaseStudyGrid() {
  return (
    <div className={s.docs}>
      {CASE_STUDY_DOCS.map((d, i) => (
        <DocCard key={d.id} d={d} i={i} />
      ))}
    </div>
  );
}

