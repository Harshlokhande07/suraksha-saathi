import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { ScamChecker } from './pages/ScamChecker';
import { BankingSimulator } from './pages/BankingSimulator';
import { SafeBrowsing } from './pages/SafeBrowsing';
import { EmergencyHelp } from './pages/EmergencyHelp';
import { CaregiverMode } from './pages/CaregiverMode';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'learn', 'checker', 'simulator', 'browsing', 'emergency', 'caregiver'].includes(hash)
      ? hash
      : 'home';
  });

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'learn', 'checker', 'simulator', 'browsing', 'emergency', 'caregiver'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'learn':
        return <Learn />;
      case 'checker':
        return <ScamChecker />;
      case 'simulator':
        return <BankingSimulator />;
      case 'browsing':
        return <SafeBrowsing />;
      case 'emergency':
        return <EmergencyHelp />;
      case 'caregiver':
        return <CaregiverMode />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] py-2 sm:py-4 px-2 sm:px-4 font-sans selection:bg-[#B6F36B] selection:text-[#12391E]">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Bento Container with 28px Radius and #F6F6F6 Background */}
      <div className="max-w-[1240px] mx-auto bg-[#F6F6F6] rounded-bento-container border border-[#E3E3E3] p-4 sm:p-6 lg:p-8 mt-2 sm:mt-4 shadow-sm min-h-[calc(100vh-120px)] flex flex-col justify-between">
        <main className="flex-grow w-full">
          {renderActivePage()}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>

      {/* Fixed Bottom Nav for Mobile (<640px) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
