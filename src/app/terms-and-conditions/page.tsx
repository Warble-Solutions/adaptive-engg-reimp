import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Sections";
import { COMPANY } from "@/lib/content";
import s from "../inner.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Adaptive Engineering Pvt. Ltd. website and its downloadable content.",
  alternates: { canonical: "/terms-and-conditions/" },
};

const UPDATED = "31 October 2026";

export default function TermsPage() {
  const email = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;
  return (
    <>
      <PageHero title="Terms & Conditions" image="/hero/scada.webp" />

      <section className="section">
        <div className="container">
          <article className={s.legal}>
            <p className={s.updated}>Last updated: {UPDATED}</p>

            <p>
              These terms apply to your use of this website, operated by {COMPANY.name} (&quot;AEPL&quot;, &quot;we&quot;, &quot;us&quot;). By using the
              website you agree to these terms. If you do not agree, please do not use the website.
            </p>

            <h2>1. Use of the website</h2>
            <p>
              You may use this website to learn about AEPL, our solutions and careers, and to contact us. You agree not to misuse the website – for example by
              attempting to gain unauthorised access, interfering with its operation, or submitting false, unlawful or harmful information through its forms.
            </p>

            <h2>2. Intellectual property</h2>
            <p>
              All content on this website – including text, images, logos, product names, brochures, case studies and videos – is owned by or licensed to AEPL
              and is protected by copyright and trademark laws. Third-party names and logos (for example, client logos) belong to their respective owners.
            </p>

            <h2>3. Brochures and case studies</h2>
            <p>
              Documents downloaded from this website are provided for your information when evaluating AEPL&apos;s solutions. You may keep and share them for
              that purpose, but you may not modify them, remove AEPL branding, or reproduce them for commercial use without our written permission.
            </p>

            <h2>4. Accuracy of information</h2>
            <p>
              We work to keep the information on this website accurate and up to date, but it is provided for general information only. Figures, specifications
              and project details are indicative and may change without notice. Nothing on this website is an offer or a binding commitment – the terms of any
              project are set out in a written agreement with AEPL.
            </p>

            <h2>5. Job applications</h2>
            <p>
              Submitting an application does not guarantee an interview or employment. Please make sure the information and documents you send are accurate
              and your own.
            </p>

            <h2>6. Third-party links and content</h2>
            <p>
              This website may link to or embed content from third parties, such as YouTube, Google Maps and social media. We are not responsible for their
              content, availability or privacy practices.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              The website is provided &quot;as is&quot;. To the fullest extent permitted by law, AEPL is not liable for any loss or damage arising from your use
              of, or inability to use, this website or its content.
            </p>

            <h2>8. Privacy</h2>
            <p>
              How we handle the personal information you share with us is explained in our <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>

            <h2>9. Governing law</h2>
            <p>These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts at Ahmedabad, Gujarat.</p>

            <h2>10. Changes and contact</h2>
            <p>
              We may update these terms from time to time; the latest version will always be on this page. For any questions, contact us at {email} or{" "}
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

