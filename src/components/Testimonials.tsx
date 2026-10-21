"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/content";
import Icon from "./Icon";
import s from "./Testimonials.module.css";

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 24), behavior: "smooth" });
  };

  return (
    <div className={s.wrap}>
      <div className={s.track} ref={track}>
        {TESTIMONIALS.map((t) => (
          <figure key={t.company} className={s.card}>
            <Icon name="quote" className={s.q} />
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className={s.avatar}>{t.company.charAt(0)}</span>
              <span>
                <strong>{t.company}</strong>
                <em>{t.role}</em>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={s.nav}>
        <button onClick={() => scroll(-1)} disabled={atStart} aria-label="Previous testimonial" id="testimonial-prev">
          <Icon name="chevronLeft" />
        </button>
        <button onClick={() => scroll(1)} disabled={atEnd} aria-label="Next testimonial" id="testimonial-next">
          <Icon name="chevronRight" />
        </button>
      </div>
    </div>
  );
}
