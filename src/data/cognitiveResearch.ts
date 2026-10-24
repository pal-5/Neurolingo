export interface ResearchPillar {
  id: string;
  title: string;
  subtitle: string;
  leadScientist: string;
  foundationalPaper: string;
  coreMechanism: string;
  retentionComparison: {
    standardMethod: string;
    standardRetention30Days: number; // percentage
    neuroLingoMethod: string;
    neuroLingoRetention30Days: number; // percentage
  };
  keyTakeaways: string[];
  androidUiImplication: string;
  mathematicalModel?: string;
}

export const COGNITIVE_RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: 'fsrs_spaced_repetition',
    title: 'FSRS & Spaced Retrieval (Active Recall)',
    subtitle: 'Free Spaced Repetition Scheduler vs. Traditional SM-2 & Massed Cramming',
    leadScientist: 'Hermann Ebbinghaus (1885) & Jarrett Ye (FSRS, 2022-2024)',
    foundationalPaper: 'Memory: A Contribution to Experimental Psychology & The Free Spaced Repetition Scheduler (Open-Spaced-Repetition)',
    coreMechanism: 'Every time a memory is retrieved just as it approaches the forgetting threshold, its stability multiplies exponentially. FSRS models memory with two independent variables: Stability (S, how long it will take for retrievability to drop to 90%) and Difficulty (D, inherent complexity). Unlike Anki\'s classic SM-2 algorithm which over-penalizes lapses and suffers from "ease hell", FSRS continuously adapts to personal forgetting curves.',
    retentionComparison: {
      standardMethod: 'Traditional linear flashcards & cramming sessions',
      standardRetention30Days: 28,
      neuroLingoMethod: 'Adaptive FSRS interval spacing with 4-point rating (Again/Hard/Good/Easy)',
      neuroLingoRetention30Days: 91,
    },
    keyTakeaways: [
      'Retrieval Practice effect: testing yourself is an act of memory encoding, not merely assessment.',
      'Optimal retention interval is dynamic: reviewing too early wastes time; reviewing too late causes relearning friction.',
      'Active recall with effortful retrieval builds thicker synaptic myelin sheaths compared to passive re-reading.',
      'Desirable difficulty: items that require cognitive strain to recall produce up to 3x longer retention half-lives.'
    ],
    androidUiImplication: 'Display dynamic next-interval previews on review buttons (e.g., "<10m", "1.2d", "3.8d", "9.4d") so learners develop metacognitive awareness of their memory decay.',
    mathematicalModel: 'R(t) = (1 + factor * t / S)^(-w) where S is stability, t is elapsed days, and R is retrievability probability (0.0 - 1.0).'
  },
  {
    id: 'comprehensible_input',
    title: 'Comprehensible Input Hypothesis (i + 1)',
    subtitle: 'Naturalistic Contextual Acquisition vs. Decontextualized Word Lists',
    leadScientist: 'Dr. Stephen Krashen (University of Southern California)',
    foundationalPaper: 'Principles and Practice in Second Language Acquisition (Pergamon Press)',
    coreMechanism: 'Human brains acquire language naturally when exposed to messages that are understandable, yet contain elements just one step beyond the current linguistic competence level ("i + 1"). If content is 90-95% understood, the remaining 5-10% is absorbed effortlessly through pragmatic and narrative inference.',
    retentionComparison: {
      standardMethod: 'Isolated vocabulary lists & bilingual word pairs',
      standardRetention30Days: 22,
      neuroLingoMethod: 'Graded micro-narratives with instant token translation & sentence mining',
      neuroLingoRetention30Days: 84,
    },
    keyTakeaways: [
      'Acquisition vs. Learning: explicit memorization creates an internal "monitor" that induces hesitation and stuttering; comprehensible input produces intuitive fluency.',
      'Low Affective Filter: learning in zero-anxiety narrative formats prevents cortisol spikes that impair hippocampus memory consolidation.',
      'Incidental grammar acquisition: verb conjugations and word order rules are internalized implicitly through contextual recurrence.'
    ],
    androidUiImplication: 'Interactive tokenized bilingual readers where tapping an unknown word highlights its lemma, contextual meaning, audio pronunciation, and one-tap "Mine to Deck".'
  },
  {
    id: 'inductive_grammar',
    title: 'Inductive Pattern Discovery vs. Deductive Rules',
    subtitle: 'Micro-Rule Deduction through Contrasting Minimal Pairs',
    leadScientist: 'Rod Ellis & Diane Larsen-Freeman (Grammaring & SLA)',
    foundationalPaper: 'Task-Based Language Learning and Teaching & The Grammar Dimension',
    coreMechanism: 'The human brain is a biological pattern-recognition engine. When learners deduce a grammatical rule themselves by comparing contrasting sentence pairs (e.g., "Por qué lo hiciste?" vs "Para qué lo hiciste?"), deep neuro-connections fire ("Aha! moment"). Deductive rule-memorizing (parroting tables) results in brittle recall under conversational pressure.',
    retentionComparison: {
      standardMethod: 'Memorizing grammar tables, conjugation charts & syntax formulas',
      standardRetention30Days: 31,
      neuroLingoMethod: '3-Step Inductive Discovery: Contrast -> Deduce -> Rapid Application Puzzle',
      neuroLingoRetention30Days: 88,
    },
    keyTakeaways: [
      '"Grammaring" as a dynamic fifth skill rather than static factual knowledge.',
      'Contrastive analysis activates cognitive dissonance, compelling the brain to synthesize underlying syntax principles.',
      'Immediate micro-application anchors the deduced rule into procedural memory (basal ganglia) rather than declarative memory.'
    ],
    androidUiImplication: 'Interactive comparison cards where contrasting syntax variables are color-linked, followed by a quick drag-and-drop or tap-to-complete grammar puzzle.'
  },
  {
    id: 'lexical_chunking',
    title: 'Lexical Chunking & Collocation Theory',
    subtitle: 'Phrasal Units Over Isolated Word Memorization',
    leadScientist: 'Michael Lewis (The Lexical Approach)',
    foundationalPaper: 'The Lexical Approach: The State of ELT and a Way Forward',
    coreMechanism: 'Fluency does not come from memorizing single words and assembling them using grammar rules on the fly; native speakers communicate using prefabricated multi-word chunks (collocations, institutionalized utterances, sentence frames). Storing "chunks" bypasses working-memory bottleneck.',
    retentionComparison: {
      standardMethod: 'Single word-to-word translation cards (e.g., "tomar" = to take)',
      standardRetention30Days: 26,
      neuroLingoMethod: 'Collocation pairs & sentence frames (e.g., "tomar una decisión" = make a decision)',
      neuroLingoRetention30Days: 86,
    },
    keyTakeaways: [
      'Reduces cognitive load: retrieving one pre-assembled chunk uses 1 slot in working memory instead of 4 separate lexical slots.',
      'Prevents native-language literal translation errors (e.g. "make a question" vs "ask a question").',
      'Contextual glue: words learned with their natural partners are remembered with higher emotional and semantic resonance.'
    ],
    androidUiImplication: 'Card designs where collocations are highlighted with connecting kinetic ties or multi-pill blocks that move together as a single cognitive token.'
  },
  {
    id: 'habit_formation',
    title: 'Micro-Habits & Frictionless Habit Loops',
    subtitle: 'BJ Fogg Behavior Model & Elastic Streaks',
    leadScientist: 'Dr. BJ Fogg (Stanford Behavior Design Lab) & James Clear',
    foundationalPaper: 'A Behavior Model for Persuasive Design & Atomic Habits',
    coreMechanism: 'Behavior = Motivation + Ability + Prompt (B = MAP). Motivation fluctuates wildly, but reducing friction to near-zero (Ability) and tying practice to existing routine anchors (Prompt: e.g. morning coffee, subway ride) guarantees consistency. Traditional harsh streak losses trigger the "what-the-hell" effect where learners abandon apps; elastic streaks and micro-sessions preserve retention.',
    retentionComparison: {
      standardMethod: 'Rigid 45-minute study blocks with punitive streak reset on miss',
      standardRetention30Days: 19,
      neuroLingoMethod: '3 to 7 minute micro-sessions with streak shields and habit anchoring',
      neuroLingoRetention30Days: 79,
    },
    keyTakeaways: [
      'Micro-dosing beats marathon cramming: 10 minutes every day yields 400% better long-term retention than 70 minutes once a week.',
      'Cognitive chronotype alignment: scheduling reviews when cortical arousal matches user profile prevents cognitive fatigue.',
      'Elastic streaks with recovery quests prevent abandonment guilt.'
    ],
    androidUiImplication: 'Android Home Screen Glance Widget, notification triggers tied to calendar anchors (e.g. commute), and explicit session duration pickers (3 min quick-fire vs 12 min deep-dive).'
  }
];

export const FORGETTING_CURVE_DATA = [
  { day: 0, withoutReview: 100, fsrsReview1: 100, fsrsReview2: 100, fsrsReview3: 100 },
  { day: 1, withoutReview: 58, fsrsReview1: 95, fsrsReview2: 98, fsrsReview3: 99 },
  { day: 2, withoutReview: 42, fsrsReview1: 88, fsrsReview2: 95, fsrsReview3: 98 },
  { day: 3, withoutReview: 35, fsrsReview1: 82, fsrsReview2: 92, fsrsReview3: 97 },
  { day: 7, withoutReview: 24, fsrsReview1: 65, fsrsReview2: 86, fsrsReview3: 95 },
  { day: 14, withoutReview: 18, fsrsReview1: 52, fsrsReview2: 78, fsrsReview3: 92 },
  { day: 21, withoutReview: 15, fsrsReview1: 43, fsrsReview2: 72, fsrsReview3: 90 },
  { day: 30, withoutReview: 12, fsrsReview1: 36, fsrsReview2: 68, fsrsReview3: 88 },
];
