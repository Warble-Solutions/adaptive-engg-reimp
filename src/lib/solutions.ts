// ============================================================================
//  SOLUTION PAGES — one entry per page under /solutions/.
//  Numbers come from the REI 2026 flyers/brochures; copy is adapted from the
//  reference site (reference/Adaptive-engg) and the flyers.
// ============================================================================
import type { IconName } from "@/components/Icon";
import type { BROCHURES } from "./content";

type BrochureId = keyof typeof BROCHURES;

export type SolutionSection =
  | { type: "cards"; eyebrow: string; title: string; lead?: string; items: { title: string; desc?: string; icon?: IconName }[]; cols?: 2 | 3 | 4 }
  | { type: "split"; eyebrow: string; title: string; text?: string; bullets?: string[]; image: string; imageAlt: string; flip?: boolean }
  | { type: "steps"; eyebrow: string; title: string; items: { title: string; desc: string }[] }
  | { type: "table"; eyebrow: string; title: string; lead?: string; columns: string[]; rows: string[][] }
  | { type: "tiles"; eyebrow: string; title: string; lead?: string; items: { image: string; label: string }[] }
  | { type: "modules"; eyebrow: string; title: string; lead?: string; group?: SolutionGroup };

/** Families of sub-pages that get a card grid + "explore other" strip. */
export type SolutionGroup = "urs" | "kusum" | "panels" | "water" | "iot";

export type SolutionPageData = {
  slug: string;
  path: string;
  name: string;
  /** Short label used in menus and tags */
  short: string;
  /** Icon + bullet points for the card grid on the parent page (optional) */
  icon?: IconName;
  points?: string[];
  /** Banner background image */
  banner: string;
  label: string;
  tagline: string;
  intro: string[];
  image: string;
  imageAlt: string;
  stats?: { value: string; label: string }[];
  brochure: BrochureId;
  sections: SolutionSection[];
  metaTitle: string;
  metaDescription: string;
};

const COMMON_STATS = [
  { value: "90GW+", label: "Monitored" },
  { value: "60%+", label: "Market share" },
  { value: "2,500+", label: "Sites" },
  { value: "16+", label: "Years of expertise" },
];

// ---------------------------------------------------------------------------
//  Unified Renewable Solution (overview)
// ---------------------------------------------------------------------------
export const URS_PAGE: SolutionPageData = {
  slug: "urs",
  path: "/solutions/urs/",
  name: "Unified Renewable Solution (URS)",
  short: "URS",
  banner: "/hero/solar-wind.webp",
  label: "Unified Renewable Solution",
  tagline: "One platform, plant to portfolio",
  intro: [
    "A single-vendor, end-to-end approach covering SCADA, PPC, AMS, CMS, Advanced Analytics and EMS-BESS for solar, wind, BESS and hybrid plants – acquisition, control and reporting from a single inverter to a national fleet.",
    "Most projects involve several vendors for panels, wiring, SCADA, switchgear and testing – and that fragmentation leads to delays and compatibility issues. URS gives you a single point of responsibility for the entire E&I scope, from detailed engineering to final grid synchronisation, all handled in-house.",
  ],
  image: "/solutions/ppc-1.webp",
  imageAlt: "Hybrid solar, wind and battery storage plant",
  stats: [
    { value: "90GW+", label: "Monitored" },
    { value: "60%+", label: "Market share" },
    { value: "10,00,000+", label: "Tags in a single project" },
    { value: "8GWh+", label: "EMS-BESS" },
  ],
  brochure: "corporate",
  sections: [
    { type: "modules", eyebrow: "Our 6 integrated solutions", title: "A complete digital ecosystem for renewable operations" },
    {
      type: "tiles",
      eyebrow: "Built for every asset",
      title: "Solar, Wind & BESS – one platform",
      items: [
        { image: "/solutions/tile-solar.webp", label: "Solar" },
        { image: "/solutions/tile-wind.webp", label: "Wind" },
        { image: "/solutions/tile-bess.webp", label: "BESS" },
      ],
    },
    {
      type: "split",
      eyebrow: "Complete integration",
      title: "Coordinated control of wind, solar and battery storage",
      text: "Modern hybrid plants demand complete integration. By managing everything from switchgear design to energy management algorithms in-house, AEPL ensures seamless coordination and avoids communication lag between plant systems.",
      bullets: [
        "Single point of responsibility for the entire E&I scope",
        "Zero compatibility lag between sub-systems",
        "Faster grid compliance approvals",
        "One trusted team – switchboard to dashboard",
      ],
      image: "/solutions/scada-1.webp",
      imageAlt: "Renewable energy control room",
    },
    {
      type: "steps",
      eyebrow: "Execution methodology",
      title: "From survey to go-live",
      items: [
        { title: "Survey & Design", desc: "Site survey and complete electrical design with simulation-backed cable sizing." },
        { title: "Manufacturing", desc: "Panels and assemblies built in our 2,00,000 sq.ft+ dust-free facility with strict QA/QC." },
        { title: "Installation", desc: "Cable laying, termination, earthing and equipment erection by trained field teams." },
        { title: "Go-Live", desc: "Testing, commissioning, grid synchronisation and handover with 24/7 monitoring." },
      ],
    },
  ],
  metaTitle: "Unified Renewable Solution (URS) – SCADA, PPC, AMS, CMS, Analytics & EMS-BESS",
  metaDescription:
    "AEPL's Unified Renewable Solution: SCADA, PPC, AMS, CMS, Advanced Analytics and EMS-BESS on one platform for solar, wind, BESS and hybrid plants.",
};

