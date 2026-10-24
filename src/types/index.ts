export type TargetLanguage = 'es' | 'ja' | 'de' | 'fr' | 'zh' | 'it';

export interface LanguageInfo {
  id: TargetLanguage;
  name: string;
  flag: string;
  locale: string;
  level: string;
  nativeSample: string;
}

export type StudyMethodType = 
  | 'fsrs_spaced_repetition'
  | 'comprehensible_input'
  | 'inductive_grammar'
  | 'active_cloze'
  | 'collocation_chunks';

export interface StudyMethodInfo {
  id: StudyMethodType;
  title: string;
  scientificBasis: string;
  retentionImpact: string;
  bestFor: string;
  iconName: string;
  shortDescription: string;
  cognitivePillar: string;
}

export interface FlashcardItem {
  id: string;
  language: TargetLanguage;
  word: string;
  phonetic: string;
  translation: string;
  partOfSpeech: string;
  collocation: string;
  exampleSentence: string;
  exampleTranslation: string;
  mnemonic: string;
  etymologyOrBreakdown: string;
  // FSRS state
  stability: number; // in days
  difficulty: number; // 1-10
  reps: number;
  lapses: number;
  lastReviewed?: string;
  nextReviewInDays: number;
  retrievability: number; // 0-100%
}

export interface StorySentence {
  id: string;
  text: string;
  translation: string;
  tokens: {
    text: string;
    translation: string;
    role?: string;
    isKeyTarget?: boolean;
    lemma?: string;
  }[];
}

export interface ComprehensibleStory {
  id: string;
  language: TargetLanguage;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  summary: string;
  iPlusOneTokensCount: number;
  sentences: StorySentence[];
}

export interface GrammarPuzzle {
  id: string;
  language: TargetLanguage;
  ruleTitle: string;
  concept: string; // e.g. "Por vs Para (Purpose vs Cause)"
  inductiveClues: {
    sentence: string;
    translation: string;
    highlight: string;
    deductionNote: string;
  }[];
  challengeQuestion: string;
  contextSentence: string;
  missingPartPlaceholder: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  mnemonicTakeaway: string;
}

export interface UserHabitProfile {
  targetLanguage: TargetLanguage;
  currentCefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  dailyGoalMinutes: number; // e.g. 10, 15, 25
  chronotype: 'morning_commute' | 'afternoon_break' | 'evening_winddown' | 'micro_bursts';
  dominantModality: 'visual_context' | 'auditory_shadowing' | 'inductive_discovery' | 'retrieval_heavy';
  streakDays: number;
  wordsMastered: number;
  retentionRatePct: number;
  lastSessionDate: string;
}

export interface GoogleStitchPromptConfig {
  designAesthetic: 'material_you_modern' | 'duolingo_tactile' | 'deep_focus_minimal' | 'cyberpunk_zen';
  targetLanguage: TargetLanguage;
  includedScreens: string[];
  includeKotlinTokens: boolean;
  includeAccessibilitySpecs: boolean;
  includeCognitiveAnnotations: boolean;
}
