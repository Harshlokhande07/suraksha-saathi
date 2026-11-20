export type Language = 'hi' | 'mr' | 'en';

export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AnalysisResponse {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number;
  riskSummary: string;
  riskSummaryHi: string;
  riskSummaryMr: string;
  warningSigns: string[];
  recommendedActions: string[];
  officialHelpline: string;
  uncertaintyDisclaimer: string;
  detectedCategories: string[];
  isUnverifiedUrl: boolean;
}

export interface LearnTopic {
  id: string;
  title: Record<Language, string>;
  category: string;
  summary: Record<Language, string>;
  fullGuide: Record<Language, string>;
  audioScript: Record<Language, string>;
  redFlags: Record<Language, string[]>;
  goldenRules: Record<Language, string[]>;
  quiz: {
    question: Record<Language, string>;
    options: Record<Language, string[]>;
    correctIndex: number;
    explanation: Record<Language, string>;
  };
}

export interface UPIScenario {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  senderName: string;
  vpa: string;
  amount: number;
  type: 'COLLECT_REQUEST' | 'PAYMENT_REQUEST' | 'QR_CODE_RECEIVE' | 'GENUINE_BILL';
  isScam: boolean;
  scamExplanation: Record<Language, string>;
  actionPrompt: Record<Language, string>;
}

export interface WebsiteSimulation {
  id: string;
  title: Record<Language, string>;
  type: 'PHISHING' | 'GENUINE';
  url: string;
  visualPreview: {
    brand: string;
    headline: Record<Language, string>;
    buttonText: Record<Language, string>;
    suspiciousClues: Record<Language, string[]>;
  };
  explanation: Record<Language, string>;
}
