import React, { useState } from 'react';
import { Wifi, Battery, Smartphone, Maximize2, Minimize2, Sparkles, Volume2, Globe } from 'lucide-react';
import { TargetLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/learningContent';

interface AndroidPhoneFrameProps {
  children: React.ReactNode;
  activeLanguage: TargetLanguage;
  onLanguageChange: (lang: TargetLanguage) => void;
  isExpandedView: boolean;
  onToggleExpandedView: () => void;
  currentTime?: string;
}

export const AndroidPhoneFrame: React.FC<AndroidPhoneFrameProps> = ({
  children,
  activeLanguage,
  onLanguageChange,
  isExpandedView,
  onToggleExpandedView,
  currentTime = '09:41',
}) => {
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0];
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Simulator Controls Toolbar */}
      <div className="w-full max-w-5xl mb-4 px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Android 15 (Material You Preview)
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentLangObj.flag} {currentLangObj.name}</span>
              <span className="text-[10px] text-slate-400 ml-1">▼</span>
            </button>

            {showLangMenu && (
              <div className="absolute left-0 mt-1 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-1 z-50">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onLanguageChange(lang.id);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-slate-700 text-xs transition-colors ${
                      activeLanguage === lang.id ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang.flag} {lang.name}</span>
                    <span className="text-[10px] text-slate-400">{lang.level.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleExpandedView}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg transition-colors font-medium"
            title={isExpandedView ? 'Switch to Android Phone Shell' : 'Expand to Tablet/Full View'}
          >
            {isExpandedView ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone Frame</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Expanded Canvas</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      {isExpandedView ? (
        <div className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[720px] text-slate-100 flex flex-col">
          {children}
        </div>
      ) : (
        /* Realistic Android Phone Device Shell (Pixel 9 Pro Style) */
        <div className="relative mx-auto w-full max-w-[410px] h-[840px] bg-slate-950 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_8px_#1e293b,0_0_0_12px_#0f172a] border border-slate-700/50 flex flex-col transition-all">
          {/* Hardware Side Buttons */}
          <div className="absolute -left-[14px] top-32 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
          <div className="absolute -left-[14px] top-48 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
          <div className="absolute -right-[14px] top-36 w-[4px] h-16 bg-slate-700 rounded-r-md"></div>

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-slate-900 rounded-[38px] overflow-hidden flex flex-col border border-slate-800/80">
            {/* Android Status Bar */}
            <div className="w-full h-9 bg-slate-900/95 backdrop-blur-sm px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-30 select-none">
              <span>{currentTime}</span>

              {/* Dynamic Camera Punch-hole Pill */}
              <div className="w-4 h-4 rounded-full bg-black border border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/60"></div>
              </div>

              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-300" />
                <span className="text-[10px] tracking-tight">5G</span>
                <Battery className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>

            {/* Screen Inner Viewport */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative scrollbar-none">
              {children}
            </div>

            {/* Android Navigation Bar Pill */}
            <div className="w-full h-5 bg-slate-900 flex items-center justify-center z-30 select-none pb-1">
              <div className="w-32 h-1 bg-slate-600/70 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
