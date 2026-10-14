export type CaseStudy = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  details?: { heading: string; text: string }[];
};

// TODO: Add owner-supplied process, results and reflections; do not assume metrics or achievements.
const pendingDetails = (positioning: string): NonNullable<CaseStudy["details"]> => [
  { heading: "01 — THE CHALLENGE", text: "Project challenge details to be added." },
  { heading: "02 — WHAT I DID", text: positioning },
  { heading: "03 — HOW I DID IT", text: "Project approach details to be added." },
  { heading: "04 — IMPACT / RESULTS", text: "Verified project results to be added." },
  { heading: "05 — WHAT I LEARNED", text: "Personal reflection to be added." },
];

// Single source of truth for the approved ten-project sequence.
// TODO: Supply real images for projects without an image; preserve clean placeholders.
export const caseStudies: CaseStudy[] = [
  {
    id: "shopee",
    title: "Shopee Failed Delivery — STOP → SYNC → STICK",
    category: "Business Strategy • Operations • ROI",
    subtitle: "Business Strategy • Operations • ROI",
    description: "A business and operations strategy case focused on reducing failed delivery through buyer readiness, COD risk management, delivery coordination, and measurable business impact.",
    tags: ["Business Strategy", "Operations", "ROI"],
    details: pendingDetails("A business and operations strategy case focused on reducing failed delivery through buyer readiness, COD risk management, delivery coordination, and measurable business impact."),
  },
  {
    id: "insurtech",
    title: "Thaivivat AI InsurTech + Driving Behavior Detection",
    category: "Product • AI • Insurance",
    subtitle: "Product • AI • Insurance",
    description: "An integrated InsurTech solution combining insurance product design, driving-behavior analysis, AI, safety features, and user experience.",
    tags: ["Product", "AI", "Insurance"],
    details: pendingDetails("An integrated InsurTech solution combining insurance product design, driving-behavior analysis, AI, safety features, and user experience."),
  },
  {
    id: "coffee",
    title: "Solar-Powered Coffee Drying",
    category: "Community • IoT/AI • Sustainability",
    subtitle: "Community • IoT/AI • Sustainability",
    description: "A real-world solution for coffee farmers using solar energy, IoT, and AI to improve drying consistency, reduce crop loss, and improve product quality.",
    tags: ["Community", "IoT/AI", "Sustainability"],
    details: pendingDetails("A real-world solution for coffee farmers using solar energy, IoT, and AI to improve drying consistency, reduce crop loss, and improve product quality."),
  },
  {
    id: "jobfinity",
    title: "Jobfinity — Anti-Scam / Digital Trust Platform",
    category: "Product Strategy • Digital Trust • Social Impact",
    subtitle: "Product Strategy • Digital Trust • Social Impact",
    description: "A digital trust platform designed to help users recognize, verify, and respond to job scams through practical learning and safer decision-making.",
    tags: ["Product Strategy", "Digital Trust", "Social Impact"],
    details: pendingDetails("A digital trust platform designed to help users recognize, verify, and respond to job scams through practical learning and safer decision-making."),
  },
  {
    id: "light-pipe",
    title: "Solar Light-Pipe using rPET",
    category: "Sustainable Design • Energy Efficiency • Quantified Impact",
    subtitle: "Sustainable Design • Energy Efficiency • Quantified Impact",
    description: "A sustainable daylighting solution using recycled PET materials to reduce electricity consumption and environmental impact.",
    tags: ["Sustainable Design", "Energy Efficiency", "Quantified Impact"],
    details: pendingDetails("A sustainable daylighting solution using recycled PET materials to reduce electricity consumption and environmental impact."),
  },
  {
    id: "carbon-credit",
    title: "Carbon Credit Management Tool for Farmers",
    category: "Climate-Tech • Agriculture • Business Model",
    subtitle: "Climate-Tech • Agriculture • Business Model",
    description: "A digital platform concept supporting low-carbon farming, emissions reduction, and carbon-credit management for farmers.",
    tags: ["Climate-Tech", "Agriculture", "Business Model"],
    details: pendingDetails("A digital platform concept supporting low-carbon farming, emissions reduction, and carbon-credit management for farmers."),
  },
  {
    id: "beeeco",
    title: "BeeEco — Waste to Hive",
    category: "Circular Economy • Social Enterprise • Farmer Impact",
    subtitle: "Circular Economy • Social Enterprise • Farmer Impact",
    description: "A circular-economy solution converting agricultural and plastic waste into beehives while creating additional value for farmers and supporting pollinators.",
    tags: ["Circular Economy", "Social Enterprise", "Farmer Impact"],
    details: pendingDetails("A circular-economy solution converting agricultural and plastic waste into beehives while creating additional value for farmers and supporting pollinators."),
  },
  {
    id: "pv-fault",
    title: "AI-Powered PV Fault Detection",
    category: "AI/Data • IoT • Engineering",
    subtitle: "AI/Data • IoT • Engineering",
    description: "An AI and IoT-based photovoltaic fault-detection system using real operational data to classify multiple fault conditions and support smarter solar-system monitoring.",
    tags: ["AI/Data", "IoT", "Engineering"],
    details: [
      { heading: "01 — THE CHALLENGE", text: "Solar panel faults can be difficult to distinguish from changes in operating conditions. The project explored how sensor data and machine learning could help identify different fault types." },
      { heading: "02 — WHAT I DID", text: "Built classification models using real sensor data to detect photovoltaic faults, connecting the analysis with an experimental monitoring setup." },
      { heading: "03 — HOW I DID IT", text: "Collected electrical and environmental measurements through a sensor network. The system connected MQTT, Node-RED, InfluxDB and Grafana for data collection and monitoring. Compared Decision Tree, Random Forest, AdaBoost, Gradient Boosting and XGBoost, with grid search for hyperparameter tuning." },
      { heading: "04 — IMPACT / RESULTS", text: "The prototype brought together sensor measurements, fault classification and monitoring dashboards. A confusion matrix was used to examine classification performance and support evaluation of the models." },
      { heading: "05 — WHAT I LEARNED", text: "Reliable fault detection depends on the complete workflow: collecting consistent sensor data, evaluating models carefully and making the results understandable through clear dashboards." },
    ],
    image: "/images/pv-process-path.png",
    imageAlt: "PV Fault Detection — Process Path",
    gallery: [
      { src: "/images/pv-process-path.png", alt: "PV project process from hardware setup to fault classification and dashboards", caption: "Process Path" },
      { src: "/images/pv-system-architecture.png", alt: "PV sensor network, MQTT, Node-RED, InfluxDB and Grafana architecture", caption: "System Architecture" },
      { src: "/images/pv-machine-learning.png", alt: "Machine learning classifiers and hyperparameter tuning workflow", caption: "Machine Learning" },
    ],
  },
  {
    id: "telesorting",
    title: "Telesorting / Remote Factory Control Web App",
    category: "Industry 4.0 • Automation • Digital Product",
    subtitle: "Industry 4.0 • Automation • Digital Product",
    description: "A web-based industrial control solution enabling remote machinery operation through a telesorting system and digital factory interface.",
    tags: ["Industry 4.0", "Automation", "Digital Product"],
    details: pendingDetails("A web-based industrial control solution enabling remote machinery operation through a telesorting system and digital factory interface."),
  },
  {
    id: "floating-buoy",
    title: "Smart Floating Buoy with FFT Vibration Detection",
    category: "Research • Signal Processing • Monitoring",
    subtitle: "Research • Signal Processing • Monitoring",
    description: "A smart environmental-monitoring buoy using FFT-based vibration analysis to identify frequency patterns and improve structural/environmental monitoring.",
    tags: ["Research", "Signal Processing", "Monitoring"],
    details: pendingDetails("A smart environmental-monitoring buoy using FFT-based vibration analysis to identify frequency patterns and improve structural/environmental monitoring."),
  },
];
