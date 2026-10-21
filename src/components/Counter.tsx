"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

const fmt = (n: number) => n.toLocaleString("en-IN");

/** Animated number that counts up once when scrolled into view. */
export default function Counter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(stat.value); // SSR shows final value (good for SEO / no-JS)

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = requestAnimationFrame(() => setVal(0));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(stat.value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat.value]);

  return (
    <span ref={ref} className={className}>
      {stat.prefix}
      {fmt(val)}
      <span className="stat-suffix">{stat.suffix}</span>
    </span>
  );
}
