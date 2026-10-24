import React from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  BrainCircuit, 
  Calendar, 
  Award, 
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { FORGETTING_CURVE_DATA } from '../../data/cognitiveResearch';
import { UserHabitProfile } from '../../types';

interface AnalyticsScreenProps {
  userProfile: UserHabitProfile;
  onBack: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  userProfile,
  onBack,
}) => {
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            Memory Decay Engine
          </span>
          <span className="text-xs font-semibold text-slate-300">Ebbinghaus vs FSRS</span>
        </div>

        <div className="w-7"></div>
      </div>

      {/* Forgetting Curve Chart Visualization */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-white">Retention Trajectory (30 Days)</h3>
            <p className="text-[10px] text-slate-400">Mathematical modeling of memory consolidation</p>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full">
            +325% Gain
          </span>
        </div>

        {/* Visual Simulated Graph */}
        <div className="h-44 w-full bg-slate-950/80 rounded-2xl p-3 border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
          {/* Legend */}
          <div className="flex items-center justify-end gap-3 text-[10px] z-10">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-0.5 bg-emerald-400 rounded"></span>
              FSRS Optimized (91%)
            </span>
            <span className="flex items-center gap-1 text-rose-400/80">
              <span className="w-2.5 h-0.5 bg-rose-400/80 rounded"></span>
              No Review Decay (12%)
            </span>
          </div>

          {/* SVG Graph Paths */}
          <div className="flex-1 relative w-full h-full my-2">
            <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
              {/* Horizontal grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />

              {/* Standard Ebbinghaus Decay Curve (Cramming without review) */}
              <path
                d="M 10 10 Q 50 70, 100 82 T 300 90"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeOpacity="0.7"
              />

              {/* FSRS Curve with Spaced Reinforcement Spikes */}
              {/* Review 1 at day 1, Review 2 at day 3, Review 3 at day 7 */}
              <path
                d="M 10 10 Q 30 35, 45 42 L 45 10 Q 80 28, 105 32 L 105 10 Q 180 20, 230 22 L 230 10 Q 270 14, 300 16"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Spaced Retrieval Nodes */}
              <circle cx="45" cy="10" r="3" fill="#10b981" />
              <circle cx="105" cy="10" r="3" fill="#10b981" />
              <circle cx="230" cy="10" r="3" fill="#10b981" />
            </svg>
          </div>

          {/* X Axis Day Labels */}
          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
            <span>Day 0</span>
            <span>Day 1 (R1)</span>
            <span>Day 3 (R2)</span>
            <span>Day 7 (R3)</span>
            <span>Day 30</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 italic">
          💡 Each retrieval spike resets the curve at a flatter angle, permanently multiplying stability.
        </p>
      </div>

      {/* 4 Stability Tiers */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
          Lexical Memory Distribution
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-2xl space-y-1">
            <span className="text-[10px] text-emerald-400 font-semibold block">Permanent Tier (&gt;90d)</span>
            <span className="text-lg font-bold text-white">412</span>
            <span className="text-[9px] text-slate-400 block">Effortless conversation recall</span>
          </div>

          <div className="p-3 bg-slate-900 border border-blue-500/30 rounded-2xl space-y-1">
            <span className="text-[10px] text-blue-400 font-semibold block">Strong Recall (21-90d)</span>
            <span className="text-lg font-bold text-white">380</span>
            <span className="text-[9px] text-slate-400 block">Reliable working memory</span>
          </div>

          <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-2xl space-y-1">
            <span className="text-[10px] text-amber-400 font-semibold block">Developing (5-20d)</span>
            <span className="text-lg font-bold text-white">240</span>
            <span className="text-[9px] text-slate-400 block">Requires slight cognitive effort</span>
          </div>

          <div className="p-3 bg-slate-900 border border-rose-500/30 rounded-2xl space-y-1">
            <span className="text-[10px] text-rose-400 font-semibold block">Fragile / New (&lt;5d)</span>
            <span className="text-lg font-bold text-white">168</span>
            <span className="text-[9px] text-slate-400 block">Needs prompt repetition</span>
          </div>
        </div>
      </div>
    </div>
  );
};
