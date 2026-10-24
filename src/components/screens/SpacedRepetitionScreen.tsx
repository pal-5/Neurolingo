import React, { useState } from 'react';
import { 
  Volume2, 
  RotateCw, 
  ArrowLeft, 
  Lightbulb, 
  Sparkles, 
  History, 
  CheckCircle2, 
  HelpCircle,
  Brain,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlashcardItem, TargetLanguage } from '../../types';
import { speakWord } from '../../utils/audioSpeech';
import { calculateFsrsInterval, Rating } from '../../utils/fsrsAlgorithm';

interface SpacedRepetitionScreenProps {
  cards: FlashcardItem[];
  activeLanguage: TargetLanguage;
  onBack: () => void;
  onUpdateCardState: (updatedCard: FlashcardItem) => void;
}

export const SpacedRepetitionScreen: React.FC<SpacedRepetitionScreenProps> = ({
  cards,
  activeLanguage,
  onBack,
  onUpdateCardState,
}) => {
  const filteredCards = cards.filter((c) => c.language === activeLanguage);
  const activeDeck = filteredCards.length > 0 ? filteredCards : cards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [lastReviewFeedback, setLastReviewFeedback] = useState<string | null>(null);

  const currentCard = activeDeck[currentIndex] || activeDeck[0];

  const handlePlayAudio = async (text: string) => {
    setIsPlayingAudio(true);
    await speakWord(text, activeLanguage);
    setIsPlayingAudio(false);
  };

  const handleRateCard = (rating: Rating) => {
    if (!currentCard) return;

    const fsrsResult = calculateFsrsInterval(
      currentCard.stability,
      currentCard.difficulty,
      rating,
      currentCard.reps
    );

    const updatedCard: FlashcardItem = {
      ...currentCard,
      stability: fsrsResult.newStability,
      difficulty: fsrsResult.newDifficulty,
      nextReviewInDays: fsrsResult.nextReviewDays,
      retrievability: fsrsResult.retrievability,
      reps: currentCard.reps + 1,
      lapses: rating === 'again' ? currentCard.lapses + 1 : currentCard.lapses,
      lastReviewed: new Date().toISOString(),
    };

    onUpdateCardState(updatedCard);

    setLastReviewFeedback(
      `Interval updated: Next review in ${fsrsResult.label} • Stability: ${fsrsResult.newStability}d`
    );

    if (rating === 'easy' || rating === 'good') {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    // Advance to next card or complete
    setTimeout(() => {
      setLastReviewFeedback(null);
      setIsFlipped(false);
      if (currentIndex + 1 < activeDeck.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSessionCompleted(true);
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }, 450);
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  if (sessionCompleted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 text-white">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-xl font-bold">FSRS Micro-Deck Complete!</h2>
        <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
          Memory consolidation algorithms have recalibrated your optimal intervals based on active retrieval strength.
        </p>

        <div className="w-full max-w-xs p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Reviewed Items:</span>
            <span className="font-semibold text-white">{activeDeck.length}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Average Retrievability:</span>
            <span className="font-semibold text-emerald-400">92%</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Next Review Window:</span>
            <span className="font-semibold text-blue-400">Tomorrow, 08:30 AM</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-xs pt-2">
          <button
            onClick={resetSession}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl transition-all"
          >
            Review Again
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 pb-6 space-y-3 text-slate-100">
      {/* Top Header with Progress */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            {currentIndex + 1} / {activeDeck.length}
          </span>
        </div>

        <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-full">
          FSRS v4
        </span>
      </div>

      {/* Stability & Cognitive Indicators */}
      <div className="flex items-center justify-between px-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Brain className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stability: <strong className="text-white">{currentCard.stability}d</strong></span>
        </span>
        <span className="flex items-center gap-1">
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span>Reps: <strong className="text-white">{currentCard.reps}</strong></span>
        </span>
        <span className="flex items-center gap-1">
          <span>Retention: <strong className="text-emerald-400">{currentCard.retrievability}%</strong></span>
        </span>
      </div>

      {/* Main Flashcard Container */}
      <div className="flex-1 flex flex-col min-h-[380px] bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden justify-between">
        {/* Subtle decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Card Front Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-medium rounded-lg">
              {currentCard.partOfSpeech}
            </span>

            <button
              onClick={() => handlePlayAudio(currentCard.word)}
              className={`p-2 rounded-full transition-all ${
                isPlayingAudio
                  ? 'bg-blue-500 text-white animate-pulse'
                  : 'bg-blue-500/15 hover:bg-blue-500/30 text-blue-400'
              }`}
              title="Listen to native audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2 pb-1">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
              {currentCard.word}
            </h2>
            <p className="text-xs font-mono text-slate-400">
              {currentCard.phonetic}
            </p>
          </div>

          {/* Lexical Collocation Chunk Box (Michael Lewis Theory) */}
          <div className="p-3 bg-slate-800/60 border border-indigo-500/20 rounded-2xl">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Natural Collocation Chunk</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              « {currentCard.collocation} »
            </p>
          </div>

          {/* Flipped Content Details */}
          {isFlipped ? (
            <div className="space-y-3 pt-2 border-t border-slate-800/80 animate-in fade-in duration-300">
              {/* Meaning */}
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Target Meaning
                </span>
                <p className="text-sm font-semibold text-emerald-400">
                  {currentCard.translation}
                </p>
              </div>

              {/* In-Context Sentence */}
              <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-800 text-xs">
                <p className="text-slate-200 italic mb-0.5">"{currentCard.exampleSentence}"</p>
                <p className="text-[11px] text-slate-400">{currentCard.exampleTranslation}</p>
              </div>

              {/* Mnemonic Anchor */}
              <div className="flex items-start gap-2 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Cognitive Mnemonic: </span>
                  <span>{currentCard.mnemonic}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="py-3 px-6 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold rounded-2xl shadow transition-all flex items-center gap-2 active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                <span>Tap to Reveal Meaning & Context</span>
              </button>
              <p className="text-[10px] text-slate-400 mt-2">
                Effortful recall before flipping builds stronger retention
              </p>
            </div>
          )}
        </div>

        {/* Dynamic Interval Feedback */}
        {lastReviewFeedback && (
          <div className="text-center py-1 text-[11px] text-emerald-400 font-medium">
            {lastReviewFeedback}
          </div>
        )}

        {/* Bottom FSRS Response Rating Bar (Only visible when flipped) */}
        {isFlipped && (
          <div className="pt-3 border-t border-slate-800">
            <div className="text-center text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
              Rate Recall Effort (FSRS Scheduling)
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {/* Again */}
              <button
                onClick={() => handleRateCard('again')}
                className="py-2 px-1 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 rounded-xl text-center transition-all active:scale-95 flex flex-col items-center"
              >
                <span className="text-[11px] font-bold">Again</span>
                <span className="text-[9px] text-rose-400">&lt;10m</span>
              </button>

              {/* Hard */}
              <button
                onClick={() => handleRateCard('hard')}
                className="py-2 px-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-xl text-center transition-all active:scale-95 flex flex-col items-center"
              >
                <span className="text-[11px] font-bold">Hard</span>
                <span className="text-[9px] text-amber-400">1d</span>
              </button>

              {/* Good */}
              <button
                onClick={() => handleRateCard('good')}
                className="py-2 px-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-center transition-all shadow-md active:scale-95 flex flex-col items-center"
              >
                <span className="text-[11px] font-bold">Good</span>
                <span className="text-[9px] text-blue-200">3d</span>
              </button>

              {/* Easy */}
              <button
                onClick={() => handleRateCard('easy')}
                className="py-2 px-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-xl text-center transition-all active:scale-95 flex flex-col items-center"
              >
                <span className="text-[11px] font-bold">Easy</span>
                <span className="text-[9px] text-emerald-400">7d</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
