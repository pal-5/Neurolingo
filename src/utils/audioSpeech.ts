import { TargetLanguage } from '../types';

export function speakWord(text: string, lang: TargetLanguage): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    const localeMap: Record<TargetLanguage, string> = {
      es: 'es-ES',
      ja: 'ja-JP',
      de: 'de-DE',
      fr: 'fr-FR',
      zh: 'zh-CN',
      it: 'it-IT',
    };

    utterance.lang = localeMap[lang] || 'es-ES';
    utterance.rate = 0.9; // slightly slower for language learners
    utterance.pitch = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    // Small delay for browser speech synthesis engines to initialize
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        resolve();
      }
    }, 50);
  });
}
