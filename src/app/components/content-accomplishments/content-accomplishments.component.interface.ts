export interface Accomplishment {
  title: string;
  description: string;
  date?: string;
  category?: string;
  link?: string;
}

export interface AccomplishmentDetailed {
  company: string;
  position: string;
  details: string[];
}