import React from 'react';
import { 
  Zap, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Award,
  Layers,
  ChevronRight,
  BrainCircuit,
  Volume2
} from 'lucide-react';
import { TargetLanguage, UserHabitProfile } from '../../types';
import { SUPPORTED_LANGUAGES, STUDY_METHODS } from '../../data/learningContent';

interface HomeScreenProps {
  userProfile: UserHabitProfile;
  activeLanguage: TargetLanguage;
  onNavigateToScreen: (screenId: string) => void;
  onOpenResearch: () => void;
  onOpenStitch: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  activeLanguage,
  onNavigateToScreen,
  onOpenResearch,
  onOpenStitch,
}) => {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 space-y-4 text-slate-100">
      {/* Header Profile & Streak Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            Neuro-Adaptive Engine
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>¡Hola, Palak!</span>
            <span className="text-sm">{currentLang.flag}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Elastic Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-300 shadow-sm">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" />
            <span className="text-xs font-bold">{userProfile.streakDays}d</span>
            <div className="flex items-center text-[10px] text-amber-200/70 border-l border-amber-500/30 pl-1.5 ml-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400 mr-0.5" />
              <span>1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cognitive Memory Gauge Card (Ebbinghaus Health) */}
      <div className="p-4 bg-gradient-to-br from-slate-900 to-indigo-950/70 border border-indigo-500/20 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Memory Retrievability</h2>
              <p className="text-[11px] text-slate-400">FSRS Ebbinghaus Stability Index</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-full">
            {userProfile.retentionRatePct}% Retained
          </span>
        </div>

        {/* Dynamic Retention Progress Wave */}
        <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5 mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${userProfile.retentionRatePct}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{userProfile.wordsMastered} Lexical Chunks Active</span>
          <button
            onClick={() => onNavigateToScreen('analytics')}
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <span>Decay Curve</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Recommended Smart Micro-Session CTA */}
      <div className="relative p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl text-white overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-1.5 text-blue-200 text-xs font-medium mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Optimal Circadian Session • {userProfile.dailyGoalMinutes} min</span>
        </div>

        <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
          High-Retention Micro-Mix
        </h3>
        <p className="text-xs text-blue-100/90 mb-3.5 leading-relaxed">
          Calibrated to your {userProfile.chronotype.replace('_', ' ')} rhythm: 3 FSRS recall cards + 1 contextual story + 1 grammar contrast.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToScreen('spaced_repetition')}
            className="flex-1 py-2.5 px-4 bg-white text-blue-900 hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>Start Daily Micro-Deck</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Cognitive Study Methods Interactive Hub */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Cognitive Study Techniques
          </h2>
          <button
            onClick={onOpenResearch}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
          >
            <span>Research Paper</span>
            <Sparkles className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Method 1: FSRS Spaced Repetition */}
          <div
            onClick={() => onNavigateToScreen('spaced_repetition')}
            className="p-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-2xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-amber-400/30" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-white">FSRS Spaced Repetition</h4>
                  <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-medium">+320%</span>
                </div>
                <p className="text-[11px] text-slate-400">Active recall at the verge of forgetting</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>

          {/* Method 2: Comprehensible Input (i+1) */}
          <div
            onClick={() => onNavigateToScreen('comprehensible_input')}
            className="p-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-2xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-white">Comprehensible Input (i+1)</h4>
                  <span className="text-[9px] px-1.5 py-0.2 bg-teal-500/20 text-teal-300 rounded font-medium">Krashen</span>
                </div>
                <p className="text-[11px] text-slate-400">Graded micro-stories with token sentence mining</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
          </div>

          {/* Method 3: Inductive Grammar Discovery */}
          <div
            onClick={() => onNavigateToScreen('inductive_grammar')}
            className="p-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-2xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-white">Inductive Grammar Lab</h4>
                  <span className="text-[9px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-medium">Patterns</span>
                </div>
                <p className="text-[11px] text-slate-400">Deduce syntax rules from minimal pairs</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>

          {/* Method 4: Habit Profiler */}
          <div
            onClick={() => onNavigateToScreen('habit_profile')}
            className="p-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-2xl cursor-pointer transition-all flex items-center justify-between group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-white">Study Habit Profiler</h4>
                  <span className="text-[9px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded font-medium">Adaptive</span>
                </div>
                <p className="text-[11px] text-slate-400">Circadian chronotype & learning techniques</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick-Prompt Callout */}
      <div className="pt-2">
        <button
          onClick={onOpenStitch}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-blue-600/30 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs font-medium text-emerald-200 hover:border-emerald-400/80 transition-all shadow-md active:scale-98"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Generate Google Stitch Prompt</span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
            Copy Prompt
          </span>
        </button>
      </div>
    </div>
  );
};
