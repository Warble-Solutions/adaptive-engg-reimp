// Open positions shown on /careers. Add / remove a job here and the listing,
// the detail page and the application form's position dropdown update automatically.

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  education: string;
  experience: string;
  type: string;
  summary: string;
  responsibilities: string[];
  required: string[];
  preferred?: string[];
  reportingTo?: string;
};

export const JOBS: Job[] = [
  {
    slug: "design-engineer-electrical-automation",
    title: "Design Engineer – Electrical Automation",
    department: "Engineering",
    location: "Ahmedabad, Gujarat",
    education: "Diploma / B.E. / B.Tech in Electrical Engineering",
    experience: "4 – 8 years",
    type: "Full-time",
    summary:
      "We are looking for an experienced Design Engineer with strong expertise in electrical and control panel design. You will prepare, review and manage engineering drawings and design activities for automation and control panels. Candidates currently located in Gujarat will be preferred.",
    responsibilities: [
      "Prepare and review GA, schematic, wiring, cable schedule, BOM and other electrical engineering drawings.",
      "Develop electrical and control panel designs using AutoCAD and EPLAN.",
      "Prepare panel layouts, wiring diagrams, terminal plans and control schematics.",
      "Select appropriate electrical and automation components based on project requirements.",
      "Ensure designs comply with applicable electrical design standards and engineering practices.",
      "Coordinate with Project, Engineering, Procurement and Manufacturing teams for smooth project execution.",
      "Review drawings and incorporate necessary technical changes or revisions.",
      "Support manufacturing and project teams with design-related technical clarifications.",
      "Manage design activities independently and ensure timely completion as per project deadlines.",
    ],
    required: [
      "4–5 years of relevant experience in Automation / Control Panel Design.",
      "Strong knowledge of AutoCAD and EPLAN.",
      "Hands-on experience in preparing electrical and control panel drawings.",
      "Good understanding of PLC, control panels, automation systems and electrical design.",
      "Knowledge of panel layout, component selection and electrical design standards.",
      "Ability to independently handle design activities and meet project deadlines.",
      "Good communication and coordination skills.",
    ],
    preferred: [
      "Experience in industrial automation and control panel manufacturing.",
      "Knowledge of PLC control systems and industrial electrical components.",
      "Ability to interpret electrical specifications and project requirements.",
      "Strong attention to detail and problem-solving skills.",
    ],
  },
  {
    slug: "qc-testing-engineer-lt-mv-panel",
    title: "QC Engineer & Testing Engineer – LT/MV Panel",
    department: "Quality Control (QC)",
    location: "Ahmedabad",
    education: "ITI Electrical / Diploma Electrical / BE Electrical",
    experience: "6 months – 2 years",
    type: "Full-time",
    summary:
      "Join our manufacturing quality team to inspect and test LT and MV electrical panels, from assembly and wiring through to FAT and customer inspections.",
    responsibilities: [
      "Perform quality inspections of LT and MV electrical panels during manufacturing.",
      "Check panel assembly, busbar installation, wiring, ferruling, cable dressing and earthing.",
      "Inspect fabricated enclosures, dimensions, welding and powder coating.",
      "Perform IR testing, HV testing, earth continuity checks and functional testing as applicable.",
      "Verify electrical wiring, control circuits, components and connections against approved drawings.",
      "Identify quality issues and coordinate corrective actions with production and manufacturing teams.",
      "Perform electrical rewiring, panel modifications, troubleshooting and rework as required.",
      "Support FAT, customer inspections and site visits.",
      "Maintain quality inspection reports, testing records and checklists.",
    ],
    required: [
      "Basic knowledge of LT and MV electrical panels.",
      "Ability to read electrical schematics, GA drawings, SLDs and wiring diagrams.",
      "Knowledge of electrical testing instruments and panel testing procedures.",
      "Basic understanding of ACBs, MCCBs, relays, contactors and control circuits.",
      "Practical knowledge of wiring, ferruling, cable termination and troubleshooting.",
      "Willingness to travel to customer sites and perform hands-on electrical work.",
      "Good problem-solving, communication and coordination skills.",
    ],
    preferred: [
      "Experience in electrical panel manufacturing, QC inspection or testing.",
      "Knowledge of PLC, HMI and VFD testing will be an added advantage.",
    ],
  },
  {
    slug: "techno-commercial-engineer",
    title: "Techno-Commercial Engineer",
    department: "Techno-Commercial",
    location: "Ahmedabad",
    education: "Diploma / B.Tech in Electrical",
    experience: "1 – 4 years",
    type: "Full-time",
    summary:
      "Review RFQs and tender documents, build cost estimates and BOMs, and prepare accurate techno-commercial offers for our renewable energy and panel solutions.",
    responsibilities: [
      "Review and interpret RFQs (Requests for Quotation), technical specifications and tender documents.",
      "Identify suitable products, equipment and systems as per client requirements.",
      "Evaluate technical compliance, identify deviations and coordinate for necessary clarifications.",
      "Prepare cost estimates, including BOM (Bill of Materials), labour, freight, warranty, taxes and duties.",
      "Coordinate with the procurement team, vendors and subcontractors to obtain competitive quotations.",
      "Assist in preparing techno-commercial offers, cost comparisons and pricing proposals.",
      "Support senior commercial managers in margin calculations, payment terms and cash flow analysis.",
      "Review commercial terms and conditions, including delivery schedules, warranties, penalties and Incoterms.",
      "Coordinate with internal teams and clients to ensure accurate and timely submission of quotations.",
    ],
    required: [
      "Strong numerical and analytical skills.",
      "Proficiency in MS Excel and other MS Office applications.",
      "Basic engineering knowledge and understanding of technical specifications.",
      "Good written and verbal communication skills.",
      "Strong negotiation and interpersonal skills.",
      "Attention to detail and ability to manage multiple quotations within deadlines.",
    ],
    preferred: [
      "Experience in techno-commercial activities, cost estimation or quotation preparation.",
      "Knowledge of BOM preparation, vendor quotation comparison and pricing calculations.",
      "Familiarity with tender documentation and commercial terms and conditions.",
      "Experience in industrial automation, electrical engineering or manufacturing will be an added advantage.",
    ],
  },
  {
    slug: "techno-commercial-engineer-fresher",
    title: "Techno-Commercial Engineer (Fresher)",
    department: "Techno-Commercial",
    location: "Ahmedabad",
    education: "Diploma / B.Tech in Electrical",
    experience: "0 – 1 year",
    type: "Full-time",
    summary:
      "An entry-level role for engineers who want to start a career in estimation and costing for industrial automation and renewable energy projects.",
    responsibilities: [
      "Assist in preparing Bill of Quantities (BOQ).",
      "Evaluate vendor quotations and compare prices.",
      "Assist in cost estimation and cost comparison.",
      "Analyse technical and commercial details of vendor quotations.",
      "Coordinate with internal teams for quotation and costing-related activities.",
    ],
    required: [
      "Strong numerical and analytical skills.",
      "Proficiency in MS Excel.",
      "Basic engineering knowledge.",
      "Good communication and coordination skills.",
      "Attention to detail and willingness to learn.",
    ],
    preferred: [
      "Basic knowledge of BOQ preparation and cost estimation.",
      "Proficiency in MS Excel and data analysis.",
      "Understanding of vendor quotation evaluation and price comparison.",
    ],
  },
  {
    slug: "supply-chain-executive",
    title: "Supply Chain Executive",
    department: "Techno-Commercial",
    location: "Ahmedabad",
    education: "Diploma / B.Tech in Electrical",
    experience: "0 – 1 year",
    type: "Full-time",
    summary:
      "Own the movement of material from purchase order to delivery – coordinating vendors, transporters, dispatch documentation and goods receipt with our store team.",
    responsibilities: [
      "Track Purchase Orders (POs) from issuance to supplier dispatch.",
      "Coordinate with vendors, transporters and freight handlers to ensure timely material delivery.",
      "Manage dispatch documentation, including e-Way Bills, Delivery Challans, Commercial Invoices and Packing Lists.",
      "Coordinate material receipt, physical verification and Goods Receipt Note (GRN) processing with the store team.",
      "Follow up with vendors regarding material shortages, transit damages and rejected goods.",
      "Maintain proper records of purchase orders, material dispatches and deliveries.",
      "Coordinate with internal departments to ensure smooth material movement and supply chain operations.",
    ],
    required: [
      "Basic knowledge of ERP systems and MS Excel.",
      "Good communication and vendor follow-up skills.",
      "Understanding of basic inventory and store management practices.",
      "Strong coordination, organisational and problem-solving skills.",
      "Willingness to learn supply chain and logistics operations.",
    ],
    preferred: [
      "Basic understanding of supply chain and logistics operations.",
      "Familiarity with ERP systems and MS Excel.",
      "Knowledge of inventory management and material documentation.",
    ],
  },
  {
    slug: "management-representative-executive",
    title: "Management Representative (MR) Executive",
    department: "Management / Administration",
    location: "Ahmedabad, Gujarat",
    education: "MBA or Graduate",
    experience: "Freshers or 1 – 2 years",
    type: "Full-time",
    reportingTo: "Senior Management Representative (Sr. MR)",
    summary:
      "Support management in monitoring business processes and project progress, maintaining records and documentation, coordinating with departments, tracking actions and deviations, and preparing reports for effective control, transparency and timely decisions.",
    responsibilities: [
      "Monitor project progress, milestones and action plans.",
      "Coordinate with departments to obtain timely updates and information.",
      "Maintain project records, registers, documentation and supporting evidence.",
      "Track pending activities, delays, deviations and corrective actions.",
      "Monitor compliance with approved procedures and reporting requirements.",
      "Prepare periodic status reports, dashboards and management summaries.",
      "Identify missing information and escalate overdue actions or exceptions.",
      "Support management reviews and process improvement initiatives.",
    ],
    required: [
      "Basic proficiency in MS Excel, MS Office, documentation and data management.",
      "Good communication, coordination and analytical ability.",
      "Attention to detail, systematic follow-up and willingness to learn.",
    ],
  },
  {
    slug: "cyber-security-specialist",
    title: "Cyber Security Specialist",
    department: "IT",
    location: "Ahmedabad",
    education: "Bachelor's degree in Computer Science, Information Technology, Information Systems or a related field",
    experience: "0 – 1 year",
    type: "Full-time",
    summary:
      "Protect AEPL's network, endpoints and data – running security audits, monitoring logs, investigating incidents and recommending controls that keep our systems and customer projects secure.",
    responsibilities: [
      "Conduct periodic security audits to identify vulnerabilities, security violations and operational inefficiencies.",
      "Configure, upgrade and maintain network infrastructure and security systems.",
      "Implement and monitor cybersecurity controls, policies and procedures.",
      "Identify, investigate and resolve security incidents and potential threats.",
      "Assess the organisation's security posture and analyse emerging cybersecurity threats.",
      "Monitor security logs, analyse network activity and prepare periodic security reports.",
      "Perform vulnerability assessments and recommend appropriate security measures.",
      "Ensure compliance with organisational security standards and procedures.",
      "Maintain antivirus, endpoint protection and other security software.",
      "Stay updated on the latest cybersecurity technologies, threats and industry best practices.",
    ],
    required: [
      "Hands-on experience in analysing security logs, network traffic and cyberattack indicators.",
      "Knowledge of vulnerability assessment and scanning tools.",
      "Proficiency in antivirus, endpoint protection and security monitoring solutions.",
      "Understanding of network security, firewalls and cybersecurity principles.",
      "Knowledge of security incident investigation and response.",
      "Strong analytical, troubleshooting and problem-solving skills.",
      "Good communication and reporting skills.",
      "Bachelor's degree in Computer Science, Information Technology, Information Systems or equivalent education or relevant work experience.",
    ],
    preferred: [
      "Knowledge of SIEM tools and security monitoring platforms.",
      "Understanding of security frameworks, policies and compliance standards.",
      "Familiarity with threat detection, risk assessment and incident response procedures.",
      "Relevant cybersecurity certifications will be an added advantage.",
    ],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);
