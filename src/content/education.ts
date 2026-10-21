import type { Certification, Education } from "./types";

export const education: Education[] = [
  {
    degree: "MSc Data Science",
    institution: "Shaheed Zulfikar Ali Bhutto Institute of Science & Technology (SZABIST)",
    location: "Islamabad, Pakistan",
    period: "Jan 2019 – Oct 2021",
    grade: "CGPA 3.49 / 4.0",
    focus: ["Machine Learning", "Deep Learning", "Artificial Intelligence", "Cloud Computing", "Research Methodology"],
  },
  {
    degree: "BSc Computer Science (Software Engineering)",
    institution: "Federal Urdu University of Arts, Sciences & Technology",
    location: "Islamabad, Pakistan",
    period: "Oct 2014 – Nov 2018",
    grade: "CGPA 3.69 / 4.0",
    focus: ["Data Structures", "Databases", "Object-Oriented Programming", "Software Engineering"],
  },
];

export const certifications: Certification[] = [
  { name: "Generating Effective Prompts for AI", issuer: "IBM", year: "2026" },
  { name: "Introduction to Agent Skills", issuer: "Anthropic", year: "2026" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { name: "Claude Code 101", issuer: "Anthropic", year: "2026" },
];
