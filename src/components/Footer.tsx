import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneCall, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 pt-6 pb-24 md:pb-8 border-t border-[#E3E3E3] text-xs sm:text-sm text-[#555555]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#12391E] text-white flex items-center justify-center font-bold text-xs">
            🛡️
          </div>
          <span className="font-bold text-[#111111]">{t.appName} — {t.tagline}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#111111] hover:underline"
          >
            {t.nav.learn}
          </button>
          <button
            onClick={() => { setActiveTab('checker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#111111] hover:underline"
          >
            {t.nav.checker}
          </button>
          <button
            onClick={() => { setActiveTab('simulator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#111111] hover:underline"
          >
            {t.nav.simulator}
          </button>
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#111111] hover:underline"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="tel:1930"
            className="inline-flex items-center gap-1 text-[#C62828] font-bold hover:underline"
          >
            <PhoneCall className="w-3 h-3" />
            <span>1930 Helpline</span>
          </a>
        </div>

        <div className="text-center md:text-right text-[11px] text-[#555555]">
          © 2026 Suraksha Saathi. Guidance only, not a legal guarantee.
        </div>
      </div>
    </footer>
  );
};
