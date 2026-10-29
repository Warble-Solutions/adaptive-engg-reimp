// ============================================================================
//  SITE CONTENT — single source of truth.
//  Numbers come from the latest AEPL brochures/flyers (REI 2026 set).
// ============================================================================

export const COMPANY = {
  name: "Adaptive Engineering Pvt. Ltd.",
  short: "AEPL",
  tagline: "Result Oriented • Service Driven",
  headline: "India's Market Leader in Renewable Energy Technology",
  phone: "+91 7969269000",
  phoneHref: "tel:+917969269000",
  email: "info@adaptive-engg.com",
  address: ["21st Floor, \"Yash Anant\",", "Opp. Old RBI, Ashram Road,", "Ahmedabad - 380009,", "Gujarat, India"],
  mapQuery: "Adaptive Engineering Pvt. Ltd., 21st Floor, Yash Anant, Opp. Old RBI, Ashram Road, Navrangpura, Ahmedabad, Gujarat 380009",
  url: "https://adaptive-engg.com",
  portfolio: ["SCADA", "PPC", "EMS", "SAS", "RMS", "CMS", "AMS", "LT/MV Panels"],
  segments: ["Solar", "Wind", "BESS", "Hybrid"],
  socials: {
    linkedin: "https://www.linkedin.com/company/adaptive-engineering-pvt-ltd/",
    youtube: "https://www.youtube.com/@AdaptiveEngineeringPvt.Ltd.",
    facebook: "https://www.facebook.com/profile.php?id=61551473856862",
    instagram: "https://www.instagram.com/adaptive_engg_pvt_ltd",
    x: "https://x.com/Adaptive_Engg/",
  },
  youtubeChannelId: "UCXXx_3j3hYUxzHeo5IHL12A",
  aboutVideoId: "xGRlPBasltI",
};

export type Stat = { value: number; prefix?: string; suffix: string; label: string; decimals?: number };

/** Achievements – from the Corporate Brochure (cover + "Who we are"). */
export const STATS: Stat[] = [
  { value: 16, suffix: "+", label: "Years of Expertise" },
  { value: 60, suffix: "%+", label: "Market Share" },
  { value: 90, suffix: "GW+", label: "Monitored" },
  { value: 8, suffix: "GWh+", label: "EMS-BESS" },
  { value: 15000, suffix: "+", label: "Panels Delivered" },
  { value: 500, suffix: "+", label: "Customers" },
  { value: 2500, suffix: "+", label: "Sites" },
  { value: 2, suffix: " Lacs sq.ft+", label: "State of the Art, Dust Free Manufacturing Facility" },
  { value: 750, suffix: "+", label: "Commissioned Projects" },
  { value: 450, suffix: "+", label: "Manpower" },
  { value: 40, suffix: "GW", label: "Annual Execution Capacity" },
  { value: 1000000, suffix: "+", label: "Tags in a Single Project" },
];

const stat = (label: string) => STATS.find((x) => x.label === label)!;
export const HEADLINE_STATS: Stat[] = [stat("Monitored"), stat("Market Share"), stat("Sites"), stat("Years of Expertise")];

export const ABOUT = {
  intro:
    "Adaptive Engineering Pvt. Ltd. (AEPL) is India's Market Leader in renewable energy automation, control, and electrical solutions, delivering technology that powers utility-scale clean energy infrastructure. All engineered and manufactured in-house in our state of the art, dust free manufacturing facility to ensure performance, reliability, and seamless integration.",
  more: [
    "With over 16 years of domain expertise and an installed base exceeding 90GW, AEPL has become the engineering partner of choice for India's largest solar, wind, BESS, and hybrid energy projects.",
    "Proven across 750+ commissioned projects, our solutions are backed by a team of 450+ manpower and an annual execution capacity exceeding 40GW.",
    "Our integrated portfolio includes SCADA, Power Plant Controllers (PPC), Energy Management Systems (EMS) for BESS, Substation Automation (SAS), RMS for PM KUSUM, Central Monitoring System (CMS), Asset Management System (AMS) and LT/MV panels.",
    "As India advances toward its 500GW+ renewable energy vision, AEPL continues to enable the energy transition through engineering excellence, innovation, and execution at scale.",
  ],
  vision: "Embrace technology to maximize value",
  mission: "Continuously evolve to maximize the value of each installation",
  tagline: "Engineering the backbone of India's clean energy",
};

