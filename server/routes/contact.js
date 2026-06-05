import { Router } from 'express';
import { validateContact } from '../middleware/validate.js';
import { sendEmail } from '../utils/mailer.js';

const router = Router();

/**
 * @route   POST /api/contact
 * @desc    Submit contact message and send notification email
 * @access  Public
 */
router.post('/', validateContact, async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const result = await sendEmail({ name, email, subject, message });

    // Handle Mock delivery vs Real SMTP delivery messages
    if (result.mock) {
      return res.status(250).json({
        success: true,
        message: 'Message processed locally in debug/mock mode.',
        warning: 'Mail not delivered via SMTP (missing credentials).',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('❌ Mail transport failed to send:', error);
    
    return res.status(502).json({
      success: false,
      error: 'SMTP Gateway Error. Failed to transmit email.',
    });
  }
});

export default router;
