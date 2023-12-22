import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();


// Middlewares

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'));
// app.use(bodyParser.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Test API Platform'
  });
});

app.use('/api/v1/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

export default app;