export const VALUES = [
  { letter: "S", title: "Speed" },
  { letter: "C", title: "Courage & Commitment" },
  { letter: "A", title: "Adapt" },
  { letter: "L", title: "Liveliness" },
  { letter: "E", title: "Evolve to Excel" },
];

export const ADVANTAGES = [
  { title: "Expertise in complete Electrical and Automation Solutions", icon: "cpu" },
  { title: "Customized solutions based on client's needs and challenges", icon: "bulb" },
  { title: "Strong track record of delivering quality projects", icon: "shield" },
  { title: "OEM partnerships for best-in-class hardware", icon: "layers" },
] as const;

// ---------------------------------------------------------------------------
//  Brochures (files live in /public/brochures)
// ---------------------------------------------------------------------------
export type Brochure = { id: string; title: string; file: string; thumb: string; desc: string };

export const BROCHURES: Record<string, Brochure> = {
  corporate: {
    id: "corporate",
    title: "AEPL Corporate Brochure",
    file: "/brochures/aepl-corporate-brochure.pdf",
    thumb: "/brochures/thumbs/aepl-corporate-brochure.webp",
    desc: "Company overview, Unified Renewable Solution, PM-KUSUM and LT/MV panels.",
  },
  scada: {
    id: "scada",
    title: "Plant SCADA",
    file: "/brochures/aepl-plant-scada.pdf",
    thumb: "/brochures/thumbs/aepl-plant-scada.webp",
    desc: "One platform for Engineering, Operations, O&M and Enterprise.",
  },
  ppc: {
    id: "ppc",
    title: "Power Plant Controller (PPC)",
    file: "/brochures/aepl-power-plant-controller.pdf",
    thumb: "/brochures/thumbs/aepl-power-plant-controller.webp",
    desc: "India's first HIL tested PPC – proven in every trial, till COD and beyond.",
  },
  ems: {
    id: "ems",
    title: "EMS for BESS",
    file: "/brochures/aepl-ems-bess.pdf",
    thumb: "/brochures/thumbs/aepl-ems-bess.webp",
    desc: "Advanced control, monitoring and intelligence for battery energy storage.",
  },
  panels: {
    id: "panels",
    title: "LT/MV Panels",
    file: "/brochures/aepl-lt-mv-panels.pdf",
    thumb: "/brochures/thumbs/aepl-lt-mv-panels.webp",
    desc: "Type-tested LT (800V/415V) and MV (33kV/11kV) panels for renewables.",
  },
  kusum: {
    id: "kusum",
    title: "PM-KUSUM Solutions",
    file: "/brochures/aepl-pm-kusum.pdf",
    thumb: "/brochures/thumbs/aepl-pm-kusum.webp",
    desc: "One stop solution – RMS, CMS, AMS, ReportWiz, WMS and LT/MV panels.",
  },
};

