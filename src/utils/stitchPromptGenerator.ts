import { GoogleStitchPromptConfig } from '../types';

export function generateGoogleStitchMasterPrompt(config: GoogleStitchPromptConfig): string {
  const languageNames: Record<string, string> = {
    es: 'Spanish (Español)',
    ja: 'Japanese (日本語)',
    de: 'German (Deutsch)',
    fr: 'French (Français)',
    zh: 'Mandarin Chinese (中文)',
    it: 'Italian (Italiano)',
  };

  const targetLang = languageNames[config.targetLanguage] || 'Spanish';

  const aestheticGuides = {
    material_you_modern: {
      name: 'Android Material You 3 (Clean Editorial & Dynamic Theming)',
      colors: 'Dynamic tonal palettes, M3 elevation surfaces (surfaceContainerLow, surfaceContainerHigh), rounded-3xl (28dp) cards, tonal buttons, pill bottom navigation.',
      mood: 'Polished, authoritative, distraction-free cognitive focus, accessible contrast.',
    },
    duolingo_tactile: {
      name: 'Playful Tactile Neumorphic (Gamified Micro-Habits)',
      colors: 'Vibrant emerald, amber, and indigo accents, 3D button press depth (inset shadows, bottom border offset 4dp), lively badge rewards, animated streak flames.',
      mood: 'Friendly, highly motivating, dopamine-rich, tactile feedback.',
    },
    deep_focus_minimal: {
      name: 'Notion / Swiss Minimalist (High-Density Cognitive Workspace)',
      colors: 'Monochrome slate/zinc foundation with electric blue or amber semantic tags, razor-sharp 1px borders, subtle frosted glass cards, generous whitespace.',
      mood: 'Scholarly, immersive, zero visual clutter, scientific clarity.',
    },
    cyberpunk_zen: {
      name: 'OLED Dark Zen (Nighttime Retentive Immersion)',
      colors: 'True pitch black (#0a0a0c) surfaces, neon cyan and violet memory stability gradients, glowing progress rings, high-contrast typography.',
      mood: 'Futuristic, battery-efficient, optimized for evening circadian study.',
    },
  }[config.designAesthetic];

  return `### SYSTEM ROLE: SENIOR ANDROID UI/UX ARCHITECT & GOOGLE STITCH SPECIALIST
Act as a Principal Android Product Designer and Google Stitch Prompt Engineer specializing in Material Design 3 (M3), Jetpack Compose, and Cognitive Ergonomics.

Generate a comprehensive, production-grade Android application design specification for **"NeuroLingo"** — a next-generation adaptive language learning app built around scientifically proven cognitive acquisition methodologies (FSRS Spaced Repetition, Krashen's Comprehensible Input i+1, Inductive Grammar Discovery, and BJ Fogg Micro-Habit Loops).

---

### 1. APPLICATION IDENTITY & EXECUTIVE BRIEF
- **App Name:** NeuroLingo (Android 14 / 15 Target)
- **Primary Mission:** Eliminate language learning churn by shifting from rote memorization to cognitive neuroscience principles that guarantee >90% 30-day vocabulary and grammar retention.
- **Target Language Featured in Mockups:** ${targetLang}
- **Primary Design Aesthetic:** ${aestheticGuides.name}
- **Visual & Structural Atmosphere:** ${aestheticGuides.mood}
- **Design System Foundation:** Google Material Design 3 (M3) with Material You dynamic color tokens, Jetpack Compose layouts, minimum 48x48dp touch targets, and fluid 60/120fps motion.

---

### 2. CORE COGNITIVE PEDAGOGY ARCHITECTURE
Every screen in this design must directly embody one of the 5 foundational scientific principles:
1. **FSRS Spaced Repetition (Free Spaced Repetition Scheduler):** Dual-variable memory modeling (Stability S & Difficulty D) calculating the exact moment before memory decay ($R \\approx 90\\%$) with 4-grade active recall (Again, Hard, Good, Easy).
2. **Comprehensible Input ($i + 1$):** Graded micro-narratives where 90% of words are known context, and 10% are novel target tokens. Instant tap-to-mine inline vocabulary without leaving reading flow.
3. **Inductive Grammar Discovery:** Rule discovery through contrasting minimal pairs (e.g., Por vs Para, Akkusativ vs Dativ) rather than static grammar tables.
4. **Lexical Chunking & Collocations:** Words learned as unified multi-word phrases to bypass working memory bottlenecks.
5. **Circadian Habit Loops & Elastic Streaks:** 3-to-10 minute micro-sessions tailored to user chronotype (commute, evening wind-down) with streak recovery shields.

---

### 3. COMPLETE SCREEN-BY-SCREEN DESIGN SPECIFICATIONS

#### SCREEN 1: ADAPTIVE ONBOARDING & COGNITIVE HABIT PROFILER
- **Top App Bar:** Center-aligned M3 header with subtle step progress indicator (e.g., "Step 3 of 4: Study Habit Calibration").
- **Hero Section:** Friendly avatar or illustration indicating circadian rhythm (Sun / Coffee / Night Moon) with title: "How does your brain learn best?"
- **Interactive Habit Modules:**
  * **Daily Time Budget Selector:** Segmented tactile pill cards: [Quick Burst: 5 min] | [Standard: 15 min] | [Deep Dive: 30 min].
  * **Circadian Anchor Selector:** Chips with icons: "Morning Commute", "Lunch Reset", "Evening Wind-down", "Random Micro-breaks".
  * **Dominant Modality Picker:** Cards with visual badges:
    - Contextual Narrative (Reading & Immersion)
    - Audio Shadowing (Listening & Pronunciation)
    - Analytical Pattern (Inductive Grammar & Logic)
    - High-Speed Retrieval (FSRS Spaced Flashcards)
- **Bottom Bar:** Sticky M3 filled button with container color: "Build My Personalized Memory Engine" with subtle elevation shadow.

#### SCREEN 2: DAILY COGNITIVE HOME & RETENTION DASHBOARD
- **Status & Header:** User greeting, current CEFR badge (e.g., "Spanish B1 • 1,240 Chunks Mastered"), and Elastic Streak Flame with freeze shield count (e.g., "🔥 18 Days • 1 Shield Active").
- **Memory Decay Gauge (Ebbinghaus Widget):**
  * A circular or curved wave progress indicator displaying "Overall Retrievability: 93%".
  * Subtitle: "42 items entering optimal retrieval window today".
- **Primary Action Card (The Smart Micro-Session):**
  * Hero card with gradient container, icon, and estimated duration: "Today's Optimal Mix • 8 mins".
  * Breakdown chips: "15 FSRS Cards" + "1 Graded Story ($i+1$)" + "1 Grammar Pattern".
  * Prominent pill FAB/Button: "Begin Session (Start with Coffee ☕)".
- **Modular Study Mode Carousel:**
  1. *FSRS Flash-Decks:* Due count badge, stability indicator.
  2. *Story Immersion:* Current chapter with progress bar and $i+1$ token count.
  3. *Grammar Lab:* "Por vs Para" pattern challenge waiting.
  4. *Audio Shadowing:* Pronunciation tuner with waveform preview.
- **Bottom Navigation Bar:** 4 M3 navigation items: [Home], [Learn/Library], [Retention Matrix], [Profile].

#### SCREEN 3: FSRS FLASH-DECK INTERACTION (ACTIVE RECALL & COLLOCATIONS)
- **Top Bar:** Progress bar showing session progress (e.g., 7 / 20), deck name, and settings gear.
- **Main Flashcard (Card Elevated 3dp, rounded-3xl):**
  * **Word & Lemma:** Extra-large bold typography with subtle phonetic transcription (IPA) underneath.
  * **Audio Speaker Button:** Circular tonal icon button (44dp) with wave animation on tap for native pronunciation.
  * **Grammar/POS Tag:** Soft colored chip (e.g., "Idiomatic Locution" or "Transitive Verb").
  * **Collocation Chunk Box:** Highlighted callout showcasing the natural partner phrase (e.g., "Tener que + [Madrugar]").
  * **Flip/Reveal Trigger:** Tactile button or swipe gesture: "Tap to Reveal Meaning & Context".
- **Card Back (Post-Flip State):**
  * Clear target translation with highlighted keywords.
  * **Contextual Example:** Full sentence with the target word emphasized, plus English translation.
  * **Cognitive Mnemonic Box:** Lightbulb icon + memorable visual anchor.
  * **Etymology & Morphological Breakdown:** How the word was constructed historically.
- **Bottom Interval Response Grid (The Core FSRS Component):**
  * 4 horizontal action buttons, each with specific interval prediction:
    1. **Again (<10m):** Rose/Red tonal button for missed retrieval.
    2. **Hard (1d):** Amber/Orange tonal button for high-effort recall.
    3. **Good (3d):** Teal/Blue filled button (primary default choice).
    4. **Easy (7d):** Emerald/Green tonal button for instantaneous fluency.
  * Each button displays the exact interval timestamp below the label to build learner metacognition.

#### SCREEN 4: COMPREHENSIBLE INPUT STORY READER ($i + 1$)
- **Top Bar:** Back arrow, story title ("El Misterio del Café Silencioso"), CEFR level pill (A2), and Audio Playback speed pill (0.8x / 1.0x).
- **Audio Scroller Bar:** Floating miniature waveform player with Play/Pause button and synchronized sentence tracking.
- **Narrative Reading Canvas:**
  * Clean typographic layout with 1.6 line height and comfortable margins.
  * Text is tokenized into interactive words.
  * **Standard Known Words:** Clean charcoal/slate text.
  * **$i + 1$ Target Words:** Highlighted with a dotted underline and soft accent pill background.
- **Interactive Word-Sheet Modal (Triggered on Word Tap):**
  * Bottom sheet (rounded-t-3xl) popping up smoothly:
  * Word + IPA + Part of Speech + In-context meaning.
  * Audio pronunciation button with repeat loop.
  * Secondary button: "⚡ Add to FSRS Review Deck" (with 1-tap confirmation animation).

#### SCREEN 5: INDUCTIVE GRAMMAR DISCOVERY LAB
- **Concept Header:** "Discovery Challenge: Por vs. Para (Cause vs. Goal)".
- **Phase 1: Contrastive Minimal Pair Cards:**
  * 2 or 3 side-by-side or stacked comparative examples with color-linked variables:
    - Card A: "Estudio medicina PARA ayudar a los enfermos." (Highlighted green: forward-pointing goal).
    - Card B: "Llegué tarde POR el tráfico." (Highlighted orange: backward-pointing cause).
- **Phase 2: The Self-Deduction Prompt:**
  * "What pattern do you notice about when to use 'Para'?"
  * Multiple choice deduction options with immediate explanatory payoff.
- **Phase 3: Rapid Interactive Application Puzzle:**
  * Fill-in-the-blank sentence: "Gracias _____ tu ayuda, llegaré a tiempo _____ la fiesta."
  * Drag-and-drop or tap-to-slot pills for [por] and [para].
  * Instant feedback banner with the core mnemonic formula.

#### SCREEN 6: LONG-TERM RETENTION MATRIX & EBBINGHAUS DECAY MAP
- **Header:** "Memory Stability Architecture".
- **Interactive Forgetting Curve Graph:**
  * Line graph comparing "Without Spaced Review" (steep drop to 12% at Day 30) vs. "With NeuroLingo FSRS" (stabilized at 91%).
  * Current position indicator with day markers.
- **Lexical Stability Breakdown:**
  * Grid of 4 stability tiers:
    - Level 4: Permanent / Fluency (>90 days stability) - 412 words
    - Level 3: Strong Recall (21-90 days stability) - 380 words
    - Level 2: Developing (5-20 days stability) - 240 words
    - Level 1: Fragile / New (<5 days stability) - 168 words
- **Upcoming Review Forecast Heatmap:**
  * Weekly calendar bar chart showing predicted review load to prevent overwhelm.

---

### 4. DESIGN SYSTEM SPECIFICATIONS (MATERIAL 3 TOKENS)
- **Color Tokens (Light & Dark Mode):**
  * Primary: \`#2563EB\` (M3 Sys Primary) / Dark: \`#93C5FD\`
  * Primary Container: \`#DBEAFE\` / Dark: \`#1E3A8A\`
  * Secondary (Cognitive Teal): \`#0D9488\` / Dark: \`#2DD4BF\`
  * Memory Retention Green (Stable): \`#16A34A\` / Container: \`#DCFCE7\`
  * Memory Warning Amber (Due): \`#D97706\` / Container: \`#FEF3C7\`
  * Memory Lapse Red (Again): \`#DC2626\` / Container: \`#FEE2E2\`
  * Neutral Surface: \`#F8FAFC\` / Dark Surface: \`#0F172A\`
- **Typography Scale:**
  * Display Large: 36sp, Roboto Flex / Plus Jakarta Sans, Bold
  * Headline Medium: 24sp, SemiBold
  * Title Medium: 18sp, Medium
  * Body Large: 16sp, Line Height 24sp, Regular
  * Label Small: 11sp, All Caps Tracking +0.5, SemiBold
- **Component Geometry:**
  * Large Action Cards: 24dp corner radius (\`RoundedCornerShape(24.dp)\`)
  * Buttons & Badges: Pill shape (\`RoundedCornerShape(percent = 50)\`)
  * Touch Target Padding: Minimum \`48.dp\` height and width for accessibility compliance.
  * Elevation: Subtle 1dp to 3dp tonal elevation rather than heavy drop shadows.

---

### 5. JETPACK COMPOSE COMPONENT HIERARCHY
\`\`\`kotlin
// Core screen composition structure for Android implementation
@Composable
fun NeuroLingoApp() {
    NeuroLingoTheme {
        Scaffold(
            bottomBar = { NeuroLingoNavigationBar(...) }
        ) { paddingValues ->
            NavHost(modifier = Modifier.padding(paddingValues)) {
                composable("home") { RetentionHomeScreen(...) }
                composable("fsrs_review") { FsrsFlashcardScreen(...) }
                composable("story_reader") { ComprehensibleReaderScreen(...) }
                composable("grammar_lab") { InductiveGrammarScreen(...) }
                composable("analytics") { MemoryRetentionMatrixScreen(...) }
            }
        }
    }
}
\`\`\`

---

### 6. PROMPT USAGE INSTRUCTIONS FOR GOOGLE STITCH
1. Paste this complete prompt directly into **Google Stitch** to generate the entire Android UI kit, design flows, and wireframes.
2. For screen-by-screen iterations, focus on the individual screen sections above.
3. Request Stitch to output Figma design tokens, Jetpack Compose UI code snippets, or interactive prototypes.
`;
}

