import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, BookOpen, Search, Smartphone, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { language } = useLanguage();

  const items = [
    { id: 'home', label: language === 'hi' ? 'होम' : language === 'mr' ? 'मुख्य' : 'Home', icon: Shield },
    { id: 'learn', label: language === 'hi' ? 'सीखें' : language === 'mr' ? 'शिका' : 'Learn', icon: BookOpen },
    { id: 'checker', label: language === 'hi' ? 'जांचें' : language === 'mr' ? 'तपासा' : 'Check', icon: Search },
    { id: 'simulator', label: language === 'hi' ? 'अभ्यास' : language === 'mr' ? 'सराव' : 'Practice', icon: Smartphone },
    { id: 'emergency', label: language === 'hi' ? '1930 मदद' : language === 'mr' ? '1930 मदत' : 'Help', icon: PhoneCall, isEmergency: true },
  ];

  return (
    <aside aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E3E3E3] shadow-lg px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around h-16 min-h-[56px]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[52px] rounded-xl transition-all ${
                isActive
                  ? 'text-[#12391E] font-black scale-105'
                  : item.isEmergency
                  ? 'text-[#C62828] font-bold'
                  : 'text-[#555555] font-semibold'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-[#B6F36B]' : ''}`}>
                <Icon className={`w-5 h-5 ${item.isEmergency && !isActive ? 'animate-pulse' : ''}`} />
              </div>
              <span className="text-[11px] leading-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
