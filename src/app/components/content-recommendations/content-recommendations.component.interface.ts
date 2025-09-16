export interface Recommendation {
  name: string;
  position: string;
  company: string;
  text: string;
  date?: string;
  linkedinUrl?: string;
}

export interface RecommendationDetailed {
  name: string;
  role: string;
  company: string;
  picture?: string;
  message: string;
}