export function getScreenSpecificStitchPrompts(config: GoogleStitchPromptConfig) {
  const languageNames: Record<string, string> = {
    es: 'Spanish',
    ja: 'Japanese',
    de: 'German',
    fr: 'French',
    zh: 'Mandarin',
    it: 'Italian',
  };
  const lang = languageNames[config.targetLanguage] || 'Spanish';

  return [
    {
      screenId: 'fsrs_card',
      title: 'FSRS Spaced Repetition Card Screen',
      prompt: `Design an Android Material Design 3 screen for the FSRS Spaced Repetition Flashcard flow in a ${lang} language learning app named NeuroLingo.
Features needed:
- Top app bar with session progress indicator (e.g. Card 8 of 20) and deck title.
- Central 24dp rounded elevation card displaying target word with large typography, IPA phonetic guide, part-of-speech badge, and high-frequency collocation chunk.
- Audio speaker button with touch wave ripple for native audio pronunciation.
- Revealing contextual example sentence with target word highlighted.
- Lightbulb mnemonic callout box and etymological breakdown.
- Bottom 4-button FSRS rating bar with dynamic interval previews: [Again (<10m)], [Hard (1d)], [Good (3d)], [Easy (7d)].
- Material You color palette, accessible touch targets (>=48dp), clean distraction-free layout.`,
    },
    {
      screenId: 'story_reader',
      title: 'Comprehensible Input (i+1) Story Reader',
      prompt: `Design an Android Material Design 3 screen for a Comprehensible Input (i+1) graded bilingual reader for learning ${lang}.
Features needed:
- Top bar with story title, CEFR level badge (A2), and audio speed controller (0.8x / 1.0x).
- Sticky floating mini audio player with play/pause and synchronized sentence tracker.
- Narrative text area with large comfortable reading typography (16sp/24sp line height).
- Interactive tokenized words: known words in standard slate color, target i+1 words highlighted in soft pastel amber pill with subtle dotted underline.
- Bottom sheet modal triggered on word tap: shows instantaneous definition, role in grammar, audio replay, and a 1-tap "Save to FSRS Review Deck" button.`,
    },
    {
      screenId: 'grammar_lab',
      title: 'Inductive Grammar Discovery Lab',
      prompt: `Design an Android Material Design 3 screen for an Inductive Grammar Discovery Lab for ${lang}.
Features needed:
- Clean header with the grammar contrast goal (e.g., "POR vs. PARA: Cause vs. Ultimate Purpose").
- 2 contrasting minimal pair cards side-by-side with color-highlighted syntactic differences and deduction callout notes.
- Interactive question asking the user to deduce the underlying linguistic rule.
- Drag-and-drop or tap-to-complete sentence challenge testing immediate application.
- Bottom summary card containing a memorable visual mnemonic takeaway formula.`,
    },
    {
      screenId: 'retention_dashboard',
      title: 'Cognitive Retention Dashboard & Memory Decay Map',
      prompt: `Design an Android Material Design 3 home dashboard and memory retention tracker screen for NeuroLingo.
Features needed:
- Header with user greeting, CEFR level badge, and Elastic Streak tracker with freeze shields.
- Circular or wave-based Ebbinghaus Memory Decay gauge showing current retention health (e.g. 93% retrievability).
- Hero recommendation card: "Today's Optimal Micro-Session (8 min)" with breakdown of FSRS reviews and new content.
- Interactive forgetting curve graph comparing review retention vs standard decay over 30 days.
- 4-tier lexical stability breakdown cards (Permanent, Strong, Developing, Fragile).
- M3 Bottom Navigation Bar with Home, Library, Memory Matrix, and Profile icons.`,
    },
  ];
}
