"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HEADLINE_STATS, HERO_SLIDES } from "@/lib/content";
import Icon from "./Icon";
import s from "./HeroSlider.module.css";

const INTERVAL = 6500;

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = HERO_SLIDES.length;

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(i + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, paused, go]);

  return (
    <section
      className={s.hero}
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {HERO_SLIDES.map((sl, k) => (
        <div
          key={sl.image}
          className={`${s.slide} ${k === i ? s.active : ""}`}
          aria-hidden={k !== i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${k + 1} of ${n}`}
        >
          <img
            src={sl.image}
            alt=""
            className={s.bg}
            fetchPriority={k === 0 ? "high" : "low"}
            loading={k === 0 ? "eager" : "lazy"}
          />
          <div className={s.overlay} />
          <div className={`container ${s.content}`}>
            <span className={s.eyebrow}>{sl.eyebrow}</span>
            {k === 0 ? <h1 className={s.title}>{sl.title}</h1> : <h2 className={s.title}>{sl.title}</h2>}
            <p className={s.text}>{sl.text}</p>
            <div className={s.ctas}>
              <Link href={sl.cta.href} className="btn btn-amber" tabIndex={k === i ? 0 : -1}>
                {sl.cta.label} <Icon name="arrow" />
              </Link>
              <Link href="/contact/" className="btn btn-ghost-light" tabIndex={k === i ? 0 : -1}>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className={`container ${s.controls}`}>
        <div className={s.dots} role="tablist" aria-label="Choose slide">
          {HERO_SLIDES.map((sl, k) => (
            <button
              key={sl.image}
              role="tab"
              aria-selected={k === i}
              aria-label={`Slide ${k + 1}: ${sl.eyebrow}`}
              className={`${s.dot} ${k === i ? s.dotActive : ""}`}
              onClick={() => go(k)}
              id={`hero-dot-${k + 1}`}
            >
              <span style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }} />
            </button>
          ))}
        </div>
        <div className={s.arrows}>
          <button onClick={() => go(i - 1)} aria-label="Previous slide" id="hero-prev">
            <Icon name="chevronLeft" />
          </button>
          <button onClick={() => go(i + 1)} aria-label="Next slide" id="hero-next">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>

      <div className={s.statsBar}>
        <div className={`container ${s.statsInner}`}>
          {HEADLINE_STATS.map((st) => (
            <div key={st.label} className={s.stat}>
              <strong>
                {st.value.toLocaleString("en-IN")}
                {st.suffix}
              </strong>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
