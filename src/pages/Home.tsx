import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Search,
  Smartphone,
  Globe,
  PhoneCall,
  Users,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Sparkles
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const [quickCheckInput, setQuickCheckInput] = useState('');

  const safetyScore = 78; // Senior's calculated safety preparedness score

  const learningTopics = [
    { name: language === 'hi' ? 'KYC और सिम सुरक्षा' : language === 'mr' ? 'KYC आणि सिम सुरक्षा' : 'KYC & SIM Fraud', progress: 100, completed: true },
    { name: language === 'hi' ? 'OTP और बैंक पासवर्ड' : language === 'mr' ? 'OTP आणि बँक संकेतशब्द' : 'OTP Protection', progress: 100, completed: true },
    { name: language === 'hi' ? 'लॉटरी और ईनाम घोटाले' : language === 'mr' ? 'लॉटरी आणि बक्षीस घोटाळे' : 'Lottery / KBC Fraud', progress: 80, completed: false },
    { name: language === 'hi' ? 'डिजिटल अरेस्ट व फर्जी पुलिस' : language === 'mr' ? 'डिजिटल अरेस्ट व खोटे पोलीस' : 'Fake Police Calls', progress: 60, completed: false },
    { name: language === 'hi' ? 'UPI QR कोड सुरक्षा' : language === 'mr' ? 'UPI QR कोड सुरक्षा' : 'UPI Payment Fraud', progress: 50, completed: false },
  ];

  const recentChecks = [
    {
      title: language === 'hi' ? 'बिजली बिल कटने का SMS' : language === 'mr' ? 'वीज बिल कापण्याचा SMS' : 'Power cut at 9:30 PM SMS',
      date: 'Today, 11:30 AM',
      risk: 'HIGH' as const,
      category: 'Utility Scam'
    },
    {
      title: language === 'hi' ? 'SBI YONO KYC लिंक' : language === 'mr' ? 'SBI YONO KYC लिंक' : 'SBI KYC Suspended Link',
      date: 'Yesterday, 4:15 PM',
      risk: 'HIGH' as const,
      category: 'Phishing'
    },
    {
      title: language === 'hi' ? 'पारिवारिक ट्रेन आगमन संदेश' : language === 'mr' ? 'कौटुंबिक मेसेज' : 'Family Arrival Message',
      date: '19 Nov, 6:00 PM',
      risk: 'LOW' as const,
      category: 'Verified'
    },
    {
      title: language === 'hi' ? 'टाटा पावर आधिकारिक बिल' : language === 'mr' ? 'टाटा पॉवर अधिकृत बिल' : 'Tata Power Official Bill',
      date: '18 Nov, 10:20 AM',
      risk: 'LOW' as const,
      category: 'Utility'
    }
  ];

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCheckInput.trim()) {
      setActiveTab('checker');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Disclaimer Strip */}
      <div className="bg-white rounded-2xl border border-[#E3E3E3] p-3.5 shadow-bento flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-[#12391E] font-bold">
          <ShieldCheck className="w-5 h-5 text-[#1E7B34] flex-shrink-0" />
          <span>{t.disclaimer.badge}</span>
        </div>
        <div className="text-xs sm:text-sm text-[#555555] bg-[#F6F6F6] px-3 py-1 rounded-full border border-[#E3E3E3]">
          {language === 'hi' ? 'हम कभी पासवर्ड या OTP नहीं मांगते।' : language === 'mr' ? 'आम्ही कधीही पासवर्ड किंवा OTP मागत नाही.' : 'We never ask for passwords or OTPs.'}
        </div>
      </div>

      {/* BENTO GRID ROW 1: Safety Score (White Card) + Emergency Hero (Lime Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Your Safety Score (Large White Card) */}
        <div className="lg:col-span-7 bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#555555] uppercase tracking-wider">
                {language === 'hi' ? 'आपकी सुरक्षा तैयारी' : language === 'mr' ? 'तुमची सुरक्षा तयारी' : 'Your Safety Score'}
              </span>
              <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1E7B34] px-3 py-1 rounded-full text-xs font-bold border border-[#C8E6C9]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+18% this month</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
              <div>
                <span className="text-5xl sm:text-6xl font-black text-[#111111] tracking-tight block">
                  {safetyScore}%
                </span>
                <span className="text-base sm:text-lg font-semibold text-[#1E7B34] mt-1 block">
                  {language === 'hi' ? 'सुरक्षित स्तर — आपने 4 पाठ पूरे कर लिए हैं' : language === 'mr' ? 'सुरक्षित स्तर — ४ धडे पूर्ण' : 'Well Protected — 4 Lessons Mastered'}
                </span>
                <p className="text-sm sm:text-base text-[#555555] mt-1 max-w-sm">
                  {language === 'hi' ? 'ऑनलाइन धोखाधड़ी पहचानने की आपकी समझ बहुत अच्छी है।' : language === 'mr' ? 'ऑनलाइन फसवणूक ओळखण्याची तुमची क्षमता उत्तम आहे.' : 'You have a high readiness to spot common financial scams.'}
                </p>
              </div>

              {/* Circular Progress Ring */}
              <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0 self-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#EDEDED]"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#12391E]"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - safetyScore / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-[#12391E]">
                  {safetyScore}%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E3E3E3] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setActiveTab('learn')}
              className="inline-flex items-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-6 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              <span>{language === 'hi' ? 'सीखना जारी रखें' : language === 'mr' ? 'शिकणे सुरू ठेवा' : 'Continue Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <VoiceReader
              textToRead={`${language === 'hi' ? 'आपकी सुरक्षा तैयारी 78 प्रतिशत है। सुरक्षित स्तर पर रहने के लिए बधाई।' : 'Your Safety Score is 78 percent.'}`}
              className="bg-[#F6F6F6] text-[#111111] hover:bg-[#E3E3E3]"
            />
          </div>
        </div>

        {/* Card 2: Emergency Hero Card (Fresh Lime-Green #B6F36B) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#B6F36B] to-[#9BE04F] rounded-bento-card p-6 sm:p-8 border border-[#9BE04F] shadow-bento flex flex-col justify-between text-[#111111] relative overflow-hidden">
          {/* Subtle background icon */}
          <PhoneCall className="w-40 h-40 text-black/5 absolute -right-6 -bottom-6 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#12391E] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                <span>आपातकालीन सहायता</span>
              </span>
              <span className="text-xs font-bold text-[#12391E] bg-white/70 px-2.5 py-1 rounded-full border border-black/10">
                Official: MHA, Govt. of India
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#12391E] leading-tight">
              {language === 'hi' ? 'साइबर धोखाधड़ी राष्ट्रीय हेल्पलाइन' : language === 'mr' ? 'सायबर फसवणूक हेल्पलाइन' : 'National Cyber Helpline'}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#12391E]/90 mt-2">
              {language === 'hi' ? 'पैसे कटने पर तुरंत 1930 डायल करें। पहले 2 घंटों ("गोल्डन ऑवर") में पैसा फ्रीज हो सकता है।' : 'Dial 1930 immediately if money is deducted.'}
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <a
              href="tel:1930"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#12391E] hover:bg-[#1B522C] text-white px-6 py-4 rounded-full font-black text-xl min-h-[52px] shadow-md transition-transform active:scale-95"
            >
              <PhoneCall className="w-6 h-6 animate-pulse" />
              <span>1930 डायल करें (Tap to Call)</span>
            </a>

            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#12391E] pt-1">
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline hover:text-black"
              >
                <span>cybercrime.gov.in पोर्टल</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setActiveTab('emergency')}
                className="underline hover:text-black"
              >
                {language === 'hi' ? 'बैंक हेल्पलाइन देखें →' : 'View Bank Helplines →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BENTO GRID ROW 2: 3 Cards Side by Side (Check + Progress + Recent Checks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: "Is This Safe?" Quick Check Box */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#555555] uppercase tracking-wider">
                {language === 'hi' ? 'संदेश जांच' : 'Scam Checker'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-1">
              {t.checker.title}
            </h3>
            <p className="text-sm text-[#555555] mb-4">
              {language === 'hi' ? 'कोई भी SMS, WhatsApp लिंक या बिजली बिल संदेश यहां पेस्ट करें:' : 'Paste any suspicious message or URL to check:'}
            </p>

            <form onSubmit={handleQuickCheck} className="space-y-3">
              <textarea
                rows={3}
                value={quickCheckInput}
                onChange={(e) => setQuickCheckInput(e.target.value)}
                placeholder="उदा. 'Your power disconnected tonight at 9:30 PM...'"
                className="w-full p-3 rounded-xl border border-[#E3E3E3] text-sm focus:border-[#12391E] focus:outline-none bg-[#F6F6F6]"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-5 py-3 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-all"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'hi' ? 'जांच करें' : language === 'mr' ? 'तपासा' : 'Check Now'}</span>
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-[#E3E3E3] text-xs text-[#555555]">
            <span>💡 {language === 'hi' ? 'स्क्रीनशॉट भी अपलोड कर सकते हैं।' : 'Screenshots can also be uploaded.'}</span>
          </div>
        </div>

        {/* Card 2: "Learning Progress" with Thin Progress Bars */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#555555] uppercase tracking-wider">
                {language === 'hi' ? 'पाठ प्रगति' : 'Learning Topics'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-3">
              {language === 'hi' ? 'सुरक्षा ट्यूटोरियल' : language === 'mr' ? 'सुरक्षा धडे' : 'Safety Lessons'}
            </h3>

            <div className="space-y-3">
              {learningTopics.map((topic, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-[#111111] truncate">{topic.name}</span>
                    <span className={topic.completed ? 'text-[#1E7B34] font-bold' : 'text-[#555555]'}>
                      {topic.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EDEDED] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${topic.completed ? 'bg-[#1E7B34]' : 'bg-[#12391E]'}`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('learn')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#12391E] px-4 py-3 rounded-full font-bold text-sm min-h-[48px] border border-[#E3E3E3]"
          >
            <span>{language === 'hi' ? 'सभी 6 पाठ देखें' : 'View All 6 Lessons'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: "Recent Checks" List with Risk Badges */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#555555] uppercase tracking-wider">
                {language === 'hi' ? 'हाल की जांचें' : 'Recent Checks'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-3">
              {language === 'hi' ? 'संदेश इतिहास' : 'History & Results'}
            </h3>

            <div className="space-y-2.5">
              {recentChecks.map((check, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F6F6] border border-[#E3E3E3]"
                >
                  <div className="truncate pr-2">
                    <p className="text-xs sm:text-sm font-bold text-[#111111] truncate">{check.title}</p>
                    <span className="text-[11px] text-[#555555]">{check.date}</span>
                  </div>
                  {check.risk === 'HIGH' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C62828] bg-[#FDE3E3] px-2.5 py-1 rounded-full border border-red-200 flex-shrink-0">
                      <AlertOctagon className="w-3 h-3" />
                      <span>HIGH</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1E7B34] bg-[#E8F5E9] px-2.5 py-1 rounded-full border border-green-200 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>LOW</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('checker')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#12391E] px-4 py-3 rounded-full font-bold text-sm min-h-[48px] border border-[#E3E3E3]"
          >
            <span>{language === 'hi' ? 'नया संदेश जांचें' : 'Check Another Message'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BENTO GRID ROW 3: Banking Practice + Safe Browsing + Caregiver Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Banking Practice */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#1E7B34] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                Fake Data Only
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-1">
              {t.home.cards[2].title}
            </h3>
            <p className="text-sm text-[#555555] mb-4">
              {language === 'hi' ? 'नकली UPI ऐप पर अभ्यास करें। सीखें कि पैसे प्राप्त करने के लिए कभी PIN नहीं लगता।' : 'Practice identifying fraudulent payment collect requests with zero real risk.'}
            </p>

            <div className="bg-[#F6F6F6] p-3 rounded-xl border border-[#E3E3E3] text-xs font-semibold text-[#12391E]">
              📌 नियम: UPI PIN केवल पैसे भेजने (Send) के लिए होता है।
            </div>
          </div>

          <button
            onClick={() => setActiveTab('simulator')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-5 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>{language === 'hi' ? 'UPI अभ्यास शुरू करें' : 'Start UPI Practice'}</span>
          </button>
        </div>

        {/* Card 2: Safe Browsing */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#B26A00] bg-[#FFF3E0] px-2.5 py-0.5 rounded-full border border-amber-200">
                Phishing Radar
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-1">
              {t.home.cards[3].title}
            </h3>
            <p className="text-sm text-[#555555] mb-4">
              {language === 'hi' ? 'असली और नकली वेबसाइटों की तुलना करें: onlinesbi.sbi बनाम sbi-kyc.xyz में फर्क पहचानें।' : 'Compare genuine bank portals with deceptive lookalike phishing sites.'}
            </p>

            <div className="bg-[#F6F6F6] p-3 rounded-xl border border-[#E3E3E3] text-xs font-semibold text-[#111111]">
              🔒 ताले के निशान का सच: फर्जी साइटों पर भी ताला हो सकता है।
            </div>
          </div>

          <button
            onClick={() => setActiveTab('browsing')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-5 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'hi' ? 'वेबसाइट जांचें' : 'Inspect Websites'}</span>
          </button>
        </div>

        {/* Card 3: Caregiver Mode */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-[#12391E] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#12391E] bg-[#F6F6F6] px-2.5 py-0.5 rounded-full border border-[#E3E3E3]">
                Strict Consent Only
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#111111] mb-1">
              {t.home.cards[5].title}
            </h3>
            <p className="text-sm text-[#555555] mb-4">
              {language === 'hi' ? 'अपनी स्पष्ट सहमति से परिवार को केवल अपनी पढ़ाई का स्कोर दिखाएं। गुप्त निगरानी पूर्णतः बंद।' : 'Share learning achievements with trusted family strictly with your explicit consent.'}
            </p>

            <div className="bg-[#F6F6F6] p-3 rounded-xl border border-[#E3E3E3] text-xs font-semibold text-[#555555]">
              🛡️ कभी कोई बैंक खाता या पासवर्ड साझा नहीं होता।
            </div>
          </div>

          <button
            onClick={() => setActiveTab('caregiver')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#12391E] px-5 py-3.5 rounded-full font-bold text-base min-h-[52px] border border-[#E3E3E3] transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>{language === 'hi' ? 'सहमति सेटिंग्स' : 'Manage Consent'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
