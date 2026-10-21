import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientInit from "@/components/ClientInit";
import { BrochureProvider } from "@/components/BrochureModal";
import { COMPANY } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "Adaptive Engineering Pvt. Ltd. | India's Market Leader in Renewable Energy Technology",
    template: "%s | Adaptive Engineering Pvt. Ltd.",
  },
  description:
    "AEPL – India's Market Leader in renewable energy technology. Plant SCADA, Power Plant Controllers (PPC), EMS for BESS, PM-KUSUM solutions and LT/MV panels. 90GW+ monitored, 60%+ market share.",
  keywords: ["SCADA", "Power Plant Controller", "PPC", "EMS BESS", "PM KUSUM", "LT MV panels", "renewable energy", "solar SCADA", "AEPL", "Adaptive Engineering"],
  icons: {
    icon: "/brand/icon-512.png",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    title: "Adaptive Engineering Pvt. Ltd. – India's Market Leader in Renewable Energy Technology",
    description: "SCADA • PPC • EMS • SAS • RMS • CMS • AMS • LT/MV Panels for Solar, Wind, BESS and Hybrid plants.",
    images: ["/hero/solar-bess.webp"],
    locale: "en_IN",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#118674",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.url,
  logo: `${COMPANY.url}/brand/logo.png`,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "21st Floor, Yash Anant, Opp. Old RBI, Ashram Road",
    addressLocality: "Ahmedabad",
    postalCode: "380009",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: Object.values(COMPANY.socials),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <BrochureProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </BrochureProvider>
        <ClientInit />
      </body>
    </html>
  );
}
