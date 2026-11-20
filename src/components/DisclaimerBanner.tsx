import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-amber-100/90 border-b-2 border-amber-300 text-amber-950 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-sm sm:text-base font-semibold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800 flex-shrink-0" />
          <span>{t.disclaimer.badge}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-700 bg-white/70 px-3 py-1 rounded-full border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>हम कभी भी आपका बैंक पासवर्ड, OTP या PIN नहीं मांगते।</span>
        </div>
      </div>
    </div>
  );
};
