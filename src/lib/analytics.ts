// Google Analytics 4 (gtag.js) helper.
// Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in .env.local / Netlify environment variables.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZNW038ZBRV";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, {
    page_path: path,
  });
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

