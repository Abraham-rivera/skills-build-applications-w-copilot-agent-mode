import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import apiRouter from './routes';
import baseUrl from './config/baseUrl';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

// Expose codespaces-aware base URL for clients
app.get('/api/config', (_req, res) => {
  res.json({ apiBase: `${baseUrl}/api` });
});

// Mount API routes under /api
app.use('/api', apiRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
  if (process.env.CODESPACE_NAME) {
    console.log(`Codespaces URL: https://${process.env.CODESPACE_NAME}-8000.app.github.dev`);
  }
  console.log(`Local URL: http://localhost:${port}`);
});
