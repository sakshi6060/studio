
export interface ContactInfo {
  email: string;
  website: string;
  linkedin?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: string;
  years: number;
  focus: string[];
  questions: string[];
}

export interface Highlight {
  achievement: string;
  date: string;
  metrics: string;
  questions: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
}

export interface ProjectImpact {
  [key: string]: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  impact: ProjectImpact;
  questions: string[];
  link: string;
}

export interface Blog {
  title: string;
  date: string;
  description: string;
  link: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  activities?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface OpenSourceContribution {
  repo: string;
  contributions: string[];
  link: string;
}

export interface Publication {
  title: string;
  venue: string;
  date: string;
  link: string;
  summary?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: Skill[];
  highlights: Highlight[];
  experience: ExperienceItem[];
  projects: Project[];
  blogs: Blog[];
  education?: Education;
  certifications?: Certification[];
  openSource?: OpenSourceContribution[];
  publications?: Publication[];
}
