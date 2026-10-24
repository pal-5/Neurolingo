import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Code2, 
  Smartphone, 
  Palette, 
  SlidersHorizontal,
  ExternalLink,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleStitchPromptConfig, TargetLanguage } from '../types';
import { generateGoogleStitchMasterPrompt, getScreenSpecificStitchPrompts } from '../utils/stitchPromptGenerator';

interface GoogleStitchStudioProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: TargetLanguage;
}

export const GoogleStitchStudio: React.FC<GoogleStitchStudioProps> = ({
  isOpen,
  onClose,
  activeLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'master' | 'screens' | 'guide'>('master');
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [copiedScreenId, setCopiedScreenId] = useState<string | null>(null);

  const [promptConfig, setPromptConfig] = useState<GoogleStitchPromptConfig>({
    designAesthetic: 'material_you_modern',
    targetLanguage: activeLanguage,
    includedScreens: ['onboarding', 'home', 'fsrs', 'story', 'grammar', 'analytics'],
    includeKotlinTokens: true,
    includeAccessibilitySpecs: true,
    includeCognitiveAnnotations: true,
  });

  if (!isOpen) return null;

  const masterPromptText = generateGoogleStitchMasterPrompt({
    ...promptConfig,
    targetLanguage: activeLanguage,
  });

  const screenPrompts = getScreenSpecificStitchPrompts({
    ...promptConfig,
    targetLanguage: activeLanguage,
  });

  const handleCopyMasterPrompt = async () => {
    try {
      await navigator.clipboard.writeText(masterPromptText);
      setCopiedMaster(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => setCopiedMaster(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyScreenPrompt = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedScreenId(id);
      setTimeout(() => setCopiedScreenId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([masterPromptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurolingo-google-stitch-prompt-${activeLanguage}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white">Google Stitch Master Prompt Studio</h2>
                <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-full">
                  Android M3 Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Optimized for generating high-retention vocabulary &amp; grammar UI kits in Google Stitch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMasterPrompt}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              {copiedMaster ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMaster ? 'Copied Prompt!' : 'Copy Master Prompt'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'master'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Master Prompt</span>
            </button>
            <button
              onClick={() => setActiveTab('screens')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'screens'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Screen-by-Screen Prompts</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Stitch Workflow Guide</span>
            </button>
          </div>

          {/* Aesthetic Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Palette className="w-3 h-3 text-emerald-400" />
              <span>Aesthetic:</span>
            </span>
            <select
              value={promptConfig.designAesthetic}
              onChange={(e) =>
                setPromptConfig({
                  ...promptConfig,
                  designAesthetic: e.target.value as any,
                })
              }
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="material_you_modern">Material You 3 (Clean Editorial)</option>
              <option value="duolingo_tactile">Playful Tactile (Gamified Habits)</option>
              <option value="deep_focus_minimal">Swiss / Notion Minimalist</option>
              <option value="cyberpunk_zen">OLED Dark Zen (Nighttime)</option>
            </select>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-900/60 font-mono text-xs">
          {activeTab === 'master' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-semibold text-white">Google Stitch Master Design Blueprint</span>
                  <span className="text-[10px] text-slate-400">({masterPromptText.length} characters)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                  <button
                    onClick={handleCopyMasterPrompt}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition-all active:scale-95"
                  >
                    {copiedMaster ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMaster ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>
              </div>

              {/* Markdown Display */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed select-all selection:bg-emerald-500/30 selection:text-white">
                {masterPromptText}
              </div>
            </div>
          )}

          {activeTab === 'screens' && (
            <div className="space-y-4 font-sans">
              <p className="text-xs text-slate-400">
                Use these modular prompts if you prefer generating screens individually in Google Stitch:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenPrompts.map((scr) => {
                  const isCopied = copiedScreenId === scr.screenId;
                  return (
                    <div
                      key={scr.screenId}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{scr.title}</span>
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                            M3 Screen
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 max-h-48 overflow-y-auto">
                          {scr.prompt}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyScreenPrompt(scr.screenId, scr.prompt)}
                        className="w-full py-2 px-3 bg-slate-800 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Screen Prompt Copied!' : 'Copy Screen Prompt'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 font-sans text-xs text-slate-300 max-w-3xl leading-relaxed">
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>How to Use with Google Stitch</span>
                </h3>
                <p className="text-slate-300">
                  Google Stitch is designed to generate Android Material Design UI components, layouts, and entire screen flows using structured prompts. Follow these 4 steps:
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Select Aesthetic &amp; Copy Prompt</h4>
                    <p className="text-slate-400">
                      Choose your preferred design aesthetic (Material You 3, Playful Tactile, or Swiss Minimalist) in the top dropdown, then click "Copy Master Prompt".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Paste into Google Stitch UI Generation</h4>
                    <p className="text-slate-400">
                      In the Google Stitch canvas or prompt bar, paste the text directly. The prompt contains explicit Material 3 color tokens, component radii, and layout specs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Request Jetpack Compose or Figma Output</h4>
                    <p className="text-slate-400">
                      Stitch will generate the wireframes, high-fidelity mockups, and corresponding Jetpack Compose Kotlin composables ready to import into Android Studio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Target: Android 14/15 • Jetpack Compose • Material 3</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMasterPrompt}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              {copiedMaster ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMaster ? 'Prompt Copied to Clipboard!' : 'Copy Master Prompt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
