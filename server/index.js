import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Basic Security Headers with Helmet
app.use(helmet());

// 2. CORS configuration (allow requests from frontend dev port or production URL)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

// 3. Request Body Parsing
app.use(express.json({ limit: '10kb' })); // protect against large payloads

// 4. Rate Limiting for the contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per 15 minutes
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    error: 'Too many contact requests from this IP. Please try again after 15 minutes.',
  },
});

// 5. API Routes
app.use('/api/contact', contactLimiter, contactRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 6. Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'An internal server error occurred.',
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Production-grade contact API running on port ${PORT}`);
  if (!process.env.SMTP_HOST) {
    console.log('⚠️ Running in Mock/Debug mail mode. Emails will print to console output.');
  }
});
