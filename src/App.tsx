import React, { useState } from 'react';
import { 
  Home, 
  Zap, 
  BookOpen, 
  Sparkles, 
  User, 
  BarChart3, 
  BrainCircuit, 
  Flame, 
  Globe, 
  Copy,
  Info
} from 'lucide-react';
import { TargetLanguage, UserHabitProfile, FlashcardItem } from './types';
import { INITIAL_FLASHCARDS, SUPPORTED_LANGUAGES } from './data/learningContent';
import { AndroidPhoneFrame } from './components/AndroidPhoneFrame';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SpacedRepetitionScreen } from './components/screens/SpacedRepetitionScreen';
import { ComprehensibleReaderScreen } from './components/screens/ComprehensibleReaderScreen';
import { GrammarLabScreen } from './components/screens/GrammarLabScreen';
import { HabitProfileScreen } from './components/screens/HabitProfileScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { ResearchHubModal } from './components/ResearchHubModal';
import { GoogleStitchStudio } from './components/GoogleStitchStudio';

export default function App() {
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('es');
  const [activeScreen, setActiveScreen] = useState<string>('home');
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const [isResearchOpen, setIsResearchOpen] = useState<boolean>(false);
  const [isStitchOpen, setIsStitchOpen] = useState<boolean>(false);

  const [cards, setCards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);

  const [userProfile, setUserProfile] = useState<UserHabitProfile>({
    targetLanguage: 'es',
    currentCefr: 'A2',
    dailyGoalMinutes: 15,
    chronotype: 'morning_commute',
    dominantModality: 'retrieval_heavy',
    streakDays: 18,
    wordsMastered: 1240,
    retentionRatePct: 93,
    lastSessionDate: new Date().toISOString(),
  });

  const handleUpdateCardState = (updatedCard: FlashcardItem) => {
    setCards((prev) => prev.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
  };

  const handleAddMinedCard = (newCard: FlashcardItem) => {
    setCards((prev) => [newCard, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      wordsMastered: prev.wordsMastered + 1,
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserHabitProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Top Application Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">NeuroLingo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium">
                  Android Design &amp; Cognitive Research
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                High-Retention Vocabulary &amp; Grammar Architecture • Google Stitch Ready
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsResearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Methodology Research</span>
              <span className="md:hidden">Research</span>
            </button>

            <button
              onClick={() => setIsStitchOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Stitch Prompt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Studio Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col items-center justify-start">
        {/* Subheader Banner */}
        <div className="w-full max-w-5xl mb-6 text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Adaptive Android Language App Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Experience 5 cognitive acquisition methods designed for &gt;90% 30-day retention, then copy the complete Google Stitch design prompt to build the production UI.
          </p>
        </div>
        {/* Quick Stitch Screen Switcher Pills */}
        <div className="w-full max-w-5xl mb-4 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Prompt Screens:</span>
            </span>
            {[
              { id: 'onboarding', label: '1. Onboarding' },
              { id: 'home', label: '2. Home Dashboard' },
              { id: 'spaced_repetition', label: '3. FSRS Flash-Deck' },
              { id: 'comprehensible_input', label: '4. Story (i+1)' },
              { id: 'inductive_grammar', label: '5. Grammar Lab' },
              { id: 'analytics', label: '6. Decay Map' },
            ].map((scr) => (
              <button
                key={scr.id}
                onClick={() => setActiveScreen(scr.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  activeScreen === scr.id
                    ? 'bg-emerald-600 text-white shadow-md font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Android Frame & Active Screen */}
        <AndroidPhoneFrame
          activeLanguage={activeLanguage}
          onLanguageChange={(lang) => {
            setActiveLanguage(lang);
            setUserProfile((prev) => ({ ...prev, targetLanguage: lang }));
          }}
          isExpandedView={isExpandedView}
          onToggleExpandedView={() => setIsExpandedView(!isExpandedView)}
        >
          {/* Active Screen View */}
          <div className="flex-1 flex flex-col">
            {activeScreen === 'onboarding' && (
              <OnboardingScreen
                userProfile={userProfile}
                activeLanguage={activeLanguage}
                onCompleteOnboarding={(updated) => {
                  handleUpdateProfile(updated);
                  setActiveScreen('home');
                }}
                onBack={() => setActiveScreen('home')}
              />
            )}

            {activeScreen === 'home' && (
              <HomeScreen
                userProfile={userProfile}
                activeLanguage={activeLanguage}
                onNavigateToScreen={(screen) => setActiveScreen(screen)}
                onOpenResearch={() => setIsResearchOpen(true)}
                onOpenStitch={() => setIsStitchOpen(true)}
              />
            )}

            {activeScreen === 'spaced_repetition' && (
              <SpacedRepetitionScreen
                cards={cards}
                activeLanguage={activeLanguage}
                onBack={() => setActiveScreen('home')}
                onUpdateCardState={handleUpdateCardState}
              />
            )}

            {activeScreen === 'comprehensible_input' && (
              <ComprehensibleReaderScreen
                activeLanguage={activeLanguage}
                onBack={() => setActiveScreen('home')}
                onAddMinedCard={handleAddMinedCard}
              />
            )}

            {activeScreen === 'inductive_grammar' && (
              <GrammarLabScreen
                activeLanguage={activeLanguage}
                onBack={() => setActiveScreen('home')}
              />
            )}

            {activeScreen === 'habit_profile' && (
              <HabitProfileScreen
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                onBack={() => setActiveScreen('home')}
              />
            )}

            {activeScreen === 'analytics' && (
              <AnalyticsScreen
                userProfile={userProfile}
                onBack={() => setActiveScreen('home')}
              />
            )}
          </div>

          {/* Android Bottom Navigation Bar (Material Design 3) */}
          <div className="w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around z-20">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'home'
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">Today</span>
            </button>

            <button
              onClick={() => setActiveScreen('spaced_repetition')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'spaced_repetition'
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">FSRS</span>
            </button>

            <button
              onClick={() => setActiveScreen('comprehensible_input')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'comprehensible_input'
                  ? 'text-teal-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">Stories</span>
            </button>

            <button
              onClick={() => setActiveScreen('inductive_grammar')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'inductive_grammar'
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">Grammar</span>
            </button>

            <button
              onClick={() => setActiveScreen('analytics')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'analytics'
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">Matrix</span>
            </button>

            <button
              onClick={() => setActiveScreen('habit_profile')}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                activeScreen === 'habit_profile'
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">Habits</span>
            </button>
          </div>
        </AndroidPhoneFrame>
      </main>

      {/* Research Hub Modal */}
      <ResearchHubModal
        isOpen={isResearchOpen}
        onClose={() => setIsResearchOpen(false)}
        onNavigateToMethod={(methodId) => {
          setIsResearchOpen(false);
          if (methodId === 'fsrs_spaced_repetition') setActiveScreen('spaced_repetition');
          if (methodId === 'comprehensible_input') setActiveScreen('comprehensible_input');
          if (methodId === 'inductive_grammar') setActiveScreen('inductive_grammar');
        }}
      />

      {/* Google Stitch Master Prompt Studio */}
      <GoogleStitchStudio
        isOpen={isStitchOpen}
        onClose={() => setIsStitchOpen(false)}
        activeLanguage={activeLanguage}
      />
    </div>
  );
}
