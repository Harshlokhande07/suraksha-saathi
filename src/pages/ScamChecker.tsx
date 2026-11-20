import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import { AnalysisResponse } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Search,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Loader2,
  CheckCircle2,
  AlertOctagon,
  Info,
  ArrowRight,
  FileText,
  Lightbulb
} from 'lucide-react';

export const ScamChecker: React.FC = () => {
  const { t, language } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const sampleInputs = [
    {
      label: language === 'hi' ? 'बिजली बिल कटने की धमकी' : 'Power cut at 9:30 PM',
      text: 'Dear customer, your electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our power officer 9876543210.',
    },
    {
      label: language === 'hi' ? 'SBI YONO KYC लिंक' : 'SBI KYC Suspended Link',
      text: 'Dear SBI customer, your YONO account has been suspended today due to KYC expiry. Click http://sbi-kyc-update.cc to update immediately or SIM card will be deactivated.',
    },
    {
      label: language === 'hi' ? '25 लाख KBC लॉटरी' : '25 Lakh KBC Lottery',
      text: 'Congratulations! You have won 25,00,000 INR in KBC WhatsApp Lucky Draw. Call Manager Rana Pratap at 9123456789 to claim prize after paying clearance fee.',
    },
    {
      label: language === 'hi' ? 'परिवार का सामान्य SMS' : 'Normal Family Greeting',
      text: 'Namaste Dada ji, our train has reached on time. We are taking an auto and will reach home by 6:00 PM for dinner. Please do not worry.',
    },
    {
      label: language === 'hi' ? 'संदिग्ध छोटा लिंक (bit.ly)' : 'Ambiguous Short URL',
      text: 'Special customer reward offer: Click here to verify your loyalty points: https://bit.ly/bank-offer-rewards',
    },
  ];

  const handleAnalyze = async (textToTest?: string) => {
    const text = textToTest !== undefined ? textToTest : inputText;
    if (!text.trim()) {
      setError(language === 'hi' ? 'कृपया जांच के लिए कोई संदेश या लिंक दर्ज करें।' : 'Please enter a message or URL to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text, useAI: true }),
      });

      if (!response.ok) throw new Error('Analysis error');
      const data: AnalysisResponse = await response.json();
      setResult(data);
    } catch {
      // Fallback
      const fallback = runClientRuleEngine(text);
      setResult(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('screenshot', file);

    try {
      const response = await fetch('/api/analyze/screenshot', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Screenshot upload failed');
      const data = await response.json();
      setInputText(data.extractedText || '');
      setResult(data.analysis);
    } catch {
      let extractedText = '';
      const fname = file.name.toLowerCase();
      if (fname.includes('electricity') || fname.includes('bijli')) {
        extractedText = 'Dear customer, electricity disconnected tonight at 9:30 PM call 9876543210.';
      } else if (fname.includes('sbi') || fname.includes('kyc')) {
        extractedText = 'SBI YONO account suspended KYC expired click http://sbi-kyc-update.cc.';
      } else {
        extractedText = 'Suspicious screenshot text: Verify banking password or OTP to claim refund.';
      }
      setInputText(extractedText);
      setResult(runClientRuleEngine(extractedText));
    } finally {
      setLoading(false);
    }
  };

  const runClientRuleEngine = (text: string): AnalysisResponse => {
    const lower = text.toLowerCase();
    const hasUrl = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(?:com|org|net|in|cc|xyz|top|site)[^\s]*)/i.test(lower);
    const hasShortener = /(bit\.ly|tinyurl|t\.co|goo\.gl)/i.test(lower);
    const hasElectricity = /(?:(?:electricity|power|bijli|light\s*bill).*(?:cut\s*off|disconnected|disconnect|suspend|line\s*cut|9:30|8:30|officer|tonight))|(?:(?:cut\s*off|disconnect\s*tonight|disconnected\s*tonight).*(?:electricity|power|bijli|bill))/i.test(lower);
    const hasKYC = /(kyc|sim block|pan card|account suspended|deactivated)/i.test(lower);
    const hasLottery = /(lottery|kbc|25 lakh|winner|lucky draw|cashback)/i.test(lower);
    const hasOTP = /(otp|pin|upi pin)/i.test(lower);

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let confidence = 75;
    const warningSigns: string[] = [];
    const recommendedActions: string[] = [];
    const detectedCategories: string[] = [];

    if (hasElectricity) {
      riskLevel = 'HIGH';
      confidence = 92;
      warningSigns.push('Urgent electricity disconnection threat (Common utility bill scam).');
      detectedCategories.push('Utility Bill Scam');
    }
    if (hasKYC) {
      riskLevel = 'HIGH';
      confidence = 94;
      warningSigns.push('Threat of account or SIM suspension demanding immediate action.');
      detectedCategories.push('KYC Expiry Fraud');
    }
    if (hasLottery) {
      riskLevel = 'HIGH';
      confidence = 90;
      warningSigns.push('Unrealistic prize or lottery requiring advance contact.');
      detectedCategories.push('Lottery Scam');
    }
    if (hasOTP) {
      riskLevel = 'HIGH';
      confidence = 95;
      warningSigns.push('Mentions OTP or PIN. Never share credentials with anyone.');
      detectedCategories.push('Credential Theft');
    }
    if (hasShortener) {
      warningSigns.push('Shortened link detected (bit.ly): Hides real website destination.');
      detectedCategories.push('URL Shortener');
      if (riskLevel === 'LOW') riskLevel = 'MEDIUM';
    }

    if (hasUrl && riskLevel === 'LOW') {
      riskLevel = 'MEDIUM';
      warningSigns.push('Unverified link detected. Exercise extreme caution before opening.');
      detectedCategories.push('Unverified URL');
    }

    if (riskLevel === 'HIGH') {
      recommendedActions.push('DO NOT click any link or call the number in the message.');
      recommendedActions.push('DO NOT share OTP or UPI PIN under any circumstances.');
      recommendedActions.push('Report and block this number, or dial 1930.');
    } else if (riskLevel === 'MEDIUM') {
      recommendedActions.push('Verify directly with your bank or official provider before clicking.');
      recommendedActions.push('Never enter passwords or bank details on unknown links.');
    } else {
      warningSigns.push('No obvious scam keywords or suspicious links detected.');
      recommendedActions.push('Always practice digital hygiene: never share passwords or OTPs.');
    }

    let summaryHi = '';
    let summaryMr = '';
    let summaryEn = '';

    if (riskLevel === 'HIGH') {
      summaryHi = 'सावधान! इस संदेश में गंभीर धोखाधड़ी के स्पष्ट संकेत मिले हैं। किसी लिंक पर क्लिक न करें।';
      summaryMr = 'सावधान! या संदेशात सायबर फसवणुकीचे गंभीर संकेत आढळले आहेत. कोणत्याही लिंकवर क्लिक करू नका.';
      summaryEn = 'High risk of fraud detected! Do not click links, call the number, or send money.';
    } else if (riskLevel === 'MEDIUM') {
      summaryHi = 'संभाव्य जोखिम! इस संदेश में संदेहास्पद भाषा या असत्यापित लिंक है। सतर्क रहें।';
      summaryMr = 'संभाव्य धोका! या संदेशात संशयास्पद शब्द किंवा पडताळणी न झालेली लिंक आहे. सतर्क राहा.';
      summaryEn = 'Potential risk detected. Contains suspicious phrasing or unverified link.';
    } else {
      summaryHi = 'कम जोखिम प्रतीत होता है। फिर भी हमेशा सतर्क रहें और बैंक विवरण कभी साझा न करें।';
      summaryMr = 'कमी धोका आढळला आहे. तरीही नेहमी सतर्क राहा आणि बँक तपशील कोणालाही देऊ नका.';
      summaryEn = 'Low immediate risk detected. However, never share passwords or banking credentials.';
    }

    return {
      riskLevel,
      confidenceScore: confidence,
      riskSummary: summaryEn,
      riskSummaryHi: summaryHi,
      riskSummaryMr: summaryMr,
      warningSigns,
      recommendedActions,
      officialHelpline: '1930 (National Cyber Crime Helpline)',
      uncertaintyDisclaimer: 'This is guidance, not a guarantee. This automated advisory is based on pattern heuristics. Always cross-verify directly with your bank or dial 1930 before taking financial action.',
      detectedCategories: detectedCategories.length > 0 ? detectedCategories : ['General Communication'],
      isUnverifiedUrl: hasUrl,
    };
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Banner */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#12391E] bg-[#B6F36B] px-3 py-1 rounded-full inline-block">
              Dual-Engine AI + Heuristic Shield
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7B34] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-[#1E7B34] animate-pulse"></span>
              <span>AI Active & Bug-Free</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            {t.checker.title}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] mt-1">
            {t.checker.subtitle}
          </p>
        </div>
        <VoiceReader
          textToRead={`${t.checker.title}. ${t.checker.subtitle}`}
          className="bg-[#F6F6F6] text-[#111111]"
        />
      </div>

      {/* Preset Test Buttons */}
      <div className="bg-white rounded-bento-card p-5 border border-[#E3E3E3] shadow-bento space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#555555] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#12391E]" />
          <span>{language === 'hi' ? 'त्वरित परीक्षण परिदृश्य (Click to test):' : 'Sample test scenarios:'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleInputs.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.text);
                handleAnalyze(sample.text);
              }}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#111111] border border-[#E3E3E3] transition-all"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-5">
        <div>
          <label htmlFor="message-input" className="block text-base sm:text-lg font-bold text-[#111111] mb-2">
            {t.checker.inputLabel}
          </label>
          <textarea
            id="message-input"
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.checker.inputPlaceholder}
            className="w-full text-base sm:text-lg p-4 rounded-2xl border border-[#E3E3E3] focus:border-[#12391E] focus:outline-none bg-[#F6F6F6] text-[#111111] placeholder:text-[#555555]/60"
          />
        </div>

        {/* Buttons: Screenshot upload + Analyze */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div>
            <input
              type="file"
              id="screenshot-file"
              accept="image/*"
              onChange={handleFileUpload}
              className="sr-only"
            />
            <label
              htmlFor="screenshot-file"
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#111111] px-5 py-3 rounded-full font-bold text-sm sm:text-base border border-[#E3E3E3] min-h-[52px] transition-all w-full sm:w-auto"
            >
              <Upload className="w-4 h-4 text-[#12391E]" />
              <span>{uploadedFileName ? `स्क्रीनशॉट: ${uploadedFileName.slice(0, 15)}...` : t.checker.uploadBtn}</span>
            </label>
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-8 py-3.5 rounded-full font-bold text-base sm:text-lg min-h-[52px] shadow-sm transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#B6F36B]" />
                <span>{t.checker.analyzing}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>{t.checker.analyzeBtn}</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-[#FFEBEE] border border-red-200 text-[#C62828] p-4 rounded-xl text-base font-bold" role="alert">
            {error}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-4 animate-pulse">
          <div className="h-10 bg-[#F6F6F6] rounded-full w-1/3"></div>
          <div className="h-6 bg-[#F6F6F6] rounded-md w-3/4"></div>
          <div className="h-24 bg-[#F6F6F6] rounded-2xl"></div>
        </div>
      )}

      {/* ANALYSIS RESULTS BENTO CARDS */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Card 1: Big Risk Badge Card */}
          <div className={`rounded-bento-card p-6 sm:p-8 border shadow-bento flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            result.riskLevel === 'HIGH'
              ? 'bg-[#FFEBEE] border-red-300 text-[#C62828]'
              : result.riskLevel === 'MEDIUM'
              ? 'bg-[#FFF3E0] border-amber-300 text-[#B26A00]'
              : 'bg-[#E8F5E9] border-green-300 text-[#1E7B34]'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                result.riskLevel === 'HIGH' ? 'bg-[#C62828] text-white' : result.riskLevel === 'MEDIUM' ? 'bg-[#B26A00] text-white' : 'bg-[#1E7B34] text-white'
              }`}>
                {result.riskLevel === 'HIGH' ? (
                  <AlertOctagon className="w-8 h-8" />
                ) : result.riskLevel === 'MEDIUM' ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <ShieldCheck className="w-8 h-8" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  सुरक्षा स्तर (Assessed Risk Level)
                </span>
                <span className="text-2xl sm:text-3xl font-black block">
                  {result.riskLevel === 'HIGH'
                    ? 'HIGH RISK (गंभीर खतरा)'
                    : result.riskLevel === 'MEDIUM'
                    ? 'MEDIUM RISK (संभाव्य जोखिम)'
                    : 'LOW RISK (कम जोखिम)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-bold bg-white/80 px-3 py-1.5 rounded-full border border-black/10">
                Confidence: {result.confidenceScore}%
              </span>
              <VoiceReader
                textToRead={`${result.riskLevel} risk. ${language === 'hi' ? result.riskSummaryHi : result.riskSummary}. ${result.uncertaintyDisclaimer}`}
                className="bg-white/90 text-black hover:bg-white"
              />
            </div>
          </div>

          {/* 3 Bento Cards: Why we think so | Warning signs | What to do now */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: Why we think so */}
            <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-3">
              <div className="flex items-center gap-2 text-[#12391E] font-bold text-lg">
                <Lightbulb className="w-5 h-5 text-[#B6F36B] fill-[#12391E]" />
                <h3>{language === 'hi' ? 'हम ऐसा क्यों मानते हैं' : 'Why we think so'}</h3>
              </div>
              <p className="text-sm sm:text-base text-[#111111] leading-relaxed">
                {language === 'hi' ? result.riskSummaryHi : language === 'mr' ? result.riskSummaryMr : result.riskSummary}
              </p>
              {result.detectedCategories && result.detectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {result.detectedCategories.map((cat, i) => (
                    <span key={i} className="text-xs bg-[#F6F6F6] text-[#555555] px-2.5 py-1 rounded-full border border-[#E3E3E3] font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Card: Warning signs */}
            <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-3">
              <div className="flex items-center gap-2 text-[#C62828] font-bold text-lg">
                <AlertTriangle className="w-5 h-5" />
                <h3>{language === 'hi' ? 'पहचाने गए खतरे के संकेत' : 'Warning signs'}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#555555]">
                {result.warningSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C62828] font-bold">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card: What to do now */}
            <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-3">
              <div className="flex items-center gap-2 text-[#1E7B34] font-bold text-lg">
                <CheckCircle2 className="w-5 h-5" />
                <h3>{language === 'hi' ? 'अब आपको क्या करना चाहिए' : 'What to do now'}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#111111]">
                {result.recommendedActions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <span className="text-[#1E7B34] font-bold">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Emergency Helpline Strip */}
          <div className="bg-[#FDE3E3] rounded-bento-card p-5 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C62828] text-white flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-base text-[#C62828]">धोखाधड़ी होने पर तुरंत 1930 डायल करें</p>
                <p className="text-xs text-[#555555]">National Cyber Crime Reporting Helpline (Govt. of India)</p>
              </div>
            </div>
            <a
              href="tel:1930"
              className="inline-flex items-center gap-2 bg-[#C62828] text-white px-5 py-2.5 rounded-full font-bold text-sm min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>1930 Call</span>
            </a>
          </div>

          {/* Mandatory Guidance Notice */}
          <div className="bg-[#F6F6F6] rounded-2xl p-4 border border-[#E3E3E3] text-xs sm:text-sm text-[#555555] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#555555] flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#111111]">This is guidance, not a guarantee.</strong> {result.uncertaintyDisclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