// ---------------------------------------------------------------------------
//  URS modules
// ---------------------------------------------------------------------------
export const URS_MODULE_PAGES: SolutionPageData[] = [
  {
    slug: "scada",
    path: "/solutions/urs/scada/",
    name: "Plant SCADA",
    short: "SCADA",
    banner: "/hero/scada.webp",
    label: "URS · SCADA",
    tagline: "Complete visibility. Reliable data. Smarter plant decisions.",
    intro: [
      "One platform across Engineering, Operations, O&M and Enterprise – built on the experience of 90GW+ and engineered for scale, from portfolio to plant to device.",
      "Supervisory control and data acquisition engineered for utility-scale Solar, Wind and Hybrid plants – maximising energy yield, enhancing asset life and lowering operational complexity across multi-GW portfolios.",
    ],
    image: "/solutions/scada-1.webp",
    imageAlt: "SCADA control room with plant dashboards",
    stats: [
      { value: "90GW+", label: "Monitored" },
      { value: "10,00,000+", label: "Tags in a single project" },
      { value: "60%+", label: "Market share" },
      { value: "16+", label: "Years of expertise" },
    ],
    brochure: "scada",
    sections: [
      {
        type: "cards",
        eyebrow: "One platform",
        title: "Engineering • Operations • O&M • Enterprise",
        cols: 4,
        items: [
          { title: "Engineering", desc: "Standard library and first time-right FAT/SAT.", icon: "cpu" },
          { title: "Operations", desc: "Clear plant state at a glance and safe control.", icon: "monitor" },
          { title: "O&M", desc: "Faster fault finding and less downtime.", icon: "wrench" },
          { title: "Enterprise", desc: "Portfolio visibility and maximum utilisation of assets.", icon: "layers" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Core competencies",
        title: "Why AEPL Plant SCADA",
        items: [
          { title: "Engineering Expertise", desc: "Built on the experience of 90GW+ and engineered for scale.", icon: "cpu" },
          { title: "Scalability & Intelligent Visualisation", desc: "Portfolio to plant to device in a single view.", icon: "grid" },
          { title: "Commissioning Expertise", desc: "Proven site expertise and assured First-Time-Right delivery.", icon: "check" },
          { title: "Long-Term Service Support", desc: "Commitment begins on commissioning – 24/7 helpdesk with on-site backup.", icon: "shield" },
          { title: "AEPL Manufacturing Facility", desc: "Built in a controlled environment for faster, trouble-free commissioning.", icon: "panel" },
          { title: "Standardised Processes", desc: "One method, every project.", icon: "layers" },
        ],
      },
      {
        type: "split",
        eyebrow: "Powering the future",
        title: "Of renewable operations",
        text: "Supervisory systems built to maximise energy yield, enhance asset lifespan and lower operational complexity across multi-GW portfolios.",
        bullets: [
          "Optimised performance – efficient monitoring, control and optimisation",
          "Improved asset availability – fewer unexpected failures, less downtime",
          "Reduced O&M costs – automation and efficient resource utilisation",
          "Better decision-making – insights from real-time and historical data",
          "Grid code compliance – first-time right commissioning without rework",
        ],
        image: "/solutions/scada-2.webp",
        imageAlt: "Engineer monitoring SCADA dashboards",
        flip: true,
      },
      {
        type: "cards",
        eyebrow: "Gain superior control",
        title: "With AEPL Plant SCADA",
        cols: 4,
        items: [
          { title: "Faster Fault Detection", desc: "Immediate identification of faults at the local level, reducing downtime and response time." },
          { title: "High-Resolution Data", desc: "Granular, high-frequency data for precise loss analysis and performance optimisation." },
          { title: "Improved O&M Efficiency", desc: "Quicker troubleshooting and reduced dependency on central systems." },
          { title: "Enhanced Control", desc: "Better real-time control and faster grid responsiveness for stable plant operation." },
        ],
      },
      {
        type: "cards",
        eyebrow: "SCADA offerings",
        title: "Solar, Wind and Hybrid SCADA",
        items: [
          { title: "Solar SCADA", desc: "Utility-scale PV control – complex layouts, tracker arrays and weather telemetry, with customised dashboards from CXOs to the on-ground team.", icon: "sun" },
          { title: "Wind SCADA", desc: "OEM-independent monitoring of geographically scattered WTGs – compare asset performance and integrate wind SAS as per IEC standards.", icon: "bolt" },
          { title: "Hybrid SCADA", desc: "Combined solar-wind supervisory control and PPC for plants developed by a single entity – active, reactive, power factor and frequency control.", icon: "layers" },
        ],
      },
    ],
    metaTitle: "Plant SCADA – 90GW+ Monitored | Unified Renewable Solution",
    metaDescription:
      "AEPL Plant SCADA: one platform across Engineering, Operations, O&M and Enterprise for solar, wind and hybrid plants – 90GW+ monitored, 10,00,000+ tags in a single project.",
  },
  {
    slug: "ppc",
    path: "/solutions/urs/ppc/",
    name: "Power Plant Controller (PPC)",
    short: "PPC",
    banner: "/solutions/ppc.webp",
    label: "URS · PPC",
    tagline: "India's first 'HIL' tested PPC. Proven in every trial – till COD and beyond.",
    intro: [
      "Advanced, reliable and adaptable Power Plant Control for stand-alone and hybrid plants – grid code compliant, AGC ready, with forecast & schedule synchronisation and a multi-layered fail-safe mode.",
      "The PPC regulates active and reactive power at the point of interconnection, providing voltage and frequency support to keep the grid stable while maximising yield across solar, wind and BESS assets.",
    ],
    image: "/solutions/ppc-1.webp",
    imageAlt: "Hybrid plant with battery storage and wind turbines",
    stats: [
      { value: "HIL", label: "Type tested" },
      { value: "40GW", label: "Yearly capacity" },
      { value: "90GW+", label: "Monitored" },
      { value: "450+", label: "Manpower" },
    ],
    brochure: "ppc",
    sections: [
      {
        type: "cards",
        eyebrow: "Gain superior control",
        title: "Built for compliance, stability and yield",
        items: [
          { title: "Fast Loop Control Actions", desc: "Fluctuation management with sub-second response, automated ramp-rate control and active power limiting.", icon: "bolt" },
          { title: "Real Time Monitoring & Data Integrity", desc: "Millisecond time-stamped logging with a backfilling event logger for exact event analysis.", icon: "monitor" },
          { title: "Power Optimisation & Curtailment", desc: "Dynamic power control for hybrid plants – curtailment orders executed precisely to protect revenue.", icon: "gauge" },
          { title: "Multi-Layered Fail-Safe Mode", desc: "Master–slave hot redundancy and heartbeat monitoring move to safe local setpoints during network interruptions.", icon: "shield" },
          { title: "Seamless Ecosystem Integration", desc: "Vendor-agnostic – IEC 61850, Modbus TCP and OPC UA across inverters, WTGs and BESS.", icon: "layers" },
          { title: "Advanced Analytics & Custom Reporting", desc: "Granular monitoring, custom dashboards and automated compliance and O&M reports.", icon: "chart" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Key functions",
        title: "For peak performance",
        items: [
          { title: "Active Power Management", desc: "Precise control of active power at the POI for stable dispatch and curtailment." },
          { title: "Reactive Power Control", desc: "Accurate reactive power and power factor regulation to maintain POI compliance." },
          { title: "Smooth Ramp-Rate Control", desc: "Controlled power transitions that prevent fluctuations and meet requirements." },
          { title: "Voltage Control", desc: "Real-time voltage regulation to maintain grid stability and protect equipment." },
          { title: "Dynamic Frequency Response", desc: "Sub-second control loops that stabilise grid frequency during disturbances." },
          { title: "Power Factor Correction", desc: "Advanced control to maximise usable power and reduce grid stress." },
        ],
      },
      {
        type: "split",
        eyebrow: "Built for the grid",
        title: "Designed for the future grid",
        text: "Orchestrating Solar, Wind and BESS assets to meet dynamic grid conditions – and ready for India's 500GW+ renewable roadmap.",
        bullets: [
          "Grid code compliant – IEGC and utility mandates",
          "HIL type tested",
          "Automatic Generation Control (AGC) ready",
          "Forecast & schedule synchronisation",
          "Secure by design – cyber security aligned with IEC 62443",
          "Future-ready for BESS and additional capacity",
        ],
        image: "/solutions/ppc-2.webp",
        imageAlt: "Wind farm at sunset",
        flip: true,
      },
    ],
    metaTitle: "Power Plant Controller (PPC) – India's First HIL Tested PPC",
    metaDescription:
      "AEPL Power Plant Controller: India's first HIL tested PPC – grid code compliant, AGC ready, with fast loop control and multi-layered fail-safe mode for solar, wind, BESS and hybrid plants.",
  },
  {
    slug: "ams",
    path: "/solutions/urs/ams/",
    name: "Asset Management System (AMS)",
    short: "AMS",
    banner: "/solutions/urs.webp",
    label: "URS · AMS",
    tagline: "Automated work orders. Standardised SOPs. Lower cost of O&M.",
    intro: [
      "Automated workorder management, standardised SOPs across the enterprise, reduced mean time to repair and effective cost control with inventory management.",
      "Linked natively with AEPL SCADA – an alarm can raise a work order, assign the right technician and track the job to closure, giving O&M teams complete control of every site.",
    ],
    image: "/solutions/urs.webp",
    imageAlt: "Solar and wind assets with battery storage",
    stats: COMMON_STATS,
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Key features",
        title: "Enterprise-grade maintenance management",
        cols: 2,
        items: [
          { title: "Automated Workorder Management", desc: "Work orders created automatically from SCADA alarms and assigned to the right technician.", icon: "wrench" },
          { title: "Standardised SOPs Across Enterprise", desc: "Checklists, photo capture and step-by-step verification on every site for audit readiness.", icon: "check" },
          { title: "Reduced Mean Time to Repair", desc: "Less downtime through smart routing, skill matching and real-time notifications.", icon: "gauge" },
          { title: "Effective Cost Control & Inventory", desc: "Track consumables, vendor costs and spares to optimise maintenance budgets.", icon: "layers" },
          { title: "Asset Information Management", desc: "One library for asset details, datasheets, locations and repair histories.", icon: "file" },
          { title: "Maintenance Management", desc: "Preventive and corrective workflows with checklist verification before closure.", icon: "shield" },
        ],
      },
      {
        type: "steps",
        eyebrow: "The flow",
        title: "Fault to fix. Fully automated.",
        items: [
          { title: "Detect", desc: "SCADA alarm triggers or a scheduled PM due date is reached." },
          { title: "Dispatch", desc: "Auto-assigned to the nearest qualified technician with an SLA." },
          { title: "Execute", desc: "SOP checklists followed and photo evidence captured on mobile." },
          { title: "Resolve", desc: "Completion verified, root cause logged and knowledge base updated." },
        ],
      },
      {
        type: "cards",
        eyebrow: "Value creation",
        title: "Driving operational excellence",
        cols: 4,
        items: [
          { title: "Optimise asset utilisation", desc: "Maximise availability of Solar, Wind and BESS installations." },
          { title: "Improve maintenance planning", desc: "Move from reactive fire-fighting to proactive scheduling." },
          { title: "Enhance inventory management", desc: "Track spares, tools and minimum threshold alerts." },
          { title: "Ensure regulatory compliance", desc: "Audit-ready records, checklist logs and safety documentation." },
          { title: "Enable data-driven decisions", desc: "MTTR, MTBF and cost dashboards for better choices." },
          { title: "Reduce search time", desc: "Manuals, history and SOPs available instantly in the field." },
          { title: "Real-time visibility", desc: "Track dispatch, ticket progress and field metrics from the office." },
          { title: "Improved asset reliability", desc: "Consistent O&M execution for long-term asset health and yield." },
        ],
      },
    ],
    metaTitle: "Asset Management System (AMS) | Unified Renewable Solution",
    metaDescription:
      "AEPL AMS: automated work orders, standardised SOPs, reduced mean time to repair and inventory control for solar, wind and BESS O&M.",
  },
  {
    slug: "cms",
    path: "/solutions/urs/cms/",
    name: "Central Monitoring System (CMS)",
    short: "CMS",
    banner: "/hero/solar-bess.webp",
    label: "URS · CMS",
    tagline: "Enterprise-level monitoring and portfolio intelligence",
    intro: [
      "AEPL's Central Monitoring System gives real-time visibility and intelligent analytics for Solar, Wind and BESS assets – an insightful view of the entire portfolio from a single dashboard.",
      "Measure KPIs against targeted data, detect anomalies with machine learning and query your plants through a conversational AI assistant – without travelling to site.",
    ],
    image: "/solutions/cms.webp",
    imageAlt: "Central monitoring dashboards",
    stats: COMMON_STATS,
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Benefits",
        title: "Complete portfolio intelligence",
        items: [
          { title: "Complete Portfolio Visibility", desc: "Oversight of multiple states and assets from one unified dashboard.", icon: "grid" },
          { title: "Improved Plant Performance", desc: "Optimise yield, PR and generation through cross-plant analytics.", icon: "gauge" },
          { title: "Reduced Downtime", desc: "Spot underperforming equipment early for immediate dispatch.", icon: "wrench" },
          { title: "Accurate Energy Insights", desc: "Turn raw SCADA telemetry into meaning with automated loss bucket analysis.", icon: "chart" },
          { title: "Scalable & Secure Platform", desc: "Encrypted, scalable architecture built for uptime and security.", icon: "shield" },
          { title: "Faster Fault Detection", desc: "ML-based anomaly detection warns operators before failures occur.", icon: "bolt" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Capabilities",
        title: "Gain superior control with AEPL CMS",
        cols: 2,
        items: [
          { title: "Centralised fleet monitoring", desc: "All renewable assets across geographies on a single dashboard with health indicators." },
          { title: "Real-time performance dashboards", desc: "Configurable live views of KPIs, PR and plant status across every block." },
          { title: "SCADA & protocol integration", desc: "OPC UA, MQTT, API and Modbus TCP connectors – completely OEM independent." },
          { title: "Loss analysis & downtime tracking", desc: "Granular loss mapping to root causes – grid, clipping, soiling or equipment." },
          { title: "Automated reporting", desc: "Configurable templates with scheduled, audit-ready report delivery." },
          { title: "Cyber security", desc: "Aligned with IEC 62443 – segmented firewalls, TLS encryption and role-based access." },
        ],
      },
      {
        type: "split",
        eyebrow: "Portfolio scale",
        title: "Multi-GW portfolio monitoring from a unified dashboard",
        text: "The Central Monitoring System aggregates performance across heterogeneous solar and wind sites, so asset managers can compare yield, identify systemic faults and run diagnostics without travelling to the field.",
        bullets: ["Cross-site performance analytics", "Cross-plant benchmarking & OEM comparison", "Enterprise dashboards for management", "Integrated with AMS for maintenance dispatch"],
        image: "/solutions/scada.webp",
        imageAlt: "Operations centre monitoring a renewable portfolio",
        flip: true,
      },
    ],
    metaTitle: "Central Monitoring System (CMS) | Unified Renewable Solution",
    metaDescription:
      "AEPL CMS: enterprise-level monitoring and portfolio intelligence for solar, wind and BESS – KPIs vs targets, ML anomaly detection and conversational AI.",
  },
  {
    slug: "advanced-analytics",
    path: "/solutions/urs/advanced-analytics/",
    name: "Advanced Analytics",
    short: "Advanced Analytics",
    banner: "/solutions/scada.webp",
    label: "URS · Advanced Analytics",
    tagline: "Turn raw renewable data into actionable intelligence",
    intro: [
      "Advanced data visualisation, accurate loss buckets, a custom report builder and years of historical data – transforming raw plant telemetry into decisions.",
      "Standardise, automate and secure plant reporting across a multi-OEM portfolio – for O&M teams, management and investors alike.",
    ],
    image: "/solutions/scada-2.webp",
    imageAlt: "Engineer analysing plant performance dashboards",
    stats: COMMON_STATS,
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Core capabilities",
        title: "Everything you need to understand your plants",
        cols: 4,
        items: [
          { title: "Advanced Data Visualisation", desc: "Interactive drill-down dashboards comparing plants, inverters and time periods.", icon: "chart" },
          { title: "Accurate Loss Buckets", desc: "See exactly where energy is lost – soiling, clipping, curtailment or degradation.", icon: "gauge" },
          { title: "Custom Report Builder", desc: "Build reports for management, O&M and investors with your parameters.", icon: "file" },
          { title: "Analyse Historical Data", desc: "Trend analysis, degradation curves, seasonal patterns and YoY comparison.", icon: "layers" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Reporting",
        title: "Reporting that runs itself",
        items: [
          { title: "Real-time & scheduled KPI insights", desc: "Live plant data converted into PDF, CSV and XLS reports on schedule." },
          { title: "Conversational AI insights", desc: "Query reports in natural language – AI scans telemetry to flag anomalies and suggest actions." },
          { title: "Alarms & downtime reports", desc: "Audit logs of plant drops, shutdowns and grid curtailment quantified to the kWh." },
          { title: "Secure archival & sharing", desc: "Store records for years and share safely with role-based access." },
          { title: "Intelligent distribution", desc: "Reliable scheduled delivery of reports to every stakeholder." },
          { title: "Multi-OEM data layer", desc: "Modbus, OPC UA and WebAPI streams unified into one standard structure." },
        ],
      },
      {
        type: "split",
        eyebrow: "AI/ML powered",
        title: "Intelligence that learns",
        text: "Our analytics engine uses machine learning to find patterns in plant data that manual analysis would miss.",
        bullets: [
          "AI/ML based performance anomaly detection",
          "Predictive maintenance scheduling",
          "Automated root cause analysis",
          "Weather-correlated performance modelling",
          "Equipment comparison and benchmarking",
          "Export to third-party tools such as Power BI",
        ],
        image: "/solutions/cms.webp",
        imageAlt: "Analytics dashboards",
        flip: true,
      },
    ],
    metaTitle: "Advanced Analytics | Unified Renewable Solution",
    metaDescription:
      "AEPL Advanced Analytics: data visualisation, accurate loss buckets, custom report builder and historical analysis for renewable portfolios.",
  },
  {
    slug: "ems-bess",
    path: "/solutions/urs/ems-bess/",
    name: "EMS for BESS",
    short: "EMS - BESS",
    banner: "/solutions/ems-bess.webp",
    label: "URS · EMS-BESS",
    tagline: "Advanced control, monitoring and intelligence for smarter battery energy management",
    intro: [
      "A unified command centre for complete storage visibility – connected control across BMS, PCS, SCADA and PPC, with performance intelligence on RTE, SOH, availability and dispatch.",
      "The EMS is the single decision-making layer that keeps a battery plant dispatching safely, compliantly and predictably – and coordinates solar, wind and storage as one asset at the grid interconnection point.",
    ],
    image: "/solutions/ems-bess-1.webp",
    imageAlt: "Battery energy storage containers with solar and wind",
    stats: [
      { value: "8GWh+", label: "EMS-BESS" },
      { value: "90GW+", label: "Monitored" },
      { value: "60%+", label: "Market share" },
      { value: "16+", label: "Years of expertise" },
    ],
    brochure: "ems",
    sections: [
      {
        type: "cards",
        eyebrow: "Why AEPL EMS?",
        title: "Six reasons developers choose AEPL",
        items: [
          { title: "Unified Command Center", desc: "One platform for complete storage visibility.", icon: "monitor" },
          { title: "SCADA & PPC Integration", desc: "Connected control across BMS, PCS, SCADA and PPC.", icon: "layers" },
          { title: "Performance Intelligence", desc: "Monitor RTE, SOH, availability and dispatch performance.", icon: "chart" },
          { title: "Advanced Alarm Management", desc: "Identify critical events faster with prioritised alarms.", icon: "bolt" },
          { title: "Standardized Engineering", desc: "Pre-validated building blocks for consistent EMS delivery.", icon: "check" },
          { title: "QR Code Access", desc: "Secured, authorised, auditable.", icon: "shield" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Core competencies",
        title: "What the EMS controls",
        cols: 3,
        items: [
          { title: "Frequency & Ramp-Rate Control", icon: "gauge" },
          { title: "Dispatch & SOC Management", icon: "battery" },
          { title: "Peak-Shaving & Energy Arbitrage", icon: "chart" },
          { title: "Alarms & Event Management", icon: "bolt" },
          { title: "Grid & Ambient Monitoring", icon: "sun" },
          { title: "Trends & Performance Reporting", icon: "file" },
        ],
      },
      {
        type: "split",
        eyebrow: "Plant to rack",
        title: "One screen, total control",
        text: "From fleet-level dispatch to individual rack diagnostics, AEPL EMS brings every layer of your battery asset into a single operational view.",
        bullets: [
          "Live SOC, dispatch status, alarms and grid signals in one view",
          "RTE and SOH trending with capacity fade detection",
          "Rack-level heatmaps and cell-group imbalance detection",
          "KPIs judged against actual dispatch instructions",
          "Coordinates solar, wind and BESS as one dispatch resource",
        ],
        image: "/solutions/ems-bess-2.webp",
        imageAlt: "Battery energy storage system beside solar and wind",
        flip: true,
      },
    ],
    metaTitle: "EMS for BESS – 8GWh+ | Unified Renewable Solution",
    metaDescription:
      "AEPL EMS for BESS: unified command centre, SCADA & PPC integration and performance intelligence for battery energy storage – 8GWh+ delivered.",
  },
];

// ---------------------------------------------------------------------------
//  PM KUSUM and LT/MV Panels
// ---------------------------------------------------------------------------
export const PM_KUSUM_PAGE: SolutionPageData = {
  slug: "pm-kusum",
  path: "/solutions/pm-kusum/",
  name: "PM KUSUM Solutions",
  short: "PM KUSUM",
  banner: "/hero/pm-kusum.webp",
  label: "PM KUSUM",
  tagline: "One stop solution – from field device to command center",
  intro: [
    "IoT-based RMS panels, cloud CMS, AMS, ReportWiz, weather monitoring and LT/MV panels for PM KUSUM portfolios – with a local SCADA that keeps working even without internet.",
    "The PM KUSUM scheme aims to bring energy security to farmers and increase India's share of non-fossil power. AEPL supports EPCs and developers with end-to-end remote monitoring and hardware across the scheme.",
  ],
  image: "/solutions/pm-kusum-field.webp",
  imageAlt: "Engineer and farmer reviewing solar plant data in the field",
  stats: [
    { value: "2000+", label: "Sites" },
    { value: "5GW+", label: "Monitored" },
    { value: "60%+", label: "Market share" },
    { value: "2,00,000 sq.ft+", label: "Manufacturing facility" },
  ],
  brochure: "kusum",
  sections: [
    {
      type: "modules",
      group: "kusum",
      eyebrow: "Solutions",
      title: "Everything a PM KUSUM portfolio needs",
      lead: "From field device to command center – explore each part of the AEPL PM KUSUM suite.",
    },
    {
      type: "cards",
      eyebrow: "The advantage we bring",
      title: "Built for developers, EPCs and investors",
      items: [
        { title: "Local Monitoring & Diagnosis", desc: "Local SCADA with all field device monitoring and analysis." },
        { title: "Cluster Wise Dashboard", desc: "KPI monitoring across clusters of sites." },
        { title: "CMS Portal", desc: "Complete portfolio management in one place." },
        { title: "SEDM Portal Integration", desc: "Direct communication with the SEDM / DISCOM portal." },
        { title: "EMS and PPC Ready", desc: "Telemetry system for LDC integration." },
        { title: "Customized DGR Reports", desc: "Daily generation reports for IPPs, EPCs and investors." },
      ],
    },
    {
      type: "split",
      eyebrow: "Local SCADA without internet",
      title: "Monitoring that keeps running",
      text: "AEPL's local SCADA gets its data straight from the RMS panel – so plant monitoring keeps working even when the internet doesn't. In other systems, local SCADA is a web client of the cloud CMS and needs internet.",
      bullets: [
        "String / central inverters",
        "Weather station – irradiance and temperature",
        "LT/MV panels, protection relays and transformer",
        "MFM · ABT energy meters",
        "SCB / SMB string monitoring",
      ],
      image: "/solutions/pm-kusum.webp",
      imageAlt: "Solar plant under PM KUSUM",
      flip: true,
    },
    {
      type: "cards",
      eyebrow: "PM KUSUM scheme",
      title: "Why it matters",
      items: [
        { title: "De-dieselisation of farming", desc: "Replacing diesel pump sets with clean, reliable solar energy.", icon: "sun" },
        { title: "Water & energy security", desc: "Daytime power for irrigation and less reliance on an unstable grid.", icon: "bolt" },
        { title: "Farmers' income", desc: "Additional income by selling surplus solar power to utilities.", icon: "chart" },
      ],
    },
  ],
  metaTitle: "PM KUSUM Solutions – RMS, CMS, AMS, ReportWiz, WMS & LT/MV Panels",
  metaDescription:
    "AEPL PM KUSUM one stop solution: RMS, CMS, AMS, ReportWiz, WMS and LT/MV panels across 2000+ sites, with local SCADA that works without internet.",
};

export const PANELS_PAGE: SolutionPageData = {
  slug: "lt-mv-panels",
  path: "/solutions/lt-mv-panels/",
  name: "LT/MV Panels",
  short: "LT/MV Panels",
  banner: "/hero/lt-mv-panels.webp",
  label: "LT/MV Panels",
  tagline: "One trusted team – switchboard to dashboard, zero integration gaps",
  intro: [
    "AEPL designs, manufactures and commissions LT (800V · 415V) and MV (33kV · 11kV) panels for renewable energy projects, backed by 16+ years of renewable-specific engineering expertise.",
    "From conceptualising and design to manufacturing, installation and support, we control the complete panel production cycle in-house – for quality, performance and durability.",
  ],
  image: "/solutions/panels.webp",
  imageAlt: "AEPL LT/MV panel wiring",
  stats: [
    { value: "15000+", label: "Panels delivered" },
    { value: "40GW+", label: "Annual capacity" },
    { value: "2,00,000 sq.ft+", label: "Dust-free facility" },
    { value: "25 Yrs", label: "Reliability" },
  ],
  brochure: "panels",
  sections: [
    {
      type: "cards",
      eyebrow: "6 reasons we outperform",
      title: "Built for renewable energy",
      items: [
        { title: "Type-Tested Panels", desc: "Built for renewable energy.", icon: "shield" },
        { title: "In-House Fabrication", desc: "Full control of quality & delivery.", icon: "panel" },
        { title: "Modular Panel Design", desc: "Field-ready and easy to service.", icon: "layers" },
        { title: "Native SCADA Integration", desc: "One platform, full visibility.", icon: "monitor" },
        { title: "One Team", desc: "Full ownership across panels and SCADA.", icon: "check" },
        { title: "QR Code Access", desc: "Secured, authorised, auditable.", icon: "grid" },
      ],
    },
    {
      type: "modules",
      group: "panels",
      eyebrow: "Our panel range",
      title: "Electrical panels for every application",
      lead: "HT, LT, motor control, power factor, drive and automation panels – designed, built and tested in-house.",
    },
    {
      type: "table",
      eyebrow: "Type test results",
      title: "Tested at ERDA",
      lead: "Built and type-tested for renewable energy applications.",
      columns: ["Voltage Rating", "Short Circuit Test", "Temperature Rise Test", "Ingress Protection Test", "Die-Electric Strength Test"],
      rows: [
        ["440V", "65kA, 440V, 4000A", "440V, 4000A", "IP55 - Outdoor", "N/A"],
        ["800V", "50kA, 800V, 4000A", "800V, 4000A", "IP55 - Outdoor", "800V, 4000A"],
        ["11kV", "31.5kA - 3 Sec.", "11kV, 1250A", "IP55 - Outdoor", "11kV, 1250A"],
        ["33kV", "31.5kA - 3 Sec.", "33kV, 1250A", "IP55 - Outdoor", "33kV, 1250A"],
      ],
    },
    {
      type: "split",
      eyebrow: "Manufacturing",
      title: "Built in-house, built to last",
      text: "Our state of the art, dust-free facility gives us full control of quality and delivery – every panel is tested before it leaves the factory.",
      bullets: [
        "State of the art, dust-free manufacturing facility",
        "In-house fabrication and automated paint shop",
        "Automated wire preparation",
        "Factory acceptance testing with SCADA point-to-point loop checks",
        "OEM partnership – engineering to handover",
      ],
      image: "/solutions/panel-factory.webp",
      imageAlt: "AEPL panel manufacturing facility",
      flip: true,
    },
    {
      type: "cards",
      eyebrow: "Why choose AEPL panels",
      title: "Engineering advantages",
      cols: 4,
      items: [
        { title: "Enhanced safety", desc: "Type-tested short circuit compliance and touch-safe configurations." },
        { title: "Increased reliability", desc: "Heavy-duty components and robust enclosures for harsh sites." },
        { title: "Better energy efficiency", desc: "Optimised busbar design minimises losses." },
        { title: "Lesser maintenance", desc: "High-integrity connections and dust-proof layouts." },
        { title: "IoT ready", desc: "Communication interfaces for SCADA and remote monitoring." },
        { title: "Surge protection", desc: "SPDs protect sensitive automation components from grid spikes." },
        { title: "Dust proof", desc: "IP55 outdoor enclosures for long component life." },
        { title: "Quality certified", desc: "ISO 9001:2015 certified by TÜV NORD." },
      ],
    },
  ],
  metaTitle: "LT/MV Panels – Type-Tested LT (800V/415V) & MV (33kV/11kV) Panels",
  metaDescription:
    "AEPL LT/MV panels for renewable energy: type-tested at ERDA, 15000+ panels delivered, built in a 2,00,000 sq.ft+ dust-free facility with native SCADA integration.",
};

// ---------------------------------------------------------------------------
//  PM KUSUM sub-pages (order follows the PM KUSUM flyer)
// ---------------------------------------------------------------------------
const KUSUM_STATS = [
  { value: "2000+", label: "Sites" },
  { value: "5GW+", label: "Monitored" },
  { value: "60%+", label: "Market share" },
  { value: "16+", label: "Years of expertise" },
];
const K = "/solutions/pm-kusum";

export const KUSUM_MODULE_PAGES: SolutionPageData[] = [
  {
    slug: "iot-scada",
    path: `${K}/iot-scada/`,
    name: "IoT SCADA (RMS)",
    short: "IoT SCADA (RMS)",
    icon: "cpu",
    points: ["IoT-based edge computing", "Data acquisition & control", "Store & forward – zero data loss", "OEM independent"],
    banner: `${K}/aerial.webp`,
    label: "PM KUSUM · IoT SCADA",
    tagline: "Where edge hardware meets cloud intelligence",
    intro: [
      "AEPL's Remote Monitoring System (RMS) is an IoT-based edge computing device that acquires data from inverters, energy meters, weather stations and panels at every PM KUSUM site – and synchronises it with the cloud for monitoring, analytics and control.",
      "Built on the SolarWiz platform, it pairs ruggedised edge hardware with a secure, scalable cloud application, so plants across geographies can be monitored and analysed from one central location.",
    ],
    image: `${K}/rms-panel.webp`,
    imageAlt: "RMS IoT panel installed at a solar plant",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Two powerful components",
        title: "Edge device + cloud platform",
        cols: 2,
        items: [
          { title: "Edge device", desc: "An IoT-based edge computing device that acquires data from renewable asset equipment, with intelligent data pre-processing. It stores and forwards data during cloud connection interruptions.", icon: "cpu" },
          { title: "Cloud platform", desc: "A comprehensive, highly secure, available, reliable and scalable software package for data monitoring, analysis, reporting, O&M and multi-plant configuration.", icon: "grid" },
        ],
      },
      {
        type: "steps",
        eyebrow: "How it works",
        title: "From field device to cloud dashboard",
        items: [
          { title: "Data acquisition", desc: "The IoT gateway connects to inverters, meters and sensors over Modbus / RS485 and acquires real-time data." },
          { title: "Edge pre-processing", desc: "On-device processing filters, validates and compresses data before transmission." },
          { title: "Secure cloud sync", desc: "Data is sent securely to the cloud – and stored and forwarded if connectivity drops." },
          { title: "Dashboards & alerts", desc: "Real-time dashboards, KPIs and automated alerts, accessible from any device." },
        ],
      },
      {
        type: "split",
        eyebrow: "Local SCADA without internet",
        title: "Monitoring that keeps running",
        text: "AEPL's local SCADA gets its data straight from the RMS panel – so plant monitoring keeps working even when the internet doesn't.",
        bullets: [
          "Real-time plant performance monitoring",
          "PR, CUF, specific yield & KPI tracking",
          "Store & forward during network outages",
          "SEDM / DISCOM portal integration",
          "EMS and PPC ready – telemetry for LDC integration",
          "Role-based access control",
        ],
        image: `${K}/iot-gateway.webp`,
        imageAlt: "IoT gateways in a communication rack",
        flip: true,
      },
      {
        type: "cards",
        eyebrow: "Why choose AEPL",
        title: "Built for PM KUSUM",
        items: [
          { title: "OEM independent", desc: "Works with all major inverter brands – no vendor lock-in.", icon: "layers" },
          { title: "Compliance-ready reports", desc: "Built-in MNRE and DISCOM reporting formats for easy subsidy processing.", icon: "file" },
          { title: "Store & forward", desc: "Data is cached locally during outages and synced automatically when the network returns.", icon: "shield" },
          { title: "Edge intelligence", desc: "On-device pre-processing keeps bandwidth low without losing accuracy.", icon: "cpu" },
          { title: "Predictive alerts", desc: "ML-based detection of string failures, soiling and inverter degradation.", icon: "bolt" },
          { title: "Mobile first", desc: "A mobile app for field engineers – alerts, work orders and live data.", icon: "monitor" },
        ],
      },
    ],
    metaTitle: "IoT SCADA (RMS) for PM KUSUM | AEPL",
    metaDescription:
      "AEPL IoT SCADA (RMS) for PM KUSUM: IoT-based edge computing for data acquisition and control, with store & forward, local SCADA without internet and cloud monitoring.",
  },
  {
    slug: "cms",
    path: `${K}/cms/`,
    name: "Central Monitoring System (CMS)",
    short: "CMS",
    icon: "grid",
    points: ["Insightful view of the entire portfolio", "Targeted KPI metrics", "OEM-independent connectors", "Cloud or on-premise"],
    banner: `${K}/cms.webp`,
    label: "PM KUSUM · CMS",
    tagline: "Total visibility of a decentralised portfolio",
    intro: [
      "Advanced monitoring and analytics for renewable energy portfolios. The CMS collects, aggregates and presents data from plants across geographies at a central location, and runs data model algorithms to calculate individual plant KPIs.",
      "Cluster-wise dashboards, comparative device analysis and automated reports give developers, EPCs and investors complete control of thousands of PM KUSUM sites.",
    ],
    image: `${K}/control-room.webp`,
    imageAlt: "Central command center monitoring solar plants",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "At a glance",
        title: "Portfolio intelligence",
        cols: 4,
        items: [
          { title: "Insightful view of the entire portfolio", icon: "grid" },
          { title: "Targeted KPI metrics", icon: "gauge" },
          { title: "Equipment performance tracking", icon: "chart" },
          { title: "Custom reporting & analytics", icon: "file" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Features",
        title: "Field-tested tools for operational visibility",
        items: [
          { title: "Cloud or on-premise", desc: "Hosting tailored to your IT infrastructure, with full scalability." },
          { title: "Secure by design", desc: "SSL/TLS encryption and advanced user management protect data and dashboards." },
          { title: "Lightweight data", desc: "Optimised data structures for fast synchronisation over rural networks." },
          { title: "OEM-independent connectors", desc: "OPC UA, MQTT, API and Modbus TCP – any inverter, weather station or meter." },
          { title: "Comparative device analysis", desc: "Compare device and plant-level parameters side by side." },
          { title: "Tickets & notifications", desc: "Integrated ticket generation, chatbot notifications and a maintenance scheduler." },
        ],
      },
      {
        type: "split",
        eyebrow: "Business value",
        title: "Monitor every scattered asset from one dashboard",
        bullets: [
          "Monitor & analyse all scattered renewable assets on a single dashboard",
          "Decrease breakdown losses and increase generation & profitability",
          "Flexible & scalable architecture for future expansion",
          "Easily compare performance of geographically scattered assets",
          "Diagnose root causes and simplify maintenance",
        ],
        image: `${K}/ams-tablet.webp`,
        imageAlt: "Engineer checking plant data on a tablet",
        flip: true,
      },
    ],
    metaTitle: "Central Monitoring System (CMS) for PM KUSUM | AEPL",
    metaDescription:
      "AEPL CMS for PM KUSUM: advanced monitoring and analytics for decentralised solar portfolios – cluster-wise dashboards, KPI tracking and OEM-independent connectors.",
  },
  {
    slug: "ams",
    path: `${K}/ams/`,
    name: "Asset Management System (AMS)",
    short: "AMS",
    icon: "wrench",
    points: ["Asset data & teams", "Maintenance & inventory", "Work orders", "Analytics & reports"],
    banner: `${K}/solar-pump.webp`,
    label: "PM KUSUM · AMS",
    tagline: "Asset data | Maintenance | Inventory | Work orders | Analytics & reports",
    intro: [
      "Maximise asset performance through data-driven decisions and strategic planning – reducing risk and ensuring the long-term reliability of thousands of distributed PM KUSUM installations.",
      "One platform connects asset information, teams, maintenance, inventory and work orders, with mobile tools for technicians in the field.",
    ],
    image: `${K}/ams-field.webp`,
    imageAlt: "Technician scanning a QR code on a solar pump panel",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Integrated modules",
        title: "Everything for field lifecycle operations",
        items: [
          { title: "Asset information", desc: "Assets as a tree structure – templates, history, documents and warranties in one place.", icon: "layers" },
          { title: "Asset teams", desc: "Plant, control room and enterprise dashboards – one version of the truth for every role.", icon: "monitor" },
          { title: "Maintenance", desc: "Usage, time or condition-based preventive schedules with SOPs and audit trails.", icon: "wrench" },
          { title: "Inventory", desc: "Track spares on work orders, with min/max alarms and barcode allocation in the field.", icon: "grid" },
          { title: "Work orders", desc: "Create, prioritise, dispatch and close work orders – manually or from SCADA alarms.", icon: "check" },
          { title: "Integrations", desc: "Connectors for SCADA, weather services, ERP and BI tools over OPC, Modbus and REST.", icon: "cpu" },
        ],
      },
      {
        type: "steps",
        eyebrow: "Work order lifecycle",
        title: "Fault to fix",
        items: [
          { title: "Identify", desc: "A work order is raised manually or automatically from a SCADA threshold violation." },
          { title: "Assign", desc: "Dispatched to the right technician with the parts and time needed." },
          { title: "Execute", desc: "SOP checklists, QR code scans and mandatory photo uploads on mobile." },
          { title: "Close", desc: "Verified, audited and fed into MTBF, MTTR and cost KPIs." },
        ],
      },
      {
        type: "split",
        eyebrow: "In the field",
        title: "Mobile tools for every technician",
        bullets: [
          "Scan QR codes on panels to pull specifications and manuals",
          "Step-by-step checklists with photo logs before closure",
          "Downtime %, MTBF, MTTR and OEE performance KPIs",
          "Root cause analysis to prevent repeat failures",
          "Spare parts tracked against every work order",
        ],
        image: `${K}/ams-tablet.webp`,
        imageAlt: "Field engineer using the AMS app on a tablet",
        flip: true,
      },
    ],
    metaTitle: "Asset Management System (AMS) for PM KUSUM | AEPL",
    metaDescription:
      "AEPL AMS for PM KUSUM: asset data, maintenance, inventory, work orders, analytics and reports for distributed solar installations, with mobile tools for field teams.",
  },
  {
    slug: "reportwiz",
    path: `${K}/reportwiz/`,
    name: "ReportWiz",
    short: "ReportWiz",
    icon: "file",
    points: ["KPI insights & analytics", "Custom reports", "Scheduled reporting", "Multi-format export"],
    banner: `${K}/reportwiz-dashboard.webp`,
    label: "PM KUSUM · ReportWiz",
    tagline: "KPI insights | Analytics | Custom reports | Scheduled reporting | Multi-format export",
    intro: [
      "ReportWiz is AEPL's automated reporting platform for renewable energy portfolios – generating custom, scheduled and multi-format reports straight from live plant data.",
      "Customised Daily Generation Reports (DGR) for IPPs, EPCs and investors, compliance reports and performance analytics – without spreadsheets or manual effort.",
    ],
    image: `${K}/reportwiz.webp`,
    imageAlt: "Analyst reviewing solar generation reports",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Capabilities",
        title: "Enterprise reporting for your solar fleet",
        items: [
          { title: "KPI & performance insights", desc: "Track PR, CUF, specific yield, PLF and more – benchmarked against targets.", icon: "gauge" },
          { title: "Custom reports", desc: "Choose parameters, date ranges, grouping and filters to build your own reports.", icon: "file" },
          { title: "Advanced analytical charts", desc: "Interactive charts with drill-down from portfolio to device level.", icon: "chart" },
          { title: "Scheduled reporting", desc: "Daily, weekly, monthly and annual reports emailed to stakeholders automatically.", icon: "mail" },
          { title: "Multi-format export", desc: "PDF, Excel and CSV, with branded templates.", icon: "download" },
          { title: "Standard reports", desc: "A library of templates for compliance, grid billing and status tracking.", icon: "layers" },
        ],
      },
      {
        type: "split",
        eyebrow: "Benefits",
        title: "Reporting that runs itself",
        bullets: [
          "Eliminates manual report preparation and spreadsheet errors",
          "Data feeds directly from plant telemetry for accuracy",
          "Portfolio reports in seconds instead of hours",
          "Correlates weather, meter and inverter data",
          "Best and worst performer identification",
          "Faster problem identification and better decisions",
        ],
        image: `${K}/reportwiz-dashboard.webp`,
        imageAlt: "ReportWiz generation and billing dashboard",
        flip: true,
      },
    ],
    metaTitle: "ReportWiz – Automated Reporting for PM KUSUM | AEPL",
    metaDescription:
      "AEPL ReportWiz: KPI insights, analytics, custom and scheduled reports with multi-format export, including customised DGR reports for IPPs, EPCs and investors.",
  },
  {
    slug: "wms",
    path: `${K}/wms/`,
    name: "Weather Monitoring System (WMS)",
    short: "WMS",
    icon: "sun",
    points: ["Real-time weather data", "IEC-standard sensors", "Performance optimisation", "Forecast analytics"],
    banner: `${K}/wms.webp`,
    label: "PM KUSUM · WMS",
    tagline: "Real-time weather data | IEC-standard sensors | Performance optimisation | Forecast analytics",
    intro: [
      "Accurate Performance Ratio (PR) calculation needs precise environmental data. AEPL's WMS integrates local weather sensors and forecasting to measure irradiance, temperature, wind and humidity at every site.",
      "Without accurate weather data you cannot tell whether underperformance is caused by equipment or by the weather – WMS makes that distinction clear.",
    ],
    image: `${K}/wms-station.webp`,
    imageAlt: "Weather monitoring station at a solar plant",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Parameters monitored",
        title: "Industrial-grade environmental sensing",
        cols: 4,
        items: [
          { title: "Global Horizontal Irradiance (GHI)", icon: "sun" },
          { title: "Global Tilted Irradiance (GTI)", icon: "sun" },
          { title: "Module & ambient temperature", icon: "gauge" },
          { title: "Wind speed, direction & humidity", icon: "chart" },
        ],
      },
      {
        type: "split",
        eyebrow: "Integrated with SCADA & CMS",
        title: "Weather data that drives performance",
        bullets: [
          "Sensor readings over RS485 Modbus to RMS / data loggers",
          "Automatic hourly, daily and monthly PR and CUF calculation",
          "Weather forecasting and automated charting",
          "IP65/IP66 weatherproof sensors for Indian climates",
          "Clear separation of weather losses from equipment faults",
        ],
        image: `${K}/wms.webp`,
        imageAlt: "Weather station mast at sunset",
        flip: true,
      },
    ],
    metaTitle: "Weather Monitoring System (WMS) for PM KUSUM | AEPL",
    metaDescription:
      "AEPL WMS: real-time weather data from IEC-standard sensors – irradiance, temperature, wind and humidity – for accurate PR calculation and forecast analytics.",
  },
  {
    slug: "telemetry",
    path: `${K}/telemetry/`,
    name: "Telemetry System",
    short: "Telemetry",
    icon: "bolt",
    points: ["Real-time data to SLDC / RLDC", "IEC 60870-5-104 & DNP3", "Dual redundant channels", "CERC cyber security"],
    banner: `${K}/telemetry.webp`,
    label: "PM KUSUM · Telemetry",
    tagline: "Grid visibility, guaranteed",
    intro: [
      "For grid-connected solar plants, real-time data transmission to the State and Regional Load Despatch Centres (SLDC / RLDC) is mandatory. AEPL's Telemetry System provides compliant data communication through dedicated RTUs.",
      "Your plant stays visible to grid operators and avoids penalties for non-compliance – and the system is ready for EMS and PPC integration.",
    ],
    image: `${K}/rtu-cabinet.webp`,
    imageAlt: "Telemetry RTU panel interior",
    stats: KUSUM_STATS,
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "System components",
        title: "Industrial telemetry hardware",
        cols: 4,
        items: [
          { title: "Remote Terminal Unit", desc: "Industrial RTU with IEC 60870-5-104, DNP3 and Modbus, with dual communication channels.", icon: "cpu" },
          { title: "Signal conditioning", desc: "Analog (4-20mA, 0-10V) and digital acquisition from CTs, PTs, meters and weather stations.", icon: "gauge" },
          { title: "Grid communication", desc: "Fibre or leased line to SLDC, with a 4G cellular backup channel for failover.", icon: "bolt" },
          { title: "Cyber security", desc: "CERC guideline compliant – encryption, access control and audit logging.", icon: "shield" },
        ],
      },
      {
        type: "split",
        eyebrow: "SLDC / RLDC compliance",
        title: "Rugged field RTU & signal cabinets",
        bullets: [
          "Dual redundant communication routes (fibre & LTE fallback)",
          "Signal conditioning for 4-20mA CT/PT analog feedback",
          "Battery backup UPS for operation during outages",
          "CERC compliant security firewall",
        ],
        image: `${K}/sldc.webp`,
        imageAlt: "State Load Despatch Centre control room",
        flip: true,
      },
    ],
    metaTitle: "Telemetry System – SLDC / RLDC Compliance for PM KUSUM | AEPL",
    metaDescription:
      "AEPL Telemetry System: real-time grid data to SLDC / RLDC via RTUs over IEC 60870-5-104 and DNP3, with redundant channels and CERC cyber security compliance.",
  },
  {
    slug: "ht-panel",
    path: `${K}/ht-panel/`,
    name: "HT Panel",
    short: "HT Panel",
    icon: "panel",
    points: ["VCB panels up to 33kV", "Numerical protection", "Type-tested at ERDA", "Native SCADA integration"],
    banner: `${K}/panel-line.webp`,
    label: "PM KUSUM · HT Panel",
    tagline: "VCB panels up to 33kV / 11kV",
    intro: [
      "Type-tested High Tension Vacuum Circuit Breaker (VCB) panels, designed and manufactured in-house in AEPL's 2,00,000 sq.ft+ dust-free facility for PM KUSUM solar plants and substations.",
      "Built for renewable energy, with native SCADA integration and QR code access – one team from switchboard to dashboard.",
    ],
    image: `${K}/ht-panel.webp`,
    imageAlt: "HT VCB panels in the AEPL factory",
    stats: [
      { value: "33kV", label: "Max rated voltage" },
      { value: "31.5kA", label: "Short circuit (3 sec)" },
      { value: "IP55", label: "Outdoor protection" },
      { value: "ERDA", label: "Type tested" },
    ],
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Features",
        title: "Engineered for safety and reliability",
        items: [
          { title: "Vacuum Circuit Breaker", desc: "Long-life VCB with a maintenance-free vacuum arc chamber.", icon: "bolt" },
          { title: "Numerical protection", desc: "Microprocessor relays for overcurrent, earth fault and differential protection.", icon: "cpu" },
          { title: "Motorised racking", desc: "Motor-operated breaker racking with padlockable safety interlocks.", icon: "wrench" },
          { title: "Safety features", desc: "Door interlocks, earthing switch, arc flash venting and IR window for thermography.", icon: "shield" },
          { title: "Environmental protection", desc: "Anti-corrosion CRCA enclosure with epoxy powder coating, tropicalised for India.", icon: "sun" },
          { title: "SCADA ready", desc: "CT/PT and numerical relays with RS485 / Modbus or Ethernet communication.", icon: "monitor" },
        ],
      },
      {
        type: "table",
        eyebrow: "Type test results",
        title: "Tested at ERDA",
        columns: ["Voltage Rating", "Short Circuit Test", "Temperature Rise Test", "Ingress Protection Test", "Die-Electric Strength Test"],
        rows: [
          ["11kV", "31.5kA - 3 Sec.", "11kV, 1250A", "IP55 - Outdoor", "11kV, 1250A"],
          ["33kV", "31.5kA - 3 Sec.", "33kV, 1250A", "IP55 - Outdoor", "33kV, 1250A"],
        ],
      },
      {
        type: "split",
        eyebrow: "Manufacturing",
        title: "Built in-house, built to last",
        bullets: [
          "State of the art, dust-free manufacturing facility",
          "In-house fabrication and automated paint shop",
          "Factory acceptance testing before dispatch",
          "Modular design – field-ready and easy to service",
        ],
        image: `${K}/ht-factory.webp`,
        imageAlt: "HT panel testing in the AEPL factory",
        flip: true,
      },
    ],
    metaTitle: "HT Panel – VCB Panels up to 33kV for PM KUSUM | AEPL",
    metaDescription:
      "AEPL HT panels for PM KUSUM: type-tested VCB panels up to 33kV / 11kV with numerical protection, motorised racking and native SCADA integration, tested at ERDA.",
  },
  {
    slug: "acdb-panels",
    path: `${K}/acdb-panels/`,
    name: "ACDB Panels",
    short: "ACDB Panels",
    icon: "shield",
    points: ["IP65 rated enclosures", "Type 1+2 surge protection", "800V & 415V systems", "SCADA-ready metering"],
    banner: `${K}/pump-panel.webp`,
    label: "PM KUSUM · ACDB Panels",
    tagline: "Built for India's harshest field conditions",
    intro: [
      "IP65 rated AC Distribution Boards that provide safe isolation and protection between the solar inverter and the pump or grid connection – built for deserts, coastal humidity and monsoon rains.",
      "Available for 800V and 415V systems with integrated surge protection and optional energy metering that streams data to the AEPL RMS and CMS.",
    ],
    image: `${K}/acdb.webp`,
    imageAlt: "ACDB panel at a solar pump installation",
    stats: [
      { value: "IP65", label: "Protection rating" },
      { value: "800V", label: "Max system voltage" },
      { value: "Type 1+2", label: "SPD protection" },
      { value: "40kA", label: "Surge rating" },
    ],
    brochure: "kusum",
    sections: [
      {
        type: "cards",
        eyebrow: "Features",
        title: "Protection you can rely on",
        cols: 4,
        items: [
          { title: "Surge protection", desc: "Type 1+2 SPD with MOV technology against lightning and switching surges up to 40kA.", icon: "bolt" },
          { title: "Isolation switch", desc: "Rotary isolator with padlockable handle for safe maintenance.", icon: "shield" },
          { title: "Energy metering", desc: "Optional energy meter with RS485 Modbus output to the AEPL RMS.", icon: "gauge" },
          { title: "Weatherproof design", desc: "FRP/CRCA enclosure, anti-corrosion coating, UV-resistant gaskets and sealed glands.", icon: "sun" },
        ],
      },
      {
        type: "table",
        eyebrow: "Specifications",
        title: "800V and 415V configurations",
        columns: ["Parameter", "800V ACDB", "415V ACDB"],
        rows: [
          ["System voltage", "800V AC", "415V AC"],
          ["Rated current", "Up to 100A", "Up to 630A"],
          ["Enclosure rating", "IP65", "IP42 / IP54"],
          ["Enclosure material", "FRP / CRCA", "CRCA powder coated"],
          ["SPD type", "Type 1+2 (40kA)", "Type 2 (20kA)"],
          ["Protection", "MCCB / Fuse / Isolator", "MCCB / MCB"],
          ["Energy meter", "Optional (RS485)", "Optional (RS485)"],
          ["Mounting", "Pole / Wall / Ground", "Floor standing"],
          ["Standards", "IS 61439 / IEC", "IS 61439 / IEC"],
        ],
      },
      {
        type: "split",
        eyebrow: "Manufacturing",
        title: "Made in our own facility",
        bullets: [
          "Built in AEPL's 2,00,000 sq.ft+ dust-free facility",
          "Type-tested and certified to IS/IEC standards",
          "Every panel tested before it leaves the factory",
          "Bulk supply and custom configurations for PM KUSUM projects",
        ],
        image: `${K}/acdb-factory.webp`,
        imageAlt: "ACDB panel assembly line",
        flip: true,
      },
    ],
    metaTitle: "ACDB Panels – IP65 AC Distribution Boards for PM KUSUM | AEPL",
    metaDescription:
      "AEPL ACDB panels for PM KUSUM: IP65 rated AC distribution boards for 800V and 415V systems with Type 1+2 surge protection, isolation and optional energy metering.",
  },
];

