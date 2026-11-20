import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import {
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  Clock,
  Search,
  Building,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface BankContact {
  bankName: string;
  nameHi: string;
  nameMr: string;
  tollFree: string;
  alternateNumber?: string;
  blockCardSms?: string;
  website: string;
  cyberPortalUrl: string;
}

export const EmergencyHelp: React.FC = () => {
  const { t, language } = useLanguage();
  const [banks, setBanks] = useState<BankContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/emergency')
      .then((res) => res.json())
      .then((data) => {
        if (data?.banks) setBanks(data.banks);
      })
      .catch(() => {
        setBanks([
          {
            bankName: 'State Bank of India (SBI)',
            nameHi: 'भारतीय स्टेट बैंक (SBI)',
            nameMr: 'स्टेट बँक ऑफ इंडिया (SBI)',
            tollFree: '1800 1234',
            alternateNumber: '1800 2100',
            blockCardSms: 'SMS BLOCK <last 4 digits> to 567676',
            website: 'https://onlinesbi.sbi/',
            cyberPortalUrl: 'https://bank.sbi/'
          },
          {
            bankName: 'HDFC Bank',
            nameHi: 'एचडीएफसी बैंक',
            nameMr: 'एचडीएफसी बँक',
            tollFree: '1800 202 6161',
            alternateNumber: '1800 1600',
            blockCardSms: 'SMS BLOCK to 5676712',
            website: 'https://www.hdfcbank.com/',
            cyberPortalUrl: 'https://www.hdfcbank.com/'
          },
          {
            bankName: 'ICICI Bank',
            nameHi: 'आईसीआईसीआई बैंक',
            nameMr: 'आयसीआयसीआय बँक',
            tollFree: '1800 1080',
            alternateNumber: '1800 102 4242',
            blockCardSms: 'SMS BLOCK <last 4 digits> to 5676766',
            website: 'https://www.icicibank.com/',
            cyberPortalUrl: 'https://www.icicibank.com/'
          },
          {
            bankName: 'Punjab National Bank (PNB)',
            nameHi: 'पंजाब नेशनल बैंक (PNB)',
            nameMr: 'पंजाब नॅशनल बँक (PNB)',
            tollFree: '1800 180 2222',
            alternateNumber: '1800 103 2222',
            blockCardSms: 'SMS HOTLIST <CardNo> to 5607040',
            website: 'https://www.pnbindia.in/',
            cyberPortalUrl: 'https://www.pnbindia.in/'
          },
          {
            bankName: 'Bank of Baroda',
            nameHi: 'बैंक ऑफ बड़ौदा',
            nameMr: 'बँक ऑफ बडोदा',
            tollFree: '1800 5700',
            alternateNumber: '1800 5000',
            blockCardSms: 'SMS BLOCK <last 4 digits> to 8422009988',
            website: 'https://www.bankofbaroda.in/',
            cyberPortalUrl: 'https://www.bankofbaroda.in/'
          },
          {
            bankName: 'Axis Bank',
            nameHi: 'एक्सिस बैंक',
            nameMr: 'ॲक्सिस बँक',
            tollFree: '1860 419 5555',
            alternateNumber: '1860 500 5555',
            blockCardSms: 'SMS BLOCK <last 4 digits> to 5676782',
            website: 'https://www.axisbank.com/',
            cyberPortalUrl: 'https://www.axisbank.com/'
          }
        ]);
      });
  }, []);

  const handleCopy = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filteredBanks = banks.filter((b) =>
    b.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.nameMr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Hero Lime Card for 1930 Helpline */}
      <div className="bg-gradient-to-br from-[#B6F36B] to-[#9BE04F] rounded-bento-card p-6 sm:p-10 border border-[#9BE04F] shadow-bento flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-[#12391E]">
          <div className="inline-flex items-center gap-2 bg-[#12391E] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>राष्ट्रीय साइबर आपातकालीन नंबर</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">
            1930 — साइबर अपराध रिपोर्टिंग हेल्पलाइन
          </h1>
          <p className="text-base sm:text-lg font-semibold leading-relaxed">
            धोखाधड़ी होने पर बिना देर किए तुरंत 1930 डायल करें। पहले 2-3 घंटों ("गोल्डन ऑवर") में कॉल करने पर पैसा रोका जा सकता है।
          </p>
          <div className="text-xs font-bold bg-white/70 px-3 py-1 rounded-full border border-black/10 inline-block">
            स्रोत: गृह मंत्रालय (Ministry of Home Affairs), भारत सरकार
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="tel:1930"
            className="inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-8 py-4 rounded-full font-black text-xl min-h-[52px] shadow-md transition-transform active:scale-95 text-center"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>1930 डायल करें</span>
          </a>
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#EDEDED] text-[#12391E] px-6 py-4 rounded-full font-bold text-base min-h-[52px] border border-[#E3E3E3] shadow-xs text-center"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Golden Hour Step Checklist Bento Card */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-[#12391E]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
              {t.emergency.goldenHourTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555]">
              {t.emergency.goldenHourText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F6F6F6] rounded-2xl p-5 border border-[#E3E3E3] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#12391E] text-white flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h3 className="font-bold text-base text-[#111111]">कदम 1: 1930 पर फोन करें</h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              तुरंत 1930 डायल करें और बैंक खाता व ट्रांजेक्शन का समय बताएं ताकि नोडल अधिकारी फंड फ्रीज कर सकें।
            </p>
          </div>

          <div className="bg-[#F6F6F6] rounded-2xl p-5 border border-[#E3E3E3] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#12391E] text-white flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h3 className="font-bold text-base text-[#111111]">कदम 2: बैंक कार्ड व UPI ब्लॉक करें</h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              नीचे दी गई बैंक हेल्पलाइन पर फोन करके या SMS भेजकर अपना ATM कार्ड और नेटबैंकिंग तुरंत बंद करवाएं।
            </p>
          </div>

          <div className="bg-[#F6F6F6] rounded-2xl p-5 border border-[#E3E3E3] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#12391E] text-white flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h3 className="font-bold text-base text-[#111111]">कदम 3: cybercrime.gov.in पर FIR</h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              सरकारी साइबर पोर्टल पर औपचारिक ऑनलाइन शिकायत दर्ज करें और एक्नॉलेजमेंट नंबर संभालकर रखें।
            </p>
          </div>
        </div>
      </div>

      {/* Official Bank Directory Bento Grid */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
              {t.emergency.banksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555]">
              कार्ड ब्लॉक और अनधिकृत लेनदेन रोकने हेतु सभी सत्यापित टोल-फ्री नंबर
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#555555] absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="बैंक खोजें (Search bank)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#E3E3E3] text-sm focus:border-[#12391E] focus:outline-none bg-[#F6F6F6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBanks.map((bank, idx) => (
            <div
              key={idx}
              className="bg-[#F6F6F6] rounded-2xl p-5 border border-[#E3E3E3] flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="font-bold text-base text-[#111111]">
                  {language === 'hi' ? bank.nameHi : language === 'mr' ? bank.nameMr : bank.bankName}
                </h3>
                <span className="text-[11px] text-[#555555] block mb-2">{bank.bankName}</span>

                <div className="bg-white p-2.5 rounded-xl border border-[#E3E3E3] flex items-center justify-between">
                  <span className="text-xs text-[#555555] font-semibold">Toll-Free:</span>
                  <div className="flex items-center gap-1.5">
                    <a href={`tel:${bank.tollFree.replace(/\s+/g, '')}`} className="font-black text-sm text-[#12391E] hover:underline">
                      {bank.tollFree}
                    </a>
                    <button
                      onClick={() => handleCopy(bank.tollFree)}
                      className="p-1 rounded text-[#555555] hover:text-[#111111]"
                      title="Copy"
                    >
                      {copiedNumber === bank.tollFree ? <Check className="w-3.5 h-3.5 text-[#1E7B34]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {bank.blockCardSms && (
                  <div className="text-[11px] text-[#555555] font-mono mt-1 bg-white p-2 rounded-lg border border-[#E3E3E3]">
                    SMS: {bank.blockCardSms}
                  </div>
                )}
              </div>

              <a
                href={`tel:${bank.tollFree.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white py-2.5 rounded-full font-bold text-xs min-h-[44px] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>कॉल करें</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
