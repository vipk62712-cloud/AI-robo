import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import authRoutes from './routes/auth';
import crmRoutes from './routes/crm';
import bookingRoutes from './routes/bookings';
import paymentRoutes from './routes/payments';
import equipmentRoutes from './routes/equipment';
import shootRoutes from './routes/shoots';
import teamRoutes from './routes/team';
import productionRoutes from './routes/production';
import accountsRoutes from './routes/accounts';
import reportsRoutes from './routes/reports';
import notificationRoutes from './routes/notifications';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/crm', crmRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/equipment', equipmentRoutes);
app.use('/api/v1/shoots', shootRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/production', productionRoutes);
app.use('/api/v1/accounts', accountsRoutes);
app.use('/api/v1/reports', reportsRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health: http://localhost:${PORT}/api/v1/health`);
});

export default app;