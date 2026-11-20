import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRouter } from './routes/analyze.js';
import { emergencyRouter } from './routes/emergency.js';
import { caregiverRouter } from './routes/caregiver.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Suraksha Saathi API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Route mountings
app.use('/api/analyze', analyzeRouter);
app.use('/api/emergency', emergencyRouter);
app.use('/api/caregiver', caregiverRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Suraksha Saathi Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