// ---------------------------------------------------------------------------
//  Electrical panel range (under LT/MV Panels). Content from the reference site.
// ---------------------------------------------------------------------------
const P = "/solutions/panels";
const PANEL_STATS = [
  { value: "15000+", label: "Panels delivered" },
  { value: "40GW+", label: "Annual capacity" },
  { value: "2,00,000 sq.ft+", label: "Dust-free facility" },
  { value: "16+", label: "Years of expertise" },
];
const PANEL_BANNERS = ["/hero/lt-mv-panels.webp", "/solutions/panel-factory.webp", "/solutions/pm-kusum/panel-line.webp"];

function panelPage(p: {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  points: string[];
  tagline: string;
  intro: string[];
  features: string[];
  specs: [string, string][];
  note?: string;
  i: number;
}): SolutionPageData {
  return {
    slug: p.slug,
    path: `/solutions/lt-mv-panels/${p.slug}/`,
    name: p.name,
    short: p.short,
    icon: p.icon,
    points: p.points,
    banner: PANEL_BANNERS[p.i % PANEL_BANNERS.length],
    label: `LT/MV Panels · ${p.short}`,
    tagline: p.tagline,
    intro: p.intro,
    image: `${P}/${p.slug}.webp`,
    imageAlt: `AEPL ${p.name}`,
    stats: PANEL_STATS,
    brochure: "panels",
    sections: [
      {
        type: "cards",
        eyebrow: "Key features",
        title: `Why choose AEPL ${p.short} panels`,
        cols: 2,
        items: p.features.map((f) => ({ title: f, icon: "checkCircle" as IconName })),
      },
      {
        type: "table",
        eyebrow: "Specifications",
        title: "Technical details",
        lead: p.note,
        columns: ["Parameter", "Specification"],
        rows: p.specs,
      },
      {
        type: "split",
        eyebrow: "Manufacturing",
        title: "Built in-house, built to last",
        text: "Every AEPL panel is designed, fabricated, wired and tested in our own state of the art, dust-free facility – giving full control of quality and delivery.",
        bullets: [
          "2,00,000 sq.ft+ dust-free manufacturing facility",
          "In-house fabrication and automated paint shop",
          "Automated wire preparation",
          "Factory acceptance testing before dispatch",
          "ISO 9001:2015 certified by TÜV NORD",
        ],
        image: p.i % 2 ? "/solutions/panel-factory.webp" : "/solutions/pm-kusum/panel-line.webp",
        imageAlt: "AEPL panel manufacturing facility",
        flip: true,
      },
    ],
    metaTitle: `${p.name} | AEPL LT/MV Panels`,
    metaDescription: `${p.intro[0].slice(0, 150).replace(/\s\S*$/, "")}…`,
  };
}

