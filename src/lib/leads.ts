// Lead submission → Google Apps Script → Google Sheet
// Includes an offline queue so leads captured on flaky event Wi-Fi are never lost.

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

const ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT || "";
const QUEUE_KEY = "aepl_lead_queue_v1";
const PROFILE_KEY = "aepl_lead_profile_v1";

async function post(data: Record<string, string>) {
  if (!ENDPOINT) throw new Error("NEXT_PUBLIC_SHEET_ENDPOINT is not configured");
  // URL-encoded body = "simple" CORS request → no preflight; Apps Script returns JSON.
  const res = await fetch(ENDPOINT, { method: "POST", body: new URLSearchParams(data) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.result !== "success") throw new Error(json.error || `HTTP ${res.status}`);
}

function readQueue(): Record<string, string>[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeQueue(q: Record<string, string>[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
}

/** Submits a lead. Resolves `{ queued: true }` if it was saved locally for later sync. */
export async function submitLead(p: LeadPayload): Promise<{ queued: boolean }> {
  if (p.website) return { queued: false }; // bot
  const data: Record<string, string> = {
    ...Object.fromEntries(Object.entries(p).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])),
    page: p.page || (typeof window !== "undefined" ? window.location.pathname : ""),
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
  try {
    await post(data);
    return { queued: false };
  } catch (err) {
    console.warn("Lead submit failed – queued locally", err);
    const q = readQueue();
    q.push(data);
    writeQueue(q);
    return { queued: true };
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
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop() || "brochure.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
