import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Check, 
  Eye, 
  EyeOff, 
  X,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ComprehensibleStory, TargetLanguage, FlashcardItem } from '../../types';
import { COMPREHENSIBLE_STORIES } from '../../data/learningContent';
import { speakWord } from '../../utils/audioSpeech';

interface ComprehensibleReaderScreenProps {
  activeLanguage: TargetLanguage;
  onBack: () => void;
  onAddMinedCard: (card: FlashcardItem) => void;
}

export const ComprehensibleReaderScreen: React.FC<ComprehensibleReaderScreenProps> = ({
  activeLanguage,
  onBack,
  onAddMinedCard,
}) => {
  const stories = COMPREHENSIBLE_STORIES.filter((s) => s.language === activeLanguage);
  const activeStory = stories.length > 0 ? stories[0] : COMPREHENSIBLE_STORIES[0];

  const [selectedToken, setSelectedToken] = useState<{
    text: string;
    translation: string;
    role?: string;
    sentenceContext: string;
  } | null>(null);

  const [showFullTranslations, setShowFullTranslations] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [minedTokens, setMinedTokens] = useState<Set<string>>(new Set());

  const handlePlaySentence = async (text: string) => {
    setIsPlayingAudio(true);
    await speakWord(text, activeLanguage);
    setIsPlayingAudio(false);
  };

  const handleMineToken = (token: { text: string; translation: string; role?: string; sentenceContext: string }) => {
    const newCard: FlashcardItem = {
      id: `mined-${Date.now()}`,
      language: activeLanguage,
      word: token.text,
      phonetic: `[mined token]`,
      translation: token.translation,
      partOfSpeech: token.role || 'Word',
      collocation: token.text,
      exampleSentence: token.sentenceContext,
      exampleTranslation: 'Mined from comprehensible input story',
      mnemonic: 'Acquired in natural reading context.',
      etymologyOrBreakdown: 'Mined directly from authentic story flow.',
      stability: 1.0,
      difficulty: 4.5,
      reps: 0,
      lapses: 0,
      nextReviewInDays: 1,
      retrievability: 85,
    };

    onAddMinedCard(newCard);
    setMinedTokens((prev) => new Set(prev).add(token.text));

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.85 },
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-16 space-y-3 text-slate-100 relative">
      {/* Top App Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
            Comprehensible Input (i+1)
          </span>
          <span className="text-xs font-semibold text-slate-300">{activeStory.title}</span>
        </div>

        <button
          onClick={() => setShowFullTranslations(!showFullTranslations)}
          className={`p-1.5 rounded-xl border transition-colors flex items-center gap-1 text-[11px] ${
            showFullTranslations
              ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
          title="Toggle line translation"
        >
          <Languages className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Story Metadata & Krashen Ratio Pill */}
      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 font-bold rounded-lg text-[10px]">
            CEFR {activeStory.level}
          </span>
          <span className="text-slate-400 text-[11px]">92% known • 8% i+1 novel tokens</span>
        </div>
        <span className="text-[11px] text-teal-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Tap words to mine</span>
        </span>
      </div>

      {/* Story Reading Content */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800/90 rounded-3xl p-4 space-y-4 overflow-y-auto">
        <p className="text-[11px] text-slate-400 italic border-l-2 border-teal-500/40 pl-2.5">
          {activeStory.summary}
        </p>

        <div className="space-y-4 pt-1">
          {activeStory.sentences.map((sent, sIdx) => (
            <div key={sent.id} className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800/60 space-y-2">
              <div className="flex items-start justify-between gap-2">
                {/* Tokenized Text */}
                <div className="flex flex-wrap gap-1 leading-relaxed text-sm">
                  {sent.tokens.map((token, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() =>
                        setSelectedToken({
                          text: token.text,
                          translation: token.translation,
                          role: token.role,
                          sentenceContext: sent.text,
                        })
                      }
                      className={`px-1.5 py-0.5 rounded-md transition-all text-left ${
                        token.isKeyTarget
                          ? 'bg-teal-500/20 text-teal-200 border-b-2 border-teal-400 font-medium hover:bg-teal-500/30'
                          : 'hover:bg-slate-700/60 text-slate-200'
                      }`}
                    >
                      {token.text}
                    </button>
                  ))}
                </div>

                {/* Sentence Audio Playback */}
                <button
                  onClick={() => handlePlaySentence(sent.text)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Listen to full sentence"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Optional English Translation */}
              {showFullTranslations && (
                <div className="pt-1 border-t border-slate-800/60 text-[11px] text-slate-400">
                  {sent.translation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Android Bottom Sheet Modal for Selected Word / Token */}
      {selectedToken && (
        <div className="absolute inset-x-0 bottom-0 bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl z-40 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-[10px] font-semibold rounded-md">
                {selectedToken.role || 'Token'}
              </span>
              <button
                onClick={() => speakWord(selectedToken.text, activeLanguage)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-teal-400 transition-colors"
                title="Pronounce token"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setSelectedToken(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-bold text-white mb-0.5">{selectedToken.text}</h3>
          <p className="text-sm font-semibold text-teal-400 mb-3">{selectedToken.translation}</p>

          <p className="text-xs text-slate-400 mb-4 bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
            « {selectedToken.sentenceContext} »
          </p>

          <div className="flex gap-2">
            {minedTokens.has(selectedToken.text) ? (
              <div className="w-full py-2.5 px-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Added to FSRS Spaced Repetition Deck</span>
              </div>
            ) : (
              <button
                onClick={() => handleMineToken(selectedToken)}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Mine to Spaced Review Deck</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
