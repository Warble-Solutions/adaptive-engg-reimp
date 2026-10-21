"use client";

import { useState } from "react";
import { INTEREST_OPTIONS } from "@/lib/content";
import { saveProfile, submitLead, validators } from "@/lib/leads";
import Icon from "./Icon";

type Values = {
  fullName: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
  consent: boolean;
  website: string;
};

const empty: Values = {
  fullName: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  city: "",
  interest: "",
  message: "",
  consent: false,
  website: "",
};

export default function EnquiryForm({ idPrefix = "enquiry" }: { idPrefix?: string }) {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { queued: boolean }>(null);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Values, string>> = {};
    const chk = (k: keyof Values, r: true | string) => {
      if (r !== true) e[k] = r;
    };
    chk("fullName", validators.fullName(v.fullName));
    chk("company", validators.company(v.company));
    chk("email", validators.email(v.email));
    chk("phone", validators.phone(v.phone));
    if (!v.interest) e.interest = "Please choose an option";
    if (!v.consent) e.consent = "Please provide consent so we can contact you";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`${idPrefix}-${first}`)?.focus();
    return !first;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);
    const res = await submitLead({
      formType: "enquiry",
      fullName: v.fullName.trim(),
      company: v.company.trim(),
      designation: v.designation.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      city: v.city.trim(),
      interest: v.interest,
      message: v.message.trim(),
      consent: v.consent ? "Yes" : "No",
      website: v.website,
    });
    saveProfile({
      fullName: v.fullName.trim(),
      company: v.company.trim(),
      designation: v.designation.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      city: v.city.trim(),
    });
    setBusy(false);
    setDone(res);
  };

  if (done) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="tick">
          <Icon name="check" />
        </div>
        <h3 className="h3">Thank you!</h3>
        <p className="lead" style={{ marginTop: 10 }}>
          {done.queued
            ? "Your enquiry has been saved and will be sent automatically as soon as the connection is back. Our team will get in touch with you shortly."
            : "Your enquiry has been received. Our team will get in touch with you shortly."}
        </p>
        <button
          className="btn btn-outline"
          style={{ marginTop: 24 }}
          onClick={() => {
            setV(empty);
            setDone(null);
          }}
          id={`${idPrefix}-again`}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const F = (k: keyof Values) => ({
    id: `${idPrefix}-${k}`,
    name: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${idPrefix}-${k}-err` : undefined,
  });
  const err = (k: keyof Values) =>
    errors[k] ? (
      <span className="err" id={`${idPrefix}-${k}-err`}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate id={`${idPrefix}-form`}>
      <div className="form-grid">
        <div className={`field ${errors.fullName ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-fullName`}>
            Full name <span className="req">*</span>
          </label>
          <input className="input" autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} {...F("fullName")} />
          {err("fullName")}
        </div>
        <div className={`field ${errors.company ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-company`}>
            Company / organisation <span className="req">*</span>
          </label>
          <input className="input" autoComplete="organization" value={v.company} onChange={(e) => set("company", e.target.value)} {...F("company")} />
          {err("company")}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-designation`}>Designation</label>
          <input className="input" autoComplete="organization-title" value={v.designation} onChange={(e) => set("designation", e.target.value)} {...F("designation")} />
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
          <label htmlFor={`${idPrefix}-city`}>City</label>
          <input className="input" autoComplete="address-level2" value={v.city} onChange={(e) => set("city", e.target.value)} {...F("city")} />
        </div>
        <div className={`field full ${errors.interest ? "invalid" : ""}`}>
          <label htmlFor={`${idPrefix}-interest`}>
            Product / service of interest <span className="req">*</span>
          </label>
          <select className="select" value={v.interest} onChange={(e) => set("interest", e.target.value)} {...F("interest")}>
            <option value="" disabled>
              Select an option
            </option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {err("interest")}
        </div>
        <div className="field full">
          <label htmlFor={`${idPrefix}-message`}>Message / requirements</label>
          <textarea className="textarea" rows={4} value={v.message} onChange={(e) => set("message", e.target.value)} {...F("message")} />
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input id={`${idPrefix}-website`} tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
        </div>

        <div className="full">
          <label className="check" htmlFor={`${idPrefix}-consent`}>
            <input type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} {...F("consent")} />
            <span>
              I agree to be contacted by Adaptive Engineering regarding my enquiry. <span className="req">*</span>
            </span>
          </label>
          {err("consent")}
        </div>

        <div className="full" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button type="submit" className="btn" disabled={busy} id={`${idPrefix}-submit`}>
            {busy ? <span className="spinner" /> : null}
            {busy ? "Sending…" : "Submit Enquiry"}
            {!busy && <Icon name="arrow" />}
          </button>
          <span className="form-note">We endeavour to answer all enquiries within 24 hours on business days.</span>
        </div>
      </div>
    </form>
  );
}
