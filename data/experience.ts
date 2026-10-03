export type ExperienceItem = {
  year: string;
  organization: string;
  role: string;
  location: string;
  impact: string;
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    year: "2025",
    organization: "Hokkaido University",
    role: "Research Engineer Intern",
    location: "Sapporo, Japan",
    impact:
      "Developed a smart floating buoy using vibration detection and FFT analysis to support more precise environmental monitoring.",
    tags: ["Research", "Data", "Sustainability"],
  },
  {
    year: "2025",
    organization: "Thaivivat Insurance",
    role: "Data Engineer Assistant",
    location: "Bangkok, Thailand",
    impact:
      "Managed data for 10,000+ motor insurance policies supporting internal digital applications and business operations.",
    tags: ["Data", "Digital", "Business Operations"],
  },
  {
    year: "2024",
    organization: "Thai Beverage Public Company Limited",
    role: "Electrical Engineering Experience",
    location: "Bangkok, Thailand",
    impact:
      "Worked across industrial electrical and energy projects including lighting design, methane energy utilization, and rooftop solar installation.",
    tags: ["Engineering", "Energy", "Operations"],
  },
];
