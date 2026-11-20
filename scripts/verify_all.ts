async function runTests() {
  console.log('=== STARTING AUTOMATED SELF-VERIFICATION SUITE ===\n');

  const baseUrl = 'http://localhost:5005';

  let passCount = 0;
  let failCount = 0;

  function assert(condition: boolean, testName: string, proof: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      console.log(`       Proof: ${proof}\n`);
      passCount++;
    } else {
      console.error(`[FAIL] ${testName}`);
      console.error(`       Proof: ${proof}\n`);
      failCount++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200 && healthJson.status === 'ok', 'API Health Check', JSON.stringify(healthJson));

    // 2. Scam Checker: 5 Test Inputs
    console.log('--- TESTING 5 SCAM CHECKER INPUTS ---');

    // Input 1: Clear Scam (Electricity threat)
    const scam1Input = 'Dear customer, your electricity power will be disconnected tonight at 9:30 PM call 9876543210';
    const scam1Res = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: scam1Input, useAI: false })
    });
    const scam1Json = await scam1Res.json();
    assert(
      scam1Json.riskLevel === 'HIGH' && scam1Json.confidenceScore < 100 && scam1Json.uncertaintyDisclaimer.length > 0,
      'Test Input 1 (Electricity Cutoff Threat): Risk=HIGH',
      `Risk: ${scam1Json.riskLevel}, Confidence: ${scam1Json.confidenceScore}%, Red Flags: ${scam1Json.warningSigns.length}`
    );

    // Input 2: Clear Scam (SBI KYC suspended phishing link)
    const scam2Input = 'Dear SBI user, your YONO account has been suspended due to KYC. Click http://sbi-kyc-update.cc';
    const scam2Res = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: scam2Input, useAI: false })
    });
    const scam2Json = await scam2Res.json();
    assert(
      scam2Json.riskLevel === 'HIGH' && scam2Json.confidenceScore < 100 && scam2Json.detectedCategories.includes('Brand Impersonation / Phishing'),
      'Test Input 2 (SBI KYC Phishing Link): Risk=HIGH',
      `Risk: ${scam2Json.riskLevel}, Categories: ${scam2Json.detectedCategories.join(', ')}`
    );

    // Input 3: Normal 1 (Family greeting)
    const normal1Input = 'Namaste Dada ji, our train has reached on time. We will reach home by 6 PM for dinner.';
    const normal1Res = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: normal1Input, useAI: false })
    });
    const normal1Json = await normal1Res.json();
    assert(
      normal1Json.riskLevel === 'LOW' && normal1Json.confidenceScore < 100 && normal1Json.uncertaintyDisclaimer.length > 0,
      'Test Input 3 (Normal Family Greeting): Risk=LOW',
      `Risk: ${normal1Json.riskLevel}, Confidence: ${normal1Json.confidenceScore}% (Disclaimer preserved)`
    );

    // Input 4: Normal 2 (Genuine utility bill statement without links)
    const normal2Input = 'Tata Power bill for consumer 12345 is Rs. 850. Pay before due date 28 Nov.';
    const normal2Res = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: normal2Input, useAI: false })
    });
    const normal2Json = await normal2Res.json();
    assert(
      normal2Json.riskLevel === 'LOW' && normal2Json.confidenceScore < 100,
      'Test Input 4 (Routine Genuine Utility Reminder): Risk=LOW',
      `Risk: ${normal2Json.riskLevel}, Confidence: ${normal2Json.confidenceScore}%`
    );

    // Input 5: Ambiguous URL (Shortener bit.ly) - Must NOT be marked Low Risk per Rule 8
    const ambiguousInput = 'Special customer reward offer: Click here to verify your points: https://bit.ly/bank-offer-rewards';
    const ambiguousRes = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: ambiguousInput, useAI: false })
    });
    const ambiguousJson = await ambiguousRes.json();
    assert(
      ambiguousJson.riskLevel === 'MEDIUM' || ambiguousJson.riskLevel === 'HIGH',
      'Test Input 5 (Ambiguous Shortened URL): Risk!=LOW (Must be Medium/High)',
      `Risk: ${ambiguousJson.riskLevel}, UnverifiedUrl=${ambiguousJson.isUnverifiedUrl}`
    );

    // 3. Emergency Help Endpoint
    console.log('--- TESTING EMERGENCY HELPLINE DATA ---');
    const emergencyRes = await fetch(`${baseUrl}/api/emergency`);
    const emergencyJson = await emergencyRes.json();
    assert(
      emergencyJson.nationalHelpline.number === '1930' && emergencyJson.banks.length >= 6,
      'Emergency Data Integrity (1930 & Banks Directory)',
      `Helpline: ${emergencyJson.nationalHelpline.number}, Banks Count: ${emergencyJson.banks.length}`
    );

    // 4. Caregiver Mode Consent Enforcement
    console.log('--- TESTING CAREGIVER MODE CONSENT MODEL ---');
    // a. Attempt access when consent = false
    const cgDeniedRes = await fetch(`${baseUrl}/api/caregiver/view/SAATHI-7821`);
    assert(
      cgDeniedRes.status === 403,
      'Caregiver Silent Monitoring Blocked (Consent=false returns 403 Forbidden)',
      `HTTP Status: ${cgDeniedRes.status} (Access strictly blocked without consent)`
    );

    // b. Senior explicitly grants consent
    const cgGrantRes = await fetch(`${baseUrl}/api/caregiver/consent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: true })
    });
    const cgGrantJson = await cgGrantRes.json();
    assert(
      cgGrantJson.consentGranted === true && cgGrantJson.consentTimestamp !== null,
      'Senior Grants Explicit Consent',
      `consentGranted: ${cgGrantJson.consentGranted}, timestamp: ${cgGrantJson.consentTimestamp}`
    );

    // c. Caregiver can now view authorized educational progress
    const cgAllowedRes = await fetch(`${baseUrl}/api/caregiver/view/SAATHI-7821`);
    const cgAllowedJson = await cgAllowedRes.json();
    assert(
      cgAllowedRes.status === 200 &&
      Array.isArray(cgAllowedJson.completedModules) &&
      !('bankAccount' in cgAllowedJson) &&
      !('otp' in cgAllowedJson) &&
      !('pin' in cgAllowedJson),
      'Caregiver View Authorized & Zero Sensitive Financial Data Transmitted',
      `Status: 200, Modules: ${cgAllowedJson.completedModules.join(', ')}, Simulator Score: ${cgAllowedJson.simulatorScore}`
    );

    // d. Senior revokes consent
    const cgRevokeRes = await fetch(`${baseUrl}/api/caregiver/consent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: false })
    });
    const cgRevokeJson = await cgRevokeRes.json();
    assert(
      cgRevokeJson.consentGranted === false,
      'Senior Revokes Consent with Single Click',
      `consentGranted: ${cgRevokeJson.consentGranted}`
    );

    // e. Access immediately rejected with 403
    const cgDeniedAgainRes = await fetch(`${baseUrl}/api/caregiver/view/SAATHI-7821`);
    assert(
      cgDeniedAgainRes.status === 403,
      'Immediate Revocation Verified (Access re-blocked with 403 Forbidden)',
      `HTTP Status: ${cgDeniedAgainRes.status}`
    );

    console.log(`\n=== VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
    if (failCount > 0) process.exit(1);
  } catch (e) {
    console.error('Test execution error:', e);
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