// ---------------------------------------------------------------------------
//  Solutions (REI 2026 focus only)
// ---------------------------------------------------------------------------
export type Solution = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  image: string;
  brochure: keyof typeof BROCHURES;
  highlights: { value: string; label: string }[];
  groups: { title: string; items: string[] }[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "plant-scada",
    name: "Plant SCADA",
    short: "SCADA",
    tagline: "Complete visibility. Reliable data. Smarter plant decisions.",
    summary:
      "One platform across Engineering, Operations, O&M and Enterprise – built on the experience of 90GW+ and engineered for scale, from portfolio to plant to device.",
    image: "/solutions/scada.webp",
    brochure: "scada",
    highlights: [
      { value: "90GW+", label: "Monitored" },
      { value: "10,00,000+", label: "Tags in a single project" },
      { value: "60%+", label: "Market share" },
    ],
    groups: [
      {
        title: "One platform",
        items: [
          "Engineering – standard library, first time-right FAT/SAT",
          "Operations – clear plant state at a glance, safe control",
          "O&M – faster fault finding, less downtime",
          "Enterprise – portfolio visibility, maximum utilization of assets",
        ],
      },
      {
        title: "Core competencies",
        items: [
          "Engineering expertise – built on 90GW+, engineered for scale",
          "Scalability & intelligent visualisation – single view",
          "Commissioning expertise – assured First-Time-Right delivery",
          "Long-term service support – 24/7 helpdesk with on-site backup",
          "Built in AEPL's controlled manufacturing environment",
          "Standardised processes – one method, every project",
        ],
      },
    ],
  },
  {
    id: "ppc",
    name: "Power Plant Controller (PPC)",
    short: "PPC",
    tagline: "India's first 'HIL' tested PPC. Proven in every trial – till COD and beyond.",
    summary:
      "Grid code compliant plant control for solar, wind, BESS and hybrid plants – AGC ready, with forecast & schedule synchronisation and multi-layered fail-safe operation.",
    image: "/solutions/ppc.webp",
    brochure: "ppc",
    highlights: [
      { value: "HIL", label: "Type tested" },
      { value: "40GW", label: "Yearly capacity" },
      { value: "90GW+", label: "Monitored" },
    ],
    groups: [
      {
        title: "Gain superior control",
        items: [
          "Fast loop control actions (fluctuation management)",
          "Real time monitoring & data integrity",
          "Power optimization and curtailment for hybrid plants",
          "Multi-layered fail safe mode",
          "Seamless ecosystem integration",
          "Advanced analytics & custom reporting",
        ],
      },
      {
        title: "Built for the grid",
        items: [
          "Grid code compliant",
          "HIL type tested",
          "Automatic Generation Control (AGC) ready",
          "Forecast & schedule synchronization",
        ],
      },
    ],
  },
  {
    id: "ems-bess",
    name: "EMS for BESS",
    short: "EMS-BESS",
    tagline: "Advanced control, monitoring and intelligence for smarter battery energy management.",
    summary:
      "A unified command center for complete storage visibility – connected control across BMS, PCS, SCADA and PPC with performance intelligence on RTE, SOH, availability and dispatch.",
    image: "/solutions/ems-bess.webp",
    brochure: "ems",
    highlights: [
      { value: "8GWh+", label: "EMS-BESS" },
      { value: "60%+", label: "Market share" },
      { value: "16+", label: "Years of expertise" },
    ],
    groups: [
      {
        title: "Why AEPL EMS?",
        items: [
          "Unified Command Center – one platform for complete storage visibility",
          "SCADA & PPC Integration – connected control across BMS, PCS, SCADA and PPC",
          "Performance Intelligence – monitor RTE, SOH, availability and dispatch performance",
          "Advanced Alarm Management – identify critical events faster with prioritised alarms",
          "Standardized Engineering – pre-validated building blocks for consistent EMS delivery",
          "QR Code Access – secured, authorised, auditable",
        ],
      },
      {
        title: "Core competencies",
        items: [
          "Frequency & ramp-rate control",
          "Dispatch & SOC management",
          "Peak-shaving & energy arbitrage",
          "Alarms & event management",
          "Grid & ambient monitoring",
          "Trends & performance reporting",
        ],
      },
    ],
  },
  {
    id: "lt-mv-panels",
    name: "LT/MV Panels",
    short: "LT/MV Panels",
    tagline: "One trusted team – switchboard to dashboard, zero integration gaps.",
    summary:
      "AEPL designs, manufactures and commissions LT (800V/415V) & MV (33kV/11kV) switchgear panels for renewable energy projects, backed by 16+ years of renewable-specific engineering expertise.",
    image: "/solutions/panels.webp",
    brochure: "panels",
    highlights: [
      { value: "15000+", label: "Panels delivered" },
      { value: "40GW+", label: "Annual capacity" },
      { value: "25 Yrs", label: "Reliability" },
    ],
    groups: [
      {
        title: "6 reasons we outperform",
        items: [
          "Type-Tested Panels – built for renewable energy",
          "In-House Fabrication – full control of quality & delivery",
          "Modular Panel Design – field-ready, easy to service",
          "Native SCADA Integration – one platform, full visibility",
          "One Team – full ownership across panels and SCADA",
          "QR Code Access – secured, authorised, auditable",
        ],
      },
      {
        title: "Manufacturing",
        items: [
          "State of the art, dust free manufacturing facility",
          "In-house fabrication and automated paint shop",
          "Automated wire preparation",
          "OEM partnership – engineering to handover",
        ],
      },
    ],
  },
  {
    id: "pm-kusum",
    name: "PM-KUSUM Solutions",
    short: "PM-KUSUM",
    tagline: "One stop solution – from field device to command center.",
    summary:
      "IoT-based RMS panels, cloud CMS, AMS, ReportWiz, weather monitoring and LT/MV panels for PM-KUSUM portfolios – with local SCADA that keeps working even without internet.",
    image: "/solutions/pm-kusum.webp",
    brochure: "kusum",
    highlights: [
      { value: "2000+", label: "Sites" },
      { value: "5GW+", label: "Monitored" },
      { value: "60%+", label: "Market share" },
    ],
    groups: [
      {
        title: "Solutions",
        items: [
          "RMS – IoT-based edge computing for data acquisition and control",
          "CMS – advanced monitoring and analytics for renewable energy portfolios",
          "AMS – asset data, maintenance, inventory, work orders, analytics & reports",
          "ReportWiz – KPI insights, custom & scheduled reports, multi-format export",
          "WMS – real-time weather data, IEC-standard sensors, forecast analytics",
          "LT/MV Panels – type-tested, modular, native SCADA integration",
        ],
      },
      {
        title: "The advantage we bring",
        items: [
          "Local SCADA without internet – data straight from the RMS panel",
          "Cluster-wise dashboard for KPI monitoring",
          "CMS portal for complete portfolio management",
          "SEDM / Discom portal integration",
          "EMS and PPC ready; telemetry for LDC integration",
          "Customized DGR reports for IPP, EPC and investors",
        ],
      },
    ],
  },
];

