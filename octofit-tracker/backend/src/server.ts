import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

// Mount API routes under /api
app.use('/api', apiRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
});
