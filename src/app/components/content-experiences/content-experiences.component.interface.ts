export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements?: string[];
  technologies: string[];
}

export interface ExperienceDetailed {
  title: string;
  details?: string[];
  isSubheading?: boolean;
}

export interface ExperienceTask {
  category: string;
  tasks: string[];
}

export interface ExperienceDescription {
  [clientName: string]: ExperienceTask[];
}

export interface ExperienceWithDescription {
  company: string;
  logo: string;
  position: string;
  period: string;
  description: ExperienceDescription[];
  skills: string[];
}