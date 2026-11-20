import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceReader } from '../components/VoiceReader';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  Info
} from 'lucide-react';

interface CaregiverStatus {
  consentGranted: boolean;
  consentTimestamp: string | null;
  pairingCode: string;
  scopeSummary: string;
}

export const CaregiverMode: React.FC = () => {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<CaregiverStatus>({
    consentGranted: false,
    consentTimestamp: null,
    pairingCode: 'SAATHI-7821',
    scopeSummary: 'Only safety tutorials completed and practice scores are shared with explicit user permission.'
  });
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [caregiverData, setCaregiverData] = useState<any>(null);
  const [caregiverError, setCaregiverError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/caregiver/status')
      .then((res) => res.json())
      .then((data) => {
        if (data) setStatus(data);
      })
      .catch(() => {});
  }, []);

  const handleToggleConsent = async (newConsent: boolean) => {
    setLoading(true);
    try {
      const res = await fetch('/api/caregiver/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: newConsent }),
      });
      const data = await res.json();
      setStatus((prev) => ({
        ...prev,
        consentGranted: data.consentGranted,
        consentTimestamp: data.consentTimestamp,
      }));
      if (!newConsent) {
        setCaregiverData(null);
        setCaregiverError(null);
      }
    } catch {
      setStatus((prev) => ({
        ...prev,
        consentGranted: newConsent,
        consentTimestamp: newConsent ? new Date().toISOString() : null,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(status.pairingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestCaregiverAccess = async () => {
    setCaregiverError(null);
    try {
      const res = await fetch(`/api/caregiver/view/${status.pairingCode}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Access Denied');
      }
      const data = await res.json();
      setCaregiverData(data);
    } catch (err: any) {
      setCaregiverError(err.message || 'Access Denied');
      setCaregiverData(null);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Top Header */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border border-[#E3E3E3] shadow-bento flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12391E] bg-[#B6F36B] px-3 py-1 rounded-full inline-block mb-2">
            पारिवारिक पारदर्शिता व सुरक्षा
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">
            {t.caregiver.title}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] mt-1">
            {t.caregiver.subtitle}
          </p>
        </div>
        <VoiceReader
          textToRead={`${t.caregiver.title}. ${t.caregiver.subtitle}. ${t.caregiver.consentNotice}`}
          className="bg-[#F6F6F6] text-[#111111]"
        />
      </div>

      {/* TOP CONSENT TOGGLE BENTO CARD (Always shows 'Stop Sharing' button) */}
      <div className="bg-white rounded-bento-card p-6 sm:p-8 border-2 border-[#E3E3E3] shadow-bento space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555555]">
              सहमति स्थिति (Sharing Status)
            </span>
            <div className="flex items-center gap-3">
              {status.consentGranted ? (
                <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#1E7B34] px-4 py-2 rounded-full font-black text-lg border border-green-300">
                  <CheckCircle2 className="w-5 h-5 text-[#1E7B34]" />
                  <span>सहमति चालू (Sharing Active)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#F6F6F6] text-[#555555] px-4 py-2 rounded-full font-black text-lg border border-[#E3E3E3]">
                  <XCircle className="w-5 h-5 text-[#555555]" />
                  <span>सहमति बंद (Sharing Inactive)</span>
                </div>
              )}
            </div>
            <p className="text-xs text-[#555555] pt-1">
              {status.consentGranted
                ? 'आपके बच्चे या परिवार के सदस्य केवल आपके सुरक्षा अभ्यास का स्कोर देख सकते हैं।'
                : 'कोई भी बाहरी व्यक्ति आपकी प्रगति नहीं देख सकता। गुप्त निगरानी पूर्णतः प्रतिबंधित है।'}
            </p>
          </div>

          {/* Action Buttons: Grant or 'Stop Sharing' (ALWAYS visible per prompt) */}
          <div className="flex items-center gap-3">
            {!status.consentGranted ? (
              <button
                onClick={() => handleToggleConsent(true)}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#12391E] hover:bg-[#1B522C] text-white px-6 py-3.5 rounded-full font-bold text-base min-h-[52px] shadow-sm transition-transform active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>सहमति दें (Start Sharing)</span>
              </button>
            ) : null}

            {/* Always visible 'Stop Sharing' button */}
            <button
              onClick={() => handleToggleConsent(false)}
              disabled={loading || !status.consentGranted}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-base min-h-[52px] border transition-all ${
                status.consentGranted
                  ? 'bg-[#FFEBEE] hover:bg-red-100 text-[#C62828] border-red-300 shadow-sm cursor-pointer active:scale-95'
                  : 'bg-[#F6F6F6] text-[#555555]/50 border-[#E3E3E3] cursor-not-allowed'
              }`}
              title={status.consentGranted ? 'Stop Sharing Immediately' : 'Sharing is already stopped'}
            >
              <XCircle className="w-5 h-5" />
              <span>शेयरिंग तुरंत बंद करें (Stop Sharing)</span>
            </button>
          </div>
        </div>

        {/* Pairing Code Chip */}
        <div className="bg-[#F6F6F6] rounded-2xl p-4 sm:p-5 border border-[#E3E3E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#555555] uppercase block">
              आपका पारिवारिक पेयरिंग कोड (Pairing Code)
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-[#12391E] tracking-wider">
              {status.pairingCode}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#EDEDED] text-[#111111] px-5 py-2.5 rounded-full font-bold text-sm border border-[#E3E3E3] min-h-[44px]"
          >
            {copiedCode ? <Check className="w-4 h-4 text-[#1E7B34]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'कोड कॉपी हो गया!' : 'कोड कॉपी करें'}</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: What is Shared vs What is NEVER Shared */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What family CAN see */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-3">
          <div className="flex items-center gap-2 text-[#12391E] font-bold text-lg">
            <Eye className="w-5 h-5" />
            <h3>{t.caregiver.sharedInfoTitle}</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#111111]">
            {t.caregiver.sharedInfoList.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#1E7B34] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What is NEVER shared */}
        <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-3">
          <div className="flex items-center gap-2 text-[#C62828] font-bold text-lg">
            <EyeOff className="w-5 h-5" />
            <h3>{t.caregiver.neverSharedTitle}</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#111111]">
            {t.caregiver.neverSharedList.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#C62828] font-bold">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Caregiver Access Test Preview */}
      <div className="bg-white rounded-bento-card p-6 border border-[#E3E3E3] shadow-bento space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-[#111111]">केयरगिवर व्यू टेस्ट करें (Preview View)</h3>
            <p className="text-xs text-[#555555]">सहमति चालू होने पर डेटा दिखेगा, सहमति बंद होने पर 403 Forbidden ब्लॉक होगा।</p>
          </div>
          <button
            onClick={handleTestCaregiverAccess}
            className="inline-flex items-center justify-center gap-2 bg-[#F6F6F6] hover:bg-[#E3E3E3] text-[#12391E] px-5 py-2.5 rounded-full font-bold text-sm border border-[#E3E3E3] min-h-[44px]"
          >
            <span>एक्सेस टेस्ट करें</span>
          </button>
        </div>

        {caregiverError && (
          <div className="bg-[#FFEBEE] border border-red-300 p-4 rounded-xl text-sm font-bold text-[#C62828]">
            ⛔ 403 Forbidden: {caregiverError} (सहमति न होने के कारण एक्सेस ब्लॉक किया गया है)
          </div>
        )}

        {caregiverData && (
          <div className="bg-[#E8F5E9] border border-green-300 p-4 rounded-xl text-sm space-y-2">
            <p className="font-bold text-[#1E7B34]">✓ अधिकृत डेटा (सहमति सक्रिय):</p>
            <p className="text-xs text-[#111111]">
              वरिष्ठ उपयोगकर्ता: {caregiverData.seniorName} | पूर्ण पाठ: {caregiverData.completedModules?.length} | सिमुलेशन स्कोर: {caregiverData.simulatorScore}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
