import React, { createContext, useContext, useState, useEffect } from 'react';
import { FontSize } from '../types';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  toggleContrast: () => void;
  voiceAssistEnabled: boolean;
  setVoiceAssistEnabled: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'normal',
  setFontSize: () => {},
  highContrast: false,
  setHighContrast: () => {},
  toggleContrast: () => {},
  voiceAssistEnabled: true,
  setVoiceAssistEnabled: () => {},
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('suraksha_fontsize') as FontSize) || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('suraksha_high_contrast') === 'true';
  });

  const [voiceAssistEnabled, setVoiceAssistEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('suraksha_voice_enabled') !== 'false';
  });

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('suraksha_fontsize', size);
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    localStorage.setItem('suraksha_high_contrast', String(val));
  };

  const toggleContrast = () => setHighContrast(!highContrast);

  const setVoiceAssistEnabled = (val: boolean) => {
    setVoiceAssistEnabledState(val);
    localStorage.setItem('suraksha_voice_enabled', String(val));
  };

  useEffect(() => {
    const root = document.documentElement;
    // Set font size class on root
    root.classList.remove('font-normal', 'font-large', 'font-xlarge');
    root.classList.add(`font-${fontSize}`);

    // Set contrast class on root
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [fontSize, highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        toggleContrast,
        voiceAssistEnabled,
        setVoiceAssistEnabled,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