export const PANEL_MODULE_PAGES: SolutionPageData[] = [
  panelPage({
    i: 0,
    slug: "ht-panel",
    name: "High Tension (HT) Panel",
    short: "HT",
    icon: "bolt",
    points: ["VCB panels up to 33kV / 11kV", "Indoor & outdoor designs", "VCB, LBS, RMU & SF6 range"],
    tagline: "VCB panels up to 33kV / 11kV",
    intro: [
      "High Tension (HT) panels for indoor and outdoor applications, mostly used in electrical substations to control and distribute high-voltage power safely.",
      "We follow strict industry parameters to deliver superior quality and reliability. Our HT range also covers VCB, LBS, RMU and SF6 circuit breakers.",
    ],
    features: [
      "Designed for indoor and outdoor applications",
      "Deployed in substations to control high-voltage power flow",
      "Manufactured to strict international electrical parameters",
      "High-durability structures for demanding grid environments",
    ],
    specs: [
      ["Voltage rating", "Up to 33kV / 11kV"],
      ["Panel type", "Vacuum Circuit Breaker (VCB) / Load Break Switch (LBS) / Ring Main Unit (RMU)"],
      ["Insulation medium", "Air insulated / SF6 gas insulated"],
      ["Type tests (ERDA)", "31.5kA - 3 sec short circuit · IP55 outdoor"],
      ["Application", "Substation control & power distribution"],
    ],
  }),
  panelPage({
    i: 1,
    slug: "pcc",
    name: "Power Control Centre (PCC) Panel",
    short: "PCC",
    icon: "panel",
    points: ["415 / 440V · 65kA", "Up to 6300A", "Whole-plant power from one place"],
    tagline: "415 / 440V · 65kA · up to 6300A",
    intro: [
      "Power Control Centre (PCC) panels designed for diverse and complex system requirements across heavy industries, commercial townships and large plants.",
      "The design assures the highest reliability in operation, ease of maintenance and complete flexibility – controlling and distributing the whole power supply of a plant from a single place.",
    ],
    features: [
      "Centralised control of the entire power supply from one place",
      "Highest reliability in operation and complete flexibility",
      "Low maintenance and robust, long-term service",
      "Efficient and safe bulk power distribution",
    ],
    specs: [
      ["Voltage rating", "415V / 440V"],
      ["Short circuit rating", "65kA"],
      ["Current rating", "Up to 6300A"],
      ["Application", "Main power distribution for plants, buildings, industries and townships"],
    ],
  }),
  panelPage({
    i: 2,
    slug: "mcc",
    name: "Motor Control Centre (MCC) Panel",
    short: "MCC",
    icon: "wrench",
    points: ["415 / 440V · 65kA", "Up to 4000A", "Modular construction"],
    tagline: "415 / 440V · 65kA · up to 4000A",
    intro: [
      "Customised Motor Control Centre (MCC) panels designed to the latest engineering standards, with modular construction and a wide choice of compartment sizes.",
      "They provide comprehensive safety and protection for electric motors – keeping motor systems running at peak capacity.",
    ],
    features: [
      "Modular construction with customisable compartment sizes",
      "Compliant with the latest engineering standards",
      "Protection against overload, short circuit and single phasing",
      "Earth fault, reverse power and under/over voltage protection options",
    ],
    specs: [
      ["Voltage rating", "415V / 440V"],
      ["Short circuit rating", "65kA"],
      ["Current rating", "Up to 4000A"],
      ["Protections", "Earth fault, reverse power, under load, over / under voltage"],
    ],
  }),
  panelPage({
    i: 3,
    slug: "intelligent-mcc",
    name: "Intelligent MCC (IMCC) Panel",
    short: "IMCC",
    icon: "cpu",
    points: ["PLC / SCADA integrated", "Motor diagnostics", "Predictive maintenance"],
    tagline: "Smart, networked motor control",
    intro: [
      "Our intelligent MCC design integrates directly with the control system (PLC / SCADA), giving direct access to diagnostic data during commissioning and operation.",
      "This simplifies troubleshooting, improves runtime and reduces operating costs – with automated tripping alerts and support for predictive maintenance.",
    ],
    features: [
      "Seamless integration with PLC / SCADA control systems",
      "Direct access to detailed motor diagnostics and operating data",
      "Simpler commissioning and troubleshooting",
      "Supports predictive maintenance and less downtime",
    ],
    specs: [
      ["Communication", "Modbus / Profibus / Ethernet"],
      ["Key benefits", "Predictive maintenance, higher efficiency, lower operating cost"],
      ["Alerting", "Automated tripping alerts and fault profiling"],
      ["Application", "Continuous process plants, critical manufacturing, utilities"],
    ],
  }),
  panelPage({
    i: 4,
    slug: "apfc",
    name: "Automatic Power Factor Correction (APFC) Panel",
    short: "APFC",
    icon: "gauge",
    points: ["Near-unity power factor", "Lower losses & penalties", "Fast response to load changes"],
    tagline: "Better efficiency through power factor correction",
    intro: [
      "APFC panels that automatically monitor and correct reactive power to maintain a near-unity power factor.",
      "They reduce power losses, minimise penalties on electricity bills and lower line harmonics – with fast, real-time response to changing loads.",
    ],
    features: [
      "Automatically maintains a near-unity power factor",
      "Reduces the risk of operational issues and harmonics",
      "Improves system efficiency by reducing losses",
      "Fast, real-time response to reactive load variations",
    ],
    specs: [
      ["Target power factor", "Unity / near-unity"],
      ["Ratings", "Available in different current and kVAR ratings"],
      ["Controller", "Automatic microprocessor-based APFC relay"],
      ["Application", "Commercial buildings, heavy industries, utility grid interfaces"],
    ],
  }),
  panelPage({
    i: 5,
    slug: "pdb-ldb",
    name: "PDB / LDB Panel",
    short: "PDB / LDB",
    icon: "grid",
    points: ["Power & lighting distribution", "Dual incomer options", "Customised layouts"],
    tagline: "Power & lighting distribution boards",
    intro: [
      "Customised Power Distribution Boards (PDB) and Lighting Distribution Boards (LDB) that allocate power safely to different sections of industries, large commercial buildings and infrastructure sites.",
      "Robust engineering, standardised layouts and assured service with less maintenance.",
    ],
    features: [
      "Safe power allocation to sections of industries and buildings",
      "Reliable fault protection and monitoring",
      "Operation from multiple incoming power sources",
      "Customised layouts to end-user specifications",
    ],
    specs: [
      ["Panel type", "PDB (power distribution) / LDB (lighting distribution)"],
      ["Source input", "Dual incomer / generator changeover options"],
      ["Serviceability", "Easy access doors, standardised circuit labelling"],
      ["Reliability", "Assured service with less maintenance"],
    ],
  }),
  panelPage({
    i: 6,
    slug: "soft-starter-vfd",
    name: "Soft Starter & VFD Panel",
    short: "Soft Starter & VFD",
    icon: "rocket",
    points: ["Speed & torque control", "Lower energy use", "Less motor stress"],
    tagline: "Variable frequency drive & soft starter panels",
    intro: [
      "Customised VFD panels for constant and variable torque applications that reduce operating costs and improve productivity.",
      "They deliver smooth motor acceleration, speed control and protection – reducing energy consumption and starting current spikes.",
    ],
    features: [
      "Adjustable speed control and torque regulation",
      "Smooth motion profiles for sensitive applications",
      "Less thermal and mechanical stress on motors, bearings and belts",
      "Built-in self-diagnostics and fieldbus communication",
    ],
    specs: [
      ["Applications", "Pumping, tube mills, paper mills, extruders, rolling mills"],
      ["Control modes", "V/F control, sensorless vector control, closed-loop control"],
      ["Key benefit", "Lower energy consumption and starting current spikes"],
    ],
  }),
  panelPage({
    i: 7,
    slug: "plc",
    name: "PLC Panel",
    short: "PLC",
    icon: "monitor",
    points: ["Hot-standby redundancy", "SIL-rated safety options", "In-house FAT facility"],
    tagline: "Programmable logic controller panels",
    intro: [
      "Custom PLC control cabinets with automation logic programmed in-house – including hot-standby redundancy, SIL-rated safety systems and flameproof options.",
      "Appreciated for easy troubleshooting, fast response and straightforward site commissioning.",
    ],
    features: [
      "Hot-standby and redundancy options for high availability",
      "SIL safety PLC systems for critical shutdown services",
      "Flameproof and explosion-proof enclosures for hazardous areas",
      "In-house programming and system configuration",
    ],
    specs: [
      ["Hardware", "High-end CPUs, analog & digital I/O redundancy"],
      ["Safety", "SIL (Safety Integrity Level) compliant options"],
      ["Testing", "Complete Factory Acceptance Test (FAT) facility in-house"],
      ["Enclosures", "Flameproof (Ex-d) / weatherproof / explosion-proof"],
    ],
  }),
  panelPage({
    i: 8,
    slug: "acdb",
    name: "AC/DB Panel",
    short: "AC/DB",
    icon: "shield",
    points: ["Surge protection (SPD)", "IP52 – IP65 options", "Solar & pumping applications"],
    tagline: "AC distribution boards for solar & pumping",
    intro: [
      "AC Distribution Boards (ACDB) that distribute alternating current safely, customised for indoor and outdoor floor-standing, wall-mounted or stand-mounted installation.",
      "They protect solar and pump equipment from surges, phase imbalance and high-voltage spikes.",
    ],
    features: [
      "Wall, stand or floor-standing configurations (IP52 – IP65)",
      "Surge protection devices (SPD) to block transients",
      "Protection from phase imbalance and voltage spikes",
      "Isolation and short circuit protection with MCCBs / MCBs / fuses",
    ],
    specs: [
      ["Ingress protection", "IP52 (indoor) / IP54, IP65 (outdoor)"],
      ["Protections", "Surge protection (SPD), overcurrent, short circuit"],
      ["Switchgear", "MCCB / fuse / isolator / MCB"],
      ["Applications", "Solar power plants, agricultural pumps, industrial circuits"],
    ],
  }),
  panelPage({
    i: 9,
    slug: "automation",
    name: "Automation Panel",
    short: "Automation",
    icon: "layers",
    points: ["Design to commissioning", "FAT with simulation", "SCADA-ready"],
    tagline: "Designing, engineering & commissioning",
    intro: [
      "Complete panel solutions for automation and control systems – designing, engineering, manufacturing and commissioning assistance.",
      "Our testing facility runs Factory Acceptance Tests (FAT) with simulation equipment, so every panel is proven before dispatch.",
    ],
    features: [
      "Compliant with international engineering and layout standards",
      "Protection against power spikes, transients and voltage drops",
      "Dust-proof construction for harsh industrial environments",
      "Intuitive layout for easy installation and maintenance",
    ],
    specs: [
      ["Enclosure", "Dust-proof, double-door options, custom RAL powder coat"],
      ["Testing", "Full Factory Acceptance Test (FAT) simulation before dispatch"],
      ["Scope", "Design, engineering, manufacturing and commissioning"],
      ["Connectivity", "Smart gateways, SCADA Modbus / Ethernet links"],
    ],
  }),
];

