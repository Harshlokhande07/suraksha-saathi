import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import { LEARN_TOPICS } from '../data/learnTopics';
import { LearnTopic } from '../types';
import confetti from 'canvas-confetti';
import {
  FileText,
  KeyRound,
  Gift,
  PhoneCall,
  Smartphone,
  Globe,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Check
} from 'lucide-react';

export { LEARN_TOPICS };

export const Learn: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LEARN_TOPICS[0].id);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const topic = LEARN_TOPICS.find((t: LearnTopic) => t.id === selectedTopicId) || LEARN_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleAnswerSubmit = (index: number) => {
    setQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === topic.quiz.correctIndex) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {}
    }
  };

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'kyc': return FileText;
      case 'otp': return KeyRound;
      case 'lottery': return Gift;
      case 'digital-arrest': return PhoneCall;
      case 'upi': return Smartphone;
      default: return Globe;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12391E] bg-[#B6F36B] px-3 py-1 rounded-full inline-block mb-2">
            6 आवश्यक सुरक्षा ट्यूटोरियल
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            {language === 'hi' ? 'धोखाधड़ी के तरीके सीखें' : language === 'mr' ? 'फसवणुकीचे प्रकार शिका' : 'Learn & Explore Scams'}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] mt-1">
            {language === 'hi' ? 'सरल भाषा में व्याख्या, वास्तविक उदाहरण और बोलकर सुनने की सुविधा।' : 'Clear explanations, real-world examples, and voice narration.'}
          </p>
        </div>
        <VoiceReader
          textToRead={`${topic.title[language]}. ${topic.summary[language]}. ${topic.audioScript[language]}`}
          className="bg-[#F6F6F6] text-[#111111]"
        />
      </div>

      {/* Grid: 6 Topic Pills/Cards (Left 4 cols) + Reading Pane (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Topic Selector List */}
        <div className="lg:col-span-4 space-y-2.5" role="tablist">
          {LEARN_TOPICS.map((item: LearnTopic) => {
            const Icon = getTopicIcon(item.id);
            const isActive = item.id === selectedTopicId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTopic(item.id)}
                role="tab"
                aria-selected={isActive}
                className={`w-full text-left p-4 rounded-2xl font-bold text-sm sm:text-base min-h-[52px] flex items-center gap-3 transition-all border ${
                  isActive
                    ? 'bg-[#12391E] text-white border-[#12391E] shadow-sm'
                    : 'bg-white hover:bg-[#F6F6F6] text-[#111111] border-[#E3E3E3]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-[#B6F36B] text-[#12391E]' : 'bg-[#F6F6F6] text-[#555555]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="line-clamp-2 leading-snug">{item.title[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Lesson Card */}
        <div className="lg:col-span-8 bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-6">
          <div className="border-b border-[#E3E3E3] pb-4">
            <span className="text-xs font-bold text-[#555555] uppercase tracking-wider block mb-1">
              {topic.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
              {topic.title[language]}
            </h2>
            <div className="mt-3 p-4 rounded-xl bg-[#F6F6F6] border border-[#E3E3E3] text-sm sm:text-base font-semibold text-[#111111]">
              {topic.summary[language]}
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-[#111111] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#12391E]" />
              <span>{language === 'hi' ? 'यह धोखा कैसे काम करता है:' : 'How this scam works:'}</span>
            </h3>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed whitespace-pre-line">
              {topic.fullGuide[language]}
            </p>
          </div>

          {/* Warning signs & Golden Rules in 2 Bento columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Warning signs */}
            <div className="bg-[#FFEBEE] rounded-2xl p-5 border border-red-200 space-y-2">
              <h4 className="text-sm font-bold text-[#C62828] flex items-center gap-1.5 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4" />
                <span>चेतावनी संकेत (Warning Signs)</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#111111]">
                {topic.redFlags[language].map((flag: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#C62828] font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Golden Rules */}
            <div className="bg-[#E8F5E9] rounded-2xl p-5 border border-green-200 space-y-2">
              <h4 className="text-sm font-bold text-[#1E7B34] flex items-center gap-1.5 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>स्वर्णिम नियम (Golden Rules)</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#111111]">
                {topic.goldenRules[language].map((rule: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#1E7B34] font-bold">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Knowledge Check Mini Quiz */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 border border-[#E3E3E3] space-y-4">
            <div className="flex items-center gap-2 text-[#12391E] font-bold text-sm uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>ज्ञान परख (Knowledge Check)</span>
            </div>

            <p className="text-base sm:text-lg font-bold text-[#111111]">
              {topic.quiz.question[language]}
            </p>

            <div className="space-y-2.5">
              {topic.quiz.options[language].map((option: string, idx: number) => {
                const isSelected = quizAnswer === idx;
                const isCorrect = idx === topic.quiz.correctIndex;
                let btnStyle = 'bg-white hover:bg-[#EDEDED] text-[#111111] border-[#E3E3E3]';

                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-[#E8F5E9] text-[#1E7B34] border-green-400 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-[#FFEBEE] text-[#C62828] border-red-400 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full text-left p-3.5 rounded-full border min-h-[50px] text-xs sm:text-sm transition-all flex items-center justify-between px-5 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-[#1E7B34] flex-shrink-0" />}
                    {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[#C62828] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm font-semibold ${
                quizAnswer === topic.quiz.correctIndex
                  ? 'bg-[#E8F5E9] text-[#1E7B34] border-green-200'
                  : 'bg-[#FFEBEE] text-[#C62828] border-red-200'
              }`}>
                {topic.quiz.explanation[language]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
