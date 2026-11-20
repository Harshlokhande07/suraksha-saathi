import { AnalysisResult, analyzeMessageOrUrl } from './ruleEngine.js';

export async function analyzeWithAI(input: string): Promise<AnalysisResult> {
  const fallbackResult = analyzeMessageOrUrl(input);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    // Return rule engine analysis directly
    return fallbackResult;
  }

  try {
    const prompt = `You are a cybersecurity expert analyzing potential fraud targeting senior citizens in India.
Analyze the following text or URL:
"${input}"

Evaluate:
1. Is it a known scam (KYC, Electricity cutoff, Digital Arrest, Lottery, Fake Bank, Phishing, Fake UPI collect request, Fake job/loan)?
2. What are the clear red flags?
3. Recommended steps for a senior citizen.

Return valid JSON with keys:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "confidenceScore": number (never 100),
  "riskSummary": string,
  "riskSummaryHi": string,
  "riskSummaryMr": string,
  "warningSigns": string[],
  "recommendedActions": string[],
  "detectedCategories": string[]
}
IMPORTANT: Never output 100% safe or 100% fraud. An unverified URL must NEVER be marked LOW risk.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API call failed, falling back to rule engine.');
      return fallbackResult;
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return fallbackResult;
    }

    const parsed = JSON.parse(candidateText);
    
    // Enforce safety rules:
    let finalRisk: 'LOW' | 'MEDIUM' | 'HIGH' = parsed.riskLevel || fallbackResult.riskLevel;
    if (fallbackResult.isUnverifiedUrl && finalRisk === 'LOW') {
      finalRisk = 'MEDIUM'; // Rule: Unverified URL cannot be low risk / completely safe
    }

    let finalConfidence = typeof parsed.confidenceScore === 'number' ? Math.min(95, Math.max(30, parsed.confidenceScore)) : fallbackResult.confidenceScore;
    if (finalConfidence >= 100) finalConfidence = 95;

    return {
      riskLevel: finalRisk,
      confidenceScore: finalConfidence,
      riskSummary: parsed.riskSummary || fallbackResult.riskSummary,
      riskSummaryHi: parsed.riskSummaryHi || fallbackResult.riskSummaryHi,
      riskSummaryMr: parsed.riskSummaryMr || fallbackResult.riskSummaryMr,
      warningSigns: Array.isArray(parsed.warningSigns) && parsed.warningSigns.length > 0 ? parsed.warningSigns : fallbackResult.warningSigns,
      recommendedActions: Array.isArray(parsed.recommendedActions) && parsed.recommendedActions.length > 0 ? parsed.recommendedActions : fallbackResult.recommendedActions,
      officialHelpline: '1930 (National Cyber Crime Helpline)',
      uncertaintyDisclaimer: fallbackResult.uncertaintyDisclaimer,
      detectedCategories: Array.isArray(parsed.detectedCategories) && parsed.detectedCategories.length > 0 ? parsed.detectedCategories : fallbackResult.detectedCategories,
      isUnverifiedUrl: fallbackResult.isUnverifiedUrl
    };
  } catch (err) {
    console.warn('AI analysis error, reverting to local rule engine:', err);
    return fallbackResult;
  }
}
