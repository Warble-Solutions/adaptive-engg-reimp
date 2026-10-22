"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "@/lib/content";
import s from "./HeroSlider.module.css";

const INTERVAL = 6000;
const HEADLINE = "Industry Leaders Trust Us";

/** Simple banner slider in the style of the original site: photo, centred green headline, white subtitle. */
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
            {k === 0 ? <h1 className={s.title}>{HEADLINE}</h1> : <h2 className={s.title}>{HEADLINE}</h2>}
            <p className={s.sub}>{sl.subtitle}</p>
          </div>
        </div>
      ))}

      <div className={s.dots} role="tablist" aria-label="Choose slide">
        {HERO_SLIDES.map((sl, k) => (
          <button
            key={sl.image}
            role="tab"
            aria-selected={k === i}
            aria-label={`Slide ${k + 1}: ${sl.subtitle}`}
            className={`${s.dot} ${k === i ? s.dotActive : ""}`}
            onClick={() => go(k)}
            id={`hero-dot-${k + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
