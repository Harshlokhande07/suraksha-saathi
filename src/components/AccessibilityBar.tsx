import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX, Eye, Type } from 'lucide-react';
import { Language } from '../types';

export const AccessibilityBar: React.FC = () => {
  const { fontSize, setFontSize, highContrast, toggleContrast, voiceAssistEnabled, setVoiceAssistEnabled } = useAccessibility();
  const { language, setLanguage, t } = useLanguage();

  return (
    <aside aria-label="Accessibility Bar" className="bg-slate-900 text-white px-3 py-2 border-b border-slate-700 text-sm md:text-base">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Language selector */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-300 hidden sm:inline" id="lang-label">
            {t.accessibility.language}
          </span>
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-600" role="group" aria-labelledby="lang-label">
            {(['hi', 'mr', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-md font-bold text-sm min-h-touch transition-colors ${
                  language === lang
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-gray-200 hover:text-white hover:bg-slate-700'
                }`}
                aria-pressed={language === lang}
              >
                {lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* Text size and contrast */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-600">
            <Type className="w-4 h-4 ml-2 text-slate-300" aria-hidden="true" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded text-xs sm:text-sm font-semibold min-h-touch ${
                fontSize === 'normal' ? 'bg-amber-400 text-slate-950' : 'text-gray-200 hover:bg-slate-700'
              }`}
              title="Normal Text (18px)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded text-sm sm:text-base font-bold min-h-touch ${
                fontSize === 'large' ? 'bg-amber-400 text-slate-950' : 'text-gray-200 hover:bg-slate-700'
              }`}
              title="Large Text (20px)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded text-base sm:text-lg font-black min-h-touch ${
                fontSize === 'xlarge' ? 'bg-amber-400 text-slate-950' : 'text-gray-200 hover:bg-slate-700'
              }`}
              title="Extra Large Text (24px)"
            >
              A++
            </button>
          </div>

          {/* High contrast button */}
          <button
            onClick={toggleContrast}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border min-h-touch transition-all ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 shadow-md ring-2 ring-yellow-400'
                : 'bg-slate-800 text-white border-slate-600 hover:bg-slate-700'
            }`}
            aria-pressed={highContrast}
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs sm:text-sm">
              {highContrast ? 'हाई कॉन्ट्रास्ट चालू' : 'कंट्रास्ट'}
            </span>
          </button>

          {/* Voice guidance toggle */}
          <button
            onClick={() => setVoiceAssistEnabled(!voiceAssistEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border min-h-touch transition-all ${
              voiceAssistEnabled
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 text-gray-400 border-slate-600 hover:bg-slate-700'
            }`}
            aria-pressed={voiceAssistEnabled}
            title={voiceAssistEnabled ? 'Voice Guidance Active' : 'Voice Guidance Muted'}
          >
            {voiceAssistEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-xs sm:text-sm hidden md:inline">
              {voiceAssistEnabled ? 'आवाज़ सक्रिय' : 'आवाज़ बंद'}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