// ---------------------------------------------------------------------------
//  Water Solutions. Content from the reference site; water-specific numbers
//  are from the reference (no water flyer yet). Company numbers follow the flyers.
// ---------------------------------------------------------------------------
const W = "/solutions/water";
const WATER_APPROVALS = "Approved by GWSSB (Gujarat), MPJNM, MPUDC & MPUADD (Madhya Pradesh), UPJNM (Uttar Pradesh), RWS&S (Odisha) and JICA-assisted projects (Assam).";
const WATER_COMMON_STATS = [
  { value: "16+", label: "Years of expertise" },
  { value: "50+", label: "Water supply schemes" },
  { value: "10+", label: "States covered" },
  { value: "2,00,000 sq.ft+", label: "Manufacturing facility" },
];
const WATER_ADVANTAGE: SolutionSection = {
  type: "cards",
  eyebrow: "The AEPL advantage",
  title: "Your partner from design to commissioning",
  cols: 4,
  items: [
    { title: "Government approved partner", desc: WATER_APPROVALS, icon: "shield" },
    { title: "Turnkey E&I solutions", desc: "Scalable projects executed from design, engineering and procurement through commissioning.", icon: "check" },
    { title: "Own panel manufacturing", desc: "In-house panel manufacturing for strict quality control and faster delivery.", icon: "panel" },
    { title: "Professional project management", desc: "Dedicated project managers with deep domain expertise.", icon: "layers" },
  ],
};

