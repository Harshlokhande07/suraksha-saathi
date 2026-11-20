import { Router, Request, Response } from 'express';

export const emergencyRouter = Router();

export interface BankContact {
  bankName: string;
  nameHi: string;
  nameMr: string;
  tollFree: string;
  alternateNumber?: string;
  blockCardSms?: string;
  website: string;
  cyberPortalUrl: string;
}

export const OFFICIAL_EMERGENCY_DATA = {
  nationalHelpline: {
    number: '1930',
    title: 'National Cyber Crime Reporting Helpline',
    titleHi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन',
    titleMr: 'राष्ट्रीय सायबर गुन्हा नोंदणी हेल्पलाइन',
    authority: 'Ministry of Home Affairs (MHA), Government of India',
    authorityHi: 'गृह मंत्रालय, भारत सरकार',
    actionNote: 'Call immediately within the "Golden Hour" (first 2-3 hours) after fraud to freeze stolen funds in bank accounts.',
    actionNoteHi: 'धोखाधड़ी के तुरंत बाद "गोल्डन ऑवर" (पहले 2-3 घंटों) में कॉल करें ताकि अपराधी के बैंक खाते में पैसा फ्रीज कराया जा सके।',
    actionNoteMr: 'फसवणूक झाल्यानंतर लगेच "गोल्डन अवर" (पहिल्या २-३ तासांत) मध्ये कॉल करा जेणेकरून खात्यातील रक्कम त्वरित गोठवता येईल.'
  },
  officialPortals: [
    {
      name: 'National Cyber Crime Reporting Portal',
      url: 'https://cybercrime.gov.in/',
      description: 'Official Government of India portal to register online cyber complaints and track FIR status.',
      badge: 'Official GOI Portal'
    },
    {
      name: 'Sanchar Saathi (Chakshu Facility)',
      url: 'https://sancharsaathi.gov.in/',
      description: 'Department of Telecommunications initiative to report fraudulent SMS, fake calls, and unauthorized mobile connections.',
      badge: 'DoT, Govt. of India'
    },
    {
      name: 'RBI Kehta Hai - Customer Awareness',
      url: 'https://rbikehtahai.rbi.org.in/',
      description: 'Reserve Bank of India official guidelines on financial security, OTP protection, and limited liability framework.',
      badge: 'Reserve Bank of India'
    }
  ],
  banks: [
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
      cyberPortalUrl: 'https://www.hdfcbank.com/personal/useful-links/security'
    },
    {
      bankName: 'ICICI Bank',
      nameHi: 'आईसीआईसीआई बैंक',
      nameMr: 'आयसीआयसीआय बँक',
      tollFree: '1800 1080',
      alternateNumber: '1800 102 4242',
      blockCardSms: 'SMS BLOCK <last 4 digits> to 5676766',
      website: 'https://www.icicibank.com/',
      cyberPortalUrl: 'https://www.icicibank.com/safe-banking'
    },
    {
      bankName: 'Punjab National Bank (PNB)',
      nameHi: 'पंजाब नेशनल बैंक (PNB)',
      nameMr: 'पंजाब नॅशनल बँक (PNB)',
      tollFree: '1800 180 2222',
      alternateNumber: '1800 103 2222',
      blockCardSms: 'SMS HOTLIST <CardNo> to 5607040',
      website: 'https://www.pnbindia.in/',
      cyberPortalUrl: 'https://www.pnbindia.in/security-tips.html'
    },
    {
      bankName: 'Bank of Baroda',
      nameHi: 'बैंक ऑफ बड़ौदा',
      nameMr: 'बँक ऑफ बडोदा',
      tollFree: '1800 5700',
      alternateNumber: '1800 5000',
      blockCardSms: 'SMS BLOCK <last 4 digits> to 8422009988',
      website: 'https://www.bankofbaroda.in/',
      cyberPortalUrl: 'https://www.bankofbaroda.in/fraud-prevention'
    },
    {
      bankName: 'Axis Bank',
      nameHi: 'एक्सिस बैंक',
      nameMr: 'ॲक्सिस बँक',
      tollFree: '1860 419 5555',
      alternateNumber: '1860 500 5555',
      blockCardSms: 'SMS BLOCK <last 4 digits> to 5676782',
      website: 'https://www.axisbank.com/',
      cyberPortalUrl: 'https://www.axisbank.com/support/fraud-reporting'
    }
  ]
};

emergencyRouter.get('/', (_req: Request, res: Response) => {
  return res.json(OFFICIAL_EMERGENCY_DATA);
});
