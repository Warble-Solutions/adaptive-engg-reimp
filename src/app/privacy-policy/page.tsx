import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { COMPANY } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Adaptive Engineering Pvt. Ltd. collects, uses and protects the personal information you share on this website.",
  alternates: { canonical: "/privacy-policy/" },
};

const UPDATED = "31 October 2026";

export default function PrivacyPolicyPage() {
  const email = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;
  return (
    <>
      <PageHero title="Privacy Policy" image="/hero/scada.webp" />

      <section className="section">
        <div className="container">
          <article className={s.legal}>
            <p className={s.updated}>Last updated: {UPDATED}</p>

            <p>
              {COMPANY.name} (&quot;AEPL&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what personal information we
              collect through this website, why we collect it, and how we look after it.
            </p>

            <h2>1. Information we collect</h2>
            <p>We only collect information that you choose to give us through the forms on this website:</p>
            <ul>
              <li>
                <strong>Enquiry / Contact forms:</strong> name, company, designation, email, phone number, city, the solution you are interested in, your
                message and your consent to be contacted.
              </li>
              <li>
                <strong>Brochure and case study downloads:</strong> name, phone number, email, company, designation, city, an optional message, your consent
                and the document you downloaded.
              </li>
              <li>
                <strong>Job applications:</strong> the position, your name, email, phone number, city, years of experience, and the resume and cover letter
                you upload.
              </li>
            </ul>
            <p>
              With each form we also record the page it was sent from, the date and time, and your browser type, to help us handle and secure submissions.
            </p>

            <h2>2. How we use your information</h2>
            <ul>
              <li>To respond to your enquiry and discuss your requirements.</li>
              <li>To send you the brochures and case studies you request, and to follow up on your interest.</li>
              <li>To assess job applications and contact candidates.</li>
              <li>To improve our website, products and services.</li>
              <li>To meet legal or regulatory obligations.</li>
            </ul>
            <p>We do not sell or rent your personal information, and we do not use it for third-party advertising.</p>

            <h2>3. Where your information is stored</h2>
            <p>
              Form submissions are sent securely to Google services (Google Sheets and Google Workspace / Gmail) operated on our behalf, and are accessible
              only to authorised AEPL staff and our website support partner. The website is hosted on Netlify. These providers process data under their own
              security and privacy commitments.
            </p>

            <h2>4. Cookies and storage on your device</h2>
            <p>This website does not use advertising or analytics cookies. To make the site easier to use, it stores a small amount of data in your browser:</p>
            <ul>
              <li>The details you entered in a download form, so you don&apos;t need to type them again for the next download.</li>
              <li>A form you submitted while offline, so it can be sent automatically once you are back online.</li>
            </ul>
            <p>You can clear this at any time by clearing your browser&apos;s site data.</p>
            <p>
              Some pages show embedded content from third parties – YouTube videos (loaded only when you press play, using YouTube&apos;s privacy-enhanced
              mode) and Google Maps on the Contact page. These services may set their own cookies under their own privacy policies.
            </p>

            <h2>5. How long we keep it</h2>
            <p>
              We keep enquiry and download details for as long as needed to respond to you and maintain our business relationship, and job applications for
              as long as needed for recruitment. You can ask us to delete your information at any time.
            </p>

            <h2>6. Your rights</h2>
            <p>
              In line with applicable law, including India&apos;s Digital Personal Data Protection Act, 2023, you may ask us to access, correct or delete the
              personal information we hold about you, or withdraw your consent to be contacted. Email us at {email} and we will respond within a reasonable
              time.
            </p>

            <h2>7. Security</h2>
            <p>
              We use reasonable technical and organisational measures to protect your information, including encrypted (HTTPS) transmission and restricted
              access. No method of transmission over the internet is completely secure, but we work to protect your data.
            </p>

            <h2>8. Children</h2>
            <p>This website is intended for business users and is not directed at children under 18.</p>

            <h2>9. Changes to this policy</h2>
            <p>We may update this policy from time to time. The latest version will always be available on this page, with the date it was last updated.</p>

            <h2>10. Contact us</h2>
            <p>
              For any questions or requests about your personal information, contact {COMPANY.name}, {COMPANY.address.join(" ")} – email {email} or call{" "}
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.
            </p>
            <p>
              See also our <Link href="/terms-and-conditions/">Terms &amp; Conditions</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

