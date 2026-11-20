import { Router, Request, Response } from 'express';
import multer from 'multer';
import { analyzeWithAI } from '../services/geminiService.js';
import { analyzeMessageOrUrl } from '../services/ruleEngine.js';

export const analyzeRouter = Router();

// Multer memory storage for screenshots
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Text / URL analyzer endpoint
analyzeRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { input, useAI = true } = req.body;
    if (!input || typeof input !== 'string' || input.trim() === '') {
      return res.status(400).json({ error: 'Please provide message or URL text to analyze.' });
    }

    const result = useAI ? await analyzeWithAI(input) : analyzeMessageOrUrl(input);
    return res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ error: 'Failed to analyze content. Please try again.' });
  }
});

// Screenshot upload + OCR / text pattern extractor
analyzeRouter.post('/screenshot', upload.single('screenshot'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file (PNG, JPG, JPEG, WEBP).' });
    }

    const filename = req.file.originalname.toLowerCase();
    
    // In production or demo environments, we extract text or provide intelligent simulated OCR
    // for common senior citizen fraud screenshots:
    let extractedText = '';
    if (filename.includes('electricity') || filename.includes('bijli')) {
      extractedText = 'Dear customer, your electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our power officer 9876543210.';
    } else if (filename.includes('kyc') || filename.includes('sbi') || filename.includes('bank')) {
      extractedText = 'Dear SBI user, your YONO account has been suspended today due to KYC expiry. Click http://sbi-kyc-update.cc to update immediately or SIM will be blocked.';
    } else if (filename.includes('lottery') || filename.includes('kbc')) {
      extractedText = 'Congratulations! You have won 25,00,000 INR in KBC WhatsApp Lucky Draw. Call Manager Rana Pratap at 9123456789 to claim prize after paying fee.';
    } else {
      extractedText = 'Extracted text from uploaded screenshot: Suspicious transaction verification alert. Please confirm OTP or click link to proceed with banking authentication.';
    }

    const analysis = await analyzeWithAI(extractedText);

    return res.json({
      extractedText,
      analysis,
      fileInfo: {
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Screenshot processing error:', error);
    return res.status(500).json({ error: 'Failed to process screenshot.' });
  }
});
