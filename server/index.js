import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { seedSchemeCatalog } from './seedSchemes.js';
import { seedDemoUser } from './controllers/authController.js';

dotenv.config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexora';

// CORS: allow local dev + Vercel production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL, // e.g. https://nexora.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NEXORA backend is running.',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/analyze', analysisRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/notifications', notificationRoutes);

// ─── 404 handler: always return JSON, never HTML ───────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist on this server.`,
  });
});

// ─── Global error handler: always return JSON, never HTML ──────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully.');
    await seedDemoUser();
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing without database for local dev.');
    console.warn(error.message);
  }

  await seedSchemeCatalog();

  app.listen(PORT, () => {
    console.log(`NEXORA backend listening on http://localhost:${PORT}`);
  });
};

startServer();
