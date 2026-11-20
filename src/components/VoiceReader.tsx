import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { speechController } from '../utils/speechUtils';
import { Volume2, Square } from 'lucide-react';

interface VoiceReaderProps {
  textToRead: string;
  label?: string;
  className?: string;
}

export const VoiceReader: React.FC<VoiceReaderProps> = ({ textToRead, label, className = '' }) => {
  const { language } = useLanguage();
  const { voiceAssistEnabled } = useAccessibility();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsubscribe = speechController.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  if (!voiceAssistEnabled) return null;

  const handleToggle = () => {
    if (isSpeaking) {
      speechController.stop();
    } else {
      speechController.speak(textToRead, language);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold min-h-touch transition-all shadow-sm focus:outline-none ${
        isSpeaking
          ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse ring-2 ring-red-400'
          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
      } ${className}`}
      aria-label={isSpeaking ? 'Stop voice readout' : 'Read text aloud in voice'}
      title={isSpeaking ? 'Stop Audio' : 'Play Audio'}
    >
      {isSpeaking ? (
        <>
          <Square className="w-5 h-5 fill-current" />
          <span>{language === 'hi' ? 'आवाज़ रोकें' : language === 'mr' ? 'थांबवा' : 'Stop Audio'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-amber-800" />
          <span>{label || (language === 'hi' ? 'बोलकर सुनें' : language === 'mr' ? 'ऐका' : 'Listen')}</span>
        </>
      )}
    </button>
  );
};