export const WATER_PAGE: SolutionPageData = {
  slug: "water",
  path: `${W}/`,
  name: "Water Solutions",
  short: "Water",
  banner: `${W}/water-main.webp`,
  label: "Water Solutions",
  tagline: "End-to-end E&I and SCADA for water infrastructure",
  intro: [
    "Drinking water supply in urban and rural areas is essential for a country as big and as diverse as India. With 16+ years of experience, AEPL provides end-to-end Electrical, Instrumentation and Automation (E&I) and SCADA solutions for water infrastructure.",
    "From raw water intake to distribution at overhead tanks, sewage and effluent treatment, irrigation pumping and centralised monitoring – one team designs, builds, commissions and supports the complete system.",
  ],
  image: `${W}/wtp.webp`,
  imageAlt: "Water treatment plant",
  stats: [
    { value: "400+", label: "MLD treated water" },
    { value: "50+", label: "Water supply schemes" },
    { value: "1,500+", label: "Overhead tanks (OHT)" },
    { value: "300+", label: "MLD treated sewage" },
  ],
  brochure: "corporate",
  sections: [
    {
      type: "modules",
      group: "water",
      eyebrow: "Our water solutions",
      title: "Complete end-to-end delivery",
      lead: "Treatment plants, irrigation and centralised SCADA – explore each solution.",
    },
    {
      type: "split",
      eyebrow: "Instrumentation & control",
      title: "Automation that keeps water flowing",
      text: "We connect flow meters, level sensors, turbidity, pH and chlorine analysers to local PLC / RTU units, and automate pumps, filters and chemical dosing for consistent quality.",
      bullets: [
        "Pump monitoring and control with power management",
        "Automatic chemical dosing based on flow and water quality",
        "Remote connectivity of OHTs and pumping stations to central SCADA",
        "Soft starters and VFDs to prevent water hammer and current spikes",
        "Dashboards and analytics for leak detection and better decisions",
      ],
      image: `${W}/wtp-scada.webp`,
      imageAlt: "Engineers in a water SCADA control room",
      flip: true,
    },
    WATER_ADVANTAGE,
  ],
  metaTitle: "Water Solutions – WTP, STP, ETP, Irrigation & Centralized SCADA | AEPL",
  metaDescription:
    "AEPL Water Solutions: end-to-end E&I and SCADA for water supply & WTP, STP, ETP, lift irrigation, micro irrigation and centralized SCADA – 400+ MLD treated water across 50+ schemes.",
};

