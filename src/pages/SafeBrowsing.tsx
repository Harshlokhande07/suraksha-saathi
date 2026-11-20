import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import {
  Globe,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface PhishingExample {
  id: string;
  brand: string;
  officialUrl: string;
  fakeUrl: string;
  fakeTitle: Record<'hi' | 'mr' | 'en', string>;
  fakeTricks: Record<'hi' | 'mr' | 'en', string[]>;
  explanation: Record<'hi' | 'mr' | 'en', string>;
}

const PHISHING_EXAMPLES: PhishingExample[] = [
  {
    id: 'sbi',
    brand: 'State Bank of India',
    officialUrl: 'https://onlinesbi.sbi/',
    fakeUrl: 'http://sbi-netbanking-verify.xyz/login',
    fakeTitle: {
      hi: 'फर्जी SBI नेटबैंकिंग KYC अपडेट पोर्टल',
      mr: 'बनावट SBI नेटबँकिंग KYC अपडेट पोर्टल',
      en: 'Fake SBI NetBanking KYC Update Clone'
    },
    fakeTricks: {
      hi: [
        'डोमेन के अंत में .xyz या .cc जैसी संदेहास्पद एक्सटेंशन है (असली बैंक का .sbi या .co.in होता है)।',
        'वेबसाइट पर SBI का लोगो असली जैसा लगाया गया है ताकि बुजुर्ग भ्रमित हो जाएं।',
        'तुरंत पासवर्ड और प्रोफाइल पासवर्ड दर्ज करने को कहा जाता है।'
      ],
      mr: [
        'डोमेनच्या शेवटी .xyz किंवा .cc असा संशयास्पद विस्तार आहे.',
        'SBI चे अधिकृत चिन्ह कॉपी केले आहे.',
        'प्रोफाईल पासवर्ड व OTP लगेच भरण्याचा दबाव.'
      ],
      en: [
        'Uses suspicious domain extension .xyz instead of official bank domain .sbi.',
        'Copies SBI official logo to deceive senior citizens.',
        'Forces users to input username, password, and OTP immediately.'
      ]
    },
    explanation: {
      hi: 'स्टेट बैंक की आधिकारिक वेबसाइट onlinesbi.sbi या sbi.co.in है। कभी भी sbi-kyc या sbi-verify जैसे हाइफन वाले अज्ञात डोमेन पर अपना पासवर्ड न डालें।',
      mr: 'स्टेट बँकेची अधिकृत वेबसाईट onlinesbi.sbi किंवा sbi.co.in हीच आहे. भुलवणार्‍या नावांवर विश्वास ठेवू नका.',
      en: 'The genuine State Bank of India portal is onlinesbi.sbi. Never enter credentials on hyphenated lookalike addresses.'
    }
  },
  {
    id: 'electricity',
    brand: 'State Electricity Distribution Co.',
    officialUrl: 'https://mahadiscom.in/ or https://bsesdelhi.com/',
    fakeUrl: 'http://electricity-bill-pay-urgent.club/quickpay',
    fakeTitle: {
      hi: 'फर्जी बिजली बिल भुगतान व रसीद पोर्टल',
      mr: 'बनावट वीज बिल भरणा व पावती पोर्टल',
      en: 'Fake Electricity Disconnection Payment Portal'
    },
    fakeTricks: {
      hi: [
        'डोमेन में .club का इस्तेमाल हुआ है जो कभी सरकारी या डिस्कॉम का नहीं होता।',
        'वेबसाइट पर 10 मिनट का उल्टी गिनती टाइमर (Countdown Timer) चल रहा होता है।',
        'केवल 10 या 15 रुपये का भुगतान करने का झांसा देकर पूरे डेबिट कार्ड का CVV मांग लिया जाता है।'
      ],
      mr: [
        '.club विस्ताराचा वापर केला आहे.',
        '१० मिनिटांचा उलटा काऊंटडाऊन टायमर लावून घाई निर्माण केली जाते.',
        '१० रुपये भरण्याच्या बहाण्याने संपूर्ण कार्ड तपशील चोरला जातो.'
      ],
      en: [
        'Uses an unofficial .club domain extension.',
        'Features an artificial 10-minute countdown clock to induce panic.',
        'Asks for complete debit card numbers, expiry date, and CVV under the pretext of paying Rs. 10.'
      ]
    },
    explanation: {
      hi: 'बिजली कंपनियां कभी भी .club या .top जैसी वेबसाइटों से बिल नहीं लेतीं। हमेशा अपने डिस्कॉम की आधिकारिक वेबसाइट से ही बिल भरें।',
      mr: 'वीज कंपन्या अशा बनावट संकेतस्थळांवरून पैसे घेत नाहीत.',
      en: 'Power distribution utilities never accept bill clearance on .club or .top domains.'
    }
  }
];

export const SafeBrowsing: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedExample, setSelectedExample] = useState(PHISHING_EXAMPLES[0]);

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12391E] bg-[#B6F36B] px-3 py-1 rounded-full inline-block mb-2">
            वेबसाइट सुरक्षा गाइड
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            {t.browsing.title}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] mt-1">
            {t.browsing.subtitle}
          </p>
        </div>
        <VoiceReader
          textToRead={`${t.browsing.title}. ${t.browsing.subtitle}. ${t.browsing.tips.join('. ')}`}
          className="bg-[#F6F6F6] text-[#111111]"
        />
      </div>

      {/* Website Comparison Bento Card */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
            {t.browsing.compareTitle}
          </h2>

          <div className="flex gap-2">
            {PHISHING_EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(ex)}
                className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm min-h-[44px] transition-all ${
                  selectedExample.id === ex.id
                    ? 'bg-[#12391E] text-white shadow-xs'
                    : 'bg-[#F6F6F6] text-[#555555] hover:bg-[#E3E3E3]'
                }`}
              >
                {ex.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genuine Website Box */}
          <div className="bg-[#E8F5E9] rounded-2xl border border-green-300 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-[#1E7B34] text-white text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.browsing.officialBadge}</span>
              </span>
              <span className="text-xs font-bold text-[#1E7B34]">100% Genuine</span>
            </div>

            <div className="bg-white rounded-xl p-3 border border-green-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#1E7B34] flex-shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-bold text-[#12391E] break-all">
                {selectedExample.officialUrl}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#111111] space-y-1">
              <p className="font-bold">असली वेबसाइट के लक्षण:</p>
              <ul className="list-disc list-inside space-y-1 text-[#555555]">
                <li>सत्यापित आधिकारिक डोमेन (.sbi या .gov.in)।</li>
                <li>कोई नकली उल्टी गिनती टाइमर नहीं।</li>
              </ul>
            </div>
          </div>

          {/* Phishing Website Box */}
          <div className="bg-[#FFEBEE] rounded-2xl border border-red-300 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-[#C62828] text-white text-xs font-bold px-3 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.browsing.phishingBadge}</span>
              </span>
              <span className="text-xs font-bold text-[#C62828]">DANGEROUS SCAM</span>
            </div>

            <div className="bg-white rounded-xl p-3 border border-red-200 flex items-center gap-2">
              <Unlock className="w-4 h-4 text-[#C62828] flex-shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-bold text-[#C62828] break-all">
                {selectedExample.fakeUrl}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#111111] space-y-1">
              <p className="font-bold text-[#C62828]">धोखे के तरीके:</p>
              <ul className="space-y-1 text-[#555555]">
                {selectedExample.fakeTricks[language].map((trick, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#C62828] font-bold">•</span>
                    <span>{trick}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clue Note */}
        <div className="bg-[#B6F36B]/20 p-4 rounded-xl border border-[#B6F36B] text-sm font-bold text-[#12391E]">
          💡 {selectedExample.explanation[language]}
        </div>
      </div>

      {/* 5 Rules Bento Grid */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#1E7B34]" />
          <span>{t.browsing.tipsTitle}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.browsing.tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-[#F6F6F6] p-4 rounded-2xl border border-[#E3E3E3] flex items-start gap-3"
            >
              <span className="w-7 h-7 rounded-full bg-[#12391E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#111111] leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
