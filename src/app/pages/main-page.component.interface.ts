import { Experience } from '../components/content-experiences/content-experiences.component.interface';
import { Accomplishment } from '../components/content-accomplishments/content-accomplishments.component.interface';
import { Recommendation } from '../components/content-recommendations/content-recommendations.component.interface';
import { Education } from '../components/sidebar-education/sidebar-education.component.interface';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  aboutShort?: { description: string };
  aboutLong?: { description: string };
  experiences: Experience[];
  experiencesShort?: Experience[];
  experiencesLong?: Experience[];
  experiencesDetailed?: {
    title: string;
    content: Experience[];
  };
  education: Education[];
  accomplishments: Accomplishment[];
  recommendations: Recommendation[];
  skills: {
    agile: string;
    coaching: string;
    leadership: string;
    delivery: string;
    communication: string;
    tech: string;
    languages: string;
  };
  languages: Language[];
  hobbies?: string[];
}

export interface Language {
  name: string;
  level: string;
}