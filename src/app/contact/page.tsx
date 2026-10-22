import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { ContactSection, PageHero } from "@/components/Sections";
import { COMPANY } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Adaptive Engineering Pvt. Ltd., Ahmedabad – call +91 7969269000 or email info@adaptive-engg.com.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" image="/hero/solar-wind.webp" />

      <ContactSection title="Send us an enquiry" idPrefix="contact-enquiry" />

      <section className="section section-soft" aria-labelledby="visit-title" style={{ paddingTop: 64 }}>
        <div className="container">
          <h2 className="sr-only" id="visit-title">
            Visit us
          </h2>
          <div className={s.quick}>
            <div className={`card ${s.quickCard}`}>
              <span>
                <Icon name="phone" />
              </span>
              <div>
                <small>Call</small>
                <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </div>
            </div>
            <div className={`card ${s.quickCard}`}>
              <span>
                <Icon name="mail" />
              </span>
              <div>
                <small>Email</small>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
            </div>
            <div className={`card ${s.quickCard}`}>
              <span>
                <Icon name="pin" />
              </span>
              <div>
                <small>Head office</small>
                <p>{COMPANY.address.join(" ")}</p>
              </div>
            </div>
          </div>
          <div className={s.map}>
            <iframe
              title="Adaptive Engineering head office on Google Maps"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