/** Unified Renewable Solution – from Corporate Brochure p3 */
export type UrsModule = {
  name: string;
  icon: string;
  items: string[];
  /** Link to the module's own page under /solutions/urs/ */
  href?: string;
  brochure?: keyof typeof BROCHURES;
};

export const URS: { title: string; tagline: string; desc: string; modules: UrsModule[] } = {
  title: "Unified Renewable Solution",
  tagline: "One platform, plant to portfolio",
  desc: "URS unifies acquisition, control and reporting across solar, wind, BESS and hybrid assets – from a single inverter to a national fleet.",
  // Order agreed with the AEPL team: SCADA, PPC, AMS, CMS, Advanced Analytics, EMS-BESS
  modules: [
    { name: "SCADA", icon: "monitor", href: "/solutions/urs/scada/", brochure: "scada", items: ["Flexible & scalable architecture", "Rich set of renewable libraries", "Seamless handling of 10,00,000+ tags", "Refined interface from decades of experience"] },
    { name: "PPC", icon: "gauge", href: "/solutions/urs/ppc/", brochure: "ppc", items: ["Grid code compliant", "HIL type tested", "AGC ready", "Forecast & schedule synchronization"] },
    { name: "AMS", icon: "wrench", href: "/solutions/urs/ams/", brochure: "corporate", items: ["Automated work order management", "Standardized SOPs across enterprise", "Reduced mean time to repair", "Cost control & inventory management"] },
    { name: "CMS", icon: "grid", href: "/solutions/urs/cms/", brochure: "corporate", items: ["Insightful view of the entire portfolio", "Measure KPIs against targeted data", "ML based anomaly detection", "Conversational AI"] },
    { name: "Advanced Analytics", icon: "chart", href: "/solutions/urs/advanced-analytics/", brochure: "corporate", items: ["Advanced data visualization", "Accurate loss buckets", "Custom report builder", "Analyse historical data"] },
    { name: "EMS - BESS", icon: "battery", href: "/solutions/urs/ems-bess/", brochure: "ems", items: ["Indigenous solution", "ML based energy arbitrage", "State of Charge (SoC) management", "Peak shaving, grid support"] },
  ],
};

