export type ExperienceItem = {
  year?: string;
  period?: string;
  organization: string;
  logo: string;
  role: string;
  location?: string;
  impact?: string;
  responsibilities?: string[];
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    year: "2026",
    period: "February–April 2026",
    organization: "Rewastec",
    logo: "/images/experience/rewastec.png",
    role: "Business Development Intern",
    location: "Bangkok, Thailand",
    // TODO: Draft impact and tags for review; replace with confirmed responsibilities.
    impact:
      "Supported business development through market research, identifying potential partners, and exploring opportunities for sustainable business growth.",
    tags: ["Business Development", "Market Research", "Sustainability"],
  },
  {
    year: "2025",
    period: "June–August 2025",
    organization: "Hokkaido University, School of Engineering",
    logo: "/images/experience/hokkaido.png",
    role: "Research Engineer Intern",
    location: "Sapporo, Japan",
    responsibilities: [
      "Designed a precision analog front-end for an optical sensor IC using a silicon photodiode and a custom transimpedance amplifier (TIA) built around the OP07.",
      "Developed DAQ integration and a LabVIEW interface for calibration, signal processing, and data logging.",
    ],
    tags: ["Analog Circuit Design", "DAQ", "LabVIEW", "Signal Processing"],
  },
  {
    year: "2024",
    period: "June–July 2024",
    organization: "Thai Beverage Public Company Limited",
    logo: "/images/experience/thaibev.png",
    role: "Electrical Engineer",
    location: "Bangkok, Thailand",
    responsibilities: [
      "Designed lighting for a three-story office at The Red Bull Beverage Company Limited.",
      "Managed methane gas (CH₄) energy utilization at Kaen Kwan Company.",
      "Designed and installed rooftop solar panels.",
    ],
    tags: ["Lighting Design", "Energy Utilization", "Solar Installation"],
  },
  {
    year: "2023",
    period: "June–July 2023",
    organization: "Thaivivat Insurance Public Company Limited",
    logo: "/images/experience/thaivivat.png",
    role: "Data Engineer Assistant",
    location: "Bangkok, Thailand",
    responsibilities: [
      "Managed database records supporting internal applications at Thaivivat Insurance.",
      "Maintained customer data for more than 10,000 motor insurance policies.",
    ],
    tags: ["Data Management", "Databases", "Insurance Operations"],
  },
];
