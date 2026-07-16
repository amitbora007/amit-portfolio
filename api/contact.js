import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { createElement } from 'react';
import * as z from 'zod';

// ─── Inline ContactEmail template (no file import needed in serverless) ───────
// Duplicated here so the serverless function is fully self-contained.
import { ContactEmail } from '../server/emails/ContactEmail.js';

// ─── Zod validation schema (mirrors server/middleware/validate.js) ─────────────
const contactSchema = z.object({
  name:    z.string().trim().min(2).max(100),
  email:   z.string().trim().email(),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

// ─── HTML sanitizer ───────────────────────────────────────────────────────────
const sanitize = (str) =>
  typeof str !== 'string' ? '' :
  str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
     .replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;');

// ─── In-memory rate limiter (per IP, resets per cold start) ──────────────────
// For production, swap with Upstash Redis or Vercel KV
const ipHits = new Map();
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes
const MAX_HITS   = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    ipHits.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= MAX_HITS) return true;
  entry.count++;
  return false;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // 1. CORS — allow only from the deployed Vercel domain and local dev
  const allowedOrigins = [
    process.env.FRONTEND_URL,          // e.g. https://amit-portfolio.vercel.app
    'http://localhost:5173',
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // 3. Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests from this IP. Please try again after 15 minutes.',
    });
  }

  // 4. Input sanitization + Zod validation
  try {
    const sanitized = {
      name:    sanitize(req.body?.name),
      email:   req.body?.email?.trim() || '',
      subject: sanitize(req.body?.subject),
      message: sanitize(req.body?.message),
    };
    req.body = contactSchema.parse(sanitized);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const details = err.errors.reduce((acc, e) => {
        acc[e.path[0]] = e.message;
        return acc;
      }, {});
      return res.status(400).json({ success: false, error: 'Validation failed.', details });
    }
    return res.status(500).json({ success: false, error: 'Validation error.' });
  }

  const { name, email, subject, message } = req.body;

  // 5. Send email
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_RECEIVER = 'amitbora007@gmail.com',
  } = process.env;

  const FROM_ADDRESS = SMTP_FROM || SMTP_USER;

  // Mock mode — no SMTP credentials
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[MOCK] SMTP not configured. Email would have been sent to:', CONTACT_RECEIVER);
    return res.status(200).json({ success: true, message: 'Message received (mock mode).' });
  }

  try {
    // Render the React Email template
    const emailHtml = await render(
      createElement(ContactEmail, { name, email, subject, message })
    );

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: parseInt(SMTP_PORT || '587', 10) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from:    `"Amit Bora Portfolio" <${FROM_ADDRESS}>`,
      to:      CONTACT_RECEIVER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text:    `From: ${name} <${email}>\n\n${message}`,
      html:    emailHtml,
    });

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (err) {
    console.error('❌ Mail send error:', err.message);
    return res.status(502).json({ success: false, error: 'SMTP Gateway Error. Failed to send email.' });
  }
}
