"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { TEAM } from "@/lib/content";
import s from "./TeamGrid.module.css";

export default function TeamGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? TEAM[activeIdx] : null;

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i - 1 + TEAM.length) % TEAM.length));
  }, []);
  const next = useCallback(() => {
    setActiveIdx((i) => (i === null ? null : (i + 1) % TEAM.length));
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIdx, close, prev, next]);

  const featured = TEAM.map((m, idx) => ({ m, idx })).filter((x) => x.m.featured);
  const others = TEAM.map((m, idx) => ({ m, idx })).filter((x) => !x.m.featured);

  return (
    <>
      {[featured, others].map((group, g) => (
        <div key={g} className={g === 0 ? s.teamTop : s.team}>
          {group.map(({ m, idx }, i) => (
            <button
              key={m.photo}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`card ${s.member} reveal`}
              style={{ "--d": `${(i % 4) * 0.05}s` } as React.CSSProperties}
              id={`team-member-${idx}`}
              aria-haspopup="dialog"
            >
              <div className={s.memberPhoto}>
                <img src={m.photo} alt={m.name} loading="lazy" />
              </div>
              <div className={s.memberBody}>
                <h3>{m.name}</h3>
                {m.role && <p>{m.role}</p>}
                <span className={s.memberMore}>
                  View profile <Icon name="arrow" />
                </span>
              </div>
            </button>
          ))}
        </div>
      ))}

      {active && activeIdx !== null && (
        <div className={s.teamBackdrop} onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className={s.teamModal} role="dialog" aria-modal="true" aria-labelledby="team-modal-name">
            <button type="button" className={s.teamClose} onClick={close} aria-label="Close profile" id="team-modal-close">
              <Icon name="close" />
            </button>

            <aside className={s.teamModalSide}>
              <div className={s.teamModalImg}>
                <img src={active.photo} alt={active.name} />
              </div>
              <div className={s.teamModalNav}>
                <button type="button" onClick={prev} className={s.teamNavBtn} aria-label="Previous team member" id="team-modal-prev">
                  <Icon name="chevronLeft" /> Prev
                </button>
                <span>
                  {activeIdx + 1} / {TEAM.length}
                </span>
                <button type="button" onClick={next} className={s.teamNavBtn} aria-label="Next team member" id="team-modal-next">
                  Next <Icon name="chevronRight" />
                </button>
              </div>
            </aside>

            <div className={s.teamModalContent}>
              {active.role && <span className={s.teamModalRole}>{active.role}</span>}
              <h3 id="team-modal-name">{active.name}</h3>
              <div className={s.teamModalBio}>
                {active.bio.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