/** Homepage "Our Solutions" – the 3 main solutions, in this order. */
export const MAIN_SOLUTIONS: { id: string; name: string; short: string; summary: string; image: string; href: string; brochure: keyof typeof BROCHURES }[] = [
  {
    id: "urs",
    name: "Unified Renewable Solution (URS)",
    short: "URS",
    summary: "SCADA, PPC, AMS, CMS, Advanced Analytics and EMS-BESS on one platform – acquisition, control and reporting from a single inverter to a national fleet.",
    image: "/solutions/urs.webp",
    href: "/solutions/urs/",
    brochure: "corporate",
  },
  {
    id: "pm-kusum",
    name: "PM KUSUM",
    short: "PM-KUSUM",
    summary: SOLUTIONS.find((x) => x.id === "pm-kusum")!.summary,
    image: "/solutions/pm-kusum.webp",
    href: "/solutions/pm-kusum/",
    brochure: "kusum",
  },
  {
    id: "lt-mv-panels",
    name: "LT/MV Panels",
    short: "LT/MV Panels",
    summary: SOLUTIONS.find((x) => x.id === "lt-mv-panels")!.summary,
    image: "/solutions/panels.webp",
    href: "/solutions/lt-mv-panels/",
    brochure: "panels",
  },
];

// LT/MV type test results now live in PANELS_PAGE (src/lib/solutions.ts)


// ---------------------------------------------------------------------------
//  Social proof
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  { quote: "AEPL is our reliable partner w.r.t. SCADA, PPC, and Tracker SCADA at 61 sites, comprising Solar, wind, and Hybrid. AEPL's quality, trust, commitment, delivery, and service make them stand out.", role: "Associate Vice President – Engineering", company: "Adani Green Energy Limited" },
  { quote: "I appreciate the exceptional work of Adaptive Engineering Pvt. Ltd. Their commitment to excellence, attention to details and proactive mindset have significantly contributed to the success of our projects.", role: "Advisor – Solar O&M", company: "Tata Power" },
  { quote: "I have no hesitation in recommending AEPL to anyone seeking reliable and efficient solar monitoring solutions. The combination of cutting-edge technology, expert knowledge, and outstanding customer service makes AEPL the ideal partner for any solar energy project.", role: "Director", company: "WAAREE Renewable Technologies Ltd." },
  { quote: "AEPL is our trusted partner when it comes to automation of our Water Supply Scheme projects. Our projects at Rewa, Kirgi, Barhi and Dhamedi are powered by AEPL.", role: "Head E&A", company: "CMR Infrastructure Pvt. Ltd." },
  { quote: "We trust AEPL for all our Industrial Automation Solutions as the team @AEPL ensures the best fit products and services. Their zeal to keep customer first makes them our most trusted Automation Solutions partner.", role: "Managing Director", company: "Fornnax Technology Pvt. Ltd." },
  { quote: "Our Machine Automation Solutions are powered by AEPL and we highly recommend the same.", role: "Managing Director", company: "Clartech Engineers Pvt. Ltd." },
];

export const CLIENT_LOGOS = [
  ...Array.from({ length: 40 }, (_, i) => `/clients/${i + 1}.webp`),
  "/clients/meil.webp",
];

