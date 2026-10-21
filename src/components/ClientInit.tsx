"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { flushQueue } from "@/lib/leads";

/** Adds `.in` to every `.reveal` element as it scrolls into view; also retries queued leads. */
export default function ClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    flushQueue();
    const id = window.setInterval(flushQueue, 30000);
    window.addEventListener("online", flushQueue);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("online", flushQueue);
    };
  }, []);

  return null;
}
