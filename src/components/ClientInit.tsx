"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent, trackPageView } from "@/lib/analytics";
import { flushQueue } from "@/lib/leads";

/** Adds `.in` to every `.reveal` element as it scrolls into view; also retries queued leads and tracks GA4 page views. */
export default function ClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
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

  // GA4: track clicks on phone, email and WhatsApp links anywhere on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const params = { link_url: href, page_location: window.location.pathname };
      if (href.startsWith("tel:")) trackEvent("click_to_call", params);
      else if (href.startsWith("mailto:")) trackEvent("click_email", params);
      else if (/wa\.me|whatsapp/i.test(href)) trackEvent("click_whatsapp", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