export const CERTIFICATIONS = [
  { title: "ISO 9001:2015 – TÜV NORD", kind: "Quality", img: "/certs/iso-9001.webp" },
  { title: "Solar Monitoring Company of the Year 2019", kind: "Award", img: "/certs/solar-monitoring-award-2019.webp" },
  { title: "Schneider Electric Authorised System Integrator", kind: "Partnership", img: "/certs/schneider-si.webp" },
  { title: "Short Circuit Test – 65kA", kind: "ERDA Type Test", img: "/certs/erda-65ka.webp" },
  { title: "Short Circuit Test – 50kA", kind: "ERDA Type Test", img: "/certs/erda-50ka.webp" },
  { title: "IP55 Ingress Protection", kind: "ERDA Type Test", img: "/certs/erda-ip55.webp" },
  { title: "Temperature Rise Test", kind: "ERDA Type Test", img: "/certs/erda-temp-rise.webp" },
];

// Journey: the About page shows the timeline image at /public/about/journey.webp

/**
 * Leadership & team – photos from the company archive.
 * TODO: add designations (`role`) – leave empty to show name only.
 */
/** Leadership first (`featured` = larger cards in the top row), then by designation. */
export const TEAM: { name: string; photo: string; role?: string; featured?: boolean }[] = [
  { name: "Chirag Soni", photo: "/team/chirag-soni.webp", role: "Managing Director", featured: true },
  { name: "Jay Patel", photo: "/team/jay-patel.webp", role: "Director", featured: true },
  { name: "Keyur Amin", photo: "/team/keyur-amin.webp", role: "CEO" },
  { name: "Ajit Patel", photo: "/team/ajit-patel.webp", role: "CTO" },
  { name: "Darshan Goswami", photo: "/team/darshan-goswami.webp", role: "Head - Renewable Energy Business" },
  { name: "Chintan Patel", photo: "/team/chintan-patel.webp", role: "Head - Sales" },
  { name: "Harshang Dhandhukiya", photo: "/team/harshang-dhandhukiya.webp", role: "Head - Finance" },
  { name: "Rutvik Dave", photo: "/team/rutvik-dave.webp", role: "Head - Software Development" },
  { name: "Yogendra Singh Bhati", photo: "/team/yogendra-singh-bhati.webp", role: "Head - Service" },
  { name: "Manish Malkan", photo: "/team/manish-malkan.webp", role: "Head AMC" },
  { name: "Jay Patel", photo: "/team/jay-patel-ops.webp", role: "Head of Project Department" },
  { name: "Kundan Singh Rajput", photo: "/team/kundan-singh-rajput.webp", role: "Head of Research And Development" },
  { name: "Nilesh Prajapati", photo: "/team/nilesh-prajapati.webp", role: "Head of Engineering Department" },
  { name: "Pragnesh Patel", photo: "/team/pragnesh-patel.webp", role: "Software Development Manager - Solar and Process Automation" },
];

/** Homepage banners. A slide with `title` shows only that line (no subtitle). */
export const HERO_SLIDES: { image: string; title?: string; subtitle?: string }[] = [
  { image: "/hero/solar-bess.webp", title: "India's Market Leader Renewable Energy Technology" },
  { image: "/hero/solar-wind.webp", subtitle: "Unified Renewable Solution (URS)" },
  { image: "/hero/pm-kusum.webp", subtitle: "PM KUSUM" },
  { image: "/hero/lt-mv-panels.webp", subtitle: "LT/MV Panels" },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "About Us", href: "/about/" },
  { label: "Resources", href: "/resources/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact Us", href: "/contact/" },
];

export const INTEREST_OPTIONS = [
  "Unified Renewable Solution (URS)",
  "Plant SCADA",
  "Power Plant Controller (PPC)",
  "Asset Management System (AMS)",
  "Central Monitoring System (CMS)",
  "Advanced Analytics",
  "EMS for BESS",
  "PM KUSUM Solutions",
  "LT/MV Panels",
  "Partnership / Other",
];
