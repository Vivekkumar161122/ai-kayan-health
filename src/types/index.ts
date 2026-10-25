export type Language = 'en' | 'ar';

export type RiskLevel = 'optimal' | 'mild' | 'moderate' | 'elevated' | 'urgent_red_flag';

export interface AssessmentInputs {
  // Demographics
  age: number;
  maritalStatus: 'single' | 'engaged' | 'married' | 'prefer_not_to_say';
  familyPlanningTimeline: 'pre_marital' | 'future_1_2_years' | 'actively_trying' | 'general_wellness';
  durationTryingMonths: number;

  // Lifestyle & Environmental
  heatExposure: 'none' | 'occasional' | 'frequent' | 'daily_occupational'; // e.g. saunas, hot baths, outdoor extreme heat, prolonged laptop on lap
  sedentaryHoursDaily: number;
  smokingType: 'none' | 'cigarettes' | 'dokha_midwakh' | 'shisha' | 'vape';
  sleepHours: number;
  stressLevel: 'low' | 'moderate' | 'high';

  // Metabolic & Systemic
  bmi: number;
  hba1cKnown: boolean;
  hba1cValue?: number;
  hasHypertension: boolean;
  hasDyslipidemia: boolean;
  hasFattyLiver: boolean;

  // Endocrine & Gym / Supplements
  gymSupplements: 'clean' | 'protein_creatine' | 'testosterone_boosters' | 'anabolic_steroids_sarms';
  hasGynecomastia: boolean;
  hasLowLibidoOrFatigue: boolean;

  // Anatomical & Surgical
  varicoceleKnown: 'no' | 'suspected_heaviness' | 'diagnosed_grade1_2' | 'diagnosed_grade3';
  cryptorchidismHistory: boolean; // undescended testicle
  inguinalHerniaHistory: boolean;
  testicularTraumaOrTorsion: boolean;

  // Infectious & Genitourinary
  historyOfMumpsAfterPuberty: boolean;
  historyOfSTIsOrProstatitis: boolean;
  recurrentUTI: boolean;

  // Red Flags (urgent)
  hasPainlessTesticularLump: boolean;
  hasAcuteTesticularPain: boolean;
  hasHematospermia: boolean; // blood in semen
}

export interface FeatureAttribution {
  feature: string;
  category: 'lifestyle' | 'metabolic' | 'endocrine' | 'anatomical' | 'infection' | 'red_flag';
  impact: number; // positive (adds risk) or negative (lowers risk)
  direction: 'increases_risk' | 'protective' | 'neutral';
  explanationEn: string;
  explanationAr: string;
  clinicalEvidence: string;
}

export interface RiskAnalysisResult {
  overallRisk: RiskLevel;
  overallScore: number; // 0 to 100
  confidenceScore: number; // e.g. 92%
  screeningDisclaimer: {
    en: string;
    ar: string;
  };
  subScores: {
    spermatogenesis: number; // Semen parameter risk
    endocrine: number;       // Hormonal / testosterone axis
    anatomical: number;      // Varicocele / physical barriers
    lifestyle: number;       // Modifiable factors
  };
  redFlagsTriggered: string[];
  topAttributions: FeatureAttribution[];
  actionPlan: {
    timeline: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    priority: 'high' | 'medium' | 'low';
    category: 'lifestyle' | 'diagnostic' | 'clinical_visit';
  }[];
  triageRecommendation: TriageTier;
}

export interface TriageTier {
  id: 'self_care' | 'primary_care' | 'tele_andrology' | 'specialist_fertility' | 'urgent_urology';
  titleEn: string;
  titleAr: string;
  urgency: 'routine' | 'recommended_4_weeks' | 'recommended_2_weeks' | 'urgent_48_hours';
  descriptionEn: string;
  descriptionAr: string;
  recommendedActions: string[];
  suggestedFacilities: {
    nameEn: string;
    nameAr: string;
    location: string;
    type: string;
  }[];
}

export interface SimulatedPatientCase {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  archetype: string;
  archetypeAr: string;
  clinicalSummaryEn: string;
  clinicalSummaryAr: string;
  inputs: AssessmentInputs;
  expectedOutcomeEn: string;
  expectedOutcomeAr: string;
  timeToCareTraditional: string;
  timeToCareAlKayan: string;
}

export interface AtHomeDiagnosticKit {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  turnaroundHours: number;
  includes: string[];
  whoStandard: string;
  status: 'available' | 'in_transit' | 'analyzing' | 'completed';
}
