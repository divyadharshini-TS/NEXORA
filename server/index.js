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

app.use(cors());
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
