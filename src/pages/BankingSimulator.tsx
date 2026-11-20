import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import { UPIScenario } from '../types';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Info,
  Check,
  X
} from 'lucide-react';

const UPI_SCENARIOS: UPIScenario[] = [
  {
    id: 'olx_qr_collect',
    senderName: 'OLX Buyer (Ramesh Kumar)',
    vpa: 'pay-buyer9281@fakeupi',
    amount: 5000,
    type: 'COLLECT_REQUEST',
    isScam: true,
    title: {
      hi: 'परिदृश्य 1: OLX खरीदार का पेमेंट रिक्वेस्ट',
      mr: 'प्रसंग १: OLX खरेदीदाराची पेमेंट विनंती',
      en: 'Scenario 1: OLX Buyer Collect Request'
    },
    description: {
      hi: 'खरीदार कहता है: "मैंने आपको सोफे के 5,000 रुपये भेज दिए हैं। पैसे अपने खाते में प्राप्त करने के लिए तुरंत Approve दबाकर अपना UPI PIN डालें।"',
      mr: 'खरेदीदार म्हणतो: "मी ५,००० रुपये पाठवले आहेत. रक्कम खात्यात जमा होण्यासाठी Approve दाबून UPI PIN टाका."',
      en: 'Buyer says: "I sent Rs. 5,000 for your sofa. To receive the money into your bank, tap Approve and enter your secret UPI PIN."'
    },
    scamExplanation: {
      hi: 'यह 100% फ्रॉड है! यह पैसे भेजने की रिक्वेस्ट (Collect Request) है, पैसे प्राप्त करने की नहीं। यदि आप Approve दबाकर अपना PIN डालेंगे, तो आपके खाते से 5,000 रुपये कट जाएंगे!',
      mr: 'हा १००% घोटाळा आहे! ही पैसे कापण्याची (Collect Request) विनंती आहे. PIN टाकताच तुमच्या खात्यातून ५,००० रुपये कापले जातील!',
      en: 'This is a scam! This is a Collect Request demanding money FROM you. Entering your PIN transfers Rs. 5,000 to the fraudster!'
    },
    actionPrompt: {
      hi: 'क्या आप इस पेमेंट को Approve (स्वीकार) करेंगे या Decline (अस्वीकार)?',
      mr: 'तुम्ही हे पेमेंट Approve कराल की Decline?',
      en: 'Will you Approve or Decline this request?'
    }
  },
  {
    id: 'kbc_lottery_fee',
    senderName: 'KBC Lottery Registration',
    vpa: 'kbc-finance-head@fakebank',
    amount: 299,
    type: 'COLLECT_REQUEST',
    isScam: true,
    title: {
      hi: 'परिदृश्य 2: 25 लाख लॉटरी की फाइल फीस',
      mr: 'प्रसंग २: २५ लाख लॉटरी फाइल फी',
      en: 'Scenario 2: KBC Lottery File Fee'
    },
    description: {
      hi: 'संदेश: "25 लाख का चेक भेजने के लिए 299 रुपये की फाइल प्रोसेसिंग फीस जमा करें।"',
      mr: 'मेसेज: "२५ लाखांचा चेक पाठवण्यासाठी २९९ रुपये प्रक्रिया शुल्क त्वरित भरा."',
      en: 'Message: "Pay Rs. 299 file processing fee to release your Rs. 25,00,000 prize cheque."'
    },
    scamExplanation: {
      hi: 'धोखाधड़ी! असली लॉटरी में कभी अग्रिम शुल्क नहीं मांगा जाता। एक बार 299 रुपये देने पर वे आपसे 25,000 और फिर 1 लाख रुपये मांगते रहेंगे।',
      mr: 'फसवणूक! खऱ्या बक्षिसासाठी कधीही आगाऊ शुल्क मागत नाहीत.',
      en: 'Scam! Legitimate prizes never demand registration fees or advance clearance charges.'
    },
    actionPrompt: {
      hi: 'क्या आप 299 रुपये का भुगतान करेंगे?',
      mr: 'तुम्ही २९९ रुपये द्याल का?',
      en: 'Will you pay Rs. 299?'
    }
  },
  {
    id: 'genuine_discom_bill',
    senderName: 'Tata Power DDL (Official Discom)',
    vpa: 'tatapower.billpay@icici',
    amount: 850,
    type: 'GENUINE_BILL',
    isScam: false,
    title: {
      hi: 'परिदृश्य 3: मासिक बिजली बिल भुगतान',
      mr: 'प्रसंग ३: मासिक वीज बिल भरणा',
      en: 'Scenario 3: Monthly Power Bill Payment'
    },
    description: {
      hi: 'उपभोक्ता संख्या 1002345 का नियमित बिजली बिल 850 रुपये। अंतिम तिथि: 28 तारीख।',
      mr: 'ग्राहक क्रमांक १००२३४५ चे नियमित वीज बिल ८५० रुपये.',
      en: 'Genuine utility bill for consumer no. 1002345 amounting to Rs. 850 due on 28th.'
    },
    scamExplanation: {
      hi: 'यह आपका वास्तविक मासिक बिजली बिल है जो आधिकारिक डिस्कॉम VPA पर जा रहा है। इसे आप बिल की तारीख और उपभोक्ता संख्या देखकर सुरक्षित रूप से भर सकते हैं।',
      mr: 'हे तुमचे अधिकृत वीज बिल आहे. हे सुरक्षित आहे.',
      en: 'This is a genuine routine utility bill payable to an authorized utility VPA.'
    },
    actionPrompt: {
      hi: 'क्या आप इस वैध बिल का भुगतान करेंगे?',
      mr: 'तुम्ही हे वैध बिल भराल का?',
      en: 'Do you approve paying this genuine bill?'
    }
  },
  {
    id: 'fake_cashback_reward',
    senderName: 'GPay Scratch Card Cashback',
    vpa: 'cashback-reward98@upi',
    amount: 1999,
    type: 'COLLECT_REQUEST',
    isScam: true,
    title: {
      hi: 'परिदृश्य 4: स्क्रैच कार्ड कैशबैक रिवॉर्ड',
      mr: 'प्रसंग ४: स्क्रॅच कार्ड कॅशबॅक बक्षीस',
      en: 'Scenario 4: Scratch Card Cashback Reward'
    },
    description: {
      hi: 'संदेश: "बधाई हो! आपने 1,999 रुपये का कैशबैक जीता है। पैसे खाते में जमा करने के लिए Pay दबाएं और PIN डालें।"',
      mr: 'मेसेज: "अभिनंदन! तुम्ही १,९९९ रुपयांचा कॅशबॅक जिंकला आहे. पैसे खात्यात घेण्यासाठी Pay दाबा आणि PIN टाका."',
      en: 'Message: "Congratulations! You won Rs. 1,999 cashback. Tap Pay and enter PIN to deposit into your account."'
    },
    scamExplanation: {
      hi: 'धोखा! कभी भी कैशबैक पाने के लिए Pay नहीं दबाया जाता और न ही PIN डाला जाता है। कैशबैक हमेशा सीधे खाते में खुद क्रेडिट होता है!',
      mr: 'घोटाळा! कॅशबॅक मिळवण्यासाठी कधीही Pay दाबावे लागत नाही किंवा PIN टाकावा लागत नाही. कॅशबॅक थेट खात्यात जमा होतो!',
      en: 'Scam! Legitimate cashback is automatically credited to your bank account without requiring you to tap Pay or enter a PIN.'
    },
    actionPrompt: {
      hi: 'कैशबैक पाने के लिए क्या आप Pay दबाएंगे?',
      mr: 'कॅशबॅक मिळवण्यासाठी तुम्ही Pay दाबाल का?',
      en: 'Will you tap Pay to receive this cashback?'
    }
  }
];

