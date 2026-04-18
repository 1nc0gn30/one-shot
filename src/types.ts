export interface Prompt {
  id: string;
  title: string;
  targetModel: string;
  precisionRating: number;
  isPremium: boolean;
  category: string;
  content: string;
  whyItWorks: string;
  structure: string;
  mdSkills?: string;
  agentConfig?: string;
  tokenEfficiency: number; // 1-100
  latencyImpact: 'Low' | 'Medium' | 'High';
}
