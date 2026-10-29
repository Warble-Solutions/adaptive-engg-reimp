"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/content";
import { JOBS } from "@/lib/careers";
import { validators } from "@/lib/leads";
import Icon from "./Icon";

// Google Apps Script web app (see /apps-script/careers.gs). It emails the application,
// with resume + cover letter attached, to the HR recipients configured in that script.
const ENDPOINT = process.env.NEXT_PUBLIC_CAREERS_ENDPOINT || "";

const MAX_BYTES = 3 * 1024 * 1024; // per file
const ALLOWED = [".pdf", ".doc", ".docx"];

type Values = {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof Values | "resume" | "coverLetter", string>>;

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] || "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

const fileProblem = (f: File | null, label: string) => {
  if (!f) return `Please attach your ${label}`;
  const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED.includes(ext)) return "Only PDF, DOC or DOCX files are accepted";
  if (f.size > MAX_BYTES) return "File is too large (max 3 MB)";
  return true as const;
};

export default function ApplyForm({ defaultPosition = "", idPrefix = "apply" }: { defaultPosition?: string; idPrefix?: string }) {
  const [v, setV] = useState<Values>({ position: defaultPosition, fullName: "", email: "", phone: "", city: "", experience: "", website: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    const chk = (k: keyof Errors, r: true | string) => {
      if (r !== true) e[k] = r;
    };
    if (!v.position) e.position = "Please choose a position";
    chk("fullName", validators.fullName(v.fullName));
    chk("email", validators.email(v.email));
    chk("phone", validators.phone(v.phone));
    chk("resume", fileProblem(resume, "resume"));
    if (cover) chk("coverLetter", fileProblem(cover, "cover letter")); // optional
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`${idPrefix}-${first}`)?.focus();
    return !first;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (v.website) return; // bot
    if (!validate() || !resume) return;
    setBusy(true);
    setFailed(false);
    try {
      if (!ENDPOINT) throw new Error("NEXT_PUBLIC_CAREERS_ENDPOINT is not configured");
      const [resumeData, coverData] = await Promise.all([toBase64(resume), cover ? toBase64(cover) : Promise.resolve("")]);
      const body = new URLSearchParams({
        position: v.position,
        fullName: v.fullName.trim(),
        email: v.email.trim(),
        phone: v.phone.trim(),
        city: v.city.trim(),
        experience: v.experience.trim(),
        website: v.website,
        resumeName: resume.name,
        resumeType: resume.type,
        resumeData,
        ...(cover ? { coverLetterName: cover.name, coverLetterType: cover.type, coverLetterData: coverData } : {}),
        page: window.location.pathname,
        submittedAt: new Date().toISOString(),
      });
      // URL-encoded body = "simple" CORS request → no preflight; Apps Script returns JSON.
      const res = await fetch(ENDPOINT, { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.result !== "success") throw new Error(json.error || `HTTP ${res.status}`);
      setDone(true);
    } catch (err) {
      console.warn("Application submit failed", err);
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="tick">
          <Icon name="check" />
        </div>
        <h3 className="h3">Application received!</h3>
        <p className="lead" style={{ marginTop: 10 }}>
          Thank you for applying{v.position ? ` for ${v.position}` : ""}. Our HR team will review your profile and get in touch if it is a good match.
        </p>
      </div>
    );
  }

  const F = (k: keyof Errors) => ({
    id: `${idPrefix}-${k}`,
    name: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${idPrefix}-${k}-err` : undefined,
  });
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span className="err" id={`${idPrefix}-${k}-err`}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate id={`${idPrefix}-form`}>
      <div className="form-grid">
        <div className={`field full ${errors.position ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-position`}>
            Position applying for <span className="req">*</span>
          </label>
          <select className="select" value={v.position} onChange={(e) => set("position", e.target.value)} {...F("position")}>
            <option value="" disabled>
              Select a position
            </option>
            {JOBS.map((j) => (
              <option key={j.slug} value={j.title}>
                {j.title}
              </option>
            ))}
          </select>
          {err("position")}
        </div>
        <div className={`field ${errors.fullName ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-fullName`}>
            Full name <span className="req">*</span>
          </label>
          <input className="input" autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} {...F("fullName")} />
          {err("fullName")}
        </div>
        <div className={`field ${errors.email ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-email`}>
            Email <span className="req">*</span>
          </label>
          <input className="input" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...F("email")} />
          {err("email")}
        </div>
        <div className={`field ${errors.phone ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-phone`}>
            Phone / WhatsApp <span className="req">*</span>
          </label>
          <input className="input" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...F("phone")} />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-city`}>Current city</label>
          <input className="input" autoComplete="address-level2" value={v.city} onChange={(e) => set("city", e.target.value)} {...F("city")} />
        </div>
        <div className="field full">
          <label htmlFor={`${idPrefix}-experience`}>Total experience (years)</label>
          <input className="input" inputMode="decimal" placeholder="e.g. 0, 1.5, 4" value={v.experience} onChange={(e) => set("experience", e.target.value)} {...F("experience")} />
        </div>
        <div className={`field ${errors.resume ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-resume`}>
            Resume / CV <span className="req">*</span>
          </label>
          <input
            className="input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              setResume(e.target.files?.[0] || null);
              if (errors.resume) setErrors((x) => ({ ...x, resume: undefined }));
            }}
            {...F("resume")}
          />
          {err("resume")}
        </div>
        <div className={`field ${errors.coverLetter ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-coverLetter`}>
            Cover letter <span style={{ fontWeight: 500, color: "var(--muted)" }}>(optional)</span>
          </label>
          <input
            className="input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              setCover(e.target.files?.[0] || null);
              if (errors.coverLetter) setErrors((x) => ({ ...x, coverLetter: undefined }));
            }}
            {...F("coverLetter")}
          />
          {err("coverLetter")}
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input id={`${idPrefix}-website`} tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
        </div>

        {failed && (
          <div className="full err" role="alert" style={{ fontSize: 14 }}>
            Sorry, we couldn&apos;t send your application just now. Please try again, or email your resume and cover letter to{" "}
            <a href={`mailto:${COMPANY.email}`} style={{ textDecoration: "underline" }}>
              {COMPANY.email}
            </a>
            .
          </div>
        )}

        <div className="full" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button type="submit" className="btn" disabled={busy} id={`${idPrefix}-submit`}>
            {busy ? <span className="spinner" /> : null}
            {busy ? "Sending…" : "Submit Application"}
            {!busy && <Icon name="arrow" />}
          </button>
          <span className="form-note">PDF, DOC or DOCX · max 3 MB per file. Your details are used only for recruitment.</span>
        </div>
      </div>
    </form>
  );
}
