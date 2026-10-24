import { TargetLanguage, LanguageInfo, FlashcardItem, ComprehensibleStory, GrammarPuzzle, StudyMethodInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { id: 'es', name: 'Spanish', flag: '🇪🇸', locale: 'es-ES', level: 'A2 High Beginner', nativeSample: '¡Hola! Vamos a dominar el español juntos.' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', locale: 'ja-JP', level: 'N5-N4 Elementary', nativeSample: 'こんにちは！自然な日本語を身につけましょう。' },
  { id: 'de', name: 'German', flag: '🇩🇪', locale: 'de-DE', level: 'A2 Pre-Intermediate', nativeSample: 'Hallo! Wir lernen Deutsch mit System.' },
  { id: 'fr', name: 'French', flag: '🇫🇷', locale: 'fr-FR', level: 'A2 High Beginner', nativeSample: 'Bonjour ! Apprenons le français naturellement.' },
];

export const STUDY_METHODS: StudyMethodInfo[] = [
  {
    id: 'fsrs_spaced_repetition',
    title: 'FSRS Spaced Repetition',
    scientificBasis: 'Ebbinghaus Decay Curve & Modern FSRS Stability / Retrievability Math',
    retentionImpact: '+320% vs Linear Cramming',
    bestFor: 'High-frequency vocabulary, collocations, false friends',
    iconName: 'Zap',
    cognitivePillar: 'Active Retrieval & Desirable Difficulty',
    shortDescription: 'Flashcards calibrated dynamically to the moment of near-forgetting.'
  },
  {
    id: 'comprehensible_input',
    title: 'Comprehensible Input (i+1)',
    scientificBasis: 'Stephen Krashen SLA Acquisition Theory (90% known, 10% new)',
    retentionImpact: '+280% vs Word-Pair Memorization',
    bestFor: 'Reading fluency, listening intuition, narrative vocabulary',
    iconName: 'BookOpen',
    cognitivePillar: 'Subconscious Context Acquisition & Low Affective Filter',
    shortDescription: 'Graded bilingual stories with instant tokenized sentence mining.'
  },
  {
    id: 'inductive_grammar',
    title: 'Inductive Pattern Discovery',
    scientificBasis: 'Rod Ellis Task-Based Grammaring & Minimal Pair Deduction',
    retentionImpact: '+240% vs Conjugation Drills',
    bestFor: 'Nuanced grammar (subjunctive, case system, particles)',
    iconName: 'Sparkles',
    cognitivePillar: 'Procedural Memory & Self-Generated Deduction',
    shortDescription: 'Deduce grammar rules from real contrasted patterns, not grammar charts.'
  },
  {
    id: 'active_cloze',
    title: 'Active Cloze & Audio Shadowing',
    scientificBasis: 'Paivio Dual Coding & Speech-Motor Production Feedback',
    retentionImpact: '+210% vs Silent Reading',
    bestFor: 'Conversational reaction speed, sentence building, accent tuning',
    iconName: 'Headphones',
    cognitivePillar: 'Audio-Kinesthetic Encoding',
    shortDescription: 'Listen, shadow out loud, and reconstruct missing structural keys.'
  },
  {
    id: 'collocation_chunks',
    title: 'Lexical Collocation Chunks',
    scientificBasis: 'Michael Lewis Lexical Approach (Pre-assembled mental units)',
    retentionImpact: '+260% Working Memory Efficiency',
    bestFor: 'Natural idiom, native phrasings, eliminating literal translation',
    iconName: 'Layers',
    cognitivePillar: 'Chunking & Cognitive Load Reduction',
    shortDescription: 'Learn words tied to their natural partners rather than in isolation.'
  }
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  // Spanish
  {
    id: 'es-1',
    language: 'es',
    word: 'Madrugar',
    phonetic: '/ma.ðɾuˈɣaɾ/',
    translation: 'To wake up very early in the morning',
    partOfSpeech: 'Verb',
    collocation: 'Tener que madrugar (to have to get up at dawn)',
    exampleSentence: 'A quien madruga, Dios le ayuda.',
    exampleTranslation: 'The early bird catches the worm (lit. God helps those who rise early).',
    mnemonic: 'Think of "Ma\' drugs" - your mom taking early medicine at dawn.',
    etymologyOrBreakdown: 'From Latin "maturare" (to mature/ripen) -> dawn ripeness.',
    stability: 2.4,
    difficulty: 4.8,
    reps: 2,
    lapses: 0,
    nextReviewInDays: 2,
    retrievability: 88,
  },
  {
    id: 'es-2',
    language: 'es',
    word: 'Echar de menos',
    phonetic: '/eˈtʃaɾ ðe ˈmenos/',
    translation: 'To miss someone or something',
    partOfSpeech: 'Idiomatic Verbal Locution',
    collocation: 'Te echo de menos (I miss you so much)',
    exampleSentence: 'Te echo mucho de menos cuando viajo por trabajo.',
    exampleTranslation: 'I miss you so much when I travel for work.',
    mnemonic: 'Imagine "throwing" (echar) away the minus feeling of absence.',
    etymologyOrBreakdown: 'From Old Galician-Portuguese "achar de menos" (to find lacking).',
    stability: 5.1,
    difficulty: 5.2,
    reps: 4,
    lapses: 0,
    nextReviewInDays: 5,
    retrievability: 94,
  },
  {
    id: 'es-3',
    language: 'es',
    word: 'Sobremesa',
    phonetic: '/so.βɾeˈme.sa/',
    translation: 'The time spent lingering around the table talking after a meal',
    partOfSpeech: 'Noun (Feminine)',
    collocation: 'Hacer una sobremesa larga (to have a long post-meal chat)',
    exampleSentence: 'La sobremesa familiar los domingos puede durar hasta el atardecer.',
    exampleTranslation: 'Sunday family post-meal conversation can last until dusk.',
    mnemonic: 'Over (sobre) the table (mesa) conversation flows without rush.',
    etymologyOrBreakdown: 'Compound of "sobre" (over) + "mesa" (table). Cultural staple.',
    stability: 1.1,
    difficulty: 3.2,
    reps: 1,
    lapses: 0,
    nextReviewInDays: 1,
    retrievability: 82,
  },
  // Japanese
  {
    id: 'ja-1',
    language: 'ja',
    word: '木漏れ日 (Komorebi)',
    phonetic: '/ko-mo-re-bi/',
    translation: 'Sunlight filtering through trees leaves',
    partOfSpeech: 'Noun',
    collocation: '木漏れ日の中を散歩する (Walk through dappled sunlight)',
    exampleSentence: '森の中で美しい木漏れ日が見えました。',
    exampleTranslation: 'I saw beautiful dappled sunlight in the forest.',
    mnemonic: 'Ko (tree) + more (leaking through) + bi (day/sun). Sunlight leaking from leaves.',
    etymologyOrBreakdown: '木 (tree) + 漏れる (to leak) + 日 (sunlight).',
    stability: 3.2,
    difficulty: 6.0,
    reps: 3,
    lapses: 1,
    nextReviewInDays: 3,
    retrievability: 85,
  },
  {
    id: 'ja-2',
    language: 'ja',
    word: '一期一会 (Ichigo Ichie)',
    phonetic: '/i-chi-go i-chi-e/',
    translation: 'Once-in-a-lifetime encounter / Treasure every moment',
    partOfSpeech: 'Four-character idiom (Yojijukugo)',
    collocation: '一期一会の出会いを大切にする (Cherish an irreplaceable encounter)',
    exampleSentence: '旅先での出会いはまさに一期一会ですね。',
    exampleTranslation: 'Encounters while traveling are truly once-in-a-lifetime.',
    mnemonic: 'Think of 1 strawberry (ichi-go) shared in 1 meeting (ichi-e) — unique forever.',
    etymologyOrBreakdown: 'Derived from Sen no Rikyu tea ceremony philosophy.',
    stability: 6.5,
    difficulty: 4.5,
    reps: 5,
    lapses: 0,
    nextReviewInDays: 7,
    retrievability: 96,
  },
  // German
  {
    id: 'de-1',
    language: 'de',
    word: 'Feierabend',
    phonetic: '/ˈfaɪ̯ɐˌʔaːbn̩t/',
    translation: 'The end of the workday / Evening rest and freedom',
    partOfSpeech: 'Noun (Masculine)',
    collocation: 'Schönen Feierabend machen! (Have a wonderful evening after work!)',
    exampleSentence: 'Um 17 Uhr mache ich endlich Feierabend und gehe spazieren.',
    exampleTranslation: 'At 5 PM I finally clock off and go for a walk.',
    mnemonic: 'Celebrate (Feier) your evening (Abend) after leaving the desk.',
    etymologyOrBreakdown: 'Originally the eve before a holiday church feast.',
    stability: 4.0,
    difficulty: 3.8,
    reps: 3,
    lapses: 0,
    nextReviewInDays: 4,
    retrievability: 91,
  },
  {
    id: 'de-2',
    language: 'de',
    word: 'Fernweh',
    phonetic: '/ˈfɛʁnˌveː/',
    translation: 'A longing for distant places (Farsickness, opposite of homesickness)',
    partOfSpeech: 'Noun (Neuter)',
    collocation: 'Grosses Fernweh haben (To suffer from severe wanderlust)',
    exampleSentence: 'Die Fotos aus Patagonien wecken in mir unglaubliches Fernweh.',
    exampleTranslation: 'The photos from Patagonia awaken incredible wanderlust in me.',
    mnemonic: 'Fern (far away) + Weh (pain/ache) = an ache for the faraway.',
    etymologyOrBreakdown: 'Fern (distant) + Weh (grief/pain). Coined by Prince Hermann von Pückler-Muskau.',
    stability: 2.1,
    difficulty: 4.2,
    reps: 2,
    lapses: 0,
    nextReviewInDays: 2,
    retrievability: 89,
  },
  // French
  {
    id: 'fr-1',
    language: 'fr',
    word: 'Flâner',
    phonetic: '/fla.ne/',
    translation: 'To stroll aimlessly with no objective, observing surroundings',
    partOfSpeech: 'Verb',
    collocation: 'Flâner le long des quais (Stroll leisurely along riverbanks)',
    exampleSentence: 'J\'adore flâner dans les ruelles pavées de Paris.',
    exampleTranslation: 'I adore wandering aimlessly in the cobbled alleys of Paris.',
    mnemonic: 'A flâneur wears flannel and floats through Parisian bistros leisurely.',
    etymologyOrBreakdown: 'From Old Norse "flana" (to wander about carelessly).',
    stability: 3.5,
    difficulty: 4.1,
    reps: 3,
    lapses: 0,
    nextReviewInDays: 4,
    retrievability: 90,
  }
];

export const COMPREHENSIBLE_STORIES: ComprehensibleStory[] = [
  {
    id: 'story-es-cafe',
    language: 'es',
    level: 'A2',
    title: 'El Misterio del Café Silencioso',
    summary: 'Mateo discovers an eccentric book café in Granada where speaking aloud is forbidden, but notes tell everything.',
    iPlusOneTokensCount: 4,
    sentences: [
      {
        id: 's1',
        text: 'Mateo caminaba por las callejuelas estrechas del Albaicín cuando una ligera lluvia empezó a caer.',
        translation: 'Mateo was walking through the narrow alleys of Albaicin when a light rain began to fall.',
        tokens: [
          { text: 'Mateo', translation: 'Mateo', role: 'Subject' },
          { text: 'caminaba', translation: 'was walking', role: 'Verb (Imperfect)' },
          { text: 'por', translation: 'through / along', role: 'Preposition' },
          { text: 'las callejuelas', translation: 'the narrow alleys', role: 'Noun (Diminutive)', isKeyTarget: true },
          { text: 'estrechas', translation: 'narrow', role: 'Adjective' },
          { text: 'del', translation: 'of the', role: 'Contraction' },
          { text: 'Albaicín', translation: 'Albaicin district', role: 'Proper Noun' },
          { text: 'cuando', translation: 'when', role: 'Conjunction' },
          { text: 'una ligera', translation: 'a light', role: 'Adjective' },
          { text: 'lluvia', translation: 'rain', role: 'Noun' },
          { text: 'empezó a caer', translation: 'started to fall', role: 'Periphrasis' }
        ]
      },
      {
        id: 's2',
        text: 'Vio un letrero de madera vieja que decía: «Café del Susurro: Aquí solo se admiten suspiros y tinta».',
        translation: 'He saw an old wooden sign that read: "Whisper Café: Only sighs and ink admitted here."',
        tokens: [
          { text: 'Vio', translation: 'Saw', role: 'Verb (Preterite)' },
          { text: 'un letrero', translation: 'a signboard', role: 'Noun', isKeyTarget: true },
          { text: 'de madera vieja', translation: 'of old wood', role: 'Adjective phrase' },
          { text: 'que decía', translation: 'that said', role: 'Relative clause' },
          { text: '«Café del Susurro»', translation: '"Whisper Café"', role: 'Name' },
          { text: 'Aquí', translation: 'Here', role: 'Adverb' },
          { text: 'solo', translation: 'only', role: 'Adverb' },
          { text: 'se admiten', translation: 'are admitted (passive se)', role: 'Impersonal Verb' },
          { text: 'suspiros', translation: 'sighs', role: 'Noun', isKeyTarget: true },
          { text: 'y tinta', translation: 'and ink', role: 'Noun' }
        ]
      },
      {
        id: 's3',
        text: 'Al empujar la puerta, la camarera no habló; en cambio, le entregó una libreta con tapas de cuero gastado.',
        translation: 'Upon pushing the door, the waitress did not speak; instead, she handed him a notebook with worn leather covers.',
        tokens: [
          { text: 'Al empujar', translation: 'Upon pushing', role: 'Infinitive phrase' },
          { text: 'la puerta', translation: 'the door', role: 'Noun' },
          { text: 'la camarera', translation: 'the waitress', role: 'Noun' },
          { text: 'no habló', translation: 'did not speak', role: 'Verb' },
          { text: 'en cambio', translation: 'instead / in contrast', role: 'Connector', isKeyTarget: true },
          { text: 'le entregó', translation: 'handed him', role: 'Indirect + Verb' },
          { text: 'una libreta', translation: 'a small notebook', role: 'Noun' },
          { text: 'con tapas', translation: 'with covers', role: 'Noun' },
          { text: 'de cuero gastado', translation: 'of worn leather', role: 'Adjective phrase' }
        ]
      }
    ]
  },
  {
    id: 'story-ja-train',
    language: 'ja',
    level: 'A2',
    title: '雨の夜の駅 (Night Rain at the Station)',
    summary: 'A quiet encounter on the late Yamanote line where an umbrella finds its rightful owner.',
    iPlusOneTokensCount: 3,
    sentences: [
      {
        id: 'sj1',
        text: '終電が近づく新宿駅のホームには、冷たい雨の匂いが漂っていました。',
        translation: 'On the platform of Shinjuku Station as the last train approached, the cold scent of rain lingered.',
        tokens: [
          { text: '終電 (shūden)', translation: 'last train', role: 'Noun', isKeyTarget: true },
          { text: 'が近づく', translation: 'approaching', role: 'Verb' },
          { text: '新宿駅のホームには', translation: 'on Shinjuku station platform', role: 'Location + Topic' },
          { text: '冷たい', translation: 'cold', role: 'Adjective' },
          { text: '雨の匂いが', translation: 'scent of rain', role: 'Noun phrase' },
          { text: '漂っていました', translation: 'was drifting / lingering', role: 'Verb (Progressive)', isKeyTarget: true }
        ]
      },
      {
        id: 'sj2',
        text: 'ケンタはベンチの隅に、青い和柄の忘れ物の傘を見つけました。',
        translation: 'In the corner of the bench, Kenta discovered a forgotten blue umbrella with a traditional Japanese pattern.',
        tokens: [
          { text: 'ケンタは', translation: 'Kenta (topic)', role: 'Subject' },
          { text: 'ベンチの隅に', translation: 'in the corner of the bench', role: 'Location' },
          { text: '青い', translation: 'blue', role: 'Adjective' },
          { text: '和柄の', translation: 'traditional Japanese pattern', role: 'Modifier', isKeyTarget: true },
          { text: '忘れ物の傘を', translation: 'lost property umbrella', role: 'Object' },
          { text: '見つけました', translation: 'found / discovered', role: 'Verb' }
        ]
      }
    ]
  }
];

export const GRAMMAR_PUZZLES: GrammarPuzzle[] = [
  {
    id: 'puzzle-es-por-para',
    language: 'es',
    ruleTitle: 'Por vs. Para: Cause vs. Ultimate Purpose',
    concept: 'POR looks backwards to the reason/cause (because of), while PARA points forward to the destination/deadline/purpose (in order to).',
    inductiveClues: [
      {
        sentence: 'Estudio medicina PARA ayudar a los enfermos.',
        translation: 'I study medicine TO (in order to) help the sick.',
        highlight: 'PARA',
        deductionNote: 'Points forward in time to a future goal or destination.'
      },
      {
        sentence: 'Llegué tarde POR el tráfico insoportable.',
        translation: 'I arrived late BECAUSE OF the unbearable traffic.',
        highlight: 'POR',
        deductionNote: 'Looks backward to the origin or triggering cause.'
      },
      {
        sentence: 'Compré este regalo PARA ti.',
        translation: 'I bought this gift FOR you (recipient).',
        highlight: 'PARA',
        deductionNote: 'Recipient is the final destination.'
      }
    ],
    challengeQuestion: 'Which connector correctly indicates the motivation (because of) vs intention in this sentence?',
    contextSentence: 'Gracias _____ tu ayuda, este proyecto estará listo _____ mañana.',
    missingPartPlaceholder: '[ por / para ]',
    options: [
      {
        text: 'por / para',
        isCorrect: true,
        explanation: 'Spot on! "Gracias por" (cause: because of your help) and "para mañana" (deadline: pointed to the future).'
      },
      {
        text: 'para / por',
        isCorrect: false,
        explanation: 'Not quite. "Gracias para" is incorrect because gratitude refers backward to the cause of the help.'
      },
      {
        text: 'por / por',
        isCorrect: false,
        explanation: 'Almost, but deadlines pointing to a future boundary always take "para" (para mañana, para el viernes).'
      }
    ],
    mnemonicTakeaway: 'Rule of Thumb: POR looks backward (Cause/Trade/Through) ⬅️ | PARA points forward (Purpose/Recipient/Deadline) ➡️'
  },
  {
    id: 'puzzle-de-akk-dat',
    language: 'de',
    ruleTitle: 'Two-Way Prepositions (Wechselpräpositionen)',
    concept: 'Accusative when there is movement changing location (Wohin? Where to?). Dative when stationary or within the same location (Wo? Where at?).',
    inductiveClues: [
      {
        sentence: 'Ich stelle das Glas auf DEN Tisch. (Akkusativ: den)',
        translation: 'I place the glass onto the table.',
        highlight: 'den Tisch',
        deductionNote: 'Action changes position from hand -> table surface. Movement (Wohin?).'
      },
      {
        sentence: 'Das Glas steht auf DEM Tisch. (Dativ: dem)',
        translation: 'The glass is standing on the table.',
        highlight: 'dem Tisch',
        deductionNote: 'Glass is at rest in that exact location. Position (Wo?).'
      }
    ],
    challengeQuestion: 'The cat is running into the room right now (movement across border). Which case is required?',
    contextSentence: 'Die Katze läuft in _____ Zimmer.',
    missingPartPlaceholder: '[ das / dem ]',
    options: [
      {
        text: 'das (Akkusativ)',
        isCorrect: true,
        explanation: 'Perfect! The cat crosses the threshold into the room (Wohin? Directional transition), triggering the Accusative "das".'
      },
      {
        text: 'dem (Dativ)',
        isCorrect: false,
        explanation: 'Dative "in dem (im) Zimmer" would mean the cat was already inside the room, running around in circles.'
      }
    ],
    mnemonicTakeaway: 'Akkusativ = Action & Transition 🏃‍♂️💨 | Dativ = Dot on the map (Rest/Location) 📍'
  },
  {
    id: 'puzzle-ja-wa-ga',
    language: 'ja',
    ruleTitle: 'Topic Particle は (Wa) vs. Subject Identifier が (Ga)',
    concept: 'は marks the known topic already in the conversation ("Speaking of X..."). が introduces new focal information or specifies "it is specifically THIS one".',
    inductiveClues: [
      {
        sentence: '私は田中です。(Watashi WA Tanaka desu)',
        translation: 'As for me (topic), I am Tanaka.',
        highlight: 'は (wa)',
        deductionNote: 'Sets the background context/topic.'
      },
      {
        sentence: '誰が来ましたか？ 田中さんが来ました。(Tanaka-san GA)',
        translation: 'Who came? Tanaka-san is the one who came.',
        highlight: 'が (ga)',
        deductionNote: 'Answers the mystery: specifically Tanaka and not anyone else.'
      }
    ],
    challengeQuestion: 'You notice a cute cat out of nowhere and want to point out the new focal event. Which particle highlights the subject?',
    contextSentence: 'あそこに猫_____います！(Look! Over there, a cat is here!)',
    missingPartPlaceholder: '[ は / が ]',
    options: [
      {
        text: 'が (ga)',
        isCorrect: true,
        explanation: 'Excellent! "Ga" introduces new perceptual information that suddenly entered consciousness or the scene.'
      },
      {
        text: 'は (wa)',
        isCorrect: false,
        explanation: 'Wa would mean "As for cats in general, they exist over there", which sounds unnatural for a sudden sighting.'
      }
    ],
    mnemonicTakeaway: 'は puts the spotlight on what comes AFTER it. が puts the spotlight on what comes BEFORE it.'
  }
];
