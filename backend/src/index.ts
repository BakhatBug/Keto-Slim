import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import formRoutes from './routes/formRoutes';
import resultRoutes from './routes/resultRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
🚀 Server is running!
📍 Local:            http://localhost:${PORT}
📍 Health Check:     http://localhost:${PORT}/api/health
🌍 Environment:      ${process.env.NODE_ENV}
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

startServer();

export default app;