export const BankingSimulator: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userDecision, setUserDecision] = useState<'APPROVED' | 'DECLINED' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = UPI_SCENARIOS[currentIndex];

  const handleDecision = (decision: 'APPROVED' | 'DECLINED') => {
    setUserDecision(decision);
    setShowFeedback(true);

    const isCorrect = (scenario.isScam && decision === 'DECLINED') || (!scenario.isScam && decision === 'APPROVED');

    if (isCorrect) {
      setScore((prev) => prev + 1);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch { }

      fetch('/api/caregiver/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleName: 'UPI Banking Simulator', scoreInc: 1 }),
      }).catch(() => { });
    }
  };

  const handleNext = () => {
    setUserDecision(null);
    setShowFeedback(false);
    if (currentIndex < UPI_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const isCorrect = (scenario.isScam && userDecision === 'DECLINED') || (!scenario.isScam && userDecision === 'APPROVED');

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Header Card */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12391E] bg-[#B6F36B] px-3 py-1 rounded-full inline-block mb-2">
            100% काल्पनिक अभ्यास वातावरण
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            {t.simulator.title}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] mt-1">
            {t.simulator.subtitle}
          </p>
        </div>

        {/* Practice Score Chip */}
        <div className="inline-flex items-center gap-3 bg-[#F6F6F6] px-5 py-2.5 rounded-full border border-[#E3E3E3]">
          <span className="text-xs font-bold uppercase text-[#555555]">Score</span>
          <span className="text-2xl font-black text-[#12391E]">
            {score} / {UPI_SCENARIOS.length}
          </span>
        </div>
      </div>

      {/* Mandatory Practice Mode Banner */}
      <div className="bg-[#B6F36B]/30 border border-[#B6F36B] rounded-2xl p-4 flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-[#12391E]">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-[#12391E] flex-shrink-0" />
          <span>PRACTICE MODE — No real money. Never enter UPI PIN to receive money!</span>
        </div>
        <VoiceReader
          textToRead={`${scenario.title[language]}. ${scenario.description[language]}`}
          className="bg-white text-[#111111] text-xs py-1"
        />
      </div>

      {/* Phone-Frame Bento Card */}
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-[32px] border-4 border-[#12391E] shadow-2xl overflow-hidden">
          {/* Phone Speaker Notch & App Header */}
          <div className="bg-[#12391E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#B6F36B] text-[#12391E] flex items-center justify-center font-black text-sm">
                ₹
              </div>
              <span className="font-bold text-sm tracking-wide">Suraksha Pay (Practice)</span>
            </div>
            <span className="text-xs font-bold bg-[#B6F36B] text-[#12391E] px-2.5 py-0.5 rounded-full">
              PRACTICE MODE
            </span>
          </div>

          {/* Phone Screen Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#F6F6F6]">
            {/* Scenario Header */}
            <div className="bg-white rounded-2xl p-4 border border-[#E3E3E3]">
              <span className="text-xs font-bold text-[#555555] uppercase block mb-1">
                परिदृश्य {currentIndex + 1} of {UPI_SCENARIOS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#111111]">
                {scenario.title[language]}
              </h2>
              <p className="text-sm text-[#555555] mt-1 leading-snug">
                {scenario.description[language]}
              </p>
            </div>

            {/* Payment Card inside Phone */}
            <div className="bg-white rounded-2xl p-6 border border-[#E3E3E3] text-center space-y-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B26A00] bg-[#FFF3E0] px-3 py-1 rounded-full border border-amber-200 inline-block">
                Incoming Payment Request
              </span>

              <div>
                <span className="text-xs font-semibold text-[#555555] block">Requested Amount</span>
                <span className="text-4xl font-black text-[#111111]">
                  ₹ {scenario.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-[#F6F6F6] rounded-xl p-3 text-left space-y-1 text-xs sm:text-sm border border-[#E3E3E3]">
                <div className="flex justify-between">
                  <span className="text-[#555555]">From:</span>
                  <span className="font-bold text-[#111111]">{scenario.senderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">VPA:</span>
                  <span className="font-mono text-xs text-[#555555]">{scenario.vpa}</span>
                </div>
              </div>

              <p className="text-sm font-bold text-[#12391E]">
                {scenario.actionPrompt[language]}
              </p>
            </div>

            {/* Action Buttons: Decline vs Approve (Pill Buttons min-height 52px) */}
            {!showFeedback ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleDecision('DECLINED')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-[#C62828] border-2 border-[#C62828] px-4 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95"
                >
                  <X className="w-5 h-5" />
                  <span>{t.simulator.declineBtn}</span>
                </button>

                <button
                  onClick={() => handleDecision('APPROVED')}
                  className="inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-4 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95"
                >
                  <Check className="w-5 h-5" />
                  <span>{t.simulator.payBtn}</span>
                </button>
              </div>
            ) : (
              /* Feedback Display */
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border ${isCorrect
                    ? 'bg-[#E8F5E9] text-[#1E7B34] border-green-300'
                    : 'bg-[#FFEBEE] text-[#C62828] border-red-300'
                  }`}>
                  <div className="flex items-center gap-2 font-black text-lg">
                    {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
                    <span>{isCorrect ? 'शाबाश! सही निर्णय!' : 'सावधान! यह गलत कदम था!'}</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold mt-2 text-[#111111] leading-relaxed">
                    {scenario.scamExplanation[language]}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-6 py-4 rounded-full font-black text-base min-h-[52px] shadow-md transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.simulator.nextScenario}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
