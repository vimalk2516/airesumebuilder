export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  honors?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    technical: string[];
    soft: string[];
  };
  certifications: Certification[];
  languages: string[];
}

export interface AIEnhancedContent {
  careerSummary: string;
  enhancedSkills: string[];
  optimizedProjects: Project[];
  professionalExperience: Experience[];
  portfolioIntro: string;
}

export interface FormSteps {
  personalInfo: boolean;
  education: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  certifications: boolean;
  review: boolean;
}