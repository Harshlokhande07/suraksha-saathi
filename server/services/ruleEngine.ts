export interface AnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number; // 0 - 100
  riskSummary: string;
  riskSummaryHi: string;
  riskSummaryMr: string;
  warningSigns: string[];
  recommendedActions: string[];
  officialHelpline: string;
  uncertaintyDisclaimer: string;
  detectedCategories: string[];
  isUnverifiedUrl: boolean;
}

export function analyzeMessageOrUrl(input: string): AnalysisResult {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();

  const warningSigns: string[] = [];
  const recommendedActions: string[] = [];
  const detectedCategories: string[] = [];
  let score = 0; // Higher = more dangerous
  let isUnverifiedUrl = false;

  // 1. Check for URL patterns
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(?:com|org|net|in|cc|xyz|top|site|online|live|info|club|buzz|vip|tk|ml|ga|cf|gq|work|rest|app)[^\s]*)/gi;
  const urlsFound = cleanInput.match(urlRegex) || [];

  if (urlsFound.length > 0) {
    isUnverifiedUrl = true;
    for (const rawUrl of urlsFound) {
      const u = rawUrl.toLowerCase();

      // Suspicious TLDs or URL shorteners
      if (/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|goo\.gl|ow\.ly)/.test(u)) {
        score += 45;
        warningSigns.push(`URL Shortener detected (${rawUrl}): Hides the true destination website.`);
        detectedCategories.push('URL Shortener');
      }

      // Lookalike banking / government / utility domains
      if (/(sbi|hdfc|icici|pnb|axis|bob|paytm|phonepe|gpay|yono|aadhaar|pan|electricity|bsnl|jio|airtel)/.test(u)) {
        if (!/(sbi\.co\.in|onlinesbi\.sbi|hdfcbank\.com|icicibank\.com|pnbindia\.in|axisbank\.com|bankofbaroda\.in|paytm\.com|phonepe\.com|uidai\.gov\.in|incometax\.gov\.in|cybercrime\.gov\.in)/.test(u)) {
          score += 65;
          warningSigns.push(`Suspicious brand impersonation in link (${rawUrl}): Does not belong to official verified domain.`);
          detectedCategories.push('Brand Impersonation / Phishing');
        }
      }

      // Suspicious extensions
      if (/(\.apk|\.exe|\.scr|\.bat|\.vbs|\.zip)$/.test(u)) {
        score += 80;
        warningSigns.push(`Direct executable file or app download (${rawUrl}): Extremely high risk of malware / spyware.`);
        detectedCategories.push('Malicious APK / Download');
      }

      // Unofficial top-level domains often used by fraudsters
      if (/(\.xyz|\.top|\.cc|\.live|\.club|\.rest|\.buzz|\.tk|\.ga|\.cf|\.gq|\.work)/.test(u)) {
        score += 40;
        warningSigns.push(`Unusual or high-risk domain extension (${rawUrl}).`);
        detectedCategories.push('Suspicious Domain');
      }
    }
  }

  // 2. Electricity bill cutoff scam: Threatens disconnection or urgency to call officer
  if (/(?:(?:electricity|power|bijli|light\s*bill).*(?:cut\s*off|disconnected|disconnect|suspend|line\s*cut|9:30|8:30|officer|tonight))|(?:(?:cut\s*off|disconnect\s*tonight|disconnected\s*tonight).*(?:electricity|power|bijli|bill))/i.test(lower)) {
    score += 55;
    warningSigns.push('Urgent electricity disconnection threat (Common power bill scam).');
    detectedCategories.push('Utility / Electricity Scam');
  }

  // 3. KYC / PAN / SIM block threats
  if (/(kyc|sim block|sim deactivated|pan card link|pan link|account block|suspended within|account frozen|deactivation)/i.test(lower)) {
    score += 55;
    warningSigns.push('Urgent threat to block account, SIM, or PAN card.');
    detectedCategories.push('KYC Expiry Fraud');
  }

  // 4. OTP / PIN request
  if (/(otp|one time password|share otp|tell pin|enter upi pin|upi pin daalein|receive money.*pin|pin required to receive)/i.test(lower)) {
    score += 75;
    warningSigns.push('Demands or mentions OTP or UPI PIN. Remember: UPI PIN is NEVER required to receive money.');
    detectedCategories.push('Credential / OTP Theft');
  }

  // 5. Lottery / Prize / KBC
  if (/(lottery|kbc|25 lakh|winner|lucky draw|congratulations.*won|reward points|cashback pending|won.*prize)/i.test(lower)) {
    score += 65;
    warningSigns.push('Unrealistic prize, lottery, or lottery processing fee request.');
    detectedCategories.push('Lottery / Reward Scam');
  }

  // 6. Fake Police / Digital Arrest / Customs / CBI
  if (/(digital arrest|cbi|police|customs officer|narcotics|parcel seized|illegal parcel|dhl parcel|warrant issued)/i.test(lower)) {
    score += 75;
    warningSigns.push('Intimidation using police, CBI, or courier parcel threat ("Digital Arrest" scam).');
    detectedCategories.push('Digital Arrest / Impersonation');
  }

  // 7. Remote screen share software (AnyDesk, TeamViewer, RustDesk)
  if (/(anydesk|teamviewer|rustdesk|quicksupport|screen share)/i.test(lower)) {
    score += 70;
    warningSigns.push('Requests installation of screen-sharing or remote desktop software.');
    detectedCategories.push('Remote Access Trojan');
  }

  // 8. Urgency words
  if (/(immediately|urgent|within 24 hours|within 1 hour|hurry|final warning|last notice)/i.test(lower)) {
    score += 20;
    warningSigns.push('High artificial urgency designed to stop you from consulting family or your bank.');
  }

  // Determine Risk Level
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  let confidenceScore = 65;

  if (score >= 50) {
    riskLevel = 'HIGH';
    confidenceScore = Math.min(94, 60 + score / 3);
    recommendedActions.push('DO NOT click any link or download any attachment.');
    recommendedActions.push('DO NOT share any OTP, UPI PIN, or bank card details with anyone.');
    recommendedActions.push('DO NOT call the number given in the message. Call your official bank branch or dial 1930.');
    recommendedActions.push('Immediately block and report this number on WhatsApp / SMS.');
  } else if (score >= 20 || (isUnverifiedUrl && score > 0)) {
    riskLevel = 'MEDIUM';
    confidenceScore = Math.min(80, 50 + score);
    recommendedActions.push('Treat this message with caution. Verify directly through official channels before acting.');
    recommendedActions.push('Never forward suspicious messages or click unverified links.');
    recommendedActions.push('Remember that banks and genuine organizations never demand instant action under threat.');
  } else {
    // Note: Rule 8 - never 100% safe. If it contains a URL, it cannot be deemed completely benign.
    if (isUnverifiedUrl) {
      riskLevel = 'MEDIUM';
      confidenceScore = 60;
      warningSigns.push('Unverified external URL detected. The domain does not have known threat signatures, but caution is mandatory.');
      recommendedActions.push('Do not enter sensitive passwords, OTPs, or financial information on unverified sites.');
      recommendedActions.push('Check the address bar carefully to ensure it is the exact official domain.');
    } else {
      riskLevel = 'LOW';
      confidenceScore = 75;
      warningSigns.push('No obvious high-threat keywords or fraud patterns detected in this text.');
      recommendedActions.push('Always practice digital hygiene: never share passwords or OTPs under any circumstances.');
      recommendedActions.push('If this is unexpected or from an unknown sender, verify their identity independently.');
    }
  }

  // Multilingual summaries
  let riskSummary = '';
  let riskSummaryHi = '';
  let riskSummaryMr = '';

  if (riskLevel === 'HIGH') {
    riskSummary = 'High risk of cyber fraud detected! Do not click links, share OTPs, or transfer money.';
    riskSummaryHi = 'सावधान! इस संदेश में गंभीर धोखाधड़ी के स्पष्ट संकेत मिले हैं। किसी लिंक पर क्लिक न करें और कोई OTP या पैसे न भेजें।';
    riskSummaryMr = 'सावधान! या संदेशात सायबर फसवणुकीचे गंभीर संकेत आढळले आहेत. कोणत्याही लिंकवर क्लिक करू नका आणि OTP किंवा पैसे पाठवू नका.';
  } else if (riskLevel === 'MEDIUM') {
    riskSummary = 'Potential risk detected. Contains suspicious phrasing or unverified link. Caution advised.';
    riskSummaryHi = 'संभाव्य जोखिम! इस संदेश में संदेहास्पद भाषा या असत्यापित लिंक है। कृपया जल्दबाजी में कोई कदम न उठाएं।';
    riskSummaryMr = 'संभाव्य धोका! या संदेशात संशयास्पद शब्द किंवा पडताळणी न झालेली लिंक आहे. कृपया सतर्क राहा.';
  } else {
    riskSummary = 'Low immediate risk detected. However, always stay alert and never share confidential banking data.';
    riskSummaryHi = 'कम जोखिम प्रतीत होता है। फिर भी हमेशा सतर्क रहें और बैंक विवरण या OTP कभी किसी से साझा न करें।';
    riskSummaryMr = 'कमी धोका आढळला आहे. तरीही नेहमी सतर्क राहा आणि बँक तपशील किंवा OTP कोणालाही देऊ नका.';
  }

  // Mandated uncertainty disclaimer (Rule 8)
  const uncertaintyDisclaimer = 'अस्वीकरण / Disclaimer: This automated security assessment is an advisory tool based on pattern analysis and known threat heuristics. It is neither 100% infallible nor a legal guarantee. Always cross-verify directly with your official bank or dial the National Cyber Crime Helpline 1930 before taking any financial action.';

  return {
    riskLevel,
    confidenceScore: Math.round(confidenceScore),
    riskSummary,
    riskSummaryHi,
    riskSummaryMr,
    warningSigns,
    recommendedActions,
    officialHelpline: '1930 (National Cyber Crime Helpline)',
    uncertaintyDisclaimer,
    detectedCategories: detectedCategories.length > 0 ? detectedCategories : ['General Communication Analysis'],
    isUnverifiedUrl,
  };
}
