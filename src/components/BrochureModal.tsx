"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BROCHURES, type Brochure } from "@/lib/content";
import { loadProfile, saveProfile, submitLead, triggerDownload, validators, type Profile } from "@/lib/leads";
import Icon from "./Icon";
import s from "./BrochureModal.module.css";

type Ctx = { open: (id: keyof typeof BROCHURES) => void };
const BrochureCtx = createContext<Ctx>({ open: () => {} });
export const useBrochure = () => useContext(BrochureCtx);

type Values = Required<Profile> & { message: string; consent: boolean; website: string };
const blank: Values = { fullName: "", company: "", designation: "", email: "", phone: "", city: "", message: "", consent: false, website: "" };

export function BrochureProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<Brochure | null>(null);
  const [v, setV] = useState<Values>(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [known, setKnown] = useState<Profile | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((id: keyof typeof BROCHURES) => {
    lastFocus.current = document.activeElement as HTMLElement;
    const p = loadProfile();
    setKnown(p);
    setV(p ? { ...blank, ...p, designation: p.designation || "", city: p.city || "", consent: true } : blank);
    setErrors({});
    setDone(false);
    setItem(BROCHURES[id]);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    setTimeout(() => dialog.current?.querySelector<HTMLElement>("input,button")?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, close]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const send = async (vals: Values) => {
    if (!item) return;
    setBusy(true);
    const profile: Profile = {
      fullName: vals.fullName.trim(),
      company: vals.company.trim(),
      designation: vals.designation.trim(),
      email: vals.email.trim(),
      phone: vals.phone.trim(),
      city: vals.city.trim(),
    };
    // Lead is recorded (or queued offline) – download is never blocked.
    await submitLead({
      formType: "brochure",
      ...profile,
      brochure: item.title,
      message: vals.message.trim(),
      consent: vals.consent ? "Yes" : "No",
      website: vals.website,
    });
    saveProfile(profile);
    triggerDownload(item.file);
    setBusy(false);
    setDone(true);
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Partial<Record<keyof Values, string>> = {};
    const chk = (k: keyof Values, r: true | string) => r !== true && (e[k] = r);
    chk("fullName", validators.fullName(v.fullName));
    chk("company", validators.company(v.company));
    chk("email", validators.email(v.email));
    chk("phone", validators.phone(v.phone));
    chk("designation", validators.required(v.designation));
    chk("city", validators.required(v.city));
    if (!v.consent) e.consent = "Please provide consent to continue";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`br-${first}`)?.focus();
      return;
    }
    await send(v);
  };

  const field = (k: keyof Values, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, required = true) => (
    <div className={`field ${errors[k] ? "invalid" : ""}`}>
      <label htmlFor={`br-${k}`}>
        {label} {required && <span className="req">*</span>}
      </label>
      <input
        id={`br-${k}`}
        className="input"
        value={v[k] as string}
        onChange={(e) => set(k, e.target.value as never)}
        aria-invalid={!!errors[k]}
        {...props}
      />
      {errors[k] && <span className="err">{errors[k]}</span>}
    </div>
  );

  return (
    <BrochureCtx.Provider value={{ open }}>
      {children}
      {item && (
        <div className={s.backdrop} onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className={s.dialog} role="dialog" aria-modal="true" aria-labelledby="br-title" ref={dialog}>
            <button className={s.close} onClick={close} aria-label="Close" id="br-close">
              <Icon name="close" />
            </button>

            <aside className={s.side}>
              { }
              <img src={item.thumb} alt={`${item.title} – cover`} />
              <div>
                <span className="chip">
                  <Icon name="file" width={14} height={14} /> PDF Brochure
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </aside>

            <div className={s.body}>
              {done ? (
                <div className="form-success" role="status" aria-live="polite">
                  <div className="tick">
                    <Icon name="download" />
                  </div>
                  <h3 className="h3" id="br-title">
                    Your download has started
                  </h3>
                  <p className="lead" style={{ marginTop: 10 }}>
                    Thank you for your interest in AEPL. Our team will reach out if you&apos;d like to discuss your project.
                  </p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
                    <a className="btn btn-outline" href={item.file} download id="br-retry">
                      Download again
                    </a>
                    <button className="btn" onClick={close} id="br-done">
                      Done
                    </button>
                  </div>
                </div>
              ) : known ? (
                <div className={s.known}>
                  <h3 className="h3" id="br-title">
                    Download {item.title}
                  </h3>
                  <p className="lead">
                    Welcome back, <strong>{known.fullName}</strong>. We&apos;ll use the details you shared earlier
                    {known.company ? ` (${known.company})` : ""}.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                    <button className="btn" onClick={() => send(v)} disabled={busy} id="br-quick-download">
                      {busy ? <span className="spinner" /> : <Icon name="download" />}
                      {busy ? "Preparing…" : "Download now"}
                    </button>
                    <button className="btn btn-outline" onClick={() => setKnown(null)} id="br-not-me">
                      Not you? Edit details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate id="brochure-form">
                  <h3 className="h3" id="br-title">
                    Download {item.title}
                  </h3>
                  <p className={s.sub}>Share a few details and your download will start instantly.</p>
                  <div className="form-grid">
                    {field("fullName", "Full name", { autoComplete: "name" })}
                    {field("phone", "Phone", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
                    {field("email", "Email", { type: "email", inputMode: "email", autoComplete: "email" })}
                    {field("company", "Company name", { autoComplete: "organization" })}
                    {field("designation", "Designation", { autoComplete: "organization-title" })}
                    {field("city", "City", { autoComplete: "address-level2" })}
                    <div className="field full">
                      <label htmlFor="br-message">Comment or message</label>
                      <textarea id="br-message" className="textarea" rows={2} style={{ minHeight: 70 }} value={v.message} onChange={(e) => set("message", e.target.value)} />
                    </div>
                    <div className="hp" aria-hidden="true">
                      <input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
                    </div>
                    <div className="full">
                      <label className="check" htmlFor="br-consent">
                        <input id="br-consent" type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} />
                        <span>
                          I agree to be contacted by Adaptive Engineering. <span className="req">*</span>
                        </span>
                      </label>
                      {errors.consent && <span className="err">{errors.consent}</span>}
                    </div>
                    <div className="full">
                      <button type="submit" className="btn" disabled={busy} style={{ width: "100%" }} id="br-submit">
                        {busy ? <span className="spinner" /> : <Icon name="download" />}
                        {busy ? "Preparing download…" : "Download Brochure"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </BrochureCtx.Provider>
  );
}

/** Button that opens the gated download form for a brochure. */
export function BrochureButton({
  id,
  children,
  className = "btn",
  buttonId,
}: {
  id: keyof typeof BROCHURES;
  children?: React.ReactNode;
  className?: string;
  buttonId?: string;
}) {
  const { open } = useBrochure();
  return (
    <button type="button" className={className} onClick={() => open(id)} id={buttonId ?? `download-${id}`}>
      {children ?? (
        <>
          Learn More <Icon name="download" />
        </>
      )}
    </button>
  );
}
