import { Router, Request, Response } from 'express';

export const caregiverRouter = Router();

// In-memory progress and consent registry (in production backed by DB)
// Strict rule: silent monitoring is STRICTLY FORBIDDEN.
// Data is ONLY accessible when consentGranted === true.
interface CaregiverSession {
  seniorName: string;
  consentGranted: boolean;
  consentTimestamp: string | null;
  pairingCode: string;
  completedModules: string[];
  simulatorScore: number;
  lastActive: string;
}

let activeSession: CaregiverSession = {
  seniorName: 'Dada ji / Senior User',
  consentGranted: false, // Default is FALSE: no sharing without explicit opt-in
  consentTimestamp: null,
  pairingCode: 'SAATHI-7821',
  completedModules: ['KYC Safety', 'OTP Protection'],
  simulatorScore: 3,
  lastActive: new Date().toISOString(),
};

// Get current consent status
caregiverRouter.get('/status', (_req: Request, res: Response) => {
  return res.json({
    consentGranted: activeSession.consentGranted,
    consentTimestamp: activeSession.consentTimestamp,
    pairingCode: activeSession.pairingCode,
    scopeSummary: 'Only safety learning progress, completed modules, and simulation practice score are shared. Zero financial data, passwords, or personal messages are ever accessed or transmitted.'
  });
});

// Update consent toggle (grant or revoke)
caregiverRouter.post('/consent', (req: Request, res: Response) => {
  const { consent } = req.body;
  if (typeof consent !== 'boolean') {
    return res.status(400).json({ error: 'Consent value must be true or false.' });
  }

  activeSession.consentGranted = consent;
  activeSession.consentTimestamp = consent ? new Date().toISOString() : null;

  return res.json({
    message: consent ? 'Consent granted successfully. Safety progress can now be viewed by your trusted caregiver.' : 'Consent revoked. Caregiver access has been terminated immediately.',
    consentGranted: activeSession.consentGranted,
    consentTimestamp: activeSession.consentTimestamp
  });
});

// Caregiver view (requires pairing code and valid active consent)
caregiverRouter.get('/view/:code', (req: Request, res: Response) => {
  const { code } = req.params;

  if (code !== activeSession.pairingCode) {
    return res.status(404).json({ error: 'Invalid pairing code.' });
  }

  // Strict enforcement: Silent monitoring is forbidden.
  if (!activeSession.consentGranted) {
    return res.status(403).json({
      error: 'Access Denied: The user has NOT granted consent to share progress, or consent was withdrawn.',
      consentGranted: false
    });
  }

  return res.json({
    seniorName: activeSession.seniorName,
    consentGranted: true,
    consentTimestamp: activeSession.consentTimestamp,
    completedModules: activeSession.completedModules,
    simulatorScore: activeSession.simulatorScore,
    lastActive: activeSession.lastActive,
    sharedSafetyNotice: 'You are viewing educational progress under explicit user authorization.'
  });
});

// Update senior progress (from client)
caregiverRouter.post('/progress', (req: Request, res: Response) => {
  const { moduleName, scoreInc } = req.body;
  if (moduleName && !activeSession.completedModules.includes(moduleName)) {
    activeSession.completedModules.push(moduleName);
  }
  if (typeof scoreInc === 'number') {
    activeSession.simulatorScore += scoreInc;
  }
  activeSession.lastActive = new Date().toISOString();
  return res.json({ success: true, activeSession });
});
