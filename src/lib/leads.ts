// Lead submission → Google Apps Script → Email (info@adaptive-engg.com, BCC: mayank & support)
// Includes automatic endpoint failover and an offline queue so leads on flaky Wi-Fi are never lost.

import { trackEvent } from "./analytics";

export type LeadType = "enquiry" | "brochure";

export type LeadPayload = {
  formType: LeadType;
  fullName: string;
  company: string;
  designation?: string;
  email: string;
  phone: string;
  city?: string;
  interest?: string;
  brochure?: string;
  message?: string;
  consent: "Yes" | "No";
  page?: string;
  website?: string; // honeypot
};

const SHEET_ENDPOINT =
  process.env.NEXT_PUBLIC_SHEET_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbwR-KCBcuaandvVGdd6zU40FIdxKlh254xI3a-GhEIHqRPCSGHZjm0uTDeeCokC8NeA/exec";

const CAREERS_ENDPOINT =
  process.env.NEXT_PUBLIC_CAREERS_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbwResOie7Udp8xPXEYPG_Y6Mq-_mxSaIQKnXCdxhxxn6matRmAO0cnqDr6PnS3gtIfaNA/exec";

const ENDPOINTS = Array.from(new Set([SHEET_ENDPOINT, CAREERS_ENDPOINT].filter(Boolean)));

const QUEUE_KEY = "aepl_lead_queue_v1";
const PROFILE_KEY = "aepl_lead_profile_v1";

class ScriptError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ScriptError";
  }
}

async function postToEndpoint(url: string, data: Record<string, string>) {
  // URL-encoded body = "simple" CORS request → no preflight; Apps Script returns JSON.
  const res = await fetch(url, {
    method: "POST",
    body: new URLSearchParams(data),
    redirect: "follow",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.result !== "success") {
    throw new ScriptError(json.error || `HTTP ${res.status}`);
  }
}

async function post(data: Record<string, string>) {
  if (ENDPOINTS.length === 0) throw new Error("Form endpoint is not configured");
  let lastErr: unknown;
  for (const url of ENDPOINTS) {
    try {
      await postToEndpoint(url, data);
      return;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

function readQueue(): Record<string, string>[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeQueue(q: Record<string, string>[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {}
}

/** Submits a lead. Resolves `{ queued: true }` if saved locally for later sync, or `{ ok: false, error }` if the script rejected it. */
export async function submitLead(p: LeadPayload): Promise<{ ok: boolean; queued: boolean; error?: string }> {
  if (p.website) return { ok: true, queued: false }; // bot
  const data: Record<string, string> = {
    ...Object.fromEntries(Object.entries(p).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])),
    page: p.page || (typeof window !== "undefined" ? window.location.pathname : ""),
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
  try {
    await post(data);
    trackEvent("generate_lead", {
      form_type: p.formType,
      interest: p.interest || p.brochure || "",
      page_location: data.page,
    });
    // Also flush any older queued leads now that the endpoint is working
    void flushQueue();
    return { ok: true, queued: false };
  } catch (err) {
    console.warn("Lead submit failed – queued locally", err);
    const q = readQueue();
    q.push(data);
    writeQueue(q);
    if (err instanceof ScriptError) {
      return { ok: false, queued: true, error: err.message };
    }
    return { ok: true, queued: true };
  }
}

let flushing = false;
export async function flushQueue() {
  if (flushing || typeof window === "undefined") return;
  flushing = true;
  try {
    const q = readQueue();
    while (q.length) {
      try {
        await post(q[0]);
        q.shift();
        writeQueue(q);
      } catch {
        break;
      }
    }
  } finally {
    flushing = false;
  }
}

// ---- Remember visitor details so repeat brochure downloads are one click ----
export type Profile = Pick<LeadPayload, "fullName" | "company" | "designation" | "email" | "phone" | "city">;

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  } catch {}
}
export function loadProfile(): Profile | null {
  try {
    const v = localStorage.getItem(PROFILE_KEY);
    return v ? (JSON.parse(v) as Profile) : null;
  } catch {
    return null;
  }
}

// ---- Validation shared by forms ----
export const validators = {
  fullName: (v: string) => v.trim().length >= 2 || "Please enter your name",
  company: (v: string) => v.trim().length >= 1 || "Please enter your company",
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email",
  phone: (v: string) =>
    (/^[+()\-\s\d]{7,20}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7) || "Please enter a valid phone number",
  required: (v: string) => v.trim().length > 0 || "This field is required",
};

export function triggerDownload(url: string) {
  const fileName = url.split("/").pop() || "brochure.pdf";
  trackEvent("file_download", {
    file_name: fileName,
    file_url: url,
  });
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