export const WATER_MODULE_PAGES: SolutionPageData[] = [
  {
    slug: "wtp",
    path: `${W}/wtp/`,
    name: "Water Supply & WTP",
    short: "Water Supply & WTP",
    icon: "bulb",
    points: ["Raw water intake to OHT", "Filtration & dosing control", "OHTs on central SCADA"],
    banner: `${W}/wtp.webp`,
    label: "Water · WTP",
    tagline: "From raw water intake to distribution at overhead tanks",
    intro: [
      "AEPL provides Electrical, Instrumentation and Automation solutions for Water Supply Schemes and Water Treatment Plants – from raw water intake to distribution at overhead tanks.",
      "Our solutions portfolio and proven project management ensure reliability, sustainability and the quality of potable drinking water.",
    ],
    image: `${W}/wtp-scada.webp`,
    imageAlt: "Water treatment SCADA control room",
    stats: [
      { value: "400+", label: "MLD treated drinking water" },
      { value: "50+", label: "Water supply schemes" },
      { value: "1,500+", label: "Overhead tanks (OHT)" },
      { value: "10+", label: "States covered" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Solutions portfolio",
        title: "What we deliver",
        cols: 4,
        items: [
          { title: "Pump monitoring & control", desc: "Pump monitoring and control along with power management.", icon: "gauge" },
          { title: "Process optimisation", desc: "Filtration process control and optimisation.", icon: "layers" },
          { title: "Remote connectivity", desc: "Remote connectivity of OHTs at the centralised SCADA system.", icon: "bolt" },
          { title: "Dashboards & analytics", desc: "Programmable dashboards and analytics for reports that enable better decisions.", icon: "chart" },
        ],
      },
      {
        type: "split",
        eyebrow: "Why AEPL",
        title: "Reliable, safe drinking water",
        bullets: [
          "Reliability – robust E&I and automation for continuous supply",
          "Sustainability – efficient, low-impact execution",
          "Quality – precision monitoring of potable water",
          "Scalability – modular architecture that grows with demand",
          "RTU telemetry panels link remote OHTs over GPRS / 4G or RF",
        ],
        image: `${W}/wtp-panels.webp`,
        imageAlt: "Water treatment control panels in manufacturing",
        flip: true,
      },
      WATER_ADVANTAGE,
    ],
    metaTitle: "Water Supply & WTP – E&I and SCADA | AEPL Water Solutions",
    metaDescription:
      "AEPL E&I and SCADA for water supply schemes and water treatment plants – 400+ MLD treated drinking water, 50+ schemes and 1,500+ overhead tanks connected.",
  },
  {
    slug: "stp",
    path: `${W}/stp/`,
    name: "Sewage Treatment Plant (STP)",
    short: "STP",
    icon: "layers",
    points: ["Treatment process optimisation", "Pump optimisation", "Large-network SCADA"],
    banner: `${W}/stp.webp`,
    label: "Water · STP",
    tagline: "Electrical & automation for the waste water industry",
    intro: [
      "Turnkey Electrical, Instrumentation and SCADA solutions for sewage treatment – built for consistent discharge compliance and large operational scale.",
      "We manage waste water networks of geographically distributed assets, from lift stations and pumping houses to the treatment plant.",
    ],
    image: `${W}/stp-scada.webp`,
    imageAlt: "STP SCADA operator workstation",
    stats: [
      { value: "300+", label: "MLD treated sewage" },
      { value: "10+", label: "Pumping stations remotely connected" },
      { value: "10+", label: "States covered" },
      { value: "16+", label: "Years of expertise" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Solutions we deliver",
        title: "End-to-end E&I for waste water networks",
        cols: 4,
        items: [
          { title: "Treatment process optimisation", desc: "Process control for biological treatment, aeration cycles and chemical dosing.", icon: "layers" },
          { title: "Pump optimisation", desc: "Smart pump sequences that balance run hours, prevent dry runs and save energy.", icon: "gauge" },
          { title: "Large geographic networks", desc: "Distributed lift stations and pump houses connected to central SCADA.", icon: "grid" },
          { title: "Mobile asset management", desc: "Field operations linked to mobile asset logs for less downtime.", icon: "wrench" },
        ],
      },
      {
        type: "split",
        eyebrow: "Benefits",
        title: "Engineered benefits of AEPL turnkey systems",
        bullets: [
          "Reliable monitoring and control of pump stations",
          "Lower energy use with digital technologies and SCADA",
          "Scalable, reliable and flexible architecture",
          "Batch processing for user-defined reports",
          "Dashboards and analytics for better plant performance",
          "Online effluent monitoring and compliance reports (pH, BOD, COD, TSS)",
        ],
        image: `${W}/stp-analytics.webp`,
        imageAlt: "STP central operations dashboard",
        flip: true,
      },
      WATER_ADVANTAGE,
    ],
    metaTitle: "Sewage Treatment Plant (STP) – E&I and SCADA | AEPL Water Solutions",
    metaDescription:
      "AEPL turnkey E&I and SCADA for sewage treatment plants – process and pump optimisation, remote lift stations and compliance reporting. 300+ MLD sewage treated.",
  },
  {
    slug: "etp",
    path: `${W}/etp/`,
    name: "Effluent Treatment Plant (ETP)",
    short: "ETP",
    icon: "shield",
    points: ["MBR & RO process control", "SCADA & reporting", "Energy & chemical savings"],
    banner: `${W}/etp.webp`,
    label: "Water · ETP",
    tagline: "E&I and automation for effluent treatment and MBR technology",
    intro: [
      "AEPL provides Electrical, Instrumentation and Automation solutions for effluent treatment and MBR (membrane bioreactor) technology.",
      "Brown-field turnkey solutions with Industry 4.0 technologies optimise chemical dosage and maximise plant throughput.",
    ],
    image: `${W}/etp-scada.webp`,
    imageAlt: "ETP SCADA dashboard",
    stats: [
      { value: "20+", label: "MLD effluent treated" },
      { value: "10+", label: "States covered" },
      { value: "16+", label: "Years of expertise" },
      { value: "2,00,000 sq.ft+", label: "Manufacturing facility" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Solutions portfolio",
        title: "Reliability and full operational visibility",
        cols: 4,
        items: [
          { title: "MBR & RO process control", desc: "Membrane automation, backwash and Clean-in-Place sequences based on trans-membrane pressure.", icon: "layers" },
          { title: "SCADA", desc: "Real-time process diagrams, alarms and historical logging.", icon: "monitor" },
          { title: "Reporting & analytics", desc: "Automatic reports on chemical use and treated volumes for compliance.", icon: "chart" },
          { title: "Mobile asset management", desc: "Track pumps, blowers and field assets to protect equipment.", icon: "wrench" },
        ],
      },
      {
        type: "steps",
        eyebrow: "Membrane filtration flow",
        title: "Automated at every stage",
        items: [
          { title: "Raw effluent", desc: "Turbidity and pH profiling of incoming effluent." },
          { title: "Pre-treatment dosing", desc: "Automated coagulant and neutralisation control." },
          { title: "MBR & RO", desc: "Biomass separation, aeration and membrane permeate checks." },
          { title: "Recycled water", desc: "Compliance logging, OCEMS reporting and reuse." },
        ],
      },
      {
        type: "split",
        eyebrow: "Optimising waste water recovery",
        title: "Lower costs, higher capacity",
        bullets: [
          "Optimised energy and chemical usage",
          "Increased plant capacity",
          "Remote monitoring of compliance parameters",
          "Lower plant downtime with early warning alarms",
          "Better optimisation of assets",
        ],
        image: `${W}/etp-analytics.webp`,
        imageAlt: "Operator monitoring ETP analytics",
        flip: true,
      },
    ],
    metaTitle: "Effluent Treatment Plant (ETP) – MBR & RO Automation | AEPL Water Solutions",
    metaDescription:
      "AEPL E&I, automation and SCADA for effluent treatment plants with MBR and RO technology – process control, reporting and asset management. 20+ MLD effluent treated.",
  },
  {
    slug: "lift-irrigation",
    path: `${W}/lift-irrigation/`,
    name: "Lift Irrigation",
    short: "Lift Irrigation",
    icon: "rocket",
    points: ["Drive technology (VFD / soft starter)", "Energy management", "Pump run-hour balancing"],
    banner: `${W}/lift.webp`,
    label: "Water · Lift Irrigation",
    tagline: "Preferred project partner for EPCs and government agencies",
    intro: [
      "16+ years of experience, a complete portfolio of Electrical, Instrumentation and Automation solutions and proven project management make AEPL a preferred project partner for irrigation pumping stations.",
      "We deliver complete E&I and SCADA engineering for pump houses – from HT substations and PCC / MCC panels to drives, telemetry and analytics.",
    ],
    image: `${W}/lift-control.webp`,
    imageAlt: "Pumping station control desk",
    stats: [
      { value: "20+", label: "Irrigation pumping stations" },
      { value: "10+", label: "States covered" },
      { value: "16+", label: "Years of expertise" },
      { value: "2,00,000 sq.ft+", label: "Manufacturing facility" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "E&I packages for pumping stations",
        title: "High operational run-times",
        cols: 4,
        items: [
          { title: "Drive technology", desc: "Soft starters and VFDs to eliminate motor stress and water hammer.", icon: "bolt" },
          { title: "Energy management", desc: "Power factor correction and load balancing to optimise power draw.", icon: "gauge" },
          { title: "Run-hour based pump operation", desc: "Duty rotation based on running hours to extend motor life.", icon: "wrench" },
          { title: "Embedded data mining", desc: "Edge data archiving with cloud database synchronisation.", icon: "cpu" },
        ],
      },
      {
        type: "split",
        eyebrow: "Analytics & O&M",
        title: "Longer pump life, less downtime",
        bullets: [
          "Machine learning algorithms with advanced analytics",
          "Winding, bearing temperature and vibration monitoring",
          "Reports and dashboards for audits",
          "O&M standardisation in the SCADA interface",
          "Increased pump life",
        ],
        image: `${W}/lift-scada.webp`,
        imageAlt: "Pumping station SCADA screen",
        flip: true,
      },
      WATER_ADVANTAGE,
    ],
    metaTitle: "Lift Irrigation – Pumping Station E&I and SCADA | AEPL Water Solutions",
    metaDescription:
      "AEPL turnkey E&I and automation for lift irrigation pumping stations – drives, energy management, run-hour balancing and predictive analytics. 20+ pumping stations.",
  },
  {
    slug: "micro-irrigation",
    path: `${W}/micro-irrigation/`,
    name: "Micro Irrigation",
    short: "Micro Irrigation",
    icon: "sun",
    points: ["Outlet Management System (OMS)", "Chak-level control", "Leakage & sabotage alerts"],
    banner: `${W}/micro.webp`,
    label: "Water · Micro Irrigation",
    tagline: "Tailor-made Outlet Management Systems (OMS)",
    intro: [
      "Tailor-made solutions for Outlet Management Systems (OMS) in micro irrigation – reliable water delivery and energy optimisation at the chak level.",
      "Solar-powered RTUs, motorised valves, pressure and flow sensors and wireless telemetry connect thousands of field points to a central SCADA.",
    ],
    image: `${W}/micro-scada.webp`,
    imageAlt: "Solar-powered field controller in a farm",
    stats: WATER_COMMON_STATS,
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Solutions portfolio",
        title: "Complete micro irrigation solutions",
        items: [
          { title: "Tailor-made pumping solutions", desc: "Pumping configurations designed for varying field pressure demands.", icon: "gauge" },
          { title: "Outlet Management System", desc: "Solar valve telemetry and field controller automation.", icon: "sun" },
          { title: "Scalable SCADA architecture", desc: "Central monitoring and logging for thousands of field points.", icon: "monitor" },
          { title: "Hydraulic parameters", desc: "Continuous monitoring of distribution to prevent losses and ensure equity.", icon: "layers" },
          { title: "Chak-level monitoring", desc: "Energy, pressure and flow at each defined chak.", icon: "grid" },
          { title: "Asset management", desc: "Valve, solar battery and RTU health in one system.", icon: "wrench" },
        ],
      },
      {
        type: "split",
        eyebrow: "Benefits",
        title: "Optimising water and farming efficiency",
        bullets: [
          "Energy and flow optimisation",
          "User-programmable dashboards for system optimisation",
          "Report and alarm logging for sabotage / leakage",
          "Water availability scheduling for crop management",
          "LoRaWAN / GPRS / 4G telemetry over large farming areas",
        ],
        image: `${W}/micro.webp`,
        imageAlt: "Field controller in an irrigated farm",
        flip: true,
      },
    ],
    metaTitle: "Micro Irrigation – Outlet Management System (OMS) | AEPL Water Solutions",
    metaDescription:
      "AEPL Outlet Management Systems for micro irrigation – solar RTUs, valve automation and SCADA for energy, pressure and flow at chak level, with leakage alerts.",
  },
  {
    slug: "centralized-scada",
    path: `${W}/centralized-scada/`,
    name: "Centralized SCADA",
    short: "Centralized SCADA",
    icon: "monitor",
    points: ["Quantity & quality monitoring", "Bird's eye dashboards", "Data integrity & security"],
    banner: `${W}/central-scada.webp`,
    label: "Water · Centralized SCADA",
    tagline: "A bird's eye view of every water asset",
    intro: [
      "Highly reliable, scalable and flexible software architecture for centralised SCADA – monitoring quantitative and qualitative parameters across the entire municipal or industrial network.",
      "Decentralised water schemes produce huge amounts of data. Our SCADA turns it into actionable reports, standardises operations and reduces consumable costs.",
    ],
    image: `${W}/central-network.webp`,
    imageAlt: "Centralized water distribution SCADA",
    stats: WATER_COMMON_STATS,
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Total ecosystem visibility",
        title: "Everything in one console",
        cols: 4,
        items: [
          { title: "Water quantity", desc: "Intake, flow rates and reservoir levels in real time.", icon: "gauge" },
          { title: "Water quality", desc: "Continuous pH, turbidity and chemical balance monitoring.", icon: "check" },
          { title: "Energy management", desc: "Voltage, VFD draw and power optimisation.", icon: "bolt" },
          { title: "Data integrity", desc: "Local buffering, encrypted links and database checks.", icon: "shield" },
          { title: "Asset monitoring", desc: "Pump temperature, vibration alarms and run hours.", icon: "wrench" },
          { title: "Water source optimisation", desc: "Balancing groundwater and canal intake.", icon: "sun" },
          { title: "O&M standardisation", desc: "Valve sequence verification and digital shift logs.", icon: "layers" },
          { title: "Consumable estimation", desc: "Chlorine usage and chemical stock alerts.", icon: "chart" },
        ],
      },
      {
        type: "split",
        eyebrow: "Complete control architecture",
        title: "Built for reliability and security",
        bullets: [
          "Overall monitoring of quantitative and qualitative parameters",
          "Efficient plant / scheme operations",
          "Advanced data mining and reporting tools",
          "Store & forward – no data loss during network drops",
          "Modbus, OPC UA, MQTT and Profibus integration",
          "Web and mobile dashboards with a bird's eye view",
        ],
        image: `${W}/central-scada.webp`,
        imageAlt: "Centralized SCADA control room",
        flip: true,
      },
    ],
    metaTitle: "Centralized SCADA for Water Networks | AEPL Water Solutions",
    metaDescription:
      "AEPL Centralized SCADA: reliable, scalable software for water networks – quantity and quality monitoring, energy management, data integrity and bird's eye dashboards.",
  },
];

// ---------------------------------------------------------------------------
//  Industrial IoT. Content from the reference site; unverified reference numbers
//  (68GW, 2,500+ machines, 35% OEE, 99.9% etc.) are left out.
// ---------------------------------------------------------------------------
const I = "/solutions/iot";
const IOT_CORE: SolutionSection = {
  type: "cards",
  eyebrow: "The AEPL telemetry advantage",
  title: "Backed by 16+ years of electrical engineering",
  items: [
    { title: "Centralised data aggregation", desc: "Time-series data from geographically scattered assets in one secure cloud environment.", icon: "grid" },
    { title: "Edge compute resilience", desc: "Store-and-forward local databases on rugged hardware – no data gaps during outages.", icon: "shield" },
    { title: "OEM-independent drivers", desc: "Legacy and modern hardware connected through Modbus, OPC UA, MQTT and API connectors.", icon: "layers" },
  ],
};

export const IOT_PAGE: SolutionPageData = {
  slug: "industrial-iot",
  path: "/solutions/industrial-iot/",
  name: "Industrial IoT",
  short: "Industrial IoT",
  banner: `${I}/solar-noc.webp`,
  label: "Industrial IoT Suite",
  tagline: "Telemetry, central monitoring and machine learning",
  intro: [
    "Customised telemetry, central SCADA systems and machine learning software designed to maximise efficiency in solar power, water utilities and smart manufacturing.",
    "Each platform pairs rugged edge hardware with secure, scalable cloud software – from a single site to a national portfolio.",
  ],
  image: `${I}/water-scada.webp`,
  imageAlt: "Operator monitoring an IoT SCADA dashboard",
  stats: [
    { value: "90GW+", label: "Monitored" },
    { value: "2,500+", label: "Sites" },
    { value: "60%+", label: "Market share" },
    { value: "16+", label: "Years of expertise" },
  ],
  brochure: "corporate",
  sections: [
    {
      type: "modules",
      group: "iot",
      eyebrow: "Our IoT platforms",
      title: "One suite, every industry",
      lead: "Explore each platform in the AEPL Industrial IoT suite.",
    },
    {
      type: "split",
      eyebrow: "Flexible deployment",
      title: "Cloud or on-premise – your choice",
      bullets: [
        "Secure cloud hosting (AWS / Microsoft Azure) or on-premise servers",
        "Interactive dashboards and custom report designers",
        "Store-and-forward edge devices for remote sites",
        "Integration with ERP, MES, CMMS and BI tools",
      ],
      image: `${I}/ams-flow.webp`,
      imageAlt: "Edge to cloud IoT data flow",
      flip: true,
    },
    IOT_CORE,
  ],
  metaTitle: "Industrial IoT – SolarWiz, WaterWiz, MachineWiz & Mobile Asset Management | AEPL",
  metaDescription:
    "AEPL Industrial IoT suite: SolarWiz for renewables, WaterWiz for water utilities, MachineWiz for smart manufacturing and Mobile Asset Management – edge-to-cloud telemetry.",
};

