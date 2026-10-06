import { Router } from 'express';
import handler from '../../api/chat.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error('Express AI Chat Route Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
