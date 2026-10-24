import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  TrendingUp, 
  Award, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Zap,
  Layers,
  Clock
} from 'lucide-react';
import { COGNITIVE_RESEARCH_PILLARS, ResearchPillar } from '../data/cognitiveResearch';

interface ResearchHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMethod: (methodId: string) => void;
}

export const ResearchHubModal: React.FC<ResearchHubModalProps> = ({
  isOpen,
  onClose,
  onNavigateToMethod,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(COGNITIVE_RESEARCH_PILLARS[0].id);

  if (!isOpen) return null;

  const currentPillar = COGNITIVE_RESEARCH_PILLARS.find((p) => p.id === selectedPillarId) || COGNITIVE_RESEARCH_PILLARS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Cognitive Science &amp; Language Retention Research</h2>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded-full">
                  Evidence-Based
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Peer-reviewed second language acquisition (SLA) &amp; memory consolidation principles
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Sidebar + Right Pillar Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Pillars */}
          <div className="w-full md:w-72 bg-slate-950/50 border-r border-slate-800 p-3 space-y-1.5 overflow-y-auto shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 block">
              Core Methodologies
            </span>
            {COGNITIVE_RESEARCH_PILLARS.map((pillar) => {
              const isSelected = selectedPillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-indigo-600/25 border border-indigo-500/40 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="block truncate text-slate-100">{pillar.title.split('&')[0]}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{pillar.leadScientist.split('(')[0]}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Research Panel */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-900/40">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Pillar Scientific Brief
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{currentPillar.title}</h3>
              <p className="text-xs text-slate-400">{currentPillar.subtitle}</p>
            </div>

            {/* Academic Citation Box */}
            <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-2xl flex items-start gap-3 text-xs">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-200">{currentPillar.leadScientist}</p>
                <p className="text-slate-400 italic text-[11px] mt-0.5">"{currentPillar.foundationalPaper}"</p>
              </div>
            </div>

            {/* Core Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Neurobiological Mechanism
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                {currentPillar.coreMechanism}
              </p>
            </div>

            {/* Retention Comparison Metric */}
            <div className="p-4 bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">30-Day Long Term Retention Comparison</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-[10px] rounded-full">
                  +{currentPillar.retentionComparison.neuroLingoRetention30Days - currentPillar.retentionComparison.standardRetention30Days}% Advantage
                </span>
              </div>

              {/* Bar 1: Standard Method */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{currentPillar.retentionComparison.standardMethod}</span>
                  <span className="font-mono text-rose-400">{currentPillar.retentionComparison.standardRetention30Days}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500/80 h-full rounded-full"
                    style={{ width: `${currentPillar.retentionComparison.standardRetention30Days}%` }}
                  ></div>
                </div>
              </div>

              {/* Bar 2: NeuroLingo Cognitive Method */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-emerald-300 font-medium">
                  <span>{currentPillar.retentionComparison.neuroLingoMethod}</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {currentPillar.retentionComparison.neuroLingoRetention30Days}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full"
                    style={{ width: `${currentPillar.retentionComparison.neuroLingoRetention30Days}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Cognitive Takeaways for Language Acquisition
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentPillar.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Android UI Implication */}
            <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Android Material UI Implementation:</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentPillar.androidUiImplication}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Ready to design these principles in Google Stitch?
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Close &amp; Test Interactive Demo
          </button>
        </div>
      </div>
    </div>
  );
};
