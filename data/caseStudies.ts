export type CaseStudy = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "shopee",
    category: "BUSINESS STRATEGY",
    title: "Shopee Failed Delivery Case",
    subtitle: "From delivery friction to a preventive operating model",
    description:
      "Designed a data-informed framework connecting buyer readiness, COD risk, last-mile coordination, and business feasibility.",
    tags: ["Strategy", "CX", "Operations", "ROI"],
  },
  {
    id: "pv-fault",
    category: "DATA & AI",
    title: "PV Fault Detection",
    subtitle: "Machine learning for smarter solar maintenance",
    description:
      "Built classification models from real sensor data to identify photovoltaic faults and support faster maintenance decisions.",
    tags: ["Machine Learning", "Energy", "IoT", "Data"],
  },
  {
    id: "insurtech",
    category: "DIGITAL INNOVATION",
    title: "Thaivivat InsurTech",
    subtitle: "Connecting UX, data, and accident prevention",
    description:
      "Worked on an insurance innovation concept combining user experience, data processing, and deep-learning-enabled safety features.",
    tags: ["UX", "AI", "Insurance", "Business"],
  },
  {
    id: "coffee",
    category: "REAL-WORLD IMPACT",
    title: "Solar Coffee Drying",
    subtitle: "Technology designed around community needs",
    description:
      "Designed a solar-powered coffee drying system using IoT and AI to improve drying consistency, reduce crop loss, and support farmers.",
    tags: ["IoT", "AI", "Community", "Sustainability"],
  },
];