export const IOT_MODULE_PAGES: SolutionPageData[] = [
  {
    slug: "solarwiz",
    path: "/solutions/industrial-iot/solarwiz/",
    name: "SolarWiz",
    short: "SolarWiz",
    icon: "sun",
    points: ["Central monitoring portal", "Edge device + cloud platform", "Multi-plant analytics & reports"],
    banner: `${I}/solar-aerial.webp`,
    label: "Industrial IoT · SolarWiz",
    tagline: "More power to make the most of solar plants",
    intro: [
      "SolarWiz is AEPL's Central Monitoring Portal for monitoring and analysing renewable power plants across geographies from one central location.",
      "It collects, aggregates and presents plant data and runs data model algorithms to calculate individual plant KPIs – with complete installation of monitoring solutions to your specifications.",
    ],
    image: `${I}/solar-noc.webp`,
    imageAlt: "Solar central operations dashboard",
    stats: [
      { value: "90GW+", label: "Monitored" },
      { value: "60%+", label: "Market share" },
      { value: "2,500+", label: "Sites" },
      { value: "16+", label: "Years of expertise" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Two powerful components",
        title: "Edge device + cloud platform",
        cols: 2,
        items: [
          { title: "Edge device", desc: "An IoT-based edge computing device that acquires data from renewable asset equipment, pre-processes it intelligently and stores and forwards data during cloud interruptions.", icon: "cpu" },
          { title: "Cloud platform", desc: "A comprehensive, highly secure, reliable and scalable software package for monitoring, analysis, reporting, O&M and multi-plant configuration.", icon: "grid" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Platform functions",
        title: "Monitor, analyse, report and integrate",
        items: [
          { title: "Monitor from anywhere", desc: "Portfolio, site and equipment dashboards for WMS, inverters, strings, transformers, MFMs and switchgear.", icon: "monitor" },
          { title: "Analyse performance", desc: "Compare best and worst devices, diagnose root causes and compare plants.", icon: "chart" },
          { title: "Reporting", desc: "In-built report library, custom views and multiple formats, with export to Power BI.", icon: "file" },
          { title: "Multi-plant configuration & O&M", desc: "Fast, intuitive configuration of multiple plants from a common control center.", icon: "layers" },
          { title: "Third-party integrations", desc: "Asset management, weather forecasting, BI tools, cleaning robots and trackers.", icon: "cpu" },
          { title: "Mobile O&M", desc: "Automated alarms and tickets on the field mobile app.", icon: "wrench" },
        ],
      },
      {
        type: "split",
        eyebrow: "Features & benefits",
        title: "Built to scale",
        bullets: [
          "Monitor all scattered renewable assets on a single dashboard",
          "Decrease breakdown losses and increase generation",
          "OEM independent – integrate any inverter brand",
          "OPC UA / MQTT / API / Modbus TCP connectors",
          "Lightweight data structure and SSL security",
          "In-premise and cloud supported",
        ],
        image: `${I}/solar-edge.webp`,
        imageAlt: "SolarWiz edge gateway in a field cabinet",
        flip: true,
      },
    ],
    metaTitle: "SolarWiz – Central Monitoring Portal for Solar Plants | AEPL Industrial IoT",
    metaDescription:
      "AEPL SolarWiz: central monitoring portal combining edge IoT devices and cloud software to monitor, analyse and report on solar plants across geographies.",
  },
  {
    slug: "waterwiz",
    path: "/solutions/industrial-iot/waterwiz/",
    name: "WaterWiz",
    short: "WaterWiz",
    icon: "bulb",
    points: ["Water scheme telemetry", "Flow & quality monitoring", "STP / ETP compliance"],
    banner: `${W}/wtp.webp`,
    label: "Industrial IoT · WaterWiz",
    tagline: "Telemetry for drinking water, waste water and effluent",
    intro: [
      "WaterWiz gives water utilities and plant operators secure, low-latency telemetry, with real-time dashboards for scattered pump houses, overhead tanks and raw water inlets.",
      "Edge controllers read MFMs, flow meters, chlorine / turbidity analysers and level sensors, validate the data and synchronise it with the cloud portal.",
    ],
    image: `${I}/water-monitor.webp`,
    imageAlt: "WaterWiz water distribution dashboard",
    stats: [
      { value: "50+", label: "Water supply schemes" },
      { value: "1,500+", label: "Overhead tanks (OHT)" },
      { value: "400+", label: "MLD treated water" },
      { value: "10+", label: "States covered" },
    ],
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Two-tier architecture",
        title: "Edge telemetry + cloud compliance software",
        cols: 2,
        items: [
          { title: "IoT telemetry RTU", desc: "Edge computing device for water supply scheme equipment, with on-device pre-processing and store-and-forward – no data loss.", icon: "cpu" },
          { title: "Cloud monitoring & compliance", desc: "Real-time dashboards for flow, pressure and quality, with automated daily logs for water boards.", icon: "grid" },
        ],
      },
      {
        type: "cards",
        eyebrow: "Platform functions",
        title: "Everything to run water schemes remotely",
        items: [
          { title: "Monitor from anywhere", desc: "Central, scheme and equipment dashboards for quality and quantity parameters.", icon: "monitor" },
          { title: "Analyse performance", desc: "Compare schemes, find best and worst performers and diagnose root causes.", icon: "chart" },
          { title: "Reporting", desc: "In-built and customisable reports, with export to Power BI.", icon: "file" },
          { title: "Multi-scheme O&M", desc: "Manage multiple water supply schemes from a common control center.", icon: "layers" },
          { title: "Agency integration", desc: "Integration with district, state and national water management agencies.", icon: "bolt" },
          { title: "Leak detection", desc: "Flow balance across pipelines and reservoirs to find leaks and non-revenue water.", icon: "gauge" },
        ],
      },
      {
        type: "split",
        eyebrow: "STP / ETP automation",
        title: "Discharge compliance, automated",
        text: "Pre-engineered telemetry packages monitor STP and ETP discharges, with alarms to operators before quality parameters cross state limits.",
        bullets: [
          "pH, TSS, COD and BOD trend logging",
          "Pump scheduling to lower energy bills",
          "Predictive maintenance of pumps, valves and flow meters",
          "GPRS and fibre uplinks with SSL security",
        ],
        image: `${I}/water-scada.webp`,
        imageAlt: "Operator at a water treatment SCADA",
        flip: true,
      },
    ],
    metaTitle: "WaterWiz – Water Telemetry & SCADA | AEPL Industrial IoT",
    metaDescription:
      "AEPL WaterWiz: telemetry and SCADA for water supply schemes, STPs and ETPs – flow and quality monitoring, compliance reports and leak detection.",
  },
  {
    slug: "machinewiz",
    path: "/solutions/industrial-iot/machinewiz/",
    name: "MachineWiz",
    short: "MachineWiz",
    icon: "cpu",
    points: ["Plug-and-play machine data", "Real-time OEE", "Predictive maintenance"],
    banner: `${I}/factory.webp`,
    label: "Industrial IoT · MachineWiz",
    tagline: "Operational excellence on the shop floor",
    intro: [
      "MachineWiz is a scalable, self-installed solution that gathers data from any machine and delivers actionable insights in minutes – backed by experience in machine learning, production monitoring and predictive maintenance.",
      "It collects data directly from CNCs and PLCs without manual intervention and feeds it into dashboards, alerts and workflows for factory teams.",
    ],
    image: `${I}/oee.webp`,
    imageAlt: "MachineWiz factory OEE dashboard",
    brochure: "corporate",
    sections: [
      {
        type: "steps",
        eyebrow: "Data-to-action pipeline",
        title: "From machine controller to shop-floor action",
        items: [
          { title: "Collect", desc: "Data straight from PLCs, CNC controllers and I/O – as an edge gateway, software agent or Docker service." },
          { title: "Process", desc: "Central time-series storage, merged with ERP, MES and CMMS context." },
          { title: "Automate", desc: "Rules-based workflows and open REST APIs / webhooks." },
          { title: "Act", desc: "Real-time dashboards, history and text / email alerts for factory teams." },
        ],
      },
      {
        type: "cards",
        eyebrow: "Out-of-the-box apps",
        title: "Rapid actionability",
        cols: 4,
        items: [
          { title: "Production monitoring", desc: "OEE, cycle times, scrap and actual-vs-target counts in real time.", icon: "chart" },
          { title: "Condition monitoring", desc: "Motor temperature, vibration, current load and bearing wear.", icon: "gauge" },
          { title: "Predictive maintenance", desc: "ML anomaly detection to plan maintenance proactively.", icon: "wrench" },
          { title: "Process optimisation", desc: "Find the parameter recipes that give the best yield.", icon: "layers" },
        ],
      },
      {
        type: "split",
        eyebrow: "The MachineWiz value",
        title: "Why manufacturers choose MachineWiz",
        bullets: [
          "Plug-and-play, simple to use and easy to scale",
          "Autonomous data collection – no manual intervention",
          "Out-of-the-box apps with no initial development",
          "Connects to modern and legacy machines",
          "Built to drive ERP / MES systems with accurate production data",
          "For plastics, pharma, packaging, textile, machine tools and process industries",
        ],
        image: `${I}/factory.webp`,
        imageAlt: "Smart factory with machine telemetry",
        flip: true,
      },
    ],
    metaTitle: "MachineWiz – Machine Telemetry, OEE & Predictive Maintenance | AEPL Industrial IoT",
    metaDescription:
      "AEPL MachineWiz: plug-and-play machine telemetry for manufacturers – real-time OEE, condition monitoring, predictive maintenance and process optimisation.",
  },
  {
    slug: "asset-management",
    path: "/solutions/industrial-iot/asset-management/",
    name: "Mobile Asset Management",
    short: "Mobile Asset Management",
    icon: "wrench",
    points: ["Asset information & teams", "Maintenance & inventory", "Work orders on mobile"],
    banner: `${K}/ams-tablet.webp`,
    label: "Industrial IoT · Asset Management",
    tagline: "Data-driven asset performance management",
    intro: [
      "Maximise asset performance through data-driven decisions and strategic planning – reducing risk and ensuring the long-term reliability and resilience of your infrastructure.",
      "A mobile-first platform for asset information, teams, maintenance, inventory, work orders and integrations – online or offline in the field.",
    ],
    image: `${I}/ams-field.webp`,
    imageAlt: "Engineer using the asset management app in a factory",
    brochure: "corporate",
    sections: [
      {
        type: "cards",
        eyebrow: "Integrated modules",
        title: "Track, schedule and optimise field operations",
        items: [
          { title: "Asset information", desc: "Assets as a tree structure – templates, history and ML performance insights.", icon: "layers" },
          { title: "Asset teams", desc: "Strategic, managerial and operational dashboards for every role.", icon: "monitor" },
          { title: "Maintenance", desc: "Usage, time or condition-based schedules with SOPs, QR tags and photo checks.", icon: "wrench" },
          { title: "Inventory", desc: "Spares tracked on work orders, min/max alarms and barcode allocation.", icon: "grid" },
          { title: "Work orders", desc: "Create, prioritise, dispatch and close – manually or from SCADA alarms.", icon: "check" },
          { title: "Integrations", desc: "OPC UA / DA, Modbus TCP, FTP, REST API and Power BI connectors.", icon: "cpu" },
        ],
      },
      {
        type: "steps",
        eyebrow: "Work order lifecycle",
        title: "Identify to close",
        items: [
          { title: "Identify", desc: "Work order raised manually or from a SCADA anomaly." },
          { title: "Schedule", desc: "Technician, parts and time assigned." },
          { title: "Execute", desc: "Progress tracked on mobile – even offline." },
          { title: "Close", desc: "Audited, with MTBF, MTTR and cost KPIs updated." },
        ],
      },
      {
        type: "split",
        eyebrow: "Benefits",
        title: "Long-term reliability of your assets",
        bullets: [
          "Optimise asset lifespan and reduce capital expenditure",
          "Plan maintenance proactively with data",
          "Maintain compliance with audit trails",
          "Offline mobile work – syncs when back online",
          "Root cause analysis to prevent repeat failures",
        ],
        image: `${I}/ams-flow.webp`,
        imageAlt: "Asset management data flow",
        flip: true,
      },
    ],
    metaTitle: "Mobile Asset Management – Asset Performance Management | AEPL Industrial IoT",
    metaDescription:
      "AEPL Mobile Asset Management: asset information, teams, maintenance, inventory and work orders on a mobile-first platform with SCADA and ERP integration.",
  },
];

export const ALL_SOLUTION_PAGES = [
  URS_PAGE,
  ...URS_MODULE_PAGES,
  PM_KUSUM_PAGE,
  ...KUSUM_MODULE_PAGES,
  PANELS_PAGE,
  ...PANEL_MODULE_PAGES,
  WATER_PAGE,
  ...WATER_MODULE_PAGES,
  IOT_PAGE,
  ...IOT_MODULE_PAGES,
];

/** Sub-page families: parent page + children, used for card grids and "explore other". */
export const SOLUTION_GROUPS: Record<SolutionGroup, { parent: SolutionPageData; pages: SolutionPageData[]; label: string; short: string; noun: string }> = {
  urs: { parent: URS_PAGE, pages: URS_MODULE_PAGES, label: "Unified Renewable Solution", short: "URS", noun: "solutions" },
  kusum: { parent: PM_KUSUM_PAGE, pages: KUSUM_MODULE_PAGES, label: "PM KUSUM", short: "PM KUSUM", noun: "solutions" },
  panels: { parent: PANELS_PAGE, pages: PANEL_MODULE_PAGES, label: "LT/MV Panels", short: "LT/MV", noun: "panels" },
  water: { parent: WATER_PAGE, pages: WATER_MODULE_PAGES, label: "Water Solutions", short: "water", noun: "solutions" },
  iot: { parent: IOT_PAGE, pages: IOT_MODULE_PAGES, label: "Industrial IoT", short: "IoT", noun: "solutions" },
};

/** Navigation tree for the Solutions dropdown (header, footer, mobile menu). */
export const SOLUTIONS_MENU: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "Unified Renewable Solution (URS)",
    href: URS_PAGE.path,
    children: URS_MODULE_PAGES.map((p) => ({ label: p.short, href: p.path })),
  },
  {
    label: "PM KUSUM",
    href: PM_KUSUM_PAGE.path,
    children: KUSUM_MODULE_PAGES.map((p) => ({ label: p.short, href: p.path })),
  },
  {
    label: "LT/MV Panels",
    href: PANELS_PAGE.path,
    children: PANEL_MODULE_PAGES.map((p) => ({ label: `${p.short} Panel`, href: p.path })),
  },
  {
    label: "Water Solutions",
    href: WATER_PAGE.path,
    children: WATER_MODULE_PAGES.map((p) => ({ label: p.short, href: p.path })),
  },
  {
    label: "Industrial IoT",
    href: IOT_PAGE.path,
    children: IOT_MODULE_PAGES.map((p) => ({ label: p.short, href: p.path })),
  },
];
