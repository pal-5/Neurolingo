import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarPuzzle, TargetLanguage } from '../../types';
import { GRAMMAR_PUZZLES } from '../../data/learningContent';

interface GrammarLabScreenProps {
  activeLanguage: TargetLanguage;
  onBack: () => void;
}

export const GrammarLabScreen: React.FC<GrammarLabScreenProps> = ({
  activeLanguage,
  onBack,
}) => {
  const puzzles = GRAMMAR_PUZZLES.filter((p) => p.language === activeLanguage);
  const activePuzzle: GrammarPuzzle = puzzles.length > 0 ? puzzles[0] : GRAMMAR_PUZZLES[0];

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    setHasSubmitted(true);

    if (activePuzzle.options[idx]?.isCorrect) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleReset = () => {
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-16 space-y-3.5 text-slate-100">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
            Inductive Discovery Lab
          </span>
          <span className="text-xs font-semibold text-slate-300">Pattern Deduction</span>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Reset puzzle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Rule Title Banner */}
      <div className="p-3.5 bg-gradient-to-r from-indigo-950/80 to-purple-950/60 border border-indigo-500/30 rounded-2xl">
        <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{activePuzzle.ruleTitle}</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {activePuzzle.concept}
        </p>
      </div>

      {/* Step 1: Contrastive Minimal Pairs (The Inductive Clues) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
          <span>Step 1: Observe Contrasting Patterns</span>
          <span className="text-indigo-400">Minimal Pairs</span>
        </div>

        <div className="space-y-2">
          {activePuzzle.inductiveClues.map((clue, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-1 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white tracking-wide">
                  {clue.sentence}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md font-bold">
                  {clue.highlight}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                {clue.translation}
              </p>
              <p className="text-[10px] text-indigo-300/90 pt-1 border-t border-slate-800/80">
                🔍 <em>{clue.deductionNote}</em>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Rapid Application Challenge */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Step 2: Apply Deduced Pattern</span>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-center space-y-1">
          <p className="text-xs text-slate-300 font-medium">
            {activePuzzle.challengeQuestion}
          </p>
          <p className="text-sm font-bold text-white tracking-wide pt-1">
            {activePuzzle.contextSentence}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {activePuzzle.options.map((opt, idx) => {
            const isSelected = selectedOptionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3 rounded-2xl text-left text-xs transition-all flex items-center justify-between border ${
                  isSelected
                    ? opt.isCorrect
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                      : 'bg-rose-500/20 border-rose-500 text-rose-200'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-semibold text-white">{opt.text}</span>
                </div>

                {isSelected && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {hasSubmitted && selectedOptionIndex !== null && (
          <div
            className={`p-3 rounded-2xl text-xs space-y-1 animate-in fade-in duration-300 border ${
              activePuzzle.options[selectedOptionIndex].isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <p className="font-medium">
              {activePuzzle.options[selectedOptionIndex].explanation}
            </p>
          </div>
        )}
      </div>

      {/* Step 3: Mnemonic Takeaway */}
      <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-purple-200">
        <Lightbulb className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-purple-300">Procedural Memory Rule: </span>
          <span>{activePuzzle.mnemonicTakeaway}</span>
        </div>
      </div>
    </div>
  );
};
