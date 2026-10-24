import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Sun, 
  Coffee, 
  Moon, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Check, 
  Brain,
  Sliders,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserHabitProfile } from '../../types';

interface HabitProfileScreenProps {
  userProfile: UserHabitProfile;
  onUpdateProfile: (updated: Partial<UserHabitProfile>) => void;
  onBack: () => void;
}

export const HabitProfileScreen: React.FC<HabitProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onBack,
}) => {
  const handleSave = () => {
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.8 },
    });
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-16 space-y-4 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
            Cognitive Profile
          </span>
          <span className="text-xs font-semibold text-slate-300">Habit Calibration</span>
        </div>

        <button
          onClick={handleSave}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      </div>

      {/* 1. Daily Session Budget */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Daily Micro-Session Budget</span>
          </span>
          <span className="text-blue-400">{userProfile.dailyGoalMinutes} min/day</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { mins: 5, label: 'Micro Burst', desc: 'Commute / Coffee' },
            { mins: 15, label: 'Optimal Mix', desc: 'Highest Retention' },
            { mins: 30, label: 'Deep Dive', desc: 'Accelerated' },
          ].map((item) => {
            const isSelected = userProfile.dailyGoalMinutes === item.mins;
            return (
              <button
                key={item.mins}
                onClick={() => onUpdateProfile({ dailyGoalMinutes: item.mins })}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-sm font-bold block">{item.mins} min</span>
                <span className="text-[11px] font-semibold text-blue-400 block">{item.label}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Circadian Chronotype (BJ Fogg Habit Anchor) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Circadian Routine Anchor</span>
          </span>
        </div>

        <div className="space-y-2">
          {[
            { id: 'morning_commute', label: 'Morning Commute / Coffee', icon: Coffee, desc: 'Pair review with morning caffeine spike' },
            { id: 'afternoon_break', label: 'Mid-Day Lunch Reset', icon: Sun, desc: 'Displace social media scrolling with 5m review' },
            { id: 'evening_winddown', label: 'Evening Wind-Down', icon: Moon, desc: 'Pre-sleep hippocampus consolidation' },
            { id: 'micro_bursts', label: 'Spontaneous Micro-Breaks', icon: Zap, desc: 'Dynamic notifications when idle' },
          ].map((chrono) => {
            const isSelected = userProfile.chronotype === chrono.id;
            const IconComponent = chrono.icon;
            return (
              <button
                key={chrono.id}
                onClick={() => onUpdateProfile({ chronotype: chrono.id as any })}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{chrono.label}</h4>
                    <p className="text-[10px] text-slate-400">{chrono.desc}</p>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Elastic Streak Protection Shield */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Elastic Streak Protection</h4>
            <p className="text-[10px] text-slate-400">Protects streak from resetting if a day is missed</p>
          </div>
        </div>
        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">
          Active (1 Shield)
        </span>
      </div>

      {/* 4. Target CEFR Proficiency */}
      <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
        <div>
          <h4 className="font-semibold text-white">Current CEFR Benchmark</h4>
          <p className="text-[10px] text-slate-400">Calibrates i+1 story lexicons</p>
        </div>
        <div className="flex gap-1">
          {['A1', 'A2', 'B1', 'B2'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => onUpdateProfile({ currentCefr: lvl as any })}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                userProfile.currentCefr === lvl
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
