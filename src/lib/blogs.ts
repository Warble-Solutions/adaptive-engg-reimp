// ============================================================================
//  BLOGS
//  - blogs-archive.json: posts recovered from the old adaptive-engg.com blog
//    (via the Internet Archive), cleaned up. Generated – edit with care.
//  - NEW_POSTS: posts written for the new site (from the previous rebuild).
// ============================================================================
import archive from "./blogs-archive.json";

export type Blog = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD), if known */
  date: string | null;
  excerpt: string;
  image: string | null;
  html: string;
  /** Old URLs of the same post (re-posts), redirected to this one */
  aliases?: string[];
};

const NEW_POSTS: Blog[] = [
  {
    slug: "how-ems-turns-battery-storage-into-revenue",
    title: "How Energy Management Systems Turn Battery Storage into a Revenue-Generating Asset",
    date: null,
    excerpt:
      "Battery Energy Storage Systems are becoming more than backup assets. With the right EMS, they can participate in energy arbitrage, ancillary services, capacity support and grid flexibility – but only when performance is continuously managed.",
    image: "/blog/bess-revenue.webp",
    html: `<p>Battery Energy Storage Systems (BESS) are becoming more than backup or energy-shifting assets. With the right operational strategy, they can participate in multiple value streams, including energy arbitrage, ancillary services, capacity support, and grid flexibility.</p>
<p>But storing energy is only part of the equation. The real value comes from knowing <strong>when to charge, when to discharge, how the battery is performing, and whether it is delivering what the grid requires</strong>.</p>
<p>This is where an Energy Management System (EMS) becomes critical.</p>
<h2>From Battery Storage to Revenue</h2>
<p>Energy storage can create value through applications such as energy arbitrage, capacity support, and ancillary services. According to the International Energy Agency (IEA), battery storage is increasingly being used to provide flexibility and fast-response services to power systems.</p>
<p>An EMS helps operators capture this value by bringing battery data, grid signals, dispatch instructions, and equipment performance into a single operational view.</p>
<h2>1. Improve Dispatch Accuracy</h2>
<p>A battery generates value when it delivers energy when required.</p>
<p>An EMS continuously monitors instructed versus delivered energy, SOC, availability, and dispatch performance. This allows operators to identify deviations quickly and take corrective action before missed performance turns into lost revenue.</p>
<p>AEPL EMS provides continuous performance monitoring to help identify dispatch deviations and protect the revenue associated with battery availability and performance.</p>
<h2>2. Monitor What Actually Drives Performance</h2>
<p>Battery throughput alone does not indicate whether an asset is performing efficiently.</p>
<p>Key metrics such as <strong>Round-Trip Efficiency, State of Health, SOC compliance, availability, and degradation</strong> provide a clearer picture of the battery's actual condition.</p>
<p>With this information, operators can identify performance losses early and make better maintenance and operational decisions.</p>
<h2>3. Reduce Downtime</h2>
<p>Every minute of unnecessary downtime can mean missed dispatch opportunities.</p>
<p>An EMS helps reduce this risk through intelligent alarm and event management. Critical faults can be prioritised based on severity and business impact, while time-stamped event histories help teams identify recurring problems.</p>
<p>This enables O&amp;M teams to move from reactive troubleshooting towards faster and more targeted action.</p>
<h2>4. See Problems Beyond the Plant Average</h2>
<p>A battery plant may appear healthy at an overall level while individual racks or modules are underperforming.</p>
<p>Granular monitoring provides visibility down to rack, module, and cell-group levels, helping identify imbalance, thermal drift, capacity fade, and other issues that may remain hidden in plant-level averages.</p>
<p>AEPL EMS provides rack heatmaps, BMS and PCS status, and device-level diagnostics to support targeted maintenance and protect long-term asset value.</p>
<h2>Why EMS Matters for the Business</h2>
<p>Battery storage can generate value from multiple services, but performance must be continuously managed to capture that value effectively. NREL research highlights energy arbitrage and ancillary services among the potential value streams for energy storage.</p>
<p>An intelligent EMS helps connect these opportunities with day-to-day plant operations.</p>
<p>Better visibility can mean:</p>
<p><strong>Faster fault detection → Higher availability → Better dispatch performance → Reduced losses → Stronger asset economics</strong></p>
<h2>Turning Every Kilowatt-Hour into Measurable Value</h2>
<p>The business case for an EMS is not simply about having another monitoring dashboard. It is about making battery performance <strong>visible, measurable, and actionable</strong>.</p>
<p>AEPL EMS brings fleet-level visibility down to individual racks and devices while providing performance analytics, alarm management, electrical-system visibility, grid-aware operations, and automated reporting.</p>
<p>For battery owners and operators, this means moving from:</p>
<blockquote>"How much energy did the battery store?"</blockquote>
<p>to:</p>
<blockquote>"How much value did the battery actually deliver?"</blockquote>
<h2>References</h2>
<ul>
<li>National Renewable Energy Laboratory (NREL) – Battery Storage Unlocked: Lessons Learned from Emerging Economies</li>
<li>National Renewable Energy Laboratory (NREL) – Practical Operations of Energy Storage Providing Ancillary Services</li>
<li>International Energy Agency (IEA) – Battery storage is scaling up and taking on a larger system role</li>
</ul>`,
  },
  {
    slug: "what-is-ems-for-bess-complete-guide",
    title: "What Is an Energy Management System (EMS) for Battery Energy Storage (BESS)? A Complete Guide",
    date: null,
    excerpt:
      "A battery alone doesn't generate revenue – it's the EMS that turns stored energy into a dispatchable, contract-compliant asset. This guide covers standardised EMS engineering, core capabilities and measurable business outcomes.",
    image: "/blog/bess-guide.webp",
    html: `<p>Utility-scale solar, wind, and hybrid plants increasingly pair with Battery Energy Storage Systems (BESS), but a battery alone doesn't generate revenue. It's the <strong>Energy Management System (EMS)</strong> that turns stored energy into a dispatchable, contract-compliant asset. An EMS is the single decision-making layer that coordinates battery racks, PCS/inverters, BMS controllers, transformers, protection relays, and the plant SCADA/PPC to work as one system.</p>
<h2>Why EMS Engineering Matters for BESS Performance</h2>
<p>A poorly engineered EMS creates hidden risk that surfaces at the worst possible moments – during a frequency event, a State of Charge (SOC) boundary condition, or a future capacity expansion. The core issue isn't the technology itself, but inconsistency: when every project is built from scratch, each plant ends up with unique tag names, dispatch logic, SOC-management rules, and alarm behaviour, leading to longer engineering cycles, error-prone commissioning, and steep operator learning curves.</p>
<p>A capable EMS partner prevents this by combining <strong>standardised, field-tested control logic with commissioning discipline</strong>; the result is a BESS that dispatches exactly as specified, cycle after cycle.</p>
<h2>Core Components of a Standardised EMS</h2>
<p>AEPL's standardised approach is built on a governed, reusable engineering library covering dispatch function blocks, SOC-management logic, faceplates, alarms, trends, navigation, and communication templates. Rather than improvising each project, engineers assemble every BESS EMS from proven, pre-validated building blocks – the same "develop once, reuse everywhere" principle that underpins the modular engineering concept.</p>
<h2>Key EMS Capabilities That Drive Business Outcomes</h2>
<p><strong>Real-time fleet visibility:</strong> a unified dashboard brings live SOC, dispatch status, alarms, and grid signals into a single view, enabling drill-down from whole-plant to a single rack in seconds.</p>
<p><strong>Performance intelligence:</strong> continuous tracking of Round-Trip Efficiency, State of Health, SOC-boundary compliance, and dispatch accuracy versus instruction, benchmarked against the contracted duty cycle.</p>
<p><strong>Granular device monitoring:</strong> rack-level heatmaps and module/cell-group monitoring expose underperformance that portfolio-level averages hide, protecting long-term capacity and warranty claims.</p>
<p><strong>Alarm and event management:</strong> prioritised, time-stamped alarms compress fault-to-fix time and reduce alarm fatigue.</p>
<p><strong>Grid-context dispatch accuracy:</strong> live grid frequency, dispatch instructions, and ambient/cell temperature feed directly into performance calculations, so KPIs are judged fairly against what the plant was actually instructed to do.</p>
<h2>Business Impact of a Well-Engineered EMS</h2>
<p>Standardisation converts directly into measurable value across engineering, operations, maintenance, and business outcomes – including faster EMS development, reduced downtime, easier O&amp;M, and lower lifecycle cost. On the commercial side, a capable EMS platform recovers dispatch that would otherwise be silently lost, protects availability-linked payments and PPA guarantees, and lowers operating cost through automated reporting and targeted maintenance.</p>
<h2>Frequently Asked Questions</h2>
<p><strong>What does an EMS do for a BESS?</strong><br/>It acts as the decision-making layer that coordinates battery racks, PCS, BMS, and grid interfaces to keep the plant dispatching safely, compliantly, and predictably.</p>
<p><strong>Why does EMS standardisation matter?</strong><br/>It removes the inconsistency of building every project from scratch, resulting in faster commissioning, fewer errors, and easier long-term maintenance.</p>
<p><strong>How does an EMS protect BESS revenue?</strong><br/>By detecting SOC or setpoint deviations the moment they occur, rather than at month-end – recovering dispatch that would otherwise be lost silently.</p>`,
  },
];

const fmt = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

/** All posts, newest first (undated new posts first). */
export const BLOGS: (Blog & { dateLabel: string })[] = [...NEW_POSTS, ...(archive as Blog[])].map((b) => ({ ...b, dateLabel: fmt(b.date) }));

export const getBlog = (slug: string) => BLOGS.find((b) => b.slug === slug);

