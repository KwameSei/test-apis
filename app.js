import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import appLinksRoutes from './routes/appLinksRoutes.js';

dotenv.config();

const createApp = () => {
  const app = express();
  const server = http.createServer(app);

  // Middlewares
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(cors());

  // Routes
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to the Test API Platform',
    });
  });

  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/app', appLinksRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  });

  return server;
};

export default createApp;
