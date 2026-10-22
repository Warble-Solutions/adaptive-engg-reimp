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
  | { type: "modules"; eyebrow: string; title: string; lead?: string };

export type SolutionPageData = {
  slug: string;
  path: string;
  name: string;
  /** Short label used in menus and tags */
  short: string;
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
      type: "cards",
      eyebrow: "Solutions",
      title: "Everything a PM KUSUM portfolio needs",
      items: [
        { title: "RMS", desc: "IoT-based edge computing for data acquisition and control.", icon: "cpu" },
        { title: "CMS", desc: "Advanced monitoring and analytics for renewable energy portfolios.", icon: "grid" },
        { title: "AMS", desc: "Asset data, maintenance, inventory, work orders, analytics & reports.", icon: "wrench" },
        { title: "ReportWiz", desc: "KPI insights, custom & scheduled reports and multi-format export.", icon: "file" },
        { title: "WMS", desc: "Real-time weather data, IEC-standard sensors and forecast analytics.", icon: "sun" },
        { title: "LT/MV Panels", desc: "Type-tested, modular panels with native SCADA integration and QR code access.", icon: "panel" },
      ],
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

export const ALL_SOLUTION_PAGES = [URS_PAGE, ...URS_MODULE_PAGES, PM_KUSUM_PAGE, PANELS_PAGE];

/** Navigation tree for the Solutions dropdown (header, footer, mobile menu). */
export const SOLUTIONS_MENU: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "Unified Renewable Solution (URS)",
    href: URS_PAGE.path,
    children: URS_MODULE_PAGES.map((p) => ({ label: p.short, href: p.path })),
  },
  { label: "PM KUSUM", href: PM_KUSUM_PAGE.path },
  { label: "LT/MV Panels", href: PANELS_PAGE.path },
];
