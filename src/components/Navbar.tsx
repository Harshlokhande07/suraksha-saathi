import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Shield,
  BookOpen,
  Search,
  Smartphone,
  Globe,
  PhoneCall,
  Users,
  Type,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { t, language, setLanguage } = useLanguage();
  const { fontSize, setFontSize, highContrast, toggleContrast, voiceAssistEnabled, setVoiceAssistEnabled } = useAccessibility();

  const navItems = [
    { id: 'home', label: language === 'hi' ? 'मुख्य पृष्ठ' : language === 'mr' ? 'मुख्य' : 'Overview', icon: Shield },
    { id: 'learn', label: language === 'hi' ? 'सीखें' : language === 'mr' ? 'शिका' : 'Learn', icon: BookOpen },
    { id: 'checker', label: language === 'hi' ? 'जांचें' : language === 'mr' ? 'तपासा' : 'Check', icon: Search },
    { id: 'simulator', label: language === 'hi' ? 'बैंकिंग' : language === 'mr' ? 'बँकिंग' : 'Practice', icon: Smartphone },
    { id: 'browsing', label: language === 'hi' ? 'ब्राउज़िंग' : language === 'mr' ? 'ब्राउझिंग' : 'Browsing', icon: Globe },
    { id: 'emergency', label: language === 'hi' ? '1930 मदद' : language === 'mr' ? '1930 मदत' : 'Emergency', icon: PhoneCall, isEmergency: true },
    { id: 'caregiver', label: language === 'hi' ? 'केयरगिवर' : language === 'mr' ? 'केअरगिव्हर' : 'Caregiver', icon: Users },
  ];

  const greeting = language === 'hi' ? 'नमस्ते, शर्मा जी' : language === 'mr' ? 'नमस्कार, शर्मा जी' : 'Namaste, Sharma Ji';

  const toggleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  return (
    <header className="w-full pt-4 pb-2 px-2 sm:px-4">
      <div className="max-w-[1240px] mx-auto bg-white rounded-bento-card border border-[#E3E3E3] shadow-bento px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Left: Avatar + Greeting */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none min-h-touch group"
          aria-label="Go to Home"
        >
          {/* Elder avatar */}
          <div className="w-11 h-11 rounded-full bg-[#12391E] text-white flex items-center justify-center font-bold text-lg ring-2 ring-[#B6F36B] shadow-sm">
            <span aria-hidden="true">👴</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg sm:text-xl font-bold text-[#111111] leading-tight block">
              {greeting}
            </span>
            <span className="text-xs font-semibold text-[#555555] block">
              {t.appName} — {t.tagline}
            </span>
          </div>
        </button>

        {/* Center: Pill-Style Tab Nav (Desktop/Tablet) */}
        <nav aria-label="Main Bento Navigation" className="hidden md:flex items-center bg-[#F6F6F6] p-1.5 rounded-full border border-[#E3E3E3]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-full font-bold text-sm lg:text-base min-h-[44px] transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#B6F36B] text-[#12391E] shadow-sm font-extrabold'
                    : item.isEmergency
                    ? 'text-[#C62828] hover:bg-[#FDE3E3]'
                    : 'text-[#555555] hover:text-[#111111] hover:bg-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Language switch + Accessibility (A+ & Voice) */}
        <div className="flex items-center gap-2">
          {/* Language Pills */}
          <div className="inline-flex rounded-full bg-[#F6F6F6] p-1 border border-[#E3E3E3]" role="group" aria-label="Language selector">
            {(['hi', 'mr', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold min-h-touch transition-all ${
                  language === lang
                    ? 'bg-[#12391E] text-white shadow-xs'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
                aria-pressed={language === lang}
              >
                {lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'EN'}
              </button>
            ))}
          </div>

          {/* Text Size A+ Button */}
          <button
            onClick={toggleFontSize}
            className="w-10 h-10 rounded-full bg-[#F6F6F6] hover:bg-[#E3E3E3] border border-[#E3E3E3] flex items-center justify-center font-black text-sm text-[#111111] transition-all"
            title="Text Size (A / A+ / A++)"
            aria-label="Toggle text size"
          >
            {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
          </button>

          {/* Voice toggle button */}
          <button
            onClick={() => setVoiceAssistEnabled(!voiceAssistEnabled)}
            className={`w-10 h-10 rounded-full border border-[#E3E3E3] flex items-center justify-center transition-all ${
              voiceAssistEnabled ? 'bg-[#12391E] text-white' : 'bg-[#F6F6F6] text-[#555555]'
            }`}
            title={voiceAssistEnabled ? 'Voice Guidance Active' : 'Voice Guidance Muted'}
            aria-label="Toggle voice guidance"
          >
            {voiceAssistEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
