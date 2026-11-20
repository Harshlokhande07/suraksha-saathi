export const en = {
  appName: 'Suraksha Saathi',
  tagline: 'Your Digital Safety Companion for Senior Citizens',
  motto: 'Learn, Identify, and Stay Safe — Banks Never Ask for OTP or PIN!',
  nav: {
    home: 'Home',
    learn: 'Learn & Explore',
    checker: 'Is This Safe?',
    simulator: 'Banking Practice (UPI)',
    browsing: 'Safe Browsing',
    emergency: 'Emergency Help (1930)',
    caregiver: 'Family / Caregiver Mode'
  },
  accessibility: {
    title: 'Accessibility Controls',
    textSize: 'Text Size:',
    normal: 'Normal (18px)',
    large: 'Large (20px)',
    xlarge: 'Extra Large (24px)',
    contrast: 'Contrast Mode:',
    normalContrast: 'Standard Contrast',
    highContrast: 'High Contrast (Max Readability)',
    language: 'Select Language:',
    voiceAssist: 'Voice Guidance (Audio Assistant)',
    playAudio: 'Listen with Voice',
    stopAudio: 'Stop Voice'
  },
  disclaimer: {
    banner: 'SAFETY NOTICE: "Suraksha Saathi" is strictly educational. We NEVER ask for, collect, or store bank account numbers, passwords, OTPs, or UPI PINs. Never share your credentials with anyone!',
    badge: 'GOLDEN RULE: You NEVER need to enter a UPI PIN to receive money!'
  },
  home: {
    welcome: 'Welcome! Your Digital Safety Companion.',
    subtitle: 'Simple language guidance, interactive simulations, and emergency tools designed especially for senior citizens.',
    emergencyCallTitle: 'Urgent Cyber Fraud Helpline:',
    emergencyCallSubtitle: 'If you have been defrauded, immediately call 1930 (Toll-Free).',
    cards: [
      {
        id: 'learn',
        title: 'Learn Common Scams',
        desc: 'Master real-life tutorials on KYC expiry, electricity cuts, lottery fraud, and fake police calls.',
        btnText: 'Start Learning'
      },
      {
        id: 'checker',
        title: 'Is This Safe? (Scam Checker)',
        desc: 'Received a strange SMS, WhatsApp message, or link? Paste it here to verify its safety.',
        btnText: 'Check Message'
      },
      {
        id: 'simulator',
        title: 'UPI Banking Simulator',
        desc: 'Practice spotting fake payment collect requests in a 100% fictional UPI simulator with fake data.',
        btnText: 'Start Practice'
      },
      {
        id: 'browsing',
        title: 'Spot Fake Websites',
        desc: 'Inspect side-by-side comparisons of genuine bank sites versus fake phishing clones.',
        btnText: 'Explore Websites'
      },
      {
        id: 'emergency',
        title: 'Emergency Help & Helplines',
        desc: '1930 National Helpline, cybercrime.gov.in portal, and major bank emergency numbers.',
        btnText: 'Get Help'
      },
      {
        id: 'caregiver',
        title: 'Family & Caregiver Sharing',
        desc: 'Share your safety learning milestones with trusted family members solely with your explicit consent.',
        btnText: 'Caregiver Mode'
      }
    ]
  },
  checker: {
    title: 'Is This Message or Link Safe?',
    subtitle: 'Paste any suspicious SMS, WhatsApp message, or website URL to receive instant security analysis.',
    inputLabel: 'Paste Message or Link Below:',
    inputPlaceholder: 'e.g. "Dear customer, your electricity bill is unpaid. Power cut tonight at 9:30 PM..." or URL',
    analyzeBtn: 'Analyze Security Risk',
    analyzing: 'Analyzing threat patterns...',
    orUpload: 'Or upload screenshot for analysis:',
    uploadBtn: 'Choose Screenshot Image',
    sampleTitle: 'Or click a sample scenario to test:',
    sampleElectricity: 'Electricity Cutoff Threat',
    sampleKYC: 'SBI YONO KYC Suspended Link',
    sampleLottery: '25 Lakh KBC Lottery',
    sampleNormal: 'Normal Family Greeting',
    sampleAmbiguous: 'Unverified Link (bit.ly/bank-offer)',
    resultsTitle: 'Safety Assessment Result',
    riskLevels: {
      LOW: 'Low Risk',
      MEDIUM: 'Potential / Medium Risk',
      HIGH: 'High Risk (Severe Fraud Signs)'
    },
    warningSignsHeading: 'Detected Warning Signs (Red Flags):',
    recommendedHeading: 'Recommended Actions for You:',
    helplineHeading: 'Need Help?',
    disclaimerHeading: 'Crucial Legal Disclaimer:'
  },
  simulator: {
    title: 'Fictional UPI Banking Practice Simulator',
    subtitle: 'This is a 100% simulated, fake environment. No real bank accounts or transactions take place.',
    warningBanner: 'GOLDEN RULE: UPI PIN is ONLY needed to SEND money. You NEVER enter a PIN to RECEIVE cashback, refunds, or money!',
    scoreText: 'Your Safety Practice Score:',
    instruction: 'Review the incoming payment screen below and decide whether to approve or decline:',
    incomingRequest: 'Incoming UPI Request',
    amountLabel: 'Amount:',
    fromLabel: 'Requester / Sender:',
    vpaLabel: 'UPI ID:',
    messageLabel: 'Remarks:',
    payBtn: 'Approve & Pay (Send Money)',
    declineBtn: 'Decline / Reject Request',
    nextScenario: 'Next Practice Scenario'
  },
  browsing: {
    title: 'Safe Browsing: Spot Phishing Websites',
    subtitle: 'Learn how cyber fraudsters create lookalike web pages pretending to be banks or utility companies.',
    addressBar: 'Browser Address Bar (URL)',
    officialBadge: 'Verified Genuine Website',
    phishingBadge: 'Fake / Phishing Website',
    compareTitle: 'Website Inspection & Clues:',
    tipsTitle: '5 Golden Rules for Safe Web Browsing:',
    tips: [
      'Examine the domain spelling closely: Look for hyphens or odd extensions like sbi-kyc.cc instead of onlinesbi.sbi.',
      'Do not rely solely on the padlock icon: Free SSL certificates allow even scam websites to show a lock.',
      'Never open bank login pages from SMS or email links: Always type the address yourself or use official bank apps.',
      'Beware of countdown timers: "Account will be blocked in 10 minutes" is designed to create panic and stop rational thought.',
      'Never enter your Aadhaar, PAN, card numbers, or passwords on unverified third-party websites.'
    ]
  },
  emergency: {
    title: 'Emergency Help & Official Contacts',
    subtitle: 'If you have been targeted or money has been deducted, act immediately without fear or shame.',
    goldenHourTitle: 'Why the "Golden Hour" Matters:',
    goldenHourText: 'The first 2 to 3 hours after a fraud are called the Golden Hour. Calling 1930 immediately gives police and banks the best chance to freeze stolen funds before the criminal withdraws them.',
    call1930Btn: 'Call 1930 (Tap to Call)',
    nationalPortalBtn: 'Open cybercrime.gov.in Portal',
    banksTitle: 'Official Bank Grievance & Card Blocking Helplines'
  },
  caregiver: {
    title: 'Family & Caregiver Mode',
    subtitle: 'Built on trust and explicit user consent. Silent monitoring is strictly forbidden.',
    consentNotice: 'Privacy Guarantee: Silent monitoring is prohibited. No progress is shared with anyone unless you explicitly turn on consent. You can withdraw your consent at any time with a single click.',
    consentStatus: 'Current Consent Status:',
    granted: 'Consent Active (Sharing Authorized)',
    revoked: 'Consent Inactive (All Sharing Blocked)',
    grantBtn: 'Grant Consent (Share Progress)',
    revokeBtn: 'Revoke Consent (Stop Sharing Immediately)',
    pairingCodeLabel: 'Your Family Pairing Code:',
    sharedInfoTitle: 'What Your Trusted Family Can See:',
    sharedInfoList: [
      'Safety tutorials completed by you.',
      'Your practice score in the UPI simulator.',
      'Last active date on Suraksha Saathi.'
    ],
    neverSharedTitle: 'What is NEVER shared or collected:',
    neverSharedList: [
      'No bank account details or financial balance.',
      'No passwords, OTPs, or UPI PINs (we never collect or store them).',
      'No personal messages or screenshots analyzed.'
    ]
  }
};
