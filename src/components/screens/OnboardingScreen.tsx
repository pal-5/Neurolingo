import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Sun, 
  Coffee, 
  Moon, 
  Zap, 
  BrainCircuit, 
  BookOpen, 
  Headphones, 
  Check, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserHabitProfile, TargetLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/learningContent';

interface OnboardingScreenProps {
  userProfile: UserHabitProfile;
  activeLanguage: TargetLanguage;
  onCompleteOnboarding: (updated: Partial<UserHabitProfile>) => void;
  onBack: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  userProfile,
  activeLanguage,
  onCompleteOnboarding,
  onBack,
}) => {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0];

  const [timeBudget, setTimeBudget] = useState<number>(userProfile.dailyGoalMinutes);
  const [chronotype, setChronotype] = useState(userProfile.chronotype);
  const [modality, setModality] = useState(userProfile.dominantModality);
  const [selectedCefr, setSelectedCefr] = useState(userProfile.currentCefr);

  const handleFinish = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
    });
    onCompleteOnboarding({
      dailyGoalMinutes: timeBudget,
      chronotype,
      dominantModality: modality,
      currentCefr: selectedCefr,
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 text-slate-100 relative">
      {/* Top App Bar with Step Indicator */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
            Step 3 of 4
          </span>
          <span className="text-xs font-semibold text-slate-200">Study Habit Calibration</span>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-[10px] text-blue-300 font-bold">
          {currentLang.flag} {currentLang.name}
        </div>
      </div>

      {/* Step Progress Line */}
      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full w-3/4 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-1.5 pt-1">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Sun className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          How does your brain learn best?
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          We calibrate retention algorithms to your circadian rhythm and cognitive stamina.
        </p>
      </div>

      {/* Module 1: Daily Time Budget */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Daily Time Budget</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[
            { mins: 5, label: 'Quick Burst', sub: 'Commute / Coffee' },
            { mins: 15, label: 'Standard', sub: 'Highest Retention' },
            { mins: 30, label: 'Deep Dive', sub: 'Immersion Focus' },
          ].map((item) => (
            <button
              key={item.mins}
              onClick={() => setTimeBudget(item.mins)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                timeBudget === item.mins
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-sm font-bold block text-white">{item.mins} min</span>
              <span className="text-[11px] font-semibold text-blue-400 block">{item.label}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">{item.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Module 2: Circadian Anchor Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          <span>Circadian Routine Anchor (BJ Fogg Model)</span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'morning_commute', label: 'Morning Commute', desc: 'Pair with caffeine spike', icon: Coffee },
            { id: 'afternoon_break', label: 'Lunch Reset', desc: 'Mid-day focus break', icon: Sun },
            { id: 'evening_winddown', label: 'Evening Wind-down', desc: 'Pre-sleep consolidation', icon: Moon },
            { id: 'micro_bursts', label: 'Random Micro-breaks', desc: 'Whenever you unlock phone', icon: Zap },
          ].map((item) => {
            const isSelected = chronotype === item.id;
            const IconComp = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setChronotype(item.id as any)}
                className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/80 text-amber-200 ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold block text-white truncate">{item.label}</span>
                  <span className="text-[9px] text-slate-400 block leading-tight">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module 3: Dominant Modality Picker */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
          <BrainCircuit className="w-3.5 h-3.5 text-teal-400" />
          <span>Dominant Cognitive Modality</span>
        </label>

        <div className="space-y-1.5">
          {[
            { id: 'retrieval_heavy', title: 'High-Speed Retrieval', subtitle: 'FSRS active recall flashcards with interval math', icon: Zap, tag: 'FSRS' },
            { id: 'visual_context', title: 'Contextual Narrative (i+1)', subtitle: 'Graded bilingual stories with instant token sentence mining', icon: BookOpen, tag: 'Krashen' },
            { id: 'inductive_discovery', title: 'Analytical Pattern Discovery', subtitle: 'Minimal pair puzzles instead of grammar charts', icon: Sparkles, tag: 'Ellis' },
            { id: 'auditory_shadowing', title: 'Audio Shadowing & Cloze', subtitle: 'Acoustic-motor speech feedback & sentence completion', icon: Headphones, tag: 'Paivio' },
          ].map((item) => {
            const isSelected = modality === item.id;
            const IconC = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setModality(item.id as any)}
                className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-teal-500/15 border-teal-500 text-white ring-1 ring-teal-500/60'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-800 text-slate-400'}`}>
                    <IconC className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">{item.title}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">{item.tag}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">{item.subtitle}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Bar with Container Shadow */}
      <div className="sticky bottom-0 -mx-4 -mb-24 p-4 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-30">
        <button
          onClick={handleFinish}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-xs rounded-2xl shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>Build My Personalized Memory Engine</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
