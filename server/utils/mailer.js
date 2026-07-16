import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { render } from '@react-email/render';
import { createElement } from 'react';
import { ContactEmail } from '../emails/ContactEmail.js';

// Load environment variables
dotenv.config();

/**
 * Required Environment Variables (configure in .env):
 * - SMTP_HOST: The hostname of your SMTP server (e.g., smtp.resend.com, smtp.gmail.com)
 * - SMTP_PORT: Port number (e.g., 465 for SSL, 587 for TLS)
 * - SMTP_USER: Username/email for the SMTP server
 * - SMTP_PASS: Password or API token for SMTP authentication
 * - CONTACT_RECEIVER: Destination address where emails are sent (defaults to amitbora007@gmail.com)
 */

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  // SMTP_FROM: the verified sender address shown in the email "From" field.
  // For Resend: must be a verified domain address (e.g. noreply@amitbora.dev)
  //             or use onboarding@resend.dev for Resend's free sandbox testing.
  // For Gmail:  same as SMTP_USER (e.g. yourname@gmail.com)
  SMTP_FROM,
  CONTACT_RECEIVER = 'amitbora007@gmail.com',
} = process.env;

// Build the From address: prefer SMTP_FROM, fall back to SMTP_USER
const FROM_ADDRESS = SMTP_FROM || SMTP_USER;

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT || '587', 10),
  secure: parseInt(SMTP_PORT || '587', 10) === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * Send an email from the contact form using the React Email template.
 * @param {Object} details
 * @param {string} details.name    - Sender name
 * @param {string} details.email   - Sender email
 * @param {string} details.subject - Email subject
 * @param {string} details.message - Email message body
 */
export const sendEmail = async ({ name, email, subject, message }) => {
  // If SMTP configurations are missing, run in mock mode (very helpful for local testing!)
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠️  SMTP credentials not fully configured in environment variables.');
    console.info(`[MOCK EMAIL SENT]
To: ${CONTACT_RECEIVER}
From: "${name}" <${email}>
Subject: [Portfolio Contact] ${subject}
Message: ${message}`);
    return { mock: true, success: true };
  }

  // Render the React Email template to a full HTML string
  const emailHtml = await render(
    createElement(ContactEmail, { name, email, subject, message })
  );

  // Plain-text fallback for email clients that don't support HTML
  const emailText = `New portfolio contact message
──────────────────────────────
From:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}
──────────────────────────────
Sent from amitbora.dev portfolio contact form.`;

  console.log(`📤 Sending from: ${FROM_ADDRESS} → to: ${CONTACT_RECEIVER}`);

  const mailOptions = {
    from: `"Amit Bora Portfolio" <${FROM_ADDRESS}>`, // Must be a verified sender address for your SMTP provider
    to: CONTACT_RECEIVER,
    replyTo: email,                                // Direct replies go back to sender
    subject: `[Portfolio Contact] ${subject}`,
    text: emailText,
    html: emailHtml,
  };

  return transporter.sendMail(mailOptions);
};
