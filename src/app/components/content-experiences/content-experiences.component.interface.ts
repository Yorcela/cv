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

export type SkillCategory = 'Management' | 'Delivery' | 'Tech' | 'Product & strategy';

export interface ExperienceSkill {
  name: string;
  category: SkillCategory;
}

export type ExperienceSkillMap = Partial<Record<SkillCategory, string[]>>;
export type ExperienceSkills = ExperienceSkillMap | Array<string | ExperienceSkill>;

export interface ExperienceWithDescription {
  company: string;
  logo: string;
  position: string;
  period: string;
  description: ExperienceDescription[];
  skills: ExperienceSkills;
}
