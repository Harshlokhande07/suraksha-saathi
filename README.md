# Suraksha Saathi — Your Digital Safety Companion 🛡️
> वरिष्ठ नागरिकों को ऑनलाइन वित्तीय धोखाधड़ी समझने और रोकने में मदद करने वाला डिजिटल साथी।

---

## 🌟 Overview & Mission
**Suraksha Saathi (सुरक्षा साथी)** is a dedicated, senior-friendly full-stack digital safety companion designed to protect senior citizens in India against cyber fraud, financial scams, phishing attacks, and psychological intimidation ("Digital Arrest").

Built with a modern **Bento-Grid Dashboard design** inspired by premier accessible fintech experiences:
- **Canvas:** Clean `#EDEDED` background with `#F6F6F6` rounded-bento containers (28px radius).
- **Cards:** Pure `#FFFFFF` rounded-bento cards (24px radius) with soft micro-shadows.
- **Hero Highlight:** Vibrant lime green (`#B6F36B`) hero emergency card.
- **Primary Accent:** Dark forest green (`#12391E`) for high-contrast, accessible pill buttons.
- **Accessibility:** Minimum 18px body font, font-size scaler (A / A+ / A++), Web Speech API voice guidance, and high-contrast toggle.
- **Strict Privacy Guarantee:** Never collects bank account numbers, passwords, OTPs, or UPI PINs.

---

## 🚀 Key Features

1. **Learn & Explore (सुरक्षा ट्यूटोरियल):**
   - 6 comprehensive fraud tutorials: KYC expiry & SIM deactivation, OTP & bank manager impersonation, Lottery/KBC scams, Digital Arrest/CBI threats, UPI QR code scams, and Electricity cutoff threats.
   - Trilingual support: **Hindi (हिंदी)**, **Marathi (मराठी)**, and **English**.
   - Built-in Web Speech API voice guidance (`speechSynthesis`) with text fallback.
   - Interactive mini quizzes with instant positive reinforcement.

2. **Is This Safe? (स्कैम चेकर):**
   - Paste suspicious SMS, WhatsApp messages, or website URLs.
   - Dual-layer detection: Heuristic Pattern Engine + optional Google Gemini 1.5 Flash AI analysis.
   - Multi-dimensional risk rating (**LOW / MEDIUM / HIGH**) with confidence score.
   - Separate cards: "Why we think so", "Warning signs", and "What to do now".
   - Mandated legal disclaimer: *"This is guidance, not a guarantee."* (Rule 8: Unverified URLs are never marked low risk).

3. **Banking Practice (काल्पनिक UPI सिम्युलेटर):**
   - 100% fictional UPI simulator with simulated scenarios (OLX QR Collect Request, KBC Fee Request, Genuine Electricity Bill, Scratch Card Cashback).
   - Prominent **"PRACTICE MODE - No real money"** banner.
   - Reinforces the Golden Rule: *UPI PIN is ONLY entered to SEND money, NEVER to receive money!*

4. **Safe Browsing (वेबसाइट पहचान):**
   - Side-by-side comparison of genuine portals (e.g. `onlinesbi.sbi`) vs fake lookalike phishing domains (e.g. `sbi-netbanking-verify.xyz`).
   - Padlock icon myth debunking and URL anatomy breakdown.

5. **Emergency Help & Directory (1930 सहायता):**
   - Tap-to-call for National Cyber Crime Helpline **1930** (MHA, Govt. of India).
   - Direct link to official **cybercrime.gov.in** portal.
   - Toll-free grievance helpline and card-blocking SMS directory for major Indian banks (SBI, HDFC, ICICI, PNB, Bank of Baroda, Axis Bank).
   - "Golden Hour" 3-step action guide to freeze stolen funds within 2-3 hours of fraud.

6. **Caregiver Mode (परिवार मोड):**
   - Built strictly on explicit senior user consent. **Silent monitoring is strictly prohibited.**
   - Toggle consent with instant revocation: "Stop sharing" button always visible.
   - Only completed safety lessons and simulator practice scores are shared; zero credentials or private messages are ever stored or transmitted.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas-Confetti.
- **Backend:** Node.js, Express, TypeScript (`tsx`), Multer, CORS, Dotenv.
- **AI/Heuristics:** Dual engine (Rule-based Regex Heuristic Engine + Gemini API integration).

---
- **Frontend URL:** [http://localhost:3000](http://localhost:3000)
- **Backend API URL:** [http://localhost:5005](http://localhost:5005)


---

## 🛡️ License
ISC License © 2026 Suraksha Saathi — Senior Citizen Digital Empowerment Initiative.
